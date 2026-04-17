'use client';

import { useLocale } from 'next-intl';
import { parseRegimeString, REGIME_TYPE_META } from '@/lib/regime-parser';
import type { RegResult } from '@/types';
import LinkedText from '@/components/ui/LinkedText';

interface Props {
  /** The regulation result to render. */
  result: Pick<RegResult, 'regime' | 'regimeItems'>;
  /** Layout variant: "inline" for tight contexts (table cell), "block" for card view. */
  variant?: 'inline' | 'block';
}

/**
 * Renders the regime field with semantic badges per item type
 * (📜 Law / 🪪 Licence framework / ⚖️ Ruling / 📋 Guidance).
 *
 * Prefers `regimeItems` if present; falls back to parsing `regime` string.
 */
export default function RegimeDisplay({ result, variant = 'block' }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const items = result.regimeItems ?? parseRegimeString(result.regime);

  if (items.length === 0) {
    return <span className="font-semibold"><LinkedText>{result.regime}</LinkedText></span>;
  }

  const wrapperClass =
    variant === 'inline'
      ? 'flex flex-wrap items-center gap-1.5'
      : 'flex flex-wrap items-center gap-2';

  return (
    <div className={wrapperClass}>
      {items.map((it, i) => {
        const meta = REGIME_TYPE_META[it.type];
        const typeLabel = isFr ? meta.labelFr : meta.labelEn;
        const tooltip = it.note ? `${typeLabel} · ${it.note}` : typeLabel;
        return (
          <span
            key={i}
            title={tooltip}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold ${meta.colorClass}`}
          >
            <span className="text-sm leading-none">{meta.icon}</span>
            <LinkedText className="font-semibold">{it.name}</LinkedText>
            {it.note && (
              <span className="text-[10px] font-normal opacity-75">· {it.note}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
