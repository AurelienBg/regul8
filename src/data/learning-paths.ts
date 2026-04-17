import type { LearningPath } from '@/types'

// -----------------------------------------------------------------------------
// Path 1 — MiCA Essentials
// -----------------------------------------------------------------------------
const MICA: LearningPath = {
  id: 'mica-essentials',
  icon: '🇪🇺',
  title: 'MiCA Essentials',
  subtitle: 'Understand the three token categories, the CASP regime, and what MiCA does — and does not — regulate.',
  duration: '8 min read',
  level: 'beginner',
  jurisdictions: ['eu'],
  sections: [
    {
      id: 'what-is-mica',
      heading: 'What MiCA is and why it matters',
      content: [
        { kind: 'p', text: 'MiCA — the Markets in Crypto-Assets Regulation — is the European Union\'s comprehensive rulebook for crypto. It entered into force in June 2023 and its main provisions apply since December 2024. It replaces a patchwork of national regimes with a single EU-wide framework that any crypto business touching EU users must understand.' },
        { kind: 'p', text: 'Unlike US-style enforcement-led regulation, MiCA is a prescriptive regime: it tells issuers what their tokens can and cannot be, and it tells service providers which activities require authorization. Clarity comes at the cost of scope — MiCA captures more crypto activity than almost any other regime globally.' },
        { kind: 'callout', tone: 'key', title: 'Why it matters for your startup', text: 'If your business serves or targets EU users, MiCA likely applies. A single CASP licence passports across all 27 member states — but without one, your EU-facing activity is unauthorized. Jurisdiction arbitrage is still possible, but it requires active geofencing.' },
      ],
    },
    {
      id: 'three-categories',
      heading: 'The three token categories',
      content: [
        { kind: 'p', text: 'MiCA defines three mutually exclusive categories for any token in scope. Picking the right one is the first design decision for any issuer.' },
        { kind: 'h3', text: 'E-Money Token (EMT)' },
        { kind: 'p', text: 'An EMT stabilizes its value by reference to a single official currency — USD, EUR, GBP, etc. RLUSD, USDC, and EURt are EMTs. The issuer must be an authorized Electronic Money Institution (EMI) or a credit institution. Reserves must be 1:1, in highly liquid low-risk assets, fully segregated from the issuer\'s balance sheet.' },
        { kind: 'h3', text: 'Asset-Referenced Token (ART)' },
        { kind: 'p', text: 'An ART references multiple currencies, commodities, or other values. Multi-currency stablecoins, commodity-backed tokens, or tokens referencing baskets all fall here. The issuer needs NCA authorization (Autorité nationale compétente — AMF in France, BaFin in Germany), and the whitepaper must be approved, not just notified.' },
        { kind: 'h3', text: 'Other crypto-asset' },
        { kind: 'p', text: 'Everything in scope that isn\'t EMT or ART lands here — Bitcoin, Ether, XRP, most utility tokens, most governance tokens. The regime is the lightest: whitepaper publication + NCA notification if the offering exceeds €1M in a 12-month rolling window. No prior approval, no capital reserves.' },
        { kind: 'callout', tone: 'warn', title: 'Hybrid tokens are not a category', text: 'If your token combines features — pays yield AND grants governance AND references an asset — MiCA does not recognize a hybrid category. You must fit one of the three. Regulators will typically apply the strictest classification available.' },
      ],
    },
    {
      id: 'casp-regime',
      heading: 'CASP — the service provider regime',
      content: [
        { kind: 'p', text: 'Separate from the token categories, MiCA regulates who can provide crypto-asset services to EU users. These providers need a CASP (Crypto-Asset Service Provider) authorization. The ten regulated services span the entire crypto value chain.' },
        {
          kind: 'table',
          headers: ['Service', 'MiCA article', 'Capital (€)'],
          rows: [
            ['Custody & administration', 'Art. 75', '350K'],
            ['Exchange of crypto for fiat or crypto for crypto', 'Art. 76-78', '125K'],
            ['Operating a trading platform', 'Art. 76', '150K'],
            ['Placement of crypto-assets', 'Art. 79', '50K'],
            ['Reception & transmission of orders', 'Art. 80', '50K'],
            ['Execution of orders', 'Art. 81', '125K'],
            ['Transfer services', 'Art. 82', '50K'],
            ['Portfolio management', 'Art. 83', '50K'],
            ['Advice', 'Art. 83', '50K'],
            ['Crypto-asset on behalf of clients', 'Art. 84', '50K'],
          ],
        },
        { kind: 'p', text: 'A CASP may offer multiple services; the applicable capital is the higher of the individual capital requirements. Beyond capital, obligations include: fit-and-proper directors, organizational resilience, conflicts-of-interest management, safekeeping rules, market abuse monitoring, complaints handling, and annual audited accounts.' },
        { kind: 'callout', tone: 'info', title: 'MiCA passport', text: 'A CASP licensed in any EU member state can passport into all 27 states with a simple notification. Lithuania, Malta, and Ireland have historically been the fastest authorization jurisdictions; France and Germany carry the most institutional credibility. Pick your hub on speed, reputation, or tax.' },
      ],
    },
    {
      id: 'what-mica-excludes',
      heading: 'What MiCA does NOT cover',
      content: [
        { kind: 'p', text: 'Knowing what\'s out of scope is as important as knowing what\'s in. MiCA explicitly excludes:' },
        { kind: 'ul', items: [
          'Unique non-fungible tokens (genuinely 1-of-1 — if you mint a fungible series of 10,000 "NFTs", they may qualify as ART or crypto-assets)',
          'Central Bank Digital Currencies (CBDCs)',
          'Fully decentralized services with no identifiable operator (MiCA Recital 22) — the bar is high',
          'Transferable securities and other financial instruments already under MiFID II',
          'Deposits and funds already under PSD2 / e-money directive (subject to interaction with EMT rules)',
        ] },
        { kind: 'p', text: 'The DeFi exemption is the most contested: MiCA intentionally leaves space for truly permissionless protocols, but most "DeFi" deployments have some operator — admin keys, upgradable contracts, fee collectors, KYC-gated front-ends. These operators are captured by CASP rules. Protocol-only, front-end-only separation is a common mitigation but requires careful structuring.' },
      ],
    },
    {
      id: 'preparing',
      heading: 'How to prepare',
      content: [
        { kind: 'p', text: 'A MiCA-ready startup needs four things before applying:' },
        { kind: 'ol', items: [
          'A clear token classification (EMT / ART / Other) backed by a reasoned memorandum',
          'A service mapping — which MiCA services do you provide, which articles apply, and what\'s the highest capital requirement?',
          'A governance team that passes fit-and-proper — two EU-resident directors, a compliance officer with AML experience, documented policies',
          'A draft whitepaper (or authorization dossier for EMT/ART) with disclosures, risk factors, technical architecture, environmental impact',
        ] },
        { kind: 'p', text: 'Realistic timelines: 6-12 months for Other crypto-assets (whitepaper track), 9-15 months for CASP authorization (varies by NCA), 12-18 months for EMT or ART issuance. Plan for €50-500K in legal and setup fees depending on scope. Liechtenstein TVTG remains a faster alternative (3-9 months) with EEA passporting as a workaround.' },
        { kind: 'callout', tone: 'key', title: 'Next step', text: 'Run the "Do I need a CASP licence?" decision tree to get a concrete verdict on your specific service.' },
      ],
    },
  ],
  relatedTerms: ['MiCA', 'CASP', 'EMT', 'ART', 'AMF', 'ESMA', 'Utility Token', 'DeFi'],
  relatedTrees: ['casp'],
  relatedCases: ['rlusd-stablecoin'],
}

