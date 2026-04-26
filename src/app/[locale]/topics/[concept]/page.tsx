import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TOPICS, TOPIC_ORDER, type ConceptKey } from '@/data/topics';
import { getLearningPath } from '@/data/learning-paths';
import { getLearningPathFr } from '@/data/learning-paths.fr';
import { getDecisionTree } from '@/data/decision-trees';
import { getDecisionTreeFr } from '@/data/decision-trees.fr';
import { USE_CASES } from '@/data/use-cases';
import { GLOSSARY_TERMS } from '@/data/glossary';

const isConceptKey = (s: string): s is ConceptKey =>
  TOPIC_ORDER.includes(s as ConceptKey);

export function generateStaticParams() {
  return TOPIC_ORDER.map((concept) => ({ concept }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; concept: string };
}): Promise<Metadata> {
  if (!isConceptKey(params.concept)) return {};
  const t = TOPICS[params.concept];
  const isFr = params.locale === 'fr';
  const titleBase = `${t.icon} ${params.concept[0].toUpperCase() + params.concept.slice(1)}`;
  return {
    title: isFr
      ? `${titleBase} — sujet réglementaire crypto | Regul8`
      : `${titleBase} — crypto regulatory topic | Regul8`,
    description: isFr ? t.shortFr : t.shortEn,
  };
}

export default async function TopicPage({
  params,
}: {
  params: { concept: string };
}) {
  if (!isConceptKey(params.concept)) notFound();
  const concept = params.concept as ConceptKey;
  const t = TOPICS[concept];
  const locale = await getLocale();
  const isFr = locale === 'fr';

  // Resolve guides — try locale-specific first, fall back to EN.
  const guides = t.guideSlugs
    .map((slug) => (isFr ? getLearningPathFr(slug) : getLearningPath(slug)) ?? getLearningPath(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Resolve quick checks (decision trees) — same fallback pattern.
  const checks = t.checkSlugs
    .map((slug) => (isFr ? getDecisionTreeFr(slug) : getDecisionTree(slug)) ?? getDecisionTree(slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  // Use cases tagged with this concept (best-effort match via UseCase tag).
  const useCases = t.useCaseTag
    ? USE_CASES.filter((c) => c.tag === t.useCaseTag).slice(0, 6)
    : [];

  // Curated glossary terms — pick from the example list.
  const exampleTerms = t.exampleTerms.slice(0, 12);
  const allRelatedTerms = GLOSSARY_TERMS.filter((g) =>
    exampleTerms.some((ex) => ex.toLowerCase() === g.term.toLowerCase()),
  );

  const tr = isFr
    ? {
        backHub: 'Tous les sujets',
        introHeading: 'En bref',
        guidesHeading: '📚 Guides',
        guidesEmpty: "Pas encore de guide dédié à ce concept.",
        checksHeading: '🎯 Diagnostic éclair',
        checksEmpty: "Pas encore de diagnostic éclair sur ce concept.",
        glossaryHeading: '🔤 Termes du glossaire',
        glossaryCta: 'Voir tous les termes',
        useCasesHeading: '🏢 Cas d’usage',
        useCasesCta: "Voir les cas d'usage",
        exploreVerb: 'Explorer',
        runVerb: 'Lancer',
        readVerb: 'Lire',
      }
    : {
        backHub: 'All topics',
        introHeading: 'At a glance',
        guidesHeading: '📚 Guides',
        guidesEmpty: 'No dedicated guide on this concept yet.',
        checksHeading: '🎯 Quick diagnostic',
        checksEmpty: 'No quick diagnostic on this concept yet.',
        glossaryHeading: '🔤 Glossary terms',
        glossaryCta: 'See all terms',
        useCasesHeading: '🏢 Use cases',
        useCasesCta: 'See use cases',
        exploreVerb: 'Explore',
        runVerb: 'Run',
        readVerb: 'Read',
      };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Back to hub */}
      <div className="mb-4">
        <Link
          href="/topics"
          className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          &larr; {tr.backHub}
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-[var(--border)]">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-semibold mb-3 ${t.pillClass}`}
        >
          <span>{t.icon}</span>
          <span className="capitalize">{concept}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {isFr ? t.shortFr : t.shortEn}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mt-3">
          {isFr ? t.introFr : t.introEn}
        </p>
      </header>

      {/* Quick diagnostic(s) */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">{tr.checksHeading}</h2>
        {checks.length === 0 ? (
          <p className="text-sm text-gray-500 italic">{tr.checksEmpty}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {checks.map((c) => (
              <Link
                key={c.id}
                href={`/assess/quick/${c.id}` as `/assess/quick/${string}`}
                className="card hover:border-amber-500 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">🎯</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300">
                      {c.title}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {c.description}
                    </p>
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-2 inline-block">
                      {tr.runVerb} &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Guides */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">{tr.guidesHeading}</h2>
        {guides.length === 0 ? (
          <p className="text-sm text-gray-500 italic">{tr.guidesEmpty}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {guides.map((g) => (
              <Link
                key={g.id}
                href={`/learn/guides/${g.id}` as `/learn/guides/${string}`}
                className="card hover:border-blue-500 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{g.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      {g.title}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {g.subtitle}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 inline-block">{g.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Glossary terms */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">{tr.glossaryHeading}</h2>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {allRelatedTerms.length > 0 ? (
            allRelatedTerms.map((g) => {
              const slug = g.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <Link
                  key={g.term}
                  href={`/learn/glossary#term-${slug}` as `/learn/glossary#term-${string}`}
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${t.pillClass} hover:ring-2 hover:ring-offset-1 hover:ring-current transition-all`}
                >
                  {g.term}
                </Link>
              );
            })
          ) : (
            t.exampleTerms.map((term) => (
              <span
                key={term}
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${t.pillClass} opacity-70`}
              >
                {term}
              </span>
            ))
          )}
        </div>
        {t.glossaryTopic && (
          <Link
            href={`/learn/glossary?topic=${t.glossaryTopic}` as `/learn/glossary?topic=${string}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {tr.glossaryCta} &rarr;
          </Link>
        )}
      </section>

      {/* Use cases */}
      {useCases.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4">{tr.useCasesHeading}</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {useCases.map((c) => (
              <Link
                key={c.id}
                href={`/learn/usecases?filter=${t.useCaseTag}` as `/learn/usecases?filter=${string}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--card)] text-xs hover:border-blue-500 transition-colors"
              >
                {c.logo && <span>{c.logo}</span>}
                <span className="font-semibold">{c.company}</span>
              </Link>
            ))}
          </div>
          <Link
            href={`/learn/usecases?filter=${t.useCaseTag}` as `/learn/usecases?filter=${string}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {tr.useCasesCta} &rarr;
          </Link>
        </section>
      )}
    </div>
  );
}
