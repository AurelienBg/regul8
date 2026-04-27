import type { XRPLCustodyMethod } from '@/types';

export const XRPL_KNOWLEDGE_FR = {
  xrp_legal_status: {
    summary: "Le XRP est classé comme utility token pour les ventes sur le marché secondaire (SEC v. Ripple Labs, juillet 2023). Les ventes programmatiques sur les plateformes d'échange ne constituent pas des transactions sur valeurs mobilières. Les ventes institutionnelles de Ripple Labs à des investisseurs avertis demeurent dans une zone grise.",
    jurisdiction_notes: {
      eu: "ESMA + autorités nationales compétentes : le XRP est un crypto-actif au sens de MiCA — ni EMT ni ART. Les plateformes servant des utilisateurs UE doivent détenir un agrément CASP (Titre V, Art. 59+). Pas de whitepaper requis pour le XRP lui-même (exemption actif déjà tradé Art. 4(2)) mais les CASP doivent publier un résumé du crypto-actif. RLUSD sur XRPL est le pendant EMT associé.",
      us: "Ventes de XRP sur le marché secondaire (exchanges) : ne sont pas des valeurs mobilières (SDNY, juge Torres, juillet 2023). Ventes institutionnelles directes de Ripple à des investisseurs avertis : contrats d'investissement soumis aux lois sur les valeurs mobilières. Règlement août 2024 (pénalité civile $125M). Le XRP n'est pas en soi une valeur mobilière — seules certaines transactions peuvent l'être. La CFTC traite le XRP comme une digital commodity pour les dérivés.",
      sg: "MAS : le XRP est un Digital Payment Token (DPT) au sens du Payment Services Act 2019. Les plateformes de trading doivent détenir un MPI (au-dessus du seuil de volume) ou un SPI. Restrictions sur la publicité DPT auprès du retail (lignes directrices janv. 2022). Singapour est le HQ XRPL régional — le SVP APAC de Ripple y est basé.",
      uk: "FCA : le XRP est un cryptoactif non régulé pour l'instant (régime des financial promotions applicable depuis oct. 2023). Les sociétés cryptoactifs doivent détenir un Cryptoasset registration (scope AML uniquement). Le futur cadre (consultation Stablecoin + Cryptoasset RAO 2024) intégrera la négociation du XRP dans une activité régulée. Travel Rule applicable depuis sept. 2023.",
      uae: "VARA (Dubaï) : le XRP est un actif virtuel reconnu ; négociation soumise à un agrément VASP (catégories VA Exchange / Broker / Custody). FSRA ADGM : régulation distincte sous le Crypto Asset framework — Ripple détient un agrément DFSA (mars 2024) pour le DIFC, première grande firme crypto à l'obtenir. Dubaï est l'ancrage du build-out MENA de Ripple.",
      hk: "SFC : le XRP est un actif virtuel sous le régime VATP (en vigueur juin 2023). Les VATP licenciés (HashKey, OSL) peuvent offrir le XRP au retail sous réserve de suitability + assurance + 98 % en cold storage. La HKMA couvre la partie stablecoin (Stablecoins Ordinance, 2024). HK a rouvert aux exchanges retail en faisant un hub Asie clé pour les services XRPL.",
      ch: "FINMA : le XRP est un jeton de paiement (FINMA ICO Guidelines, fév. 2018) — hors scope de la Securities Act. La négociation n'exige pas de licence valeurs mobilières ; l'enregistrement AMLA (membership SRO) couvre l'AML. Le DLT Act (en vigueur août 2021) fournit le cadre pour la RWA tokenisée sur XRPL via SIX Digital Exchange. La Suisse héberge la société de droit suisse Ripple Markets AG.",
      li: "FMA : le XRP relève du cadre TVTG (Token Container Model) comme jeton de paiement. Les licences TVTG Token Issuer / Service Provider couvrent l'ensemble des services XRPL ; le passporting EEE fait de fait du Liechtenstein la voie la plus rapide d'accès au marché UE (3–9 mois) avant un onboarding MiCA-CASP.",
      jp: "FSA/JVCEA : le XRP fait partie des premiers crypto-actifs whitelistés au Japon (depuis 2018). Négociation via les exchanges CAESP enregistrés auprès de la FSA (bitFlyer, Coincheck, SBI VC Trade). Règle des 95 % en cold storage applicable.",
      kr: "FSC/KoFIU : le XRP est parmi les 3 crypto-actifs les plus tradés en Corée. Négociation via les exchanges enregistrés VASP (Upbit, Bithumb, Korbit) avec compte bancaire nominatif obligatoire. Taxe de 20 % sur les plus-values à partir de 2027.",
      in: "FIU-IND : le XRP est légalement négociable via les exchanges enregistrés (WazirX, CoinDCX, ZebPay). Taxe VDA forfaitaire de 30 % + 1 % de TDS par transaction. Pas de contentieux de classification à la SEC.",
      br: "BCB : le XRP est un crypto-actif au sens de la loi 14.478/2022. Négociation via les VASP autorisés par la BCB (Mercado Bitcoin, Foxbit, Binance BR). Les pilotes CBDC Drex explorent une interopérabilité de type XRPL.",
      ng: "SEC Nigeria / CBN : le XRP est un actif numérique dans le cadre DASP de la SEC Nigeria (2022). Le Nigéria avait l'une des plus fortes adoptions retail du XRP au monde avant 2024. Depuis la crise du Naira, les flux transfrontaliers passent majoritairement par P2P + offshore (UAE, UK).",
      ke: "CMA : le XRP est couvert par le VASP Act 2025. Négociation via les VASP licenciés. Les partenariats Ripple–Onafriq utilisent les corridors KES ↔ USD via l'ODL XRPL. Taxe sur les actifs numériques de 3 % applicable.",
      za: "FSCA : le XRP est un crypto-actif nécessitant un agrément CASP dans le cadre du FAIS Act (oct. 2022 — première juridiction africaine à réguler la crypto). Négociation via Luno, VALR, AltCoinTrader. La SARB étudie XRPL pour le bridging CBDC transfrontalier.",
      // Marchés établis — ajouté avril 2026
      ca: "CSA / IIROC : le XRP est un crypto-actif, négocié sur les plateformes signataires du Pre-Registration Undertaking de la CSA (Bitbuy, Newton, NDAX, Coinbase Canada). Pas de qualification de valeur mobilière au niveau fédéral ; les commissions provinciales évaluent au cas par cas.",
      au: "ASIC / AUSTRAC : le XRP est un actif numérique, négocié via les DCE enregistrés AUSTRAC (Independent Reserve, BTC Markets, Swyftx). Les orientations 2024 de l'ASIC sur la classification des tokens n'ont pas qualifié le XRP de produit financier.",
      // Hubs MiCA UE — ajouté avril 2026
      lu: "CSSF : le XRP est un crypto-actif au sens de MiCA. Agrément CASP requis. Le Luxembourg se positionne comme hub MiCA institutionnel pour les services XRPL (ex. Standard Custody Lux).",
      mt: "MFSA : le XRP était un virtual financial asset (VFA) sous le VFA Act 2018 ; transition vers la classification crypto-actif MiCA. Négociation via les exchanges agréés VFA → CASP MiCA à partir de 2025.",
      lt: "Lietuvos bankas : le XRP est un crypto-actif au sens de MiCA (transition depuis le registre VASP). La Lituanie reste le hub UE dominant pour le passporting MiCA des projets XRPL.",
      ie: "CBI : le XRP est un crypto-actif au sens de MiCA. Agrément CASP requis. Coinbase Ireland et Payward Europe (Kraken) opèrent depuis Dublin pour les services XRP aux utilisateurs UE.",
      // Asie / Moyen-Orient émergents — ajouté avril 2026
      id: "Bappebti : le XRP figure sur la liste approuvée (~229 tokens) négociable sur les exchanges PFAK (Indodax, Tokocrypto, Pintu). Transition vers la supervision OJK en 2025 sous la UU P2SK.",
      il: "ISA / CMISA : le XRP est généralement traité comme un crypto-actif, pas comme une valeur mobilière sous la Securities Law 1968. Négociation via les RFSP agréés CMISA (Bits of Gold, Altshuler Shaham Crypto).",
      // Centres financiers offshore — ajouté avril 2026
      ky: "CIMA : le XRP est un actif virtuel sous le VASP Act 2020. Localisation offshore courante pour les émetteurs de tokens XRPL et les fonds institutionnels — la structure exempted-company de Cayman est largement utilisée.",
      vg: "FSC BVI : le XRP est un actif virtuel sous le VASP Act 2022. Localisation offshore courante de foundation / company pour les émetteurs de tokens XRPL (véhicules d'émission, foundation companies).",
      bm: "BMA : le XRP est un actif numérique sous DABA 2018. Les licences DABA Class F/M/T couvrent les services XRP. Les Bermudes ont été une juridiction pionnière pour la custody crypto institutionnelle sur XRPL.",
      // Afrique + Amérique latine émergents — ajouté avril 2026 (data limitée / cadre en cours)
      gh: "BoG / SEC Ghana : pas encore de classification formelle du XRP — relève du VAPA en projet (attendu 2024). Le sandbox BoG est la seule voie de pilote formelle. Exposition bancaire restreinte avant VAPA.",
      cm: "La directive BEAC de mai 2022 prohibe la crypto comme moyen de paiement dans la zone CEMAC. La négociation du XRP n'est pas autorisée localement ; l'activité passe uniquement par P2P offshore. L'ANTIC émet des mises en garde publiques.",
      ar: "CNV : le XRP relève du registre PSAV créé par la loi 27.739 (mars 2024). Négociation via les plateformes enregistrées PSAV (Lemon Cash, Buenbit, Ripio). Les contrôles BCRA (cepo cambiario) s'appliquent aux flux ARS↔crypto.",
      sv: "CNAD : le XRP est un actif numérique sous LEAD (janv. 2023). Posture pro-crypto — la licence PSAD couvre les services XRP (distincte de la licence BSP Bitcoin uniquement). Voie basée sur whitepaper significativement plus rapide que les régulateurs comparables.",
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
    summary: "Standard Multi-Purpose Token (XLS-33, activé sur Mainnet en 2025). Jetons programmables avec frais de transfert, conditions de verrouillage, exigences d'autorisation et flags de conformité nativement sur XRPL.",
    regulatory_note: "Pas de catégorie MiCA explicite. Pourrait être Utility Token, EMT ou ART selon l'usage. lsfRequireAuth permet un filtrage KYC on-chain. lsfLocked permet des gels AML. Une qualification juridique est essentielle avant le lancement.",
    status: "En production (2025)"
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
  { name: "MPT", standard: "XLS-33", status: "En production (2025)", note: "Activé sur Mainnet en 2025 · pas de catégorie MiCA explicite — au cas par cas" },
  { name: "RLUSD", standard: "—", status: "En production (2024)", note: "EMT de référence sur XRPL" },
  { name: "Payment Channels", standard: "Protocole", status: "En production", note: "Pas de conservation — pas de CASP" },
  { name: "Escrow", standard: "Protocole", status: "En production", note: "Pas de conservation si verrouillé dans le temps" },
  { name: "IOU / Trust Lines", standard: "Protocole", status: "En production", note: "Gateway = custodial" },
  { name: "Checks", standard: "Protocole", status: "En production", note: "Pas de conservation" },
];

/**
 * Amendments XRPL à venir / proposés, suivis pour leur impact compliance.
 * Sélection à jour de la roadmap publique XRPL — avril 2026. Chaque entrée
 * décrit CE QUE l'amendment change et POURQUOI un compliance officer s'y
 * intéresse.
 *
 * Statuts : "Proposé" (XLS soumis, pas encore sur testnet),
 * "Testnet" (en exécution sur devnet/testnet, en attente d'activation mainnet),
 * "Vote" (les validateurs évaluent l'activation mainnet).
 */
export const XRPL_UPCOMING_AMENDMENTS_FR = [
  {
    name: "Permissioned Domains",
    standard: "XLS-46",
    status: "Testnet",
    note: "Filtrage credential-based au niveau protocole — l'émetteur définit un 'domaine' de comptes KYC-vérifiés. Filtrage de conformité on-ledger sans whitelist off-chain.",
    complianceImpact: "Primitive KYC native. Réduit la dépendance aux allowlists applicatives. Important pour les scénarios MiCA Art. 75 + Travel Rule où les transferts régulés doivent être restreints à un domaine.",
  },
  {
    name: "Lending Protocol",
    standard: "XLS-65",
    status: "Testnet",
    note: "Pools de prêt single-asset natifs sur XRPL. Emprunteurs, prêteurs et primitive vault — taux d'intérêt gérés par règles protocolaires.",
    complianceImpact: "Le lending = activité régulée dans la plupart des juri (scope CASP lending sous MiCA, MiFID II pour la dette tokenisée). Le front-end nécessite probablement une licence ; le lending protocol-natif soulève des questions DeFi décentralisée.",
  },
  {
    name: "Single Asset Vault",
    standard: "XLS-72",
    status: "Proposé",
    note: "Primitive vault générique pour fonds tokenisés, tranches, et produits structurés. L'émetteur crée un vault détenant un seul type d'actif ; les share tokens émis représentent les droits.",
    complianceImpact: "Levier direct pour la RWA tokenisée + les fonds tokenisés. Probablement capturé par le Prospectus Reg. + AIFMD si fund-like. DLT Pilot Regime applicable pour les venues de security tokens.",
  },
  {
    name: "Permissioned DEX",
    standard: "XLS-70",
    status: "Proposé",
    note: "Carnets d'ordres DEX restreints aux participants détenant un credential spécifique (ex. KYC-vérifié). Combine le carnet d'ordres natif XRPL avec le gating des Permissioned Domains.",
    complianceImpact: "Permet aux venues régulées (MTF MiFID II / exchange CASP MiCA) d'opérer une couche de trading permissionnée on-ledger. Alignement substantiel avec MiCA Art. 76+.",
  },
  {
    name: "Cross-Chain Bridge",
    standard: "XLS-38d",
    status: "Vote",
    note: "Primitives de bridge protocolaires (witnesses, claims, attestations) pour déplacer des actifs entre XRPL Mainnet et les sidechains (notamment l'EVM Sidechain).",
    complianceImpact: "Actifs bridgés = IOU wrappé sur la chaîne destination. Analyse custody requise des deux côtés. Le witness server set peut lui-même qualifier comme service CASP selon l'architecture.",
  },
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
