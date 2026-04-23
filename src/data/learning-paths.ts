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
        { kind: 'callout', tone: 'key', title: 'Next step', text: 'Run the "Do I need a CASP licence?" diagnostic to get a concrete verdict on your specific service.' },
      ],
    },
  ],
  relatedTerms: ['MiCA', 'CASP', 'EMT', 'ART', 'AMF', 'ESMA', 'Utility Token', 'DeFi'],
  relatedTrees: ['casp'],
}

// -----------------------------------------------------------------------------
// Path 2 — XRPL Custody Deep-Dive
// -----------------------------------------------------------------------------
const XRPL_CUSTODY: LearningPath = {
  id: 'xrpl-custody',
  icon: '🔐',
  xrpl: true,
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
        { kind: 'callout', tone: 'key', title: 'Your next step', text: 'Use the "Is my XRPL custody custodial?" diagnostic to route your own architecture through the 10 methods and get a verdict.' },
      ],
    },
  ],
  relatedTerms: ['Custody', 'CASP', 'SignerList', 'MPC', 'TSS', 'Trust Line', 'IOU', 'Escrow', 'Payment Channel', 'RLUSD'],
  relatedTrees: ['xrpl-custody', 'casp'],
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
        { kind: 'callout', tone: 'key', title: 'Apply Howey to your specific token', text: 'Use the "Is my token a security?" diagnostic to walk through all four prongs with your specific context.' },
      ],
    },
  ],
  relatedTerms: ['Howey Test', 'SEC', 'SEC v. Ripple', 'Reg D', 'Reg S', 'Reg A+', 'Utility Token'],
  relatedTrees: ['howey'],
}

// -----------------------------------------------------------------------------
// Path 4 — Liechtenstein Fast Track
// -----------------------------------------------------------------------------
const LIECHTENSTEIN: LearningPath = {
  id: 'liechtenstein-fast-track',
  icon: '🇱🇮',
  title: 'Liechtenstein Fast Track',
  subtitle: 'TVTG, FMA and the token container model — why the smallest EEA jurisdiction keeps being the fastest route to a regulated launch in Europe.',
  duration: '7 min read',
  level: 'intermediate',
  jurisdictions: ['li', 'eu'],
  sections: [
    {
      id: 'why-liechtenstein',
      heading: 'Why Liechtenstein, and why now',
      content: [
        { kind: 'p', text: "Liechtenstein is a 40,000-inhabitant principality sandwiched between Switzerland and Austria. It punches far above its weight in crypto regulation for three reasons: it passed the first holistic blockchain law in Europe (the TVTG, January 2020), it sits in the European Economic Area (EEA) so licences passport into the EU, and the regulator (FMA) has a documented fast-track for blockchain firms — 4 to 12 months, compared to 18+ months for most EU MiCA CASP applications." },
        { kind: 'callout', tone: 'key', title: 'The short pitch', text: "If you need an EU-passportable licence and you need it this year, Liechtenstein is the default option for a well-prepared team. MiCA-era comparable costs are 2-4× lower than Germany or France, and the regulator actually answers emails." },
        { kind: 'p', text: "The trade-offs are real: the Liechtenstein ecosystem is small (fewer service providers, fewer hires), and post-MiCA the fast-track story is less dramatic than it was pre-2024. But the core speed advantage survived MiCA, and several XRPL-native projects (including some of the RLUSD integrations) still choose LI as their EU launch juri." },
      ],
    },
    {
      id: 'tvtg-token-container',
      heading: 'TVTG and the token container model',
      content: [
        { kind: 'p', text: "The TVTG (Token and Trusted Technology Service Provider Act) is structurally different from MiCA. MiCA classifies tokens into three boxes (EMT, ART, Other) and derives obligations from the box. TVTG instead treats a token as a 'container' that can represent any right — a security, an e-money unit, a physical commodity, a utility, a governance share, anything. The legal effect of the token is whatever the underlying right is." },
        { kind: 'p', text: "Concretely: if your token container holds a share in a company, civil-law property rules apply to that share, through the token, as if the token were a paper certificate. This is called the 'token as a linguistic interface to rights' doctrine. It lets TVTG coexist with every other area of law without rewriting them." },
        { kind: 'callout', tone: 'info', title: 'Why this matters for XRPL', text: "The XRPL IOU / Trust Line model maps almost 1:1 onto the TVTG container model. Several XRPL-native tokenization projects use LI precisely because the technical primitive and the legal primitive are aligned." },
        { kind: 'p', text: "For service providers (the other half of TVTG), the law enumerates 10 Token Service Provider categories. The most important for crypto startups:" },
        { kind: 'ul', items: [
          "Token Issuer — issues tokens on a blockchain (registration with FMA, fit-and-proper review).",
          "Token Generator — technical creation of tokens for others.",
          "Token Depositary / Custody — holds tokens for clients (closest to MiCA Art. 75 custody).",
          "Token Exchange — swaps tokens against tokens or fiat.",
          "Token Transfer — moves tokens between accounts for clients.",
          "Physical Validator — verifies that an off-chain asset represented by a token actually exists.",
          "Identity Service Provider — KYC/AML for token transactions.",
        ] },
      ],
    },
    {
      id: 'fast-track-mechanics',
      heading: 'How the fast track actually works',
      content: [
        { kind: 'p', text: "'Fast track' is not an official FMA programme — it is the observed timeline for well-prepared applicants. Three things make LI faster than Paris, Frankfurt, or Dublin:" },
        { kind: 'h3', text: '1. One regulator, one door' },
        { kind: 'p', text: "FMA is a single, compact authority with ~120 staff. Your application lands on one desk, not three. Contrast with Germany, where BaFin + Bundesbank + local Landesbank interact, or France where AMF and ACPR split roles." },
        { kind: 'h3', text: '2. Documented pre-checks' },
        { kind: 'p', text: "FMA offers a pre-check letter process. For a fee (~CHF 3K–10K depending on complexity), the regulator reviews your intended business model and issues a non-binding opinion on which TVTG category or MiCA licence applies. This removes 90% of the classification uncertainty before you file the real application." },
        { kind: 'h3', text: '3. No local substance minimum for the application' },
        { kind: 'p', text: "You can file the TVTG application from abroad and establish the LI presence (office, local director, AML officer) during review. Some juris (notably Singapore MAS) require substance before filing." },
        { kind: 'callout', tone: 'warn', title: 'But you DO need substance before authorization', text: "By the time FMA grants the licence, you must have a real office, at least one locally resident senior manager, and a fit-and-proper AML officer. Budget ~CHF 150-250K/year for the on-ground team. LI is not a letterbox." },
      ],
    },
    {
      id: 'cost-timeline',
      heading: 'Cost and timeline in practice',
      content: [
        { kind: 'p', text: "For a Token Exchange Service Provider (the closest TVTG equivalent to a MiCA CASP exchange authorization):" },
        {
          kind: 'table',
          headers: ['Milestone', 'Duration', 'Cost'],
          rows: [
            ['Pre-check letter', '4–8 weeks', 'CHF 3K–10K'],
            ['Application drafting + external counsel', '6–12 weeks', 'CHF 40K–100K'],
            ['FMA formal review', '3–6 months', 'CHF 20K filing fee'],
            ['Licence grant + operational start', '—', '—'],
            ['Total', '4–9 months', 'CHF 70K–200K'],
          ],
        },
        { kind: 'p', text: "Compare with MiCA CASP authorization in France (AMF): 12–18 months typical timeline, €150–€400K all-in. In Germany (BaFin): 15–24 months, €200–€500K. Liechtenstein retains a ~2-3× speed and cost advantage on the licence itself." },
        { kind: 'callout', tone: 'info', title: 'Post-MiCA, passport choice is key', text: "A TVTG Token Exchange SP does NOT automatically passport as a MiCA CASP. You need an explicit MiCA CASP authorization from FMA in parallel. Some firms run TVTG + MiCA CASP dual licensing from LI. The CASP application is faster in LI (6–10 months) than in larger EU juris and passports across all 27 member states." },
      ],
    },
    {
      id: 'when-not-to-choose-li',
      heading: "When Liechtenstein is NOT the right pick",
      content: [
        { kind: 'p', text: "LI is the fastest route for licence speed. It is not always the right long-term home. Consider Switzerland (FINMA) instead if:" },
        { kind: 'ul', items: [
          'You need full banking services (FINMA banking licence is stronger than the LI FinTech equivalent — though LI now has its own FinTech framework).',
          'You are selling to the global private-banking market — CH brand carries more weight.',
          'You want deeper talent pool — Zurich and Zug ecosystems are significantly larger.',
        ] },
        { kind: 'p', text: "Consider Ireland or Germany instead if:" },
        { kind: 'ul', items: [
          'You plan heavy EU marketing and need a brand-recognizable regulator (BaFin / CBI).',
          'Your largest market is Germany or France — having your licence in the home juri simplifies regulatory interaction.',
          'You need a large local team / hire 50+ people — LI is capped at ~40K population.',
        ] },
        { kind: 'callout', tone: 'key', title: 'A common pattern', text: "Launch the regulated entity in LI for speed, then passport and establish a marketing / support office in Dublin or Paris for scale. This combines the regulatory speed of LI with the market reach of the big EU hubs." },
      ],
    },
  ],
  relatedTerms: ['TVTG', 'MiCA', 'CASP', 'FMA', 'EMI'],
  relatedTrees: ['jurisdiction'],
}

