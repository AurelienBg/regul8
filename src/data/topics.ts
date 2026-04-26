/**
 * Topic landing pages — concept-led navigation surface.
 *
 * Each entry curates the cross-links to the existing verb-led content
 * (Assess quick-checks, Learn guides, glossary, use cases, diagrams)
 * that pertain to that concept. The /topics/[concept] route renders
 * these as a single landing page per concept — gives users a topic-led
 * entry point without restructuring the whole IA.
 *
 * Maintains parity with the 8-concept taxonomy on /learn/concepts:
 *   licence · regime · regulator · obligation · token · infra ·
 *   doctrine · jurisdiction (cross-cut)
 */

export type ConceptKey =
  | 'licence'
  | 'regime'
  | 'regulator'
  | 'obligation'
  | 'token'
  | 'infra'
  | 'doctrine'
  | 'jurisdiction';

export interface TopicConfig {
  key: ConceptKey;
  /** Pill icon — same as TOPIC_META on /learn/concepts. */
  icon: string;
  /** Localised one-line subtitle (also used on /learn/concepts). */
  shortEn: string;
  shortFr: string;
  /** Localised landing-page intro paragraph (1-2 lines). */
  introEn: string;
  introFr: string;
  /** Tailwind classes for the topic pill / accent. Aligns with the
   *  TOPIC_META palette so visuals match across the app. */
  pillClass: string;
  accentBorder: string;
  accentBg: string;
  /** Slugs of `/learn/guides/[id]` that relate to this concept. */
  guideSlugs: string[];
  /** Slugs of `/assess/quick/[id]` diagnostics that relate. */
  checkSlugs: string[];
  /** Glossary topic param — drives the deep-link to /learn/glossary. */
  glossaryTopic?: string;
  /** UseCase tag to deep-link into /learn/usecases?filter=<tag>. */
  useCaseTag?: string;
  /** Recognisable example terms (rendered as small chips). */
  exampleTerms: string[];
}

