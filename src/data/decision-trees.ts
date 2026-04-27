import type { DecisionTree } from '@/types'

// -----------------------------------------------------------------------------
// Tree 1 — Is my token a security? (Howey Test)
// -----------------------------------------------------------------------------
export const HOWEY_TREE: DecisionTree = {
  id: 'howey',
  title: 'Is my token a security?',
  description: 'Walk through the Howey Test (US SEC) — 4 cumulative criteria that determine if an asset qualifies as a security.',
  icon: '⚖️',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'Is there an investment of money (or other capital) in exchange for the token?',
      hint: 'Includes fiat, crypto, services, or any form of consideration. Airdrops given with no expected contribution may not qualify.',
      choices: [
        { label: 'Yes', next: 'q2' },
        { label: 'No', next: 'out-not-security-1' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Is the money pooled in a common enterprise (shared fate among investors, or tied to promoter success)?',
      hint: 'Courts look at horizontal commonality (investors pooled together) or vertical commonality (investor fate tied to promoter).',
      choices: [
        { label: 'Yes', next: 'q3' },
        { label: 'No', next: 'out-not-security-2' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Do investors have a reasonable expectation of profit?',
      hint: 'Profit includes capital appreciation or cash flow (staking rewards, yield, dividends). Pure utility / consumption ≠ profit expectation.',
      choices: [
        { label: 'Yes', next: 'q4' },
        { label: 'No (pure utility use)', next: 'out-not-security-3' },
      ],
    },
    q4: {
      type: 'question',
      question: 'Do profits come primarily from the efforts of others (team, developers, promoters)?',
      hint: 'This is the key prong for crypto. If a small group drives value, it\'s likely a security. If the protocol is truly decentralized with no identifiable team, SEC enforcement is less clear.',
      choices: [
        { label: 'Yes — a team drives value', next: 'out-likely-security' },
        { label: 'No — protocol is fully decentralized', next: 'out-grey-decentralized' },
        { label: 'No — user\'s own efforts (e.g., active mining/gaming)', next: 'out-not-security-4' },
      ],
    },
    'out-not-security-1': {
      type: 'outcome',
      verdict: 'no',
      title: 'Likely NOT a security',
      explanation: 'Without an investment of money, the Howey test fails at prong 1. This generally covers pure airdrops with no reciprocal action or fees.',
      nextSteps: [
        'Still check FinCEN MSB obligations if you facilitate transfers',
        'Consider state-level money transmitter laws in the US',
        'MiCA still applies in EU — may qualify as Utility Token or crypto-asset',
      ],
      relatedTerms: ['Howey Test', 'SEC', 'Utility Token'],
    },
    'out-not-security-2': {
      type: 'outcome',
      verdict: 'no',
      title: 'Likely NOT a security',
      explanation: 'Without a common enterprise, Howey fails at prong 2. However, courts have found common enterprise broadly in many token cases — this is rare in practice.',
      nextSteps: [
        'Document the lack of pooling to defend the position',
        'Review structure with securities counsel',
      ],
      relatedTerms: ['Howey Test', 'SEC'],
    },
    'out-not-security-3': {
      type: 'outcome',
      verdict: 'no',
      title: 'Likely NOT a security — pure utility',
      explanation: 'If buyers acquire the token purely to consume a service (pay for compute, access content, etc.), there is no profit expectation and Howey prong 3 fails.',
      nextSteps: [
        'Keep marketing strictly functional — no mentions of price appreciation',
        'Be cautious of secondary markets that can trigger reclassification',
        'MiCA Utility Token regime likely applies in EU (whitepaper + NCA notification if >€1M)',
      ],
      relatedTerms: ['Utility Token', 'MiCA', 'Howey Test'],
    },
    'out-not-security-4': {
      type: 'outcome',
      verdict: 'no',
      title: 'Likely NOT a security — user-driven value',
      explanation: 'If the user\'s own active participation (e.g., gameplay, work) drives returns — and not a central team — prong 4 fails.',
      nextSteps: [
        'Document how user effort produces the value',
        'Watch out: this is a narrow exception and SEC scrutinizes GameFi/P2E closely',
      ],
      relatedTerms: ['Howey Test', 'GameFi'],
    },
    'out-likely-security': {
      type: 'outcome',
      verdict: 'yes',
      title: 'LIKELY a security under Howey',
      explanation: 'All 4 prongs satisfied. In the US, issuance and trading would require SEC registration (or exemption: Reg D, Reg S, Reg A+). Secondary trading on unregistered exchanges is prohibited.',
      nextSteps: [
        'Register with SEC or rely on Reg D 506(c) / Reg S / Reg A+',
        'In EU: likely qualifies as transferable security → MiFID II + Prospectus Regulation',
        'Consider DLT Pilot Regime (EU) for tokenized securities',
        'XRPL: can mint as MPT (XLS-33) with lsfRequireAuth for compliance gating',
      ],
      relatedTerms: ['SEC', 'Reg D', 'Reg S', 'Howey Test', 'MiFID II', 'MPT'],
    },
    'out-grey-decentralized': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'GREY ZONE — sufficient decentralization',
      explanation: 'If the network is truly decentralized with no identifiable promoter driving value (post-SEC v. Ripple secondary sales analogy), the token may escape security classification in secondary markets. But early-stage sales by a founding team typically remain securities.',
      nextSteps: [
        'Review SEC v. Ripple (July 2023) — secondary market sales may not be securities',
        'Stage launch: fundraise via Reg D/S, then transition to open market',
        'Document the decentralization milestones',
        'Legal opinion essential — this is unsettled law',
      ],
      relatedTerms: ['SEC v. Ripple', 'Howey Test', 'Decentralization'],
    },
  },
}

// -----------------------------------------------------------------------------
// Tree 2 — Do I need a CASP licence? (MiCA)
// -----------------------------------------------------------------------------
export const CASP_TREE: DecisionTree = {
  id: 'casp',
  title: 'Do I need a CASP licence?',
  description: 'Determine if your service is captured by MiCA\'s Crypto-Asset Service Provider regime in the EU.',
  icon: '🇪🇺',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'Do you serve EU users or market to the EU (by location, language, domain, or active solicitation)?',
      hint: 'MiCA applies extraterritorially if you actively target EU users. Passive availability (no EU marketing) may escape — legal opinion required.',
      choices: [
        { label: 'Yes — I serve or target EU users', next: 'q2' },
        { label: 'No — strictly non-EU', next: 'out-no-casp' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Which service do you provide?',
      choices: [
        { label: 'Custody of clients\' crypto-assets', next: 'out-casp-custody' },
        { label: 'Operating a trading platform / exchange', next: 'out-casp-exchange' },
        { label: 'Exchange crypto for fiat or crypto for crypto', next: 'out-casp-exchange' },
        { label: 'Transfer services for crypto-assets', next: 'out-casp-transfer' },
        { label: 'Portfolio management or investment advice on crypto', next: 'out-casp-advice' },
        { label: 'Placement of crypto-assets (sell offers, underwriting)', next: 'out-casp-placement' },
        { label: 'Reception & transmission of orders', next: 'out-casp-rto' },
        { label: 'None of the above', next: 'q3' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Is your protocol fully decentralized with no identifiable operator, beneficiary, or controlling entity?',
      hint: 'Test: can any single party upgrade, pause, freeze, or extract fees? If yes → operator exists → CASP applies. MiCA Recital 22 exempts truly permissionless DeFi.',
      choices: [
        { label: 'Yes — fully permissionless, no operator', next: 'out-defi-exempt' },
        { label: 'No — someone controls the protocol', next: 'out-grey-operator' },
      ],
    },
    'out-no-casp': {
      type: 'outcome',
      verdict: 'no',
      title: 'No CASP needed — MiCA out of scope',
      explanation: 'If you genuinely do not serve or target EU users, MiCA does not apply. But watch the reverse solicitation rules — EU users actively seeking you out is fine; you marketing to them is not.',
      nextSteps: [
        'Document your geofencing / terms of service EU exclusion',
        'Avoid EU-targeted marketing, French/German/etc. language ads',
        'Still check local regimes (US MSB, UK FCA, Singapore MAS, etc.)',
      ],
      relatedTerms: ['MiCA', 'CASP', 'Reverse Solicitation'],
    },
    'out-casp-custody': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Yes — CASP Art. 75 (Custody)',
      explanation: 'Holding clients\' crypto-assets or means of access triggers MiCA custody obligations. Capital requirement: €350K. Strict safekeeping, segregation, and insurance duties.',
      nextSteps: [
        'Prepare €350K own funds',
        'Set up client asset segregation + insurance',
        'Design key-management policy (cold/warm split, MPC/multisig)',
        'Build SAR/STR procedures + Travel Rule compliance',
        'XRPL note: non-custodial alternatives (Escrow, Payment Channels, SignerList minority) may exempt you — review custody matrix',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 75', 'Custody'],
    },
    'out-casp-exchange': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Yes — CASP Art. 76-78 (Exchange / Trading Platform)',
      explanation: 'Running a trading venue or exchanging crypto for fiat/crypto requires CASP authorization. Capital: €125K (exchange) or €150K (trading platform).',
      nextSteps: [
        'Prepare €125-150K own funds',
        'Build order-book rules, market abuse detection',
        'Implement pre-trade/post-trade transparency per MiCA',
        'Integrate full KYC/KYB + FATF Travel Rule (>€1K)',
      ],
      relatedTerms: ['CASP', 'MiCA', 'Travel Rule'],
    },
    'out-casp-transfer': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Yes — CASP Art. 82 (Transfer Services)',
      explanation: 'Transferring crypto-assets on behalf of clients is a regulated CASP service. Capital: €50K.',
      nextSteps: [
        'Prepare €50K own funds',
        'Travel Rule compliance (originator/beneficiary data)',
        'XRPL note: Payment Channels may qualify if you act as relayer only — legal analysis needed',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 82', 'Travel Rule'],
    },
    'out-casp-advice': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Yes — CASP Art. 83 (Advice / Portfolio Mgmt)',
      explanation: 'Providing personalized recommendations or discretionary management on crypto-assets = regulated. Capital: €50K.',
      nextSteps: [
        'Fit & proper directors + compliance officer',
        'Suitability assessments per client',
        'Disclosure of conflicts of interest',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 83'],
    },
    'out-casp-placement': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Yes — CASP Art. 79 (Placement)',
      explanation: 'Marketing or selling crypto-assets on behalf of an issuer (with or without firm commitment) is regulated. Capital: €50K.',
      nextSteps: [
        'Prepare €50K own funds',
        'Issuer whitepaper must be compliant',
        'Disclose commissions and conflicts',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 79'],
    },
    'out-casp-rto': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Yes — CASP Art. 80 (Reception & Transmission)',
      explanation: 'Receiving client orders and transmitting them to another venue = CASP. Capital: €50K.',
      nextSteps: [
        '€50K own funds',
        'Best execution rules apply',
        'Client classification (retail/pro)',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 80'],
    },
    'out-defi-exempt': {
      type: 'outcome',
      verdict: 'no',
      title: 'Likely exempt — fully decentralized',
      explanation: 'MiCA Recital 22 states: fully decentralized crypto-asset services without intermediary are outside the Regulation\'s scope. But the bar is high — most "DeFi" has some operator.',
      nextSteps: [
        'Document the decentralization test (no upgradeable contracts, no admin keys, no fee collector)',
        'Re-evaluate whenever governance changes',
        'Front-end operators may still be captured — separate the UI from the protocol',
        'Legal opinion strongly advised',
      ],
      relatedTerms: ['MiCA', 'DeFi', 'Decentralization'],
    },
    'out-grey-operator': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'GREY ZONE — legal opinion needed',
      explanation: 'If someone controls the protocol (admin keys, upgradability, fee withdrawal, front-end gating), MiCA likely captures that entity as a CASP. Exact scope depends on the specific service rendered.',
      nextSteps: [
        'Map all control points and identify the operator',
        'Scope each function to the MiCA service list',
        'Consider restructuring toward genuine decentralization',
        'Commission legal opinion from EU crypto counsel',
      ],
      relatedTerms: ['CASP', 'MiCA', 'DeFi'],
    },
  },
}

// -----------------------------------------------------------------------------
// Tree 3 — Is my XRPL custody custodial?
// -----------------------------------------------------------------------------
export const XRPL_CUSTODY_TREE: DecisionTree = {
  id: 'xrpl-custody',
  title: 'Is my XRPL custody custodial?',
  description: 'Route your setup through the 10 XRPL custody methods and get a clear custodial / non-custodial / grey classification.',
  icon: '🔐',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'Does your service hold the Master Key of the user\'s XRPL account?',
      hint: 'If the service alone holds the master key, it controls the full account.',
      choices: [
        { label: 'Yes — we hold the Master Key', next: 'out-single-key' },
        { label: 'No — user holds Master Key (or it\'s disabled)', next: 'q2' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Do you use a Regular Key (secondary key assigned via SetRegularKey)?',
      choices: [
        { label: 'Yes — service controls the Regular Key', next: 'q2a' },
        { label: 'No', next: 'q3' },
      ],
    },
    q2a: {
      type: 'question',
      question: 'Can the user still sign with their Master Key (not disabled)?',
      choices: [
        { label: 'Yes — user retains Master Key', next: 'out-regular-key-grey' },
        { label: 'No — Master Key disabled, service alone signs', next: 'out-single-key' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Do you use SignerList (XRPL native M-of-N multisig)?',
      choices: [
        { label: 'Yes', next: 'q3a' },
        { label: 'No', next: 'q4' },
      ],
    },
    q3a: {
      type: 'question',
      question: 'Can the service alone reach the signing quorum (enough weight to authorize a transaction)?',
      hint: 'Example: 2-of-3 where service holds 1 of 3 keys → cannot act alone → non-custodial argument. Service holds 2-of-3 → custodial.',
      choices: [
        { label: 'No — service needs user cooperation', next: 'out-signerlist-minority' },
        { label: 'Yes — service can sign alone', next: 'out-signerlist-majority' },
      ],
    },
    q4: {
      type: 'question',
      question: 'Do you use MPC / TSS (threshold signatures, key never exists in full)?',
      hint: 'Not native to XRPL — implemented at application layer (Fireblocks, Qredo, etc.).',
      choices: [
        { label: 'Yes', next: 'out-mpc-grey' },
        { label: 'No', next: 'q5' },
      ],
    },
    q5: {
      type: 'question',
      question: 'Are funds locked in an on-ledger protocol object (Escrow, Payment Channel, Check)?',
      hint: 'These primitives enforce release conditions at the protocol level — no third-party control.',
      choices: [
        { label: 'Yes — Escrow / Payment Channel / Check', next: 'out-protocol-primitive' },
        { label: 'No', next: 'q6' },
      ],
    },
    q6: {
      type: 'question',
      question: 'Do you issue IOUs / Trust Lines as a gateway (representing off-chain assets like fiat, commodities)?',
      hint: 'Gateways hold the underlying asset off-chain and issue IOU tokens on-chain. Users hold claims against the gateway.',
      choices: [
        { label: 'Yes — we\'re a gateway (RLUSD-like)', next: 'out-iou-gateway' },
        { label: 'No', next: 'q7' },
      ],
    },
    q7: {
      type: 'question',
      question: 'Is it an NFT (XLS-20) marketplace using broker mode (atomic swap of buy + sell offers)?',
      choices: [
        { label: 'Yes — XLS-20 broker mode', next: 'out-nft-broker' },
        { label: 'No — different setup', next: 'out-specify' },
      ],
    },
    'out-single-key': {
      type: 'outcome',
      verdict: 'yes',
      title: 'CUSTODIAL — Single Key control',
      explanation: 'Your service alone controls the signing key → full control over the account. This is the clearest custodial setup.',
      nextSteps: [
        'EU: CASP Art. 75 MiCA mandatory (€350K capital)',
        'US: FinCEN MSB + State MTLs likely',
        'Implement cold storage, HSM, segregation, insurance',
        'Consider migrating to SignerList minority or MPC for better security',
      ],
      relatedTerms: ['CASP', 'Custody', 'Master Key'],
    },
    'out-regular-key-grey': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'GREY ZONE — Regular Key with user retaining Master',
      explanation: 'User retains ultimate control (can rotate Regular Key anytime via Master), but service can sign routine transactions. Regulatory classification depends on the use pattern and agreement.',
      nextSteps: [
        'Document the shared-control setup',
        'EU: may qualify as custody depending on ESMA interpretation — legal opinion',
        'Consider switching to SignerList for clearer non-custodial argument',
      ],
      relatedTerms: ['Regular Key', 'Custody', 'CASP'],
    },
    'out-signerlist-minority': {
      type: 'outcome',
      verdict: 'no',
      title: 'NON-CUSTODIAL — SignerList with service in minority',
      explanation: 'Service holds fewer keys than the quorum requires → cannot sign alone → no unilateral control → strong non-custodial argument.',
      nextSteps: [
        'Disable Master Key (lsfDisableMaster) for pure multisig',
        'Document the setup in your ToS',
        'EU: CASP likely NOT required — but confirm with counsel (ESMA hasn\'t ruled on specific multisig topologies)',
        'Strong regulatory posture for institutional offerings',
      ],
      relatedTerms: ['SignerList', 'Multisig', 'Custody'],
    },
    'out-signerlist-majority': {
      type: 'outcome',
      verdict: 'yes',
      title: 'CUSTODIAL — SignerList with service majority',
      explanation: 'Service holds enough keys to reach quorum alone → custodial treatment. Same obligations as Single Key.',
      nextSteps: [
        'EU: CASP Art. 75 MiCA applies',
        'Reconsider topology — minority setup (service = 1 of N, quorum > 1) gives non-custodial treatment',
      ],
      relatedTerms: ['SignerList', 'Custody', 'CASP'],
    },
    'out-mpc-grey': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'GREY ZONE — MPC / TSS',
      explanation: 'No single party ever holds the full key. Strong technical argument for non-custodial, but ESMA and FCA have not issued definitive guidance. Classification depends on: who triggers signing, who has veto power, and the threshold.',
      nextSteps: [
        'Document the t-of-n topology and signing workflow',
        'User retains at least 1 share with veto power → strongest argument',
        'Commission legal opinion (Fireblocks, Qredo have reference analyses)',
        'Some regulators (e.g., HKMA) are more open to MPC non-custodial treatment',
      ],
      relatedTerms: ['MPC', 'TSS', 'Custody'],
    },
    'out-protocol-primitive': {
      type: 'outcome',
      verdict: 'no',
      title: 'NON-CUSTODIAL — protocol-enforced',
      explanation: 'Funds locked in Escrow / Payment Channel / Check are released by ledger rules, not by a third party. No CASP licence required for the custody itself.',
      nextSteps: [
        'Services around (e.g., fiat off-ramp, conversion) may still trigger CASP',
        'Payment Channels: check if you\'re a relayer — may trigger transfer services CASP',
        'Document the primitives used in your ToS',
      ],
      relatedTerms: ['Escrow', 'Payment Channel', 'Checks'],
    },
    'out-iou-gateway': {
      type: 'outcome',
      verdict: 'yes',
      title: 'CUSTODIAL — IOU Gateway',
      explanation: 'A gateway holds off-chain assets and issues on-chain IOUs → users hold claims → custodial by definition. Fiat-backed IOUs also trigger e-money rules.',
      nextSteps: [
        'EU: CASP Art. 75 + EMI licence if fiat-backed (EMT under MiCA)',
        'RLUSD is the reference implementation — Ripple as EMT issuer',
        'Implement freeze / globalFreeze for compliance controls',
        'Use RequireAuth for KYC gating on-chain',
      ],
      relatedTerms: ['IOU', 'Trust Line', 'RLUSD', 'EMT', 'CASP'],
    },
    'out-nft-broker': {
      type: 'outcome',
      verdict: 'no',
      title: 'NON-CUSTODIAL — XLS-20 Broker mode',
      explanation: 'Broker mode uses atomic swaps of buy + sell offers on-ledger. The broker never holds the NFT. No CASP licence required.',
      nextSteps: [
        'Implement NFTokenCreateOffer + NFTokenAcceptOffer with both IDs',
        'Royalties via TransferFee are protocol-enforced',
        'Document the broker model in your ToS',
      ],
      relatedTerms: ['NFT', 'XLS-20', 'Broker Mode'],
    },
    'out-specify': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'Specify your setup',
      explanation: 'Your custody setup doesn\'t match the 10 standard patterns. Likely a custom architecture — classification requires case-by-case analysis.',
      nextSteps: [
        'Map every signing key and who holds it',
        'Map every on-ledger object involved (AccountRoot, SignerList, Escrow, etc.)',
        'Consult the XRPL Custody Matrix in the XRPL Hub',
        'Commission legal opinion',
      ],
      relatedTerms: ['Custody', 'XRPL'],
    },
  },
}

