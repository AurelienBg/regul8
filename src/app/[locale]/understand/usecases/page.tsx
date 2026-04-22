'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { USE_CASES, USE_CASE_TAGS, type UseCaseTag } from '@/data/use-cases';
import { JURISDICTIONS } from '@/types';
import LinkedText from '@/components/ui/LinkedText';

export default function UseCasesPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [tag, setTag] = useState<UseCaseTag | 'all'>('all');

  const filtered = useMemo(
    () => (tag === 'all' ? USE_CASES : USE_CASES.filter((c) => c.tag === tag)),
    [tag],
  );

  const tr = isFr
    ? {
        back: 'Comprendre',
        title: "Cas d'usage",
        subtitle: "Entreprises crypto qui ont réussi leur mise en conformité. Leur use case et leurs licences par juridiction.",
        filterBy: 'Filtrer par type',
        company: 'Entreprise',
        useCase: "Cas d'usage",
        licences: 'Licences par juridiction',
        since: 'Depuis',
        disclaimer: "Informations publiques compilées à titre pédagogique. Ne constitue pas un conseil juridique ni une recommandation d'investissement.",
      }
    : {
        back: 'Understand',
        title: 'Use Cases',
        subtitle: 'Crypto companies that nailed their compliance. Their use case and licences per jurisdiction.',
        filterBy: 'Filter by type',
        company: 'Company',
        useCase: 'Use case',
        licences: 'Licences by jurisdiction',
        since: 'Since',
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

      {/* Filter chips */}
      <div className="mb-6">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{tr.filterBy}</div>
        <div className="flex gap-1.5 flex-wrap">
          {USE_CASE_TAGS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTag(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                tag === t.key
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
              }`}
            >
              {t.icon && <span>{t.icon}</span>}
              {isFr ? t.labelFr : t.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left p-3 border-b border-[var(--border)] font-semibold">{tr.company}</th>
              <th className="text-left p-3 border-b border-[var(--border)] font-semibold">{tr.useCase}</th>
              <th className="text-left p-3 border-b border-[var(--border)] font-semibold">{tr.licences}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-900/30">
                <td className="p-3 align-top">
                  <div className="flex items-center gap-2">
                    {c.logo && <span className="text-lg">{c.logo}</span>}
                    {c.website ? (
                      <a href={c.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        {c.company}
                      </a>
                    ) : (
                      <span className="font-semibold">{c.company}</span>
                    )}
                  </div>
                  {c.since && <div className="text-xs text-gray-500 mt-0.5">{tr.since} {c.since}</div>}
                </td>
                <td className="p-3 align-top text-sm text-gray-700 dark:text-gray-300 max-w-md leading-relaxed">
                  <LinkedText>{isFr ? c.useCase.fr : c.useCase.en}</LinkedText>
                </td>
                <td className="p-3 align-top">
                  <ul className="space-y-1.5">
                    {c.licences.map((l, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-base leading-none flex-shrink-0" title={JURISDICTIONS[l.jur]?.name}>
                          {JURISDICTIONS[l.jur]?.flag}
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200">
                          <LinkedText>{l.name}</LinkedText>
                        </span>
                      </li>
                    ))}
                  </ul>
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
            <div className="flex items-center gap-2 mb-2">
              {c.logo && <span className="text-xl">{c.logo}</span>}
              {c.website ? (
                <a href={c.website} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  {c.company}
                </a>
              ) : (
                <span className="font-bold">{c.company}</span>
              )}
              {c.since && <span className="text-xs text-gray-500 ml-auto">{tr.since} {c.since}</span>}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              <LinkedText>{isFr ? c.useCase.fr : c.useCase.en}</LinkedText>
            </p>
            <ul className="space-y-1.5">
              {c.licences.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-base leading-none flex-shrink-0">
                    {JURISDICTIONS[l.jur]?.flag}
                  </span>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200">
                    <LinkedText>{l.name}</LinkedText>
                  </span>
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
