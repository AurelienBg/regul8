'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, ACTIVITIES, type ActivityKey, type Jurisdiction } from '@/types';
import { lookupRegulation } from '@/lib/regulations-lookup';
import RiskBadge from '@/components/ui/RiskBadge';
import EmergingBadge from '@/components/ui/EmergingBadge';
import RegimeDisplay from '@/components/report/RegimeDisplay';
import RegimeLegend from '@/components/report/RegimeLegend';

const ACTIVITY_LABELS_EN: Record<ActivityKey, string> = {
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

const ACTIVITY_LABELS_FR: Record<ActivityKey, string> = {
  exchange: 'Exchange / Trading',
  dapp_fin: 'DApp DeFi',
  dapp_util: 'DApp utilitaire',
  nft: 'Marketplace NFT',
  mpt: 'MPT (XLS-33)',
  rwa: 'Tokenisation RWA',
  stablecoin: 'Stablecoin',
  gaming: 'Gaming / GameFi',
  custody: 'Custody / Wallet',
  payment: 'Paiement / Remise',
  token_utility: 'Utility token',
  token_security: 'Security token',
  token_hybrid: 'Token hybride',
};

export default function CompareActivitiesPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const ACTIVITY_LABELS = isFr ? ACTIVITY_LABELS_FR : ACTIVITY_LABELS_EN;
  const tr = isFr ? {
    title: "Comparateur d'activités",
    subtitle: 'Choisissez une juridiction et 2 à 5 activités. Voyez toutes les obligations réglementaires côte à côte.',
    jurisdiction: 'Juridiction',
    activities: 'Activités',
    selectAtLeast2: 'Sélectionnez au moins 2 activités à comparer.',
    comparedIn: 'activités comparées en',
    field: 'Champ',
    regime: 'Régime Applicable',
    risk: 'Niveau de Risque',
    licences: 'Licences Requises',
    obligations: 'Obligations Clés',
    timeline: 'Délai Estimé',
    cost: 'Coût Estimé',
    authority: 'Autorité',
    xrplNote: 'Note Spécifique XRPL',
    runningTitle: 'Plusieurs activités cumulées ?',
    runningBody1: 'Les régulateurs examinent le profil ',
    runningBody2: 'combiné',
    runningBody3: " — l'exigence la plus stricte s'applique généralement à toute l'entreprise. Prévoyez le capital, la gouvernance et les licences pour l'obligation la plus élevée de votre stack.",
    fullWizard: 'Wizard complet avec multi-juridictions',
    disclaimer: "Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.",
  } : {
    title: 'Activity Comparator',
    subtitle: 'Pick one jurisdiction and 2–5 activities. See all regulatory obligations side-by-side.',
    jurisdiction: 'Jurisdiction',
    activities: 'Activities',
    selectAtLeast2: 'Select at least 2 activities to compare.',
    comparedIn: 'activities compared in',
    field: 'Field',
    regime: 'Applicable Regime',
    risk: 'Risk Level',
    licences: 'Licences Required',
    obligations: 'Key Obligations',
    timeline: 'Estimated Timeline',
    cost: 'Estimated Cost',
    authority: 'Authority',
    xrplNote: 'XRPL-Specific Note',
    runningTitle: 'Running multiple activities together?',
    runningBody1: 'Regulators look at the ',
    runningBody2: 'combined',
    runningBody3: ' profile — the strictest requirement usually applies across the whole business. Plan capital, governance, and licences for the highest obligation in your stack.',
    fullWizard: 'Full wizard with multi-jurisdiction',
    disclaimer: 'General information only. For your specific situation, consult a qualified lawyer.',
  };
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
          result: lookupRegulation(activity, jurisdiction, locale),
        }))
        .filter((r) => r.result),
    [selected, jurisdiction, locale],
  );

  const jurisdictionMeta = JURISDICTIONS[jurisdiction];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{tr.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tr.subtitle}
        </p>
      </header>

      {/* Jurisdiction picker */}
      <section className="mb-6">
        <label className="block text-sm font-semibold mb-2">{tr.jurisdiction}</label>
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
          {tr.activities} ({selected.length}/5)
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

      {/* Legend — same as /report, collapsed by default */}
      {rows.length >= 2 && <RegimeLegend defaultOpen={false} />}

      {/* Comparison table */}
      {rows.length < 2 ? (
        <div className="card text-center text-gray-500 py-12">
          <p>{tr.selectAtLeast2}</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <span className="text-2xl">{jurisdictionMeta.flag}</span>
            <h2 className="text-xl font-bold">
              {rows.length} {tr.comparedIn} {jurisdictionMeta.name}
            </h2>
            <EmergingBadge code={jurisdiction} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b border-[var(--border)] w-44 text-xs uppercase text-gray-500">
                    {tr.field}
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
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.regime}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top">
                      {r.result ? <RegimeDisplay result={r.result} variant="inline" /> : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.risk}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top">
                      {r.result && <RiskBadge risk={r.result.risk} />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.licences}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top">
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
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.obligations}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top">
                      <ul className="list-disc ml-4 text-xs space-y-1">
                        {r.result?.obligations.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.timeline}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top font-semibold">
                      {r.result?.time}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.cost}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top font-semibold">
                      {r.result?.cost}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.authority}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top text-sm">
                      {r.result?.authority}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-gray-500 text-xs uppercase">{tr.xrplNote}</td>
                  {rows.map((r) => (
                    <td key={r.activity} className="p-3 align-top text-xs text-gray-600 dark:text-gray-400">
                      {r.result?.xrplNote ?? '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <section className="mt-10 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
            <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">
              {tr.runningTitle}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {tr.runningBody1}<strong>{tr.runningBody2}</strong>{tr.runningBody3}
            </p>
            <Link href="/wizard" className="btn-primary text-sm inline-block">
              {tr.fullWizard} &rarr;
            </Link>
          </section>
        </>
      )}

      <p className="text-xs text-gray-500 text-center mt-10 italic">
        {tr.disclaimer}
      </p>
    </div>
  );
}
