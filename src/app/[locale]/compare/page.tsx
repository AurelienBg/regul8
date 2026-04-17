'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, ACTIVITIES, type ActivityKey, type Jurisdiction } from '@/types';
import { lookupRegulation } from '@/lib/regulations-lookup';
import RiskBadge from '@/components/ui/RiskBadge';

const ACTIVITY_LABELS: Record<ActivityKey, string> = {
  exchange: 'Exchange / Trading',
  dapp_fin: 'DeFi DApp',
  dapp_util: 'Utility DApp',
  nft: 'NFT marketplace',
  mpt: 'MPT (XLS-33)',
  rwa: 'RWA tokenisation',
  stablecoin: 'Stablecoin',
  gaming: 'Gaming / GameFi',
  custody: 'Custody / Wallet',
  payment: 'Payment / Remittance',
  token_utility: 'Utility token',
  token_security: 'Security token',
  token_hybrid: 'Hybrid token',
};

export default function CompareActivitiesPage() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('eu');
  const [selected, setSelected] = useState<ActivityKey[]>(['exchange', 'custody', 'payment']);

  const toggle = (a: ActivityKey) => {
    setSelected((prev) => {
      if (prev.includes(a)) return prev.filter((x) => x !== a);
      if (prev.length >= 5) return prev;
      return [...prev, a];
    });
  };

  const rows = useMemo(
    () =>
      selected
        .map((activity) => ({
          activity,
          result: lookupRegulation(activity, jurisdiction),
        }))
        .filter((r) => r.result),
    [selected, jurisdiction],
  );

  const jurisdictionMeta = JURISDICTIONS[jurisdiction];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Activity Comparator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Pick one jurisdiction and 2–5 activities. See all regulatory obligations side-by-side.
        </p>
      </header>

      {/* Jurisdiction picker */}
      <section className="mb-6">
        <label className="block text-sm font-semibold mb-2">Jurisdiction</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(JURISDICTIONS) as Jurisdiction[]).map((j) => (
            <button
              key={j}
              onClick={() => setJurisdiction(j)}
              className={`px-3 py-2 rounded-lg border text-sm transition-colors flex items-center gap-2 ${
                jurisdiction === j
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                  : 'border-[var(--border)] hover:border-blue-300'
              }`}
            >
              <span className="text-lg">{JURISDICTIONS[j].flag}</span>
              <span>{JURISDICTIONS[j].name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Activity picker */}
      <section className="mb-8">
        <label className="block text-sm font-semibold mb-2">
          Activities ({selected.length}/5)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {(Object.keys(ACTIVITIES) as ActivityKey[]).map((a) => {
            const isSel = selected.includes(a);
            const disabled = !isSel && selected.length >= 5;
            return (
              <button
                key={a}
                onClick={() => toggle(a)}
                disabled={disabled}
                className={`px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                  isSel
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                    : disabled
                      ? 'border-[var(--border)] opacity-40 cursor-not-allowed'
                      : 'border-[var(--border)] hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{ACTIVITY_LABELS[a]}</span>
                  {ACTIVITIES[a].xrpl && <span className="badge-xrpl">XRPL</span>}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      {rows.length < 2 ? (
        <div className="card text-center text-gray-500 py-12">
          <p>Select at least 2 activities to compare.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">{jurisdictionMeta.flag}</span>
            <h2 className="text-xl font-bold">
              {rows.length} activities compared in {jurisdictionMeta.name}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b border-[var(--border)] w-44 text-xs uppercase text-gray-500">
                    Field
                  </th>
                  {rows.map((r) => (
                    <th
                      key={r.activity}
                      className="text-left p-3 border-b border-[var(--border)] min-w-[220px]"
                    >
                      <div className="font-bold">{ACTIVITY_LABELS[r.activity]}</div>
                      {ACTIVITIES[r.activity].xrpl && <span className="badge-xrpl">XRPL</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">Regime</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 font-semibold">
                      {r.result?.regime}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">Risk</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3">
                      {r.result && <RiskBadge risk={r.result.risk} />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">Licences</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3">
                      <ul className="space-y-1">
                        {r.result?.licenses.map((l, i) => (
                          <li
                            key={i}
                            className="inline-block mr-1 mb-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs"
                          >
                            {l}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">Obligations</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3">
                      <ul className="list-disc ml-4 text-xs space-y-1">
                        {r.result?.obligations.slice(0, 4).map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                        {r.result && r.result.obligations.length > 4 && (
                          <li className="text-gray-500">+{r.result.obligations.length - 4} more</li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">Timeline</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 font-semibold">
                      {r.result?.time}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">Cost</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 font-semibold">
                      {r.result?.cost}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">Authority</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 text-sm">
                      {r.result?.authority}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-500 text-xs uppercase">XRPL note</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 text-xs text-gray-600 dark:text-gray-400">
                      {r.result?.xrplNote ?? '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <section className="mt-10 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
            <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">
              Running multiple activities together?
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Regulators look at the <strong>combined</strong> profile — the strictest requirement usually
              applies across the whole business. Plan capital, governance, and licences for the highest
              obligation in your stack.
            </p>
            <Link href="/wizard" className="btn-primary text-sm inline-block">
              Full wizard with multi-jurisdiction &rarr;
            </Link>
          </section>
        </>
      )}

      <p className="text-xs text-gray-500 text-center mt-10 italic">
        General information only. For your specific situation, consult a qualified lawyer.
      </p>
    </div>
  );
}
