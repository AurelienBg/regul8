'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, type ActivityKey, type Jurisdiction } from '@/types';
import { lookupRegulation } from '@/lib/regulations-lookup';
import RiskBadge from '@/components/ui/RiskBadge';
import EmergingBadge from '@/components/ui/EmergingBadge';
import LinkedText from '@/components/ui/LinkedText';
import XRPLNote from '@/components/report/XRPLNote';
import CustodyImplementations from '@/components/report/CustodyImplementations';
import SourcesList from '@/components/report/SourcesList';
import RegimeDisplay from '@/components/report/RegimeDisplay';
import RegimeLegend from '@/components/report/RegimeLegend';
import ExtendedInfo from '@/components/report/ExtendedInfo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReportPage() {
  const t = useTranslations('report');
  const tc = useTranslations('common');
  const tw = useTranslations('wizard');
  const locale = useLocale();
  const params = useSearchParams();

  const activities = (params.get('activities') ?? '').split(',').filter(Boolean) as ActivityKey[];
  const jurisdictions = (params.get('jurisdictions') ?? '').split(',').filter(Boolean) as Jurisdiction[];
  /** Optional free-form activity outside our taxonomy (e.g., 'Digital product passport').
   *  Passed by /assess when the user fills the 'Other activity' field. */
  const otherActivity = (params.get('other') ?? '').trim();

  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const aiFiredRef = useRef(false);

  /** Cache key: same activities + other + jurisdictions + locale → same cached AI audit */
  const aiCacheKey = `${[...activities].sort().join(',')}|other:${otherActivity}|${[...jurisdictions].sort().join(',')}|${locale}`;
  const AI_CACHE_STORAGE_KEY = 'regul8:report:ai-cache';

  // Try cache first; fall back to live generation. Runs once on mount.
  useEffect(() => {
    if (aiFiredRef.current) return;
    // Skip AI if we don't have ANY activity input + at least one jurisdiction
    const noActivityInput = activities.length === 0 && !otherActivity;
    if (noActivityInput || jurisdictions.length === 0) return;

    // Check cache
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(AI_CACHE_STORAGE_KEY);
        if (raw) {
          const cache = JSON.parse(raw) as Record<string, string>;
          if (cache[aiCacheKey]) {
            setAiAnalysis(cache[aiCacheKey]);
            aiFiredRef.current = true;
            return;
          }
        }
      }
    } catch {
      // ignore cache read errors, fall through to live call
    }

    // No cache → live generation
    aiFiredRef.current = true;
    handleAiAnalysisRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities.length, jurisdictions.length, aiCacheKey]);

  // Persist completed audits into the cache (keyed by selection + locale).
  // Caps the cache at 20 entries to keep localStorage small.
  useEffect(() => {
    if (aiLoading) return;
    if (!aiAnalysis) return;
    if (aiAnalysis.startsWith('Error')) return;
    try {
      if (typeof window === 'undefined') return;
      const raw = localStorage.getItem(AI_CACHE_STORAGE_KEY);
      const cache: Record<string, string> = raw ? JSON.parse(raw) : {};
      cache[aiCacheKey] = aiAnalysis;
      const keys = Object.keys(cache);
      if (keys.length > 20) {
        // Drop oldest N entries above the cap (FIFO on JSON key order).
        const trimmed: Record<string, string> = {};
        keys.slice(-20).forEach((k) => { trimmed[k] = cache[k]; });
        localStorage.setItem(AI_CACHE_STORAGE_KEY, JSON.stringify(trimmed));
      } else {
        localStorage.setItem(AI_CACHE_STORAGE_KEY, JSON.stringify(cache));
      }
    } catch {
      // ignore quota errors
    }
  }, [aiLoading, aiAnalysis, aiCacheKey]);

  // Ref to call handleAiAnalysis from the useEffect above
  const handleAiAnalysisRef = useRef<() => void>();

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  };

  // Report is valid if we have at least (activities OR other) AND jurisdictions
  const hasStructuredActivities = activities.length > 0;
  const hasOtherActivity = otherActivity.length > 0;
  const hasAnyActivityInput = hasStructuredActivities || hasOtherActivity;

  if (!hasAnyActivityInput || jurisdictions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">{t('noSelection')}</p>
        <Link href="/assess" className="btn-primary">{t('newCheck')}</Link>
      </div>
    );
  }

  const hasCustody = activities.includes('custody');

  // Build context summary for AI
  const buildAiContext = () => {
    const sections: string[] = [];

    // Custom (non-taxonomy) activity — flagged prominently so Claude addresses it explicitly
    if (otherActivity) {
      sections.push(`## CUSTOM ACTIVITY (outside Regul8 taxonomy) — ${jurisdictions.map((j) => JURISDICTIONS[j]?.name ?? j).join(', ')}
Description: ${otherActivity}
(No structured regulation data in our database — please analyse based on general knowledge and jurisdiction-specific context. Flag that a specific legal opinion is strongly recommended.)`);
    }

    for (const activity of activities) {
      for (const j of jurisdictions) {
        const r = lookupRegulation(activity, j, locale);
        if (!r) continue;
        sections.push(`## ${activity.toUpperCase()} — ${JURISDICTIONS[j]?.name}
Regime: ${r.regime}
Risk: ${r.risk}
Licences: ${r.licenses.join(', ')}
Obligations: ${r.obligations.join(', ')}
Timeline: ${r.time}
Cost: ${r.cost}
Authority: ${r.authority}
${r.xrplNote ? `XRPL note: ${r.xrplNote}` : ''}
${r.custodyNote ? `Custody note: ${r.custodyNote}` : ''}`);
      }
    }
    return sections.join('\n\n');
  };

  const handleAiAnalysis = async () => {
    setAiLoading(true);
    setAiAnalysis('');

    const context = buildAiContext();
    const query = `Based on the following regulatory data for a startup, provide:

1. **Compliance Roadmap** — Step-by-step plan (numbered, 5-7 steps) with priorities and order
2. **Key Risks** — Top 3-5 risks to watch, especially grey zones and regulatory gaps
3. **Recommendations** — Concrete, actionable advice: which jurisdiction to prioritize, which licence to get first, what to prepare
4. **Cost & Timeline Optimization** — How to reduce time and cost (e.g., start with Liechtenstein TVTG, passport to EU)

Regulatory context:
${context}

Be specific, actionable, and direct. Highlight any XRPL-specific considerations.`;

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch {
          // not JSON
        }
        setAiAnalysis(`Error: ${msg}`);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              setAiAnalysis((prev) => prev + `\n\n⚠️ Error: ${parsed.error}`);
            } else if (parsed.text) {
              setAiAnalysis((prev) => prev + parsed.text);
            }
          } catch {
            // skip
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setAiAnalysis(`Error generating analysis: ${msg}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handlePrintPdf = () => {
    if (typeof window !== 'undefined') window.print();
  };

  // Wire the ref for the mount-time auto-trigger
  handleAiAnalysisRef.current = handleAiAnalysis;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 print-container">
      <div className="flex items-center justify-between mb-8 gap-2 flex-wrap no-print">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintPdf}
            className="btn-secondary text-sm flex items-center gap-2"
            title={t('savePdf')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m-3-8a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
            {t('savePdf')}
          </button>
          <button
            onClick={handleShare}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {t('share')}
              </>
            )}
          </button>
          <Link href="/assess" className="btn-secondary text-sm">{t('newCheck')}</Link>
        </div>
      </div>

      {/* Print-only title */}
      <h1 className="hidden print-only text-2xl font-bold mb-6">
        Regul8 — {t('title')}
      </h1>

      {/* Custom activity banner — when the user filled the 'Other' field in /assess */}
      {otherActivity && (
        <div className="mb-6 p-4 rounded-lg border-2 border-violet-300 dark:border-violet-800 bg-violet-50/80 dark:bg-violet-900/20">
          <div className="flex items-start gap-3">
            <span className="text-xl leading-none">✨</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm mb-1">
                {locale === 'fr' ? 'Activité hors taxonomie détectée' : 'Custom activity detected'}
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                <span className="inline-block px-2 py-0.5 rounded bg-white dark:bg-gray-900 border border-violet-300 dark:border-violet-700 font-semibold text-violet-700 dark:text-violet-300">
                  {otherActivity}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {locale === 'fr'
                  ? "Cette activité n'est pas dans notre liste de 20 activités structurées — nous n'avons pas de data réglementaire dédiée. L'analyse IA (ci-dessous) en tiendra compte et donnera une orientation générale, mais un avis juridique spécifique est fortement recommandé."
                  : 'This activity is outside our 20-activity taxonomy — we don\'t have dedicated regulation data for it. The AI analysis (below) will factor it in and give general guidance, but a specific legal opinion is strongly recommended.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend explaining Regime / Licence / Ruling / Authority — only shown when structured data exists */}
      {hasStructuredActivities && <RegimeLegend />}

      {/* Empty-state when only `other` is present — no structured activity rows to render */}
      {!hasStructuredActivities && hasOtherActivity && (
        <div className="mb-10 p-6 rounded-xl border border-[var(--border)] bg-gray-50 dark:bg-gray-900/40 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {locale === 'fr'
              ? "Pas de table de régulations à afficher (pas d'activité structurée sélectionnée). Vous pouvez lancer l'analyse IA ci-dessous ou retourner sur Assess pour ajouter une activité de notre liste."
              : 'No regulation tables to show (no structured activity selected). You can run the AI analysis below, or go back to Assess to add an activity from our list.'}
          </p>
          <Link href="/assess" className="btn-secondary text-sm">
            ← Assess
          </Link>
        </div>
      )}

      {/* Results grid */}
      {activities.map((activity) => (
        <section key={activity} className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            {tw(`activities.${activity}`)}
          </h2>

          {/* If multiple jurisdictions, show comparison */}
          {jurisdictions.length > 1 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-20 bg-[var(--background)] text-left p-3 border-b border-r border-[var(--border)] w-28 sm:w-40" />
                    {jurisdictions.map((j) => (
                      <th key={j} className="text-left p-3 border-b border-[var(--border)] min-w-[160px] sm:min-w-[200px]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-lg">{JURISDICTIONS[j]?.flag}</span>
                          <span>{JURISDICTIONS[j]?.name}</span>
                          <EmergingBadge code={j} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t('regime')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return <td key={j} className="p-3 align-top text-sm">{r ? <RegimeDisplay result={r} variant="inline" /> : 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t('risk')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return <td key={j} className="p-3 align-top">{r ? <RiskBadge risk={r.risk} /> : 'N/A'}</td>;
                    })}
                  </tr>
                  {/* 🟢 ZONE B — OUTPUTS (what you must do) */}
                  <tr className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-[var(--border)]">
                    <td colSpan={jurisdictions.length + 1} className="p-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">
                        {locale === 'fr' ? 'OUTPUTS — Ce que vous devez faire' : 'OUTPUTS — What you must do'}
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t('licenses')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return (
                        <td key={j} className="p-3 align-top">
                          {r ? (
                            <ul className="space-y-1">
                              {r.licenses.map((l, i) => (
                                <li key={i} className="text-xs"><span className="badge-license"><LinkedText>{l}</LinkedText></span></li>
                              ))}
                            </ul>
                          ) : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t('obligations')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return (
                        <td key={j} className="p-3 align-top">
                          {r ? (
                            <ul className="space-y-1">
                              {r.obligations.map((o, i) => (
                                <li key={i} className="text-xs text-gray-600 dark:text-gray-400">&bull; <LinkedText>{o}</LinkedText></li>
                              ))}
                            </ul>
                          ) : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                  {/* 🟠 ZONE C — CONTEXT (timelines, cost, regulator, alternatives) */}
                  <tr className="bg-amber-50 dark:bg-amber-900/20 border-b border-[var(--border)]">
                    <td colSpan={jurisdictions.length + 1} className="p-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">
                        {locale === 'fr' ? 'CONTEXT — Quand, combien, auprès de qui' : 'CONTEXT — When, how much, with whom'}
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t('timeline')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return <td key={j} className="p-3 align-top font-bold text-sm whitespace-pre-line">{r?.time ?? 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t('cost')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return <td key={j} className="p-3 align-top font-bold text-sm whitespace-pre-line">{r?.cost ?? 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t("authority")}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return <td key={j} className="p-3 align-top text-xs text-gray-600 dark:text-gray-400">{r?.authority ?? 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="sticky left-0 z-10 bg-[var(--background)] p-3 align-top font-medium text-gray-500 text-xs uppercase border-r border-[var(--border)]">{t('alternatives')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j, locale);
                      return (
                        <td key={j} className="p-3 align-top">
                          {r?.alts?.map((a, i) => (
                            <div key={i} className="text-xs text-blue-600 dark:text-blue-400">&rarr; {a}</div>
                          )) ?? 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Extended operational info (reporting / marketing / eligibility) — only render if any jurisdiction has it */}
                  {jurisdictions.some((j) => {
                    const r = lookupRegulation(activity, j, locale);
                    return r?.reportingFrequency || r?.marketingRules || r?.clientEligibility;
                  }) && (
                    <tr>
                      <td colSpan={jurisdictions.length + 1} className="p-3 align-top">
                        <div className="grid md:grid-cols-2 gap-3">
                          {jurisdictions.map((j) => {
                            const r = lookupRegulation(activity, j, locale);
                            if (!r || (!r.reportingFrequency && !r.marketingRules && !r.clientEligibility)) return null;
                            return (
                              <div key={j} className="p-3 rounded-lg border border-[var(--border)]">
                                <div className="flex items-center gap-1.5 mb-2 text-sm font-semibold">
                                  <span>{JURISDICTIONS[j]?.flag}</span>
                                  <span>{JURISDICTIONS[j]?.name}</span>
                                </div>
                                <ExtendedInfo result={r} variant="inline" />
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            jurisdictions.map((j) => {
              const r = lookupRegulation(activity, j, locale);
              if (!r) return <p key={j} className="text-gray-500">No data for {JURISDICTIONS[j]?.name}</p>;
              return (
                <div key={j} className="card mb-4">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xl">{JURISDICTIONS[j]?.flag}</span>
                        <span className="font-semibold">{JURISDICTIONS[j]?.name}</span>
                        <EmergingBadge code={j} />
                      </div>
                      <div className="mt-2"><RegimeDisplay result={r} variant="block" /></div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-normal mb-1">
                        {t('risk')}
                      </div>
                      <RiskBadge risk={r.risk} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('licenses')}</p>
                      <div className="space-y-1">
                        {r.licenses.map((l, i) => (
                          <div key={i}><span className="badge-license"><LinkedText>{l}</LinkedText></span></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('obligations')}</p>
                      <ul className="space-y-1">
                        {r.obligations.map((o, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400">&bull; <LinkedText>{o}</LinkedText></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-4 border-t border-[var(--border)]">
                    <div>
                      <p className="text-xs text-gray-500">{t('timeline')}</p>
                      <p className="text-sm whitespace-pre-line">{r.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('cost')}</p>
                      <p className="text-sm whitespace-pre-line">{r.cost}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">{t("authority")}</p>
                      <p className="text-sm"><LinkedText>{r.authority}</LinkedText></p>
                    </div>
                  </div>

                  {r.alts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[var(--border)]">
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('alternatives')}</p>
                      {r.alts.map((a, i) => (
                        <div key={i} className="text-sm text-blue-600 dark:text-blue-400">&rarr; <LinkedText>{a}</LinkedText></div>
                      ))}
                    </div>
                  )}

                  <ExtendedInfo result={r} variant="block" />
                  {r.xrplNote && <XRPLNote note={r.xrplNote} />}
                </div>
              );
            })
          )}

          {/* XRPL notes for comparison view */}
          {jurisdictions.length > 1 && (
            <div className="mt-4 space-y-2">
              {jurisdictions.map((j) => {
                const r = lookupRegulation(activity, j, locale);
                if (!r?.xrplNote) return null;
                return (
                  <div key={j} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">{JURISDICTIONS[j]?.flag}</span>
                    <XRPLNote note={r.xrplNote} />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ))}

      {/* Custody implementations */}
      {hasCustody && <CustodyImplementations />}

      {/* Sources — auto-detected from regime / licences / obligations */}
      <SourcesList
        results={activities.flatMap((a) =>
          jurisdictions
            .map((j) => lookupRegulation(a, j, locale))
            .filter((r): r is NonNullable<typeof r> => r != null),
        )}
      />

      {/* AI Analysis Section */}
      <section className="mt-12 pt-8 border-t-2 border-[var(--border)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-xrpl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">{t('aiTitle')}</h2>
            <p className="text-sm text-gray-500">{t('aiSubtitle')}</p>
          </div>
        </div>

        {aiLoading && !aiAnalysis && (
          <div className="card mt-4 bg-gradient-to-br from-blue-50/50 to-xrpl-50/30 dark:from-blue-900/10 dark:to-xrpl/5">
            <div className="flex items-center gap-3 text-gray-500 mb-4">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>{t('aiAnalyzing')}</span>
            </div>
            {/* Skeleton lines */}
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-11/12" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        )}

        {aiAnalysis && (
          <div className="card mt-4 bg-gradient-to-br from-blue-50/50 to-xrpl-50/30 dark:from-blue-900/10 dark:to-xrpl/5">
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed ai-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: (p) => (
                    <h3 className="text-lg font-bold mt-6 mb-3 text-blue-700 dark:text-blue-300 pl-3 border-l-4 border-blue-500" {...p} />
                  ),
                  h2: (p) => (
                    <h4 className="text-base font-bold mt-5 mb-2 text-blue-700 dark:text-blue-300 pl-3 border-l-4 border-blue-400" {...p} />
                  ),
                  h3: (p) => (
                    <h5 className="text-sm font-bold mt-4 mb-1.5 text-gray-900 dark:text-gray-100" {...p} />
                  ),
                  p: (p) => <p className="mb-3" {...p} />,
                  ul: (p) => <ul className="list-disc ml-5 mb-3 space-y-1.5 marker:text-blue-500" {...p} />,
                  ol: (p) => <ol className="list-decimal ml-5 mb-3 space-y-1.5 marker:text-blue-500 marker:font-semibold" {...p} />,
                  li: (p) => <li className="leading-relaxed pl-1" {...p} />,
                  strong: (p) => <strong className="font-semibold text-blue-800 dark:text-blue-200" {...p} />,
                  em: (p) => <em className="italic text-gray-800 dark:text-gray-200" {...p} />,
                  code: (p) => <code className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs font-mono" {...p} />,
                  a: (p) => <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer" {...p} />,
                  blockquote: (p) => <blockquote className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20 pl-4 py-2 my-3 text-sm" {...p} />,
                  hr: () => <hr className="my-5 border-gray-200 dark:border-gray-700" />,
                  table: (p) => <table className="w-full text-sm my-3 border-collapse" {...p} />,
                  thead: (p) => <thead className="bg-blue-50 dark:bg-blue-900/30" {...p} />,
                  th: (p) => <th className="text-left p-2 border border-gray-200 dark:border-gray-700 font-semibold text-blue-800 dark:text-blue-200" {...p} />,
                  td: (p) => <td className="p-2 border border-gray-200 dark:border-gray-700 align-top" {...p} />,
                }}
              >
                {aiAnalysis}
              </ReactMarkdown>
            </div>
            {!aiLoading && (
              <button
                onClick={handleAiAnalysis}
                className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline no-print"
              >
                {t('aiRegenerate')}
              </button>
            )}
          </div>
        )}
      </section>

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-800 dark:text-amber-200">{tc('disclaimer')}</p>
      </div>
    </div>
  );
}