// -----------------------------------------------------------------------------
// Tree 4 — Which jurisdiction should I choose?
// -----------------------------------------------------------------------------
export const JURISDICTION_TREE: DecisionTree = {
  id: 'jurisdiction',
  title: 'Which jurisdiction should I choose?',
  description: 'Arbitrate between speed, cost, market access, and reputation to pick your starting jurisdiction.',
  icon: '🌍',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'What is your top priority?',
      choices: [
        { label: 'Time to market — get live ASAP', next: 'out-speed' },
        { label: 'Low cost — minimize capital and fees', next: 'out-cost' },
        { label: 'Access to a specific market', next: 'q2' },
        { label: 'Reputation — institutional credibility', next: 'q3' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Which market are you targeting first?',
      choices: [
        { label: 'European Union', next: 'out-market-eu' },
        { label: 'United States', next: 'out-market-us' },
        { label: 'Asia — retail', next: 'out-market-asia-retail' },
        { label: 'Asia — institutional', next: 'out-market-asia-inst' },
        { label: 'MENA / Gulf', next: 'out-market-mena' },
        { label: 'Latin America', next: 'out-market-latam' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Innovation-friendly or stability-first?',
      choices: [
        { label: 'Innovation-friendly, fast-moving', next: 'out-rep-innovation' },
        { label: 'Stability-first, mature regulation', next: 'out-rep-stability' },
      ],
    },
    'out-speed': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Liechtenstein TVTG (3–9 months)',
      explanation: 'TVTG is the fastest progressive framework globally. 14 service-provider types cover most crypto activities. EEA passporting means you can market into all 27 EU states once authorized.',
      nextSteps: [
        'Pick the right SP type (Token Exchange, Token Custodian, etc.)',
        'Budget CHF 15–80K + fit-and-proper directors',
        'Start whitepaper + AML program in parallel',
        'Alternative: Switzerland FINMA VQF/SRO (6–12 months)',
      ],
      relatedTerms: ['TVTG', 'Liechtenstein', 'FMA'],
    },
    'out-cost': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Liechtenstein or Switzerland',
      explanation: 'TVTG caps capital at the service-provider type level (CHF 15–80K). Switzerland VQF/SRO is even leaner for pure AML compliance. Both are far cheaper than MiCA (€50–350K) or US (€200K+ legal).',
      nextSteps: [
        'Compare SP types vs activity cost',
        'Consider EEA passporting from Liechtenstein into EU',
        'Low-cost fallback: Seychelles or BVI for early-stage, non-EU operations',
      ],
      relatedTerms: ['TVTG', 'VQF', 'FINMA'],
    },
    'out-market-eu': {
      type: 'outcome',
      verdict: 'yes',
      title: 'France (AMF) or Lithuania / Malta as MiCA hub',
      explanation: 'MiCA passport means one licence covers all 27 EU states. Lithuania and Malta are historically fastest for crypto authorization (~6 months). France has stronger institutional reputation but slower (~12-18 months).',
      nextSteps: [
        'Choose hub on: speed (LT/MT), reputation (FR/DE), or tax (IE/LU)',
        'Budget €50–350K capital + €100–500K setup',
        'Plan 12–18 months for full CASP',
        'Consider Liechtenstein TVTG + EEA passport as fast-track',
      ],
      relatedTerms: ['MiCA', 'CASP', 'AMF'],
    },
    'out-market-us': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Wyoming LLC + federal MSB',
      explanation: 'Wyoming offers crypto-friendly LLCs (SPDI charter for banks). Federal FinCEN MSB registration is required. Then state-by-state MTLs needed for commercial activity (48 states, ~$500K–$1M total). Avoid NY initially (BitLicense is its own beast).',
      nextSteps: [
        'Federal FinCEN MSB first',
        'Prioritize 10–15 key states by user volume',
        'Stay out of NY, CT, HI initially',
        'Federal SEC risk if token = security (Howey)',
        'Consider Wyoming SPDI for custody',
      ],
      relatedTerms: ['FinCEN', 'MSB', 'MTL', 'BitLicense'],
    },
    'out-market-asia-retail': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Singapore MAS',
      explanation: 'MAS PSA offers MPI (Major Payment Institution) or SPI (Standard). Clear retail rules, English law, strong ecosystem. ~6–12 months, SGD 50–150K.',
      nextSteps: [
        'Pick MPI (>SGD 3M/month) or SPI tier',
        'Set up Singapore entity + local director',
        'Travel Rule + robust AML program',
        'Alternative: Hong Kong SFC VASP for HK retail',
      ],
      relatedTerms: ['MAS', 'PSA', 'DPT'],
    },
    'out-market-asia-inst': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Hong Kong SFC VASP (VATP)',
      explanation: 'Hong Kong\'s VATP regime is designed for regulated trading platforms serving professional investors (retail now allowed under strict conditions). Strong mainland China-facing institutional flow.',
      nextSteps: [
        'SFC VASP licence (~12–18 months)',
        'HKD 500K–2M capital + Type 1 if securities',
        'Cold storage >98% + retail safeguards',
        'Alternative: Singapore MPI for pan-Asia reach',
      ],
      relatedTerms: ['SFC', 'VASP', 'VATP', 'HKMA'],
    },
    'out-market-mena': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Dubai VARA or Abu Dhabi ADGM',
      explanation: 'VARA (Dubai) and ADGM (Abu Dhabi) both offer VASP licences. VARA is newer and more startup-friendly; ADGM has English common-law courts. ~6–12 months, $50–150K.',
      nextSteps: [
        'Pick VARA (Dubai city, consumer-facing) or ADGM (Abu Dhabi, institutional)',
        'Local director + office required',
        'Capital + tech audit',
        'Gateway to Saudi, Egypt, wider Gulf markets',
      ],
      relatedTerms: ['VARA', 'ADGM', 'FSRA'],
    },
    'out-market-latam': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Brazil BCB / CVM',
      explanation: 'Brazil\'s crypto law (Lei 14.478/2022) brings VASPs under BCB supervision. CVM handles security tokens. Large, crypto-friendly market — 10%+ adoption.',
      nextSteps: [
        'BCB VASP registration (emerging, timelines firming up)',
        'CVM for tokenized securities',
        'Local tax structure (PJ in Brazil)',
        'Portuguese-language compliance + marketing',
      ],
      relatedTerms: ['BCB', 'CVM', 'Brazil'],
    },
    'out-rep-innovation': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Switzerland FINMA (Crypto Valley)',
      explanation: 'FINMA has a clear token taxonomy (payment / utility / asset) since 2018. Crypto Valley (Zug) hosts Ethereum Foundation, Tezos, Cardano, Polkadot. DLT Act adds tokenized securities framework.',
      nextSteps: [
        'VQF or SRO for AML',
        'FINMA FinTech licence (CHF 100M deposit cap, lighter than bank)',
        'DLT Trading Facility if running an exchange',
        'Crypto Valley ecosystem = talent + network',
      ],
      relatedTerms: ['FINMA', 'VQF', 'SRO', 'DLT Act'],
    },
    'out-rep-stability': {
      type: 'outcome',
      verdict: 'yes',
      title: 'EU MiCA (France AMF / Germany BaFin)',
      explanation: 'MiCA is the most comprehensive crypto regulation globally. Strong institutional recognition, clear rulebook, 27-state passport. Slower and costlier but highest credibility.',
      nextSteps: [
        'France AMF (CASP + DASP) or Germany BaFin (CASP + KWG where relevant)',
        '12–18 months timeline, €50–350K capital',
        'EU-wide marketing + institutional trust',
      ],
      relatedTerms: ['MiCA', 'CASP', 'AMF', 'BaFin'],
    },
  },
}

