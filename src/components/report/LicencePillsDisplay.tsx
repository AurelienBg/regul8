'use client';

import { useLocale } from 'next-intl';
import { parseMixedString, REGIME_TYPE_META } from '@/lib/regime-parser';
import LinkedText from '@/components/ui/LinkedText';

/**
 * Renders a regulatory string (licence, authority, etc.) as a row of
 * semantic pills — one per recognised keyword. Cross-cutting component
 * used for 'Licences Required' and 'Authority' rows where the data often
 * mixes licences with their issuing regulators (e.g., "CASP authorization
 * (ESMA/NCA)" → 🪪 CASP · 🏛️ ESMA · 🏛️ NCA).
 *
 * If no keyword is recognised, shows the raw string (wrapped in LinkedText
 * so any glossary terms inside still get auto-linked).
 */
export default function LicencePillsDisplay({
  value,
  size = 'sm',
}: {
  value: string;
  size?: 'xs' | 'sm';
}) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  if (!value) return null;

  const items = parseMixedString(value);
  const wrapperClass = 'inline-flex items-center gap-1 flex-wrap';
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';

  // Unrecognised single-item 'other' — render plain LinkedText
  if (items.length === 1 && items[0].type === 'other') {
    return <LinkedText>{items[0].name}</LinkedText>;
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
