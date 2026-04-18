export const XRPL_KNOWLEDGE = {
  xrp_legal_status: {
    summary: "XRP is classified as a utility token in secondary market sales (SEC v. Ripple Labs, July 2023). Programmatic sales on exchanges do not constitute securities transactions. Institutional sales by Ripple Labs to sophisticated investors remain a grey area.",
    jurisdiction_notes: {
      eu: "XRP is a crypto-asset under MiCA. Not classified as EMT or ART. Trading XRP requires CASP licence.",
      us: "Secondary market XRP sales: not securities (July 2023 ruling). Ripple institutional sales: partial securities. Subject to ongoing litigation.",
      sg: "MAS classifies XRP as Digital Payment Token (DPT).",
      uk: "FCA: XRP is an unregulated cryptoasset.",
      uae: "VARA: XRP is a recognized virtual asset. Trading requires VASP licence.",
      hk: "SFC: XRP treated as virtual asset under VATP regime.",
      ch: "FINMA: XRP classified as payment token.",
      li: "FMA: XRP falls under TVTG framework as a token.",
      jp: "FSA/JVCEA: XRP is one of the earliest whitelisted crypto assets in Japan (since 2018). Trading via FSA-registered CAESP exchanges (bitFlyer, Coincheck, SBI VC Trade). 95% cold-storage rule applies.",
      kr: "FSC/KoFIU: XRP is one of the top 3 traded crypto assets in Korea. Trading via VASP-registered exchanges (Upbit, Bithumb, Korbit) with mandatory real-name bank account. 20% capital-gains tax applies from 2027.",
      in: "FIU-IND: XRP is legal to trade via registered exchanges (WazirX, CoinDCX, ZebPay). 30% flat VDA tax + 1% TDS per transaction. No SEC-style classification dispute.",
      br: "BCB: XRP is a crypto-asset under Law 14.478/2022. Trading via BCB-authorised VASPs (Mercado Bitcoin, Foxbit, Binance BR). Drex CBDC pilots explore XRPL-style interoperability.",
      ng: "SEC Nigeria / CBN: XRP is a digital asset under SEC Nigeria DASP framework (2022). Nigeria had one of the highest retail XRP adoption globally pre-2024. Post-Naira-crisis, cross-border flows now dominated by P2P + offshore (UAE, UK).",
      ke: "CMA: XRP is covered by the VASP Act 2025. Trading via licensed VASPs. Ripple-Onafriq partnerships route KES ↔ USD corridors using XRPL ODL. 3% Digital Asset Tax applies.",
      za: "FSCA: XRP is a crypto-asset requiring CASP licence under FAIS Act (Oct 2022 — first African jurisdiction to regulate crypto). Trading via Luno, VALR, AltCoinTrader. SARB evaluates XRPL for cross-border CBDC bridging.",
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
    summary: "Multi-Purpose Token standard (XLS-33, in development 2025). Programmable tokens with transfer fees, lock conditions, authorization requirements, and compliance flags natively on XRPL.",
    regulatory_note: "No explicit MiCA category. Could be Utility Token, EMT, or ART depending on use. lsfRequireAuth enables on-chain KYC gating. lsfLocked enables AML holds. Legal qualification critical before launch.",
    status: "In development (2025)"
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
  { name: "MPT", standard: "XLS-33", status: "In development (2025)", note: "No explicit MiCA category" },
  { name: "RLUSD", standard: "\u2014", status: "Live (2024)", note: "EMT reference on XRPL" },
  { name: "Payment Channels", standard: "Protocol", status: "Live", note: "No custody \u2014 no CASP" },
  { name: "Escrow", standard: "Protocol", status: "Live", note: "No custody if time-locked" },
  { name: "IOU / Trust Lines", standard: "Protocol", status: "Live", note: "Gateway = custodial" },
  { name: "Checks", standard: "Protocol", status: "Live", note: "No custody" },
];
