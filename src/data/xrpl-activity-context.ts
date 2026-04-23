/**
 * Per-activity XRPL context. Each activity gets a locale-specific explanation
 * of WHY it is or isn't XRPL-compatible (core-ledger primitive available or not).
 *
 * Classification rationale (what counts as XRPL=true):
 *  - The activity has a directly relevant XRPL primitive on the core ledger
 *    (e.g., XLS-20 NFT, XLS-30 AMM, XLS-33 MPT, IOU/Trust Lines, Payment
 *    Channels, SignerList, Escrow).
 *  - Sidechain support (Root Network / Xahau / XRPL EVM sidechain) is NOT
 *    enough on its own — the primitive must be on mainnet core.
 *  - Ecosystem usage (e.g., Archax runs RWA on XRPL) is acknowledged but
 *    doesn't by itself make the activity 'XRPL-native'.
 *
 * XRPL=false activities fall into two buckets:
 *  - No native primitive AND no major ecosystem tooling (staking, lending,
 *    derivatives, asset_management — XRPL is not PoS, has no lending/perps
 *    contracts natively)
 *  - Covered at the token-issuance level but not as a discrete activity
 *    (token_utility/security/hybrid — IOU + MPT already cover issuance
 *    under 'stablecoin' and 'mpt' specifically)
 *
 * Debatable cases kept XRPL=false for now but with a nuanced tooltip:
 *  - exchange: XRPL has a native on-ledger DEX + AMM, but a centralised
 *    exchange as a product is not an XRPL primitive
 *  - rwa: Archax, Sologenic, Zoniqx use XRPL for RWA rails but RWA itself
 *    is primarily a legal-structure activity
 *  - gaming: Futureverse / Root Network are XRPL sidechains, not core
 */

import type { ActivityKey } from '@/types';

export interface XRPLActivityContext {
  /** One-line tooltip. Kept short enough to fit a native-ish tooltip. */
  en: string;
  fr: string;
}

