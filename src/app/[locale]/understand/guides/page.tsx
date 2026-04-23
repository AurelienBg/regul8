'use client';

import { useCallback, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LEARNING_PATHS } from '@/data/learning-paths';
import { LEARNING_PATHS_FR } from '@/data/learning-paths.fr';
import { JURISDICTIONS, type Jurisdiction } from '@/types';
import XRPLMark from '@/components/ui/XRPLMark';

const levelStyles: Record<string, string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
  intermediate: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
  advanced: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200',
};

const levelLabels: Record<string, { en: string; fr: string }> = {
  beginner: { en: 'Beginner', fr: 'Débutant' },
  intermediate: { en: 'Intermediate', fr: 'Intermédiaire' },
  advanced: { en: 'Advanced', fr: 'Avancé' },
};

/**
 * Filter keys that can be toggled. Jurisdictions are prefixed to avoid
 * collisions with potential future filter axes. 'xrpl' is a cross-cut
 * (different axis from juri/level) but lives in the same active-set for
 * a single OR-combined filter behaviour.
 */
type Level = 'beginner' | 'intermediate' | 'advanced';
type ActiveKey = `juri:${Jurisdiction}` | `level:${Level}` | 'xrpl';

export default function LearningPathsListPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const paths = isFr ? LEARNING_PATHS_FR : LEARNING_PATHS;

  // Multi-select + toggle-on-reclick, same pattern as /understand/usecases.
  // Semantics: empty set = show everything; non-empty set = OR across keys
  // (match-any). Three filter axes coexist in the same set — a guide is
  // shown if at least one active key matches it.
  const [active, setActive] = useState<Set<ActiveKey>>(() => new Set());

  const toggle = useCallback((key: ActiveKey | 'all') => {
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

  // Build the list of juri chips — only show jurisdictions that actually
  // appear in at least one guide, sorted by their declared locale name.
  // Keeps the bar compact: e.g. no chip for JP if no guide covers JP.
  const juriChipsInUse = useMemo(() => {
    const set = new Set<Jurisdiction>();
    paths.forEach((p) => p.jurisdictions?.forEach((j) => set.add(j)));
    return Array.from(set).sort((a, b) =>
      JURISDICTIONS[a].name.localeCompare(JURISDICTIONS[b].name, locale),
    );
  }, [paths, locale]);

  // Levels in the data today: skip 'advanced' if no guide uses it yet.
  const levelChipsInUse = useMemo<Level[]>(
    () =>
      (['beginner', 'intermediate', 'advanced'] as Level[]).filter((lv) =>
        paths.some((p) => p.level === lv),
      ),
    [paths],
  );

  // Apply filter. OR semantics: a guide is kept if ANY active key matches.
  const filtered = useMemo(() => {
    if (active.size === 0) return paths;
    const keys = Array.from(active);
    return paths.filter((p) =>
      keys.some((k) => {
        if (k === 'xrpl') return Boolean(p.xrpl);
        if (k.startsWith('juri:')) {
          const j = k.slice(5) as Jurisdiction;
          return Boolean(p.jurisdictions?.includes(j));
        }
        if (k.startsWith('level:')) {
          return p.level === k.slice(6);
        }
        return false;
      }),
    );
  }, [active, paths]);

  const tr = isFr
    ? {
        back: 'Comprendre',
        title: 'Guides',
        subtitle: 'Lectures guidées sur les cadres réglementaires clés. Chaque guide est une plongée ciblée de 6 à 10 min.',
        read: 'Lire',
        more: 'Prochainement : Singapore MAS Deep-Dive, FATF Recommendations primer, Hong Kong SFC VATP.',
        filterByJuri: 'Juridiction',
        filterByLevel: 'Niveau',
        filterXrpl: 'XRPL',
        xrplLabel: 'Écosystème XRPL',
        all: 'Tous',
        noResults: 'Aucun guide ne correspond à ces filtres.',
      }
    : {
        back: 'Understand',
        title: 'Guides',
        subtitle: 'Curated reads on the core regulatory frameworks. Each guide is a focused 6-10 min read.',
        read: 'Read',
        more: 'Coming soon: Singapore MAS Deep-Dive, FATF Recommendations primer, Hong Kong SFC VATP.',
        filterByJuri: 'Jurisdiction',
        filterByLevel: 'Level',
        filterXrpl: 'XRPL',
        xrplLabel: 'XRPL ecosystem',
        all: 'All',
        noResults: 'No guide matches these filters.',
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">📚</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {tr.subtitle}
        </p>
      </header>

      {/* Filters — 3 axes on one block, multi-select + toggle-on-reclick. */}
      <div className="mb-6 space-y-3">
        {/* Row 1 — Jurisdictions */}
        <div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            🌍 {tr.filterByJuri}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => toggle('all')}
              aria-pressed={active.size === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                active.size === 0
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
              }`}
            >
              {tr.all}
            </button>
            {juriChipsInUse.map((j) => {
              const k: ActiveKey = `juri:${j}`;
              const isActive = active.has(k);
              return (
                <button
                  key={k}
                  onClick={() => toggle(k)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                  }`}
                >
                  <span>{JURISDICTIONS[j].flag}</span>
                  <span>{JURISDICTIONS[j].name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2 — Level + XRPL cross-cut (same row for compactness) */}
        <div className="flex gap-6 flex-wrap">
          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              📚 {tr.filterByLevel}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {levelChipsInUse.map((lv) => {
                const k: ActiveKey = `level:${lv}`;
                const isActive = active.has(k);
                return (
                  <button
                    key={k}
                    onClick={() => toggle(k)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                      isActive
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${levelStyles[lv].split(' ')[0].replace('bg-', 'bg-')}`} />
                    {isFr ? levelLabels[lv].fr : levelLabels[lv].en}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {tr.filterXrpl}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button
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
        </div>
      </div>

      {/* Grid of guide cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">{tr.noResults}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/understand/guides/${p.id}`}
              className="card hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{p.icon}</div>
                <div className="flex items-center gap-1.5">
                  {p.xrpl && (
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-xrpl-50 text-xrpl-700 dark:bg-xrpl/20 dark:text-xrpl-100 text-[10px] font-semibold"
                      title={tr.xrplLabel}
                    >
                      <XRPLMark className="w-3 h-3" />
                      <span>XRPL</span>
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ${levelStyles[p.level]}`}>
                    {isFr ? levelLabels[p.level].fr : levelLabels[p.level].en}
                  </span>
                </div>
              </div>
              <h2 className="font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {p.title}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{p.subtitle}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {p.jurisdictions?.map((j) => (
                    <span key={j} className="text-lg" title={JURISDICTIONS[j].name}>
                      {JURISDICTIONS[j].flag}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">· {p.duration}</span>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {tr.read} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)] text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tr.more}
        </p>
      </div>
    </div>
  );
}