export const MICA_CLASSIFICATION_TREE: DecisionTree = {
  "id": "mica-classification",
  "title": "How is my token classified under MiCA?",
  "description": "Walk through MiCA's 3-tier taxonomy — E-Money Token (EMT), Asset-Referenced Token (ART), or Other crypto-asset. The classification dictates which licence and obligations apply.",
  "icon": "🪙",
  "rootId": "q1",
  "nodes": {
    "q1": {
      "type": "question",
      "question": "Is your token pegged 1:1 to a single official fiat currency (EUR, USD, GBP, JPY, CHF…) ?",
      "hint": "EMT requires single-currency peg. RLUSD (USD), EURC, USDC, USDT all qualify. A token referencing multiple currencies or anything else is NOT an EMT.",
      "choices": [
        {
          "label": "Yes — single fiat peg",
          "next": "q2"
        },
        {
          "label": "No",
          "next": "q3"
        }
      ]
    },
    "q2": {
      "type": "question",
      "question": "Will the issuer maintain a reserve (cash + HQLA) and offer redemption at par to any holder, on demand, T+1 ?",
      "hint": "MiCA Art. 49 + 50 require redemption at par + reserve composition. Cannot pay interest to holders. Issuer must be EMI or credit institution.",
      "choices": [
        {
          "label": "Yes",
          "next": "out-emt"
        },
        {
          "label": "No / not sure",
          "next": "out-emt-non-compliant"
        }
      ]
    },
    "q3": {
      "type": "question",
      "question": "Is the token's value referenced to ANY of: a basket of currencies, commodities (gold, oil…), crypto-assets, real-world assets (real estate, bonds…), or any combination ?",
      "hint": "ART covers everything-except-single-fiat-peg that has a stabilisation mechanism. Gold-backed tokens, crypto-basket tokens, multi-fiat baskets, RWA-backed stablecoins all fall here.",
      "choices": [
        {
          "label": "Yes — multi-asset / non-fiat reference",
          "next": "q4"
        },
        {
          "label": "No reference / no stabilisation mechanism",
          "next": "q5"
        }
      ]
    },
    "q4": {
      "type": "question",
      "question": "Will the issuer hold a reserve of those reference assets (or equivalent) and disclose its composition publicly ?",
      "hint": "MiCA Art. 35 + 36 — reserve transparency, segregation, daily monitoring for significant ART (>€5B / >10M holders). Issuer authorised by home NCA.",
      "choices": [
        {
          "label": "Yes",
          "next": "out-art"
        },
        {
          "label": "No / not sure",
          "next": "out-art-non-compliant"
        }
      ]
    },
    "q5": {
      "type": "question",
      "question": "Does the token have an identifiable issuer or centralised offering (e.g. ICO, IDO, foundation distribution) ?",
      "hint": "Bitcoin and pre-2024 truly-decentralised tokens that pre-date MiCA may escape the classification entirely. Anything launched with a clear issuer falls under 'Other crypto-asset'.",
      "choices": [
        {
          "label": "Yes — identifiable issuer",
          "next": "out-other-crypto-asset"
        },
        {
          "label": "No — fully decentralised, no central origin",
          "next": "out-out-of-scope"
        }
      ]
    },
    "out-emt": {
      "type": "outcome",
      "verdict": "yes",
      "title": "EMT — E-Money Token (MiCA Title III)",
      "explanation": "Your token is an E-Money Token. The issuer must be an authorised Electronic Money Institution (EMI) or credit institution. Whitepaper notification + redemption-at-par + reserve segregation are mandatory.",
      "nextSteps": [
        "Issuer needs EMI authorisation (EMD2, becoming EMD3) OR credit-institution status",
        "File MiCA whitepaper with home NCA before any offering",
        "1:1 reserve in cash + HQLA, segregated bankruptcy-remote",
        "Cannot pay interest or yield to holders (MiCA Art. 50)",
        "If >€5B issued or >10M holders → Significant EMT (S-EMT) → ECB direct supervision",
        "XRPL angle: RLUSD is the reference EMT-on-XRPL implementation (IOU / Trust Line model)"
      ],
      "relatedTerms": [
        "EMT",
        "MiCA",
        "EMI",
        "S-EMT",
        "RLUSD"
      ]
    },
    "out-emt-non-compliant": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "EMT path — non-compliant structure",
      "explanation": "Your token aims to be an EMT but the redemption / reserve mechanics don't meet MiCA Art. 49-50. Without these, you cannot operate as an EMT in the EU.",
      "nextSteps": [
        "Restructure: appoint EMI or partner with credit institution",
        "Implement T+1 redemption at par + 1:1 cash + HQLA reserve",
        "Or pivot to ART path (asset-referenced) if a basket structure suits",
        "Or pivot to Other crypto-asset path with no peg claim — but you cannot market as a stablecoin"
      ],
      "relatedTerms": [
        "EMT",
        "MiCA",
        "ART"
      ]
    },
    "out-art": {
      "type": "outcome",
      "verdict": "yes",
      "title": "ART — Asset-Referenced Token (MiCA Title IV)",
      "explanation": "Your token is an Asset-Referenced Token. Authorisation by your home NCA is mandatory before offering. Reserve composition + transparency rules apply.",
      "nextSteps": [
        "File ART authorisation application with home NCA",
        "MiCA whitepaper + reserve composition disclosure",
        "Reserve assets segregated, daily monitoring",
        "If >€5B issued or >10M holders → Significant ART (S-ART) → ECB + EBA direct supervision",
        "Marketing restrictions: no investment promises, no yield (MiCA Art. 40)"
      ],
      "relatedTerms": [
        "ART",
        "MiCA",
        "S-ART",
        "EBA"
      ]
    },
    "out-art-non-compliant": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "ART path — non-compliant structure",
      "explanation": "Your token references multiple assets but you don't plan to back it with a verifiable reserve. This is not a viable ART under MiCA.",
      "nextSteps": [
        "Restructure with audited reserve + transparency mechanism",
        "Or drop the stabilisation claim → token becomes Other crypto-asset",
        "Synthetic / algorithmic stablecoins are NOT permitted as ART under MiCA"
      ],
      "relatedTerms": [
        "ART",
        "MiCA"
      ]
    },
    "out-other-crypto-asset": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Other crypto-asset (MiCA Title II)",
      "explanation": "Your token falls under MiCA's lightest path — Other crypto-asset. Whitepaper notification (not full authorisation) is sufficient. Suitable for utility tokens, governance tokens, and most Web3-native tokens.",
      "nextSteps": [
        "Notify whitepaper to home NCA (Art. 8) — no authorisation, just notification",
        "12-month liability for whitepaper accuracy (Art. 14)",
        "Marketing must be consistent with whitepaper (Art. 7)",
        "No investment / yield promises (Art. 7-9 marketing rules)",
        "CASP licence required for distribution / trading platforms",
        "XRPL angle: MPT (XLS-33) is purpose-built for this category — programmable compliance flags align well"
      ],
      "relatedTerms": [
        "Other crypto-asset",
        "MiCA",
        "Utility Token",
        "CASP",
        "MPT"
      ]
    },
    "out-out-of-scope": {
      "type": "outcome",
      "verdict": "no",
      "title": "Out of MiCA scope (rare)",
      "explanation": "Truly decentralised tokens with no identifiable issuer and no central distribution may fall outside MiCA — this realistically applies to Bitcoin and a few pre-2024 protocol-native tokens. New launches almost never qualify.",
      "nextSteps": [
        "Verify there is genuinely no issuer / promoter / foundation",
        "CASPs trading the token still need MiCA authorisation — only the asset itself escapes",
        "A legal opinion is essential — ESMA Q&A on 'fully decentralised' is narrow"
      ],
      "relatedTerms": [
        "MiCA",
        "Decentralisation",
        "CASP"
      ]
    }
  }
};

