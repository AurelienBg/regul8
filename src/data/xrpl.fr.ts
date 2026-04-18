import type { XRPLCustodyMethod } from '@/types';

export const XRPL_KNOWLEDGE_FR = {
  xrp_legal_status: {
    summary: "Le XRP est classé comme utility token pour les ventes sur le marché secondaire (SEC v. Ripple Labs, juillet 2023). Les ventes programmatiques sur les plateformes d'échange ne constituent pas des transactions sur valeurs mobilières. Les ventes institutionnelles de Ripple Labs à des investisseurs avertis demeurent dans une zone grise.",
    jurisdiction_notes: {
      eu: "Le XRP est un crypto-actif au sens de MiCA. Il n'est classé ni comme EMT ni comme ART. La négociation du XRP requiert un agrément CASP.",
      us: "Ventes de XRP sur le marché secondaire : ne sont pas des valeurs mobilières (décision de juillet 2023). Ventes institutionnelles de Ripple : partiellement qualifiées de valeurs mobilières. Contentieux toujours en cours.",
      sg: "La MAS classe le XRP comme Digital Payment Token (DPT).",
      uk: "FCA : le XRP est un cryptoactif non régulé.",
      uae: "VARA : le XRP est un actif virtuel reconnu. La négociation requiert un agrément VASP.",
      hk: "SFC : le XRP est traité comme un actif virtuel dans le cadre du régime VATP.",
      ch: "FINMA : le XRP est classé comme jeton de paiement.",
      li: "FMA : le XRP relève du cadre TVTG en tant que jeton.",
      jp: "FSA/JVCEA : le XRP fait partie des premiers crypto-actifs whitelistés au Japon (depuis 2018). Négociation via les exchanges CAESP enregistrés auprès de la FSA (bitFlyer, Coincheck, SBI VC Trade). Règle des 95 % en cold storage applicable.",
      kr: "FSC/KoFIU : le XRP est parmi les 3 crypto-actifs les plus tradés en Corée. Négociation via les exchanges enregistrés VASP (Upbit, Bithumb, Korbit) avec compte bancaire nominatif obligatoire. Taxe de 20 % sur les plus-values à partir de 2027.",
      in: "FIU-IND : le XRP est légalement négociable via les exchanges enregistrés (WazirX, CoinDCX, ZebPay). Taxe VDA forfaitaire de 30 % + 1 % de TDS par transaction. Pas de contentieux de classification à la SEC.",
      br: "BCB : le XRP est un crypto-actif au sens de la loi 14.478/2022. Négociation via les VASP autorisés par la BCB (Mercado Bitcoin, Foxbit, Binance BR). Les pilotes CBDC Drex explorent une interopérabilité de type XRPL.",
      ng: "SEC Nigeria / CBN : le XRP est un actif numérique dans le cadre DASP de la SEC Nigeria (2022). Le Nigéria avait l'une des plus fortes adoptions retail du XRP au monde avant 2024. Depuis la crise du Naira, les flux transfrontaliers passent majoritairement par P2P + offshore (UAE, UK).",
      ke: "CMA : le XRP est couvert par le VASP Act 2025. Négociation via les VASP licenciés. Les partenariats Ripple–Onafriq utilisent les corridors KES ↔ USD via l'ODL XRPL. Taxe sur les actifs numériques de 3 % applicable.",
      za: "FSCA : le XRP est un crypto-actif nécessitant un agrément CASP dans le cadre du FAIS Act (oct. 2022 — première juridiction africaine à réguler la crypto). Négociation via Luno, VALR, AltCoinTrader. La SARB étudie XRPL pour le bridging CBDC transfrontalier.",
    }
  },
  xrpl_evm_sidechain: {
    summary: "La XRPL EVM Sidechain est une blockchain compatible EVM reliée au XRPL Mainnet via un pont. Elle permet l'exécution de smart contracts Solidity tout en utilisant le XRP comme gas.",
    regulatory_treatment: "Même traitement réglementaire que les chaînes basées sur EVM (Ethereum, Polygon). Le pont introduit une considération supplémentaire : le XRP ponté est wrappé (eXRP) — la conservation du pont = modèle IOU/gateway côté XRPL.",
    bridge_note: "Le pont entre le XRPL Mainnet et l'EVM Sidechain repose sur un réseau de serveurs témoins (witness servers). Le XRP wrappé (eXRP) côté EVM = exposition de type IOU aux opérateurs du pont. Une analyse de conservation est requise."
  },
  amm_xls30: {
    summary: "Automated Market Maker natif intégré au protocole XRPL (amendement XLS-30, en production depuis 2024). Fournit des pools de liquidité en complément du carnet d'ordres DEX existant.",
    regulatory_note: "Fourniture de liquidité à un AMM sur XRPL : le dépôt d'actifs dans un pool AMM peut constituer un service financier. UE : un front-end DApp routant vers l'AMM nécessite probablement une analyse CASP. L'AMM lui-même est natif au protocole — aucun opérateur.",
    status: "En production (2024)"
  },
  nft_xls20: {
    summary: "Standard NFT natif sur XRPL (XLS-20, en production depuis 2022). Prend en charge la frappe (mint), la destruction (burn), le transfert et la négociation sur place de marché avec royalties intégrées.",
    regulatory_note: "Les NFT uniques 1/1 sont exclus du champ de MiCA. Les grandes séries fongibles risquent une qualification ART. Le mode broker permet une place de marché non custodiale sans CASP.",
    status: "En production (2022)"
  },
  mpt_xls33: {
    summary: "Standard Multi-Purpose Token (XLS-33, en développement en 2025). Jetons programmables avec frais de transfert, conditions de verrouillage, exigences d'autorisation et flags de conformité nativement sur XRPL.",
    regulatory_note: "Pas de catégorie MiCA explicite. Pourrait être Utility Token, EMT ou ART selon l'usage. lsfRequireAuth permet un filtrage KYC on-chain. lsfLocked permet des gels AML. Une qualification juridique est essentielle avant le lancement.",
    status: "En développement (2025)"
  },
  rlusd: {
    summary: "RLUSD est le stablecoin adossé au dollar américain émis par Ripple à la fois sur le XRPL Mainnet et Ethereum. Lancé fin 2024. Implémentation de référence d'un stablecoin régulé sur XRPL.",
    regulatory_note: "RLUSD se qualifie comme EMT au sens de MiCA pour les utilisateurs de l'UE. Ripple agit comme émetteur d'EMT (doit être EME ou établissement de crédit). Démontre le modèle IOU/trust line pour l'émission de stablecoin régulé sur XRPL.",
    status: "En production (2024)"
  },
  payment_channels: {
    summary: "Rails de micropaiements hors registre intégrés au XRPL. Permettent des paiements à haute fréquence et faible coût avec règlement final sur le registre.",
    regulatory_note: "Pas de conservation — le déposant contrôle le canal. Pas de CASP requis pour le canal lui-même. En cas de conversion en monnaie fiduciaire à la sortie : un service de transfert CASP ou un agrément EME peut s'appliquer.",
    status: "En production"
  },
  iou_trust_lines: {
    summary: "Couche de crédit du XRPL. Tout compte peut émettre des jetons (IOU) adossés à des trust lines ouvertes par les contreparties. Fondement des stablecoins, des RWA et de la représentation fiduciaire sur XRPL.",
    regulatory_note: "Gateway = custodial par définition (détient les actifs sous-jacents). Requiert un CASP + potentiellement un agrément EME (MiCA) pour les IOU adossés à du fiat. Les flags freeze et globalFreeze fournissent des contrôles de conformité.",
    status: "En production"
  },
  escrow: {
    summary: "XRP verrouillé dans un objet Escrow sur le registre. Libéré par condition temporelle ou exécution cryptographique (PREIMAGE-SHA-256). Ripple utilise l'Escrow pour le verrouillage de 55 milliards de XRP.",
    regulatory_note: "Pas d'agrément CASP — aucun tiers ne contrôle les fonds. Le protocole applique les conditions. Utilisé pour le vesting, les paiements conditionnels, la livraison contre paiement (RWA).",
    status: "En production"
  },
  checks: {
    summary: "Équivalent on-ledger d'un chèque bancaire. L'émetteur crée le Check ; le bénéficiaire l'encaisse quand il le souhaite. Les fonds restent sur le compte de l'émetteur jusqu'à l'encaissement (non verrouillés).",
    regulatory_note: "Pas de CASP — les fonds restent sur le compte de l'émetteur jusqu'à l'encaissement. Pas de conservation par un tiers. Prend en charge les Checks en XRP et en jetons IOU.",
    status: "En production"
  }
};

