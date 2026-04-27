import { NextResponse } from 'next/server';
import { classifyStartup } from '@/lib/claude';
import { ACTIVITIES, JURISDICTIONS } from '@/types';
import { fetchAndExtractText } from '@/lib/url-fetch';
import { parseDocument, type DocParseOutcome } from '@/lib/doc-parse';

// Force the Node.js runtime — mammoth + unpdf both rely on Node-style
// buffers / streams.
export const runtime = 'nodejs';
// Body limits (Hobby tier = 4.5MB). We cap at 4MB total to keep a buffer.
export const dynamic = 'force-dynamic';

const ALLOWED_ACTIVITIES = Object.keys(ACTIVITIES);
const ALLOWED_JURISDICTIONS = Object.keys(JURISDICTIONS);

const MAX_DESCRIPTION = 500;
const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4MB total upload budget

interface ClassifyResponse {
  activities: string[];
  jurisdictions: string[];
  other: string;
  reasoning: string;
  /** Per-source telemetry surfaced back to the UI so we can show
   *  "✓ landing page read · ✓ whitepaper.pdf parsed · ✗ deck.docx skipped" */
  sourceReports?: Array<
    | { kind: 'description'; chars: number }
    | { kind: 'url'; url: string; ok: boolean; chars?: number; error?: string; truncated?: boolean }
    | { kind: 'file'; filename: string; ok: boolean; chars?: number; error?: string; truncated?: boolean }
  >;
  error?: string;
}

/**
 * POST /api/classify — accepts either:
 *   · application/json   → { description, locale }                 (legacy path)
 *   · multipart/form-data → description + url? + files[]?           (new path)
 *
 * Aggregates all provided text into a single Claude classification
 * context. URL + file failures are non-fatal — they're reported per
 * source in `sourceReports` so the UI can surface partial-success.
 */
export async function POST(request: Request) {
  try {
    const ct = request.headers.get('content-type') ?? '';
    const isMultipart = ct.startsWith('multipart/form-data');

    // ── Extract inputs ────────────────────────────────────────────────
    let description = '';
    let url = '';
    let files: File[] = [];
    let locale: 'en' | 'fr' = 'en';

    if (isMultipart) {
      const form = await request.formData();
      description = String(form.get('description') ?? '').slice(0, MAX_DESCRIPTION).trim();
      url = String(form.get('url') ?? '').trim();
      const localeRaw = String(form.get('locale') ?? 'en');
      locale = localeRaw === 'fr' ? 'fr' : 'en';

      // Multiple files come as repeated 'files' entries
      const rawFiles = form.getAll('files');
      files = rawFiles.filter((v): v is File => v instanceof File).slice(0, MAX_FILES);

      const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
      if (totalBytes > MAX_TOTAL_BYTES) {
        return NextResponse.json<ClassifyResponse>(
          {
            activities: [],
            jurisdictions: [],
            other: '',
            reasoning: '',
            error: `Total upload size exceeds ${Math.round(MAX_TOTAL_BYTES / 1024 / 1024)}MB`,
          },
          { status: 413 },
        );
      }
    } else {
      const body = (await request.json()) as { description?: string; locale?: string };
      description = String(body.description ?? '').slice(0, MAX_DESCRIPTION).trim();
      locale = body.locale === 'fr' ? 'fr' : 'en';
    }

    // ── Validate at least ONE input ───────────────────────────────────
    const hasDescription = description.length > 0;
    const hasUrl = url.length > 0;
    const hasFiles = files.length > 0;
    if (!hasDescription && !hasUrl && !hasFiles) {
      return NextResponse.json<ClassifyResponse>(
        {
          activities: [],
          jurisdictions: [],
          other: '',
          reasoning: '',
          error: 'Provide at least a description, a URL, or a document',
        },
        { status: 400 },
      );
    }

    // ── Fetch URL + parse files in parallel ──────────────────────────
    const sourceReports: NonNullable<ClassifyResponse['sourceReports']> = [];
    if (hasDescription) {
      sourceReports.push({ kind: 'description', chars: description.length });
    }

    const [urlResult, fileResults] = await Promise.all([
      hasUrl ? fetchAndExtractText(url) : Promise.resolve(null),
      hasFiles ? Promise.all(files.map(parseDocument)) : Promise.resolve([] as DocParseOutcome[]),
    ]);

    // ── Build the classification context ─────────────────────────────
    const contextParts: string[] = [];
    if (hasDescription) {
      contextParts.push(`# User description\n\n${description}`);
    }

    if (urlResult) {
      if (urlResult.ok) {
        contextParts.push(
          `# Landing page (${urlResult.finalUrl})\n\n${urlResult.text}`,
        );
        sourceReports.push({
          kind: 'url',
          url: urlResult.finalUrl,
          ok: true,
          chars: urlResult.text.length,
          truncated: urlResult.truncated,
        });
      } else {
        sourceReports.push({ kind: 'url', url, ok: false, error: urlResult.error });
      }
    }

    for (const r of fileResults) {
      if (r.ok) {
        contextParts.push(`# Document: ${r.filename}\n\n${r.text}`);
        sourceReports.push({
          kind: 'file',
          filename: r.filename,
          ok: true,
          chars: r.text.length,
          truncated: r.truncated,
        });
      } else {
        sourceReports.push({ kind: 'file', filename: r.filename, ok: false, error: r.error });
      }
    }

    if (contextParts.length === 0) {
      // Edge case: every source failed. Surface a clear error rather than
      // sending an empty prompt to Claude.
      return NextResponse.json<ClassifyResponse>(
        {
          activities: [],
          jurisdictions: [],
          other: '',
          reasoning: '',
          sourceReports,
          error: 'All sources failed to parse — try a different URL or file.',
        },
        { status: 422 },
      );
    }

    const fullContext = contextParts.join('\n\n---\n\n');

    // ── Hand to Claude for classification ────────────────────────────
    const result = await classifyStartup(
      fullContext,
      locale,
      ALLOWED_ACTIVITIES,
      ALLOWED_JURISDICTIONS,
    );

    return NextResponse.json<ClassifyResponse>({
      ...result,
      sourceReports,
    });
  } catch (err) {
    console.error('[api/classify] Failed:', err);
    const message = err instanceof Error ? err.message : 'Classification failed';
    return NextResponse.json<ClassifyResponse>(
      { activities: [], jurisdictions: [], other: '', reasoning: '', error: message },
      { status: 500 },
    );
  }
}