export const GENIUS_STABLECOIN_TREE: DecisionTree = {
  "id": "genius-stablecoin",
  "title": "Am I in scope of the GENIUS Act?",
  "description": "The GENIUS Act (signed July 2025) establishes the US federal framework for payment stablecoins. Walk through the eligibility + path-selection logic.",
  "icon": "💵",
  "rootId": "q1",
  "nodes": {
    "q1": {
      "type": "question",
      "question": "Is your token a 'payment stablecoin' — designed to maintain stable value (typically pegged 1:1 to USD) and used for payments / transfers ?",
      "hint": "GENIUS targets payment stablecoins specifically (USDC, USDT, RLUSD on XRPL, PYUSD…). Not yield-bearing, not algorithmic, not commodity-backed. Tokens with security characteristics fall under SEC instead.",
      "choices": [
        {
          "label": "Yes — USD-pegged payment stablecoin",
          "next": "q2"
        },
        {
          "label": "No — algorithmic / yield / commodity-backed / non-USD",
          "next": "out-not-stablecoin"
        }
      ]
    },
    "q2": {
      "type": "question",
      "question": "Will reserves be held in cash + short-term US Treasuries (<93 days maturity) + repos, with monthly disclosures ?",
      "hint": "GENIUS Sec. 4 — strict reserve composition rules. CFO-signed monthly disclosures + annual independent attestation. No bank deposits beyond FDIC-insured limits. No commercial paper, no corporate bonds.",
      "choices": [
        {
          "label": "Yes",
          "next": "q3"
        },
        {
          "label": "No / not sure",
          "next": "out-not-genius-compliant"
        }
      ]
    },
    "q3": {
      "type": "question",
      "question": "Where is the issuer located ?",
      "hint": "GENIUS allows three paths: (a) US federal-qualified, (b) US state-qualified (under $10B issued), (c) foreign issuer from a 'comparable regime' jurisdiction (reciprocity).",
      "choices": [
        {
          "label": "US-incorporated",
          "next": "q4"
        },
        {
          "label": "Foreign — comparable regime (EU MiCA, Singapore MAS, UK FCA…)",
          "next": "out-passportable"
        },
        {
          "label": "Foreign — other (no comparable regime)",
          "next": "out-not-eligible"
        }
      ]
    },
    "q4": {
      "type": "question",
      "question": "Are you targeting more than $10B in issued market cap ?",
      "hint": "GENIUS dual-path: federal OCC Payment Stablecoin Issuer charter required above $10B. State-qualified path available below $10B.",
      "choices": [
        {
          "label": "Yes — over $10B",
          "next": "out-federal-occ"
        },
        {
          "label": "No — under $10B",
          "next": "q5"
        }
      ]
    },
    "q5": {
      "type": "question",
      "question": "Will you offer the stablecoin to users in multiple US states ?",
      "hint": "Federal OCC charter automatically covers all 50 states. State-qualified path requires per-state authorisations (each state has its own qualifying-issuer rules).",
      "choices": [
        {
          "label": "Yes — multi-state distribution",
          "next": "out-federal-or-state-multi"
        },
        {
          "label": "No — single state initially",
          "next": "out-state-qualified"
        }
      ]
    },
    "out-not-stablecoin": {
      "type": "outcome",
      "verdict": "no",
      "title": "Outside GENIUS Act scope",
      "explanation": "Your token isn't a payment stablecoin in the GENIUS sense. Algorithmic, commodity-backed, yield-bearing, or non-USD tokens fall under different US frameworks (SEC for security tokens, CFTC for commodities).",
      "nextSteps": [
        "Assess SEC classification (run the Howey Test diagnostic)",
        "CFTC may apply for commodity-backed tokens",
        "State-level money transmitter laws may still apply if you facilitate transfers",
        "For non-USD stablecoins (EUR, GBP…) → MiCA EMT path applies in EU"
      ],
      "relatedTerms": [
        "GENIUS Act",
        "SEC",
        "CFTC",
        "Howey Test",
        "MTL"
      ]
    },
    "out-not-genius-compliant": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "GENIUS-non-compliant reserve composition",
      "explanation": "Your reserve mix doesn't meet GENIUS Sec. 4 standards. You cannot operate as a GENIUS-qualified stablecoin issuer in the US — but you can restructure.",
      "nextSteps": [
        "Restructure reserves: cash + short-term US Treasuries (<93d) + repos only",
        "Implement monthly CFO-signed disclosures + annual independent attestation",
        "Or pivot to MiCA EMT path (broader HQLA acceptance) for EU markets",
        "Or operate as a non-stablecoin token without peg claim (but lose the use case)"
      ],
      "relatedTerms": [
        "GENIUS Act",
        "EMT",
        "MiCA"
      ]
    },
    "out-passportable": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Foreign issuer — passportable into the US",
      "explanation": "GENIUS includes a reciprocity / comparable-regime pathway for foreign issuers. EU MiCA, Singapore MAS, UK FCA frameworks are likely to qualify. You can distribute to US persons subject to mutual-recognition determination by Treasury / OCC.",
      "nextSteps": [
        "Confirm your home regime is on the comparable-regime list (Treasury determination ongoing)",
        "Register as foreign issuer with FinCEN + OCC supervision",
        "Maintain home-regime authorisation (no double licensing)",
        "OFAC sanctions screening still applies to all US-facing distribution",
        "XRPL angle: RLUSD (US-issued by Standard Custody / Ripple) is on the federal path; foreign-EU-EMT issuers can passport"
      ],
      "relatedTerms": [
        "GENIUS Act",
        "MiCA",
        "EMT",
        "OFAC"
      ]
    },
    "out-not-eligible": {
      "type": "outcome",
      "verdict": "no",
      "title": "Foreign issuer — not eligible without restructuring",
      "explanation": "Your home jurisdiction is not on the comparable-regime list. You cannot lawfully distribute the stablecoin to US persons under GENIUS. Distribution to US-based wallets must be blocked.",
      "nextSteps": [
        "Geo-block US users + IP filtering at the on-ramp / wallet level",
        "Restructure: open a US-incorporated subsidiary as the GENIUS issuer",
        "Or wait for home-regime to obtain comparable-regime determination",
        "Compliance with US sanctions still applies even if not actively distributing"
      ],
      "relatedTerms": [
        "GENIUS Act",
        "OFAC"
      ]
    },
    "out-federal-occ": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Federal path — OCC Payment Stablecoin Issuer charter required",
      "explanation": "At >$10B issued, GENIUS mandates the federal path. You need an OCC Payment Stablecoin Issuer charter. Application + supervision under OCC, with FDIC-style oversight on reserve management.",
      "nextSteps": [
        "File OCC Payment Stablecoin Issuer application",
        "Establish reserve composition + monthly CFO disclosures from day one",
        "Bankruptcy-remote reserve segregation",
        "Annual independent attestation by registered audit firm",
        "Real-time redemption volume dashboard for OCC supervision",
        "Examples: USDC (Circle, going federal), RLUSD (Ripple via Standard Custody)"
      ],
      "relatedTerms": [
        "GENIUS Act",
        "OCC charter",
        "FinCEN"
      ]
    },
    "out-federal-or-state-multi": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "Federal OCC OR multi-state qualified — your choice",
      "explanation": "Under $10B and multi-state, you have flexibility: (a) federal OCC charter (broader but slower / pricier) or (b) accumulate state-qualified issuer authorisations across the states you target.",
      "nextSteps": [
        "Decision driver: OCC charter ~12-24 months, ~$1M-2M setup. State-qualified ~6-12 months per state.",
        "Federal preempts state requirements — simpler ongoing compliance",
        "State-qualified is cheaper initially but compliance overhead scales linearly with states",
        "Most >$1B issuers go federal eventually anyway — consider going federal from day one"
      ],
      "relatedTerms": [
        "GENIUS Act",
        "OCC charter",
        "MTL",
        "BitLicense"
      ]
    },
    "out-state-qualified": {
      "type": "outcome",
      "verdict": "yes",
      "title": "State-qualified path — single-state issuer",
      "explanation": "Single-state, sub-$10B, US-incorporated → state-qualified path is the lightest fit. Each state defines its own qualifying-issuer rules; popular hubs are NY (NYDFS Trust charter), SD (South Dakota Trust charter), and Wyoming.",
      "nextSteps": [
        "NYDFS Trust charter (most demanding but most recognized) — or similar State Trust",
        "Wyoming Special Purpose Depository Institution (SPDI) — newer, crypto-friendly",
        "SD State Trust — used by BitGo, fast path",
        "6-12 months timeline · $300K-$700K setup",
        "Reserve composition + monthly disclosures still apply (GENIUS overrides state)"
      ],
      "relatedTerms": [
        "GENIUS Act",
        "NY Trust Charter",
        "South Dakota Trust Charter",
        "NYDFS"
      ]
    }
  }
};

