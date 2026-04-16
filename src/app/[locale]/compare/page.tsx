'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { JURISDICTIONS, ACTIVITIES, type ActivityKey, type Jurisdiction } from '@/types';
import { lookupRegulation } from '@/lib/regulations-lookup';
import CompareTable from '@/components/compare/CompareTable';

const ACTIVITY_KEYS = Object.keys(ACTIVITIES) as ActivityKey[];
const JURISDICTION_KEYS = Object.keys(JURISDICTIONS) as Jurisdiction[];

export default function ComparePage() {
  const t = useTranslations('compare');
  const tw = useTranslations('wizard');
  const tc = useTranslations('common');
  const [activity, setActivity] = useState<ActivityKey | ''>('');
  const [selected, setSelected] = useState<Jurisdiction[]>([]);

  const toggleJurisdiction = (j: Jurisdiction) => {
    setSelected((prev) =>
      prev.includes(j) ? prev.filter((x) => x !== j) : prev.length < 3 ? [...prev, j] : prev
    );
  };

  const results = selected.map((j) => ({
    jurisdiction: j,
    result: activity ? lookupRegulation(activity as ActivityKey, j) : null,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      {/* Activity select */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">{t('selectActivity')}</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityKey)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">{t('selectActivity')}</option>
          {ACTIVITY_KEYS.map((key) => (
            <option key={key} value={key}>{tw(`activities.${key}`)}</option>
          ))}
        </select>
      </div>

      {/* Jurisdiction multi-select */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">{t('selectJurisdictions')}</label>
        <div className="flex flex-wrap gap-2">
          {JURISDICTION_KEYS.map((code) => {
            const j = JURISDICTIONS[code];
            const isSelected = selected.includes(code);
            return (
              <button
                key={code}
                onClick={() => toggleJurisdiction(code)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span>{j.flag}</span>
                <span className="font-medium">{j.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison table */}
      {activity && selected.length >= 2 && (
        <CompareTable results={results} />
      )}

      {activity && selected.length < 2 && (
        <p className="text-center text-gray-500 py-8">{t('selectJurisdictions')}</p>
      )}

      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
