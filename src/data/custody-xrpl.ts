import type { XRPLCustodyMethod } from '@/types';

export const XRPL_CUSTODY_METHODS: XRPLCustodyMethod[] = [
  {
    id: "single-key",
    name: "Single Key (Master Key)",
    mechanism: "One XRPL account = one key pair. Service or user holds the private key.",
    custodial: "yes",
    euLicence: "CASP Art. 75 MiCA mandatory if service holds key",
    technicalDetails: [
      "AccountSet transaction to configure account",
      "Master key signs all transactions",
      "Can be blackholed (disabled) for immutability",
      "Risk: single point of failure"
    ],
    useCase: "Simple user wallets, individual accounts",
    xrplObjects: ["AccountRoot"]
  },
  {
    id: "regular-key",
    name: "Regular Key Pair",
    mechanism: "Secondary key assigned to account. Master key can be disabled once Regular Key is set.",
    custodial: "grey",
    euLicence: "CASP if service controls Regular Key alone; non-custodial if user retains Master",
    technicalDetails: [
      "SetRegularKey transaction assigns secondary key",
      "Master key can be disabled post-assignment",
      "Allows key rotation without changing XRPL address",
      "Service holds Regular Key, user retains Master Key = shared control"
    ],
    useCase: "Key rotation, separation of responsibilities, institutional accounts",
    xrplObjects: ["AccountRoot.RegularKey"]
  },
  {
    id: "multisig-signerlist",
    name: "Multi-signature (SignerList)",
    mechanism: "Native XRPL M-of-N multisig. Defines N signers with weights, quorum threshold.",
    custodial: "grey",
    euLicence: "Non-custodial if service cannot reach quorum alone. CASP if service holds majority.",
    technicalDetails: [
      "SignerListSet transaction defines signers",
      "Each signer has signerWeight (1\u201365535)",
      "signerQuorum = minimum weight to authorize",
      "Example 2-of-3: user holds 2 keys, service holds 1 \u2192 service cannot act alone",
      "Example 3-of-5: flexible institutional setup",
      "Disable master key after SignerList setup for pure multisig"
    ],
    useCase: "Institutional custody, treasury management, escrow multi-party, exchanges",
    xrplObjects: ["SignerList", "SignerListSet", "MultiSignature"]
  },
  {
    id: "mpc-tss",
    name: "MPC / Threshold Signature Scheme (TSS)",
    mechanism: "Private key never exists in full. Fragmented as shares across parties. Signature computed distributedly.",
    custodial: "grey",
    euLicence: "ESMA/FCA grey zone. Argument for non-custodial if no single party can sign alone. Legal opinion required.",
    technicalDetails: [
      "Not native to XRPL protocol \u2014 implemented at application layer",
      "Key shares distributed: user + service + optional backup",
      "Threshold: t-of-n parties must cooperate to sign",
      "Compatible with XRPL ed25519 and secp256k1 curves",
      "Providers: Fireblocks, Qredo, Silence Laboratories (XRPL-specialist)",
      "Signing occurs off-chain; signed transaction submitted to XRPL as normal"
    ],
    useCase: "Institutional custody, prime brokerage, regulated exchanges",
    xrplObjects: ["Standard XRPL transaction signing"]
  },
  {
    id: "escrow",
    name: "Escrow (Time-locked or Condition-based)",
    mechanism: "XRP locked in Escrow object on-ledger. Released by time condition or cryptographic fulfillment.",
    custodial: "no",
    euLicence: "No CASP licence \u2014 no third party controls funds. Protocol enforces conditions.",
    technicalDetails: [
      "EscrowCreate: lock XRP with FinishAfter (time) and/or Condition (crypto)",
      "EscrowFinish: release after conditions met \u2014 anyone can submit",
      "EscrowCancel: return funds after CancelAfter date",
      "Condition uses PREIMAGE-SHA-256 (crypto hash reveal)",
      "Ripple uses Escrow for 55B XRP lockup (monthly releases)",
      "No counterparty risk \u2014 ledger enforces release"
    ],
    useCase: "Vesting schedules, conditional payments, cross-border settlement, RWA delivery-vs-payment",
    xrplObjects: ["EscrowCreate", "EscrowFinish", "EscrowCancel"]
  },
  {
    id: "payment-channels",
    name: "Payment Channels",
    mechanism: "Off-ledger micropayment channel. Depositor locks XRP on-chain; receiver collects signed claims off-chain.",
    custodial: "no",
    euLicence: "No CASP \u2014 depositor controls channel. No third-party custody.",
    technicalDetails: [
      "PaymentChannelCreate: open channel, lock XRP",
      "PaymentChannelFund: add more XRP to open channel",
      "Sender issues off-chain signed claims (serialized, not broadcast)",
      "Receiver submits PaymentChannelClaim to collect",
      "Channel expires after inactivity or explicit close",
      "Enables streaming payments, pay-per-use APIs, gaming micropayments",
      "Settlement is instant off-chain; only open/close go on-ledger"
    ],
    useCase: "Streaming payments, API monetization, gaming micropayments, IoT payments",
    xrplObjects: ["PaymentChannelCreate", "PaymentChannelFund", "PaymentChannelClaim"]
  },
  {
    id: "checks",
    name: "XRPL Checks",
    mechanism: "On-ledger equivalent of a bank cheque. Sender creates Check; receiver cashes it when ready.",
    custodial: "no",
    euLicence: "No CASP \u2014 funds remain in sender account until cashed. No third-party custody.",
    technicalDetails: [
      "CheckCreate: create Check for specific recipient and amount",
      "CheckCash: recipient cashes (can request exact or up-to amount)",
      "CheckCancel: sender cancels before cashing",
      "Expiry: Expiration field optional",
      "Funds not locked \u2014 sender can spend them, making Check cashable fail",
      "Supports XRP and IOU token Checks"
    ],
    useCase: "Deferred payments, subscriptions, payroll, B2B payment terms",
    xrplObjects: ["CheckCreate", "CheckCash", "CheckCancel"]
  },
  {
    id: "iou-trustlines",
    name: "IOU / Trust Lines (Gateway model)",
    mechanism: "Gateway issues IOU tokens representing off-chain assets. Users hold IOUs as on-ledger claims.",
    custodial: "yes",
    euLicence: "Gateway IS custodial \u2014 holds underlying assets. CASP Art. 75 + potentially EMI (MiCA) for fiat-backed.",
    technicalDetails: [
      "TrustSet: user opens trust line to gateway (max amount)",
      "Payment: gateway issues IOU tokens to user",
      "Gateway controls redemption of underlying assets",
      "rippling: trust lines can chain (A\u2192gateway\u2192B payments)",
      "DefaultRipple, RequireAuth flags for KYC control",
      "freeze: gateway can freeze individual trust lines (compliance)",
      "globalFreeze: gateway can freeze all trust lines (emergency)",
      "RLUSD is reference implementation: Ripple as EMT gateway"
    ],
    useCase: "Stablecoins, fiat on-ramp/off-ramp, RWA tokenisation, RLUSD",
    xrplObjects: ["TrustSet", "Payment", "AccountSet (flags)", "OfferCreate"]
  },
  {
    id: "nft-xls20",
    name: "NFT Custody (XLS-20 standard)",
    mechanism: "Native XRPL NFTs. Owner controls via account key. Broker mode enables non-custodial marketplace.",
    custodial: "no",
    euLicence: "Broker mode = no custody. Direct holding = account key custody rules apply.",
    technicalDetails: [
      "NFTokenMint: create NFT (with TransferFee, URI, flags)",
      "tfTransferable: flag enables secondary market transfers",
      "tfBurnable: issuer can burn token",
      "NFTokenCreateOffer: list for sale (or make offer)",
      "NFTokenAcceptOffer: atomic swap \u2014 no intermediary custody",
      "Broker mode: third party matches buy+sell offers atomically",
      "Broker never holds NFT \u2014 atomic swap on ledger",
      "Royalties via TransferFee (0\u201350%, in units of 1/100,000)"
    ],
    useCase: "NFT marketplace, gaming items, digital collectibles, IP licensing",
    xrplObjects: ["NFTokenMint", "NFTokenBurn", "NFTokenCreateOffer", "NFTokenCancelOffer", "NFTokenAcceptOffer"]
  },
  {
    id: "mpt-xls33",
    name: "MPT \u2014 Multi-Purpose Token (XLS-33)",
    mechanism: "Programmable token standard on XRPL. Supports transfer fees, lock conditions, max supply, compliance flags.",
    custodial: "grey",
    euLicence: "Depends on use. If issuer can lock/freeze: custodial argument. Legal qualification critical. No explicit MiCA category yet.",
    technicalDetails: [
      "MPTokenIssuance: define token (MaximumAmount, TransferFee, flags)",
      "lsfLocked: issuer can lock tokens (compliance/AML hold)",
      "lsfRequireAuth: holder must be authorized by issuer (KYC gating)",
      "lsfCanEscrow, lsfCanTrade, lsfCanTransfer: granular permission flags",
      "MPTokenAuthorize: issuer grants permission to hold/trade",
      "Transfer fee: programmable on every transfer (RWA use case)",
      "Amendment status: in development/voting as of 2025",
      "XRPL EVM Sidechain: bridge MPT to EVM ecosystem possible"
    ],
    useCase: "Programmable stablecoins, RWA with compliance built-in, loyalty points, institutional tokens",
    xrplObjects: ["MPTokenIssuanceCreate", "MPTokenIssuanceDestroy", "MPTokenAuthorize", "MPTokenIssuanceSet"]
  }
];
