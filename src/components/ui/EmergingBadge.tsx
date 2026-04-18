'use client';

import { useLocale } from 'next-intl';
import { JURISDICTIONS, type Jurisdiction } from '@/types';

/**
 * Displays a small "Emerging market" pill when a jurisdiction is flagged
 * with tier: 'emerging'. Used in /report and /compare to signal that the
 * underlying regulation is newer and evolving faster than established
 * markets.
 */
export default function EmergingBadge({ code }: { code: Jurisdiction }) {
  const locale = useLocale();
  const meta = JURISDICTIONS[code];
  if (!meta?.tier || meta.tier !== 'emerging') return null;

  const label = locale === 'fr' ? 'Marché émergent' : 'Emerging market';
  const tooltip = locale === 'fr'
    ? "Cadre réglementaire en construction. Les règles évoluent vite — vérifiez la date de mise à jour."
    : 'Evolving regulatory framework. Rules move quickly — check the latest update date.';

  return (
    <span
      title={tooltip}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200 border border-orange-300 dark:border-orange-800"
    >
      ⚠️ {label}
    </span>
  );
}
