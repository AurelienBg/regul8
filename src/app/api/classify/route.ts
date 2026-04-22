import { NextResponse } from 'next/server';
import { classifyStartup } from '@/lib/claude';
import { ACTIVITIES, JURISDICTIONS } from '@/types';

const ALLOWED_ACTIVITIES = Object.keys(ACTIVITIES);
const ALLOWED_JURISDICTIONS = Object.keys(JURISDICTIONS);
const MAX_INPUT = 500;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { description, locale } = body as { description?: string; locale?: string };

    if (typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'Missing description' }, { status: 400 });
    }
    if (description.length > MAX_INPUT) {
      return NextResponse.json(
        { error: `Description too long (max ${MAX_INPUT} chars)` },
        { status: 400 },
      );
    }

    const loc = locale === 'fr' ? 'fr' : 'en';
    const result = await classifyStartup(
      description.trim(),
      loc,
      ALLOWED_ACTIVITIES,
      ALLOWED_JURISDICTIONS,
    );

    return NextResponse.json(result);
  } catch (err) {
    // Surface the real error to server logs so we can debug model / auth issues
    console.error('[api/classify] Failed to classify startup:', err);
    const message = err instanceof Error ? err.message : 'Classification failed';
    return NextResponse.json(
      { error: message, activities: [], jurisdictions: [], reasoning: '' },
      { status: 500 },
    );
  }
}
