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

// -----------------------------------------------------------------------------
// Parcours 4 — Liechtenstein Voie Rapide
// -----------------------------------------------------------------------------
const LIECHTENSTEIN: LearningPath = {
  id: 'liechtenstein-fast-track',
  icon: '🇱🇮',
  title: 'Liechtenstein Voie Rapide',
  subtitle: 'TVTG, FMA et le mod\u00e8le conteneur de token \u2014 pourquoi la plus petite juridiction de l\'EEE reste la voie la plus rapide vers un lancement r\u00e9gul\u00e9 en Europe.',
  duration: 'Lecture de 7 min',
  level: 'intermediate',
  jurisdictions: ['li', 'eu'],
  sections: [
    {
      id: 'why-liechtenstein',
      heading: 'Pourquoi le Liechtenstein, et pourquoi maintenant',
      content: [
        { kind: 'p', text: "Le Liechtenstein est une principaut\u00e9 de 40 000 habitants coinc\u00e9e entre la Suisse et l'Autriche. Il p\u00e8se bien au-del\u00e0 de sa taille dans la r\u00e9gulation crypto pour trois raisons : il a adopt\u00e9 la premi\u00e8re loi blockchain holistique d'Europe (la TVTG, janvier 2020), il se trouve dans l'Espace \u00e9conomique europ\u00e9en (EEE) de sorte que les licences obtiennent le passeport vers l'UE, et le r\u00e9gulateur (FMA) dispose d'une voie rapide document\u00e9e pour les entreprises blockchain \u2014 4 \u00e0 12 mois, contre 18+ mois pour la plupart des dossiers CASP MiCA dans l'UE." },
        { kind: 'callout', tone: 'key', title: 'Le pitch court', text: "Si vous avez besoin d'une licence passportable dans l'UE et que vous en avez besoin cette ann\u00e9e, le Liechtenstein est l'option par d\u00e9faut pour une \u00e9quipe bien pr\u00e9par\u00e9e. Les co\u00fbts comparables en \u00e8re MiCA sont 2-4\u00d7 inf\u00e9rieurs \u00e0 ceux de l'Allemagne ou de la France, et le r\u00e9gulateur r\u00e9pond r\u00e9ellement aux emails." },
        { kind: 'p', text: "Les compromis sont r\u00e9els : l'\u00e9cosyst\u00e8me liechtensteinois est petit (moins de prestataires, moins de recrutements), et post-MiCA, l'histoire de la voie rapide est moins spectaculaire qu'elle ne l'\u00e9tait avant 2024. Mais l'avantage central de rapidit\u00e9 a surv\u00e9cu \u00e0 MiCA, et plusieurs projets natifs XRPL (dont certaines int\u00e9grations RLUSD) choisissent encore LI comme juridiction de lancement UE." },
      ],
    },
    {
      id: 'tvtg-token-container',
      heading: 'TVTG et le mod\u00e8le conteneur de token',
      content: [
        { kind: 'p', text: "La TVTG (Token and Trusted Technology Service Provider Act) est structurellement diff\u00e9rente de MiCA. MiCA classe les tokens dans trois cases (EMT, ART, Autre) et d\u00e9rive les obligations de la case. La TVTG traite plut\u00f4t un token comme un \u00ab conteneur \u00bb qui peut repr\u00e9senter n'importe quel droit \u2014 un titre financier, une unit\u00e9 de monnaie \u00e9lectronique, une mati\u00e8re premi\u00e8re physique, une utilit\u00e9, une part de gouvernance, n'importe quoi. L'effet juridique du token est celui du droit sous-jacent." },
        { kind: 'p', text: "Concr\u00e8tement : si votre conteneur de token h\u00e9berge une part dans une entreprise, les r\u00e8gles de droit civil s'appliquent \u00e0 cette part, via le token, comme si le token \u00e9tait un certificat papier. On appelle cela la doctrine du \u00ab token comme interface linguistique vers les droits \u00bb. Cela permet \u00e0 la TVTG de coexister avec tous les autres domaines du droit sans les r\u00e9\u00e9crire." },
        { kind: 'callout', tone: 'info', title: 'Pourquoi c\'est important pour XRPL', text: "Le mod\u00e8le IOU / Trust Line de XRPL s'aligne presque 1:1 avec le mod\u00e8le conteneur de la TVTG. Plusieurs projets de tokenisation natifs XRPL utilisent LI pr\u00e9cis\u00e9ment parce que la primitive technique et la primitive juridique sont align\u00e9es." },
        { kind: 'p', text: "Pour les prestataires de services (l'autre moiti\u00e9 de la TVTG), la loi \u00e9num\u00e8re 10 cat\u00e9gories de Token Service Provider. Les plus importantes pour les startups crypto :" },
        { kind: 'ul', items: [
          "Token Issuer \u2014 \u00e9met des tokens sur une blockchain (enregistrement aupr\u00e8s de la FMA, revue fit-and-proper).",
          "Token Generator \u2014 cr\u00e9ation technique de tokens pour le compte d'autrui.",
          "Token Depositary / Custody \u2014 d\u00e9tient des tokens pour le compte de clients (le plus proche de la custody Art. 75 MiCA).",
          "Token Exchange \u2014 \u00e9change de tokens contre tokens ou fiat.",
          "Token Transfer \u2014 d\u00e9place des tokens entre comptes pour les clients.",
          "Physical Validator \u2014 v\u00e9rifie qu'un actif off-chain repr\u00e9sent\u00e9 par un token existe r\u00e9ellement.",
          "Identity Service Provider \u2014 KYC/LCB-FT pour les transactions sur tokens.",
        ] },
      ],
    },
    {
      id: 'fast-track-mechanics',
      heading: 'Comment la voie rapide fonctionne en pratique',
      content: [
        { kind: 'p', text: "La \u00ab voie rapide \u00bb n'est pas un programme officiel de la FMA \u2014 c'est le d\u00e9lai observ\u00e9 pour les candidats bien pr\u00e9par\u00e9s. Trois \u00e9l\u00e9ments rendent LI plus rapide que Paris, Francfort ou Dublin :" },
        { kind: 'h3', text: '1. Un seul r\u00e9gulateur, une seule porte' },
        { kind: 'p', text: "La FMA est une autorit\u00e9 unique et compacte d'environ 120 personnes. Votre dossier atterrit sur un seul bureau, pas trois. Contraste avec l'Allemagne, o\u00f9 BaFin + Bundesbank + Landesbank local interagissent, ou la France o\u00f9 l'AMF et l'ACPR se partagent les r\u00f4les." },
        { kind: 'h3', text: '2. Pr\u00e9-checks document\u00e9s' },
        { kind: 'p', text: "La FMA propose un processus de lettre de pr\u00e9-check. Pour des honoraires (\u223cCHF 3K\u201310K selon la complexit\u00e9), le r\u00e9gulateur examine votre mod\u00e8le d'affaires envisag\u00e9 et \u00e9met un avis non contraignant sur la cat\u00e9gorie TVTG ou la licence MiCA applicable. Cela supprime 90 % de l'incertitude de classification avant le d\u00e9p\u00f4t du dossier r\u00e9el." },
        { kind: 'h3', text: '3. Pas de substance locale minimum pour le d\u00e9p\u00f4t' },
        { kind: 'p', text: "Vous pouvez d\u00e9poser le dossier TVTG depuis l'\u00e9tranger et \u00e9tablir la pr\u00e9sence LI (bureau, directeur local, responsable LCB-FT) pendant l'instruction. Certaines juridictions (notamment la MAS de Singapour) exigent la substance avant le d\u00e9p\u00f4t." },
        { kind: 'callout', tone: 'warn', title: 'Mais vous DEVEZ avoir de la substance avant l\'autorisation', text: "Au moment o\u00f9 la FMA accorde la licence, vous devez disposer d'un vrai bureau, d'au moins un cadre dirigeant r\u00e9sident local et d'un responsable LCB-FT fit-and-proper. Pr\u00e9voyez environ CHF 150-250K/an pour l'\u00e9quipe sur place. LI n'est pas une bo\u00eete aux lettres." },
      ],
    },
    {
      id: 'cost-timeline',
      heading: 'Co\u00fbt et calendrier en pratique',
      content: [
        { kind: 'p', text: "Pour un Token Exchange Service Provider (l'\u00e9quivalent TVTG le plus proche d'une autorisation CASP d'\u00e9change MiCA) :" },
        {
          kind: 'table',
          headers: ['Jalon', 'Dur\u00e9e', 'Co\u00fbt'],
          rows: [
            ['Lettre de pr\u00e9-check', '4\u20138 semaines', 'CHF 3K\u201310K'],
            ['R\u00e9daction du dossier + conseil externe', '6\u201312 semaines', 'CHF 40K\u2013100K'],
            ['Instruction formelle FMA', '3\u20136 mois', 'CHF 20K de frais de d\u00e9p\u00f4t'],
            ['Octroi de la licence + d\u00e9marrage op\u00e9rationnel', '\u2014', '\u2014'],
            ['Total', '4\u20139 mois', 'CHF 70K\u2013200K'],
          ],
        },
        { kind: 'p', text: "\u00c0 comparer avec l'autorisation CASP MiCA en France (AMF) : d\u00e9lai typique de 12\u201318 mois, 150\u2013400 K\u20ac tout compris. En Allemagne (BaFin) : 15\u201324 mois, 200\u2013500 K\u20ac. Le Liechtenstein conserve un avantage de ~2-3\u00d7 en rapidit\u00e9 et en co\u00fbt sur la licence elle-m\u00eame." },
        { kind: 'callout', tone: 'info', title: 'Post-MiCA, le choix du passeport est cl\u00e9', text: "Un Token Exchange SP TVTG n'obtient PAS automatiquement le passeport en tant que CASP MiCA. Vous avez besoin d'une autorisation CASP MiCA explicite de la FMA en parall\u00e8le. Certaines soci\u00e9t\u00e9s exploitent une double licence TVTG + CASP MiCA depuis LI. Le dossier CASP est plus rapide en LI (6\u201310 mois) que dans les grandes juridictions UE et obtient le passeport vers les 27 \u00c9tats membres." },
      ],
    },
    {
      id: 'when-not-to-choose-li',
      heading: "Quand le Liechtenstein N'EST PAS le bon choix",
      content: [
        { kind: 'p', text: "LI est la voie la plus rapide pour la rapidit\u00e9 de licence. Ce n'est pas toujours le bon foyer \u00e0 long terme. Envisagez la Suisse (FINMA) \u00e0 la place si :" },
        { kind: 'ul', items: [
          'Vous avez besoin de services bancaires complets (la licence bancaire FINMA est plus forte que l\'\u00e9quivalent FinTech LI \u2014 bien que LI dispose maintenant de son propre cadre FinTech).',
          'Vous vendez au march\u00e9 mondial de la banque priv\u00e9e \u2014 la marque CH p\u00e8se davantage.',
          'Vous voulez un vivier de talents plus profond \u2014 les \u00e9cosyst\u00e8mes de Zurich et Zoug sont nettement plus grands.',
        ] },
        { kind: 'p', text: "Envisagez l'Irlande ou l'Allemagne \u00e0 la place si :" },
        { kind: 'ul', items: [
          'Vous pr\u00e9voyez un marketing UE massif et avez besoin d\'un r\u00e9gulateur \u00e0 la marque reconnaissable (BaFin / CBI).',
          'Votre plus grand march\u00e9 est l\'Allemagne ou la France \u2014 avoir votre licence dans la juridiction domestique simplifie l\'interaction r\u00e9glementaire.',
          'Vous avez besoin d\'une grande \u00e9quipe locale / d\'embaucher 50+ personnes \u2014 LI est plafonn\u00e9 \u00e0 ~40K habitants.',
        ] },
        { kind: 'callout', tone: 'key', title: 'Un sch\u00e9ma fr\u00e9quent', text: "Lancez l'entit\u00e9 r\u00e9gul\u00e9e en LI pour la rapidit\u00e9, puis obtenez le passeport et \u00e9tablissez un bureau marketing / support \u00e0 Dublin ou Paris pour l'\u00e9chelle. Cela combine la rapidit\u00e9 r\u00e9glementaire de LI avec la port\u00e9e de march\u00e9 des grands hubs UE." },
      ],
    },
  ],
  relatedTerms: ['TVTG', 'MiCA', 'CASP', 'FMA', 'EMI'],
  relatedTrees: ['jurisdiction'],
}

