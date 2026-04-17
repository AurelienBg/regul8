export default function ReportCardPreview() {
  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden shadow-lg bg-white dark:bg-[#0F1F3D]">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-[#0A1628] text-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">Compliance Report</div>
        <div className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">Exchange · EU / France</div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/30">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Navigate complexity</span>
          </div>
        </div>

        {/* Regime */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Regime</div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">CASP (MiCA) + DASP (AMF)</div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-[#1E3A5F] my-4" />

        {/* Licences */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Licences</div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-[#1E3A5F] text-blue-700 dark:text-blue-200 text-xs">
              CASP authorization
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-[#1E3A5F] text-blue-700 dark:text-blue-200 text-xs">
              DASP AMF registration
            </span>
          </div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-[#1E3A5F] my-4" />

        {/* Timeline + cost */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Timeline</div>
            <div className="font-bold text-gray-900 dark:text-gray-100">12–18 months</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Est. Cost</div>
            <div className="font-bold text-gray-900 dark:text-gray-100">€50–200K</div>
          </div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-[#1E3A5F] my-4" />

        {/* Alternatives */}
        <div className="mb-5">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Faster alternatives</div>
          <ul className="space-y-1 text-sm text-purple-600 dark:text-purple-400">
            <li>→ Singapore MAS (~6 months)</li>
            <li>→ Dubai VARA (~9 months)</li>
            <li>→ Liechtenstein TVTG (~3–9 months)</li>
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="w-full text-center bg-blue-500 text-white py-2 rounded-md text-sm font-semibold">
          Talk to a legal expert →
        </div>
      </div>
    </div>
  );
}
