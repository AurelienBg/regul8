'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { REGIME_TYPE_META } from '@/lib/regime-parser';
import type { RegimeItemType } from '@/types';

interface RegimeLegendProps {
  /** Whether the legend starts open. Defaults to true on /report, false on /compare. */
  defaultOpen?: boolean;
}

/**
 * Collapsible legend that explains the difference between Law / Licence
 * framework / Ruling / Authority. Helps users who are confused by seeing
 * laws and licence frameworks mixed in the Regime field.
 */
export default function RegimeLegend({ defaultOpen = true }: RegimeLegendProps) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [open, setOpen] = useState(defaultOpen);

  const tr = isFr
    ? {
        trigger: 'Comprendre le rapport — Régime vs Licence vs Autorité',
        intro: 'Chaque rapport distingue clairement 4 natures différentes :',
        lawLabel: 'Loi / Régulation',
        lawDesc: 'Le texte légal qui fonde tout le dispositif. Ex : MiCA (règlement UE 2023/1114), GENIUS Act (loi fédérale US 2025), TVTG (loi Liechtenstein 2020). Peu ou pas de choix côté startup — ça s\'impose.',
        licLabel: 'Cadre de licence',
        licDesc: 'Le type d\'agrément concret que vous devez obtenir. Ex : CASP (sous MiCA), MTL (State par State US), BitLicense (NY uniquement), VASP (GAFI / Dubai).',
        ruleLabel: 'Décision de justice',
        ruleDesc: 'Jurisprudence qui interprète ou précise la loi. Ex : Howey Test (1946), SEC v. Ripple (2023).',
        authLabel: 'Autorité',
        authDesc: 'Le régulateur qui supervise et délivre la licence. Ex : AMF/ESMA (UE), SEC/CFTC/FinCEN (US), VARA (Dubaï), MAS (Singapour).',
      }
    : {
        trigger: 'Understand the report — Regime vs Licence vs Authority',
        intro: 'Every report clearly separates 4 distinct concepts:',
        lawLabel: 'Law / Regulation',
        lawDesc: "The legal text that grounds the whole framework. E.g. MiCA (EU Regulation 2023/1114), GENIUS Act (US federal law 2025), TVTG (Liechtenstein 2020). Little choice for the startup — it just applies.",
        licLabel: 'Licence framework',
        licDesc: "The concrete authorization you must obtain. E.g. CASP (under MiCA), MTL (state-by-state US), BitLicense (NY only), VASP (FATF / Dubai).",
        ruleLabel: 'Court ruling',
        ruleDesc: 'Case law that interprets or clarifies the statute. E.g. Howey Test (1946), SEC v. Ripple (2023).',
        authLabel: 'Authority',
        authDesc: 'The regulator who supervises and issues the licence. E.g. AMF/ESMA (EU), SEC/CFTC/FinCEN (US), VARA (Dubai), MAS (Singapore).',
      };

  const rows: Array<{ key: RegimeItemType | 'authority'; label: string; desc: string }> = [
    { key: 'law', label: tr.lawLabel, desc: tr.lawDesc },
    { key: 'licence-framework', label: tr.licLabel, desc: tr.licDesc },
    { key: 'ruling', label: tr.ruleLabel, desc: tr.ruleDesc },
    { key: 'authority', label: tr.authLabel, desc: tr.authDesc },
  ];

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-gray-50 dark:bg-gray-900/50 no-print">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
      >
        <span className="flex items-center gap-2">
          <span>💡</span>
          <span>{tr.trigger}</span>
        </span>
        <span
          aria-hidden="true"
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-[var(--border)]">
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 mb-3">{tr.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {rows.map((r) => {
              const isAuthority = r.key === 'authority';
              const meta = isAuthority ? null : REGIME_TYPE_META[r.key as RegimeItemType];
              const icon = isAuthority ? '🏛️' : meta!.icon;
              const colorClass = isAuthority
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                : meta!.colorClass;
              return (
                <div
                  key={r.key}
                  className="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] h-full flex flex-col"
                >
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold ${colorClass} mb-2 w-fit`}>
                    <span className="text-sm leading-none">{icon}</span>
                    <span>{r.label}</span>
                  </span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
