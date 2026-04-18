'use client';

import React, { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { TERM_TOPICS, TOPIC_META, type Topic } from '@/data/term-topics';

/**
 * Renders a text string with glossary terms underlined + custom tooltip on hover.
 *
 * Underline color matches the term's topic:
 *   🪪 Licence → violet    📜 Regime → sky
 *   ✅ Obligation → emerald 🪙 Token → amber
 *   🏛️ Regulator → rose    💡 Concept → indigo
 *   🔧 Infra → gray        (default / unknown) → blue
 */

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const SORTED_TERMS = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);
const ELIGIBLE_TERMS = SORTED_TERMS.filter((t) => t.term.length >= 3);

const GLOSSARY_BY_LOWER = new Map(
  ELIGIBLE_TERMS.map((t) => [t.term.toLowerCase(), t]),
);

const PATTERN = new RegExp(
  '(?<![A-Za-z])(' +
    ELIGIBLE_TERMS.map((t) => escapeRegex(t.term)).join('|') +
    ')(?![A-Za-z])',
  'g',
);

interface Props {
  children: string;
  className?: string;
}

function topicFor(term: string): Topic | undefined {
  // Try case-sensitive match first
  if (TERM_TOPICS[term]) return TERM_TOPICS[term];
  // Try exact match via canonical term from glossary
  const entry = GLOSSARY_BY_LOWER.get(term.toLowerCase());
  if (entry && TERM_TOPICS[entry.term]) return TERM_TOPICS[entry.term];
  return undefined;
}

function TermLink({
  term,
  definition,
  href,
  topic,
  isFr,
}: {
  term: string;
  definition: string;
  href: string;
  topic?: Topic;
  isFr: boolean;
}) {
  const [hover, setHover] = useState(false);
  const meta = topic ? TOPIC_META[topic] : undefined;

  const underlineClass = meta
    ? `${meta.underline} ${meta.hoverText}`
    : 'decoration-blue-400 hover:text-blue-600 dark:hover:text-blue-400';

  const topicLabel = meta ? (isFr ? meta.labelFr : meta.labelEn) : null;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        href={href}
        className={`underline decoration-dotted underline-offset-2 hover:decoration-solid cursor-help ${underlineClass}`}
      >
        {term}
      </a>
      {hover && (
        <span
          role="tooltip"
          className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 max-w-[90vw] px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs leading-relaxed shadow-xl pointer-events-none"
        >
          <span className="flex items-center gap-1.5 mb-1">
            <span className="font-semibold text-blue-300">{term}</span>
            {meta && (
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${meta.pillClass}`}>
                {meta.icon} {topicLabel}
              </span>
            )}
          </span>
          <span className="text-gray-100">{definition}</span>
          <span
            aria-hidden="true"
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"
          />
        </span>
      )}
    </span>
  );
}

export default function LinkedText({ children, className }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const parts = useMemo(() => {
    if (!children || typeof children !== 'string') return [children];
    const chunks: Array<string | { term: string; definition: string }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

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
          <TermLink
            key={i}
            term={p.term}
            definition={p.definition}
            topic={topicFor(p.term)}
            isFr={isFr}
            href={`/${locale}/glossary#term-${p.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
          />
        ),
      )}
    </span>
  );
}
