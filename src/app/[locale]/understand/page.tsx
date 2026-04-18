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

export default function UnderstandHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const paths = isFr ? LEARNING_PATHS_FR : LEARNING_PATHS;
  const maps = isFr ? MAPS_FR : MAPS_EN;

  const tr = isFr
    ? {
        title: 'Comprendre',
        subtitle: 'Comprendre et référencer la régulation crypto. Concepts fondamentaux, cas d\'usage, XRPL, diagrammes visuels, guides approfondis, glossaire et FAQ.',
        // Concepts
        conceptsTitle: 'Concepts réglementaires',
        conceptsDesc: "Les 7 concepts fondamentaux de la conformité crypto : Loi, Licence, Régulateur, Obligation, Type de token, Infrastructure, Doctrine. La carte mentale pour s'orienter.",
        conceptsCta: 'Voir les concepts',
        // Use cases
        useCasesTitle: "Cas d'usage",
        useCasesDesc: "13 entreprises crypto qui ont réussi leur mise en conformité (Ripple, Circle, Coinbase, Sorare, Anchorage, Uphold, Archax, GateHub, Xaman…) avec leurs licences et juridictions.",
        useCasesCta: 'Voir les cas',
        // XRPL
        xrplTitle: 'XRPL',
        xrplDesc: "Statut légal du XRP par juridiction, EVM Sidechain, fonctionnalités natives (AMM, NFT, MPT, RLUSD), matrice custody et fournisseurs avec support XRPL.",
        openHub: 'Ouvrir XRPL',
        // Diagrams
        mapsTitle: 'Diagrammes',
        mapsDesc: "Visualisations en une page — comprendre en un coup d'œil.",
        seeAllMaps: 'Voir tous les diagrammes',
        // Guides
        pathsTitle: 'Guides',
        pathsDesc: 'Plongées ciblées, 6-10 min chacun.',
        seeAllPaths: 'Voir tous les guides',
        // Glossary
        glossaryTitle: 'Glossaire',
        glossaryDesc: "~60 termes réglementaires crypto définis et groupés par concept. Accessible aussi via la touche ⌘K depuis n'importe quelle page.",
        openGlossary: 'Ouvrir le glossaire',
        // FAQ
        faqTitle: 'FAQ',
        faqDesc: "Les questions les plus fréquentes sur la régulation crypto. Réponses instantanées issues du socle de connaissances.",
        faqCta: 'Ouvrir la FAQ',
        // Shared
        read: 'Lire',
        open: 'Ouvrir',
      }
    : {
        title: 'Understand',
        subtitle: 'Understand and reference crypto regulation. Core concepts, use cases, XRPL, visual diagrams, in-depth guides, glossary and FAQ.',
        // Concepts
        conceptsTitle: 'Regulatory Concepts',
        conceptsDesc: 'The 7 core concepts of crypto compliance: Law, Licence, Regulator, Obligation, Token type, Infrastructure, Doctrine. The mental map to orient yourself.',
        conceptsCta: 'Browse concepts',
        // Use cases
        useCasesTitle: 'Use Cases',
        useCasesDesc: '13 crypto companies that nailed compliance (Ripple, Circle, Coinbase, Sorare, Anchorage, Uphold, Archax, GateHub, Xaman…) with their licences and jurisdictions.',
        useCasesCta: 'See use cases',
        // XRPL
        xrplTitle: 'XRPL',
        xrplDesc: 'XRP legal status by jurisdiction, EVM Sidechain, native features (AMM, NFT, MPT, RLUSD), custody matrix and providers with XRPL support.',
        openHub: 'Open XRPL',
        // Diagrams
        mapsTitle: 'Diagrams',
        mapsDesc: 'One-page visualizations — understand at a glance.',
        seeAllMaps: 'See all diagrams',
        // Guides
        pathsTitle: 'Guides',
        pathsDesc: 'Focused regulatory reads, 6-10 min each.',
        seeAllPaths: 'See all guides',
        // Glossary
        glossaryTitle: 'Glossary',
        glossaryDesc: '~60 crypto regulatory terms, defined and grouped by concept. Also reachable with ⌘K from any page.',
        openGlossary: 'Open glossary',
        // FAQ
        faqTitle: 'FAQ',
        faqDesc: 'The most frequently asked questions on crypto regulation. Instant answers from the knowledge base.',
        faqCta: 'Open FAQ',
        // Shared
        read: 'Read',
        open: 'Open',
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* 1. Concepts */}
      <section className="mb-6">
        <Link
          href="/understand/categories"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎯</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.conceptsTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.conceptsDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.conceptsCta} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* 2. Use Cases */}
      <section className="mb-6">
        <Link
          href="/understand/usecases"
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

      {/* 3. XRPL — accented with violet */}
      <section className="mb-10">
        <Link
          href="/understand/xrpl"
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

      {/* 4. Diagrams grid */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <span>{tr.mapsTitle}</span>
          </h2>
          <Link
            href="/understand/maps"
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
              href={`/understand/maps/${m.id}`}
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

      {/* 5. Guides grid */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span>{tr.pathsTitle}</span>
          </h2>
          <Link
            href="/understand/guides"
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
              href={`/understand/guides/${p.id}`}
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

      {/* 6. Glossary */}
      <section className="mb-6">
        <Link
          href="/understand/glossary"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">📖</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.glossaryTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.glossaryDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.openGlossary} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* 7. FAQ */}
      <section className="mb-6">
        <Link
          href="/understand/faq"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">❓</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.faqTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.faqDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.faqCta} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
