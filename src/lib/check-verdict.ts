/**
 * Rule-based verdict composer for /check Level 2.
 *
 * Takes funnel answers (multi-select arrays: products, markets, custody) and
 * produces a structured mini-report organised into 3 zones matching the
 * user journey:
 *   - Zone A (INPUTS): token + infra — what the startup is building (upstream)
 *   - Zone B (OUTPUTS): licence + obligation — what the startup must do (core)
 *   - Zone C (CONTEXT): regulator + regime + jurisdiction + doctrine
 *
 * Cards in A are conditional on what the user picked; cards in B are always
 * shown; cards in C are always shown (doctrine only when a US-token combo
 * makes Howey relevant). Not-applicable cards are shown with a muted 'Not
 * applicable' message rather than hidden, so the user sees the full picture.
 *
 * Purely deterministic — no AI call.
 */

import type { FunnelAnswers } from '@/data/check-funnel';

export interface VerdictItem {
  labelEn: string;
  labelFr: string;
  reasonEn: string;
  reasonFr: string;
  /** 'primary' = hard requirement · 'secondary' = conditional · 'tertiary' = exploratory. */
  emphasis: 'primary' | 'secondary' | 'tertiary';
}

export type VerdictDomain =
  | 'token'
  | 'infra'
  | 'licence'
  | 'obligation'
  | 'regulator'
  | 'regime'
  | 'jurisdiction'
  | 'doctrine';

export type VerdictZone = 'A' | 'B' | 'C';

export interface VerdictCard {
  domain: VerdictDomain;
  zone: VerdictZone;
  icon: string;
  titleEn: string;
  titleFr: string;
  items: VerdictItem[];
  noteEn?: string;
  noteFr?: string;
  /** When true, render as 'Not applicable' — keeps layout intent but signals
   *  the user's answers don't trigger this domain. */
  notApplicable?: boolean;
  notApplicableEn?: string;
  notApplicableFr?: string;
}

export interface Verdict {
  cards: VerdictCard[];
  summaryEn: string;
  summaryFr: string;
}

const arr = <T,>(x: T[] | undefined): T[] => x ?? [];
const has = <T extends string>(list: T[] | undefined, v: T) => arr(list).includes(v);

