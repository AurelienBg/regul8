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

export const DECISION_TREES: DecisionTree[] = [
  HOWEY_TREE,
  CASP_TREE,
  XRPL_CUSTODY_TREE,
  JURISDICTION_TREE,
  MICA_CLASSIFICATION_TREE,
  GENIUS_STABLECOIN_TREE,
  TRAVEL_RULE_TREE,
]

export function getDecisionTree(id: string): DecisionTree | undefined {
  return DECISION_TREES.find((t) => t.id === id)
}
