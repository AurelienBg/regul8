import { Link } from '@/i18n/routing';

const MAPS = [
  {
    id: 'mica-taxonomy',
    icon: '🌳',
    title: 'MiCA Token Taxonomy',
    description: 'Complete tree of token categories under MiCA — in-scope (EMT/ART/Other), excluded (NFTs, CBDCs, full DeFi), with examples for each.',
  },
  {
    id: 'xrpl-custody',
    icon: '🔐',
    title: 'XRPL Custody Matrix',
    description: 'The 10 XRPL custody methods classified into Custodial / Grey zone / Non-custodial, with EU licence implications.',
  },
  {
    id: 'jurisdiction-arbitrage',
    icon: '🌍',
    title: 'Jurisdiction Arbitrage Map',
    description: 'Speed-to-licence vs setup cost scatter plot. Find your sweet spot between time, budget, risk and market access.',
  },
];

export default function VisualMapsListPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/learn" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; Learn
        </Link>
      </div>
      <header className="text-center mb-12">
        <div className="text-5xl mb-4">🗺️</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Visual Maps</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          One-pager visualizations that make regulation tangible.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {MAPS.map((m) => (
          <Link
            key={m.id}
            href={`/learn/maps/${m.id}`}
            className="card hover:border-blue-500 transition-colors group"
          >
            <div className="text-4xl mb-4">{m.icon}</div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {m.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{m.description}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Open &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
