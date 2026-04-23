'use client';

import { useLocale } from 'next-intl';
import { parseRegimeString, REGIME_TYPE_META } from '@/lib/regime-parser';
import type { RegResult, RegimeItemType } from '@/types';
import LinkedText from '@/components/ui/LinkedText';

interface Props {
  /** The regulation result to render. */
  result: Pick<RegResult, 'regime' | 'regimeItems'>;
  /** Layout variant: "inline" for tight contexts (table cell), "block" for card view. */
  variant?: 'inline' | 'block';
  /**
   * Types to hide from the rendered output. Use `['licence-framework']` on the
   * 'Applicable Regime' row of /report and /compare — licences are already
   * surfaced on the 'Licences Required' row below, so we don't want them
   * duplicated here. Defaults to empty = show everything.
   */
  excludeTypes?: RegimeItemType[];
}

/**
 * Renders the regime field with semantic badges per item type
 * (📜 Law / 🪪 Licence framework / 💡 Doctrine / 📋 Guidance).
 *
 * Prefers `regimeItems` if present; falls back to parsing `regime` string.
 * When `excludeTypes` is set, items matching those types are filtered out.
 */
export default function RegimeDisplay({ result, variant = 'block', excludeTypes }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const rawItems = result.regimeItems ?? parseRegimeString(result.regime);
  const items = excludeTypes && excludeTypes.length > 0
    ? rawItems.filter((it) => !excludeTypes.includes(it.type))
    : rawItems;

  if (items.length === 0) {
    // Fallback: if every item was filtered out and the raw list was non-empty,
    // we still want to show SOMETHING meaningful. If the original raw list was
    // empty we fall back to the regime string as before.
    if (rawItems.length > 0) return null; // all filtered — nothing to show in this row
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
