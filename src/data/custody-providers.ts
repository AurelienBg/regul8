import type { Jurisdiction } from '@/types';

/**
 * Institutional custody providers with XRPL support.
 *
 * Source of truth shared by:
 *   · /learn/xrpl/custody — full provider cards under the Custody Matrix
 *   · /report             — filtered "Custody Partners" section that
 *                            shows only providers serving the report's
 *                            selected jurisdictions
 *
 * Each entry pairs a free-form description with a structured list of
 * `Jurisdiction` codes so we can filter by report selection rather than
 * relying on flag-emoji heuristics.
 *
 * Last audit: April 2026.
 */
export interface CustodyProvider {
  /** Stable id — also used as anchor target on /learn/xrpl/custody */
  id: string;
  name: string;
  logo: string;
  website: string;
  focusEn: string;
  focusFr: string;
  /** Jurisdictions the provider operates from / has licences in. Used
   *  for filtering by report selection. EU passporting is handled by
   *  the matching helper below — most providers with `eu` here will
   *  match any specific EU Member-State juri the report covers. */
  jurisdictions: Jurisdiction[];
  xrplEn: string;
  xrplFr: string;
}

export const CUSTODY_PROVIDERS: CustodyProvider[] = [
  {
    id: 'ripple-custody',
    name: 'Ripple Custody',
    logo: '🔐',
    website: 'https://ripple.com/solutions/custody/',
    focusEn: 'Metaco (Swiss bank-grade tech) + Palisade (France-licensed MPC WaaS)',
    focusFr: 'Metaco (techno niveau bancaire Suisse) + Palisade (WaaS MPC licencié France)',
    jurisdictions: ['ch', 'eu', 'fr'],
    xrplEn: 'XRPL-native — deepest integration (signer lists, Regular Key, trust lines)',
    xrplFr: 'Natif XRPL — intégration la plus profonde (signer lists, Regular Key, trust lines)',
  },
  {
    id: 'fireblocks',
    name: 'Fireblocks',
    logo: '🧱',
    website: 'https://www.fireblocks.com',
    focusEn: 'MPC custody for exchanges, banks, fintechs. ~2 000 institutional clients.',
    focusFr: 'Custody MPC pour exchanges, banques, fintechs. ~2 000 clients institutionnels.',
    jurisdictions: ['il', 'us', 'eu'],
    xrplEn: 'XRPL supported since 2021, XRP + issued tokens + trust lines.',
    xrplFr: 'XRPL supporté depuis 2021, XRP + tokens émis + trust lines.',
  },
  {
    id: 'anchorage-digital',
    name: 'Anchorage Digital',
    logo: '⚓',
    website: 'https://www.anchorage.com',
    focusEn: 'Federally chartered crypto bank (OCC National Trust, 2021). HSM + cold storage.',
    focusFr: 'Banque crypto à charte fédérale (OCC National Trust, 2021). HSM + cold storage.',
    jurisdictions: ['us'],
    xrplEn: 'XRP supported for qualified custody + staking workflows (where applicable).',
    xrplFr: 'XRP supporté en qualified custody + workflows staking (selon le cas).',
  },
  {
    id: 'bitgo',
    name: 'BitGo',
    logo: '🛡️',
    website: 'https://www.bitgo.com',
    focusEn: 'Multi-sig + MPC custody. SD state trust (South Dakota) + NY trust. Settlement provider.',
    focusFr: 'Custody multi-sig + MPC. Trust SD (South Dakota) + NY trust. Provider de règlement.',
    jurisdictions: ['us', 'eu'],
    xrplEn: 'XRP supported in multi-sig cold wallet + institutional qualified custody.',
    xrplFr: 'XRP supporté en cold wallet multi-sig + qualified custody institutionnelle.',
  },
  {
    id: 'taurus',
    name: 'Taurus',
    logo: '♉',
    website: 'https://www.taurushq.com',
    focusEn: 'Swiss bank-grade custody (FINMA DLT framework). Used by Deutsche Bank, State Street.',
    focusFr: 'Custody niveau bancaire suisse (cadre DLT FINMA). Utilisée par Deutsche Bank, State Street.',
    jurisdictions: ['ch', 'eu'],
    xrplEn: 'XRPL supported for tokenised assets + RWAs via T-PROTECT platform.',
    xrplFr: 'XRPL supporté pour actifs tokenisés + RWAs via la plateforme T-PROTECT.',
  },
  {
    id: 'copper',
    name: 'Copper',
    logo: '🟠',
    website: 'https://copper.co',
    focusEn: 'MPC custody for hedge funds + institutions. ClearLoop settlement network.',
    focusFr: 'Custody MPC pour hedge funds + institutions. Réseau de règlement ClearLoop.',
    jurisdictions: ['uk', 'ch'],
    xrplEn: 'XRP supported in institutional custody and ClearLoop settlement rails.',
    xrplFr: 'XRP supporté en custody institutionnelle et rails de règlement ClearLoop.',
  },
  {
    id: 'gatehub',
    name: 'GateHub',
    logo: '🚪',
    website: 'https://gatehub.net',
    focusEn: 'XRPL-native retail/SME wallet and custody since 2014. Slovenia VASP.',
    focusFr: 'Wallet + custody XRPL-native retail/SME depuis 2014. VASP Slovénie.',
    jurisdictions: ['eu'],
    xrplEn: 'Reference implementation of the XRPL IOU / Trust Line stablecoin model.',
    xrplFr: "Implémentation de référence du modèle stablecoin XRPL IOU / Trust Line.",
  },
  {
    id: 'dfns',
    name: 'Dfns',
    logo: '🔑',
    website: 'https://www.dfns.co',
    focusEn: 'Developer-first wallet-as-a-service, MPC-TSS key management via API.',
    focusFr: 'Wallet-as-a-service dev-first, gestion de clés MPC-TSS par API.',
    jurisdictions: ['eu', 'fr', 'us'],
    xrplEn: 'XRPL supported as one of 30+ chains. SOC2 Type II + France registered.',
    xrplFr: 'XRPL supporté parmi 30+ chaînes. SOC2 Type II + enregistré en France.',
  },
];

/** EU Member-State juri codes we track separately. A provider that lists
 *  `eu` is presumed to serve any of these (passporting). When the user's
 *  report includes one of these, we also surface `eu`-listed providers. */
const EU_MEMBER_CODES: Jurisdiction[] = ['eu', 'fr', 'lu', 'mt', 'lt', 'ie'];

/** Returns true iff the provider serves at least one of the report's juri.
 *  Implements the EU passporting heuristic so a `fr` report still surfaces
 *  EU-wide providers like GateHub or Fireblocks. */
export function providerMatchesJurisdictions(
  provider: CustodyProvider,
  reportJurisdictions: Jurisdiction[],
): boolean {
  if (reportJurisdictions.length === 0) return true;
  for (const r of reportJurisdictions) {
    if (provider.jurisdictions.includes(r)) return true;
    if (
      EU_MEMBER_CODES.includes(r) &&
      provider.jurisdictions.some((j) => EU_MEMBER_CODES.includes(j))
    ) {
      return true;
    }
  }
  return false;
}
