'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DECISION_TREES } from '@/data/decision-trees';
import { DECISION_TREES_FR } from '@/data/decision-trees.fr';

const USE_CASE_CHIPS_EN = [
  { icon: '🚀', label: "I'm launching a token", href: '/check/diagnostics/howey' },
  { icon: '🔐', label: "I'm running custody", href: '/check/diagnostics/xrpl-custody' },
  { icon: '🌍', label: "I'm picking a jurisdiction", href: '/check/diagnostics/jurisdiction' },
];
const USE_CASE_CHIPS_FR = [
  { icon: '🚀', label: 'Je lance un token', href: '/check/diagnostics/howey' },
  { icon: '🔐', label: 'Je gère de la custody', href: '/check/diagnostics/xrpl-custody' },
  { icon: '🌍', label: 'Je choisis une juridiction', href: '/check/diagnostics/jurisdiction' },
];

export default function CheckHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const diagnostics = isFr ? DECISION_TREES_FR : DECISION_TREES;
  const useCaseChips = isFr ? USE_CASE_CHIPS_FR : USE_CASE_CHIPS_EN;

  const tr = isFr
    ? {
        title: 'Vérifier',
        subtitle: "Diagnostics rapides — répondez à quelques questions, obtenez un verdict en 2 minutes. Pour un rapport complet multi-activités, passez par Évaluer.",
        notSure: "Pas sûr par où commencer ?",
        quickTitle: 'Diagnostics',
        quickDesc: 'Question précise → verdict en 2 min.',
        start: 'Démarrer',
        duration: '2 min',
        diagDisclaimer: 'Chaque diagnostic fournit des indications réglementaires générales. Pour un conseil spécifique, consultez un avocat qualifié.',
        assessCrossTitle: "Besoin d'un rapport complet ?",
        assessCrossDesc: "Évaluation complète multi-activités × multi-juridictions avec analyse IA. 5 minutes, un rapport détaillé.",
        assessCrossCta: 'Lancer une évaluation complète',
        compareCrossTitle: 'Comparer plusieurs activités ou juridictions ?',
        compareCrossDesc: 'Allez dans Comparer pour empiler 2 à 5 activités dans une même juridiction, ou inversement.',
        compareCrossCta: 'Ouvrir Comparer',
      }
    : {
        title: 'Check',
        subtitle: 'Quick diagnostics — answer a handful of questions, get a verdict in 2 minutes. For a full multi-activity report, head to Assess.',
        notSure: 'Not sure where to start?',
        quickTitle: 'Diagnostics',
        quickDesc: 'Precise question → verdict in 2 min.',
        start: 'Start',
        duration: '2 min',
        diagDisclaimer: 'Each diagnostic gives general regulatory guidance. For specific advice, consult a qualified lawyer.',
        assessCrossTitle: 'Need a full report?',
        assessCrossDesc: 'Comprehensive multi-activity × multi-jurisdiction assessment with AI analysis. 5 minutes, a detailed report.',
        assessCrossCta: 'Start a full assessment',
        compareCrossTitle: 'Compare activities or jurisdictions?',
        compareCrossDesc: 'Head to Compare to stack 2 to 5 activities in one jurisdiction, or vice versa.',
        compareCrossCta: 'Open Compare',
      };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* Not sure? — chips helper */}
      <div className="mb-10 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40">
        <div className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">{tr.notSure}</div>
        <div className="flex flex-wrap gap-2">
          {useCaseChips.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-[var(--border)] text-sm hover:border-blue-400 transition-colors"
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
              <span className="text-gray-400">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Diagnostics hero — the 4 decision trees */}
      <div className="mb-10">
        <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-lg font-bold">🩺 {tr.quickTitle}</h2>
          <span className="text-xs text-gray-500">{tr.quickDesc}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {diagnostics.map((d) => (
            <Link
              key={d.id}
              href={`/check/diagnostics/${d.id}`}
              className="card hover:border-blue-500 transition-colors group"
            >
              <div className="text-3xl mb-3">{d.icon}</div>
              <h3 className="font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {d.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{d.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{tr.duration}</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {tr.start} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-4 italic">{tr.diagDisclaimer}</p>
      </div>

      {/* Cross-sell to /assess */}
      <Link
        href="/assess"
        className="card hover:border-blue-500 transition-colors group block p-6 border-2 mb-4"
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">🧙</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tr.assessCrossTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.assessCrossDesc}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.assessCrossCta} &rarr;
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
            <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tr.compareCrossTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.compareCrossDesc}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.compareCrossCta} &rarr;
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
