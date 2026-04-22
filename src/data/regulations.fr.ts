import type { RegData } from '@/types';

export const REGULATIONS_FR: RegData = {
  // ═══════════════════════════════════════════════════════════════
  // EXCHANGE / PLATEFORME DE TRADING
  // ═══════════════════════════════════════════════════════════════
  exchange: {
    eu: {
      regime: "CASP (MiCA) + PSAN (AMF France)",
      risk: "high",
      licenses: ["Agrément CASP (ESMA/ANC)", "Enregistrement PSAN AMF (France)"],
      obligations: ["KYC/KYB complet", "Programme LCB-FT (AML/CFT)", "Livre blanc MiCA", "Capital minimum \u20AC125K", "Règle du voyage FATF >\u20AC1K", "Règles d'abus de marché", "Gouvernance et honorabilité", "Publication de l'impact environnemental"],
      time: "12\u201318 mois",
      cost: "\u20AC50K\u2013\u20AC200K",
      alts: ["Singapour MAS (~6 mois)", "Dubaï VARA (~9 mois)", "Liechtenstein TVTG (3\u20139 mois)", "Lituanie/Estonie comme hub UE"],
      authority: "AMF (France) / ESMA (UE)",
      xrplNote: "XRPL dispose d'un DEX natif (carnet d'ordres intégré au protocole). Un DApp front-end y accédant pour des utilisateurs UE peut toujours nécessiter un agrément CASP s'il route des ordres ou contrôle des fonds.",
      reportingFrequency: "Rapports prudentiels et de transactions trimestriels à l'ANC · Comptes audités annuels · Déclarations AML mensuelles · Rapports d'incidents immédiats · Rapport annuel sur les conflits d'intérêts (MiCA Art. 80).",
      marketingRules: "Avertissements de risque obligatoires sur toutes les communications (MiCA Art. 66). Aucune promesse de rendement. Whitepaper et canaux de réclamation à afficher clairement. Exigence de non-trompeuse strictement appliquée. Divulgations influenceurs obligatoires.",
      clientEligibility: "Peut servir tous les résidents de l'UE-27 avec un agrément CASP passporté. Vigilance renforcée pour les PPE et les pays de la liste grise/noire du GAFI. Pas de restriction retail mais test de suitability requis pour les produits complexes. Blocage géographique requis pour les juridictions hors chaîne de sollicitation inversée."
    },
    us: {
      regime: "FinCEN MSB + MTL d'État + BitLicense (NY) + CLARITY Act (répartition SEC/CFTC)",
      risk: "high",
      licenses: ["Enregistrement FinCEN MSB", "Money Transmitter Licence (par État, ~48 États)", "BitLicense (NY uniquement)", "Enregistrement CFTC pour les plateformes d'échange de 'digital commodities' (CLARITY Act, 2025)"],
      obligations: ["Conformité KYC/AML/BSA", "Déclarations SAR", "Filtrage sanctions OFAC", "Règle du voyage >$3K", "Exigences de caution État par État", "CLARITY Act : classification des plateformes de trading (SEC vs CFTC) actif par actif selon le test de 'mature blockchain'"],
      time: "18\u201336 mois",
      cost: "$200K\u2013$1M+",
      alts: ["Wyoming LLC (crypto-friendly)", "UE MiCA comme marché principal", "Liechtenstein TVTG"],
      authority: "FinCEN / SEC / CFTC / NYDFS / régulateurs d'État",
      xrplNote: "DEX front-end XRPL : la SEC peut le considérer comme une plateforme d'échange non enregistrée pour des paires de titres tokenisés. Sous le CLARITY Act 2025, le XRP (ventes secondaires, SEC v. Ripple juillet 2023) qualifie probablement de 'digital commodity' — compétence CFTC. Les autres tokens XRPL nécessitent une analyse cas par cas du test mature-blockchain.",
      reportingFrequency: "Déclarations SAR en cas d'activité suspecte (immédiat, <30 jours) · CTR pour tout cash >$10K · FinCEN Form 107 annuel · Rapports trimestriels NYDFS (BitLicense) · Reporting État par État · CLARITY Act : divulgations trimestrielles + annuelles pour les 'investment contract digital assets'.",
      marketingRules: "Ère SEC : tout marketing projetant des rendements risque de requalifier le token en titre financier (Howey). Pas de promotions d'investissement non enregistrées. NYDFS exige une approbation préalable de la publicité consommateur. Règles FINRA pour les communications broker-dealer. Restrictions Blue Sky par État sur le marketing ciblé.",
      clientEligibility: "Ne peut servir que les États où la MTL est détenue (geo-fencing ailleurs). Filtrage OFAC complet — bloquer Cuba, Iran, Corée du Nord, Syrie, Crimée, Russie, Biélorussie. Gating investisseur accrédité pour les security tokens (Reg D 506(c)). Résidence US vérifiée KYC obligatoire. Pas de service aux adresses sanctionnées ou PPE listées."
    },
    uae: {
      regime: "VARA \u2014 VASP Full Market Product",
      risk: "med",
      licenses: ["Licence VASP (VARA)", "Audit technique VARA"],
      obligations: ["KYC/AML", "Exigences de capital", "Directeur local", "Ségrégation des actifs", "Cadre de cybersécurité"],
      time: "6\u201312 mois",
      cost: "$50K\u2013$150K",
      alts: ["ADGM FSRA (Abu Dhabi)", "Singapour MAS", "Passeport UE MiCA"],
      authority: "VARA Dubaï / FSRA ADGM"
    },
    sg: {
      regime: "MAS \u2014 Major Payment Institution (PSA)",
      risk: "med",
      licenses: ["Licence MPI", "ou SPI (seuils réduits)"],
      obligations: ["KYC/AML selon les lignes directrices MAS", "Tech Risk Management", "Audits annuels", "Règle du voyage", "Mesures de protection des utilisateurs"],
      time: "6\u201312 mois",
      cost: "SGD 50K\u2013150K",
      alts: ["Dubaï VARA", "Hong Kong SFC VASP", "UE MiCA"],
      authority: "Monetary Authority of Singapore (MAS)"
    },
    uk: {
      regime: "FCA Cryptoasset Registration",
      risk: "med",
      licenses: ["Enregistrement FCA crypto business", "Licence EMI si fiat impliqué"],
      obligations: ["AML/KYC", "Règle du voyage FATF", "Consumer Duty (clientèle de détail)", "Régime des promotions financières"],
      time: "12\u201318 mois",
      cost: "\u00A330K\u2013\u00A3100K",
      alts: ["Passeporting UE MiCA", "Gibraltar DLT Provider Licence"],
      authority: "Financial Conduct Authority (FCA)"
    },
    hk: {
      regime: "Licence SFC VASP (VATP)",
      risk: "high",
      licenses: ["Licence SFC VASP", "Type 1 si titres financiers impliqués"],
      obligations: ["KYC/AML selon AMLO", "Ségrégation des actifs", "Stockage à froid >98%", "Mesures de protection des investisseurs particuliers", "Exigences d'assurance"],
      time: "12\u201318 mois",
      cost: "HKD 500K\u20132M",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "Securities & Futures Commission (SFC)"
    },
    ch: {
      regime: "FINMA VQF/OAR + DLT Trading Facility",
      risk: "med",
      licenses: ["Affiliation VQF ou OAR (AML)", "Licence DLT Trading Facility si exchange"],
      obligations: ["AML selon LBA suisse", "KYC/KYB", "Règle du voyage", "Bénéficiaires effectifs"],
      time: "6\u201318 mois",
      cost: "CHF 50K\u2013500K",
      alts: ["Liechtenstein TVTG", "UE MiCA"],
      authority: "FINMA Suisse"
    },
    li: {
      regime: "TVTG \u2014 Licence SP Token Exchange (TE)",
      risk: "low",
      licenses: ["Licence SP Token Exchange (FMA)", "Passeporting EEE disponible"],
      obligations: ["AML TVTG", "Gouvernance et honorabilité", "Rapport annuel FMA", "Ségrégation des actifs clients"],
      time: "3\u20139 mois",
      cost: "CHF 20K\u201380K",
      alts: ["Suisse FINMA", "UE MiCA via EEE"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — Crypto-Asset Exchange Service Provider (CAESP)",
      risk: "high",
      licenses: ["Enregistrement CAESP (FSA)", "Type I Financial Instruments Business (si dérivés)"],
      obligations: ["KYC/AML (JAFIC)", "Ségrégation en cold wallet", "Audit annuel FSA", "Trust de protection des actifs utilisateurs", "Règle du voyage", "Restrictions publicitaires"],
      time: "12–24 mois",
      cost: "¥10M–¥50M ($70K–$350K)",
      alts: ["Singapour MAS", "Dubaï VARA", "UE MiCA"],
      authority: "Financial Services Agency (FSA Japon)"
    },
    kr: {
      regime: "Enregistrement VASP (Special Financial Transactions Act)",
      risk: "high",
      licenses: ["Enregistrement VASP (FIU)", "Certification ISMS-P obligatoire", "Partenariat bancaire avec compte nominatif"],
      obligations: ["KYC avec comptes bancaires nominatifs", "AML (loi AMLCFT)", "Certification sécurité de l'information ISMS-P", "Règle du voyage (>₩1M)", "Reporting annuel à la FIU"],
      time: "12–18 mois",
      cost: "₩100M–₩500M ($75K–$375K)",
      alts: ["Japon FSA", "Singapour MAS", "UE MiCA"],
      authority: "Financial Intelligence Unit (FIU) / Financial Services Commission (FSC)"
    },
    in: {
      regime: "Fiscalité VDA + Enregistrement FIU (PMLA)",
      risk: "high",
      licenses: ["Enregistrement FIU-IND (obligatoire depuis mars 2025)", "Aucun cadre de licence formel à ce jour"],
      obligations: ["Taxe forfaitaire de 30% sur les revenus VDA", "TDS de 1% sur tous transferts >₹10K", "KYC/AML selon PMLA", "Reporting FIU", "Pas de compensation des pertes"],
      time: "3–6 mois (enregistrement FIU)",
      cost: "₹10L–₹50L ($12K–$60K)",
      alts: ["Dubaï VARA", "Singapour MAS", "UE MiCA"],
      authority: "FIU-IND / SEBI (proposé) / RBI"
    },
    br: {
      regime: "BCB — Virtual Asset Service Provider (Marco Legal das Criptomoedas)",
      risk: "med",
      licenses: ["Autorisation BCB VASP (Loi 14.478/2022)", "Enregistrement CVM si titres financiers"],
      obligations: ["KYC/AML", "Ségrégation des actifs", "Exigences de gouvernance", "Reporting BCB", "Protection des consommateurs (CDC)"],
      time: "6–12 mois",
      cost: "R$200K–R$1M ($40K–$200K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "Banco Central do Brasil (BCB) / CVM"
    },
    ng: {
      regime: "SEC Nigeria — Rules on Issuance, Offering Platforms and Custody of Digital Assets (mai 2022) + Guidelines CBN 2023",
      risk: "high",
      licenses: ["Enregistrement DASP SEC Nigeria (Digital Assets Token Offering Platform, Digital Assets Exchange, DACS)", "Licence CBN Virtual Asset (après la levée de l'interdiction bancaire en déc. 2023)", "Autorisation VASP provisoire SEC (cadre ARIP, 2024)"],
      obligations: ["KYC/AML sous MLPPA 2022", "Impôt sur les plus-values de 10 % sur les transactions en actifs virtuels (Finance Act 2024)", "Bureau local + directeur local obligatoires", "Capital libéré minimum de NGN 500M pour les exchanges", "Règles de protection des investisseurs + revue Know-Your-Token (KYT)", "Déclarations auprès de la SEC + NFIU"],
      time: "9–18 mois (cadre encore en maturation)",
      cost: "NGN 500M libérés + $150K–$500K setup/juridique",
      alts: ["UAE VARA (fuseau horaire plus proche)", "Sandbox BoG Ghana", "Hors Afrique : Singapour MAS"],
      authority: "SEC Nigeria + CBN (Central Bank of Nigeria) + NFIU"
    },
    ke: {
      regime: "Virtual Asset Service Providers Act 2025 (en vigueur) + supervision de la Capital Markets Authority",
      risk: "med",
      licenses: ["Licence VASP sous VASP Act 2025 (délivrée par la CMA pour trading, custody, conseil)", "Enregistrement fiscal auprès de la KRA (Digital Asset Tax 3 % depuis 2023)"],
      obligations: ["KYC/AML/CFT selon POCAMLA 2009", "Ségrégation des actifs clients", "Présence locale + directeurs locaux", "Déclarations à la CMA + Financial Reporting Centre", "Digital Asset Tax 3 % sur la valeur de transfert/échange"],
      time: "9–15 mois (nouveau cadre, délais qui se précisent)",
      cost: "KES 5M–20M (~$40K–$160K)",
      alts: ["FSCA Afrique du Sud (plus mature)", "UAE VARA", "Hors Afrique : Singapour MAS"],
      authority: "Capital Markets Authority (CMA) + Central Bank of Kenya (CBK) + KRA"
    },
    za: {
      regime: "FSCA Crypto Asset Declaration (oct. 2022) — les crypto-actifs sont des produits financiers sous la FAIS Act",
      risk: "med",
      licenses: ["Licence Crypto Asset Service Provider (CASP) sous la FAIS Act (juin 2023+)", "Catégories FSP : discrétionnaire, non-discrétionnaire, conseil", "Enregistrement FIC (supervision AML)"],
      obligations: ["Responsables fit-and-proper selon FAIS Act", "KYC/AML conformément à FICA", "Due diligence client + conservation des dossiers pendant 5 ans", "États financiers annuels à la FSCA", "Assurance/PI selon la catégorie FSP", "Conformité Travel Rule depuis avril 2023"],
      time: "6–12 mois",
      cost: "ZAR 1M–3M (~$55K–$170K)",
      alts: ["UAE VARA", "Singapour MAS", "UK FCA"],
      authority: "FSCA (Financial Sector Conduct Authority) + FIC + SARB"
    },
    lu: {
      regime: "MiCA CASP + régime transitoire VASP (Loi AML du 25 mars 2020)",
      risk: "med",
      licenses: ["Agrément CASP CSSF sous MiCA", "Statut PSF/PFS si instruments MiFID impliqués", "Passeport UE pour les services d'échange transfrontaliers"],
      obligations: ["KYC/KYB complet selon la Loi AML luxembourgeoise", "Whitepaper MiCA + notification ESMA", "Capital min. €125K", "Règle du voyage FATF >€1K", "Substance locale (dirigeant, bureau) + règles d'externalisation Circulaire CSSF 22/806"],
      time: "9–18 mois",
      cost: "€100K–€400K (frais CSSF + juridique)",
      alts: ["Lituanie / Irlande (hubs UE)", "Liechtenstein TVTG", "Malte MiCA"],
      authority: "CSSF (Commission de Surveillance du Secteur Financier)"
    },
    ky: {
      regime: "Virtual Asset (Service Providers) Act 2020 — Trading Platform",
      risk: "med",
      licenses: ["Enregistrement VASP — Trading Platform (CIMA)", "Licence VASP (revue post-lancement)", "Licence sandbox alternative pour les modèles innovants"],
      obligations: ["Honorabilité des dirigeants (approbation CIMA)", "AML selon l'AMLR 2020", "MLRO + DMLRO nommés", "Registre des bénéficiaires effectifs", "Ségrégation des actifs clients", "Audit annuel + reporting CIMA"],
      time: "6–12 mois",
      cost: "$50K–$150K (frais CIMA + juridique) — impôt sur les sociétés 0%",
      alts: ["BVI VASP", "Bermudes DABA", "Dubaï VARA"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "FINTRAC MSB (AML fédéral) + CSA Pre-Registration Undertaking (titres provinciaux)",
      risk: "high",
      licenses: ["Enregistrement FINTRAC MSB / FMSB", "CSA Pre-Registration Undertaking (PRU) avec les régulateurs provinciaux (OSC, AMF QC)", "Enregistrement CSA complet en tant que restricted dealer / investment dealer"],
      obligations: ["KYC/AML selon PCMLTFA + amendements de mars 2026", "Reporting FINTRAC STR / LCTR", "Conditions opérationnelles CSA Staff Notice 21-332 (ségrégation custody, limites leverage)", "Adhésion OCRI (ex-IIROC) si investment dealer", "Travel Rule (C$1K)"],
      time: "12–24 mois (double FINTRAC + CSA)",
      cost: "C$300K–C$1M+",
      alts: ["MTL d'État américaines", "UE MiCA", "Dubaï VARA"],
      authority: "FINTRAC + CSA / OSC / AMF + OCRI"
    },
    vg: {
      regime: "Virtual Asset Service Providers Act 2022 — catégorie Exchange",
      risk: "med",
      licenses: ["Enregistrement VASP — exchange (BVI FSC)", "Constitution en BVI Business Company"],
      obligations: ["MLRO nommé + approuvé par la FSC avant lancement", "AML selon l'AMLR + Code of Practice", "Honorabilité des dirigeants", "États financiers audités annuels à la FSC", "Cybersécurité + gestion des clés (FSC Circular 43/2025)", "Travel Rule"],
      time: "4–12 mois",
      cost: "US$5K–15K application + $150K–$400K setup — impôt sur les sociétés 0%",
      alts: ["Cayman VASP", "Bermudes DABA", "Dubaï VARA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Enregistrement AUSTRAC DCE + AFSL ASIC (Digital Assets Framework Act 2026)",
      risk: "med",
      licenses: ["Enregistrement Digital Currency Exchange (DCE) AUSTRAC", "Australian Financial Services Licence (AFSL) ASIC — catégorie Digital Asset Platform", "Adhésion AFCA (Australian Financial Complaints Authority)"],
      obligations: ["KYC/AML selon l'AML/CTF Act 2006 (amendé 2024)", "Travel Rule (en vigueur 31 mars 2026)", "Ségrégation des actifs clients + règles de custody", "Product disclosure statements pour le retail", "Protection des consommateurs (Corporations Act)", "Reporting des manquements à l'ASIC"],
      time: "9–18 mois (AFSL à déposer avant le 30 juin 2026 pour conserver la no-action protection)",
      cost: "A$250K–A$1M",
      alts: ["Singapour MAS", "Dubaï VARA", "Nouvelle-Zélande FMA"],
      authority: "AUSTRAC (AML) + ASIC (agrément)",
      reportingFrequency: "AUSTRAC : SMR immédiat + rapport de conformité annuel · ASIC : reporting des manquements en temps réel + attestation de conformité annuelle · Audit annuel (condition AFSL) · Cotisation AFCA annuelle + reporting des litiges."
    },
    mt: {
      regime: "MiCA CASP (MFSA) — fenêtre de transition VFA Act fermée le 1er juillet 2026",
      risk: "med",
      licenses: ["Agrément CASP MFSA sous MiCA", "Voie simplifiée Art. 143(6) pour les titulaires VFA Class 3/4 (Catégorie A)", "Dossier MiCA complet pour les nouveaux entrants (Catégorie B)"],
      obligations: ["KYC/KYB complet", "Whitepaper MiCA + registre ESMA", "Capital min. €125K (exchange)", "Règle du voyage FATF >€1K", "Substance locale (dirigeant maltais, cadres résidents)", "Gouvernance + cybersécurité du MFSA Rulebook"],
      time: "6–12 mois (Catégorie A simplifiée) · 12–18 mois (Catégorie B)",
      cost: "€80K–€300K",
      alts: ["Lituanie MiCA", "Liechtenstein TVTG", "Luxembourg CSSF"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 (DABA) — licence Class F / Class M",
      risk: "med",
      licenses: ["DABA Class F (complète) ou Class M (modifiée / sandbox)", "DABA Class T (test) pour preuve de concept", "Approbation BMA"],
      obligations: ["Actifs nets minimums selon la classe et l'activité", "BMA Cyber Risk Management Code", "Ségrégation des fonds / actifs clients", "AML/ATF selon POCA 1997 + règlements DABA", "Travel Rule", "Comptes audités annuels + reporting BMA"],
      time: "6–12 mois",
      cost: "BMD 50K–250K (frais BMA + juridique)",
      alts: ["Cayman VASP", "BVI VASP", "Dubaï VARA"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) — remplace le régime VASP historique",
      risk: "med",
      licenses: ["Agrément CASP Lietuvos bankas sous MiCA", "Enregistrement VASP transitoire valable jusqu'au 1er juillet 2026", "Passeport UE depuis la Lituanie"],
      obligations: ["AML selon la Loi AML lituanienne (mises à jour 2022 + 2024)", "Capital min. €125K (CASP exchange)", "Dirigeant local + responsable AML résident en Lituanie", "Règle du voyage FATF >€1K", "Whitepaper MiCA + règles d'abus de marché"],
      time: "6–12 mois (dossier MiCA complet)",
      cost: "€50K–€200K (historiquement le hub crypto UE le plus compétitif)",
      alts: ["Estonie", "Malte MiCA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas (Banque de Lituanie)"
    },
    ie: {
      regime: "Agrément CASP de la Central Bank of Ireland sous MiCA (depuis déc. 2024) + registre VASP historique (2021)",
      risk: "med",
      licenses: ["Agrément CASP de la CBI sous MiCA", "Registre VASP (transitoire, en voie d'extinction)", "Passeporting UE via MiCA"],
      obligations: ["KYC/AML selon le Criminal Justice (ML/TF) Act 2010", "Règle du voyage FATF >€1K", "Capital min. €125K (CASP exchange)", "Régime Fitness & Probity (CBI F&P)", "Code de protection des consommateurs", "Résilience opérationnelle DORA depuis janv. 2025"],
      time: "12–18 mois (dossier CASP complet)",
      cost: "€200K–€600K",
      alts: ["Lituanie MiCA", "Malte MiCA", "Luxembourg CSSF"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "Hub UE anglophone — privilégié par les sociétés US s'étendant en Europe (Coinbase Ireland, Payward Europe pour Kraken, Ripple Labs Ireland pour RippleNet CASP CBI)."
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // STABLECOIN / DIGITAL PAYMENT TOKEN
  // ═══════════════════════════════════════════════════════════════
  stablecoin: {
    eu: {
      regime: "MiCA EMT (jeton de monnaie électronique) ou ART (jeton adossé à des actifs)",
      risk: "high",
      licenses: ["Licence EMI ou d'établissement de crédit (EMT)", "Agrément ANC (ART)", "CASP si distribution"],
      obligations: ["Exigence de réserve 1:1 (EMT)", "Livre blanc déposé auprès de l'ANC", "Gestion des actifs de réserve", "Droits de remboursement au pair (EMT)", "Règles S-EMT/S-ART si significatif (>\u20AC5B ou >10M détenteurs)", "Reporting trimestriel", "Exigences de capital"],
      time: "12\u201324 mois",
      cost: "\u20AC100K\u2013\u20AC500K+",
      alts: ["Liechtenstein TVTG (plus rapide)", "Singapour MAS (PSA)", "Suisse FINMA"],
      authority: "BCE + ANC (pour S-EMT) / ESMA + ANC (pour S-ART)",
      xrplNote: "RLUSD est le stablecoin adossé à l'USD de Ripple sur XRPL + Ethereum. Implémentation EMT de référence. Utilise le modèle IOU/trust line sur XRPL. L'émetteur doit être EMI ou établissement de crédit selon MiCA.",
      custodyNote: "Un stablecoin sur XRPL utilise le modèle IOU/Trust Line. Le gateway détient les actifs de réserve \u2014 par définition custodial. Les flags freeze et globalFreeze fournissent des contrôles de conformité.",
      reportingFrequency: "Divulgation mensuelle de la composition des réserves · Rapports prudentiels + liquidité trimestriels · Comptes audités annuels · Notification immédiate des changements de composition · S-EMT/S-ART : monitoring quotidien + supervision BCE si seuils franchis.",
      marketingRules: "Interdiction de verser des intérêts ou de présenter le stablecoin comme un investissement (MiCA Art. 50). Avertissements obligatoires dans le whitepaper. Pas de revendications trompeuses de stabilité. Restrictions de volume/vélocité possibles pour S-EMT. Les pubs doivent souligner les droits de rachat et les risques.",
      clientEligibility: "Passeportable dans les 27 États de l'UE une fois l'EMT/ART autorisé. Vigilance renforcée pour les PPE et les pays à haut risque GAFI. Clientèle retail éligible mais plafonds individuels possibles pour S-ART. Blocage géographique requis hors EEE."
    },
    us: {
      regime: "GENIUS Act (cadre fédéral stablecoin, signé juillet 2025) + MTL d'État + BitLicense (NY)",
      risk: "high",
      licenses: ["Charter fédéral OCC 'Payment Stablecoin Issuer' (GENIUS Act)", "OU émetteur agréé au niveau d'un État (voie duale GENIUS)", "MTL d'État si applicable", "NY BitLicense ou Trust charter NY"],
      obligations: ["Couverture 1:1 en cash + bons du Trésor US court terme (<93 jours) + repos", "Divulgations mensuelles signées par le CFO + attestation annuelle indépendante", "Rachat au pair sous T+1", "Programme AML/KYC de niveau bancaire + filtrage OFAC", "Interdiction de payer des intérêts/rendements aux détenteurs", "Ségrégation bankruptcy-remote des réserves", "Émetteurs étrangers peuvent passporter si régime comparable (réciprocité)"],
      time: "12\u201324 mois (voie fédérale) / 6\u201312 mois (voie État)",
      cost: "$500K\u2013$2M+",
      alts: ["UE MiCA EMT (cadre 1:1 comparable)", "Suisse FINMA", "Dubaï VARA payment token"],
      authority: "OCC (fédéral) / Régulateurs d'État / FinCEN",
      reportingFrequency: "GENIUS Act : divulgations mensuelles signées par le CFO + attestation annuelle indépendante des réserves · SAR immédiat + CTR >$10K · Call reports trimestriels à l'OCC · Revue annuelle de risk management · Dashboard temps réel des volumes de rachat (gros émetteurs).",
      marketingRules: "GENIUS Act : pas d'intérêts / rendements versés aux détenteurs. Pas de vocabulaire 'investissement', 'sans risque' ou 'garanti'. La composition des réserves doit être affichée de manière visible. Le rachat au pair T+1 doit être mis en avant. Divulgations consommateur de type bancaire applicables.",
      clientEligibility: "US persons uniquement si l'émetteur est agréé GENIUS (fédéral ou État qualifié). Filtrage OFAC bloque Cuba, Iran, Corée du Nord, Syrie, Crimée, Russie, Biélorussie. Les users étrangers nécessitent une vérification de régime comparable. Pas de gating investisseur accrédité (produit bancaire). KYC obligatoire."
    },
    uae: {
      regime: "VARA Payment Token + supervision CBUAE",
      risk: "med",
      licenses: ["Licence VARA payment token", "Approbation CBUAE si indexé sur AED"],
      obligations: ["Gestion des réserves", "KYC/AML", "Exigences d'audit", "Exigences de capital"],
      time: "6\u201312 mois",
      cost: "$100K\u2013$300K",
      alts: ["Singapour MAS", "UE MiCA", "Liechtenstein TVTG"],
      authority: "VARA / CBUAE"
    },
    sg: {
      regime: "MAS \u2014 Cadre Single-Currency Stablecoin (SCS)",
      risk: "med",
      licenses: ["Licence MPI (PSA)", "Exigences spécifiques SCS"],
      obligations: ["Réserve \u2265100% en espèces/équivalents", "Remboursement en temps voulu", "Exigences de publication", "MAS Technology Risk Management"],
      time: "6\u201312 mois",
      cost: "SGD 100K\u2013300K",
      alts: ["UE MiCA", "Dubaï VARA"],
      authority: "Monetary Authority of Singapore (MAS)"
    },
    uk: {
      regime: "FCA \u2014 Régime des stablecoins adossés au fiat (à venir)",
      risk: "med",
      licenses: ["Autorisation FCA (proposée)", "Licence EMI (actuelle)"],
      obligations: ["Exigences de réserve", "Remboursement au pair", "Protection des consommateurs", "AML/KYC"],
      time: "12\u201318 mois",
      cost: "\u00A350K\u2013\u00A3200K",
      alts: ["UE MiCA (cadre établi)", "Singapour MAS"],
      authority: "FCA / Bank of England (stablecoins systémiques)"
    },
    hk: {
      regime: "Régime de licence stablecoin HKMA",
      risk: "med",
      licenses: ["Licence d'émetteur de stablecoin HKMA (à partir de 2024/2025)"],
      obligations: ["Couverture totale en réserve", "Remboursement au pair sous 1 jour ouvré", "Exigences de gouvernance", "AML/KYC"],
      time: "12\u201318 mois",
      cost: "HKD 500K\u20131.5M",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "Hong Kong Monetary Authority (HKMA)"
    },
    ch: {
      regime: "FINMA \u2014 Prise de dépôts ou placement collectif",
      risk: "med",
      licenses: ["Licence bancaire ou licence FinTech", "Affiliation VQF/OAR (AML)"],
      obligations: ["Garantie des dépôts (si licence bancaire)", "AML LBA", "Gestion des réserves", "Reporting FINMA"],
      time: "6\u201318 mois",
      cost: "CHF 100K\u2013500K",
      alts: ["Liechtenstein TVTG", "UE MiCA"],
      authority: "FINMA Suisse"
    },
    li: {
      regime: "TVTG \u2014 SP Token Emitter + passeporting EEE",
      risk: "low",
      licenses: ["Licence SP Token Emitter (FMA)", "Équivalent EMI si indexé sur fiat"],
      obligations: ["AML TVTG", "Gestion des réserves", "Rapport annuel FMA", "Honorabilité"],
      time: "3\u20139 mois",
      cost: "CHF 30K\u2013100K",
      alts: ["Suisse FINMA", "UE MiCA via EEE"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — Instrument de paiement électronique (loi stablecoin 2023)",
      risk: "high",
      licenses: ["Licence bancaire ou de trust company", "Prestataire de services de transfert de fonds"],
      obligations: ["Réserve 1:1 en dépôts bancaires ou trust", "Remboursement au pair à la demande", "KYC/AML", "Reporting FSA"],
      time: "12–24 mois",
      cost: "¥20M–¥100M ($140K–$700K)",
      alts: ["Singapour MAS (SCS)", "UE MiCA"],
      authority: "FSA Japon",
      xrplNote: "La loi japonaise 2023 sur les stablecoins est l'un des premiers cadres complets. RLUSD pourrait être éligible à ce régime pour le marché japonais."
    },
    kr: {
      regime: "FSC — Régulation stablecoin (proposée 2025)",
      risk: "high",
      licenses: ["Attendu : autorisation FSC + partenariat bancaire", "Enregistrement VASP (existant)"],
      obligations: ["Réserve 1:1 (attendue)", "Compte bancaire nominatif", "KYC/AML", "Certification ISMS-P"],
      time: "12–18 mois (une fois le cadre adopté)",
      cost: "₩200M–₩1B ($150K–$750K)",
      alts: ["Japon FSA (cadre établi)", "Singapour MAS (SCS)"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "RBI — Aucun cadre stablecoin (effectivement interdit pour INR-pegged)",
      risk: "high",
      licenses: ["Aucune licence disponible pour stablecoins indexés sur INR", "Enregistrement FIU pour stablecoins étrangers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "Position hostile de la RBI envers les stablecoins privés", "CBDC (e-Rupee) privilégiée par la RBI"],
      time: "N/A — clarté réglementaire en attente",
      cost: "N/A",
      alts: ["Dubaï VARA", "Singapour MAS", "UE MiCA"],
      authority: "RBI / SEBI (proposé)"
    },
    br: {
      regime: "BCB — Régulation des stablecoins indexés sur le Real (émergente)",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si élément d'investissement"],
      obligations: ["KYC/AML", "Gestion des réserves", "Reporting BCB", "Protection des consommateurs"],
      time: "6–12 mois",
      cost: "R$300K–R$1.5M ($60K–$300K)",
      alts: ["UE MiCA", "Singapour MAS"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "Pas de cadre stablecoin dédié — relève des règles DASP SEC Nigeria (2022) + Guidelines CBN. Les stablecoins USD sont traités comme des actifs virtuels.",
      risk: "high",
      licenses: ["Enregistrement DASP SEC Nigeria", "Licence CBN Virtual Asset si rampe fiat on/off"],
      obligations: ["KYC/AML", "Attestations de réserves (best practice, pas encore obligatoires)", "Impôt sur les plus-values 10 %", "Entité + directeurs locaux"],
      time: "9–18 mois",
      cost: "NGN 500M libérés + $200K+ setup",
      alts: ["UAE VARA (cadre stablecoin dédié)", "Singapour MAS SCS"],
      authority: "SEC Nigeria + CBN"
    },
    ke: {
      regime: "Le VASP Act 2025 couvre les stablecoins comme actifs virtuels. Pas de cadre de réserves dédié.",
      risk: "med",
      licenses: ["Licence VASP sous VASP Act 2025", "Approbation CMA pour les offres de tokens"],
      obligations: ["KYC/AML", "Transparence des réserves (best practice)", "Digital Asset Tax 3 %", "Protection des consommateurs"],
      time: "9–15 mois",
      cost: "KES 10M–30M (~$80K–$240K)",
      alts: ["UAE VARA", "FSCA Afrique du Sud", "Singapour MAS"],
      authority: "CMA + CBK"
    },
    za: {
      // FSCA CASP se divise en deux catégories sous FAIS :
      // Cat 1 = conseil / distribution / intermédiation non-custody (voie par défaut, plus légère).
      // Cat 2 = gestion discrétionnaire : détention de fonds clients / agir pour leur compte sans accord par opération.
      // Un émetteur stablecoin non-custodial relève typiquement de la Cat 1. SARB n'intervient
      // que si le stablecoin est adossé au ZAR ou génère des flux fiat transfrontaliers.
      regime: "FSCA Crypto Asset Declaration (oct. 2022) — les stablecoins sont des produits financiers sous FAIS. Position Paper SARB sur stablecoins (déc. 2023) mais pas encore de licence d'émission dédiée. Catégorie 1 CASP par défaut ; Catégorie 2 uniquement si l'émetteur détient des fonds clients ou opère des flux ZAR transfrontaliers.",
      risk: "med",
      licenses: [
        "Licence CASP Catégorie 1 (FAIS Act) — voie par défaut pour l'émission non-custodial",
        "Catégorie 2 uniquement si détention de réserves clients ou gestion discrétionnaire",
        "Approbation SARB contrôle des changes uniquement si adossé ZAR ou transfrontalier",
      ],
      obligations: [
        "Fit-and-proper FSCA FAIS (Cat 1 plus léger que Cat 2)",
        "Divulgation des réserves (best practice en attendant un cadre SARB formel)",
        "Due diligence FICA + Travel Rule (depuis avril 2023)",
        "Reporting SARB uniquement si flux ZAR transfrontaliers",
      ],
      time: "6–12 mois (Cat 1)\n12–18 mois (Cat 2)",
      cost: "ZAR 1M–4M (~$55K–$220K) Cat 1\nZAR 2M–8M ($110K–$440K) Cat 2",
      alts: ["UAE VARA stablecoin dédié", "UK FCA e-money"],
      authority: "FSCA + FIC (SARB uniquement si transfrontalier)"
    },
    lu: {
      regime: "MiCA EMT/ART via CSSF + Loi luxembourgeoise du 30 mai 2018 sur la monnaie électronique",
      risk: "med",
      licenses: ["Licence EMI (CSSF) pour l'émission d'EMT", "Licence d'établissement de crédit (voie alternative)", "Agrément ANC pour ART sous MiCA"],
      obligations: ["Réserve 1:1 (EMT) en comptes ségrégués", "Gouvernance CSSF + fonds propres (min €350K pour EMI)", "Whitepaper déposé auprès de la CSSF", "Remboursement au pair", "Rapports prudentiels trimestriels", "Règles S-EMT/S-ART si seuils dépassés"],
      time: "12–18 mois",
      cost: "€200K–€600K",
      alts: ["Lituanie MiCA EMT", "Liechtenstein TVTG"],
      authority: "CSSF + BCE (si significatif / systémique)"
    },
    ky: {
      regime: "Virtual Asset (Service Providers) Act 2020 + guidance CIMA sur l'émission de stablecoins",
      risk: "med",
      licenses: ["Enregistrement VASP — catégorie issuer (CIMA)", "Voie sandbox pour les structures stablecoin innovantes", "Structure Foundation Companies Act 2017 pour l'émetteur"],
      obligations: ["Attestation de réserve (mensuelle, best practice)", "AML selon AMLR 2020 + VASP Act", "Ségrégation des actifs de réserve", "Honorabilité CIMA", "MLRO + audit annuel"],
      time: "6–12 mois",
      cost: "$75K–$250K — impôt sur les sociétés 0%",
      alts: ["BVI VASP", "Bermudes DABA", "Dubaï VARA payment token"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "CSA Staff Notice 21-333 (Value-Referenced Crypto Assets) + régime fédéral stablecoin MSB à venir (amendements PCMLTFA mars 2026)",
      risk: "high",
      licenses: ["Enregistrement FINTRAC MSB (plus future classe MSB stablecoin spécifique)", "Engagement CSA : l'émetteur VRCA doit respecter les conditions de réserve + remboursement + divulgation", "Prospectus provincial ou dispense"],
      obligations: ["Réserves 1:1 en espèces + titres à court terme du gouvernement du Canada", "Attestations mensuelles des réserves", "Remboursement au pair", "KYC/AML selon les amendements PCMLTFA 2026", "Reporting risque opérationnel + technologique"],
      time: "12–18 mois",
      cost: "C$400K–C$1,5M",
      alts: ["Voie US GENIUS Act", "UE MiCA EMT", "Bermudes DABA"],
      authority: "FINTRAC + CSA / OSC / AMF"
    },
    vg: {
      regime: "Virtual Asset Service Providers Act 2022 — catégorie issuer (pas de loi stablecoin dédiée)",
      risk: "med",
      licenses: ["Enregistrement VASP — issuer (BVI FSC)", "Structure BVI Business Company"],
      obligations: ["Divulgations des réserves (best practice, non obligatoire)", "AML selon AMLR + FSC Code of Practice", "MLRO nommé + approuvé par la FSC", "Audit annuel", "Cybersécurité + gestion des clés (FSC Circular 43/2025)"],
      time: "4–12 mois",
      cost: "$150K–$400K setup — impôt sur les sociétés 0%",
      alts: ["Cayman VASP", "Bermudes DABA stablecoin", "Dubaï VARA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Digital Assets Framework Act 2026 — stablecoins classifiés comme produits financiers + supervision systémique RBA",
      risk: "med",
      licenses: ["AFSL ASIC — émission de stablecoin", "Enregistrement AUSTRAC DCE si on/off-ramp", "Désignation RBA si systémique (Payment Systems Regulation Act)"],
      obligations: ["Réserves 1:1 en actifs liquides de haute qualité (HQLA)", "Divulgations mensuelles des réserves", "Remboursement au pair", "KYC/AML + Travel Rule (31 mars 2026)", "Product disclosure statement (PDS) pour le retail"],
      time: "12–18 mois",
      cost: "A$500K–A$2M",
      alts: ["Singapour MAS SCS", "UE MiCA EMT", "US GENIUS Act"],
      authority: "ASIC + RBA + AUSTRAC"
    },
    mt: {
      regime: "MiCA EMT/ART (MFSA) — transition depuis la guidance stablecoin du VFA Act",
      risk: "med",
      licenses: ["Licence EMI (MFSA) pour l'émission d'EMT", "Agrément ART sous MiCA", "Voie simplifiée Art. 143(6) si agrément VFA historique"],
      obligations: ["Réserves 1:1 (EMT)", "Remboursement au pair", "Whitepaper + dépôts MFSA", "Rapports prudentiels trimestriels", "Capital min. €350K (EMI / émetteur ART)", "Substance locale à Malte"],
      time: "9–18 mois",
      cost: "€150K–€500K",
      alts: ["Liechtenstein TVTG", "Lituanie MiCA EMT", "Luxembourg CSSF"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 + Digital Asset Issuance Act 2018 — voie stablecoin dédiée",
      risk: "med",
      licenses: ["DABA Class F (licence émetteur complète)", "Dépôt Digital Asset Issuance Act pour l'offre"],
      obligations: ["Adossement des réserves 1:1 divulgué + attesté", "Honorabilité BMA + Cyber Risk Management Code", "AML/ATF selon POCA", "Ségrégation des actifs clients", "Reporting trimestriel BMA"],
      time: "6–12 mois",
      cost: "BMD 100K–500K",
      alts: ["Cayman VASP", "BVI VASP", "Dubaï VARA stablecoin"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA EMT/ART (Lietuvos bankas) — remplace le régime EMI + VASP historique",
      risk: "med",
      licenses: ["Licence EMI de Lietuvos bankas pour l'émission d'EMT", "Agrément ART sous MiCA", "Passeport UE depuis la Lituanie"],
      obligations: ["Réserves 1:1 en comptes ségrégués", "Rapports prudentiels trimestriels", "Remboursement au pair", "Capital min. €350K (EMI)", "Dirigeant local + responsable AML"],
      time: "9–15 mois",
      cost: "€100K–€350K (historiquement un hub EMI compétitif)",
      alts: ["Luxembourg CSSF", "Malte MFSA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas (Banque de Lituanie)"
    },
    ie: {
      regime: "MiCA EMT/ART (Central Bank of Ireland) + directive monnaie électronique 2009/110/CE transposée",
      risk: "med",
      licenses: ["Agrément EMI de la CBI pour l'émission d'EMT", "Agrément ART sous MiCA pour les tokens adossés à des actifs", "Licence d'établissement de crédit comme alternative pour les gros émetteurs"],
      obligations: ["Exigence de réserves 1:1 en comptes ségrégués", "Whitepaper déposé auprès de la CBI + notifié à l'ESMA", "Rapports prudentiels trimestriels", "Remboursement au pair", "Règles S-EMT/S-ART au-dessus de €5M/jour", "Gouvernance CBI + protection des consommateurs"],
      time: "12–18 mois (EMI)",
      cost: "€250K–€800K",
      alts: ["Luxembourg EMI", "Lituanie EMI", "Malte MFSA"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUSTODY / WALLET CRYPTO
  // ═══════════════════════════════════════════════════════════════
  custody: {
    eu: {
      regime: "CASP Art. 75 MiCA \u2014 Conservation et administration",
      risk: "high",
      licenses: ["Agrément CASP custody (ANC)", "Capital minimum \u20AC150K (custody)"],
      obligations: ["Ségrégation des actifs (on-chain + off-chain)", "Responsabilité en cas de perte d'actifs", "Gouvernance et cybersécurité", "Conservation des registres 5 ans", "Couverture par assurance ou fonds propres", "KYC/AML", "Règle du voyage FATF"],
      time: "12\u201318 mois",
      cost: "\u20AC100K\u2013\u20AC350K",
      alts: ["Liechtenstein TVTG Token Custodian (3\u20139 mois)", "Suisse FINMA", "Singapour MAS"],
      authority: "ANC / ESMA",
      xrplNote: "XRPL propose 10 méthodes d'implémentation custody avec différentes classifications réglementaires. SingleKey (custodial), SignerList multisig (zone grise selon le quorum), MPC/TSS (zone grise), Escrow/PayChannels/Checks (non-custodial). Voir les implémentations custody pour plus de détails.",
      custodyNote: "Selon l'Art. 75 MiCA, les conservateurs sont responsables de la perte des crypto-actifs sauf à prouver que la perte résulte d'événements hors de leur contrôle raisonnable. S'applique à tout service détenant des clés privées pour le compte de clients.",
      reportingFrequency: "Rapports prudentiels + déclaration de ségrégation des actifs clients trimestriels · États financiers audités annuels · Déclarations AML mensuelles · Rapports d'incidents immédiats (brèche, perte de clé) · Rapport ICT annuel selon DORA.",
      marketingRules: "Doit indiquer clairement que le service détient les clés des clients et le cadre de responsabilité. Ne peut pas faire la publicité d'un stockage 'sans risque'. Les conditions de couverture d'assurance doivent être divulguées. Pas d'offre de rendement sans agrément CASP supplémentaire.",
      clientEligibility: "Résidents UE-27 servis sous agrément CASP passporté. Vigilance renforcée pour les PPE et liste grise GAFI. Les clients institutionnels peuvent nécessiter des contrôles de suitability MiFID supplémentaires si conseil impliqué. Personnes sanctionnées bloquées selon les mesures restrictives UE."
    },
    us: {
      regime: "Charter trust d'État + règle SEC qualified custodian + dispositions custody du CLARITY Act (2025)",
      risk: "high",
      licenses: ["Charter trust d'État (NY, Wyoming SPDI, South Dakota, etc.)", "Enregistrement FinCEN MSB", "Statut SEC qualified custodian pour clients institutionnels", "CLARITY Act : 'digital commodity custodian' agréé par la CFTC pour les actifs sous compétence CFTC"],
      obligations: ["Conformité BSA/AML", "Déclarations SAR", "Filtrage OFAC", "Audit SOC 2 Type II", "Exigences de stockage à froid (clients institutionnels)", "Assurance (police crime + cyber)", "CLARITY Act : ségrégation des digital commodities clients + interdiction de réhypothécation sans consentement", "GENIUS Act : règles spécifiques pour la garde de stablecoins qualifiants"],
      time: "12\u201324 mois",
      cost: "$300K\u2013$1M+",
      alts: ["Charter Wyoming SPDI (voie plus rapide)", "UE MiCA CASP", "Liechtenstein TVTG", "Dubaï VARA custody"],
      authority: "Régulateurs d'État / SEC / CFTC / FinCEN / OCC",
      xrplNote: "Custody XRPL : les règles SEC qualified custodian s'appliquent aux tokens XRPL de type valeur mobilière ; le CLARITY Act (2025) transfère la custody des 'digital commodities' sous compétence CFTC (s'applique au XRP selon l'arrêt SEC v. Ripple). MPC/TSS (Fireblocks, Silence Labs) largement utilisés pour le custody XRPL institutionnel. Le multisig SignerList fournit une alternative native on-chain.",
      reportingFrequency: "Audit SOC 2 Type II annuel · Call reports trimestriels (si charter trust) · SAR immédiat / CTR au-dessus de $10K · Déclarations AML mensuelles · CLARITY Act : déclarations trimestrielles de ségrégation des actifs clients · Notifications de sinistre d'assurance en temps réel.",
      marketingRules: "SEC / NYDFS : la revendication 'qualified custodian' n'est permise que si vous remplissez la définition SEC. Pas de réhypothécation implicite. Les limites d'assurance doivent être clairement divulguées. La garde des stablecoins qualifiants GENIUS Act impose un traitement publicitaire séparé. Marketing institutionnel uniquement pour les offres non-retail.",
      clientEligibility: "US persons dans les États où la charter trust est reconnue. Clients institutionnels uniquement pour l'offre SEC qualified-custodian (sauf si enregistré État pour le retail). Blocage OFAC complet — Cuba, Iran, Corée du Nord, Syrie, Russie, Biélorussie, entités sanctionnées. KYC renforcé sur les bénéficiaires effectifs >25%."
    },
    uae: {
      regime: "VARA \u2014 VA Custody Services",
      risk: "med",
      licenses: ["Licence VARA VA custody"],
      obligations: ["Ségrégation des actifs", "Majorité en stockage à froid", "KYC/AML", "Exigences d'assurance", "Audit technique"],
      time: "6\u201312 mois",
      cost: "$75K\u2013$200K",
      alts: ["ADGM FSRA", "Singapour MAS", "Liechtenstein TVTG"],
      authority: "VARA Dubaï / FSRA ADGM"
    },
    sg: {
      regime: "MAS \u2014 Custody de Digital Payment Token (PSA)",
      risk: "med",
      licenses: ["Licence MPI ou SPI (PSA)", "Autorisation services de custody"],
      obligations: ["Sauvegarde des actifs clients", "Tech Risk Management", "AML/KYC", "Ségrégation des actifs", "Audit annuel"],
      time: "6\u201312 mois",
      cost: "SGD 75K\u2013200K",
      alts: ["Hong Kong SFC", "UE MiCA", "Liechtenstein TVTG"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 Custody de crypto-actifs (règles type CASS à venir)",
      risk: "med",
      licenses: ["Enregistrement FCA cryptoasset", "Règles CASS custody (proposées)"],
      obligations: ["AML/KYC", "Ségrégation des actifs", "Consumer Duty", "Assurance adéquate", "Résilience opérationnelle"],
      time: "12\u201318 mois",
      cost: "\u00A350K\u2013\u00A3150K",
      alts: ["UE MiCA", "Liechtenstein TVTG", "Suisse FINMA"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC VATP \u2014 exigences de custody",
      risk: "high",
      licenses: ["Licence SFC VASP (inclut le custody)", "Type 1 licensed corporation"],
      obligations: ["Stockage à froid >98%", "Assurance >½ des actifs", "Ségrégation des actifs", "KYC/AML AMLO", "Audit annuel"],
      time: "12\u201318 mois",
      cost: "HKD 500K\u20132M",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 dispositions custody de la Loi DLT",
      risk: "med",
      licenses: ["Affiliation VQF/OAR (AML)", "Licence DLT Trading Facility ou FinTech"],
      obligations: ["Ségrégation des crypto-actifs clients en cas de faillite", "AML LBA", "KYC/KYB", "Reporting"],
      time: "6\u201318 mois",
      cost: "CHF 50K\u2013300K",
      alts: ["Liechtenstein TVTG", "UE MiCA"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Licence SP Token Custodian",
      risk: "low",
      licenses: ["Licence SP Token Custodian (FMA)", "Passeporting EEE disponible"],
      obligations: ["AML TVTG", "Honorabilité", "Ségrégation des actifs", "Reporting annuel FMA"],
      time: "3\u20139 mois",
      cost: "CHF 15K\u201380K",
      alts: ["Suisse FINMA", "UE MiCA via EEE"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — Custody de crypto-actifs (cadre CAESP)",
      risk: "high",
      licenses: ["Enregistrement CAESP (FSA)", "Licence de trust company (pour institutionnel)"],
      obligations: ["Ségrégation en cold wallet (>95%)", "Trust de protection des actifs utilisateurs", "KYC/AML (JAFIC)", "Audit annuel FSA", "Assurance ou réserves"],
      time: "12–24 mois",
      cost: "¥15M–¥80M ($105K–$560K)",
      alts: ["Singapour MAS", "UE MiCA", "Liechtenstein TVTG"],
      authority: "FSA Japon",
      xrplNote: "La FSA japonaise exige une ségrégation stricte en cold wallet. Le multisig SignerList XRPL peut fournir une preuve on-chain de ségrégation. Les solutions MPC/TSS de Fireblocks sont largement utilisées par les exchanges japonais."
    },
    kr: {
      regime: "Enregistrement VASP + ISMS-P (dispositions custody)",
      risk: "high",
      licenses: ["Enregistrement VASP (FIU)", "Certification ISMS-P"],
      obligations: ["Partenariat bancaire nominatif", "Majorité en stockage à froid", "KYC/AML", "Sécurité de l'information ISMS-P", "Assurance"],
      time: "12–18 mois",
      cost: "₩150M–₩700M ($110K–$520K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FIU / FSC Corée"
    },
    in: {
      regime: "Enregistrement FIU-IND (pas de cadre custody spécifique)",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Pas de licence custody spécifique à ce jour"],
      obligations: ["KYC/AML selon PMLA", "Reporting FIU", "Taxe VDA de 30% applicable", "TDS de 1% sur les transferts"],
      time: "3–6 mois",
      cost: "₹10L–₹30L ($12K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND"
    },
    br: {
      regime: "BCB VASP — Dispositions custody (Loi 14.478)",
      risk: "med",
      licenses: ["Autorisation BCB VASP"],
      obligations: ["Ségrégation des actifs", "KYC/AML", "Gouvernance", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$200K–R$800K ($40K–$160K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB"
    },
    ng: {
      regime: "SEC Nigeria — Digital Asset Custodian (DACS) sous les règles 2022",
      risk: "high",
      licenses: ["Licence DACS (SEC Nigeria)", "Supervision CBN pour la jambe fiat"],
      obligations: ["Ségrégation des actifs (cold storage recommandé)", "KYC/AML", "Contrôles de cybersécurité", "Adéquation du capital (min. NGN 500M)", "Assurance pour les actifs sous conservation"],
      time: "12–18 mois",
      cost: "NGN 500M libérés + $200K–$500K setup",
      alts: ["Custody UAE VARA", "Sandbox Ghana"],
      authority: "SEC Nigeria + CBN"
    },
    ke: {
      regime: "VASP Act 2025 — la custody est une activité sous licence de la CMA",
      risk: "med",
      licenses: ["Licence VASP custody (CMA)", "Notification FRC"],
      obligations: ["Ségrégation des actifs clients", "KYC/AML selon POCAMLA", "Best practices cold storage", "Couverture d'assurance", "Reporting trimestriel à la CMA"],
      time: "9–15 mois",
      cost: "KES 10M–30M (~$80K–$240K)",
      alts: ["FSCA Afrique du Sud", "UAE VARA"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP — catégorie custody sous la FAIS Act (2023+)",
      risk: "med",
      licenses: ["Licence CASP — catégorie custody", "Enregistrement FIC"],
      obligations: ["Ségrégation des actifs", "Contrôles type SOC 2", "Couverture assurance PI", "Évaluation des risques clients", "Travel Rule depuis avril 2023", "Audit annuel FSCA"],
      time: "6–12 mois",
      cost: "ZAR 2M–6M (~$110K–$330K)",
      alts: ["Custody UAE VARA", "UK FCA"],
      authority: "FSCA + FIC + SARB"
    },
    lu: {
      regime: "MiCA CASP Art. 75 (CSSF) + catégories PFS/PSF sous la Loi du 5 avril 1993",
      risk: "med",
      licenses: ["Agrément CASP custody CSSF", "PSF Art. 29-3/29-4 (service d'actifs clients) optionnel pour institutionnels", "Licence de dépositaire professionnel si fonds"],
      obligations: ["Ségrégation des actifs (on-chain + off-chain)", "Responsabilité en cas de perte (MiCA Art. 75)", "Gouvernance CSSF + cybersécurité", "Assurance ou couverture en fonds propres", "Règles d'externalisation Circulaire 22/806", "Cadre risques ICT DORA"],
      time: "9–18 mois",
      cost: "€150K–€500K",
      alts: ["Token Custodian TVTG Liechtenstein", "FINMA Suisse", "Irlande / Lituanie MiCA"],
      authority: "CSSF (Commission de Surveillance du Secteur Financier)",
      xrplNote: "Le Luxembourg est un hub majeur pour les fund services. La custody XRPL MPC/TSS convient aux dépositaires institutionnels sous statut PSF. Fireblocks et Taurus sont actifs sur le marché luxembourgeois."
    },
    ky: {
      regime: "Virtual Asset (Service Providers) Act 2020 — catégorie Custody",
      risk: "med",
      licenses: ["Enregistrement VASP — custody d'actifs virtuels (CIMA)", "Voie sandbox alternative pour les modèles de custody innovants", "Licence de trust company si structure trust"],
      obligations: ["Majorité en cold storage (guidance CIMA)", "Ségrégation des actifs + bankruptcy remoteness", "AML selon AMLR 2020", "MLRO + DMLRO", "Honorabilité + audit annuel", "Contrôles de cybersécurité"],
      time: "6–12 mois",
      cost: "$75K–$250K — impôt sur les sociétés 0%",
      alts: ["BVI VASP custody", "Bermudes DABA", "Dubaï VARA custody"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "Conditions opérationnelles custody CSA Staff Notice 21-332 + FINTRAC MSB + règles provinciales qualified-custodian",
      risk: "high",
      licenses: ["Enregistrement FINTRAC MSB", "CSA Pre-Registration Undertaking avec conditions custody", "Statut qualified custodian selon NI 31-103 / NI 81-102 (pour fonds)", "Adhésion OCRI si investment dealer"],
      obligations: ["Ségrégation + bankruptcy remoteness (SN 21-332)", "Minimum 80 % cold storage chez un tiers custodian acceptable (condition opérationnelle CSA)", "Assurance (crime + cyber)", "SOC 2 Type II", "Independent systems review (ISR)", "KYC/AML + Travel Rule (C$1K)"],
      time: "12–24 mois",
      cost: "C$400K–C$1,5M+",
      alts: ["Trust charter d'État américain (Wyoming SPDI)", "UE MiCA CASP", "Bermudes DABA"],
      authority: "FINTRAC + CSA / OSC / AMF + OCRI",
      xrplNote: "Les custodians institutionnels canadiens (Tetra Trust, Balance) s'appuient sur des stacks MPC / HSM. La custody XRPL via Fireblocks / BitGo est la voie typique pour les entités régulées canadiennes."
    },
    vg: {
      regime: "Virtual Asset Service Providers Act 2022 — catégorie Custody Services",
      risk: "med",
      licenses: ["Enregistrement VASP — custody services (BVI FSC)", "Structure BVI Business Company"],
      obligations: ["Ségrégation des actifs clients", "Contrôles cold storage / gestion des clés (FSC Circular 43/2025)", "Authentification multi-facteurs + journaux d'audit", "MLRO nommé + approuvé par la FSC", "Comptes audités annuels", "Cybersécurité + plan de continuité"],
      time: "4–12 mois",
      cost: "$150K–$400K — impôt sur les sociétés 0%",
      alts: ["Cayman custody", "Bermudes DABA", "Dubaï VARA custody"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Digital Assets Framework Act 2026 — Tokenised Custody Platform + AFSL ASIC",
      risk: "med",
      licenses: ["AFSL ASIC — catégorie tokenised custody platform", "Enregistrement AUSTRAC DCE si on-ramp", "Adhésion AFCA"],
      obligations: ["Ségrégation des actifs clients + règles de custody (Corporations Act)", "Assurance / compensation arrangements", "Standards de gestion des clés + cybersécurité", "Conformité ASIC Regulatory Guide 133 (trust money)", "KYC/AML + Travel Rule (31 mars 2026)"],
      time: "9–18 mois",
      cost: "A$300K–A$1,2M",
      alts: ["Singapour MAS", "Liechtenstein TVTG", "Dubaï VARA"],
      authority: "ASIC + AUSTRAC"
    },
    mt: {
      regime: "MiCA CASP Art. 75 (MFSA) — transition depuis VFA Custodian Class 2",
      risk: "med",
      licenses: ["Agrément CASP custody MFSA", "Voie simplifiée Art. 143(6) pour les titulaires VFA Class 2 historiques"],
      obligations: ["Ségrégation des actifs", "Responsabilité en cas de perte (MiCA Art. 75)", "Gouvernance + cybersécurité du MFSA Rulebook", "Assurance ou couverture en fonds propres", "Cadre risques ICT DORA", "Substance locale"],
      time: "6–12 mois (Catégorie A) / 12–18 mois (Catégorie B)",
      cost: "€100K–€400K",
      alts: ["Lituanie MiCA", "Liechtenstein TVTG", "Luxembourg CSSF"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 — activité custody digital-asset business",
      risk: "med",
      licenses: ["DABA Class F (complète) ou Class M (modifiée / sandbox) — activité custody"],
      obligations: ["Ségrégation des actifs clients + protections type trust", "BMA Cyber Risk Management Code + résilience opérationnelle", "AML/ATF selon POCA", "Actifs nets minimums selon la classe", "Assurance (attente BMA)", "Audit annuel + retours trimestriels"],
      time: "6–12 mois",
      cost: "BMD 75K–350K",
      alts: ["Cayman custody", "BVI VASP", "Dubaï VARA custody"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP Art. 75 (Lietuvos bankas) — remplace l'enregistrement VASP custody historique",
      risk: "med",
      licenses: ["Agrément CASP custody Lietuvos bankas", "Enregistrement VASP transitoire valable jusqu'au 1er juillet 2026"],
      obligations: ["Ségrégation des actifs clients", "Responsabilité en cas de perte (MiCA Art. 75)", "Capital min. €150K (custody)", "AML selon la Loi AML lituanienne", "Dirigeant local + responsable AML", "Cadre risques ICT DORA"],
      time: "6–12 mois",
      cost: "€75K–€250K",
      alts: ["Luxembourg CSSF", "Liechtenstein TVTG", "Malte MFSA"],
      authority: "Lietuvos bankas (Banque de Lituanie)"
    },
    ie: {
      regime: "Service custody CASP CBI sous MiCA Art. 75 + cadre de services financiers existant",
      risk: "med",
      licenses: ["Agrément CASP CBI — catégorie custody", "Exigences de safeguarding sous MiCA Art. 75", "Licence custody bancaire complète en option (chevauchement finance traditionnelle)"],
      obligations: ["Ségrégation des actifs clients (on-chain + off-chain)", "Politiques de safeguarding + rapprochement trimestriel", "Responsabilité en cas de perte (MiCA Art. 75)", "KYC/AML selon CJA 2010", "Régime Fitness & Probity CBI", "Résilience opérationnelle DORA (depuis janv. 2025)", "Assurance responsabilité professionnelle"],
      time: "12–18 mois",
      cost: "€200K–€500K",
      alts: ["Liechtenstein TVTG", "Luxembourg CSSF", "Allemagne BaFin"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // DAPP \u2014 FINANCIÈRE (DEX, AMM, Lending)
  // ═══════════════════════════════════════════════════════════════
  dapp_fin: {
    eu: {
      regime: "MiCA CASP (si opérateur identifiable) ou exclusion DeFi",
      risk: "high",
      licenses: ["Agrément CASP si opérateur identifiable", "DLT Pilot Regime (pour security tokens)"],
      obligations: ["Si CASP : KYC/AML complet, capital, livre blanc", "Si véritablement décentralisé : exclusion MiCA (pas d'opérateur identifiable)", "Analyse de l'opérateur front-end requise", "Règles d'abus de marché si tokens cotés"],
      time: "12\u201318 mois (si CASP nécessaire)",
      cost: "\u20AC50K\u2013\u20AC200K",
      alts: ["Liechtenstein TVTG", "Suisse (position DeFi flexible)", "Singapour MAS"],
      authority: "AMF (France) / ESMA",
      xrplNote: "DEX natif XRPL + AMM (XLS-30) : fonctionnalités au niveau du protocole sans opérateur unique. Cependant, un DApp front-end routant les utilisateurs vers le DEX/AMM XRPL peut déclencher des obligations CASP s'il contrôle le flux d'ordres ou le routage des fonds. Le test de décentralisation type DFSA s'applique."
    },
    us: {
      regime: "Compétence SEC / CFTC + FinCEN MSB",
      risk: "high",
      licenses: ["FinCEN MSB (si manipulation de fonds)", "SEC broker-dealer (si titres financiers)", "Enregistrement CFTC (si dérivés/swaps)"],
      obligations: ["Analyse du Howey Test pour chaque token", "BSA/AML", "Filtrage OFAC", "Risque potentiel d'enforcement SEC"],
      time: "18\u201336 mois",
      cost: "$200K\u2013$1M+",
      alts: ["UE MiCA (règles DeFi plus claires)", "Singapour (plus pragmatique)"],
      authority: "SEC / CFTC / FinCEN",
      xrplNote: "AMM et DEX XRPL : la SEC peut considérer les interfaces front-end comme facilitant un exchange non enregistré. XRP n'est pas un titre financier sur le marché secondaire, mais d'autres tokens XRPL nécessitent une analyse Howey individuelle."
    },
    uae: {
      regime: "VARA \u2014 cadre DeFi (en évolution)",
      risk: "med",
      licenses: ["Licence VARA VASP (si opérateur identifiable)"],
      obligations: ["KYC/AML", "Audit des smart contracts", "Cadre de gouvernance", "Exigences de capital"],
      time: "6\u201312 mois",
      cost: "$50K\u2013$150K",
      alts: ["Singapour MAS", "Liechtenstein TVTG", "UE MiCA"],
      authority: "VARA Dubaï"
    },
    sg: {
      regime: "MAS PSA \u2014 prestataire de service DPT",
      risk: "med",
      licenses: ["Licence MPI/SPI si facilitation d'échange", "Exemption si entièrement décentralisé"],
      obligations: ["KYC/AML", "Tech Risk Management", "Protection des utilisateurs"],
      time: "6\u201312 mois",
      cost: "SGD 50K\u2013150K",
      alts: ["Dubaï VARA", "UE MiCA", "Liechtenstein TVTG"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 enregistrement crypto business",
      risk: "med",
      licenses: ["Enregistrement FCA", "Périmètre MiFID II possible (si dérivés)"],
      obligations: ["AML/KYC", "Consumer Duty", "Promotions financières"],
      time: "12\u201318 mois",
      cost: "\u00A330K\u2013\u00A3100K",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 licence VATP (si éléments centralisés)",
      risk: "high",
      licenses: ["Licence SFC VASP", "Type 7 si trading automatisé"],
      obligations: ["KYC/AML AMLO", "Audit des smart contracts", "Protection des investisseurs particuliers"],
      time: "12\u201318 mois",
      cost: "HKD 500K\u20131.5M",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 analyse DeFi au cas par cas",
      risk: "med",
      licenses: ["VQF/OAR (AML)", "Licence FinTech ou DLT si applicable"],
      obligations: ["AML si intermédiaire financier", "KYC pour on/off-ramps"],
      time: "6\u201312 mois",
      cost: "CHF 30K\u2013200K",
      alts: ["Liechtenstein TVTG", "UE MiCA"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 plusieurs types de SP applicables",
      risk: "low",
      licenses: ["Licence(s) SP pertinente(s) de la FMA"],
      obligations: ["AML TVTG", "Honorabilité", "Documentation des smart contracts"],
      time: "3\u20139 mois",
      cost: "CHF 15K\u201380K",
      alts: ["Suisse FINMA", "UE MiCA via EEE"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "FSA — CAESP ou Financial Instruments (selon fonction)",
      risk: "high",
      licenses: ["Enregistrement CAESP (si fonction d'exchange)", "Type I/II Financial Instruments Business (si dérivés/lending)"],
      obligations: ["KYC/AML", "Protection des actifs utilisateurs", "Conformité FSA", "Audit des smart contracts recommandé"],
      time: "12–24 mois",
      cost: "¥10M–¥50M ($70K–$350K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon",
      xrplNote: "DEX natif XRPL + AMM (XLS-30) : la FSA peut considérer un DApp front-end comme CAESP s'il facilite l'échange. L'AMM au niveau du protocole n'a pas d'opérateur — mais une analyse du front-end est requise."
    },
    kr: {
      regime: "VASP + sandbox fintech FSC potentielle",
      risk: "high",
      licenses: ["Enregistrement VASP", "Certification ISMS-P", "Sandbox FSC pour produits innovants"],
      obligations: ["KYC avec comptes nominatifs", "AML/AMLCFT", "Sécurité ISMS-P"],
      time: "12–18 mois",
      cost: "₩100M–₩500M ($75K–$375K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FIU / FSC Corée"
    },
    in: {
      regime: "Pas de cadre DeFi spécifique — fiscalité VDA applicable",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Pas de licence spécifique DeFi"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML selon PMLA si éléments centralisés"],
      time: "3–6 mois",
      cost: "₹5L–₹20L ($6K–$24K)",
      alts: ["Singapour", "Dubaï VARA"],
      authority: "FIU-IND / SEBI"
    },
    br: {
      regime: "BCB VASP + supervision CVM (si élément titre financier)",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers/dérivés"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$150K–R$600K ($30K–$120K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "SEC Nigeria DASP — DeFi traité comme non régulé sauf si opérateur identifiable ; risque d'enforcement élevé",
      risk: "high",
      licenses: ["SEC Nigeria DASP si opérateur identifiable", "Structure offshore typique (UAE/Cayman)"],
      obligations: ["KYC/AML selon MLPPA 2022 si opérateur", "Restrictions forex Naira", "Protection consommateurs"],
      time: "18–36 mois (si poursuivi)",
      cost: "NGN 500M+ ($500K+) — la plupart du DeFi opère offshore",
      alts: ["UAE VARA", "Cayman VASP"],
      authority: "SEC Nigeria + CBN"
    },
    ke: {
      regime: "VASP Act 2025 — la couverture DeFi dépend de l'identifiabilité de l'opérateur ; front-end typiquement enregistré",
      risk: "med",
      licenses: ["VASP CMA si opérateur identifiable", "Voie sandbox possible"],
      obligations: ["KYC/AML selon POCAMLA si custody/exécution", "Protection consommateurs", "3% Digital Asset Tax si frais de service"],
      time: "9–18 mois",
      cost: "KES 10M–40M ($75K–$310K)",
      alts: ["UAE VARA", "Afrique du Sud FSCA"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP — la couverture DeFi dépend de l'identifiabilité de l'opérateur ; Cat 1 pour conseil/arrangement, Cat 2 si custody",
      risk: "med",
      licenses: ["CASP Cat 1 ou 2 selon le rôle de l'opérateur", "SARB uniquement si ZAR transfrontalier"],
      obligations: ["AML FICA + Travel Rule (avril 2023)", "Protection consommateurs sous FAIS"],
      time: "6–12 mois (Cat 1)\n12–18 mois (Cat 2)",
      cost: "ZAR 1M–10M ($55K–$550K)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "MiCA CASP (CSSF) si opérateur identifiable, sinon exclusion DeFi sous Recital 22",
      risk: "med",
      licenses: ["Agrément CASP CSSF si l'opérateur contrôle front-end / flux d'ordres", "Licence MiFID si security tokens"],
      obligations: ["KYC/AML si CASP", "Capital min. €125K", "Règles d'abus de marché (MAR) si tokens cotés"],
      time: "9–15 mois",
      cost: "€150K–€500K",
      alts: ["Liechtenstein TVTG", "Suisse FINMA"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act 2020 — DeFi souvent structuré en Foundation Company (pas d'opérateur identifiable)",
      risk: "low",
      licenses: ["Enregistrement VASP CIMA si opérateur identifiable", "Cayman Foundation Company comme structure operator-less"],
      obligations: ["AML selon AMLR si prestataire", "MLRO si licencié"],
      time: "3–9 mois",
      cost: "$50K–$200K — 0% d'impôt sur les sociétés",
      alts: ["BVI Foundation Company", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA Staff Notice 21-329 (plateformes de trading crypto) + FINTRAC MSB si custody/conversion",
      risk: "high",
      licenses: ["CSA Pre-Registration Undertaking si dealing", "FINTRAC MSB si conversion", "IIROC si investment dealer"],
      obligations: ["KYC/AML selon PCMLTFA", "Limites de leverage selon CSA Staff Notice 21-332", "Divulgations pré-trade"],
      time: "12–24 mois",
      cost: "C$300K–C$1M",
      alts: ["US — partenaire MTL", "UE MiCA"],
      authority: "CSA + FINTRAC"
    },
    vg: {
      regime: "BVI VASP Act 2022 — DeFi souvent structuré en BVI Foundation Company",
      risk: "low",
      licenses: ["Enregistrement VASP BVI si opérateur identifiable", "BVI Foundation Company comme structure operator-less"],
      obligations: ["AML selon AMLR si prestataire", "MLRO si licencié"],
      time: "3–9 mois",
      cost: "$50K–$200K — 0% d'impôt sur les sociétés",
      alts: ["Cayman Foundation Company", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC + Digital Assets Framework Act 2026 — la responsabilité de l'opérateur DeFi dépend de son identifiabilité",
      risk: "med",
      licenses: ["AFSL ASIC — Digital Asset Platform si opérateur", "AUSTRAC DCE si exchange-like"],
      obligations: ["KYC/AML selon AML/CTF Act 2006", "Protection consommateurs (Corporations Act)", "Reporting des manquements"],
      time: "9–18 mois",
      cost: "A$300K–A$1M",
      alts: ["Singapour MAS", "UAE VARA"],
      authority: "ASIC + AUSTRAC"
    },
    mt: {
      regime: "MiCA CASP (MFSA) si opérateur identifiable, sinon exclusion DeFi sous Recital 22",
      risk: "med",
      licenses: ["Agrément CASP MFSA si opérateur", "Transition VFA Act (ferme le 1er juillet 2026)"],
      obligations: ["KYC/AML si CASP", "Règles d'abus de marché", "Dirigeant maltais + officiers résidents"],
      time: "9–15 mois",
      cost: "€100K–€400K",
      alts: ["Lituanie MiCA", "Liechtenstein TVTG"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M — les opérateurs DeFi passent par une licence Class M modifiée (sandbox)",
      risk: "med",
      licenses: ["DABA Class M (sandbox) ou Class F (full)", "Approbation BMA"],
      obligations: ["AML/ATF selon POCA 1997", "BMA Cyber Risk Management Code", "Ségrégation des fonds clients"],
      time: "6–12 mois",
      cost: "BMD 75K–250K",
      alts: ["Cayman Foundation", "BVI Foundation"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) si opérateur identifiable, sinon exclusion DeFi",
      risk: "med",
      licenses: ["CASP Lietuvos bankas sous MiCA si opérateur", "VASP transitoire (jusqu'au 1er juillet 2026)"],
      obligations: ["KYC/AML selon la Loi AML lituanienne", "Capital min. €125K", "Dirigeant local + responsable AML"],
      time: "6–12 mois",
      cost: "€50K–€200K",
      alts: ["Estonie (en fermeture)", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "CASP CBI (MiCA) si opérateur identifiable, sinon exclusion DeFi",
      risk: "med",
      licenses: ["Agrément CASP CBI sous MiCA si l'opérateur contrôle front-end / exécution", "Licence MiFID investment firm si security tokens"],
      obligations: ["KYC/AML selon CJA 2010", "Règles d'abus de marché", "Résilience opérationnelle DORA (janv. 2025)"],
      time: "12–18 mois",
      cost: "€200K–€600K",
      alts: ["Lituanie MiCA", "Luxembourg CSSF"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // DAPP \u2014 UTILITAIRE (Social, Identité, DAO)
  // ═══════════════════════════════════════════════════════════════
  dapp_util: {
    eu: {
      regime: "Régime MiCA allégé (utility tokens) ou hors périmètre",
      risk: "low",
      licenses: ["Pas de CASP nécessaire si purement utility", "Notification du livre blanc à l'ANC si token >\u20AC1M"],
      obligations: ["Livre blanc (simplifié)", "Pas de marketing trompeur", "RGPD si traitement de données personnelles", "DAO : risque de requalification en société"],
      time: "1\u20133 mois",
      cost: "\u20AC5K\u2013\u20AC30K",
      alts: ["Liechtenstein TVTG (cadre DAO le plus complet)"],
      authority: "ANC / ESMA",
      xrplNote: "DApps d'identité ou sociaux basés sur XRPL utilisant des Trust Lines ou NFTs (XLS-20) pour les credentials : traitement utility token probable selon MiCA. Pas de CASP nécessaire en l'absence de service financier."
    },
    us: {
      regime: "Régulation fédérale minimale (si pas de service financier)",
      risk: "low",
      licenses: ["Pas de licence fédérale si pure utility", "Lois étatiques de protection des consommateurs applicables"],
      obligations: ["Analyse du Howey Test (s'assurer que ce n'est pas un titre financier)", "Lois de confidentialité (niveau étatique, CCPA)", "DAO : wrapper juridique recommandé (Wyoming DAO LLC)"],
      time: "1\u20133 mois",
      cost: "$5K\u2013$20K",
      alts: ["Wyoming (DAO LLC disponible)"],
      authority: "SEC (seulement si token = titre financier) / FTC"
    },
    uae: {
      regime: "Régulation minimale pour DApps pure utility",
      risk: "low",
      licenses: ["Avis VARA peut s'appliquer si tokens impliqués"],
      obligations: ["Protection des données (DIFC/ADGM)", "Protection des consommateurs"],
      time: "1\u20133 mois",
      cost: "$5K\u2013$20K",
      alts: ["Singapour", "UE"],
      authority: "VARA (consultatif)"
    },
    sg: {
      regime: "Non régulé si pas de service DPT",
      risk: "low",
      licenses: ["Pas de licence MAS si pure utility"],
      obligations: ["PDPA (protection des données)", "Protection des consommateurs"],
      time: "1\u20132 mois",
      cost: "SGD 5K\u201320K",
      alts: ["UE", "UAE"],
      authority: "MAS (seulement si DPT)"
    },
    uk: {
      regime: "Non régulé si pas de service financier",
      risk: "low",
      licenses: ["Pas d'enregistrement FCA si pure utility"],
      obligations: ["Consumer Rights Act", "UK GDPR", "Interdiction des promotions financières (si marketing de tokens)"],
      time: "1\u20132 mois",
      cost: "\u00A35K\u2013\u00A315K",
      alts: ["UE", "Singapour"],
      authority: "FCA (seulement si élément financier)"
    },
    hk: {
      regime: "Non régulé si pas de service VA",
      risk: "low",
      licenses: ["Pas de licence SFC si pure utility"],
      obligations: ["PDPO (protection des données)", "Protection des consommateurs"],
      time: "1\u20132 mois",
      cost: "HKD 20K\u201350K",
      alts: ["Singapour", "UE"],
      authority: "SFC (seulement si VA)"
    },
    ch: {
      regime: "Utility tokens \u2014 no-action FINMA",
      risk: "low",
      licenses: ["Pas de licence FINMA pour utility tokens purs"],
      obligations: ["AML uniquement si intermédiaire financier", "Protection des données"],
      time: "1\u20132 mois",
      cost: "CHF 5K\u201320K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 exigences SP allégées",
      risk: "low",
      licenses: ["Enregistrement SP (simplifié) ou licence complète selon le service"],
      obligations: ["AML TVTG (allégé)", "Exigences documentaires"],
      time: "1\u20133 mois",
      cost: "CHF 5K\u201325K",
      alts: ["Suisse", "UE"],
      authority: "FMA Liechtenstein"
    },
    jp: {
      regime: "Régulation minimale si pas de fonction d'exchange de crypto-actifs",
      risk: "low",
      licenses: ["Pas de licence FSA pour pure utility", "CAESP si échange de tokens impliqué"],
      obligations: ["Protection des consommateurs (Act on Specified Commercial Transactions)", "Protection des données (APPI)"],
      time: "1–3 mois",
      cost: "¥1M–¥5M ($7K–$35K)",
      alts: ["Singapour", "UE"],
      authority: "FSA (seulement si crypto-actif)"
    },
    kr: {
      regime: "Non régulé si pas de service VA",
      risk: "low",
      licenses: ["Pas d'enregistrement VASP si pure utility"],
      obligations: ["PIPA (protection des données)", "Protection des consommateurs"],
      time: "1–2 mois",
      cost: "₩10M–₩30M ($7K–$22K)",
      alts: ["Japon", "Singapour"],
      authority: "FSC (seulement si VA)"
    },
    in: {
      regime: "Pas de régulation spécifique pour DApps utility",
      risk: "low",
      licenses: ["Enregistrement FIU si VDA impliqué"],
      obligations: ["Conformité IT Act", "Protection des données (DPDP Act 2023)"],
      time: "1–2 mois",
      cost: "₹2L–₹10L ($2.4K–$12K)",
      alts: ["Singapour", "UE"],
      authority: "MeitY / FIU-IND"
    },
    br: {
      regime: "Régulation minimale pour pure utility",
      risk: "low",
      licenses: ["BCB VASP uniquement si service VA"],
      obligations: ["Protection des consommateurs (CDC)", "LGPD (protection des données)"],
      time: "1–3 mois",
      cost: "R$20K–R$100K ($4K–$20K)",
      alts: ["UE", "Singapour"],
      authority: "BCB (seulement si VA)"
    },
    ng: { regime: "SEC Nigeria DASP uniquement si élément financier ; DApps pure utility hors scope", risk: "low", licenses: ["Pas de licence pour pure utility", "DASP si service financier tokenisé"], obligations: ["Protection consommateurs", "Protection données selon NDPR"], time: "1–3 mois", cost: "NGN 10M–50M ($10K–$50K)", alts: ["UAE", "UE MiCA"], authority: "SEC Nigeria (seulement si VA)" },
    ke: { regime: "VASP Act 2025 — DApps utility hors scope sauf service financier", risk: "low", licenses: ["Pas de licence pour pure utility", "VASP CMA si élément financier"], obligations: ["Protection consommateurs", "DPA 2019 protection des données"], time: "1–3 mois", cost: "KES 2M–10M ($15K–$75K)", alts: ["UAE VARA", "Afrique du Sud"], authority: "CMA (seulement si VA)" },
    za: { regime: "FSCA uniquement si financier ; sinon POPIA + protection consommateurs", risk: "low", licenses: ["Pas de CASP pour pure utility", "CASP Cat 1 si élément financier"], obligations: ["POPIA protection des données", "Protection consommateurs"], time: "1–3 mois", cost: "ZAR 200K–1M ($12K–$55K)", alts: ["UAE VARA"], authority: "FSCA (seulement si VA)" },
    lu: { regime: "MiCA light — DApps pure utility hors scope", risk: "low", licenses: ["Pas de CASP pour pure utility", "CASP CSSF si financier"], obligations: ["RGPD", "Protection consommateurs"], time: "1–3 mois", cost: "€20K–€100K", alts: ["Liechtenstein TVTG", "Suisse"], authority: "CSSF (seulement si financier)" },
    ky: { regime: "Pure utility hors VASP Act — généralement non régulé", risk: "low", licenses: ["Pas de VASP pour pure utility"], obligations: ["Protection des données (DPA 2017)", "AML si transferts de tokens"], time: "1–3 mois", cost: "$20K–$80K — 0% d'impôt sur les sociétés", alts: ["BVI", "Liechtenstein"], authority: "N/A" },
    ca: { regime: "Généralement hors CSA/FINTRAC si pure utility — Canadian Privacy Act s'applique", risk: "low", licenses: ["Pas de licence pour pure utility", "FINTRAC MSB si transferts > seuil"], obligations: ["Vie privée PIPEDA", "Protection consommateurs"], time: "1–3 mois", cost: "C$50K–C$200K", alts: ["US", "UE"], authority: "N/A (commissaires à la vie privée)" },
    vg: { regime: "Pure utility hors VASP Act — généralement non régulé", risk: "low", licenses: ["Pas de VASP pour pure utility"], obligations: ["BVI Data Protection Act 2021", "AML si transferts"], time: "1–3 mois", cost: "$20K–$80K — 0% d'impôt sur les sociétés", alts: ["Cayman", "Liechtenstein"], authority: "N/A" },
    au: { regime: "ASIC uniquement si produit financier ; Privacy Act 1988 sinon", risk: "low", licenses: ["Pas d'AFSL pour pure utility", "AFSL ASIC si produit financier"], obligations: ["Australian Privacy Principles", "Australian Consumer Law"], time: "1–3 mois", cost: "A$50K–A$200K", alts: ["Singapour", "UAE"], authority: "N/A (commissaire vie privée)" },
    mt: { regime: "MiCA light — DApps pure utility hors scope ; RGPD s'applique", risk: "low", licenses: ["Pas de CASP pour pure utility", "CASP MFSA si financier"], obligations: ["RGPD", "Protection consommateurs"], time: "1–3 mois", cost: "€20K–€80K", alts: ["Liechtenstein TVTG", "Lituanie"], authority: "MFSA (seulement si financier)" },
    bm: { regime: "Pure utility hors DABA — sandbox BMA Digital Asset dispo si novateur", risk: "low", licenses: ["Pas de DABA pour pure utility", "DABA Class M (sandbox) si modèle novateur"], obligations: ["PIPA protection des données", "Protection consommateurs"], time: "1–3 mois", cost: "BMD 30K–100K", alts: ["Cayman", "BVI"], authority: "N/A" },
    lt: { regime: "MiCA light — pure utility hors scope ; RGPD s'applique", risk: "low", licenses: ["Pas de CASP pour pure utility", "CASP Lietuvos bankas si financier"], obligations: ["RGPD", "Protection consommateurs Lituanie"], time: "1–3 mois", cost: "€15K–€60K", alts: ["Malte MiCA", "Liechtenstein"], authority: "N/A (seulement si financier)" },
    ie: { regime: "MiCA light — pure utility hors scope ; RGPD + Data Protection Act irlandais s'appliquent", risk: "low", licenses: ["Pas de CASP CBI pour pure utility", "CASP CBI si élément financier"], obligations: ["RGPD + Data Protection Act 2018", "Code de protection des consommateurs (CBI)"], time: "1–3 mois", cost: "€40K–€150K", alts: ["Luxembourg", "Malte"], authority: "N/A (seulement si financier)" },
  },

  // ═══════════════════════════════════════════════════════════════
  // MINTING NFT / MARKETPLACE
  // ═══════════════════════════════════════════════════════════════
  nft: {
    eu: {
      regime: "Exclusion MiCA (NFTs uniques) ou ART (si série fongible)",
      risk: "med",
      licenses: ["Pas de CASP pour NFTs véritablement uniques 1/1", "CASP + règles ART si grande série fongible", "CASP marketplace si intermédiation des échanges"],
      obligations: ["Évaluation d'unicité (MiCA Art. 4)", "AML si marketplace", "Protection des consommateurs (vente à distance)", "Gestion des droits de PI"],
      time: "3\u20136 mois (marketplace) ou 1 mois (NFTs 1/1)",
      cost: "\u20AC10K\u2013\u20AC100K",
      alts: ["Liechtenstein TVTG", "Singapour (approche souple)"],
      authority: "ANC / ESMA",
      xrplNote: "NFTs XRPL (XLS-20) : standard natif avec broker mode. Le broker mode permet une marketplace non-custodiale \u2014 swap atomique, le broker ne détient jamais le NFT. Pas de CASP nécessaire pour le broker mode. TransferFee permet des royalties on-chain (0\u201350%)."
    },
    us: {
      regime: "Analyse SEC requise (Howey Test par collection)",
      risk: "med",
      licenses: ["Pas de licence NFT spécifique", "Enregistrement SEC si qualifié de titre financier", "Protection des consommateurs d'État"],
      obligations: ["Analyse Howey Test par collection", "Conformité PI/copyright", "Considérations fiscales sur les ventes (État)", "AML si marketplace avec volume"],
      time: "1\u20136 mois",
      cost: "$10K\u2013$100K",
      alts: ["UE (exclusion MiCA pour NFTs uniques)", "Singapour"],
      authority: "SEC / FTC / régulateurs d'État"
    },
    uae: {
      regime: "VARA \u2014 VA Advisory pour NFTs",
      risk: "low",
      licenses: ["Avis VARA (orientations spécifiques NFT)", "Licence VASP complète pour marketplace"],
      obligations: ["AML pour marketplace", "Protection des consommateurs"],
      time: "3\u20136 mois",
      cost: "$20K\u2013$75K",
      alts: ["Singapour", "Exclusion UE MiCA"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS \u2014 généralement hors périmètre PSA",
      risk: "low",
      licenses: ["Pas de licence MAS pour NFTs uniques", "PSA si NFT utilisé comme DPT"],
      obligations: ["Protection des consommateurs", "AML si marketplace"],
      time: "1\u20133 mois",
      cost: "SGD 10K\u201350K",
      alts: ["UAE", "UE"],
      authority: "MAS (seulement si DPT)"
    },
    uk: {
      regime: "FCA \u2014 non régulé (NFTs uniques)",
      risk: "low",
      licenses: ["Pas d'enregistrement FCA pour NFTs uniques", "Enregistrement si fractionné ou fongible"],
      obligations: ["Consumer Rights Act", "AML si marketplace", "Promotions financières (si investissement)"],
      time: "1\u20133 mois",
      cost: "\u00A35K\u2013\u00A330K",
      alts: ["UE", "Singapour"],
      authority: "FCA (limité)"
    },
    hk: {
      regime: "SFC \u2014 évaluation au cas par cas",
      risk: "low",
      licenses: ["Licence SFC si fractionné ou assimilable à un titre financier"],
      obligations: ["AML AMLO si marketplace", "Protection des consommateurs"],
      time: "1\u20136 mois",
      cost: "HKD 20K\u2013200K",
      alts: ["Singapour", "UAE"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 pas de règles NFT spécifiques",
      risk: "low",
      licenses: ["Pas de licence FINMA pour NFTs uniques", "Droit des titres financiers si NFTs d'investissement"],
      obligations: ["AML si intermédiaire financier", "Protection des consommateurs"],
      time: "1\u20133 mois",
      cost: "CHF 10K\u201340K",
      alts: ["Liechtenstein TVTG", "UE"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 modèle Token as container",
      risk: "low",
      licenses: ["Licence SP si prestation de services NFT"],
      obligations: ["AML TVTG", "Documentation de classification du token"],
      time: "1\u20133 mois",
      cost: "CHF 10K\u201340K",
      alts: ["Suisse", "UE"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — NFTs généralement non régulés sauf si fongibles/financiers",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "Pas de régulation NFT spécifique — VASP si exchange",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "Taxe VDA sur transactions NFT (30%)",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "Pas de cadre NFT spécifique — BCB/CVM si financier",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "SEC Nigeria — DASP ; les NFTs relèvent des règles actifs numériques si financiers. Pas de cadre NFT spécifique",
      risk: "med",
      licenses: ["SEC Nigeria DASP si fractionné/financier", "Enregistrement copyright (Nigerian Copyright Commission)"],
      obligations: ["KYC/AML si DASP", "Protection consommateurs", "Conformité copyright"],
      time: "9–18 mois",
      cost: "NGN 100M–500M ($100K–$500K)",
      alts: ["UAE VARA", "UE MiCA"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "VASP Act 2025 — NFTs traités comme actifs numériques ; droit du copyright s'applique",
      risk: "low",
      licenses: ["VASP CMA si trading secondaire", "Enregistrement copyright (KECOBO)"],
      obligations: ["KYC/AML selon POCAMLA si trading", "3% Digital Asset Tax", "Conformité copyright"],
      time: "6–12 mois",
      cost: "KES 5M–20M ($40K–$150K)",
      alts: ["UAE VARA", "Afrique du Sud FSCA"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CASP (si NFT financier) — sinon pas de cadre NFT spécifique. Copyright Act s'applique",
      risk: "low",
      licenses: ["CASP Catégorie I ou II si fractionné/financier", "Enregistrement copyright si applicable"],
      obligations: ["FICA AML si financier", "Conformité copyright", "POPIA protection des données"],
      time: "6–12 mois",
      cost: "ZAR 500K–3M ($30K–$165K)",
      alts: ["UAE VARA", "Singapour MAS"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "MiCA exclut les NFTs uniques/non-fongibles (Art. 2(3)) ; les NFTs fractionnés relèvent de MiCA/MiFID",
      risk: "low",
      licenses: ["Pas de CASP pour NFTs uniques", "CASP CSSF si fractionné/trading secondaire", "MiFID si NFT security"],
      obligations: ["KYC/AML si CASP déclenché", "Copyright + TVA sur royalties"],
      time: "3–9 mois (si CASP pas nécessaire)",
      cost: "€30K–€200K",
      alts: ["Liechtenstein TVTG", "Suisse"],
      authority: "CSSF"
    },
    ky: {
      regime: "NFTs généralement hors VASP Act sauf si fractionnés/financiers ; Cayman Foundation populaire pour DAO NFT",
      risk: "low",
      licenses: ["Pas de VASP si NFTs uniques", "VASP CIMA si fractionné/secondaire", "Cayman Foundation pour DAO de créateur"],
      obligations: ["AML si VASP s'applique", "Conformité copyright"],
      time: "2–6 mois",
      cost: "$30K–$150K — 0% d'impôt sur les sociétés",
      alts: ["BVI Foundation", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA — NFTs au cas par cas ; les fractionnés ou à rendement sont traités comme titres (Howey-like)",
      risk: "med",
      licenses: ["Pas de licence pour NFTs uniques/collectibles", "Prospectus CSA + enregistrement dealer si fractionné/security", "FINTRAC MSB si custody"],
      obligations: ["KYC/AML si dealer", "Conformité copyright", "Protection consommateurs"],
      time: "6–18 mois",
      cost: "C$100K–C$500K",
      alts: ["Reg D US (fractionné)", "UE MiCA"],
      authority: "CSA"
    },
    vg: {
      regime: "NFTs généralement hors VASP Act sauf si fractionnés ; BVI Foundation populaire pour DAO de créateur",
      risk: "low",
      licenses: ["Pas de VASP si NFTs uniques", "VASP BVI si fractionné/secondaire", "BVI Foundation pour DAO de créateur"],
      obligations: ["AML si VASP s'applique", "Conformité copyright"],
      time: "2–6 mois",
      cost: "$30K–$150K — 0% d'impôt sur les sociétés",
      alts: ["Cayman Foundation", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC — classification NFT produit financier au cas par cas ; fractionné traité comme MIS (managed investment scheme)",
      risk: "med",
      licenses: ["Pas de licence pour NFTs uniques", "AFSL ASIC si MIS", "AUSTRAC DCE si marketplace avec custody"],
      obligations: ["KYC/AML si licencié", "Conformité copyright", "Australian Consumer Law"],
      time: "6–15 mois",
      cost: "A$100K–A$500K",
      alts: ["Singapour MAS", "UAE VARA"],
      authority: "ASIC"
    },
    mt: {
      regime: "MiCA exclut les NFTs uniques (Art. 2(3)) ; les NFTs fractionnés relèvent de MiCA/MiFID via MFSA",
      risk: "low",
      licenses: ["Pas de CASP pour NFTs uniques", "CASP MFSA si fractionné/secondaire", "MiFID si NFT security"],
      obligations: ["KYC/AML si CASP déclenché", "Copyright + TVA sur royalties"],
      time: "3–9 mois",
      cost: "€30K–€200K",
      alts: ["Lituanie MiCA", "Liechtenstein TVTG"],
      authority: "MFSA"
    },
    bm: {
      regime: "NFTs typiquement hors DABA sauf si fractionnés ; sandbox BMA Digital Asset dispo pour designs novateurs",
      risk: "low",
      licenses: ["Pas de DABA pour NFTs uniques", "DABA Class M (sandbox) pour fractionné/nouveaux modèles"],
      obligations: ["AML si licencié", "Conformité copyright"],
      time: "3–9 mois",
      cost: "BMD 50K–200K",
      alts: ["Cayman Foundation", "BVI Foundation"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA exclut les NFTs uniques (Art. 2(3)) ; les NFTs fractionnés relèvent de MiCA via Lietuvos bankas",
      risk: "low",
      licenses: ["Pas de CASP pour NFTs uniques", "CASP Lietuvos bankas si fractionné/secondaire", "MiFID si NFT security"],
      obligations: ["KYC/AML si CASP déclenché", "Conformité copyright"],
      time: "3–9 mois",
      cost: "€20K–€150K",
      alts: ["Malte MiCA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "MiCA exclut les NFTs uniques (Art. 2(3)) ; les NFTs fractionnés relèvent de MiCA/MiFID via CBI",
      risk: "low",
      licenses: ["Pas de CASP pour NFTs uniques", "CASP CBI si fractionné/trading secondaire", "Investment firm MiFID si NFT security"],
      obligations: ["KYC/AML selon CJA 2010 si CASP", "Conformité copyright", "Code de protection des consommateurs"],
      time: "6–12 mois",
      cost: "€50K–€300K",
      alts: ["Luxembourg CSSF", "Malte MFSA"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // MPT / MULTI-PURPOSE TOKEN (XLS-33)
  // ═══════════════════════════════════════════════════════════════
  mpt: {
    eu: {
      regime: "MiCA \u2014 classification selon l'usage (Utility/EMT/ART)",
      risk: "high",
      licenses: ["CASP si prestation de services autour du MPT", "EMI si adossé au fiat", "Agrément ANC si ART"],
      obligations: ["Qualification juridique obligatoire avant lancement", "Livre blanc", "KYC/AML", "lsfRequireAuth permet un gating KYC on-chain", "lsfLocked permet des retenues AML"],
      time: "6\u201318 mois",
      cost: "\u20AC50K\u2013\u20AC300K",
      alts: ["Liechtenstein TVTG (classification des tokens flexible)", "Suisse FINMA"],
      authority: "ANC / ESMA",
      xrplNote: "MPT (XLS-33) est le standard de tokens programmables de XRPL. Pas de catégorie MiCA explicite à ce jour. lsfRequireAuth = gating KYC on-chain. lsfLocked = retenues AML. Frais de transfert programmables. Qualification juridique critique avant lancement."
    },
    us: {
      regime: "Analyse SEC/CFTC requise par cas d'usage",
      risk: "high",
      licenses: ["Dépend de la classification (titre financier vs commodité vs utility)", "Enregistrement SEC si titre financier", "CFTC si dérivé de commodité"],
      obligations: ["Analyse Howey Test", "Si titre financier : exemptions Reg D/Reg S/Reg A+", "BSA/AML si service financier"],
      time: "6\u201324 mois",
      cost: "$100K\u2013$500K",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "SEC / CFTC"
    },
    uae: {
      regime: "VARA \u2014 classification du token au cas par cas",
      risk: "med",
      licenses: ["Licence VARA VASP selon l'usage du token"],
      obligations: ["Dépôt de classification du token", "KYC/AML", "Audit des smart contracts"],
      time: "6\u201312 mois",
      cost: "$50K\u2013$150K",
      alts: ["Singapour", "UE MiCA", "Liechtenstein TVTG"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS PSA si DPT, SFA si titre financier",
      risk: "med",
      licenses: ["MPI/SPI si DPT", "Capital Markets Services licence si titre financier"],
      obligations: ["Classification du token", "KYC/AML", "Tech Risk Management"],
      time: "6\u201312 mois",
      cost: "SGD 50K\u2013200K",
      alts: ["UAE", "UE MiCA"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 dépend de la classification du token",
      risk: "med",
      licenses: ["Enregistrement FCA si cryptoasset", "Autorisation FCA si security token"],
      obligations: ["Classification du token", "AML/KYC", "Consumer Duty si clientèle de détail"],
      time: "6\u201318 mois",
      cost: "\u00A330K\u2013\u00A3150K",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 au cas par cas",
      risk: "med",
      licenses: ["Licence SFC selon classification"],
      obligations: ["Avis juridique sur la classification", "AML AMLO"],
      time: "6\u201318 mois",
      cost: "HKD 200K\u20131M",
      alts: ["Singapour", "UAE"],
      authority: "SFC"
    },
    ch: {
      regime: "Cadre de classification des tokens FINMA",
      risk: "med",
      licenses: ["Dépend de la classification FINMA (paiement/utility/asset)"],
      obligations: ["Dépôt de classification FINMA", "AML si élément financier"],
      time: "3\u201312 mois",
      cost: "CHF 30K\u2013200K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Token as Container Model (le plus flexible)",
      risk: "low",
      licenses: ["Licence(s) SP pertinente(s)", "Classification du token par la FMA"],
      obligations: ["AML TVTG", "Documentation du token", "Honorabilité"],
      time: "3\u20139 mois",
      cost: "CHF 15K\u201380K",
      alts: ["Suisse FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "Classification du token FSA au cas par cas",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "Classification du token par la FSC requise",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "Pas de cadre — fiscalité VDA applicable",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "Classification BCB/CVM selon la fonction",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: { regime: "SEC Nigeria DASP + supervision CBN potentielle — classification selon usage", risk: "med", licenses: ["SEC Nigeria DASP", "Approbation CBN si élément paiement"], obligations: ["KYC/AML selon MLPPA", "Divulgation de classification"], time: "9–18 mois", cost: "NGN 200M–500M ($200K–$500K)", alts: ["UAE VARA", "UE MiCA"], authority: "SEC Nigeria + CBN" },
    ke: { regime: "VASP Act 2025 — classification selon usage (paiement/utility/security)", risk: "med", licenses: ["CMA VASP + exigences spécifiques selon classification"], obligations: ["KYC/AML selon POCAMLA", "3% Digital Asset Tax"], time: "6–12 mois", cost: "KES 5M–30M ($40K–$230K)", alts: ["UAE VARA", "Afrique du Sud"], authority: "CMA" },
    za: { regime: "FSCA CASP + classification selon usage sous FAIS", risk: "med", licenses: ["CASP Catégorie I ou II selon usage", "CISCA si investissement mutualisé"], obligations: ["AML FICA + Travel Rule", "Divulgation de classification"], time: "6–12 mois", cost: "ZAR 1M–5M ($55K–$275K)", alts: ["UAE VARA", "Île Maurice"], authority: "FSCA + FIC" },
    lu: { regime: "MiCA — classification selon fonction (Utility/EMT/ART) ; Luxembourg flexible sur les designs de token-container", risk: "high", licenses: ["CASP si prestation de services", "EMI si adossé au fiat", "Agrément ART MiCA si asset-referenced"], obligations: ["Qualification juridique obligatoire avant lancement", "Whitepaper", "KYC/AML", "lsfRequireAuth permet gating KYC on-chain", "lsfLocked permet retenues AML"], time: "6–18 mois", cost: "€50K–€400K", alts: ["Liechtenstein TVTG (token container flexible)", "Suisse FINMA"], authority: "CSSF", xrplNote: "MPT (XLS-33) est le standard de tokens programmables XRPL. Pas de catégorie MiCA explicite. lsfRequireAuth = gating KYC on-chain. lsfLocked = retenues AML. Frais de transfert programmables. Qualification juridique critique avant lancement." },
    ky: { regime: "Cayman VASP Act — classification selon caractéristique dominante", risk: "med", licenses: ["CIMA VASP comme émetteur / exchange selon rôle", "Cayman Foundation Company couramment utilisée"], obligations: ["AML + MLRO", "Divulgation de qualification juridique"], time: "3–9 mois", cost: "$50K–$250K — 0% d'impôt sur les sociétés", alts: ["BVI", "Liechtenstein"], authority: "CIMA" },
    ca: { regime: "CSA au cas par cas — analyse CSA Staff Notice 46-307/308 selon le design MPT", risk: "high", licenses: ["Prospectus CSA si security-like", "FINTRAC MSB si custody/transfert", "IIROC si investment dealer"], obligations: ["Analyse de classification + divulgation", "KYC/AML"], time: "9–18 mois", cost: "C$200K–C$800K", alts: ["SAFT/Reg D US", "UE MiCA"], authority: "CSA" },
    vg: { regime: "BVI VASP Act + SIBA selon classification", risk: "med", licenses: ["BVI VASP + SIBA si features hybrides", "BVI Foundation pour tokens communautaires"], obligations: ["AML + MLRO", "Divulgation de classification"], time: "3–9 mois", cost: "$50K–$250K — 0% d'impôt sur les sociétés", alts: ["Cayman VASP", "Liechtenstein"], authority: "BVI FSC" },
    au: { regime: "ASIC INFO 225 — classification selon fonction du token ; la plupart des MPT déclenchent AFSL", risk: "high", licenses: ["AFSL ASIC selon classification", "AUSTRAC DCE si élément exchange", "ASIC Digital Asset Platform 2026"], obligations: ["DDO + divulgation de classification", "KYC/AML selon AML/CTF Act"], time: "9–18 mois", cost: "A$200K–A$800K", alts: ["Singapour MAS", "UAE VARA"], authority: "ASIC" },
    mt: { regime: "MiCA — classification selon fonction via MFSA", risk: "high", licenses: ["CASP MFSA + licences spécifiques selon classification", "EMI si adossé au fiat"], obligations: ["Qualification juridique obligatoire", "Whitepaper", "KYC/AML"], time: "6–12 mois", cost: "€50K–€300K", alts: ["Lituanie MiCA", "Luxembourg"], authority: "MFSA" },
    bm: { regime: "DABA Class F/M — classification selon fonction", risk: "med", licenses: ["DABA Class F + approbation BMA supplémentaire pour MPT novateur"], obligations: ["AML/ATF selon POCA", "BMA Cyber Risk Management Code"], time: "6–12 mois", cost: "BMD 100K–350K", alts: ["Cayman VASP", "BVI"], authority: "BMA" },
    lt: { regime: "MiCA — classification selon fonction via Lietuvos bankas", risk: "high", licenses: ["CASP Lietuvos bankas + exigences selon classification", "EMI si adossé au fiat"], obligations: ["Qualification juridique obligatoire", "Whitepaper", "KYC/AML"], time: "6–12 mois", cost: "€50K–€250K", alts: ["Malte MiCA", "Luxembourg"], authority: "Lietuvos bankas" },
    ie: { regime: "MiCA — classification selon fonction via CBI", risk: "high", licenses: ["CASP CBI + licences spécifiques selon classification", "EMI si adossé au fiat", "MiFID investment firm si security-like"], obligations: ["Qualification juridique obligatoire selon CJA 2010", "Whitepaper", "KYC/AML", "Résilience opérationnelle DORA"], time: "9–15 mois", cost: "€150K–€500K", alts: ["Luxembourg CSSF", "Malte MFSA"], authority: "Central Bank of Ireland (CBI)" },
  },

  // ═══════════════════════════════════════════════════════════════
  // RWA \u2014 TOKENISATION D'ACTIFS DU MONDE RÉEL
  // ═══════════════════════════════════════════════════════════════
  rwa: {
    eu: {
      regime: "MiCA ART + MiFID II (si titres financiers) + DLT Pilot Regime",
      risk: "high",
      licenses: ["CASP ou licence d'entreprise d'investissement", "Participation au DLT Pilot Regime (sandbox)", "Prospectus (si titres financiers)"],
      obligations: ["Conformité Règlement Prospectus", "MiFID II si titres financiers", "AML/KYC", "Valorisation et audits d'actifs", "Évaluation de l'adéquation investisseur"],
      time: "12\u201324 mois",
      cost: "\u20AC100K\u2013\u20AC500K+",
      alts: ["Liechtenstein TVTG (SP Physical Validator)", "Suisse (Loi DLT)", "Singapour"],
      authority: "ANC / ESMA / AMF",
      xrplNote: "XRPL supporte la tokenisation RWA via IOU/Trust Lines (existant) ou MPT XLS-33 (flags de conformité programmables). Escrow permet delivery-vs-payment. Les flags freeze des Trust Lines assurent l'application de la conformité."
    },
    us: {
      regime: "Droit des titres financiers SEC + exemptions Reg D/S/A+",
      risk: "high",
      licenses: ["Enregistrement SEC ou exemption (Reg D/Reg S/Reg A+)", "Enregistrement broker-dealer", "Enregistrement ATS si trading secondaire"],
      obligations: ["Pleine conformité au droit des titres financiers", "Vérification des investisseurs accrédités (Reg D)", "Exigences de dépôt SEC", "Restrictions de transfert"],
      time: "6\u201324 mois",
      cost: "$200K\u2013$1M+",
      alts: ["DLT Pilot Regime UE", "Liechtenstein TVTG", "Suisse"],
      authority: "SEC / FINRA"
    },
    uae: {
      regime: "ADGM/DIFC \u2014 cadre des titres financiers numériques",
      risk: "med",
      licenses: ["Licence FSRA (ADGM)", "Licence DFSA (DIFC)"],
      obligations: ["Exigences de prospectus", "KYC/AML", "Custody des actifs sous-jacents"],
      time: "6\u201312 mois",
      cost: "$75K\u2013$250K",
      alts: ["Singapour", "DLT Pilot UE", "Liechtenstein"],
      authority: "FSRA ADGM / DFSA DIFC"
    },
    sg: {
      regime: "MAS SFA \u2014 Capital Markets Products",
      risk: "med",
      licenses: ["Capital Markets Services licence", "Recognized Market Operator (si exchange)"],
      obligations: ["Prospectus SFA", "KYC/AML", "Publication continue"],
      time: "6\u201318 mois",
      cost: "SGD 100K\u2013400K",
      alts: ["DLT Pilot UE", "Liechtenstein TVTG"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 règles de Security Token Offering (STO)",
      risk: "high",
      licenses: ["Firme autorisée FCA", "Exemption de prospectus ou prospectus complet"],
      obligations: ["FCA Handbook (COBS)", "Consumer Duty", "AML/KYC", "Règles custody (CASS)"],
      time: "12\u201318 mois",
      cost: "\u00A3100K\u2013\u00A3400K",
      alts: ["DLT Pilot UE", "Liechtenstein TVTG"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 régime des security tokens",
      risk: "high",
      licenses: ["Type 1 (dealing) et/ou Type 9 (asset management)", "Autorisation SFC"],
      obligations: ["Conformité SFO", "Restriction aux investisseurs professionnels", "Exigences de custody"],
      time: "12\u201318 mois",
      cost: "HKD 500K\u20132M",
      alts: ["Singapour", "DLT Pilot UE"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA Loi DLT \u2014 titres financiers tokenisés",
      risk: "med",
      licenses: ["Licence DLT Trading Facility", "Négociant en valeurs mobilières (si applicable)"],
      obligations: ["Conformité Loi DLT", "AML LBA", "Prospectus (si offre publique)"],
      time: "6\u201318 mois",
      cost: "CHF 100K\u2013500K",
      alts: ["Liechtenstein TVTG", "DLT Pilot UE"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Physical Validator + SP Token Emitter",
      risk: "low",
      licenses: ["Licence SP Physical Validator", "Licence SP Token Emitter"],
      obligations: ["AML TVTG", "Validation de l'actif physique", "Documentation du token", "Passeporting EEE pour distribution"],
      time: "3\u20139 mois",
      cost: "CHF 20K\u2013100K",
      alts: ["Suisse Loi DLT", "DLT Pilot UE"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — Régime de Security Token Offering (STO)",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "FSC — Titres financiers tokenisés (sandbox STO)",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "Sandbox SEBI pour titres financiers tokenisés (proposé)",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "CVM — Cadre des actifs numériques titres financiers",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "SEC Nigeria — Règles sur l'émission, l'offre et la custody d'actifs numériques (2022)",
      risk: "high",
      licenses: ["Licence SEC Nigeria Digital Asset Offering Platform (DAOP)", "Enregistrement SEC DASP", "Approbation CBN pour flux NGN"],
      obligations: ["Divulgations équivalentes prospectus", "KYC/AML selon MLPPA 2022", "Divulgations asset-backing"],
      time: "18–36 mois",
      cost: "NGN 500M+ ($500K+)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "VASP Act 2025 + CMA Capital Markets Act (si security token)",
      risk: "med",
      licenses: ["Licence VASP CMA", "Approbation CMA Capital Markets si security", "CBK pour rails KES"],
      obligations: ["KYC/AML selon POCAMLA", "Divulgations équivalentes prospectus", "3% Digital Asset Tax"],
      time: "9–18 mois",
      cost: "KES 15M–50M ($115K–$385K)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP + CISCA (Collective Investment Schemes) + règles de listing JSE si trading secondaire",
      risk: "med",
      licenses: ["CASP Catégorie II sous FAIS", "Licence manager CISCA si mutualisé", "Listing JSE si exchange-traded"],
      obligations: ["KYC/AML selon FICA + Travel Rule", "Divulgations CISCA", "SARB uniquement si ZAR transfrontalier"],
      time: "12–18 mois",
      cost: "ZAR 3M–10M ($165K–$550K)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "FSCA + FIC + JSE"
    },
    lu: {
      regime: "MiCA + Droit luxembourgeois des titres + DLT Pilot Regime — hub RWA majeur",
      risk: "low",
      licenses: ["Agrément CSSF titres tokenisés", "Licence MiFID investment firm", "Sandbox DLT Pilot Regime"],
      obligations: ["Règlement Prospectus (Règl. 2017/1129)", "KYC/AML", "Ségrégation custody sous CSDR", "Reporting CSSF continu"],
      time: "9–15 mois",
      cost: "€200K–€700K",
      alts: ["Suisse FINMA", "Liechtenstein TVTG", "Irlande CBI"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman Mutual Funds Law + VASP Act — populaire pour structures de fonds RWA",
      risk: "low",
      licenses: ["Enregistrement CIMA Mutual Fund / Private Fund", "VASP CIMA si tokenisé", "Cayman Foundation pour RWA gouverné par DAO"],
      obligations: ["AML selon AMLR + MLRO", "Reporting fonds CIMA", "Audit + prospectus"],
      time: "3–9 mois",
      cost: "$75K–$300K — 0% d'impôt sur les sociétés",
      alts: ["BVI Incubator Fund", "Bermudes DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "Droit des titres CSA — les titres tokenisés relèvent des exigences standard de prospectus",
      risk: "high",
      licenses: ["Prospectus ou exemption CSA (NI 45-102)", "Registered dealer (IIROC) pour trading secondaire", "FINTRAC MSB si custody"],
      obligations: ["Prospectus CSA + divulgation continue", "Règles de compétence + suitability", "Restrictions transfrontalières"],
      time: "12–24 mois",
      cost: "C$500K–C$1.5M+",
      alts: ["Reg D / Reg S US", "DLT Pilot UE"],
      authority: "CSA / OSC / AMF"
    },
    vg: {
      regime: "BVI Securities and Investment Business Act (SIBA) + VASP Act 2022",
      risk: "low",
      licenses: ["BVI Approved Manager si structure de fonds", "Licence SIBA investment business", "Enregistrement VASP si trading tokenisé"],
      obligations: ["AML selon AMLR + MLRO", "Reporting SIBA", "Audit si fonds"],
      time: "4–9 mois",
      cost: "$75K–$250K — 0% d'impôt sur les sociétés",
      alts: ["Cayman Mutual Fund", "Bermudes DABA"],
      authority: "BVI FSC"
    },
    au: {
      regime: "Corporations Act régime des titres + AFSL ASIC + Digital Assets Framework Act 2026",
      risk: "high",
      licenses: ["AFSL ASIC — émetteur ou dealer", "Prospectus sous Corporations Act s.710", "Licence ASIC Digital Asset Platform si trading secondaire"],
      obligations: ["Prospectus + divulgations PDS", "KYC/AML selon AML/CTF Act", "Suitability + design distribution obligations"],
      time: "12–24 mois",
      cost: "A$400K–A$1.5M",
      alts: ["Singapour MAS", "DLT Pilot UE"],
      authority: "ASIC"
    },
    mt: {
      regime: "MiCA + Malta Financial Markets Act + DLT Pilot Regime",
      risk: "low",
      licenses: ["Agrément MFSA titres tokenisés", "Licence MiFID investment firm", "Sandbox DLT Pilot Regime"],
      obligations: ["Règlement Prospectus", "KYC/AML", "Ségrégation custody CSDR", "Reporting MFSA"],
      time: "9–15 mois",
      cost: "€150K–€500K",
      alts: ["Lituanie MiCA", "Luxembourg CSSF"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M + BMA Investment Business Act (si structure de fonds)",
      risk: "low",
      licenses: ["DABA Class F ou M", "BMA Investment Business si fonds", "Approbation BMA"],
      obligations: ["AML/ATF selon POCA 1997", "BMA Cyber Risk Management Code", "Reporting fonds si applicable"],
      time: "6–12 mois",
      cost: "BMD 100K–400K",
      alts: ["Cayman Mutual Fund", "BVI Approved Manager"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA + Droit des titres lituanien + Sandbox DLT Banque de Lituanie",
      risk: "low",
      licenses: ["CASP Lietuvos bankas sous MiCA", "Licence MiFID investment firm", "Sandbox DLT Pilot Regime"],
      obligations: ["Règlement Prospectus", "KYC/AML", "Dirigeant local + responsable AML"],
      time: "6–12 mois",
      cost: "€75K–€300K",
      alts: ["Malte MiCA", "Luxembourg CSSF"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "Droit des titres CBI + MiCA + DLT Pilot Regime irlandais + l'Irlande est devenue un hub majeur de fonds tokenisés",
      risk: "low",
      licenses: ["Agrément CBI MiFID investment firm", "Prospectus droit des titres irlandais", "CASP CBI sous MiCA si trading tokenisé"],
      obligations: ["Règlement Prospectus (UE 2017/1129)", "KYC/AML selon CJA 2010", "Règles UCITS/AIFMD si véhicule collectif", "Résilience opérationnelle DORA (janv. 2025)"],
      time: "12–18 mois",
      cost: "€250K–€800K",
      alts: ["Luxembourg CSSF", "Malte MFSA"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "L'Irlande est un des 2 plus gros hubs UE d'administration de fonds. Les gros custodiens de fonds tokenisés type BlackRock BUIDL (BNY Mellon Ireland, State Street Ireland) expérimentent XRPL pour le règlement RWA."
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // GAMING / GAMEFI / NFT GAMING
  // ═══════════════════════════════════════════════════════════════
  gaming: {
    eu: {
      regime: "MiCA + lois nationales sur les jeux d'argent + JONUM (France)",
      risk: "med",
      licenses: ["CASP si le token in-game est un crypto-actif", "Licence de jeu d'argent si hasard + gain monétaire", "Conformité JONUM (France) : test à 3 critères"],
      obligations: ["Test JONUM (France) : offre publique + gain basé sur le hasard + sacrifice financier", "Protection des consommateurs", "Vérification de l'âge", "Si jeu d'argent : licence de l'autorité nationale des jeux", "Divulgation des loot boxes (interdictions NL, BE)"],
      time: "6\u201318 mois",
      cost: "\u20AC30K\u2013\u20AC200K",
      alts: ["Singapour (position GameFi plus souple)", "UAE (VARA gaming-friendly)", "Liechtenstein"],
      authority: "ANC / ANJ (jeux France) / ESMA",
      xrplNote: "NFTs XRPL (XLS-20) pour objets in-game : le broker mode non-custodial évite le CASP. Les Payment Channels permettent le streaming de micropaiements pour le gameplay. Précédent Sorare/ANJ (2022) pertinent pour la France."
    },
    us: {
      regime: "Lois d'État sur les jeux d'argent + analyse SEC/FTC",
      risk: "med",
      licenses: ["Licence de jeu d'argent d'État si récompenses basées sur le hasard", "Analyse SEC si le token est un titre financier"],
      obligations: ["Conformité aux lois sur les jeux d'argent (État par État)", "Protection des consommateurs FTC", "COPPA si utilisateurs <13 ans", "Divulgation des loot boxes (émergente)"],
      time: "6\u201318 mois",
      cost: "$50K\u2013$300K",
      alts: ["UE (cadre plus clair)", "Singapour"],
      authority: "Commissions de jeu d'État / SEC / FTC"
    },
    uae: {
      regime: "VARA \u2014 cadre VASP gaming-friendly",
      risk: "low",
      licenses: ["Avis VARA pour GameFi", "VASP complet si élément d'exchange"],
      obligations: ["KYC pour retraits", "Protection des consommateurs", "Pas de jeu d'argent (droit islamique)"],
      time: "3\u20136 mois",
      cost: "$20K\u2013$75K",
      alts: ["Singapour", "Liechtenstein"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS + analyse Remote Gambling Act",
      risk: "low",
      licenses: ["Pas de licence MAS si pure utilité gaming", "Remote Gambling Act si hasard + argent réel"],
      obligations: ["Analyse jeu d'argent", "Protection des consommateurs", "PDPA"],
      time: "3\u20136 mois",
      cost: "SGD 20K\u201375K",
      alts: ["UAE", "UE"],
      authority: "MAS / Casino Regulatory Authority"
    },
    uk: {
      regime: "Gambling Commission + analyse FCA",
      risk: "med",
      licenses: ["Licence Gambling Commission si élément jeu d'argent", "Enregistrement FCA si crypto-actif"],
      obligations: ["Gambling Act 2005", "Protection des consommateurs", "Vérification de l'âge", "AML"],
      time: "6\u201312 mois",
      cost: "\u00A320K\u2013\u00A3100K",
      alts: ["UAE", "Singapour"],
      authority: "Gambling Commission / FCA"
    },
    hk: {
      regime: "Gambling Ordinance + analyse SFC",
      risk: "med",
      licenses: ["Licence de jeu d'argent si applicable", "SFC si tokens assimilables à des titres financiers"],
      obligations: ["Conformité Gambling Ordinance", "Protection des consommateurs"],
      time: "6\u201312 mois",
      cost: "HKD 100K\u2013500K",
      alts: ["Singapour", "UAE"],
      authority: "Home Affairs / SFC"
    },
    ch: {
      regime: "FINMA + Loi suisse sur les jeux d'argent",
      risk: "med",
      licenses: ["Classification du token FINMA", "Licence de jeu d'argent si applicable"],
      obligations: ["Loi suisse sur les jeux d'argent", "AML si élément financier", "Protection des consommateurs"],
      time: "3\u201312 mois",
      cost: "CHF 20K\u2013150K",
      alts: ["Liechtenstein", "UAE"],
      authority: "FINMA / Autorité de surveillance des jeux d'argent"
    },
    li: {
      regime: "TVTG + analyse de la loi sur les jeux d'argent",
      risk: "low",
      licenses: ["Licence SP pour services de tokens", "Licence de jeu d'argent si applicable"],
      obligations: ["AML TVTG", "Classification du token"],
      time: "3\u20136 mois",
      cost: "CHF 15K\u201360K",
      alts: ["Suisse", "UAE"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA + Consumer Affairs Agency (règles gacha/loot box)",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "Game Rating Committee + FSC (P2E restreint)",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "Pas de règles GameFi spécifiques — taxe sur les jeux en ligne applicable",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "Pas de régulation GameFi spécifique",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: { regime: "National Lottery Regulatory Commission + SEC si élément financier", risk: "med", licenses: ["Licence NLRC si jeu de hasard", "SEC DASP si élément investissement"], obligations: ["Protection du joueur selon NLRA 2005", "KYC/AML"], time: "6–12 mois", cost: "NGN 100M–400M ($100K–$400K)", alts: ["UAE", "Malte"], authority: "NLRC + SEC Nigeria" },
    ke: { regime: "Licence BCLB si jeu de hasard + VASP Act si tokens financiers", risk: "med", licenses: ["Licence BCLB si jeu", "VASP CMA si tokens financiers"], obligations: ["Protection du joueur", "3% Digital Asset Tax sur gains de tokens"], time: "6–12 mois", cost: "KES 5M–20M ($40K–$150K)", alts: ["UAE", "Malte"], authority: "BCLB + CMA" },
    za: { regime: "Licence Provincial Gambling Board si jeu + FSCA CASP si financier", risk: "med", licenses: ["Licence jeu provinciale (Gauteng/Western Cape)", "CASP si tokens financiers"], obligations: ["Protection du joueur", "Jeu responsable", "POPIA protection des données"], time: "9–15 mois", cost: "ZAR 2M–8M ($110K–$440K)", alts: ["UAE", "Malte"], authority: "GB provinciaux + FSCA" },
    lu: { regime: "MiCA Utility Token + Luxembourg Gambling Act si play-to-earn / pari", risk: "low", licenses: ["Pas de CASP si pure utility in-game", "Commission des jeux si pari/hasard + gain", "EMI si détention fiat"], obligations: ["Protection du joueur", "RGPD", "AML si licence jeu"], time: "3–9 mois", cost: "€50K–€250K", alts: ["Malta Gaming Authority", "Liechtenstein"], authority: "CSSF + Commission des jeux" },
    ky: { regime: "Cayman VASP si tokens financiers ; pas de cadre GameFi spécifique", risk: "low", licenses: ["VASP CIMA si élément financier", "Cayman Foundation pour DAO de jeu"], obligations: ["AML si VASP", "Protection des données (DPA 2017)"], time: "3–6 mois", cost: "$50K–$200K — 0% d'impôt sur les sociétés", alts: ["BVI", "UAE"], authority: "CIMA" },
    ca: { regime: "AGCO (Ontario) / régulateurs de jeu provinciaux + CSA si financier", risk: "high", licenses: ["Licence de jeu provinciale (AGCO etc.)", "CSA si token a caractère investissement", "FINTRAC MSB si custody"], obligations: ["Protection du joueur", "Jeu responsable", "KYC/AML"], time: "12–18 mois", cost: "C$200K–C$800K", alts: ["État par État US", "UE Malte"], authority: "Régulateurs provinciaux + CSA" },
    vg: { regime: "BVI Gaming Act + VASP si tokens financiers", risk: "low", licenses: ["Licence BVI Gaming si jeu", "VASP BVI si tokens financiers", "BVI Foundation pour DAO de jeu"], obligations: ["AML + MLRO", "Protection du joueur"], time: "3–6 mois", cost: "$50K–$200K — 0% d'impôt sur les sociétés", alts: ["Cayman", "Malte"], authority: "BVI Gaming Board + FSC" },
    au: { regime: "Régulateurs de jeu d'État + ASIC si élément produit financier", risk: "med", licenses: ["Licence de jeu d'État (état par état)", "AFSL ASIC si produit financier", "AUSTRAC DCE si exchange de tokens"], obligations: ["Protection du joueur", "Jeu responsable", "KYC/AML"], time: "12–18 mois", cost: "A$200K–A$800K", alts: ["Singapour MAS", "UAE"], authority: "Régulateurs d'État + ASIC" },
    mt: { regime: "MGA (Malta Gaming Authority) — un des leaders mondiaux du gaming + MiCA si tokens financiers", risk: "low", licenses: ["Licence MGA B2B/B2C", "CASP MFSA si tokens financiers"], obligations: ["Protection du joueur", "Jeu responsable", "RGPD", "AML selon directives MGA"], time: "6–12 mois", cost: "€100K–€300K", alts: ["UAE VARA", "Lituanie"], authority: "MGA + MFSA" },
    bm: { regime: "Bermuda Gaming Commission + DABA si tokens financiers", risk: "med", licenses: ["Licence Bermuda Gaming Commission si jeu", "DABA Class F/M si tokens financiers"], obligations: ["Protection du joueur", "AML/ATF selon POCA 1997"], time: "6–12 mois", cost: "BMD 100K–300K", alts: ["Cayman", "Malte"], authority: "Gaming Commission + BMA" },
    lt: { regime: "Lithuania Gaming Control Authority + MiCA si tokens financiers", risk: "low", licenses: ["Licence Gaming Control Authority si jeu", "CASP Lietuvos bankas si tokens financiers"], obligations: ["Protection du joueur", "RGPD", "AML"], time: "4–9 mois", cost: "€50K–€200K", alts: ["Malte", "Liechtenstein"], authority: "Gaming Authority + Lietuvos bankas" },
    ie: { regime: "Gaming and Lotteries Act + MiCA si tokens financiers ; Gambling Regulation Act 2024 renforce la supervision", risk: "med", licenses: ["Licence Irish Gaming (sous Gambling Regulatory Authority, juin 2025)", "CASP CBI si tokens financiers"], obligations: ["Protection du joueur selon GR Act 2024", "RGPD", "AML selon CJA 2010"], time: "9–15 mois", cost: "€150K–€500K", alts: ["Malte MGA", "Lituanie"], authority: "Gambling Regulatory Authority + CBI" },
  },

  // ═══════════════════════════════════════════════════════════════
  // PAIEMENT CRYPTO / REMITTANCE
  // ═══════════════════════════════════════════════════════════════
  payment: {
    eu: {
      regime: "CASP (MiCA) + PSD2/PSD3 (si conversion fiat)",
      risk: "med",
      licenses: ["Agrément CASP (service de transfert crypto)", "Licence EMI ou EP (si on/off-ramp fiat)", "Conformité PSD2/PSD3 (volet fiat)"],
      obligations: ["KYC/AML", "Règle du voyage FATF", "SCA PSD2 (si fiat)", "Surveillance des transactions", "Protection des consommateurs"],
      time: "6\u201318 mois",
      cost: "\u20AC50K\u2013\u20AC200K",
      alts: ["Liechtenstein TVTG", "Singapour MAS", "UAE VARA"],
      authority: "ANC / ESMA / BCE",
      xrplNote: "Les Payment Channels XRPL permettent le streaming de micropaiements avec règlement off-chain instantané. Pas de custody = pas de CASP pour le canal lui-même. En cas de conversion fiat à la sortie : un service de transfert CASP ou une licence EMI peut s'appliquer. IOU/Trust Lines pour les remittances transfrontalières."
    },
    us: {
      regime: "FinCEN MSB + MTL d'État",
      risk: "high",
      licenses: ["Enregistrement FinCEN MSB", "MTL d'État (chaque État)", "BitLicense (NY)"],
      obligations: ["BSA/AML", "Filtrage OFAC", "Règle du voyage >$3K", "Caution d'État"],
      time: "12\u201336 mois",
      cost: "$150K\u2013$500K+",
      alts: ["UE MiCA", "Singapour MAS"],
      authority: "FinCEN / régulateurs d'État"
    },
    uae: {
      regime: "VARA + CBUAE",
      risk: "med",
      licenses: ["Licence VARA VASP", "Licence CBUAE stored value (si applicable)"],
      obligations: ["KYC/AML", "Exigences de capital", "Reporting des transactions"],
      time: "6\u201312 mois",
      cost: "$50K\u2013$150K",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "VARA / CBUAE"
    },
    sg: {
      regime: "MAS PSA \u2014 Prestataire de services de paiement",
      risk: "med",
      licenses: ["Licence MPI ou SPI"],
      obligations: ["KYC/AML", "Sauvegarde des fonds clients", "Tech Risk Management"],
      time: "6\u201312 mois",
      cost: "SGD 50K\u2013150K",
      alts: ["UAE VARA", "UE MiCA"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 EMI/PI + enregistrement crypto",
      risk: "med",
      licenses: ["Licence EMI ou PI (fiat)", "Enregistrement FCA cryptoasset"],
      obligations: ["AML/KYC", "Consumer Duty", "Sauvegarde des fonds clients", "SCA PSD2"],
      time: "12\u201318 mois",
      cost: "\u00A350K\u2013\u00A3200K",
      alts: ["UE MiCA", "Singapour MAS"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC + HKMA \u2014 SVF/stored value",
      risk: "med",
      licenses: ["Licence SVF (HKMA)", "SFC si VA impliqué"],
      obligations: ["AML AMLO", "Protection des consommateurs", "Exigences de capital"],
      time: "6\u201318 mois",
      cost: "HKD 200K\u2013800K",
      alts: ["Singapour MAS", "UAE VARA"],
      authority: "HKMA / SFC"
    },
    ch: {
      regime: "FINMA \u2014 licence FinTech ou banque complète",
      risk: "med",
      licenses: ["Licence FinTech (jusqu'à CHF 100M de dépôts)", "VQF/OAR (AML)"],
      obligations: ["AML LBA", "KYC", "Reporting FINMA"],
      time: "6\u201312 mois",
      cost: "CHF 50K\u2013200K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 SP Token Exchange/Transfer",
      risk: "low",
      licenses: ["Licence SP pertinente", "Équivalent EMI (si fiat)"],
      obligations: ["AML TVTG", "Honorabilité", "Reporting FMA"],
      time: "3\u20139 mois",
      cost: "CHF 15K\u201370K",
      alts: ["Suisse FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — Fund Transfer Service Provider",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "VASP + Electronic Financial Transactions Act",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "RBI — Cadre des agrégateurs de paiement",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "BCB — Licence d'institution de paiement (écosystème PIX)",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "CBN — Payments System Vision + Virtual Asset Guidelines 2023. Règles DASP SEC Nigeria pour la jambe crypto. Rails de paiement locaux solides (NIBSS).",
      risk: "high",
      licenses: ["Licence CBN Payment Service Bank / Switching", "Enregistrement DASP SEC Nigeria pour la jambe crypto", "Enregistrement NFIU"],
      obligations: ["KYC/AML selon MLPPA 2022", "Conformité Travel Rule", "Règlement local en Naira (intégration NIBSS)", "Protection des consommateurs sous CPA", "Impôt sur les plus-values 10 % sur les transferts crypto"],
      time: "12–24 mois",
      cost: "NGN 2B+ pour PSB + coûts DASP ($2M+)",
      alts: ["BoG Ghana Payment System Providers", "Paiement UAE VARA"],
      authority: "CBN + SEC Nigeria + NFIU"
    },
    ke: {
      regime: "VASP Act 2025 (activités de transfert) + Payment Systems Act + supervision CBK. L'écosystème M-Pesa domine.",
      risk: "med",
      licenses: ["Licence VASP — catégorie transfert (CMA)", "Licence CBK Money Remittance Provider (si payout fiat)", "Enregistrement KRA"],
      obligations: ["KYC/AML selon POCAMLA", "Conformité Travel Rule", "Digital Asset Tax 3 %", "Protection des consommateurs (CPA 2012)", "Intégration M-Pesa/bancaire pour le rail KES"],
      time: "9–18 mois",
      cost: "KES 10M–40M (~$80K–$320K)",
      alts: ["Paiement UAE VARA", "FSCA Afrique du Sud"],
      authority: "CMA + CBK"
    },
    za: {
      regime: "FSCA CASP (FAIS Act) + contrôle des changes SARB + cadre d'institution de paiement (NPS Act)",
      risk: "med",
      licenses: ["Licence CASP sous FAIS Act", "Approbation SARB pour les flux transfrontaliers", "Désignation Payments System Operator (PSO) si exploitation de rails"],
      obligations: ["Conformité contrôle des changes SARB (strict pour les sorties ZAR)", "Travel Rule depuis avril 2023", "Obligations AML FICA", "Catégorie CASP II ou III selon la composante conseil", "Protection des consommateurs sous FAIS"],
      time: "9–15 mois",
      cost: "ZAR 2M–8M (~$110K–$440K)",
      alts: ["Paiement UAE VARA", "UK FCA"],
      authority: "FSCA + SARB + FIC"
    },
    lu: {
      regime: "Payment Institution PSD2/PSD3 + service de transfert crypto MiCA CASP (CSSF)",
      risk: "med",
      licenses: ["Licence PI CSSF (PSD2) pour les rails fiat", "Licence EMI pour les comptes de monnaie électronique", "Agrément CASP pour le service de transfert crypto (MiCA Art. 3)"],
      obligations: ["Safeguarding des fonds clients", "SCA selon PSD2", "KYC/AML + Règle du voyage FATF >€1K", "Fonds propres selon les règles PI / EMI", "Passeport UE"],
      time: "12–18 mois",
      cost: "€200K–€600K",
      alts: ["Lituanie (hub EMI moins cher)", "Irlande PI", "Malte MFSA"],
      authority: "CSSF"
    },
    ky: {
      regime: "VASP Act 2020 — transfert d'actifs virtuels + Money Services Act pour remittance fiat",
      risk: "med",
      licenses: ["Enregistrement VASP — transfert d'actifs virtuels (CIMA)", "Money Services Licence si leg fiat (CIMA)"],
      obligations: ["AML selon AMLR 2020 + Travel Rule", "Honorabilité des dirigeants", "MLRO + audit annuel", "Ségrégation des fonds clients", "Retours annuels à la CIMA"],
      time: "6–12 mois",
      cost: "$50K–$200K — impôt sur les sociétés 0%",
      alts: ["BVI VASP", "Bermudes DABA", "Dubaï VARA payment"],
      authority: "Cayman Islands Monetary Authority (CIMA)"
    },
    ca: {
      regime: "Retail Payment Activities Act (RPAA, en vigueur sept. 2024) + FINTRAC MSB + overlay titres CSA",
      risk: "high",
      licenses: ["Enregistrement Payment Service Provider (PSP) auprès de la Banque du Canada sous la RPAA", "Enregistrement FINTRAC MSB", "Enregistrements provinciaux money-transmitter (AMF Québec)"],
      obligations: ["Safeguarding des fonds des utilisateurs finaux (RPAA)", "Cadre de risque opérationnel + reporting incidents à la BdC", "KYC/AML PCMLTFA (amendements mars 2026)", "Travel Rule (C$1K)", "Protection des consommateurs (LPC)"],
      time: "9–18 mois",
      cost: "C$200K–C$800K",
      alts: ["MTL d'État américaines", "UE MiCA + passeport PI", "Dubaï VARA"],
      authority: "Banque du Canada (RPAA) + FINTRAC + CSA"
    },
    vg: {
      regime: "VASP Act 2022 — transfert d'actifs virtuels + Financing and Money Services Act (fiat)",
      risk: "med",
      licenses: ["Enregistrement VASP — services de transfert (BVI FSC)", "Licence FMS si remittance fiat"],
      obligations: ["AML selon AMLR + Code of Practice", "Conformité Travel Rule", "MLRO + audit annuel", "Ségrégation des fonds clients", "FSC Circular 43/2025 cyber + gestion des clés"],
      time: "4–12 mois",
      cost: "$150K–$400K — impôt sur les sociétés 0%",
      alts: ["Cayman VASP + MSA", "Bermudes DABA", "Dubaï VARA payment"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Digital Assets Framework Act 2026 + Payment Systems (Regulation) Act 1998 + AUSTRAC DCE",
      risk: "med",
      licenses: ["AFSL ASIC — digital asset platform (transfert)", "Enregistrement AUSTRAC DCE", "Agrément APRA si dépôt", "Accès RBA aux systèmes de paiement"],
      obligations: ["Safeguarding des fonds clients", "KYC/AML + Travel Rule (31 mars 2026)", "ePayments Code pour le retail", "Risque opérationnel + cyber", "Reporting des manquements ASIC"],
      time: "9–18 mois",
      cost: "A$300K–A$1M",
      alts: ["Singapour MAS MPI", "UE MiCA + PI", "Nouvelle-Zélande FMA"],
      authority: "ASIC + AUSTRAC + RBA"
    },
    mt: {
      regime: "Payment Institution PSD2 + MiCA CASP (transfert crypto) sous MFSA",
      risk: "med",
      licenses: ["Licence PI MFSA (PSD2)", "Licence EMI si comptes de monnaie électronique", "MiCA CASP pour le service de transfert crypto"],
      obligations: ["Safeguarding des fonds clients", "SCA selon PSD2", "Travel Rule MiCA + AML", "Fonds propres selon les règles PI / EMI", "Substance locale à Malte"],
      time: "9–15 mois",
      cost: "€150K–€500K",
      alts: ["Lituanie MiCA + PI", "Luxembourg CSSF", "Liechtenstein TVTG"],
      authority: "Malta Financial Services Authority (MFSA)"
    },
    bm: {
      regime: "Digital Asset Business Act 2018 — services de paiement en ou impliquant des actifs numériques",
      risk: "med",
      licenses: ["DABA Class F (complète) ou Class M (modifiée / sandbox)", "Approbation BMA"],
      obligations: ["AML/ATF selon POCA 1997", "Conformité Travel Rule", "Safeguarding des fonds clients", "BMA Cyber Risk Management Code", "Audit annuel + retours BMA"],
      time: "6–12 mois",
      cost: "BMD 75K–300K",
      alts: ["Cayman payment", "BVI VASP", "Dubaï VARA payment"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "Payment Institution PSD2 + MiCA CASP (transfert crypto) sous Lietuvos bankas",
      risk: "med",
      licenses: ["Licence PI Lietuvos bankas (PSD2)", "Licence EMI (la Lituanie est un hub EMI UE majeur)", "MiCA CASP pour le service de transfert crypto"],
      obligations: ["Safeguarding des fonds clients", "SCA selon PSD2", "KYC/AML selon la Loi AML lituanienne (2022/2024)", "Travel Rule >€1K", "Fonds propres selon les règles PI / EMI", "Dirigeant local + responsable AML"],
      time: "6–12 mois",
      cost: "€100K–€350K (historiquement le hub EMI UE le plus compétitif)",
      alts: ["Luxembourg CSSF", "Malte MFSA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas (Banque de Lituanie)"
    },
    ie: {
      regime: "Payment Institution PSD2 + MiCA CASP (service de transfert crypto art. 3) sous la Central Bank of Ireland",
      risk: "med",
      licenses: ["Agrément Payment Institution (PI) de la CBI sous PSD2", "Licence EMI pour les comptes de monnaie électronique", "Agrément CASP MiCA pour le service de transfert crypto"],
      obligations: ["Safeguarding des fonds clients sous PSD2", "Strong Customer Authentication (SCA)", "KYC/AML selon CJA 2010", "Règle du voyage FATF >€1K", "Fonds propres selon règles PI/EMI", "Passeporting UE depuis l'Irlande"],
      time: "12–18 mois",
      cost: "€200K–€600K",
      alts: ["Luxembourg CSSF", "Lituanie EMI", "UK FCA EMI"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "Ripple Labs Ireland Ltd utilise ce stack de licences pour les paiements RippleNet + les services MPC wallet Palisade sur le marché UE."
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ONRAMP / OFFRAMP (passerelle de conversion fiat ↔ crypto)
  // ═══════════════════════════════════════════════════════════════
  onramp_offramp: {
    eu: {
      regime: "CASP (MiCA) + licence EMI ou EP (PSD2/PSD3) pour la jambe fiat",
      risk: "high",
      licenses: ["Agrément CASP (service d'échange crypto contre fiat, art. 3 MiCA)", "Licence EMI (si détention de soldes fiat clients)", "Licence EP (si simple routage, PSD2)", "Passeport européen vers l'État membre d'accueil (si activités transfrontalières)"],
      obligations: ["KYC/AML (AMLD + MiCA)", "Règle du voyage FATF (règlement UE 2023/1113)", "SCA PSD2 sur la jambe fiat", "Cantonnement des fonds clients (règles EMI/EP)", "Protection des consommateurs (droit de rétractation, délai de réflexion)", "Transparence tarifaire selon le titre III MiCA"],
      time: "12\u201324 mois (deux licences en parallèle)",
      cost: "\u20AC150K\u2013\u20AC500K",
      alts: ["Liechtenstein TVTG (plus rapide)", "Suisse FINMA", "Lituanie / Estonie (hub pré-MiCA)"],
      authority: "ANC + BCE (passeporting EMI) + ESMA",
      xrplNote: "Les IOU et Trust Lines XRPL permettent une tokenisation native du fiat on-chain (RLUSD, EURCV). Le prestataire onramp peut régler la jambe fiat client via un partenaire EMI licencié et mint/burn les tokens XRPL. Les Payment Channels permettent un règlement off-ramp en moins d'une seconde."
    },
    us: {
      regime: "FinCEN MSB + MTL d'État (48+ États) + BitLicense (NY)",
      risk: "high",
      licenses: ["Enregistrement FinCEN MSB", "Licence money transmitter d'État dans chaque État d'exploitation (~48)", "BitLicense NY + approbation NYDFS", "Cautions par État ($50K\u2013$7M chacune)"],
      obligations: ["BSA/AML", "Filtrage des sanctions OFAC", "Dépôt SAR / CTR", "Règle du voyage \u2265 $3K", "Comptes clients ségrégués", "Audits annuels d'État"],
      time: "24\u201348 mois (patchwork des MTL)",
      cost: "$500K\u2013$2M+ (juridique + cautions)",
      alts: ["Partenariat avec MSB/banque licenciée", "UE MiCA via Irlande ou Allemagne"],
      authority: "FinCEN + régulateurs d'État (NYDFS, CDFPI, etc.)",
      xrplNote: "L'onramp US pour XRP est opérationnel depuis le règlement SEC 2023 (XRP n'est pas un titre financier sur les ventes secondaires). Uphold, Bitstamp, Kraken fournissent le rail licencié. Les IOU XRPL restent ambigus en droit fédéral."
    },
    uae: {
      regime: "Licence VARA VASP (crypto) + Stored Value Facility CBUAE (rails fiat)",
      risk: "med",
      licenses: ["Licence VARA Exchange Services VASP (Catégorie II)", "Licence CBUAE Stored Value Facility (si float AED détenu)", "Partenariat bancaire AED"],
      obligations: ["KYC/AML selon les rulebooks CBUAE + VARA", "Règle du voyage", "Exigences de capital (AED 1,5M+ pour VARA)", "Reporting trimestriel des transactions"],
      time: "9\u201318 mois",
      cost: "$200K\u2013$600K",
      alts: ["DIFC DFSA (alternative common law)", "ADGM FSRA"],
      authority: "VARA + CBUAE",
      xrplNote: "Onramp XRPL faisable sous licence VARA \u2014 XRP est un VA approuvé à Dubaï. Les pilotes de stablecoins AED (par M2, Rain) utilisent XRPL pour le règlement."
    },
    sg: {
      regime: "MAS Payment Services Act \u2014 Licence Major Payment Institution (classes DPT + Cross-border Money Transfer)",
      risk: "med",
      licenses: ["Licence MPI (volume > SGD 3M/mois ou SGD 6M toutes classes confondues)", "Licence SPI (volume plus faible)", "Sous-classe Cross-Border Money Transfer si la jambe fiat traverse une frontière"],
      obligations: ["KYC/AML selon la MAS AML/CFT Notice", "Sauvegarde des fonds clients (compte de trust)", "Tech Risk Management Notice (TRM)", "Exigence de capital (SGD 250K pour MPI)"],
      time: "9\u201315 mois",
      cost: "SGD 200K\u2013600K",
      alts: ["Hong Kong SFC", "UAE VARA"],
      authority: "MAS",
      xrplNote: "Singapour traite XRP comme un Digital Payment Token sous le PSA. Les passerelles licenciées MAS (Independent Reserve, Coinhako) proposent l'onramp XRP. Les IOU XRPL peuvent nécessiter une classification supplémentaire."
    },
    uk: {
      regime: "Enregistrement FCA Cryptoasset (MLR 2017) + licence EMI/PI (PSR 2017)",
      risk: "high",
      licenses: ["Enregistrement FCA cryptoasset firm (5MLD/MLR)", "Autorisation EMI ou PI (FCA)", "Gateway FCA Financial Promotions pour le marketing"],
      obligations: ["AML/KYC selon MLR 2017", "UK Consumer Duty", "SCA équivalent PSD2", "Ségrégation des fonds clients (CASS)", "Restrictions sur les promotions financières (délai de réflexion, avertissement de risque)"],
      time: "15\u201324 mois",
      cost: "\u00A3150K\u2013\u00A3500K",
      alts: ["UE MiCA CASP", "Gibraltar DLT"],
      authority: "FCA",
      xrplNote: "Onramp XRP largement disponible via les firmes enregistrées FCA (Uphold UK, Kraken, Bitstamp). Les orientations britanniques spécifiques sur les stablecoins (2025) pourraient ouvrir un cadre pour les IOU XRPL."
    },
    hk: {
      regime: "HKMA Stored Value Facility (SVF) + SFC Type 1/7/9 (si trading VA)",
      risk: "med",
      licenses: ["Licence HKMA SVF (portefeuille fiat)", "SFC Type 1 dealing + Type 7 ATS + Type 9 asset management (si trading VA)", "Enregistrement AMLO"],
      obligations: ["AML selon AMLO", "Exigences de capital (HKD 25M min pour SVF, bien plus pour SFC)", "Protection des consommateurs", "Actifs clients ségrégués"],
      time: "12\u201324 mois (double track SVF + SFC)",
      cost: "HKD 1M\u20135M ($125K\u2013$640K)",
      alts: ["Singapour MAS", "UAE VARA"],
      authority: "HKMA + SFC",
      xrplNote: "La feuille de route Hong Kong ASPIRe (2025) inclut les stablecoins XRPL sous la nouvelle ordonnance stablecoin. Le retail crypto est désormais autorisé uniquement via des exchanges licenciés."
    },
    ch: {
      regime: "Licence FINMA FinTech (art. 1b LB) ou licence bancaire + affiliation SRO/VQF",
      risk: "med",
      licenses: ["Licence FINMA FinTech (dépôts jusqu'à CHF 100M, pas de prêt)", "Licence bancaire complète si plus grande échelle", "Affiliation SRO/VQF (conformité AML)"],
      obligations: ["Conformité LBA", "KYC selon Circulaire FINMA 2023/1", "Ségrégation des fonds clients", "Reporting FINMA semestriel"],
      time: "6\u201312 mois (FinTech) / 24+ mois (bancaire)",
      cost: "CHF 150K\u2013500K",
      alts: ["Liechtenstein TVTG (passeport EEE)", "UE MiCA via DE/FR"],
      authority: "FINMA",
      xrplNote: "La Suisse reconnaît XRP comme un token de paiement. Les onramps licenciés FINMA (Bitcoin Suisse, Sygnum, SEBA/Amina) offrent l'accès XRPL."
    },
    li: {
      regime: "Enregistrement TVTG Token Exchange SP + passeport EMI UE (typiquement via un EMI liechtensteinois ou un hôte UE)",
      risk: "low",
      licenses: ["Enregistrement TVTG Token Exchange Service Provider (FMA)", "Licence EMI (liechtensteinoise ou passeportée EEE)", "Affiliation SRO pour l'AML"],
      obligations: ["AML selon SPG + art. 25 TVTG", "Test d'honorabilité", "Exigence de capital (CHF 100K\u2013250K)", "Reporting FMA trimestriel"],
      time: "4\u20139 mois (route EEE la plus rapide)",
      cost: "CHF 70K\u2013200K",
      alts: ["Suisse FINMA", "Estonie (en fermeture)"],
      authority: "FMA",
      xrplNote: "Le TVTG du Liechtenstein accueille explicitement les conteneurs de tokens de type XRPL. Plusieurs pilotes de stablecoins XRPL utilisent LI comme juridiction de lancement avant passeport UE."
    },
    jp: {
      regime: "FSA Crypto Asset Exchange Service Provider (CAESP) + auto-régulation JVCEA",
      risk: "med",
      licenses: ["Enregistrement FSA CAESP (art. 63 FIEA)", "Statut de membre JVCEA", "Partenariat bancaire JPY"],
      obligations: ["KYC/AML selon la loi APPS", "Règle du voyage FATF (depuis 2023)", "Règle des 95% de cold storage", "Actifs clients ségrégués", "Reporting FSA mensuel"],
      time: "12\u201324 mois",
      cost: "\u00A550M\u2013\u00A5150M ($330K\u2013$1M)",
      alts: ["Singapour MAS", "Hong Kong HKMA"],
      authority: "FSA Japon",
      xrplNote: "XRP est l'un des tout premiers crypto-actifs approuvés au Japon (whitelist JVCEA depuis 2018). Onramp disponible via bitFlyer, Coincheck, SBI VC Trade."
    },
    kr: {
      regime: "VASP sous Specific Financial Information Act + exigence de compte bancaire nominatif",
      risk: "high",
      licenses: ["Enregistrement VASP auprès de la KoFIU", "Certification ISMS-P", "Partenariat bancaire nominatif (5 banques approuvées)"],
      obligations: ["KYC/AML", "Banque nominative (chaque client lié à un compte bancaire)", "Audit cybersécurité ISMS-P", "Impôt de 30% sur les gains crypto à partir de 2027"],
      time: "12\u201318 mois",
      cost: "\u20A9500M\u2013\u20A92B ($375K\u2013$1,5M)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée",
      xrplNote: "XRP a un fort intérêt retail en Corée du Sud (l'un des 3 premiers marchés). Onramp via Upbit, Bithumb, Korbit \u2014 tous liés à une banque nominative."
    },
    in: {
      regime: "Enregistrement FIU-IND + taxe VDA de 30% + TDS de 1% par transaction",
      risk: "high",
      licenses: ["Enregistrement FIU-IND VASP (obligatoire depuis mars 2023)", "Enregistrement GST + impôt sur le revenu", "Relations bancaires (périodiquement restreintes)"],
      obligations: ["Taxe VDA forfaitaire de 30% sur les plus-values", "TDS de 1% par transfert (retenu à la source)", "KYC/AML selon PMLA", "Reporting au niveau de la transaction"],
      time: "6\u201312 mois",
      cost: "\u20B950L\u2013\u20B92Cr ($60K\u2013$240K)",
      alts: ["Singapour MAS (courant pour les fondateurs indiens)", "UAE VARA"],
      authority: "FIU-IND + CBDT (fiscal) + RBI",
      xrplNote: "Les exchanges indiens (WazirX, CoinDCX) listent XRP. La pression fiscale (30% + 1% TDS) freine le volume retail."
    },
    br: {
      regime: "Régime VASP de la loi BCB 14.478/2022 + CMN Résolution 303/2025 (mise en œuvre)",
      risk: "med",
      licenses: ["Autorisation BCB VASP (à partir de 2025)", "Approbation CMN pour les flux fiat transfrontaliers", "CVM si le token est classé comme titre financier"],
      obligations: ["KYC/AML selon la loi 9.613", "Reporting BCB trimestriel", "Protection des consommateurs", "Résilience cyber/opérationnelle"],
      time: "12\u201318 mois",
      cost: "R$500K\u2013R$2M ($100K\u2013$400K)",
      alts: ["UAE VARA", "Singapour MAS"],
      authority: "BCB + CMN + CVM",
      xrplNote: "Le pilote CBDC Drex du Brésil explore l'ILP (Interledger) de type XRPL pour l'interopérabilité du règlement. Onramp XRP via Mercado Bitcoin, Foxbit."
    },
    ng: {
      regime: "SEC Nigeria DASP (crypto) + CBN Virtual Asset Guidelines 2023 + contrôles des changes CBN stricts",
      risk: "high",
      licenses: ["Enregistrement DASP SEC Nigeria", "CBN Payment Solution Service Provider (PSSP) ou Switching Licence", "Enregistrement NFIU", "Partenariat bancaire Naira via NIBSS"],
      obligations: ["KYC/AML selon MLPPA 2022", "Règle du voyage", "Restrictions forex CBN (rareté du Naira, contrôle des capitaux)", "Impôt de 10% sur les plus-values crypto"],
      time: "18\u201336 mois (position réglementaire volatile)",
      cost: "NGN 2B+ (fourchette $2M+, très volatile)",
      alts: ["BoG Ghana (licence PSP)", "UAE VARA (offshore)"],
      authority: "CBN + SEC Nigeria + NFIU",
      xrplNote: "Le Nigéria avait l'une des plus fortes adoptions retail XRP au monde avant la crise du Naira. Depuis les restrictions CBN 2024, l'onramp passe majoritairement par le P2P + offshore. Binance P2P = canal dominant."
    },
    ke: {
      regime: "VASP Act 2025 + règlement CBK Money Remittance Provider + Digital Asset Tax",
      risk: "med",
      licenses: ["Licence VASP (CMA) \u2014 sous-catégorie conversion", "CBK Money Remittance Provider (payout KES)", "Enregistrement KRA + iTax"],
      obligations: ["KYC/AML selon POCAMLA", "Règle du voyage", "Digital Asset Tax 3% retenue à la source", "Intégration M-Pesa / banque SME pour le rail KES"],
      time: "9\u201318 mois",
      cost: "KES 15M\u201350M ($115K\u2013$385K)",
      alts: ["UAE VARA", "Afrique du Sud FSCA"],
      authority: "CMA + CBK",
      xrplNote: "L'adoption XRPL au Kenya se fait via les corridors Ripple ODL (KES/USD). Les ponts M-Pesa + crypto (Cellulant, Kotani Pay) intègrent XRPL pour le transfrontalier."
    },
    za: {
      // FSCA CASP Cat 1 = conseil / arrangement / distribution (widgets onramp non-custody).
      // FSCA CASP Cat 2 = gestion discrétionnaire (détient fiat OU crypto client, agit sans accord par ordre).
      // Le contrôle des changes SARB ne s'applique QUE si du ZAR traverse réellement une frontière —
      // un onramp USD↔crypto qui ne touche jamais au ZAR sort typiquement du périmètre SARB.
      regime: "FSCA CASP (FAIS Act) — Catégorie 1 pour les widgets onramp non-custodial typiques ; Catégorie 2 si l'onramp détient du fiat ou de la crypto client. Obligations AML FICA (Travel Rule depuis avril 2023). Contrôle des changes SARB uniquement si du ZAR traverse une frontière ; les onramps USD-crypto sortent du périmètre SARB.",
      risk: "med",
      licenses: [
        "CASP Catégorie 1 (FAIS Act) — voie par défaut pour onramp/offramp non-custodial",
        "Catégorie 2 uniquement si détention de fiat ou crypto client",
        "Approbation SARB uniquement pour flux ZAR transfrontaliers",
        "Désignation Payments System Operator (PSO) si exploitation de rails de paiement",
      ],
      obligations: [
        "Fit-and-proper FSCA FAIS (Cat 1 plus léger que Cat 2)",
        "AML FICA + registre des bénéficiaires effectifs",
        "Travel Rule GAFI (en vigueur depuis avril 2023)",
        "Protection des consommateurs sous FAIS",
        "Reporting SARB uniquement si le ZAR traverse une frontière",
      ],
      time: "6\u201312 mois (Cat 1)\n12\u201318 mois (Cat 2 + SARB)",
      cost: "ZAR 1M\u20134M (~$55K\u2013$220K) Cat 1\nZAR 3M\u201310M ($165K\u2013$550K) Cat 2+SARB",
      alts: ["UAE VARA", "UK FCA (corridor diaspora)"],
      authority: "FSCA + FIC (SARB conditionnel, SARB/NPS si exploitation de rails)",
      xrplNote: "L'Afrique du Sud a été la première juridiction africaine à réguler la crypto (oct. 2022). Luno, VALR, AltCoinTrader proposent l'onramp XRP. Un widget onramp XRPL purement non-custodial (pas de ZAR, pas de custody) peut généralement relever de la Cat 1. La SARB étudie XRPL pour le bridging CBDC transfrontalier."
    },
    lu: {
      regime: "MiCA CASP (CSSF) + PI/EMI PSD2 pour la jambe fiat",
      risk: "med",
      licenses: ["Agrément CASP CSSF sous MiCA", "Licence EMI (CSSF) pour détention de soldes EUR clients", "Licence PI pour routage pur sous PSD2", "Passeporting UE"],
      obligations: ["KYC/AML selon la Loi AML luxembourgeoise du 25 mars 2020", "Travel Rule FATF >€1K", "SCA PSD2 sur la jambe fiat", "Cantonnement des fonds clients (EMI/PI)", "Circulaire CSSF 22/806 outsourcing"],
      time: "12–18 mois (CASP + EMI/PI en parallèle)",
      cost: "€250K–€700K",
      alts: ["Lituanie EMI", "Liechtenstein TVTG", "Irlande CBI"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act 2020 — service de conversion (rails fiat locaux limités, généralement fiat off-island)",
      risk: "med",
      licenses: ["Enregistrement VASP CIMA — sous-classe conversion", "Partenariat EMI US/UE pour la jambe fiat (pas d'infra fiat retail domiciliée aux Caïmans)"],
      obligations: ["AML selon AMLR 2020 + MLRO nommé", "Travel Rule FATF", "Ségrégation des actifs clients", "Registre des bénéficiaires effectifs", "Audit annuel + reporting CIMA"],
      time: "6–12 mois (VASP) + calendrier du partenaire EMI",
      cost: "$100K–$300K (frais CIMA + juridique) — 0% d'impôt sur les sociétés",
      alts: ["BVI VASP", "Bermudes DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "FINTRAC MSB/FMSB (fédéral) + enregistrement provincial CSA + protection des consommateurs provinciale",
      risk: "high",
      licenses: ["Enregistrement FINTRAC MSB ou Foreign MSB", "CSA Pre-Registration Undertaking (PRU) par province", "Enregistrement CSA restricted dealer post-PRU", "Déclarations provinciales de protection des consommateurs"],
      obligations: ["KYC/AML selon PCMLTFA (amendements mars 2026)", "Travel Rule (C$1K)", "Dépôts FINTRAC STR / LCTR", "Custody clients ségréguée selon CSA Staff Notice 21-332", "Règles de compétence et de conduite"],
      time: "12–24 mois",
      cost: "C$300K–C$1M+",
      alts: ["MTL d'États US (si marché US)", "UE MiCA", "UAE VARA"],
      authority: "FINTRAC + CSA / OSC / AMF"
    },
    vg: {
      regime: "BVI VASP Act 2022 — service de conversion (rail fiat typiquement off-island)",
      risk: "med",
      licenses: ["Enregistrement VASP FSC BVI — sous-classe conversion", "Partenaire EMI/banque pour la jambe fiat", "Incorporation BVI Business Company"],
      obligations: ["AML selon AMLR + Code of Practice FSC", "MLRO + approbation FSC avant lancement", "Administrateurs fit-and-proper", "Cybersécurité + key-management (Circulaire FSC 43/2025)", "Travel Rule"],
      time: "4–12 mois (VASP)",
      cost: "$150K–$400K — 0% d'impôt sur les sociétés",
      alts: ["Cayman VASP", "Bermudes DABA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "Enregistrement AUSTRAC DCE + AFSL ASIC + Digital Assets Framework Act 2026",
      risk: "med",
      licenses: ["Enregistrement AUSTRAC Digital Currency Exchange (DCE)", "AFSL ASIC — Digital Asset Platform", "Adhésion AFCA pour litiges consommateurs", "Licence équivalent EMI APRA si flottant AUD substantiel"],
      obligations: ["KYC/AML selon AML/CTF Act 2006 (amendements 2024)", "Travel Rule (en vigueur 31 mars 2026)", "ePayments Code pour retail", "Ségrégation des actifs clients", "Reporting des manquements ASIC"],
      time: "9–18 mois (AFSL à déposer avant le 30 juin 2026 pour conserver la no-action protection)",
      cost: "A$300K–A$1M",
      alts: ["Singapour MAS MPI", "Nouvelle-Zélande FMA"],
      authority: "AUSTRAC + ASIC + RBA"
    },
    mt: {
      regime: "MiCA CASP (MFSA) + PI/EMI PSD2 — la fenêtre transitoire VFA Act ferme le 1er juillet 2026",
      risk: "med",
      licenses: ["Agrément CASP MFSA sous MiCA", "Licence PI/EMI MFSA pour la jambe fiat", "Voie simplifiée Art. 143(6) pour les détenteurs VFA historiques"],
      obligations: ["KYC/KYB complet", "Travel Rule >€1K", "Capital min. €125K (CASP) + fonds propres EMI", "Dirigeant maltais + officiers résidents", "Gouvernance MFSA Rulebook"],
      time: "9–15 mois",
      cost: "€150K–€450K",
      alts: ["Lituanie MiCA + EMI", "Luxembourg CSSF", "Irlande CBI"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M + BMA ; rails fiat typiquement via partenaire bancaire externe",
      risk: "med",
      licenses: ["DABA Class F (full) ou Class M (modified/sandbox)", "Approbation BMA", "Partenaire banque/EMI pour la jambe fiat retail"],
      obligations: ["AML/ATF selon POCA 1997 + régs DABA", "Travel Rule", "Ségrégation des fonds/actifs clients", "BMA Cyber Risk Management Code", "Comptes annuels audités + reporting BMA"],
      time: "6–12 mois",
      cost: "BMD 100K–350K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) + PI/EMI — historiquement le hub EMI UE le plus compétitif",
      risk: "med",
      licenses: ["Agrément CASP Lietuvos bankas sous MiCA", "Licence PI (PSD2) pour routage fiat", "Licence EMI pour soldes EUR clients", "Passeporting UE"],
      obligations: ["KYC/AML selon la Loi AML lituanienne (2022/2024)", "Travel Rule >€1K", "SCA sous PSD2", "Dirigeant local + responsable AML résident", "Capital min. €125K (CASP) + fonds propres EMI"],
      time: "9–15 mois",
      cost: "€100K–€350K",
      alts: ["Irlande CBI", "Luxembourg CSSF", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "CASP CBI (MiCA) + PI/EMI PSD2 — hub UE anglophone",
      risk: "med",
      licenses: ["Agrément CASP CBI sous MiCA", "Payment Institution CBI (PSD2) pour la jambe fiat", "Licence EMI pour soldes EUR clients", "Passeporting UE depuis l'Irlande"],
      obligations: ["KYC/AML selon Criminal Justice (ML/TF) Act 2010", "Travel Rule FATF >€1K", "SCA sous PSD2", "Régime Fitness & Probity CBI", "Résilience opérationnelle DORA (janv. 2025)", "Code de protection des consommateurs"],
      time: "12–18 mois",
      cost: "€250K–€700K",
      alts: ["Luxembourg CSSF", "Lituanie EMI", "UK FCA"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "Point d'entrée UE anglophone utilisé par Coinbase Ireland, Kraken (Payward Europe), Ripple Labs Ireland. Choix courant pour les firmes US proposant l'onramp XRPL aux utilisateurs UE."
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // PAIEMENT TRANSFRONTALIER (remittance internationale en crypto)
  // ═══════════════════════════════════════════════════════════════
  cross_border_payment: {
    eu: {
      regime: "CASP (MiCA) + PSD2/PSD3 + Règle du voyage AMLD6 (Règl. UE 2023/1113) + potentiellement SEPA Inst si Euro",
      risk: "high",
      licenses: ["Agrément CASP (service de transfert crypto)", "Licence PI ou EMI (jambe fiat)", "Passeport UE dans les États membres"],
      obligations: ["Règle du voyage FATF (seuil bas = \u20AC1K+ = toujours pour la crypto)", "KYC/AML selon AMLD6", "Conformité SEPA / SCT (si fiat)", "Protection des consommateurs sous MiCA", "Filtrage des sanctions selon le Règl. UE 833/2014"],
      time: "12\u201324 mois",
      cost: "\u20AC150K\u2013\u20AC500K",
      alts: ["UAE VARA (corridor MENA plus rapide)", "Singapour MAS (corridor APAC)", "Liechtenstein TVTG"],
      authority: "ANC + BCE + ESMA",
      xrplNote: "XRPL + RLUSD est une stack de référence pour le transfrontalier \u2014 règlement en moins d'une seconde, ~$0.0002 par transaction. Ripple ODL (On-Demand Liquidity) utilise XRP comme actif de pont. Corridors UE désormais opérationnels via partenaires licenciés (Bitstamp Europe, Uphold)."
    },
    us: {
      regime: "FinCEN MSB + MTL d'État (y compris Remittance Transfer Rule) + sanctions OFAC + CFPB Remittance Rule",
      risk: "high",
      licenses: ["Enregistrement FinCEN MSB", "MTL d'État dans chaque État", "Remittance Transfer Provider (>100 transferts transfrontaliers/an, CFPB Reg E)", "NY BitLicense"],
      obligations: ["BSA/AML (y compris CIP + EDD pour les corridors à haut risque)", "Règle du voyage \u2265 $3K", "Filtrage OFAC SDN + sanctions sectorielles (chaque transaction)", "Divulgations Dodd-Frank Reg E (taux de change, frais, délai de livraison)", "Résolution des plaintes consommateurs (30 jours)"],
      time: "24\u201348 mois",
      cost: "$500K\u2013$2M+",
      alts: ["UE via Irlande/Allemagne", "UAE VARA pour corridor MENA"],
      authority: "FinCEN + régulateurs d'État + OFAC + CFPB",
      xrplNote: "Corridors US \u2192 LatAm, US \u2192 Philippines utilisant XRP ODL sont opérationnels via MoneyGram (historique), Tranglo, SBI Remit. XRPL règle en ~3 secondes contre 1 à 3 jours pour SWIFT."
    },
    uae: {
      regime: "VARA VASP + réglementations de paiement transfrontalier CBUAE + rails de paiement instantané Aani",
      risk: "med",
      licenses: ["Licence VARA VASP Transfer & Settlement Services", "Licence CBUAE Remittance (si jambe fiat)", "Connectivité SWIFT/Aani"],
      obligations: ["KYC/AML selon les rulebooks CBUAE + VARA", "Règle du voyage", "Exigences de capital + liquidité en AED/USD", "Filtrage des sanctions"],
      time: "9\u201318 mois",
      cost: "$250K\u2013$750K",
      alts: ["Singapour MAS", "Bahreïn CBB"],
      authority: "VARA + CBUAE",
      xrplNote: "Les UAE sont un hub majeur XRPL pour le transfrontalier. Le partenariat Onafriq\u2013Ripple (2023) achemine UE/UK \u2192 Afrique via ODL basé aux UAE. Emirates NBD + les pilotes CBDC CBUAE ont évalué XRPL."
    },
    sg: {
      regime: "MAS PSA \u2014 classe Cross-Border Money Transfer + potentiellement classe Domestic Money Transfer + DPT",
      risk: "med",
      licenses: ["Licence MPI avec classes Cross-Border Money Transfer + DPT", "SPI si volume inférieur à SGD 3M/mois"],
      obligations: ["KYC/AML selon le MAS AML/CFT Notice", "Règle du voyage", "Cantonnement (compte en fiducie)", "Tech Risk Management Notice", "Protection des consommateurs"],
      time: "9\u201315 mois",
      cost: "SGD 250K\u2013800K",
      alts: ["Hong Kong HKMA", "UAE VARA"],
      authority: "MAS",
      xrplNote: "Singapour est un hub APAC majeur pour le transfrontalier XRPL. Project Ubin (MAS) a évalué le règlement sur registre distribué ; Partior (DBS+JPM+SC) utilise une technologie similaire. Triple-A (licenciée MAS) utilise XRPL pour ses rails de stablecoin."
    },
    uk: {
      regime: "Enregistrement FCA Cryptoasset + EMI/PI + obligations UK de remittance",
      risk: "high",
      licenses: ["Enregistrement FCA cryptoasset", "Agrément EMI ou PI", "Approved Persons Regime pour la direction exécutive"],
      obligations: ["AML/KYC selon MLR 2017", "Règle du voyage selon l'amendement UK MLR (sept. 2023)", "Consumer Duty + Outcomes", "SCA équivalent PSR/PSD2", "Ségrégation des fonds clients selon CASS"],
      time: "15\u201324 mois",
      cost: "\u00A3200K\u2013\u00A3600K",
      alts: ["CASP MiCA UE", "Gibraltar"],
      authority: "FCA",
      xrplNote: "Corridors UK \u2192 Inde et UK \u2192 Philippines via partenaires ODL XRPL. Post-Brexit, le UK a divergé sur le cadre stablecoin (2025) \u2014 pourrait ouvrir une voie IOU XRPL spécifique au UK."
    },
    hk: {
      regime: "HKMA SVF + SFC Type 1/7/9 (si VA) + AMLO + Cross-Border Payment Guidelines (HKMA)",
      risk: "med",
      licenses: ["Licence HKMA SVF ou Money Service Operator", "SFC Types 1+7 si VA impliqué", "Enregistrement AMLO"],
      obligations: ["AML selon AMLO", "Règle du voyage", "Protection des consommateurs", "Exigences de capital + liquidité"],
      time: "12\u201324 mois",
      cost: "HKD 1,5M\u20136M ($190K\u2013$770K)",
      alts: ["Singapour MAS", "UAE VARA"],
      authority: "HKMA + SFC + C&ED (Customs & Excise pour MSO)",
      xrplNote: "Le corridor HK \u2013 Chine continentale (via Bond Connect / Wealth Connect) évalue XRPL pour le règlement RMB \u2194 HKD. L'ordonnance stablecoin (2025) crée une voie plus claire pour les IOU XRPL adossés au HKD."
    },
    ch: {
      regime: "Licence FinTech FINMA ou bancaire + SRO/VQF + droit des changes + FMIA (infrastructure des marchés financiers)",
      risk: "med",
      licenses: ["Licence FINMA FinTech ou bancaire", "Adhésion SRO/VQF", "Enregistrement FMIA si exploitation d'un système de paiement"],
      obligations: ["LBA + FMIA", "KYC + surveillance continue", "Conformité au secret bancaire", "Reporting semestriel à la FINMA"],
      time: "6\u201318 mois (FinTech) / 24+ mois (bancaire)",
      cost: "CHF 200K\u2013800K",
      alts: ["Liechtenstein TVTG + passeport EEE", "UE via Allemagne"],
      authority: "FINMA + BNS (Banque Nationale Suisse pour gros volumes)",
      xrplNote: "Taurus + Sygnum + Amina/SEBA offrent un règlement transfrontalier institutionnel XRP/RLUSD. SIX Digital Exchange (SDX) explore XRPL pour le multi-CBDC."
    },
    li: {
      regime: "TVTG Token Exchange + Transfer SPs + passeport EMI UE",
      risk: "low",
      licenses: ["TVTG Token Exchange + Token Transfer Service Provider (FMA)", "Licence EMI (via LI ou passeport EEE)", "Adhésion SRO AML"],
      obligations: ["AML selon SPG + TVTG", "Règle du voyage", "Honorabilité (fit & proper)", "Reporting FMA", "Exigence de capital selon la catégorie de licence"],
      time: "4\u201312 mois",
      cost: "CHF 100K\u2013300K",
      alts: ["Suisse FINMA", "UE via DE/IE/FR"],
      authority: "FMA Liechtenstein",
      xrplNote: "Le TVTG du LI a été explicitement conçu pour accommoder le modèle de token-container XRPL. Plusieurs pilotes transfrontaliers XRPL (Amazon Web Services + partenaires) utilisent LI comme juridiction de siège."
    },
    jp: {
      regime: "FSA Fund Transfer Service Provider + CAESP (si jambe crypto) + JVCEA",
      risk: "med",
      licenses: ["FSA FTSP Type 2 (jusqu'\u00E0 \u00A51M/transaction) ou Type 1 (illimité)", "Enregistrement CAESP (jambe crypto)", "Adhésion JVCEA"],
      obligations: ["KYC/AML selon APPS", "Règle du voyage FATF", "Reporting FSA mensuel", "Règle des 95% en cold storage (jambe crypto)", "Protection des fonds clients"],
      time: "12\u201318 mois",
      cost: "\u00A530M\u2013\u00A5100M ($200K\u2013$700K)",
      alts: ["Singapour MAS", "Hong Kong HKMA"],
      authority: "FSA Japon",
      xrplNote: "SBI Remit (Japon) est l'un des plus grands corridors utilisant XRPL ODL \u2014 routes JPY \u2192 PHP, MYR, VND. Volumes de centaines de millions de USD annuellement."
    },
    kr: {
      regime: "VASP + Foreign Exchange Transaction Act + Electronic Financial Transactions Act",
      risk: "high",
      licenses: ["Enregistrement VASP (KoFIU)", "Autorisation de la Bank of Korea pour le corridor FX", "Partenariat bancaire en compte nominatif"],
      obligations: ["KYC/AML", "Règle du voyage (>\u20A91M = ~$750)", "Lien bancaire en compte nominatif", "Reporting FX à la BoK (toute transaction >$10K)"],
      time: "12\u201324 mois",
      cost: "\u20A9500M\u2013\u20A92B ($375K\u2013$1,5M)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC + KoFIU + BoK (FX)",
      xrplNote: "La Corée présente une forte adoption retail de XRP mais une infrastructure transfrontalière institutionnelle limitée en raison des contrôles FX. Corridors de remittance principalement domestiques avec les banques."
    },
    in: {
      regime: "RBI FEMA + LRS (Liberalised Remittance Scheme) + FIU-IND + restrictions forex lourdes",
      risk: "high",
      licenses: ["Enregistrement FIU-IND VASP", "Pas de voie d'autorisation RBI explicite pour le transfrontalier crypto en 2026", "Plafond LRS : $250K/personne/an"],
      obligations: ["Conformité FEMA pour tous les flux transfrontaliers", "Taxe VDA 30% + 1% TDS", "KYC/AML PMLA", "Reporting RBI TT rate"],
      time: "12\u201324 mois (navigation en zones grises)",
      cost: "\u20B91Cr\u2013\u20B95Cr ($120K\u2013$600K)",
      alts: ["Singapour MAS (le plus courant pour les fintechs indiennes)", "UAE VARA"],
      authority: "RBI + FIU-IND + CBDT",
      xrplNote: "Le corridor Inde\u2013UAE via XRPL est l'une des plus grandes voies de remittance crypto au monde (flux diaspora ~$25B/an au total). Incertitude réglementaire \u2014 la plupart des flux transitent par des exchanges licenciés ou P2P."
    },
    br: {
      regime: "BCB Loi 14.478/2022 VASP + CMN 303/2025 + cadre PIX (paiement instantané) + règles FX BCB",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "Approbation CMN pour le transfrontalier", "CVM si le token est un titre", "Participant PIX si règlement domestique"],
      obligations: ["AML Loi 9.613", "Règle du voyage", "Reporting trimestriel BCB", "Conformité FX CMN", "Protection des données LGPD"],
      time: "12\u201318 mois",
      cost: "R$1M\u2013R$4M ($200K\u2013$800K)",
      alts: ["UAE VARA", "Mexique CNBV (corridor LATAM)"],
      authority: "BCB + CMN + CVM + COAF",
      xrplNote: "Les pilotes CBDC Drex + ILP (Interledger) du Brésil évaluent une architecture de style XRPL pour le règlement transfrontalier RMB/USD. Ripple s'est associé à Travelex Bank pour les rails BRL\u2013USD."
    },
    ng: {
      regime: "Contrôle des changes strict CBN + SEC Nigeria DASP + NFIU + Foreign Exchange Act",
      risk: "high",
      licenses: ["Enregistrement SEC Nigeria DASP (jambe crypto)", "Licence Dealer Agréé CBN (jambe FX \u2014 très restrictive)", "Enregistrement NFIU"],
      obligations: ["KYC/AML selon MLPPA 2022", "Règle du voyage", "Contrôles CBN de rareté du Naira (limites de sortie strictes)", "Intégration NIBSS obligatoire pour le rail NGN"],
      time: "24\u201348 mois (volatile)",
      cost: "NGN 3B+ (plage de $3M+)",
      alts: ["Ghana BoG", "UAE VARA (offshore, courant)"],
      authority: "CBN + SEC Nigeria + NFIU",
      xrplNote: "La remittance diaspora du Nigéria ($20B+/an) est une cible majeure pour XRPL. Après les restrictions post-2024, la plupart des flux passent par l'offshore (UAE, UK) + P2P sur le dernier kilomètre. Onafriq-Ripple gère les flux institutionnels."
    },
    ke: {
      regime: "VASP Act 2025 + CBK Money Remittance + POCAMLA + Foreign Exchange Act",
      risk: "med",
      licenses: ["Licence VASP (CMA) \u2014 catégorie transfert", "CBK Money Remittance Provider", "Enregistrement KRA + iTax"],
      obligations: ["KYC/AML selon POCAMLA", "Règle du voyage", "Taxe 3% sur les actifs numériques", "Rail KES via M-Pesa/banques", "Reporting FX CBK (>$10K)"],
      time: "9\u201318 mois",
      cost: "KES 15M\u201360M ($115K\u2013$460K)",
      alts: ["UAE VARA", "Afrique du Sud FSCA"],
      authority: "CMA + CBK",
      xrplNote: "Corridors Kenya \u2194 Ouganda, Kenya \u2194 Tanzanie via XRPL ODL (Onafriq, Kotani Pay). L'interopérabilité M-Pesa avec XRPL fait du Kenya une passerelle pour la remittance crypto en Afrique de l'Est."
    },
    za: {
      regime: "FSCA CASP + contrôle des changes SARB (très strict pour les sorties ZAR) + NPS Act + AML FICA",
      risk: "high",
      licenses: ["CASP Catégorie II sous FAIS Act", "Approbation SARB pour les flux transfrontaliers", "Authorised Dealer with Limited Authority (ADLA) pour le FX retail"],
      obligations: ["Réglementation SARB de contrôle des changes (limite de sortie individuelle de R1M/an)", "Règle du voyage depuis avril 2023", "AML FICA + bénéficiaires effectifs", "Protection des consommateurs"],
      time: "12\u201318 mois",
      cost: "ZAR 5M\u201315M ($275K\u2013$825K)",
      alts: ["UAE VARA (diaspora vers Moyen-Orient/Asie)", "Île Maurice FSC"],
      authority: "FSCA + SARB + FIC",
      xrplNote: "Corridor SA \u2194 SADC (régional) + corridor diaspora SA \u2194 UK via partenaires XRPL. Pilote SARB + IntelliBridge de ZAR tokenisé sur XRPL pour règlement transfrontalier."
    },
    lu: {
      regime: "MiCA CASP (CSSF) + PI/EMI PSD2 pour la jambe fiat + SEPA Instant pour les corridors EUR",
      risk: "med",
      licenses: ["Agrément CASP CSSF sous MiCA", "Licence PI ou EMI (PSD2)", "Participation SEPA Instant"],
      obligations: ["KYC/AML selon Loi AML luxembourgeoise 2020", "Travel Rule FATF >€1K", "Cantonnement des fonds clients", "SCA PSD2", "Filtrage sanctions (UE)"],
      time: "12–18 mois",
      cost: "€250K–€700K",
      alts: ["Irlande CBI", "Lituanie EMI", "Liechtenstein TVTG"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act 2020 — classe transfer service (infrastructure corridor international)",
      risk: "med",
      licenses: ["Enregistrement VASP CIMA — transfer service", "Partenaire EMI/banque sur chaque extrémité de corridor pour les jambes fiat"],
      obligations: ["AML selon AMLR + MLRO", "Travel Rule", "Registre des bénéficiaires effectifs", "Audit annuel + reporting CIMA"],
      time: "6–12 mois",
      cost: "$100K–$300K — 0% d'impôt sur les sociétés",
      alts: ["BVI VASP", "Bermudes DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "FINTRAC MSB/FMSB + PCMLTFA + protection provinciale des consommateurs",
      risk: "med",
      licenses: ["Enregistrement FINTRAC MSB ou Foreign MSB", "Licences provinciales de services monétaires (ex : AMF Québec, FICOM C.-B.)", "Enregistrement CSA si tokens classés titres"],
      obligations: ["KYC/AML selon PCMLTFA", "Travel Rule (C$1K)", "Rapports LCTR + EFT (≥C$10K)", "Filtrage sanctions", "Divulgations consommateurs"],
      time: "9–18 mois",
      cost: "C$250K–C$800K",
      alts: ["MTL d'États US", "UAE VARA"],
      authority: "FINTRAC + régulateurs provinciaux"
    },
    vg: {
      regime: "BVI VASP Act 2022 — service de conversion/transfert (infra corridor)",
      risk: "med",
      licenses: ["Enregistrement VASP FSC BVI", "Partenaire EMI/banque sur chaque extrémité de corridor"],
      obligations: ["AML selon AMLR + MLRO", "Administrateurs fit-and-proper", "Travel Rule", "Cybersécurité + key-management"],
      time: "4–12 mois",
      cost: "$150K–$400K — 0% d'impôt sur les sociétés",
      alts: ["Cayman VASP", "Bermudes DABA"],
      authority: "BVI Financial Services Commission (FSC)"
    },
    au: {
      regime: "AUSTRAC DCE + AUSTRAC Remittance Network Provider + AFSL ASIC",
      risk: "med",
      licenses: ["Enregistrement AUSTRAC DCE", "Enregistrement AUSTRAC Remittance Network Provider (RNP)", "AFSL ASIC si produit financier proposé"],
      obligations: ["KYC/AML selon AML/CTF Act 2006", "Travel Rule (31 mars 2026)", "Rapports IFTI (International Funds Transfer Instruction)", "Filtrage sanctions", "Protection des consommateurs"],
      time: "9–18 mois",
      cost: "A$250K–A$800K",
      alts: ["Singapour MAS MPI (classe cross-border)", "Nouvelle-Zélande FMA"],
      authority: "AUSTRAC + ASIC"
    },
    mt: {
      regime: "MiCA CASP (MFSA) + PI/EMI PSD2 pour la jambe fiat",
      risk: "med",
      licenses: ["Agrément CASP MFSA sous MiCA", "Licence PI/EMI MFSA pour le règlement fiat transfrontalier", "Passeporting UE"],
      obligations: ["KYC/AML + Travel Rule >€1K", "SCA sous PSD2", "Dirigeant maltais + officiers résidents", "Filtrage sanctions (UE)"],
      time: "9–15 mois",
      cost: "€150K–€450K",
      alts: ["Lituanie EMI", "Luxembourg CSSF", "Irlande CBI"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M + BMA (activité de paiement transfrontalier)",
      risk: "med",
      licenses: ["DABA Class F (full) ou Class M (modified/sandbox)", "Approbation BMA", "Partenaire banque/EMI sur chaque extrémité de corridor"],
      obligations: ["AML/ATF selon POCA 1997", "Travel Rule", "Cantonnement des fonds clients", "BMA Cyber Risk Management Code", "Audit annuel"],
      time: "6–12 mois",
      cost: "BMD 100K–350K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "Bermuda Monetary Authority (BMA)"
    },
    lt: {
      regime: "MiCA CASP (Lietuvos bankas) + PI PSD2 — hub EMI UE transfrontalier le moins cher",
      risk: "med",
      licenses: ["CASP Lietuvos bankas sous MiCA", "Licence PI/EMI (PSD2)", "Passeporting UE"],
      obligations: ["KYC/AML selon la Loi AML lituanienne", "Travel Rule >€1K", "SCA sous PSD2", "Dirigeant local + responsable AML", "Filtrage sanctions"],
      time: "9–15 mois",
      cost: "€100K–€350K",
      alts: ["Irlande CBI", "Luxembourg CSSF", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "CASP CBI (MiCA) + PI PSD2 — hub UE transfrontalier anglophone",
      risk: "med",
      licenses: ["Agrément CASP CBI sous MiCA", "Payment Institution CBI (PSD2) pour les corridors fiat", "Passeporting UE depuis l'Irlande"],
      obligations: ["KYC/AML selon CJA 2010", "Travel Rule FATF >€1K", "SCA sous PSD2", "Filtrage sanctions", "Résilience opérationnelle DORA (janv. 2025)", "Code de protection des consommateurs"],
      time: "12–18 mois",
      cost: "€250K–€700K",
      alts: ["Luxembourg CSSF", "Lituanie EMI", "UK FCA"],
      authority: "Central Bank of Ireland (CBI)",
      xrplNote: "Ripple Labs Ireland Ltd utilise ce stack pour les services corridor RippleNet en UE. Base UE transfrontalière courante pour les fintechs de remittance US."
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ÉMISSION DE TOKEN \u2014 UTILITAIRE
  // ═══════════════════════════════════════════════════════════════
  token_utility: {
    eu: {
      regime: "Régime MiCA Utility Token (allégé)",
      risk: "low",
      licenses: ["Pas d'agrément CASP nécessaire", "Notification du livre blanc à l'ANC (si offre >\u20AC1M)"],
      obligations: ["Publier un livre blanc MiCA", "Pas de marketing trompeur", "Notification à l'ANC", "Droit de rétractation (14 jours si clientèle de détail)"],
      time: "1\u20133 mois",
      cost: "\u20AC10K\u2013\u20AC50K",
      alts: ["Liechtenstein TVTG", "Suisse"],
      authority: "ANC"
    },
    us: {
      regime: "Howey Test + test 'mature blockchain' du CLARITY Act (2025)",
      risk: "med",
      licenses: ["Pas de licence si véritablement utility ET le réseau sous-jacent passe le test mature-blockchain du CLARITY Act (= digital commodity, voie CFTC)", "Enregistrement SEC + exemption (Reg D/S/A+) si échoue au Howey"],
      obligations: ["Avis juridique dual : Howey (SEC) + statut mature-blockchain CLARITY (voie CFTC)", "Pas de marketing d'investissement, pas de promesses de rendement", "Protection des consommateurs, divulgations transparentes", "Si compétence CFTC : règles du marché au comptant + anti-fraude"],
      time: "1\u20136 mois (utility) / 6\u201312 mois (cas limites)",
      cost: "$20K\u2013$150K (avis juridique dual)",
      alts: ["UE MiCA 'Other crypto-asset' (plus léger, whitepaper seulement)", "Liechtenstein TVTG"],
      authority: "SEC + CFTC (répartition CLARITY Act)"
    },
    uae: {
      regime: "VARA \u2014 avis utility token",
      risk: "low",
      licenses: ["Dépôt consultatif VARA"],
      obligations: ["Classification du token", "Protection des consommateurs"],
      time: "1\u20133 mois",
      cost: "$10K\u2013$30K",
      alts: ["Singapour", "UE"],
      authority: "VARA"
    },
    sg: {
      regime: "MAS \u2014 hors périmètre PSA si pure utility",
      risk: "low",
      licenses: ["Pas de licence MAS pour pure utility"],
      obligations: ["S'assurer que ce n'est pas un DPT ou produit de marchés de capitaux"],
      time: "1\u20132 mois",
      cost: "SGD 10K\u201330K",
      alts: ["UE MiCA", "Liechtenstein"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 utility token non régulé",
      risk: "low",
      licenses: ["Pas d'enregistrement FCA pour utility tokens"],
      obligations: ["Régime des promotions financières (marketing)", "Protection des consommateurs"],
      time: "1\u20132 mois",
      cost: "\u00A35K\u2013\u00A320K",
      alts: ["UE MiCA"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 utility généralement non régulé",
      risk: "low",
      licenses: ["Pas de licence pour pure utility"],
      obligations: ["Avis juridique recommandé", "Protection des consommateurs"],
      time: "1\u20132 mois",
      cost: "HKD 20K\u201350K",
      alts: ["Singapour", "UE"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 classification utility token",
      risk: "low",
      licenses: ["Pas de licence FINMA", "Lettre no-action FINMA recommandée"],
      obligations: ["Dépôt de classification du token", "AML uniquement si intermédiaire financier"],
      time: "1\u20133 mois",
      cost: "CHF 10K\u201340K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 SP Token Emitter (allégé)",
      risk: "low",
      licenses: ["SP Token Emitter (simplifié)"],
      obligations: ["AML TVTG (allégé)", "Documentation du token"],
      time: "1\u20133 mois",
      cost: "CHF 10K\u201330K",
      alts: ["Suisse"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — utility token généralement hors périmètre CAESP",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "Non régulé si pure utility",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "Taxe VDA applicable même aux utility tokens",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "Régulation minimale pour pure utility",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "SEC Nigeria DASP — les utility tokens généralement exemptés si pas d'attente d'investissement",
      risk: "med",
      licenses: ["SEC Nigeria DASP si marketé avec angle investissement", "Pas de licence pour pure utility"],
      obligations: ["KYC/AML si DASP", "Divulgations de protection consommateurs"],
      time: "6–12 mois",
      cost: "NGN 50M–200M ($50K–$200K)",
      alts: ["UAE VARA", "UE MiCA"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "VASP Act 2025 — utility tokens généralement exemptés si usage consommation véritable",
      risk: "low",
      licenses: ["Pas de VASP pour pure utility", "VASP CMA si plateforme de trading secondaire"],
      obligations: ["KYC/AML si VASP", "Protection consommateurs"],
      time: "3–9 mois",
      cost: "KES 2M–10M ($15K–$75K)",
      alts: ["Afrique du Sud FSCA", "UAE VARA"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CASP — utility tokens hors scope si pas de caractère investissement ; copyright pour usage in-app",
      risk: "low",
      licenses: ["Pas de CASP pour pure utility", "CASP Cat 1 si trading secondaire / conseil"],
      obligations: ["AML FICA si CASP", "Protection consommateurs sous FAIS"],
      time: "3–9 mois",
      cost: "ZAR 500K–2M ($30K–$110K)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "Régime MiCA Utility Token (allégé) — notification whitepaper CSSF si offre >€1M",
      risk: "low",
      licenses: ["Pas d'agrément CASP nécessaire", "Notification whitepaper CSSF (si offre >€1M)"],
      obligations: ["Whitepaper véridique", "Info consommateurs + délai de rétractation 14 jours", "Règles d'abus de marché si coté"],
      time: "2–4 mois",
      cost: "€30K–€120K",
      alts: ["Liechtenstein TVTG", "Suisse"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman Virtual Asset Issuance sous VASP Act — utility tokens plus légers que security",
      risk: "low",
      licenses: ["Émetteur VASP enregistré (CIMA)", "Cayman Foundation Company couramment utilisée"],
      obligations: ["AML selon AMLR 2020 + MLRO", "Divulgations d'émission"],
      time: "3–6 mois",
      cost: "$50K–$200K — 0% d'impôt sur les sociétés",
      alts: ["BVI Foundation", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA — utility tokens au cas par cas ; test Howey-like 4 critères de Pacific Coast appliqué",
      risk: "med",
      licenses: ["Pas d'enregistrement CSA si pure utility", "Prospectus si test investment-contract rempli", "FINTRAC MSB si custody"],
      obligations: ["Analyse CSA Staff Notice 46-307/308", "Protection consommateurs", "KYC/AML si dealer"],
      time: "6–12 mois",
      cost: "C$150K–C$500K",
      alts: ["SAFT US", "UE MiCA"],
      authority: "CSA"
    },
    vg: {
      regime: "BVI VASP Act 2022 — utility tokens voie plus légère en général",
      risk: "low",
      licenses: ["Enregistrement VASP BVI comme émetteur", "BVI Foundation Company pour tokens communautaires"],
      obligations: ["AML selon AMLR + MLRO", "Divulgations d'émission"],
      time: "3–6 mois",
      cost: "$50K–$200K — 0% d'impôt sur les sociétés",
      alts: ["Cayman VASP", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC — utility tokens au cas par cas ; classification produit financier via INFO 225",
      risk: "med",
      licenses: ["Pas d'AFSL si pure utility", "AFSL ASIC si produit financier", "AUSTRAC DCE si émetteur aussi exchange"],
      obligations: ["Marketing véridique (Corporations Act)", "KYC/AML si licencié"],
      time: "4–9 mois",
      cost: "A$100K–A$400K",
      alts: ["Singapour MAS", "UAE VARA"],
      authority: "ASIC"
    },
    mt: {
      regime: "Régime MiCA Utility Token (allégé) via MFSA",
      risk: "low",
      licenses: ["Pas d'agrément CASP nécessaire", "Notification whitepaper MFSA (si offre >€1M)"],
      obligations: ["Whitepaper véridique", "Rétractation 14 jours", "Règles d'abus de marché si coté"],
      time: "2–4 mois",
      cost: "€20K–€100K",
      alts: ["Lituanie MiCA", "Liechtenstein TVTG"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 Class F/M — utility tokens typiquement Class M (modifié)",
      risk: "low",
      licenses: ["DABA Class M si sandbox", "Approbation BMA"],
      obligations: ["AML/ATF selon POCA 1997", "BMA Cyber Risk Management Code"],
      time: "4–9 mois",
      cost: "BMD 50K–200K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "BMA"
    },
    lt: {
      regime: "Régime MiCA Utility Token (allégé) via Lietuvos bankas",
      risk: "low",
      licenses: ["Pas d'agrément CASP", "Notification whitepaper (si offre >€1M)"],
      obligations: ["Whitepaper véridique", "Rétractation 14 jours", "Règles d'abus de marché"],
      time: "2–4 mois",
      cost: "€15K–€80K",
      alts: ["Malte MiCA", "Liechtenstein TVTG"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "Régime MiCA Utility Token (allégé) via CBI",
      risk: "low",
      licenses: ["Pas de CASP CBI requis", "Notification whitepaper CBI (si offre >€1M)"],
      obligations: ["Whitepaper véridique selon CJA 2010", "Rétractation 14 jours", "Règles d'abus de marché si coté"],
      time: "3–6 mois",
      cost: "€40K–€200K",
      alts: ["Luxembourg CSSF", "Malte MFSA"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ÉMISSION DE TOKEN \u2014 TITRE FINANCIER
  // ═══════════════════════════════════════════════════════════════
  token_security: {
    eu: {
      regime: "MiFID II + Règlement Prospectus + DLT Pilot Regime",
      risk: "high",
      licenses: ["Licence d'entreprise d'investissement (MiFID II)", "DLT Pilot Regime (alternative sandbox)", "Approbation du prospectus"],
      obligations: ["Prospectus complet (ou exemption)", "Protection des investisseurs MiFID II", "KYC/AML/KYB", "Règles custody équivalentes CASS", "Publication continue"],
      time: "12\u201324 mois",
      cost: "\u20AC200K\u2013\u20AC500K+",
      alts: ["DLT Pilot Regime (simplifié)", "Liechtenstein TVTG", "Suisse Loi DLT"],
      authority: "ANC / ESMA"
    },
    us: {
      regime: "SEC Securities Act (Reg D / Reg S / Reg A+) + cadre 'investment contract digital asset' du CLARITY Act (2025)",
      risk: "high",
      licenses: ["Enregistrement SEC ou exemption (Reg D 506(c), Reg S, Reg A+)", "Enregistrement broker-dealer", "ATS si marché secondaire", "CLARITY Act : transition possible vers 'digital commodity' CFTC une fois le test mature-blockchain passé"],
      obligations: ["Reg D : investisseurs accrédités uniquement, pas de démarchage public (506b) ou avec vérification (506c)", "Reg S : hors États-Unis uniquement", "Reg A+ : mini-IPO jusqu'à $75M", "Exigences de transfer agent", "Conformité Blue sky par État", "Divulgations CLARITY Act pour les 'investment contract digital assets' (rapports trimestriels + annuels, audit)"],
      time: "6\u201318 mois",
      cost: "$200K\u2013$1M+",
      alts: ["Reg S (focus non-US)", "DLT Pilot Regime UE", "Liechtenstein TVTG"],
      authority: "SEC / FINRA / CFTC (après transition mature-blockchain)"
    },
    uae: {
      regime: "ADGM/DIFC \u2014 Titres financiers numériques régulés",
      risk: "med",
      licenses: ["Licence FSRA (ADGM)", "Licence DFSA (DIFC)"],
      obligations: ["Prospectus", "KYC/AML", "Adéquation investisseur"],
      time: "6\u201312 mois",
      cost: "$100K\u2013$300K",
      alts: ["Singapour", "DLT Pilot UE"],
      authority: "FSRA / DFSA"
    },
    sg: {
      regime: "MAS SFA \u2014 Offre de tokens numériques",
      risk: "med",
      licenses: ["Capital Markets Services licence", "Prospectus SFA ou exemption"],
      obligations: ["Conformité SFA", "KYC/AML", "Publication continue"],
      time: "6\u201318 mois",
      cost: "SGD 100K\u2013400K",
      alts: ["DLT Pilot UE", "Liechtenstein"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 Security Token Offering",
      risk: "high",
      licenses: ["Firme autorisée FCA", "Approbation du prospectus"],
      obligations: ["FCA Handbook", "Règlement Prospectus", "Consumer Duty", "Custody CASS"],
      time: "12\u201318 mois",
      cost: "\u00A3150K\u2013\u00A3400K",
      alts: ["DLT Pilot UE", "Liechtenstein"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 licence Type 1/Type 9",
      risk: "high",
      licenses: ["Type 1 (dealing in securities)", "Type 9 (asset management)"],
      obligations: ["Pleine conformité SFO", "Investisseurs professionnels (focus institutionnel)", "Exigences de custody"],
      time: "12\u201318 mois",
      cost: "HKD 500K\u20132M",
      alts: ["Singapour", "UE"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 Asset token / Loi DLT",
      risk: "med",
      licenses: ["Licence de négociant en valeurs mobilières ou DLT Trading Facility", "Licence bancaire (si dépôts)"],
      obligations: ["Prospectus (CO suisse)", "AML LBA", "Conformité Loi DLT"],
      time: "6\u201318 mois",
      cost: "CHF 100K\u2013500K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 SP Token Emitter + distribution EEE",
      risk: "low",
      licenses: ["Licence SP Token Emitter", "Passeporting prospectus EEE"],
      obligations: ["AML TVTG", "Prospectus (ou exemption)", "Honorabilité", "Rapport annuel FMA"],
      time: "3\u20139 mois",
      cost: "CHF 25K\u2013100K",
      alts: ["Suisse FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — Type I Financial Instruments (STO)",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "FSC — Capital Markets Act applicable",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "SEBI — Droit des titres financiers applicable (cadre proposé)",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "CVM — Offre de security tokens",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "SEC Nigeria — Digital Asset Rules (2022) pour offres de security tokens (STO)",
      risk: "high",
      licenses: ["Agrément STO SEC Nigeria", "Dépôt prospectus", "Enregistrement DASP si trading secondaire"],
      obligations: ["Prospectus complet + divulgations risques", "KYC/AML selon MLPPA 2022", "Accréditation investisseur"],
      time: "18–36 mois",
      cost: "NGN 500M+ ($500K+)",
      alts: ["UAE VARA", "DLT Pilot UE"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "CMA Capital Markets Act + VASP Act 2025 pour émission + trading",
      risk: "high",
      licenses: ["Approbation prospectus CMA", "VASP CMA si trading tokenisé", "Approbation CBK pour flux KES"],
      obligations: ["Prospectus complet", "KYC/AML selon POCAMLA", "Divulgation continue", "3% Digital Asset Tax"],
      time: "12–24 mois",
      cost: "KES 15M–60M ($115K–$460K)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CISCA + règles JSE + CASP si trading ; projet IFWG titres tokenisés",
      risk: "high",
      licenses: ["Licence manager CISCA", "Listing JSE (si exchange-traded)", "CASP Catégorie II si plateforme de trading secondaire"],
      obligations: ["Prospectus FSCA + divulgation continue", "KYC/AML selon FICA", "POPIA protection des données"],
      time: "12–18 mois",
      cost: "ZAR 5M–15M ($275K–$825K)",
      alts: ["UAE ADGM", "Île Maurice FSC"],
      authority: "FSCA + JSE"
    },
    lu: {
      regime: "Droit luxembourgeois des titres + MiFID + DLT Pilot Regime — hub UE dominant pour STO",
      risk: "med",
      licenses: ["Approbation prospectus CSSF", "MiFID investment firm si trading / dealing", "Sandbox DLT Pilot Regime"],
      obligations: ["Règlement Prospectus (UE 2017/1129)", "Règles MAR d'abus de marché", "Ségrégation custody CSDR", "KYC/AML"],
      time: "9–15 mois",
      cost: "€300K–€1M+",
      alts: ["Suisse FINMA", "Liechtenstein TVTG", "Irlande CBI"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman Mutual Funds Law + SIBL (Securities) — populaire pour structures STO offshore",
      risk: "med",
      licenses: ["Enregistrement CIMA Mutual/Private Fund", "SIBL si brokerage", "VASP CIMA si plateforme de trading"],
      obligations: ["AML selon AMLR + MLRO", "Audit fonds + prospectus", "Suitability si retail"],
      time: "3–9 mois",
      cost: "$100K–$500K — 0% d'impôt sur les sociétés",
      alts: ["BVI SIBA", "Bermudes DABA"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA — régime complet des titres ; restreint aux investisseurs accrédités sauf prospectus",
      risk: "high",
      licenses: ["Prospectus CSA ou exemption Reg 45-106", "Registered dealer (IIROC)", "Enregistrement ATS si trading"],
      obligations: ["Prospectus complet + divulgation continue", "KYC/AML selon PCMLTFA", "Vérification investisseur accrédité"],
      time: "12–24 mois",
      cost: "C$500K–C$2M",
      alts: ["Reg D US", "DLT Pilot UE"],
      authority: "CSA / OSC / AMF / IIROC"
    },
    vg: {
      regime: "BVI Securities and Investment Business Act (SIBA) — STO via Approved Manager / Incubator Fund",
      risk: "med",
      licenses: ["Licence BVI Approved Manager", "BVI Incubator Fund / Private Fund", "VASP Act si secondaire tokenisé"],
      obligations: ["AML + MLRO", "Reporting SIBA", "Audit si fonds"],
      time: "4–9 mois",
      cost: "$100K–$400K — 0% d'impôt sur les sociétés",
      alts: ["Cayman SIBL", "Bermudes DABA"],
      authority: "BVI FSC"
    },
    au: {
      regime: "Corporations Act régime complet des titres + AFSL ASIC + Digital Assets Framework Act 2026",
      risk: "high",
      licenses: ["AFSL ASIC — émetteur + dealer", "Prospectus sous s.710", "ASIC Digital Asset Platform si secondaire"],
      obligations: ["Prospectus complet + divulgation continue", "Design and Distribution Obligations (DDO)", "Gating investisseur accrédité pour wholesale"],
      time: "12–24 mois",
      cost: "A$500K–A$1.5M",
      alts: ["Singapour MAS", "DLT Pilot UE"],
      authority: "ASIC"
    },
    mt: {
      regime: "Malta Financial Markets Act + MiFID + DLT Pilot Regime via MFSA",
      risk: "med",
      licenses: ["Approbation prospectus MFSA", "Licence MiFID investment firm", "Sandbox DLT Pilot Regime"],
      obligations: ["Règlement Prospectus", "Règles MAR d'abus de marché", "Custody CSDR", "KYC/AML"],
      time: "9–15 mois",
      cost: "€200K–€700K",
      alts: ["Lituanie MiCA", "Luxembourg CSSF"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 + BMA Investment Business Act (si structure de fonds)",
      risk: "med",
      licenses: ["DABA Class F + BMA Investment Business", "Approbation BMA"],
      obligations: ["AML/ATF selon POCA 1997", "Reporting fonds", "BMA Cyber Risk Management Code"],
      time: "6–12 mois",
      cost: "BMD 150K–500K",
      alts: ["Cayman SIBL", "BVI Approved Manager"],
      authority: "BMA"
    },
    lt: {
      regime: "Droit des titres lituanien + MiFID + DLT Pilot Regime via Lietuvos bankas",
      risk: "med",
      licenses: ["Approbation prospectus Lietuvos bankas", "MiFID investment firm", "Sandbox DLT Pilot Regime"],
      obligations: ["Règlement Prospectus", "Règles MAR d'abus de marché", "KYC/AML", "Dirigeant local + responsable AML"],
      time: "6–12 mois",
      cost: "€100K–€400K",
      alts: ["Malte MiCA", "Luxembourg CSSF"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "Droit des titres irlandais + MiFID + DLT Pilot Regime — hub UE leader administration de fonds",
      risk: "med",
      licenses: ["Approbation prospectus CBI", "Agrément CBI MiFID investment firm", "Sandbox DLT Pilot Regime"],
      obligations: ["Règlement Prospectus (UE 2017/1129)", "Règles MAR d'abus de marché", "UCITS/AIFMD si collectif", "KYC/AML selon CJA 2010", "Résilience opérationnelle DORA"],
      time: "12–18 mois",
      cost: "€300K–€1M+",
      alts: ["Luxembourg CSSF", "Malte MFSA"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ÉMISSION DE TOKEN \u2014 HYBRIDE
  // ═══════════════════════════════════════════════════════════════
  token_hybrid: {
    eu: {
      regime: "MiCA + analyse MiFID II \u2014 le régime le plus strict s'applique",
      risk: "high",
      licenses: ["CASP + potentiellement licence d'entreprise d'investissement", "Qualification juridique obligatoire"],
      obligations: ["Double analyse : éléments utility vs titre financier", "Livre blanc + prospectus si éléments titre financier", "KYC/AML", "Le régime le plus strict s'applique toujours"],
      time: "12\u201324 mois",
      cost: "\u20AC100K\u2013\u20AC400K",
      alts: ["Liechtenstein TVTG (classification flexible)", "Suisse FINMA"],
      authority: "ANC / ESMA"
    },
    us: {
      regime: "Analyse SEC \u2014 probablement titre financier si tout élément d'investissement",
      risk: "high",
      licenses: ["Enregistrement SEC ou exemption", "Conformité État"],
      obligations: ["Howey Test \u2014 toute attente d'investissement = titre financier", "Pleine conformité aux titres financiers", "Avis juridique critique"],
      time: "6\u201318 mois",
      cost: "$150K\u2013$500K+",
      alts: ["Structurer en pure utility aux États-Unis + titre financier ailleurs"],
      authority: "SEC"
    },
    uae: {
      regime: "VARA \u2014 classification détermine la voie",
      risk: "med",
      licenses: ["Licence VARA VASP", "FSRA si éléments titre financier (ADGM)"],
      obligations: ["Classification du token", "KYC/AML", "Double conformité"],
      time: "6\u201312 mois",
      cost: "$75K\u2013$200K",
      alts: ["Singapour", "UE"],
      authority: "VARA / FSRA"
    },
    sg: {
      regime: "MAS \u2014 double analyse PSA/SFA",
      risk: "med",
      licenses: ["MPI (élément DPT) + CMS (élément titre financier)"],
      obligations: ["Analyse de double classification", "KYC/AML", "Tech Risk Management"],
      time: "6\u201318 mois",
      cost: "SGD 100K\u2013350K",
      alts: ["UAE", "UE"],
      authority: "MAS"
    },
    uk: {
      regime: "FCA \u2014 la classification la plus stricte s'applique",
      risk: "high",
      licenses: ["Autorisation FCA", "Prospectus éventuel"],
      obligations: ["Classification titre financier si élément d'investissement", "Consumer Duty", "AML/KYC"],
      time: "12\u201318 mois",
      cost: "\u00A3100K\u2013\u00A3300K",
      alts: ["UE", "Liechtenstein"],
      authority: "FCA"
    },
    hk: {
      regime: "SFC \u2014 classification titre financier probable",
      risk: "high",
      licenses: ["Licence SFC (Type 1/9)"],
      obligations: ["Conformité SFO", "Avis juridique requis"],
      time: "12\u201318 mois",
      cost: "HKD 300K\u20131.5M",
      alts: ["Singapour"],
      authority: "SFC"
    },
    ch: {
      regime: "FINMA \u2014 hybride = traitement asset token",
      risk: "med",
      licenses: ["Classification FINMA \u2014 traité comme l'élément le plus strict"],
      obligations: ["Analyse FINMA complète", "AML LBA", "Prospectus si titre financier"],
      time: "6\u201318 mois",
      cost: "CHF 75K\u2013400K",
      alts: ["Liechtenstein TVTG"],
      authority: "FINMA"
    },
    li: {
      regime: "TVTG \u2014 Token Container Model (gère l'hybride nativement)",
      risk: "low",
      licenses: ["Licence(s) SP pour les services pertinents", "Distribution EEE"],
      obligations: ["AML TVTG", "Documentation du token", "Qualification juridique"],
      time: "3\u20139 mois",
      cost: "CHF 20K\u2013100K",
      alts: ["Suisse FINMA"],
      authority: "FMA"
    },
    jp: {
      regime: "FSA — la classification la plus stricte s'applique",
      risk: "med",
      licenses: ["Enregistrement ou classification FSA"],
      obligations: ["KYC/AML", "Conformité FSA", "Protection des consommateurs"],
      time: "6–18 mois",
      cost: "¥5M–¥30M ($35K–$210K)",
      alts: ["Singapour MAS", "UE MiCA"],
      authority: "FSA Japon"
    },
    kr: {
      regime: "FSC — traité comme titre financier si tout élément d'investissement",
      risk: "med",
      licenses: ["Enregistrement VASP ou autorisation FSC"],
      obligations: ["KYC/AML", "ISMS-P", "Compte bancaire nominatif"],
      time: "6–18 mois",
      cost: "₩50M–₩300M ($37K–$225K)",
      alts: ["Japon FSA", "Singapour MAS"],
      authority: "FSC / FIU Corée"
    },
    in: {
      regime: "Double analyse SEBI/RBI requise",
      risk: "med",
      licenses: ["Enregistrement FIU-IND", "Autorisation SEBI si titres financiers"],
      obligations: ["Taxe VDA de 30%", "TDS de 1%", "KYC/AML PMLA"],
      time: "3–12 mois",
      cost: "₹5L–₩30L ($6K–$36K)",
      alts: ["Singapour MAS", "Dubaï VARA"],
      authority: "FIU-IND / SEBI / RBI"
    },
    br: {
      regime: "CVM/BCB — double classification",
      risk: "med",
      licenses: ["Autorisation BCB VASP", "CVM si titres financiers"],
      obligations: ["KYC/AML", "Protection des consommateurs", "Reporting BCB"],
      time: "6–12 mois",
      cost: "R$100K–R$500K ($20K–$100K)",
      alts: ["UE MiCA", "Liechtenstein TVTG"],
      authority: "BCB / CVM"
    },
    ng: {
      regime: "SEC Nigeria — tokens hybrides classés selon la caractéristique dominante (utility vs investissement)",
      risk: "high",
      licenses: ["SEC Nigeria DASP + traitement STO si investissement domine", "Utility-only si consommation domine"],
      obligations: ["Divulgation complète des mécaniques du token", "KYC/AML selon MLPPA 2022", "Risque de reclassification dans le temps"],
      time: "12–24 mois",
      cost: "NGN 200M+ ($200K+)",
      alts: ["UAE VARA", "Cayman VASP"],
      authority: "SEC Nigeria"
    },
    ke: {
      regime: "CMA au cas par cas — analyse utility vs security ; hybride tend vers traitement security",
      risk: "high",
      licenses: ["Prospectus CMA si élément security dominant", "VASP + DASP si double usage"],
      obligations: ["Divulgation des mécaniques hybrides", "KYC/AML selon POCAMLA", "3% Digital Asset Tax"],
      time: "9–18 mois",
      cost: "KES 10M–40M ($75K–$310K)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "CMA"
    },
    za: {
      regime: "FSCA CASP + FAIS Act + CISCA — tokens hybrides déclenchent les deux si investissement + utility",
      risk: "high",
      licenses: ["CASP Catégorie II", "Manager CISCA si mutualisé", "Licences conseil + intermédiation FAIS"],
      obligations: ["Divulgations double régime", "AML FICA", "Protection consommateurs"],
      time: "12–18 mois",
      cost: "ZAR 3M–10M ($165K–$550K)",
      alts: ["UAE VARA", "Île Maurice FSC"],
      authority: "FSCA + FIC"
    },
    lu: {
      regime: "MiCA + MiFID double régime pour tokens hybrides — la CSSF classe selon caractéristique dominante",
      risk: "high",
      licenses: ["CSSF CASP + MiFID investment firm si dual", "Simplifié si utility domine", "Prospectus complet si security domine"],
      obligations: ["Double KYC/AML", "Whitepaper + prospectus selon classification", "Règles MAR d'abus de marché"],
      time: "9–18 mois",
      cost: "€200K–€800K",
      alts: ["Liechtenstein TVTG (container de token flexible)", "Suisse FINMA"],
      authority: "CSSF"
    },
    ky: {
      regime: "Cayman VASP Act + SIBL — l'analyse hybride détermine la voie réglementaire",
      risk: "med",
      licenses: ["CIMA VASP comme émetteur + SIBL si élément brokerage", "Cayman Foundation si gouverné par communauté"],
      obligations: ["AML selon AMLR + MLRO", "Double divulgations si hybride", "Suitability si retail"],
      time: "4–9 mois",
      cost: "$75K–$300K — 0% d'impôt sur les sociétés",
      alts: ["BVI Foundation", "Liechtenstein TVTG"],
      authority: "CIMA"
    },
    ca: {
      regime: "CSA Staff Notice 46-307/308 — tokens hybrides soumis à l'analyse 4 critères Howey-like complète",
      risk: "high",
      licenses: ["Prospectus CSA si test investment-contract rempli", "FINTRAC MSB si custody", "IIROC si trading secondaire"],
      obligations: ["Divulgation complète + analyse de classification", "KYC/AML selon PCMLTFA", "Gating investisseur accrédité si exempt"],
      time: "12–24 mois",
      cost: "C$300K–C$1M",
      alts: ["Reg D / SAFT US", "UE MiCA"],
      authority: "CSA"
    },
    vg: {
      regime: "BVI VASP Act + SIBA — analyse hybride selon caractéristique dominante",
      risk: "med",
      licenses: ["BVI VASP + SIBA investment business si hybride", "BVI Foundation pour tokens communautaires"],
      obligations: ["AML + MLRO", "Divulgations double régime"],
      time: "4–9 mois",
      cost: "$75K–$300K — 0% d'impôt sur les sociétés",
      alts: ["Cayman VASP + SIBL", "Liechtenstein TVTG"],
      authority: "BVI FSC"
    },
    au: {
      regime: "ASIC INFO 225 — tokens hybrides au cas par cas ; déclenchent généralement AFSL + régime MIS",
      risk: "high",
      licenses: ["AFSL ASIC si produit financier", "AUSTRAC DCE si élément exchange", "Prospectus/PDS selon retail/wholesale"],
      obligations: ["Design and Distribution Obligations (DDO)", "KYC/AML selon AML/CTF Act", "Divulgations double régime"],
      time: "12–24 mois",
      cost: "A$300K–A$1M",
      alts: ["Singapour MAS", "UAE VARA"],
      authority: "ASIC"
    },
    mt: {
      regime: "MiCA + MiFID double régime via MFSA — analyse hybride selon caractéristique dominante",
      risk: "med",
      licenses: ["MFSA CASP + MiFID investment firm si hybride", "Voie utility-only si consommation domine"],
      obligations: ["Double KYC/AML", "Whitepaper + prospectus", "Règles MAR d'abus de marché"],
      time: "9–15 mois",
      cost: "€150K–€600K",
      alts: ["Lituanie MiCA", "Luxembourg CSSF"],
      authority: "MFSA"
    },
    bm: {
      regime: "DABA 2018 — tokens hybrides typiquement Class F avec revue BMA supplémentaire",
      risk: "med",
      licenses: ["DABA Class F (full) + approbation BMA supplémentaire pour hybride"],
      obligations: ["AML/ATF selon POCA 1997", "Divulgations double régime", "BMA Cyber Risk Management Code"],
      time: "6–12 mois",
      cost: "BMD 100K–400K",
      alts: ["Cayman VASP", "BVI VASP"],
      authority: "BMA"
    },
    lt: {
      regime: "MiCA + MiFID double régime via Lietuvos bankas — hybride selon caractéristique dominante",
      risk: "med",
      licenses: ["CASP Lietuvos bankas + MiFID investment firm si dual", "Voie utility-only si consommation domine"],
      obligations: ["Double KYC/AML", "Whitepaper + prospectus selon classification", "Règles MAR d'abus de marché"],
      time: "6–12 mois",
      cost: "€100K–€400K",
      alts: ["Malte MiCA", "Luxembourg CSSF"],
      authority: "Lietuvos bankas"
    },
    ie: {
      regime: "MiCA + MiFID double régime via CBI — analyse hybride selon caractéristique dominante",
      risk: "med",
      licenses: ["CASP CBI + MiFID investment firm si hybride", "Simplifié si utility domine"],
      obligations: ["Double KYC/AML selon CJA 2010", "Whitepaper + prospectus selon classification", "Règles MAR d'abus de marché", "Résilience opérationnelle DORA"],
      time: "12–18 mois",
      cost: "€250K–€800K",
      alts: ["Luxembourg CSSF", "Malte MFSA"],
      authority: "Central Bank of Ireland (CBI)"
    },
  },
};
