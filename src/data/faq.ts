/**
 * Pre-canned FAQ answers for /search.
 * Each entry has keyword matchers — if ALL keywords in a set are found
 * (in any order, case-insensitive), the FAQ entry is served instantly
 * instead of making an API call.
 *
 * This saves Anthropic API credits on recurring questions and delivers
 * instant answers (0ms vs multi-second streaming).
 */

export interface FaqEntry {
  id: string;
  /** Each inner array is a set of keywords that ALL must be present in the query for a match. */
  matchers: string[][];
  question: { en: string; fr: string };
  answer: { en: string; fr: string };
}

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: 'what-is-mica',
    matchers: [
      ['what', 'mica'],
      ["c'est quoi", 'mica'],
      ['mica', 'defini'],
      ['mica', 'definition'],
      ['qu', 'est', 'mica'],
    ],
    question: {
      en: 'What is MiCA?',
      fr: "Qu'est-ce que MiCA ?",
    },
    answer: {
      en: `**MiCA** (Markets in Crypto-Assets Regulation) is the EU's comprehensive rulebook for crypto.

**Key facts:**
- Entered into force June 2023; main provisions from Dec 2024
- Applies to any crypto-asset issuer or service provider serving EU users — even if you're based outside the EU (extraterritorial)
- Defines 3 token categories: **EMT** (single-currency peg), **ART** (basket/asset-referenced), and **Other crypto-asset** (e.g. utility tokens)
- Introduces the **CASP** licence for service providers (custody, exchange, transfer, advice, etc.)
- A CASP authorization passports across all 27 EU member states

**Capital requirements** range from €50K (advice, transfer) to €350K (custody). Timeline 12–18 months.

See the "MiCA Essentials" learning path for a full deep dive.`,
      fr: `**MiCA** (Markets in Crypto-Assets Regulation) est le cadre européen complet pour la crypto.

**Points clés :**
- Entrée en vigueur en juin 2023 ; dispositions principales depuis décembre 2024
- S'applique à tout émetteur ou prestataire crypto servant des users UE — même depuis l'étranger (extraterritorial)
- Définit 3 catégories de tokens : **EMT** (référencé à une monnaie unique), **ART** (panier/actifs), et **Other crypto-asset** (ex. utility tokens)
- Introduit la licence **CASP** pour les prestataires (custody, exchange, transfert, conseil, etc.)
- Un agrément CASP passporte sur les 27 États membres de l'UE

**Exigences de capital** : de 50K€ (conseil, transfert) à 350K€ (custody). Délai 12–18 mois.

Voir le parcours d'apprentissage "Essentiel MiCA" pour une plongée approfondie.`,
    },
  },
  {
    id: 'emt-vs-art',
    matchers: [
      ['emt', 'art'],
      ['difference', 'emt'],
      ['difference', 'art'],
    ],
    question: {
      en: 'What is the difference between EMT and ART under MiCA?',
      fr: 'Quelle est la différence entre EMT et ART sous MiCA ?',
    },
    answer: {
      en: `**EMT (E-Money Token)** references a **single official currency** (USD, EUR, GBP…).
Examples: RLUSD, USDC, EURt. Issuer must be an **EMI** or credit institution. Reserves 1:1 in cash/liquid low-risk assets, fully segregated.

**ART (Asset-Referenced Token)** references **multiple currencies, commodities, or assets** — or a basket. Examples: multi-fiat stablecoins, commodity-backed tokens, large fungible NFT series.
Issuer needs **NCA authorization** (AMF, BaFin, etc.) and the whitepaper must be **approved**, not just notified.

**Key distinction:** EMT ≈ electronic money (like a digital euro). ART ≈ investment-like stability tool.

If a token combines features, MiCA does not recognize a hybrid category — regulators apply the strictest classification.`,
      fr: `**EMT (E-Money Token)** : référence à une **monnaie officielle unique** (USD, EUR, GBP…).
Exemples : RLUSD, USDC, EURt. L'émetteur doit être un **EME** ou un établissement de crédit. Réserves 1:1 en cash/actifs liquides peu risqués, entièrement ségrégées.

**ART (Asset-Referenced Token)** : référence à **plusieurs devises, matières premières ou actifs** — ou un panier. Exemples : stablecoins multi-fiat, tokens adossés à l'or, grandes séries de NFTs fongibles.
L'émetteur doit obtenir une **autorisation NCA** (AMF, BaFin, etc.) et le livre blanc doit être **approuvé**, pas juste notifié.

**Distinction clé :** EMT ≈ monnaie électronique (comme un euro numérique). ART ≈ outil de stabilité type investissement.

Si un token combine plusieurs caractéristiques, MiCA ne reconnaît pas de catégorie "hybride" — les régulateurs appliquent la classification la plus stricte.`,
    },
  },
  {
    id: 'howey-test',
    matchers: [
      ['howey'],
      ['test', 'security', 'us'],
    ],
    question: {
      en: 'What is the Howey Test?',
      fr: "Qu'est-ce que le Test de Howey ?",
    },
    answer: {
      en: `The **Howey Test** is the US Supreme Court test (1946, *SEC v. W.J. Howey Co.*) used to determine if something qualifies as a **security**.

**4 cumulative criteria** — ALL must be met:
1. **Investment of money** (or other consideration)
2. **In a common enterprise** (investors' fates linked)
3. **With expectation of profit**
4. **From the efforts of others** (primarily a team/promoter, not the investor themselves)

If any one prong fails → **not a security**.

**Post-Ripple (July 2023):** Judge Torres ruled that XRP sold on exchanges to retail buyers (programmatic sales) are NOT securities, but Ripple's direct sales to institutional buyers ARE. This introduced context-dependency: the same token can be a security in one transaction, not in another.

See the "Is my token a security?" diagnostic for a guided walkthrough.`,
      fr: `Le **Test de Howey** est le test établi par la Cour Suprême US (1946, *SEC v. W.J. Howey Co.*) pour déterminer si quelque chose qualifie de **titre financier** (security).

**4 critères cumulatifs** — TOUS doivent être remplis :
1. **Investissement d'argent** (ou autre contrepartie)
2. **Dans une entreprise commune** (sort des investisseurs lié)
3. **Avec espérance de profit**
4. **Résultant des efforts d'un tiers** (principalement une équipe/promoteur, pas l'investisseur lui-même)

Si un seul critère manque → **pas un titre financier**.

**Après l'arrêt Ripple (juillet 2023) :** la juge Torres a établi que les ventes de XRP sur les exchanges à des acheteurs retail (ventes programmatiques) ne sont PAS des titres, mais que les ventes directes de Ripple à des institutions LE SONT. Cela introduit la notion de contexte : un même token peut être un titre dans une transaction et pas dans une autre.

Voir l'diagnostic "Mon token est-il un titre financier ?" pour un cheminement guidé.`,
    },
  },
  {
    id: 'need-casp',
    matchers: [
      ['need', 'casp'],
      ['besoin', 'casp'],
      ['casp', 'mandatory'],
      ['casp', 'obligatoire'],
    ],
    question: {
      en: 'Do I need a CASP licence?',
      fr: 'Ai-je besoin d\'un agrément CASP ?',
    },
    answer: {
      en: `You need a **CASP licence** if you serve or target EU users AND you provide one of these 10 crypto-asset services under MiCA:

- Custody & administration (Art. 75, €350K capital)
- Operating a trading platform (Art. 76, €150K)
- Exchange crypto/fiat or crypto/crypto (Art. 76-78, €125K)
- Placement of crypto-assets (Art. 79, €50K)
- Reception/transmission of orders (Art. 80, €50K)
- Execution of orders (Art. 81, €125K)
- Transfer services (Art. 82, €50K)
- Portfolio management (Art. 83, €50K)
- Advice on crypto-assets (Art. 83, €50K)
- Crypto-asset on behalf of clients (Art. 84, €50K)

**Exemption:** if your protocol is fully decentralized with no identifiable operator (MiCA Recital 22), you may escape CASP — but the bar is high. Front-end DApps with admin keys or fee collectors are typically captured.

A CASP licence passports across all 27 EU states. Timeline 12–18 months.

Run the "Do I need a CASP licence?" diagnostic for a verdict on your setup.`,
      fr: `Vous avez besoin d'un **agrément CASP** si vous servez ou ciblez des users UE ET vous fournissez l'un des 10 services sur crypto-actifs sous MiCA :

- Conservation & administration (Art. 75, capital 350K€)
- Exploitation d'une plateforme de trading (Art. 76, 150K€)
- Échange crypto/fiat ou crypto/crypto (Art. 76-78, 125K€)
- Placement de crypto-actifs (Art. 79, 50K€)
- Réception/transmission d'ordres (Art. 80, 50K€)
- Exécution d'ordres (Art. 81, 125K€)
- Services de transfert (Art. 82, 50K€)
- Gestion de portefeuille (Art. 83, 50K€)
- Conseil sur crypto-actifs (Art. 83, 50K€)
- Crypto-actif pour le compte de clients (Art. 84, 50K€)

**Exemption :** si votre protocole est totalement décentralisé et sans opérateur identifiable (considérant 22 de MiCA), vous pouvez échapper à CASP — mais le seuil est élevé. Les front-ends DApp avec des admin keys ou un collecteur de frais sont généralement capturés.

Un agrément CASP passporte sur les 27 États membres. Délai 12–18 mois.

Lancez l'diagnostic "Ai-je besoin d'un agrément CASP ?" pour un verdict précis.`,
    },
  },
  {
    id: 'fastest-licence',
    matchers: [
      ['fastest', 'licence'],
      ['fastest', 'license'],
      ['plus rapide', 'licence'],
      ['rapide', 'agrement'],
      ['rapidement', 'licence'],
    ],
    question: {
      en: "What's the fastest crypto licence?",
      fr: "Quelle est la licence crypto la plus rapide à obtenir ?",
    },
    answer: {
      en: `The **fastest paths** to a crypto licence globally:

1. **Liechtenstein TVTG** — 3 to 9 months. CHF 15–80K capital. 14 service-provider types. Bonus: **EEA passport** into all 27 EU states.
2. **Switzerland FINMA / VQF-SRO** — 6 to 12 months for SRO membership (AML framework).
3. **Dubai VARA** — 6 to 12 months. Modern rulebook, single regulator, zero income tax.
4. **Singapore MAS PSA** — 6 to 12 months for SPI or MPI.

Compare that to **EU MiCA** (12-18 months, €50-350K capital) or **US state-by-state MTLs** (18-36 months, $500K-$2M+).

If speed is your top priority, **Liechtenstein + EEA passport** is usually the best combo: get live quickly, then access the full EU market.`,
      fr: `Les **voies les plus rapides** pour une licence crypto au niveau mondial :

1. **Liechtenstein TVTG** — 3 à 9 mois. Capital CHF 15–80K. 14 types de prestataires. Bonus : **passeport EEE** sur les 27 États UE.
2. **Suisse FINMA / VQF-SRO** — 6 à 12 mois pour l'adhésion SRO (cadre AML).
3. **Dubaï VARA** — 6 à 12 mois. Règlement moderne, régulateur unique, zéro impôt sur le revenu.
4. **Singapour MAS PSA** — 6 à 12 mois pour SPI ou MPI.

À comparer avec **UE MiCA** (12-18 mois, capital 50-350K€) ou les **MTL État par État US** (18-36 mois, $500K-$2M+).

Si la vitesse est votre priorité, **Liechtenstein + passeport EEE** est souvent le meilleur combo : lancez-vous rapidement puis accédez à tout le marché européen.`,
    },
  },
  {
    id: 'genius-act',
    matchers: [
      ['genius'],
      ['genius', 'act'],
    ],
    question: {
      en: 'What is the GENIUS Act?',
      fr: "Qu'est-ce que le GENIUS Act ?",
    },
    answer: {
      en: `The **GENIUS Act** (Guiding and Establishing National Innovation for U.S. Stablecoins) was signed into law in **July 2025**. It creates the first federal framework for USD-denominated payment stablecoins.

**Key provisions:**
- Federal **OCC Payment Stablecoin Issuer charter** (dual path with state-qualified issuers)
- **1:1 reserves** in cash + short-term US Treasuries (<93 days) + repos
- Monthly CFO-signed disclosures + annual independent attestations
- **T+1 redemption at par**
- Bank-grade AML/KYC + OFAC screening
- **No interest/yield** payments to holders
- **Bankruptcy-remote segregation** of reserves
- Foreign issuers may passport if regime is comparable (reciprocity)

**Practical impact:** if you issue a USD stablecoin to US users, you now have a clear federal path (vs the pre-2025 patchwork of state MTLs + NY BitLicense).

Paired with the **CLARITY Act** (SEC/CFTC jurisdiction split), this is the biggest US crypto regulatory overhaul since the 2010s.`,
      fr: `Le **GENIUS Act** (Guiding and Establishing National Innovation for U.S. Stablecoins) a été signé en **juillet 2025**. Il crée le premier cadre fédéral pour les stablecoins de paiement en USD.

**Dispositions clés :**
- **Charter fédéral OCC 'Payment Stablecoin Issuer'** (voie duale avec des émetteurs agréés par les États)
- **Réserves 1:1** en cash + bons du Trésor US court terme (<93 jours) + repos
- Divulgations mensuelles signées par le CFO + attestation annuelle indépendante
- **Rachat à parité sous T+1**
- Programme AML/KYC de niveau bancaire + filtrage OFAC
- **Interdiction** de payer des intérêts/rendements aux détenteurs
- **Ségrégation bankruptcy-remote** des réserves
- Les émetteurs étrangers peuvent passporter si régime comparable (réciprocité)

**Impact pratique :** si vous émettez un stablecoin USD pour des users américains, vous avez désormais une voie fédérale claire (vs le patchwork pré-2025 de MTL État + NY BitLicense).

Combiné avec le **CLARITY Act** (répartition SEC/CFTC), c'est la plus grande refonte réglementaire crypto aux US depuis les années 2010.`,
    },
  },
  {
    id: 'xrp-security',
    matchers: [
      ['xrp', 'security'],
      ['xrp', 'securite'],
      ['xrp', 'titre'],
      ['xrp', 'legal'],
    ],
    question: {
      en: 'Is XRP a security?',
      fr: 'Le XRP est-il un titre financier ?',
    },
    answer: {
      en: `**Short answer:** it depends on the transaction.

Judge Torres ruled in **July 2023 (SEC v. Ripple)**:
- ✅ **Programmatic sales** on exchanges to retail buyers → **NOT securities** (prongs 2 & 4 of Howey failed: buyers had no direct relationship with Ripple and no reasonable expectation that Ripple's efforts specifically would drive their returns).
- ❌ **Institutional sales** by Ripple under written contracts to hedge funds → **ARE securities** (all 4 Howey prongs satisfied).
- **Other distributions** (employee compensation, developer grants) → not sales of money → not securities.

**Impact:** US exchanges (Coinbase, Kraken, Gemini) relisted XRP within weeks. Under the **CLARITY Act 2025**, XRP now qualifies as a "digital commodity" — under **CFTC jurisdiction** rather than SEC for secondary-market trading.

**Other jurisdictions:**
- 🇪🇺 EU (MiCA): crypto-asset, neither EMT nor ART → trading requires CASP
- 🇸🇬 Singapore (MAS): Digital Payment Token (DPT)
- 🇬🇧 UK (FCA): unregulated cryptoasset`,
      fr: `**Réponse courte :** cela dépend du type de transaction.

La juge Torres a établi en **juillet 2023 (SEC v. Ripple)** :
- ✅ **Ventes programmatiques** sur les exchanges à des acheteurs retail → **PAS des titres financiers** (les critères 2 et 4 de Howey échouent : pas de relation directe avec Ripple, pas d'espérance raisonnable que les efforts spécifiques de Ripple piloteraient les rendements).
- ❌ **Ventes institutionnelles** de Ripple par contrats écrits à des hedge funds → **SONT des titres** (tous les 4 critères Howey remplis).
- **Autres distributions** (compensation employés, grants développeurs) → pas des ventes contre argent → pas des titres.

**Impact :** les exchanges US (Coinbase, Kraken, Gemini) ont relisté le XRP en quelques semaines. Sous le **CLARITY Act 2025**, le XRP qualifie désormais de "digital commodity" — sous **compétence CFTC** plutôt que SEC pour le trading secondaire.

**Autres juridictions :**
- 🇪🇺 UE (MiCA) : crypto-actif, ni EMT ni ART → le trading requiert un agrément CASP
- 🇸🇬 Singapour (MAS) : Digital Payment Token (DPT)
- 🇬🇧 UK (FCA) : cryptoactif non régulé`,
    },
  },
  {
    id: 'tvtg',
    matchers: [
      ['tvtg'],
      ['liechtenstein', 'token'],
    ],
    question: {
      en: 'What is the Liechtenstein TVTG?',
      fr: "Qu'est-ce que le TVTG du Liechtenstein ?",
    },
    answer: {
      en: `The **TVTG** (Token- und VT-Dienstleistergesetz) is Liechtenstein's **Token and Trusted Technology Service Providers Act**, adopted in 2020. It is one of the most comprehensive token frameworks in the world.

**What makes it special:**
- Defines **14 types of service providers** (Token Issuer, Custodian, Exchanger, Identity Service Provider, Physical Validator, etc.)
- Uses the **"Token Container Model"** — a token is a "container" that can represent any right or asset
- **Timeline: 3 to 9 months** to obtain an SP licence
- **Capital: CHF 15K to 80K** depending on the SP type
- **EEA passporting** — a Liechtenstein-licensed provider can market into all 27 EU member states

**Typical use:** fast track for crypto startups that want to launch in Europe. Get authorized in Liechtenstein quickly, then passport into the broader EU market while gradually pursuing a full MiCA CASP if desired.

Regulator: **FMA** (Finanzmarktaufsicht Liechtenstein).`,
      fr: `Le **TVTG** (Token- und VT-Dienstleistergesetz) est la **loi du Liechtenstein sur les prestataires de services de jetons et technologies de confiance**, adoptée en 2020. C'est l'un des cadres token les plus complets au monde.

**Ce qui le rend spécial :**
- Définit **14 types de prestataires** (émetteur de token, conservateur, échangeur, prestataire d'identité, validateur physique, etc.)
- Utilise le **"Token Container Model"** — un token est un "conteneur" pouvant représenter n'importe quel droit ou actif
- **Délai : 3 à 9 mois** pour obtenir une licence SP
- **Capital : CHF 15K à 80K** selon le type de SP
- **Passeport EEE** — un prestataire agréé au Liechtenstein peut commercialiser dans les 27 États membres de l'UE

**Usage typique :** voie rapide pour les startups crypto qui veulent se lancer en Europe. Obtenez l'agrément rapidement au Liechtenstein, puis passportez sur le marché UE tout en poursuivant progressivement un agrément CASP MiCA complet si souhaité.

Régulateur : **FMA** (Finanzmarktaufsicht Liechtenstein).`,
    },
  },
  {
    id: 'cefi-vs-defi',
    matchers: [
      ['cefi', 'defi'],
      ['difference', 'defi'],
      ['tradfi', 'defi'],
    ],
    question: {
      en: "What's the difference between TradFi, CeFi and DeFi?",
      fr: 'Quelle est la différence entre TradFi, CeFi et DeFi ?',
    },
    answer: {
      en: `| | **TradFi** | **CeFi** | **DeFi** |
|---|---|---|---|
| **Infrastructure** | Centralized | Centralized | Decentralized (blockchain) |
| **Access** | Restricted | Moderate | Open / permissionless |
| **Regulation** | Heavily regulated | Partially | Grey zone |
| **Intermediaries** | Banks, brokers | Exchanges, custodians | Smart contracts |
| **Risks** | Low (FDIC, etc.) | Counterparty risk | Smart contract bugs |
| **KYC** | Mandatory | Mostly yes | Usually no |
| **Examples** | JPMorgan, Schwab | Binance, Coinbase, Kraken | Uniswap, Aave, Curve |

**Regulatory implications:**
- **TradFi**: fully covered by existing banking/securities/insurance regulation.
- **CeFi**: requires licences everywhere (CASP/VASP/MSB/MTL). Liable for AML/KYC on its users.
- **DeFi**: MiCA Recital 22 exempts **fully** decentralized protocols (no operator), but most "DeFi" deployments have admin keys or fee collectors → captured as CASP. Truly permissionless protocols are rare.`,
      fr: `| | **TradFi** | **CeFi** | **DeFi** |
|---|---|---|---|
| **Infrastructure** | Centralisée | Centralisée | Décentralisée (blockchain) |
| **Accès** | Restreint | Modéré | Ouvert / sans permission |
| **Régulation** | Très régulée | Partielle | Zone grise |
| **Intermédiaires** | Banques, brokers | Exchanges, custodians | Smart contracts |
| **Risques** | Faibles (FDIC, etc.) | Risque de contrepartie | Bugs smart contract |
| **KYC** | Obligatoire | Majoritairement oui | Généralement non |
| **Exemples** | JPMorgan, Schwab | Binance, Coinbase, Kraken | Uniswap, Aave, Curve |

**Implications réglementaires :**
- **TradFi** : entièrement couverte par la régulation bancaire/des titres/assurance existante.
- **CeFi** : requiert des licences partout (CASP/VASP/MSB/MTL). Responsable du KYC/AML sur ses users.
- **DeFi** : le considérant 22 de MiCA exempte les protocoles **totalement** décentralisés (sans opérateur), mais la plupart des "DeFi" ont des admin keys ou un collecteur de frais → capturés comme CASP. Les protocoles vraiment sans permission sont rares.`,
    },
  },
  {
    id: 'travel-rule',
    matchers: [
      ['travel', 'rule'],
      ['regle', 'voyage'],
      ['travel rule'],
    ],
    question: {
      en: "What is the FATF Travel Rule?",
      fr: 'Quelle est la Travel Rule du GAFI ?',
    },
    answer: {
      en: `The **Travel Rule** is FATF **Recommendation 16**, requiring Virtual Asset Service Providers (**VASPs/CASPs**) to exchange **originator and beneficiary information** on crypto transfers.

**Required data:**
- Originator: name, account number, physical address (or national ID / date & place of birth)
- Beneficiary: name, account number

**Thresholds:**
- 🇪🇺 EU (MiCA): **>€1K** (effectively all transfers for unhosted wallets)
- 🇺🇸 US (FinCEN): **>$3K**
- 🌍 FATF baseline: **>$1K / €1K**

**Why it exists:** the Travel Rule extends to crypto the information-exchange rules already in place for traditional bank wires (SWIFT) to combat money laundering and terrorist financing.

**Practical impact:** CASPs must integrate a Travel Rule compliance solution (Sumsub, Notabene, TRUST network, Shyft, etc.) to exchange this data with counterparty VASPs on every cross-border transfer above threshold.`,
      fr: `La **Travel Rule** est la **Recommandation 16 du GAFI**, obligeant les prestataires sur actifs virtuels (**VASP/CASP**) à échanger les **informations émetteur et bénéficiaire** sur les transferts crypto.

**Données requises :**
- Émetteur : nom, numéro de compte, adresse (ou numéro national / date & lieu de naissance)
- Bénéficiaire : nom, numéro de compte

**Seuils :**
- 🇪🇺 UE (MiCA) : **>1K€** (dans la pratique, tous les transferts vers des unhosted wallets)
- 🇺🇸 US (FinCEN) : **>3K$**
- 🌍 Base GAFI : **>1K$ / 1K€**

**Pourquoi elle existe :** la Travel Rule étend à la crypto les règles d'échange d'informations déjà en place pour les virements bancaires (SWIFT) afin de lutter contre le blanchiment et le financement du terrorisme.

**Impact pratique :** les CASP doivent intégrer une solution de conformité Travel Rule (Sumsub, Notabene, réseau TRUST, Shyft, etc.) pour échanger ces données avec les VASP contreparties sur chaque transfert transfrontalier au-dessus du seuil.`,
    },
  },
  {
    id: 'custodial-xrpl',
    matchers: [
      ['custody', 'xrpl'],
      ['custodial', 'xrpl'],
      ['custodial', 'non-custodial'],
      ['signerlist'],
      ['multisig', 'xrpl'],
    ],
    question: {
      en: 'What is the difference between custodial and non-custodial on XRPL?',
      fr: "Quelle est la différence entre custodial et non-custodial sur XRPL ?",
    },
    answer: {
      en: `On XRPL, custody depends on **who controls the signing keys**.

**Custodial — 🔴 requires CASP Art. 75 MiCA (EU) or MSB + State MTL (US):**
- **Single Key** — service holds the master key
- **IOU / Trust Lines (gateway)** — service holds off-chain assets (e.g. RLUSD)

**Non-custodial — 🟢 no licence for the custody itself:**
- **Escrow** — time-locked or condition-based, ledger-enforced
- **Payment Channels** — off-ledger with on-chain settlement
- **Checks** — deferred payment, sender can always cancel
- **NFT Broker mode (XLS-20)** — atomic swap, broker never holds the NFT
- **SignerList minority** — multisig where service holds fewer keys than quorum requires

**Grey zone — 🟡 legal opinion required:**
- **Regular Key** — secondary key; depends on whether user retains master
- **SignerList majority** — service can reach quorum alone
- **MPC / TSS** — threshold signatures, ESMA has no definitive position
- **MPT (XLS-33)** — programmable tokens, issuer can lock or authorize

**Design rule:** if **no single party can sign alone**, you have a strong non-custodial argument. The more keys you give the user, the clearer the non-custodial posture.

See the "Is my XRPL custody custodial?" diagnostic for a verdict on your specific architecture.`,
      fr: `Sur XRPL, la custody dépend de **qui contrôle les clés de signature**.

**Custodial — 🔴 nécessite CASP Art. 75 MiCA (UE) ou MSB + MTL d'État (US) :**
- **Single Key** — le service détient la master key
- **IOU / Trust Lines (gateway)** — le service détient les actifs off-chain (ex. RLUSD)

**Non-custodial — 🟢 pas de licence pour la custody elle-même :**
- **Escrow** — verrouillé dans le temps ou par condition, appliqué par le registre
- **Payment Channels** — off-ledger avec règlement on-chain
- **Checks** — paiement différé, l'émetteur peut toujours annuler
- **Broker mode NFT (XLS-20)** — swap atomique, le broker ne détient jamais le NFT
- **SignerList minoritaire** — multisig où le service détient moins de clés que le quorum requis

**Zone grise — 🟡 avis juridique requis :**
- **Regular Key** — clé secondaire ; dépend de si l'utilisateur conserve la master
- **SignerList majoritaire** — le service peut atteindre le quorum seul
- **MPC / TSS** — signatures à seuil, l'ESMA n'a pas de position définitive
- **MPT (XLS-33)** — tokens programmables, l'émetteur peut verrouiller ou autoriser

**Règle de design :** si **aucune partie ne peut signer seule**, vous avez un argument non-custodial fort. Plus vous donnez de clés à l'utilisateur, plus la posture non-custodial est claire.

Voir l'diagnostic "Ma custody XRPL est-elle custodial ?" pour un verdict sur votre architecture.`,
    },
  },
  {
    id: 'rlusd',
    matchers: [
      ['rlusd'],
      ['ripple', 'stablecoin'],
    ],
    question: {
      en: 'What is RLUSD?',
      fr: "Qu'est-ce que RLUSD ?",
    },
    answer: {
      en: `**RLUSD** is Ripple's USD-backed stablecoin, launched in **December 2024** on both XRPL and Ethereum. It is the reference implementation of a **regulated stablecoin on XRPL**.

**Structure:**
- Issued by **Standard Custody & Trust Company** (a NYDFS-chartered limited-purpose trust)
- Backed **1:1** by cash + short-term US Treasuries
- Qualifies as an **EMT under MiCA** (issuance to EU users would require an EU EMI)
- On XRPL: uses the native **IOU / Trust Line** model — users hold RLUSD as on-chain claims against the trust
- On Ethereum: standard ERC-20 with admin controls (pause, blacklist, mint/burn)
- Two independent mints (no bridge)

**On-chain compliance features (XRPL):**
- **RequireAuth** — holders must be explicitly authorized by the issuer (on-chain KYC gating)
- **freeze** — can freeze individual trust lines for AML holds
- **globalFreeze** — emergency brake for all trust lines

**Why it matters:** RLUSD proves that "custodial" can be done cleanly with on-chain compliance primitives that ERC-20 stablecoins must retrofit via admin functions. Likely model for future regulated stablecoins on XRPL.`,
      fr: `**RLUSD** est le stablecoin USD de Ripple, lancé en **décembre 2024** sur XRPL et Ethereum. C'est l'implémentation de référence d'un **stablecoin régulé sur XRPL**.

**Structure :**
- Émis par **Standard Custody & Trust Company** (trust NYDFS à usage limité)
- Adossé **1:1** à du cash + bons du Trésor US court terme
- Qualifie comme **EMT sous MiCA** (émission à des users UE nécessiterait un EME européen)
- Sur XRPL : utilise le modèle natif **IOU / Trust Line** — les users détiennent RLUSD comme créances on-chain envers le trust
- Sur Ethereum : ERC-20 standard avec contrôles admin (pause, blacklist, mint/burn)
- Deux émissions indépendantes (pas de bridge)

**Fonctionnalités de conformité on-chain (XRPL) :**
- **RequireAuth** — les détenteurs doivent être explicitement autorisés par l'émetteur (gating KYC on-chain)
- **freeze** — peut geler des trust lines individuelles pour des blocages AML
- **globalFreeze** — frein d'urgence pour toutes les trust lines

**Pourquoi c'est important :** RLUSD prouve que "custodial" peut se faire proprement avec des primitives de conformité on-chain, là où les stablecoins ERC-20 doivent les recréer via des fonctions admin. Modèle probable pour les futurs stablecoins régulés sur XRPL.`,
    },
  },
];

/**
 * Try to match a query against all FAQ entries.
 * Returns the matching entry, or null if none matches.
 */
export function matchFaq(query: string): FaqEntry | null {
  const q = query.toLowerCase();
  for (const entry of FAQ_ENTRIES) {
    for (const keywordSet of entry.matchers) {
      if (keywordSet.every((kw) => q.includes(kw.toLowerCase()))) {
        return entry;
      }
    }
  }
  return null;
}
