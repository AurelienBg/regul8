import { Link } from '@/i18n/routing';
import { CASE_STUDIES } from '@/data/case-studies';
import { JURISDICTIONS } from '@/types';

export default function CaseStudiesListPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/learn" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; Learn
        </Link>
      </div>
      <header className="text-center mb-12">
        <div className="text-5xl mb-4">📖</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Case Studies</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Real regulatory cases explained — the decisions, the timelines, and what they mean for your startup.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {CASE_STUDIES.map((c) => (
          <Link
            key={c.id}
            href={`/learn/cases/${c.id}`}
            className="card hover:border-blue-500 transition-colors group"
          >
            <div className="flex items-start gap-4 mb-3">
              <span className="text-4xl">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-500 mb-1">{c.date}</div>
                <h2 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {c.title}
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{c.subtitle}</p>
            <div className="flex flex-wrap items-center gap-2">
              {c.jurisdictions.map((j) => (
                <span key={j} className="text-lg" title={JURISDICTIONS[j].name}>
                  {JURISDICTIONS[j].flag}
                </span>
              ))}
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 ml-auto">
                Read &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-8 italic">
        Summaries of public regulatory events. Not legal advice.
      </p>
    </div>
  );
}
