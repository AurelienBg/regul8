import type { RegData } from '@/types';

export const REGULATIONS: RegData = {
  // ═══════════════════════════════════════════════════════════════
  // EXCHANGE / TRADING PLATFORM
  // ═══════════════════════════════════════════════════════════════
  exchange: {
    eu: {
      regime: "CASP (MiCA) + DASP (AMF France)",
      risk: "high",
      licenses: ["CASP authorization (ESMA/NCA)", "DASP AMF registration (France)"],
      obligations: ["Full KYC/KYB", "AML/CFT program", "MiCA whitepaper", "Capital min. \u20AC125K", "FATF Travel Rule >\u20AC1K", "Market abuse rules", "Governance & fit-and-proper", "Environmental impact disclosure"],
      time: "12\u201318 months",
      cost: "\u20AC50K\u2013\u20AC200K",
      alts: ["Singapore MAS (~6 months)", "Dubai VARA (~9 months)", "Liechtenstein TVTG (3\u20139 months)", "Lithuania/Estonia as EU hub"],
      authority: "AMF (France) / ESMA (EU)",
      xrplNote: "XRPL has a native DEX (order book built into the protocol). A front-end DApp accessing it for EU users may still need CASP if it routes orders or controls funds."
    },
    us: {
      regime: "FinCEN MSB + State MTL + BitLicense (NY) + CLARITY Act (SEC/CFTC split)",
      risk: "high",
      licenses: ["FinCEN MSB registration", "Money Transmitter Licence (per state, ~48 states)", "BitLicense (NY only)", "CFTC registration for 'digital commodity' exchanges (CLARITY Act, 2025)"],
      obligations: ["KYC/AML/BSA compliance", "SAR filings", "OFAC sanctions screening", "Travel Rule >$3K", "State-by-state bonding requirements", "CLARITY Act: trade-venue classification (SEC vs CFTC) per asset based on 'mature blockchain' test"],
      time: "18\u201336 months",
      cost: "$200K\u2013$1M+",
      alts: ["Wyoming LLC (crypto-friendly)", "EU MiCA as primary market", "Liechtenstein TVTG"],
      authority: "FinCEN / SEC / CFTC / NYDFS / state regulators",
      xrplNote: "XRPL DEX front-end: SEC may treat as unregistered exchange if trading securities-token pairs. Under CLARITY Act 2025, XRP (secondary sales, SEC v. Ripple July 2023) likely qualifies as 'digital commodity' \u2014 CFTC jurisdiction. Other XRPL tokens require case-by-case mature-blockchain analysis."
    },
    uae: {
      regime: "VARA \u2014 VASP Full Market Product",
      risk: "med",
      licenses: ["VASP licence (VARA)", "VARA tech audit"],
      obligations: ["KYC/AML", "Capital requirements", "Local director", "Asset segregation", "Cyber-security framework"],
      time: "6\u201312 months",
      cost: "$50K\u2013$150K",
      alts: ["ADGM FSRA (Abu Dhabi)", "Singapore MAS", "EU MiCA passport"],
      authority: "VARA Dubai / FSRA ADGM"
    },
    sg: {
      regime: "MAS \u2014 Major Payment Institution (PSA)",
      risk: "med",
      licenses: ["MPI licence", "or SPI (lower thresholds)"],
      obligations: ["KYC/AML MAS guidelines", "Tech Risk Management", "Annual audits", "Travel Rule", "User protection measures"],
      time: "6\u201312 months",
      cost: "SGD 50K\u2013150K",
      alts: ["Dubai VARA", "Hong Kong SFC VASP", "EU MiCA"],
      authority: "Monetary Authority of Singapore (MAS)"
    },
    uk: {
      regime: "FCA Cryptoasset Registration",
      risk: "med",
      licenses: ["FCA crypto business registration", "EMI licence if fiat involved"],
      obligations: ["AML/KYC", "FATF Travel Rule", "Consumer Duty (retail)", "Financial promotions regime"],
      time: "12\u201318 months",
      cost: "\u00A330K\u2013\u00A3100K",
      alts: ["EU MiCA passporting", "Gibraltar DLT Provider Licence"],
      authority: "Financial Conduct Authority (FCA)"
    },
    hk: {
      regime: "SFC VASP Licence (VATP)",
      risk: "high",
      licenses: ["SFC VASP licence", "Type 1 if securities involved"],
      obligations: ["KYC/AML AMLO", "Asset segregation", "Cold storage >98%", "Retail investor safeguards", "Insurance requirements"],
      time: "12\u201318 months",
      cost: "HKD 500K\u20132M",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "Securities & Futures Commission (SFC)"
    },
    ch: {
      regime: "FINMA VQF/SRO + DLT Trading Facility",
      risk: "med",
      licenses: ["VQF or SRO membership (AML)", "DLT Trading Facility licence if exchange"],
      obligations: ["AML Swiss AMLA", "KYC/KYB", "Travel Rule", "Beneficial ownership"],
      time: "6\u201318 months",
      cost: "CHF 50K\u2013500K",
      alts: ["Liechtenstein TVTG", "EU MiCA"],
      authority: "FINMA Switzerland"
    },
    li: {
      regime: "TVTG \u2014 Token Exchange (TE) SP licence",
      risk: "low",
      licenses: ["SP Token Exchange licence (FMA)", "EEA passporting available"],
      obligations: ["AML TVTG", "Fit & proper management", "Annual FMA report", "Client asset segregation"],
      time: "3\u20139 months",
      cost: "CHF 20K\u201380K",
      alts: ["Switzerland FINMA", "EU MiCA via EEA"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — Crypto-Asset Exchange Service Provider (CAESP)",
      risk: "high",
      licenses: ["CAESP registration (FSA)", "Type I Financial Instruments Business (if derivatives)"],
      obligations: ["KYC/AML (JAFIC)", "Cold wallet segregation", "Annual FSA audit", "User asset protection trust", "Travel Rule", "Advertising restrictions"],
      time: "12–24 months",
      cost: "¥10M–¥50M ($70K–$350K)",
      alts: ["Singapore MAS", "Dubai VARA", "EU MiCA"],
      authority: "Financial Services Agency (FSA Japan)"
    },
    kr: {
      regime: "VASP Registration (Special Financial Transactions Act)",
      risk: "high",
      licenses: ["VASP registration (FIU)", "ISMS-P certification mandatory", "Real-name bank partnership"],
      obligations: ["KYC with real-name bank accounts", "AML (AMLCFT Act)", "ISMS-P information security certification", "Travel Rule (>₩1M)", "Annual reporting to FIU"],
      time: "12–18 months",
      cost: "₩100M–₩500M ($75K–$375K)",
      alts: ["Japan FSA", "Singapore MAS", "EU MiCA"],
      authority: "Financial Intelligence Unit (FIU) / Financial Services Commission (FSC)"
    },
    in: {
      regime: "VDA Taxation + FIU Registration (PMLA)",
      risk: "high",
      licenses: ["FIU-IND registration (mandatory since March 2025)", "No formal licensing framework yet"],
      obligations: ["30% flat tax on VDA income", "1% TDS on all transfers >₹10K", "KYC/AML under PMLA", "FIU reporting", "No loss offset allowed"],
      time: "3–6 months (FIU registration)",
      cost: "₹10L–₹50L ($12K–$60K)",
      alts: ["Dubai VARA", "Singapore MAS", "EU MiCA"],
      authority: "FIU-IND / SEBI (proposed) / RBI"
    },
    br: {
      regime: "BCB — Virtual Asset Service Provider (Marco Legal das Criptomoedas)",
      risk: "med",
      licenses: ["BCB VASP authorization (Law 14.478/2022)", "CVM registration if securities"],
      obligations: ["KYC/AML", "Asset segregation", "Governance requirements", "BCB reporting", "Consumer protection (CDC)"],
      time: "6–12 months",
      cost: "R$200K–R$1M ($40K–$200K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "Banco Central do Brasil (BCB) / CVM"
    },
    ng: {
      regime: "SEC Nigeria — Rules on Issuance, Offering Platforms and Custody of Digital Assets (May 2022) + CBN Guidelines 2023",
      risk: "high",
      licenses: ["SEC Nigeria DASP registration (Digital Assets Token Offering Platform, Digital Assets Exchange, DACS)", "CBN Virtual Asset licence (post Dec 2023 lifting of banking ban)", "SEC provisional VASP authorization (ARIP framework, 2024)"],
      obligations: ["KYC/AML under MLPPA 2022", "10% capital gains tax on virtual asset transactions (Finance Act 2024)", "Local office + local director required", "NGN 500M minimum paid-up capital for exchanges", "Investor protection rules + Know-Your-Token (KYT) review", "Reporting to SEC + NFIU"],
      time: "9–18 months (framework still maturing)",
      cost: "NGN 500M paid-up + $150K–$500K setup/legal",
      alts: ["UAE VARA (closer timezone)", "Ghana BoG sandbox", "Outside Africa: Singapore MAS"],
      authority: "SEC Nigeria + CBN (Central Bank of Nigeria) + NFIU"
    },
    ke: {
      regime: "Virtual Asset Service Providers Act 2025 (in force) + Capital Markets Authority oversight",
      risk: "med",
      licenses: ["VASP licence under VASP Act 2025 (CMA-issued for trading, custody, advisory)", "Tax registration with KRA (Digital Asset Tax 3% since 2023)"],
      obligations: ["KYC/AML/CFT per POCAMLA 2009", "Segregation of customer assets", "Local presence + local directors", "Reporting to CMA + Financial Reporting Centre", "Digital Asset Tax 3% on transfer/exchange value"],
      time: "9–15 months (new framework, timelines firming up)",
      cost: "KES 5M–20M (~$40K–$160K)",
      alts: ["South Africa FSCA (more mature)", "UAE VARA", "Outside Africa: Singapore MAS"],
      authority: "Capital Markets Authority (CMA) + Central Bank of Kenya (CBK) + KRA"
    },
    za: {
      regime: "FSCA Crypto Asset Declaration (Oct 2022) — crypto assets are financial products under FAIS Act",
      risk: "med",
      licenses: ["Crypto Asset Service Provider (CASP) licence under FAIS Act (June 2023+)", "FSP categories: discretionary, non-discretionary, advisory", "FIC registration (AML supervision)"],
      obligations: ["FAIS Act fit-and-proper officers", "KYC/AML per FICA", "Customer due diligence + record keeping 5 yrs", "Annual financial statements to FSCA", "Insurance/PI cover per FSP category", "Travel Rule compliance from Apr 2023"],
      time: "6–12 months",
      cost: "ZAR 1M–3M (~$55K–$170K)",
      alts: ["UAE VARA", "Singapore MAS", "UK FCA"],
      authority: "FSCA (Financial Sector Conduct Authority) + FIC + SARB"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // STABLECOIN / DIGITAL PAYMENT TOKEN
  // ═══════════════════════════════════════════════════════════════
  stablecoin: {
    eu: {
      regime: "MiCA EMT (E-Money Token) or ART (Asset-Referenced Token)",
      risk: "high",
      licenses: ["EMI or credit institution licence (EMT)", "NCA authorization (ART)", "CASP if distributing"],
      obligations: ["1:1 reserve requirement (EMT)", "Whitepaper filed with NCA", "Reserve asset management", "Redemption rights at par (EMT)", "S-EMT/S-ART rules if significant (>\u20AC5B or >10M holders)", "Quarterly reporting", "Capital requirements"],
      time: "12\u201324 months",
      cost: "\u20AC100K\u2013\u20AC500K+",
      alts: ["Liechtenstein TVTG (faster)", "Singapore MAS (PSA)", "Switzerland FINMA"],
      authority: "ECB + NCA (for S-EMT) / ESMA + NCA (for S-ART)",
      xrplNote: "RLUSD is Ripple\u2019s USD-backed stablecoin on XRPL + Ethereum. Reference EMT implementation. Uses IOU/trust line model on XRPL. Issuer must be EMI or credit institution under MiCA.",
      custodyNote: "Stablecoin on XRPL uses IOU/Trust Line model. Gateway holds reserve assets \u2014 custodial by definition. freeze and globalFreeze flags provide compliance controls."
    },
    us: {
      regime: "GENIUS Act (federal stablecoin framework, signed July 2025) + State MTL + BitLicense (NY)",
      risk: "high",
      licenses: ["Federal OCC Payment Stablecoin Issuer charter (GENIUS Act)", "OR state-qualified issuer under GENIUS dual path", "State MTL where applicable", "NY BitLicense or NY Trust charter"],
      obligations: ["1:1 backing in cash + short-term US Treasuries (<93 days) + repos", "Monthly disclosures signed by CFO + annual independent attestation", "Redemption at par within T+1", "Bank-grade AML/KYC + OFAC screening", "No interest/yield payments to holders", "Bankruptcy-remote segregation of reserves", "Foreign issuers may passport if comparable regime (reciprocity)"],
      time: "12\u201324 months (federal path) / 6\u201312 months (state path)",
      cost: "$500K\u2013$2M+",
      alts: ["EU MiCA EMT (comparable 1:1 framework)", "Switzerland FINMA", "Dubai VARA payment token"],
      authority: "OCC (federal) / State regulators / FinCEN"
    },
    uae: {
      regime: "VARA Payment Token + CBUAE oversight",
      risk: "med",
      licenses: ["VARA payment token licence", "CBUAE approval if AED-pegged"],
      obligations: ["Reserve management", "KYC/AML", "Audit requirements", "Capital requirements"],
      time: "6\u201312 months",
      cost: "$100K\u2013$300K",
      alts: ["Singapore MAS", "EU MiCA", "Liechtenstein TVTG"],
      authority: "VARA / CBUAE"
    },
    sg: {
      regime: "MAS \u2014 Single-Currency Stablecoin (SCS) Framework",
      risk: "med",
      licenses: ["MPI licence (PSA)", "SCS-specific requirements"],
      obligations: ["Reserve \u2265100% in cash/equivalents", "Timely redemption", "Disclosure requirements", "MAS Technology Risk Management"],
      time: "6\u201312 months",
      cost: "SGD 100K\u2013300K",
      alts: ["EU MiCA", "Dubai VARA"],
      authority: "Monetary Authority of Singapore (MAS)"
    },
    uk: {
      regime: "FCA \u2014 Fiat-backed stablecoin regime (upcoming)",
      risk: "med",
      licenses: ["FCA authorisation (proposed)", "EMI licence (current)"],
      obligations: ["Reserve backing requirements", "Redemption at par", "Consumer protection", "AML/KYC"],
      time: "12\u201318 months",
      cost: "\u00A350K\u2013\u00A3200K",
      alts: ["EU MiCA (established framework)", "Singapore MAS"],
      authority: "FCA / Bank of England (systemic stablecoins)"
    },
    hk: {
      regime: "HKMA Stablecoin Licensing Regime",
      risk: "med",
      licenses: ["HKMA stablecoin issuer licence (from 2024/2025)"],
      obligations: ["Full reserve backing", "Redemption at par within 1 business day", "Governance requirements", "AML/KYC"],
      time: "12\u201318 months",
      cost: "HKD 500K\u20131.5M",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "Hong Kong Monetary Authority (HKMA)"
    },
    ch: {
      regime: "FINMA \u2014 Deposit-taking or collective investment scheme",
      risk: "med",
      licenses: ["Banking licence or FinTech licence", "VQF/SRO membership (AML)"],
      obligations: ["Deposit guarantee scheme (if banking licence)", "AML AMLA", "Reserve management", "FINMA reporting"],
      time: "6\u201318 months",
      cost: "CHF 100K\u2013500K",
      alts: ["Liechtenstein TVTG", "EU MiCA"],
      authority: "FINMA Switzerland"
    },
    li: {
      regime: "TVTG \u2014 Token Emitter SP + EEA passporting",
      risk: "low",
      licenses: ["SP Token Emitter licence (FMA)", "EMI equivalent if fiat-pegged"],
      obligations: ["AML TVTG", "Reserve management", "FMA annual report", "Fit & proper"],
      time: "3\u20139 months",
      cost: "CHF 30K\u2013100K",
      alts: ["Switzerland FINMA", "EU MiCA via EEA"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — Electronic Payment Instrument (stablecoin law 2023)",
      risk: "high",
      licenses: ["Banking licence or trust company licence", "Fund transfer service provider"],
      obligations: ["1:1 reserve in bank deposits or trust", "Redemption at par on demand", "KYC/AML", "FSA reporting"],
      time: "12–24 months",
      cost: "¥20M–¥100M ($140K–$700K)",
      alts: ["Singapore MAS (SCS)", "EU MiCA"],
      authority: "FSA Japan",
      xrplNote: "Japan's 2023 stablecoin law is one of the first comprehensive frameworks. RLUSD could qualify under this regime for Japanese market."
    },
    kr: {
      regime: "FSC — Stablecoin regulation (proposed 2025)",
      risk: "high",
      licenses: ["Expected: FSC authorization + bank partnership", "VASP registration (existing)"],
      obligations: ["1:1 reserve (expected)", "Real-name bank account", "KYC/AML", "ISMS-P certification"],
      time: "12–18 months (once framework enacted)",
      cost: "₩200M–₩1B ($150K–$750K)",
      alts: ["Japan FSA (established framework)", "Singapore MAS (SCS)"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "RBI — No stablecoin framework (effectively banned for INR-pegged)",
      risk: "high",
      licenses: ["No licence available for INR-pegged stablecoins", "FIU registration for foreign stablecoins"],
      obligations: ["30% VDA tax", "1% TDS", "RBI hostile stance on private stablecoins", "CBDC (e-Rupee) preferred by RBI"],
      time: "N/A — regulatory clarity pending",
      cost: "N/A",
      alts: ["Dubai VARA", "Singapore MAS", "EU MiCA"],
      authority: "RBI / SEBI (proposed)"
    },
    br: {
      regime: "BCB — Real-pegged stablecoin regulation (emerging)",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if investment element"],
      obligations: ["KYC/AML", "Reserve management", "BCB reporting", "Consumer protection"],
      time: "6–12 months",
      cost: "R$300K–R$1.5M ($60K–$300K)",
      alts: ["EU MiCA", "Singapore MAS"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "No dedicated stablecoin framework yet — falls under SEC Nigeria DASP rules (2022) + CBN Guidelines. USD stablecoins treated as virtual assets.",
      risk: "high",
      licenses: ["SEC Nigeria DASP registration", "CBN Virtual Asset licence if fiat on/off ramp"],
      obligations: ["KYC/AML", "Reserve attestations (best practice, not mandated yet)", "Capital gains tax 10%", "Local entity + directors"],
      time: "9–18 months",
      cost: "NGN 500M paid-up + $200K+ setup",
      alts: ["UAE VARA (dedicated stablecoin framework)", "Singapore MAS SCS"],
      authority: "SEC Nigeria + CBN"
    },
    ke: {
      regime: "VASP Act 2025 covers stablecoins as virtual assets. No dedicated reserve framework.",
      risk: "med",
      licenses: ["VASP licence under VASP Act 2025", "CMA approval for token offerings"],
      obligations: ["KYC/AML", "Reserve transparency (best practice)", "Digital Asset Tax 3%", "Consumer protection"],
      time: "9–15 months",
      cost: "KES 10M–30M (~$80K–$240K)",
      alts: ["UAE VARA", "South Africa FSCA", "Singapore MAS"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "Crypto Asset Declaration (FSCA 2022) — stablecoins are financial products. SARB exchange control rules also apply.",
      risk: "med",
      licenses: ["CASP licence (FAIS Act)", "SARB approval for cross-border flows", "Potential banking licence if deposit-like"],
      obligations: ["FSCA FAIS fit-and-proper", "SARB exchange control reporting", "Reserve disclosures (best practice)", "Customer due diligence + Travel Rule"],
      time: "9–18 months",
      cost: "ZAR 2M–8M (~$110K–$440K)",
      alts: ["UAE VARA dedicated stablecoin", "UK FCA e-money"],
      authority: "FSCA + SARB + FIC"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CRYPTO CUSTODY / WALLET
  // ═══════════════════════════════════════════════════════════════
  custody: {
    eu: {
      regime: "CASP Art. 75 MiCA \u2014 Custody & Administration",
      risk: "high",
      licenses: ["CASP custody authorization (NCA)", "Capital min. \u20AC150K (custody)"],
      obligations: ["Asset segregation (on-chain + off-chain)", "Liability for loss of assets", "Governance & cybersecurity", "Record-keeping 5 years", "Insurance or own funds coverage", "KYC/AML", "FATF Travel Rule"],
      time: "12\u201318 months",
      cost: "\u20AC100K\u2013\u20AC350K",
      alts: ["Liechtenstein TVTG Token Custodian (3\u20139 months)", "Switzerland FINMA", "Singapore MAS"],
      authority: "NCA / ESMA",
      xrplNote: "XRPL offers 10 custody implementation methods with different regulatory classifications. SingleKey (custodial), SignerList multisig (grey zone depending on quorum), MPC/TSS (grey zone), Escrow/PayChannels/Checks (non-custodial). See custody implementations for details.",
      custodyNote: "Under MiCA Art. 75, custodians are liable for loss of crypto-assets unless they prove the loss arose from events beyond reasonable control. This applies to any service holding private keys on behalf of clients."
    },
    us: {
      regime: "State trust charter + SEC qualified custodian rule + CLARITY Act custody provisions (2025)",
      risk: "high",
      licenses: ["State trust charter (NY, Wyoming SPDI, South Dakota, etc.)", "FinCEN MSB registration", "SEC qualified custodian status for institutional clients", "CLARITY Act: CFTC-registered 'digital commodity custodian' for CFTC-jurisdiction assets"],
      obligations: ["BSA/AML compliance", "SAR filings", "OFAC screening", "SOC 2 Type II audit", "Cold storage requirements (institutional clients)", "Insurance (crime + cyber policy)", "CLARITY Act: segregation of customer digital commodities + prohibition on rehypothecation absent consent", "GENIUS Act: special rules apply when custodying qualifying stablecoins"],
      time: "12\u201324 months",
      cost: "$300K\u2013$1M+",
      alts: ["Wyoming SPDI charter (faster path)", "EU MiCA CASP", "Liechtenstein TVTG", "Dubai VARA custody"],
      authority: "State regulators / SEC / CFTC / FinCEN / OCC",
      xrplNote: "XRPL custody: SEC qualified custodian rules apply for securities-like XRPL tokens; CLARITY Act (2025) shifts 'digital commodity' custody under CFTC (applies to XRP per SEC v. Ripple secondary-sales holding). MPC/TSS (Fireblocks, Silence Labs) widely used for institutional XRPL custody. SignerList multisig provides native on-chain alternative."
    },
    uae: {
      regime: "VARA \u2014 VA Custody Services",
      risk: "med",
      licenses: ["VARA VA custody licence"],
      obligations: ["Asset segregation", "Cold storage majority", "KYC/AML", "Insurance requirements", "Tech audit"],
      time: "6\u201312 months",
      cost: "$75K\u2013$200K",
      alts: ["ADGM FSRA", "Singapore MAS", "Liechtenstein TVTG"],
      authority: "VARA Dubai / FSRA ADGM"
    },
    sg: {
      regime: "MAS \u2014 Digital Payment Token custody (PSA)",
      risk: "med",
      licenses: ["MPI or SPI licence (PSA)", "Custodial services authorization"],
      obligations: ["Safeguarding of customer assets", "Tech Risk Management", "AML/KYC", "Segregation of assets", "Annual audit"],
      time: "6\u201312 months",
      cost: "SGD 75K\u2013200K",
      alts: ["Hong Kong SFC", "EU MiCA", "Liechtenstein TVTG"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 Cryptoasset custody (CASS-like rules upcoming)",
      risk: "med",
      licenses: ["FCA cryptoasset registration", "CASS custody rules (proposed)"],
      obligations: ["AML/KYC", "Asset segregation", "Consumer Duty", "Adequate insurance", "Operational resilience"],
      time: "12\u201318 months",
      cost: "\u00A350K\u2013\u00A3150K",
      alts: ["EU MiCA", "Liechtenstein TVTG", "Switzerland FINMA"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC VATP \u2014 custody requirements",
      risk: "high",
      licenses: ["SFC VASP licence (includes custody)", "Type 1 licensed corporation"],
      obligations: ["Cold storage >98%", "Insurance >\u00BD of assets", "Asset segregation", "KYC/AML AMLO", "Annual audit"],
      time: "12\u201318 months",
      cost: "HKD 500K\u20132M",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 DLT Act custody provisions",
      risk: "med",
      licenses: ["VQF/SRO membership (AML)", "DLT Trading Facility or FinTech licence"],
      obligations: ["Segregation of client crypto-assets in bankruptcy", "AML AMLA", "KYC/KYB", "Reporting"],
      time: "6\u201318 months",
      cost: "CHF 50K\u2013300K",
      alts: ["Liechtenstein TVTG", "EU MiCA"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Token Custodian SP licence",
      risk: "low",
      licenses: ["SP Token Custodian licence (FMA)", "EEA passporting available"],
      obligations: ["AML TVTG", "Fit & proper", "Asset segregation", "FMA annual reporting"],
      time: "3\u20139 months",
      cost: "CHF 15K\u201380K",
      alts: ["Switzerland FINMA", "EU MiCA via EEA"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — Crypto-Asset Custody (CAESP framework)",
      risk: "high",
      licenses: ["CAESP registration (FSA)", "Trust company licence (for institutional)"],
      obligations: ["Cold wallet segregation (>95%)", "User asset protection trust", "KYC/AML (JAFIC)", "FSA annual audit", "Insurance or reserves"],
      time: "12–24 months",
      cost: "¥15M–¥80M ($105K–$560K)",
      alts: ["Singapore MAS", "EU MiCA", "Liechtenstein TVTG"],
      authority: "FSA Japan",
      xrplNote: "Japan FSA requires strict cold wallet segregation. XRPL SignerList multisig can provide on-chain proof of segregation. MPC/TSS solutions from Fireblocks widely used by Japanese exchanges."
    },
    kr: {
      regime: "VASP Registration + ISMS-P (custody provisions)",
      risk: "high",
      licenses: ["VASP registration (FIU)", "ISMS-P certification"],
      obligations: ["Real-name bank partnership", "Cold storage majority", "KYC/AML", "ISMS-P information security", "Insurance"],
      time: "12–18 months",
      cost: "₩150M–₩700M ($110K–$520K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FIU / FSC Korea"
    },
    in: {
      regime: "FIU-IND Registration (no specific custody framework)",
      risk: "med",
      licenses: ["FIU-IND registration", "No specific custody licence yet"],
      obligations: ["KYC/AML under PMLA", "FIU reporting", "30% VDA tax applies", "1% TDS on transfers"],
      time: "3–6 months",
      cost: "₹10L–₹30L ($12K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND"
    },
    br: {
      regime: "BCB VASP — Custody provisions (Law 14.478)",
      risk: "med",
      licenses: ["BCB VASP authorization"],
      obligations: ["Asset segregation", "KYC/AML", "Governance", "BCB reporting"],
      time: "6–12 months",
      cost: "R$200K–R$800K ($40K–$160K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB"
    },
    ng: {
      regime: "SEC Nigeria — Digital Asset Custodian (DACS) under 2022 Rules",
      risk: "high",
      licenses: ["DACS licence (SEC Nigeria)", "CBN oversight for fiat leg"],
      obligations: ["Asset segregation (cold storage recommended)", "KYC/AML", "Cybersecurity controls", "Capital adequacy (min NGN 500M)", "Insurance for assets under custody"],
      time: "12–18 months",
      cost: "NGN 500M paid-up + $200K–$500K setup",
      alts: ["UAE VARA custody", "Ghana sandbox"],
      authority: "SEC Nigeria + CBN"
    },
    ke: {
      regime: "VASP Act 2025 — custody as licensed activity under CMA",
      risk: "med",
      licenses: ["Custody VASP licence (CMA)", "FRC notification"],
      obligations: ["Segregation of customer assets", "KYC/AML per POCAMLA", "Cold storage best practices", "Insurance cover", "Reporting to CMA quarterly"],
      time: "9–15 months",
      cost: "KES 10M–30M (~$80K–$240K)",
      alts: ["South Africa FSCA", "UAE VARA"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP — custody category under FAIS Act (2023+)",
      risk: "med",
      licenses: ["CASP licence — custody category", "FIC registration"],
      obligations: ["Asset segregation", "SOC 2-like controls", "Insurance PI cover", "Customer risk assessment", "Travel Rule from Apr 2023", "FSCA annual audit"],
      time: "6–12 months",
      cost: "ZAR 2M–6M (~$110K–$330K)",
      alts: ["UAE VARA custody", "UK FCA"],
      authority: "FSCA + FIC + SARB"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // DAPP \u2014 FINANCIAL (DEX, AMM, Lending)
  // ═══════════════════════════════════════════════════════════════
  dapp_fin: {
    eu: {
      regime: "MiCA CASP (if operator identifiable) or DeFi exclusion",
      risk: "high",
      licenses: ["CASP authorization if identifiable operator", "DLT Pilot Regime (for security tokens)"],
      obligations: ["If CASP: full KYC/AML, capital, whitepaper", "If truly decentralized: MiCA exclusion (no identifiable operator)", "Front-end operator analysis required", "Market abuse rules if listed tokens"],
      time: "12\u201318 months (if CASP needed)",
      cost: "\u20AC50K\u2013\u20AC200K",
      alts: ["Liechtenstein TVTG", "Switzerland (flexible DeFi stance)", "Singapore MAS"],
      authority: "AMF (France) / ESMA",
      xrplNote: "XRPL native DEX + AMM (XLS-30): protocol-level features with no single operator. However, a front-end DApp routing users to XRPL DEX/AMM may trigger CASP obligations if it controls order flow or fund routing. DFSA-style decentralization test applies."
    },
    us: {
      regime: "SEC / CFTC jurisdiction + FinCEN MSB",
      risk: "high",
      licenses: ["FinCEN MSB (if touching funds)", "SEC broker-dealer (if securities)", "CFTC registration (if derivatives/swaps)"],
      obligations: ["Howey Test analysis for each token", "BSA/AML", "OFAC screening", "Potential SEC enforcement risk"],
      time: "18\u201336 months",
      cost: "$200K\u2013$1M+",
      alts: ["EU MiCA (clearer DeFi rules)", "Singapore (more pragmatic)"],
      authority: "SEC / CFTC / FinCEN",
      xrplNote: "XRPL AMM and DEX: SEC may view front-end interfaces as facilitating unregistered exchange. XRP itself not a security in secondary sales, but other XRPL tokens require individual Howey analysis."
    },
    uae: {
      regime: "VARA \u2014 DeFi framework (evolving)",
      risk: "med",
      licenses: ["VARA VASP licence (if identifiable operator)"],
      obligations: ["KYC/AML", "Smart contract audit", "Governance framework", "Capital requirements"],
      time: "6\u201312 months",
      cost: "$50K\u2013$150K",
      alts: ["Singapore MAS", "Liechtenstein TVTG", "EU MiCA"],
      authority: "VARA Dubai"
    },
    sg: {
      regime: "MAS PSA \u2014 DPT service provider",
      risk: "med",
      licenses: ["MPI/SPI licence if facilitating exchange", "Exemption if fully decentralized"],
      obligations: ["KYC/AML", "Tech Risk Management", "User protection"],
      time: "6\u201312 months",
      cost: "SGD 50K\u2013150K",
      alts: ["Dubai VARA", "EU MiCA", "Liechtenstein TVTG"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 crypto business registration",
      risk: "med",
      licenses: ["FCA registration", "Possible MiFID II scope (if derivatives)"],
      obligations: ["AML/KYC", "Consumer Duty", "Financial promotions"],
      time: "12\u201318 months",
      cost: "\u00A330K\u2013\u00A3100K",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 VATP licensing (if centralized elements)",
      risk: "high",
      licenses: ["SFC VASP licence", "Type 7 if automated trading"],
      obligations: ["KYC/AML AMLO", "Smart contract audit", "Retail safeguards"],
      time: "12\u201318 months",
      cost: "HKD 500K\u20131.5M",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 case-by-case DeFi analysis",
      risk: "med",
      licenses: ["VQF/SRO (AML)", "FinTech or DLT licence if applicable"],
      obligations: ["AML if financial intermediary", "KYC for on/off-ramps"],
      time: "6\u201312 months",
      cost: "CHF 30K\u2013200K",
      alts: ["Liechtenstein TVTG", "EU MiCA"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 multiple SP types applicable",
      risk: "low",
      licenses: ["Relevant SP licence(s) from FMA"],
      obligations: ["AML TVTG", "Fit & proper", "Smart contract documentation"],
      time: "3\u20139 months",
      cost: "CHF 15K\u201380K",
      alts: ["Switzerland FINMA", "EU MiCA via EEA"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — CAESP or Financial Instruments (depending on function)",
      risk: "high",
      licenses: ["CAESP registration (if exchange function)", "Type I/II Financial Instruments Business (if derivatives/lending)"],
      obligations: ["KYC/AML", "User asset protection", "FSA compliance", "Smart contract audit recommended"],
      time: "12–24 months",
      cost: "¥10M–¥50M ($70K–$350K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan",
      xrplNote: "XRPL native DEX + AMM (XLS-30): FSA may consider front-end DApp as CAESP if it facilitates exchange. Protocol-level AMM has no operator — but front-end analysis required."
    },
    kr: {
      regime: "VASP + potential FSC fintech sandbox",
      risk: "high",
      licenses: ["VASP registration", "ISMS-P certification", "FSC sandbox for innovative products"],
      obligations: ["KYC with real-name accounts", "AML/AMLCFT", "ISMS-P security"],
      time: "12–18 months",
      cost: "₩100M–₩500M ($75K–$375K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FIU / FSC Korea"
    },
    in: {
      regime: "No specific DeFi framework — VDA tax applies",
      risk: "med",
      licenses: ["FIU-IND registration", "No DeFi-specific licence"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML under PMLA if centralized elements"],
      time: "3–6 months",
      cost: "₹5L–₹20L ($6K–$24K)",
      alts: ["Singapore", "Dubai VARA"],
      authority: "FIU-IND / SEBI"
    },
    br: {
      regime: "BCB VASP + CVM oversight (if securities element)",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities/derivatives"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$150K–R$600K ($30K–$120K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // DAPP \u2014 UTILITY (Social, Identity, DAO)
  // ═══════════════════════════════════════════════════════════════
  dapp_util: {
    eu: {
      regime: "MiCA light regime (utility tokens) or outside scope",
      risk: "low",
      licenses: ["No CASP needed if purely utility", "Whitepaper notification to NCA if token >\u20AC1M"],
      obligations: ["Whitepaper (simplified)", "No misleading marketing", "GDPR if handling personal data", "DAO: risk of requalification as company"],
      time: "1\u20133 months",
      cost: "\u20AC5K\u2013\u20AC30K",
      alts: ["Liechtenstein TVTG (most comprehensive DAO framework)"],
      authority: "NCA / ESMA",
      xrplNote: "XRPL-based identity or social DApps using Trust Lines or NFTs (XLS-20) for credentials: utility token treatment likely under MiCA. No CASP needed if no financial service."
    },
    us: {
      regime: "Minimal federal regulation (if no financial service)",
      risk: "low",
      licenses: ["No federal licence if pure utility", "State consumer protection laws apply"],
      obligations: ["Howey Test analysis (ensure not a security)", "Privacy laws (state level, CCPA)", "DAO: legal wrapper recommended (Wyoming DAO LLC)"],
      time: "1\u20133 months",
      cost: "$5K\u2013$20K",
      alts: ["Wyoming (DAO LLC available)"],
      authority: "SEC (only if token is security) / FTC"
    },
    uae: {
      regime: "Minimal regulation for pure utility DApps",
      risk: "low",
      licenses: ["VARA advisory may apply if tokens involved"],
      obligations: ["Data protection (DIFC/ADGM)", "Consumer protection"],
      time: "1\u20133 months",
      cost: "$5K\u2013$20K",
      alts: ["Singapore", "EU"],
      authority: "VARA (advisory)"
    },
    sg: {
      regime: "Not regulated if no DPT service",
      risk: "low",
      licenses: ["No MAS licence needed if pure utility"],
      obligations: ["PDPA (data protection)", "Consumer protection"],
      time: "1\u20132 months",
      cost: "SGD 5K\u201320K",
      alts: ["EU", "UAE"],
      authority: "MAS (only if DPT)"
    },
    uk: {
      regime: "Unregulated if no financial service",
      risk: "low",
      licenses: ["No FCA registration needed if pure utility"],
      obligations: ["Consumer Rights Act", "UK GDPR", "Financial promotions ban (if marketing tokens)"],
      time: "1\u20132 months",
      cost: "\u00A35K\u2013\u00A315K",
      alts: ["EU", "Singapore"],
      authority: "FCA (only if financial element)"
    },
    hk: {
      regime: "Unregulated if no VA service",
      risk: "low",
      licenses: ["No SFC licence needed if pure utility"],
      obligations: ["PDPO (data protection)", "Consumer protection"],
      time: "1\u20132 months",
      cost: "HKD 20K\u201350K",
      alts: ["Singapore", "EU"],
      authority: "SFC (only if VA)"
    },
    ch: {
      regime: "Utility tokens \u2014 FINMA no-action",
      risk: "low",
      licenses: ["No FINMA licence for pure utility tokens"],
      obligations: ["AML only if financial intermediary", "Data protection"],
      time: "1\u20132 months",
      cost: "CHF 5K\u201320K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 light SP requirements",
      risk: "low",
      licenses: ["SP registration (simplified) or full licence depending on service"],
      obligations: ["AML TVTG (light)", "Documentation requirements"],
      time: "1\u20133 months",
      cost: "CHF 5K\u201325K",
      alts: ["Switzerland", "EU"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "Minimal regulation if no crypto-asset exchange function",
      risk: "low",
      licenses: ["No FSA licence for pure utility", "CAESP if token exchange involved"],
      obligations: ["Consumer protection (Act on Specified Commercial Transactions)", "Data protection (APPI)"],
      time: "1–3 months",
      cost: "¥1M–¥5M ($7K–$35K)",
      alts: ["Singapore", "EU"],
      authority: "FSA (only if crypto-asset)"
    },
    kr: {
      regime: "Unregulated if no VA service",
      risk: "low",
      licenses: ["No VASP registration needed if pure utility"],
      obligations: ["PIPA (data protection)", "Consumer protection"],
      time: "1–2 months",
      cost: "₩10M–₩30M ($7K–$22K)",
      alts: ["Japan", "Singapore"],
      authority: "FSC (only if VA)"
    },
    in: {
      regime: "No specific regulation for utility DApps",
      risk: "low",
      licenses: ["FIU registration if VDA involved"],
      obligations: ["IT Act compliance", "Data protection (DPDP Act 2023)"],
      time: "1–2 months",
      cost: "₹2L–₹10L ($2.4K–$12K)",
      alts: ["Singapore", "EU"],
      authority: "MeitY / FIU-IND"
    },
    br: {
      regime: "Minimal regulation for pure utility",
      risk: "low",
      licenses: ["BCB VASP only if VA service"],
      obligations: ["Consumer protection (CDC)", "LGPD (data protection)"],
      time: "1–3 months",
      cost: "R$20K–R$100K ($4K–$20K)",
      alts: ["EU", "Singapore"],
      authority: "BCB (only if VA)"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // NFT MINTING / MARKETPLACE
  // ═══════════════════════════════════════════════════════════════
  nft: {
    eu: {
      regime: "MiCA exclusion (unique NFTs) or ART (if fungible series)",
      risk: "med",
      licenses: ["No CASP for truly unique 1/1 NFTs", "CASP + ART rules if large fungible series", "Marketplace CASP if intermediating trades"],
      obligations: ["Uniqueness assessment (MiCA Art. 4)", "AML if marketplace", "Consumer protection (distance selling)", "IP rights management"],
      time: "3\u20136 months (marketplace) or 1 month (1/1 NFTs)",
      cost: "\u20AC10K\u2013\u20AC100K",
      alts: ["Liechtenstein TVTG", "Singapore (light touch)"],
      authority: "NCA / ESMA",
      xrplNote: "XRPL NFTs (XLS-20): native standard with broker mode. Broker mode enables non-custodial marketplace \u2014 atomic swap, broker never holds NFT. No CASP needed for broker mode. TransferFee enables on-chain royalties (0\u201350%)."
    },
    us: {
      regime: "SEC analysis required (Howey Test per collection)",
      risk: "med",
      licenses: ["No specific NFT licence", "SEC registration if deemed security", "State consumer protection"],
      obligations: ["Howey Test analysis per collection", "IP/copyright compliance", "State sales tax considerations", "AML if marketplace with volume"],
      time: "1\u20136 months",
      cost: "$10K\u2013$100K",
      alts: ["EU (MiCA exclusion for unique NFTs)", "Singapore"],
      authority: "SEC / FTC / state regulators"
    },
    uae: {
      regime: "VARA \u2014 VA Advisory for NFTs",
      risk: "low",
      licenses: ["VARA advisory (NFT-specific guidance)", "Full VASP licence for marketplace"],
      obligations: ["AML for marketplace", "Consumer protection"],
      time: "3\u20136 months",
      cost: "$20K\u2013$75K",
      alts: ["Singapore", "EU MiCA exclusion"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS \u2014 generally outside PSA scope",
      risk: "low",
      licenses: ["No MAS licence for unique NFTs", "PSA if NFT used as DPT"],
      obligations: ["Consumer protection", "AML if marketplace"],
      time: "1\u20133 months",
      cost: "SGD 10K\u201350K",
      alts: ["UAE", "EU"],
      authority: "MAS (only if DPT)"
    },
    uk: {
      regime: "FCA \u2014 unregulated (unique NFTs)",
      risk: "low",
      licenses: ["No FCA registration for unique NFTs", "Registration if fractionalized or fungible"],
      obligations: ["Consumer Rights Act", "AML if marketplace", "Financial promotions (if investment)"],
      time: "1\u20133 months",
      cost: "\u00A35K\u2013\u00A330K",
      alts: ["EU", "Singapore"],
      authority: "FCA (limited)"
    },
    hk: {
      regime: "SFC \u2014 case-by-case assessment",
      risk: "low",
      licenses: ["SFC licensing if fractionalized or securities-like"],
      obligations: ["AML AMLO if marketplace", "Consumer protection"],
      time: "1\u20136 months",
      cost: "HKD 20K\u2013200K",
      alts: ["Singapore", "UAE"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 no specific NFT rules",
      risk: "low",
      licenses: ["No FINMA licence for unique NFTs", "Securities law if investment NFTs"],
      obligations: ["AML if financial intermediary", "Consumer protection"],
      time: "1\u20133 months",
      cost: "CHF 10K\u201340K",
      alts: ["Liechtenstein TVTG", "EU"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Token as container model",
      risk: "low",
      licenses: ["SP licence if providing NFT services"],
      obligations: ["AML TVTG", "Token classification documentation"],
      time: "1\u20133 months",
      cost: "CHF 10K\u201340K",
      alts: ["Switzerland", "EU"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — NFTs generally unregulated unless fungible/financial",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "No specific NFT regulation — VASP if exchange",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "VDA tax on NFT transactions (30%)",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "No specific NFT framework — BCB/CVM if financial",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // MPT / MULTI-PURPOSE TOKEN (XLS-33)
  // ═══════════════════════════════════════════════════════════════
  mpt: {
    eu: {
      regime: "MiCA \u2014 classification depends on use (Utility/EMT/ART)",
      risk: "high",
      licenses: ["CASP if providing services around MPT", "EMI if fiat-backed", "NCA authorization if ART"],
      obligations: ["Legal qualification mandatory before launch", "Whitepaper", "KYC/AML", "lsfRequireAuth enables on-chain KYC gating", "lsfLocked enables AML holds"],
      time: "6\u201318 months",
      cost: "\u20AC50K\u2013\u20AC300K",
      alts: ["Liechtenstein TVTG (flexible token classification)", "Switzerland FINMA"],
      authority: "NCA / ESMA",
      xrplNote: "MPT (XLS-33) is XRPL\u2019s programmable token standard. No explicit MiCA category yet. lsfRequireAuth = on-chain KYC gating. lsfLocked = AML holds. Transfer fees programmable. Legal qualification critical before launch."
    },
    us: {
      regime: "SEC/CFTC analysis required per use case",
      risk: "high",
      licenses: ["Depends on classification (security vs. commodity vs. utility)", "SEC registration if security", "CFTC if commodity derivative"],
      obligations: ["Howey Test analysis", "If security: Reg D/Reg S/Reg A+ exemptions", "BSA/AML if financial service"],
      time: "6\u201324 months",
      cost: "$100K\u2013$500K",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "SEC / CFTC"
    },
    uae: {
      regime: "VARA \u2014 case-by-case token classification",
      risk: "med",
      licenses: ["VARA VASP licence based on token use"],
      obligations: ["Token classification filing", "KYC/AML", "Smart contract audit"],
      time: "6\u201312 months",
      cost: "$50K\u2013$150K",
      alts: ["Singapore", "EU MiCA", "Liechtenstein TVTG"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS PSA if DPT, SFA if security",
      risk: "med",
      licenses: ["MPI/SPI if DPT", "Capital Markets Services licence if security"],
      obligations: ["Token classification", "KYC/AML", "Tech Risk Management"],
      time: "6\u201312 months",
      cost: "SGD 50K\u2013200K",
      alts: ["UAE", "EU MiCA"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 depends on token classification",
      risk: "med",
      licenses: ["FCA registration if cryptoasset", "FCA authorization if security token"],
      obligations: ["Token classification", "AML/KYC", "Consumer Duty if retail"],
      time: "6\u201318 months",
      cost: "\u00A330K\u2013\u00A3150K",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 case-by-case",
      risk: "med",
      licenses: ["SFC licensing depends on classification"],
      obligations: ["Legal opinion on classification", "AML AMLO"],
      time: "6\u201318 months",
      cost: "HKD 200K\u20131M",
      alts: ["Singapore", "UAE"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA token classification framework",
      risk: "med",
      licenses: ["Depends on FINMA classification (payment/utility/asset)"],
      obligations: ["FINMA classification filing", "AML if financial element"],
      time: "3\u201312 months",
      cost: "CHF 30K\u2013200K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Token as Container Model (most flexible)",
      risk: "low",
      licenses: ["Relevant SP licence(s)", "FMA token classification"],
      obligations: ["AML TVTG", "Token documentation", "Fit & proper"],
      time: "3\u20139 months",
      cost: "CHF 15K\u201380K",
      alts: ["Switzerland FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA case-by-case token classification",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "FSC token classification required",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "No framework — VDA taxation applies",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "BCB/CVM classification based on function",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // RWA \u2014 REAL-WORLD ASSET TOKENISATION
  // ═══════════════════════════════════════════════════════════════
  rwa: {
    eu: {
      regime: "MiCA ART + MiFID II (if securities) + DLT Pilot Regime",
      risk: "high",
      licenses: ["CASP or investment firm licence", "DLT Pilot Regime participation (sandbox)", "Prospectus (if securities)"],
      obligations: ["Prospectus Regulation compliance", "MiFID II if securities", "AML/KYC", "Asset valuation and audits", "Investor suitability assessment"],
      time: "12\u201324 months",
      cost: "\u20AC100K\u2013\u20AC500K+",
      alts: ["Liechtenstein TVTG (Physical Validator SP)", "Switzerland (DLT Act)", "Singapore"],
      authority: "NCA / ESMA / AMF",
      xrplNote: "XRPL supports RWA tokenisation via IOU/Trust Lines (existing) or MPT XLS-33 (programmable compliance flags). Escrow enables delivery-vs-payment. Trust Line freeze flags provide compliance enforcement."
    },
    us: {
      regime: "SEC Securities law + Reg D/S/A+ exemptions",
      risk: "high",
      licenses: ["SEC registration or exemption (Reg D/Reg S/Reg A+)", "Broker-dealer registration", "ATS registration if secondary trading"],
      obligations: ["Securities law full compliance", "Accredited investor verification (Reg D)", "SEC filing requirements", "Transfer restrictions"],
      time: "6\u201324 months",
      cost: "$200K\u2013$1M+",
      alts: ["EU DLT Pilot Regime", "Liechtenstein TVTG", "Switzerland"],
      authority: "SEC / FINRA"
    },
    uae: {
      regime: "ADGM/DIFC \u2014 digital securities framework",
      risk: "med",
      licenses: ["FSRA licence (ADGM)", "DFSA licence (DIFC)"],
      obligations: ["Prospectus requirements", "KYC/AML", "Custody of underlying assets"],
      time: "6\u201312 months",
      cost: "$75K\u2013$250K",
      alts: ["Singapore", "EU DLT Pilot", "Liechtenstein"],
      authority: "FSRA ADGM / DFSA DIFC"
    },
    sg: {
      regime: "MAS SFA \u2014 Capital Markets Products",
      risk: "med",
      licenses: ["Capital Markets Services licence", "Recognized Market Operator (if exchange)"],
      obligations: ["SFA prospectus", "KYC/AML", "Ongoing disclosure"],
      time: "6\u201318 months",
      cost: "SGD 100K\u2013400K",
      alts: ["EU DLT Pilot", "Liechtenstein TVTG"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 Security Token Offering (STO) rules",
      risk: "high",
      licenses: ["FCA authorized firm", "Prospectus exemption or full prospectus"],
      obligations: ["FCA Handbook (COBS)", "Consumer Duty", "AML/KYC", "Custody rules (CASS)"],
      time: "12\u201318 months",
      cost: "\u00A3100K\u2013\u00A3400K",
      alts: ["EU DLT Pilot", "Liechtenstein TVTG"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 security token regime",
      risk: "high",
      licenses: ["Type 1 (dealing) and/or Type 9 (asset management)", "SFC authorization"],
      obligations: ["SFO compliance", "Professional investor restriction", "Custody requirements"],
      time: "12\u201318 months",
      cost: "HKD 500K\u20132M",
      alts: ["Singapore", "EU DLT Pilot"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA DLT Act \u2014 tokenised securities",
      risk: "med",
      licenses: ["DLT Trading Facility licence", "Securities dealer (if applicable)"],
      obligations: ["DLT Act compliance", "AML AMLA", "Prospectus (if public offering)"],
      time: "6\u201318 months",
      cost: "CHF 100K\u2013500K",
      alts: ["Liechtenstein TVTG", "EU DLT Pilot"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Physical Validator + Token Emitter SP",
      risk: "low",
      licenses: ["SP Physical Validator licence", "SP Token Emitter licence"],
      obligations: ["AML TVTG", "Physical asset validation", "Token documentation", "EEA passporting for distribution"],
      time: "3\u20139 months",
      cost: "CHF 20K\u2013100K",
      alts: ["Switzerland DLT Act", "EU DLT Pilot"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — Security Token Offering (STO) regime",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "FSC — Tokenised securities (STO sandbox)",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "SEBI sandbox for tokenised securities (proposed)",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "CVM — Digital asset securities framework",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // GAMING / GAMEFI / NFT GAMING
  // ═══════════════════════════════════════════════════════════════
  gaming: {
    eu: {
      regime: "MiCA + national gambling laws + JONUM (France)",
      risk: "med",
      licenses: ["CASP if in-game token is crypto-asset", "Gambling licence if chance + monetary gain", "JONUM compliance (France): 3 criteria test"],
      obligations: ["JONUM test (France): public offer + chance-based gain + financial sacrifice", "Consumer protection", "Age verification", "If gambling: national gambling authority licence", "Loot box disclosure (NL, BE bans)"],
      time: "6\u201318 months",
      cost: "\u20AC30K\u2013\u20AC200K",
      alts: ["Singapore (lighter GameFi stance)", "UAE (VARA gaming-friendly)", "Liechtenstein"],
      authority: "NCA / ANJ (France gambling) / ESMA",
      xrplNote: "XRPL NFTs (XLS-20) for in-game items: non-custodial broker mode avoids CASP. Payment Channels enable streaming micropayments for gameplay. Sorare/ANJ precedent (2022) relevant for France."
    },
    us: {
      regime: "State gambling laws + SEC/FTC analysis",
      risk: "med",
      licenses: ["State gambling licence if chance-based rewards", "SEC analysis if token is security"],
      obligations: ["Gambling law compliance (state-by-state)", "FTC consumer protection", "COPPA if under-13 users", "Loot box disclosure (emerging)"],
      time: "6\u201318 months",
      cost: "$50K\u2013$300K",
      alts: ["EU (clearer framework)", "Singapore"],
      authority: "State gambling commissions / SEC / FTC"
    },
    uae: {
      regime: "VARA \u2014 gaming-friendly VASP framework",
      risk: "low",
      licenses: ["VARA advisory for GameFi", "Full VASP if exchange element"],
      obligations: ["KYC for withdrawals", "Consumer protection", "No gambling (Islamic law)"],
      time: "3\u20136 months",
      cost: "$20K\u2013$75K",
      alts: ["Singapore", "Liechtenstein"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS + Remote Gambling Act analysis",
      risk: "low",
      licenses: ["No MAS licence if pure gaming utility", "Remote Gambling Act if chance + real-money"],
      obligations: ["Gambling analysis", "Consumer protection", "PDPA"],
      time: "3\u20136 months",
      cost: "SGD 20K\u201375K",
      alts: ["UAE", "EU"],
      authority: "MAS / Casino Regulatory Authority"
    },
    uk: {
      regime: "Gambling Commission + FCA analysis",
      risk: "med",
      licenses: ["Gambling Commission licence if gambling element", "FCA registration if crypto-asset"],
      obligations: ["Gambling Act 2005", "Consumer protection", "Age verification", "AML"],
      time: "6\u201312 months",
      cost: "\u00A320K\u2013\u00A3100K",
      alts: ["UAE", "Singapore"],
      authority: "Gambling Commission / FCA"
    },
    hk: {
      regime: "Gambling Ordinance + SFC analysis",
      risk: "med",
      licenses: ["Gambling licence if applicable", "SFC if securities-like tokens"],
      obligations: ["Gambling Ordinance compliance", "Consumer protection"],
      time: "6\u201312 months",
      cost: "HKD 100K\u2013500K",
      alts: ["Singapore", "UAE"],
      authority: "Home Affairs / SFC"
    },
    ch: {
      regime: "FINMA + Swiss Gambling Act",
      risk: "med",
      licenses: ["FINMA token classification", "Gambling licence if applicable"],
      obligations: ["Swiss Gambling Act", "AML if financial element", "Consumer protection"],
      time: "3\u201312 months",
      cost: "CHF 20K\u2013150K",
      alts: ["Liechtenstein", "UAE"],
      authority: "FINMA / Gambling supervisory authority"
    },
    li: {
      regime: "TVTG + gambling law analysis",
      risk: "low",
      licenses: ["SP licence for token services", "Gambling licence if applicable"],
      obligations: ["AML TVTG", "Token classification"],
      time: "3\u20136 months",
      cost: "CHF 15K\u201360K",
      alts: ["Switzerland", "UAE"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA + Consumer Affairs Agency (gacha/loot box rules)",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "Game Rating Committee + FSC (P2E restricted)",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "No specific GameFi rules — online gaming tax applies",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "No specific GameFi regulation",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CRYPTO PAYMENT / REMITTANCE
  // ═══════════════════════════════════════════════════════════════
  payment: {
    eu: {
      regime: "CASP (MiCA) + PSD2/PSD3 (if fiat conversion)",
      risk: "med",
      licenses: ["CASP authorization (crypto transfer service)", "EMI or PI licence (if fiat on/off-ramp)", "PSD2/PSD3 compliance (fiat leg)"],
      obligations: ["KYC/AML", "FATF Travel Rule", "PSD2 SCA (if fiat)", "Transaction monitoring", "Consumer protection"],
      time: "6\u201318 months",
      cost: "\u20AC50K\u2013\u20AC200K",
      alts: ["Liechtenstein TVTG", "Singapore MAS", "UAE VARA"],
      authority: "NCA / ESMA / ECB",
      xrplNote: "XRPL Payment Channels enable streaming micropayments with instant off-chain settlement. No custody = no CASP for channel itself. If converting to fiat at exit: CASP transfer service or EMI licence may apply. IOU/Trust Lines for cross-border remittance."
    },
    us: {
      regime: "FinCEN MSB + State MTL",
      risk: "high",
      licenses: ["FinCEN MSB registration", "State MTL (each state)", "BitLicense (NY)"],
      obligations: ["BSA/AML", "OFAC screening", "Travel Rule >$3K", "State bonding"],
      time: "12\u201336 months",
      cost: "$150K\u2013$500K+",
      alts: ["EU MiCA", "Singapore MAS"],
      authority: "FinCEN / state regulators"
    },
    uae: {
      regime: "VARA + CBUAE",
      risk: "med",
      licenses: ["VARA VASP licence", "CBUAE stored value licence (if applicable)"],
      obligations: ["KYC/AML", "Capital requirements", "Transaction reporting"],
      time: "6\u201312 months",
      cost: "$50K\u2013$150K",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "VARA / CBUAE"
    },
    sg: {
      regime: "MAS PSA \u2014 Payment service provider",
      risk: "med",
      licenses: ["MPI or SPI licence"],
      obligations: ["KYC/AML", "Safeguarding of customer funds", "Tech Risk Management"],
      time: "6\u201312 months",
      cost: "SGD 50K\u2013150K",
      alts: ["UAE VARA", "EU MiCA"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 EMI/PI + crypto registration",
      risk: "med",
      licenses: ["EMI or PI licence (fiat)", "FCA cryptoasset registration"],
      obligations: ["AML/KYC", "Consumer Duty", "Safeguarding client funds", "PSD2 SCA"],
      time: "12\u201318 months",
      cost: "\u00A350K\u2013\u00A3200K",
      alts: ["EU MiCA", "Singapore MAS"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC + HKMA \u2014 SVF/stored value",
      risk: "med",
      licenses: ["SVF licence (HKMA)", "SFC if VA involved"],
      obligations: ["AML AMLO", "Consumer protection", "Capital requirements"],
      time: "6\u201318 months",
      cost: "HKD 200K\u2013800K",
      alts: ["Singapore MAS", "UAE VARA"],
      authority: "HKMA / SFC"
    },
    ch: {
      regime: "FINMA \u2014 FinTech licence or full banking",
      risk: "med",
      licenses: ["FinTech licence (up to CHF 100M deposits)", "VQF/SRO (AML)"],
      obligations: ["AML AMLA", "KYC", "FINMA reporting"],
      time: "6\u201312 months",
      cost: "CHF 50K\u2013200K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Token Exchange/Transfer SP",
      risk: "low",
      licenses: ["Relevant SP licence", "EMI equivalent (if fiat)"],
      obligations: ["AML TVTG", "Fit & proper", "FMA reporting"],
      time: "3\u20139 months",
      cost: "CHF 15K\u201370K",
      alts: ["Switzerland FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — Fund Transfer Service Provider",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "VASP + Electronic Financial Transactions Act",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "RBI — Payment aggregator framework",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "BCB — Payment institution licence (PIX ecosystem)",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "CBN — Payments System Vision + Virtual Asset Guidelines 2023. SEC Nigeria DASP rules for crypto leg. Strong local payment rails (NIBSS).",
      risk: "high",
      licenses: ["CBN Payment Service Bank / Switching Licence", "SEC Nigeria DASP registration for crypto leg", "NFIU registration"],
      obligations: ["KYC/AML per MLPPA 2022", "Travel Rule compliance", "Local Naira settlement (NIBSS integration)", "Consumer protection under CPA", "10% capital gains tax on crypto transfers"],
      time: "12–24 months",
      cost: "NGN 2B+ for PSB + DASP costs ($2M+ range)",
      alts: ["Ghana BoG Payment System Providers", "UAE VARA payment"],
      authority: "CBN + SEC Nigeria + NFIU"
    },
    ke: {
      regime: "VASP Act 2025 (transfer activities) + Payment Systems Act + CBK oversight. M-Pesa ecosystem dominates.",
      risk: "med",
      licenses: ["VASP licence — transfer category (CMA)", "CBK Money Remittance Provider licence (if fiat payout)", "KRA registration"],
      obligations: ["KYC/AML per POCAMLA", "Travel Rule compliance", "Digital Asset Tax 3%", "Consumer protection (CPA 2012)", "M-Pesa/bank integration for KES rail"],
      time: "9–18 months",
      cost: "KES 10M–40M (~$80K–$320K)",
      alts: ["UAE VARA payment", "South Africa FSCA"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP (FAIS Act) + SARB exchange control + payment institution framework (NPS Act)",
      risk: "med",
      licenses: ["CASP licence under FAIS Act", "SARB approval for cross-border flows", "Payments System Operator (PSO) designation if operating rails"],
      obligations: ["SARB exchange control compliance (strict for ZAR outflows)", "Travel Rule since Apr 2023", "FICA AML obligations", "CASP category II or III depending on advice component", "Consumer protection under FAIS"],
      time: "9–15 months",
      cost: "ZAR 2M–8M (~$110K–$440K)",
      alts: ["UAE VARA payment", "UK FCA"],
      authority: "FSCA + SARB + FIC"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // TOKEN ISSUANCE \u2014 UTILITY
  // ═══════════════════════════════════════════════════════════════
  token_utility: {
    eu: {
      regime: "MiCA Utility Token regime (light)",
      risk: "low",
      licenses: ["No CASP authorisation needed", "Whitepaper notification to NCA (if offering >\u20AC1M)"],
      obligations: ["Publish MiCA whitepaper", "No misleading marketing", "NCA notification", "Right of withdrawal (14 days if retail)"],
      time: "1\u20133 months",
      cost: "\u20AC10K\u2013\u20AC50K",
      alts: ["Liechtenstein TVTG", "Switzerland"],
      authority: "NCA"
    },
    us: {
      regime: "Howey Test + CLARITY Act 'mature blockchain' test (2025)",
      risk: "med",
      licenses: ["No licence if genuinely utility AND underlying network passes CLARITY mature-blockchain test (= digital commodity, CFTC path)", "SEC registration + exemption (Reg D/S/A+) if fails Howey"],
      obligations: ["Dual legal opinion: Howey (SEC) + CLARITY mature-blockchain status (CFTC path)", "No investment marketing, no profit promises", "Consumer protection, transparent disclosures", "If CFTC-jurisdiction: spot-market rules + anti-fraud"],
      time: "1\u20136 months (utility) / 6\u201312 months (edge cases)",
      cost: "$20K\u2013$150K (dual legal opinion)",
      alts: ["EU MiCA 'Other crypto-asset' (lighter, whitepaper-only)", "Liechtenstein TVTG"],
      authority: "SEC + CFTC (CLARITY Act split)"
    },
    uae: {
      regime: "VARA \u2014 utility token advisory",
      risk: "low",
      licenses: ["VARA advisory filing"],
      obligations: ["Token classification", "Consumer protection"],
      time: "1\u20133 months",
      cost: "$10K\u2013$30K",
      alts: ["Singapore", "EU"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS \u2014 outside PSA if pure utility",
      risk: "low",
      licenses: ["No MAS licence for pure utility"],
      obligations: ["Ensure not DPT or capital markets product"],
      time: "1\u20132 months",
      cost: "SGD 10K\u201330K",
      alts: ["EU MiCA", "Liechtenstein"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 unregulated utility token",
      risk: "low",
      licenses: ["No FCA registration for utility tokens"],
      obligations: ["Financial promotions regime (marketing)", "Consumer protection"],
      time: "1\u20132 months",
      cost: "\u00A35K\u2013\u00A320K",
      alts: ["EU MiCA"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 generally unregulated utility",
      risk: "low",
      licenses: ["No licence for pure utility"],
      obligations: ["Legal opinion recommended", "Consumer protection"],
      time: "1\u20132 months",
      cost: "HKD 20K\u201350K",
      alts: ["Singapore", "EU"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 utility token classification",
      risk: "low",
      licenses: ["No FINMA licence", "FINMA no-action letter recommended"],
      obligations: ["Token classification filing", "AML only if financial intermediary"],
      time: "1\u20133 months",
      cost: "CHF 10K\u201340K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 SP Token Emitter (light)",
      risk: "low",
      licenses: ["SP Token Emitter (simplified)"],
      obligations: ["AML TVTG (light)", "Token documentation"],
      time: "1\u20133 months",
      cost: "CHF 10K\u201330K",
      alts: ["Switzerland"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — utility token generally outside CAESP",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "Not regulated if pure utility",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "VDA tax applies even for utility tokens",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "Minimal regulation for pure utility",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // TOKEN ISSUANCE \u2014 SECURITY
  // ═══════════════════════════════════════════════════════════════
  token_security: {
    eu: {
      regime: "MiFID II + Prospectus Regulation + DLT Pilot Regime",
      risk: "high",
      licenses: ["Investment firm licence (MiFID II)", "DLT Pilot Regime (sandbox alternative)", "Prospectus approval"],
      obligations: ["Full prospectus (or exemption)", "MiFID II investor protection", "KYC/AML/KYB", "CASS-equivalent custody rules", "Ongoing disclosure"],
      time: "12\u201324 months",
      cost: "\u20AC200K\u2013\u20AC500K+",
      alts: ["DLT Pilot Regime (simplified)", "Liechtenstein TVTG", "Switzerland DLT Act"],
      authority: "NCA / ESMA"
    },
    us: {
      regime: "SEC Securities Act (Reg D / Reg S / Reg A+) + CLARITY Act 'investment contract digital asset' framework (2025)",
      risk: "high",
      licenses: ["SEC registration or exemption (Reg D 506(c), Reg S, Reg A+)", "Broker-dealer registration", "ATS if secondary market", "CLARITY Act: may transition to CFTC 'digital commodity' once mature-blockchain test met"],
      obligations: ["Reg D: accredited investors only, no general solicitation (506b) or with verification (506c)", "Reg S: offshore only", "Reg A+: up to $75M mini-IPO", "Transfer agent requirements", "Blue sky state compliance", "CLARITY Act disclosures for investment contract digital assets (quarterly + annual reports, audit)"],
      time: "6\u201318 months",
      cost: "$200K\u2013$1M+",
      alts: ["Reg S (non-US focus)", "EU DLT Pilot Regime", "Liechtenstein TVTG"],
      authority: "SEC / FINRA / CFTC (post mature-blockchain transition)"
    },
    uae: {
      regime: "ADGM/DIFC \u2014 Regulated digital securities",
      risk: "med",
      licenses: ["FSRA licence (ADGM)", "DFSA licence (DIFC)"],
      obligations: ["Prospectus", "KYC/AML", "Investor suitability"],
      time: "6\u201312 months",
      cost: "$100K\u2013$300K",
      alts: ["Singapore", "EU DLT Pilot"],
      authority: "FSRA / DFSA"
    },
    sg: {
      regime: "MAS SFA \u2014 Digital token offering",
      risk: "med",
      licenses: ["Capital Markets Services licence", "SFA prospectus or exemption"],
      obligations: ["SFA compliance", "KYC/AML", "Ongoing disclosure"],
      time: "6\u201318 months",
      cost: "SGD 100K\u2013400K",
      alts: ["EU DLT Pilot", "Liechtenstein"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 Security Token Offering",
      risk: "high",
      licenses: ["FCA authorized firm", "Prospectus approval"],
      obligations: ["FCA Handbook", "Prospectus Regulation", "Consumer Duty", "CASS custody"],
      time: "12\u201318 months",
      cost: "\u00A3150K\u2013\u00A3400K",
      alts: ["EU DLT Pilot", "Liechtenstein"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 Type 1/Type 9 licensing",
      risk: "high",
      licenses: ["Type 1 (dealing in securities)", "Type 9 (asset management)"],
      obligations: ["SFO full compliance", "Professional investors (institutional focus)", "Custody requirements"],
      time: "12\u201318 months",
      cost: "HKD 500K\u20132M",
      alts: ["Singapore", "EU"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 Asset token / DLT Act",
      risk: "med",
      licenses: ["Securities dealer licence or DLT Trading Facility", "Bank licence (if deposits)"],
      obligations: ["Prospectus (Swiss CO)", "AML AMLA", "DLT Act compliance"],
      time: "6\u201318 months",
      cost: "CHF 100K\u2013500K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 SP Token Emitter + EEA distribution",
      risk: "low",
      licenses: ["SP Token Emitter licence", "EEA prospectus passporting"],
      obligations: ["AML TVTG", "Prospectus (or exemption)", "Fit & proper", "FMA annual report"],
      time: "3\u20139 months",
      cost: "CHF 25K\u2013100K",
      alts: ["Switzerland FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — Type I Financial Instruments (STO)",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "FSC — Capital Markets Act applies",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "SEBI — Securities law applies (proposed framework)",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "CVM — Securities token offering",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // TOKEN ISSUANCE \u2014 HYBRID
  // ═══════════════════════════════════════════════════════════════
  token_hybrid: {
    eu: {
      regime: "MiCA + MiFID II analysis \u2014 stricter regime applies",
      risk: "high",
      licenses: ["CASP + potentially investment firm licence", "Legal qualification mandatory"],
      obligations: ["Dual analysis: utility vs security elements", "Whitepaper + prospectus if security elements", "KYC/AML", "The stricter regime always applies"],
      time: "12\u201324 months",
      cost: "\u20AC100K\u2013\u20AC400K",
      alts: ["Liechtenstein TVTG (flexible classification)", "Switzerland FINMA"],
      authority: "NCA / ESMA"
    },
    us: {
      regime: "SEC analysis \u2014 likely security if any investment element",
      risk: "high",
      licenses: ["SEC registration or exemption", "State compliance"],
      obligations: ["Howey Test \u2014 any investment expectation = security", "Full securities compliance", "Legal opinion critical"],
      time: "6\u201318 months",
      cost: "$150K\u2013$500K+",
      alts: ["Structure as pure utility in US + security elsewhere"],
      authority: "SEC"
    },
    uae: {
      regime: "VARA \u2014 classification determines path",
      risk: "med",
      licenses: ["VARA VASP licence", "FSRA if security elements (ADGM)"],
      obligations: ["Token classification", "KYC/AML", "Dual compliance"],
      time: "6\u201312 months",
      cost: "$75K\u2013$200K",
      alts: ["Singapore", "EU"],
      authority: "VARA / FSRA"
    },
    sg: {
      regime: "MAS \u2014 dual PSA/SFA analysis",
      risk: "med",
      licenses: ["MPI (DPT element) + CMS (security element)"],
      obligations: ["Dual classification analysis", "KYC/AML", "Tech Risk Management"],
      time: "6\u201318 months",
      cost: "SGD 100K\u2013350K",
      alts: ["UAE", "EU"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 stricter classification applies",
      risk: "high",
      licenses: ["FCA authorization", "Potential prospectus"],
      obligations: ["Security classification if investment element", "Consumer Duty", "AML/KYC"],
      time: "12\u201318 months",
      cost: "\u00A3100K\u2013\u00A3300K",
      alts: ["EU", "Liechtenstein"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 security classification likely",
      risk: "high",
      licenses: ["SFC licensing (Type 1/9)"],
      obligations: ["SFO compliance", "Legal opinion required"],
      time: "12\u201318 months",
      cost: "HKD 300K\u20131.5M",
      alts: ["Singapore"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 hybrid = asset token treatment",
      risk: "med",
      licenses: ["FINMA classification \u2014 treated as strictest element"],
      obligations: ["Full FINMA analysis", "AML AMLA", "Prospectus if security"],
      time: "6\u201318 months",
      cost: "CHF 75K\u2013400K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Token Container Model (handles hybrid natively)",
      risk: "low",
      licenses: ["SP licence(s) for relevant services", "EEA distribution"],
      obligations: ["AML TVTG", "Token documentation", "Legal qualification"],
      time: "3\u20139 months",
      cost: "CHF 20K\u2013100K",
      alts: ["Switzerland FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — stricter classification applies",
      risk: "med",
      licenses: ["FSA registration or classification"],
      obligations: ["KYC/AML", "FSA compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapore MAS", "EU MiCA"],
      authority: "FSA Japan"
    },
    kr: {
      regime: "FSC — treated as security if any investment element",
      risk: "med",
      licenses: ["VASP registration or FSC authorization"],
      obligations: ["KYC/AML", "ISMS-P", "Real-name bank account"],
      time: "6–18 months",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea"
    },
    in: {
      regime: "Dual SEBI/RBI analysis required",
      risk: "med",
      licenses: ["FIU-IND registration", "SEBI authorization if securities"],
      obligations: ["30% VDA tax", "1% TDS", "KYC/AML PMLA"],
      time: "3–12 months",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapore MAS", "Dubai VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "CVM/BCB — dual classification",
      risk: "med",
      licenses: ["BCB VASP authorization", "CVM if securities"],
      obligations: ["KYC/AML", "Consumer protection", "BCB reporting"],
      time: "6–12 months",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["EU MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
  },
};
