export type Risk = 'high' | 'med' | 'low'

export type Jurisdiction =
  | 'eu' | 'us' | 'ca'
  | 'uae' | 'sg' | 'uk' | 'hk' | 'au'
  | 'ch' | 'li' | 'lu' | 'mt' | 'lt'
  | 'jp' | 'kr' | 'in' | 'br'
  | 'ky' | 'vg' | 'bm'
  | 'ng' | 'ke' | 'za'

/** Visual tier for the /report + /compare UI. "emerging" = evolving framework, less data depth. */
export type JurisdictionTier = 'established' | 'emerging'

export type ActivityKey =
  | 'exchange'
  | 'dapp_fin'
  | 'dapp_util'
  | 'nft'
  | 'mpt'
  | 'rwa'
  | 'stablecoin'
  | 'gaming'
  | 'custody'
  | 'payment'
  | 'onramp_offramp'
  | 'cross_border_payment'
  | 'token_utility'
  | 'token_security'
  | 'token_hybrid'
  | 'staking'
  | 'lending'
  | 'asset_management'
  | 'derivatives'
  | 'launchpad'

export type RegimeItemType = 'law' | 'licence-framework' | 'ruling' | 'guidance' | 'other'

export interface RegimeItem {
  name: string
  type: RegimeItemType
  /** Optional short parenthetical (e.g., "EU 2023/1114") — kept out of the name for cleaner badge display. */
  note?: string
}

export interface RegResult {
  regime: string
  /** Optional structured breakdown of the regime string. If omitted, UI parses `regime` at runtime. */
  regimeItems?: RegimeItem[]
  risk: Risk
  licenses: string[]
  obligations: string[]
  time: string
  cost: string
  alts: string[]
  authority: string
  xrplNote?: string
  custodyNote?: string
  /** How often you must report to regulators (monthly / quarterly / annually + specific filings). */
  reportingFrequency?: string
  /** Marketing / advertising restrictions. What you can / cannot communicate to users. */
  marketingRules?: string
  /** Customer eligibility — who you can serve (geo-fencing, residency, sanctions lists). */
  clientEligibility?: string
}

/**
 * Partial on the outer record too — we may add an ActivityKey before its
 * regulation data is backfilled across all jurisdictions. `lookupRegulation`
 * and friends already return null for missing entries.
 */
export type RegData = Partial<Record<ActivityKey, Partial<Record<Jurisdiction, RegResult>>>>

export interface WizardAnswers {
  activity: ActivityKey
  subtype?: string
  jurisdiction: Jurisdiction
  stage?: string
  model?: 'b2c' | 'b2b' | 'both'
  chain?: string
}

export interface GlossaryTerm {
  term: string
  definition: string
  definitionFr?: string
  relatedTerms?: string[]
  xrplSpecific?: boolean
  category?: 'eu' | 'us' | 'intl' | 'general' | 'xrpl'
}

export type DecisionVerdict = 'yes' | 'no' | 'maybe'

export interface DecisionQuestion {
  type: 'question'
  question: string
  hint?: string
  choices: { label: string; next: string }[]
}

export interface DecisionOutcome {
  type: 'outcome'
  verdict: DecisionVerdict
  title: string
  explanation: string
  nextSteps?: string[]
  relatedTerms?: string[]
}

export type DecisionNode = DecisionQuestion | DecisionOutcome

export interface DecisionTree {
  id: string
  title: string
  description: string
  icon: string
  rootId: string
  nodes: Record<string, DecisionNode>
}

export type PathBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'callout'; tone: 'info' | 'warn' | 'key'; title?: string; text: string }
  | { kind: 'table'; headers: string[]; rows: string[][] }

export interface PathSection {
  id: string
  heading: string
  content: PathBlock[]
}

export interface LearningPath {
  id: string
  icon: string
  title: string
  subtitle: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  jurisdictions?: Jurisdiction[]
  sections: PathSection[]
  relatedTerms: string[]
  relatedTrees?: string[]
}

export interface XRPLCustodyMethod {
  id: string
  name: string
  mechanism: string
  custodial: 'yes' | 'no' | 'grey'
  euLicence: string
  technicalDetails: string[]
  useCase: string
  xrplObjects?: string[]
}

export const JURISDICTIONS: Record<Jurisdiction, { name: string; flag: string; tier?: JurisdictionTier }> = {
  // North America
  eu: { name: 'EU / France', flag: '🇪🇺' },
  us: { name: 'USA', flag: '🇺🇸' },
  ca: { name: 'Canada', flag: '🇨🇦', tier: 'emerging' },
  // Gulf / APAC
  uae: { name: 'UAE / Dubai', flag: '🇦🇪' },
  sg: { name: 'Singapore', flag: '🇸🇬' },
  uk: { name: 'United Kingdom', flag: '🇬🇧' },
  hk: { name: 'Hong Kong', flag: '🇭🇰' },
  au: { name: 'Australia', flag: '🇦🇺', tier: 'emerging' },
  // EU crypto hubs
  ch: { name: 'Switzerland', flag: '🇨🇭' },
  li: { name: 'Liechtenstein', flag: '🇱🇮' },
  lu: { name: 'Luxembourg', flag: '🇱🇺', tier: 'emerging' },
  mt: { name: 'Malta', flag: '🇲🇹', tier: 'emerging' },
  lt: { name: 'Lithuania', flag: '🇱🇹', tier: 'emerging' },
  // Asia / LatAm
  jp: { name: 'Japan', flag: '🇯🇵' },
  kr: { name: 'South Korea', flag: '🇰🇷' },
  in: { name: 'India', flag: '🇮🇳' },
  br: { name: 'Brazil', flag: '🇧🇷' },
  // Offshore financial centers
  ky: { name: 'Cayman Islands', flag: '🇰🇾', tier: 'emerging' },
  vg: { name: 'BVI', flag: '🇻🇬', tier: 'emerging' },
  bm: { name: 'Bermuda', flag: '🇧🇲', tier: 'emerging' },
  // African emerging markets
  ng: { name: 'Nigeria', flag: '🇳🇬', tier: 'emerging' },
  ke: { name: 'Kenya', flag: '🇰🇪', tier: 'emerging' },
  za: { name: 'South Africa', flag: '🇿🇦', tier: 'emerging' },
}

export const ACTIVITIES: Record<ActivityKey, { xrpl: boolean }> = {
  exchange: { xrpl: false },
  dapp_fin: { xrpl: true },
  dapp_util: { xrpl: true },
  nft: { xrpl: true },
  mpt: { xrpl: true },
  rwa: { xrpl: false },
  stablecoin: { xrpl: true },
  gaming: { xrpl: false },
  custody: { xrpl: true },
  payment: { xrpl: true },
  onramp_offramp: { xrpl: true },
  cross_border_payment: { xrpl: true },
  token_utility: { xrpl: false },
  token_security: { xrpl: false },
  token_hybrid: { xrpl: false },
  // Newly added — Oct 2026 — covers ~20% additional real-world startups
  staking: { xrpl: false },
  lending: { xrpl: false },
  asset_management: { xrpl: false },
  derivatives: { xrpl: false },
  launchpad: { xrpl: false },
}
