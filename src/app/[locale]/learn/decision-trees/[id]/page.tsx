import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getDecisionTree } from '@/data/decision-trees';
import { getDecisionTreeFr } from '@/data/decision-trees.fr';
import DecisionTreeRunner from '@/components/learn/DecisionTreeRunner';

type Params = { id: string; locale: string };

export default function DecisionTreePage({ params }: { params: Params }) {
  const isFr = params.locale === 'fr';
  const tree = isFr ? getDecisionTreeFr(params.id) : getDecisionTree(params.id);
  if (!tree) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link
          href="/learn/decision-trees"
          className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          &larr; {isFr ? 'Tous les arbres' : 'All trees'}
        </Link>
      </div>

      <header className="mb-8">
        <div className="text-4xl mb-3">{tree.icon}</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{tree.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{tree.description}</p>
      </header>

      <DecisionTreeRunner tree={tree} />
    </div>
  );
}
