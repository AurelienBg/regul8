'use client';

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

  if (activities.length === 0 || jurisdictions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">No activities or jurisdictions selected.</p>
        <Link href="/wizard" className="btn-primary">{t('newCheck')}</Link>
      </div>
    );
  }

  const hasCustody = activities.includes('custody');

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
                  {/* Regime */}
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('regime')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 font-semibold text-sm">{r?.regime ?? 'N/A'}</td>;
                    })}
                  </tr>
                  {/* Risk */}
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('risk')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3">{r ? <RiskBadge risk={r.risk} /> : 'N/A'}</td>;
                    })}
                  </tr>
                  {/* Licences */}
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
                  {/* Obligations */}
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
                  {/* Timeline */}
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('timeline')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 font-bold text-sm">{r?.time ?? 'N/A'}</td>;
                    })}
                  </tr>
                  {/* Cost */}
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">{t('cost')}</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 font-bold text-sm">{r?.cost ?? 'N/A'}</td>;
                    })}
                  </tr>
                  {/* Authority */}
                  <tr className="border-b border-[var(--border)]">
                    <td className="p-3 font-medium text-gray-500 text-xs uppercase">Authority</td>
                    {jurisdictions.map((j) => {
                      const r = lookupRegulation(activity, j);
                      return <td key={j} className="p-3 text-xs text-gray-600 dark:text-gray-400">{r?.authority ?? 'N/A'}</td>;
                    })}
                  </tr>
                  {/* Alternatives */}
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
            /* Single jurisdiction — card layout */
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

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-800 dark:text-amber-200">{tc('disclaimer')}</p>
      </div>

      {/* Deepen with AI */}
      <div className="mt-6 text-center">
        <Link href="/search" className="btn-secondary">
          Deepen with AI Search &rarr;
        </Link>
      </div>
    </div>
  );
}
