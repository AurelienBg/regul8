'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { ACTIVITIES, JURISDICTIONS, type ActivityKey, type Jurisdiction } from '@/types';
import XRPLBadge from '@/components/ui/XRPLBadge';

const ACTIVITY_KEYS = Object.keys(ACTIVITIES) as ActivityKey[];
const JURISDICTION_KEYS = Object.keys(JURISDICTIONS) as Jurisdiction[];

/** Key used to persist the picker state across page navigations / reloads */
const ASSESS_STORAGE_KEY = 'regul8:assess:selection';

export default function AssessPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tw = useTranslations('wizard');
  const router = useRouter();

  const [selectedActivities, setSelectedActivities] = useState<ActivityKey[]>([]);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<Jurisdiction[]>([]);
  // Prevent the save-effect from running with empty state before the load-effect has hydrated
  const hydratedRef = useRef(false);

  // Load previously saved selection on mount
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(ASSESS_STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { activities?: ActivityKey[]; jurisdictions?: Jurisdiction[] };
        if (Array.isArray(parsed.activities)) {
          setSelectedActivities(parsed.activities.filter((a) => ACTIVITY_KEYS.includes(a)));
        }
        if (Array.isArray(parsed.jurisdictions)) {
          setSelectedJurisdictions(parsed.jurisdictions.filter((j) => JURISDICTION_KEYS.includes(j)));
        }
      }
    } catch {
      // localStorage unavailable / invalid JSON — fall back to empty state
    } finally {
      hydratedRef.current = true;
    }
  }, []);

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      localStorage.setItem(
        ASSESS_STORAGE_KEY,
        JSON.stringify({
          activities: selectedActivities,
          jurisdictions: selectedJurisdictions,
        }),
      );
    } catch {
      // ignore quota / private-mode errors
    }
  }, [selectedActivities, selectedJurisdictions]);

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

  const tr = isFr
    ? {
        title: 'Évaluer votre conformité',
        subtitle:
          "Évaluation complète multi-activités × multi-juridictions. Rapport détaillé avec régimes, licences, obligations, coûts, délais et analyse IA contextuelle.",
        includedTitle: 'Ce que contient le rapport',
        includedItems: [
          'Régime réglementaire par activité × juridiction (loi, règlement applicable)',
          "Licences requises avec coûts et délais d'obtention",
          'Obligations clés (KYC/AML, Travel Rule, reporting, capital minimum…)',
          "Règles de marketing et éligibilité des clients",
          "Notes XRPL spécifiques quand l'activité utilise XRPL",
          'Analyse IA contextuelle avec ordre de priorité et roadmap 12 mois',
        ],
        activitiesTitle: 'Activités',
        jurisdictionsTitle: 'Juridictions',
        selectAll: "Sélectionnez tout ce qui s'applique",
        generate: 'Générer le rapport',
        summary: {
          activity: (n: number) => (n > 1 ? `${n} activités` : `${n} activité`),
          jurisdiction: (n: number) => (n > 1 ? `${n} juridictions` : `${n} juridiction`),
          resultsLabel: (n: number) => `= ${n} résultats`,
        },
      }
    : {
        title: 'Assess your compliance',
        subtitle:
          'Comprehensive multi-activity × multi-jurisdiction assessment. Detailed report with regimes, licences, obligations, costs, timelines and contextual AI analysis.',
        includedTitle: "What's in the report",
        includedItems: [
          'Regulatory regime per activity × jurisdiction (applicable law / regulation)',
          'Required licences with costs and timelines',
          'Key obligations (KYC/AML, Travel Rule, reporting, minimum capital…)',
          'Marketing rules and client eligibility',
          'XRPL-specific notes when the activity uses XRPL',
          'Contextual AI analysis with priority order and 12-month roadmap',
        ],
        activitiesTitle: 'Activities',
        jurisdictionsTitle: 'Jurisdictions',
        selectAll: 'Select all that apply',
        generate: 'Generate report',
        summary: {
          activity: (n: number) => (n > 1 ? `${n} activities` : `${n} activity`),
          jurisdiction: (n: number) => (n > 1 ? `${n} jurisdictions` : `${n} jurisdiction`),
          resultsLabel: (n: number) => `= ${n} results`,
        },
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header — aligned with Understand / Compare / Check */}
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* What's in the report */}
      <section className="mb-10 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <h3 className="text-sm font-bold mb-3 uppercase tracking-wide text-gray-500">
          {tr.includedTitle}
        </h3>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {tr.includedItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pickers — 4 cols on desktop: 2 cols for activities + 2 cols for jurisdictions */}
      <section className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Activities — 2-col internal grid */}
        <div>
          <h2 className="text-lg font-semibold mb-1">{tr.activitiesTitle}</h2>
          <p className="text-xs text-gray-500 mb-4">{tr.selectAll}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {ACTIVITY_KEYS.map((key) => {
              const active = selectedActivities.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleActivity(key)}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-left transition-all ${
                    active
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                      : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
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

        {/* Jurisdictions — 2-col internal grid, Generate button at top-right */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">{tr.jurisdictionsTitle}</h2>
              <p className="text-xs text-gray-500">{tr.selectAll}</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
            >
              {tr.generate} &rarr;
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
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
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
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

      {/* Selection summary (button is above, at top-right of Jurisdictions column) */}
      {(selectedActivities.length > 0 || selectedJurisdictions.length > 0) && (
        <div className="text-sm text-gray-500 text-right">
          {selectedActivities.length > 0 && <span>{tr.summary.activity(selectedActivities.length)}</span>}
          {selectedActivities.length > 0 && selectedJurisdictions.length > 0 && <span> &times; </span>}
          {selectedJurisdictions.length > 0 && (
            <span>{tr.summary.jurisdiction(selectedJurisdictions.length)}</span>
          )}
          {selectedActivities.length > 0 && selectedJurisdictions.length > 0 && (
            <span className="ml-2 font-semibold text-blue-600">
              {tr.summary.resultsLabel(selectedActivities.length * selectedJurisdictions.length)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
