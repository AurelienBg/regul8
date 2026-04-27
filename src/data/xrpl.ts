export const XRPL_KNOWLEDGE = {
  xrp_legal_status: {
    summary: "XRP is classified as a utility token in secondary market sales (SEC v. Ripple Labs, July 2023). Programmatic sales on exchanges do not constitute securities transactions. Institutional sales by Ripple Labs to sophisticated investors remain a grey area.",
    jurisdiction_notes: {
      eu: "ESMA + national competent authorities: XRP is a crypto-asset under MiCA — neither an EMT nor an ART. Trading platforms serving EU users must hold a CASP licence under Title V (Art. 59+). Whitepaper not required for XRP itself (already-traded asset exemption Art. 4(2)) but CASPs must publish a crypto-asset summary. RLUSD on XRPL is the related EMT play.",
      us: "Secondary-market XRP sales on exchanges: not securities (SDNY, Torres J., July 2023). Ripple's institutional / direct sales to sophisticated investors: investment contracts subject to securities laws. Settlement Aug 2024 ($125M civil penalty). XRP itself not classified as a security on its own — only specific transactions can be. CFTC treats XRP as a digital commodity for derivatives purposes.",
      sg: "MAS: XRP is a Digital Payment Token (DPT) under the Payment Services Act 2019. Trading platforms need an MPI (volume above threshold) or SPI licence. DPT advertising restrictions to retail apply (Jan 2022 guidelines). Singapore is the regional XRPL HQ — Ripple's APAC SVP based here.",
      uk: "FCA: XRP is an unregulated cryptoasset for now (financial-promotions regime applies since Oct 2023). Cryptoasset firms must hold a Cryptoasset registration (AML scope only). Future framework (Stablecoin + Cryptoasset RAO consultation 2024) will fold XRP trading into a regulated activity. Travel Rule applies since Sept 2023.",
      uae: "VARA (Dubai): XRP is a recognised virtual asset; trading requires a VASP licence (VA Exchange / Broker / Custody categories). FSRA ADGM: separately regulated under the Crypto Asset framework — Ripple holds a DFSA licence (March 2024) for the DIFC, the first major crypto firm to do so. Dubai is the anchor of Ripple's MENA build-out.",
      hk: "SFC: XRP is a virtual asset under the VATP regime (effective June 2023). Licensed VATPs (HashKey, OSL) can offer XRP to retail subject to suitability rules + insurance + 98% cold storage. HKMA covers the stablecoin side (Stablecoins Ordinance, 2024). HK reopened to retail crypto exchanges making it a key Asia hub for XRPL services.",
      ch: "FINMA: XRP is a payment token (FINMA ICO Guidelines, Feb 2018) — outside Securities Act scope. Trading does not require a securities licence; AMLA registration (SRO membership) covers AML. DLT Act (since Aug 2021) provides the framework for tokenised RWA on XRPL via SIX Digital Exchange. Switzerland hosts the Swiss-domiciled Ripple Markets AG.",
      li: "FMA: XRP falls under the TVTG (Token Container Model) framework as a payment token. TVTG Token Issuer / Service Provider licences cover all XRPL services; EEA passporting effectively turns Liechtenstein into the fastest path to EU market access (3–9 months) before MiCA-CASP onboarding.",
      jp: "FSA/JVCEA: XRP is one of the earliest whitelisted crypto assets in Japan (since 2018). Trading via FSA-registered CAESP exchanges (bitFlyer, Coincheck, SBI VC Trade). 95% cold-storage rule applies.",
      kr: "FSC/KoFIU: XRP is one of the top 3 traded crypto assets in Korea. Trading via VASP-registered exchanges (Upbit, Bithumb, Korbit) with mandatory real-name bank account. 20% capital-gains tax applies from 2027.",
      in: "FIU-IND: XRP is legal to trade via registered exchanges (WazirX, CoinDCX, ZebPay). 30% flat VDA tax + 1% TDS per transaction. No SEC-style classification dispute.",
      br: "BCB: XRP is a crypto-asset under Law 14.478/2022. Trading via BCB-authorised VASPs (Mercado Bitcoin, Foxbit, Binance BR). Drex CBDC pilots explore XRPL-style interoperability.",
      ng: "SEC Nigeria / CBN: XRP is a digital asset under SEC Nigeria DASP framework (2022). Nigeria had one of the highest retail XRP adoption globally pre-2024. Post-Naira-crisis, cross-border flows now dominated by P2P + offshore (UAE, UK).",
      ke: "CMA: XRP is covered by the VASP Act 2025. Trading via licensed VASPs. Ripple-Onafriq partnerships route KES ↔ USD corridors using XRPL ODL. 3% Digital Asset Tax applies.",
      za: "FSCA: XRP is a crypto-asset requiring CASP licence under FAIS Act (Oct 2022 — first African jurisdiction to regulate crypto). Trading via Luno, VALR, AltCoinTrader. SARB evaluates XRPL for cross-border CBDC bridging.",
      // Established markets — added Apr 2026
      ca: "CSA / IIROC: XRP is a crypto-asset, traded on CSA Pre-Registration Undertaking platforms (Bitbuy, Newton, NDAX, Coinbase Canada). No security classification at federal level; provincial securities commissions assess case-by-case.",
      au: "ASIC / AUSTRAC: XRP is a digital asset, traded via AUSTRAC-registered DCEs (Independent Reserve, BTC Markets, Swyftx). 2024 ASIC token-classification guidance did not flag XRP as a financial product.",
      // EU MiCA hubs — added Apr 2026
      lu: "CSSF: XRP is a crypto-asset under MiCA. CASP licence required. Luxembourg positioned as institutional MiCA hub for XRPL services (e.g., Standard Custody Lux).",
      mt: "MFSA: XRP was a virtual financial asset (VFA) under VFA Act 2018; transitioning to MiCA crypto-asset classification. Trading via VFA-licensed exchanges → MiCA CASP from 2025.",
      lt: "Lietuvos bankas: XRP is a crypto-asset under MiCA (transition from VASP register). Lithuania remains the dominant EU MiCA passporting hub for XRPL projects.",
      ie: "CBI: XRP is a crypto-asset under MiCA. CASP licence required. Coinbase Ireland & Payward Europe (Kraken) operate from Dublin for XRP services to EU users.",
      // Asia / Middle East emerging — added Apr 2026
      id: "Bappebti: XRP is on the approved list (~229 tokens) tradable on PFAK exchanges (Indodax, Tokocrypto, Pintu). Transitioning to OJK supervision in 2025 under UU P2SK.",
      il: "ISA / CMISA: XRP is generally treated as a crypto-asset, not a security under Securities Law 1968. Trading via CMISA-licensed RFSPs (Bits of Gold, Altshuler Shaham Crypto).",
      // Offshore financial centres — added Apr 2026
      ky: "CIMA: XRP is a virtual asset under VASP Act 2020. Common offshore location for XRPL token issuers and institutional funds — Cayman exempted-company structure widely used.",
      vg: "FSC BVI: XRP is a virtual asset under VASP Act 2022. Common offshore foundation / company location for XRPL token issuers (token issuance vehicles, foundation companies).",
      bm: "BMA: XRP is a digital asset under DABA 2018. DABA Class F/M/T licences cover XRP services. Bermuda was an early jurisdiction for institutional crypto custody on XRPL.",
      // Africa + Latam emerging — added Apr 2026 (data limited / framework developing)
      gh: "BoG / SEC Ghana: no formal XRP classification yet — falls under draft VAPA (2024 expected). BoG sandbox is the only formal pilot route. Banking-sector exposure restricted pre-VAPA.",
      cm: "BEAC May-2022 directive prohibits crypto as a means of payment in the CEMAC zone. XRP trading not authorised domestically; activity is offshore P2P only. ANTIC issues public warnings.",
      ar: "CNV: XRP falls under the PSAV registry created by Law 27.739 (March 2024). Trading via PSAV-registered platforms (Lemon Cash, Buenbit, Ripio). BCRA FX controls (cepo cambiario) apply to ARS↔crypto flows.",
      sv: "CNAD: XRP is a digital asset under LEAD (Jan 2023). Pro-crypto stance — PSAD licence covers XRP services (distinct from the BSP Bitcoin-only licence). Whitepaper-based path significantly faster than peer regulators.",
    }
  },
  xrpl_evm_sidechain: {
    summary: "XRPL EVM Sidechain is an EVM-compatible blockchain bridged to XRPL Mainnet. It allows Solidity smart contracts to run while using XRP as gas.",
    regulatory_treatment: "Same regulatory treatment as EVM-based chains (Ethereum, Polygon). Bridge introduces additional consideration: bridged XRP is wrapped (eXRP) \u2014 custody of bridge = IOU/gateway model on XRPL side.",
    bridge_note: "Bridge between XRPL Mainnet and EVM Sidechain involves a witness server network. Wrapped XRP (eXRP) on EVM side = IOU-like exposure to bridge operators. Custody analysis required."
  },
  amm_xls30: {
    summary: "Native Automated Market Maker built into XRPL protocol (XLS-30 amendment, live 2024). Provides liquidity pools alongside the existing order book DEX.",
    regulatory_note: "AMM liquidity provision on XRPL: depositing assets into AMM pool may constitute a financial service. EU: front-end DApp routing to AMM likely needs CASP analysis. AMM itself is protocol-native \u2014 no operator.",
    status: "Live (2024)"
  },
  nft_xls20: {
    summary: "Native NFT standard on XRPL (XLS-20, live 2022). Supports minting, burning, transferring, and marketplace trading with built-in royalties.",
    regulatory_note: "Unique 1/1 NFTs excluded from MiCA. Large fungible series risk ART classification. Broker mode enables non-custodial marketplace without CASP.",
    status: "Live (2022)"
  },
  mpt_xls33: {
    summary: "Multi-Purpose Token standard (XLS-33, activated on Mainnet in 2025). Programmable tokens with transfer fees, lock conditions, authorization requirements, and compliance flags natively on XRPL.",
    regulatory_note: "No explicit MiCA category. Could be Utility Token, EMT, or ART depending on use. lsfRequireAuth enables on-chain KYC gating. lsfLocked enables AML holds. Legal qualification critical before launch.",
    status: "Live (2025)"
  },
  rlusd: {
    summary: "RLUSD is Ripple's USD-backed stablecoin issued on both XRPL Mainnet and Ethereum. Launched late 2024. Reference implementation of a regulated stablecoin on XRPL.",
    regulatory_note: "RLUSD qualifies as EMT under MiCA for EU users. Ripple acts as EMT issuer (must be EMI or credit institution). Demonstrates IOU/trust line model for regulated stablecoin issuance on XRPL.",
    status: "Live (2024)"
  },
  payment_channels: {
    summary: "Off-ledger micropayment rails built into XRPL. Enable high-frequency, low-cost payments with final settlement on-ledger.",
    regulatory_note: "No custody \u2014 depositor controls channel. No CASP needed for channel itself. If converting to fiat at exit: CASP transfer service or EMI licence may apply.",
    status: "Live"
  },
  iou_trust_lines: {
    summary: "XRPL's credit layer. Any account can issue tokens (IOUs) against trust lines opened by counterparties. Foundation of stablecoins, RWA, and fiat representation on XRPL.",
    regulatory_note: "Gateway = custodial by definition (holds underlying assets). Requires CASP + potentially EMI (MiCA) for fiat-backed IOUs. freeze and globalFreeze flags provide compliance controls.",
    status: "Live"
  },
  escrow: {
    summary: "XRP locked in Escrow object on-ledger. Released by time condition or cryptographic fulfillment (PREIMAGE-SHA-256). Ripple uses Escrow for 55B XRP lockup.",
    regulatory_note: "No CASP licence \u2014 no third party controls funds. Protocol enforces conditions. Used for vesting, conditional payments, delivery-vs-payment (RWA).",
    status: "Live"
  },
  checks: {
    summary: "On-ledger equivalent of a bank cheque. Sender creates Check; receiver cashes when ready. Funds remain in sender account until cashed (not locked).",
    regulatory_note: "No CASP \u2014 funds remain in sender account until cashed. No third-party custody. Supports XRP and IOU token Checks.",
    status: "Live"
  }
};