export const TRAVEL_RULE_TREE: DecisionTree = {
  "id": "travel-rule",
  "title": "Does the FATF Travel Rule apply to me?",
  "description": "Determine if your activity triggers Travel Rule data-exchange obligations and which jurisdictional threshold applies — the EU, US, UK, Singapore, and FATF baseline thresholds all differ.",
  "icon": "🛂",
  "rootId": "q1",
  "nodes": {
    "q1": {
      "type": "question",
      "question": "Do you operate as a Virtual Asset Service Provider (VASP) — exchange, custodian, broker, transfer service, or fiat on/off-ramp ?",
      "hint": "FATF R.15 captures any business that, as a service for or on behalf of another natural or legal person, conducts virtual-asset transfers or related activities. Wallet-software-only providers without custody are typically outside scope.",
      "choices": [
        {
          "label": "Yes — I'm a VASP",
          "next": "q2"
        },
        {
          "label": "No — non-custodial wallet software / pure protocol",
          "next": "out-not-vasp"
        }
      ]
    },
    "q2": {
      "type": "question",
      "question": "Does your service involve transferring crypto-assets between two parties (sender + beneficiary) ?",
      "hint": "Travel Rule fires on TRANSFERS specifically. Pure custody where assets stay on the same account doesn't trigger it; transfers between accounts (yours-to-yours, yours-to-another-VASP, yours-to-self-custody) do.",
      "choices": [
        {
          "label": "Yes — I move assets between parties",
          "next": "q3"
        },
        {
          "label": "No — pure custody / no transfers initiated",
          "next": "out-no-transfer"
        }
      ]
    },
    "q3": {
      "type": "question",
      "question": "Which jurisdictions are involved in the transfer (sender VASP and beneficiary VASP) ?",
      "hint": "Each jurisdiction has its own Travel Rule threshold. Apply the strictest for any cross-border flow. Crypto-to-crypto within the EU has no de minimis since TFR Reg. 2023/1113 (Dec 2024).",
      "choices": [
        {
          "label": "Both inside the EU (TFR Reg. 2023/1113)",
          "next": "out-eu-tfr"
        },
        {
          "label": "US involved (FinCEN BSA Travel Rule)",
          "next": "out-us-bsa"
        },
        {
          "label": "Singapore involved (MAS PSA)",
          "next": "out-sg-mas"
        },
        {
          "label": "UK involved (FCA Travel Rule, Sept 2023+)",
          "next": "out-uk-trr"
        },
        {
          "label": "Multiple / mixed / other",
          "next": "out-mixed"
        }
      ]
    },
    "out-not-vasp": {
      "type": "outcome",
      "verdict": "no",
      "title": "Travel Rule does NOT apply — non-VASP",
      "explanation": "If you genuinely operate non-custodial wallet software (Xaman / Lobstr-style) or pure protocol code with no service component, FATF R.15 doesn't reach you. The user signs their own transactions; you don't handle the transfer as a service.",
      "nextSteps": [
        "Validate the non-custodial framing in your terms / architecture",
        "No KYC obligations on the protocol layer — but downstream operators may need them",
        "Watch out: adding any custody / fiat on-ramp / broker service flips you into VASP status",
        "EU TFR Reg. 2023/1113 has a narrow self-hosted-wallet carve-out for crypto-to-crypto transfers"
      ],
      "relatedTerms": [
        "VASP",
        "FATF",
        "Travel Rule"
      ]
    },
    "out-no-transfer": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "Travel Rule typically doesn't fire on pure custody",
      "explanation": "Custody-only services (assets stay on the same account, no movement) generally don't trigger Travel Rule data exchange. But many regulators apply VASP AML obligations to custody anyway, and any movement at exit triggers Travel Rule.",
      "nextSteps": [
        "Verify your 'pure custody' framing is accurate — most custodians offer transfer functionality",
        "AML / KYC at onboarding still required (separate from Travel Rule)",
        "Suspicious Transaction Reports still required (jurisdictional)",
        "When transfers do happen → re-run this diagnostic with the correct jurisdiction set"
      ],
      "relatedTerms": [
        "VASP",
        "AML",
        "Travel Rule"
      ]
    },
    "out-eu-tfr": {
      "type": "outcome",
      "verdict": "yes",
      "title": "EU — Transfer of Funds Regulation 2023/1113 applies (no de minimis)",
      "explanation": "In the EU, the TFR (Reg. 2023/1113, applicable Dec 2024) extends Travel Rule to all crypto-asset transfers regardless of amount — there is NO threshold. Originator + beneficiary data must accompany every transfer between CASPs.",
      "nextSteps": [
        "No de minimis — every transfer of any amount triggers Travel Rule data",
        "Required data: originator name, account/wallet, address (for >€1K), ID number",
        "Required data on beneficiary side: name, account/wallet (address only for >€1K)",
        "Self-hosted wallet transfers >€1K trigger additional verification (TFR Art. 14b)",
        "Use a Travel Rule technical solution (TRP, TRUST, OpenVASP, Sumsub Travel Rule…)"
      ],
      "relatedTerms": [
        "Travel Rule",
        "TFR",
        "CASP",
        "AMLD6"
      ]
    },
    "out-us-bsa": {
      "type": "outcome",
      "verdict": "yes",
      "title": "US — FinCEN Travel Rule (BSA) applies",
      "explanation": "In the US, the BSA Travel Rule (31 CFR 1010.410(f)) applies to transfers >$3,000. FinCEN extends it to crypto via interpretive guidance. The threshold may drop to $250 under proposed FinCEN rulemaking — watch this.",
      "nextSteps": [
        "Threshold currently $3,000 — proposed reduction to $250 in pending FinCEN rulemaking",
        "Required: originator name, account, address (or other identifier)",
        "Required on beneficiary side: name, account",
        "OFAC sanctions screening on every transfer regardless of amount",
        "BitLicense holders (NY) also subject to NYDFS-specific data exchange rules"
      ],
      "relatedTerms": [
        "Travel Rule",
        "FinCEN",
        "BSA",
        "OFAC"
      ]
    },
    "out-sg-mas": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Singapore — MAS Notice PSN02 applies",
      "explanation": "MAS extends Travel Rule to Digital Payment Token (DPT) services via Notice PSN02. Threshold is S$1,500. Sender + beneficiary data required for any transfer above this amount.",
      "nextSteps": [
        "Threshold S$1,500 (~$1,100 USD)",
        "Required: originator name, account, ID, address",
        "Required on beneficiary side: name, account",
        "Real-time data transmission to beneficiary VASP",
        "MAS-licensed MPI / SPI must register with MAS Travel Rule technology providers"
      ],
      "relatedTerms": [
        "Travel Rule",
        "MAS",
        "DPT",
        "MPI",
        "SPI"
      ]
    },
    "out-uk-trr": {
      "type": "outcome",
      "verdict": "yes",
      "title": "UK — Travel Rule (Money Laundering Regs amendment, Sept 2023)",
      "explanation": "The UK extended Travel Rule to crypto via the Money Laundering and Terrorist Financing (Amendment) Regulations 2022, in force Sept 2023. Threshold £1,000 — applies to FCA-registered cryptoasset firms.",
      "nextSteps": [
        "Threshold £1,000",
        "Required: originator name, account, address",
        "Required on beneficiary side: name, account",
        "FCA Cryptoasset registration required for the underlying VASP activity",
        "Self-hosted wallet transfers: enhanced due diligence + verification of ownership for >£1K"
      ],
      "relatedTerms": [
        "Travel Rule",
        "FCA",
        "Cryptoasset registration"
      ]
    },
    "out-mixed": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Mixed jurisdictions — apply strictest threshold",
      "explanation": "When a transfer crosses jurisdictions with different thresholds, apply the STRICTEST applicable. EU TFR (no de minimis) is the most demanding; US BSA at $3K the most lenient among major regimes. FATF baseline is $/€1,000.",
      "nextSteps": [
        "Maintain a Travel Rule data set on every transfer regardless of amount (operationally simpler)",
        "Use a Travel Rule technical solution that abstracts the jurisdictional rules (TRP, TRUST, Sumsub, Notabene…)",
        "Document the strictest-applicable rationale in your AML manual",
        "Train ops + compliance staff on per-corridor specifics"
      ],
      "relatedTerms": [
        "Travel Rule",
        "FATF",
        "AMLD6",
        "BSA"
      ]
    }
  }
};

