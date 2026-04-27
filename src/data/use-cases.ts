import type { Jurisdiction } from '@/types';

/**
 * Last audited: 2026-04-22 — added ripple-payments, kraken, bitgo; enriched
 * coinbase / circle / gemini / uphold with missing licences; migrated
 * Ireland-based entities from the generic 'eu' code to the dedicated 'ie'
 * code now that it exists.
 */

export type UseCaseTag =
  | 'stablecoin'
  | 'exchange'
  | 'custody'
  | 'nft'
  | 'payment'
  | 'rwa'
  | 'dapp'
  | 'token-issuance';

/**
 * Structured licence entry — replaces the earlier free-form `name: string`
 * that forced the renderer to parse prose back into semantic pieces.
 *
 * Shape expresses the common "licence + regulator + regime" triple so the
 * UI can render a hierarchical Option-C layout without guesswork:
 *   🇫🇷  🪪 DASP
 *         by 🏛️ AMF · under 📜 MiCA · since 2023
 */
export interface LicenceRef {
  jur: Jurisdiction;
  /** Primary licence / framework identifier. Shown as the headline pill. */
  name: string;
  /** Issuing / supervising body (shown with 🏛️ rose pill prefixed by "by"). */
  regulator?: string;
  /** Governing regime or law (shown with 📜 sky pill prefixed by "under"). */
  regime?: string;
  /** Free-form context (condition, scope, entity name). Plain muted text. */
  note?: string;
  /** Year or month/year the licence was obtained. Muted text. */
  since?: string;
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
  /** True when the company / product relies on XRPL — surfaces the XRPL
   *  logo on the row + powers the "XRPL ecosystem" filter chip. */
  xrpl?: boolean;
}