// -----------------------------------------------------------------------------
// Path 5 — US Crypto 101
// -----------------------------------------------------------------------------
const US_CRYPTO_101: LearningPath = {
  id: 'us-crypto-101',
  icon: '🇺🇸',
  title: 'US Crypto 101',
  subtitle: 'The federal vs state patchwork, SEC vs CFTC turf war, BSA/FinCEN baseline, and the 2025 CLARITY Act shift.',
  duration: '10 min read',
  level: 'beginner',
  jurisdictions: ['us'],
  sections: [
    {
      id: 'no-single-regulator',
      heading: 'The US has no single crypto regulator',
      content: [
        { kind: 'p', text: "If you come from the EU and expect a 'US MiCA', stop looking — there isn't one. US crypto oversight is split across at least five federal bodies and 50+ state regulators. Each has a piece of the puzzle, and none has full authority. Understanding which agency cares about what is the first step to operating legally." },
        {
          kind: 'table',
          headers: ['Agency', 'Jurisdiction', 'What they regulate'],
          rows: [
            ['SEC', 'Federal', 'Securities — token offerings, exchanges trading securities'],
            ['CFTC', 'Federal', 'Commodities — Bitcoin, Ether post-2023, derivatives'],
            ['FinCEN', 'Federal (Treasury)', 'AML / BSA — money-services businesses'],
            ['OCC', 'Federal (Treasury)', 'National bank charters — trust companies (e.g., Anchorage)'],
            ['State regulators', 'State', 'Money transmission (MTL), securities (blue-sky laws), consumer protection'],
            ['NYDFS', 'State (NY)', 'BitLicense, NY Trust charters — de facto sets the bar'],
          ],
        },
        { kind: 'callout', tone: 'key', title: 'Why this matters', text: "A single crypto activity can trigger SEC, FinCEN, and 48 state MTLs at once. Most US crypto lawsuits are not about 'is crypto legal?' but 'which agency has jurisdiction?'. Knowing the split saves months of wasted work." },
      ],
    },
    {
      id: 'sec-vs-cftc',
      heading: 'SEC vs CFTC — the security question',
      content: [
        { kind: 'p', text: "Federal crypto law starts with one question: is this token a security, a commodity, or something else? The Howey Test (1946 Supreme Court) answers the security question, and it's the most important four-prong test in crypto:" },
        { kind: 'ol', items: [
          'Investment of money — does the buyer give up cash or other value?',
          'In a common enterprise — is the buyer joining a pool of investors?',
          'With an expectation of profit — does the buyer reasonably expect returns?',
          'Solely from the efforts of others — does someone else run the show and generate the value?',
        ] },
        { kind: 'p', text: "All four must be met. Fail any one and it is not a security. This is why SEC v. Ripple (July 2023) ruled that XRP secondary-market sales are not securities — the prong 'solely from the efforts of others' fails in secondary trading." },
        { kind: 'h3', text: 'If SEC: it is a security' },
        { kind: 'p', text: "You must register the offering (public filing) or qualify for an exemption — Reg D (private placement), Reg S (offshore), Reg A+ (mini-IPO). Trading platforms that list securities need SEC broker-dealer + ATS (Alternative Trading System) licences. Penalties for unregistered issuance: disgorgement, fines, cease-and-desist." },
        { kind: 'h3', text: 'If CFTC: it is a commodity' },
        { kind: 'p', text: "Bitcoin is a commodity under Commodity Exchange Act. Ether has been confirmed as a commodity for derivatives purposes. Commodities face lighter rules for spot trading — mostly anti-fraud and anti-manipulation. Derivatives (futures, swaps, options) need CFTC-registered exchanges." },
        { kind: 'callout', tone: 'warn', title: 'The turf war was real', text: "Gensler-era SEC asserted jurisdiction over most tokens. Post-2024, administration priorities shifted. The CLARITY Act (passed 2025) formally splits the market between SEC (securities) and CFTC (digital commodities) — but many tokens still land in grey zones." },
      ],
    },
    {
      id: 'clarity-act',
      heading: 'The 2025 CLARITY Act',
      content: [
        { kind: 'p', text: "The Digital Asset Market Clarity Act of 2025 is the closest thing the US has to a comprehensive crypto law. It doesn't replace SEC/CFTC — it routes tokens to one or the other based on a new test: the 'mature blockchain' test." },
        { kind: 'h3', text: 'Mature blockchain' },
        { kind: 'p', text: "A blockchain is 'mature' if the underlying network is sufficiently decentralized, no single person or controlled group can materially alter the operation, and all token holders have equal access. Mature-blockchain tokens are digital commodities under CFTC. Non-mature tokens remain securities under SEC." },
        { kind: 'p', text: "Practical consequences:" },
        { kind: 'ul', items: [
          'Bitcoin, Ether — mature → CFTC commodities',
          'XRP — courts already treated secondary-market sales as non-securities in 2023. CLARITY reinforces this by routing XRP to CFTC for spot.',
          "Newly launched tokens — typically not mature yet → SEC securities until the network decentralizes.",
          'Sunset clause — a token can transition from SEC to CFTC oversight as the network matures.',
        ] },
        { kind: 'callout', tone: 'info', title: 'Interactions with MiCA', text: "CLARITY Act is similar to MiCA's 'other crypto-asset' category for mature tokens. For EU issuers looking at the US market, the CLARITY Act creates a more predictable path than the previous enforcement-only regime." },
      ],
    },
    {
      id: 'fincen-bsa',
      heading: 'FinCEN and the BSA — the AML baseline',
      content: [
        { kind: 'p', text: "Under the Bank Secrecy Act (BSA), any Money Services Business (MSB) must register with FinCEN, implement an AML programme, screen against OFAC sanctions, and file Suspicious Activity Reports (SARs). For crypto, MSB status is triggered by:" },
        { kind: 'ul', items: [
          'Accepting and transmitting currency, including crypto — most exchanges, custody providers, most payment apps',
          'Converting between crypto and fiat, or crypto to crypto, for customers',
          'Hosting wallet services where you hold the keys',
        ] },
        { kind: 'p', text: "Non-custodial wallet providers, miners, and most smart-contract-based DeFi protocols are not MSBs (FinCEN guidance 2013, 2019)." },
        { kind: 'h3', text: 'What MSB status requires' },
        { kind: 'ul', items: [
          'FinCEN registration (free) within 180 days of starting business',
          'Written AML programme with designated compliance officer',
          'Customer Identification Programme (CIP) — KYC',
          'OFAC sanctions screening (SDN list, sectoral sanctions)',
          'Travel Rule — share sender + receiver info for transfers ≥ $3K',
          'SAR filing within 30 days of detecting suspicious activity',
        ] },
        { kind: 'callout', tone: 'key', title: 'FinCEN is federal — MTLs are state', text: "MSB registration is a federal filing. But to actually operate in each state, you need that state's MTL. The two are separate — and the MTL patchwork is the heavier burden by far." },
      ],
    },
    {
      id: 'state-patchwork',
      heading: 'The state MTL patchwork',
      content: [
        { kind: 'p', text: "48 out of 50 states require a Money Transmitter Licence for anyone transmitting money (including crypto) on behalf of users. Each state has its own application, fees, surety bond, and compliance requirements. Getting MTLs in all 48 states typically costs $500K to $2M and takes 2 to 4 years." },
        { kind: 'h3', text: 'The highest bar: New York BitLicense' },
        { kind: 'p', text: "NY DFS introduced the BitLicense in 2015. It is the strictest US state regime and — because NY is the largest financial market — sets the de facto standard. Getting a BitLicense costs $100K+ in application fees and 12+ months. Once granted, you're held to capital, cybersecurity, custody, and reporting standards stricter than most EU regimes. Alternatively, you can apply for a NYDFS Trust Charter (Anchorage model) — heavier upfront but gives you full bank-like powers." },
        { kind: 'h3', text: 'Strategies for the MTL patchwork' },
        { kind: 'ul', items: [
          "Hire a licensed partner — route transactions through a company that already holds MTLs. Gives up some margin but avoids the 2-year licensing grind.",
          'Phased rollout — launch in a few states with the biggest markets (CA, NY, TX, FL) first, roll out geographically.',
          'Skip the US initially — many serious crypto startups address the US market only after establishing EU/APAC presence. MTL burden is the reason.',
          "Federal charter (OCC Trust) — Anchorage's model. Replaces state MTLs with a single OCC national trust bank charter. Takes 18-24 months and $5M+ but is the cleanest path.",
        ] },
        { kind: 'callout', tone: 'warn', title: 'Operating without MTLs is criminal', text: "Unlike failing to register with SEC (civil), unlicensed money transmission can be a federal crime under 18 USC §1960. Enforcement is real: Binance, BitMEX, and others faced criminal charges partly on this." },
      ],
    },
    {
      id: 'practical-playbook',
      heading: 'A practical 2026 playbook',
      content: [
        { kind: 'p', text: "For a crypto startup targeting US users in 2026:" },
        { kind: 'ol', items: [
          "Step 1 — Token classification. Run the Howey Test yourself + get a lawyer's opinion. Decide: security, commodity, or non-financial utility. This decision shapes everything downstream.",
          "Step 2 — Map activities to agencies. For each activity (issuance, trading, custody, payment), identify which federal regulator cares + what state MTL requirements apply.",
          "Step 3 — Pick federal charter OR state MTL. If you plan full US coverage and can afford 18-24 months: OCC Trust (clean). If you can phase: MTLs in top 10 states + FinCEN MSB first.",
          "Step 4 — Handle NY separately. BitLicense or Trust charter — plan 12-18 months. Do this early; a late NY launch means rebuilding your compliance stack.",
          "Step 5 — Build the compliance team. FinCEN requires a designated compliance officer; NYDFS requires a qualified Chief Compliance Officer. Expect $300K+/year for a senior hire with prior crypto MSB experience.",
        ] },
        { kind: 'callout', tone: 'key', title: 'Next step', text: "Run the 'Is my token a security?' diagnostic to get a concrete Howey verdict on your project." },
      ],
    },
  ],
  relatedTerms: ['SEC', 'CFTC', 'FinCEN', 'MSB', 'MTL', 'BitLicense', 'Howey Test', 'BSA', 'SAR'],
  relatedTrees: ['howey', 'jurisdiction'],
}

