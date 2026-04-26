import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TOPICS, TOPIC_ORDER } from '@/data/topics';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Sujets — naviguer par concept réglementaire | Regul8'
      : 'Topics — browse by regulatory concept | Regul8',
    description: isFr
      ? "8 pages thématiques rassemblant guides, diagnostics, glossaire et cas d'usage pour chaque concept réglementaire crypto : juridiction, licence, régime, régulateur, obligation, type de token, infrastructure, doctrine."
      : '8 thematic landing pages bundling guides, diagnostics, glossary and use cases for each crypto regulatory concept: jurisdiction, licence, regime, regulator, obligation, token type, infrastructure, doctrine.',
  };
}

export default async function TopicsHubPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'Sujets',
        subtitle:
          "Naviguez par concept réglementaire. Chaque sujet rassemble les guides, diagnostics, termes du glossaire, cas d'usage et diagrammes pertinents — un point d'entrée parallèle à la nav action-led (Évaluer / Comparer / Apprendre).",
        explore: 'Explorer',
      }
    : {
        title: 'Topics',
        subtitle:
          'Browse by regulatory concept. Each topic bundles the guides, quick checks, glossary terms, use cases and diagrams that pertain to it — a parallel entry point to the action-led nav (Assess / Compare / Learn).',
        explore: 'Explore',
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">🗂️</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {tr.subtitle}
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOPIC_ORDER.map((key) => {
          const t = TOPICS[key];
          return (
            <Link
              key={key}
              href={`/learn/topics/${key}` as `/learn/topics/${typeof key}`}
              className={`group block p-5 rounded-xl border-2 ${t.accentBorder} ${t.accentBg} hover:shadow-md transition-all`}
            >
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold mb-3 ${t.pillClass}`}
              >
                <span>{t.icon}</span>
                <span className="capitalize">{key}</span>
              </span>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug mb-3 min-h-[2.5rem]">
                {isFr ? t.shortFr : t.shortEn}
              </p>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {tr.explore} &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