export const XRPL_ACTIVITY_CONTEXT: Record<ActivityKey, XRPLActivityContext> = {
  // --- XRPL-native (xrpl: true) ---
  dapp_fin: {
    en: 'Native on XRPL — AMM (XLS-30) + on-ledger DEX + order book make DeFi primitives available directly on the core ledger.',
    fr: 'Natif XRPL — AMM (XLS-30) + DEX on-ledger + order book rendent les primitives DeFi disponibles directement sur le ledger.',
  },
  dapp_util: {
    en: 'Runs on XRPL via accounts + metadata. Full smart-contract support is on Xahau (Hooks) or the EVM sidechain.',
    fr: 'Fonctionne sur XRPL via comptes + métadonnées. Support smart-contract complet sur Xahau (Hooks) ou la sidechain EVM.',
  },
  nft: {
    en: 'Native on XRPL — XLS-20 is a first-class NFT primitive at the protocol level, with non-custodial broker mode.',
    fr: 'Natif XRPL — XLS-20 est une primitive NFT de premier ordre au niveau du protocole, avec mode broker non-custodial.',
  },
  mpt: {
    en: 'Native on XRPL — XLS-33 (Multi-Purpose Token) is a programmable-token primitive with on-chain compliance flags (lsfRequireAuth, lsfLocked).',
    fr: 'Natif XRPL — XLS-33 (Multi-Purpose Token) est une primitive de token programmable avec flags de compliance on-chain (lsfRequireAuth, lsfLocked).',
  },
  stablecoin: {
    en: 'Native on XRPL — the IOU / Trust Line model is the reference pattern for fiat-backed stablecoins (RLUSD, EURCV).',
    fr: 'Natif XRPL — le modèle IOU / Trust Line est le pattern de référence pour stablecoins adossés fiat (RLUSD, EURCV).',
  },
  custody: {
    en: 'Native on XRPL — SignerList, Regular Key, Escrow, Payment Channels give 10 distinct custody implementations with clear custodial/non-custodial classifications.',
    fr: 'Natif XRPL — SignerList, Regular Key, Escrow, Payment Channels offrent 10 implémentations custody distinctes avec classifications custodial/non-custodial claires.',
  },
  payment: {
    en: 'Native on XRPL — XRP + Payment Channels offer sub-second finality, ~$0.0002 per tx. XRPL\'s core use case since 2012.',
    fr: 'Natif XRPL — XRP + Payment Channels pour finalité sub-seconde, ~$0.0002 par tx. Use case core de XRPL depuis 2012.',
  },
  onramp_offramp: {
    en: 'Native pattern on XRPL — IOU / Trust Line fiat-tokenisation is used by GateHub, Uphold, Bitstamp for on/off-ramp settlement.',
    fr: 'Pattern natif XRPL — tokenisation fiat via IOU / Trust Line utilisée par GateHub, Uphold, Bitstamp pour le règlement on/off-ramp.',
  },
  cross_border_payment: {
    en: 'Native on XRPL — RippleNet / ODL is XRPL\'s flagship cross-border corridor solution (Singapore, UAE, UK, Ireland stacks all licensed).',
    fr: 'Natif XRPL — RippleNet / ODL est la solution phare de corridor transfrontalier XRPL (stacks Singapour, UAE, UK, Irlande toutes licenciées).',
  },

  // --- NOT XRPL-native (xrpl: false) ---
  exchange: {
    en: 'Not native: centralised exchange is not an XRPL primitive. XRPL does have an on-ledger DEX + AMM (XLS-30) — a front-end can leverage them.',
    fr: 'Pas natif : un exchange centralisé n\'est pas une primitive XRPL. XRPL dispose d\'une DEX on-ledger + AMM (XLS-30) — un front-end peut s\'y brancher.',
  },
  rwa: {
    en: 'Not a native primitive, but ecosystem tooling exists: Archax, Sologenic, Zoniqx use XRPL for RWA settlement rails. The legal structure (fund, securities) is the dominant compliance work.',
    fr: 'Pas de primitive native, mais écosystème : Archax, Sologenic, Zoniqx utilisent XRPL pour le règlement RWA. La structure juridique (fonds, titres) domine le travail de compliance.',
  },
  gaming: {
    en: 'Not on core XRPL: gaming/metaverse usually run on sidechains (Root Network by Futureverse, XRPL EVM sidechain). NFTs can use XLS-20 but gaming itself isn\'t a core primitive.',
    fr: 'Pas sur XRPL core : gaming/metaverse tournent sur sidechains (Root Network de Futureverse, sidechain EVM XRPL). Les NFTs peuvent utiliser XLS-20 mais gaming n\'est pas une primitive core.',
  },
  token_utility: {
    en: 'Token issuance itself isn\'t a specific XRPL primitive — IOU / MPT (covered under stablecoin + mpt) already provide issuance mechanics. Classification logic is chain-agnostic.',
    fr: 'L\'émission de token en soi n\'est pas une primitive XRPL spécifique — IOU / MPT (sous stablecoin + mpt) fournissent déjà les mécaniques. La logique de classification est agnostique à la chaîne.',
  },
  token_security: {
    en: 'Security-token regime is driven by securities law (SEC, MiFID, Prospectus Reg), not by the underlying chain. XRPL supports issuance via IOU / MPT but the legal wrapper is chain-agnostic.',
    fr: 'Le régime security token est piloté par le droit des titres (SEC, MiFID, Règlement Prospectus), pas par la chaîne. XRPL supporte l\'émission via IOU / MPT mais le wrapper juridique est agnostique.',
  },
  token_hybrid: {
    en: 'Hybrid token analysis is a legal-classification exercise (primary vs secondary function) — chain-agnostic. XRPL issuance works via IOU / MPT but the hybrid qualification is where the compliance work lives.',
    fr: 'L\'analyse hybride est un exercice de classification juridique (fonction dominante) — agnostique à la chaîne. L\'émission XRPL via IOU / MPT marche, mais la qualification hybride est où se fait le travail compliance.',
  },
  staking: {
    en: 'Not applicable: XRPL is not a Proof-of-Stake network, so no native staking primitive. Validators run at the consensus layer but there\'s no delegated-staking-as-a-service pattern.',
    fr: 'Pas applicable : XRPL n\'est pas un réseau PoS, pas de primitive staking native. Les validateurs opèrent au niveau consensus mais pas de pattern delegated-staking-as-a-service.',
  },
  lending: {
    en: 'Not a native primitive on XRPL core. Lending protocols live on EVM sidechain or as custom dApps with the usual DeFi-lending compliance issues.',
    fr: 'Pas de primitive native sur XRPL core. Les protocoles de lending tournent sur la sidechain EVM ou comme dApps custom avec les problèmes compliance DeFi-lending habituels.',
  },
  asset_management: {
    en: 'Off-protocol activity: asset management is a legal/operational service (AIFMD, MiFID portfolio mgmt, IAA). Chain choice is incidental to the regulatory posture.',
    fr: 'Activité hors-protocole : la gestion d\'actifs est un service juridique/opérationnel (AIFMD, MiFID gestion de portefeuille, IAA). Le choix de chaîne est secondaire à la posture réglementaire.',
  },
  derivatives: {
    en: 'Not on XRPL core: derivatives (perps, futures, options) have no native primitive. Requires separate venue — CFTC/MiFID derivatives rules apply regardless of underlying chain.',
    fr: 'Pas sur XRPL core : pas de primitive native pour dérivés (perps, futures, options). Nécessite un venue séparé — les règles CFTC/MiFID dérivés s\'appliquent quelle que soit la chaîne.',
  },
  launchpad: {
    en: 'Not a native XRPL primitive: launchpads are service-layer infrastructure (CoinList, Copper Launch) — the underlying chain is incidental.',
    fr: 'Pas de primitive XRPL native : les launchpads sont une infrastructure de service (CoinList, Copper Launch) — la chaîne sous-jacente est secondaire.',
  },
};
