'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DECISION_TREES } from '@/data/decision-trees';
import { DECISION_TREES_FR } from '@/data/decision-trees.fr';

export default function DecisionTreesListPage() {
  const locale = useLocale();
  const trees = locale === 'fr' ? DECISION_TREES_FR : DECISION_TREES;
  const isFr = locale === 'fr';
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/understand" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; {isFr ? 'Comprendre' : 'Understand'}
        </Link>
      </div>
      <header className="text-center mb-12">
        <div className="text-5xl mb-4">🩺</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{isFr ? 'Diagnostics' : 'Diagnostics'}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {isFr
            ? 'Répondez à quelques questions. Obtenez un verdict clair, codé par couleur, avec les étapes suivantes.'
            : 'Answer a handful of questions. Get a clear, color-coded verdict with next steps.'}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {trees.map((tree) => (
          <Link
            key={tree.id}
            href={`/understand/decision-trees/${tree.id}`}
            className="card hover:border-blue-500 transition-colors group"
          >
            <div className="text-4xl mb-4">{tree.icon}</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {tree.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tree.description}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {isFr ? 'Démarrer' : 'Start'} &rarr;
            </span>
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-8 italic">
        {isFr
          ? "Chaque diagnostic fournit des indications réglementaires générales. Pour un conseil spécifique, consultez un avocat qualifié."
          : 'Each diagnostic gives general regulatory guidance. For specific advice, consult a qualified lawyer.'}
      </p>
    </div>
  );
}