export const XRPL_FEATURES = [
  { name: "Native DEX", standard: "Protocol", status: "Live", note: "Front-end may trigger CASP" },
  { name: "AMM", standard: "XLS-30", status: "Live (2024)", note: "Liquidity pools \u2014 CASP analysis for front-end" },
  { name: "NFT", standard: "XLS-20", status: "Live (2022)", note: "Broker mode = non-custodial" },
  { name: "MPT", standard: "XLS-33", status: "Live (2025)", note: "Activated on Mainnet 2025 · no explicit MiCA category — case-by-case" },
  { name: "RLUSD", standard: "\u2014", status: "Live (2024)", note: "EMT reference on XRPL" },
  { name: "Payment Channels", standard: "Protocol", status: "Live", note: "No custody \u2014 no CASP" },
  { name: "Escrow", standard: "Protocol", status: "Live", note: "No custody if time-locked" },
  { name: "IOU / Trust Lines", standard: "Protocol", status: "Live", note: "Gateway = custodial" },
  { name: "Checks", standard: "Protocol", status: "Live", note: "No custody" },
];

/**
 * Upcoming / proposed XRPL protocol amendments tracked for compliance impact.
 * Hand-curated from the public XRPL roadmap as of April 2026. Each entry
 * describes WHAT the amendment changes and WHY a compliance officer cares.
 *
 * Status values: "Proposed" (XLS submitted, not yet on testnet),
 * "Testnet" (running on devnet/testnet, awaiting mainnet activation),
 * "Voting" (validators evaluating mainnet activation).
 */