// -----------------------------------------------------------------------------
// Path 6 — Stablecoin Frameworks
// -----------------------------------------------------------------------------
const STABLECOIN_FRAMEWORKS: LearningPath = {
  id: 'stablecoin-frameworks',
  icon: '💵',
  xrpl: true,
  title: 'Stablecoin Frameworks',
  subtitle: 'MiCA EMT/ART in the EU, the 2025 GENIUS Act in the US, and how MAS, HKMA, FMA and others compare — the first truly global regulatory stack.',
  duration: '9 min read',
  level: 'intermediate',
  jurisdictions: ['eu', 'us', 'sg', 'hk', 'li'],
  sections: [
    {
      id: 'why-stablecoins-first',
      heading: 'Why stablecoins got regulated first',
      content: [
        { kind: 'p', text: "Of all crypto categories, stablecoins are the most heavily regulated — and across the most jurisdictions. There are three reasons: they look like money (they claim stable value pegged to fiat), they scale like money (USDT and USDC process more daily volume than Visa in some corridors), and they fail like money — the Terra / UST collapse in May 2022 destroyed $40B in 48 hours." },
        { kind: 'p', text: "Regulators got the message. The EU passed MiCA with an EMT/ART framework that took effect June 2024. The US passed the GENIUS Act in 2025 — its first comprehensive federal crypto law, focused on payment stablecoins. Singapore, Hong Kong, Japan, and UK all have stablecoin frameworks live or in passage by 2026." },
        { kind: 'callout', tone: 'key', title: 'What this path covers', text: "The five regimes you're most likely to encounter — EU (MiCA), US (GENIUS Act), Singapore (MAS), Hong Kong (HKMA), Liechtenstein (TVTG / MiCA). For each: the licence, the reserves, the disclosure rules, and the 'can a foreign stablecoin circulate?' question." },
      ],
    },
    {
      id: 'mica-emt-art',
      heading: 'MiCA — EMT and ART',
      content: [
        { kind: 'p', text: "MiCA splits stablecoins in two based on what they reference:" },
        { kind: 'h3', text: 'E-Money Token (EMT)' },
        { kind: 'p', text: "Pegged to a single official currency (EUR, USD, GBP…). USDC and RLUSD are EMTs. The issuer must be an authorized Electronic Money Institution (EMI) or a credit institution. Rules:" },
        { kind: 'ul', items: [
          'Reserves 1:1 in highly liquid low-risk assets, segregated',
          'Whitepaper notification (not approval) to the NCA',
          "Daily reserves reporting; quarterly audit",
          'Right of redemption at par, any time, for any holder',
          "No interest paid to holders (they're deposits, not investments)",
        ] },
        { kind: 'h3', text: 'Asset-Referenced Token (ART)' },
        { kind: 'p', text: "Pegged to a basket or non-fiat reference — multi-currency, commodity-backed, or mixed. The issuer needs NCA authorization (higher bar than EMT notification). Rules:" },
        { kind: 'ul', items: [
          'Reserves proportional to the reference basket',
          'Whitepaper approval (pre-launch NCA review)',
          'Robust governance + conflicts-of-interest policy',
          'Liquidity management plan — what happens if 10% of holders redeem in a day?',
        ] },
        { kind: 'h3', text: 'Significant token — tier 2 rules' },
        { kind: 'p', text: "If an EMT or ART passes thresholds (market cap > €5B, users > 10M, transactions > 2.5M/day), ECB supervision kicks in with stricter requirements: capital buffers, stress testing, and potentially non-EU reserve geographic diversification limits." },
      ],
    },
    {
      id: 'genius-act',
      heading: 'US — the 2025 GENIUS Act',
      content: [
        { kind: 'p', text: "The GENIUS Act (Guiding and Establishing National Innovation for US Stablecoins) was signed into federal law July 2025 — the first comprehensive US stablecoin regime. Key points:" },
        { kind: 'ul', items: [
          'Creates a federal payment stablecoin charter with the OCC as regulator',
          'Dual-track: large issuers ($10B+) must use federal charter; smaller can use state regulators',
          '1:1 reserves in cash, Treasury bills ≤93 days, or repo on Treasuries — no commercial paper, no corporate bonds',
          'Monthly public disclosure of reserves composition (CPA-audited)',
          'No yield-bearing payment stablecoins allowed — this kills one of the biggest pre-GENIUS US stablecoin business models',
          'Foreign issuers (Circle EU-issued USDC, etc.) need equivalent framework recognition to circulate in the US',
        ] },
        { kind: 'callout', tone: 'warn', title: 'Interaction with BitLicense and MTLs', text: "GENIUS does NOT replace the state MTL or NY BitLicense regime. A Circle or Paxos still needs both its GENIUS charter and the state-level licences. In practice the GENIUS charter becomes the 'mother licence' with state registration simplified where states recognize the federal framework." },
        { kind: 'p', text: "Market impact visible by mid-2026: USDC has the cleanest structural fit (dual MiCA EMT + GENIUS charter). Paxos and Circle USDC Mint Europe operate cleanly on both sides. USDT remained outside GENIUS throughout 2025-2026 due to reserve composition issues." },
      ],
    },
    {
      id: 'asia-frameworks',
      heading: 'Singapore, Hong Kong, Japan',
      content: [
        { kind: 'h3', text: 'Singapore — MAS SCS framework' },
        { kind: 'p', text: "The MAS Stablecoin (SCS) framework took effect 2024. It applies to SGD-pegged and 'Group of 10' currency-pegged stablecoins. Requirements:" },
        { kind: 'ul', items: [
          "Minimum reserves: cash + very short-term safe assets. Similar to MiCA EMT.",
          "Issuer must hold an MPI (Major Payment Institution) licence with Stored Value Facility permission.",
          "3-day settlement window: any user must be able to redeem within 3 business days at par.",
          "Monthly reserves disclosure, annual audit.",
          "The 'Stablecoin' label is regulatory — only MAS-issued stablecoins meeting the framework can use it. Unregulated USD-pegged tokens must use a different name.",
        ] },
        { kind: 'h3', text: 'Hong Kong — Stablecoin Ordinance 2025' },
        { kind: 'p', text: "HKMA's stablecoin ordinance (effective Aug 2025) requires any issuer of fiat-referenced stablecoins doing business in HK to hold a specific HKMA stablecoin licence. Reserves rules mirror MiCA EMT. Non-HK issuers need equivalent licence recognition. The ordinance triggered the rollout of HKD-pegged stablecoins for institutional settlement (notably via ASPIRe / ZA Bank pilots)." },
        { kind: 'h3', text: 'Japan — FSA Payment Services Act' },
        { kind: 'p', text: "Japan's FSA requires stablecoin issuers to be a licensed bank, trust company, or funds transfer service provider. Reserves: 50%+ cash, rest in highly liquid short-term assets. Issuers must use a Japanese FSA-regulated entity. Foreign stablecoins cannot circulate in Japan without a domestic issuer partner." },
      ],
    },
    {
      id: 'comparison',
      heading: 'Side-by-side comparison',
      content: [
        {
          kind: 'table',
          headers: ['Axis', 'EU (MiCA EMT)', 'US (GENIUS)', 'Singapore (SCS)', 'Hong Kong', 'Japan'],
          rows: [
            ['Licence', 'EMI or credit inst.', 'OCC charter + state MTL', 'MPI + SVF', 'HKMA stablecoin licence', 'Bank / trust / FTSP'],
            ['Reserves', '1:1 cash + HQLA', '1:1 cash + T-bills ≤ 93d', 'Cash + safe liquid', 'Cash + HQLA (MiCA-like)', '≥50% cash'],
            ['Yield to holders', 'Prohibited', 'Prohibited', 'Allowed if licensed', 'Prohibited', 'Prohibited'],
            ['Redemption window', 'At par, any time', 'At par, any time', '3 business days', 'At par, any time', 'Prompt'],
            ['Foreign issuers', 'Need MiCA authorization', 'Need equivalence recognition', 'Can circulate if pegged to supported currencies', 'Need HK licence', 'Need domestic issuer partner'],
            ['Significant-tier rules', 'Yes (ECB supervised)', 'Yes (>$10B = federal)', 'Yes (threshold-based)', 'Yes (systemic)', '—'],
          ],
        },
        { kind: 'callout', tone: 'info', title: 'Convergence is real', text: "The five frameworks differ on details but converge on fundamentals: 1:1 reserves, cash + short-term safe assets, segregation, redemption at par, monthly disclosure, prohibition on interest. A stablecoin that meets MiCA EMT standards is ~90% of the way to GENIUS / MAS SCS / HK compliance." },
      ],
    },
    {
      id: 'xrpl-stablecoins',
      heading: 'How this plays out on XRPL',
      content: [
        { kind: 'p', text: "XRPL's native IOU / Trust Line model is a near-ideal substrate for regulated stablecoins. An issuer account is a natural 'reserves-backed issuance point'. Trust lines give users on-chain balances that are direct claims against the issuer. The freeze, globalFreeze, and RequireAuth flags give on-chain compliance controls that ERC-20 stablecoins replicate via admin functions." },
        { kind: 'p', text: "Reference implementation: RLUSD (Ripple's USD stablecoin) issued by Standard Custody & Trust Company, NYDFS-chartered. Launched December 2024 on XRPL Mainnet + Ethereum. MiCA EMT path: Ripple's EU entity (Ripple Labs Europe AG) positioning for EMT authorization." },
        { kind: 'h3', text: 'Design patterns for multi-regime compliance' },
        { kind: 'ul', items: [
          "RequireAuth flag on the issuer account — only KYC'd addresses can hold the token. Maps cleanly to the MiCA Art. 5 suitability requirement.",
          "Per-account freeze — selective AML holds without disrupting other holders. Maps to GENIUS freeze-on-OFAC-hit requirements.",
          "globalFreeze — emergency brake for systemic incident. Maps to MiCA ART liquidity-management plans.",
          "1:1 reserves held off-chain, audited monthly — same as every regime requires.",
          "IOU balances as on-chain proof of liability — enables on-chain reserves proof with a single get_account_lines call per account.",
        ] },
        { kind: 'callout', tone: 'key', title: 'Why XRPL design aligns with regulation', text: "Most blockchains (Ethereum, Solana) run stablecoins as smart contracts with admin keys — freeze, mint, burn implemented in code. XRPL runs them as protocol primitives with flags built into the ledger. The regulatory controls regulators want, XRPL already has." },
      ],
    },
  ],
  relatedTerms: ['EMT', 'ART', 'MiCA', 'GENIUS Act', 'RLUSD', 'EMI', 'MAS', 'HKMA', 'Trust Line'],
  relatedTrees: ['jurisdiction'],
}

