import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getLearningPath } from '@/data/learning-paths';
import { getLearningPathFr } from '@/data/learning-paths.fr';
import { getDecisionTree } from '@/data/decision-trees';
import { getDecisionTreeFr } from '@/data/decision-trees.fr';
import { JURISDICTIONS } from '@/types';
import PathBlockRenderer from '@/components/understand/PathBlockRenderer';

type Params = { id: string; locale: string };

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

export default function LearningPathPage({ params }: { params: Params }) {
  const isFr = params.locale === 'fr';
  const p = isFr ? getLearningPathFr(params.id) : getLearningPath(params.id);
  if (!p) notFound();
  const tr = isFr ? {
    backAll: 'Tous les guides',
    inPath: 'Dans ce guide',
    exploreFurther: 'Pour aller plus loin',
    decisionTree: 'Diagnostic',
    relatedTerms: 'Termes associés',
    disclaimer: "Information générale uniquement. Pas un conseil juridique. Pour votre situation spécifique, consultez un avocat qualifié.",
  } : {
    backAll: 'All guides',
    inPath: 'In this guide',
    exploreFurther: 'Explore further',
    decisionTree: 'Diagnostic',
    relatedTerms: 'Related terms',
    disclaimer: 'General information only. Not legal advice. For your specific situation, consult a qualified lawyer.',
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/understand/guides" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; {tr.backAll}
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">{p.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{p.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mb-3">{p.subtitle}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide ${levelStyles[p.level]}`}>
            {isFr ? levelLabels[p.level].fr : levelLabels[p.level].en}
          </span>
          <span className="text-xs text-gray-500">· {p.duration}</span>
          {p.jurisdictions?.map((j) => (
            <span key={j} className="inline-flex items-center gap-1 text-sm">
              <span>{JURISDICTIONS[j].flag}</span>
              <span className="text-gray-500">{JURISDICTIONS[j].name}</span>
            </span>
          ))}
        </div>
      </header>

      {/* Table of contents */}
      <aside className="mb-10 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{tr.inPath}</div>
        <ol className="space-y-1">
          {p.sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span className="text-gray-500 mr-2">{i + 1}.</span>
                {s.heading}
              </a>
            </li>
          ))}
        </ol>
      </aside>

      {/* Sections */}
      {p.sections.map((s) => (
        <section key={s.id} id={s.id} className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">{s.heading}</h2>
          {s.content.map((block, i) => (
            <PathBlockRenderer key={i} block={block} />
          ))}
        </section>
      ))}

      {/* Cross-references */}
      {p.relatedTrees && p.relatedTrees.length > 0 && (
        <section className="mt-12 mb-10">
          <h2 className="text-xl font-bold mb-4">{tr.exploreFurther}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {p.relatedTrees.map((tid) => {
              const t = isFr ? getDecisionTreeFr(tid) : getDecisionTree(tid);
              if (!t) return null;
              return (
                <Link
                  key={tid}
                  href={`/learn/decision-trees/${tid}`}
                  className="card hover:border-blue-500 transition-colors flex items-center gap-3 py-4"
                >
                  <span className="text-2xl">{t.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{t.title}</div>
                    <div className="text-xs text-gray-500">{tr.decisionTree}</div>
                  </div>
                  <span className="text-gray-400">&rarr;</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Related terms */}
      <section className="mb-10">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
          {tr.relatedTerms}
        </h3>
        <div className="flex flex-wrap gap-2">
          {p.relatedTerms.map((term, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300"
            >
              {term}
            </span>
          ))}
        </div>
      </section>

      <p className="text-xs text-gray-500 italic text-center pt-6 border-t border-[var(--border)]">
        {tr.disclaimer}
      </p>
    </article>
  );
}
