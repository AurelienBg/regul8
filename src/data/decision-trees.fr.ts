import type { DecisionTree } from '@/types'

// -----------------------------------------------------------------------------
// Arbre 1 — Mon token est-il un titre financier ? (Test de Howey)
// -----------------------------------------------------------------------------
export const HOWEY_TREE_FR: DecisionTree = {
  id: 'howey',
  title: 'Mon token est-il un titre financier ?',
  description: 'Parcourez le test de Howey (SEC américaine) — 4 critères cumulatifs qui déterminent si un actif est qualifié de titre financier.',
  icon: '⚖️',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'Y a-t-il un investissement d\'argent (ou autre capital) en échange du token ?',
      hint: 'Inclut la monnaie fiat, les crypto-actifs, les services ou toute forme de contrepartie. Les airdrops attribués sans contribution attendue peuvent ne pas être concernés.',
      choices: [
        { label: 'Oui', next: 'q2' },
        { label: 'Non', next: 'out-not-security-1' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Les fonds sont-ils mutualisés dans une entreprise commune (sort partagé entre investisseurs ou lié au succès du promoteur) ?',
      hint: 'Les juges examinent la commonalité horizontale (investisseurs mutualisés) ou verticale (sort de l\'investisseur lié au promoteur).',
      choices: [
        { label: 'Oui', next: 'q3' },
        { label: 'Non', next: 'out-not-security-2' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Les investisseurs ont-ils une attente raisonnable de profit ?',
      hint: 'Le profit inclut l\'appréciation du capital ou les flux de trésorerie (récompenses de staking, rendement, dividendes). Une utilité / consommation pure ≠ attente de profit.',
      choices: [
        { label: 'Oui', next: 'q4' },
        { label: 'Non (utilité pure)', next: 'out-not-security-3' },
      ],
    },
    q4: {
      type: 'question',
      question: 'Les profits proviennent-ils principalement des efforts d\'autrui (équipe, développeurs, promoteurs) ?',
      hint: 'C\'est le critère clé pour la crypto. Si un petit groupe génère la valeur, c\'est probablement un titre financier. Si le protocole est véritablement décentralisé sans équipe identifiable, l\'action de la SEC est moins claire.',
      choices: [
        { label: 'Oui — une équipe génère la valeur', next: 'out-likely-security' },
        { label: 'Non — protocole totalement décentralisé', next: 'out-grey-decentralized' },
        { label: 'Non — efforts propres de l\'utilisateur (ex. minage/gaming actif)', next: 'out-not-security-4' },
      ],
    },
    'out-not-security-1': {
      type: 'outcome',
      verdict: 'no',
      title: 'PROBABLEMENT PAS un titre financier',
      explanation: 'Sans investissement d\'argent, le test de Howey échoue au critère 1. Cela couvre généralement les airdrops purs sans contrepartie ni frais.',
      nextSteps: [
        'Vérifier tout de même les obligations FinCEN MSB si vous facilitez des transferts',
        'Considérer les lois étatiques américaines sur les money transmitters',
        'MiCA s\'applique toujours dans l\'UE — peut être qualifié de Utility Token ou crypto-actif',
      ],
      relatedTerms: ['Howey Test', 'SEC', 'Utility Token'],
    },
    'out-not-security-2': {
      type: 'outcome',
      verdict: 'no',
      title: 'PROBABLEMENT PAS un titre financier',
      explanation: 'Sans entreprise commune, le test de Howey échoue au critère 2. Toutefois, les juges ont retenu une interprétation large de l\'entreprise commune dans de nombreux cas de tokens — c\'est rare en pratique.',
      nextSteps: [
        'Documenter l\'absence de mutualisation pour défendre la position',
        'Examiner la structure avec un avocat en droit des titres financiers',
      ],
      relatedTerms: ['Howey Test', 'SEC'],
    },
    'out-not-security-3': {
      type: 'outcome',
      verdict: 'no',
      title: 'PROBABLEMENT PAS un titre financier — utilité pure',
      explanation: 'Si les acheteurs acquièrent le token uniquement pour consommer un service (payer du calcul, accéder à du contenu, etc.), il n\'y a pas d\'attente de profit et le critère 3 de Howey échoue.',
      nextSteps: [
        'Maintenir un marketing strictement fonctionnel — aucune mention d\'appréciation du prix',
        'Prudence sur les marchés secondaires qui peuvent déclencher une requalification',
        'Le régime Utility Token de MiCA s\'applique probablement dans l\'UE (livre blanc + notification à l\'ANC si >1 M€)',
      ],
      relatedTerms: ['Utility Token', 'MiCA', 'Howey Test'],
    },
    'out-not-security-4': {
      type: 'outcome',
      verdict: 'no',
      title: 'PROBABLEMENT PAS un titre financier — valeur générée par l\'utilisateur',
      explanation: 'Si la participation active de l\'utilisateur (ex. gameplay, travail) génère les rendements — et non une équipe centrale — le critère 4 échoue.',
      nextSteps: [
        'Documenter comment l\'effort de l\'utilisateur produit la valeur',
        'Attention : c\'est une exception étroite et la SEC surveille de près GameFi/P2E',
      ],
      relatedTerms: ['Howey Test', 'GameFi'],
    },
    'out-likely-security': {
      type: 'outcome',
      verdict: 'yes',
      title: 'PROBABLEMENT un titre financier selon Howey',
      explanation: 'Les 4 critères sont satisfaits. Aux États-Unis, l\'émission et la négociation nécessiteraient un enregistrement SEC (ou une exemption : Reg D, Reg S, Reg A+). La négociation secondaire sur des plateformes non enregistrées est interdite.',
      nextSteps: [
        'S\'enregistrer auprès de la SEC ou s\'appuyer sur Reg D 506(c) / Reg S / Reg A+',
        'Dans l\'UE : probablement qualifié de valeur mobilière transférable → MiFID II + Règlement Prospectus',
        'Considérer le Régime Pilote DLT (UE) pour les titres financiers tokenisés',
        'XRPL : possibilité de frapper en MPT (XLS-33) avec lsfRequireAuth pour le filtrage de conformité',
      ],
      relatedTerms: ['SEC', 'Reg D', 'Reg S', 'Howey Test', 'MiFID II', 'MPT'],
    },
    'out-grey-decentralized': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'ZONE GRISE — décentralisation suffisante',
      explanation: 'Si le réseau est véritablement décentralisé sans promoteur identifiable générant la valeur (analogie avec SEC v. Ripple pour les ventes secondaires), le token peut échapper à la qualification de titre financier sur les marchés secondaires. Mais les ventes initiales par une équipe fondatrice restent généralement des titres financiers.',
      nextSteps: [
        'Examiner SEC v. Ripple (juillet 2023) — les ventes sur marché secondaire peuvent ne pas être des titres financiers',
        'Lancement par étapes : levée via Reg D/S, puis transition vers le marché ouvert',
        'Documenter les jalons de décentralisation',
        'Opinion juridique essentielle — le droit est encore instable',
      ],
      relatedTerms: ['SEC v. Ripple', 'Howey Test', 'Décentralisation'],
    },
  },
}

// -----------------------------------------------------------------------------
// Arbre 2 — Ai-je besoin d'une licence CASP ? (MiCA)
// -----------------------------------------------------------------------------
export const CASP_TREE_FR: DecisionTree = {
  id: 'casp',
  title: 'Ai-je besoin d\'une licence CASP ?',
  description: 'Déterminez si votre service est couvert par le régime des prestataires de services sur crypto-actifs (CASP) de MiCA dans l\'UE.',
  icon: '🇪🇺',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'Servez-vous des utilisateurs de l\'UE ou ciblez-vous l\'UE (par localisation, langue, domaine ou sollicitation active) ?',
      hint: 'MiCA s\'applique de manière extraterritoriale si vous ciblez activement les utilisateurs de l\'UE. Une disponibilité passive (sans marketing UE) peut y échapper — opinion juridique requise.',
      choices: [
        { label: 'Oui — je sers ou cible des utilisateurs de l\'UE', next: 'q2' },
        { label: 'Non — strictement hors UE', next: 'out-no-casp' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Quel service fournissez-vous ?',
      choices: [
        { label: 'Conservation des crypto-actifs de clients', next: 'out-casp-custody' },
        { label: 'Exploitation d\'une plateforme de négociation / exchange', next: 'out-casp-exchange' },
        { label: 'Échange crypto contre fiat ou crypto contre crypto', next: 'out-casp-exchange' },
        { label: 'Services de transfert pour crypto-actifs', next: 'out-casp-transfer' },
        { label: 'Gestion de portefeuille ou conseil en investissement sur crypto', next: 'out-casp-advice' },
        { label: 'Placement de crypto-actifs (offres de vente, prise ferme)', next: 'out-casp-placement' },
        { label: 'Réception et transmission d\'ordres', next: 'out-casp-rto' },
        { label: 'Aucun de ces services', next: 'q3' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Votre protocole est-il totalement décentralisé, sans opérateur, bénéficiaire ou entité de contrôle identifiable ?',
      hint: 'Test : une seule partie peut-elle mettre à jour, suspendre, geler ou prélever des frais ? Si oui → un opérateur existe → CASP s\'applique. Le Considérant 22 de MiCA exempte la DeFi véritablement permissionless.',
      choices: [
        { label: 'Oui — totalement permissionless, pas d\'opérateur', next: 'out-defi-exempt' },
        { label: 'Non — quelqu\'un contrôle le protocole', next: 'out-grey-operator' },
      ],
    },
    'out-no-casp': {
      type: 'outcome',
      verdict: 'no',
      title: 'Pas de CASP requis — MiCA hors champ',
      explanation: 'Si vous ne servez ni ne ciblez réellement les utilisateurs de l\'UE, MiCA ne s\'applique pas. Mais attention aux règles de sollicitation inversée — un utilisateur UE qui vient à vous de lui-même est admis ; votre marketing vers lui ne l\'est pas.',
      nextSteps: [
        'Documenter votre géofencing / exclusion UE dans les CGU',
        'Éviter tout marketing ciblant l\'UE, publicités en français/allemand/etc.',
        'Vérifier tout de même les régimes locaux (US MSB, UK FCA, Singapour MAS, etc.)',
      ],
      relatedTerms: ['MiCA', 'CASP', 'Sollicitation Inversée'],
    },
    'out-casp-custody': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Oui — CASP Art. 75 (Conservation)',
      explanation: 'Détenir les crypto-actifs des clients ou leurs moyens d\'accès déclenche les obligations de conservation MiCA. Exigence de capital : 350 K€. Obligations strictes de sauvegarde, ségrégation et assurance.',
      nextSteps: [
        'Préparer 350 K€ de fonds propres',
        'Mettre en place la ségrégation des actifs clients + assurance',
        'Concevoir une politique de gestion des clés (split cold/warm, MPC/multisig)',
        'Construire les procédures SAR/STR + conformité à la Travel Rule',
        'Note XRPL : les alternatives non-custodial (Escrow, Payment Channels, SignerList en minorité) peuvent vous exempter — examiner la matrice de conservation',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 75', 'Conservation'],
    },
    'out-casp-exchange': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Oui — CASP Art. 76-78 (Exchange / Plateforme de Négociation)',
      explanation: 'Exploiter une plateforme de négociation ou échanger des crypto contre fiat/crypto nécessite un agrément CASP. Capital : 125 K€ (exchange) ou 150 K€ (plateforme de négociation).',
      nextSteps: [
        'Préparer 125-150 K€ de fonds propres',
        'Construire les règles de carnet d\'ordres, détection d\'abus de marché',
        'Mettre en œuvre la transparence pré-négociation/post-négociation selon MiCA',
        'Intégrer KYC/KYB complet + Travel Rule FATF (>1 K€)',
      ],
      relatedTerms: ['CASP', 'MiCA', 'Travel Rule'],
    },
    'out-casp-transfer': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Oui — CASP Art. 82 (Services de Transfert)',
      explanation: 'Le transfert de crypto-actifs pour le compte de clients est un service CASP réglementé. Capital : 50 K€.',
      nextSteps: [
        'Préparer 50 K€ de fonds propres',
        'Conformité Travel Rule (données donneur d\'ordre/bénéficiaire)',
        'Note XRPL : les Payment Channels peuvent être éligibles si vous agissez uniquement comme relayeur — analyse juridique nécessaire',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 82', 'Travel Rule'],
    },
    'out-casp-advice': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Oui — CASP Art. 83 (Conseil / Gestion de Portefeuille)',
      explanation: 'Fournir des recommandations personnalisées ou une gestion discrétionnaire sur crypto-actifs = réglementé. Capital : 50 K€.',
      nextSteps: [
        'Dirigeants « fit & proper » + responsable conformité',
        'Évaluations d\'adéquation par client',
        'Déclaration des conflits d\'intérêts',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 83'],
    },
    'out-casp-placement': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Oui — CASP Art. 79 (Placement)',
      explanation: 'Commercialiser ou vendre des crypto-actifs pour le compte d\'un émetteur (avec ou sans engagement ferme) est réglementé. Capital : 50 K€.',
      nextSteps: [
        'Préparer 50 K€ de fonds propres',
        'Le livre blanc de l\'émetteur doit être conforme',
        'Divulguer commissions et conflits',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 79'],
    },
    'out-casp-rto': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Oui — CASP Art. 80 (Réception et Transmission)',
      explanation: 'Recevoir des ordres clients et les transmettre à une autre place = CASP. Capital : 50 K€.',
      nextSteps: [
        '50 K€ de fonds propres',
        'Les règles de meilleure exécution s\'appliquent',
        'Classification des clients (particuliers/professionnels)',
      ],
      relatedTerms: ['CASP', 'MiCA Art. 80'],
    },
    'out-defi-exempt': {
      type: 'outcome',
      verdict: 'no',
      title: 'Probablement exempté — totalement décentralisé',
      explanation: 'Le Considérant 22 de MiCA dispose : les services sur crypto-actifs totalement décentralisés sans intermédiaire sont hors du champ du Règlement. Mais la barre est haute — la plupart de la « DeFi » a un opérateur.',
      nextSteps: [
        'Documenter le test de décentralisation (pas de contrats upgradables, pas de clés admin, pas de collecteur de frais)',
        'Réévaluer à chaque changement de gouvernance',
        'Les opérateurs de front-end peuvent tout de même être capturés — séparer l\'UI du protocole',
        'Opinion juridique fortement recommandée',
      ],
      relatedTerms: ['MiCA', 'DeFi', 'Décentralisation'],
    },
    'out-grey-operator': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'ZONE GRISE — opinion juridique nécessaire',
      explanation: 'Si quelqu\'un contrôle le protocole (clés admin, upgradabilité, retrait de frais, filtrage du front-end), MiCA capture probablement cette entité en tant que CASP. Le champ exact dépend du service spécifique rendu.',
      nextSteps: [
        'Cartographier tous les points de contrôle et identifier l\'opérateur',
        'Classer chaque fonction selon la liste des services MiCA',
        'Envisager une restructuration vers une décentralisation réelle',
        'Commander une opinion juridique auprès d\'un avocat crypto UE',
      ],
      relatedTerms: ['CASP', 'MiCA', 'DeFi'],
    },
  },
}

