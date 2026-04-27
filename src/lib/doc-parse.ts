/**
 * Document parser for the /assess "describe your startup" classification flow.
 *
 * Given an uploaded File (PDF, DOCX, MD, TXT), extract its plain text
 * server-side and return a capped excerpt for inclusion in a Claude
 * classification prompt.
 *
 * Each parser is dynamically imported on first use so we don't pay the
 * mammoth / unpdf bundle cost in the API route's cold start when the
 * caller only sent a description / URL.
 *
 * Hardening:
 *  · 5MB per-file cap enforced at the route level (+ 4MB total budget)
 *  · 30KB extracted-text cap per doc (Claude context budget)
 *  · Errors are reported per-file so one bad upload doesn't break the
 *    whole classification request.
 */

const MAX_FILE_BYTES = 5 * 1024 * 1024;   // 5MB raw cap per file
const MAX_TEXT_CHARS = 30_000;            // 30KB extracted-text cap per doc

export interface DocParseResult {
  ok: true;
  filename: string;
  text: string;
  truncated: boolean;
  bytes: number;
}

export interface DocParseError {
  ok: false;
  filename: string;
  error: string;
}

export type DocParseOutcome = DocParseResult | DocParseError;

function isProbablyPdf(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}
function isProbablyDocx(file: File): boolean {
  return (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.name.toLowerCase().endsWith('.docx')
  );
}
function isProbablyTextlike(file: File): boolean {
  const n = file.name.toLowerCase();
  return (
    file.type === 'text/markdown' ||
    file.type === 'text/plain' ||
    n.endsWith('.md') ||
    n.endsWith('.markdown') ||
    n.endsWith('.txt')
  );
}

function capText(text: string): { text: string; truncated: boolean } {
  if (text.length > MAX_TEXT_CHARS) {
    return { text: text.slice(0, MAX_TEXT_CHARS), truncated: true };
  }
  return { text, truncated: false };
}

async function parsePdf(buf: ArrayBuffer): Promise<string> {
  // unpdf — modern, edge-compatible, pure-JS PDF text extraction.
  const { extractText, getDocumentProxy } = await import('unpdf');
  const pdf = await getDocumentProxy(new Uint8Array(buf));
  const { text } = await extractText(pdf, { mergePages: true });
  return Array.isArray(text) ? text.join('\n\n') : text;
}

async function parseDocx(buf: ArrayBuffer): Promise<string> {
  // mammoth — DOCX → plain text. We pass `arrayBuffer` not `buffer` so it
  // works in any runtime that exposes ArrayBuffer (Node, Edge).
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ buffer: Buffer.from(buf) });
  return result.value;
}

async function parseTextlike(buf: ArrayBuffer): Promise<string> {
  return new TextDecoder('utf-8', { fatal: false }).decode(buf);
}

/**
 * Parse a single uploaded File. Returns success or per-file error so the
 * route can surface a partial-success result to the user.
 */
export async function parseDocument(file: File): Promise<DocParseOutcome> {
  if (file.size === 0) {
    return { ok: false, filename: file.name, error: 'Empty file' };
  }
  if (file.size > MAX_FILE_BYTES) {
    return {
      ok: false,
      filename: file.name,
      error: `File too large (max ${Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB)`,
    };
  }

  let buf: ArrayBuffer;
  try {
    buf = await file.arrayBuffer();
  } catch {
    return { ok: false, filename: file.name, error: 'Could not read file bytes' };
  }

  try {
    let text: string;
    if (isProbablyPdf(file)) {
      text = await parsePdf(buf);
    } else if (isProbablyDocx(file)) {
      text = await parseDocx(buf);
    } else if (isProbablyTextlike(file)) {
      text = await parseTextlike(buf);
    } else {
      return {
        ok: false,
        filename: file.name,
        error: 'Unsupported format (accepted: PDF, DOCX, MD, TXT)',
      };
    }

    const { text: capped, truncated } = capText(text.trim());
    return {
      ok: true,
      filename: file.name,
      text: capped,
      truncated,
      bytes: file.size,
    };
  } catch (e) {
    return {
      ok: false,
      filename: file.name,
      error: e instanceof Error ? e.message : 'Parse failed',
    };
  }
}
