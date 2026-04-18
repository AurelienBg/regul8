import type { Jurisdiction } from '@/types';

export type UseCaseTag =
  | 'stablecoin'
  | 'exchange'
  | 'custody'
  | 'nft'
  | 'payment'
  | 'rwa'
  | 'dapp'
  | 'token-issuance';

/** A licence paired with its issuing jurisdiction (1:1). */
export interface LicenceRef {
  jur: Jurisdiction;
  name: string;
}

export interface UseCase {
  id: string;
  company: string;
  /** Optional emoji or small logo glyph. */
  logo?: string;
  website?: string;
  tag: UseCaseTag;
  /** Each licence is paired with its jurisdiction so flags align row-by-row. */
  licences: LicenceRef[];
  useCase: { en: string; fr: string };
  since?: string;
  /** Optional extra context. */
  note?: { en: string; fr: string };
}

export const USE_CASES: UseCase[] = [
  {
    id: 'ripple-rlusd',
    company: 'Ripple (RLUSD)',
    logo: '💧',
    website: 'https://ripple.com',
    tag: 'stablecoin',
    licences: [
      { jur: 'us', name: 'NYDFS Trust Charter (Standard Custody)' },
      { jur: 'eu', name: 'MiCA EMT-ready via EU entity' },
    ],
    useCase: {
      en: 'USD-backed stablecoin issued on XRPL and Ethereum. Reference implementation of a regulated stablecoin using the XRPL IOU / Trust Line model with on-chain compliance primitives.',
      fr: "Stablecoin adossé au USD émis sur XRPL et Ethereum. Implémentation de référence d'un stablecoin régulé utilisant le modèle IOU / Trust Line XRPL avec des primitives de conformité on-chain.",
    },
    since: '2024',
  },
  {
    id: 'circle-usdc',
    company: 'Circle (USDC)',
    logo: '🪙',
    website: 'https://www.circle.com',
    tag: 'stablecoin',
    licences: [
      { jur: 'us', name: 'NYDFS Trust Charter' },
      { jur: 'eu', name: 'MiCA EMT authorization (Circle Mint Europe, France)' },
      { jur: 'sg', name: 'MAS MPI (Circle Singapore)' },
    ],
    useCase: {
      en: 'USD-pegged stablecoin issued by Circle. One of the first to achieve full MiCA EMT compliance in the EU (July 2024) via Circle Mint Europe (France-based).',
      fr: "Stablecoin indexé sur l'USD émis par Circle. L'un des premiers à avoir obtenu la pleine conformité MiCA EMT dans l'UE (juillet 2024) via Circle Mint Europe (basé en France).",
    },
    since: '2018',
  },
  {
    id: 'coinbase',
    company: 'Coinbase',
    logo: '🟦',
    website: 'https://www.coinbase.com',
    tag: 'exchange',
    licences: [
      { jur: 'us', name: 'NYDFS BitLicense' },
      { jur: 'us', name: 'State MTLs (~48 states)' },
      { jur: 'eu', name: 'MiCA CASP (Coinbase Europe, Ireland / Germany)' },
      { jur: 'uk', name: 'FCA Crypto registration' },
    ],
    useCase: {
      en: 'Largest US crypto exchange + institutional custody. Publicly listed (NASDAQ:COIN). Extended to EU via Ireland/Germany MiCA CASP + UK FCA registration.',
      fr: "Plus grande plateforme crypto US + custody institutionnelle. Cotée en bourse (NASDAQ:COIN). Étendue à l'UE via l'agrément MiCA CASP Irlande/Allemagne + enregistrement FCA UK.",
    },
    since: '2012',
  },
  {
    id: 'binance',
    company: 'Binance',
    logo: '⬛',
    website: 'https://www.binance.com',
    tag: 'exchange',
    licences: [
      { jur: 'uae', name: 'VARA VASP Class I (Dubai)' },
      { jur: 'eu', name: 'AMF PSAN (France)' },
      { jur: 'sg', name: 'MAS MPI (Binance Singapore)' },
      { jur: 'jp', name: 'FSA Japan (Binance Japan)' },
    ],
    useCase: {
      en: "World's largest crypto exchange by volume. Post-2023 $4.3B US settlement, pivoted to multi-jurisdiction licensed model anchored in Dubai. ~21+ licences globally.",
      fr: "Plus grande plateforme crypto au monde en volume. Après l'accord de 4,3Md$ avec les US en 2023, pivot vers un modèle multi-juridictionnel ancré à Dubaï. ~21+ licences dans le monde.",
    },
    since: '2017',
  },
  {
    id: 'sorare',
    company: 'Sorare',
    logo: '⚽',
    website: 'https://sorare.com',
    tag: 'nft',
    licences: [
      { jur: 'eu', name: 'ANJ JONUM authorization (France, SREN Law 2024)' },
    ],
    useCase: {
      en: 'NFT fantasy football game. First company to operate under the French JONUM regime (May 2024), created specifically after the ANJ investigation in 2022.',
      fr: "Jeu de fantasy football NFT. Première entreprise à opérer sous le régime JONUM français (mai 2024), créé spécifiquement après les investigations de l'ANJ en 2022.",
    },
    since: '2018',
  },
  {
    id: 'paxos-pyusd',
    company: 'Paxos (PYUSD)',
    logo: '💵',
    website: 'https://paxos.com',
    tag: 'stablecoin',
    licences: [
      { jur: 'us', name: 'NYDFS Trust Charter' },
      { jur: 'sg', name: 'MAS MPI (Singapore)' },
    ],
    useCase: {
      en: 'Regulated stablecoin infrastructure. Issues PYUSD (PayPal USD), BUSD (formerly Binance USD), and USDP. NYDFS-chartered trust company.',
      fr: "Infrastructure de stablecoins régulés. Émet PYUSD (PayPal USD), BUSD (anciennement Binance USD) et USDP. Trust chartered par la NYDFS.",
    },
    since: '2018',
  },
  {
    id: 'anchorage',
    company: 'Anchorage Digital',
    logo: '⚓',
    website: 'https://www.anchorage.com',
    tag: 'custody',
    licences: [
      { jur: 'us', name: 'OCC National Trust Bank charter (first federally chartered crypto bank, 2021)' },
    ],
    useCase: {
      en: 'Institutional-grade digital asset custody. First crypto company to receive an OCC national trust bank charter in January 2021. Serves hedge funds, PE, family offices.',
      fr: "Custody d'actifs numériques de qualité institutionnelle. Première entreprise crypto à recevoir une charte OCC de banque trust nationale en janvier 2021. Sert les hedge funds, PE, family offices.",
    },
    since: '2017',
  },
  {
    id: 'securitize',
    company: 'Securitize',
    logo: '📜',
    website: 'https://securitize.io',
    tag: 'rwa',
    licences: [
      { jur: 'us', name: 'SEC Transfer Agent' },
      { jur: 'us', name: 'SEC Broker-Dealer (Securitize Markets)' },
      { jur: 'us', name: 'ATS operator' },
      { jur: 'eu', name: 'MiCA DLT Pilot Regime eligibility' },
    ],
    useCase: {
      en: 'Tokenisation platform for regulated securities (RWA). Runs the BlackRock BUIDL fund on Ethereum (2024), the largest tokenised treasury fund. SEC-regulated end-to-end.',
      fr: "Plateforme de tokenisation pour titres régulés (RWA). Exploite le fonds BlackRock BUIDL sur Ethereum (2024), le plus grand fonds obligataire tokenisé. Régulé SEC de bout en bout.",
    },
    since: '2017',
  },
  {
    id: 'shuman-financial',
    company: 'Shuman Financial',
    logo: '🏦',
    website: 'https://shuman.financial',
    tag: 'rwa',
    licences: [
      { jur: 'ch', name: 'FINMA DLT framework' },
      { jur: 'li', name: 'TVTG Token Issuer (Liechtenstein)' },
    ],
    useCase: {
      en: 'Swiss/Liechtenstein-based RWA tokenisation platform bridging traditional capital markets with blockchain infrastructure. Focus on institutional-grade private debt and structured products.',
      fr: "Plateforme de tokenisation RWA basée en Suisse/Liechtenstein reliant les marchés de capitaux traditionnels à l'infrastructure blockchain. Focus sur la dette privée institutionnelle et les produits structurés.",
    },
    since: '2023',
  },
  {
    id: 'gemini',
    company: 'Gemini',
    logo: '♊',
    website: 'https://www.gemini.com',
    tag: 'exchange',
    licences: [
      { jur: 'us', name: 'NYDFS Trust Charter' },
      { jur: 'us', name: 'NYDFS BitLicense' },
      { jur: 'uk', name: 'FCA Crypto registration' },
      { jur: 'eu', name: 'Ireland Central Bank E-Money Institution' },
    ],
    useCase: {
      en: 'Regulated US crypto exchange + custody. Issued GUSD stablecoin. NYDFS-chartered trust company; operates in US, UK, and EU. Focus on institutional and compliance-first.',
      fr: "Plateforme et custody crypto US régulée. Émet le stablecoin GUSD. Trust chartered NYDFS ; opère aux US, UK et UE. Focus institutionnel et compliance-first.",
    },
    since: '2014',
  },
];

