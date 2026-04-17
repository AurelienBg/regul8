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

export const DECISION_TREES: DecisionTree[] = [
  HOWEY_TREE,
  CASP_TREE,
  XRPL_CUSTODY_TREE,
  JURISDICTION_TREE,
]

export function getDecisionTree(id: string): DecisionTree | undefined {
  return DECISION_TREES.find((t) => t.id === id)
}