// -----------------------------------------------------------------------------
// Path 7 — FATF Travel Rule Explained
// -----------------------------------------------------------------------------
const TRAVEL_RULE: LearningPath = {
  id: 'fatf-travel-rule',
  icon: '🕸️',
  xrpl: true,
  title: 'FATF Travel Rule Explained',
  subtitle: 'The global AML/CFT rule that forces VASPs to share sender + receiver data on every transfer. What it is, thresholds per jurisdiction, and how XRPL handles it.',
  duration: '8 min read',
  level: 'intermediate',
  jurisdictions: ['eu', 'us', 'sg', 'uk', 'ch'],
  sections: [
    {
      id: 'what-is-the-rule',
      heading: 'What the Travel Rule is',
      content: [
        { kind: 'p', text: "The Financial Action Task Force (FATF) is the inter-governmental body that sets global anti-money-laundering and counter-terrorist-financing standards. The 'Travel Rule' is Recommendation 16: every financial institution transferring value above a jurisdiction-specific threshold must transmit sender and receiver identity data along with the transfer." },
        { kind: 'p', text: "The rule predates crypto — it was written for bank wires in 1996. In June 2019, FATF extended it to Virtual Asset Service Providers (VASPs). All 200+ FATF-aligned jurisdictions were expected to transpose it into their national AML laws. By 2026, roughly 80% of the global crypto market operates under a Travel-Rule obligation." },
        { kind: 'callout', tone: 'key', title: 'Why it matters for your startup', text: "If you're a VASP — exchange, custody provider, on/off-ramp, cross-border payment — the Travel Rule is not optional. Non-compliance is one of the easiest enforcement actions for regulators to pursue because it is binary: either the transfer carried the data, or it didn't." },
      ],
    },
    {
      id: 'who-is-a-vasp',
      heading: 'Who is a VASP under the Travel Rule',
      content: [
        { kind: 'p', text: "FATF defines a VASP as any person/entity that performs one or more of these activities for or on behalf of a customer:" },
        { kind: 'ul', items: [
          "Exchange between virtual assets and fiat currencies",
          "Exchange between one or more forms of virtual assets",
          "Transfer of virtual assets (moving value from one address to another)",
          "Safekeeping / administration of virtual assets (custody)",
          "Participation in and provision of financial services related to an issuer's offer and/or sale of a virtual asset",
        ] },
        { kind: 'callout', tone: 'info', title: 'Non-VASP cases', text: "Pure protocol operators (miners, validators), non-custodial wallet software providers where the user controls their own keys, and most DeFi protocols without an identifiable operator are NOT VASPs under FATF guidance. The grey zone is large and juri-specific — always check local transposition." },
      ],
    },
    {
      id: 'thresholds-by-juri',
      heading: 'Thresholds — the part that trips everyone up',
      content: [
        { kind: 'p', text: "FATF recommends a threshold of USD/EUR 1,000 above which the Travel Rule kicks in. Each jurisdiction picks its own threshold, and they differ significantly." },
        {
          kind: 'table',
          headers: ['Jurisdiction', 'Threshold', 'Regulation / source'],
          rows: [
            ['EU', '€1,000 (any amount above → full data)', 'Regulation (EU) 2023/1113 (TFR)'],
            ['US (FinCEN)', 'USD 3,000', 'Bank Secrecy Act / 31 CFR 103.33'],
            ['UK', '€1,000 (post-Brexit aligned with EU)', 'UK MLR 2017 amendment Sep 2023'],
            ['Switzerland', 'CHF 1,000 (FINMA Circular 08/3)', 'FINMA AMLO'],
            ['Singapore', 'SGD 1,500', 'MAS PS-N02'],
            ['UAE (Dubai)', 'AED 3,500 (~USD 950)', 'VARA AML rulebook'],
            ['Hong Kong', 'HKD 8,000 (~USD 1,020)', 'AMLO Chapter 615'],
            ['Japan', '¥100,000 (~USD 670)', 'FIEA / APPS'],
            ['South Korea', '₩1M (~USD 750)', 'Specific Financial Information Act'],
          ],
        },
        { kind: 'callout', tone: 'warn', title: 'The sunrise issue', text: "When two jurisdictions have different thresholds, compliance becomes asymmetric. If I'm an EU VASP (€1K threshold) sending $2K to a US VASP (USD 3K threshold), I need to send Travel Rule data, but the US VASP has no obligation to receive it. Meanwhile if they send $4K back to me, they must transmit, but if they send $2K back, the data will not arrive on a formal channel — even though my €1K obligation would apply to the EU side. This mismatch is the 'sunrise issue' and it is unsolved." },
      ],
    },
    {
      id: 'what-data',
      heading: 'What data must travel',
      content: [
        { kind: 'p', text: "The data set is defined by FATF and standardised as IVMS 101 (InterVASP Messaging Standard). Every Travel Rule message contains:" },
        { kind: 'h3', text: 'Originator (sender)' },
        { kind: 'ul', items: [
          'Full legal name',
          'Account / wallet identifier (the address involved)',
          'Physical address OR national identity number OR customer ID OR date and place of birth',
        ] },
        { kind: 'h3', text: 'Beneficiary (receiver)' },
        { kind: 'ul', items: [
          'Full legal name',
          'Account / wallet identifier',
        ] },
        { kind: 'p', text: "For institutional senders, additional fields apply — registered office, LEI code. Some jurisdictions require extra fields (e.g., Singapore MAS requires date-of-birth for all non-institutional originators above SGD 1,500)." },
        { kind: 'callout', tone: 'info', title: 'IVMS 101 = the standard', text: "IVMS 101 is the JSON schema that virtually every Travel Rule vendor supports. If you build or buy a compliance stack, insist on IVMS 101 output — it is the lingua franca between VASPs globally." },
      ],
    },
    {
      id: 'tools-and-vendors',
      heading: 'Practical tools — the Travel Rule vendor market',
      content: [
        { kind: 'p', text: "You will almost never build this yourself. The interconnection challenge is too big. The market is dominated by a few specialised vendors:" },
        { kind: 'ul', items: [
          "Notabene — IVMS 101 messaging, VASP directory, counterparty risk scoring. Dominant in the EU and US institutional segment.",
          "Sumsub Travel Rule — integrated with Sumsub's broader KYC/AML stack. Popular in EU retail-facing exchanges.",
          "Chainalysis KYT + Travel Rule — combines sanctions screening with Travel Rule messaging.",
          "TRP (Travel Rule Protocol) — open standard championed by Sygna, Ciphertrace/Mastercard.",
          "OpenVASP — open-source alternative designed to avoid vendor lock-in.",
        ] },
        { kind: 'p', text: "Integration cost: USD 30K-150K/year in vendor fees + engineering time for the API integration (typically 4-8 weeks for a first launch)." },
      ],
    },
    {
      id: 'xrpl-specific',
      heading: 'How XRPL handles the Travel Rule',
      content: [
        { kind: 'p', text: "XRPL poses specific operational questions for Travel Rule compliance that are worth understanding:" },
        { kind: 'h3', text: 'Destination Tag — the account identifier' },
        { kind: 'p', text: "A classical pain-point: centralized XRPL wallets (exchanges, custodians) pool customers into a single XRPL account and use the Destination Tag (32-bit integer) to disambiguate internal customers. The XRPL address alone does NOT identify the beneficiary. VASPs must resolve the address + tag combination to a specific customer when providing beneficiary data." },
        { kind: 'h3', text: 'Memo fields — where the data could ride' },
        { kind: 'p', text: "XRPL transactions support Memo objects (up to 1 KB each, up to 3 memos per transaction). Technically, Travel Rule data could be carried on-chain. In practice, nobody does this for privacy reasons — the data is off-chain, transmitted via IVMS 101 vendor channels. On-chain memo is used only for transaction references, not PII." },
        { kind: 'h3', text: 'Trust Line / IOU transfers' },
        { kind: 'p', text: "Transfers of issued tokens (IOUs) via Trust Lines trigger the Travel Rule when the transfer meets the threshold. The issuer (the gateway) is always a VASP. The relevant beneficiary can be identified by the account holding the Trust Line. RLUSD, for example, applies Travel Rule messaging through Ripple's licensed entities." },
        { kind: 'h3', text: 'Payment Channels' },
        { kind: 'p', text: "Payment Channels (off-ledger micropayments) aggregate value between two counterparties. The Travel Rule applies at channel open (funding) and close (settlement) — not at each off-chain claim. This makes XRPL Payment Channels very practical for streaming payments: one Travel Rule event per session, not per micro-transaction." },
        { kind: 'callout', tone: 'key', title: 'Next step', text: "If you operate an XRPL-native exchange or custody service, budget for a Travel Rule vendor from day one. Notabene and Sumsub both have IVMS 101 modules that handle Destination Tag resolution." },
      ],
    },
  ],
  relatedTerms: ['Travel Rule', 'FATF', 'VASP', 'CASP', 'FinCEN', 'KYC', 'AML'],
  relatedTrees: ['casp'],
}

