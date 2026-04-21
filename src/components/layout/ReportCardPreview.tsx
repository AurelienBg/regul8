/**
 * Hero visual: a teaser of the Assess report.
 * Clickable wrapper is applied at the call site (homepage → /assess).
 */
export default function ReportCardPreview() {
  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden shadow-lg bg-white dark:bg-[#0F1F3D] group-hover:shadow-xl group-hover:border-violet-400 dark:group-hover:border-violet-500 transition-all duration-200">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-[#0A1628] flex items-center justify-between">
        <div>
          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Assessment report
          </div>
          <div className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5 text-sm">
            Exchange + Stablecoin
          </div>
        </div>
        <div className="flex items-center gap-1 text-lg">
          <span title="France">🇫🇷</span>
          <span title="Singapore">🇸🇬</span>
          <span title="UAE">🇦🇪</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* AI pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400 bg-violet-50 dark:border-violet-500 dark:bg-violet-900/30">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-violet-700 dark:text-violet-300">
              Contextual AI analysis
            </span>
          </div>
        </div>

        {/* Regimes */}
        <div className="mb-3">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Regimes</div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 text-[11px] font-semibold">MiCA</span>
            <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 text-[11px] font-semibold">MAS PSA</span>
            <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 text-[11px] font-semibold">VARA</span>
          </div>
        </div>

        {/* Licences */}
        <div className="mb-3">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Licences</div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 text-[11px] font-semibold">CASP</span>
            <span className="px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 text-[11px] font-semibold">EMT issuer</span>
            <span className="px-2 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 text-[11px] font-semibold">DPT service</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-[#1E3A5F] my-3" />

        {/* Timeline + cost */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Timeline</div>
            <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">6–18 months</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Est. Cost</div>
            <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">€100–400K</div>
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-[#1E3A5F] my-3" />

        {/* AI verdict */}
        <div className="mb-4 rounded-md border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-900/20 px-3 py-2">
          <div className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 text-sm leading-none mt-0.5">✓</span>
            <div>
              <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                AI verdict
              </div>
              <div className="text-[11px] text-gray-700 dark:text-gray-300 leading-snug mt-0.5">
                Coherent path. Start with Singapore (fastest), then passport into EU under MiCA.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA — looks like a button; actual clickability wraps the whole card */}
        <div className="w-full text-center bg-violet-600 text-white py-2 rounded-md text-sm font-semibold group-hover:bg-violet-700 transition-colors">
          Start my assessment &rarr;
        </div>
      </div>
    </div>
  );
}
