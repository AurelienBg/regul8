'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

/**
 * Diagrams hub — landing page listing the 3 visual maps.
 *
 * As of April 2026, only the XRPL Custody Matrix has its own standalone
 * page. The MiCA Taxonomy and Jurisdiction Arbitrage diagrams were
 * migrated to live inline in their canonical context pages
 * (/learn/guides/mica-essentials and /compare respectively). This hub
 * keeps the diagrams discoverable as a list — clicking on a moved one
 * lands the user on the page where the diagram now lives.
 */

type Href =
  | '/learn/diagrams/xrpl-custody'
  | '/learn/guides/mica-essentials'
  | '/compare?mode=jurisdictions';

interface MapEntry {
  href: Href;
  icon: string;
  title: string;
  description: string;
  /** Optional sub-label noting where the diagram now lives, when it
   *  was migrated out of /learn/diagrams. */
  migratedTo?: string;
}

const MAPS_EN: MapEntry[] = [
  {
    href: '/learn/diagrams/xrpl-custody',
    icon: '🔐',
    title: 'XRPL Custody Matrix',
    description: 'The 10 XRPL custody methods classified into Custodial / Grey zone / Non-custodial, with EU licence implications and ecosystem providers.',
  },
  {
    href: '/learn/guides/mica-essentials',
    icon: '🌳',
    title: 'MiCA Token Taxonomy',
    description: 'Complete tree of token categories under MiCA — in-scope (EMT/ART/Other), excluded (NFTs, CBDCs, full DeFi), with examples for each.',
    migratedTo: 'Now embedded in the MiCA Essentials guide',
  },
  {
    href: '/compare?mode=jurisdictions',
    icon: '🌍',
    title: 'Jurisdiction Arbitrage Map',
    description: 'Speed-to-licence vs setup cost scatter plot. Find your sweet spot between time, budget, risk and market access.',
    migratedTo: 'Now embedded in Compare (jurisdictions mode)',
  },
];

const MAPS_FR: MapEntry[] = [
  {
    href: '/learn/diagrams/xrpl-custody',
    icon: '🔐',
    title: 'Matrice custody XRPL',
    description: 'Les 10 méthodes de custody XRPL classées en Custodial / Zone grise / Non-custodial, avec implications de licence UE et fournisseurs de l’écosystème.',
  },
  {
    href: '/learn/guides/mica-essentials',
    icon: '🌳',
    title: 'Taxonomie des tokens MiCA',
    description: "Arbre complet des catégories de tokens sous MiCA — dans le périmètre (EMT/ART/Autres), exclus (NFTs, CBDCs, DeFi pur), avec exemples.",
    migratedTo: 'Désormais intégrée au guide MiCA Essentials',
  },
  {
    href: '/compare?mode=jurisdictions',
    icon: '🌍',
    title: "Carte d'arbitrage des juridictions",
    description: "Nuage de points délai-de-licence vs coût de setup. Trouvez votre sweet spot entre temps, budget, risque et accès marché.",
    migratedTo: 'Désormais intégrée dans Comparer (mode juridictions)',
  },
];

export default function VisualMapsListPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const maps = isFr ? MAPS_FR : MAPS_EN;
  const tr = isFr ? {
    title: 'Diagrammes',
    subtitle: 'Des visualisations en une page qui rendent la régulation tangible.',
    open: 'Ouvrir',
  } : {
    title: 'Diagrams',
    subtitle: 'One-pager visualizations that make regulation tangible.',
    open: 'Open',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">🗺️</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {tr.subtitle}
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {maps.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="card hover:border-blue-500 transition-colors group"
          >
            <div className="text-4xl mb-4">{m.icon}</div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {m.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{m.description}</p>
            {m.migratedTo && (
              <p className="text-[11px] text-gray-500 dark:text-gray-500 italic mb-3">
                ↳ {m.migratedTo}
              </p>
            )}
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {tr.open} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
