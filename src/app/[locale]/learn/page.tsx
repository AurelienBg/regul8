import { Link } from '@/i18n/routing';

const MODES = [
  {
    id: 'decision-trees',
    href: '/learn/decision-trees',
    icon: '🌳',
    title: 'Decision Trees',
    description: 'Walk through guided questions to get a clear answer on licence needs, custody classification, or jurisdiction choice.',
    cta: 'Start a tree',
    available: true,
  },
  {
    id: 'learning-paths',
    href: '/learn/paths',
    icon: '📚',
    title: 'Learning Paths',
    description: 'Curated reads on MiCA, Howey Test, XRPL custody, Liechtenstein TVTG, and more — each one a 5–10 min deep dive.',
    cta: 'Coming soon',
    available: false,
  },
  {
    id: 'case-studies',
    href: '/learn/cases',
    icon: '📖',
    title: 'Case Studies',
    description: 'Real regulatory cases explained: SEC v. Ripple, RLUSD structure, Sorare + ANJ, Binance → Dubai move.',
    cta: 'Read cases',
    available: true,
  },
  {
    id: 'visual-maps',
    href: '/learn/maps',
    icon: '🗺️',
    title: 'Visual Maps',
    description: 'One-pager diagrams: MiCA token taxonomy, XRPL custody matrix, global regimes world map.',
    cta: 'Coming soon',
    available: false,
  },
];

export default function LearnHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Learn</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Four ways to understand crypto regulation. Pick the one that fits how you want to learn.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {MODES.map((mode) =>
          mode.available ? (
            <Link key={mode.id} href={mode.href} className="card hover:border-blue-500 transition-colors group">
              <div className="text-4xl mb-4">{mode.icon}</div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {mode.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mode.description}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {mode.cta} &rarr;
              </span>
            </Link>
          ) : (
            <div
              key={mode.id}
              className="card opacity-60 border-dashed"
              aria-disabled="true"
            >
              <div className="text-4xl mb-4 grayscale">{mode.icon}</div>
              <h2 className="text-xl font-bold mb-2">{mode.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mode.description}</p>
              <span className="text-sm font-medium text-gray-500">{mode.cta}</span>
            </div>
          ),
        )}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
        <h3 className="font-semibold mb-2">Just need a definition?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          The glossary covers ~50 regulatory terms — quick reference, no commitment.
        </p>
        <Link href="/glossary" className="btn-secondary text-sm inline-block">
          Browse glossary &rarr;
        </Link>
      </div>
    </div>
  );
}