export const JONUM_TREE: DecisionTree = {
  "id": "jonum",
  "title": "Can I use JONUM for my NFT gaming product?",
  "description": "Walk through France's experimental JONUM regime (Jeux à Objets Numériques Monétisables, 2024-2027) — the only EU framework designed specifically for NFT gaming with monetisable rewards. SOREN law sandbox.",
  "icon": "🎮",
  "rootId": "q1",
  "nodes": {
    "q1": {
      "type": "question",
      "question": "Does your product distribute monetisable digital objects (NFTs / tokens) as game outcomes — drops, rewards, or in-game-earned items resaleable on a secondary market?",
      "hint": "JONUM is specifically the bridge between traditional gambling (ANJ scope) and crypto (AMF scope). If your items can be sold for value outside the game, you're in scope.",
      "choices": [
        {
          "label": "Yes — items have secondary-market value",
          "next": "q2"
        },
        {
          "label": "No — pure cosmetics, no resale, no monetisation",
          "next": "out-out-of-scope"
        }
      ]
    },
    "q2": {
      "type": "question",
      "question": "Is the game outcome determined by skill, chance, or a mix?",
      "hint": "JONUM is the regime for chance-based monetisable digital objects. Pure-skill gaming with NFT rewards may fall outside JONUM (and outside ANJ gambling) entirely.",
      "choices": [
        {
          "label": "Chance-based or significant chance element",
          "next": "q3"
        },
        {
          "label": "Pure skill — no chance element",
          "next": "out-skill-game"
        }
      ]
    },
    "q3": {
      "type": "question",
      "question": "Are you ready to operate exclusively for French residents during the experiment (2024-2027)?",
      "hint": "JONUM is a sandbox, not an EU passport. You declare to ANJ for the French market only. EU users outside France need a different framework (MiCA Other crypto-asset + national gambling licence per Member State).",
      "choices": [
        {
          "label": "Yes — French market focus initially",
          "next": "q4"
        },
        {
          "label": "No — need EU-wide reach now",
          "next": "out-not-eu-wide"
        }
      ]
    },
    "q4": {
      "type": "question",
      "question": "Can you commit to JONUM consumer-protection requirements (player-account caps, age 18+ verification, addiction-prevention disclosures, transparent random-mechanism disclosure)?",
      "hint": "JONUM is lighter than ANJ gambling but still imposes consumer-protection rules — caps on player spend, mandatory age-gating, visible addiction-help signposting, statistical disclosure of drop probabilities.",
      "choices": [
        {
          "label": "Yes",
          "next": "out-jonum-fit"
        },
        {
          "label": "No / not sure",
          "next": "out-jonum-non-compliant"
        }
      ]
    },
    "out-out-of-scope": {
      "type": "outcome",
      "verdict": "no",
      "title": "Out of JONUM scope — pure cosmetics",
      "explanation": "If your in-game items have no resale value and no monetary outcome, JONUM doesn't apply. You're a regular gaming product — RGPD / consumer-protection law applies, no specific crypto / gambling regime needed.",
      "nextSteps": [
        "RGPD compliance",
        "Consumer Rights Directive 2011/83 if B2C",
        "Confirm no secondary-market trading channel exists (or you trip back into JONUM scope)",
        "If you later add NFT trading or monetisation, re-run this diagnostic"
      ],
      "relatedTerms": [
        "JONUM",
        "NFT",
        "ANJ"
      ]
    },
    "out-skill-game": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "Pure skill — outside JONUM AND outside gambling",
      "explanation": "A skill-only game with NFT rewards isn't gambling under French law (Code pénal §324) and may sit outside JONUM. But MiCA may classify your NFT — fungible / yield-bearing items can fall under Other crypto-asset.",
      "nextSteps": [
        "Run the MiCA classification diagnostic on your token",
        "Document the skill-vs-chance balance with a written legal opinion",
        "Consumer-protection law still applies",
        "Marketing must not invoke chance / luck"
      ],
      "relatedTerms": [
        "JONUM",
        "NFT",
        "MiCA"
      ]
    },
    "out-not-eu-wide": {
      "type": "outcome",
      "verdict": "no",
      "title": "JONUM doesn't passport — pick a different regime for EU-wide",
      "explanation": "JONUM is a French national experiment, not an EU passport. For EU-wide NFT-gaming reach, you'll need MiCA Other crypto-asset + per-Member-State gambling licences (Malta MGA is the favourite).",
      "nextSteps": [
        "Consider Malta MGA + MiCA Other crypto-asset for EU-wide reach",
        "Or pick JONUM and geo-restrict to France for the 2024-2027 sandbox",
        "Outside EU: UK Gambling Commission, Curaçao"
      ],
      "relatedTerms": [
        "JONUM",
        "MiCA",
        "MGA"
      ]
    },
    "out-jonum-fit": {
      "type": "outcome",
      "verdict": "yes",
      "title": "JONUM is your fit — declare to ANJ",
      "explanation": "Your product is exactly what JONUM was designed for. Declare to ANJ (Autorité Nationale des Jeux) under the experimental regime. Three-year sandbox until 2027.",
      "nextSteps": [
        "File the JONUM declaration with ANJ (online portal, ~6 months processing)",
        "Implement player-account caps + age-18 verification + drop-probability disclosure",
        "Maintain on-the-record gameplay logs for ANJ inspection",
        "Geo-fence to French market during the sandbox",
        "Watch for the 2027 review — JONUM may become permanent or sunset"
      ],
      "relatedTerms": [
        "JONUM",
        "ANJ",
        "NFT"
      ]
    },
    "out-jonum-non-compliant": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "JONUM consumer-protection gaps to close first",
      "explanation": "JONUM looks favourable for your product but ANJ won't approve until consumer-protection requirements are met. The bar is lower than full ANJ gambling but higher than pure crypto / NFT.",
      "nextSteps": [
        "Implement player-account spend caps (configurable per session / month)",
        "Age-18 ID verification at onboarding",
        "Visible addiction-help signposting (Joueurs Info Service)",
        "Statistical disclosure of NFT drop probabilities (visible in-app)",
        "Draft Terms of Service + privacy notice in French"
      ],
      "relatedTerms": [
        "JONUM",
        "ANJ"
      ]
    }
  }
};

