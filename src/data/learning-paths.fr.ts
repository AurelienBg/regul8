import type { LearningPath } from '@/types'

// -----------------------------------------------------------------------------
// Parcours 1 — MiCA Essentiel
// -----------------------------------------------------------------------------
const MICA: LearningPath = {
  id: 'mica-essentials',
  icon: '🇪🇺',
  title: 'MiCA Essentiel',
  subtitle: 'Comprendre les trois catégories de jetons, le régime CASP, et ce que MiCA régule — et ne régule pas.',
  duration: 'Lecture de 8 min',
  level: 'beginner',
  jurisdictions: ['eu'],
  sections: [
    {
      id: 'what-is-mica',
      heading: 'Ce qu\'est MiCA et pourquoi c\'est important',
      content: [
        { kind: 'p', text: 'MiCA — le règlement sur les marchés de crypto-actifs — est le corpus de règles complet de l\'Union européenne pour les cryptos. Il est entré en vigueur en juin 2023 et ses principales dispositions s\'appliquent depuis décembre 2024. Il remplace une mosaïque de régimes nationaux par un cadre unique à l\'échelle de l\'UE que toute entreprise crypto touchant des utilisateurs de l\'UE doit comprendre.' },
        { kind: 'p', text: 'Contrairement à la régulation américaine menée par la poursuite, MiCA est un régime prescriptif : il dit aux émetteurs ce que leurs jetons peuvent et ne peuvent pas être, et il dit aux prestataires de services quelles activités nécessitent une autorisation. La clarté se paie au prix du périmètre — MiCA capte davantage d\'activité crypto que presque tout autre régime mondial.' },
        { kind: 'callout', tone: 'key', title: 'Pourquoi c\'est important pour votre startup', text: 'Si votre activité sert ou cible des utilisateurs de l\'UE, MiCA s\'applique probablement. Une seule licence CASP donne le passeport à travers les 27 États membres — mais sans licence, votre activité tournée vers l\'UE n\'est pas autorisée. L\'arbitrage de juridiction reste possible, mais il requiert un géo-blocage actif.' },
      ],
    },
    {
      id: 'three-categories',
      heading: 'Les trois catégories de jetons',
      content: [
        { kind: 'p', text: 'MiCA définit trois catégories mutuellement exclusives pour tout jeton relevant de son périmètre. Choisir la bonne est la première décision de conception pour tout émetteur.' },
        { kind: 'h3', text: 'Jeton de monnaie électronique (EMT)' },
        { kind: 'p', text: 'Un EMT stabilise sa valeur par référence à une seule monnaie officielle — USD, EUR, GBP, etc. RLUSD, USDC et EURt sont des EMT. L\'émetteur doit être un établissement de monnaie électronique (EMI) agréé ou un établissement de crédit. Les réserves doivent être en ratio 1:1, composées d\'actifs hautement liquides à faible risque, et totalement ségréguées du bilan de l\'émetteur.' },
        { kind: 'h3', text: 'Jeton adossé à des actifs (ART)' },
        { kind: 'p', text: 'Un ART référence plusieurs monnaies, matières premières ou autres valeurs. Les stablecoins multi-devises, les jetons adossés à des matières premières ou les jetons référençant des paniers entrent tous ici. L\'émetteur a besoin d\'une autorisation de l\'ANC (Autorité nationale compétente — AMF en France, BaFin en Allemagne), et le livre blanc doit être approuvé, pas seulement notifié.' },
        { kind: 'h3', text: 'Autre crypto-actif' },
        { kind: 'p', text: 'Tout ce qui est dans le périmètre et qui n\'est ni EMT ni ART atterrit ici — Bitcoin, Ether, XRP, la plupart des jetons utilitaires, la plupart des jetons de gouvernance. Le régime est le plus léger : publication d\'un livre blanc + notification à l\'ANC si l\'offre dépasse 1 M€ sur une fenêtre glissante de 12 mois. Pas d\'approbation préalable, pas de réserves en capital.' },
        { kind: 'callout', tone: 'warn', title: 'Les jetons hybrides ne sont pas une catégorie', text: 'Si votre jeton combine des caractéristiques — verse un rendement ET accorde une gouvernance ET référence un actif — MiCA ne reconnaît pas de catégorie hybride. Vous devez entrer dans l\'une des trois. Les régulateurs appliqueront généralement la classification la plus stricte disponible.' },
      ],
    },
    {
      id: 'casp-regime',
      heading: 'CASP — le régime des prestataires de services',
      content: [
        { kind: 'p', text: 'Indépendamment des catégories de jetons, MiCA régule qui peut fournir des services sur crypto-actifs aux utilisateurs de l\'UE. Ces prestataires ont besoin d\'une autorisation CASP (Crypto-Asset Service Provider). Les dix services régulés couvrent toute la chaîne de valeur crypto.' },
        {
          kind: 'table',
          headers: ['Service', 'Article MiCA', 'Capital (€)'],
          rows: [
            ['Conservation & administration', 'Art. 75', '350K'],
            ['Échange crypto contre fiat ou crypto contre crypto', 'Art. 76-78', '125K'],
            ['Exploitation d\'une plateforme de négociation', 'Art. 76', '150K'],
            ['Placement de crypto-actifs', 'Art. 79', '50K'],
            ['Réception & transmission d\'ordres', 'Art. 80', '50K'],
            ['Exécution d\'ordres', 'Art. 81', '125K'],
            ['Services de transfert', 'Art. 82', '50K'],
            ['Gestion de portefeuille', 'Art. 83', '50K'],
            ['Conseil', 'Art. 83', '50K'],
            ['Crypto-actifs pour le compte de clients', 'Art. 84', '50K'],
          ],
        },
        { kind: 'p', text: 'Un CASP peut offrir plusieurs services ; le capital applicable est le plus élevé des exigences de capital individuelles. Au-delà du capital, les obligations incluent : dirigeants fit-and-proper, résilience organisationnelle, gestion des conflits d\'intérêts, règles de conservation, surveillance des abus de marché, traitement des réclamations et comptes annuels audités.' },
        { kind: 'callout', tone: 'info', title: 'Passeport MiCA', text: 'Un CASP agréé dans n\'importe quel État membre de l\'UE peut obtenir le passeport vers les 27 États via une simple notification. Lituanie, Malte et Irlande ont historiquement été les juridictions d\'autorisation les plus rapides ; la France et l\'Allemagne apportent la plus grande crédibilité institutionnelle. Choisissez votre hub selon la rapidité, la réputation ou la fiscalité.' },
      ],
    },
    {
      id: 'what-mica-excludes',
      heading: 'Ce que MiCA NE couvre PAS',
      content: [
        { kind: 'p', text: 'Savoir ce qui est hors périmètre est aussi important que savoir ce qui est dedans. MiCA exclut explicitement :' },
        { kind: 'ul', items: [
          'Les jetons non fongibles uniques (véritablement 1-de-1 — si vous mintez une série fongible de 10 000 "NFT", ils peuvent se qualifier comme ART ou crypto-actifs)',
          'Les monnaies numériques de banque centrale (CBDC)',
          'Les services entièrement décentralisés sans opérateur identifiable (considérant 22 de MiCA) — la barre est haute',
          'Les valeurs mobilières transférables et autres instruments financiers déjà couverts par MiFID II',
          'Les dépôts et fonds déjà couverts par DSP2 / directive monnaie électronique (sous réserve d\'interaction avec les règles EMT)',
        ] },
        { kind: 'p', text: 'L\'exemption DeFi est la plus contestée : MiCA laisse intentionnellement de la place aux protocoles vraiment sans permission, mais la plupart des déploiements "DeFi" ont un opérateur — clés d\'admin, contrats upgradables, collecteurs de frais, front-ends avec KYC. Ces opérateurs sont captés par les règles CASP. La séparation protocole-seul / front-end-seul est une atténuation courante, mais demande une structuration soignée.' },
      ],
    },
    {
      id: 'preparing',
      heading: 'Comment se préparer',
      content: [
        { kind: 'p', text: 'Une startup prête pour MiCA a besoin de quatre éléments avant de déposer :' },
        { kind: 'ol', items: [
          'Une classification claire du jeton (EMT / ART / Autre) étayée par un mémorandum raisonné',
          'Une cartographie des services — quels services MiCA fournissez-vous, quels articles s\'appliquent, et quelle est l\'exigence de capital la plus élevée ?',
          'Une équipe de gouvernance qui passe le test fit-and-proper — deux dirigeants résidents UE, un responsable conformité avec expérience LCB-FT, des politiques documentées',
          'Un projet de livre blanc (ou un dossier d\'autorisation pour EMT/ART) avec les informations à fournir, facteurs de risque, architecture technique, impact environnemental',
        ] },
        { kind: 'p', text: 'Délais réalistes : 6-12 mois pour les Autres crypto-actifs (voie livre blanc), 9-15 mois pour l\'autorisation CASP (variable selon l\'ANC), 12-18 mois pour une émission EMT ou ART. Prévoyez 50-500 K€ en frais juridiques et de mise en place selon le périmètre. La TVTG du Liechtenstein reste une alternative plus rapide (3-9 mois) avec le passeport EEE comme contournement.' },
        { kind: 'callout', tone: 'key', title: 'Étape suivante', text: 'Lancez l\'arbre de décision "Ai-je besoin d\'une licence CASP ?" pour obtenir un verdict concret sur votre service spécifique.' },
      ],
    },
  ],
  relatedTerms: ['MiCA', 'CASP', 'EMT', 'ART', 'AMF', 'ESMA', 'Utility Token', 'DeFi'],
  relatedTrees: ['casp'],
}

