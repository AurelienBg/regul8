'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { TERM_TOPICS, TOPIC_META, type Topic } from '@/data/term-topics';
import ConceptsNarrative from '@/components/learn/ConceptsNarrative';

// 7 meta-concepts grouped into 3 zones reflecting the user journey:
//   A — INPUTS: what the startup is building (determines downstream analysis)
//   B — OUTPUTS: what the startup must DO (actionable — the core)
//   C — CONTEXT: where, under what law, to whom, and legal interpretation
//
// Order inside each zone is intentional: most upstream / most actionable first.
const ZONE_A: Topic[] = ['token', 'infra'];
const ZONE_B: Topic[] = ['licence', 'obligation'];
const ZONE_C: Topic[] = ['regulator', 'regime', 'doctrine'];

// 8th cross-cut row: Jurisdiction isn't a meta-concept at the Topic level
// (it doesn't tag glossary terms the way the others do), but it IS displayed
// in the Concepts table as a cross-cutting dimension for completeness.
interface JurisdictionCrossCut {
  icon: string;
  labelEn: string;
  labelFr: string;
  desc: {
    en: { title: string; short: string; what: string; when: string; examples: string };
    fr: { title: string; short: string; what: string; when: string; examples: string };
  };
}
const JURISDICTION_CROSSCUT: JurisdictionCrossCut = {
  icon: '🗺️',
  labelEn: 'Jurisdiction',
  labelFr: 'Juridiction',
  desc: {
    en: {
      title: 'Territorial scope',
      short: 'The territory whose regulator has authority over you',
      what: 'A political/legal territory whose regulatory body has authority over your activity. Not a concept like the 7 above — rather a cross-cutting dimension on which every concept above is evaluated.',
      when: 'Everywhere. Every licence, obligation, regime and regulator is scoped to a jurisdiction. Choosing the right one is often half the compliance strategy.',
      examples: 'EU/France, USA, Singapore, UAE Dubai, Cayman Islands, Luxembourg, Switzerland, UK, Ireland, Liechtenstein, Malta, Nigeria, South Africa, Kenya…',
    },
    fr: {
      title: 'Périmètre territorial',
      short: "Le territoire dont le régulateur a autorité sur vous",
      what: 'Un territoire politique/juridique dont l\'autorité de régulation a compétence sur votre activité. Pas un concept comme les 7 au-dessus — plutôt une dimension transversale selon laquelle chaque concept est évalué.',
      when: "Partout. Chaque licence, obligation, régime et régulateur s'inscrit dans une juridiction. En choisir la bonne représente souvent la moitié de la stratégie compliance.",
      examples: 'UE/France, USA, Singapour, EAU Dubaï, Caïmans, Luxembourg, Suisse, UK, Irlande, Liechtenstein, Malte, Nigéria, Afrique du Sud, Kenya…',
    },
  },
};

