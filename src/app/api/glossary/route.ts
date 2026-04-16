import { NextResponse } from 'next/server';
import { GLOSSARY_TERMS } from '@/data/glossary';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() ?? '';

  const filtered = search
    ? GLOSSARY_TERMS.filter(
        (t) =>
          t.term.toLowerCase().includes(search) ||
          t.definition.toLowerCase().includes(search)
      )
    : GLOSSARY_TERMS;

  return NextResponse.json(filtered);
}
