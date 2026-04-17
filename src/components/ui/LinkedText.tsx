'use client';

import React, { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { GLOSSARY_TERMS } from '@/data/glossary';

/**
 * Renders a text string with glossary terms underlined + tooltip on hover.
 *
 * Usage:
 *   <LinkedText>Your MiCA CASP analysis...</LinkedText>
 *
 * Matching:
 * - Case-sensitive for acronyms (MiCA, CASP, EMT, etc.)
 * - Word-boundary to avoid matching "CASP" inside "CASPER"
 * - Multi-word terms (Trust Line, Travel Rule) are supported
 * - Longer terms matched first to prevent nested overlap
 */

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Build the big regex once, at module load.
// Terms are sorted by length (desc) so multi-word terms match before their subparts.
const SORTED_TERMS = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);

// Avoid auto-linking lowercase one/two-letter terms that would match too much.
// Keep acronyms (>= 3 chars) and multi-word terms.
const ELIGIBLE_TERMS = SORTED_TERMS.filter((t) => t.term.length >= 3);

const GLOSSARY_BY_LOWER = new Map(
  ELIGIBLE_TERMS.map((t) => [t.term.toLowerCase(), t]),
);

const PATTERN = new RegExp(
  // Word boundary \b or edge-of-string, then one of the terms, then boundary
  '(?<![A-Za-z])(' +
    ELIGIBLE_TERMS.map((t) => escapeRegex(t.term)).join('|') +
    ')(?![A-Za-z])',
  'g',
);

interface Props {
  children: string;
  className?: string;
}

export default function LinkedText({ children, className }: Props) {
  const locale = useLocale();

  const parts = useMemo(() => {
    if (!children || typeof children !== 'string') return [children];
    const chunks: Array<string | { term: string; definition: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Fresh regex per render (stateful lastIndex from global flag)
    const rx = new RegExp(PATTERN.source, 'g');
    while ((match = rx.exec(children)) !== null) {
      if (match.index > lastIndex) {
        chunks.push(children.slice(lastIndex, match.index));
      }
      const entry = GLOSSARY_BY_LOWER.get(match[0].toLowerCase());
      if (entry) {
        const def = locale === 'fr' && entry.definitionFr ? entry.definitionFr : entry.definition;
        chunks.push({ term: match[0], definition: def });
      } else {
        chunks.push(match[0]);
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < children.length) {
      chunks.push(children.slice(lastIndex));
    }
    return chunks;
  }, [children, locale]);

  return (
    <span className={className}>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <React.Fragment key={i}>{p}</React.Fragment>
        ) : (
          <a
            key={i}
            href={`/${locale}/glossary#term-${p.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
            title={p.definition}
            className="underline decoration-dotted decoration-blue-400 underline-offset-2 hover:decoration-solid hover:text-blue-600 dark:hover:text-blue-400 cursor-help"
          >
            {p.term}
          </a>
        ),
      )}
    </span>
  );
}
