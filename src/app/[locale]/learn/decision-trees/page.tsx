import { Link } from '@/i18n/routing';
import { DECISION_TREES } from '@/data/decision-trees';

export default function DecisionTreesListPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/learn" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; Learn
        </Link>
      </div>
      <header className="text-center mb-12">
        <div className="text-5xl mb-4">🌳</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Decision Trees</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Answer a handful of questions. Get a clear, color-coded verdict with next steps.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {DECISION_TREES.map((tree) => (
          <Link
            key={tree.id}
            href={`/learn/decision-trees/${tree.id}`}
            className="card hover:border-blue-500 transition-colors group"
          >
            <div className="text-4xl mb-4">{tree.icon}</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tree.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tree.description}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Start &rarr;
            </span>
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-8 italic">
        Each tree gives general regulatory guidance. For specific advice, consult a qualified lawyer.
      </p>
    </div>
  );
}
