'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LEARNING_PATHS } from '@/data/learning-paths';
import { LEARNING_PATHS_FR } from '@/data/learning-paths.fr';
import { JURISDICTIONS } from '@/types';

const MAPS_EN = [
  { id: 'mica-taxonomy', icon: '🌳', title: 'MiCA Token Taxonomy', desc: 'In-scope (EMT/ART/Other) vs excluded (NFT, CBDC, full DeFi).' },
  { id: 'xrpl-custody', icon: '🔐', title: 'XRPL Custody Matrix', desc: '10 custody methods in 3 columns with EU licence implications.' },
  { id: 'jurisdiction-arbitrage', icon: '🌍', title: 'Jurisdiction Arbitrage', desc: 'Scatter plot: time vs cost, sized by market reach.' },
];
const MAPS_FR = [
  { id: 'mica-taxonomy', icon: '🌳', title: 'Taxonomie tokens MiCA', desc: 'Dans le scope (EMT/ART/Autres) vs exclus (NFT, CBDC, DeFi pur).' },
  { id: 'xrpl-custody', icon: '🔐', title: 'Matrice custody XRPL', desc: '10 méthodes en 3 colonnes avec implications UE.' },
  { id: 'jurisdiction-arbitrage', icon: '🌍', title: 'Arbitrage de juridictions', desc: 'Scatter plot : délai vs coût, taille = marché accessible.' },
];

const levelStyles: Record<string, string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
  intermediate: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
  advanced: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200',
};

const levelLabels: Record<string, { en: string; fr: string }> = {
  beginner: { en: 'beginner', fr: 'débutant' },
  intermediate: { en: 'intermediate', fr: 'intermédiaire' },
  advanced: { en: 'advanced', fr: 'avancé' },
};

