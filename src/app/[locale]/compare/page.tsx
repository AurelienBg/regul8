'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, ACTIVITIES, type ActivityKey, type Jurisdiction } from '@/types';
import { lookupRegulation } from '@/lib/regulations-lookup';
import RiskBadge from '@/components/ui/RiskBadge';
import EmergingBadge from '@/components/ui/EmergingBadge';
import ActivityXRPLStatus from '@/components/ui/ActivityXRPLStatus';
import RegimeDisplay from '@/components/report/RegimeDisplay';
import RegimeLegend from '@/components/report/RegimeLegend';
import LicencePillsDisplay from '@/components/report/LicencePillsDisplay';
import LinkedText from '@/components/ui/LinkedText';

// Activity labels are sourced from messages/{en,fr}.json `wizard.activities.*`
// — same source as /assess. Previously /compare had its own shorter inline
// mapping which created drift ('Utility DApp' vs 'DApp — Utility (Social,
// Identity, DAO)'). Unified on the verbose version for clarity.

type CompareMode = 'activities' | 'jurisdictions';

export default function ComparePage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tw = useTranslations('wizard');

  // Alphabetical ordering for both lists — matches /assess. Memoised since
  // label mappings are locale-dependent.
  const activityKeysSorted = useMemo(
    () =>
      (Object.keys(ACTIVITIES) as ActivityKey[]).sort((a, b) =>
        tw(`activities.${a}`).localeCompare(tw(`activities.${b}`), locale),
      ),
    [tw, locale],
  );
  const jurisdictionKeysSorted = useMemo(
    () =>
      (Object.keys(JURISDICTIONS) as Jurisdiction[]).sort((a, b) =>
        JURISDICTIONS[a].name.localeCompare(JURISDICTIONS[b].name, locale),
      ),
    [locale],
  );

  // Filter: show only XRPL-compatible activities (9/20). Off by default.
  // Applied in both compare modes (activities-in-juri + juri-for-activity).
  const [xrplOnlyFilter, setXrplOnlyFilter] = useState(false);
  const displayedActivityKeys = useMemo(
    () => (xrplOnlyFilter ? activityKeysSorted.filter((k) => ACTIVITIES[k].xrpl) : activityKeysSorted),
    [activityKeysSorted, xrplOnlyFilter],
  );

  const tr = isFr ? {
    title: 'Comparateur',
    subtitle: 'Deux modes : plusieurs activités dans une juridiction, ou plusieurs juridictions pour une activité.',
    modeActivities: "Comparer activités",
    modeJurisdictions: "Comparer juridictions",
    jurisdiction: 'Juridiction',
    activity: 'Activité',
    activities: 'Activités',
    jurisdictions: 'Juridictions',
    selectAtLeast2Act: 'Sélectionnez au moins 2 activités à comparer.',
    selectAtLeast2Juri: 'Sélectionnez au moins 2 juridictions à comparer.',
    comparedIn: 'activités comparées en',
    comparedFor: 'juridictions comparées pour',
    field: 'Champ',
    regime: 'Régime Applicable',
    regimeDesc: 'Le texte légal qui fonde tout — portée et reach territorial',
    risk: 'Niveau de Risque',
    riskDesc: "Criticité de la non-conformité pour votre activité",
    licences: 'Licences Requises',
    licencesDesc: 'Les agréments concrets à obtenir',
    obligations: 'Obligations Clés',
    obligationsDesc: 'Obligations quotidiennes (KYC, AML, Travel Rule…)',
    timeline: 'Délai Estimé',
    timelineDesc: "Temps pour obtenir la licence + être opérationnel",
    cost: 'Coût Estimé',
    costDesc: 'Frais de licence + capital + coûts récurrents',
    authority: 'Régulateur',
    authorityDesc: "L'organisme qui supervise et délivre la licence",
    xrplNote: 'Note Spécifique XRPL',
    xrplNoteDesc: 'Particularités de mise en œuvre sur XRPL',
    runningTitle: 'Plusieurs activités cumulées ?',
    runningBody1: 'Les régulateurs examinent le profil ',
    runningBody2: 'combiné',
    runningBody3: " — l'exigence la plus stricte s'applique généralement à toute l'entreprise. Prévoyez le capital, la gouvernance et les licences pour l'obligation la plus élevée de votre stack.",
    fullWizard: 'Wizard complet avec multi-juridictions',
    disclaimer: "Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.",
    noData: 'Pas de données',
  } : {
    title: 'Comparator',
    subtitle: 'Two modes: multiple activities in one jurisdiction, or multiple jurisdictions for one activity.',
    modeActivities: 'Compare activities',
    modeJurisdictions: 'Compare jurisdictions',
    jurisdiction: 'Jurisdiction',
    activity: 'Activity',
    activities: 'Activities',
    jurisdictions: 'Jurisdictions',
    selectAtLeast2Act: 'Select at least 2 activities to compare.',
    selectAtLeast2Juri: 'Select at least 2 jurisdictions to compare.',
    comparedIn: 'activities compared in',
    comparedFor: 'jurisdictions compared for',
    field: 'Field',
    regime: 'Applicable Regime',
    regimeDesc: 'The legal text that grounds it all — scope & territorial reach',
    risk: 'Risk Level',
    riskDesc: 'How critical non-compliance is for your activity',
    licences: 'Licences Required',
    licencesDesc: 'The concrete authorizations you must obtain',
    obligations: 'Key Obligations',
    obligationsDesc: 'Daily compliance duties (KYC, AML, Travel Rule…)',
    timeline: 'Estimated Timeline',
    timelineDesc: 'How long to obtain the licence + go live',
    cost: 'Estimated Cost',
    costDesc: 'Licence fees + capital + ongoing costs',
    authority: 'Regulator',
    authorityDesc: 'The body that supervises and issues the licence',
    xrplNote: 'XRPL-Specific Note',
    xrplNoteDesc: 'How this plays out on XRPL specifically',
    runningTitle: 'Running multiple activities together?',
    runningBody1: 'Regulators look at the ',
    runningBody2: 'combined',
    runningBody3: ' profile — the strictest requirement usually applies across the whole business. Plan capital, governance, and licences for the highest obligation in your stack.',
    fullWizard: 'Full wizard with multi-jurisdiction',
    disclaimer: 'General information only. For your specific situation, consult a qualified lawyer.',
    noData: 'No data',
  };

  const [mode, setMode] = useState<CompareMode>('activities');

  // State for mode 1: activities × 1 jurisdiction
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('eu');
  const [selectedActivities, setSelectedActivities] = useState<ActivityKey[]>(['exchange', 'custody', 'payment']);

  // State for mode 2: jurisdictions × 1 activity
  const [activity, setActivity] = useState<ActivityKey>('exchange');
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<Jurisdiction[]>(['eu', 'us', 'sg']);

  const toggleActivity = (a: ActivityKey) => {
    setSelectedActivities((prev) => {
      if (prev.includes(a)) return prev.filter((x) => x !== a);
      if (prev.length >= 5) return prev;
      return [...prev, a];
    });
  };

  const toggleJurisdiction = (j: Jurisdiction) => {
    setSelectedJurisdictions((prev) => {
      if (prev.includes(j)) return prev.filter((x) => x !== j);
      if (prev.length >= 5) return prev;
      return [...prev, j];
    });
  };

  // Rows for mode 1
  const activityRows = useMemo(
    () =>
      selectedActivities
        .map((a) => ({
          activity: a,
          result: lookupRegulation(a, jurisdiction, locale),
        }))
        .filter((r) => r.result),
    [selectedActivities, jurisdiction, locale],
  );

  // Rows for mode 2
  const jurisdictionRows = useMemo(
    () =>
      selectedJurisdictions
        .map((j) => ({
          jurisdiction: j,
          result: lookupRegulation(activity, j, locale),
        }))
        .filter((r) => r.result),
    [selectedJurisdictions, activity, locale],
  );

  const jurisdictionMeta = JURISDICTIONS[jurisdiction];
  const activityLabel = tw(`activities.${activity}`);

  // --- shared cell classes ---
  // Sticky first column; uppercase label + optional lowercase description below.
  const stickyLabelCls =
    'sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]';

  // Renders the FIELD cell with a main label + short plain-English description.
  // Description is shown in smaller, non-uppercase, muted text — merging the
  // legend's per-field explanations directly into the table (M4: vocabulary
  // coherence; avoids a separate popover users might miss).
  const fieldCell = (label: string, desc: string) => (
    <td className={stickyLabelCls}>
      <div>{label}</div>
      <div className="text-[10px] normal-case font-normal text-gray-400 dark:text-gray-500 mt-1 leading-snug">
        {desc}
      </div>
    </td>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* Mode tabs — split 50/50 full width */}
      <div className="mb-6 border-b border-[var(--border)]">
        <div className="grid grid-cols-2">
          {(['activities', 'jurisdictions'] as CompareMode[]).map((m) => {
            const active = mode === m;
            const label = m === 'activities' ? tr.modeActivities : tr.modeJurisdictions;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`text-center px-4 py-3 text-base transition-colors border-b-4 -mb-px ${
                  active
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                    : 'border-transparent text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {mode === 'activities' ? (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {isFr ? (
              <>Choisissez <strong className="text-gray-900 dark:text-white">1 juridiction</strong> et sélectionnez 2 à 5 activités. Voyez toutes les obligations côte à côte.</>
            ) : (
              <>Pick <strong className="text-gray-900 dark:text-white">1 jurisdiction</strong> and select 2–5 activities. See all obligations side-by-side.</>
            )}
          </p>

          {/* Jurisdiction picker */}
          <section className="mb-6">
            <label className="block text-sm font-semibold mb-2">{tr.jurisdiction}</label>
            <div className="flex flex-wrap gap-2">
              {jurisdictionKeysSorted.map((j) => (
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
            {/* Header grid mirrors the activities grid below so the filter lands above col 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 items-center mb-2">
              <label className="block text-sm font-semibold col-span-1">
                {tr.activities} ({selectedActivities.length}/5)
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-gray-600 dark:text-gray-400 select-none col-span-1 justify-self-start">
                <input
                  type="checkbox"
                  checked={xrplOnlyFilter}
                  onChange={(e) => setXrplOnlyFilter(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>{isFr ? 'Uniquement XRPL-compatibles' : 'Only XRPL-compatible'}</span>
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {displayedActivityKeys.map((a) => {
                const isSel = selectedActivities.includes(a);
                const disabled = !isSel && selectedActivities.length >= 5;
                return (
                  <button
                    key={a}
                    onClick={() => toggleActivity(a)}
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
                      <span className="flex-1 leading-snug">{tw(`activities.${a}`)}</span>
                      <ActivityXRPLStatus activity={a} />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {activityRows.length >= 2 && <RegimeLegend defaultOpen={false} />}

          {activityRows.length < 2 ? (
            <div className="card text-center text-gray-500 py-12">
              <p>{tr.selectAtLeast2Act}</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-3 flex-wrap">
                <span className="text-2xl">{jurisdictionMeta.flag}</span>
                <h2 className="text-xl font-bold">
                  {activityRows.length} {tr.comparedIn} {jurisdictionMeta.name}
                </h2>
                <EmergingBadge code={jurisdiction} />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-20 bg-[var(--background)] text-left p-3 border-b border-r border-[var(--border)] w-32 sm:w-44 text-xs uppercase text-gray-500">
                        {tr.field}
                      </th>
                      {activityRows.map((r) => (
                        <th
                          key={r.activity}
                          className="text-left p-3 border-b border-[var(--border)] min-w-[180px] sm:min-w-[220px]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-bold leading-snug">{tw(`activities.${r.activity}`)}</div>
                            <ActivityXRPLStatus activity={r.activity} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.regime, tr.regimeDesc)}
                      {activityRows.map((r) => (
                        <td key={r.activity} className="p-3 align-top">
                          {r.result ? <RegimeDisplay result={r.result} variant="inline" excludeTypes={['licence-framework']} /> : tr.noData}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.risk, tr.riskDesc)}
                      {activityRows.map((r) => (
                        <td key={r.activity} className="p-3 align-top">
                          {r.result && <RiskBadge risk={r.result.risk} />}
                        </td>
                      ))}
                    </tr>
                    {/* 🟢 ZONE B — OUTPUTS */}
                    <tr className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-[var(--border)]">
                      <td colSpan={activityRows.length + 1} className="p-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">
                          {isFr ? 'OUTPUTS — Ce que vous devez faire' : 'OUTPUTS — What you must do'}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.licences, tr.licencesDesc)}
                      {activityRows.map((r) => (
                        <td key={r.activity} className="p-3 align-top">
                          <ul className="space-y-1">
                            {r.result?.licenses.map((l, i) => (
                              <li key={i} className="block mb-1">
                                <LicencePillsDisplay value={l} size="xs" />
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.obligations, tr.obligationsDesc)}
                      {activityRows.map((r) => (
                        <td key={r.activity} className="p-3 align-top">
                          <ul className="list-disc ml-4 text-xs space-y-1">
                            {r.result?.obligations.map((o, i) => (
                              <li key={i}><LinkedText>{o}</LinkedText></li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    {/* 🟠 ZONE C — CONTEXT */}
                    <tr className="bg-amber-50 dark:bg-amber-900/20 border-b border-[var(--border)]">
                      <td colSpan={activityRows.length + 1} className="p-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">
                          {isFr ? 'CONTEXT — Quand, combien, auprès de qui' : 'CONTEXT — When, how much, with whom'}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.timeline, tr.timelineDesc)}
                      {activityRows.map((r) => (
                        <td key={r.activity} className="p-3 align-top font-semibold whitespace-pre-line">
                          {r.result?.time}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.cost, tr.costDesc)}
                      {activityRows.map((r) => (
                        <td key={r.activity} className="p-3 align-top font-semibold whitespace-pre-line">
                          {r.result?.cost}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.authority, tr.authorityDesc)}
                      {activityRows.map((r) => (
                        <td key={r.activity} className="p-3 align-top text-sm">
                          {r.result?.authority && <LicencePillsDisplay value={r.result.authority} size="xs" />}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {fieldCell(tr.xrplNote, tr.xrplNoteDesc)}
                      {activityRows.map((r) => (
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
                <Link href="/assess" className="btn-primary text-sm inline-block">
                  {tr.fullWizard} &rarr;
                </Link>
              </section>
            </>
          )}
        </>
      ) : (
        // ============================================================
        // MODE 2: Jurisdictions × 1 activity
        // ============================================================
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {isFr ? (
              <>Choisissez <strong className="text-gray-900 dark:text-white">1 activité</strong> et 2 à 5 juridictions, puis comparez <strong className="text-gray-900 dark:text-white">régimes, coûts et délais</strong>.</>
            ) : (
              <>Pick <strong className="text-gray-900 dark:text-white">1 activity</strong> and 2–5 jurisdictions and compare <strong className="text-gray-900 dark:text-white">regimes, costs and timelines</strong>.</>
            )}
          </p>

          {/* Activity picker (single select) */}
          <section className="mb-6">
            {/* Header grid mirrors the activities grid below so the filter lands above col 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 items-center mb-2">
              <label className="block text-sm font-semibold col-span-1">{tr.activity}</label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-gray-600 dark:text-gray-400 select-none col-span-1 justify-self-start">
                <input
                  type="checkbox"
                  checked={xrplOnlyFilter}
                  onChange={(e) => setXrplOnlyFilter(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>{isFr ? 'Uniquement XRPL-compatibles' : 'Only XRPL-compatible'}</span>
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {displayedActivityKeys.map((a) => (
                <button
                  key={a}
                  onClick={() => setActivity(a)}
                  className={`px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                    activity === a
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'border-[var(--border)] hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1 leading-snug">{tw(`activities.${a}`)}</span>
                    <ActivityXRPLStatus activity={a} />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Jurisdictions picker (multi select) */}
          <section className="mb-8">
            <label className="block text-sm font-semibold mb-2">
              {tr.jurisdictions} ({selectedJurisdictions.length}/5)
            </label>
            <div className="flex flex-wrap gap-2">
              {jurisdictionKeysSorted.map((j) => {
                const isSel = selectedJurisdictions.includes(j);
                const disabled = !isSel && selectedJurisdictions.length >= 5;
                return (
                  <button
                    key={j}
                    onClick={() => toggleJurisdiction(j)}
                    disabled={disabled}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors flex items-center gap-2 ${
                      isSel
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                        : disabled
                          ? 'border-[var(--border)] opacity-40 cursor-not-allowed'
                          : 'border-[var(--border)] hover:border-blue-300'
                    }`}
                  >
                    <span className="text-lg">{JURISDICTIONS[j].flag}</span>
                    <span>{JURISDICTIONS[j].name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {jurisdictionRows.length >= 2 && <RegimeLegend defaultOpen={false} />}

          {jurisdictionRows.length < 2 ? (
            <div className="card text-center text-gray-500 py-12">
              <p>{tr.selectAtLeast2Juri}</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold">
                  {jurisdictionRows.length} {tr.comparedFor} {activityLabel}
                </h2>
                <ActivityXRPLStatus activity={activity} />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-20 bg-[var(--background)] text-left p-3 border-b border-r border-[var(--border)] w-32 sm:w-44 text-xs uppercase text-gray-500">
                        {tr.field}
                      </th>
                      {jurisdictionRows.map((r) => (
                        <th
                          key={r.jurisdiction}
                          className="text-left p-3 border-b border-[var(--border)] min-w-[180px] sm:min-w-[220px]"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg">{JURISDICTIONS[r.jurisdiction].flag}</span>
                            <span className="font-bold">{JURISDICTIONS[r.jurisdiction].name}</span>
                            <EmergingBadge code={r.jurisdiction} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.regime, tr.regimeDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top">
                          {r.result ? <RegimeDisplay result={r.result} variant="inline" excludeTypes={['licence-framework']} /> : tr.noData}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.risk, tr.riskDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top">
                          {r.result && <RiskBadge risk={r.result.risk} />}
                        </td>
                      ))}
                    </tr>
                    {/* 🟢 ZONE B — OUTPUTS */}
                    <tr className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-[var(--border)]">
                      <td colSpan={jurisdictionRows.length + 1} className="p-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">
                          {isFr ? 'OUTPUTS — Ce que vous devez faire' : 'OUTPUTS — What you must do'}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.licences, tr.licencesDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top">
                          <ul className="space-y-1">
                            {r.result?.licenses.map((l, i) => (
                              <li key={i} className="block mb-1">
                                <LicencePillsDisplay value={l} size="xs" />
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.obligations, tr.obligationsDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top">
                          <ul className="list-disc ml-4 text-xs space-y-1">
                            {r.result?.obligations.map((o, i) => (
                              <li key={i}><LinkedText>{o}</LinkedText></li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    {/* 🟠 ZONE C — CONTEXT */}
                    <tr className="bg-amber-50 dark:bg-amber-900/20 border-b border-[var(--border)]">
                      <td colSpan={jurisdictionRows.length + 1} className="p-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">
                          {isFr ? 'CONTEXT — Quand, combien, auprès de qui' : 'CONTEXT — When, how much, with whom'}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.timeline, tr.timelineDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top font-semibold whitespace-pre-line">
                          {r.result?.time}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.cost, tr.costDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top font-semibold whitespace-pre-line">
                          {r.result?.cost}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      {fieldCell(tr.authority, tr.authorityDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top text-sm">
                          {r.result?.authority && <LicencePillsDisplay value={r.result.authority} size="xs" />}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {fieldCell(tr.xrplNote, tr.xrplNoteDesc)}
                      {jurisdictionRows.map((r) => (
                        <td key={r.jurisdiction} className="p-3 align-top text-xs text-gray-600 dark:text-gray-400">
                          {r.result?.xrplNote ?? '—'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}

      <p className="text-xs text-gray-500 text-center mt-10 italic">
        {tr.disclaimer}
      </p>
    </div>
  );
}