export const ACCREDITED_INVESTOR_TREE: DecisionTree = {
  "id": "accredited-investor",
  "title": "Can I offer this security token to retail?",
  "description": "Walk through accredited / qualified-investor gating for tokenised securities — the standard STO question of 'can retail buy this, or only sophisticated investors'. Covers US Reg D / Reg S + EU prospectus exemptions.",
  "icon": "💼",
  "rootId": "q1",
  "nodes": {
    "q1": {
      "type": "question",
      "question": "Have you confirmed your token IS a security (e.g. via the Howey Test in the US, or MiFID II in the EU)?",
      "hint": "This diagnostic is downstream of the security-classification question. If your token is a utility / Other crypto-asset, accredited-investor rules don't apply — different framework.",
      "choices": [
        {
          "label": "Yes — security confirmed",
          "next": "q2"
        },
        {
          "label": "No / not sure",
          "next": "out-classify-first"
        }
      ]
    },
    "q2": {
      "type": "question",
      "question": "Which markets are you targeting?",
      "hint": "Each jurisdiction has its own retail-vs-accredited rules. The mainstream are US Reg D + Reg S, EU Prospectus Regulation exemptions, and similar national rules.",
      "choices": [
        {
          "label": "US only",
          "next": "q3-us"
        },
        {
          "label": "EU only",
          "next": "q3-eu"
        },
        {
          "label": "Both US + EU",
          "next": "q3-both"
        },
        {
          "label": "Other jurisdictions",
          "next": "out-other-juri"
        }
      ]
    },
    "q3-us": {
      "type": "question",
      "question": "Do you want to advertise the offering publicly (mass marketing)?",
      "hint": "US Reg D has two paths: 506(b) (no general solicitation, accredited-only) and 506(c) (general solicitation allowed but every buyer must be verified-accredited). 506(c) is the fit for online crypto offerings.",
      "choices": [
        {
          "label": "Yes — public marketing",
          "next": "out-us-regd-506c"
        },
        {
          "label": "No — private channels only",
          "next": "out-us-regd-506b"
        },
        {
          "label": "I want retail (non-accredited) too",
          "next": "out-us-rega-plus"
        }
      ]
    },
    "q3-eu": {
      "type": "question",
      "question": "What's the total raise size and your willingness to write a full prospectus?",
      "hint": "EU Prospectus Regulation (2017/1129) has 3 main exemption thresholds: <€8M no prospectus needed, <150 retail investors per Member State, qualified-investors-only.",
      "choices": [
        {
          "label": "<€8M total raise",
          "next": "out-eu-small"
        },
        {
          "label": "<150 retail investors per Member State",
          "next": "out-eu-narrow-retail"
        },
        {
          "label": "Qualified investors only (HNW + institutional)",
          "next": "out-eu-qualified-only"
        },
        {
          "label": "Full retail public offering",
          "next": "out-eu-full-prospectus"
        }
      ]
    },
    "q3-both": {
      "type": "question",
      "question": "Will you treat US and EU as separate parallel offerings (different docs, different gating)?",
      "hint": "Cross-border STOs typically structure as: Reg S (offshore, sells to non-US persons) + Reg D 506(c) (US accredited) + EU exemption. Three parallel sub-offerings under one master prospectus / whitepaper.",
      "choices": [
        {
          "label": "Yes — parallel structure with Reg S + Reg D + EU exemption",
          "next": "out-cross-border-parallel"
        },
        {
          "label": "No — single global retail offering",
          "next": "out-cross-border-public"
        }
      ]
    },
    "out-classify-first": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "Classify the token first",
      "explanation": "Run the Howey Test diagnostic (US) or the MiCA classification diagnostic (EU) before this one. Accredited-investor rules apply only when the token IS a security under the relevant law.",
      "nextSteps": [
        "Run /assess/quick/howey for US classification",
        "Run /assess/quick/mica-classification for EU classification",
        "Then return here once you've confirmed security status"
      ],
      "relatedTerms": [
        "Howey Test",
        "MiCA",
        "Other crypto-asset"
      ]
    },
    "out-other-juri": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "Other jurisdiction — case-by-case",
      "explanation": "Most major jurisdictions (UK, Switzerland, Singapore, Japan, Australia) have their own variant of accredited-investor / qualified-investor rules. The structure resembles US Reg D — sophisticated-investor gating with mass-marketing restrictions.",
      "nextSteps": [
        "UK: FCA non-readily-realisable / sophisticated investor rules",
        "Switzerland: FinSA Qualified Investor (HNW + institutional)",
        "Singapore: MAS Accredited Investor (income / wealth / institutional)",
        "Japan: FSA Qualified Institutional Investor",
        "Australia: ASIC Sophisticated Investor / Wholesale Client"
      ],
      "relatedTerms": [
        "FCA",
        "FINMA",
        "MAS",
        "ASIC"
      ]
    },
    "out-us-regd-506c": {
      "type": "outcome",
      "verdict": "yes",
      "title": "US — Reg D 506(c) (accredited-only, public marketing OK)",
      "explanation": "506(c) is the fit for online crypto offerings: you can advertise publicly but every buyer must be verified accredited (income >$200K solo / $300K couple, OR net worth >$1M ex-residence, OR holds a qualifying licence). Verification by qualified third party (Series 65 holder, bank, attorney).",
      "nextSteps": [
        "File Form D with SEC within 15 days of first sale",
        "Use a 506(c) verification provider (e.g. VerifyInvestor, Parallel Markets)",
        "No state Blue Sky review (preempted)",
        "Restrictions on resale by buyers (Rule 144 holding period)",
        "Tokens marketable to retail only after registration or 1-year hold"
      ],
      "relatedTerms": [
        "Reg D",
        "SEC",
        "Howey Test"
      ]
    },
    "out-us-regd-506b": {
      "type": "outcome",
      "verdict": "yes",
      "title": "US — Reg D 506(b) (private, accredited-only)",
      "explanation": "506(b) is the older private-placement route: no general solicitation but you can sell to up to 35 non-accredited investors who meet sophistication tests. Buyers self-certify accredited status. Most STOs prefer 506(c) now because of the marketing allowance.",
      "nextSteps": [
        "File Form D with SEC within 15 days of first sale",
        "Buyers self-certify accredited status (no third-party verification needed)",
        "No general solicitation — strict 'pre-existing relationship' rule",
        "Up to 35 non-accredited investors with sophisticated-investor reps"
      ],
      "relatedTerms": [
        "Reg D",
        "SEC"
      ]
    },
    "out-us-rega-plus": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "US — consider Reg A+ for retail",
      "explanation": "Reg D is accredited-only. For retail US offering, Reg A+ Tier 2 allows up to $75M / 12 months to non-accredited investors but requires SEC-qualified offering circular + ongoing reporting. Closer to a mini-IPO. Used by some STOs (e.g. INX, tZERO).",
      "nextSteps": [
        "Reg A+ Tier 2 — up to $75M / 12 months to retail",
        "SEC-qualified offering circular (~6-12 months)",
        "Annual + semi-annual ongoing reporting",
        "State-level review NOT preempted (vs. Reg D)",
        "Or run as Reg D 506(c) accredited-only + Reg S offshore retail"
      ],
      "relatedTerms": [
        "Reg A+",
        "SEC",
        "STO"
      ]
    },
    "out-eu-small": {
      "type": "outcome",
      "verdict": "yes",
      "title": "EU — Small offering exemption (<€8M)",
      "explanation": "Under €8M raise, no prospectus is required (Prospectus Regulation Art. 1(3)). Some Member States set lower local thresholds (e.g. €1M for some). National rules + light disclosures still apply.",
      "nextSteps": [
        "Verify the local threshold in your home Member State",
        "MiFID II suitability test if intermediating to retail",
        "Light disclosure document (national rules)",
        "DLT Pilot Regime available for tokenised settlement venues"
      ],
      "relatedTerms": [
        "Prospectus Regulation",
        "MiFID II",
        "DLT Pilot Regime"
      ]
    },
    "out-eu-narrow-retail": {
      "type": "outcome",
      "verdict": "yes",
      "title": "EU — <150 retail investors per Member State",
      "explanation": "Prospectus Regulation Art. 1(4)(b) — offerings to fewer than 150 retail investors per Member State are exempt. Combined with the qualified-investors carve-out (4)(a), this lets you build a small retail group + unlimited HNW/institutional without a full prospectus.",
      "nextSteps": [
        "Hard cap at 150 retail investors per Member State (count carefully)",
        "MiFID II suitability + appropriateness still apply",
        "Marketing restrictions — anti-public-solicitation rules",
        "Combine with qualified-investors-only path for the institutional tranche"
      ],
      "relatedTerms": [
        "Prospectus Regulation"
      ]
    },
    "out-eu-qualified-only": {
      "type": "outcome",
      "verdict": "yes",
      "title": "EU — Qualified investors only (lightest path)",
      "explanation": "Prospectus Regulation Art. 1(4)(a) — offerings to qualified investors (institutional, HNW with €500K+ portfolio, MiFID II professional clients) are exempt. This is the lightest STO path in the EU.",
      "nextSteps": [
        "Define qualified-investor verification process",
        "MiFID II professional-client status check",
        "No prospectus required — light private-placement memo sufficient",
        "Marketing restricted to qualified-investor audiences"
      ],
      "relatedTerms": [
        "Prospectus Regulation",
        "MiFID II"
      ]
    },
    "out-eu-full-prospectus": {
      "type": "outcome",
      "verdict": "yes",
      "title": "EU — Full prospectus + MiFID II suitability",
      "explanation": "Full retail public offering requires a prospectus approved by the home NCA. ~12-24 months, €500K-2M cost, but unlocks unlimited retail. DLT Pilot Regime available for tokenised settlement venues.",
      "nextSteps": [
        "File prospectus with home NCA (Annexes I-VI of Reg. 2017/1129)",
        "Audited financials (3 years)",
        "MiFID II investment-firm authorisation if intermediating",
        "DLT Pilot Regime market-infrastructure licence (DLT MTF / DLT SS / DLT TSS) for trading venues",
        "Ongoing transparency obligations (Transparency Directive)"
      ],
      "relatedTerms": [
        "Prospectus Regulation",
        "MiFID II",
        "DLT Pilot Regime"
      ]
    },
    "out-cross-border-parallel": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Cross-border parallel structure (recommended)",
      "explanation": "Industry-standard STO: parallel sub-offerings under a single master document. (1) Reg D 506(c) for US accredited, (2) Reg S for non-US persons (offshore), (3) EU exemption (qualified-investors-only or <150 retail per Member State). Each tranche independently compliant.",
      "nextSteps": [
        "Reg D 506(c) — US accredited + verification",
        "Reg S — non-US persons, no directed selling efforts in US, distribution-compliance period",
        "EU — pick exemption per Member State",
        "Master whitepaper / prospectus with per-jurisdiction wrappers",
        "On-chain compliance: MiCA whitepaper allowance Art. 4(2) for already-traded tokens; MPT (XLS-33) flags for KYC gating"
      ],
      "relatedTerms": [
        "Reg D",
        "Reg S",
        "Prospectus Regulation",
        "MPT"
      ]
    },
    "out-cross-border-public": {
      "type": "outcome",
      "verdict": "no",
      "title": "Single global retail — not realistic",
      "explanation": "A single document open to global retail simultaneously is essentially impossible — you'd need full SEC + EU + UK + every other jurisdiction's retail registration in parallel. Industry uses parallel-tranche structure instead.",
      "nextSteps": [
        "Restructure as parallel offerings (Reg D + Reg S + EU exemption)",
        "Or pivot to crowd-equity platforms that handle compliance per jurisdiction (Republic, StartEngine, Crowdcube)",
        "Or use DLT Pilot Regime for tokenised securities trading on regulated venues"
      ],
      "relatedTerms": [
        "Reg D",
        "Reg S",
        "DLT Pilot Regime"
      ]
    }
  }
};

export const DLT_PILOT_TREE: DecisionTree = {
  "id": "dlt-pilot",
  "title": "Is my tokenised security DLT-Pilot-eligible?",
  "description": "The EU DLT Pilot Regime (Reg. 2022/858, in force March 2023) is a 6-year sandbox for DLT-based market infrastructures trading and settling tokenised securities. Walk through the eligibility criteria.",
  "icon": "🧪",
  "rootId": "q1",
  "nodes": {
    "q1": {
      "type": "question",
      "question": "Are you operating a market infrastructure (trading venue, settlement system) for tokenised securities — OR are you the issuer?",
      "hint": "DLT Pilot is for INFRASTRUCTURE OPERATORS (the people running the trading venue or settlement layer), not for issuers themselves. Issuers benefit indirectly because their tokens can settle on a DLT venue.",
      "choices": [
        {
          "label": "Infrastructure operator (trading venue OR settlement)",
          "next": "q2"
        },
        {
          "label": "Issuer of tokenised securities",
          "next": "out-issuer-side"
        },
        {
          "label": "Investor / buyer",
          "next": "out-investor-side"
        }
      ]
    },
    "q2": {
      "type": "question",
      "question": "Which DLT licence category fits your activity?",
      "hint": "Three categories under the regulation: DLT MTF (multilateral trading facility), DLT SS (settlement system), DLT TSS (combined trading + settlement, the most innovative slot).",
      "choices": [
        {
          "label": "DLT MTF — trading venue only",
          "next": "q3"
        },
        {
          "label": "DLT SS — settlement only",
          "next": "q3"
        },
        {
          "label": "DLT TSS — combined trading + settlement",
          "next": "q3"
        }
      ]
    },
    "q3": {
      "type": "question",
      "question": "Do your traded instruments fit the DLT Pilot caps? (Shares: market cap <€500M per issuer · Bonds / other debt: <€1B per issuance · UCITS units: <€500M)",
      "hint": "The caps were doubled in 2024 (originally €200M / €500M / €250M). Above the caps you must use the regular MiFID II / CSDR infrastructure.",
      "choices": [
        {
          "label": "Yes — under all applicable caps",
          "next": "q4"
        },
        {
          "label": "No — above the caps",
          "next": "out-caps-exceeded"
        }
      ]
    },
    "q4": {
      "type": "question",
      "question": "Will you cap the total market value of all DLT-traded instruments under your licence at €6B (the global cap)?",
      "hint": "Hard cap on the total nominal value of all instruments traded on the DLT venue at any time. Once breached, the venue must phase down or transition to a regular MiFID II / CSDR structure.",
      "choices": [
        {
          "label": "Yes — under €6B aggregate",
          "next": "out-eligible"
        },
        {
          "label": "No — likely to exceed",
          "next": "out-cap-too-tight"
        }
      ]
    },
    "out-issuer-side": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Issuer side — find a DLT-Pilot venue to list on",
      "explanation": "As an issuer, you don't apply for the DLT licence yourself — you list your tokenised securities on a venue that holds one. Several venues are now licensed across the EU (e.g. SDX in Switzerland is similar but not EU-DLT-Pilot; LCH SA, Euronext Securities, 21X are EU-DLT-Pilot operators).",
      "nextSteps": [
        "Approach DLT-Pilot-licensed venues for listing (LCH SA, 21X, Euronext Securities)",
        "Tokenisation can use IOU / Trust Line on XRPL or Single Asset Vault (XLS-72, proposed)",
        "Whitepaper / prospectus per Prospectus Regulation still applies — not a substitute",
        "Investor base limited by DLT-Pilot caps (€500M shares, €1B bonds)"
      ],
      "relatedTerms": [
        "DLT Pilot Regime",
        "Prospectus Regulation",
        "MPT"
      ]
    },
    "out-investor-side": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Investor side — DLT-Pilot venues are open to retail (with caveats)",
      "explanation": "DLT-Pilot venues can serve retail investors, subject to MiFID II suitability + the per-issuance caps. The advantage over regular markets is faster settlement (T+0 / atomic) and 24/7 trading availability.",
      "nextSteps": [
        "Open an account with a DLT-Pilot-licensed venue",
        "Standard MiFID II suitability assessment applies",
        "T+0 / atomic settlement vs. T+2 in regular markets",
        "Custody choice: self-custody (where supported) or via a DLT-Pilot CSD"
      ],
      "relatedTerms": [
        "DLT Pilot Regime",
        "MiFID II"
      ]
    },
    "out-caps-exceeded": {
      "type": "outcome",
      "verdict": "no",
      "title": "Above DLT-Pilot caps — use regular MiFID II / CSDR",
      "explanation": "Your traded instruments are too large for the DLT-Pilot sandbox. You'll need to operate as a regular MiFID II MTF / OTF + a CSDR-licensed CSD for settlement. Heavier infrastructure but no caps.",
      "nextSteps": [
        "MiFID II MTF / OTF authorisation (€730K capital min.)",
        "CSDR-licensed CSD for settlement (much heavier)",
        "Or split your offering: smaller DLT-Pilot tranche + larger regular tranche",
        "Or wait for the DLT-Pilot review (2027) — caps may rise further"
      ],
      "relatedTerms": [
        "MiFID II",
        "CSDR",
        "DLT Pilot Regime"
      ]
    },
    "out-eligible": {
      "type": "outcome",
      "verdict": "yes",
      "title": "DLT-Pilot eligible — file with home NCA",
      "explanation": "You fit all three caps (per-instrument + €6B aggregate). Apply for one of the three DLT licences (MTF / SS / TSS) with your home NCA. ~9-15 months timeline.",
      "nextSteps": [
        "File with home NCA (e.g. AMF for FR, BaFin for DE, CSSF for LU)",
        "Detailed business + IT + legal plan required (regulatory technical standards)",
        "ESMA + EBA opinion sought during application",
        "Live operation: DLT system must record + settle transactions on-ledger",
        "Continuous monitoring + breach reporting (cap, security, IT)",
        "DLT system can be public (Ethereum, XRPL) or private — protocol-agnostic"
      ],
      "relatedTerms": [
        "DLT Pilot Regime",
        "MiFID II",
        "CSDR"
      ]
    },
    "out-cap-too-tight": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "€6B aggregate cap likely too tight — split or upgrade",
      "explanation": "If you expect to exceed the global €6B cap, the Pilot regime may not fit. Either split the venue across multiple licensed entities (each with its own €6B cap) or operate as a regular MiFID II / CSDR infrastructure.",
      "nextSteps": [
        "Multiple-entity structure: one DLT-Pilot licence per business line",
        "Or operate as regular MiFID II MTF + CSDR CSD (no cap)",
        "Or watch for the 2027 DLT-Pilot review — caps may scale further"
      ],
      "relatedTerms": [
        "DLT Pilot Regime",
        "MiFID II",
        "CSDR"
      ]
    }
  }
};

