'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import {
  FUNNEL_QUESTIONS,
  recommendTrees,
  type FunnelAnswers,
  type FunnelQuestion,
  type Product,
  type Market,
  type CustodyModel,
} from '@/data/check-funnel';
import { composeVerdict, type VerdictCard, type VerdictItem } from '@/lib/check-verdict';
import { prefillFromAssess, readAssessSelection } from '@/lib/check-prefill';
import { DECISION_TREES } from '@/data/decision-trees';
import { DECISION_TREES_FR } from '@/data/decision-trees.fr';

const STORAGE_KEY = 'regul8:check:funnel';

/** Multi-select funnel with checkbox-style choices + explicit Next button. */
export default function CheckFunnel() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<FunnelAnswers>({});
  // If the user has an /assess selection saved, we surface a 'Continue from
  // your Assess picks' banner on step 1 when the funnel is empty.
  const [assessSelection, setAssessSelection] = useState<ReturnType<typeof readAssessSelection>>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Hydrate from URL (priority) then localStorage (fallback) on mount
  useEffect(() => {
    const fromUrl: FunnelAnswers = {
      products: parseList<Product>(searchParams.get('products')),
      markets: parseList<Market>(searchParams.get('markets')),
      custody: parseList<CustodyModel>(searchParams.get('custody')),
    };
    const hasUrl = (fromUrl.products?.length || fromUrl.markets?.length || fromUrl.custody?.length);
    if (hasUrl) {
      setAnswers(fromUrl);
    } else {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
        if (raw) setAnswers(JSON.parse(raw) as FunnelAnswers);
      } catch {
        /* fall back to empty */
      }
    }
    // Check for /assess selection (independent of funnel state)
    setAssessSelection(readAssessSelection());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  const step = useMemo<'1' | '2' | '3' | 'verdict'>(() => {
    const s = searchParams.get('step');
    if (s === '2' || s === '3' || s === 'verdict') return s;
    return '1';
  }, [searchParams]);

  const buildHref = useCallback(
    (nextStep: string, patch: Partial<FunnelAnswers> = {}) => {
      const merged = { ...answers, ...patch };
      const params = new URLSearchParams();
      if (merged.products?.length) params.set('products', merged.products.join(','));
      if (merged.markets?.length) params.set('markets', merged.markets.join(','));
      if (merged.custody?.length) params.set('custody', merged.custody.join(','));
      params.set('step', nextStep);
      return `/check?${params.toString()}`;
    },
    [answers],
  );

  const reset = useCallback(() => {
    setAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setBannerDismissed(false); // re-show banner after a full reset if assess state still exists
    router.push('/check?step=1');
  }, [router]);

  const applyAssessPrefill = useCallback(() => {
    if (!assessSelection) return;
    const prefilled = prefillFromAssess(assessSelection);
    setAnswers(prefilled);
    setBannerDismissed(true);
    // Jump straight to Q3 (custody) since Q1+Q2 are filled from /assess
    const params = new URLSearchParams();
    if (prefilled.products?.length) params.set('products', prefilled.products.join(','));
    if (prefilled.markets?.length) params.set('markets', prefilled.markets.join(','));
    params.set('step', '3');
    router.push(`/check?${params.toString()}`);
  }, [assessSelection, router]);

  const toggleChoice = useCallback(
    (field: 'products' | 'markets' | 'custody', value: string) => {
      setAnswers((prev) => {
        const list = (prev[field] as string[] | undefined) ?? [];
        let next: string[];
        if (value === 'not-sure') {
          // not-sure is mutually exclusive — clicking it replaces; clicking it while selected clears
          next = list.includes('not-sure') ? [] : ['not-sure'];
        } else {
          // regular toggle, but unpick not-sure if present
          const without = list.filter((v) => v !== 'not-sure');
          next = without.includes(value) ? without.filter((v) => v !== value) : [...without, value];
        }
        return { ...prev, [field]: next };
      });
    },
    [],
  );

  const goNext = useCallback(
    (nextStep: string) => {
      router.push(buildHref(nextStep));
    },
    [router, buildHref],
  );

  const tr = isFr
    ? {
        stepLabel: (n: number) => `Étape ${n} / 3`,
        back: '← Précédent',
        next: 'Suivant →',
        seeVerdict: 'Voir le verdict →',
        reset: 'Recommencer',
        needAtLeastOne: 'Sélectionnez au moins un choix pour continuer.',
        notSureNote: 'Pas de souci — nous inclurons tous les diagnostics pertinents dans le verdict.',
        verdictTitle: 'Votre verdict sur-mesure',
        verdictIntro: 'Basé sur vos réponses — chaque card donne les éléments clés par domaine.',
        summaryLabel: 'Vos réponses',
        noCards: 'Pas encore assez d\'info. Revenez en arrière et sélectionnez au moins un choix à chaque étape.',
        noTrees: 'Pas de recommandation forte basée sur vos réponses.',
        runTree: 'Lancer le diagnostic complet',
        diagnosticsTitle: 'Diagnostics recommandés à lancer',
        diagnosticsIntro: 'Cliquez pour dérouler l\'arbre de décision complet sur chaque point.',
        changeAnswers: '← Modifier mes réponses',
        assessBannerTitle: '✨ Reprendre depuis votre sélection Assess',
        assessBannerBody: (nA: number, nJ: number) =>
          `Vous avez sélectionné ${nA} activité${nA > 1 ? 's' : ''} et ${nJ} juridiction${nJ > 1 ? 's' : ''} dans Assess. Pré-remplir Q1-Q2 et sauter directement à Q3 ?`,
        assessBannerApply: 'Pré-remplir depuis Assess',
        assessBannerSkip: 'Commencer à zéro',
      }
    : {
        stepLabel: (n: number) => `Step ${n} of 3`,
        back: '← Back',
        next: 'Next →',
        seeVerdict: 'See verdict →',
        reset: 'Restart',
        needAtLeastOne: 'Pick at least one option to continue.',
        notSureNote: 'That\'s fine — we\'ll include all relevant diagnostics in the verdict.',
        verdictTitle: 'Your tailored verdict',
        verdictIntro: 'Based on your answers — each card surfaces the key items per domain.',
        summaryLabel: 'Your answers',
        noCards: 'Not enough info yet. Go back and pick at least one option per step.',
        noTrees: 'No strong recommendation based on your answers.',
        runTree: 'Run the full diagnostic',
        diagnosticsTitle: 'Recommended diagnostics to run',
        diagnosticsIntro: 'Click through to walk the full decision tree on each point.',
        changeAnswers: '← Change my answers',
        assessBannerTitle: '✨ Continue from your Assess picks',
        assessBannerBody: (nA: number, nJ: number) =>
          `You selected ${nA} activit${nA > 1 ? 'ies' : 'y'} and ${nJ} jurisdiction${nJ > 1 ? 's' : ''} in Assess. Pre-fill Q1-Q2 and jump straight to Q3?`,
        assessBannerApply: 'Pre-fill from Assess',
        assessBannerSkip: 'Start fresh',
      };

  // --- VERDICT step ---
  if (step === 'verdict') {
    const verdict = composeVerdict(answers);
    const recs = recommendTrees(answers);
    const trees = isFr ? DECISION_TREES_FR : DECISION_TREES;
    return (
      <section className="p-5 sm:p-6 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10">
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{tr.verdictTitle}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tr.verdictIntro}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={buildHref('1')}
              className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {tr.changeAnswers}
            </Link>
            <button
              onClick={reset}
              className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {tr.reset}
            </button>
          </div>
        </div>

        <AnswerSummary answers={answers} isFr={isFr} label={tr.summaryLabel} />

        {/* Summary one-liner */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 italic">
          {isFr ? verdict.summaryFr : verdict.summaryEn}
        </p>

        {/* Mini-report cards */}
        {verdict.cards.length === 0 ? (
          <p className="text-sm italic text-gray-500">{tr.noCards}</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {verdict.cards.map((card) => (
              <VerdictCardView key={card.domain} card={card} isFr={isFr} />
            ))}
          </div>
        )}

        {/* Recommended trees */}
        {recs.length > 0 && (
          <div className="mt-6 pt-5 border-t border-[var(--border)]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              {tr.diagnosticsTitle}
            </h3>
            <p className="text-xs text-gray-500 mb-3">{tr.diagnosticsIntro}</p>
            <div className="space-y-2">
              {recs.map((rec, i) => {
                const tree = trees.find((t) => t.id === rec.treeId);
                if (!tree) return null;
                const reason = isFr ? rec.reasonFr : rec.reasonEn;
                return (
                  <Link
                    key={rec.treeId}
                    href={`/check/diagnostics/${rec.treeId}`}
                    className="group block p-3 rounded-lg bg-white dark:bg-gray-900 border border-[var(--border)] hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg leading-none">{tree.icon}</span>
                          <h4 className="font-bold text-sm">{tree.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{reason}</p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 shrink-0 group-hover:translate-x-1 transition-transform whitespace-nowrap self-center">
                        {tr.runTree} &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    );
  }

  // --- Q1, Q2, Q3 step ---
  const stepIndex = parseInt(step, 10);
  const question = FUNNEL_QUESTIONS[stepIndex - 1] as FunnelQuestion | undefined;
  if (!question) return null;

  const title = isFr ? question.titleFr : question.titleEn;
  const subtitle = isFr ? question.subtitleFr : question.subtitleEn;
  const selected = (answers[question.id] as string[] | undefined) ?? [];
  const hasNotSure = selected.includes('not-sure');
  const canAdvance = selected.length > 0;

  const prevStep = stepIndex > 1 ? String(stepIndex - 1) : null;
  const nextStep = stepIndex < 3 ? String(stepIndex + 1) : 'verdict';
  const nextLabel = stepIndex < 3 ? tr.next : tr.seeVerdict;

  // Banner only on step 1 and only if:
  // - user has an /assess selection
  // - user hasn't started the funnel yet (no answers filled)
  // - user hasn't dismissed the banner this session
  const funnelEmpty = !(answers.products?.length || answers.markets?.length || answers.custody?.length);
  const showAssessBanner =
    stepIndex === 1 && !!assessSelection && funnelEmpty && !bannerDismissed;

  return (
    <section className="p-5 sm:p-6 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10">
      {/* Assess pre-fill banner */}
      {showAssessBanner && assessSelection && (
        <div className="mb-5 p-4 rounded-lg border-2 border-violet-300 dark:border-violet-800 bg-violet-50/80 dark:bg-violet-900/20">
          <h3 className="font-bold text-sm mb-1">{tr.assessBannerTitle}</h3>
          <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            {tr.assessBannerBody(
              assessSelection.activities?.length ?? 0,
              assessSelection.jurisdictions?.length ?? 0,
            )}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={applyAssessPrefill}
              className="text-xs px-3 py-1.5 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
            >
              {tr.assessBannerApply}
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {tr.assessBannerSkip}
            </button>
          </div>
        </div>
      )}

      {/* Progress indicator + restart */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            {tr.stepLabel(stepIndex)}
          </span>
          <span className="text-xs text-gray-500">· {isFr ? question.helpFr : question.helpEn}</span>
        </div>
        <button
          onClick={reset}
          className="text-xs px-2 py-1 rounded text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
        >
          {tr.reset}
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mb-1">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{subtitle}</p>

      <div className="grid sm:grid-cols-2 gap-2 mb-4">
        {question.choices.map((c) => {
          const active = selected.includes(c.value);
          return (
            <button
              key={c.value}
              onClick={() => toggleChoice(question.id, c.value)}
              className={`group text-left p-4 rounded-lg border transition-all ${
                active
                  ? 'border-blue-500 bg-blue-100/80 dark:bg-blue-900/30 ring-1 ring-blue-500'
                  : 'border-[var(--border)] bg-white dark:bg-gray-900 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {c.icon && <span className="text-2xl leading-none shrink-0">{c.icon}</span>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-sm">{isFr ? c.labelFr : c.labelEn}</div>
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        active
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      aria-hidden="true"
                    >
                      {active && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </div>
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

      {hasNotSure && (
        <p className="text-xs text-blue-700 dark:text-blue-300 mb-4 italic">💡 {tr.notSureNote}</p>
      )}
      {!canAdvance && (
        <p className="text-xs text-gray-500 mb-4 italic">{tr.needAtLeastOne}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        {prevStep ? (
          <Link
            href={buildHref(prevStep)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {tr.back}
          </Link>
        ) : (
          <span />
        )}
        <button
          onClick={() => canAdvance && goNext(nextStep)}
          disabled={!canAdvance}
          className="text-sm px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {nextLabel}
        </button>
      </div>
    </section>
  );
}

// --- helpers ---

function parseList<T extends string>(raw: string | null): T[] | undefined {
  if (!raw) return undefined;
  const values = raw.split(',').map((s) => s.trim()).filter(Boolean);
  return values as T[];
}

function VerdictCardView({ card, isFr }: { card: VerdictCard; isFr: boolean }) {
  const title = isFr ? card.titleFr : card.titleEn;
  const note = isFr ? card.noteFr : card.noteEn;
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-[var(--border)]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl leading-none">{card.icon}</span>
        <h3 className="font-bold text-sm">{title}</h3>
      </div>
      <ul className="space-y-2">
        {card.items.map((it, i) => (
          <VerdictItemView key={i} item={it} isFr={isFr} />
        ))}
      </ul>
      {note && <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400 italic leading-relaxed">{note}</p>}
    </div>
  );
}

function VerdictItemView({ item, isFr }: { item: VerdictItem; isFr: boolean }) {
  const label = isFr ? item.labelFr : item.labelEn;
  const reason = isFr ? item.reasonFr : item.reasonEn;
  const dotColor =
    item.emphasis === 'primary'
      ? 'bg-red-500'
      : item.emphasis === 'secondary'
        ? 'bg-amber-500'
        : 'bg-gray-400';
  return (
    <li className="flex items-start gap-2 text-xs">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-1.5 shrink-0`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <span className="font-semibold">{label}</span>{' '}
        <span className="text-gray-600 dark:text-gray-400 leading-relaxed">{reason}</span>
      </div>
    </li>
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
  const renderGroup = (qId: 'products' | 'markets' | 'custody', values: string[] | undefined) => {
    if (!values?.length) return null;
    const q = FUNNEL_QUESTIONS.find((x) => x.id === qId);
    return values.map((val) => {
      const choice = q?.choices.find((c) => c.value === val);
      if (!choice) return null;
      return (
        <span
          key={`${qId}-${val}`}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-white dark:bg-gray-900 border border-[var(--border)]"
        >
          {choice.icon && <span>{choice.icon}</span>}
          <span>{isFr ? choice.labelFr : choice.labelEn}</span>
        </span>
      );
    });
  };
  const hasAny = answers.products?.length || answers.markets?.length || answers.custody?.length;
  if (!hasAny) return null;
  return (
    <div className="mb-4 p-3 rounded-lg bg-white/60 dark:bg-gray-900/40 border border-[var(--border)]">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {renderGroup('products', answers.products)}
        {renderGroup('markets', answers.markets)}
        {renderGroup('custody', answers.custody)}
      </div>
    </div>
  );
}
