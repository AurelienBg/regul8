'use client';

import { useState, useMemo, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { USE_CASES, USE_CASE_TAGS, type UseCaseTag } from '@/data/use-cases';
import LinkedText from '@/components/ui/LinkedText';
import LicenceRow from '@/components/report/LicenceRow';
import LicencePair from '@/components/report/LicencePair';
import XRPLMark from '@/components/ui/XRPLMark';

/** Keys that can be toggled ON in the active-filters set. 'all' is NOT a
 *  member — it's just the implicit default state (empty set). */
type ActiveKey = UseCaseTag | 'xrpl';

export default function UseCasesPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  // Multi-select filters + toggle-on-reclick. Semantics:
  //   · Empty set         → show everything (same as old 'all')
  //   · Non-empty set     → OR across all keys (union)
  //   · 'all' button      → clears the set (reset)
  //   · Other button      → toggles its key in/out of the set
  // XRPL coexists with tag keys — it's OR'd in too, not an AND intersection,
  // so the behaviour matches a classic tag filter: "give me exchanges or
  // stablecoins or XRPL-related".
  const [active, setActive] = useState<Set<ActiveKey>>(() => new Set());

  const toggle = useCallback((key: UseCaseTag | 'all' | 'xrpl') => {
    if (key === 'all') {
      setActive(new Set());
      return;
    }
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    if (active.size === 0) return USE_CASES;
    // Array.from avoids the --downlevelIteration requirement on the Set
    // iterator. Matches tsconfig target es5.
    const keys = Array.from(active);
    return USE_CASES.filter((c) =>
      keys.some((f) => (f === 'xrpl' ? Boolean(c.xrpl) : c.tag === f)),
    );
  }, [active]);

  const tr = isFr
    ? {
        back: 'Comprendre',
        title: "Cas d'usage",
        subtitle: "Entreprises crypto qui ont réussi leur mise en conformité. Leur use case et leurs licences par juridiction.",
        filterBy: 'Filtrer par type',
        company: 'Entreprise',
        useCase: "Cas d'usage",
        licences: '🪪 Licences',
        regulator: '🏛️ Régulateur / Régime',
        since: 'Depuis',
        xrplLabel: 'Écosystème XRPL',
        disclaimer: "Informations publiques compilées à titre pédagogique. Ne constitue pas un conseil juridique ni une recommandation d'investissement.",
      }
    : {
        back: 'Understand',
        title: 'Use Cases',
        subtitle: 'Crypto companies that nailed their compliance. Their use case and licences per jurisdiction.',
        filterBy: 'Filter by type',
        company: 'Company',
        useCase: 'Use case',
        licences: '🪪 Licences',
        regulator: '🏛️ Regulator / Regime',
        since: 'Since',
        xrplLabel: 'XRPL ecosystem',
        disclaimer: 'Public information compiled for educational purposes. Does not constitute legal advice or an investment recommendation.',
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">🏢</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {tr.subtitle}
        </p>
      </header>

      {/* Filter chips — multi-select + toggle-on-reclick. The 'All' chip is
          active when no other filter is on; other chips toggle their key
          in / out of the active set. XRPL is a separate chip with its own
          brand colour because it's a cross-cut, not a tag. */}
      <div className="mb-6">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{tr.filterBy}</div>
        <div className="flex gap-1.5 flex-wrap">
          {USE_CASE_TAGS.map((t) => {
            const isActive = t.key === 'all' ? active.size === 0 : active.has(t.key);
            return (
              <button
                key={t.key}
                onClick={() => toggle(t.key)}
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                }`}
              >
                {t.icon && <span>{t.icon}</span>}
                {isFr ? t.labelFr : t.labelEn}
              </button>
            );
          })}
          {/* XRPL filter chip — separated from the tag chips by styling
              (XRPL logo instead of emoji) because it's a different axis. */}
          <button
            key="xrpl"
            onClick={() => toggle('xrpl')}
            aria-pressed={active.has('xrpl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
              active.has('xrpl')
                ? 'bg-xrpl text-white border-xrpl'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-xrpl'
            }`}
          >
            <XRPLMark className="w-3.5 h-3.5" />
            <span>{tr.xrplLabel}</span>
          </button>
        </div>
      </div>

      {/* Desktop table — 4 columns: Company | Use case | 🪪 Licences |
          🏛️ Regulator / Regime. The last two are a single colSpan={2} cell
          that hosts a 2-column sub-grid (LicencePair) so the licence and
          its paired regulator/regime are always on the same sub-row. */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[34%]" />
            <col className="w-[21%]" />
            <col className="w-[27%]" />
          </colgroup>
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left p-3 border-b border-[var(--border)] font-semibold">{tr.company}</th>
              <th className="text-left p-3 border-b border-[var(--border)] font-semibold">{tr.useCase}</th>
              <th className="text-left p-3 border-b border-[var(--border)] font-semibold">{tr.licences}</th>
              <th className="text-left p-3 border-b border-[var(--border)] font-semibold">{tr.regulator}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-900/30">
                <td className="p-3 align-top">
                  <div className="flex items-center gap-2 flex-wrap">
                    {c.logo && <span className="text-lg">{c.logo}</span>}
                    {c.website ? (
                      <a href={c.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        {c.company}
                      </a>
                    ) : (
                      <span className="font-semibold">{c.company}</span>
                    )}
                    {c.xrpl && (
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-xrpl-50 text-xrpl-700 dark:bg-xrpl/20 dark:text-xrpl-100 text-[10px] font-semibold"
                        title={tr.xrplLabel}
                      >
                        <XRPLMark className="w-3 h-3" />
                        <span>XRPL</span>
                      </span>
                    )}
                  </div>
                  {c.since && <div className="text-xs text-gray-500 mt-0.5">{tr.since} {c.since}</div>}
                </td>
                <td className="p-3 align-top text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <LinkedText>{isFr ? c.useCase.fr : c.useCase.en}</LinkedText>
                </td>
                {/* Licence + Regulator cells rendered together via colSpan={2}
                    so CSS grid can row-align the licence and its meta. The
                    sub-grid's column boundary visually matches the header
                    boundary because both use the same 21/27 ≈ 1/1.3 ratio. */}
                <td colSpan={2} className="p-0 align-top">
                  <LicencePair licences={c.licences} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {filtered.map((c) => (
          <div key={c.id} className="card">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {c.logo && <span className="text-xl">{c.logo}</span>}
              {c.website ? (
                <a href={c.website} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  {c.company}
                </a>
              ) : (
                <span className="font-bold">{c.company}</span>
              )}
              {c.xrpl && (
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-xrpl-50 text-xrpl-700 dark:bg-xrpl/20 dark:text-xrpl-100 text-[10px] font-semibold"
                  title={tr.xrplLabel}
                >
                  <XRPLMark className="w-3 h-3" />
                  <span>XRPL</span>
                </span>
              )}
              {c.since && <span className="text-xs text-gray-500 ml-auto">{tr.since} {c.since}</span>}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              <LinkedText>{isFr ? c.useCase.fr : c.useCase.en}</LinkedText>
            </p>
            <ul className="space-y-2.5">
              {c.licences.map((l, i) => (
                <li key={i}>
                  <LicenceRow entry={l} compact />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">No use cases for this filter.</p>
      )}

      <p className="mt-10 text-xs text-gray-500 text-center italic">
        {tr.disclaimer}
      </p>
    </div>
  );
}