// -----------------------------------------------------------------------------
// Path 2 — XRPL Custody Deep-Dive
// -----------------------------------------------------------------------------
const XRPL_CUSTODY: LearningPath = {
  id: 'xrpl-custody',
  icon: '🔐',
  title: 'XRPL Custody Deep-Dive',
  subtitle: 'The ten custody methods on XRPL, what regulators call each one, and how to design an architecture that survives review.',
  duration: '10 min read',
  level: 'intermediate',
  jurisdictions: ['eu', 'us', 'uae'],
  sections: [
    {
      id: 'why-custody-matters',
      heading: 'Why custody is the regulatory crux',
      content: [
        { kind: 'p', text: 'Of all the services in crypto, custody is where regulators apply the heaviest hand. The reason is simple: custody is the entry point for client fund loss, fraud, and AML abuse. A failed exchange can be ring-fenced; a failed custodian takes clients\' assets with it.' },
        { kind: 'p', text: 'Under MiCA, custody (Art. 75) requires the highest capital requirement of all CASP services (€350K) plus strict safekeeping, segregation, and insurance obligations. Under FinCEN, custody triggers MSB registration and often state money-transmitter licences. Under Hong Kong\'s SFC VASP regime, custody must be >98% cold storage.' },
        { kind: 'p', text: 'The question of whether your service is "custodial" therefore determines whether you need a heavy licence or a light one — or none at all. XRPL gives you unusual flexibility: the protocol supports multiple custody patterns natively, and the classification of each pattern differs.' },
      ],
    },
    {
      id: 'custodial-vs-not',
      heading: 'The key distinction',
      content: [
        { kind: 'h3', text: 'Custodial' },
        { kind: 'p', text: 'A third party holds the keys that sign transactions on the user\'s behalf. The user trusts the third party. If that party disappears, so do the assets. All centralized exchange hot wallets are custodial. Gateway-issued IOUs are custodial.' },
        { kind: 'h3', text: 'Non-custodial' },
        { kind: 'p', text: 'The user controls their own keys. No third party can move the funds without the user\'s signature. Hardware wallets are non-custodial. Escrows locked to time or cryptographic conditions are non-custodial — even a smart-contract-less ledger like XRPL enforces release at the protocol level.' },
        { kind: 'h3', text: 'Grey zone' },
        { kind: 'p', text: 'Where signing authority is split or shared — multi-sig, MPC, regular-key-plus-master-key setups — regulators have not issued clear guidance. The classification typically hinges on: can any single party act alone? If yes, that party is the custodian. If no, the setup leans non-custodial.' },
        { kind: 'callout', tone: 'warn', title: 'Grey zone ≠ unregulated', text: 'Grey zone means regulators have not said definitively. It does not mean you escape scrutiny. ESMA, FCA, BaFin and NYDFS are all expected to issue guidance over 2026-2027. Assume your grey-zone classification can tighten.' },
      ],
    },
    {
      id: 'the-ten-methods',
      heading: 'The 10 XRPL methods',
      content: [
        { kind: 'p', text: 'XRPL offers ten distinct ways to structure who can sign. Three are clearly custodial, four are clearly non-custodial, three live in the grey zone.' },
        { kind: 'h3', text: 'Clearly custodial' },
        { kind: 'ul', items: [
          'Single Key — service holds the master key of the user\'s XRPL account. Full control. This is the default model for centralized exchanges.',
          'IOU / Trust Lines (gateway model) — service issues tokens backed by off-chain reserves, users hold claims. RLUSD follows this pattern. Triggers both custody AND issuer rules.',
        ] },
        { kind: 'h3', text: 'Clearly non-custodial' },
        { kind: 'ul', items: [
          'Escrow — XRP locked by time or cryptographic condition. Ledger enforces release. No third party needed.',
          'Payment Channels — depositor locks XRP on-chain, receiver collects off-chain signed claims. Channel close is protocol-enforced.',
          'Checks — on-ledger "cheque" where the sender\'s account is debited only when the receiver cashes.',
          'NFT Broker mode (XLS-20) — atomic swap of buy and sell offers. Broker never touches the NFT.',
          'SignerList minority — multi-sig where service holds fewer keys than quorum requires. Cannot act alone.',
        ] },
        { kind: 'h3', text: 'Grey zone' },
        { kind: 'ul', items: [
          'Regular Key — secondary key assigned via SetRegularKey. If master stays active with the user, classification depends on use; if master is disabled, service is custodial.',
          'SignerList majority — multi-sig where service holds enough weight to reach quorum alone. Usually custodial; some argue otherwise if operational policies require user co-signing.',
          'MPC / TSS — threshold signatures implemented at application layer. Key never exists in full. Strong technical non-custodial argument; ESMA and FCA have not ruled.',
          'MPT (XLS-33) — programmable tokens. The issuer can lock (lsfLocked) or require authorization (lsfRequireAuth). Depending on use, can be treated like IOU (custodial) or like Other crypto-asset.',
        ] },
      ],
    },
    {
      id: 'design-for-compliance',
      heading: 'Designing your architecture for compliance',
      content: [
        { kind: 'p', text: 'A defensive architecture starts from the regulatory outcome you want and works backward to the XRPL primitives. Three common target profiles:' },
        { kind: 'h3', text: '1. Institutional custody — you WANT to be custodial' },
        { kind: 'p', text: 'Embrace the Art. 75 CASP / MSB obligations and structure for institutional credibility. Use MPC or SignerList majority with formal multi-party signing workflows. Cold storage >98% for retail jurisdictions. Segregate client accounts at the XRPL account level (one account per client, not pooled wallets). The path is expensive but credible.' },
        { kind: 'h3', text: '2. Self-custody infrastructure — you do NOT want to hold keys' },
        { kind: 'p', text: 'Deliver software or services that help users custody their own XRPL assets. Use SignerList minority (service is 1-of-3, user holds 2). Combine with Regular Key where the user always retains the master. The user is the sole party that can reach quorum. You escape CASP but become a software provider.' },
        { kind: 'h3', text: '3. Payment rails — protocol primitives' },
        { kind: 'p', text: 'For payment, streaming, or escrow-like use cases, rely on Escrow, Payment Channels, and Checks. These are protocol-enforced and sidestep custody entirely. Your CASP exposure shifts to "transfer services" (Art. 82, €50K capital) which is lighter than custody.' },
      ],
    },
    {
      id: 'rlusd-case',
      heading: 'Case study: RLUSD and the IOU gateway',
      content: [
        { kind: 'p', text: 'Ripple\'s RLUSD stablecoin is the reference implementation of a compliant IOU gateway on XRPL. Standard Custody & Trust Company (NYDFS-chartered) issues RLUSD through an XRPL trust line. Users hold RLUSD balances as on-chain claims against the trust.' },
        { kind: 'p', text: 'Key design choices:' },
        { kind: 'ul', items: [
          'RequireAuth flag on the issuer account — holders must be explicitly authorized by the issuer. On-chain KYC gating.',
          'freeze flag — the trust can freeze individual trust lines for AML holds.',
          'globalFreeze flag — emergency brake freezing all trust lines.',
          '1:1 backing in cash deposits + short-term US Treasuries, segregated from Ripple\'s own funds.',
          'Separate mints on XRPL and Ethereum — no bridge, each chain is an independent issuance.',
        ] },
        { kind: 'p', text: 'The model shows that "custodial" doesn\'t mean "old-school centralized". A well-designed IOU gateway gives you the legal clarity of a traditional bank custody with on-chain compliance primitives that ERC-20 stablecoins have to retrofit through admin functions.' },
        { kind: 'callout', tone: 'key', title: 'Your next step', text: 'Use the "Is my XRPL custody custodial?" decision tree to route your own architecture through the 10 methods and get a verdict.' },
      ],
    },
  ],
  relatedTerms: ['Custody', 'CASP', 'SignerList', 'MPC', 'TSS', 'Trust Line', 'IOU', 'Escrow', 'Payment Channel', 'RLUSD'],
  relatedTrees: ['xrpl-custody', 'casp'],
  relatedCases: ['rlusd-stablecoin'],
}