// -----------------------------------------------------------------------------
// Parcours 5 — US Crypto 101
// -----------------------------------------------------------------------------
const US_CRYPTO_101: LearningPath = {
  id: 'us-crypto-101',
  icon: '🇺🇸',
  title: 'US Crypto 101',
  subtitle: 'La mosa\u00efque f\u00e9d\u00e9ral / \u00c9tats, la guerre de territoire SEC vs CFTC, la base BSA/FinCEN et le basculement du CLARITY Act de 2025.',
  duration: 'Lecture de 10 min',
  level: 'beginner',
  jurisdictions: ['us'],
  sections: [
    {
      id: 'no-single-regulator',
      heading: "Les \u00c9tats-Unis n'ont pas de r\u00e9gulateur crypto unique",
      content: [
        { kind: 'p', text: "Si vous venez de l'UE et attendez un \u00ab MiCA am\u00e9ricain \u00bb, arr\u00eatez de chercher \u2014 il n'y en a pas. La supervision crypto aux \u00c9tats-Unis est partag\u00e9e entre au moins cinq organismes f\u00e9d\u00e9raux et 50+ r\u00e9gulateurs d'\u00c9tat. Chacun d\u00e9tient une pi\u00e8ce du puzzle, et aucun n'a pleine autorit\u00e9. Comprendre quelle agence se soucie de quoi est la premi\u00e8re \u00e9tape pour op\u00e9rer l\u00e9galement." },
        {
          kind: 'table',
          headers: ['Agence', 'Juridiction', 'Ce qu\'elle r\u00e9gule'],
          rows: [
            ['SEC', 'F\u00e9d\u00e9rale', 'Titres financiers \u2014 offres de tokens, plateformes n\u00e9gociant des titres'],
            ['CFTC', 'F\u00e9d\u00e9rale', 'Mati\u00e8res premi\u00e8res \u2014 Bitcoin, Ether post-2023, d\u00e9riv\u00e9s'],
            ['FinCEN', 'F\u00e9d\u00e9rale (Tr\u00e9sor)', 'LCB-FT / BSA \u2014 entreprises de services financiers'],
            ['OCC', 'F\u00e9d\u00e9rale (Tr\u00e9sor)', 'Chartes bancaires nationales \u2014 soci\u00e9t\u00e9s de trust (ex. Anchorage)'],
            ['R\u00e9gulateurs d\'\u00c9tat', '\u00c9tat', 'Transmission de fonds (MTL), titres (lois blue-sky), protection des consommateurs'],
            ['NYDFS', '\u00c9tat (NY)', 'BitLicense, chartes NY Trust \u2014 fixe de facto la barre'],
          ],
        },
        { kind: 'callout', tone: 'key', title: 'Pourquoi c\'est important', text: "Une seule activit\u00e9 crypto peut d\u00e9clencher simultan\u00e9ment la SEC, FinCEN, et 48 MTL d'\u00c9tat. La plupart des proc\u00e8s crypto am\u00e9ricains ne portent pas sur \u00ab la crypto est-elle l\u00e9gale ? \u00bb mais sur \u00ab quelle agence a juridiction ? \u00bb. Conna\u00eetre le d\u00e9coupage \u00e9vite des mois de travail gaspill\u00e9." },
      ],
    },
    {
      id: 'sec-vs-cftc',
      heading: 'SEC vs CFTC \u2014 la question du titre financier',
      content: [
        { kind: 'p', text: "Le droit f\u00e9d\u00e9ral crypto commence par une question : ce token est-il un titre financier, une mati\u00e8re premi\u00e8re, ou autre chose ? Le test Howey (Cour supr\u00eame 1946) r\u00e9pond \u00e0 la question du titre financier, et c'est le test en quatre crit\u00e8res le plus important de la crypto :" },
        { kind: 'ol', items: [
          "Investissement d'argent \u2014 l'acheteur c\u00e8de-t-il du cash ou une autre valeur ?",
          "Dans une entreprise commune \u2014 l'acheteur rejoint-il un pool d'investisseurs ?",
          "Avec une attente de profit \u2014 l'acheteur s'attend-il raisonnablement \u00e0 des rendements ?",
          "Uniquement des efforts d'autrui \u2014 quelqu'un d'autre fait-il tourner l'affaire et g\u00e9n\u00e8re-t-il la valeur ?",
        ] },
        { kind: 'p', text: "Les quatre doivent \u00eatre remplis. Un seul \u00e9chec et ce n'est pas un titre financier. C'est pourquoi SEC v. Ripple (juillet 2023) a jug\u00e9 que les ventes secondaires de XRP ne sont pas des titres \u2014 le crit\u00e8re \u00ab uniquement des efforts d'autrui \u00bb \u00e9choue en n\u00e9gociation secondaire." },
        { kind: 'h3', text: 'Si SEC : c\'est un titre financier' },
        { kind: 'p', text: "Vous devez enregistrer l'offre (d\u00e9p\u00f4t public) ou qualifier pour une exemption \u2014 Reg D (placement priv\u00e9), Reg S (offshore), Reg A+ (mini-IPO). Les plateformes de n\u00e9gociation qui listent des titres ont besoin de licences SEC broker-dealer + ATS (Alternative Trading System). Sanctions pour \u00e9mission non enregistr\u00e9e : disgorgement, amendes, cease-and-desist." },
        { kind: 'h3', text: 'Si CFTC : c\'est une mati\u00e8re premi\u00e8re' },
        { kind: 'p', text: "Le Bitcoin est une mati\u00e8re premi\u00e8re au sens du Commodity Exchange Act. Ether a \u00e9t\u00e9 confirm\u00e9 comme mati\u00e8re premi\u00e8re \u00e0 des fins de d\u00e9riv\u00e9s. Les mati\u00e8res premi\u00e8res font face \u00e0 des r\u00e8gles plus l\u00e9g\u00e8res pour la n\u00e9gociation au comptant \u2014 principalement anti-fraude et anti-manipulation. Les d\u00e9riv\u00e9s (futures, swaps, options) n\u00e9cessitent des plateformes enregistr\u00e9es CFTC." },
        { kind: 'callout', tone: 'warn', title: 'La guerre de territoire \u00e9tait r\u00e9elle', text: "La SEC de l'\u00e8re Gensler a revendiqu\u00e9 sa juridiction sur la plupart des tokens. Post-2024, les priorit\u00e9s de l'administration ont chang\u00e9. Le CLARITY Act (vot\u00e9 en 2025) s\u00e9pare formellement le march\u00e9 entre la SEC (titres) et la CFTC (mati\u00e8res premi\u00e8res num\u00e9riques) \u2014 mais de nombreux tokens atterrissent encore en zones grises." },
      ],
    },
    {
      id: 'clarity-act',
      heading: 'Le CLARITY Act de 2025',
      content: [
        { kind: 'p', text: "Le Digital Asset Market Clarity Act of 2025 est ce qui se rapproche le plus d'une loi crypto compl\u00e8te aux \u00c9tats-Unis. Il ne remplace pas la SEC/CFTC \u2014 il oriente les tokens vers l'une ou l'autre selon un nouveau test : le test de la \u00ab blockchain mature \u00bb." },
        { kind: 'h3', text: 'Blockchain mature' },
        { kind: 'p', text: "Une blockchain est \u00ab mature \u00bb si le r\u00e9seau sous-jacent est suffisamment d\u00e9centralis\u00e9, qu'aucune personne ou groupe contr\u00f4l\u00e9 ne peut mat\u00e9riellement alt\u00e9rer son fonctionnement, et que tous les d\u00e9tenteurs de tokens ont un acc\u00e8s \u00e9gal. Les tokens de blockchain mature sont des mati\u00e8res premi\u00e8res num\u00e9riques sous CFTC. Les tokens non matures restent des titres financiers sous SEC." },
        { kind: 'p', text: "Cons\u00e9quences pratiques :" },
        { kind: 'ul', items: [
          'Bitcoin, Ether \u2014 matures \u2192 mati\u00e8res premi\u00e8res CFTC',
          'XRP \u2014 les tribunaux ont d\u00e9j\u00e0 trait\u00e9 les ventes secondaires comme des non-titres en 2023. Le CLARITY Act renforce cela en orientant XRP vers la CFTC pour le comptant.',
          "Tokens nouvellement lanc\u00e9s \u2014 g\u00e9n\u00e9ralement pas encore matures \u2192 titres SEC jusqu'\u00e0 d\u00e9centralisation du r\u00e9seau.",
          "Clause de transition \u2014 un token peut passer de la supervision SEC \u00e0 la CFTC \u00e0 mesure que le r\u00e9seau m\u00fbrit.",
        ] },
        { kind: 'callout', tone: 'info', title: 'Interactions avec MiCA', text: "Le CLARITY Act est similaire \u00e0 la cat\u00e9gorie \u00ab Autre crypto-actif \u00bb de MiCA pour les tokens matures. Pour les \u00e9metteurs UE regardant le march\u00e9 am\u00e9ricain, le CLARITY Act cr\u00e9e une trajectoire plus pr\u00e9visible que le r\u00e9gime pr\u00e9c\u00e9dent bas\u00e9 uniquement sur la sanction." },
      ],
    },
    {
      id: 'fincen-bsa',
      heading: 'FinCEN et le BSA \u2014 la base LCB-FT',
      content: [
        { kind: 'p', text: "Sous le Bank Secrecy Act (BSA), toute Money Services Business (MSB) doit s'enregistrer aupr\u00e8s de FinCEN, mettre en place un programme LCB-FT, cribler contre les sanctions OFAC et soumettre des Suspicious Activity Reports (SAR). Pour la crypto, le statut MSB est d\u00e9clench\u00e9 par :" },
        { kind: 'ul', items: [
          "Accepter et transmettre de la monnaie, y compris crypto \u2014 la plupart des \u00e9changes, prestataires de custody, la plupart des applications de paiement",
          'Convertir entre crypto et fiat, ou crypto contre crypto, pour des clients',
          "H\u00e9berger des services de wallet o\u00f9 vous d\u00e9tenez les cl\u00e9s",
        ] },
        { kind: 'p', text: "Les fournisseurs de wallets non-custodial, les mineurs et la plupart des protocoles DeFi bas\u00e9s sur smart contracts ne sont pas des MSB (orientations FinCEN 2013, 2019)." },
        { kind: 'h3', text: 'Ce que le statut MSB exige' },
        { kind: 'ul', items: [
          "Enregistrement FinCEN (gratuit) dans les 180 jours suivant le d\u00e9marrage de l'activit\u00e9",
          "Programme LCB-FT \u00e9crit avec un responsable conformit\u00e9 d\u00e9sign\u00e9",
          'Customer Identification Programme (CIP) \u2014 KYC',
          'Criblage des sanctions OFAC (liste SDN, sanctions sectorielles)',
          'Travel Rule \u2014 partage des infos exp\u00e9diteur + destinataire pour les transferts \u2265 $3K',
          'D\u00e9p\u00f4t de SAR dans les 30 jours suivant la d\u00e9tection d\'une activit\u00e9 suspecte',
        ] },
        { kind: 'callout', tone: 'key', title: 'FinCEN est f\u00e9d\u00e9ral \u2014 les MTL sont d\'\u00c9tat', text: "L'enregistrement MSB est un d\u00e9p\u00f4t f\u00e9d\u00e9ral. Mais pour op\u00e9rer r\u00e9ellement dans chaque \u00c9tat, il vous faut le MTL de cet \u00c9tat. Les deux sont s\u00e9par\u00e9s \u2014 et la mosa\u00efque des MTL est de loin le fardeau le plus lourd." },
      ],
    },
    {
      id: 'state-patchwork',
      heading: 'La mosa\u00efque des MTL par \u00c9tat',
      content: [
        { kind: 'p', text: "48 \u00c9tats sur 50 exigent une Money Transmitter Licence pour quiconque transmet de l'argent (y compris crypto) pour le compte d'utilisateurs. Chaque \u00c9tat a sa propre candidature, ses honoraires, sa caution et ses exigences de conformit\u00e9. Obtenir les MTL dans les 48 \u00c9tats co\u00fbte typiquement 500 K$ \u00e0 2 M$ et prend 2 \u00e0 4 ans." },
        { kind: 'h3', text: 'La barre la plus haute : la BitLicense de New York' },
        { kind: 'p', text: "Le NYDFS a introduit la BitLicense en 2015. C'est le r\u00e9gime d'\u00c9tat am\u00e9ricain le plus strict et \u2014 parce que NY est le plus grand march\u00e9 financier \u2014 fixe de facto la norme. Obtenir une BitLicense co\u00fbte 100 K$+ en frais de dossier et 12 mois et plus. Une fois accord\u00e9e, vous \u00eates tenu \u00e0 des standards de capital, cybers\u00e9curit\u00e9, custody et reporting plus stricts que la plupart des r\u00e9gimes UE. Alternative : vous pouvez postuler pour un NYDFS Trust Charter (mod\u00e8le Anchorage) \u2014 plus lourd en amont mais donne des pouvoirs complets de type bancaire." },
        { kind: 'h3', text: 'Strat\u00e9gies face \u00e0 la mosa\u00efque des MTL' },
        { kind: 'ul', items: [
          "Recruter un partenaire licenci\u00e9 \u2014 router les transactions via une soci\u00e9t\u00e9 qui d\u00e9tient d\u00e9j\u00e0 les MTL. Abandonne une partie de la marge mais \u00e9vite le grind de 2 ans d'obtention de licences.",
          'D\u00e9ploiement par phases \u2014 lancer dans quelques \u00c9tats avec les plus gros march\u00e9s (CA, NY, TX, FL) en premier, d\u00e9ployer g\u00e9ographiquement.',
          "\u00c9viter les \u00c9tats-Unis au d\u00e9part \u2014 beaucoup de startups crypto s\u00e9rieuses n'attaquent le march\u00e9 am\u00e9ricain qu'apr\u00e8s avoir \u00e9tabli une pr\u00e9sence UE/APAC. Le fardeau MTL en est la raison.",
          "Charte f\u00e9d\u00e9rale (OCC Trust) \u2014 mod\u00e8le d'Anchorage. Remplace les MTL d'\u00c9tat par une charte unique de trust bank national OCC. Prend 18-24 mois et 5 M$+ mais c'est la voie la plus propre.",
        ] },
        { kind: 'callout', tone: 'warn', title: 'Op\u00e9rer sans MTL est p\u00e9nal', text: "Contrairement \u00e0 l'absence d'enregistrement aupr\u00e8s de la SEC (civil), la transmission de fonds non licenci\u00e9e peut \u00eatre un crime f\u00e9d\u00e9ral sous 18 USC \u00a71960. L'application de la loi est r\u00e9elle : Binance, BitMEX et d'autres ont fait face \u00e0 des poursuites p\u00e9nales en partie pour cela." },
      ],
    },
    {
      id: 'practical-playbook',
      heading: 'Un playbook pratique pour 2026',
      content: [
        { kind: 'p', text: "Pour une startup crypto ciblant des utilisateurs am\u00e9ricains en 2026 :" },
        { kind: 'ol', items: [
          "\u00c9tape 1 \u2014 Classification du token. Ex\u00e9cutez le test Howey vous-m\u00eame + obtenez l'opinion d'un avocat. D\u00e9cidez : titre financier, mati\u00e8re premi\u00e8re ou utilit\u00e9 non financi\u00e8re. Cette d\u00e9cision fa\u00e7onne tout ce qui suit.",
          "\u00c9tape 2 \u2014 Cartographier les activit\u00e9s vers les agences. Pour chaque activit\u00e9 (\u00e9mission, trading, custody, paiement), identifiez quel r\u00e9gulateur f\u00e9d\u00e9ral est concern\u00e9 + quelles exigences MTL d'\u00c9tat s'appliquent.",
          "\u00c9tape 3 \u2014 Choisir charte f\u00e9d\u00e9rale OU MTL d'\u00c9tat. Si vous pr\u00e9voyez une couverture am\u00e9ricaine compl\u00e8te et pouvez vous permettre 18-24 mois : OCC Trust (propre). Si vous pouvez \u00e9taler : MTL dans les 10 premiers \u00c9tats + MSB FinCEN d'abord.",
          "\u00c9tape 4 \u2014 Traiter NY s\u00e9par\u00e9ment. BitLicense ou charte Trust \u2014 pr\u00e9voyez 12-18 mois. Faites-le t\u00f4t ; un lancement NY tardif signifie reconstruire votre stack de conformit\u00e9.",
          "\u00c9tape 5 \u2014 Construire l'\u00e9quipe conformit\u00e9. FinCEN exige un responsable conformit\u00e9 d\u00e9sign\u00e9 ; le NYDFS exige un Chief Compliance Officer qualifi\u00e9. Comptez 300 K$+/an pour un recrutement senior avec une exp\u00e9rience pr\u00e9alable en MSB crypto.",
        ] },
        { kind: 'callout', tone: 'key', title: '\u00c9tape suivante', text: "Lancez l'arbre de d\u00e9cision \u00ab Mon jeton est-il un titre financier ? \u00bb pour obtenir un verdict Howey concret sur votre projet." },
      ],
    },
  ],
  relatedTerms: ['SEC', 'CFTC', 'FinCEN', 'MSB', 'MTL', 'BitLicense', 'Howey Test', 'BSA', 'SAR'],
  relatedTrees: ['howey', 'jurisdiction'],
}

