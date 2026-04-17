import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { CASE_STUDIES, getCaseStudy } from '@/data/case-studies';
import { getDecisionTree } from '@/data/decision-trees';
import { JURISDICTIONS } from '@/types';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ id: c.id }));
}

type Params = Promise<{ id: string; locale: string }>;

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { id } = await params;
  const c = getCaseStudy(id);
  if (!c) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link
          href="/learn/cases"
          className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          &larr; All case studies
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="text-5xl mb-4">{c.icon}</div>
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
          Case Study · {c.date}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">{c.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{c.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {c.jurisdictions.map((j) => (
            <span
              key={j}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
            >
              <span>{JURISDICTIONS[j].flag}</span>
              <span className="font-medium">{JURISDICTIONS[j].name}</span>
            </span>
          ))}
        </div>
      </header>

      {/* Key takeaway */}
      <div className="mb-10 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">
          Key takeaway
        </div>
        <p className="text-gray-800 dark:text-gray-100 font-medium leading-relaxed">{c.keyTakeaway}</p>
      </div>

      {/* Timeline */}
      {c.timeline && c.timeline.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Timeline</h2>
          <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-5">
            {c.timeline.map((t, i) => (
              <li key={i} className="ml-5">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] mt-1.5" />
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {t.date}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{t.event}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Narrative sections */}
      {c.sections.map((s, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl font-bold mb-3">{s.heading}</h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            {s.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      {/* Why it matters */}
      <section className="mb-10 p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>Why it matters</span>
        </h2>
        <ul className="space-y-2">
          {c.whyItMatters.map((point, i) => (
            <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-blue-500 font-bold mt-0.5">→</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Related trees */}
      {c.relatedTrees && c.relatedTrees.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-3">Explore further</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {c.relatedTrees.map((treeId) => {
              const tree = getDecisionTree(treeId);
              if (!tree) return null;
              return (
                <Link
                  key={treeId}
                  href={`/learn/decision-trees/${treeId}`}
                  className="card hover:border-blue-500 transition-colors flex items-center gap-3 py-4"
                >
                  <span className="text-2xl">{tree.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{tree.title}</div>
                    <div className="text-xs text-gray-500">Decision tree</div>
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
          {c.relatedTerms.map((term, i) => (
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
        Summary of public regulatory events. Not legal advice. Consult a qualified lawyer for advice specific to your situation.
      </p>
    </article>
  );
}
