'use client';

import React, { useMemo, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [position, setPosition] = useState<{ top: number; left: number; placement: 'above' | 'below' } | null>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const meta = topic ? TOPIC_META[topic] : undefined;

  const underlineClass = meta
    ? `${meta.underline} ${meta.hoverText}`
    : 'decoration-blue-400 hover:text-blue-600 dark:hover:text-blue-400';

  const topicLabel = meta ? (isFr ? meta.labelFr : meta.labelEn) : null;

  // Tooltip width ≈ 288px (w-72), height ≈ 80-120px dynamic
  const TOOLTIP_WIDTH = 288;
  const TOOLTIP_EST_HEIGHT = 120;
  const MARGIN = 8;
  const NAV_OFFSET = 64; // sticky header height

  useLayoutEffect(() => {
    if (!hover || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    // Decide placement: above by default, flip to below if not enough room above
    const spaceAbove = rect.top - NAV_OFFSET;
    const placement: 'above' | 'below' = spaceAbove >= TOOLTIP_EST_HEIGHT + MARGIN ? 'above' : 'below';

    // Center horizontally on the anchor, then clamp to viewport
    const centerX = rect.left + rect.width / 2;
    let left = centerX - TOOLTIP_WIDTH / 2;
    const viewportWidth = window.innerWidth;
    if (left < MARGIN) left = MARGIN;
    if (left + TOOLTIP_WIDTH > viewportWidth - MARGIN) left = viewportWidth - TOOLTIP_WIDTH - MARGIN;

    const top = placement === 'above' ? rect.top - MARGIN : rect.bottom + MARGIN;
    setPosition({ top, left, placement });
  }, [hover]);

  const tooltip =
    hover && position && typeof document !== 'undefined'
      ? createPortal(
          <span
            role="tooltip"
            style={{
              position: 'fixed',
              top: position.placement === 'above' ? position.top : position.top,
              left: position.left,
              width: TOOLTIP_WIDTH,
              transform: position.placement === 'above' ? 'translateY(-100%)' : undefined,
            }}
            className="z-[9999] px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs leading-relaxed shadow-xl pointer-events-none"
          >
            <span className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="font-semibold text-blue-300">{term}</span>
              {meta && (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${meta.pillClass}`}>
                  {meta.icon} {topicLabel}
                </span>
              )}
            </span>
            <span className="block text-gray-100">{definition}</span>
          </span>,
          document.body,
        )
      : null;

  return (
    <>
      <a
        ref={anchorRef}
        href={href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`underline decoration-dotted underline-offset-2 hover:decoration-solid cursor-help ${underlineClass}`}
      >
        {term}
      </a>
      {tooltip}
    </>
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
