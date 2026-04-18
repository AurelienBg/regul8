'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function AssessHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'Évaluer votre conformité',
        subtitle: "Évaluation complète multi-activités × multi-juridictions. Rapport détaillé avec régimes, licences, obligations, coûts, délais et analyse IA contextuelle.",
        fullTitle: 'Évaluation complète',
        fullDesc:
          "Sélectionnez 1 à 5 activités et 1 à 5 juridictions. Obtenez en 5 minutes un rapport détaillé qui couvre, pour chaque combinaison : régime applicable, licences requises, obligations clés, coût et délai, autorité, et note XRPL spécifique. Complété automatiquement par une analyse IA avec priorités et roadmap.",
        fullDuration: '5 min · multi-activités × multi-juridictions',
        fullCta: 'Lancer le wizard',
        quickCheckTitle: 'Question plus ciblée ?',
        quickCheckDesc:
          "Pour un verdict rapide sur une question précise (token = security ? CASP requis ? Custody custodial ?), passez par Vérifier.",
        quickCheckCta: 'Ouvrir Vérifier',
        compareTitle: 'Comparer plusieurs options ?',
        compareDesc:
          "Pour empiler plusieurs activités ou juridictions côte à côte avant de décider, passez par Comparer.",
        compareCta: 'Ouvrir Comparer',
        included: 'Ce que contient le rapport',
        includedItems: [
          'Régime réglementaire par activité × juridiction (loi, règlement applicable)',
          'Licences requises avec coûts et délais d\'obtention',
          'Obligations clés (KYC/AML, Travel Rule, reporting, capital minimum…)',
          'Règles de marketing et éligibilité des clients',
          'Notes XRPL spécifiques quand l\'activité utilise XRPL',
          'Analyse IA contextuelle avec ordre de priorité et roadmap 12 mois',
        ],
      }
    : {
        title: 'Assess your compliance',
        subtitle:
          'Comprehensive multi-activity × multi-jurisdiction assessment. Detailed report with regimes, licences, obligations, costs, timelines and contextual AI analysis.',
        fullTitle: 'Full Compliance Assessment',
        fullDesc:
          'Pick 1 to 5 activities and 1 to 5 jurisdictions. In 5 minutes, get a detailed report covering, for each combination: applicable regime, required licences, key obligations, cost and timeline, authority, and XRPL-specific note. Auto-completed with an AI analysis including priorities and roadmap.',
        fullDuration: '5 min · multi-activity × multi-jurisdiction',
        fullCta: 'Start the wizard',
        quickCheckTitle: 'Narrower question?',
        quickCheckDesc:
          'For a quick verdict on a precise question (is my token a security? CASP required? custody custodial?), head to Check.',
        quickCheckCta: 'Open Check',
        compareTitle: 'Compare a few options?',
        compareDesc:
          'To stack several activities or jurisdictions side-by-side before deciding, head to Compare.',
        compareCta: 'Open Compare',
        included: "What's in the report",
        includedItems: [
          'Regulatory regime per activity × jurisdiction (applicable law / regulation)',
          'Required licences with costs and timelines',
          'Key obligations (KYC/AML, Travel Rule, reporting, minimum capital…)',
          'Marketing rules and client eligibility',
          'XRPL-specific notes when the activity uses XRPL',
          'Contextual AI analysis with priority order and 12-month roadmap',
        ],
      };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* Hero — Full Compliance Assessment */}
      <Link
        href="/wizard"
        className="card hover:border-blue-500 transition-colors group block mb-8 p-6 border-2 bg-gradient-to-br from-blue-50/40 to-violet-50/40 dark:from-blue-900/20 dark:to-violet-900/20"
      >
        <div className="flex items-start gap-4">
          <div className="text-5xl">🧙</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h2 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.fullTitle}
              </h2>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs font-semibold">
                {tr.fullDuration}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{tr.fullDesc}</p>
            <span className="inline-flex items-center gap-1 text-base font-semibold text-blue-600 dark:text-blue-400">
              {tr.fullCta} &rarr;
            </span>
          </div>
        </div>
      </Link>

      {/* What's in the report */}
      <section className="mb-10 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <h3 className="text-sm font-bold mb-3 uppercase tracking-wide text-gray-500">{tr.included}</h3>
        <ul className="space-y-2">
          {tr.includedItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cross-sell to /check */}
      <Link
        href="/check"
        className="card hover:border-blue-500 transition-colors group block p-6 border-2 mb-4"
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">🩺</div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tr.quickCheckTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.quickCheckDesc}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.quickCheckCta} &rarr;
            </span>
          </div>
        </div>
      </Link>

      {/* Cross-sell to /compare */}
      <Link
        href="/compare"
        className="card hover:border-blue-500 transition-colors group block p-6 border-2"
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">📊</div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tr.compareTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.compareDesc}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.compareCta} &rarr;
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
