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
  // ---- XRPL ecosystem ----
  {
    id: 'uphold',
    company: 'Uphold',
    logo: '🔼',
    website: 'https://uphold.com',
    tag: 'exchange',
    licences: [
      { jur: 'us', name: 'FinCEN MSB + State MTLs' },
      { jur: 'uk', name: 'FCA Cryptoasset registration' },
      { jur: 'eu', name: 'Lithuania VASP (VASPI) — EU expansion pre-MiCA' },
    ],
    useCase: {
      en: 'Multi-asset trading platform. XRPL-native since launch (2015) and a long-standing ODL corridor partner of Ripple. Regulated across US, UK, and EU, with mid-2020s transition to full MiCA CASP authorisation.',
      fr: "Plateforme de trading multi-actifs. Native XRPL depuis son lancement (2015) et partenaire historique d'ODL avec Ripple. Régulée aux US, UK et UE, avec une transition en cours vers l'agrément MiCA CASP complet.",
    },
    since: '2015',
  },
  {
    id: 'bitstamp',
    company: 'Bitstamp',
    logo: '🟢',
    website: 'https://www.bitstamp.net',
    tag: 'exchange',
    licences: [
      { jur: 'eu', name: 'Luxembourg CSSF PFS + MiCA CASP (Bitstamp Europe)' },
      { jur: 'uk', name: 'FCA Cryptoasset registration' },
      { jur: 'us', name: 'FinCEN MSB + NY BitLicense' },
    ],
    useCase: {
      en: 'One of the oldest crypto exchanges (since 2011). XRPL-native BTC/XRP trading pair and a historic Ripple ODL settlement partner. Acquired by Robinhood in 2024 (€200M deal) to anchor its EU MiCA presence.',
      fr: "Une des plus anciennes plateformes crypto (depuis 2011). Paire BTC/XRP native XRPL et partenaire historique de règlement ODL avec Ripple. Rachetée par Robinhood en 2024 (200M€) pour ancrer sa présence MiCA UE.",
    },
    since: '2011',
  },
  {
    id: 'gatehub',
    company: 'GateHub',
    logo: '🚪',
    website: 'https://gatehub.net',
    tag: 'custody',
    licences: [
      { jur: 'eu', name: 'Slovenia VASP (Office for Money Laundering Prevention)' },
    ],
    useCase: {
      en: 'XRPL-native wallet and exchange since 2014. One of the earliest implementers of the XRPL IOU / Trust Line model for issuing stablecoins and fiat-backed tokens. Slovenia-based; rebuilt KYC/AML stack after the 2019 breach.',
      fr: "Wallet et plateforme XRPL-native depuis 2014. Un des premiers à implémenter le modèle IOU / Trust Line XRPL pour émettre stablecoins et tokens adossés fiat. Basé en Slovénie ; stack KYC/AML reconstruite après la brèche de 2019.",
    },
    since: '2014',
  },
  {
    id: 'archax',
    company: 'Archax',
    logo: '📈',
    website: 'https://archax.com',
    tag: 'rwa',
    licences: [
      { jur: 'uk', name: 'FCA Authorised MTF + Custodian + Brokerage (first UK regulated digital securities exchange, 2020)' },
    ],
    useCase: {
      en: 'First UK FCA-authorised digital securities exchange (2020) — fully regulated under the MiFID-style regime, not just the crypto register. Tokenises traditional funds and uses XRPL for RWA settlement. Major Ripple partner targeting $1B+ in tokenised assets on XRPL by mid-2026.',
      fr: "Première bourse de titres numériques agréée FCA au UK (2020) — pleinement régulée sous le régime MiFID-like, pas seulement l'enregistrement crypto. Tokenise fonds traditionnels et utilise XRPL pour le règlement RWA. Partenaire majeur de Ripple visant plus d'1Md$ d'actifs tokenisés sur XRPL d'ici mi-2026.",
    },
    since: '2018',
  },
  {
    id: 'ripple-custody',
    company: 'Ripple Custody (Metaco + Palisade)',
    logo: '🔐',
    website: 'https://ripple.com/solutions/custody/',
    tag: 'custody',
    licences: [
      { jur: 'ch', name: 'FINMA DLT framework (via Metaco, acquired May 2023, $250M)' },
      { jur: 'eu', name: 'France PSAN / MiCA CASP path (via Palisade, acquired Nov 2025)' },
    ],
    useCase: {
      en: "Ripple's institutional custody stack, built from two acquisitions. Metaco (Swiss-based, acquired 2023) provides bank-grade custody technology used by Citi, BNP Paribas and Société Générale Forge. Palisade (acquired Nov 2025) adds a France-licensed MPC wallet-as-a-service with native XRPL, Ethereum and Solana support — targeted at fintechs and crypto-native firms.",
      fr: "Stack custody institutionnelle de Ripple, bâtie sur deux acquisitions. Metaco (Suisse, acquis 2023) fournit la techno custody de niveau bancaire utilisée par Citi, BNP Paribas et Société Générale Forge. Palisade (acquis nov 2025) ajoute un service MPC wallet-as-a-service licencié en France avec support natif XRPL, Ethereum et Solana — ciblé sur les fintechs et acteurs crypto-natifs.",
    },
    since: '2023',
  },
  {
    id: 'futureverse',
    company: 'Futureverse (Root Network)',
    logo: '🎮',
    website: 'https://www.futureverse.com',
    tag: 'dapp',
    licences: [
      { jur: 'us', name: 'Operating entity — Delaware C-corp, consumer-facing gaming (no regulated financial activity)' },
    ],
    useCase: {
      en: "AI + metaverse infrastructure company behind The Root Network, an XRPL-EVM-sidechain-style chain optimised for gaming and metaverse experiences. $54M Series A in 2023 led by 10T Holdings with Ripple participation. Not a regulated financial entity — pure tech/gaming play.",
      fr: "Infrastructure IA + metaverse derrière The Root Network, une chaîne type sidechain-EVM XRPL optimisée pour le gaming et les expériences metaverse. 54M$ Série A en 2023 menée par 10T Holdings avec participation de Ripple. Pas d'entité financière régulée — pur tech/gaming.",
    },
    since: '2022',
  },
  {
    id: 'xaman',
    company: 'Xaman (XRPL Labs)',
    logo: '✨',
    website: 'https://xaman.app',
    tag: 'custody',
    licences: [
      { jur: 'eu', name: 'Netherlands (XRPL Labs B.V.) — non-custodial wallet software, no VASP registration required (FATF R.15 / AMLD6 carve-out for pure software)' },
    ],
    useCase: {
      en: "Reference XRPL mobile wallet (formerly XUMM, renamed Xaman in 2024). Strictly non-custodial — users hold their own keys and XRPL Labs has no access to funds. xApps ecosystem for embedded dApps, Tangem hardware-wallet integration, biometric signing. Operates under the FATF carve-out for non-custodial wallet software providers — no VASP / CASP licence required.",
      fr: "Wallet XRPL mobile de référence (anciennement XUMM, renommé Xaman en 2024). Strictement non-custodial — les utilisateurs gardent leurs clés, XRPL Labs n'a aucun accès aux fonds. Écosystème xApps pour les dApps embarquées, intégration hardware Tangem, signature biométrique. Opère sous la carve-out FATF pour les éditeurs de wallet logiciel non-custodial — pas d'agrément VASP / CASP requis.",
    },
    since: '2016',
  },
  {
    id: 'sologenic-tx',
    company: 'Sologenic / TX Network',
    logo: '🪙',
    website: 'https://tx.network',
    tag: 'rwa',
    licences: [
      { jur: 'uae', name: 'DMCC Free Zone (TX Network foundation) + VARA application pathway for VA services' },
      { jur: 'ch', name: 'Sologenic AG — Swiss subsidiary positioning for FINMA DLT framework and tokenised securities pilots' },
    ],
    useCase: {
      en: "XRPL-native tokenisation platform for equities, ETFs and RWAs. Launched as Sologenic in 2020, rebranded and expanded to TX Network in 2025 as unified RWA + cross-chain bridge infrastructure. One of the largest XRPL-native projects by on-chain TVL; pioneered the on-chain stock / ETF model on XRPL.",
      fr: "Plateforme de tokenisation XRPL-native pour actions, ETF et RWA. Lancée sous le nom de Sologenic en 2020, rebaptisée et étendue en TX Network en 2025 comme infrastructure unifiée RWA + pont cross-chain. Un des plus gros projets XRPL-natifs par TVL on-chain ; pionnier du modèle actions / ETF tokenisés sur XRPL.",
    },
    since: '2020',
  },
  {
    id: 'evernode',
    company: 'Evernode (Xahau)',
    logo: '🧩',
    website: 'https://evernode.org',
    tag: 'dapp',
    licences: [
      { jur: 'uae', name: 'Evernode Foundation — open-source L1 protocol (Xahau). No regulated operator entity. FATF VASP obligations apply only to service providers interacting with end-users, not the protocol itself.' },
    ],
    useCase: {
      en: "Decentralised dApp hosting on Xahau — an XRPL fork with native smart-contract Hooks. Each dApp runs as its own mini-blockchain on Xahau Mainnet, paid in EVR tokens. Open-source protocol with no central operator; registration and AML obligations sit at the dApp-operator layer, not at the protocol.",
      fr: "Hébergement dApp décentralisé sur Xahau — un fork XRPL avec des Hooks smart-contracts natifs. Chaque dApp tourne comme sa propre mini-blockchain sur Xahau Mainnet, réglée en tokens EVR. Protocole open-source sans opérateur central ; les obligations d'enregistrement et AML sont au niveau des opérateurs de dApp, pas du protocole.",
    },
    since: '2021',
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
