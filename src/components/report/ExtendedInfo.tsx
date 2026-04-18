'use client';

import { useLocale } from 'next-intl';
import type { RegResult } from '@/types';
import LinkedText from '@/components/ui/LinkedText';

interface Props {
  result: RegResult;
  variant?: 'block' | 'inline';
}

/**
 * Shows the 3 optional operational fields that are not always populated:
 * reporting frequency, marketing rules, client eligibility.
 *
 * Renders nothing if all 3 are undefined. Layout:
 * - "block" (card view): 3 colored callouts stacked
 * - "inline" (table cell): compact bullet list (for compare)
 */
export default function ExtendedInfo({ result, variant = 'block' }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const { reportingFrequency, marketingRules, clientEligibility } = result;

  if (!reportingFrequency && !marketingRules && !clientEligibility) return null;

  const tr = isFr
    ? {
        reporting: 'Fréquence de reporting',
        marketing: 'Règles marketing',
        eligibility: 'Éligibilité clients',
      }
    : {
        reporting: 'Reporting frequency',
        marketing: 'Marketing rules',
        eligibility: 'Client eligibility',
      };

  if (variant === 'inline') {
    return (
      <div className="space-y-2 text-xs">
        {reportingFrequency && (
          <div>
            <div className="font-semibold text-emerald-700 dark:text-emerald-300">📅 {tr.reporting}</div>
            <p className="text-gray-700 dark:text-gray-300"><LinkedText>{reportingFrequency}</LinkedText></p>
          </div>
        )}
        {marketingRules && (
          <div>
            <div className="font-semibold text-amber-700 dark:text-amber-300">📢 {tr.marketing}</div>
            <p className="text-gray-700 dark:text-gray-300"><LinkedText>{marketingRules}</LinkedText></p>
          </div>
        )}
        {clientEligibility && (
          <div>
            <div className="font-semibold text-sky-700 dark:text-sky-300">🌍 {tr.eligibility}</div>
            <p className="text-gray-700 dark:text-gray-300"><LinkedText>{clientEligibility}</LinkedText></p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-3 mt-4">
      {reportingFrequency && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900">
          <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-wide mb-1 flex items-center gap-1">
            <span>📅</span><span>{tr.reporting}</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            <LinkedText>{reportingFrequency}</LinkedText>
          </p>
        </div>
      )}
      {marketingRules && (
        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900">
          <div className="text-[11px] font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wide mb-1 flex items-center gap-1">
            <span>📢</span><span>{tr.marketing}</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            <LinkedText>{marketingRules}</LinkedText>
          </p>
        </div>
      )}
      {clientEligibility && (
        <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-900">
          <div className="text-[11px] font-bold text-sky-800 dark:text-sky-200 uppercase tracking-wide mb-1 flex items-center gap-1">
            <span>🌍</span><span>{tr.eligibility}</span>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            <LinkedText>{clientEligibility}</LinkedText>
          </p>
        </div>
      )}
    </div>
  );
}