// -----------------------------------------------------------------------------
// Path 8 — Tokenised RWA 101
// -----------------------------------------------------------------------------
const TOKENISED_RWA: LearningPath = {
  id: 'tokenised-rwa',
  icon: '🏛️',
  xrpl: true,
  title: 'Tokenised RWA 101',
  subtitle: 'Real-World Assets on-chain: what counts, who issues them, what regime applies — from BlackRock BUIDL to the EU DLT Pilot and the XRPL RWA stack.',
  duration: '10 min read',
  level: 'intermediate',
  jurisdictions: ['eu', 'us', 'uk', 'ch', 'li'],
  sections: [
    {
      id: 'what-is-rwa',
      heading: 'What counts as a Real-World Asset',
      content: [
        { kind: 'p', text: "A Real-World Asset (RWA) is any asset that exists off-chain but is represented by a token on-chain. The token is a digital claim, the asset is real. This differs from native crypto assets (Bitcoin, XRP, ETH) that exist only on-chain, and from pure digital representations (NFTs as art) that may have no off-chain counterpart." },
        { kind: 'p', text: "The RWA category spans an enormous range. In 2026, by market size:" },
        {
          kind: 'table',
          headers: ['Asset class', 'Example tokens', 'Approx on-chain market (2026)'],
          rows: [
            ['US Treasury bills', 'BUIDL (BlackRock), OUSG (Ondo), FOBXX (Franklin)', '$10-15B'],
            ['Private credit', 'Maple, Centrifuge, Goldfinch', '$5-8B'],
            ['Corporate bonds', 'Archax, Sologenic', '$2B'],
            ['Real estate', 'RealT, Landshare, Propy', '$500M-1B'],
            ['Commodities', 'Paxos Gold (PAXG), Tether Gold (XAUT)', '$1-2B'],
            ['Equities', 'Backed Finance (tokenized stocks)', '$300-500M'],
            ['Trade finance / invoices', 'Centrifuge, Credix', '$500M'],
          ],
        },
        { kind: 'callout', tone: 'info', title: 'The BUIDL milestone', text: "BlackRock's BUIDL fund (launched March 2024 on Ethereum via Securitize) became the largest tokenised treasury fund in months. By mid-2026 it is the reference: Wall Street accepts tokenised T-bills as legitimate institutional product. This single launch shifted the narrative from 'experimental' to 'mainstream'." },
      ],
    },
    {
      id: 'legal-classification',
      heading: 'The legal classification matrix',
      content: [
        { kind: 'p', text: "An RWA token's regime is determined by what it represents, not by the fact that it's on a blockchain. Three common classifications:" },
        { kind: 'h3', text: 'Security token' },
        { kind: 'p', text: "Represents a financial instrument: equity, debt, fund share, derivative. Full securities law applies. In the EU: Prospectus Regulation + MiCA exemption for securities. In the US: full Securities Act + SEC registration or exemption (Reg D, S, A+). Most institutional RWA (BUIDL, Centrifuge pools) are security tokens." },
        { kind: 'h3', text: 'E-Money Token (MiCA EMT) / Payment token' },
        { kind: 'p', text: "Represents a fiat-pegged value. Regulated under MiCA (EMT) or GENIUS Act (payment stablecoin). USDC is an example. Some tokenised treasury bills sit in a grey zone between EMT and security depending on structure." },
        { kind: 'h3', text: 'Commodity token' },
        { kind: 'p', text: "Represents a physical commodity (gold, oil, real estate). In the US: CFTC jurisdiction for commodities. In EU: MiCA Asset-Referenced Token (ART) if multi-reference, or outside MiCA scope if it qualifies as a financial instrument under MiFID II." },
        { kind: 'callout', tone: 'warn', title: 'Classification drives everything', text: "An RWA token's classification dictates: which regulator supervises, what licence the issuer needs, who can hold the token (retail vs professional), what disclosure is required, where it can be traded. Getting this wrong is expensive. Dual legal opinions (EU counsel + US counsel) are standard for RWA launches." },
      ],
    },
    {
      id: 'eu-dlt-pilot',
      heading: 'EU DLT Pilot Regime — the sandbox',
      content: [
        { kind: 'p', text: "The EU DLT Pilot Regime (Regulation (EU) 2022/858) took effect March 2023 and runs as a 3-year sandbox (extendable) allowing Market Infrastructures to trade and settle tokenised financial instruments on a DLT. It's the EU's first serious securities-on-blockchain framework." },
        { kind: 'p', text: "Three types of DLT Market Infrastructure exist under the Pilot:" },
        { kind: 'ul', items: [
          "DLT MTF — Multilateral Trading Facility on DLT. Trading only.",
          "DLT SS — Settlement System. Settlement only.",
          "DLT TSS — Trading AND Settlement System. Both in one.",
        ] },
        { kind: 'p', text: "Thresholds limit the scale of instruments traded under the Pilot (e.g., shares of issuers with market cap < €500M, bonds < €1B per issue). This keeps the experiment bounded. By mid-2026, 9 DLT MI authorisations are live (notably 21X in Germany, D-GCS, CEEI in Spain). Securitize and Archax also operate in the Pilot scope." },
        { kind: 'callout', tone: 'info', title: 'Transition to MiCA', text: "The DLT Pilot is temporary (2023-2026 + extensions). Learnings from the Pilot will feed into a permanent framework — likely a MiCA-style directive for tokenised financial instruments, expected by 2027-2028." },
      ],
    },
    {
      id: 'us-regime',
      heading: 'US RWA — Reg D, Reg S, and the Securitize model',
      content: [
        { kind: 'p', text: "In the US, RWA tokens classified as securities follow classical exemption pathways:" },
        { kind: 'ul', items: [
          "Reg D 506(c) — accredited-investor-only, unlimited size, no cooling-off. Standard for BUIDL and most institutional RWA.",
          "Reg S — offshore offerings to non-US persons.",
          "Reg A+ — mini-IPO, retail allowed up to $75M/year. More burdensome, rarely used for RWA.",
          "Reg CF — retail crowdfunding < $5M/year. Too small for most RWA.",
        ] },
        { kind: 'p', text: "The plumbing is provided by SEC-registered Transfer Agents + Broker-Dealers. Securitize is the reference: it operates as a Transfer Agent (SEC-registered 2019) + Broker-Dealer (Securitize Markets) + ATS operator. It's the single counterparty that connects traditional US securities law with on-chain issuance." },
        { kind: 'h3', text: '2025 regulatory shifts' },
        { kind: 'p', text: "Post-CLARITY Act (2025), the US has clearer paths for tokens that qualify as digital commodities (CFTC jurisdiction). For pure RWA representing traditional securities, SEC jurisdiction remains — but rule-making has shifted toward accommodating tokenised issuance under existing exemptions rather than forcing everything into new frameworks." },
      ],
    },
    {
      id: 'the-rwa-stack',
      heading: 'The RWA stack — from asset to token',
      content: [
        { kind: 'p', text: "A full RWA system has four distinct layers. Understanding them clarifies why most RWA projects need 3-5 partners, not just a smart contract:" },
        { kind: 'ol', items: [
          "Off-chain asset + trustee — the actual T-bill, the real estate deed, the private credit loan. Held by a qualified custodian or trustee (NYDFS Trust for USD assets, FCA-authorised trustee for UK).",
          "Issuer entity — the legal vehicle that owns the off-chain asset AND issues the on-chain token. Typically a SPV (special-purpose vehicle) or a regulated fund.",
          "Token & smart contract / ledger primitive — the on-chain representation. Ethereum ERC-20/1400 is most common; XRPL IOU + Trust Line is a native alternative; MPT (XLS-33) adds programmable compliance flags.",
          "Distribution — the platform that markets, onboards KYC, handles subscriptions and redemptions. Often a regulated broker-dealer or a crypto exchange with securities licences.",
        ] },
        { kind: 'callout', tone: 'key', title: 'Physical Validator', text: "Liechtenstein TVTG formalises a unique role called 'Physical Validator' (Physischer Validator) — a licensed party that continuously verifies the off-chain asset actually exists and matches the on-chain token. This is the regulatory answer to the trust gap: someone legally responsible for saying 'yes, the deed is real'. No other juri has this formal role yet, but many RWA platforms use equivalent third-party attestations." },
      ],
    },
    {
      id: 'xrpl-rwa-stack',
      heading: 'Why XRPL is a natural RWA substrate',
      content: [
        { kind: 'p', text: "XRPL's native primitives map onto RWA needs with less retrofitting than EVM chains. Three reasons:" },
        { kind: 'h3', text: '1. IOU + Trust Line = native RWA representation' },
        { kind: 'p', text: "Issuing a token on XRPL is literally creating an IOU: the issuer account promises to honour the claim. Holders open Trust Lines to accept the token. The model is a direct match for RWA: issuer holds the real asset, holder has an on-chain claim. No smart contract is required. Standard Custody's RLUSD stablecoin uses this exact pattern for fiat-pegged claims." },
        { kind: 'h3', text: '2. MPT (XLS-33) = programmable compliance primitives' },
        { kind: 'p', text: "The Multi-Purpose Token standard adds programmable flags at the protocol level: transfer fees, holding limits, authorization requirements, time-locks. RWA issuers need these to satisfy regulators (retail-only vs qualified-only, geofencing, forced redemption for sanctions). MPT provides them without writing a single line of smart-contract code." },
        { kind: 'h3', text: '3. Escrow + Checks = delivery vs payment (DvP)' },
        { kind: 'p', text: "One of the hardest problems in RWA is atomic settlement: ensuring the buyer's payment and the seller's token change hands simultaneously. XRPL Escrow (with cryptographic conditions) enables this natively — both legs of the trade are released together by the ledger, without any intermediary holding both assets. This is critical for tokenised treasury secondary markets." },
        { kind: 'callout', tone: 'key', title: 'The 2026 push', text: "Ripple and Archax announced a public target: $1B+ tokenised assets on XRPL by mid-2026, with Ripple acting as custody (Metaco + Palisade) and Archax as the UK FCA-authorised exchange. This is the most concrete RWA-on-XRPL play and likely the template others will follow." },
      ],
    },
  ],
  relatedTerms: ['RWA', 'EMT', 'ART', 'MiCA', 'DLT Pilot Regime', 'TVTG', 'Howey Test', 'RLUSD', 'MPT'],
  relatedTrees: ['howey'],
}