// -----------------------------------------------------------------------------
// Arbre 3 — Ma conservation XRPL est-elle custodial ?
// -----------------------------------------------------------------------------
export const XRPL_CUSTODY_TREE_FR: DecisionTree = {
  id: 'xrpl-custody',
  title: 'Ma conservation XRPL est-elle custodial ?',
  description: 'Classez votre configuration parmi les 10 méthodes de conservation XRPL et obtenez une qualification claire : custodial / non-custodial / zone grise.',
  icon: '🔐',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'Votre service détient-il la Master Key du compte XRPL de l\'utilisateur ?',
      hint: 'Si le service détient seul la master key, il contrôle intégralement le compte.',
      choices: [
        { label: 'Oui — nous détenons la Master Key', next: 'out-single-key' },
        { label: 'Non — l\'utilisateur détient la Master Key (ou elle est désactivée)', next: 'q2' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Utilisez-vous une Regular Key (clé secondaire assignée via SetRegularKey) ?',
      choices: [
        { label: 'Oui — le service contrôle la Regular Key', next: 'q2a' },
        { label: 'Non', next: 'q3' },
      ],
    },
    q2a: {
      type: 'question',
      question: 'L\'utilisateur peut-il toujours signer avec sa Master Key (non désactivée) ?',
      choices: [
        { label: 'Oui — l\'utilisateur conserve la Master Key', next: 'out-regular-key-grey' },
        { label: 'Non — Master Key désactivée, le service signe seul', next: 'out-single-key' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Utilisez-vous SignerList (multisignature M-de-N native XRPL) ?',
      choices: [
        { label: 'Oui', next: 'q3a' },
        { label: 'Non', next: 'q4' },
      ],
    },
    q3a: {
      type: 'question',
      question: 'Le service peut-il seul atteindre le quorum de signature (poids suffisant pour autoriser une transaction) ?',
      hint: 'Exemple : 2-de-3 où le service détient 1 clé sur 3 → ne peut agir seul → argument non-custodial. Service détient 2-de-3 → custodial.',
      choices: [
        { label: 'Non — le service a besoin de la coopération de l\'utilisateur', next: 'out-signerlist-minority' },
        { label: 'Oui — le service peut signer seul', next: 'out-signerlist-majority' },
      ],
    },
    q4: {
      type: 'question',
      question: 'Utilisez-vous MPC / TSS (signatures à seuil, la clé n\'existe jamais en entier) ?',
      hint: 'Non natif à XRPL — mis en œuvre au niveau applicatif (Fireblocks, Qredo, etc.).',
      choices: [
        { label: 'Oui', next: 'out-mpc-grey' },
        { label: 'Non', next: 'q5' },
      ],
    },
    q5: {
      type: 'question',
      question: 'Les fonds sont-ils verrouillés dans un objet de protocole on-ledger (Escrow, Payment Channel, Check) ?',
      hint: 'Ces primitives imposent les conditions de libération au niveau protocolaire — aucun contrôle par un tiers.',
      choices: [
        { label: 'Oui — Escrow / Payment Channel / Check', next: 'out-protocol-primitive' },
        { label: 'Non', next: 'q6' },
      ],
    },
    q6: {
      type: 'question',
      question: 'Émettez-vous des IOU / Trust Lines en tant que gateway (représentant des actifs off-chain comme fiat, matières premières) ?',
      hint: 'Les gateways détiennent l\'actif sous-jacent off-chain et émettent des tokens IOU on-chain. Les utilisateurs détiennent des créances sur le gateway.',
      choices: [
        { label: 'Oui — nous sommes un gateway (type RLUSD)', next: 'out-iou-gateway' },
        { label: 'Non', next: 'q7' },
      ],
    },
    q7: {
      type: 'question',
      question: 'S\'agit-il d\'une marketplace NFT (XLS-20) utilisant le mode broker (swap atomique d\'offres d\'achat + vente) ?',
      choices: [
        { label: 'Oui — mode broker XLS-20', next: 'out-nft-broker' },
        { label: 'Non — configuration différente', next: 'out-specify' },
      ],
    },
    'out-single-key': {
      type: 'outcome',
      verdict: 'yes',
      title: 'CUSTODIAL — contrôle par clé unique',
      explanation: 'Votre service contrôle seul la clé de signature → contrôle total sur le compte. C\'est la configuration custodial la plus claire.',
      nextSteps: [
        'UE : CASP Art. 75 MiCA obligatoire (capital de 350 K€)',
        'US : FinCEN MSB + MTL étatiques probables',
        'Mettre en place cold storage, HSM, ségrégation, assurance',
        'Envisager une migration vers SignerList en minorité ou MPC pour une meilleure sécurité',
      ],
      relatedTerms: ['CASP', 'Conservation', 'Master Key'],
    },
    'out-regular-key-grey': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'ZONE GRISE — Regular Key avec Master conservée par l\'utilisateur',
      explanation: 'L\'utilisateur conserve le contrôle ultime (peut faire tourner la Regular Key à tout moment via la Master), mais le service peut signer les transactions courantes. La qualification réglementaire dépend du pattern d\'usage et de l\'accord.',
      nextSteps: [
        'Documenter la configuration à contrôle partagé',
        'UE : peut être qualifié de conservation selon l\'interprétation de l\'ESMA — opinion juridique',
        'Envisager de passer à SignerList pour un argument non-custodial plus clair',
      ],
      relatedTerms: ['Regular Key', 'Conservation', 'CASP'],
    },
    'out-signerlist-minority': {
      type: 'outcome',
      verdict: 'no',
      title: 'NON-CUSTODIAL — SignerList avec service en minorité',
      explanation: 'Le service détient moins de clés que le quorum ne l\'exige → ne peut pas signer seul → pas de contrôle unilatéral → argument non-custodial solide.',
      nextSteps: [
        'Désactiver la Master Key (lsfDisableMaster) pour un multisig pur',
        'Documenter la configuration dans vos CGU',
        'UE : CASP probablement NON requis — mais confirmer avec un avocat (l\'ESMA n\'a pas tranché sur les topologies multisig spécifiques)',
        'Posture réglementaire solide pour les offres institutionnelles',
      ],
      relatedTerms: ['SignerList', 'Multisig', 'Conservation'],
    },
    'out-signerlist-majority': {
      type: 'outcome',
      verdict: 'yes',
      title: 'CUSTODIAL — SignerList avec service majoritaire',
      explanation: 'Le service détient suffisamment de clés pour atteindre le quorum seul → traitement custodial. Mêmes obligations qu\'une clé unique.',
      nextSteps: [
        'UE : CASP Art. 75 MiCA s\'applique',
        'Reconsidérer la topologie — une configuration en minorité (service = 1 sur N, quorum > 1) donne un traitement non-custodial',
      ],
      relatedTerms: ['SignerList', 'Conservation', 'CASP'],
    },
    'out-mpc-grey': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'ZONE GRISE — MPC / TSS',
      explanation: 'Aucune partie ne détient jamais la clé complète. Argument technique solide pour le non-custodial, mais ni l\'ESMA ni la FCA n\'ont émis d\'orientation définitive. La qualification dépend : qui déclenche la signature, qui a un droit de veto, et le seuil.',
      nextSteps: [
        'Documenter la topologie t-de-n et le workflow de signature',
        'L\'utilisateur conserve au moins 1 part avec droit de veto → argument le plus solide',
        'Commander une opinion juridique (Fireblocks, Qredo disposent d\'analyses de référence)',
        'Certains régulateurs (ex. HKMA) sont plus ouverts au traitement non-custodial de MPC',
      ],
      relatedTerms: ['MPC', 'TSS', 'Conservation'],
    },
    'out-protocol-primitive': {
      type: 'outcome',
      verdict: 'no',
      title: 'NON-CUSTODIAL — imposé par le protocole',
      explanation: 'Les fonds verrouillés dans Escrow / Payment Channel / Check sont libérés par les règles du ledger, non par un tiers. Pas de licence CASP requise pour la conservation elle-même.',
      nextSteps: [
        'Les services périphériques (ex. off-ramp fiat, conversion) peuvent déclencher un CASP',
        'Payment Channels : vérifier si vous êtes relayeur — peut déclencher le CASP services de transfert',
        'Documenter les primitives utilisées dans vos CGU',
      ],
      relatedTerms: ['Escrow', 'Payment Channel', 'Checks'],
    },
    'out-iou-gateway': {
      type: 'outcome',
      verdict: 'yes',
      title: 'CUSTODIAL — Gateway IOU',
      explanation: 'Un gateway détient des actifs off-chain et émet des IOU on-chain → les utilisateurs détiennent des créances → custodial par définition. Les IOU adossés à du fiat déclenchent aussi les règles de la monnaie électronique.',
      nextSteps: [
        'UE : CASP Art. 75 + licence EMI si adossé au fiat (EMT sous MiCA)',
        'RLUSD est la mise en œuvre de référence — Ripple comme émetteur EMT',
        'Mettre en place freeze / globalFreeze pour les contrôles de conformité',
        'Utiliser RequireAuth pour le filtrage KYC on-chain',
      ],
      relatedTerms: ['IOU', 'Trust Line', 'RLUSD', 'EMT', 'CASP'],
    },
    'out-nft-broker': {
      type: 'outcome',
      verdict: 'no',
      title: 'NON-CUSTODIAL — mode Broker XLS-20',
      explanation: 'Le mode broker utilise des swaps atomiques d\'offres d\'achat + vente on-ledger. Le broker ne détient jamais le NFT. Pas de licence CASP requise.',
      nextSteps: [
        'Mettre en œuvre NFTokenCreateOffer + NFTokenAcceptOffer avec les deux IDs',
        'Les royalties via TransferFee sont imposées par le protocole',
        'Documenter le modèle broker dans vos CGU',
      ],
      relatedTerms: ['NFT', 'XLS-20', 'Broker Mode'],
    },
    'out-specify': {
      type: 'outcome',
      verdict: 'maybe',
      title: 'Précisez votre configuration',
      explanation: 'Votre configuration de conservation ne correspond pas aux 10 patterns standards. Probablement une architecture sur mesure — la qualification nécessite une analyse au cas par cas.',
      nextSteps: [
        'Cartographier chaque clé de signature et qui la détient',
        'Cartographier chaque objet on-ledger impliqué (AccountRoot, SignerList, Escrow, etc.)',
        'Consulter la Matrice de Conservation XRPL dans le XRPL Hub',
        'Commander une opinion juridique',
      ],
      relatedTerms: ['Conservation', 'XRPL'],
    },
  },
}

