import { Link } from '@/i18n/routing';
import XrplCustodyMatrix from '@/components/learn/maps/XrplCustodyMatrix';

export default function XrplCustodyMapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/learn/maps" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; Visual Maps
        </Link>
      </div>

      <header className="mb-8">
        <div className="text-4xl mb-3">🔐</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">XRPL Custody Matrix</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The 10 custody methods on XRPL grouped by regulatory classification. Pick your architecture deliberately.
        </p>
      </header>

      <XrplCustodyMatrix />

      <section className="mt-10 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
        <div className="font-bold text-amber-900 dark:text-amber-200 mb-1">⚠️ Grey zone isn&apos;t a free pass</div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Regulators haven&apos;t issued definitive guidance on Regular Key, SignerList minority thresholds, or MPC/TSS under MiCA. A written legal opinion is essential before launch. The classification can shift with ESMA/FCA updates.
        </p>
      </section>

      <section className="mt-6 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">Figure out your own setup</div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Use the decision tree to route your architecture through the 10 methods and get a clear verdict.</p>
        <Link href="/learn/decision-trees/xrpl-custody" className="btn-primary text-sm inline-block">
          Is my XRPL custody custodial? &rarr;
        </Link>
      </section>
    </div>
  );
}