type ConceptCopy = { title: string; short: string; what: string; when: string; examples: string };
// `short` is the 1-line field-legend used on /assess and /compare (same
// wording so vocabulary stays coherent across pages). Appears directly
// under each concept pill in the concepts table + in the "all terms
// grouped by concept" cards further down.
const TOPIC_DESCRIPTIONS: Record<Topic, { en: ConceptCopy; fr: ConceptCopy }> = {
  regime: {
    en: {
      title: 'Law / Regulation',
      short: 'The legal text that grounds it all — scope & territorial reach',
      what: 'The legal text itself — the statute, regulation, directive or act passed by a legislature. Grounds everything else. Each regime has a scope: 📍 local (only if you operate physically there), 🌐 extraterritorial (applies when you serve users, even if based elsewhere), or 🌍 global standard (adopted or transposed by most jurisdictions).',
      when: 'Applies whenever in force. Little to no choice for your startup — it just applies based on jurisdiction, activity, and scope.',
      examples: 'MiCA (EU 2023/1114, 🌐 extraterritorial), GENIUS Act (US federal 2025, 📍 local), BitLicense (NY, 📍 local), TVTG (Liechtenstein 2020), FATF Travel Rule (🌍 global standard), BSA, PSD2.',
    },
    fr: {
      title: 'Loi / Régulation',
      short: "Le texte légal qui fonde tout — portée & reach territorial",
      what: "Le texte légal lui-même — statut, règlement, directive ou loi adopté par un législateur. Il fonde tout le reste. Chaque régime a une portée : 📍 locale (uniquement si opération physique sur place), 🌐 extraterritoriale (s'applique dès que vous servez des utilisateurs, même basé ailleurs), ou 🌍 standard global (adopté ou transposé par la plupart des juridictions).",
      when: "Dès que la régulation est en vigueur. Peu ou pas de choix côté startup — ça s'impose selon la juridiction, l'activité et la portée.",
      examples: 'MiCA (UE 2023/1114, 🌐 extraterritoriale), GENIUS Act (US 2025, 📍 locale), BitLicense (NY, 📍 locale), TVTG (Liechtenstein 2020), Travel Rule GAFI (🌍 standard global), BSA, PSD2.',
    },
  },
  licence: {
    en: {
      title: 'Licence framework',
      short: 'The concrete authorizations you must obtain',
      what: "The concrete authorization you must obtain to operate legally. The operational consequence of a law.",
      when: 'When you perform a regulated activity (exchange, custody, stablecoin issuance…). 3–36 months depending on jurisdiction.',
      examples: 'CASP (MiCA), MTL (state-by-state US), BitLicense (NY), VASP (FATF / Dubai), DASP / PSAN (France), EMI.',
    },
    fr: {
      title: 'Cadre de licence',
      short: "Les agréments concrets à obtenir",
      what: "L'agrément concret à obtenir pour opérer légalement. La conséquence opérationnelle d'une loi.",
      when: "Quand vous exercez une activité réglementée (exchange, custody, émission stablecoin…). 3–36 mois selon la juridiction.",
      examples: 'CASP (MiCA), MTL (par État US), BitLicense (NY), VASP (GAFI / Dubaï), DASP / PSAN (France), EMI.',
    },
  },
  regulator: {
    en: {
      title: 'Regulator / Authority',
      short: 'The body that supervises and issues the licence',
      what: 'The official body that supervises your activity, issues the licence and enforces compliance.',
      when: 'Always. You report to them, they inspect you, they approve your licence and can revoke it.',
      examples: 'AMF / ESMA (EU), SEC / CFTC / FinCEN / OCC (US), VARA (Dubai), MAS (Singapore), SFC (Hong Kong), FCA (UK), FINMA (Switzerland), FMA (Liechtenstein).',
    },
    fr: {
      title: 'Régulateur / Autorité',
      short: "L'organisme qui supervise et délivre la licence",
      what: "L'organisme officiel qui supervise votre activité, délivre l'agrément et fait respecter la conformité.",
      when: "Toujours. Vous lui faites du reporting, il vous inspecte, il approuve votre licence et peut la retirer.",
      examples: 'AMF / ESMA (UE), SEC / CFTC / FinCEN / OCC (US), VARA (Dubaï), MAS (Singapour), SFC (Hong Kong), FCA (UK), FINMA (Suisse), FMA (Liechtenstein).',
    },
  },
  obligation: {
    en: {
      title: 'Compliance obligation',
      short: 'Daily compliance duties (KYC, AML, Travel Rule…)',
      what: 'A concrete operational duty imposed by a law or regulator. Something you must DO on a daily basis.',
      when: 'Every day of operation. Captured in policies, processes and systems (KYC, AML, monitoring, reporting).',
      examples: 'KYC, KYB, AML, CFT, Travel Rule (FATF R.16), SAR filings, OFAC screening.',
    },
    fr: {
      title: 'Obligation de conformité',
      short: 'Obligations quotidiennes (KYC, AML, Travel Rule…)',
      what: "Une tâche opérationnelle concrète imposée par une loi ou un régulateur. Quelque chose que vous FAITES au quotidien.",
      when: "Chaque jour d'opération. Via politiques, processus et systèmes (KYC, AML, monitoring, reporting).",
      examples: 'KYC, KYB, AML, CFT, Travel Rule (GAFI R.16), déclarations SAR, filtrage OFAC.',
    },
  },
  token: {
    en: {
      title: 'Token type',
      short: "How the asset is classified — drives which regime applies",
      what: 'How a digital asset is classified by a regulator. Determines which regime applies to the token itself.',
      when: "At issuance and throughout the token's life. Can evolve (a security token may become a commodity as the network decentralises).",
      examples: 'EMT, ART, S-EMT, S-ART (MiCA), Utility Token, Security Token (Howey), RWA, NFT, Stablecoin, DPT (Singapore), MPT (XLS-33).',
    },
    fr: {
      title: 'Type de token',
      short: "Comment l'actif est classé — détermine quel régime s'applique",
      what: "Comment un actif numérique est classé par le régulateur. Détermine quel régime s'applique au token lui-même.",
      when: "À l'émission et pendant toute la vie du token. Peut évoluer (un security token peut devenir commodity avec la décentralisation).",
      examples: 'EMT, ART, S-EMT, S-ART (MiCA), Utility, Security (Howey), RWA, NFT, Stablecoin, DPT (Singapour), MPT (XLS-33).',
    },
  },
  infra: {
    en: {
      title: 'Infrastructure',
      short: 'Technical building blocks that shape how regulation applies',
      what: 'Technical or ecosystem concepts not themselves regulated but that shape how regulation applies.',
      when: 'Reference terms you encounter constantly — DeFi vs CeFi, on-chain vs off-chain, XRPL primitives, etc.',
      examples: 'TradFi, CeFi, DeFi, DAO, Smart Contract, DLT, Trust Line, IOU, Escrow, SignerList, MPC, TSS.',
    },
    fr: {
      title: 'Infrastructure',
      short: "Briques techniques qui façonnent la régulation applicable",
      what: "Concepts techniques ou écosystémiques pas régulés en eux-mêmes mais qui façonnent la régulation qui s'applique.",
      when: "Termes que vous croisez constamment — DeFi vs CeFi, on-chain vs off-chain, primitives XRPL, etc.",
      examples: 'TradFi, CeFi, DeFi, DAO, Smart Contract, DLT, Trust Line, IOU, Escrow, SignerList, MPC, TSS.',
    },
  },
  doctrine: {
    en: {
      title: 'Doctrine / Legal Test',
      short: 'Legal tests and case law that interpret the statute',
      what: 'A legal test or court ruling that interprets the law. Fills gaps when the statute is silent.',
      when: 'When assessing grey zones — especially in the US where case law plays a major role.',
      examples: 'Howey Test (SEC v. W.J. Howey Co., 1946). SEC v. Ripple (2023).',
    },
    fr: {
      title: 'Doctrine / Test juridique',
      short: "Tests juridiques et jurisprudence qui interprètent la loi",
      what: "Un test juridique ou une décision de justice qui interprète la loi. Comble le vide quand le texte est silencieux.",
      when: "Quand on évalue des zones grises — surtout aux US où la jurisprudence joue un rôle majeur.",
      examples: 'Test de Howey (SEC v. W.J. Howey Co., 1946). SEC v. Ripple (2023).',
    },
  },
};

