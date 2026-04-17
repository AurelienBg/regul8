export type Risk = 'high' | 'med' | 'low'

export type Jurisdiction = 'eu' | 'us' | 'uae' | 'sg' | 'uk' | 'hk' | 'ch' | 'li' | 'jp' | 'kr' | 'in' | 'br'

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
  | 'token_utility'
  | 'token_security'
  | 'token_hybrid'

export interface RegResult {
  regime: string
  risk: Risk
  licenses: string[]
  obligations: string[]
  time: string
  cost: string
  alts: string[]
  authority: string
  xrplNote?: string
  custodyNote?: string
}

export type RegData = Record<ActivityKey, Partial<Record<Jurisdiction, RegResult>>>

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

export interface CaseStudy {
  id: string
  icon: string
  title: string
  subtitle: string
  date: string
  jurisdictions: Jurisdiction[]
  keyTakeaway: string
  timeline?: { date: string; event: string }[]
  sections: { heading: string; paragraphs: string[] }[]
  whyItMatters: string[]
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

export const JURISDICTIONS: Record<Jurisdiction, { name: string; flag: string }> = {
  eu: { name: 'EU / France', flag: '🇪🇺' },
  us: { name: 'USA', flag: '🇺🇸' },
  uae: { name: 'UAE / Dubai', flag: '🇦🇪' },
  sg: { name: 'Singapore', flag: '🇸🇬' },
  uk: { name: 'United Kingdom', flag: '🇬🇧' },
  hk: { name: 'Hong Kong', flag: '🇭🇰' },
  ch: { name: 'Switzerland', flag: '🇨🇭' },
  li: { name: 'Liechtenstein', flag: '🇱🇮' },
  jp: { name: 'Japan', flag: '🇯🇵' },
  kr: { name: 'South Korea', flag: '🇰🇷' },
  in: { name: 'India', flag: '🇮🇳' },
  br: { name: 'Brazil', flag: '🇧🇷' },
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
  token_utility: { xrpl: false },
  token_security: { xrpl: false },
  token_hybrid: { xrpl: false },
}
