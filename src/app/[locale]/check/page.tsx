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
        subtitle: "Diagnostics rapides — répondez à quelques questions, obtenez un verdict en 2 minutes.",
        notSure: 'Pas sûr par où commencer ?',
        quickTitle: 'Diagnostics',
        quickDesc: 'Question précise → verdict en 2 min.',
        start: 'Démarrer',
        duration: '2 min',
        diagDisclaimer: 'Chaque diagnostic fournit des indications réglementaires générales. Pour un conseil spécifique, consultez un avocat qualifié.',
      }
    : {
        title: 'Check',
        subtitle: 'Quick diagnostics — answer a handful of questions, get a verdict in 2 minutes.',
        notSure: 'Not sure where to start?',
        quickTitle: 'Diagnostics',
        quickDesc: 'Precise question → verdict in 2 min.',
        start: 'Start',
        duration: '2 min',
        diagDisclaimer: 'Each diagnostic gives general regulatory guidance. For specific advice, consult a qualified lawyer.',
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
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
    </div>
  );
}
