'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const QUICK_CHECKS_EN = [
  { id: 'howey', href: '/learn/decision-trees/howey', icon: '⚖️', title: 'Is my token a security?', duration: '2 min' },
  { id: 'casp', href: '/learn/decision-trees/casp', icon: '🇪🇺', title: 'Do I need a CASP licence?', duration: '2 min' },
  { id: 'xrpl-custody', href: '/learn/decision-trees/xrpl-custody', icon: '🔐', title: 'Is my XRPL custody custodial?', duration: '2 min' },
  { id: 'jurisdiction', href: '/learn/decision-trees/jurisdiction', icon: '🌍', title: 'Which jurisdiction should I choose?', duration: '2 min' },
];
const QUICK_CHECKS_FR = [
  { id: 'howey', href: '/learn/decision-trees/howey', icon: '⚖️', title: 'Mon token est-il un titre financier ?', duration: '2 min' },
  { id: 'casp', href: '/learn/decision-trees/casp', icon: '🇪🇺', title: 'Ai-je besoin d\'un agrément CASP ?', duration: '2 min' },
  { id: 'xrpl-custody', href: '/learn/decision-trees/xrpl-custody', icon: '🔐', title: 'Ma custody XRPL est-elle custodial ?', duration: '2 min' },
  { id: 'jurisdiction', href: '/learn/decision-trees/jurisdiction', icon: '🌍', title: 'Quelle juridiction choisir ?', duration: '2 min' },
];

const USE_CASE_CHIPS_EN = [
  { icon: '🚀', label: "I'm launching a token", href: '/learn/decision-trees/howey' },
  { icon: '🔐', label: "I'm running custody", href: '/learn/decision-trees/xrpl-custody' },
  { icon: '🌍', label: "I'm picking a jurisdiction", href: '/learn/decision-trees/jurisdiction' },
];
const USE_CASE_CHIPS_FR = [
  { icon: '🚀', label: 'Je lance un token', href: '/learn/decision-trees/howey' },
  { icon: '🔐', label: 'Je gère de la custody', href: '/learn/decision-trees/xrpl-custody' },
  { icon: '🌍', label: 'Je choisis une juridiction', href: '/learn/decision-trees/jurisdiction' },
];

export default function CheckHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const quickChecks = isFr ? QUICK_CHECKS_FR : QUICK_CHECKS_EN;
  const useCaseChips = isFr ? USE_CASE_CHIPS_FR : USE_CASE_CHIPS_EN;

  const tr = isFr ? {
    title: 'Vérifier votre conformité',
    subtitle: 'Trois outils selon ce dont vous avez besoin : vérification complète, question précise ou vue consolidée.',
    notSure: "Pas sûr par où commencer ?",
    fullTitle: 'Vérification complète',
    fullDesc: "Wizard multi-activités × multi-juridictions. Rapport détaillé avec régimes, licences, obligations, coûts, délais et analyse IA.",
    fullDuration: '5 min',
    fullCta: 'Lancer le wizard',
    quickTitle: 'Quick Checks',
    quickDesc: "Question précise → verdict en 2 min.",
    compareTitle: "Comparateur d'activités",
    compareDesc: 'Empilez plusieurs activités dans une juridiction unique. Voir les obligations consolidées côte à côte.',
    compareCta: 'Ouvrir le comparateur',
  } : {
    title: 'Check your compliance',
    subtitle: 'Three tools depending on what you need: full check, precise question, or consolidated view.',
    notSure: 'Not sure where to start?',
    fullTitle: 'Full Compliance Check',
    fullDesc: 'Multi-activity × multi-jurisdiction wizard. Detailed report with regimes, licences, obligations, costs, timelines and AI analysis.',
    fullDuration: '5 min',
    fullCta: 'Start the wizard',
    quickTitle: 'Quick Checks',
    quickDesc: 'Precise question → verdict in 2 min.',
    compareTitle: 'Activity Comparator',
    compareDesc: 'Stack multiple activities in a single jurisdiction. See consolidated obligations side-by-side.',
    compareCta: 'Open comparator',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {tr.subtitle}
        </p>
      </header>

      {/* Not sure? — chips helper */}
      <div className="mb-10 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40">
        <div className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
          {tr.notSure}
        </div>
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

      {/* Full check (hero) */}
      <Link
        href="/wizard"
        className="card hover:border-blue-500 transition-colors group block mb-6 p-6 border-2"
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">🧙</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.fullTitle}
              </h2>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-[10px] font-semibold">
                {tr.fullDuration}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.fullDesc}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.fullCta} &rarr;
            </span>
          </div>
        </div>
      </Link>

      {/* Quick checks */}
      <div className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold">⚡ {tr.quickTitle}</h2>
          <span className="text-xs text-gray-500">{tr.quickDesc}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {quickChecks.map((q) => (
            <Link
              key={q.id}
              href={q.href}
              className="card hover:border-blue-500 transition-colors group flex items-start gap-3 py-4"
            >
              <span className="text-2xl">{q.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {q.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{q.duration}</div>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Comparator */}
      <Link
        href="/compare"
        className="card hover:border-blue-500 transition-colors group block p-5"
      >
        <div className="flex items-start gap-3">
          <div className="text-3xl">📊</div>
          <div className="flex-1">
            <h2 className="font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              {tr.compareTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tr.compareDesc}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.compareCta} &rarr;
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
