'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import LinkedText from '@/components/ui/LinkedText';
import { JURISDICTIONS } from '@/types';
import { TOPIC_META } from '@/data/term-topics';
import type { LicenceRef } from '@/data/use-cases';

/**
 * Renders a single structured licence entry from use-cases.ts as a
 * hierarchical 2-line row ("Option C" layout):
 *
 *   🇫🇷  🪪 DASP
 *         by 🏛️ AMF · under 📜 MiCA · Ripple Labs Ireland · since 2025
 *
 *   ─────────────────────────────
 *   Hierarchy:
 *     • Licence name  → headline (violet pill, full size)
 *     • Regulator     → muted metadata line (rose pill) prefixed by "by"
 *     • Regime        → muted metadata line (sky pill) prefixed by "under"
 *     • Note          → muted plain italic text
 *     • Since         → muted plain text "since <year>"
 *
 *   Items on the metadata line are joined by "·" separators and flex-wrap
 *   on narrow viewports. The whole row stays compact when only `name` is
 *   set (falls back to a single-line pill).
 */

function Pill({
  topic,
  label,
  size,
}: {
  topic: 'licence' | 'regulator' | 'regime';
  label: string;
  size: 'sm' | 'xs';
}) {
  const meta = TOPIC_META[topic];
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-semibold ${sizeClass} ${meta.pillClass}`}
    >
      <span className="leading-none">{meta.icon}</span>
      <LinkedText>{label}</LinkedText>
    </span>
  );
}

export default function LicenceRow({
  entry,
  compact = false,
}: {
  entry: LicenceRef;
  /** Compact = mobile / dense layout. Uses smaller pill size. */
  compact?: boolean;
}) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const jurMeta = JURISDICTIONS[entry.jur];
  const pillSize: 'sm' | 'xs' = compact ? 'xs' : 'sm';

  const byLabel = isFr ? 'par' : 'by';
  const underLabel = isFr ? 'sous' : 'under';
  const sinceLabel = isFr ? 'depuis' : 'since';

  // Build the subordinate metadata segments. Null entries are filtered so
  // the dot-separator logic stays clean.
  const metaSegments: React.ReactNode[] = [];
  if (entry.regulator) {
    metaSegments.push(
      <span key="reg" className="inline-flex items-center gap-1">
        <span>{byLabel}</span>
        <Pill topic="regulator" label={entry.regulator} size="xs" />
      </span>,
    );
  }
  if (entry.regime) {
    metaSegments.push(
      <span key="regime" className="inline-flex items-center gap-1">
        <span>{underLabel}</span>
        <Pill topic="regime" label={entry.regime} size="xs" />
      </span>,
    );
  }
  if (entry.note) {
    metaSegments.push(
      <span key="note" className="italic">
        <LinkedText>{entry.note}</LinkedText>
      </span>,
    );
  }
  if (entry.since) {
    metaSegments.push(
      <span key="since">
        {sinceLabel} {entry.since}
      </span>,
    );
  }

  return (
    <div className="flex items-start gap-2">
      {/* Jurisdiction flag */}
      <span
        className="text-base leading-none flex-shrink-0 mt-0.5"
        title={jurMeta?.name}
        aria-label={jurMeta?.name}
      >
        {jurMeta?.flag}
      </span>

      <div className="flex-1 min-w-0">
        {/* Headline: the licence itself */}
        <div>
          <Pill topic="licence" label={entry.name} size={pillSize} />
        </div>

        {/* Subordinate metadata line (only rendered when we have something) */}
        {metaSegments.length > 0 && (
          <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 leading-snug flex flex-wrap items-center gap-x-2 gap-y-1">
            {metaSegments.map((seg, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span aria-hidden>·</span>}
                {seg}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