// -----------------------------------------------------------------------------
// Parcours 6 — Cadres pour Stablecoins
// -----------------------------------------------------------------------------
const STABLECOIN_FRAMEWORKS: LearningPath = {
  id: 'stablecoin-frameworks',
  icon: '💵',
  title: 'Cadres pour Stablecoins',
  subtitle: "MiCA EMT/ART dans l'UE, le GENIUS Act de 2025 aux \u00c9tats-Unis, et comment MAS, HKMA, FMA et d'autres se comparent \u2014 la premi\u00e8re pile r\u00e9glementaire vraiment mondiale.",
  duration: 'Lecture de 9 min',
  level: 'intermediate',
  jurisdictions: ['eu', 'us', 'sg', 'hk', 'li'],
  sections: [
    {
      id: 'why-stablecoins-first',
      heading: "Pourquoi les stablecoins ont \u00e9t\u00e9 r\u00e9gul\u00e9s en premier",
      content: [
        { kind: 'p', text: "De toutes les cat\u00e9gories crypto, les stablecoins sont les plus lourdement r\u00e9gul\u00e9s \u2014 et dans le plus grand nombre de juridictions. Trois raisons : ils ressemblent \u00e0 de la monnaie (ils pr\u00e9tendent une valeur stable adoss\u00e9e au fiat), ils passent \u00e0 l'\u00e9chelle comme la monnaie (USDT et USDC traitent plus de volume quotidien que Visa sur certains couloirs), et ils \u00e9chouent comme de la monnaie \u2014 l'effondrement Terra / UST en mai 2022 a d\u00e9truit 40 G$ en 48 heures." },
        { kind: 'p', text: "Les r\u00e9gulateurs ont compris le message. L'UE a adopt\u00e9 MiCA avec un cadre EMT/ART entr\u00e9 en vigueur en juin 2024. Les \u00c9tats-Unis ont adopt\u00e9 le GENIUS Act en 2025 \u2014 leur premi\u00e8re loi crypto f\u00e9d\u00e9rale compl\u00e8te, centr\u00e9e sur les stablecoins de paiement. Singapour, Hong Kong, le Japon et le Royaume-Uni ont tous des cadres stablecoins en vigueur ou en passage d'ici 2026." },
        { kind: 'callout', tone: 'key', title: 'Ce que couvre ce parcours', text: "Les cinq r\u00e9gimes que vous avez le plus de chances de rencontrer \u2014 UE (MiCA), \u00c9tats-Unis (GENIUS Act), Singapour (MAS), Hong Kong (HKMA), Liechtenstein (TVTG / MiCA). Pour chacun : la licence, les r\u00e9serves, les r\u00e8gles de divulgation et la question \u00ab un stablecoin \u00e9tranger peut-il circuler ? \u00bb." },
      ],
    },
    {
      id: 'mica-emt-art',
      heading: 'MiCA \u2014 EMT et ART',
      content: [
        { kind: 'p', text: "MiCA scinde les stablecoins en deux selon ce qu'ils r\u00e9f\u00e9rencent :" },
        { kind: 'h3', text: 'Jeton de monnaie \u00e9lectronique (EMT)' },
        { kind: 'p', text: "Adoss\u00e9 \u00e0 une seule monnaie officielle (EUR, USD, GBP\u2026). USDC et RLUSD sont des EMT. L'\u00e9metteur doit \u00eatre un \u00e9tablissement de monnaie \u00e9lectronique (EMI) agr\u00e9\u00e9 ou un \u00e9tablissement de cr\u00e9dit. R\u00e8gles :" },
        { kind: 'ul', items: [
          "R\u00e9serves 1:1 en actifs hautement liquides \u00e0 faible risque, s\u00e9gr\u00e9gu\u00e9es",
          "Notification (et non approbation) du livre blanc \u00e0 l'ANC",
          "Reporting quotidien des r\u00e9serves ; audit trimestriel",
          "Droit de rachat au pair, \u00e0 tout moment, pour tout d\u00e9tenteur",
          "Aucun int\u00e9r\u00eat vers\u00e9 aux d\u00e9tenteurs (ce sont des d\u00e9p\u00f4ts, pas des investissements)",
        ] },
        { kind: 'h3', text: 'Jeton adoss\u00e9 \u00e0 des actifs (ART)' },
        { kind: 'p', text: "Adoss\u00e9 \u00e0 un panier ou \u00e0 une r\u00e9f\u00e9rence non-fiat \u2014 multi-devises, adoss\u00e9 \u00e0 des mati\u00e8res premi\u00e8res ou mixte. L'\u00e9metteur a besoin d'une autorisation de l'ANC (barre plus haute que la notification EMT). R\u00e8gles :" },
        { kind: 'ul', items: [
          "R\u00e9serves proportionnelles au panier de r\u00e9f\u00e9rence",
          "Approbation du livre blanc (examen pr\u00e9-lancement par l'ANC)",
          "Gouvernance robuste + politique de conflits d'int\u00e9r\u00eats",
          "Plan de gestion de liquidit\u00e9 \u2014 que se passe-t-il si 10 % des d\u00e9tenteurs rach\u00e8tent en une journ\u00e9e ?",
        ] },
        { kind: 'h3', text: 'Jeton significatif \u2014 r\u00e8gles tier 2' },
        { kind: 'p', text: "Si un EMT ou ART franchit des seuils (capitalisation > 5 G\u20ac, utilisateurs > 10 M, transactions > 2,5 M/jour), la supervision de la BCE s'enclenche avec des exigences plus strictes : coussins de capital, stress tests et potentiellement des limites de diversification g\u00e9ographique des r\u00e9serves hors UE." },
      ],
    },
    {
      id: 'genius-act',
      heading: '\u00c9tats-Unis \u2014 le GENIUS Act de 2025',
      content: [
        { kind: 'p', text: "Le GENIUS Act (Guiding and Establishing National Innovation for US Stablecoins) a \u00e9t\u00e9 sign\u00e9 en loi f\u00e9d\u00e9rale en juillet 2025 \u2014 le premier r\u00e9gime stablecoin am\u00e9ricain complet. Points cl\u00e9s :" },
        { kind: 'ul', items: [
          "Cr\u00e9e une charte f\u00e9d\u00e9rale de stablecoin de paiement avec l'OCC comme r\u00e9gulateur",
          'Double voie : les gros \u00e9metteurs (10 G$+) doivent utiliser la charte f\u00e9d\u00e9rale ; les plus petits peuvent utiliser les r\u00e9gulateurs d\'\u00c9tat',
          "R\u00e9serves 1:1 en cash, bons du Tr\u00e9sor \u2264 93 jours, ou repo sur Treasuries \u2014 pas de papier commercial, pas d'obligations d'entreprise",
          "Divulgation publique mensuelle de la composition des r\u00e9serves (audit\u00e9e par CPA)",
          'Pas de stablecoins de paiement \u00e0 rendement autoris\u00e9s \u2014 cela tue l\'un des plus gros mod\u00e8les d\'affaires de stablecoins am\u00e9ricains d\'avant GENIUS',
          '\u00c9metteurs \u00e9trangers (USDC \u00e9mis en UE par Circle, etc.) besoin de reconnaissance d\'\u00e9quivalence de cadre pour circuler aux \u00c9tats-Unis',
        ] },
        { kind: 'callout', tone: 'warn', title: 'Interaction avec la BitLicense et les MTL', text: "GENIUS ne remplace PAS le r\u00e9gime MTL d'\u00c9tat ni la BitLicense de NY. Un Circle ou un Paxos a toujours besoin \u00e0 la fois de sa charte GENIUS et des licences au niveau \u00c9tat. En pratique, la charte GENIUS devient la \u00ab licence m\u00e8re \u00bb avec un enregistrement d'\u00c9tat simplifi\u00e9 l\u00e0 o\u00f9 les \u00c9tats reconnaissent le cadre f\u00e9d\u00e9ral." },
        { kind: 'p', text: "Impact de march\u00e9 visible d\u00e9but 2026 : USDC a l'adaptation structurelle la plus propre (double MiCA EMT + charte GENIUS). Paxos et Circle USDC Mint Europe op\u00e8rent proprement des deux c\u00f4t\u00e9s. USDT est rest\u00e9 hors de GENIUS sur 2025-2026 en raison de probl\u00e8mes de composition de r\u00e9serves." },
      ],
    },
    {
      id: 'asia-frameworks',
      heading: 'Singapour, Hong Kong, Japon',
      content: [
        { kind: 'h3', text: 'Singapour \u2014 cadre MAS SCS' },
        { kind: 'p', text: "Le cadre MAS Stablecoin (SCS) est entr\u00e9 en vigueur en 2024. Il s'applique aux stablecoins adoss\u00e9s au SGD et \u00e0 une monnaie du \u00ab Groupe des 10 \u00bb. Exigences :" },
        { kind: 'ul', items: [
          "R\u00e9serves minimales : cash + actifs s\u00fbrs \u00e0 tr\u00e8s court terme. Similaire \u00e0 MiCA EMT.",
          "L'\u00e9metteur doit d\u00e9tenir une licence MPI (Major Payment Institution) avec permission Stored Value Facility.",
          "Fen\u00eatre de r\u00e8glement de 3 jours : tout utilisateur doit pouvoir obtenir un rachat dans les 3 jours ouvr\u00e9s au pair.",
          "Divulgation mensuelle des r\u00e9serves, audit annuel.",
          "Le label \u00ab Stablecoin \u00bb est r\u00e9glementaire \u2014 seuls les stablecoins \u00e9mis par MAS r\u00e9pondant au cadre peuvent l'utiliser. Les tokens non r\u00e9gul\u00e9s adoss\u00e9s au USD doivent utiliser un autre nom.",
        ] },
        { kind: 'h3', text: 'Hong Kong \u2014 Stablecoin Ordinance 2025' },
        { kind: 'p', text: "L'ordonnance stablecoin de la HKMA (en vigueur depuis ao\u00fbt 2025) exige que tout \u00e9metteur de stablecoins adoss\u00e9s au fiat faisant affaire \u00e0 HK d\u00e9tienne une licence sp\u00e9cifique HKMA stablecoin. Les r\u00e8gles de r\u00e9serves calquent MiCA EMT. Les \u00e9metteurs non-HK ont besoin d'une reconnaissance \u00e9quivalente de licence. L'ordonnance a d\u00e9clench\u00e9 le d\u00e9ploiement de stablecoins adoss\u00e9s au HKD pour le r\u00e8glement institutionnel (notamment via les pilotes ASPIRe / ZA Bank)." },
        { kind: 'h3', text: 'Japon \u2014 FSA Payment Services Act' },
        { kind: 'p', text: "La FSA japonaise exige que les \u00e9metteurs de stablecoins soient une banque licenci\u00e9e, une soci\u00e9t\u00e9 de trust ou un prestataire de services de transfert de fonds. R\u00e9serves : 50 %+ en cash, le reste en actifs \u00e0 court terme hautement liquides. Les \u00e9metteurs doivent utiliser une entit\u00e9 r\u00e9gul\u00e9e par la FSA japonaise. Les stablecoins \u00e9trangers ne peuvent pas circuler au Japon sans un partenaire \u00e9metteur domestique." },
      ],
    },
    {
      id: 'comparison',
      heading: 'Comparatif c\u00f4te \u00e0 c\u00f4te',
      content: [
        {
          kind: 'table',
          headers: ['Axe', 'UE (MiCA EMT)', '\u00c9.-U. (GENIUS)', 'Singapour (SCS)', 'Hong Kong', 'Japon'],
          rows: [
            ['Licence', 'EMI ou \u00e9t. cr\u00e9dit', 'Charte OCC + MTL d\'\u00c9tat', 'MPI + SVF', 'Licence HKMA stablecoin', 'Banque / trust / FTSP'],
            ['R\u00e9serves', '1:1 cash + HQLA', '1:1 cash + T-bills \u2264 93j', 'Cash + liquides s\u00fbrs', 'Cash + HQLA (type MiCA)', '\u226550 % cash'],
            ['Rendement aux d\u00e9tenteurs', 'Interdit', 'Interdit', 'Autoris\u00e9 si licenci\u00e9', 'Interdit', 'Interdit'],
            ['Fen\u00eatre de rachat', 'Au pair, \u00e0 tout moment', 'Au pair, \u00e0 tout moment', '3 jours ouvr\u00e9s', 'Au pair, \u00e0 tout moment', 'Prompt'],
            ['\u00c9metteurs \u00e9trangers', 'Autorisation MiCA requise', 'Reconnaissance d\'\u00e9quivalence requise', 'Peut circuler si adoss\u00e9 \u00e0 une devise support\u00e9e', 'Licence HK requise', 'Partenaire \u00e9metteur domestique requis'],
            ['R\u00e8gles tier significatif', 'Oui (supervis\u00e9 BCE)', 'Oui (>10 G$ = f\u00e9d\u00e9ral)', 'Oui (bas\u00e9 sur seuils)', 'Oui (syst\u00e9mique)', '\u2014'],
          ],
        },
        { kind: 'callout', tone: 'info', title: 'La convergence est r\u00e9elle', text: "Les cinq cadres diff\u00e8rent sur les d\u00e9tails mais convergent sur les fondamentaux : r\u00e9serves 1:1, cash + actifs s\u00fbrs \u00e0 court terme, s\u00e9gr\u00e9gation, rachat au pair, divulgation mensuelle, interdiction des int\u00e9r\u00eats. Un stablecoin qui r\u00e9pond aux standards MiCA EMT est \u00e0 ~90 % du chemin vers la conformit\u00e9 GENIUS / MAS SCS / HK." },
      ],
    },
    {
      id: 'xrpl-stablecoins',
      heading: 'Comment cela se traduit sur XRPL',
      content: [
        { kind: 'p', text: "Le mod\u00e8le IOU / Trust Line natif de XRPL est un substrat quasi id\u00e9al pour des stablecoins r\u00e9gul\u00e9s. Un compte \u00e9metteur est un \u00ab point d'\u00e9mission adoss\u00e9 \u00e0 des r\u00e9serves \u00bb naturel. Les trust lines donnent aux utilisateurs des soldes on-chain qui sont des cr\u00e9ances directes contre l'\u00e9metteur. Les drapeaux freeze, globalFreeze et RequireAuth offrent des contr\u00f4les de conformit\u00e9 on-chain que les stablecoins ERC-20 r\u00e9pliquent via des fonctions admin." },
        { kind: 'p', text: "Impl\u00e9mentation de r\u00e9f\u00e9rence : RLUSD (le stablecoin USD de Ripple) \u00e9mis par Standard Custody & Trust Company, chart\u00e9 par le NYDFS. Lanc\u00e9 en d\u00e9cembre 2024 sur XRPL Mainnet + Ethereum. Trajectoire MiCA EMT : l'entit\u00e9 UE de Ripple (Ripple Labs Europe AG) se positionne pour l'autorisation EMT." },
        { kind: 'h3', text: 'Sch\u00e9mas de conception pour conformit\u00e9 multi-r\u00e9gimes' },
        { kind: 'ul', items: [
          "Drapeau RequireAuth sur le compte \u00e9metteur \u2014 seules les adresses KYC'\u00e9es peuvent d\u00e9tenir le token. S'aligne proprement sur l'exigence de convenance de l'Art. 5 MiCA.",
          "Freeze par compte \u2014 blocages LCB-FT s\u00e9lectifs sans perturber les autres d\u00e9tenteurs. S'aligne sur les exigences GENIUS de gel en cas de hit OFAC.",
          "globalFreeze \u2014 frein d'urgence pour incident syst\u00e9mique. S'aligne sur les plans de gestion de liquidit\u00e9 MiCA ART.",
          "R\u00e9serves 1:1 d\u00e9tenues off-chain, audit\u00e9es mensuellement \u2014 comme l'exige chaque r\u00e9gime.",
          "Soldes IOU comme preuve on-chain de passif \u2014 permet la preuve de r\u00e9serves on-chain avec un seul appel get_account_lines par compte.",
        ] },
        { kind: 'callout', tone: 'key', title: 'Pourquoi le design XRPL s\'aligne avec la r\u00e9gulation', text: "La plupart des blockchains (Ethereum, Solana) font tourner les stablecoins comme des smart contracts avec des cl\u00e9s admin \u2014 freeze, mint, burn impl\u00e9ment\u00e9s en code. XRPL les fait tourner comme des primitives protocolaires avec des drapeaux int\u00e9gr\u00e9s au registre. Les contr\u00f4les r\u00e9glementaires que veulent les r\u00e9gulateurs, XRPL les a d\u00e9j\u00e0." },
      ],
    },
  ],
  relatedTerms: ['EMT', 'ART', 'MiCA', 'GENIUS Act', 'RLUSD', 'EMI', 'MAS', 'HKMA', 'Trust Line'],
  relatedTrees: ['jurisdiction'],
}

export const LEARNING_PATHS_FR: LearningPath[] = [MICA, XRPL_CUSTODY, HOWEY, LIECHTENSTEIN, US_CRYPTO_101, STABLECOIN_FRAMEWORKS]

export function getLearningPathFr(id: string): LearningPath | undefined {
  return LEARNING_PATHS_FR.find((p) => p.id === id)
}