export const USE_CASES: UseCase[] = [
  {
    id: 'ripple-rlusd',
    company: 'Ripple (RLUSD)',
    logo: '💧',
    website: 'https://ripple.com',
    tag: 'stablecoin',
    xrpl: true,
    licences: [
      { jur: 'us', name: 'Trust Charter', regulator: 'NYDFS', note: 'Standard Custody' },
      { jur: 'eu', name: 'EMT', regime: 'MiCA', note: 'via EU entity (EMT-ready)' },
    ],
    useCase: {
      en: 'USD-backed stablecoin issued on XRPL and Ethereum. Reference implementation of a regulated stablecoin using the XRPL IOU / Trust Line model with on-chain compliance primitives.',
      fr: "Stablecoin adossé au USD émis sur XRPL et Ethereum. Implémentation de référence d'un stablecoin régulé utilisant le modèle IOU / Trust Line XRPL avec des primitives de conformité on-chain.",
    },
    since: '2024',
  },
  {
    id: 'ripple-payments',
    company: 'Ripple Payments (RippleNet / ODL)',
    logo: '💸',
    website: 'https://ripple.com/solutions/payments/',
    tag: 'payment',
    xrpl: true,
    licences: [
      { jur: 'us', name: 'MSB', regulator: 'FinCEN' },
      { jur: 'us', name: 'MTL', note: 'State-by-state, ~30 states' },
      { jur: 'sg', name: 'MPI', regulator: 'MAS', since: 'Oct 2023' },
      { jur: 'uk', name: 'EMI', regulator: 'FCA', note: 'Ripple Payments UK Ltd', since: '2024' },
      { jur: 'uae', name: 'DFSA licence', regulator: 'DFSA', note: 'DIFC Dubai', since: 'Mar 2024' },
      { jur: 'ie', name: 'CASP', regulator: 'CBI', regime: 'MiCA', note: 'Ripple Labs Ireland', since: '2025' },
    ],
    useCase: {
      en: "Cross-border payments infrastructure using XRPL for settlement (ODL — On-Demand Liquidity). One of the most broadly licensed crypto-payment companies globally: ~30 US state MTLs + APAC via Singapore MPI + UK EMI + UAE DFSA + Ireland CBI CASP for EU coverage under MiCA.",
      fr: "Infrastructure de paiements transfrontaliers utilisant XRPL pour le règlement (ODL — On-Demand Liquidity). Une des entreprises de paiement crypto les plus largement licenciées au monde : ~30 MTL d'États US + APAC via le MPI de Singapour + EMI au UK + licence DFSA aux Émirats + CASP Irlande CBI pour la couverture UE sous MiCA.",
    },
    since: '2012',
  },
  {
    id: 'circle-usdc',
    company: 'Circle (USDC)',
    logo: '🪙',
    website: 'https://www.circle.com',
    tag: 'stablecoin',
    licences: [
      { jur: 'us', name: 'Trust Charter', regulator: 'NYDFS' },
      { jur: 'eu', name: 'EMT', regulator: 'AMF', regime: 'MiCA', note: 'Circle Mint Europe (France)', since: 'Jul 2024' },
      { jur: 'sg', name: 'MPI', regulator: 'MAS', note: 'Circle Singapore' },
      { jur: 'bm', name: 'DABA Class F', regulator: 'BMA', note: 'Historical issuance jurisdiction', since: '2019' },
      { jur: 'uae', name: 'ADGM Financial Services', note: 'Circle MENA + RAK DAO pilots', since: '2024' },
    ],
    useCase: {
      en: 'USD-pegged stablecoin issued by Circle. One of the first to achieve full MiCA EMT compliance in the EU (July 2024) via Circle Mint Europe (France-based). Historically issued under Bermuda DABA before the MiCA transition.',
      fr: "Stablecoin indexé sur l'USD émis par Circle. L'un des premiers à avoir obtenu la pleine conformité MiCA EMT dans l'UE (juillet 2024) via Circle Mint Europe (basé en France). Historiquement émis sous DABA Bermudes avant la transition MiCA.",
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
      { jur: 'us', name: 'BitLicense', regulator: 'NYDFS' },
      { jur: 'us', name: 'MTL', note: '~48 states' },
      { jur: 'ie', name: 'CASP', regulator: 'CBI', regime: 'MiCA', note: 'Coinbase Ireland Ltd — EU passporting hub' },
      { jur: 'eu', name: 'Crypto Custody licence', regulator: 'BaFin', note: 'Coinbase Germany GmbH — first in Germany', since: 'Jun 2021' },
      { jur: 'uk', name: 'Cryptoasset registration', regulator: 'FCA', note: 'Coinbase UK' },
      { jur: 'sg', name: 'MPI', regulator: 'MAS', note: 'Coinbase Singapore', since: '2023' },
    ],
    useCase: {
      en: 'Largest US crypto exchange + institutional custody. Publicly listed (NASDAQ:COIN). Ireland-based EU hub for MiCA passporting; Germany was the first BaFin crypto-custody licensee (Jun 2021). Singapore MAS MPI granted 2023.',
      fr: "Plus grande plateforme crypto US + custody institutionnelle. Cotée en bourse (NASDAQ:COIN). Hub UE basé en Irlande pour le passporting MiCA ; l'Allemagne fut le premier détenteur de licence custody crypto BaFin (juin 2021). MPI Singapour accordé en 2023.",
    },
    since: '2012',
  },
  {
    id: 'kraken',
    company: 'Kraken',
    logo: '🐙',
    website: 'https://www.kraken.com',
    tag: 'exchange',
    licences: [
      { jur: 'us', name: 'MSB', regulator: 'FinCEN' },
      { jur: 'us', name: 'MTL', note: '~40 states' },
      { jur: 'ie', name: 'CASP', regulator: 'CBI', regime: 'MiCA', note: 'Payward Europe — EU entry point' },
      { jur: 'uk', name: 'Cryptoasset registration', regulator: 'FCA', note: 'Payward Ltd' },
      { jur: 'au', name: 'DCE', regulator: 'AUSTRAC', note: 'Bit Trade Pty — Kraken Australia' },
      { jur: 'au', name: 'AFSL', regulator: 'ASIC', note: 'Bit Trade Pty — Kraken Australia' },
      { jur: 'ca', name: 'Pre-Registration Undertaking', regulator: 'CSA', note: 'IIROC path — Kraken Canada' },
    ],
    useCase: {
      en: 'Top-tier US crypto exchange, founded in 2011. Ireland-based EU hub (Payward Europe) for MiCA CASP passporting. Strong institutional and staking products — settled SEC action on staking in Feb 2023. Broad regulatory footprint across 40+ US states, UK, Canada, Australia.',
      fr: "Plateforme crypto US de premier plan, fondée en 2011. Hub UE basé en Irlande (Payward Europe) pour le passporting CASP MiCA. Produits institutionnels et staking solides — accord SEC sur le staking en février 2023. Empreinte réglementaire large : 40+ États US, UK, Canada, Australie.",
    },
    since: '2011',
  },
  {
    id: 'bitgo',
    company: 'BitGo',
    logo: '🛡️',
    website: 'https://www.bitgo.com',
    tag: 'custody',
    licences: [
      { jur: 'us', name: 'South Dakota Trust Charter', note: 'BitGo Trust Company', since: '2018' },
      { jur: 'us', name: 'NY Trust Charter', regulator: 'NYDFS', note: 'BitGo New York Trust Company', since: '2021' },
      { jur: 'eu', name: 'Crypto Custody registration', regulator: 'BaFin', note: 'BitGo Europe GmbH (Germany)' },
      { jur: 'sg', name: 'MPI', regulator: 'MAS', note: 'BitGo Singapore Pte Ltd' },
      { jur: 'ch', name: 'DLT framework', regulator: 'FINMA', note: 'BitGo Swiss — SST' },
    ],
    useCase: {
      en: 'Pioneer of multi-signature institutional crypto custody (founded 2013). Holds a South Dakota trust charter (2018) and later a NY trust licence (2021). Custodies for >500 institutions, filed for US IPO in 2025 (S-1). Germany BaFin-registered under the crypto-custody licence.',
      fr: "Pionnier de la custody crypto institutionnelle multi-signatures (fondée 2013). Détient une charte trust du Dakota du Sud (2018) puis une licence trust NY (2021). Custody pour >500 institutions, dépôt d'IPO aux US en 2025 (S-1). Enregistré BaFin en Allemagne sous la licence custody crypto.",
    },
    since: '2013',
  },
  {
    id: 'binance',
    company: 'Binance',
    logo: '⬛',
    website: 'https://www.binance.com',
    tag: 'exchange',
    licences: [
      { jur: 'uae', name: 'VASP Class I', regulator: 'VARA', note: 'Dubai' },
      { jur: 'eu', name: 'PSAN', regulator: 'AMF', note: 'France' },
      { jur: 'sg', name: 'MPI', regulator: 'MAS', note: 'Binance Singapore' },
      { jur: 'jp', name: 'CAESP', regulator: 'FSA', note: 'Binance Japan' },
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
      { jur: 'eu', name: 'JONUM authorization', regulator: 'ANJ', regime: 'SREN', note: 'France', since: 'May 2024' },
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
      { jur: 'us', name: 'Trust Charter', regulator: 'NYDFS' },
      { jur: 'sg', name: 'MPI', regulator: 'MAS', note: 'Singapore' },
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
      { jur: 'us', name: 'OCC charter', regulator: 'OCC', note: 'First federally chartered crypto bank (National Trust Bank)', since: '2021' },
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
      { jur: 'us', name: 'Transfer Agent', regulator: 'SEC' },
      { jur: 'us', name: 'Broker-Dealer', regulator: 'SEC', note: 'Securitize Markets' },
      { jur: 'us', name: 'ATS operator' },
      { jur: 'eu', name: 'DLT Pilot Regime', regime: 'MiCA', note: 'eligibility' },
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
    xrpl: true,
    licences: [
      { jur: 'ch', name: 'DLT framework', regulator: 'FINMA' },
      { jur: 'li', name: 'TVTG Token Issuer', regulator: 'FMA', regime: 'TVTG', note: 'Liechtenstein' },
    ],
    useCase: {
      en: 'Swiss/Liechtenstein-based RWA tokenisation platform bridging traditional capital markets with blockchain infrastructure. Uses XRPL for tokenised private debt issuance. Focus on institutional-grade private debt and structured products.',
      fr: "Plateforme de tokenisation RWA basée en Suisse/Liechtenstein reliant les marchés de capitaux traditionnels à l'infrastructure blockchain. Utilise XRPL pour l'émission de dette privée tokenisée. Focus sur la dette privée institutionnelle et les produits structurés.",
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
      { jur: 'us', name: 'Trust Charter', regulator: 'NYDFS' },
      { jur: 'us', name: 'BitLicense', regulator: 'NYDFS' },
      { jur: 'uk', name: 'Cryptoasset registration', regulator: 'FCA' },
      { jur: 'ie', name: 'EMI', regulator: 'CBI', note: 'Gemini Payments Europe — EU passporting' },
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
    xrpl: true,
    licences: [
      { jur: 'us', name: 'MSB', regulator: 'FinCEN' },
      { jur: 'us', name: 'MTL', note: 'State-by-state' },
      { jur: 'uk', name: 'Cryptoasset registration', regulator: 'FCA' },
      { jur: 'lt', name: 'VASP', regulator: 'Lietuvos bankas', note: 'Uphold Europe — pre-MiCA base, transitioning to MiCA CASP' },
      { jur: 'au', name: 'DCE', regulator: 'AUSTRAC' },
    ],
    useCase: {
      en: 'Multi-asset trading platform. XRPL-native since launch (2015) and a long-standing ODL corridor partner of Ripple. Regulated across US, UK, Lithuania (EU), and Australia, with mid-2020s transition to full MiCA CASP authorisation.',
      fr: "Plateforme de trading multi-actifs. Native XRPL depuis son lancement (2015) et partenaire historique d'ODL avec Ripple. Régulée aux US, UK, Lituanie (UE) et Australie, avec une transition en cours vers l'agrément MiCA CASP complet.",
    },
    since: '2015',
  },
  {
    id: 'bitstamp',
    company: 'Bitstamp',
    logo: '🟢',
    website: 'https://www.bitstamp.net',
    tag: 'exchange',
    xrpl: true,
    licences: [
      { jur: 'eu', name: 'PFS', regulator: 'CSSF', note: 'Luxembourg — Bitstamp Europe' },
      { jur: 'eu', name: 'CASP', regulator: 'CSSF', regime: 'MiCA', note: 'Bitstamp Europe' },
      { jur: 'uk', name: 'Cryptoasset registration', regulator: 'FCA' },
      { jur: 'us', name: 'MSB', regulator: 'FinCEN' },
      { jur: 'us', name: 'BitLicense', regulator: 'NYDFS' },
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
    xrpl: true,
    licences: [
      { jur: 'eu', name: 'VASP', note: 'Slovenia — Office for Money Laundering Prevention' },
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
    xrpl: true,
    licences: [
      { jur: 'uk', name: 'MTF', regulator: 'FCA', note: 'Authorised MTF + Custodian + Brokerage — first UK regulated digital securities exchange', since: '2020' },
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
    xrpl: true,
    licences: [
      { jur: 'ch', name: 'DLT framework', regulator: 'FINMA', note: 'via Metaco — acquired $250M', since: 'May 2023' },
      { jur: 'eu', name: 'PSAN', regulator: 'AMF', regime: 'MiCA', note: 'via Palisade acquisition — France-licensed', since: 'Nov 2025' },
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
    xrpl: true,
    licences: [
      { jur: 'us', name: 'Delaware C-corp', note: 'Consumer-facing gaming — no regulated financial activity' },
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
    xrpl: true,
    licences: [
      { jur: 'eu', name: 'Non-custodial wallet', note: 'Netherlands (XRPL Labs B.V.) — FATF R.15 / AMLD6 carve-out, no VASP registration required' },
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
    xrpl: true,
    licences: [
      { jur: 'uae', name: 'DMCC Free Zone', note: 'TX Network foundation + VARA application pathway for VA services' },
      { jur: 'ch', name: 'DLT framework', regulator: 'FINMA', note: 'Sologenic AG — Swiss subsidiary for tokenised securities pilots' },
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
    xrpl: true,
    licences: [
      { jur: 'uae', name: 'Open-source L1 protocol', note: 'Evernode Foundation — Xahau. No regulated operator entity; FATF VASP obligations apply at the service-provider layer, not the protocol.' },
    ],
    useCase: {
      en: "Decentralised dApp hosting on Xahau — an XRPL fork with native smart-contract Hooks. Each dApp runs as its own mini-blockchain on Xahau Mainnet, paid in EVR tokens. Open-source protocol with no central operator; registration and AML obligations sit at the dApp-operator layer, not at the protocol.",
      fr: "Hébergement dApp décentralisé sur Xahau — un fork XRPL avec des Hooks smart-contracts natifs. Chaque dApp tourne comme sa propre mini-blockchain sur Xahau Mainnet, réglée en tokens EVR. Protocole open-source sans opérateur central ; les obligations d'enregistrement et AML sont au niveau des opérateurs de dApp, pas du protocole.",
    },
    since: '2021',
  },
  {
    id: 'peersyst',
    company: 'Peersyst Technology',
    logo: '🌐',
    website: 'https://peersyst.com',
    tag: 'dapp',
    xrpl: true,
    licences: [
      { jur: 'eu', name: 'Software / engineering services (no licensable activity)', note: 'Andorra + Spain HQ. Peersyst builds infrastructure rather than operating a regulated VA service — no VASP / CASP licence required. Operator-side compliance sits with their clients (Ripple, banks, public-sector partners).' },
    ],
    useCase: {
      en: "Andorra/Spain-based engineering firm and one of the most active XRPL builders. Lead developer of the XRPL EVM Sidechain (with Ripple) and the public testnet at evm.xrpl.org. Builds Levitation tools for XRPL state queries + ZK proofs, contributes core code to xrpl.js, and partners with public-sector clients on tokenisation pilots (e.g. Andorran government projects).",
      fr: "Société d'ingénierie basée Andorre/Espagne, l'un des builders XRPL les plus actifs. Lead developer de la XRPL EVM Sidechain (avec Ripple) et du testnet public evm.xrpl.org. Construit les outils Levitation pour les state queries XRPL + ZK proofs, contribue au code de xrpl.js, et accompagne des clients du secteur public sur des pilotes de tokenisation (ex. projets du gouvernement andorran).",
    },
    since: '2017',
  },
  {
    id: 'towo-labs',
    company: 'Towo Labs',
    logo: '🛡️',
    website: 'https://towolabs.com',
    tag: 'dapp',
    xrpl: true,
    licences: [
      { jur: 'eu', name: 'Software / security services (no licensable activity)', note: 'Stockholm-based. Towo Labs sells security tooling and consulting, not custody — no VASP / CASP licence required at the company level. Their multi-sig and signing libraries are operated by clients (custodians, banks, exchanges) under their own regulated stacks.' },
    ],
    useCase: {
      en: "Swedish XRPL infrastructure firm focused on multi-signature security and on-ledger compliance tooling. Co-author of XLS-43 (Hardware-Wallet Signing Spec) and key contributor to XRPL.js. Their products + consulting underpin the multi-sig + SignerList implementations used by several institutional XRPL custodians and exchanges.",
      fr: "Firme suédoise d'infrastructure XRPL spécialisée dans la sécurité multi-signature et l'outillage de conformité on-ledger. Co-autrice du XLS-43 (Hardware-Wallet Signing Spec) et contributrice clé de XRPL.js. Leurs produits + conseil sous-tendent les implémentations multi-sig + SignerList utilisées par plusieurs custodians et exchanges institutionnels XRPL.",
    },
    since: '2018',
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