export function getUseCasesByTag(tag: UseCaseTag | 'all'): UseCase[] {
  if (tag === 'all') return USE_CASES;
  return USE_CASES.filter((c) => c.tag === tag);
}

export const USE_CASE_TAGS: Array<{ key: UseCaseTag | 'all'; labelEn: string; labelFr: string; icon?: string }> = [
  { key: 'all', labelEn: 'All', labelFr: 'Tous' },
  { key: 'stablecoin', labelEn: 'Stablecoin', labelFr: 'Stablecoin', icon: '💵' },
  { key: 'exchange', labelEn: 'Exchange', labelFr: 'Exchange', icon: '🔄' },
  { key: 'custody', labelEn: 'Custody', labelFr: 'Custody', icon: '🔐' },
  { key: 'nft', labelEn: 'NFT', labelFr: 'NFT', icon: '🎨' },
  { key: 'payment', labelEn: 'Payment', labelFr: 'Paiement', icon: '💳' },
  { key: 'rwa', labelEn: 'RWA', labelFr: 'RWA', icon: '🏛️' },
  { key: 'dapp', labelEn: 'DApp', labelFr: 'DApp', icon: '⚙️' },
  { key: 'token-issuance', labelEn: 'Token issuance', labelFr: 'Émission de token', icon: '🪙' },
];