export const TVTG_VS_CASP_TREE: DecisionTree = {
  "id": "tvtg-vs-casp",
  "title": "TVTG (Liechtenstein) or direct MiCA CASP?",
  "description": "Decide whether to start in Liechtenstein under the TVTG (Token Container Model) and passport into the EU, or apply directly for MiCA CASP in a Member State. Trade-offs in time, cost, and operational complexity.",
  "icon": "🇱🇮",
  "rootId": "q1",
  "nodes": {
    "q1": {
      "type": "question",
      "question": "Are you EU-headquartered or already EU-resident, OR do you need a fresh European base?",
      "hint": "TVTG is great for non-EU founders building European reach from scratch. EU-resident teams often have a closer Member-State NCA that's just as fast.",
      "choices": [
        {
          "label": "EU-resident already",
          "next": "q2"
        },
        {
          "label": "Non-EU — building European base",
          "next": "q3-non-eu"
        }
      ]
    },
    "q2": {
      "type": "question",
      "question": "Which Member State is your home base?",
      "hint": "Some NCAs are faster + cheaper than others for MiCA CASP. Lithuania is currently the fastest path; Ireland / Luxembourg are slower / pricier; FR / DE are mid.",
      "choices": [
        {
          "label": "Lithuania (fastest, cheapest)",
          "next": "out-lt-direct"
        },
        {
          "label": "Ireland or Luxembourg (institutional, slower)",
          "next": "out-ie-lu-direct"
        },
        {
          "label": "Germany / France / Spain (mid)",
          "next": "out-major-eu-direct"
        },
        {
          "label": "Other Member State",
          "next": "out-other-eu-direct"
        }
      ]
    },
    "q3-non-eu": {
      "type": "question",
      "question": "What's your priority — speed-to-market or institutional credibility?",
      "hint": "TVTG = speed (3-9 months). MiCA CASP via Ireland / Luxembourg = institutional credibility but 12-18 months.",
      "choices": [
        {
          "label": "Speed — need to launch ASAP",
          "next": "out-tvtg-speed"
        },
        {
          "label": "Institutional credibility — banking-grade reputation",
          "next": "out-mica-institutional"
        },
        {
          "label": "Mix — TVTG first, then MiCA later",
          "next": "out-tvtg-then-mica"
        }
      ]
    },
    "out-lt-direct": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Direct MiCA CASP via Lithuania (Lietuvos bankas) — fastest EU path",
      "explanation": "Lithuania has the fastest + cheapest MiCA CASP authorisation in the EU (~6 months, €50-150K). EU passporting from day 1. This is what most cost-conscious EU founders should do.",
      "nextSteps": [
        "File CASP application with Lietuvos bankas",
        "Capital min €125K (CASP exchange tier)",
        "Local director + AML officer requirement (resident or remotely-acceptable per case)",
        "Passport across all EU-27 once granted",
        "TVTG offers no advantage if you're already EU-resident — direct MiCA is faster overall"
      ],
      "relatedTerms": [
        "CASP",
        "MiCA",
        "Lietuvos bankas",
        "TVTG"
      ]
    },
    "out-ie-lu-direct": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Direct MiCA CASP via Ireland or Luxembourg — institutional path",
      "explanation": "Ireland (CBI) and Luxembourg (CSSF) take 12-18 months and cost €200-600K but offer institutional credibility — Coinbase Ireland, Kraken Payward Europe, Standard Custody Lux all chose this path. Best for fund-raising / banking partnerships.",
      "nextSteps": [
        "File CASP application with CBI (IE) or CSSF (LU)",
        "Capital min €125K (CASP exchange) or higher tier",
        "Local substance — director + meaningful operations",
        "Passport across all EU-27 once granted",
        "TVTG would just add a step — direct MiCA is cleaner here"
      ],
      "relatedTerms": [
        "CASP",
        "MiCA",
        "CBI",
        "CSSF",
        "TVTG"
      ]
    },
    "out-major-eu-direct": {
      "type": "outcome",
      "verdict": "yes",
      "title": "Direct MiCA CASP in your home Member State — sensible default",
      "explanation": "Mid-tier Member-State NCAs (BaFin DE, AMF FR, CNMV ES) take 9-15 months. Direct MiCA CASP is the natural path for resident teams — no advantage in adding a Liechtenstein layer.",
      "nextSteps": [
        "File CASP application with your home NCA",
        "Local language requirements may apply (FR, DE)",
        "Capital min €125K",
        "Passport across all EU-27 once granted",
        "FR specifics: PSAN transitional regime auto-converts to CASP"
      ],
      "relatedTerms": [
        "CASP",
        "MiCA",
        "BaFin",
        "AMF"
      ]
    },
    "out-other-eu-direct": {
      "type": "outcome",
      "verdict": "maybe",
      "title": "Other Member State — check NCA-specific timelines",
      "explanation": "Smaller Member States vary widely. Cyprus, Estonia, Malta, Czech Republic each have their own pace and capacity. Compare with Lithuania (the speed benchmark) before committing.",
      "nextSteps": [
        "Compare your home NCA's published CASP timelines",
        "Check capacity — small NCAs may be backlogged",
        "If your home NCA is slow, consider Lithuania CASP + passport home",
        "TVTG is rarely the optimal path if you have an EU base"
      ],
      "relatedTerms": [
        "CASP",
        "MiCA"
      ]
    },
    "out-tvtg-speed": {
      "type": "outcome",
      "verdict": "yes",
      "title": "TVTG (Liechtenstein) for speed — then MiCA passport",
      "explanation": "TVTG is the fastest path to European reach for non-EU teams. ~3-9 months. Liechtenstein is in the EEA — once you have TVTG + an EEA passport, you can serve EU users without a separate MiCA CASP. Good for non-EU founders building European reach from scratch.",
      "nextSteps": [
        "File TVTG TT Service Provider application with FMA",
        "Capital min depends on service category (€100K-€250K)",
        "Local substance — director + AML officer in Liechtenstein",
        "EEA passport = serve all EU + Norway / Iceland",
        "Watch the TVTG / MiCA interplay — Liechtenstein is implementing MiCA on top of TVTG"
      ],
      "relatedTerms": [
        "TVTG",
        "MiCA",
        "CASP",
        "FMA"
      ]
    },
    "out-mica-institutional": {
      "type": "outcome",
      "verdict": "yes",
      "title": "MiCA CASP via Ireland or Luxembourg — institutional credibility",
      "explanation": "If banking partnerships and fund-raising are critical, Ireland or Luxembourg's MiCA CASP is the higher-credibility path. Slower (12-18 months) and pricier (€200-600K) but signals 'institutional' to counterparties.",
      "nextSteps": [
        "File CASP application with CBI (IE) or CSSF (LU)",
        "Local substance — director + real operations in Dublin / Luxembourg",
        "Capital min €125K + much higher prudential expectations",
        "Banking partners onboarding much smoother than from Liechtenstein",
        "If you can wait 12-18 months, this is the better path for institutional plays"
      ],
      "relatedTerms": [
        "CASP",
        "MiCA",
        "CBI",
        "CSSF"
      ]
    },
    "out-tvtg-then-mica": {
      "type": "outcome",
      "verdict": "yes",
      "title": "TVTG first, MiCA second — staged approach (recommended for many)",
      "explanation": "The pragmatic split: Liechtenstein TVTG gets you to market in 3-9 months with EEA passport. Once revenue is flowing, you can add a MiCA CASP in IE / LU / LT for full institutional credibility (parallel, not replacement). Used by several XRPL-native projects.",
      "nextSteps": [
        "Phase 1 (months 0-9): TVTG TT Service Provider in Liechtenstein",
        "Phase 1 deliverable: live revenue + EEA passport",
        "Phase 2 (months 12-30): MiCA CASP in chosen Member State",
        "Phase 2 deliverable: institutional credibility + bigger banking partners",
        "Maintain both authorisations during transition"
      ],
      "relatedTerms": [
        "TVTG",
        "MiCA",
        "CASP",
        "FMA",
        "CBI"
      ]
    }
  }
};

export const DECISION_TREES: DecisionTree[] = [
  HOWEY_TREE,
  CASP_TREE,
  XRPL_CUSTODY_TREE,
  JURISDICTION_TREE,
  MICA_CLASSIFICATION_TREE,
  GENIUS_STABLECOIN_TREE,
  TRAVEL_RULE_TREE,
  JONUM_TREE,
  ACCREDITED_INVESTOR_TREE,
  DLT_PILOT_TREE,
  TVTG_VS_CASP_TREE,
]

export function getDecisionTree(id: string): DecisionTree | undefined {
  return DECISION_TREES.find((t) => t.id === id)
}