// -----------------------------------------------------------------------------
// Parcours 2 — Custody XRPL Approfondie
// -----------------------------------------------------------------------------
const XRPL_CUSTODY: LearningPath = {
  id: 'xrpl-custody',
  icon: '🔐',
  title: 'Custody XRPL Approfondie',
  subtitle: 'Les dix méthodes de custody sur XRPL, comment les régulateurs qualifient chacune, et comment concevoir une architecture qui résiste à l\'examen.',
  duration: 'Lecture de 10 min',
  level: 'intermediate',
  jurisdictions: ['eu', 'us', 'uae'],
  sections: [
    {
      id: 'why-custody-matters',
      heading: 'Pourquoi la custody est le point crucial de la régulation',
      content: [
        { kind: 'p', text: 'De tous les services crypto, la custody est celui où les régulateurs appliquent la main la plus lourde. La raison est simple : la custody est le point d\'entrée pour les pertes de fonds clients, la fraude et l\'abus LCB-FT. Un échange défaillant peut être isolé ; un dépositaire défaillant emporte les actifs des clients avec lui.' },
        { kind: 'p', text: 'Sous MiCA, la custody (Art. 75) exige l\'exigence de capital la plus élevée de tous les services CASP (350 K€) plus des obligations strictes de conservation, de ségrégation et d\'assurance. Sous FinCEN, la custody déclenche l\'enregistrement MSB et souvent des licences de money-transmitter au niveau des États. Sous le régime VASP de la SFC à Hong Kong, la custody doit être à >98 % en cold storage.' },
        { kind: 'p', text: 'La question de savoir si votre service est "custodial" détermine donc si vous avez besoin d\'une licence lourde ou légère — ou d\'aucune. XRPL vous offre une flexibilité inhabituelle : le protocole supporte plusieurs schémas de custody nativement, et la classification de chaque schéma diffère.' },
      ],
    },
    {
      id: 'custodial-vs-not',
      heading: 'La distinction clé',
      content: [
        { kind: 'h3', text: 'Custodial' },
        { kind: 'p', text: 'Un tiers détient les clés qui signent les transactions au nom de l\'utilisateur. L\'utilisateur fait confiance au tiers. Si ce tiers disparaît, les actifs aussi. Tous les hot wallets des échanges centralisés sont custodial. Les IOU émis par gateway sont custodial.' },
        { kind: 'h3', text: 'Non-custodial' },
        { kind: 'p', text: 'L\'utilisateur contrôle ses propres clés. Aucun tiers ne peut déplacer les fonds sans la signature de l\'utilisateur. Les hardware wallets sont non-custodial. Les escrows verrouillés par le temps ou des conditions cryptographiques sont non-custodial — même un registre sans smart contract comme XRPL impose la libération au niveau du protocole.' },
        { kind: 'h3', text: 'Zone grise' },
        { kind: 'p', text: 'Là où l\'autorité de signature est divisée ou partagée — multi-sig, MPC, configurations regular-key-plus-master-key — les régulateurs n\'ont pas émis d\'orientations claires. La classification dépend typiquement de : une seule partie peut-elle agir seule ? Si oui, cette partie est le dépositaire. Sinon, la configuration penche vers le non-custodial.' },
        { kind: 'callout', tone: 'warn', title: 'Zone grise ≠ non régulé', text: 'Zone grise signifie que les régulateurs n\'ont pas tranché définitivement. Cela ne signifie pas que vous échappez à l\'examen. ESMA, FCA, BaFin et NYDFS sont tous attendus pour émettre des orientations en 2026-2027. Supposez que votre classification en zone grise peut se durcir.' },
      ],
    },
    {
      id: 'the-ten-methods',
      heading: 'Les 10 méthodes XRPL',
      content: [
        { kind: 'p', text: 'XRPL offre dix manières distinctes de structurer qui peut signer. Trois sont clairement custodial, quatre sont clairement non-custodial, trois vivent en zone grise.' },
        { kind: 'h3', text: 'Clairement custodial' },
        { kind: 'ul', items: [
          'Clé unique — le service détient la clé maître du compte XRPL de l\'utilisateur. Contrôle total. C\'est le modèle par défaut des échanges centralisés.',
          'IOU / Trust Lines (modèle gateway) — le service émet des jetons adossés à des réserves off-chain, les utilisateurs détiennent des créances. RLUSD suit ce schéma. Déclenche à la fois les règles de custody ET les règles d\'émetteur.',
        ] },
        { kind: 'h3', text: 'Clairement non-custodial' },
        { kind: 'ul', items: [
          'Escrow — XRP verrouillés par le temps ou une condition cryptographique. Le registre impose la libération. Aucun tiers nécessaire.',
          'Payment Channels — le déposant verrouille des XRP on-chain, le destinataire collecte des créances signées off-chain. La fermeture du canal est imposée par le protocole.',
          'Checks — "chèque" on-ledger où le compte de l\'expéditeur n\'est débité que lorsque le destinataire encaisse.',
          'Mode NFT Broker (XLS-20) — échange atomique d\'offres d\'achat et de vente. Le broker ne touche jamais au NFT.',
          'SignerList minoritaire — multi-sig où le service détient moins de clés que le quorum requis. Ne peut agir seul.',
        ] },
        { kind: 'h3', text: 'Zone grise' },
        { kind: 'ul', items: [
          'Regular Key — clé secondaire assignée via SetRegularKey. Si le master reste actif chez l\'utilisateur, la classification dépend de l\'usage ; si le master est désactivé, le service est custodial.',
          'SignerList majoritaire — multi-sig où le service détient assez de poids pour atteindre le quorum seul. Généralement custodial ; certains soutiennent le contraire si les politiques opérationnelles exigent la co-signature de l\'utilisateur.',
          'MPC / TSS — signatures à seuil implémentées au niveau applicatif. La clé n\'existe jamais en entier. Argument technique fort de non-custodial ; ESMA et FCA n\'ont pas tranché.',
          'MPT (XLS-33) — jetons programmables. L\'émetteur peut verrouiller (lsfLocked) ou exiger une autorisation (lsfRequireAuth). Selon l\'usage, peut être traité comme IOU (custodial) ou comme Autre crypto-actif.',
        ] },
      ],
    },
    {
      id: 'design-for-compliance',
      heading: 'Concevoir votre architecture pour la conformité',
      content: [
        { kind: 'p', text: 'Une architecture défensive part du résultat réglementaire souhaité et remonte aux primitives XRPL. Trois profils cibles courants :' },
        { kind: 'h3', text: '1. Custody institutionnelle — vous VOULEZ être custodial' },
        { kind: 'p', text: 'Embrassez les obligations de l\'Art. 75 CASP / MSB et structurez pour la crédibilité institutionnelle. Utilisez MPC ou SignerList majoritaire avec des workflows formels de signature multi-parties. Cold storage >98 % pour les juridictions retail. Ségréguez les comptes clients au niveau du compte XRPL (un compte par client, pas de wallets mutualisés). La voie est coûteuse mais crédible.' },
        { kind: 'h3', text: '2. Infrastructure self-custody — vous NE voulez PAS détenir de clés' },
        { kind: 'p', text: 'Livrez un logiciel ou des services qui aident les utilisateurs à garder eux-mêmes leurs actifs XRPL. Utilisez SignerList minoritaire (le service est 1-sur-3, l\'utilisateur détient 2). Combinez avec Regular Key où l\'utilisateur conserve toujours le master. L\'utilisateur est la seule partie pouvant atteindre le quorum. Vous échappez au CASP mais devenez fournisseur de logiciel.' },
        { kind: 'h3', text: '3. Rails de paiement — primitives du protocole' },
        { kind: 'p', text: 'Pour les cas d\'usage de paiement, streaming ou escrow, appuyez-vous sur Escrow, Payment Channels et Checks. Ces primitives sont imposées par le protocole et évitent totalement la custody. Votre exposition CASP glisse vers les "services de transfert" (Art. 82, 50 K€ de capital), plus léger que la custody.' },
      ],
    },
    {
      id: 'rlusd-case',
      heading: 'Étude de cas : RLUSD et la gateway IOU',
      content: [
        { kind: 'p', text: 'Le stablecoin RLUSD de Ripple est l\'implémentation de référence d\'une gateway IOU conforme sur XRPL. Standard Custody & Trust Company (chartée par le NYDFS) émet RLUSD via une trust line XRPL. Les utilisateurs détiennent les soldes RLUSD comme des créances on-chain contre le trust.' },
        { kind: 'p', text: 'Choix de conception clés :' },
        { kind: 'ul', items: [
          'Drapeau RequireAuth sur le compte émetteur — les détenteurs doivent être explicitement autorisés par l\'émetteur. KYC on-chain.',
          'Drapeau freeze — le trust peut geler des trust lines individuelles pour des blocages LCB-FT.',
          'Drapeau globalFreeze — frein d\'urgence gelant toutes les trust lines.',
          'Adossement 1:1 en dépôts en cash + Treasuries US à court terme, ségrégué des fonds propres de Ripple.',
          'Émissions séparées sur XRPL et Ethereum — pas de pont, chaque chaîne est une émission indépendante.',
        ] },
        { kind: 'p', text: 'Le modèle montre que "custodial" ne signifie pas "centralisé à l\'ancienne". Une gateway IOU bien conçue offre la clarté juridique de la custody bancaire traditionnelle avec des primitives de conformité on-chain que les stablecoins ERC-20 doivent rétrofitter via des fonctions admin.' },
        { kind: 'callout', tone: 'key', title: 'Votre étape suivante', text: 'Utilisez l\'arbre de décision "Ma custody XRPL est-elle custodial ?" pour faire cheminer votre propre architecture à travers les 10 méthodes et obtenir un verdict.' },
      ],
    },
  ],
  relatedTerms: ['Custody', 'CASP', 'SignerList', 'MPC', 'TSS', 'Trust Line', 'IOU', 'Escrow', 'Payment Channel', 'RLUSD'],
  relatedTrees: ['xrpl-custody', 'casp'],
}

