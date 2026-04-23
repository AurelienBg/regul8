'use client';

import { useLocale } from 'next-intl';
import { parseMixedString, REGIME_TYPE_META } from '@/lib/regime-parser';
import LinkedText from '@/components/ui/LinkedText';
import type { RegimeItemType } from '@/types';

/**
 * Renders a regulatory string (licence, authority, etc.) as a row of
 * semantic pills — one per recognised keyword. Cross-cutting component
 * used for 'Licences Required' and 'Regulator' rows where the data often
 * mixes licences with their issuing regulators (e.g., "CASP authorization
 * (ESMA/NCA)" → 🪪 CASP · 🏛️ ESMA · 🏛️ NCA).
 *
 * Pass `filterTypes` to keep only pills of given types. That way the
 * LICENCES REQUIRED row can filter to `['licence-framework']` so regulator
 * and regime pills don't bleed into a row labelled as licences. If the
 * filter empties the result, falls back to the raw string as LinkedText so
 * non-pill context (e.g. "Capital min. €150K") still renders.
 */
export default function LicencePillsDisplay({
  value,
  size = 'sm',
  filterTypes,
}: {
  value: string;
  size?: 'xs' | 'sm';
  filterTypes?: RegimeItemType[];
}) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  if (!value) return null;

  const allItems = parseMixedString(value);
  const items = filterTypes
    ? allItems.filter((it) => filterTypes.includes(it.type))
    : allItems;

  const wrapperClass = 'inline-flex items-center gap-1 flex-wrap';
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';

  // Filter emptied everything (or unrecognised single 'other') — fall back to
  // the raw string, LinkedText-wrapped so glossary terms still get tooltips.
  if (items.length === 0 || (items.length === 1 && items[0].type === 'other')) {
    return <LinkedText>{items[0]?.name ?? value}</LinkedText>;
  }

  return (
    <span className={wrapperClass}>
      {items.map((it, i) => {
        const meta = REGIME_TYPE_META[it.type];
        const typeLabel = isFr ? meta.labelFr : meta.labelEn;
        return (
          <span
            key={i}
            title={typeLabel}
            className={`inline-flex items-center gap-1 ${sizeClass} rounded-md border font-semibold ${meta.colorClass}`}
          >
            <span className="leading-none">{meta.icon}</span>
            <LinkedText>{it.name}</LinkedText>
          </span>
        );
      })}
    </span>
  );
}
