'use client';

import { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DECISION_TREES } from '@/data/decision-trees';
import { DECISION_TREES_FR } from '@/data/decision-trees.fr';
import CheckFunnel from '@/components/check/CheckFunnel';

/** Per-diagnostic accent — makes each card visually distinct */
const ACCENTS: Record<
  string,
  { border: string; hover: string; bg: string; badge: string; iconBg: string }
> = {
  howey: {
    border: 'border-blue-200 dark:border-blue-900/50',
    hover: 'hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10',
    bg: 'bg-gradient-to-br from-blue-50/60 to-transparent dark:from-blue-900/20',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  casp: {
    border: 'border-emerald-200 dark:border-emerald-900/50',
    hover: 'hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10',
    bg: 'bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-900/20',
    badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  'xrpl-custody': {
    border: 'border-violet-200 dark:border-violet-900/50',
    hover: 'hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10',
    bg: 'bg-gradient-to-br from-violet-50/60 to-transparent dark:from-violet-900/20',
    badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200',
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
  },
  jurisdiction: {
    border: 'border-amber-200 dark:border-amber-900/50',
    hover: 'hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/10',
    bg: 'bg-gradient-to-br from-amber-50/60 to-transparent dark:from-amber-900/20',
    badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
  },
};

const AUDIENCE_EN: Record<string, string> = {
  howey: 'For token issuers',
  casp: 'For EU-facing platforms',
  'xrpl-custody': 'For XRPL-based services',
  jurisdiction: 'For founders picking a base',
};
const AUDIENCE_FR: Record<string, string> = {
  howey: 'Pour les émetteurs de token',
  casp: 'Pour les plateformes en UE',
  'xrpl-custody': 'Pour les services XRPL',
  jurisdiction: 'Pour choisir sa juridiction',
};

export default function CheckHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const diagnostics = isFr ? DECISION_TREES_FR : DECISION_TREES;
  const audience = isFr ? AUDIENCE_FR : AUDIENCE_EN;

  const tr = isFr
    ? {
        title: 'Check',
        subtitle: "Diagnostics rapides — répondez à quelques questions, obtenez un verdict en 2 minutes.",
        start: 'Démarrer',
        duration: '2 min',
        disclaimer: 'Chaque diagnostic fournit des indications réglementaires générales. Pour un conseil spécifique, consultez un avocat qualifié.',
        advancedTitle: 'Ou lancez directement un diagnostic spécifique',
        advancedSubtitle: 'Si vous savez déjà ce que vous voulez tester, allez directement sur l\'arbre de décision concerné.',
      }
    : {
        title: 'Check',
        subtitle: 'Quick diagnostics — answer a handful of questions, get a verdict in 2 minutes.',
        start: 'Start',
        duration: '2 min',
        disclaimer: 'Each diagnostic gives general regulatory guidance. For specific advice, consult a qualified lawyer.',
        advancedTitle: 'Or jump straight into a specific diagnostic',
        advancedSubtitle: 'If you already know which tree you want to run, skip the funnel and go directly.',
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* Level 2 guided funnel — Q1-Q3 then verdict */}
      <div className="mb-10">
        <Suspense fallback={<div className="p-6 rounded-xl border border-[var(--border)] text-sm text-gray-500">Loading…</div>}>
          <CheckFunnel />
        </Suspense>
      </div>

      {/* Advanced: 4 diagnostic cards as a fallback for users who know what they want */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
          {tr.advancedTitle}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{tr.advancedSubtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {diagnostics.map((d) => {
          const accent = ACCENTS[d.id] ?? ACCENTS.howey;
          return (
            <Link
              key={d.id}
              href={`/check/diagnostics/${d.id}`}
              className={`group relative block p-6 rounded-xl border-2 ${accent.border} ${accent.bg} ${accent.hover} transition-all duration-200`}
            >
              {/* Duration badge top-right */}
              <span
                className={`absolute top-5 right-5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${accent.badge}`}
              >
                {tr.duration}
              </span>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl text-4xl ${accent.iconBg} mb-4`}>
                <span>{d.icon}</span>
              </div>

              {/* Question */}
              <h2 className="text-lg sm:text-xl font-bold mb-2 leading-snug">
                {d.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                {d.description}
              </p>

              {/* Footer row: audience + CTA */}
              <div className="flex items-end justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-xs text-gray-500">
                  {audience[d.id]}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:translate-x-1 transition-transform">
                  {tr.start} &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-500 italic max-w-2xl mx-auto">
        {tr.disclaimer}
      </p>
    </div>
  );
}
