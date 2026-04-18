'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { ACTIVITIES, JURISDICTIONS, type ActivityKey, type Jurisdiction } from '@/types';
import XRPLBadge from '@/components/ui/XRPLBadge';

const ACTIVITY_KEYS = Object.keys(ACTIVITIES) as ActivityKey[];
const JURISDICTION_KEYS = Object.keys(JURISDICTIONS) as Jurisdiction[];

export default function WizardPage() {
  const t = useTranslations('wizard');
  const tw = useTranslations('wizard');
  const router = useRouter();
  const locale = useLocale();
  const isFr = locale === 'fr';
  const selectAll = isFr ? "Sélectionnez tout ce qui s'applique" : 'Select all that apply';
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
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
          <p className="text-sm text-gray-500">
            {t('step1.subtitle')}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {t('generate')} &rarr;
        </button>
      </div>

      {/* 2-column: activities left (tight) + jurisdictions right */}
      <section className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 mb-10">
        {/* Activities — single compact column */}
        <div>
          <h2 className="text-lg font-semibold mb-1">{t('step1.title')}</h2>
          <p className="text-xs text-gray-500 mb-4">{selectAll}</p>
          <div className="grid gap-2">
            {ACTIVITY_KEYS.map((key) => {
              const active = selectedActivities.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleActivity(key)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border text-left transition-all ${
                    active
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                      : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {active && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm font-medium truncate">{tw(`activities.${key}`)}</span>
                  </span>
                  {ACTIVITIES[key].xrpl && <XRPLBadge />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Jurisdictions — multi-col grid */}
        <div>
          <h2 className="text-lg font-semibold mb-1">{t('step3.title')}</h2>
          <p className="text-xs text-gray-500 mb-4">{selectAll}</p>
          <div className="grid grid-cols-2 gap-2">
            {JURISDICTION_KEYS.map((code) => {
              const j = JURISDICTIONS[code];
              const active = selectedJurisdictions.includes(code);
              return (
                <button
                  key={code}
                  onClick={() => toggleJurisdiction(code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all ${
                    active
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                      : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {active && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-lg">{j.flag}</span>
                  <span className="text-sm font-medium truncate">{j.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Summary (no submit — button is in the header) */}
      {(selectedActivities.length > 0 || selectedJurisdictions.length > 0) && (
        <div className="text-sm text-gray-500 text-center mt-4">
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
      )}
    </div>
  );
}