// -----------------------------------------------------------------------------
// Parcours 3 — Le Test Howey Expliqué
// -----------------------------------------------------------------------------
const HOWEY: LearningPath = {
  id: 'howey-test',
  icon: '⚖️',
  title: 'Le Test Howey Expliqué',
  subtitle: 'Le test de la Cour suprême américaine de 1946 qui définit un titre financier — et pourquoi il détermine encore quels jetons crypto la SEC poursuit.',
  duration: 'Lecture de 6 min',
  level: 'beginner',
  jurisdictions: ['us'],
  sections: [
    {
      id: 'origin',
      heading: 'D\'où vient ce test',
      content: [
        { kind: 'p', text: 'Le test Howey a été établi dans l\'affaire SEC v. W.J. Howey Co. de la Cour suprême américaine de 1946. Une entreprise de Floride vendait des parcelles d\'une orangeraie à des investisseurs, assorties d\'un contrat de service par lequel Howey cultiverait, récolterait et commercialiserait les oranges. Les investisseurs attendaient un rendement du travail de Howey. La Cour a jugé que ces arrangements étaient des "contrats d\'investissement" — et donc des titres financiers — même si aucune action, obligation ou instrument financier traditionnel n\'était en jeu.' },
        { kind: 'p', text: 'L\'enseignement clé : c\'est la substance économique d\'une transaction qui détermine si elle est un titre financier, pas la forme ou l\'étiquette. Un jeton, un NFT, une position de yield farming ou un point utilitaire peuvent tous être des contrats d\'investissement si la substance correspond.' },
      ],
    },
    {
      id: 'four-prongs',
      heading: 'Les quatre critères',
      content: [
        { kind: 'p', text: 'La Cour Howey a distillé sa décision en un test en quatre parties. Les quatre doivent être satisfaits pour que l\'arrangement soit un titre financier.' },
        { kind: 'ol', items: [
          'Investissement d\'argent — une forme de contrepartie économique est apportée (argent, crypto, services, tout objet de valeur).',
          'Dans une entreprise commune — les fortunes des investisseurs sont liées entre elles, ou liées aux efforts du promoteur.',
          'Avec une attente de profit — les acheteurs s\'attendent à une appréciation du capital, à un rendement ou à un autre retour.',
          'Provenant des efforts d\'autrui — ces efforts doivent provenir principalement d\'un tiers (promoteur, développeur, équipe), pas de l\'investisseur lui-même.',
        ] },
        { kind: 'callout', tone: 'info', title: 'Les quatre, ou aucun', text: 'Si UN SEUL critère échoue, l\'arrangement n\'est pas un titre financier au sens de Howey. La plupart des analyses crypto tournent autour du critère 4 : les profits sont-ils entraînés par une équipe centrale, ou par un réseau suffisamment décentralisé ?' },
      ],
    },
    {
      id: 'each-prong-crypto',
      heading: 'Comment chaque critère s\'applique à la crypto',
      content: [
        { kind: 'h3', text: 'Critère 1 — Investissement d\'argent' },
        { kind: 'p', text: 'Presque toujours satisfait pour les jetons vendus contre fiat ou crypto. Les airdrops sans aucune action requise des destinataires peuvent échouer à ce critère, mais la SEC a soutenu que les airdrops liés à la création de compte ou à des vérifications KYC restent des investissements.' },
        { kind: 'h3', text: 'Critère 2 — Entreprise commune' },
        { kind: 'p', text: 'Les circuits américains sont divisés sur ce test. La "commonalité horizontale" — les investisseurs mettent leurs actifs en commun et partagent les profits au prorata — est la plus acceptée. La "commonalité verticale" — les fortunes des investisseurs montent et descendent avec le promoteur — est aussi utilisée. Pour la plupart des ventes de jetons où les produits financent un protocole commun, ce critère est satisfait.' },
        { kind: 'h3', text: 'Critère 3 — Attente de profit' },
        { kind: 'p', text: 'Le marketing compte énormément. Si un jeton est vendu comme "utilité pour accéder à notre réseau", le critère 3 peut échouer. Si le même jeton est commercialisé comme "rare, accès anticipé, le prix montera à mesure que le réseau se développe", le critère 3 est rempli. De nombreuses poursuites de la SEC reposent sur des messages trouvés sur Discord, Twitter et dans les pitch decks.' },
        { kind: 'h3', text: 'Critère 4 — Efforts d\'autrui' },
        { kind: 'p', text: 'Le critère le plus difficile pour la crypto. Au lancement, la valeur d\'un jeton dépend des efforts de l\'équipe fondatrice — Howey est satisfait. Mais à mesure que le protocole mûrit et que la gouvernance se décentralise, le critère peut échouer. Le discours de Hinman à la SEC (2018) a articulé cette théorie de "décentralisation suffisante", en soutenant qu\'Ether avait transité vers un non-titre. La décision de la juge Torres dans Ripple (juillet 2023) a appliqué un raisonnement similaire aux ventes secondaires de XRP.' },
      ],
    },
    {
      id: 'post-ripple',
      heading: 'Après Ripple : la scission primaire/secondaire',
      content: [
        { kind: 'p', text: 'Le développement récent le plus important est la décision de juillet 2023 de la juge Torres dans SEC v. Ripple. La cour a distingué trois contextes :' },
        { kind: 'ul', items: [
          'Ventes institutionnelles (Ripple → hedge funds, sous contrats) : les quatre critères sont satisfaits. Titres financiers.',
          'Ventes programmatiques (Ripple → carnets d\'ordres d\'échange, ordres aveugles) : les critères 2 et 4 ont échoué. Les acheteurs secondaires n\'avaient pas de relation directe avec Ripple ni d\'attente raisonnable que Ripple spécifiquement entraîne leurs rendements. Pas des titres financiers.',
          'Autres distributions (rémunération d\'employés, subventions aux développeurs) : pas d\'investissement d\'argent (échec du critère 1). Pas des titres financiers.',
        ] },
        { kind: 'p', text: 'La décision a sapé la position de la SEC selon laquelle la classification d\'un jeton est valable à l\'échelle de l\'actif. Elle a introduit une dépendance au contexte : le même jeton peut être un titre dans une transaction et pas dans une autre. C\'est maintenant largement invoqué par les avocats de la défense dans les affaires de la SEC contre Coinbase, Kraken et Binance.' },
      ],
    },
    {
      id: 'structuring',
      heading: 'Structurer pour minimiser le risque',
      content: [
        { kind: 'p', text: 'Orientations pragmatiques pour toute équipe crypto exploitant un jeton américain ou exposé aux États-Unis :' },
        { kind: 'ol', items: [
          'Présumez que votre jeton est un titre financier à l\'émission. Levez des fonds institutionnellement sous Reg D 506(c), Reg S, Reg CF ou Reg A+. Acceptez les restrictions (investisseurs qualifiés, période de détention d\'1 an, informations à fournir) en échange de la clarté juridique.',
          'Planifiez la trajectoire de décentralisation. Documentez les jalons de gouvernance, la baisse du rôle de l\'équipe et la croissance de validateurs/opérateurs indépendants. Cela soutient l\'argument que les ventes sur le marché secondaire ne sont pas des titres.',
          'Contrôlez le marketing. Projections de prix, langage "accès anticipé", "récompenses" — ce sont des preuves Howey. Gardez les communications publiques axées sur l\'utilité, jamais sur l\'investissement.',
          'Géo-bloquez si nécessaire. Si l\'exposition réglementaire américaine est trop élevée, le géo-blocage actif (blocage IP + conditions générales + surveillance) est une atténuation défendable.',
          'Engagez un conseil avant le lancement, pas après. Les poursuites de la SEC sont coûteuses ; les règlements sont fréquents mais rarement bon marché. Un bon avocat en valeurs mobilières au stade de la conception est la meilleure dépense de votre budget.',
        ] },
        { kind: 'callout', tone: 'key', title: 'Appliquez Howey à votre jeton spécifique', text: 'Utilisez l\'arbre de décision "Mon jeton est-il un titre financier ?" pour parcourir les quatre critères avec votre contexte spécifique.' },
      ],
    },
  ],
  relatedTerms: ['Howey Test', 'SEC', 'SEC v. Ripple', 'Reg D', 'Reg S', 'Reg A+', 'Utility Token'],
  relatedTrees: ['howey'],
}

export const LEARNING_PATHS_FR: LearningPath[] = [MICA, XRPL_CUSTODY, HOWEY]

export function getLearningPathFr(id: string): LearningPath | undefined {
  return LEARNING_PATHS_FR.find((p) => p.id === id)
}
