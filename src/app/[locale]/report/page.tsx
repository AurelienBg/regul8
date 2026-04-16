'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, type ActivityKey, type Jurisdiction } from '@/types';
import { lookupRegulation } from '@/lib/regulations-lookup';
import RiskBadge from '@/components/ui/RiskBadge';
import XRPLNote from '@/components/report/XRPLNote';
import CustodyImplementations from '@/components/report/CustodyImplementations';

export default function ReportPage() {
  const t = useTranslations('report');
  const tc = useTranslations('common');
  const tw = useTranslations('wizard');
  const params = useSearchParams();

  const activities = (params.get('activities') ?? '').split(',').filter(Boolean) as ActivityKey[];
  const jurisdictions = (params.get('jurisdictions') ?? '').split(',').filter(Boolean) as Jurisdiction[];

  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  if (activities.length === 0 || jurisdictions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">No activities or jurisdictions selected.</p>
        <Link href="/wizard" className="btn-primary">{t('newCheck')}</Link>
      </div>
    );
  }

  const hasCustody = activities.includes('custody');

  // Build context summary for AI
  const buildAiContext = () => {
    const sections: string[] = [];
    for (const activity of activities) {
      for (const j of jurisdictions) {
        const r = lookupRegulation(activity, j);
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
            const { text } = JSON.parse(data);
            setAiAnalysis((prev) => prev + text);
          } catch {
            // skip
          }
        }
      }
    } catch {
      setAiAnalysis('Error generating analysis. Please check your API key.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <Link href="/wizard" className="btn-secondary text-sm">{t('newCheck')}</Link>
      </div>

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
                    <th className="text-left p-3 border-b border-[var(--border)] w-40" />
                    {jurisdictions.map((j) => (
                      <th key={j} className="text-left p-3 border-b border-[var(--border)] min-w-[200px]">
                        <span className="text-lg mr-1">{JURISDICTIONS[j]?.flag}</span>
                        {JURISDICTIONS[j]?.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('regime')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 font-semibold text-sm">{r?.regime ?? 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('risk')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3">{r ? <RiskBadge risk={r.risk} /> : 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('licenses')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return (
                        <td key={j} className="p-3">
                          {r ? (
                            <ul className="space-y-1">
                              {r.licenses.map((l, i) => (
                                <li key={i} className="text-xs"><span className="badge-license">{l}</span></li>
                              ))}
                            </ul>
                          ) : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('obligations')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return (
                        <td key={j} className="p-3">
                          {r ? (
                            <ul className="space-y-1">
                              {r.obligations.map((o, i) => (
                                <li key={i} className="text-xs text-gray-600 dark:text-gray-400">&bull; {o}</li>
                              ))}
                            </ul>
                          ) : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('timeline')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 font-bold text-sm">{r?.time ?? 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('cost')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 font-bold text-sm">{r?.cost ?? 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">Authority</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 text-xs text-gray-600 dark:text-gray-400">{r?.authority ?? 'N/A'}</td>;
                    })}
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('alternatives')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return (
                        <td key={j} className="p-3">
                          {r?.alts?.map((a, i) => (
                            <div key={i} className="text-xs text-blue-600 dark:text-blue-400">&rarr; {a}</div>
                          )) ?? 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            jurisdictions.map((j) => {
              const r = lookupRegulation(activity, j);
              if (!r) return <p key={j} className="text-gray-500">No data for {JURISDICTIONS[j]?.name}</p>;
              return (
                <div key={j} className="card mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{JURISDICTIONS[j]?.flag}</span>
                        <span className="font-semibold">{JURISDICTIONS[j]?.name}</span>
                      </div>
                      <h3 className="text-lg font-bold">{r.regime}</h3>
                    </div>
                    <RiskBadge risk={r.risk} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('licenses')}</p>
                      <div className="space-y-1">
                        {r.licenses.map((l, i) => (
                          <div key={i}><span className="badge-license">{l}</span></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('obligations')}</p>
                      <ul className="space-y-1">
                        {r.obligations.map((o, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400">&bull; {o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-[var(--border)]">
                    <div>
                      <p className="text-xs text-gray-500">{t('timeline')}</p>
                      <p className="font-bold">{r.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('cost')}</p>
                      <p className="font-bold">{r.cost}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Authority</p>
                      <p className="text-sm">{r.authority}</p>
                    </div>
                  </div>

                  {r.alts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[var(--border)]">
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('alternatives')}</p>
                      {r.alts.map((a, i) => (
                        <div key={i} className="text-sm text-blue-600 dark:text-blue-400">&rarr; {a}</div>
                      ))}
                    </div>
                  )}

                  {r.xrplNote && <XRPLNote note={r.xrplNote} />}
                </div>
              );
            })
          )}

          {/* XRPL notes for comparison view */}
          {jurisdictions.length > 1 && (
            <div className="mt-4 space-y-2">
              {jurisdictions.map((j) => {
                const r = lookupRegulation(activity, j);
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

      {/* AI Analysis Section */}
      <section className="mt-12 pt-8 border-t-2 border-[var(--border)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-xrpl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Compliance Audit</h2>
            <p className="text-sm text-gray-500">Get a personalised roadmap, risk analysis, and recommendations</p>
          </div>
        </div>

        {!aiAnalysis && !aiLoading && (
          <button
            onClick={handleAiAnalysis}
            className="btn-primary w-full sm:w-auto text-base px-8 py-4"
          >
            Generate AI Analysis &rarr;
          </button>
        )}

        {aiLoading && !aiAnalysis && (
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Analyzing your regulatory profile...</span>
          </div>
        )}

        {aiAnalysis && (
          <div className="card mt-4 bg-gradient-to-br from-blue-50/50 to-xrpl-50/30 dark:from-blue-900/10 dark:to-xrpl/5">
            <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {aiAnalysis}
            </div>
            {!aiLoading && (
              <button
                onClick={handleAiAnalysis}
                className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Regenerate analysis
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