export const XRPL_UPCOMING_AMENDMENTS = [
  {
    name: "Permissioned Domains",
    standard: "XLS-46",
    status: "Testnet",
    note: "Credential-based gating at protocol level — issuer can define a 'domain' of KYC-verified accounts. On-ledger compliance gating without an off-chain whitelist.",
    complianceImpact: "Native KYC primitive. Reduces reliance on app-layer allowlists. Material for MiCA Art. 75 + Travel Rule scenarios where regulated transfers must be domain-restricted.",
  },
  {
    name: "Lending Protocol",
    standard: "XLS-65",
    status: "Testnet",
    note: "Native single-asset lending pools on XRPL. Borrowers, lenders and a vault primitive — interest rates managed by protocol-level rules.",
    complianceImpact: "Lending = regulated activity in most juri (CASP lending scope under MiCA, MiFID II for tokenised debt). Front-end likely needs licence; protocol-native lending raises decentralised-DeFi questions.",
  },
  {
    name: "Single Asset Vault",
    standard: "XLS-72",
    status: "Proposed",
    note: "Generic vault primitive for tokenised funds, tranches, and structured products. Issuer creates a vault holding one asset type; share tokens issued represent claims.",
    complianceImpact: "Direct enabler for tokenised RWA + tokenised funds. Likely captured by Prospectus Reg. + AIFMD if fund-like. DLT Pilot Regime applicable for security-token venues.",
  },
  {
    name: "Permissioned DEX",
    standard: "XLS-70",
    status: "Proposed",
    note: "DEX order books restricted to participants holding a specific credential (e.g. KYC-verified). Combines XRPL's native order book with Permissioned Domains gating.",
    complianceImpact: "Allows regulated venues (MiFID II MTF / MiCA CASP exchange) to operate a permissioned trading layer on-ledger. Substantial alignment with MiCA Art. 76+.",
  },
  {
    name: "Cross-Chain Bridge",
    standard: "XLS-38d",
    status: "Voting",
    note: "Native protocol bridge primitives (witnesses, claims, attestations) for moving assets between XRPL Mainnet and sidechains (notably the EVM Sidechain).",
    complianceImpact: "Bridged assets = wrapped IOU on the destination chain. Custody analysis needed on both sides. Witness server set may itself qualify as a CASP service depending on architecture.",
  },
];