export function composeVerdict(a: FunnelAnswers): Verdict {
  const products = arr(a.products);
  const markets = arr(a.markets);
  const custody = arr(a.custody);

  const isEu = has(markets, 'eu');
  const isUs = has(markets, 'us');
  const isApac = has(markets, 'apac');
  const isGlobal = has(markets, 'global');
  const isMarketUnsure = has(markets, 'not-sure') || markets.length === 0;

  const cards: VerdictCard[] = [];

  // ═══════════════════════════════════════════════════════════════
  // ZONE A — INPUTS (what you're building)
  // ═══════════════════════════════════════════════════════════════

  // 🪙 TOKEN TYPE — applicable only if user picked 'token' as a product
  if (has(products, 'token')) {
    const tokenItems: VerdictItem[] = [];
    if (isEu || isGlobal) {
      tokenItems.push({
        labelEn: 'MiCA token classification',
        labelFr: 'Classification MiCA',
        reasonEn: 'EMT (fiat-backed) / ART (asset-referenced) / Utility / S-EMT / S-ART. The bucket drives which authorisation path you follow.',
        reasonFr: 'EMT (adossé fiat) / ART (asset-referenced) / Utility / S-EMT / S-ART. La catégorie détermine la voie d\'agrément.',
        emphasis: 'primary',
      });
    }
    if (isUs || isGlobal) {
      tokenItems.push({
        labelEn: 'US Howey Test classification',
        labelFr: 'Classification Test Howey (US)',
        reasonEn: 'Security / commodity / utility. Misclassifying = SEC enforcement risk (see SEC v. Ripple).',
        reasonFr: 'Security / commodity / utility. Mauvaise classification = risque enforcement SEC (cf. SEC v. Ripple).',
        emphasis: 'primary',
      });
    }
    tokenItems.push({
      labelEn: 'Supply mechanics',
      labelFr: 'Mécaniques de supply',
      reasonEn: 'Fixed vs inflationary, pre-mined vs mined, lock-ups — these feed into the classification analysis.',
      reasonFr: 'Fixe vs inflationniste, pré-miné vs miné, lock-ups — alimentent l\'analyse de classification.',
      emphasis: 'secondary',
    });
    cards.push({
      domain: 'token',
      zone: 'A',
      icon: '🪙',
      titleEn: 'Token classification',
      titleFr: 'Classification du token',
      items: tokenItems,
      noteEn: 'Token type is the FIRST question a regulator asks. Get this wrong and everything downstream is wrong.',
      noteFr: 'Le type de token est la PREMIÈRE question d\'un régulateur. Mauvaise réponse = tout le reste est faux.',
    });
  } else {
    cards.push({
      domain: 'token',
      zone: 'A',
      icon: '🪙',
      titleEn: 'Token classification',
      titleFr: 'Classification du token',
      items: [],
      notApplicable: true,
      notApplicableEn: 'Your setup doesn\'t involve issuing a token — classification doesn\'t apply here.',
      notApplicableFr: 'Votre setup n\'implique pas l\'émission de token — la classification ne s\'applique pas ici.',
    });
  }

  // 🔧 INFRASTRUCTURE / CUSTODY — applicable if product=custody or any custody answer
  const infraRelevant =
    has(products, 'custody') ||
    has(custody, 'custodial') ||
    has(custody, 'hybrid') ||
    has(custody, 'non-custodial');
  if (infraRelevant) {
    const infraItems: VerdictItem[] = [];
    if (has(custody, 'custodial')) {
      infraItems.push({
        labelEn: 'CUSTODIAL setup',
        labelFr: 'Setup CUSTODIAL',
        reasonEn: 'You hold keys — highest compliance tier (CASP custody, BitLicense, DABA…). Capital + insurance + segregation.',
        reasonFr: 'Vous détenez les clés — tier compliance le plus strict (CASP custody, BitLicense, DABA…). Capital + assurance + ségrégation.',
        emphasis: 'primary',
      });
    }
    if (has(custody, 'non-custodial')) {
      infraItems.push({
        labelEn: 'NON-CUSTODIAL setup',
        labelFr: 'Setup NON-CUSTODIAL',
        reasonEn: 'Users hold keys — generally lighter regime (FATF carve-out for pure software). Often no VASP/CASP needed.',
        reasonFr: 'Les utilisateurs détiennent les clés — régime allégé (carve-out GAFI pour logiciel pur). Souvent pas de VASP/CASP.',
        emphasis: 'primary',
      });
    }
    if (has(custody, 'hybrid')) {
      infraItems.push({
        labelEn: 'HYBRID setup (MPC / multisig / SignerList)',
        labelFr: 'Setup HYBRIDE (MPC / multisig / SignerList)',
        reasonEn: 'Grey zone — classification depends on quorum + key material. Requires explicit design analysis.',
        reasonFr: 'Zone grise — la classification dépend du quorum + du matériel de clés. Analyse de design explicite requise.',
        emphasis: 'primary',
      });
    }
    if (has(custody, 'not-sure')) {
      infraItems.push({
        labelEn: 'Custody TBD',
        labelFr: 'Custody à déterminer',
        reasonEn: 'Run the XRPL Custody diagnostic — 10 concrete patterns classified as custodial / non-custodial / grey.',
        reasonFr: 'Lancez le diagnostic XRPL Custody — 10 patterns concrets classés custodial / non-custodial / gris.',
        emphasis: 'secondary',
      });
    }
    // Also add infrastructure stack suggestions
    infraItems.push({
      labelEn: 'Common custody stacks',
      labelFr: 'Stacks custody courantes',
      reasonEn: 'BitGo, Fireblocks, Anchorage (institutional) · Metaco, Palisade (XRPL-native) · SignerList / MPC (on-chain).',
      reasonFr: 'BitGo, Fireblocks, Anchorage (institutionnels) · Metaco, Palisade (XRPL-natifs) · SignerList / MPC (on-chain).',
      emphasis: 'tertiary',
    });
    cards.push({
      domain: 'infra',
      zone: 'A',
      icon: '🔧',
      titleEn: 'Infrastructure & custody',
      titleFr: 'Infrastructure & custody',
      items: infraItems,
      noteEn: 'Custody model is one of the biggest determinants of which licence tier applies.',
      noteFr: 'Le modèle custody est un des plus gros déterminants du tier de licence applicable.',
    });
  } else {
    cards.push({
      domain: 'infra',
      zone: 'A',
      icon: '🔧',
      titleEn: 'Infrastructure & custody',
      titleFr: 'Infrastructure & custody',
      items: [],
      notApplicable: true,
      notApplicableEn: 'Your setup doesn\'t specifically involve custody — infrastructure analysis skipped.',
      notApplicableFr: 'Votre setup n\'implique pas la custody — analyse infrastructure ignorée.',
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // ZONE B — OUTPUTS (what you must do — the core)
  // ═══════════════════════════════════════════════════════════════

  // 🪪 LICENCES — always shown
  const licences: VerdictItem[] = [];
  const anyCryptoService = has(products, 'token') || has(products, 'platform') || has(products, 'custody');
  if (anyCryptoService && (isEu || isGlobal || isMarketUnsure)) {
    licences.push({
      labelEn: 'CASP (MiCA)',
      labelFr: 'CASP (MiCA)',
      reasonEn: 'Crypto-Asset Service Provider — the main EU licence for exchanges, custody, transfer services.',
      reasonFr: 'Crypto-Asset Service Provider — la licence UE principale pour exchanges, custody, transferts.',
      emphasis: isEu ? 'primary' : 'secondary',
    });
  }
  if (has(products, 'token') && (isEu || isGlobal)) {
    licences.push({
      labelEn: 'EMT / ART authorisation',
      labelFr: 'Agrément EMT / ART',
      reasonEn: 'E-Money Token or Asset-Referenced Token under MiCA — required if your token is fiat- or asset-backed.',
      reasonFr: 'E-Money Token ou Asset-Referenced Token sous MiCA — requis si votre token est adossé au fiat ou à un actif.',
      emphasis: 'secondary',
    });
  }
  if (isUs || isGlobal) {
    licences.push({
      labelEn: 'FinCEN MSB + State MTLs',
      labelFr: 'FinCEN MSB + MTL d\'États',
      reasonEn: 'Federal MSB registration + ~48 state Money Transmitter Licences — typically 18+ months.',
      reasonFr: 'Enregistrement MSB fédéral + ~48 Money Transmitter Licences d\'État — 18+ mois typiquement.',
      emphasis: isUs ? 'primary' : 'secondary',
    });
    if (has(products, 'platform') || has(products, 'custody')) {
      licences.push({
        labelEn: 'BitLicense (NY) if serving New York',
        labelFr: 'BitLicense (NY) si clients à New York',
        reasonEn: 'The strictest US state-level crypto licence — often 24+ months, $1M+ in costs.',
        reasonFr: 'La licence crypto US la plus stricte — souvent 24+ mois, $1M+ de coûts.',
        emphasis: 'tertiary',
      });
    }
  }
  if (isApac || isGlobal) {
    licences.push({
      labelEn: 'MAS MPI (Singapore)',
      labelFr: 'MAS MPI (Singapour)',
      reasonEn: 'Major Payment Institution licence — required for DPT services above SGD 3M / month.',
      reasonFr: 'Licence Major Payment Institution — requise pour services DPT au-delà de SGD 3M/mois.',
      emphasis: isApac ? 'primary' : 'tertiary',
    });
  }
  cards.push({
    domain: 'licence',
    zone: 'B',
    icon: '🪪',
    titleEn: 'Licences to target',
    titleFr: 'Licences à viser',
    items: licences,
    noteEn: licences.length === 0 ? undefined : 'Apply in order of market priority. Start with the fastest path to your primary market.',
    noteFr: licences.length === 0 ? undefined : 'Déposez dans l\'ordre de priorité marché. Commencez par la voie la plus rapide vers votre marché principal.',
  });

  // ✅ OBLIGATIONS — always shown
  const obligations: VerdictItem[] = [];
  obligations.push({
    labelEn: 'KYC / AML program',
    labelFr: 'Programme KYC / AML',
    reasonEn: 'Universal baseline across all regimes. Identity verification, transaction monitoring, sanctions screening.',
    reasonFr: 'Socle universel dans tous les régimes. Vérification d\'identité, monitoring transactions, filtrage sanctions.',
    emphasis: 'primary',
  });
  obligations.push({
    labelEn: 'FATF Travel Rule',
    labelFr: 'Règle du voyage FATF',
    reasonEn: 'Mandatory for transfers >€1K (EU) / >$3K (US) / >SGD 1.5K (SG). Originator + beneficiary info on-wire.',
    reasonFr: 'Obligatoire pour transferts >€1K (UE) / >$3K (US) / >SGD 1.5K (SG). Info expéditeur + bénéficiaire en ligne.',
    emphasis: 'primary',
  });
  if (anyCryptoService) {
    obligations.push({
      labelEn: 'Transaction / SAR reporting',
      labelFr: 'Reporting transactions / SAR',
      reasonEn: 'Suspicious Activity Reports to the FIU on any red flag. CTR >$10K (US), MROS (CH), Tracfin (FR).',
      reasonFr: 'Suspicious Activity Reports vers la CRF sur tout red flag. CTR >$10K (US), MROS (CH), Tracfin (FR).',
      emphasis: 'primary',
    });
  }
  if (has(products, 'custody') || has(custody, 'custodial')) {
    obligations.push({
      labelEn: 'Client asset segregation',
      labelFr: 'Ségrégation actifs clients',
      reasonEn: 'Customer crypto + fiat held in separate accounts from firm\'s own funds. Daily reconciliation.',
      reasonFr: 'Crypto + fiat clients détenus en comptes séparés des fonds propres. Réconciliation quotidienne.',
      emphasis: 'primary',
    });
  }
  if (has(products, 'token')) {
    obligations.push({
      labelEn: 'Whitepaper + disclosures',
      labelFr: 'Whitepaper + divulgations',
      reasonEn: 'Truthful marketing (MiCA Art. 6 / SEC anti-fraud). No return promises, risk warnings mandatory.',
      reasonFr: 'Marketing véridique (MiCA Art. 6 / SEC anti-fraude). Pas de promesse de rendement, avertissements risques obligatoires.',
      emphasis: 'secondary',
    });
  }
  cards.push({
    domain: 'obligation',
    zone: 'B',
    icon: '✅',
    titleEn: 'Obligations to prepare',
    titleFr: 'Obligations à préparer',
    items: obligations,
    noteEn: 'These are your daily compliance duties — need policies, processes, staff and systems in place from day 1.',
    noteFr: 'Ce sont vos devoirs de conformité quotidiens — nécessitent politiques, processus, équipe et systèmes dès le jour 1.',
  });

  // ═══════════════════════════════════════════════════════════════
  // ZONE C — CONTEXT (where / with whom / under what law)
  // ═══════════════════════════════════════════════════════════════

  // 🏛️ REGULATOR
  const regulators: VerdictItem[] = [];
  if (isEu || isGlobal || isMarketUnsure) {
    regulators.push({
      labelEn: 'National Competent Authorities + ESMA',
      labelFr: 'ANC nationales + ESMA',
      reasonEn: 'AMF (FR), BaFin (DE), CSSF (LU), CBI (IE), MFSA (MT)… ESMA as pan-EU coordinator.',
      reasonFr: 'AMF (FR), BaFin (DE), CSSF (LU), CBI (IE), MFSA (MT)… ESMA comme coordinateur pan-UE.',
      emphasis: isEu ? 'primary' : 'secondary',
    });
  }
  if (isUs || isGlobal) {
    regulators.push({
      labelEn: 'FinCEN + SEC + CFTC + state regulators',
      labelFr: 'FinCEN + SEC + CFTC + régulateurs d\'États',
      reasonEn: 'FinCEN for AML/MSB, SEC for securities, CFTC for commodities/derivatives, NYDFS for BitLicense.',
      reasonFr: 'FinCEN pour AML/MSB, SEC pour titres, CFTC pour matières premières/dérivés, NYDFS pour BitLicense.',
      emphasis: isUs ? 'primary' : 'secondary',
    });
  }
  if (isApac || isGlobal) {
    regulators.push({
      labelEn: 'MAS (SG) + SFC (HK) + FSA (JP) + FSC (KR)',
      labelFr: 'MAS (SG) + SFC (HK) + FSA (JP) + FSC (KR)',
      reasonEn: 'Each with its own framework — MAS PSA (Singapore), SFC VATP (Hong Kong), JVCEA (Japan).',
      reasonFr: 'Chacun avec son cadre — MAS PSA (Singapour), SFC VATP (Hong Kong), JVCEA (Japon).',
      emphasis: isApac ? 'primary' : 'tertiary',
    });
  }
  cards.push({
    domain: 'regulator',
    zone: 'C',
    icon: '🏛️',
    titleEn: 'Regulators to apply to',
    titleFr: 'Régulateurs à solliciter',
    items: regulators,
  });

  // 📜 REGIME
  const regimes: VerdictItem[] = [];
  if (isEu || isGlobal || isMarketUnsure) {
    regimes.push({
      labelEn: 'MiCA',
      labelFr: 'MiCA',
      reasonEn: 'EU Markets in Crypto-Assets regulation — extraterritorial, applies to services targeting EU users.',
      reasonFr: 'Règlement MiCA de l\'UE — extraterritorial, s\'applique à tout service ciblant des utilisateurs UE.',
      emphasis: isEu ? 'primary' : 'secondary',
    });
  }
  if (isUs || isGlobal || isMarketUnsure) {
    regimes.push({
      labelEn: 'US federal + state patchwork',
      labelFr: 'Patchwork fédéral + États US',
      reasonEn: 'BSA / FinCEN at federal level, MTLs state-by-state, BitLicense in NY.',
      reasonFr: 'BSA / FinCEN au fédéral, MTL état par état, BitLicense à NY.',
      emphasis: isUs ? 'primary' : 'secondary',
    });
  }
  if (isApac || isGlobal) {
    regimes.push({
      labelEn: 'MAS PSA (Singapore)',
      labelFr: 'MAS PSA (Singapour)',
      reasonEn: 'DPT + payment services framework. Common APAC entry point.',
      reasonFr: 'Cadre DPT + services de paiement. Point d\'entrée APAC courant.',
      emphasis: isApac ? 'primary' : 'tertiary',
    });
  }
  cards.push({
    domain: 'regime',
    zone: 'C',
    icon: '📜',
    titleEn: 'Regimes in force',
    titleFr: 'Régimes en vigueur',
    items: regimes,
  });

  // 🗺️ JURISDICTIONS
  const juris: VerdictItem[] = [];
  if (isEu || isGlobal) {
    juris.push(
      { labelEn: '🇱🇺 Luxembourg', labelFr: '🇱🇺 Luxembourg', reasonEn: 'Mature EU fintech hub — CSSF, MiCA CASP + EMI passporting.', reasonFr: 'Hub fintech UE mature — CSSF, CASP MiCA + EMI passporting.', emphasis: 'primary' },
      { labelEn: '🇮🇪 Ireland', labelFr: '🇮🇪 Irlande', reasonEn: 'English-speaking EU hub — Coinbase, Kraken, Ripple all hold CBI CASP.', reasonFr: 'Hub UE anglophone — Coinbase, Kraken, Ripple y détiennent tous un CASP CBI.', emphasis: 'secondary' },
      { labelEn: '🇱🇮 Liechtenstein', labelFr: '🇱🇮 Liechtenstein', reasonEn: 'TVTG — fastest EEA token-issuance regime (3-9 months).', reasonFr: 'TVTG — régime d\'émission token le plus rapide EEE (3-9 mois).', emphasis: 'tertiary' },
    );
  }
  if (isUs || isGlobal) {
    juris.push({
      labelEn: '🇺🇸 USA — state-by-state',
      labelFr: '🇺🇸 USA — état par état',
      reasonEn: 'Start with Wyoming / SD charters (crypto-friendly) + FinCEN MSB. NY is heavy but optional.',
      reasonFr: 'Commencer par Wyoming / SD (crypto-friendly) + FinCEN MSB. NY lourd mais optionnel.',
      emphasis: isUs ? 'primary' : 'tertiary',
    });
  }
  if (isApac || isGlobal || isMarketUnsure) {
    juris.push({
      labelEn: '🇸🇬 Singapore',
      labelFr: '🇸🇬 Singapour',
      reasonEn: 'MAS PSA — APAC crypto gateway, predictable, English-speaking, 9-15 months.',
      reasonFr: 'MAS PSA — passerelle crypto APAC, prévisible, anglophone, 9-15 mois.',
      emphasis: isApac ? 'primary' : 'tertiary',
    });
  }
  if (has(products, 'token') && (isGlobal || isMarketUnsure)) {
    juris.push({
      labelEn: '🇰🇾 Cayman',
      labelFr: '🇰🇾 Caïmans',
      reasonEn: 'Foundation Company — #1 offshore structure for token issuance + DAO treasuries.',
      reasonFr: 'Foundation Company — structure offshore #1 pour émission de token + trésoreries DAO.',
      emphasis: 'tertiary',
    });
  }
  cards.push({
    domain: 'jurisdiction',
    zone: 'C',
    icon: '🗺️',
    titleEn: 'Jurisdictions to consider',
    titleFr: 'Juridictions à considérer',
    items: juris,
    noteEn: 'Extraterritorial rules apply regardless of incorporation — pick the jurisdiction where your main market lives.',
    noteFr: 'Les règles extraterritoriales s\'appliquent quelle que soit l\'incorporation — choisissez la juridiction de votre marché principal.',
  });

  // 💡 DOCTRINE — conditional: only when token issuance hits US market
  if (has(products, 'token') && (isUs || isGlobal)) {
    cards.push({
      domain: 'doctrine',
      zone: 'C',
      icon: '💡',
      titleEn: 'Doctrine to apply',
      titleFr: 'Doctrine à appliquer',
      items: [
        {
          labelEn: 'Howey Test (4 prongs)',
          labelFr: 'Test Howey (4 critères)',
          reasonEn: 'Investment of money · common enterprise · profit expectation · from others\' efforts. Applied case-by-case by SEC + courts.',
          reasonFr: 'Investissement · entreprise commune · attente de profit · dépendant des efforts d\'autrui. Appliqué cas par cas par SEC + tribunaux.',
          emphasis: 'primary',
        },
        {
          labelEn: 'SEC v. Ripple (2023) — XRP not a security on secondary sales',
          labelFr: 'SEC v. Ripple (2023) — XRP n\'est pas un titre sur ventes secondaires',
          reasonEn: 'Programmatic exchange sales = not securities. Institutional sales = still securities. Critical precedent.',
          reasonFr: 'Ventes programmatiques exchange = pas des titres. Ventes institutionnelles = oui. Précédent critique.',
          emphasis: 'secondary',
        },
      ],
      noteEn: 'Legal tests and case law that interpret the statute. US grey zones live here.',
      noteFr: 'Tests juridiques et jurisprudence qui interprètent la loi. Les zones grises US se jouent ici.',
    });
  } else {
    cards.push({
      domain: 'doctrine',
      zone: 'C',
      icon: '💡',
      titleEn: 'Doctrine to apply',
      titleFr: 'Doctrine à appliquer',
      items: [],
      notApplicable: true,
      notApplicableEn: 'No US token-issuance angle in your setup — Howey/case-law analysis not central here.',
      notApplicableFr: 'Pas d\'angle émission token US dans votre setup — analyse Howey / jurisprudence non centrale ici.',
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // SUMMARY — aggregate one-liner
  // ═══════════════════════════════════════════════════════════════
  const parts: { en: string; fr: string }[] = [];
  if (products.length) parts.push(productsLabel(products));
  if (markets.length) parts.push(marketsLabel(markets));
  if (custody.length) parts.push(custodyLabelJoined(custody));

  const relevantCards = cards.filter((c) => !c.notApplicable).length;
  const summaryEn = parts.length
    ? `Profile: ${parts.map((p) => p.en).join(' · ')}. ${relevantCards} of ${cards.length} domain${cards.length > 1 ? 's' : ''} relevant below.`
    : `Answer the 3 questions above to get a tailored verdict.`;
  const summaryFr = parts.length
    ? `Profil : ${parts.map((p) => p.fr).join(' · ')}. ${relevantCards} des ${cards.length} domaine${cards.length > 1 ? 's' : ''} pertinent${cards.length > 1 ? 's' : ''} ci-dessous.`
    : `Répondez aux 3 questions ci-dessus pour obtenir un verdict sur-mesure.`;

  return { cards, summaryEn, summaryFr };
}

function productsLabel(arr: NonNullable<FunnelAnswers['products']>): { en: string; fr: string } {
  const map = {
    token: { en: 'Token issuer', fr: 'Émetteur de token' },
    platform: { en: 'Platform', fr: 'Plateforme' },
    custody: { en: 'Custody', fr: 'Custody' },
    jurisdiction: { en: 'Jurisdiction choice', fr: 'Choix de juridiction' },
    'not-sure': { en: 'Exploratory', fr: 'Exploration' },
  } as const;
  return {
    en: arr.map((v) => map[v].en).join(' + '),
    fr: arr.map((v) => map[v].fr).join(' + '),
  };
}
function marketsLabel(arr: NonNullable<FunnelAnswers['markets']>): { en: string; fr: string } {
  const map = {
    eu: { en: 'EU', fr: 'UE' },
    us: { en: 'US', fr: 'US' },
    apac: { en: 'APAC', fr: 'APAC' },
    global: { en: 'Global', fr: 'Global' },
    'not-sure': { en: 'market TBD', fr: 'marché à définir' },
  } as const;
  return {
    en: arr.map((v) => map[v].en).join(' + '),
    fr: arr.map((v) => map[v].fr).join(' + '),
  };
}
function custodyLabelJoined(arr: NonNullable<FunnelAnswers['custody']>): { en: string; fr: string } {
  const map = {
    custodial: { en: 'Custodial', fr: 'Custodial' },
    'non-custodial': { en: 'Non-custodial', fr: 'Non-custodial' },
    hybrid: { en: 'Hybrid', fr: 'Hybride' },
    'not-sure': { en: 'custody TBD', fr: 'custody à définir' },
  } as const;
  return {
    en: arr.map((v) => map[v].en).join(' + '),
    fr: arr.map((v) => map[v].fr).join(' + '),
  };
}
