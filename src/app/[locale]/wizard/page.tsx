'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { ACTIVITIES, JURISDICTIONS, type ActivityKey, type Jurisdiction } from '@/types';
import XRPLBadge from '@/components/ui/XRPLBadge';

const ACTIVITY_KEYS = Object.keys(ACTIVITIES) as ActivityKey[];
const JURISDICTION_KEYS = Object.keys(JURISDICTIONS) as Jurisdiction[];

export default function WizardPage() {
  const t = useTranslations('wizard');
  const tw = useTranslations('wizard');
  const router = useRouter();
  const [selectedActivities, setSelectedActivities] = useState<ActivityKey[]>([]);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<Jurisdiction[]>([]);

  const toggleActivity = (a: ActivityKey) => {
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const toggleJurisdiction = (j: Jurisdiction) => {
    setSelectedJurisdictions((prev) =>
      prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]
    );
  };

  const canSubmit = selectedActivities.length > 0 && selectedJurisdictions.length > 0;

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.set('activities', selectedActivities.join(','));
    params.set('jurisdictions', selectedJurisdictions.join(','));
    router.push(`/report?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
      <p className="text-sm text-gray-500 mb-10">
        {t('step1.subtitle')}
      </p>

      {/* Activities — multi-select */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">{t('step1.title')}</h2>
        <p className="text-xs text-gray-500 mb-4">Select all that apply</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {ACTIVITY_KEYS.map((key) => {
            const active = selectedActivities.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleActivity(key)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all ${
                  active
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                    : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {active && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium">{tw(`activities.${key}`)}</span>
                </span>
                {ACTIVITIES[key].xrpl && <XRPLBadge />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Jurisdictions — multi-select */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-1">{t('step3.title')}</h2>
        <p className="text-xs text-gray-500 mb-4">Select all that apply</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {JURISDICTION_KEYS.map((code) => {
            const j = JURISDICTIONS[code];
            const active = selectedJurisdictions.includes(code);
            return (
              <button
                key={code}
                onClick={() => toggleJurisdiction(code)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-left transition-all ${
                  active
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                    : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {active && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-xl">{j.flag}</span>
                <span className="text-sm font-medium">{j.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Summary + Submit */}
      <div className="sticky bottom-0 bg-[var(--background)] border-t border-[var(--border)] -mx-4 px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="text-sm text-gray-500">
            {selectedActivities.length > 0 && (
              <span>{selectedActivities.length} activit{selectedActivities.length > 1 ? 'ies' : 'y'}</span>
            )}
            {selectedActivities.length > 0 && selectedJurisdictions.length > 0 && <span> &times; </span>}
            {selectedJurisdictions.length > 0 && (
              <span>{selectedJurisdictions.length} jurisdiction{selectedJurisdictions.length > 1 ? 's' : ''}</span>
            )}
            {selectedActivities.length > 0 && selectedJurisdictions.length > 0 && (
              <span className="ml-2 font-semibold text-blue-600">= {selectedActivities.length * selectedJurisdictions.length} results</span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('generate')} &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
