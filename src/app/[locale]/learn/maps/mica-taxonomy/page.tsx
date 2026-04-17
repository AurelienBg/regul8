import { Link } from '@/i18n/routing';
import MicaTaxonomy from '@/components/learn/maps/MicaTaxonomy';

export default function MicaTaxonomyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/learn/maps" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; Visual Maps
        </Link>
      </div>

      <header className="mb-8">
        <div className="text-4xl mb-3">🌳</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">MiCA Token Taxonomy</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Where does your token fit in MiCA? Walk the tree from the top and land on EMT, ART, Other crypto-asset, or Excluded.
        </p>
      </header>

      <div className="card mb-8 overflow-x-auto">
        <MicaTaxonomy />
      </div>

      <section className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">EMT</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Single-currency peg. Issuer must be EMI or credit institution. Capital + reserve rules strict.</p>
        </div>
        <div className="card">
          <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">ART</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">References multiple assets / commodities / baskets. NCA authorization required. Whitepaper approved.</p>
        </div>
        <div className="card">
          <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">Other crypto-asset</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">No stabilization mechanism. Whitepaper + NCA notification above €1M threshold. Utility tokens land here.</p>
        </div>
      </section>

      <section className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">Want to apply this to your token?</div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Use the Decision Tree to walk through CASP requirements specific to your service.</p>
        <Link href="/learn/decision-trees/casp" className="btn-primary text-sm inline-block">
          Do I need a CASP licence? &rarr;
        </Link>
      </section>
    </div>
  );
}
