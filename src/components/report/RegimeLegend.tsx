'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
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
        trigger: 'Comprendre le rapport — types de champs',
        intro: 'Chaque rapport distingue clairement 4 types de champs, issus du framework à 3 zones :',
        lawLabel: 'Loi / Régulation',
        lawDesc: 'Le texte légal qui fonde tout le dispositif. Ex : MiCA (règlement UE 2023/1114), GENIUS Act (loi fédérale US 2025), TVTG (loi Liechtenstein 2020). Peu ou pas de choix côté startup — ça s\'impose.',
        licLabel: 'Cadre de licence',
        licDesc: 'Le type d\'agrément concret que vous devez obtenir. Ex : CASP (sous MiCA), MTL (State par State US), BitLicense (NY uniquement), VASP (GAFI / Dubai).',
        ruleLabel: 'Doctrine',
        ruleSubtitle: 'Tests juridiques, jurisprudence, interprétations',
        ruleDesc: 'Tests juridiques et jurisprudence qui interprètent ou précisent la loi. Ex : Test de Howey (1946), SEC v. Ripple (2023).',
        authLabel: 'Autorité',
        authDesc: 'Le régulateur qui supervise et délivre la licence. Ex : AMF/ESMA (UE), SEC/CFTC/FinCEN (US), VARA (Dubaï), MAS (Singapour).',
      }
    : {
        trigger: 'Understand the report — field types',
        intro: 'Every report clearly separates 4 field types, from our 3-zone framework:',
        lawLabel: 'Law / Regulation',
        lawDesc: "The legal text that grounds the whole framework. E.g. MiCA (EU Regulation 2023/1114), GENIUS Act (US federal law 2025), TVTG (Liechtenstein 2020). Little choice for the startup — it just applies.",
        licLabel: 'Licence framework',
        licDesc: "The concrete authorization you must obtain. E.g. CASP (under MiCA), MTL (state-by-state US), BitLicense (NY only), VASP (FATF / Dubai).",
        ruleLabel: 'Doctrine',
        ruleSubtitle: 'Legal tests, case law, interpretive rulings',
        ruleDesc: 'Legal tests and case law that interpret or clarify the statute. E.g. Howey Test (1946), SEC v. Ripple (2023).',
        authLabel: 'Authority',
        authDesc: 'The regulator who supervises and issues the licence. E.g. AMF/ESMA (EU), SEC/CFTC/FinCEN (US), VARA (Dubai), MAS (Singapore).',
      };

  // Each field maps to a zone in our 3-zone framework:
  //   Zone A (INPUTS) — not shown here (none of these 4 fields are inputs)
  //   Zone B (OUTPUTS) — Licence framework (the actionable one)
  //   Zone C (CONTEXT) — Law, Doctrine, Authority
  // Rows are ordered A → B → C (so Zone B shows first, then all Zone C items).
  const rows: Array<{ key: RegimeItemType | 'authority'; label: string; desc: string; zone: 'B' | 'C' }> = [
    { key: 'licence-framework', label: tr.licLabel, desc: tr.licDesc, zone: 'B' },
    { key: 'law', label: tr.lawLabel, desc: tr.lawDesc, zone: 'C' },
    { key: 'ruling', label: tr.ruleLabel, desc: tr.ruleDesc, zone: 'C' },
    { key: 'authority', label: tr.authLabel, desc: tr.authDesc, zone: 'C' },
  ];

  // Zone badge styling — same palette as the home-page 3-zone section.
  // Two-line pill displayed top-right of each card: 'Zone B' / 'OUTPUT' etc.
  const zoneBadge = (zone: 'B' | 'C') => {
    if (zone === 'B') {
      return {
        class: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
        lineA: 'Zone B',
        lineB: 'OUTPUT',
      };
    }
    return {
      class: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
      lineA: 'Zone C',
      lineB: 'CONTEXT',
    };
  };

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
              const isDoctrine = r.key === 'ruling';
              const meta = isAuthority ? null : REGIME_TYPE_META[r.key as RegimeItemType];
              const icon = isAuthority ? '🏛️' : meta!.icon;
              const colorClass = isAuthority
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                : meta!.colorClass;
              const zb = zoneBadge(r.zone);
              return (
                <div
                  key={r.key}
                  className="relative p-3 pr-16 rounded-lg border border-[var(--border)] bg-[var(--card)] h-full flex flex-col"
                >
                  {/* Zone badge pinned top-right, 2 lines: 'Zone X' / 'KIND' */}
                  <span
                    className={`absolute top-2 right-2 inline-flex flex-col items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider leading-tight ${zb.class}`}
                  >
                    <span>{zb.lineA}</span>
                    <span>{zb.lineB}</span>
                  </span>

                  {/* Concept pill on its own line */}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold ${colorClass} w-fit mb-1`}>
                    <span className="text-sm leading-none">{icon}</span>
                    <span>{r.label}</span>
                  </span>
                  {isDoctrine && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 italic mb-1">
                      {tr.ruleSubtitle}
                    </p>
                  )}
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
          {/* Footer link pointing users to the canonical teaching page */}
          <div className="mt-3 pt-3 border-t border-[var(--border)] text-xs text-gray-500 dark:text-gray-400">
            <Link
              href="/understand/concepts"
              className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isFr
                ? 'Voir tous les 7 concepts en détail → /understand/concepts'
                : 'See all 7 concepts in detail → /understand/concepts'}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
