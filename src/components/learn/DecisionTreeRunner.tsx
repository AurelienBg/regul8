'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import type { DecisionTree, DecisionNode, DecisionVerdict } from '@/types';
import { Link } from '@/i18n/routing';

interface HistoryStep {
  nodeId: string;
  question: string;
  answerLabel: string;
}

interface Props {
  tree: DecisionTree;
}

/** DFS to find the longest possible question chain from root to any outcome. */
function computeMaxDepth(tree: DecisionTree): number {
  const visiting = new Set<string>();
  function dfs(nodeId: string): number {
    const node = tree.nodes[nodeId];
    if (!node) return 0;
    if (node.type === 'outcome') return 0;
    if (visiting.has(nodeId)) return 0; // safety against cycles
    visiting.add(nodeId);
    const depths = node.choices.map((c) => dfs(c.next));
    visiting.delete(nodeId);
    return 1 + Math.max(0, ...depths);
  }
  return dfs(tree.rootId);
}

const verdictStyles: Record<DecisionVerdict, { pill: string; card: string; emoji: string; labelEn: string; labelFr: string }> = {
  yes: {
    pill: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
    card: 'border-red-200 dark:border-red-900/40',
    emoji: '🔴',
    labelEn: 'YES',
    labelFr: 'OUI',
  },
  no: {
    pill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    card: 'border-emerald-200 dark:border-emerald-900/40',
    emoji: '🟢',
    labelEn: 'NO',
    labelFr: 'NON',
  },
  maybe: {
    pill: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
    card: 'border-amber-200 dark:border-amber-900/40',
    emoji: '🟡',
    labelEn: 'GREY ZONE',
    labelFr: 'ZONE GRISE',
  },
};

export default function DecisionTreeRunner({ tree }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tr = isFr ? {
    result: 'Résultat',
    progress: 'Progression',
    yourAnswers: 'Vos réponses',
    question: 'Question',
    back: 'Retour',
    restart: 'Recommencer',
    nextSteps: 'Étapes recommandées',
    relatedTerms: 'Termes associés',
    tryAnother: 'Essayer une autre réponse',
    fullCheck: 'Vérification complète',
    otherTrees: 'Autres arbres',
    disclaimer: "Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.",
  } : {
    result: 'Result',
    progress: 'Progress',
    yourAnswers: 'Your answers',
    question: 'Question',
    back: 'Back',
    restart: 'Restart',
    nextSteps: 'Recommended next steps',
    relatedTerms: 'Related terms',
    tryAnother: 'Try another answer',
    fullCheck: 'Full compliance check',
    otherTrees: 'Other trees',
    disclaimer: 'This is general information only. For your specific situation, consult a qualified lawyer.',
  };
  const [currentId, setCurrentId] = useState<string>(tree.rootId);
  const [history, setHistory] = useState<HistoryStep[]>([]);

  const currentNode: DecisionNode | undefined = tree.nodes[currentId];
  const maxDepth = useMemo(() => computeMaxDepth(tree), [tree]);
  const isOutcome = currentNode?.type === 'outcome';
  const currentStep = isOutcome ? maxDepth : Math.min(history.length + 1, maxDepth);
  const progressPct = Math.min(100, Math.round((currentStep / Math.max(1, maxDepth)) * 100));

  if (!currentNode) {
    return (
      <div className="card">
        <p className="text-red-600">Error: node &quot;{currentId}&quot; not found in tree.</p>
      </div>
    );
  }

  const handleAnswer = (label: string, nextId: string) => {
    if (currentNode.type !== 'question') return;
    setHistory([...history, { nodeId: currentId, question: currentNode.question, answerLabel: label }]);
    setCurrentId(nextId);
  };

  const handleRestart = () => {
    setCurrentId(tree.rootId);
    setHistory([]);
  };

  const handleGoBack = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setCurrentId(last.nodeId);
    setHistory(history.slice(0, -1));
  };

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {isOutcome ? tr.result : tr.progress}
          </span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {isOutcome ? `${maxDepth} / ${maxDepth}` : `${currentStep} / ${maxDepth}`}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isOutcome ? 'bg-emerald-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Trail */}
      {history.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{tr.yourAnswers}</div>
          <ol className="space-y-1.5">
            {history.map((h, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                <span className="text-gray-400">{i + 1}.</span>
                <span className="flex-1">
                  <span className="text-gray-500 dark:text-gray-400">{h.question}</span>
                  <br />
                  <span className="font-medium">→ {h.answerLabel}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Question */}
      {currentNode.type === 'question' && (
        <div className="card">
          <div className="mb-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {tr.question} {currentStep} / {maxDepth}
          </div>
          <h2 className="text-xl font-bold mb-3">{currentNode.question}</h2>
          {currentNode.hint && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">💡 {currentNode.hint}</p>
          )}
          <div className="space-y-2">
            {currentNode.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(c.label, c.next)}
                className="w-full text-left px-4 py-3 rounded-lg border border-[var(--border)] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium"
              >
                {c.label}
                <span className="float-right text-gray-400">&rarr;</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex gap-3 justify-between text-sm">
            <button
              onClick={handleGoBack}
              disabled={history.length === 0}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &larr; {tr.back}
            </button>
            <button onClick={handleRestart} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
              {tr.restart}
            </button>
          </div>
        </div>
      )}

      {/* Outcome */}
      {currentNode.type === 'outcome' && (
        <div className={`card border-2 ${verdictStyles[currentNode.verdict].card}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{verdictStyles[currentNode.verdict].emoji}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${verdictStyles[currentNode.verdict].pill}`}>
              {isFr ? verdictStyles[currentNode.verdict].labelFr : verdictStyles[currentNode.verdict].labelEn}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-3">{currentNode.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{currentNode.explanation}</p>

          {currentNode.nextSteps && currentNode.nextSteps.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
                {tr.nextSteps}
              </h3>
              <ul className="space-y-2">
                {currentNode.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentNode.relatedTerms && currentNode.relatedTerms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
                {tr.relatedTerms}
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentNode.relatedTerms.map((term, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--border)] flex flex-wrap gap-3">
            <button onClick={handleRestart} className="btn-primary text-sm">
              &larr; {tr.tryAnother}
            </button>
            <Link href="/wizard" className="btn-secondary text-sm">
              {tr.fullCheck}
            </Link>
            <Link href="/assess/diagnostics" className="btn-secondary text-sm">
              {tr.otherTrees}
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-6 italic">
            {tr.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
