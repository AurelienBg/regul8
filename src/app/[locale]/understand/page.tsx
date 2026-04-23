'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import XRPLMark from '@/components/ui/XRPLMark';

export default function UnderstandHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'Comprendre',
        subtitle: 'Comprendre et référencer la régulation crypto. Concepts fondamentaux, cas d\'usage, XRPL, diagrammes visuels, guides approfondis, glossaire et FAQ.',
        // Concepts
        conceptsTitle: 'Concepts réglementaires',
        conceptsDesc: "Les 8 concepts fondamentaux de la conformité crypto : Loi, Licence, Régulateur, Obligation, Type de token, Infrastructure, Doctrine + Juridiction. La carte mentale pour s'orienter.",
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
        mapsDesc: "3 visualisations en une page : taxonomie MiCA, matrice custody XRPL, arbitrage de juridictions. Comprendre en un coup d'œil.",
        seeAllMaps: 'Voir tous les diagrammes',
        // Guides
        pathsTitle: 'Guides',
        pathsDesc: "10 plongées ciblées 6-10 min : MiCA, Howey, US Crypto 101, Liechtenstein, Stablecoins, Dubai VARA, Tokenised RWA, FATF Travel Rule, KYC/AML, XRPL Custody.",
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
        conceptsDesc: 'The 8 core concepts of crypto compliance: Law, Licence, Regulator, Obligation, Token type, Infrastructure, Doctrine + Jurisdiction. The mental map to orient yourself.',
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
        mapsDesc: '3 one-page visualizations: MiCA taxonomy, XRPL custody matrix, jurisdiction arbitrage plot. Understand at a glance.',
        seeAllMaps: 'See all diagrams',
        // Guides
        pathsTitle: 'Guides',
        pathsDesc: '10 focused regulatory reads, 6-10 min each: MiCA, Howey, US Crypto 101, Liechtenstein, Stablecoins, Dubai VARA, Tokenised RWA, FATF Travel Rule, KYC/AML, XRPL Custody.',
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
      {/* Hero header — matches Compare / Assess / Check (centered, no emoji) */}
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* 1. Concepts */}
      <section className="mb-6">
        <Link
          href="/understand/concepts"
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
            <XRPLMark className="w-10 h-10 text-gray-900 dark:text-gray-100 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  {tr.xrplTitle}
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.xrplDesc}</p>
              <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                {tr.openHub} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* 4. Diagrams — big card (summary only) */}
      <section className="mb-6">
        <Link
          href="/understand/diagrams"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🗺️</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.mapsTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.mapsDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.seeAllMaps} &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* 5. Guides — big card (summary only) */}
      <section className="mb-6">
        <Link
          href="/understand/guides"
          className="card hover:border-blue-500 transition-colors group block p-6 border-2"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">📚</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tr.pathsTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.pathsDesc}</p>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {tr.seeAllPaths} &rarr;
              </span>
            </div>
          </div>
        </Link>
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