function slugify(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ConceptsPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'Concepts',
        subtitle: "Les 8 concepts fondamentaux qu'on trouve dans un rapport réglementaire. Comprendre la différence entre loi, licence et régulateur vous évite bien des confusions.",
        concept: 'Concept',
        whatIs: 'Qu\'est-ce que c\'est ?',
        whenApplies: 'Quand ça s\'applique',
        examples: 'Exemples',
        allTerms: 'Tous les termes groupés par concept',
        relations: 'Comment les concepts s\'articulent',
        disclaimer: 'Cliquez sur un terme pour ouvrir sa définition dans le glossaire.',
        lookupHint: 'Vous cherchez un terme précis ?',
        lookupLink: 'Parcourir le glossaire',
        zoneA: { title: 'INPUTS — Ce que vous construisez', subtitle: 'Ce que votre startup émet ou opère. Ces choix déterminent tout ce qui suit.' },
        zoneB: { title: 'OUTPUTS — Ce que vous devez faire', subtitle: 'Les actions concrètes et livrables de conformité. Le cœur de l\'analyse pour un founder.' },
        zoneC: { title: 'CONTEXT — Où, auprès de qui, sous quelle loi', subtitle: 'Le cadre qui entoure les outputs. À comprendre pour naviguer les zones grises.' },
        reachTitle: 'Scope des régimes — attribut transverse',
        reachSubtitle: 'Chaque régime (voir 📜 Regime ci-dessus) a une portée qui décrit comment il vous atteint. Ce n\'est pas un 9e concept séparé, mais un attribut appliqué aux régimes. Trois portées typiques :',
        scopes: [
          { icon: '📍', label: 'Locale', body: 'Territoriale. S\'applique uniquement si vous êtes incorporés ou opérez physiquement sur place. Ex : la BitLicense ne couvre que les entreprises opérant à New York.' },
          { icon: '🌐', label: 'Extraterritoriale', body: 'S\'applique dès que vous servez ou ciblez les utilisateurs de cette juridiction, même si votre société est basée ailleurs. Ex : MiCA s\'applique à toute entreprise servant des utilisateurs de l\'UE.' },
          { icon: '🌍', label: 'Standard global', body: 'Standard international adopté ou transposé par la plupart des juridictions. Ex : Travel Rule du GAFI, principes KYC/AML.' },
        ],
        flagsTitle: 'Drapeaux — comment lire les marqueurs de juridiction',
        flagsBody: 'Chaque terme du glossaire affiche un drapeau (🇪🇺 🇺🇸 🇸🇬 …) indiquant l\'origine de la régulation, du régulateur ou de la licence. 🌐 = organisme international ou règle adoptée globalement.',
      }
    : {
        title: 'Concepts',
        subtitle: 'The 8 core concepts you find in a regulatory report. Knowing the difference between a law, a licence and a regulator saves you a lot of confusion.',
        concept: 'Concept',
        whatIs: 'What it is',
        whenApplies: 'When it applies',
        examples: 'Examples',
        allTerms: 'All terms grouped by concept',
        relations: 'How the concepts fit together',
        disclaimer: 'Click any term to open its definition in the glossary.',
        lookupHint: 'Looking for a specific term?',
        lookupLink: 'Browse the glossary',
        zoneA: { title: 'INPUTS — What you are building', subtitle: 'What your startup issues or operates. These choices determine everything downstream.' },
        zoneB: { title: 'OUTPUTS — What you must do', subtitle: 'The concrete compliance actions and deliverables. The core for a founder.' },
        zoneC: { title: 'CONTEXT — Where, with whom, under what law', subtitle: 'The framing around the outputs. Helps you navigate grey zones.' },
        reachTitle: 'Scope of regimes — a cross-cutting attribute',
        reachSubtitle: 'Every regime (see 📜 Regime above) has a scope that describes how it reaches you. Not a 9th standalone concept — just an attribute applied to regimes. Three typical scopes:',
        scopes: [
          { icon: '📍', label: 'Local', body: 'Territorial. Applies only if you incorporate or operate physically there. Ex: BitLicense only covers businesses operating in New York.' },
          { icon: '🌐', label: 'Extraterritorial', body: 'Applies whenever you serve or target users of that jurisdiction, even if based elsewhere. Ex: MiCA applies to any business serving EU users.' },
          { icon: '🌍', label: 'Global standard', body: 'International standard adopted or transposed by most jurisdictions. Ex: FATF Travel Rule, KYC/AML principles.' },
        ],
        flagsTitle: 'Flags — how to read jurisdiction markers',
        flagsBody: 'Every term in the glossary shows a flag (🇪🇺 🇺🇸 🇸🇬 …) indicating where the regulation, regulator or licence originates. 🌐 = international body or rule adopted globally.',
      };

  const termsByTopic: Record<Topic, string[]> = {
    regime: [], licence: [], regulator: [], obligation: [], token: [], doctrine: [], infra: [],
  };
  for (const [term, topic] of Object.entries(TERM_TOPICS)) {
    if (termsByTopic[topic]) termsByTopic[topic].push(term);
  }
  const glossarySlugs = new Set(GLOSSARY_TERMS.map((t) => slugify(t.term)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">🎯</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">{tr.subtitle}</p>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {tr.lookupHint}{' '}
          <Link
            href="/learn/glossary"
            className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            🔍 {tr.lookupLink} &rarr;
          </Link>
        </p>
      </header>

      {/* Narrative flow — startup-centric */}
      <section className="mb-10 p-5 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900 space-y-3">
        <h2 className="font-bold flex items-center gap-2">
          <span>🔗</span>
          <span>{tr.relations}</span>
        </h2>
        <ConceptsNarrative variant="full" />
      </section>

      {/* The 8 concepts grouped into 3 zones (A: Inputs, B: Outputs, C: Context)
          + Jurisdiction as a cross-cutting row at the bottom. */}
      <section className="mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--border)]">
                <th className="sticky left-0 z-10 bg-[var(--background)] text-left p-3 border-r border-[var(--border)] text-xs uppercase tracking-wide text-gray-500 w-40 sm:w-56">
                  {tr.concept}
                </th>
                <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-500 min-w-[220px]">
                  {tr.whatIs}
                </th>
                <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-500 min-w-[220px]">
                  {tr.whenApplies}
                </th>
                <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-500 min-w-[240px]">
                  {tr.examples}
                </th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Render function for a single topic row — shared across zones
                const renderTopicRow = (topic: Topic) => {
                  const desc = TOPIC_DESCRIPTIONS[topic][isFr ? 'fr' : 'en'];
                  const meta = TOPIC_META[topic];
                  const TOPIC_TO_TERM: Record<Topic, string> = {
                    regime: 'regime', licence: 'licence', regulator: 'regulator',
                    obligation: 'obligation', token: 'token-type', infra: 'infrastructure',
                    doctrine: 'doctrine',
                  };
                  const slug = TOPIC_TO_TERM[topic];
                  return (
                    <tr key={topic} className="border-b border-[var(--border)]">
                      <td className="sticky left-0 z-[1] bg-[var(--background)] p-3 align-top border-r border-[var(--border)]">
                        <Link
                          href={`/learn/glossary#term-${slug}`}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${meta.pillClass} hover:ring-2 hover:ring-offset-1 hover:ring-current transition-all`}
                        >
                          <span className="text-sm leading-none">{meta.icon}</span>
                          <span>{isFr ? meta.labelFr : meta.labelEn}</span>
                        </Link>
                        <div className="text-sm font-bold mt-1.5">{desc.title}</div>
                        {/* Short 1-line field-legend — same copy as the /assess
                            + /compare row labels so vocabulary stays coherent
                            across pages. Muted so it doesn't compete with the
                            pill / title. */}
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                          {desc.short}
                        </div>
                        {/* Promotion to the concept-led /topics surface —
                            user can dive into a curated cross-link page for
                            this concept (guides + quick checks + glossary +
                            use cases). */}
                        <Link
                          href={`/topics/${topic}` as `/topics/${string}`}
                          className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {isFr ? 'Page sujet' : 'Topic page'} &rarr;
                        </Link>
                      </td>
                      <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{desc.what}</td>
                      <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{desc.when}</td>
                      <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{desc.examples}</td>
                    </tr>
                  );
                };

                // Zone header row — spans all 4 columns
                const zoneHeader = (title: string, subtitle: string, bgClass: string, key: string) => (
                  <tr key={key} className={`${bgClass} border-b border-[var(--border)]`}>
                    <td colSpan={4} className="p-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">{title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{subtitle}</div>
                    </td>
                  </tr>
                );

                const jurisdictionRow = () => {
                  const jDesc = JURISDICTION_CROSSCUT.desc[isFr ? 'fr' : 'en'];
                  return (
                    <tr key="jurisdiction" className="border-b border-[var(--border)]">
                      <td className="sticky left-0 z-[1] bg-[var(--background)] p-3 align-top border-r border-[var(--border)]">
                        {/* Teal — clearly distinct hue from all 7 topic colours
                            and from Infra's slate. */}
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
                          <span className="text-sm leading-none">{JURISDICTION_CROSSCUT.icon}</span>
                          <span>{isFr ? JURISDICTION_CROSSCUT.labelFr : JURISDICTION_CROSSCUT.labelEn}</span>
                        </span>
                        <div className="text-sm font-bold mt-1.5">{jDesc.title}</div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                          {jDesc.short}
                        </div>
                        <Link
                          href="/topics/jurisdiction"
                          className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {isFr ? 'Page sujet' : 'Topic page'} &rarr;
                        </Link>
                      </td>
                      <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{jDesc.what}</td>
                      <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{jDesc.when}</td>
                      <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{jDesc.examples}</td>
                    </tr>
                  );
                };

                return (
                  <>
                    {zoneHeader(tr.zoneA.title, tr.zoneA.subtitle, 'bg-blue-50 dark:bg-blue-900/20', 'zoneA')}
                    {ZONE_A.map(renderTopicRow)}
                    {zoneHeader(tr.zoneB.title, tr.zoneB.subtitle, 'bg-emerald-50 dark:bg-emerald-900/20', 'zoneB')}
                    {ZONE_B.map(renderTopicRow)}
                    {zoneHeader(tr.zoneC.title, tr.zoneC.subtitle, 'bg-amber-50 dark:bg-amber-900/20', 'zoneC')}
                    {ZONE_C.map(renderTopicRow)}
                    {jurisdictionRow()}
                  </>
                );
              })()}
            </tbody>
          </table>
        </div>
      </section>

      {/* 📏 Reach — how far a regulation applies */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span>📏</span>
          <span>{tr.reachTitle}</span>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tr.reachSubtitle}</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {tr.scopes.map((sc) => (
            <div key={sc.label} className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl leading-none">{sc.icon}</span>
                <span className="font-semibold text-sm">{sc.label}</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{sc.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Small print: UI flag markers (not a regulatory concept — just a display convention) */}
      <aside className="mb-10 p-3 rounded-md border border-dashed border-[var(--border)] bg-gray-50/60 dark:bg-gray-900/40">
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          <span className="font-semibold">🏳️ {tr.flagsTitle}</span> — {tr.flagsBody}
        </p>
      </aside>

      {/* All terms, grouped by concept */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">{tr.allTerms}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[...ZONE_A, ...ZONE_B, ...ZONE_C].map((topic) => {
            const meta = TOPIC_META[topic];
            const terms = termsByTopic[topic] ?? [];
            if (terms.length === 0) return null;
            const shortDesc = TOPIC_DESCRIPTIONS[topic][isFr ? 'fr' : 'en'].short;
            return (
              <div key={topic} className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${meta.pillClass}`}>
                    <span>{meta.icon}</span>
                    <span>{isFr ? meta.labelFr : meta.labelEn}</span>
                  </span>
                  <span className="text-xs text-gray-500">{terms.length}</span>
                </div>
                {/* Short 1-line concept legend — same copy as table above and
                    as the /assess + /compare row labels. */}
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3 leading-snug">
                  {shortDesc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {terms.map((term) => {
                    const slug = slugify(term);
                    const hasGlossary = glossarySlugs.has(slug);
                    const content = (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${meta.pillClass} ${hasGlossary ? 'hover:ring-2 hover:ring-offset-1 hover:ring-current transition-all cursor-pointer' : 'opacity-70'}`}
                      >
                        {term}
                      </span>
                    );
                    return hasGlossary ? (
                      <Link key={term} href={`/learn/glossary#term-${slug}`}>
                        {content}
                      </Link>
                    ) : (
                      <span key={term}>{content}</span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-gray-500 text-center italic">{tr.disclaimer}</p>
    </div>
  );
}
