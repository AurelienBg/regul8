/**
 * Hero visual on the homepage: a **real slice of the product** using the same
 * components (cards, badges, regime pills) and class language as the actual
 * /assess report — just with mock data. The wrapper on the homepage wraps this
 * in a <Link href="/assess"> so the whole card is clickable.
 */
export default function ReportCardPreview() {
  return (
    <div className="space-y-3 group-hover:scale-[1.01] transition-transform duration-200">
      {/* Activity + jurisdiction header — mirrors report page H2 */}
      <div className="card !p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
            Assessment report
          </p>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base leading-tight">
            Exchange · Stablecoin issuance
          </h3>
        </div>
        <div className="flex items-center gap-1 text-lg shrink-0">
          <span title="France">🇫🇷</span>
          <span title="Singapore">🇸🇬</span>
          <span title="UAE">🇦🇪</span>
        </div>
      </div>

      {/* Regime — uses the real badge pattern from RegimeDisplay */}
      <div className="card !p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Regime</p>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200"
            title="Law — Regulation"
          >
            <span className="text-sm leading-none">📜</span>
            <span>MiCA</span>
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-900/20 dark:border-violet-700 dark:text-violet-200"
            title="Licence framework"
          >
            <span className="text-sm leading-none">🪪</span>
            <span>CASP</span>
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs font-semibold bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200"
            title="Law — Regulation"
          >
            <span className="text-sm leading-none">📜</span>
            <span>MAS PSA</span>
          </span>
        </div>
      </div>

      {/* 2-col: Licences + Obligations */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card !p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Licences</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="badge-license">CASP</span>
            <span className="badge-license">EMT issuer</span>
            <span className="badge-license">DPT</span>
          </div>
        </div>
        <div className="card !p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Obligations</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="badge-obligation">AML</span>
            <span className="badge-obligation">KYC</span>
            <span className="badge-obligation">Travel Rule</span>
          </div>
        </div>
      </div>

      {/* Alternatives — mirrors AlternativesList */}
      <div className="card !p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          Faster alternatives
        </p>
        <ul className="space-y-1">
          <li className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="text-blue-500">&rarr;</span>
            <span>🇸🇬 Singapore — MAS DPT licence, ~6 months</span>
          </li>
          <li className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="text-blue-500">&rarr;</span>
            <span>🇦🇪 UAE — VARA, ~9 months</span>
          </li>
        </ul>
      </div>

      {/* Bottom CTA — same shape as btn-primary */}
      <div className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-medium group-hover:bg-blue-600 transition-colors">
        Generate your report &rarr;
      </div>
    </div>
  );
}
