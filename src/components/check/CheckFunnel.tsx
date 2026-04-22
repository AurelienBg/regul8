'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import {
  FUNNEL_QUESTIONS,
  recommendTrees,
  type FunnelAnswers,
  type Product,
  type Market,
  type CustodyModel,
  type TreeRecommendation,
} from '@/data/check-funnel';
import { DECISION_TREES } from '@/data/decision-trees';
import { DECISION_TREES_FR } from '@/data/decision-trees.fr';

const STORAGE_KEY = 'regul8:check:funnel';

/**
 * Phase 1 MVP of the Level 2 guided funnel. Renders one of 4 states based on
 * the `step` URL param (?step=1|2|3|verdict). Each answer is stored in URL
 * params + localStorage for deep-linking + resume-on-reload.
 */
export default function CheckFunnel() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<FunnelAnswers>({});

  // Sync from URL (priority) + localStorage (fallback) on mount
  useEffect(() => {
    const fromUrl: FunnelAnswers = {
      product: (searchParams.get('product') as Product | null) ?? undefined,
      market: (searchParams.get('market') as Market | null) ?? undefined,
      custody: (searchParams.get('custody') as CustodyModel | null) ?? undefined,
    };
    const hasUrlAnswers = fromUrl.product || fromUrl.market || fromUrl.custody;
    if (hasUrlAnswers) {
      setAnswers(fromUrl);
      return;
    }
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setAnswers(JSON.parse(raw) as FunnelAnswers);
    } catch {
      // localStorage unavailable / invalid JSON — fall back to empty state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist answers to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // quota / private-mode — ignore
    }
  }, [answers]);

  const step = useMemo<'1' | '2' | '3' | 'verdict'>(() => {
    const s = searchParams.get('step');
    if (s === '2' || s === '3' || s === 'verdict') return s;
    return '1';
  }, [searchParams]);

  // Build URL for a given step, preserving existing answers
  const buildHref = useCallback(
    (nextStep: string, patch: Partial<FunnelAnswers> = {}) => {
      const merged = { ...answers, ...patch };
      const params = new URLSearchParams();
      if (merged.product) params.set('product', merged.product);
      if (merged.market) params.set('market', merged.market);
      if (merged.custody) params.set('custody', merged.custody);
      params.set('step', nextStep);
      return `/check?${params.toString()}`;
    },
    [answers],
  );

  const goToStep = useCallback(
    (nextStep: string, patch: Partial<FunnelAnswers> = {}) => {
      setAnswers((prev) => ({ ...prev, ...patch }));
      router.push(buildHref(nextStep, patch));
    },
    [router, buildHref],
  );

  // Reset funnel — return to step 1 with no answers
  const reset = useCallback(() => {
    setAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    router.push('/check?step=1');
  }, [router]);

  const tr = isFr
    ? {
        stepLabel: (n: number) => `Étape ${n} / 3`,
        back: '← Précédent',
        next: 'Suivant',
        reset: 'Recommencer',
        verdictTitle: 'Votre parcours de diagnostic',
        verdictIntro: 'D\'après vos réponses, voici les diagnostics les plus pertinents, dans l\'ordre recommandé.',
        noTrees: 'Pas de recommandation forte basée sur vos réponses. Vous pouvez lancer n\'importe quel diagnostic ci-dessous.',
        runTree: 'Lancer ce diagnostic',
        advanced: 'Ou lancer directement un des 4 diagnostics classiques ↓',
        summaryLabel: 'Résumé de vos réponses',
      }
    : {
        stepLabel: (n: number) => `Step ${n} of 3`,
        back: '← Back',
        next: 'Next',
        reset: 'Restart',
        verdictTitle: 'Your diagnostic roadmap',
        verdictIntro: 'Based on your answers, these are the most relevant diagnostics, in the recommended order.',
        noTrees: 'No strong recommendation based on your answers. You can run any diagnostic below.',
        runTree: 'Run this diagnostic',
        advanced: 'Or jump straight into one of the 4 classic diagnostics ↓',
        summaryLabel: 'Your answers',
      };

  // Render the active step
  if (step === 'verdict') {
    const recs = recommendTrees(answers);
    const trees = isFr ? DECISION_TREES_FR : DECISION_TREES;
    return (
      <section className="p-5 sm:p-6 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10">
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <h2 className="text-xl sm:text-2xl font-bold">{tr.verdictTitle}</h2>
          <button
            onClick={reset}
            className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {tr.reset}
          </button>
        </div>

        {/* Answer summary */}
        <AnswerSummary answers={answers} isFr={isFr} label={tr.summaryLabel} />

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{tr.verdictIntro}</p>

        {recs.length === 0 ? (
          <p className="text-sm italic text-gray-500">{tr.noTrees}</p>
        ) : (
          <div className="space-y-3">
            {recs.map((rec, i) => {
              const tree = trees.find((t) => t.id === rec.treeId);
              if (!tree) return null;
              const reason = isFr ? rec.reasonFr : rec.reasonEn;
              return (
                <Link
                  key={rec.treeId}
                  href={`/check/diagnostics/${rec.treeId}`}
                  className="group block p-4 rounded-lg bg-white dark:bg-gray-900 border border-[var(--border)] hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xl leading-none">{tree.icon}</span>
                        <h3 className="font-bold text-base">{tree.title}</h3>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{reason}</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0 group-hover:translate-x-1 transition-transform">
                      {tr.runTree} &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <p className="mt-5 text-xs text-gray-500 text-center">{tr.advanced}</p>
      </section>
    );
  }

  // Questions (step 1, 2, 3)
  const stepIndex = parseInt(step, 10);
  const question = FUNNEL_QUESTIONS[stepIndex - 1];
  if (!question) return null;

  const title = isFr ? question.titleFr : question.titleEn;
  const subtitle = isFr ? question.subtitleFr : question.subtitleEn;
  const currentValue = answers[question.id];

  const prevStep = stepIndex > 1 ? String(stepIndex - 1) : null;
  const nextStep = stepIndex < 3 ? String(stepIndex + 1) : 'verdict';

  return (
    <section className="p-5 sm:p-6 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          {tr.stepLabel(stepIndex)}
        </span>
        <button
          onClick={reset}
          className="text-xs px-2 py-1 rounded text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
        >
          {tr.reset}
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mb-1">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{subtitle}</p>

      <div className="grid sm:grid-cols-2 gap-2">
        {question.choices.map((c) => {
          const active = currentValue === c.value;
          return (
            <button
              key={c.value}
              onClick={() => goToStep(nextStep, { [question.id]: c.value } as Partial<FunnelAnswers>)}
              className={`group text-left p-4 rounded-lg border transition-all ${
                active
                  ? 'border-blue-500 bg-blue-100/80 dark:bg-blue-900/30 ring-1 ring-blue-500'
                  : 'border-[var(--border)] bg-white dark:bg-gray-900 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {c.icon && <span className="text-2xl leading-none shrink-0">{c.icon}</span>}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{isFr ? c.labelFr : c.labelEn}</div>
                  {(c.hintEn || c.hintFr) && (
                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {isFr ? c.hintFr : c.hintEn}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {prevStep && (
        <div className="mt-5 pt-4 border-t border-[var(--border)]">
          <Link
            href={buildHref(prevStep)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {tr.back}
          </Link>
        </div>
      )}
    </section>
  );
}

function AnswerSummary({
  answers,
  isFr,
  label,
}: {
  answers: FunnelAnswers;
  isFr: boolean;
  label: string;
}) {
  const pick = (qId: 'product' | 'market' | 'custody', value?: string) => {
    if (!value) return null;
    const q = FUNNEL_QUESTIONS.find((x) => x.id === qId);
    const choice = q?.choices.find((c) => c.value === value);
    if (!choice) return null;
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-white dark:bg-gray-900 border border-[var(--border)]">
        {choice.icon && <span>{choice.icon}</span>}
        <span>{isFr ? choice.labelFr : choice.labelEn}</span>
      </span>
    );
  };
  const hasAny = answers.product || answers.market || answers.custody;
  if (!hasAny) return null;
  return (
    <div className="mb-4 p-3 rounded-lg bg-white/60 dark:bg-gray-900/40 border border-[var(--border)]">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {pick('product', answers.product)}
        {pick('market', answers.market)}
        {pick('custody', answers.custody)}
      </div>
    </div>
  );
}