// -----------------------------------------------------------------------------
// Arbre 4 — Quelle juridiction choisir ?
// -----------------------------------------------------------------------------
export const JURISDICTION_TREE_FR: DecisionTree = {
  id: 'jurisdiction',
  title: 'Quelle juridiction choisir ?',
  description: 'Arbitrez entre vitesse, coût, accès au marché et réputation pour choisir votre juridiction de départ.',
  icon: '🌍',
  rootId: 'q1',
  nodes: {
    q1: {
      type: 'question',
      question: 'Quelle est votre priorité principale ?',
      choices: [
        { label: 'Time to market — être opérationnel au plus vite', next: 'out-speed' },
        { label: 'Coût réduit — minimiser capital et frais', next: 'out-cost' },
        { label: 'Accès à un marché spécifique', next: 'q2' },
        { label: 'Réputation — crédibilité institutionnelle', next: 'q3' },
      ],
    },
    q2: {
      type: 'question',
      question: 'Quel marché visez-vous en premier ?',
      choices: [
        { label: 'Union Européenne', next: 'out-market-eu' },
        { label: 'États-Unis', next: 'out-market-us' },
        { label: 'Asie — particuliers', next: 'out-market-asia-retail' },
        { label: 'Asie — institutionnel', next: 'out-market-asia-inst' },
        { label: 'MENA / Golfe', next: 'out-market-mena' },
        { label: 'Amérique Latine', next: 'out-market-latam' },
      ],
    },
    q3: {
      type: 'question',
      question: 'Favorable à l\'innovation ou stabilité avant tout ?',
      choices: [
        { label: 'Favorable à l\'innovation, réactive', next: 'out-rep-innovation' },
        { label: 'Stabilité avant tout, réglementation mature', next: 'out-rep-stability' },
      ],
    },
    'out-speed': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Liechtenstein TVTG (3–9 mois)',
      explanation: 'TVTG est le cadre progressif le plus rapide au monde. 14 types de prestataires couvrent la plupart des activités crypto. Le passeport EEE vous permet de commercialiser dans les 27 États de l\'UE une fois agréé.',
      nextSteps: [
        'Choisir le bon type SP (Token Exchange, Token Custodian, etc.)',
        'Budget 15–80 K CHF + dirigeants fit-and-proper',
        'Démarrer livre blanc + programme LCB-FT en parallèle',
        'Alternative : Suisse FINMA VQF/SRO (6–12 mois)',
      ],
      relatedTerms: ['TVTG', 'Liechtenstein', 'FMA'],
    },
    'out-cost': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Liechtenstein ou Suisse',
      explanation: 'TVTG plafonne le capital au niveau du type de prestataire (15–80 K CHF). La Suisse VQF/SRO est encore plus légère pour la pure conformité LCB-FT. Les deux sont bien moins chers que MiCA (50–350 K€) ou les US (200 K€+ en juridique).',
      nextSteps: [
        'Comparer les types SP vs le coût par activité',
        'Envisager le passeport EEE depuis le Liechtenstein vers l\'UE',
        'Solution low-cost : Seychelles ou BVI pour les premiers stades, opérations hors UE',
      ],
      relatedTerms: ['TVTG', 'VQF', 'FINMA'],
    },
    'out-market-eu': {
      type: 'outcome',
      verdict: 'yes',
      title: 'France (AMF) ou Lituanie / Malte comme hub MiCA',
      explanation: 'Le passeport MiCA signifie qu\'une licence couvre les 27 États de l\'UE. Lituanie et Malte sont historiquement les plus rapides pour l\'agrément crypto (~6 mois). La France a une meilleure réputation institutionnelle mais est plus lente (~12-18 mois).',
      nextSteps: [
        'Choisir le hub selon : vitesse (LT/MT), réputation (FR/DE) ou fiscalité (IE/LU)',
        'Budget 50–350 K€ de capital + 100–500 K€ de mise en place',
        'Prévoir 12–18 mois pour un CASP complet',
        'Envisager Liechtenstein TVTG + passeport EEE comme voie rapide',
      ],
      relatedTerms: ['MiCA', 'CASP', 'AMF'],
    },
    'out-market-us': {
      type: 'outcome',
      verdict: 'yes',
      title: 'LLC Wyoming + MSB fédéral',
      explanation: 'Le Wyoming offre des LLC crypto-friendly (charte SPDI pour les banques). L\'enregistrement fédéral FinCEN MSB est requis. Puis MTL État par État pour l\'activité commerciale (48 États, ~500 K$–1 M$ au total). Éviter NY au départ (BitLicense est un cas à part).',
      nextSteps: [
        'FinCEN MSB fédéral d\'abord',
        'Prioriser 10–15 États clés selon le volume d\'utilisateurs',
        'Rester en dehors de NY, CT, HI au départ',
        'Risque SEC fédéral si le token = titre financier (Howey)',
        'Envisager Wyoming SPDI pour la conservation',
      ],
      relatedTerms: ['FinCEN', 'MSB', 'MTL', 'BitLicense'],
    },
    'out-market-asia-retail': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Singapour MAS',
      explanation: 'La MAS PSA propose MPI (Major Payment Institution) ou SPI (Standard). Règles claires pour les particuliers, droit anglais, écosystème solide. ~6–12 mois, 50–150 K SGD.',
      nextSteps: [
        'Choisir la catégorie MPI (>3 M SGD/mois) ou SPI',
        'Mettre en place une entité Singapour + directeur local',
        'Travel Rule + programme LCB-FT robuste',
        'Alternative : Hong Kong SFC VASP pour les particuliers HK',
      ],
      relatedTerms: ['MAS', 'PSA', 'DPT'],
    },
    'out-market-asia-inst': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Hong Kong SFC VASP (VATP)',
      explanation: 'Le régime VATP de Hong Kong est conçu pour les plateformes de négociation réglementées servant les investisseurs professionnels (particuliers désormais autorisés sous conditions strictes). Flux institutionnel fort vers la Chine continentale.',
      nextSteps: [
        'Licence SFC VASP (~12–18 mois)',
        'Capital 500 K–2 M HKD + Type 1 si titres financiers',
        'Cold storage >98 % + mesures de protection des particuliers',
        'Alternative : Singapour MPI pour une portée pan-asiatique',
      ],
      relatedTerms: ['SFC', 'VASP', 'VATP', 'HKMA'],
    },
    'out-market-mena': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Dubaï VARA ou Abu Dhabi ADGM',
      explanation: 'VARA (Dubaï) et ADGM (Abu Dhabi) offrent tous deux des licences VASP. VARA est plus récent et plus startup-friendly ; ADGM dispose de tribunaux de common law anglaise. ~6–12 mois, 50–150 K$.',
      nextSteps: [
        'Choisir VARA (ville de Dubaï, tourné vers les consommateurs) ou ADGM (Abu Dhabi, institutionnel)',
        'Directeur local + bureau requis',
        'Capital + audit technique',
        'Porte d\'entrée vers l\'Arabie saoudite, l\'Égypte, les marchés du Golfe élargi',
      ],
      relatedTerms: ['VARA', 'ADGM', 'FSRA'],
    },
    'out-market-latam': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Brésil BCB / CVM',
      explanation: 'La loi crypto du Brésil (Lei 14.478/2022) place les VASP sous la supervision de la BCB. La CVM gère les security tokens. Grand marché crypto-friendly — plus de 10 % d\'adoption.',
      nextSteps: [
        'Enregistrement BCB VASP (émergent, les délais se précisent)',
        'CVM pour les titres financiers tokenisés',
        'Structure fiscale locale (PJ au Brésil)',
        'Conformité + marketing en portugais',
      ],
      relatedTerms: ['BCB', 'CVM', 'Brésil'],
    },
    'out-rep-innovation': {
      type: 'outcome',
      verdict: 'yes',
      title: 'Suisse FINMA (Crypto Valley)',
      explanation: 'FINMA dispose d\'une taxonomie claire des tokens (payment / utility / asset) depuis 2018. La Crypto Valley (Zoug) héberge la Fondation Ethereum, Tezos, Cardano, Polkadot. La Loi DLT ajoute un cadre pour les titres financiers tokenisés.',
      nextSteps: [
        'VQF ou SRO pour la LCB-FT',
        'Licence FINMA FinTech (plafond de dépôts de 100 M CHF, plus légère qu\'une banque)',
        'DLT Trading Facility si vous exploitez un exchange',
        'L\'écosystème Crypto Valley = talents + réseau',
      ],
      relatedTerms: ['FINMA', 'VQF', 'SRO', 'DLT Act'],
    },
    'out-rep-stability': {
      type: 'outcome',
      verdict: 'yes',
      title: 'UE MiCA (France AMF / Allemagne BaFin)',
      explanation: 'MiCA est la réglementation crypto la plus complète au monde. Forte reconnaissance institutionnelle, corpus de règles clair, passeport pour 27 États. Plus lent et plus coûteux, mais crédibilité maximale.',
      nextSteps: [
        'France AMF (CASP + DASP) ou Allemagne BaFin (CASP + KWG le cas échéant)',
        'Calendrier de 12–18 mois, capital de 50–350 K€',
        'Marketing UE complet + confiance institutionnelle',
      ],
      relatedTerms: ['MiCA', 'CASP', 'AMF', 'BaFin'],
    },
  },
}

export const DECISION_TREES_FR: DecisionTree[] = [
  HOWEY_TREE_FR,
  CASP_TREE_FR,
  XRPL_CUSTODY_TREE_FR,
  JURISDICTION_TREE_FR,
]

export function getDecisionTreeFr(id: string): DecisionTree | undefined {
  return DECISION_TREES_FR.find((t) => t.id === id)
}