// -----------------------------------------------------------------------------
// Path 9 — Dubai VARA: Zero to Licensed
// -----------------------------------------------------------------------------
const DUBAI_VARA: LearningPath = {
  id: 'dubai-vara',
  icon: '🇦🇪',
  title: 'Dubai VARA — Zero to Licensed',
  subtitle: 'Why Dubai became the crypto hub of the Gulf: the VARA rulebooks, the 6 VASP categories, substance requirements, and how VARA compares to ADGM and DIFC.',
  duration: '9 min read',
  level: 'intermediate',
  jurisdictions: ['uae'],
  sections: [
    {
      id: 'why-dubai',
      heading: 'Why Dubai became THE Gulf crypto hub',
      content: [
        { kind: 'p', text: "In 2022, Dubai created the Virtual Assets Regulatory Authority (VARA) — the first standalone virtual-asset regulator anywhere in the world. VARA's mandate covers every VASP operating in or from the Emirate of Dubai, excluding the Dubai International Financial Centre (DIFC) which remains under the Dubai Financial Services Authority (DFSA)." },
        { kind: 'p', text: "The move attracted Binance, Bybit, OKX, Crypto.com, Kraken, Ripple Custody, Circle, and dozens of others. By 2026, Dubai hosts 700+ licensed VASPs — more than any other jurisdiction except the US. Three factors drove this:" },
        { kind: 'ul', items: [
          "Clarity — VARA published comprehensive rulebooks in 2023 covering every major activity. No regulatory guesswork.",
          "Speed — 6-12 months to licence vs 18-24 for EU MiCA, often faster than Singapore MAS MPI.",
          "Tax environment — 0% personal income tax, 9% corporate tax on profits > AED 375K. For crypto trading firms that meet free-zone criteria, effective rate can be 0%.",
        ] },
        { kind: 'callout', tone: 'key', title: 'The short pitch', text: "If you're a serious crypto firm looking outside the EU/US, Dubai is often the first alternative considered. The licensing process is predictable, the tax structure is compelling, and the regulator is actively seeking dialogue with industry." },
      ],
    },
    {
      id: 'dubai-landscape',
      heading: 'The Dubai regulatory landscape — not just VARA',
      content: [
        { kind: 'p', text: "Dubai has three crypto regulatory regimes running in parallel. Choosing the right one is the first decision:" },
        {
          kind: 'table',
          headers: ['Regime', 'Regulator', 'Jurisdiction', 'Best for'],
          rows: [
            ['VARA', 'Virtual Assets Regulatory Authority', 'Emirate of Dubai (ex-DIFC)', 'Crypto-native firms, retail-facing'],
            ['DFSA (DIFC)', 'Dubai Financial Services Authority', 'DIFC free zone', 'Institutional, banks, asset managers'],
            ['FSRA (ADGM)', 'Financial Services Regulatory Authority', 'Abu Dhabi Global Market (not Dubai)', 'Hedge funds, family offices, institutional'],
          ],
        },
        { kind: 'p', text: "For retail-facing crypto and most startups, VARA is the answer. For institutional-only crypto business (e.g., custody for asset managers, tokenised funds for HNW), DFSA or ADGM FSRA offer more familiar common-law-based frameworks and are favoured by banks. The three regulators do not overlap — pick one, incorporate in that zone." },
      ],
    },
    {
      id: 'vara-rulebooks',
      heading: 'The VARA rulebooks',
      content: [
        { kind: 'p', text: "VARA issued its main rulebooks in early 2023, with continuous updates since. The structure is modular — one core rulebook plus activity-specific rulebooks." },
        { kind: 'h3', text: 'Core rulebooks' },
        { kind: 'ul', items: [
          'Compliance and Risk Management Rulebook — AML/CFT, sanctions, transaction monitoring.',
          'Company Rulebook — governance, fit-and-proper, board composition.',
          'Technology and Information Rulebook — cybersecurity, business continuity, cloud outsourcing.',
          'Market Conduct Rulebook — fair dealing, marketing restrictions, disclosures.',
        ] },
        { kind: 'h3', text: 'Activity-specific rulebooks' },
        { kind: 'p', text: "One rulebook per VASP category. The 6 categories:" },
        { kind: 'ol', items: [
          'Advisory Services — investment advice on virtual assets.',
          'Broker-Dealer Services — execution on behalf of clients.',
          'Custody Services — safekeeping of virtual assets.',
          'Exchange Services — operating a trading platform.',
          'Lending & Borrowing Services — margin, collateral, yield products.',
          'VA Management & Investment Services — asset management, fund operations.',
        ] },
        { kind: 'p', text: "Plus one cross-cutting rulebook for Virtual Asset Issuance (for native tokens issued from the Emirate)." },
      ],
    },
    {
      id: 'licensing-journey',
      heading: 'The licensing journey — realistic timeline',
      content: [
        { kind: 'p', text: "VARA uses a 4-stage process. Each stage must be completed before moving to the next:" },
        {
          kind: 'table',
          headers: ['Stage', 'Milestone', 'Typical duration'],
          rows: [
            ['1 — Pre-application', 'Initial engagement + fit-and-proper pre-check', '4-8 weeks'],
            ['2 — Initial approval (IA)', 'Core documents review + entity setup in Dubai', '2-4 months'],
            ['3 — Operating licence (L1/L2)', 'Full ops + tech + compliance readiness review', '3-6 months'],
            ['4 — Commencement approval', 'Final check before go-live', '2-4 weeks'],
            ['Total', 'Pre-app to go-live', '6-12 months'],
          ],
        },
        { kind: 'h3', text: 'Capital requirements' },
        { kind: 'ul', items: [
          'Advisory: AED 100K (~USD 27K)',
          'Broker-dealer: AED 1M (~USD 272K)',
          'Custody: AED 1.5M (~USD 408K)',
          'Exchange: AED 1.5M (~USD 408K)',
          'Lending: AED 1.5M (~USD 408K)',
          'VA Management: AED 500K-1M (~USD 136-272K)',
          'Issuance: AED 1.5M (~USD 408K)',
        ] },
        { kind: 'callout', tone: 'info', title: 'Total cost estimate', text: "Licensing fees + external counsel + local setup typically come to USD 300-800K for an exchange/custody licence, and USD 150-300K for advisory/broker. Annual running costs (office, local staff, audit) add USD 500K-1.5M depending on headcount." },
      ],
    },
    {
      id: 'substance-requirements',
      heading: 'Substance — you need a real Dubai presence',
      content: [
        { kind: 'p', text: "VARA is strict on substance. Unlike some offshore regimes, you cannot operate from abroad with a letterbox in Dubai. Requirements:" },
        { kind: 'ul', items: [
          "Physical office in Dubai (free zone or mainland depending on licence).",
          "UAE-resident Senior Executive Officer (SEO) with day-to-day control.",
          "UAE-resident Money Laundering Reporting Officer (MLRO).",
          "UAE-resident Compliance Officer (often same person as MLRO for smaller firms).",
          "Local bank account with a UAE bank (not always easy for crypto firms — expect a 3-6 month bank onboarding process).",
          "Annual on-site VARA inspections.",
        ] },
        { kind: 'callout', tone: 'warn', title: 'The banking friction', text: "Despite Dubai's crypto-friendly regulation, UAE retail banks remain conservative about onboarding crypto firms. Budget time for banking: VARA licence in hand does NOT guarantee a bank account. A few crypto-friendly banks (like RAK Bank, Mashreq for certain cases) dominate the space; others decline." },
      ],
    },
    {
      id: 'vara-vs-others',
      heading: 'VARA vs MiCA vs Singapore MAS',
      content: [
        { kind: 'p', text: "Comparing the three top global crypto licensing options:" },
        {
          kind: 'table',
          headers: ['Axis', 'VARA (Dubai)', 'EU MiCA CASP', 'Singapore MAS'],
          rows: [
            ['Timeline', '6-12 months', '12-18 months', '9-15 months'],
            ['Cost (all-in)', '$300K-800K', '€200K-500K', 'SGD 250K-600K'],
            ['Capital', 'AED 100K-1.5M', '€50K-150K', 'SGD 100K-250K'],
            ['Passporting', 'UAE only', '27 EU member states', 'Singapore only'],
            ['Retail allowed', 'Yes (regulated)', 'Yes (with warnings)', 'Limited (accredited-friendly)'],
            ['Tax', '0% personal, 9% corporate (0% effective in free zone)', 'Up to 45% personal, 19-31% corporate', '17% corporate, progressive personal'],
            ['Local substance', 'High (UAE residents required)', 'Medium (1+ senior exec in issuing state)', 'High (MAS demands local presence)'],
          ],
        },
        { kind: 'callout', tone: 'key', title: 'When to pick Dubai', text: "Dubai is compelling when: (1) you serve a global retail/institutional mix without EU-only focus, (2) your team is comfortable with Gulf time zone and can relocate 2-3 key people, (3) tax structure matters (founders taking equity + salaries), (4) you want a fast, predictable process. Dubai is less compelling if your primary market is EU only (MiCA passport wins) or if you need a more mature talent pool (Singapore deeper for senior hires)." },
      ],
    },
  ],
  relatedTerms: ['VARA', 'VASP', 'MiCA', 'CASP', 'MAS', 'DPT'],
  relatedTrees: ['jurisdiction'],
}

