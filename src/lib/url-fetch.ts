/**
 * URL fetcher for the /assess "describe your startup" classification flow.
 *
 * Given a public URL (typically the user's landing page), fetch it
 * server-side, strip HTML to plain text, and return a capped excerpt
 * suitable for inclusion in a Claude classification prompt.
 *
 * Hardened against:
 *  · SSRF — refuses non-http(s) protocols and private/loopback IPs
 *  · DoS — 5s timeout, 200KB download cap, 30KB extracted-text cap
 *  · Hangs — AbortController on fetch
 *
 * No external deps — uses native `fetch` + a regex-based HTML stripper
 * (cheerio / jsdom would 4× the bundle for what we need).
 */

const FETCH_TIMEOUT_MS = 5000;
const MAX_BYTES = 200_000;        // 200KB raw download cap
const MAX_TEXT_CHARS = 30_000;    // 30KB extracted-text cap (Claude context budget)

/** Minimal SSRF guard — block obvious private / loopback / link-local hosts.
 *  Note: a determined attacker could still resolve a public hostname to a
 *  private IP between our check and the fetch (TOCTOU). For higher assurance
 *  we'd resolve the hostname ourselves and validate the resulting IP, but
 *  for this product surface — public-landing-page extraction — these checks
 *  + a short timeout + no response content reflected back to other users
 *  is the right cost/risk trade. */
function isPrivateOrUnsafeHost(hostname: string): boolean {
  // Strip brackets from IPv6 literals
  const h = hostname.replace(/^\[|\]$/g, '').toLowerCase();

  // Loopback / localhost
  if (h === 'localhost' || h === '0' || h === '0.0.0.0') return true;
  if (h.startsWith('127.')) return true;
  if (h === '::1' || h === '::') return true;
  if (h.startsWith('::ffff:127.')) return true;

  // IPv4 private + link-local + unspecified
  if (/^10\.\d+\.\d+\.\d+$/.test(h)) return true;
  if (/^192\.168\.\d+\.\d+$/.test(h)) return true;
  if (/^169\.254\.\d+\.\d+$/.test(h)) return true;
  // 172.16.0.0 – 172.31.255.255
  const m172 = /^172\.(\d{1,3})\.\d+\.\d+$/.exec(h);
  if (m172 && Number(m172[1]) >= 16 && Number(m172[1]) <= 31) return true;
  // 100.64.0.0/10 (CGNAT)
  const m100 = /^100\.(\d{1,3})\.\d+\.\d+$/.exec(h);
  if (m100 && Number(m100[1]) >= 64 && Number(m100[1]) <= 127) return true;

  // Cloud metadata endpoints — block these explicitly
  if (h === '169.254.169.254') return true; // AWS / GCP / Azure IMDS
  if (h === 'metadata.google.internal') return true;

  // IPv6 ULA (fc00::/7) and link-local (fe80::/10)
  if (/^fc/.test(h) || /^fd/.test(h)) return true;
  if (/^fe[89ab]/.test(h)) return true;

  return false;
}

/** Normalise a user-supplied URL — most users paste bare domains
 *  (`regolda.com`, `www.regolda.com`) without a protocol. Default to
 *  https:// in that case so the URL parser doesn't reject the input. */
function normaliseUrl(raw: string): string {
  const trimmed = raw.trim();
  // Strip Markdown link syntax if the user pasted "[label](url)" by accident
  const md = /^\[[^\]]*\]\((https?:\/\/[^)]+)\)$/.exec(trimmed);
  if (md) return md[1];
  // Already has a protocol → return as-is
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) return trimmed;
  // Bare domain or path → prepend https://
  return `https://${trimmed}`;
}

/** Validate the URL is safe to fetch. Throws on invalid input. */
function validateUrl(rawUrl: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(normaliseUrl(rawUrl));
  } catch {
    throw new Error('Invalid URL');
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Only http(s) URLs are supported');
  }
  if (!parsed.hostname || !parsed.hostname.includes('.')) {
    // Single-word strings like "test" or "localhost" without a dot — not real
    throw new Error('URL is missing a valid hostname (e.g. "example.com")');
  }
  if (isPrivateOrUnsafeHost(parsed.hostname)) {
    throw new Error('Refusing to fetch private / loopback host');
  }
  return parsed;
}

/** Strip HTML to readable plain text. Removes script/style content first
 *  (we don't want JS source treated as text), then drops all remaining
 *  tags. Collapses whitespace. */
function htmlToText(html: string): string {
  return html
    // Drop script / style / noscript blocks entirely (content + tags)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/gi, ' ')
    // Drop comments
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // Convert <br> / <p> / <li> to newlines for readability
    .replace(/<\/(?:p|div|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // Strip remaining tags
    .replace(/<[^>]+>/g, ' ')
    // Decode the most common HTML entities (Claude tolerates the rest)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Collapse whitespace
    .replace(/[\t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export interface UrlFetchResult {
  ok: true;
  text: string;
  finalUrl: string;
  truncated: boolean;
}

export interface UrlFetchError {
  ok: false;
  error: string;
}

/**
 * Fetch a public URL and return its body as cleaned plain text.
 * Resolves with an `ok: false` result on any error so callers can
 * decide whether to fall back to text-only classification — we don't
 * want a bad URL to break the whole flow.
 */
export async function fetchAndExtractText(rawUrl: string): Promise<UrlFetchResult | UrlFetchError> {
  let parsed: URL;
  try {
    parsed = validateUrl(rawUrl);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Invalid URL' };
  }

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(parsed.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: ac.signal,
      headers: {
        // Honest UA so site owners can identify us in their logs
        'User-Agent': 'Regul8Bot/1.0 (+https://regul8app.vercel.app)',
        Accept: 'text/html,application/xhtml+xml,text/plain;q=0.8',
      },
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    // Re-validate the final URL after redirects (mitigates SSRF via 30x to a private host)
    try {
      const finalParsed = new URL(res.url);
      if (isPrivateOrUnsafeHost(finalParsed.hostname)) {
        return { ok: false, error: 'Redirect to private host blocked' };
      }
    } catch {
      // ignore — keep going if we can't reparse
    }

    // Stream the body up to MAX_BYTES. Most landing pages are 30-100KB so
    // this is a generous cap — we just don't want a 50MB JS bundle.
    const reader = res.body?.getReader();
    if (!reader) return { ok: false, error: 'Empty response body' };

    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await reader.cancel();
        break;
      }
      chunks.push(value);
    }

    const decoder = new TextDecoder('utf-8', { fatal: false });
    const html = chunks.map((c) => decoder.decode(c, { stream: true })).join('') + decoder.decode();
    const text = htmlToText(html);
    const truncated = text.length > MAX_TEXT_CHARS;
    return {
      ok: true,
      text: truncated ? text.slice(0, MAX_TEXT_CHARS) : text,
      finalUrl: res.url,
      truncated,
    };
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      return { ok: false, error: 'Timeout (5s)' };
    }
    return { ok: false, error: e instanceof Error ? e.message : 'Fetch failed' };
  } finally {
    clearTimeout(timer);
  }
}