export const XRPL_FEATURES_FR = [
  { name: "DEX natif", standard: "Protocole", status: "En production", note: "Le front-end peut déclencher un CASP" },
  { name: "AMM", standard: "XLS-30", status: "En production (2024)", note: "Pools de liquidité — analyse CASP pour le front-end" },
  { name: "NFT", standard: "XLS-20", status: "En production (2022)", note: "Mode broker = non custodial" },
  { name: "MPT", standard: "XLS-33", status: "En développement (2025)", note: "Pas de catégorie MiCA explicite" },
  { name: "RLUSD", standard: "—", status: "En production (2024)", note: "EMT de référence sur XRPL" },
  { name: "Payment Channels", standard: "Protocole", status: "En production", note: "Pas de conservation — pas de CASP" },
  { name: "Escrow", standard: "Protocole", status: "En production", note: "Pas de conservation si verrouillé dans le temps" },
  { name: "IOU / Trust Lines", standard: "Protocole", status: "En production", note: "Gateway = custodial" },
  { name: "Checks", standard: "Protocole", status: "En production", note: "Pas de conservation" },
];

export const XRPL_CUSTODY_METHODS_FR: XRPLCustodyMethod[] = [
  {
    id: "single-key",
    name: "Clé unique (Master Key)",
    mechanism: "Un compte XRPL = une paire de clés. Le service ou l'utilisateur détient la clé privée.",
    custodial: "yes",
    euLicence: "CASP Art. 75 MiCA obligatoire si le service détient la clé",
    technicalDetails: [
      "Transaction AccountSet pour configurer le compte",
      "La clé maître signe toutes les transactions",
      "Peut être blackholed (désactivée) pour l'immuabilité",
      "Risque : point de défaillance unique"
    ],
    useCase: "Portefeuilles utilisateurs simples, comptes individuels",
    xrplObjects: ["AccountRoot"]
  },
  {
    id: "regular-key",
    name: "Paire de clés régulière (Regular Key)",
    mechanism: "Clé secondaire attribuée au compte. La clé maître peut être désactivée une fois la Regular Key définie.",
    custodial: "grey",
    euLicence: "CASP si le service contrôle seul la Regular Key ; non custodial si l'utilisateur conserve la Master Key",
    technicalDetails: [
      "La transaction SetRegularKey attribue une clé secondaire",
      "La clé maître peut être désactivée après attribution",
      "Permet la rotation des clés sans changer l'adresse XRPL",
      "Le service détient la Regular Key, l'utilisateur conserve la Master Key = contrôle partagé"
    ],
    useCase: "Rotation de clés, séparation des responsabilités, comptes institutionnels",
    xrplObjects: ["AccountRoot.RegularKey"]
  },
  {
    id: "multisig-signerlist",
    name: "Multi-signature (SignerList)",
    mechanism: "Multisignature M-parmi-N native au XRPL. Définit N signataires avec poids et seuil de quorum.",
    custodial: "grey",
    euLicence: "Non custodial si le service ne peut pas atteindre le quorum seul. CASP si le service détient la majorité.",
    technicalDetails: [
      "La transaction SignerListSet définit les signataires",
      "Chaque signataire a un signerWeight (1 à 65535)",
      "signerQuorum = poids minimal pour autoriser",
      "Exemple 2-parmi-3 : l'utilisateur détient 2 clés, le service 1 → le service ne peut pas agir seul",
      "Exemple 3-parmi-5 : configuration institutionnelle flexible",
      "Désactiver la clé maître après la configuration du SignerList pour une multisig pure"
    ],
    useCase: "Conservation institutionnelle, gestion de trésorerie, escrow multi-parties, plateformes d'échange",
    xrplObjects: ["SignerList", "SignerListSet", "MultiSignature"]
  },
  {
    id: "mpc-tss",
    name: "MPC / Threshold Signature Scheme (TSS)",
    mechanism: "La clé privée n'existe jamais entièrement. Elle est fragmentée en parts réparties entre les parties. La signature est calculée de manière distribuée.",
    custodial: "grey",
    euLicence: "Zone grise ESMA/FCA. Argument de non-conservation si aucune partie seule ne peut signer. Un avis juridique est requis.",
    technicalDetails: [
      "Non natif au protocole XRPL — implémenté au niveau applicatif",
      "Parts de clé réparties : utilisateur + service + backup optionnel",
      "Seuil : t parmi n parties doivent coopérer pour signer",
      "Compatible avec les courbes ed25519 et secp256k1 du XRPL",
      "Fournisseurs : Fireblocks, Qredo, Silence Laboratories (spécialiste XRPL)",
      "La signature s'effectue hors chaîne ; la transaction signée est soumise au XRPL normalement"
    ],
    useCase: "Conservation institutionnelle, prime brokerage, plateformes d'échange régulées",
    xrplObjects: ["Standard XRPL transaction signing"]
  },
  {
    id: "escrow",
    name: "Escrow (verrouillage temporel ou conditionnel)",
    mechanism: "XRP verrouillé dans un objet Escrow sur le registre. Libéré par condition temporelle ou exécution cryptographique.",
    custodial: "no",
    euLicence: "Pas d'agrément CASP — aucun tiers ne contrôle les fonds. Le protocole applique les conditions.",
    technicalDetails: [
      "EscrowCreate : verrouille du XRP avec FinishAfter (temps) et/ou Condition (cryptographique)",
      "EscrowFinish : libération après satisfaction des conditions — n'importe qui peut soumettre",
      "EscrowCancel : restitution des fonds après la date CancelAfter",
      "Condition basée sur PREIMAGE-SHA-256 (révélation de hash cryptographique)",
      "Ripple utilise l'Escrow pour verrouiller 55 milliards de XRP (libérations mensuelles)",
      "Pas de risque de contrepartie — le registre applique la libération"
    ],
    useCase: "Calendriers de vesting, paiements conditionnels, règlement transfrontalier, livraison contre paiement RWA",
    xrplObjects: ["EscrowCreate", "EscrowFinish", "EscrowCancel"]
  },
  {
    id: "payment-channels",
    name: "Payment Channels",
    mechanism: "Canal de micropaiement hors registre. Le déposant verrouille du XRP on-chain ; le bénéficiaire collecte des claims signés hors chaîne.",
    custodial: "no",
    euLicence: "Pas de CASP — le déposant contrôle le canal. Pas de conservation par un tiers.",
    technicalDetails: [
      "PaymentChannelCreate : ouvre le canal, verrouille du XRP",
      "PaymentChannelFund : ajoute du XRP à un canal ouvert",
      "L'expéditeur émet des claims signés hors chaîne (sérialisés, non diffusés)",
      "Le bénéficiaire soumet PaymentChannelClaim pour encaisser",
      "Le canal expire après inactivité ou fermeture explicite",
      "Permet paiements en streaming, API pay-per-use, micropaiements gaming",
      "Règlement instantané hors chaîne ; seules l'ouverture et la fermeture vont on-ledger"
    ],
    useCase: "Paiements en streaming, monétisation d'API, micropaiements gaming, paiements IoT",
    xrplObjects: ["PaymentChannelCreate", "PaymentChannelFund", "PaymentChannelClaim"]
  },
  {
    id: "checks",
    name: "XRPL Checks",
    mechanism: "Équivalent on-ledger d'un chèque bancaire. L'émetteur crée le Check ; le bénéficiaire l'encaisse quand il le souhaite.",
    custodial: "no",
    euLicence: "Pas de CASP — les fonds restent sur le compte de l'émetteur jusqu'à l'encaissement. Pas de conservation par un tiers.",
    technicalDetails: [
      "CheckCreate : crée un Check pour un bénéficiaire et un montant spécifiques",
      "CheckCash : le bénéficiaire encaisse (peut demander un montant exact ou plafonné)",
      "CheckCancel : l'émetteur annule avant l'encaissement",
      "Expiration : champ Expiration optionnel",
      "Fonds non verrouillés — l'émetteur peut les dépenser, rendant l'encaissement impossible",
      "Prend en charge les Checks en XRP et en jetons IOU"
    ],
    useCase: "Paiements différés, abonnements, paie, conditions de paiement B2B",
    xrplObjects: ["CheckCreate", "CheckCash", "CheckCancel"]
  },
  {
    id: "iou-trustlines",
    name: "IOU / Trust Lines (modèle Gateway)",
    mechanism: "La gateway émet des jetons IOU représentant des actifs hors chaîne. Les utilisateurs détiennent les IOU comme des créances on-ledger.",
    custodial: "yes",
    euLicence: "La gateway EST custodiale — elle détient les actifs sous-jacents. CASP Art. 75 + potentiellement EME (MiCA) pour les IOU adossés à du fiat.",
    technicalDetails: [
      "TrustSet : l'utilisateur ouvre une trust line vers la gateway (montant maximal)",
      "Payment : la gateway émet des jetons IOU à l'utilisateur",
      "La gateway contrôle le rachat des actifs sous-jacents",
      "rippling : les trust lines peuvent s'enchaîner (paiements A→gateway→B)",
      "Flags DefaultRipple, RequireAuth pour le contrôle KYC",
      "freeze : la gateway peut geler des trust lines individuelles (conformité)",
      "globalFreeze : la gateway peut geler toutes les trust lines (urgence)",
      "RLUSD est l'implémentation de référence : Ripple comme gateway EMT"
    ],
    useCase: "Stablecoins, rampe d'entrée/sortie fiat, tokenisation RWA, RLUSD",
    xrplObjects: ["TrustSet", "Payment", "AccountSet (flags)", "OfferCreate"]
  },
  {
    id: "nft-xls20",
    name: "Conservation NFT (standard XLS-20)",
    mechanism: "NFT natifs XRPL. Le propriétaire contrôle via la clé du compte. Le mode broker permet une place de marché non custodiale.",
    custodial: "no",
    euLicence: "Mode broker = pas de conservation. Détention directe = les règles de conservation des clés de compte s'appliquent.",
    technicalDetails: [
      "NFTokenMint : crée un NFT (avec TransferFee, URI, flags)",
      "tfTransferable : le flag autorise les transferts sur le marché secondaire",
      "tfBurnable : l'émetteur peut détruire le jeton",
      "NFTokenCreateOffer : mise en vente (ou proposition d'achat)",
      "NFTokenAcceptOffer : échange atomique — pas de conservation intermédiaire",
      "Mode broker : un tiers apparie offres d'achat et de vente de manière atomique",
      "Le broker ne détient jamais le NFT — échange atomique sur le registre",
      "Royalties via TransferFee (0 à 50 %, en unités de 1/100 000)"
    ],
    useCase: "Places de marché NFT, objets de jeu, collectibles numériques, licences de PI",
    xrplObjects: ["NFTokenMint", "NFTokenBurn", "NFTokenCreateOffer", "NFTokenCancelOffer", "NFTokenAcceptOffer"]
  },
  {
    id: "mpt-xls33",
    name: "MPT — Multi-Purpose Token (XLS-33)",
    mechanism: "Standard de jeton programmable sur XRPL. Prend en charge les frais de transfert, conditions de verrouillage, offre maximale et flags de conformité.",
    custodial: "grey",
    euLicence: "Dépend de l'usage. Si l'émetteur peut verrouiller/geler : argument en faveur du custodial. Qualification juridique essentielle. Pas encore de catégorie MiCA explicite.",
    technicalDetails: [
      "MPTokenIssuance : définit le jeton (MaximumAmount, TransferFee, flags)",
      "lsfLocked : l'émetteur peut verrouiller les jetons (gel de conformité/AML)",
      "lsfRequireAuth : le détenteur doit être autorisé par l'émetteur (filtrage KYC)",
      "lsfCanEscrow, lsfCanTrade, lsfCanTransfer : flags de permission granulaires",
      "MPTokenAuthorize : l'émetteur accorde la permission de détenir/négocier",
      "Frais de transfert : programmables à chaque transfert (cas d'usage RWA)",
      "Statut de l'amendement : en développement/vote en 2025",
      "XRPL EVM Sidechain : pontage MPT vers l'écosystème EVM possible"
    ],
    useCase: "Stablecoins programmables, RWA avec conformité intégrée, points de fidélité, jetons institutionnels",
    xrplObjects: ["MPTokenIssuanceCreate", "MPTokenIssuanceDestroy", "MPTokenAuthorize", "MPTokenIssuanceSet"]
  }
];