export const TOPICS: Record<ConceptKey, TopicConfig> = {
  jurisdiction: {
    key: 'jurisdiction',
    icon: '🗺️',
    shortEn: 'The territory whose regulator has authority over you',
    shortFr: 'Le territoire dont le régulateur a autorité sur vous',
    introEn:
      "Every licence, regime and regulator is scoped to a jurisdiction. Picking the right one is often half the compliance strategy. This topic page brings together everything Regul8 has on jurisdiction selection — comparisons, quick check, dedicated guides.",
    introFr:
      "Chaque licence, régime et régulateur est rattaché à une juridiction. En choisir la bonne représente souvent la moitié de la stratégie compliance. Cette page rassemble tout ce que Regul8 a sur le choix de juridiction — comparaisons, diagnostic éclair, guides dédiés.",
    pillClass: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
    accentBorder: 'border-teal-200 dark:border-teal-900/50',
    accentBg: 'bg-teal-50/60 dark:bg-teal-900/20',
    guideSlugs: ['liechtenstein-fast-track', 'dubai-vara', 'us-crypto-101'],
    checkSlugs: ['jurisdiction'],
    exampleTerms: ['BitLicense', 'CASP', 'VARA', 'TVTG', 'DFSA', 'MAS'],
  },
  licence: {
    key: 'licence',
    icon: '🪪',
    shortEn: 'The concrete authorizations you must obtain',
    shortFr: 'Les agréments concrets à obtenir',
    introEn:
      "Licences are what you actually apply for and obtain to operate legally. They sit downstream of regimes (the law) and are issued by regulators. This page surfaces all licence-related content across Regul8 — quick CASP check, MiCA guide, all licence terms in the glossary.",
    introFr:
      "Les licences sont ce que vous demandez et obtenez concrètement pour opérer légalement. Elles découlent des régimes (la loi) et sont délivrées par les régulateurs. Cette page surface tout le contenu lié aux licences — diagnostic CASP éclair, guide MiCA, tous les termes licence dans le glossaire.",
    pillClass: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
    accentBorder: 'border-violet-200 dark:border-violet-900/50',
    accentBg: 'bg-violet-50/60 dark:bg-violet-900/20',
    guideSlugs: ['mica-essentials', 'us-crypto-101', 'liechtenstein-fast-track', 'dubai-vara'],
    checkSlugs: ['casp'],
    glossaryTopic: 'licence',
    exampleTerms: ['CASP', 'DASP', 'MTL', 'BitLicense', 'MSB', 'EMI', 'VASP', 'AFSL'],
  },
  regime: {
    key: 'regime',
    icon: '📜',
    shortEn: 'The legal text that grounds it all — scope & territorial reach',
    shortFr: 'Le texte légal qui fonde tout — portée et reach territorial',
    introEn:
      "Regimes are the laws and regulations themselves — MiCA, GENIUS Act, TVTG, BSA. They define what's allowed, who can do it, and under what conditions. Each regime has a territorial scope (📍 local, 🌐 extraterritorial, 🌍 global). Quick read on MiCA + global stablecoin frameworks below.",
    introFr:
      "Les régimes sont les lois et réglementations — MiCA, GENIUS Act, TVTG, BSA. Ils définissent ce qui est permis, qui peut le faire, sous quelles conditions. Chaque régime a une portée territoriale (📍 locale, 🌐 extraterritoriale, 🌍 globale). Quick read sur MiCA + cadres stablecoins ci-dessous.",
    pillClass: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
    accentBorder: 'border-sky-200 dark:border-sky-900/50',
    accentBg: 'bg-sky-50/60 dark:bg-sky-900/20',
    guideSlugs: ['mica-essentials', 'stablecoin-frameworks', 'liechtenstein-fast-track', 'us-crypto-101'],
    checkSlugs: [],
    glossaryTopic: 'regime',
    exampleTerms: ['MiCA', 'GENIUS Act', 'TVTG', 'BSA', 'PSD2', 'MiFID II', 'JONUM', 'SREN'],
  },
  regulator: {
    key: 'regulator',
    icon: '🏛️',
    shortEn: 'The body that supervises and issues the licence',
    shortFr: "L'organisme qui supervise et délivre la licence",
    introEn:
      "Regulators are the authorities that supervise licence holders, issue authorisations and enforce compliance — AMF, ESMA, SEC, CFTC, FINMA, MAS, VARA, FCA and many more. Browse the full list in the glossary, or read about specific ones in the relevant guides.",
    introFr:
      "Les régulateurs sont les autorités qui supervisent les détenteurs de licence, délivrent les agréments et font respecter la conformité — AMF, ESMA, SEC, CFTC, FINMA, MAS, VARA, FCA et bien d'autres. Liste complète dans le glossaire, ou lisez les guides dédiés à chacun.",
    pillClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
    accentBorder: 'border-rose-200 dark:border-rose-900/50',
    accentBg: 'bg-rose-50/60 dark:bg-rose-900/20',
    guideSlugs: ['us-crypto-101', 'mica-essentials', 'dubai-vara'],
    checkSlugs: [],
    glossaryTopic: 'regulator',
    exampleTerms: ['AMF', 'ESMA', 'SEC', 'CFTC', 'FinCEN', 'FINMA', 'MAS', 'VARA', 'FCA', 'BaFin'],
  },
  obligation: {
    key: 'obligation',
    icon: '✅',
    shortEn: 'Daily compliance duties (KYC, AML, Travel Rule…)',
    shortFr: 'Obligations quotidiennes (KYC, AML, Travel Rule…)',
    introEn:
      "Obligations are what you DO every day to remain compliant — KYC at onboarding, transaction monitoring, sanctions screening, SAR filings, Travel Rule data exchange. Practical playbook in the KYC/AML guide; cross-jurisdictional Travel Rule deep-dive below.",
    introFr:
      "Les obligations sont ce que vous FAITES au quotidien pour rester conforme — KYC à l'onboarding, monitoring de transactions, screening sanctions, déclarations SAR, échanges Travel Rule. Playbook pratique dans le guide KYC/AML ; deep-dive Travel Rule cross-juridictionnel ci-dessous.",
    pillClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    accentBorder: 'border-emerald-200 dark:border-emerald-900/50',
    accentBg: 'bg-emerald-50/60 dark:bg-emerald-900/20',
    guideSlugs: ['kyc-aml-for-startups', 'fatf-travel-rule'],
    checkSlugs: [],
    glossaryTopic: 'obligation',
    exampleTerms: ['KYC', 'KYB', 'AML', 'CFT', 'Travel Rule', 'SAR', 'OFAC'],
  },
  token: {
    key: 'token',
    icon: '🪙',
    shortEn: "How the asset is classified — drives which regime applies",
    shortFr: "Comment l'actif est classé — détermine quel régime s'applique",
    introEn:
      "Token type classification dictates everything downstream: which regime applies, which licence you need, which obligations bind you. EMT? ART? Other crypto-asset? Security under Howey? Read the MiCA token taxonomy on the dedicated guide, or run the Howey Test quick check.",
    introFr:
      "La classification du token détermine tout ce qui suit : quel régime s'applique, quelle licence il faut, quelles obligations s'imposent. EMT ? ART ? Autre crypto-actif ? Security selon Howey ? Lisez la taxonomie MiCA dans le guide dédié ou lancez le Howey Test en éclair.",
    pillClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
    accentBorder: 'border-amber-200 dark:border-amber-900/50',
    accentBg: 'bg-amber-50/60 dark:bg-amber-900/20',
    guideSlugs: ['mica-essentials', 'stablecoin-frameworks', 'tokenised-rwa', 'howey-test'],
    checkSlugs: ['howey', 'casp'],
    glossaryTopic: 'token',
    useCaseTag: 'token-issuance',
    exampleTerms: ['EMT', 'ART', 'STO', 'NFT', 'RWA', 'DPT', 'RLUSD', 'MPT', 'Stablecoin'],
  },
  infra: {
    key: 'infra',
    icon: '🔧',
    shortEn: 'Technical building blocks that shape how regulation applies',
    shortFr: 'Briques techniques qui façonnent la régulation applicable',
    introEn:
      "Infrastructure refers to the technical primitives — DeFi vs CeFi, custodial vs non-custodial, smart contracts, DLT, XRPL primitives like Trust Lines, Escrow, Payment Channels. Not regulated themselves, but their architecture is what triggers different regulatory paths.",
    introFr:
      "L'infrastructure désigne les briques techniques — DeFi vs CeFi, custodial vs non-custodial, smart contracts, DLT, primitives XRPL (Trust Lines, Escrow, Payment Channels). Pas régulées en tant que telles, mais leur architecture détermine quels chemins réglementaires s'activent.",
    pillClass: 'bg-slate-200 text-slate-800 dark:bg-slate-600/60 dark:text-slate-100',
    accentBorder: 'border-slate-300 dark:border-slate-700',
    accentBg: 'bg-slate-100/60 dark:bg-slate-800/40',
    guideSlugs: ['xrpl-custody'],
    checkSlugs: ['xrpl-custody'],
    glossaryTopic: 'infra',
    exampleTerms: ['DeFi', 'CeFi', 'DAO', 'Smart Contract', 'DLT', 'Trust Line', 'IOU', 'Escrow', 'MPC', 'TSS'],
  },
  doctrine: {
    key: 'doctrine',
    icon: '💡',
    shortEn: 'Legal tests and case law that interpret the statute',
    shortFr: 'Tests juridiques et jurisprudence qui interprètent la loi',
    introEn:
      "Doctrine fills the gaps when the statute is silent — case law, legal tests, court rulings. The Howey Test (1946) is the central US doctrine for token classification. SEC v. Ripple (2023) clarified parts of XRP's status. Quick check below to walk the Howey Test on your token.",
    introFr:
      "La doctrine comble les vides du texte — jurisprudence, tests juridiques, décisions de justice. Le Test de Howey (1946) est la doctrine centrale aux US pour classifier les tokens. SEC v. Ripple (2023) a clarifié des aspects du statut de XRP. Diagnostic éclair ci-dessous pour appliquer Howey à votre token.",
    pillClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
    accentBorder: 'border-indigo-200 dark:border-indigo-900/50',
    accentBg: 'bg-indigo-50/60 dark:bg-indigo-900/20',
    guideSlugs: ['howey-test'],
    checkSlugs: ['howey'],
    glossaryTopic: 'doctrine',
    exampleTerms: ['Howey Test', 'SEC v. Ripple'],
  },
};

/** Stable display order for the hub + reused on /learn/concepts. */
export const TOPIC_ORDER: ConceptKey[] = [
  'jurisdiction',
  'licence',
  'regime',
  'regulator',
  'obligation',
  'token',
  'infra',
  'doctrine',
];