// -----------------------------------------------------------------------------
// Path 10 — KYC / AML for Crypto Startups
// -----------------------------------------------------------------------------
const KYC_AML_STARTUP: LearningPath = {
  id: 'kyc-aml-for-startups',
  icon: '🛂',
  xrpl: true,
  title: 'KYC / AML for Crypto Startups',
  subtitle: 'The AML compliance stack every licensed crypto startup must build — CIP, tiered KYC, sanctions screening, SAR workflow, and the vendor landscape.',
  duration: '10 min read',
  level: 'intermediate',
  jurisdictions: ['eu', 'us', 'sg', 'uk'],
  sections: [
    {
      id: 'why-kyc-aml',
      heading: 'Why KYC / AML is the non-negotiable',
      content: [
        { kind: 'p', text: "Of everything a regulated crypto startup must do, KYC/AML is the single most enforced obligation globally. Licence revocations, criminal referrals, and the biggest crypto fines in history (Binance $4.3B, BitMEX $100M) were driven by AML failures — not token classification mistakes, not custody gaps. The regulator doesn't usually care if your token is perfectly classified; they care whether your AML stack catches bad actors." },
        { kind: 'p', text: "The good news for founders: unlike token-classification grey zones, KYC/AML is a solved problem. The compliance playbook is mature, the vendors are battle-tested, and the regulatory expectations are documented. What startups underestimate is the operational cost — running an AML programme is closer to running an engineering team than a legal process." },
        { kind: 'callout', tone: 'key', title: 'Why it matters for your startup', text: "Day 1 of operations, your AML programme must be live. No exceptions. Regulators will test it in audits. A single missed SAR filing or OFAC match can trigger licence revocation. Budget: $150K–400K/year for a real compliance stack + a qualified Chief Compliance Officer." },
      ],
    },
    {
      id: 'what-is-in-stack',
      heading: 'The 5 components of an AML stack',
      content: [
        { kind: 'p', text: "A compliant AML programme has 5 operational layers. Each corresponds to a regulator expectation, and each usually maps to a vendor relationship." },
        { kind: 'h3', text: '1. Customer Identification Programme (CIP)' },
        { kind: 'p', text: "Also called KYC. At onboarding, you identify who the customer is. For individuals: full legal name, date of birth, residential address, national ID document, selfie / liveness check. For businesses (KYB): legal entity, registered address, ultimate beneficial owners, incorporation documents." },
        { kind: 'h3', text: '2. Customer Due Diligence (CDD) + Enhanced Due Diligence (EDD)' },
        { kind: 'p', text: "After identification, you assess risk. Standard due diligence: sanctions + PEP lists + adverse media. Enhanced due diligence for high-risk cases (PEP, high-value, high-risk jurisdiction origin): deeper source-of-funds evidence, beneficial ownership tracing." },
        { kind: 'h3', text: '3. Transaction monitoring' },
        { kind: 'p', text: "Every transaction is screened for patterns: structuring (multiple small transactions below reporting thresholds), layering (rapid transfers across wallets/chains), unusual velocity, mixer/tumbler exposure, counterparty sanctions. Machine-learning-based systems flag suspicious activity in real time." },
        { kind: 'h3', text: '4. Sanctions screening' },
        { kind: 'p', text: "At onboarding AND at every transaction, customers and counterparties are screened against OFAC SDN (US), EU Consolidated List, UK OFSI, UN Sanctions. Crypto-specific: wallet-address screening against OFAC's SDN-linked addresses. False positives (name similarities) are the main operational pain." },
        { kind: 'h3', text: '5. Suspicious Activity Reporting (SAR)' },
        { kind: 'p', text: "When something is flagged, a SAR / STR must be filed with the Financial Intelligence Unit (FinCEN in US, Tracfin in France, NCA in UK, MAS STRO in Singapore). Deadlines are strict (typically within 30 days of detection). Missed or wrong SARs are audit-critical." },
        { kind: 'callout', tone: 'info', title: 'Travel Rule is a 6th layer', text: "If you're sending crypto above the jurisdiction threshold, you also transmit sender + receiver data (FATF R.16). See the FATF Travel Rule guide for the full breakdown — the IVMS 101 format + vendors (Notabene, Sumsub) overlap with the sanctions-screening stack you build for the other 5 layers." },
      ],
    },
    {
      id: 'tiered-kyc',
      heading: 'Tiered KYC — the pragmatic pattern',
      content: [
        { kind: 'p', text: "Full KYC on every user is expensive (time, drop-off, vendor cost). Tiered KYC applies minimum verification at signup and escalates as the user transacts more. This is the norm in regulated crypto onboarding." },
        {
          kind: 'table',
          headers: ['Tier', 'Threshold', 'Verification', 'Drop-off typical'],
          rows: [
            ['Tier 0 (unverified)', '€0 transacting', 'Email + phone only', '5-10%'],
            ['Tier 1 (light KYC)', '< €1,000 / month', 'ID document + selfie / liveness', '15-25%'],
            ['Tier 2 (full KYC)', '€1,000–10,000 / month', 'Full CIP + address proof', '10-20%'],
            ['Tier 3 (EDD)', '> €10,000 / month, high-risk juri, PEP', 'Source of funds, beneficial ownership, interview', '30-50%'],
          ],
        },
        { kind: 'p', text: "Thresholds above align roughly with MiCA Art. 73 + AMLD6 guidance. US MSB / BitLicense thresholds are stricter — many US platforms require full KYC from dollar 1. FATF Travel Rule threshold (€1K in EU, $3K in US) is usually the 'tier escalation' trigger." },
        { kind: 'callout', tone: 'warn', title: 'Simplified Due Diligence (SDD) is shrinking', text: "AMLD6 (effective July 2027 in the EU) narrows the cases where simplified KYC is allowed. In crypto, SDD is essentially being phased out — assume full CIP for everyone by 2028." },
      ],
    },
    {
      id: 'vendor-landscape',
      heading: 'The vendor landscape — who does what',
      content: [
        { kind: 'p', text: "Nobody builds a modern KYC/AML stack from scratch. The ecosystem is specialised and the vendors are mature." },
        { kind: 'h3', text: 'KYC / identity (onboarding)' },
        { kind: 'ul', items: [
          "Sumsub — all-in-one (ID, liveness, sanctions, Travel Rule). Dominant in EU crypto. ~€1-2 per full KYC.",
          "Onfido — UK-founded, strong document coverage (>1,200 ID types). Used by Revolut, Coinbase UK.",
          "Veriff — Estonian, strong in Baltics / EE / EU. Good pricing for early-stage startups.",
          "Persona — US-based, developer-friendly API, flexible flows. Popular with Web3 startups.",
        ] },
        { kind: 'h3', text: 'Sanctions + PEP + adverse media' },
        { kind: 'ul', items: [
          "Refinitiv World-Check — the gold standard, used by banks. Expensive ($50-200K/year minimum).",
          "Dow Jones Risk & Compliance — competitor to Refinitiv.",
          "ComplyAdvantage — modern API-first alternative, more affordable, strong adverse media. Popular with fintechs.",
          "Sumsub sanctions — integrated in their KYC stack.",
        ] },
        { kind: 'h3', text: 'On-chain analytics (transaction monitoring + wallet screening)' },
        { kind: 'ul', items: [
          "Chainalysis KYT + Reactor — the dominant on-chain analytics + investigations platform. Used by exchanges, FinCEN, Europol.",
          "Elliptic Navigator + Lens — strong competitor, especially in EU.",
          "TRM Labs — fast-growing, stronger coverage of newer chains. XRPL support.",
          "Merkle Science — APAC-focused, good for Asian exchanges.",
        ] },
        { kind: 'h3', text: 'SAR / STR filing software' },
        { kind: 'ul', items: [
          "Most regulators offer a direct filing portal (FinCEN E-File, Tracfin ERMES, UK NCA SAR Online).",
          "Compliance OSes (Sumsub, Unit21, Hawk:AI) aggregate SAR generation + filing in one workflow.",
        ] },
        { kind: 'callout', tone: 'info', title: 'Stack budget reality check', text: "A realistic year-1 AML vendor stack for a regulated EU CASP startup: Sumsub (KYC + Travel Rule) €30-60K + ComplyAdvantage (sanctions) €20-40K + Chainalysis KYT €40-100K + compliance ops software (Unit21 / Hawk:AI) €30-60K. Total: €120-260K/year in vendor fees. Plus the CCO's €150-250K salary." },
      ],
    },
    {
      id: 'cco-role',
      heading: 'The Chief Compliance Officer (CCO) role',
      content: [
        { kind: 'p', text: "In every licensed jurisdiction, you must name a senior individual accountable for the AML programme. Different regulators use different titles (MLRO in UK, Compliance Officer + MLRO in EU, BSA Officer + CCO in US), but the role is the same: they sign off on policies, review SARs, interface with regulators, and carry personal liability if things go wrong." },
        { kind: 'h3', text: 'Requirements' },
        { kind: 'ul', items: [
          "Fit-and-proper test from the regulator (clean criminal record, relevant experience, usually AML certification like CAMS or ICA).",
          "Local residency in the licensing jurisdiction (strict in UAE VARA, Singapore MAS, Switzerland FINMA).",
          "Sufficient seniority — cannot be junior or delegated. Typically reports directly to the board.",
          "Personal liability — in some jurisdictions (UK FCA, UAE VARA), the CCO can be personally fined or barred if the AML programme fails.",
        ] },
        { kind: 'callout', tone: 'warn', title: 'Hiring reality', text: "A qualified crypto CCO with fit-and-proper approval is one of the hardest hires in crypto. Expect 3-6 months, $150-300K all-in, and often relocating the person to your licensing juri. Post-2023 enforcement wave, demand is very high." },
      ],
    },
    {
      id: 'xrpl-specifics',
      heading: 'XRPL-specific considerations',
      content: [
        { kind: 'p', text: "If your startup uses XRPL, the core AML stack is the same but there are a few XRPL-specific angles:" },
        { kind: 'h3', text: 'Destination Tag resolution' },
        { kind: 'p', text: "Centralised XRPL wallets pool many users under one address with distinct Destination Tags. Your transaction monitoring must resolve address + tag to customer identity — this isn't something Chainalysis / TRM do automatically for your pool. Custom logic required." },
        { kind: 'h3', text: 'IOU / Trust Line counterparty screening' },
        { kind: 'p', text: "When a user opens a Trust Line to a gateway (issuer), that's a counterparty relationship. You should sanctions-screen the gateway before allowing the trust line. Most chain-analytics vendors don't cover this XRPL primitive — you may need custom code on top of rippled." },
        { kind: 'h3', text: 'freeze / globalFreeze for AML holds' },
        { kind: 'p', text: "XRPL protocol supports freezing individual trust lines (freeze flag) or all (globalFreeze). Use this for OFAC holds without moving the funds. Regulators generally accept this as a valid compliance primitive — it beats the admin-function approach on ERC-20." },
        { kind: 'h3', text: 'rippling behaviour' },
        { kind: 'p', text: "When rippling is enabled on an account's trust lines, payments can route through without explicit consent — which could obscure transaction monitoring. Most compliant gateways disable rippling (NoRipple flag) on issuer accounts." },
        { kind: 'callout', tone: 'key', title: 'Next step', text: "If you're building on XRPL, run the 'Is my XRPL custody custodial?' diagnostic first — custody classification determines which AML obligations kick in." },
      ],
    },
  ],
  relatedTerms: ['KYC', 'KYB', 'AML', 'CFT', 'SAR', 'OFAC', 'Travel Rule', 'FATF', 'CASP', 'MSB'],
  relatedTrees: ['casp', 'xrpl-custody'],
}

export const LEARNING_PATHS: LearningPath[] = [MICA, US_CRYPTO_101, XRPL_CUSTODY, STABLECOIN_FRAMEWORKS, HOWEY, LIECHTENSTEIN, TRAVEL_RULE, TOKENISED_RWA, DUBAI_VARA, KYC_AML_STARTUP]

export function getLearningPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id)
}
