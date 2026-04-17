import { Link } from '@/i18n/routing';
import JurisdictionArbitrage from '@/components/learn/maps/JurisdictionArbitrage';

export default function JurisdictionArbitrageMapPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/learn/maps" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; Visual Maps
        </Link>
      </div>

      <header className="mb-8">
        <div className="text-4xl mb-3">🌍</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Jurisdiction Arbitrage Map</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Speed vs cost scatter plot. Dot color = risk level. Dot size = market access. Find your sweet spot.
        </p>
      </header>

      <div className="card mb-8">
        <JurisdictionArbitrage />
      </div>

      <section className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="card">
          <div className="font-bold mb-2">⭐ Fast & cheap quadrant</div>
          <p className="text-gray-600 dark:text-gray-400">
            Liechtenstein TVTG, Brazil, Switzerland. Ideal starting points when budget and time are the top constraints. Liechtenstein adds EEA passporting as a bonus.
          </p>
        </div>
        <div className="card">
          <div className="font-bold mb-2">🚀 Fast & structured</div>
          <p className="text-gray-600 dark:text-gray-400">
            Dubai VARA, Singapore MAS. Modern rulebooks, ~9 months, 50-150K€. Strong pick for global operators who want a credible first licence.
          </p>
        </div>
        <div className="card">
          <div className="font-bold mb-2">🏛 Slow & expensive</div>
          <p className="text-gray-600 dark:text-gray-400">
            US state MTLs, EU MiCA, Hong Kong SFC. Required for access to the biggest markets. Plan capital and 12-24 months; passport or stack once approved.
          </p>
        </div>
      </section>

      <section className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">Ready to pick one?</div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">The decision tree walks you through speed / cost / market / reputation priorities and outputs a recommended jurisdiction.</p>
        <Link href="/learn/decision-trees/jurisdiction" className="btn-primary text-sm inline-block">
          Which jurisdiction should I choose? &rarr;
        </Link>
      </section>
    </div>
  );
}
