'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { ActivityKey, Jurisdiction, RegResult } from '@/types';
import RiskBadge from '@/components/ui/RiskBadge';
import ReportCard from '@/components/report/ReportCard';
import LicenceList from '@/components/report/LicenceList';
import ObligationList from '@/components/report/ObligationList';
import AlternativesList from '@/components/report/AlternativesList';
import XRPLNote from '@/components/report/XRPLNote';
import CustodyImplementations from '@/components/report/CustodyImplementations';

interface AnalyzeResponse {
  result: RegResult;
  narrative: string;
  checklist: string[];
}

export default function ReportPage() {
  const t = useTranslations('report');
  const tc = useTranslations('common');
  const tw = useTranslations('wizard');
  const params = useSearchParams();
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const activity = params.get('activity') as ActivityKey;
  const jurisdiction = params.get('jurisdiction') as Jurisdiction;
  const subtype = params.get('subtype') ?? '';
  const stage = params.get('stage') ?? '';
  const model = params.get('model') ?? '';
  const chain = params.get('chain') ?? '';

  useEffect(() => {
    if (!activity || !jurisdiction) {
      setError('Missing activity or jurisdiction');
      setLoading(false);
      return;
    }

    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activity, jurisdiction, subtype, stage, model, chain }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(tc('error'));
        setLoading(false);
      });
  }, [activity, jurisdiction, subtype, stage, model, chain, tc]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30" />
          <p className="text-gray-500">{t('generating')}</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500">{error || tc('error')}</p>
        <Link href="/wizard" className="btn-primary mt-4 inline-block">{t('newCheck')}</Link>
      </div>
    );
  }

  const { result, narrative, checklist } = data;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {tw(`activities.${activity}`)} &middot; {jurisdiction.toUpperCase()}
          </p>
        </div>
        <Link href="/wizard" className="btn-secondary text-sm">{t('newCheck')}</Link>
      </div>

      {/* Regime + Risk */}
      <div className="card mb-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('regime')}</p>
            <h2 className="text-lg font-bold">{result.regime}</h2>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('risk')}</p>
            <RiskBadge risk={result.risk} />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <ReportCard label={t('timeline')} value={result.time} />
        <ReportCard label={t('cost')} value={result.cost} />
      </div>

      {/* Licences & Obligations */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <LicenceList licences={result.licenses} />
        <ObligationList obligations={result.obligations} />
      </div>

      {/* Alternatives */}
      <AlternativesList alts={result.alts} />

      {/* XRPL Note */}
      {result.xrplNote && <XRPLNote note={result.xrplNote} />}

      {/* Custody implementations */}
      {activity === 'custody' && <CustodyImplementations />}

      {/* AI Narrative */}
      {narrative && (
        <div className="card mt-6">
          <h3 className="font-semibold mb-3">{t('narrative')}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {narrative}
          </div>
        </div>
      )}

      {/* Checklist */}
      {checklist.length > 0 && (
        <div className="card mt-6">
          <h3 className="font-semibold mb-3">{t('checklist')}</h3>
          <ul className="space-y-2">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
        <p className="text-xs text-amber-800 dark:text-amber-200">{tc('disclaimer')}</p>
      </div>
    </div>
  );
}
