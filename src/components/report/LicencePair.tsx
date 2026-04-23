'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import LinkedText from '@/components/ui/LinkedText';
import { JURISDICTIONS } from '@/types';
import { TOPIC_META } from '@/data/term-topics';
import type { LicenceRef } from '@/data/use-cases';

/**
 * Desktop layout for /understand/usecases — paired 2-column grid:
 *
 *   🪪 LICENCES         | 🏛️ REGULATOR / REGIME
 *   🇫🇷 🪪 DASP         | 🏛️ AMF · 📜 MiCA · since 2023
 *   🇺🇸 🪪 MSB          | 🏛️ FinCEN
 *   🇺🇸 🪪 MTL          | — · ~30 states
 *
 * The two columns are a single CSS grid inside one <td colSpan={2}> cell,
 * so CSS auto-sizing keeps rows aligned between the licence pill and its
 * paired regulator/regime cell no matter how tall either side gets.
 *
 * Notes and since live in the regulator column (default rule from the
 * design review). Rows with no regulator AND no regime render "—" so the
 * visual pairing is explicit.
 */

function Pill({
  topic,
  label,
  size = 'xs',
}: {
  topic: 'licence' | 'regulator' | 'regime';
  label: string;
  size?: 'xs' | 'sm';
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

export default function LicencePair({ licences }: { licences: LicenceRef[] }) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const sinceLabel = isFr ? 'depuis' : 'since';

  if (licences.length === 0) return null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      {licences.map((l, i) => {
        const jurMeta = JURISDICTIONS[l.jur];
        const hasSecondary = Boolean(l.regulator || l.regime);
        const hasMeta = Boolean(l.note || l.since);
        const borderTop = i > 0 ? 'border-t border-[var(--border)]' : '';

        return (
          <React.Fragment key={i}>
            {/* Licence cell (left column) */}
            <div className={`px-3 py-2.5 flex items-start gap-2 ${borderTop}`}>
              <span
                className="text-base leading-none shrink-0 mt-0.5"
                title={jurMeta?.name}
                aria-label={jurMeta?.name}
              >
                {jurMeta?.flag}
              </span>
              <div className="min-w-0 flex-1 flex items-center flex-wrap gap-1.5">
                <Pill topic="licence" label={l.name} size="sm" />
              </div>
            </div>

            {/* Regulator / regime / note / since cell (right column) */}
            <div className={`px-3 py-2.5 flex items-start gap-2 border-l border-[var(--border)] ${borderTop}`}>
              <div className="min-w-0 flex-1 flex flex-wrap items-center gap-1.5">
                {l.regulator && <Pill topic="regulator" label={l.regulator} />}
                {l.regime && <Pill topic="regime" label={l.regime} />}
                {!hasSecondary && <span className="text-gray-400 dark:text-gray-600">—</span>}
                {hasMeta && (
                  <span className="text-[11px] italic text-gray-500 dark:text-gray-400 leading-snug">
                    {l.note && <LinkedText>{l.note}</LinkedText>}
                    {l.note && l.since && <span> · </span>}
                    {l.since && (
                      <span>
                        {sinceLabel} {l.since}
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
