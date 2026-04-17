'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LEARNING_PATHS } from '@/data/learning-paths';
import { LEARNING_PATHS_FR } from '@/data/learning-paths.fr';
import { JURISDICTIONS } from '@/types';

const levelStyles: Record<string, string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
  intermediate: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
  advanced: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200',
};

const levelLabels: Record<string, { en: string; fr: string }> = {
  beginner: { en: 'beginner', fr: 'débutant' },
  intermediate: { en: 'intermediate', fr: 'intermédiaire' },
  advanced: { en: 'advanced', fr: 'avancé' },
};

export default function LearningPathsListPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const paths = isFr ? LEARNING_PATHS_FR : LEARNING_PATHS;
  const tr = isFr ? {
    back: 'Apprendre',
    title: "Parcours d'apprentissage",
    subtitle: 'Lectures guidées sur les cadres réglementaires clés. Chaque parcours est une plongée ciblée de 6 à 10 min.',
    read: 'Lire',
    more: "Prochainement : parcours Liechtenstein Fast Track, US Crypto 101, Frameworks Stablecoin.",
  } : {
    back: 'Learn',
    title: 'Learning Paths',
    subtitle: 'Curated reads on the core regulatory frameworks. Each path is a focused 6-10 min dive.',
    read: 'Read',
    more: 'More paths coming soon: Liechtenstein Fast Track, US Crypto 101, Stablecoin Frameworks.',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/learn" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; {tr.back}
        </Link>
      </div>
      <header className="text-center mb-12">
        <div className="text-5xl mb-4">📚</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {tr.subtitle}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {paths.map((p) => (
          <Link
            key={p.id}
            href={`/learn/paths/${p.id}`}
            className="card hover:border-blue-500 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{p.icon}</div>
              <span className={`px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide ${levelStyles[p.level]}`}>
                {isFr ? levelLabels[p.level].fr : levelLabels[p.level].en}
              </span>
            </div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {p.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{p.subtitle}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
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

      <div className="mt-12 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)] text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tr.more}
        </p>
      </div>
    </div>
  );
}
