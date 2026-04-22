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
      xrplNote: "XRPL has a native DEX (order book built into the protocol). A front-end DApp accessing it for EU users may still need CASP if it routes orders or controls funds.",
      reportingFrequency: "Quarterly prudential + transaction reports to NCA · Annual audited accounts · Monthly AML filings · Immediate incident reports · MiCA Art. 80 conflicts-of-interest report annually",
      marketingRules: "Mandatory risk warnings on all communications (MiCA Art. 66). No yield / return promises. Whitepaper and complaint channels must be clearly displayed. Non-misleading requirement strictly enforced. Influencer disclosures required.",
      clientEligibility: "Can serve all EU-27 residents with a single passported CASP. Enhanced due diligence for PEPs and FATF grey/black-list countries. No retail restriction but suitability test required for complex products. Must geo-block jurisdictions without reverse-solicitation chain."
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
      xrplNote: "XRPL DEX front-end: SEC may treat as unregistered exchange if trading securities-token pairs. Under CLARITY Act 2025, XRP (secondary sales, SEC v. Ripple July 2023) likely qualifies as 'digital commodity' \u2014 CFTC jurisdiction. Other XRPL tokens require case-by-case mature-blockchain analysis.",
      reportingFrequency: "SAR filings on suspicious activity (immediate, <30 days) · CTR on cash >$10K · FinCEN Form 107 annually · NYDFS quarterly reports (BitLicense) · State-by-state transaction reports · CLARITY Act quarterly + annual disclosures for investment contract digital assets.",
      marketingRules: "SEC-era: any marketing projecting returns risks reclassifying the token as a security (Howey). No unregistered investment promotions. NYDFS requires prior approval of consumer-facing advertising. FINRA rules apply to broker-dealer communications. State Blue Sky restrictions on targeted marketing per state.",
      clientEligibility: "Must serve only states where MTL is held (geo-fence others). Full OFAC screening — block Cuba, Iran, North Korea, Syria, Crimea, Russia, Belarus. Accredited-investor gating for security tokens (Reg D 506(c)). KYC-verified US residency mandatory. No service to sanctioned or PEP list addresses."
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
    lu: {
      regime: "MiCA CASP + VASP transitional regime (AML Law of 25 March 2020)",
      risk: "med",
      licenses: ["CSSF CASP authorisation under MiCA", "PSF/PFS status if MiFID instruments involved", "EU passport for cross-border exchange services"],
      obligations: ["Full KYC/KYB per Luxembourg AML Law", "MiCA whitepaper + ESMA notification", "Capital min. €125K", "FATF Travel Rule >€1K", "Local substance (director, office) + CSSF Circular 22/806 outsourcing rules"],
      time: "9–18 months",
      cost: "€100K–€400K (CSSF fees + legal)",
      alts: ["Lithuania / Ireland (EU hubs)", "Liechtenstein TVTG", "Malta MiCA"],
      authority: "CSSF (Commission de Surveillance du Secteur Financier)"
    },
    ky: {
      regime: "Virtual Asset (Service Providers) Act 2020 — Trading Platform",
      risk: "med",
      licenses: ["VASP registration — Trading Platform (CIMA)", "VASP licence (post-launch review)", "Sandbox licence alternative for novel models"],
      obligations: ["Fit-and-proper senior officers (CIMA approval)", "AML per AMLR 2020", "MLRO + DMLRO appointed", "Beneficial-ownership register", "Client asset segregation", "Annual audit + CIMA reporting"],
      time: "6–12 months",
      cost: "$50K–$150K (CIMA fees + legal) — 0% corporate tax",
      alts: ["BVI VASP", "Bermuda DABA", "Dubai VARA"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "FINTRAC MSB (federal AML) + CSA Pre-Registration Undertaking (provincial securities)",
      risk: "high",
      licenses: ["FINTRAC MSB / FMSB registration", "CSA Pre-Registration Undertaking (PRU) with provincial regulators (OSC, AMF QC)", "Full CSA registration as restricted dealer / investment dealer"],
      obligations: ["KYC/AML per PCMLTFA + March 2026 amendments", "FINTRAC STR / LCTR reporting", "CSA Staff Notice 21-332 operating conditions (custody segregation, leverage limits)", "IIROC membership if investment dealer route", "Travel Rule (C$1K)"],
      time: "12–24 months (dual FINTRAC + CSA)",
      cost: "C$300K–C$1M+",
      alts: ["US state MTLs", "EU MiCA", "Dubai VARA"],
      authority: "FINTRAC + CSA / OSC / AMF + IIROC"
    },
    vg: {
      regime: "Virtual Asset Service Providers Act 2022 — Exchange class",
      risk: "med",
      licenses: ["VASP registration — virtual assets exchange (BVI FSC)", "BVI Business Company incorporation"],
      obligations: ["MLRO appointed + FSC-approved before launch", "AML per AMLR + Code of Practice", "Fit-and-proper directors", "Annual audited financials to FSC", "Cybersecurity + key-management (FSC Circular 43/2025)", "Travel Rule"],
      time: "4–12 months",
      cost: "US$5K–15K application + $150K–$400K setup — 0% corporate tax",
      alts: ["Cayman VASP", "Bermuda DABA", "Dubai VARA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "AUSTRAC DCE registration + ASIC AFSL (Digital Assets Framework Act 2026)",
      risk: "med",
      licenses: ["AUSTRAC Digital Currency Exchange (DCE) registration", "ASIC Australian Financial Services Licence (AFSL) — Digital Asset Platform", "AFCA (Australian Financial Complaints Authority) membership"],
      obligations: ["KYC/AML per AML/CTF Act 2006 (2024 amendments)", "Travel Rule (in force 31 March 2026)", "Client asset segregation + custody rules", "Product disclosure statements for retail", "Consumer protection (Corporations Act)", "Breach reporting to ASIC"],
      time: "9–18 months (AFSL must be lodged by 30 June 2026 to keep no-action protection)",
      cost: "A$250K–A$1M",
      alts: ["Singapore MAS", "Dubai VARA", "New Zealand FMA"],
      authority: "AUSTRAC (AML) + ASIC (licensing)",
      reportingFrequency: "AUSTRAC: SMR immediate + annual compliance report · ASIC: breach reports real-time + annual compliance attestation · Audit annually (AFSL condition) · AFCA annual levy + dispute reporting."
    },
    mt: {
      regime: "MiCA CASP (MFSA) — VFA Act transition window closes 1 July 2026",
      risk: "med",
      licenses: ["MFSA CASP authorisation under MiCA", "Simplified Art. 143(6) path for legacy VFA Class 3/4 holders (Category A)", "Full MiCA application for new entrants (Category B)"],
      obligations: ["Full KYC/KYB", "MiCA whitepaper + ESMA register", "Capital min. €125K (exchange)", "FATF Travel Rule >€1K", "Local substance (Maltese director, resident officers)", "MFSA Rulebook governance + cybersecurity"],
      time: "6–12 months (Category A simplified) · 12–18 months (Category B)",
      cost: "€80K–€300K",
      alts: ["Lithuania MiCA", "Liechtenstein TVTG", "Luxembourg CSSF"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 (DABA) — Class F / Class M licence",
      risk: "med",
      licenses: ["DABA Class F (full) or Class M (modified / sandbox)", "DABA Class T (test) for proof-of-concept", "BMA approval"],
      obligations: ["Minimum net assets scaled per class and activity", "BMA Cyber Risk Management Code", "Client money / asset segregation", "AML/ATF per POCA 1997 + DABA regs", "Travel Rule", "Annual audited accounts + BMA reporting"],
      time: "6–12 months",
      cost: "BMD 50K–250K (BMA fees + legal)",
      alts: ["Cayman VASP", "BVI VASP", "Dubai VARA"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) — replacing legacy VASP registration regime",
      risk: "med",
      licenses: ["Lietuvos bankas CASP authorisation under MiCA", "Transitional VASP registration valid until 1 July 2026", "EU passporting from Lithuania"],
      obligations: ["AML per Lithuania AML Law (2022 + 2024 updates)", "Capital min. €125K (CASP exchange)", "Local director + AML officer resident in Lithuania", "FATF Travel Rule >€1K", "MiCA whitepaper + market abuse rules"],
      time: "6–12 months (MiCA full application)",
      cost: "€50K–€200K (historically the cheapest EU crypto hub)",
      alts: ["Estonia", "Malta MiCA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas (Bank of Lithuania)"
    },
    ie: {
      regime: "Central Bank of Ireland CASP authorisation under MiCA (from Dec 2024) + legacy VASP register (2021)",
      risk: "med",
      licenses: ["CBI CASP authorisation under MiCA", "VASP register (transitional, winding down)", "EU passporting via MiCA"],
      obligations: ["KYC/AML per Criminal Justice (ML/TF) Act 2010", "FATF Travel Rule >€1K", "Capital min. €125K (CASP exchange)", "Fit-and-Probity regime (CBI F&P)", "Consumer Protection Code applies", "DORA operational resilience from Jan 2025"],
      time: "12–18 months (CASP full application)",
      cost: "€200K–€600K",
      alts: ["Lithuania MiCA", "Malta MiCA", "Luxembourg CSSF"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "English-speaking EU hub — popular for US firms expanding into Europe (Coinbase Ireland, Payward Europe for Kraken, Ripple Labs Ireland for RippleNet CBI CASP)."
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
      custodyNote: "Stablecoin on XRPL uses IOU/Trust Line model. Gateway holds reserve assets \u2014 custodial by definition. freeze and globalFreeze flags provide compliance controls.",
      reportingFrequency: "Monthly reserve composition disclosure · Quarterly prudential + liquidity reports · Annual audited accounts · Immediate notification of reserve composition changes · S-EMT/S-ART: daily monitoring + ECB oversight if thresholds crossed.",
      marketingRules: "Cannot pay interest or present the stablecoin as an investment (MiCA Art. 50). Mandatory whitepaper disclaimers. No misleading stability claims. S-EMT restrictions on volume/velocity may be imposed by ECB. Adverts must highlight redemption rights and risk.",
      clientEligibility: "Passport across all EU-27 once EMT/ART authorization granted. Enhanced due diligence on PEPs, FATF high-risk countries. Retail eligible but individual caps may apply for S-ART. Geo-blocking required outside EEA."
    },
    us: {
      regime: "GENIUS Act (federal stablecoin framework, signed July 2025) + State MTL + BitLicense (NY)",
      risk: "high",
      licenses: ["Federal OCC Payment Stablecoin Issuer charter (GENIUS Act)", "OR state-qualified issuer under GENIUS dual path", "State MTL where applicable", "NY BitLicense or NY Trust charter"],
      obligations: ["1:1 backing in cash + short-term US Treasuries (<93 days) + repos", "Monthly disclosures signed by CFO + annual independent attestation", "Redemption at par within T+1", "Bank-grade AML/KYC + OFAC screening", "No interest/yield payments to holders", "Bankruptcy-remote segregation of reserves", "Foreign issuers may passport if comparable regime (reciprocity)"],
      time: "12\u201324 months (federal path) / 6\u201312 months (state path)",
      cost: "$500K\u2013$2M+",
      alts: ["EU MiCA EMT (comparable 1:1 framework)", "Switzerland FINMA", "Dubai VARA payment token"],
      authority: "OCC (federal) / State regulators / FinCEN",
      reportingFrequency: "GENIUS Act: monthly disclosures signed by CFO + annual independent reserve attestation · SAR immediate + CTR over $10K · Quarterly call reports to OCC · Annual risk-management review · Real-time redemption volume dashboard (large issuers).",
      marketingRules: "GENIUS Act: no interest / yield offered to holders. No 'investment', 'risk-free' or 'guaranteed' language. Reserve composition must be prominently displayed. Redemption at par T+1 must be advertised. Bank-style consumer disclosures applicable.",
      clientEligibility: "US persons only if issuer is GENIUS-authorized (federal or qualified state). OFAC screening blocks Cuba, Iran, DPRK, Syria, Crimea, Russia, Belarus. Foreign users need comparable-regime check. Accredited-investor gating not required (bank-like product). KYC mandatory."
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
      // FSCA CASP is split in two categories under FAIS.
      // Cat 1 = advice / distribution / non-custodial intermediation (default, lighter path).
      // Cat 2 = discretionary management: holding customer funds / acting on their behalf without per-transaction approval.
      // A non-custodial stablecoin issuer typically qualifies for Cat 1. SARB only
      // kicks in when the stablecoin is ZAR-backed or generates cross-border fiat flows.
      regime: "FSCA Crypto Asset Declaration (Oct 2022) — stablecoins are financial products under FAIS. SARB Position Paper on stablecoins (Dec 2023) but no dedicated issuance licence yet. Category 1 CASP typically applies; Category 2 only if the issuer holds customer fiat or operates cross-border ZAR flows.",
      risk: "med",
      licenses: [
        "CASP Category 1 licence (FAIS Act) — default for non-custodial issuance",
        "CASP Category 2 only if holding customer fiat reserves or discretionary management",
        "SARB exchange-control approval only if ZAR-backed or cross-border",
      ],
      obligations: [
        "FSCA FAIS fit-and-proper (Cat 1 lighter than Cat 2)",
        "Reserve disclosures (best practice pending formal SARB framework)",
        "FICA AML customer due diligence + Travel Rule (since Apr 2023)",
        "SARB reporting only if cross-border ZAR flows",
      ],
      time: "6–12 months (Cat 1)\n12–18 months (Cat 2)",
      cost: "ZAR 1M–4M (~$55K–$220K) Cat 1\nZAR 2M–8M ($110K–$440K) Cat 2",
      alts: ["UAE VARA dedicated stablecoin", "UK FCA e-money"],
      authority: "FSCA + FIC (SARB only if cross-border)"
    },
    lu: {
      regime: "MiCA EMT/ART via CSSF + Luxembourg Law of 30 May 2018 on Electronic Money",
      risk: "med",
      licenses: ["EMI licence (CSSF) for EMT issuance", "Credit institution licence (alternative path)", "NCA authorisation for ART under MiCA"],
      obligations: ["1:1 reserve requirement (EMT) held in segregated accounts", "CSSF governance + own funds (min €350K for EMI)", "Whitepaper filed with CSSF", "Redemption at par", "Quarterly prudential reports", "S-EMT/S-ART rules if thresholds crossed"],
      time: "12–18 months",
      cost: "€200K–€600K",
      alts: ["Lithuania MiCA EMT", "Liechtenstein TVTG"],
      authority: "CSSF + ECB (if significant / systemic)"
    },
    ky: {
      regime: "Virtual Asset (Service Providers) Act 2020 + Monetary Authority guidance on stablecoin issuance",
      risk: "med",
      licenses: ["VASP registration — issuer category (CIMA)", "Sandbox licence path for novel stablecoin structures", "Foundation Companies Act 2017 structure for issuer"],
      obligations: ["Reserve attestation (monthly best practice, not statutory)", "AML per AMLR 2020 + VASP Act", "Segregation of reserve assets", "CIMA fit-and-proper", "MLRO + annual audit"],
      time: "6–12 months",
      cost: "$75K–$250K — 0% corporate tax",
      alts: ["BVI VASP", "Bermuda DABA", "Dubai VARA payment token"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "CSA Staff Notice 21-333 (Value-Referenced Crypto Assets) + pending federal stablecoin MSB regime (PCMLTFA March 2026 amendments)",
      risk: "high",
      licenses: ["FINTRAC MSB registration (plus forthcoming stablecoin-specific MSB class)", "CSA undertaking: VRCA issuer must meet reserve + redemption + disclosure conditions", "Provincial prospectus or exemption"],
      obligations: ["Reserves 1:1 in cash + short-term Government of Canada securities", "Monthly reserve attestations", "Redemption at par", "KYC/AML per PCMLTFA 2026 amendments", "Operational + technology risk filings"],
      time: "12–18 months",
      cost: "C$400K–C$1.5M",
      alts: ["US GENIUS Act path", "EU MiCA EMT", "Bermuda DABA"],
      authority: "FINTRAC + CSA / OSC / AMF"
    },
    vg: {
      regime: "Virtual Asset Service Providers Act 2022 — issuer category (no dedicated stablecoin act)",
      risk: "med",
      licenses: ["VASP registration — issuer (BVI FSC)", "BVI Business Company structure"],
      obligations: ["Reserve disclosures (best practice, not statutory)", "AML per AMLR + FSC Code of Practice", "MLRO appointed + FSC-approved", "Annual audit", "Cybersecurity + key-management (FSC Circular 43/2025)"],
      time: "4–12 months",
      cost: "$150K–$400K setup — 0% corporate tax",
      alts: ["Cayman VASP", "Bermuda DABA stablecoin", "Dubai VARA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Digital Assets Framework Act 2026 — stablecoins classified as financial products + RBA systemic-payments oversight",
      risk: "med",
      licenses: ["ASIC AFSL — stablecoin issuance", "AUSTRAC DCE registration if on/off-ramp", "RBA designation if systemic (Payment Systems Regulation Act)"],
      obligations: ["1:1 reserves in high-quality liquid assets (HQLA)", "Monthly reserve disclosures", "Redemption at par", "KYC/AML + Travel Rule (31 March 2026)", "Product disclosure statement (PDS) for retail"],
      time: "12–18 months",
      cost: "A$500K–A$2M",
      alts: ["Singapore MAS SCS", "EU MiCA EMT", "US GENIUS Act"],
      authority: "ASIC + RBA + AUSTRAC"
    },
    mt: {
      regime: "MiCA EMT/ART (MFSA) — transition from VFA Act stablecoin guidance",
      risk: "med",
      licenses: ["EMI licence (MFSA) for EMT issuance", "ART authorisation under MiCA", "Simplified Art. 143(6) transition if legacy VFA authorised"],
      obligations: ["1:1 reserves (EMT)", "Redemption at par", "Whitepaper + MFSA filings", "Quarterly prudential reports", "Capital min. €350K (EMI / ART issuer)", "Local substance in Malta"],
      time: "9–18 months",
      cost: "€150K–€500K",
      alts: ["Liechtenstein TVTG", "Lithuania MiCA EMT", "Luxembourg CSSF"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 + Digital Asset Issuance Act 2018 — dedicated stablecoin path",
      risk: "med",
      licenses: ["DABA Class F (full issuer licence)", "Digital Asset Issuance Act filing for the offering"],
      obligations: ["Reserve backing 1:1 disclosed + attested", "BMA fit-and-proper + Cyber Risk Management Code", "AML/ATF per POCA", "Client asset segregation", "Quarterly BMA reporting"],
      time: "6–12 months",
      cost: "BMD 100K–500K",
      alts: ["Cayman VASP", "BVI VASP", "Dubai VARA stablecoin"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA EMT/ART (Lietuvos bankas) — replacing legacy EMI + VASP regime",
      risk: "med",
      licenses: ["EMI licence from Lietuvos bankas for EMT issuance", "ART authorisation under MiCA", "EU passport from Lithuania"],
      obligations: ["1:1 reserves in segregated accounts", "Quarterly prudential reports", "Redemption at par", "Capital min. €350K (EMI)", "Local director + AML officer"],
      time: "9–15 months",
      cost: "€100K–€350K (historically a competitive EMI hub)",
      alts: ["Luxembourg CSSF", "Malta MFSA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas (Bank of Lithuania)"
    },
    ie: {
      regime: "MiCA EMT/ART (Central Bank of Ireland) + e-money directive 2009/110/EC transposed",
      risk: "med",
      licenses: ["CBI EMI authorisation for EMT issuance", "ART authorisation under MiCA for asset-referenced tokens", "Credit institution licence as alternative for large issuers"],
      obligations: ["1:1 reserve requirement in segregated accounts", "Whitepaper filed with CBI + notified to ESMA", "Quarterly prudential reports", "Redemption at par requirement", "S-EMT/S-ART rules above €5M daily", "CBI governance + consumer protection"],
      time: "12–18 months (EMI)",
      cost: "€250K–€800K",
      alts: ["Luxembourg EMI", "Lithuania EMI", "Malta MFSA"],
      authority: "Central Bank of Ireland (CBI)"
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
      custodyNote: "Under MiCA Art. 75, custodians are liable for loss of crypto-assets unless they prove the loss arose from events beyond reasonable control. This applies to any service holding private keys on behalf of clients.",
      reportingFrequency: "Quarterly prudential reports + customer-asset segregation statement · Annual audited financials · Monthly AML filings · Immediate incident reports (breach, key loss) · Annual ICT risk report per DORA.",
      marketingRules: "Must state clearly that the service holds clients' keys and the liability framework. Cannot advertise 'risk-free' storage. Insurance coverage terms must be disclosed. No yield-bearing offering without separate CASP authorizations.",
      clientEligibility: "EU-27 residents served under passported CASP. Enhanced due diligence for PEPs and FATF grey-list. Institutional clients may require additional MiFID suitability checks if advisory involved. Sanctioned persons blocked per EU restrictive measures."
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
      xrplNote: "XRPL custody: SEC qualified custodian rules apply for securities-like XRPL tokens; CLARITY Act (2025) shifts 'digital commodity' custody under CFTC (applies to XRP per SEC v. Ripple secondary-sales holding). MPC/TSS (Fireblocks, Silence Labs) widely used for institutional XRPL custody. SignerList multisig provides native on-chain alternative.",
      reportingFrequency: "Annual SOC 2 Type II audit · Quarterly call reports (if trust charter) · SAR immediate / CTR over $10K · Monthly AML filings · CLARITY Act: quarterly customer-asset segregation statements · Insurance claim notifications real-time.",
      marketingRules: "SEC / NYDFS: 'qualified custodian' claim only if you meet SEC definition. No rehypothecation implied. Insurance limits must be clearly disclosed. GENIUS Act custody of qualifying stablecoins requires separate advertising treatment. Institutional-only marketing for non-retail offerings.",
      clientEligibility: "US persons in states where trust charter is recognized. Institutional clients only for SEC qualified-custodian offering (unless state-registered for retail). Full OFAC block — Cuba, Iran, DPRK, Syria, Russia, Belarus, sanctioned entities. Enhanced KYC on beneficial ownership >25%."
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
    lu: {
      regime: "MiCA CASP Art. 75 (CSSF) + PFS/PSF categories under Law of 5 April 1993",
      risk: "med",
      licenses: ["CSSF CASP custody authorisation", "PSF Art. 29-3/29-4 (client asset service) optional for institutional", "Professional depositary licence if funds"],
      obligations: ["Asset segregation (on-chain + off-chain)", "Liability for loss (MiCA Art. 75)", "CSSF governance + cybersecurity", "Insurance or own funds coverage", "Outsourcing rules per Circular 22/806", "DORA ICT risk framework"],
      time: "9–18 months",
      cost: "€150K–€500K",
      alts: ["Liechtenstein TVTG Token Custodian", "Switzerland FINMA", "Ireland / Lithuania MiCA"],
      authority: "CSSF (Commission de Surveillance du Secteur Financier)",
      xrplNote: "Luxembourg is a major fund-servicing hub. XRPL MPC/TSS custody suitable for PSF-regulated institutional depositaries. Fireblocks and Taurus active in the Lux market."
    },
    ky: {
      regime: "Virtual Asset (Service Providers) Act 2020 — Custody category",
      risk: "med",
      licenses: ["VASP registration — custody of virtual assets (CIMA)", "Sandbox licence alternative for novel custody models", "Trust company licence if trust structure used"],
      obligations: ["Cold storage majority (CIMA guidance)", "Asset segregation + bankruptcy remoteness", "AML per AMLR 2020", "MLRO + DMLRO", "Fit-and-proper + annual audit", "Cyber-security controls"],
      time: "6–12 months",
      cost: "$75K–$250K — 0% corporate tax",
      alts: ["BVI VASP custody", "Bermuda DABA", "Dubai VARA custody"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "CSA Staff Notice 21-332 custody operating conditions + FINTRAC MSB + provincial qualified-custodian rules",
      risk: "high",
      licenses: ["FINTRAC MSB registration", "CSA Pre-Registration Undertaking with custody conditions", "Qualified custodian status per NI 31-103 / NI 81-102 (for funds)", "IIROC membership if investment dealer"],
      obligations: ["Segregation + bankruptcy remoteness (SN 21-332)", "Minimum 80% cold storage with an acceptable third-party custodian (CSA operating condition)", "Insurance (crime + cyber)", "SOC 2 Type II", "Independent systems review (ISR)", "KYC/AML + Travel Rule (C$1K)"],
      time: "12–24 months",
      cost: "C$400K–C$1.5M+",
      alts: ["US state trust charter (Wyoming SPDI)", "EU MiCA CASP", "Bermuda DABA"],
      authority: "FINTRAC + CSA / OSC / AMF + IIROC",
      xrplNote: "Canadian institutional custodians (Tetra Trust, Balance) use MPC / HSM stacks. XRPL custody via Fireblocks / BitGo is the typical path for Canadian regulated entities."
    },
    vg: {
      regime: "Virtual Asset Service Providers Act 2022 — Custody Services category",
      risk: "med",
      licenses: ["VASP registration — custody services (BVI FSC)", "BVI Business Company structure"],
      obligations: ["Client asset segregation", "Cold-storage / key-management controls (FSC Circular 43/2025)", "Multi-factor authentication + audit logs", "MLRO appointed + FSC-approved", "Annual audited accounts", "Cybersecurity + business continuity plan"],
      time: "4–12 months",
      cost: "$150K–$400K — 0% corporate tax",
      alts: ["Cayman custody", "Bermuda DABA", "Dubai VARA custody"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Digital Assets Framework Act 2026 — Tokenised Custody Platform + ASIC AFSL",
      risk: "med",
      licenses: ["ASIC AFSL — tokenised custody platform category", "AUSTRAC DCE registration if on-ramp", "AFCA membership"],
      obligations: ["Client asset segregation + custody rules (Corporations Act)", "Insurance / compensation arrangements", "Key-management + cybersecurity standards", "ASIC Regulatory Guide 133 compliance (trust money)", "KYC/AML + Travel Rule (31 March 2026)"],
      time: "9–18 months",
      cost: "A$300K–A$1.2M",
      alts: ["Singapore MAS", "Liechtenstein TVTG", "Dubai VARA"],
      authority: "ASIC + AUSTRAC"
    },
    mt: {
      regime: "MiCA CASP Art. 75 (MFSA) — transition from VFA Custodian Class 2",
      risk: "med",
      licenses: ["MFSA CASP custody authorisation", "Simplified Art. 143(6) path for legacy VFA Class 2 holders"],
      obligations: ["Asset segregation", "Liability for loss (MiCA Art. 75)", "MFSA Rulebook governance + cybersecurity", "Insurance or own funds coverage", "DORA ICT risk framework", "Local substance"],
      time: "6–12 months (Category A) / 12–18 months (Category B)",
      cost: "€100K–€400K",
      alts: ["Lithuania MiCA", "Liechtenstein TVTG", "Luxembourg CSSF"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 — custody digital-asset business activity",
      risk: "med",
      licenses: ["DABA Class F (full) or Class M (modified / sandbox) — custody activity"],
      obligations: ["Client asset segregation + trust-style protections", "BMA Cyber Risk Management Code + operational resilience", "AML/ATF per POCA", "Minimum net assets per class", "Insurance (BMA expectation)", "Annual audit + quarterly returns"],
      time: "6–12 months",
      cost: "BMD 75K–350K",
      alts: ["Cayman custody", "BVI VASP", "Dubai VARA custody"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP Art. 75 (Lietuvos bankas) — replacing legacy VASP custody registration",
      risk: "med",
      licenses: ["Lietuvos bankas CASP custody authorisation", "Transitional VASP registration valid until 1 July 2026"],
      obligations: ["Client asset segregation", "Liability for loss (MiCA Art. 75)", "Capital min. €150K (custody)", "AML per Lithuania AML Law", "Local director + AML officer", "DORA ICT risk framework"],
      time: "6–12 months",
      cost: "€75K–€250K",
      alts: ["Luxembourg CSSF", "Liechtenstein TVTG", "Malta MFSA"],
      authority: "Lietuvos bankas (Bank of Lithuania)"
    },
    ie: {
      regime: "CBI CASP custody service under MiCA Art. 75 + existing financial services framework",
      risk: "med",
      licenses: ["CBI CASP authorisation — custody category", "Safeguarding requirements under MiCA Art. 75", "Optional full banking custody licence for traditional finance overlap"],
      obligations: ["Segregation of client assets (on-chain + off-chain)", "Safeguarding policies + quarterly reconciliation", "Liability for loss (MiCA Art. 75)", "KYC/AML per CJA 2010", "CBI Fitness & Probity regime", "DORA operational resilience (from Jan 2025)", "Professional indemnity insurance"],
      time: "12–18 months",
      cost: "€200K–€500K",
      alts: ["Liechtenstein TVTG", "Luxembourg CSSF", "Germany BaFin"],
      authority: "Central Bank of Ireland (CBI)"
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
    ng: {
      regime: "SEC Nigeria DASP — DeFi treated as unregulated unless operator identifiable; high enforcement risk",
      risk: "high",
      licenses: ["SEC Nigeria DASP if identifiable operator", "Offshore structure typical (UAE/Cayman)"],
      obligations: ["KYC/AML per MLPPA 2022 if operator", "Naira forex restrictions", "Consumer protection"],
      time: "18–36 months (if pursued)",
      cost: "NGN 500M+ ($500K+) — most DeFi operates offshore",
      alts: ["UAE VARA", "Cayman VASP"],
      authority: "SEC Nigeria + CBN"
    },
    ke: {
      regime: "VASP Act 2025 — DeFi coverage depends on operator identifiability; front-end typically registered",
      risk: "med",
      licenses: ["CMA VASP if identifiable operator", "Potential sandbox route"],
      obligations: ["KYC/AML per POCAMLA if custody/execution", "Consumer protection", "Digital Asset Tax 3% if service fees"],
      time: "9–18 months",
      cost: "KES 10M–40M ($75K–$310K)",
      alts: ["UAE VARA", "South Africa FSCA"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP — DeFi coverage depends on operator identifiability; Cat 1 for advice/arrangement, Cat 2 if custody",
      risk: "med",
      licenses: ["CASP Cat 1 or 2 depending on operator role", "SARB only if ZAR cross-border"],
      obligations: ["FICA AML + Travel Rule (Apr 2023)", "Consumer protection under FAIS"],
      time: "6–12 months (Cat 1)\n12–18 months (Cat 2)",
      cost: "ZAR 1M–10M ($55K–$550K)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "MiCA CASP (CSSF) if identifiable operator, otherwise DeFi exclusion under Recital 22",
      risk: "med",
      licenses: ["CSSF CASP authorisation if operator controls front-end / order flow", "MiFID licence if security tokens involved"],
      obligations: ["KYC/AML if CASP", "Capital min. €125K", "Market abuse rules (MAR) if listed tokens"],
      time: "9–15 months",
      cost: "€150K–€500K",
      alts: ["Liechtenstein TVTG", "Switzerland FINMA"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act 2020 — DeFi often structured as a Foundation Company (no identifiable operator)",
      risk: "low",
      licenses: ["CIMA VASP registration if identifiable operator", "Cayman Foundation Company as operator-less structure"],
      obligations: ["AML per AMLR if service provider", "MLRO if licensed"],
      time: "3–9 months",
      cost: "$50K–$200K — 0% corporate tax",
      alts: ["BVI Foundation Company", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA Staff Notice 21-329 (crypto asset trading platforms) + FINTRAC MSB if custody/conversion",
      risk: "high",
      licenses: ["CSA Pre-Registration Undertaking if dealing", "FINTRAC MSB if conversion", "IIROC if investment dealer"],
      obligations: ["KYC/AML per PCMLTFA", "Leverage limits per CSA Staff Notice 21-332", "Pre-trade disclosures"],
      time: "12–24 months",
      cost: "C$300K–C$1M",
      alts: ["US — partner with MTL", "EU MiCA"],
      authority: "CSA + FINTRAC"
    },
    vg: {
      regime: "BVI VASP Act 2022 — DeFi often structured as BVI Foundation Company",
      risk: "low",
      licenses: ["BVI VASP registration if identifiable operator", "BVI Foundation Company as operator-less structure"],
      obligations: ["AML per AMLR if service provider", "MLRO if licensed"],
      time: "3–9 months",
      cost: "$50K–$200K — 0% corporate tax",
      alts: ["Cayman Foundation Company", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC + Digital Assets Framework Act 2026 — DeFi operator liability depends on identifiability",
      risk: "med",
      licenses: ["ASIC AFSL — Digital Asset Platform if operator", "AUSTRAC DCE if exchange-like"],
      obligations: ["KYC/AML per AML/CTF Act 2006", "Consumer protection (Corporations Act)", "Breach reporting"],
      time: "9–18 months",
      cost: "A$300K–A$1M",
      alts: ["Singapore MAS", "UAE VARA"],
      authority: "ASIC + AUSTRAC"
    },
    mt: {
      regime: "MiCA CASP (MFSA) if identifiable operator, DeFi exclusion under Recital 22 otherwise",
      risk: "med",
      licenses: ["MFSA CASP authorisation if operator", "VFA Act transition (closes 1 July 2026)"],
      obligations: ["KYC/AML if CASP", "Market abuse rules", "Maltese director + resident officers"],
      time: "9–15 months",
      cost: "€100K–€400K",
      alts: ["Lithuania MiCA", "Liechtenstein TVTG"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M — DeFi operators pursue Class M modified licence (sandbox)",
      risk: "med",
      licenses: ["DABA Class M (sandbox) or Class F (full)", "BMA approval"],
      obligations: ["AML/ATF per POCA 1997", "BMA Cyber Risk Management Code", "Client fund segregation"],
      time: "6–12 months",
      cost: "BMD 75K–250K",
      alts: ["Cayman Foundation", "BVI Foundation"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) if identifiable operator, otherwise DeFi exclusion",
      risk: "med",
      licenses: ["Lietuvos bankas CASP under MiCA if operator", "Transitional VASP (to 1 July 2026)"],
      obligations: ["KYC/AML per Lithuania AML Law", "Capital min. €125K", "Local director + AML officer"],
      time: "6–12 months",
      cost: "€50K–€200K",
      alts: ["Estonia (closing)", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "CBI CASP (MiCA) if identifiable operator, DeFi exclusion otherwise",
      risk: "med",
      licenses: ["CBI CASP authorisation under MiCA if operator controls front-end / execution", "MiFID investment firm licence if security tokens"],
      obligations: ["KYC/AML per CJA 2010", "Market abuse rules", "DORA operational resilience (Jan 2025)"],
      time: "12–18 months",
      cost: "€200K–€600K",
      alts: ["Lithuania MiCA", "Luxembourg CSSF"],
      authority: "Central Bank of Ireland (CBI)"
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
    ng: {
      regime: "SEC Nigeria — DASP; NFTs under digital asset rules if financial. No specific NFT framework",
      risk: "med",
      licenses: ["SEC Nigeria DASP if fractional/financial", "Copyright registration (Nigerian Copyright Commission)"],
      obligations: ["KYC/AML if DASP", "Consumer protection", "Copyright compliance"],
      time: "9–18 months",
      cost: "NGN 100M–500M ($100K–$500K)",
      alts: ["UAE VARA", "EU MiCA"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "VASP Act 2025 — NFTs treated as digital assets; copyright law applies",
      risk: "low",
      licenses: ["CMA VASP if secondary trading", "Copyright registration (KECOBO)"],
      obligations: ["KYC/AML per POCAMLA if trading", "3% Digital Asset Tax", "Copyright compliance"],
      time: "6–12 months",
      cost: "KES 5M–20M ($40K–$150K)",
      alts: ["UAE VARA", "South Africa FSCA"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CASP (if financial NFT) — otherwise no specific NFT framework. Copyright Act applies",
      risk: "low",
      licenses: ["CASP Category I or II if fractional/financial", "Copyright registration if applicable"],
      obligations: ["FICA AML if financial", "Copyright compliance", "POPIA data protection"],
      time: "6–12 months",
      cost: "ZAR 500K–3M ($30K–$165K)",
      alts: ["UAE VARA", "Singapore MAS"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "MiCA excludes unique/non-fungible NFTs (Art. 2(3)); fractional NFTs fall under MiCA/MiFID",
      risk: "low",
      licenses: ["No CASP needed for unique NFTs", "CSSF CASP if fractional/secondary trading", "MiFID if security NFT"],
      obligations: ["KYC/AML if CASP triggered", "Copyright + VAT on royalties"],
      time: "3–9 months (if CASP not needed)",
      cost: "€30K–€200K",
      alts: ["Liechtenstein TVTG", "Switzerland"],
      authority: "CSSF"
    },
    ky: {
      regime: "NFTs generally outside VASP Act unless fractional/financial; Cayman Foundation popular for NFT DAOs",
      risk: "low",
      licenses: ["No VASP if unique NFTs", "CIMA VASP if fractional/secondary", "Cayman Foundation for creator DAO"],
      obligations: ["AML if VASP applies", "Copyright compliance"],
      time: "2–6 months",
      cost: "$30K–$150K — 0% corporate tax",
      alts: ["BVI Foundation", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA — NFTs are case-by-case; fractional or yield-bearing treated as securities (Howey-like)",
      risk: "med",
      licenses: ["No licence for unique/collectible NFTs", "CSA prospectus + dealer registration if fractional/security", "FINTRAC MSB if custody"],
      obligations: ["KYC/AML if dealer", "Copyright compliance", "Consumer protection"],
      time: "6–18 months",
      cost: "C$100K–C$500K",
      alts: ["US Reg D (fractional)", "EU MiCA"],
      authority: "CSA"
    },
    vg: {
      regime: "NFTs generally outside VASP Act unless fractional; BVI Foundation popular for NFT creator DAOs",
      risk: "low",
      licenses: ["No VASP if unique NFTs", "BVI VASP if fractional/secondary trading", "BVI Foundation for creator DAO"],
      obligations: ["AML if VASP applies", "Copyright compliance"],
      time: "2–6 months",
      cost: "$30K–$150K — 0% corporate tax",
      alts: ["Cayman Foundation", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC — NFTs financial-product classification case-by-case; fractional treated as MIS (managed investment scheme)",
      risk: "med",
      licenses: ["No licence for unique NFTs", "ASIC AFSL if MIS", "AUSTRAC DCE if marketplace with custody"],
      obligations: ["KYC/AML if licensed", "Copyright compliance", "Australian Consumer Law"],
      time: "6–15 months",
      cost: "A$100K–A$500K",
      alts: ["Singapore MAS", "UAE VARA"],
      authority: "ASIC"
    },
    mt: {
      regime: "MiCA excludes unique NFTs (Art. 2(3)); fractional NFTs fall under MiCA/MiFID via MFSA",
      risk: "low",
      licenses: ["No CASP for unique NFTs", "MFSA CASP if fractional/secondary", "MiFID if security NFT"],
      obligations: ["KYC/AML if CASP triggered", "Copyright + VAT on royalties"],
      time: "3–9 months",
      cost: "€30K–€200K",
      alts: ["Lithuania MiCA", "Liechtenstein TVTG"],
      authority: "MFSA"
    },
    bm: {
      regime: "NFTs typically outside DABA unless fractional; BMA Digital Asset sandbox available for novel designs",
      risk: "low",
      licenses: ["No DABA for unique NFTs", "DABA Class M (sandbox) for fractional/novel models"],
      obligations: ["AML if licensed", "Copyright compliance"],
      time: "3–9 months",
      cost: "BMD 50K–200K",
      alts: ["Cayman Foundation", "BVI Foundation"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA excludes unique NFTs (Art. 2(3)); fractional NFTs fall under MiCA via Lietuvos bankas",
      risk: "low",
      licenses: ["No CASP for unique NFTs", "Lietuvos bankas CASP if fractional/secondary", "MiFID if security NFT"],
      obligations: ["KYC/AML if CASP triggered", "Copyright compliance"],
      time: "3–9 months",
      cost: "€20K–€150K",
      alts: ["Malta MiCA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "MiCA excludes unique NFTs (Art. 2(3)); fractional NFTs fall under MiCA/MiFID via CBI",
      risk: "low",
      licenses: ["No CASP for unique NFTs", "CBI CASP if fractional/secondary trading", "MiFID investment firm if security NFT"],
      obligations: ["KYC/AML per CJA 2010 if CASP", "Copyright compliance", "Consumer Protection Code"],
      time: "6–12 months",
      cost: "€50K–€300K",
      alts: ["Luxembourg CSSF", "Malta MFSA"],
      authority: "Central Bank of Ireland (CBI)"
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
    ng: {
      regime: "SEC Nigeria — Rules on Issuance, Offering and Custody of Digital Assets (2022)",
      risk: "high",
      licenses: ["SEC Nigeria Digital Asset Offering Platform (DAOP) licence", "SEC DASP registration", "CBN approval for NGN flows"],
      obligations: ["Prospectus-equivalent disclosures", "KYC/AML per MLPPA 2022", "Asset-backing disclosures"],
      time: "18–36 months",
      cost: "NGN 500M+ ($500K+)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "VASP Act 2025 + CMA Capital Markets Act (if security token)",
      risk: "med",
      licenses: ["CMA VASP licence", "CMA Capital Markets approval if security", "CBK for KES rails"],
      obligations: ["KYC/AML per POCAMLA", "Prospectus-equivalent disclosures", "3% Digital Asset Tax"],
      time: "9–18 months",
      cost: "KES 15M–50M ($115K–$385K)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP + CISCA (Collective Investment Schemes) + JSE listing rules if secondary trading",
      risk: "med",
      licenses: ["CASP Category II under FAIS", "CISCA manager licence if pooled", "JSE listing if exchange-traded"],
      obligations: ["KYC/AML per FICA + Travel Rule", "CISCA disclosures", "SARB only if cross-border ZAR"],
      time: "12–18 months",
      cost: "ZAR 3M–10M ($165K–$550K)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "FSCA + FIC + JSE"
    },
    lu: {
      regime: "MiCA + Luxembourg Securities Law + DLT Pilot Regime — major RWA hub",
      risk: "low",
      licenses: ["CSSF tokenised securities authorisation", "MiFID investment firm licence", "DLT Pilot Regime sandbox"],
      obligations: ["Prospectus Regulation (Reg 2017/1129)", "KYC/AML", "Custody segregation under CSDR", "CSSF ongoing reporting"],
      time: "9–15 months",
      cost: "€200K–€700K",
      alts: ["Switzerland FINMA", "Liechtenstein TVTG", "Ireland CBI"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman Mutual Funds Law + VASP Act — popular for RWA fund structures",
      risk: "low",
      licenses: ["CIMA Mutual Fund / Private Fund registration", "CIMA VASP if tokenised", "Cayman Foundation for DAO-governed RWA"],
      obligations: ["AML per AMLR + MLRO", "CIMA fund reporting", "Audit + prospectus"],
      time: "3–9 months",
      cost: "$75K–$300K — 0% corporate tax",
      alts: ["BVI Incubator Fund", "Bermuda DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA securities law — tokenised securities fall under standard prospectus requirements",
      risk: "high",
      licenses: ["CSA prospectus or exemption (NI 45-102)", "Registered dealer (IIROC) for secondary trading", "FINTRAC MSB if custody"],
      obligations: ["CSA prospectus + continuous disclosure", "Proficiency + suitability rules", "Cross-border restrictions"],
      time: "12–24 months",
      cost: "C$500K–C$1.5M+",
      alts: ["US Reg D / Reg S", "EU DLT Pilot"],
      authority: "CSA / OSC / AMF"
    },
    vg: {
      regime: "BVI Securities and Investment Business Act (SIBA) + VASP Act 2022",
      risk: "low",
      licenses: ["BVI Approved Manager if fund structure", "SIBA investment business licence", "VASP registration if tokenised trading"],
      obligations: ["AML per AMLR + MLRO", "SIBA reporting", "Audit if fund"],
      time: "4–9 months",
      cost: "$75K–$250K — 0% corporate tax",
      alts: ["Cayman Mutual Fund", "Bermuda DABA"],
      authority: "BVI FSC"
    },
    au: {
      regime: "Corporations Act securities regime + ASIC AFSL + Digital Assets Framework Act 2026",
      risk: "high",
      licenses: ["ASIC AFSL — issuer or dealer", "Prospectus under Corporations Act s.710", "ASIC Digital Asset Platform licence if secondary trading"],
      obligations: ["Prospectus + PDS disclosures", "KYC/AML per AML/CTF Act", "Suitability + design distribution obligations"],
      time: "12–24 months",
      cost: "A$400K–A$1.5M",
      alts: ["Singapore MAS", "EU DLT Pilot"],
      authority: "ASIC"
    },
    mt: {
      regime: "MiCA + Malta Financial Markets Act + DLT Pilot Regime",
      risk: "low",
      licenses: ["MFSA tokenised securities authorisation", "MiFID investment firm licence", "DLT Pilot Regime sandbox"],
      obligations: ["Prospectus Regulation", "KYC/AML", "CSDR custody segregation", "MFSA reporting"],
      time: "9–15 months",
      cost: "€150K–€500K",
      alts: ["Lithuania MiCA", "Luxembourg CSSF"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M + BMA Investment Business Act (if fund structure)",
      risk: "low",
      licenses: ["DABA Class F or M", "BMA Investment Business if fund", "BMA approval"],
      obligations: ["AML/ATF per POCA 1997", "BMA Cyber Risk Management Code", "Fund reporting if applicable"],
      time: "6–12 months",
      cost: "BMD 100K–400K",
      alts: ["Cayman Mutual Fund", "BVI Approved Manager"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA + Lithuania Securities Law + Bank of Lithuania DLT sandbox",
      risk: "low",
      licenses: ["Lietuvos bankas CASP under MiCA", "MiFID investment firm licence", "DLT Pilot Regime sandbox"],
      obligations: ["Prospectus Regulation", "KYC/AML", "Local director + AML officer"],
      time: "6–12 months",
      cost: "€75K–€300K",
      alts: ["Malta MiCA", "Luxembourg CSSF"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "CBI Securities Law + MiCA + Irish DLT Pilot Regime + Ireland has become a major tokenised-fund hub",
      risk: "low",
      licenses: ["CBI MiFID investment firm authorisation", "Irish Securities Law prospectus", "CBI CASP under MiCA if tokenised trading"],
      obligations: ["Prospectus Regulation (EU 2017/1129)", "KYC/AML per CJA 2010", "UCITS/AIFMD rules if collective vehicle", "DORA operational resilience (Jan 2025)"],
      time: "12–18 months",
      cost: "€250K–€800K",
      alts: ["Luxembourg CSSF", "Malta MFSA"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "Ireland is a top 2 EU fund-administration hub. Major BlackRock BUIDL-style tokenised-fund custodians (BNY Mellon Ireland, State Street Ireland) are experimenting with XRPL for RWA settlement."
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
    lu: {
      regime: "PSD2/PSD3 Payment Institution + MiCA CASP crypto-transfer service (CSSF)",
      risk: "med",
      licenses: ["CSSF PI licence (PSD2) for fiat rails", "EMI licence for e-money accounts", "CASP authorisation for crypto transfer service (MiCA Art. 3)"],
      obligations: ["Safeguarding of customer funds", "SCA under PSD2", "KYC/AML + FATF Travel Rule >€1K", "Own funds per PI / EMI rules", "EU passporting"],
      time: "12–18 months",
      cost: "€200K–€600K",
      alts: ["Lithuania (cheaper EMI hub)", "Ireland PI", "Malta MFSA"],
      authority: "CSSF"
    },
    ky: {
      regime: "VASP Act 2020 — virtual-asset transfer + Money Services Act for fiat remittance",
      risk: "med",
      licenses: ["VASP registration — virtual-asset transfer (CIMA)", "Money Services Licence if fiat leg (CIMA)"],
      obligations: ["AML per AMLR 2020 + Travel Rule", "Fit-and-proper officers", "MLRO + annual audit", "Client-funds segregation", "Annual returns to CIMA"],
      time: "6–12 months",
      cost: "$50K–$200K — 0% corporate tax",
      alts: ["BVI VASP", "Bermuda DABA", "Dubai VARA payment"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "Retail Payment Activities Act (RPAA, in force Sept 2024) + FINTRAC MSB + CSA securities overlay",
      risk: "high",
      licenses: ["Bank of Canada Payment Service Provider (PSP) registration under RPAA", "FINTRAC MSB registration", "Provincial money-transmitter registrations (Quebec AMF)"],
      obligations: ["RPAA safeguarding of end-user funds", "Operational risk framework + incident reporting to BoC", "PCMLTFA KYC/AML (March 2026 amendments)", "Travel Rule (C$1K)", "Consumer protection (CPA)"],
      time: "9–18 months",
      cost: "C$200K–C$800K",
      alts: ["US state MTLs", "EU MiCA + PI passport", "Dubai VARA"],
      authority: "Bank of Canada (RPAA) + FINTRAC + CSA"
    },
    vg: {
      regime: "VASP Act 2022 — virtual-asset transfer + Financing and Money Services Act (fiat)",
      risk: "med",
      licenses: ["VASP registration — transfer services (BVI FSC)", "FMS licence if fiat remittance"],
      obligations: ["AML per AMLR + Code of Practice", "Travel Rule compliance", "MLRO + annual audit", "Client-funds segregation", "FSC Circular 43/2025 cyber + key-management"],
      time: "4–12 months",
      cost: "$150K–$400K — 0% corporate tax",
      alts: ["Cayman VASP + MSA", "Bermuda DABA", "Dubai VARA payment"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Digital Assets Framework Act 2026 + Payment Systems (Regulation) Act 1998 + AUSTRAC DCE",
      risk: "med",
      licenses: ["ASIC AFSL — digital asset platform (transfer)", "AUSTRAC DCE registration", "APRA authorisation if deposit-taking", "RBA access to payment systems"],
      obligations: ["Client-funds safeguarding", "KYC/AML + Travel Rule (31 March 2026)", "ePayments Code for retail", "Operational risk + cyber", "ASIC breach reporting"],
      time: "9–18 months",
      cost: "A$300K–A$1M",
      alts: ["Singapore MAS MPI", "EU MiCA + PI", "New Zealand FMA"],
      authority: "ASIC + AUSTRAC + RBA"
    },
    mt: {
      regime: "PSD2 Payment Institution + MiCA CASP (crypto transfer) under MFSA",
      risk: "med",
      licenses: ["MFSA PI licence (PSD2)", "EMI licence if e-money accounts", "MiCA CASP for crypto transfer service"],
      obligations: ["Safeguarding of customer funds", "SCA under PSD2", "MiCA Travel Rule + AML", "Own funds per PI / EMI rules", "Local substance in Malta"],
      time: "9–15 months",
      cost: "€150K–€500K",
      alts: ["Lithuania MiCA + PI", "Luxembourg CSSF", "Liechtenstein TVTG"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 — payment services in or involving digital assets",
      risk: "med",
      licenses: ["DABA Class F (full) or Class M (modified / sandbox)", "BMA approval"],
      obligations: ["AML/ATF per POCA 1997", "Travel Rule compliance", "Client-funds safeguarding", "BMA Cyber Risk Management Code", "Annual audit + BMA returns"],
      time: "6–12 months",
      cost: "BMD 75K–300K",
      alts: ["Cayman payment", "BVI VASP", "Dubai VARA payment"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "PSD2 Payment Institution + MiCA CASP (crypto transfer) under Lietuvos bankas",
      risk: "med",
      licenses: ["Lietuvos bankas PI licence (PSD2)", "EMI licence (Lithuania is a major EU EMI hub)", "MiCA CASP for crypto transfer service"],
      obligations: ["Safeguarding of customer funds", "SCA under PSD2", "KYC/AML per Lithuania AML Law (2022/2024)", "Travel Rule >€1K", "Own funds per PI / EMI rules", "Local director + AML officer"],
      time: "6–12 months",
      cost: "€100K–€350K (historically the most competitive EU EMI hub)",
      alts: ["Luxembourg CSSF", "Malta MFSA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas (Bank of Lithuania)"
    },
    ie: {
      regime: "PSD2 Payment Institution + MiCA CASP (crypto-transfer service Art. 3) under Central Bank of Ireland",
      risk: "med",
      licenses: ["CBI Payment Institution (PI) authorisation under PSD2", "EMI licence for e-money accounts", "MiCA CASP authorisation for crypto-transfer service"],
      obligations: ["Safeguarding of customer funds under PSD2", "Strong Customer Authentication (SCA)", "KYC/AML per CJA 2010", "FATF Travel Rule >€1K", "Own funds per PI/EMI prudential rules", "EU passporting from Ireland"],
      time: "12–18 months",
      cost: "€200K–€600K",
      alts: ["Luxembourg CSSF", "Lithuania EMI", "UK FCA EMI"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "Ireland-based Ripple Labs Ireland Ltd uses this licensing stack for RippleNet payments + Palisade MPC wallet services into the EU market."
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ONRAMP / OFFRAMP (fiat ↔ crypto conversion gateway)
  // ═══════════════════════════════════════════════════════════════
  onramp_offramp: {
    eu: {
      regime: "CASP (MiCA) + EMI or PI licence (PSD2/PSD3) for the fiat leg",
      risk: "high",
      licenses: ["CASP authorisation (crypto-for-fiat exchange service, MiCA Art. 3)", "EMI licence (if holding customer fiat balances)", "PI licence (if pure routing, PSD2)", "Host-member-state EU passport (if crossing borders)"],
      obligations: ["KYC/AML (AMLD + MiCA)", "FATF Travel Rule (EU Regulation 2023/1113)", "PSD2 SCA on fiat leg", "Client funds safeguarding (EMI/PI rules)", "Consumer protection (right of withdrawal, cooling-off)", "Pricing transparency per MiCA Title III"],
      time: "12–24 months (two parallel licences)",
      cost: "€150K–€500K",
      alts: ["Liechtenstein TVTG (faster)", "Switzerland FINMA", "Lithuania / Estonia (pre-MiCA hub)"],
      authority: "NCA + ECB (EMI passporting) + ESMA",
      xrplNote: "XRPL IOUs and Trust Lines allow native fiat-tokenisation on-chain (RLUSD, EURCV). Onramp provider can settle customer fiat legs via a licensed EMI partner and mint/burn XRPL tokens. Payment Channels enable sub-second off-ramp settlement."
    },
    us: {
      regime: "FinCEN MSB + State MTLs (48+ states) + BitLicense (NY)",
      risk: "high",
      licenses: ["FinCEN MSB registration", "State money transmitter licence in every state of operation (~48)", "NY BitLicense + NYDFS approval", "Surety bonds per state ($50K–$7M each)"],
      obligations: ["BSA/AML", "OFAC sanctions screening", "SAR / CTR filings", "Travel Rule ≥ $3K", "Segregated customer accounts", "Annual state audits"],
      time: "24–48 months (MTL patchwork)",
      cost: "$500K–$2M+ (legal + bonds)",
      alts: ["Partner with licensed MSB/bank", "EU MiCA via Ireland or Germany"],
      authority: "FinCEN + state regulators (NYDFS, CDFPI, etc.)",
      xrplNote: "US onramp for XRP is operational post-2023 SEC settlement (XRP not a security on secondary sales). Uphold, Bitstamp, Kraken provide the licensed rail. XRPL IOUs still ambiguous under federal law."
    },
    uae: {
      regime: "VARA VASP licence (crypto) + CBUAE Stored Value Facility (fiat rails)",
      risk: "med",
      licenses: ["VARA Exchange Services VASP Licence (Category II)", "CBUAE Stored Value Facility licence (if AED float held)", "AED banking partnership"],
      obligations: ["KYC/AML per CBUAE + VARA rulebooks", "Travel Rule", "Capital requirements (AED 1.5M+ for VARA)", "Quarterly transaction reporting"],
      time: "9–18 months",
      cost: "$200K–$600K",
      alts: ["DIFC DFSA (common-law alternative)", "ADGM FSRA"],
      authority: "VARA + CBUAE",
      xrplNote: "VARA-licensed XRPL onramp feasible — XRP is an approved VA in Dubai. AED stablecoin pilots (by M2, Rain) use XRPL for settlement."
    },
    sg: {
      regime: "MAS Payment Services Act — Major Payment Institution licence (DPT + Cross-border Money Transfer classes)",
      risk: "med",
      licenses: ["MPI licence (volume > SGD 3M/month or SGD 6M across classes)", "SPI licence (smaller volume)", "Cross-Border Money Transfer sub-class if fiat leg crosses border"],
      obligations: ["KYC/AML per MAS AML/CFT Notice", "Safeguarding of customer funds (trust account)", "Tech Risk Management Notice (TRM)", "Capital requirement (SGD 250K for MPI)"],
      time: "9–15 months",
      cost: "SGD 200K–600K",
      alts: ["Hong Kong SFC", "UAE VARA"],
      authority: "MAS",
      xrplNote: "Singapore treats XRP as a Digital Payment Token under PSA. MAS-licensed gateways (Independent Reserve, Coinhako) offer XRP onramp. XRPL IOUs may require additional classification."
    },
    uk: {
      regime: "FCA Cryptoasset registration (MLR 2017) + EMI/PI licence (PSR 2017)",
      risk: "high",
      licenses: ["FCA cryptoasset firm registration (5MLD/MLR)", "EMI or PI authorisation (FCA)", "FCA Financial Promotions gateway for marketing"],
      obligations: ["AML/KYC per MLR 2017", "UK Consumer Duty", "PSD2-equivalent SCA", "Client money segregation (CASS)", "Financial promotions restrictions (cooling-off, risk warning)"],
      time: "15–24 months",
      cost: "£150K–£500K",
      alts: ["EU MiCA CASP", "Gibraltar DLT"],
      authority: "FCA",
      xrplNote: "XRP onramp widely available via FCA-registered firms (Uphold UK, Kraken, Bitstamp). UK-specific guidance on stablecoins (2025) may open XRPL IOU framework."
    },
    hk: {
      regime: "HKMA Stored Value Facility (SVF) + SFC Type 1/7/9 (if VA trading)",
      risk: "med",
      licenses: ["HKMA SVF licence (fiat wallet)", "SFC Type 1 dealing + Type 7 ATS + Type 9 asset management (if VA trading)", "AMLO registration"],
      obligations: ["AML per AMLO", "Capital requirements (HKD 25M min for SVF, much more for SFC)", "Consumer protection", "Segregated customer assets"],
      time: "12–24 months (SVF + SFC dual track)",
      cost: "HKD 1M–5M ($125K–$640K)",
      alts: ["Singapore MAS", "UAE VARA"],
      authority: "HKMA + SFC",
      xrplNote: "Hong Kong ASPIRe roadmap (2025) includes XRPL stablecoins under the new stablecoin ordinance. Retail crypto now allowed via licensed exchanges only."
    },
    ch: {
      regime: "FINMA FinTech Licence (art. 1b BA) or Banking Licence + SRO/VQF membership",
      risk: "med",
      licenses: ["FINMA FinTech licence (deposits up to CHF 100M, no lending)", "Full banking licence if larger scale", "SRO/VQF membership (AML compliance)"],
      obligations: ["AMLA compliance", "KYC per FINMA Circular 2023/1", "Client funds segregation", "Semi-annual FINMA reporting"],
      time: "6–12 months (FinTech) / 24+ months (banking)",
      cost: "CHF 150K–500K",
      alts: ["Liechtenstein TVTG (EEA passport)", "EU MiCA via DE/FR"],
      authority: "FINMA",
      xrplNote: "Switzerland recognises XRP as a payment token. FINMA-licensed onramps (Bitcoin Suisse, Sygnum, SEBA/Amina) offer XRPL access."
    },
    li: {
      regime: "TVTG Token Exchange SP registration + EU EMI passport (typically via Liechtenstein EMI or EU host)",
      risk: "low",
      licenses: ["TVTG Token Exchange Service Provider registration (FMA)", "EMI licence (Liechtenstein or EEA-passported)", "SRO membership for AML"],
      obligations: ["AML per SPG + TVTG Art. 25", "Fit & proper test", "Capital requirement (CHF 100K–250K)", "FMA quarterly reporting"],
      time: "4–9 months (fastest EEA route)",
      cost: "CHF 70K–200K",
      alts: ["Switzerland FINMA", "Estonia (closing)"],
      authority: "FMA",
      xrplNote: "Liechtenstein TVTG explicitly accommodates XRPL-style token containers. Several XRPL stablecoin pilots use LI as launch juri before EU passport."
    },
    jp: {
      regime: "FSA Crypto Asset Exchange Service Provider (CAESP) + JVCEA self-regulation",
      risk: "med",
      licenses: ["FSA CAESP registration (Art. 63 FIEA)", "JVCEA member status", "JPY banking partnership"],
      obligations: ["KYC/AML per APPS Act", "FATF Travel Rule (since 2023)", "95% cold storage rule", "Segregated customer assets", "Monthly FSA reporting"],
      time: "12–24 months",
      cost: "¥50M–¥150M ($330K–$1M)",
      alts: ["Singapore MAS", "Hong Kong HKMA"],
      authority: "FSA Japan",
      xrplNote: "XRP is one of the earliest approved crypto assets in Japan (JVCEA whitelist since 2018). Onramp available via bitFlyer, Coincheck, SBI VC Trade."
    },
    kr: {
      regime: "VASP under Specific Financial Information Act + real-name bank-account requirement",
      risk: "high",
      licenses: ["VASP registration with KoFIU", "ISMS-P certification", "Real-name bank account partnership (5 banks approved)"],
      obligations: ["KYC/AML", "Real-name banking (each customer linked to one bank account)", "ISMS-P cybersecurity audit", "30% tax on crypto gains from 2027"],
      time: "12–18 months",
      cost: "₩500M–₩2B ($375K–$1.5M)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC / FIU Korea",
      xrplNote: "XRP has high retail interest in Korea (one of the top 3 markets). Onramp via Upbit, Bithumb, Korbit — all real-name-banking-linked."
    },
    in: {
      regime: "FIU-IND registration + 30% VDA tax + 1% TDS per transaction",
      risk: "high",
      licenses: ["FIU-IND VASP registration (mandatory since March 2023)", "GST + income-tax registration", "Banking relationships (periodically restricted)"],
      obligations: ["30% flat VDA tax on capital gains", "1% TDS per transfer (withheld at source)", "KYC/AML per PMLA", "Transaction-level reporting"],
      time: "6–12 months",
      cost: "₹50L–₹2Cr ($60K–$240K)",
      alts: ["Singapore MAS (common for Indian founders)", "UAE VARA"],
      authority: "FIU-IND + CBDT (tax) + RBI",
      xrplNote: "Indian exchanges (WazirX, CoinDCX) list XRP. Tax burden (30% + 1% TDS) dampens retail volume."
    },
    br: {
      regime: "BCB Law 14.478/2022 VASP regime + CMN Resolution 303/2025 (implementation)",
      risk: "med",
      licenses: ["BCB VASP authorization (from 2025)", "CMN approval for cross-border fiat flows", "CVM if token classified as security"],
      obligations: ["KYC/AML per Law 9.613", "BCB quarterly reporting", "Consumer protection", "Cyber/operational resilience"],
      time: "12–18 months",
      cost: "R$500K–R$2M ($100K–$400K)",
      alts: ["UAE VARA", "Singapore MAS"],
      authority: "BCB + CMN + CVM",
      xrplNote: "Brazil's Drex CBDC pilot explores XRPL-style ILP (Interledger) for settlement interoperability. XRP onramp via Mercado Bitcoin, Foxbit."
    },
    ng: {
      regime: "SEC Nigeria DASP (crypto) + CBN Virtual Asset Guidelines 2023 + strict CBN forex controls",
      risk: "high",
      licenses: ["SEC Nigeria DASP registration", "CBN Payment Solution Service Provider (PSSP) or Switching Licence", "NFIU registration", "Naira Banking partnership via NIBSS"],
      obligations: ["KYC/AML per MLPPA 2022", "Travel Rule", "CBN forex restrictions (Naira scarcity, capital controls)", "10% capital-gains tax on crypto"],
      time: "18–36 months (volatile regulatory stance)",
      cost: "NGN 2B+ ($2M+ range, very volatile)",
      alts: ["Ghana BoG (PSP licensing)", "UAE VARA (offshore)"],
      authority: "CBN + SEC Nigeria + NFIU",
      xrplNote: "Nigeria had one of the highest XRP retail adoption globally pre-Naira crisis. Post-2024 CBN restrictions, onramp largely via P2P + offshore. Binance P2P = dominant channel."
    },
    ke: {
      regime: "VASP Act 2025 + CBK Money Remittance Provider regs + Digital Asset Tax",
      risk: "med",
      licenses: ["VASP licence (CMA) — conversion sub-category", "CBK Money Remittance Provider (KES payout)", "KRA + iTax registration"],
      obligations: ["KYC/AML per POCAMLA", "Travel Rule", "3% Digital Asset Tax withheld at source", "M-Pesa / SME-bank integration for KES rail"],
      time: "9–18 months",
      cost: "KES 15M–50M ($115K–$385K)",
      alts: ["UAE VARA", "South Africa FSCA"],
      authority: "CMA + CBK",
      xrplNote: "Kenya's XRPL adoption via Ripple ODL corridors (KES/USD). M-Pesa + crypto bridges (Cellulant, Kotani Pay) integrate XRPL for cross-border."
    },
    za: {
      // FSCA CASP Cat 1 = advice / arrangement / distribution (non-custodial onramp widgets).
      // FSCA CASP Cat 2 = discretionary management (holds customer fiat OR crypto, acts without per-order approval).
      // SARB exchange control only applies when ZAR fiat actually crosses borders — a USD-to-crypto
      // onramp that never touches ZAR typically falls outside SARB scope entirely.
      regime: "FSCA CASP (FAIS Act) — Category 1 for typical non-custodial onramp widgets; Category 2 if the onramp holds customer fiat or crypto. FICA AML obligations (Travel Rule since Apr 2023). SARB exchange control only when ZAR fiat flows cross borders; USD-crypto onramps fall outside SARB scope.",
      risk: "med",
      licenses: [
        "CASP Category 1 (FAIS Act) — default for non-custodial onramp/offramp",
        "CASP Category 2 only if holding customer fiat or crypto",
        "SARB exchange-control approval only for cross-border ZAR flows",
        "Payments System Operator (PSO) designation if operating payment rails",
      ],
      obligations: [
        "FSCA FAIS fit-and-proper (Cat 1 lighter than Cat 2)",
        "FICA AML + beneficial-ownership register",
        "FATF Travel Rule (in force since Apr 2023)",
        "Consumer protection under FAIS",
        "SARB reporting only if ZAR crosses border",
      ],
      time: "6–12 months (Cat 1)\n12–18 months (Cat 2 + SARB)",
      cost: "ZAR 1M–4M (~$55K–$220K) Cat 1\nZAR 3M–10M ($165K–$550K) Cat 2+SARB",
      alts: ["UAE VARA", "UK FCA (diaspora corridor)"],
      authority: "FSCA + FIC (SARB conditional, SARB/NPS if operating rails)",
      xrplNote: "South Africa was first African jurisdiction to regulate crypto (Oct 2022). Luno, VALR, AltCoinTrader offer XRP onramp. A pure non-custodial XRPL onramp widget (no ZAR, no custody) can generally sit under Cat 1. SARB exploring XRPL for cross-border CBDC bridging."
    },
    lu: {
      regime: "MiCA CASP (CSSF) + PSD2 PI/EMI for the fiat leg",
      risk: "med",
      licenses: ["CSSF CASP authorisation under MiCA", "EMI licence (CSSF) for holding customer EUR balances", "PI licence for pure routing under PSD2", "EU passporting"],
      obligations: ["KYC/AML per Luxembourg AML Law of 25 March 2020", "FATF Travel Rule >€1K", "PSD2 SCA on fiat leg", "Client funds safeguarding (EMI/PI)", "CSSF outsourcing Circular 22/806"],
      time: "12–18 months (dual CASP + EMI/PI)",
      cost: "€250K–€700K",
      alts: ["Lithuania EMI", "Liechtenstein TVTG", "Ireland CBI"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act 2020 — conversion service (limited local fiat rails, usually fiat-off-island)",
      risk: "med",
      licenses: ["CIMA VASP registration — conversion sub-class", "Partner US/EU EMI for the fiat leg (no Cayman-domiciled retail fiat infrastructure)"],
      obligations: ["AML per AMLR 2020 + MLRO appointed", "FATF Travel Rule", "Client asset segregation", "Beneficial-ownership register", "Annual audit + CIMA reporting"],
      time: "6–12 months (VASP) + partner EMI timeline",
      cost: "$100K–$300K (CIMA fees + legal) — 0% corporate tax",
      alts: ["BVI VASP", "Bermuda DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "FINTRAC MSB/FMSB (federal) + CSA provincial registration + provincial consumer protection",
      risk: "high",
      licenses: ["FINTRAC MSB or Foreign MSB registration", "CSA Pre-Registration Undertaking (PRU) per province", "Full CSA restricted dealer registration post-PRU", "Provincial consumer protection filings"],
      obligations: ["KYC/AML per PCMLTFA (March 2026 amendments)", "Travel Rule (C$1K)", "FINTRAC STR / LCTR filings", "Segregated client custody under CSA Staff Notice 21-332", "Proficiency & market-conduct rules"],
      time: "12–24 months",
      cost: "C$300K–C$1M+",
      alts: ["US state MTLs (if serving US market)", "EU MiCA", "UAE VARA"],
      authority: "FINTRAC + CSA / OSC / AMF"
    },
    vg: {
      regime: "BVI VASP Act 2022 — conversion service (fiat rail typically off-island)",
      risk: "med",
      licenses: ["BVI FSC VASP registration — conversion sub-class", "Partner EMI/bank for the fiat leg", "BVI Business Company incorporation"],
      obligations: ["AML per AMLR + FSC Code of Practice", "MLRO + FSC-approved before launch", "Fit-and-proper directors", "Cybersecurity + key-management (FSC Circular 43/2025)", "Travel Rule"],
      time: "4–12 months (VASP)",
      cost: "$150K–$400K — 0% corporate tax",
      alts: ["Cayman VASP", "Bermuda DABA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "AUSTRAC DCE registration + ASIC AFSL + Digital Assets Framework Act 2026",
      risk: "med",
      licenses: ["AUSTRAC Digital Currency Exchange (DCE) registration", "ASIC AFSL — Digital Asset Platform", "AFCA membership for consumer disputes", "APRA EMI-equivalent licence if substantial AUD float"],
      obligations: ["KYC/AML per AML/CTF Act 2006 (2024 amendments)", "Travel Rule (in force 31 March 2026)", "ePayments Code for retail", "Client asset segregation", "Breach reporting to ASIC"],
      time: "9–18 months (AFSL must be lodged by 30 June 2026 to keep no-action protection)",
      cost: "A$300K–A$1M",
      alts: ["Singapore MAS MPI", "New Zealand FMA"],
      authority: "AUSTRAC + ASIC + RBA"
    },
    mt: {
      regime: "MiCA CASP (MFSA) + PSD2 PI/EMI — VFA Act transition closes 1 July 2026",
      risk: "med",
      licenses: ["MFSA CASP authorisation under MiCA", "MFSA PI/EMI licence for fiat leg", "Simplified Art. 143(6) path for legacy VFA holders"],
      obligations: ["Full KYC/KYB", "Travel Rule >€1K", "Capital min. €125K (CASP) + EMI own-funds", "Maltese director + resident officers", "MFSA Rulebook governance"],
      time: "9–15 months",
      cost: "€150K–€450K",
      alts: ["Lithuania MiCA + EMI", "Luxembourg CSSF", "Ireland CBI"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M + BMA; fiat rails typically via external banking partner",
      risk: "med",
      licenses: ["DABA Class F (full) or Class M (modified/sandbox)", "BMA approval", "Partner bank/EMI for retail fiat leg"],
      obligations: ["AML/ATF per POCA 1997 + DABA regs", "Travel Rule", "Client money / asset segregation", "BMA Cyber Risk Management Code", "Annual audited accounts + BMA reporting"],
      time: "6–12 months",
      cost: "BMD 100K–350K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) + PI/EMI — historically the most competitive EU EMI hub",
      risk: "med",
      licenses: ["Lietuvos bankas CASP authorisation under MiCA", "PI licence (PSD2) for fiat routing", "EMI licence for customer EUR balances", "EU passporting"],
      obligations: ["KYC/AML per Lithuania AML Law (2022/2024)", "Travel Rule >€1K", "SCA under PSD2", "Local director + AML officer resident in Lithuania", "Capital min. €125K (CASP) + EMI own-funds"],
      time: "9–15 months",
      cost: "€100K–€350K",
      alts: ["Ireland CBI", "Luxembourg CSSF", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "CBI CASP (MiCA) + PSD2 PI/EMI — English-speaking EU hub",
      risk: "med",
      licenses: ["CBI CASP authorisation under MiCA", "CBI Payment Institution (PSD2) for fiat leg", "EMI licence for EUR customer balances", "EU passporting from Ireland"],
      obligations: ["KYC/AML per Criminal Justice (ML/TF) Act 2010", "FATF Travel Rule >€1K", "SCA under PSD2", "CBI Fitness & Probity regime", "DORA operational resilience (Jan 2025)", "Consumer Protection Code"],
      time: "12–18 months",
      cost: "€250K–€700K",
      alts: ["Luxembourg CSSF", "Lithuania EMI", "UK FCA"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "English-speaking EU entry-point used by Coinbase Ireland, Kraken (Payward Europe), Ripple Labs Ireland. Common choice for US firms offering XRPL onramp to EU users."
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CROSS-BORDER PAYMENT (international remittance using crypto rails)
  // ═══════════════════════════════════════════════════════════════
  cross_border_payment: {
    eu: {
      regime: "CASP (MiCA) + PSD2/PSD3 + AMLD6 Travel Rule (EU Reg 2023/1113) + potentially SEPA Inst if Euro",
      risk: "high",
      licenses: ["CASP authorisation (crypto transfer service)", "PI or EMI licence (fiat leg)", "EU passport across member states"],
      obligations: ["FATF Travel Rule (low threshold = €1K+ = always for crypto)", "KYC/AML per AMLD6", "SEPA / SCT compliance (if fiat)", "Consumer protection under MiCA", "Sanctions screening per EU Reg 833/2014"],
      time: "12–24 months",
      cost: "€150K–€500K",
      alts: ["UAE VARA (faster MENA corridor)", "Singapore MAS (APAC corridor)", "Liechtenstein TVTG"],
      authority: "NCA + ECB + ESMA",
      xrplNote: "XRPL + RLUSD is a reference cross-border stack — sub-second settlement, ~$0.0002 per transaction. Ripple ODL (On-Demand Liquidity) uses XRP as a bridge asset. EU corridors now operational via licensed partners (Bitstamp Europe, Uphold)."
    },
    us: {
      regime: "FinCEN MSB + State MTLs (including Remittance Transfer Rule) + OFAC sanctions + CFPB Remittance Rule",
      risk: "high",
      licenses: ["FinCEN MSB registration", "State MTLs in every state", "Remittance Transfer Provider (>100 cross-border/year, CFPB Reg E)", "NY BitLicense"],
      obligations: ["BSA/AML (including CIP + EDD for high-risk corridors)", "Travel Rule ≥ $3K", "OFAC SDN + sectoral sanctions screening (every transaction)", "Dodd-Frank Reg E disclosures (exchange rate, fees, delivery time)", "Consumer complaint resolution (30 days)"],
      time: "24–48 months",
      cost: "$500K–$2M+",
      alts: ["EU via Ireland/Germany", "UAE VARA for MENA corridor"],
      authority: "FinCEN + state regulators + OFAC + CFPB",
      xrplNote: "US → LatAm, US → Philippines corridors using XRP ODL are live via MoneyGram (historic), Tranglo, SBI Remit. XRPL settles in ~3 seconds vs SWIFT's 1-3 days."
    },
    uae: {
      regime: "VARA VASP + CBUAE cross-border payments regulations + Aani instant payment rails",
      risk: "med",
      licenses: ["VARA Transfer & Settlement Services VASP Licence", "CBUAE Remittance Licence (if fiat leg)", "SWIFT/Aani connectivity"],
      obligations: ["KYC/AML per CBUAE + VARA rulebooks", "Travel Rule", "AED/USD capital + liquidity requirements", "Sanctions screening"],
      time: "9–18 months",
      cost: "$250K–$750K",
      alts: ["Singapore MAS", "Bahrain CBB"],
      authority: "VARA + CBUAE",
      xrplNote: "UAE is a top XRPL cross-border hub. Onafriq–Ripple (2023) partnership routes EU/UK → Africa via UAE-based ODL. Emirates NBD + CBUAE CBDC pilots evaluated XRPL."
    },
    sg: {
      regime: "MAS PSA — Cross-Border Money Transfer class + potentially Domestic Money Transfer class + DPT",
      risk: "med",
      licenses: ["MPI licence with Cross-Border Money Transfer + DPT classes", "SPI if volume below SGD 3M/month"],
      obligations: ["KYC/AML per MAS AML/CFT Notice", "Travel Rule", "Safeguarding (trust account)", "Tech Risk Management Notice", "Consumer protection"],
      time: "9–15 months",
      cost: "SGD 250K–800K",
      alts: ["Hong Kong HKMA", "UAE VARA"],
      authority: "MAS",
      xrplNote: "Singapore is a top APAC hub for XRPL cross-border. Project Ubin (MAS) evaluated distributed-ledger settlement; Partior (DBS+JPM+SC) uses similar tech. Triple-A (MAS-licensed) uses XRPL for stablecoin rails."
    },
    uk: {
      regime: "FCA Cryptoasset registration + EMI/PI + UK Remittance Obligations",
      risk: "high",
      licenses: ["FCA cryptoasset registration", "EMI or PI authorisation", "Approved Persons Regime for senior management"],
      obligations: ["MLR 2017 AML/KYC", "Travel Rule per UK MLR amendment (Sep 2023)", "Consumer Duty + Outcomes", "PSR/PSD2-equivalent SCA", "CASS client money segregation"],
      time: "15–24 months",
      cost: "£200K–£600K",
      alts: ["EU MiCA CASP", "Gibraltar"],
      authority: "FCA",
      xrplNote: "UK → India and UK → Philippines corridors via XRPL ODL partners. Post-Brexit, UK has diverged on stablecoin framework (2025) — may open a UK-specific XRPL IOU path."
    },
    hk: {
      regime: "HKMA SVF + SFC Type 1/7/9 (if VA) + AMLO + Cross-Border Payment Guidelines (HKMA)",
      risk: "med",
      licenses: ["HKMA SVF or Money Service Operator licence", "SFC Types 1+7 if VA involved", "AMLO registration"],
      obligations: ["AML per AMLO", "Travel Rule", "Consumer protection", "Capital + liquidity requirements"],
      time: "12–24 months",
      cost: "HKD 1.5M–6M ($190K–$770K)",
      alts: ["Singapore MAS", "UAE VARA"],
      authority: "HKMA + SFC + C&ED (Customs & Excise for MSO)",
      xrplNote: "HK – Mainland China corridor (via Bond Connect / Wealth Connect) evaluates XRPL for RMB ↔ HKD settlement. Stablecoin ordinance (2025) creates a clearer path for HKD-pegged XRPL IOUs."
    },
    ch: {
      regime: "FINMA FinTech licence or Banking + SRO/VQF + FX law + FMIA (financial market infrastructure)",
      risk: "med",
      licenses: ["FINMA FinTech or Banking licence", "SRO/VQF membership", "FMIA registration if operating a payment system"],
      obligations: ["AMLA + FMIA", "KYC + ongoing monitoring", "Banking-secrecy compliance", "Semi-annual FINMA reporting"],
      time: "6–18 months (FinTech) / 24+ months (banking)",
      cost: "CHF 200K–800K",
      alts: ["Liechtenstein TVTG + EEA passport", "EU via Germany"],
      authority: "FINMA + SNB (Swiss National Bank for large volumes)",
      xrplNote: "Taurus + Sygnum + Amina/SEBA offer institutional XRP/RLUSD cross-border settlement. SIX Digital Exchange (SDX) explores XRPL for multi-CBDC."
    },
    li: {
      regime: "TVTG Token Exchange + Transfer SPs + EU EMI passport",
      risk: "low",
      licenses: ["TVTG Token Exchange + Token Transfer Service Provider (FMA)", "EMI licence (via LI or EEA passport)", "SRO AML membership"],
      obligations: ["AML per SPG + TVTG", "Travel Rule", "Fit & proper", "FMA reporting", "Capital requirement per licence category"],
      time: "4–12 months",
      cost: "CHF 100K–300K",
      alts: ["Switzerland FINMA", "EU via DE/IE/FR"],
      authority: "FMA Liechtenstein",
      xrplNote: "LI's TVTG was explicitly designed to accommodate the XRPL token-container model. Several cross-border XRPL pilots (Amazon Web Services + partner) use LI as the HQ juri."
    },
    jp: {
      regime: "FSA Fund Transfer Service Provider + CAESP (if crypto leg) + JVCEA",
      risk: "med",
      licenses: ["FSA Type 2 FTSP (up to ¥1M/transaction) or Type 1 (unlimited)", "CAESP registration (crypto leg)", "JVCEA membership"],
      obligations: ["KYC/AML per APPS", "FATF Travel Rule", "Monthly FSA reporting", "Cold-storage 95% rule (crypto leg)", "Consumer fund protection"],
      time: "12–18 months",
      cost: "¥30M–¥100M ($200K–$700K)",
      alts: ["Singapore MAS", "Hong Kong HKMA"],
      authority: "FSA Japan",
      xrplNote: "SBI Remit (Japan) is one of the largest corridors using XRPL ODL — JPY → PHP, MYR, VND routes. Volumes in hundreds of millions USD annually."
    },
    kr: {
      regime: "VASP + Foreign Exchange Transaction Act + Electronic Financial Transactions Act",
      risk: "high",
      licenses: ["VASP registration (KoFIU)", "Bank of Korea approval for FX corridor", "Real-name account bank partnership"],
      obligations: ["KYC/AML", "Travel Rule (>₩1M = ~$750)", "Real-name banking link", "FX reporting to BoK (any transaction >$10K)"],
      time: "12–24 months",
      cost: "₩500M–₩2B ($375K–$1.5M)",
      alts: ["Japan FSA", "Singapore MAS"],
      authority: "FSC + KoFIU + BoK (FX)",
      xrplNote: "Korea has high XRP retail adoption but limited institutional cross-border infrastructure due to FX controls. Remittance corridors mostly domestic with banks."
    },
    in: {
      regime: "RBI FEMA + LRS (Liberalised Remittance Scheme) + FIU-IND + heavy forex restrictions — grey zone for crypto cross-border",
      risk: "high",
      licenses: ["FIU-IND VASP registration", "No explicit RBI authorisation pathway for crypto cross-border as of 2026", "LRS limit: $250K/person/year"],
      obligations: ["FEMA compliance for all cross-border flows", "30% VDA tax + 1% TDS", "PMLA KYC/AML", "RBI TT rate reporting"],
      time: "12–24 months (navigating grey zones)",
      cost: "₹1Cr–₹5Cr ($120K–$600K)",
      alts: ["Singapore MAS (most common for Indian fintechs)", "UAE VARA"],
      authority: "RBI + FIU-IND + CBDT",
      xrplNote: "India-UAE corridor via XRPL is one of the largest crypto remittance lanes globally (diaspora flows ~$25B/year total). Regulatory uncertainty — most flows go through licensed exchanges or P2P."
    },
    br: {
      regime: "BCB Law 14.478/2022 VASP + CMN 303/2025 + PIX (instant payment) framework + BCB FX rules",
      risk: "med",
      licenses: ["BCB VASP authorization", "CMN approval for cross-border", "CVM if token is a security", "PIX participant if domestic settlement"],
      obligations: ["Law 9.613 AML", "Travel Rule", "BCB quarterly reporting", "CMN FX compliance", "LGPD data protection"],
      time: "12–18 months",
      cost: "R$1M–R$4M ($200K–$800K)",
      alts: ["UAE VARA", "Mexico CNBV (LATAM corridor)"],
      authority: "BCB + CMN + CVM + COAF",
      xrplNote: "Brazil's Drex CBDC + ILP (Interledger) pilots evaluate XRPL-style architecture for cross-border RMB/USD settlement. Ripple partnered with Travelex Bank for BRL–USD rails."
    },
    ng: {
      regime: "CBN strict FX + SEC Nigeria DASP + NFIU + Foreign Exchange Act — very high risk due to Naira scarcity",
      risk: "high",
      licenses: ["SEC Nigeria DASP registration (crypto leg)", "CBN authorized dealer licence (FX leg — very restricted)", "NFIU registration"],
      obligations: ["KYC/AML per MLPPA 2022", "Travel Rule", "CBN Naira scarcity controls (strict outflow limits)", "Mandatory NIBSS integration for NGN rail"],
      time: "24–48 months (volatile)",
      cost: "NGN 3B+ ($3M+ range)",
      alts: ["Ghana BoG", "UAE VARA (offshore, common)"],
      authority: "CBN + SEC Nigeria + NFIU",
      xrplNote: "Nigeria diaspora remittance ($20B+/year) is a major XRPL target. Post-2024 restrictions, most flows go through offshore (UAE, UK) + P2P last mile. Onafriq-Ripple handles institutional flows."
    },
    ke: {
      regime: "VASP Act 2025 + CBK Money Remittance + POCAMLA + Foreign Exchange Act",
      risk: "med",
      licenses: ["VASP licence (CMA) — transfer category", "CBK Money Remittance Provider", "KRA + iTax registration"],
      obligations: ["KYC/AML per POCAMLA", "Travel Rule", "3% Digital Asset Tax", "KES rail via M-Pesa/banks", "CBK FX reporting (>$10K)"],
      time: "9–18 months",
      cost: "KES 15M–60M ($115K–$460K)",
      alts: ["UAE VARA", "South Africa FSCA"],
      authority: "CMA + CBK",
      xrplNote: "Kenya ↔ Uganda, Kenya ↔ Tanzania corridors via XRPL ODL (Onafriq, Kotani Pay). M-Pesa interop with XRPL makes Kenya a gateway for East Africa crypto remittance."
    },
    za: {
      regime: "FSCA CASP + SARB exchange control (very strict for ZAR outflows) + NPS Act + FICA AML",
      risk: "high",
      licenses: ["CASP Category II under FAIS Act", "SARB approval for cross-border flows", "Authorised Dealer with Limited Authority (ADLA) for FX retail"],
      obligations: ["SARB Exchange Control Regulation (R1M/year individual outflow limit)", "Travel Rule since Apr 2023", "FICA AML + beneficial ownership", "Consumer protection"],
      time: "12–18 months",
      cost: "ZAR 5M–15M ($275K–$825K)",
      alts: ["UAE VARA (diaspora to ME/Asia)", "Mauritius FSC"],
      authority: "FSCA + SARB + FIC",
      xrplNote: "SA ↔ SADC corridor (regional) + SA ↔ UK diaspora corridor via XRPL partners. SARB + IntelliBridge pilot tokenised ZAR on XRPL for cross-border settlement."
    },
    lu: {
      regime: "MiCA CASP (CSSF) + PSD2 PI/EMI for the fiat leg + SEPA Instant for EUR corridors",
      risk: "med",
      licenses: ["CSSF CASP authorisation under MiCA", "PI or EMI licence (PSD2)", "SEPA Instant participation"],
      obligations: ["KYC/AML per Luxembourg AML Law 2020", "FATF Travel Rule >€1K", "Client funds safeguarding", "SCA under PSD2", "Sanctions screening (EU)"],
      time: "12–18 months",
      cost: "€250K–€700K",
      alts: ["Ireland CBI", "Lithuania EMI", "Liechtenstein TVTG"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act 2020 — transfer service class (international corridor infrastructure)",
      risk: "med",
      licenses: ["CIMA VASP registration — transfer service", "Partner EMI/bank on each corridor endpoint for fiat legs"],
      obligations: ["AML per AMLR + MLRO", "Travel Rule", "Beneficial-ownership register", "Annual audit + CIMA reporting"],
      time: "6–12 months",
      cost: "$100K–$300K — 0% corporate tax",
      alts: ["BVI VASP", "Bermuda DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "FINTRAC MSB/FMSB + PCMLTFA + provincial consumer-protection",
      risk: "med",
      licenses: ["FINTRAC MSB or Foreign MSB registration", "Provincial money-services licences (e.g., Québec AMF, BC FICOM)", "CSA registration if tokens classified as securities"],
      obligations: ["KYC/AML per PCMLTFA", "Travel Rule (C$1K)", "LCTR + EFT (≥C$10K) reports", "Sanctions screening", "Consumer disclosures"],
      time: "9–18 months",
      cost: "C$250K–C$800K",
      alts: ["US state MTLs", "UAE VARA"],
      authority: "FINTRAC + provincial regulators"
    },
    vg: {
      regime: "BVI VASP Act 2022 — conversion/transfer service (corridor infra)",
      risk: "med",
      licenses: ["BVI FSC VASP registration", "Partner EMI/bank on each corridor endpoint"],
      obligations: ["AML per AMLR + MLRO", "Fit-and-proper directors", "Travel Rule", "Cybersecurity + key-management"],
      time: "4–12 months",
      cost: "$150K–$400K — 0% corporate tax",
      alts: ["Cayman VASP", "Bermuda DABA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "AUSTRAC DCE + AUSTRAC Remittance Network Provider + ASIC AFSL",
      risk: "med",
      licenses: ["AUSTRAC DCE registration", "AUSTRAC Remittance Network Provider (RNP) registration", "ASIC AFSL if offering a financial product"],
      obligations: ["KYC/AML per AML/CTF Act 2006", "Travel Rule (31 March 2026)", "IFTI (International Funds Transfer Instruction) reports", "Sanctions screening", "Consumer protection"],
      time: "9–18 months",
      cost: "A$250K–A$800K",
      alts: ["Singapore MAS MPI (cross-border class)", "New Zealand FMA"],
      authority: "AUSTRAC + ASIC"
    },
    mt: {
      regime: "MiCA CASP (MFSA) + PSD2 PI/EMI for fiat leg",
      risk: "med",
      licenses: ["MFSA CASP authorisation under MiCA", "MFSA PI/EMI licence for cross-border fiat settlement", "EU passporting"],
      obligations: ["KYC/AML + Travel Rule >€1K", "SCA under PSD2", "Maltese director + resident officers", "Sanctions screening (EU)"],
      time: "9–15 months",
      cost: "€150K–€450K",
      alts: ["Lithuania EMI", "Luxembourg CSSF", "Ireland CBI"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M + BMA (cross-border payment activity)",
      risk: "med",
      licenses: ["DABA Class F (full) or Class M (modified/sandbox)", "BMA approval", "Partner bank/EMI on each corridor endpoint"],
      obligations: ["AML/ATF per POCA 1997", "Travel Rule", "Client funds safeguarding", "BMA Cyber Risk Management Code", "Annual audit"],
      time: "6–12 months",
      cost: "BMD 100K–350K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) + PSD2 PI — cheapest EU cross-border EMI hub",
      risk: "med",
      licenses: ["Lietuvos bankas CASP under MiCA", "PI/EMI licence (PSD2)", "EU passporting"],
      obligations: ["KYC/AML per Lithuania AML Law", "Travel Rule >€1K", "SCA under PSD2", "Local director + AML officer", "Sanctions screening"],
      time: "9–15 months",
      cost: "€100K–€350K",
      alts: ["Ireland CBI", "Luxembourg CSSF", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "CBI CASP (MiCA) + PSD2 PI — English-speaking EU cross-border hub",
      risk: "med",
      licenses: ["CBI CASP authorisation under MiCA", "CBI Payment Institution (PSD2) for fiat corridors", "EU passporting from Ireland"],
      obligations: ["KYC/AML per CJA 2010", "FATF Travel Rule >€1K", "SCA under PSD2", "Sanctions screening", "DORA operational resilience (Jan 2025)", "Consumer Protection Code"],
      time: "12–18 months",
      cost: "€250K–€700K",
      alts: ["Luxembourg CSSF", "Lithuania EMI", "UK FCA"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "Ripple Labs Ireland Ltd uses this stack for RippleNet corridor services into the EU. Common EU cross-border base for US remittance fintechs."
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
    ng: {
      regime: "SEC Nigeria DASP — utility tokens generally exempt if no investment expectation",
      risk: "med",
      licenses: ["SEC Nigeria DASP if marketed with investment angle", "No licence for pure utility"],
      obligations: ["KYC/AML if DASP", "Consumer-protection disclosures"],
      time: "6–12 months",
      cost: "NGN 50M–200M ($50K–$200K)",
      alts: ["UAE VARA", "UE MiCA"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "VASP Act 2025 — utility tokens generally exempt if genuine consumption use",
      risk: "low",
      licenses: ["No VASP for pure utility", "CMA VASP if secondary trading platform"],
      obligations: ["KYC/AML if VASP", "Consumer protection"],
      time: "3–9 months",
      cost: "KES 2M–10M ($15K–$75K)",
      alts: ["South Africa FSCA", "UAE VARA"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CASP — utility tokens outside scope if no investment character; copyright applies for in-app use",
      risk: "low",
      licenses: ["No CASP for pure utility", "CASP Cat 1 if secondary trading / advice"],
      obligations: ["FICA AML if CASP", "Consumer protection under FAIS"],
      time: "3–9 months",
      cost: "ZAR 500K–2M ($30K–$110K)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "MiCA Utility Token regime (light) — CSSF whitepaper notification if offering >€1M",
      risk: "low",
      licenses: ["No CASP authorisation needed", "Whitepaper notification to CSSF (if offering >€1M)"],
      obligations: ["Truthful whitepaper", "Consumer info + 14-day cooling-off", "Market abuse rules if listed"],
      time: "2–4 months",
      cost: "€30K–€120K",
      alts: ["Liechtenstein TVTG", "Switzerland"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman Virtual Asset Issuance under VASP Act — utility tokens lighter than security",
      risk: "low",
      licenses: ["Registered VASP issuer (CIMA)", "Cayman Foundation Company commonly used"],
      obligations: ["AML per AMLR 2020 + MLRO", "Issuance disclosures"],
      time: "3–6 months",
      cost: "$50K–$200K — 0% corporate tax",
      alts: ["BVI Foundation", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA — utility tokens case-by-case; Pacific Coast v Howey 4-prong test applied",
      risk: "med",
      licenses: ["No CSA registration if pure utility", "Prospectus if investment-contract test met", "FINTRAC MSB if custody"],
      obligations: ["CSA Staff Notice 46-307/308 analysis", "Consumer protection", "KYC/AML if dealer"],
      time: "6–12 months",
      cost: "C$150K–C$500K",
      alts: ["US SAFT", "EU MiCA"],
      authority: "CSA"
    },
    vg: {
      regime: "BVI VASP Act 2022 — utility tokens generally lighter path",
      risk: "low",
      licenses: ["BVI VASP registration as issuer", "BVI Foundation Company for community tokens"],
      obligations: ["AML per AMLR + MLRO", "Issuance disclosures"],
      time: "3–6 months",
      cost: "$50K–$200K — 0% corporate tax",
      alts: ["Cayman VASP", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC — utility tokens case-by-case; financial-product classification via INFO 225",
      risk: "med",
      licenses: ["No AFSL if pure utility", "ASIC AFSL if financial-product", "AUSTRAC DCE if issuer also exchanges"],
      obligations: ["Truthful marketing (Corporations Act)", "KYC/AML if licensed"],
      time: "4–9 months",
      cost: "A$100K–A$400K",
      alts: ["Singapore MAS", "UAE VARA"],
      authority: "ASIC"
    },
    mt: {
      regime: "MiCA Utility Token regime (light) via MFSA",
      risk: "low",
      licenses: ["No CASP authorisation needed", "Whitepaper notification to MFSA (if offering >€1M)"],
      obligations: ["Truthful whitepaper", "14-day cooling-off", "Market abuse rules if listed"],
      time: "2–4 months",
      cost: "€20K–€100K",
      alts: ["Lithuania MiCA", "Liechtenstein TVTG"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M — utility tokens typically Class M (modified)",
      risk: "low",
      licenses: ["DABA Class M if sandbox", "BMA approval"],
      obligations: ["AML/ATF per POCA 1997", "BMA Cyber Risk Management Code"],
      time: "4–9 months",
      cost: "BMD 50K–200K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA Utility Token regime (light) via Lietuvos bankas",
      risk: "low",
      licenses: ["No CASP authorisation", "Whitepaper notification (if offering >€1M)"],
      obligations: ["Truthful whitepaper", "14-day cooling-off", "Market abuse rules"],
      time: "2–4 months",
      cost: "€15K–€80K",
      alts: ["Malta MiCA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "MiCA Utility Token regime (light) via CBI",
      risk: "low",
      licenses: ["No CBI CASP required", "Whitepaper notification to CBI (if offering >€1M)"],
      obligations: ["Truthful whitepaper per CJA 2010", "14-day cooling-off", "Market abuse rules if listed"],
      time: "3–6 months",
      cost: "€40K–€200K",
      alts: ["Luxembourg CSSF", "Malta MFSA"],
      authority: "Central Bank of Ireland (CBI)"
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
    ng: {
      regime: "SEC Nigeria — Digital Asset Rules (2022) for security token offerings (STO)",
      risk: "high",
      licenses: ["SEC Nigeria STO authorisation", "Prospectus filing", "DASP registration if secondary trading"],
      obligations: ["Full prospectus + risk disclosures", "KYC/AML per MLPPA 2022", "Investor accreditation"],
      time: "18–36 months",
      cost: "NGN 500M+ ($500K+)",
      alts: ["UAE VARA", "EU DLT Pilot"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "CMA Capital Markets Act + VASP Act 2025 for issuance + trading",
      risk: "high",
      licenses: ["CMA prospectus approval", "CMA VASP if tokenised trading", "CBK approval for KES flows"],
      obligations: ["Full prospectus", "KYC/AML per POCAMLA", "Ongoing disclosure", "3% Digital Asset Tax"],
      time: "12–24 months",
      cost: "KES 15M–60M ($115K–$460K)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CISCA + JSE listing rules + CASP if trading; IFWG tokenised securities project",
      risk: "high",
      licenses: ["CISCA manager licence", "JSE listing (if exchange-traded)", "CASP Category II if secondary trading platform"],
      obligations: ["FSCA prospectus + ongoing disclosure", "KYC/AML per FICA", "POPIA data protection"],
      time: "12–18 months",
      cost: "ZAR 5M–15M ($275K–$825K)",
      alts: ["UAE ADGM", "Mauritius FSC"],
      authority: "FSCA + JSE"
    },
    lu: {
      regime: "Luxembourg Securities Law + MiFID + DLT Pilot Regime — dominant EU STO hub",
      risk: "med",
      licenses: ["CSSF prospectus approval", "MiFID investment firm if trading / dealing", "DLT Pilot Regime sandbox"],
      obligations: ["Prospectus Regulation (EU 2017/1129)", "MAR market abuse rules", "CSDR custody segregation", "KYC/AML"],
      time: "9–15 months",
      cost: "€300K–€1M+",
      alts: ["Switzerland FINMA", "Liechtenstein TVTG", "Ireland CBI"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman Mutual Funds Law + SIBL (Securities) — popular for offshore STO structures",
      risk: "med",
      licenses: ["CIMA Mutual/Private Fund registration", "SIBL if brokerage", "CIMA VASP if trading platform"],
      obligations: ["AML per AMLR + MLRO", "Fund audit + prospectus", "Investor suitability if retail"],
      time: "3–9 months",
      cost: "$100K–$500K — 0% corporate tax",
      alts: ["BVI SIBA", "Bermuda DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA — full securities regime; restricted to accredited investors unless prospectus",
      risk: "high",
      licenses: ["CSA prospectus or Reg 45-106 exemption", "Registered dealer (IIROC)", "ATS registration if trading"],
      obligations: ["Full prospectus + continuous disclosure", "KYC/AML per PCMLTFA", "Accredited investor verification"],
      time: "12–24 months",
      cost: "C$500K–C$2M",
      alts: ["US Reg D", "EU DLT Pilot"],
      authority: "CSA / OSC / AMF / IIROC"
    },
    vg: {
      regime: "BVI Securities and Investment Business Act (SIBA) — STO via Approved Manager / Incubator Fund",
      risk: "med",
      licenses: ["BVI Approved Manager licence", "BVI Incubator Fund / Private Fund", "VASP Act if tokenised secondary"],
      obligations: ["AML + MLRO", "SIBA reporting", "Audit if fund"],
      time: "4–9 months",
      cost: "$100K–$400K — 0% corporate tax",
      alts: ["Cayman SIBL", "Bermuda DABA"],
      authority: "BVI FSC"
    },
    au: {
      regime: "Corporations Act full securities regime + ASIC AFSL + Digital Assets Framework Act 2026",
      risk: "high",
      licenses: ["ASIC AFSL — issuer + dealer", "Prospectus under s.710", "ASIC Digital Asset Platform if secondary"],
      obligations: ["Full prospectus + continuous disclosure", "Design and Distribution Obligations (DDO)", "Accredited investor gating for wholesale"],
      time: "12–24 months",
      cost: "A$500K–A$1.5M",
      alts: ["Singapore MAS", "EU DLT Pilot"],
      authority: "ASIC"
    },
    mt: {
      regime: "Malta Financial Markets Act + MiFID + DLT Pilot Regime via MFSA",
      risk: "med",
      licenses: ["MFSA prospectus approval", "MiFID investment firm licence", "DLT Pilot Regime sandbox"],
      obligations: ["Prospectus Regulation", "MAR market abuse rules", "CSDR custody", "KYC/AML"],
      time: "9–15 months",
      cost: "€200K–€700K",
      alts: ["Lithuania MiCA", "Luxembourg CSSF"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 + BMA Investment Business Act (if fund structure)",
      risk: "med",
      licenses: ["DABA Class F + BMA Investment Business", "BMA approval"],
      obligations: ["AML/ATF per POCA 1997", "Fund reporting", "BMA Cyber Risk Management Code"],
      time: "6–12 months",
      cost: "BMD 150K–500K",
      alts: ["Cayman SIBL", "BVI Approved Manager"],
      authority: "BMA"
    },
    lt: {
      regime: "Lithuania Securities Law + MiFID + DLT Pilot Regime via Lietuvos bankas",
      risk: "med",
      licenses: ["Lietuvos bankas prospectus approval", "MiFID investment firm", "DLT Pilot Regime sandbox"],
      obligations: ["Prospectus Regulation", "MAR market abuse rules", "KYC/AML", "Local director + AML officer"],
      time: "6–12 months",
      cost: "€100K–€400K",
      alts: ["Malta MiCA", "Luxembourg CSSF"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "Irish Securities Law + MiFID + DLT Pilot Regime — leading EU fund-admin hub",
      risk: "med",
      licenses: ["CBI prospectus approval", "CBI MiFID investment firm authorisation", "DLT Pilot Regime sandbox"],
      obligations: ["Prospectus Regulation (EU 2017/1129)", "MAR market abuse rules", "UCITS/AIFMD if collective", "KYC/AML per CJA 2010", "DORA operational resilience"],
      time: "12–18 months",
      cost: "€300K–€1M+",
      alts: ["Luxembourg CSSF", "Malta MFSA"],
      authority: "Central Bank of Ireland (CBI)"
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
    ng: {
      regime: "SEC Nigeria — hybrid tokens classified per dominant feature (utility vs investment)",
      risk: "high",
      licenses: ["SEC Nigeria DASP + STO treatment if investment dominates", "Utility-only if consumption dominates"],
      obligations: ["Full disclosure of token mechanics", "KYC/AML per MLPPA 2022", "Reclassification risk over time"],
      time: "12–24 months",
      cost: "NGN 200M+ ($200K+)",
      alts: ["UAE VARA", "Cayman VASP"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "CMA case-by-case — utility vs security analysis; hybrid tends toward securities treatment",
      risk: "high",
      licenses: ["CMA prospectus if securities element dominant", "VASP + DASP if dual-purpose"],
      obligations: ["Disclosure of hybrid mechanics", "KYC/AML per POCAMLA", "3% Digital Asset Tax"],
      time: "9–18 months",
      cost: "KES 10M–40M ($75K–$310K)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CASP + FAIS Act + CISCA — hybrid tokens trigger both if investment + utility",
      risk: "high",
      licenses: ["CASP Category II", "CISCA manager if pooled", "FAIS advice + intermediary licences"],
      obligations: ["Dual-regime disclosures", "FICA AML", "Consumer protection"],
      time: "12–18 months",
      cost: "ZAR 3M–10M ($165K–$550K)",
      alts: ["UAE VARA", "Mauritius FSC"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "MiCA + MiFID dual regime for hybrid tokens — CSSF classifies per dominant feature",
      risk: "high",
      licenses: ["CSSF CASP + MiFID investment firm if dual", "Simplified if utility dominates", "Full prospectus if security dominates"],
      obligations: ["Dual KYC/AML", "Whitepaper + prospectus depending on classification", "MAR market abuse rules"],
      time: "9–18 months",
      cost: "€200K–€800K",
      alts: ["Liechtenstein TVTG (flexible token container)", "Switzerland FINMA"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act + SIBL — hybrid analysis determines regulatory path",
      risk: "med",
      licenses: ["CIMA VASP as issuer + SIBL if brokerage element", "Cayman Foundation if community-governed"],
      obligations: ["AML per AMLR + MLRO", "Dual disclosures if hybrid", "Investor suitability if retail"],
      time: "4–9 months",
      cost: "$75K–$300K — 0% corporate tax",
      alts: ["BVI Foundation", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA Staff Notice 46-307/308 — hybrid tokens subject to full Howey-like 4-prong analysis",
      risk: "high",
      licenses: ["CSA prospectus if investment-contract test met", "FINTRAC MSB if custody", "IIROC if secondary trading"],
      obligations: ["Full disclosure + classification analysis", "KYC/AML per PCMLTFA", "Accredited investor gating if exempt"],
      time: "12–24 months",
      cost: "C$300K–C$1M",
      alts: ["US Reg D / SAFT", "EU MiCA"],
      authority: "CSA"
    },
    vg: {
      regime: "BVI VASP Act + SIBA — hybrid analysis per dominant feature",
      risk: "med",
      licenses: ["BVI VASP + SIBA investment business if hybrid", "BVI Foundation for community tokens"],
      obligations: ["AML + MLRO", "Dual-regime disclosures"],
      time: "4–9 months",
      cost: "$75K–$300K — 0% corporate tax",
      alts: ["Cayman VASP + SIBL", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC INFO 225 — hybrid tokens case-by-case; most trigger AFSL + MIS regime",
      risk: "high",
      licenses: ["ASIC AFSL if financial-product", "AUSTRAC DCE if exchange element", "Prospectus/PDS depending on retail/wholesale"],
      obligations: ["Design and Distribution Obligations (DDO)", "KYC/AML per AML/CTF Act", "Dual-regime disclosures"],
      time: "12–24 months",
      cost: "A$300K–A$1M",
      alts: ["Singapore MAS", "UAE VARA"],
      authority: "ASIC"
    },
    mt: {
      regime: "MiCA + MiFID dual regime via MFSA — hybrid analysis per dominant feature",
      risk: "med",
      licenses: ["MFSA CASP + MiFID investment firm if hybrid", "Utility-only path if consumption dominates"],
      obligations: ["Dual KYC/AML", "Whitepaper + prospectus", "MAR market abuse rules"],
      time: "9–15 months",
      cost: "€150K–€600K",
      alts: ["Lithuania MiCA", "Luxembourg CSSF"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 — hybrid tokens typically Class F with supplementary BMA review",
      risk: "med",
      licenses: ["DABA Class F (full) + BMA supplementary approval for hybrid"],
      obligations: ["AML/ATF per POCA 1997", "Dual-regime disclosures", "BMA Cyber Risk Management Code"],
      time: "6–12 months",
      cost: "BMD 100K–400K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA + MiFID dual regime via Lietuvos bankas — hybrid per dominant feature",
      risk: "med",
      licenses: ["Lietuvos bankas CASP + MiFID investment firm if dual", "Utility-only path if consumption dominates"],
      obligations: ["Dual KYC/AML", "Whitepaper + prospectus depending on classification", "MAR market abuse rules"],
      time: "6–12 months",
      cost: "€100K–€400K",
      alts: ["Malta MiCA", "Luxembourg CSSF"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "MiCA + MiFID dual regime via CBI — hybrid analysis per dominant feature",
      risk: "med",
      licenses: ["CBI CASP + MiFID investment firm if hybrid", "Simplified if utility dominates"],
      obligations: ["Dual KYC/AML per CJA 2010", "Whitepaper + prospectus depending on classification", "MAR market abuse rules", "DORA operational resilience"],
      time: "12–18 months",
      cost: "€250K–€800K",
      alts: ["Luxembourg CSSF", "Malta MFSA"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },
};