// -----------------------------------------------------------------------------
// Path 3 — Howey Test Explained
// -----------------------------------------------------------------------------
const HOWEY: LearningPath = {
  id: 'howey-test',
  icon: '⚖️',
  title: 'Howey Test Explained',
  subtitle: 'The 1946 US Supreme Court test that defines a security — and why it still decides which crypto tokens the SEC pursues.',
  duration: '6 min read',
  level: 'beginner',
  jurisdictions: ['us'],
  sections: [
    {
      id: 'origin',
      heading: 'Where the test comes from',
      content: [
        { kind: 'p', text: 'The Howey Test was established in the 1946 US Supreme Court case SEC v. W.J. Howey Co. A Florida company sold parcels of an orange grove to investors, along with a service contract under which Howey would cultivate, harvest, and market the oranges. Investors expected a return from Howey\'s labour. The Court ruled these arrangements were "investment contracts" — and therefore securities — even though no stock, bond, or traditional financial instrument was involved.' },
        { kind: 'p', text: 'The key insight: the economic substance of a transaction determines whether it is a security, not the form or label. A token, a NFT, a yield farm position, or a utility point can all be investment contracts if the substance fits.' },
      ],
    },
    {
      id: 'four-prongs',
      heading: 'The four prongs',
      content: [
        { kind: 'p', text: 'The Howey Court distilled its holding into a four-part test. All four must be satisfied for the arrangement to be a security.' },
        { kind: 'ol', items: [
          'Investment of money — some form of economic consideration is contributed (money, crypto, services, anything of value).',
          'In a common enterprise — investor fortunes are tied together, or tied to the promoter\'s efforts.',
          'With an expectation of profit — buyers expect capital appreciation, yield, or other return.',
          'From the efforts of others — those efforts must be primarily from a third party (promoter, developer, team), not the investor themselves.',
        ] },
        { kind: 'callout', tone: 'info', title: 'All four, or none', text: 'If ANY single prong fails, the arrangement is not a security under Howey. Most crypto analyses turn on prong 4: are profits driven by a central team, or by a sufficiently decentralized network?' },
      ],
    },
    {
      id: 'each-prong-crypto',
      heading: 'How each prong applies to crypto',
      content: [
        { kind: 'h3', text: 'Prong 1 — Investment of money' },
        { kind: 'p', text: 'Almost always satisfied for tokens sold for fiat or crypto. Airdrops with no action required by recipients may fail this prong, but SEC has argued airdrops tied to account creation or KYC checks are still investments.' },
        { kind: 'h3', text: 'Prong 2 — Common enterprise' },
        { kind: 'p', text: 'US circuits split on this test. "Horizontal commonality" — investors pool assets and share in profits pro-rata — is most accepted. "Vertical commonality" — investor fortunes rise and fall with the promoter — is also used. For most token sales where proceeds fund a common protocol, this prong is satisfied.' },
        { kind: 'h3', text: 'Prong 3 — Expectation of profit' },
        { kind: 'p', text: 'Marketing matters enormously. If a token is sold as "utility for accessing our network", prong 3 can fail. If the same token is marketed as "scarce, early access, price will rise as network grows", prong 3 is met. Many SEC enforcement actions hinge on messaging found on Discord, Twitter, and pitch decks.' },
        { kind: 'h3', text: 'Prong 4 — Efforts of others' },
        { kind: 'p', text: 'The hardest prong for crypto. At launch, a token\'s value depends on the founding team\'s efforts — Howey is satisfied. But as the protocol matures and governance decentralizes, the prong may fail. SEC\'s Hinman Speech (2018) articulated this "sufficient decentralization" theory, arguing Ether had transitioned to a non-security. Torres\' Ripple ruling (July 2023) applied similar reasoning to XRP secondary market sales.' },
      ],
    },
    {
      id: 'post-ripple',
      heading: 'Post-Ripple: the primary/secondary split',
      content: [
        { kind: 'p', text: 'The most important recent development is Judge Torres\' July 2023 ruling in SEC v. Ripple. The court distinguished three contexts:' },
        { kind: 'ul', items: [
          'Institutional sales (Ripple → hedge funds, under contracts): all four prongs satisfied. Securities.',
          'Programmatic sales (Ripple → exchange order books, blind orders): prongs 2 and 4 failed. Secondary buyers had no direct relationship with Ripple and no reasonable expectation Ripple specifically would drive their returns. Not securities.',
          'Other distributions (employee compensation, developer grants): no investment of money (prong 1 failure). Not securities.',
        ] },
        { kind: 'p', text: 'The ruling undermined the SEC\'s position that a token classification is asset-wide. It introduced context-dependency: the same token can be a security in one transaction and not in another. This is now widely relied on by defense counsel in SEC cases against Coinbase, Kraken, and Binance.' },
      ],
    },
    {
      id: 'structuring',
      heading: 'Structuring to minimize risk',
      content: [
        { kind: 'p', text: 'Pragmatic guidance for any crypto team running a US or US-exposed token:' },
        { kind: 'ol', items: [
          'Assume your token is a security at issuance. Raise institutionally under Reg D 506(c), Reg S, Reg CF, or Reg A+. Accept the restrictions (accredited investors, 1-year holding period, disclosure) in exchange for legal clarity.',
          'Plan the decentralization path. Document governance milestones, team\'s decreasing role, and independent validator/operator growth. This supports the argument that secondary-market sales are not securities.',
          'Control the marketing. Price projections, "early access", "rewards" language — these are Howey evidence. Keep public communications utility-focused, never investment-focused.',
          'Geofence if needed. If the US regulatory exposure is too high, active geofencing (IP blocks + terms of service + monitoring) is a defensible mitigation.',
          'Engage counsel before launch, not after. SEC enforcement is expensive; settlements are common but rarely cheap. A good securities lawyer at the design stage is the best spend in your budget.',
        ] },
        { kind: 'callout', tone: 'key', title: 'Apply Howey to your specific token', text: 'Use the "Is my token a security?" decision tree to walk through all four prongs with your specific context.' },
      ],
    },
  ],
  relatedTerms: ['Howey Test', 'SEC', 'SEC v. Ripple', 'Reg D', 'Reg S', 'Reg A+', 'Utility Token'],
  relatedTrees: ['howey'],
  relatedCases: ['sec-v-ripple'],
}

export const LEARNING_PATHS: LearningPath[] = [MICA, XRPL_CUSTODY, HOWEY]

export function getLearningPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id)
}
