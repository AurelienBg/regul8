'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const MAPS_EN = [
  {
    id: 'mica-taxonomy',
    icon: '🌳',
    title: 'MiCA Token Taxonomy',
    description: 'Complete tree of token categories under MiCA — in-scope (EMT/ART/Other), excluded (NFTs, CBDCs, full DeFi), with examples for each.',
  },
  {
    id: 'xrpl-custody',
    icon: '🔐',
    title: 'XRPL Custody Matrix',
    description: 'The 10 XRPL custody methods classified into Custodial / Grey zone / Non-custodial, with EU licence implications.',
  },
  {
    id: 'jurisdiction-arbitrage',
    icon: '🌍',
    title: 'Jurisdiction Arbitrage Map',
    description: 'Speed-to-licence vs setup cost scatter plot. Find your sweet spot between time, budget, risk and market access.',
  },
];

const MAPS_FR = [
  {
    id: 'mica-taxonomy',
    icon: '🌳',
    title: 'Taxonomie des tokens MiCA',
    description: "Arbre complet des catégories de tokens sous MiCA — dans le périmètre (EMT/ART/Autres), exclus (NFTs, CBDCs, DeFi pur), avec exemples.",
  },
  {
    id: 'xrpl-custody',
    icon: '🔐',
    title: 'Matrice custody XRPL',
    description: 'Les 10 méthodes de custody XRPL classées en Custodial / Zone grise / Non-custodial, avec les implications de licence UE.',
  },
  {
    id: 'jurisdiction-arbitrage',
    icon: '🌍',
    title: "Carte d'arbitrage des juridictions",
    description: "Nuage de points délai-de-licence vs coût de setup. Trouvez votre sweet spot entre temps, budget, risque et accès marché.",
  },
];

export default function VisualMapsListPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const maps = isFr ? MAPS_FR : MAPS_EN;
  const tr = isFr ? {
    back: 'Comprendre',
    title: 'Diagrammes',
    subtitle: 'Des visualisations en une page qui rendent la régulation tangible.',
    open: 'Ouvrir',
  } : {
    back: 'Understand',
    title: 'Diagrams',
    subtitle: 'One-pager visualizations that make regulation tangible.',
    open: 'Open',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link href="/understand" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; {tr.back}
        </Link>
      </div>
      <header className="text-center mb-12">
        <div className="text-5xl mb-4">🗺️</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {tr.subtitle}
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {maps.map((m) => (
          <Link
            key={m.id}
            href={`/understand/maps/${m.id}`}
            className="card hover:border-blue-500 transition-colors group"
          >
            <div className="text-4xl mb-4">{m.icon}</div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {m.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{m.description}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.open} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