export default function LearnHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const paths = isFr ? LEARNING_PATHS_FR : LEARNING_PATHS;
  const maps = isFr ? MAPS_FR : MAPS_EN;

  const tr = isFr ? {
    title: 'Comprendre',
    subtitle: 'Comprendre et référencer la régulation crypto. Paths narratifs, cartes visuelles, deep dive XRPL.',
    pathsTitle: "Parcours d'apprentissage",
    pathsDesc: 'Plongées ciblées, 6-10 min chacune.',
    seeAllPaths: 'Voir tous les parcours',
    mapsTitle: 'Cartes visuelles',
    mapsDesc: 'Diagrammes en une page — comprendre en un coup d\'œil.',
    seeAllMaps: 'Voir toutes les cartes',
    xrplTitle: 'XRPL Deep Dive',
    xrplDesc: "Statut légal du XRP par juridiction, EVM Sidechain, fonctionnalités natives (AMM, NFT, MPT, RLUSD) et matrice custody.",
    openHub: 'Ouvrir le hub XRPL',
    useCasesTitle: "Cas d'usage",
    useCasesDesc: "Entreprises crypto qui ont réussi leur mise en conformité (Ripple, Circle, Coinbase, Sorare, Anchorage…) avec leurs licences et juridictions.",
    useCasesCta: 'Voir les cas',
    categoriesTitle: 'Catégories réglementaires',
    categoriesDesc: 'Les 7 grands angles de la conformité crypto : Loi, Régulateur, Licence, Régime, Obligation, Topologie, Standard. Avec exemples par juridiction.',
    categoriesCta: 'Voir les catégories',
    treesTitle: 'Arbres de décision',
    treesDesc: 'Quelques questions, un verdict clair : security ou non ? CASP requis ? Custody custodial ? Quelle juridiction ?',
    treesCta: 'Voir les arbres',
    glossaryHint: "Le glossaire (~60 termes) est accessible via le bouton flottant 📖 en bas à droite ou avec ⌘K depuis n'importe quelle page.",
    openGlossary: 'Ouvrir le glossaire',
    read: 'Lire',
    open: 'Ouvrir',
  } : {
    title: 'Understand',
    subtitle: 'Understand and reference crypto regulation. Narrative paths, visual maps, XRPL deep dive.',
    pathsTitle: 'Learning Paths',
    pathsDesc: 'Focused deep dives, 6-10 min each.',
    seeAllPaths: 'See all paths',
    mapsTitle: 'Visual Maps',
    mapsDesc: 'One-pager diagrams — understand at a glance.',
    seeAllMaps: 'See all maps',
    xrplTitle: 'XRPL Deep Dive',
    xrplDesc: 'XRP legal status by jurisdiction, EVM Sidechain, native features (AMM, NFT, MPT, RLUSD) and the custody matrix.',
    openHub: 'Open XRPL hub',
    useCasesTitle: 'Use Cases',
    useCasesDesc: 'Crypto companies that nailed compliance (Ripple, Circle, Coinbase, Sorare, Anchorage…) with their licences and jurisdictions.',
    useCasesCta: 'See use cases',
    categoriesTitle: 'Regulatory Categories',
    categoriesDesc: 'The 7 big angles of crypto compliance: Law, Regulator, Licence, Regime, Obligation, Topology, Standard. With examples per jurisdiction.',
    categoriesCta: 'Browse categories',
    treesTitle: 'Decision Trees',
    treesDesc: 'A few questions, a clear verdict: security or not? CASP required? Custody custodial? Which jurisdiction?',
    treesCta: 'Open decision trees',
    glossaryHint: 'The glossary (~60 terms) is accessible via the floating 📖 button bottom-right or with ⌘K from any page.',
    openGlossary: 'Open glossary',
    read: 'Read',
    open: 'Open',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {tr.subtitle}
        </p>
      </header>

      {/* Learning Paths */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span>{tr.pathsTitle}</span>
          </h2>
          <Link
            href="/learn/paths"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {tr.seeAllPaths} &rarr;
          </Link>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tr.pathsDesc}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.map((p) => (
            <Link
              key={p.id}
              href={`/learn/paths/${p.id}`}
              className="card hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{p.icon}</div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ${levelStyles[p.level]}`}>
                  {isFr ? levelLabels[p.level].fr : levelLabels[p.level].en}
                </span>
              </div>
              <h3 className="font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {p.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{p.subtitle}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {p.jurisdictions?.map((j) => (
                    <span key={j} className="text-base" title={JURISDICTIONS[j].name}>
                      {JURISDICTIONS[j].flag}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">· {p.duration}</span>
                </div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {tr.read} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Visual Maps */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <span>{tr.mapsTitle}</span>
          </h2>
          <Link
            href="/learn/maps"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {tr.seeAllMaps} &rarr;
          </Link>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tr.mapsDesc}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {maps.map((m) => (
            <Link
              key={m.id}
              href={`/learn/maps/${m.id}`}
              className="card hover:border-blue-500 transition-colors group"
            >
              <div className="text-3xl mb-3">{m.icon}</div>
              <h3 className="font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {m.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{m.desc}</p>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {tr.open} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* XRPL Deep Dive */}
      <section className="mb-6">
        <Link
          href="/learn/xrpl"
          className="card hover:border-violet-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🟣</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  {tr.xrplTitle}
                </h2>
                <span className="badge-xrpl">XRPL</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.xrplDesc}</p>
              <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                {tr.openHub} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Use Cases */}
      <section className="mb-6">
        <Link
          href="/learn/cases"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🏢</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.useCasesTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.useCasesDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.useCasesCta} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Categories */}
      <section className="mb-6">
        <Link
          href="/learn/categories"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎯</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.categoriesTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.categoriesDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.categoriesCta} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Decision Trees */}
      <section className="mb-10">
        <Link
          href="/learn/decision-trees"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🌳</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.treesTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.treesDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.treesCta} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Glossary hint — clickable to /glossary (same card style as XRPL / Use cases) */}
      <section className="mt-10">
        <Link
          href="/glossary"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">📖</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.openGlossary}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.glossaryHint}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.openGlossary} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
