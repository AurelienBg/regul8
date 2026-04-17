import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { LEARNING_PATHS, getLearningPath } from '@/data/learning-paths';
import { getDecisionTree } from '@/data/decision-trees';
import { getCaseStudy } from '@/data/case-studies';
import { JURISDICTIONS } from '@/types';
import PathBlockRenderer from '@/components/learn/PathBlockRenderer';

export function generateStaticParams() {
  return LEARNING_PATHS.map((p) => ({ id: p.id }));
}

type Params = Promise<{ id: string; locale: string }>;

const levelStyles: Record<string, string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
  intermediate: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
  advanced: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200',
};

export default async function LearningPathPage({ params }: { params: Params }) {
  const { id } = await params;
  const p = getLearningPath(id);
  if (!p) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/learn/paths" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; All paths
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-[var(--border)]">
        <div className="text-5xl mb-4">{p.icon}</div>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className={`px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide ${levelStyles[p.level]}`}>
            {p.level}
          </span>
          <span className="text-xs text-gray-500">· {p.duration}</span>
          {p.jurisdictions?.map((j) => (
            <span key={j} className="inline-flex items-center gap-1 text-sm">
              <span>{JURISDICTIONS[j].flag}</span>
              <span className="text-gray-500">{JURISDICTIONS[j].name}</span>
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">{p.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{p.subtitle}</p>
      </header>

      {/* Table of contents */}
      <aside className="mb-10 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">In this path</div>
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
      {((p.relatedTrees && p.relatedTrees.length > 0) || (p.relatedCases && p.relatedCases.length > 0)) && (
        <section className="mt-12 mb-10">
          <h2 className="text-xl font-bold mb-4">Explore further</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {p.relatedTrees?.map((tid) => {
              const t = getDecisionTree(tid);
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
                    <div className="text-xs text-gray-500">Decision tree</div>
                  </div>
                  <span className="text-gray-400">&rarr;</span>
                </Link>
              );
            })}
            {p.relatedCases?.map((cid) => {
              const c = getCaseStudy(cid);
              if (!c) return null;
              return (
                <Link
                  key={cid}
                  href={`/learn/cases/${cid}`}
                  className="card hover:border-blue-500 transition-colors flex items-center gap-3 py-4"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{c.title}</div>
                    <div className="text-xs text-gray-500">Case study</div>
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
          Related terms
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
        General information only. Not legal advice. For your specific situation, consult a qualified lawyer.
      </p>
    </article>
  );
}
