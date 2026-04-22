/**
 * /check — Level 2 guided funnel.
 *
 * Three strategic questions (Q1-Q3) funnel the user into the relevant
 * existing decision tree(s). A rule-based recommender maps selected
 * (products, markets, custody) tuples to an ordered list of trees + reasons.
 *
 * MULTI-SELECT: each question accepts multiple choices (a startup often
 * does several things and targets several markets). 'not-sure' is
 * mutually exclusive with any other pick.
 *
 * Existing trees live in `src/data/decision-trees.ts`:
 *   - howey       → token securities classification (US SEC)
 *   - casp        → EU MiCA licensing requirement
 *   - xrpl-custody → XRPL custody custodial/non-custodial classification
 *   - jurisdiction → best juri for a founder
 */

export type Product = 'token' | 'platform' | 'custody' | 'jurisdiction' | 'not-sure';
export type Market = 'eu' | 'us' | 'apac' | 'global' | 'not-sure';
export type CustodyModel = 'custodial' | 'non-custodial' | 'hybrid' | 'not-sure';

export interface FunnelAnswers {
  products?: Product[];
  markets?: Market[];
  custody?: CustodyModel[];
}

export type TreeId = 'howey' | 'casp' | 'xrpl-custody' | 'jurisdiction';

export interface TreeRecommendation {
  treeId: TreeId;
  /** Short human-readable reason why this tree is relevant for these answers. */
  reasonEn: string;
  reasonFr: string;
  /** Lower = higher priority. */
  priority: number;
}

export interface FunnelChoice {
  value: string;
  labelEn: string;
  labelFr: string;
  /** Optional short hint shown under the label. */
  hintEn?: string;
  hintFr?: string;
  icon?: string;
}

export interface FunnelQuestion {
  id: 'products' | 'markets' | 'custody';
  titleEn: string;
  titleFr: string;
  subtitleEn: string;
  subtitleFr: string;
  helpEn: string;
  helpFr: string;
  choices: FunnelChoice[];
}

export const FUNNEL_QUESTIONS: FunnelQuestion[] = [
  {
    id: 'products',
    titleEn: 'What does your startup do? (you can pick multiple)',
    titleFr: 'Que fait votre startup ? (plusieurs choix possibles)',
    subtitleEn: 'Pick every product that applies — crypto startups often do several at once.',
    subtitleFr: 'Cochez chaque produit qui s\'applique — les startups crypto en font souvent plusieurs.',
    helpEn: 'Pick one or more',
    helpFr: 'Choisissez un ou plusieurs',
    choices: [
      { value: 'token', labelEn: 'Issue a token or digital asset', labelFr: 'Émettre un token / actif numérique', icon: '🪙', hintEn: 'Stablecoin, utility token, NFT, RWA, etc.', hintFr: 'Stablecoin, utility token, NFT, RWA, etc.' },
      { value: 'platform', labelEn: 'Run a platform or exchange', labelFr: 'Gérer une plateforme / exchange', icon: '🔄', hintEn: 'Exchange, DEX, marketplace, broker, on/off-ramp', hintFr: 'Exchange, DEX, marketplace, broker, on/off-ramp' },
      { value: 'custody', labelEn: 'Provide custody / wallet services', labelFr: 'Fournir custody / wallet', icon: '🔐', hintEn: 'Hold customer keys, MPC, SignerList, multisig…', hintFr: 'Détention de clés, MPC, SignerList, multisig…' },
      { value: 'jurisdiction', labelEn: 'Pick the right jurisdiction', labelFr: 'Choisir ma juridiction', icon: '🗺️', hintEn: 'You know what you\'re building but not where to incorporate', hintFr: 'Vous savez quoi construire mais pas où vous incorporer' },
      { value: 'not-sure', labelEn: 'Not sure yet — show me everything', labelFr: 'Pas encore sûr — montre-moi tout', icon: '❓' },
    ],
  },
  {
    id: 'markets',
    titleEn: 'Where are your users? (multi-select)',
    titleFr: 'Où sont vos utilisateurs ? (multi-choix)',
    subtitleEn: 'Most crypto rules are extraterritorial — where you serve users matters more than where you\'re incorporated.',
    subtitleFr: 'La plupart des règles crypto sont extraterritoriales — là où vous servez vos utilisateurs compte plus que là où vous êtes incorporé.',
    helpEn: 'Pick one or more',
    helpFr: 'Choisissez un ou plusieurs',
    choices: [
      { value: 'eu', labelEn: 'EU / EEA', labelFr: 'UE / EEE', icon: '🇪🇺', hintEn: 'MiCA applies extraterritorially', hintFr: 'MiCA s\'applique extraterritorialement' },
      { value: 'us', labelEn: 'USA', labelFr: 'États-Unis', icon: '🇺🇸', hintEn: 'Federal + state patchwork (BSA, MTL, BitLicense)', hintFr: 'Patchwork fédéral + états (BSA, MTL, BitLicense)' },
      { value: 'apac', labelEn: 'APAC (SG, HK, JP, KR, AU)', labelFr: 'APAC (SG, HK, JP, KR, AU)', icon: '🌏', hintEn: 'Singapore MAS often the entry point', hintFr: 'Singapour MAS souvent le point d\'entrée' },
      { value: 'global', labelEn: 'Global / no specific market yet', labelFr: 'Global / pas de marché précis', icon: '🌍', hintEn: 'You need to stack compliance regimes', hintFr: 'Vous devez empiler les régimes de conformité' },
      { value: 'not-sure', labelEn: 'Not sure yet', labelFr: 'Pas encore sûr', icon: '❓' },
    ],
  },
  {
    id: 'custody',
    titleEn: 'What\'s your custody model? (multi-select)',
    titleFr: 'Quel est votre modèle de custody ? (multi-choix)',
    subtitleEn: 'This is one of the biggest factors for which licences and obligations apply. A hybrid stack might check several boxes.',
    subtitleFr: 'C\'est un des facteurs les plus importants pour les licences et obligations. Une stack hybride peut cocher plusieurs cases.',
    helpEn: 'Pick one or more',
    helpFr: 'Choisissez un ou plusieurs',
    choices: [
      { value: 'custodial', labelEn: 'Custodial — we hold keys', labelFr: 'Custodial — on détient les clés', icon: '🔒', hintEn: 'Higher compliance burden (CASP custody, BitLicense, DABA…)', hintFr: 'Charge conformité plus lourde (CASP custody, BitLicense, DABA…)' },
      { value: 'non-custodial', labelEn: 'Non-custodial — users hold keys', labelFr: 'Non-custodial — les utilisateurs détiennent leurs clés', icon: '🔑', hintEn: 'Lighter path (FATF carve-out for pure software)', hintFr: 'Voie allégée (carve-out GAFI pour logiciel pur)' },
      { value: 'hybrid', labelEn: 'Hybrid (MPC / SignerList / multisig)', labelFr: 'Hybride (MPC / SignerList / multisig)', icon: '⚖️', hintEn: 'Grey zone — needs careful design analysis', hintFr: 'Zone grise — nécessite une analyse de design' },
      { value: 'not-sure', labelEn: 'Not sure yet', labelFr: 'Pas encore sûr', icon: '❓' },
    ],
  },
];

/** Helpers that normalise possibly-undefined array fields. */
const arr = <T,>(x: T[] | undefined): T[] => x ?? [];
const has = <T extends string>(list: T[] | undefined, v: T) => arr(list).includes(v);

/**
 * Rule-based tree recommendation from funnel answers. Deterministic.
 * Returns an ordered list (by priority) — caller decides how many to run.
 */
export function recommendTrees(a: FunnelAnswers): TreeRecommendation[] {
  const out: TreeRecommendation[] = [];
  const products = arr(a.products);
  const markets = arr(a.markets);
  const custody = arr(a.custody);

  const isEuRelevant = has(markets, 'eu') || has(markets, 'global') || has(markets, 'not-sure') || markets.length === 0;
  const isUsRelevant = has(markets, 'us') || has(markets, 'global') || has(markets, 'not-sure') || markets.length === 0;

  // Jurisdiction product picked → always jurisdiction tree first
  if (has(products, 'jurisdiction')) {
    out.push({
      treeId: 'jurisdiction',
      reasonEn: 'You asked for jurisdiction guidance — this is the dedicated walkthrough.',
      reasonFr: 'Vous cherchez à choisir votre juridiction — voici le diagnostic dédié.',
      priority: 1,
    });
  }

  // Token issuance + US exposure → Howey
  if (has(products, 'token') && isUsRelevant) {
    out.push({
      treeId: 'howey',
      reasonEn: 'US users + token issuance → the Howey Test decides if your token is a security.',
      reasonFr: 'Utilisateurs US + émission token → le Howey Test détermine si votre token est un security.',
      priority: has(markets, 'us') ? 1 : 3,
    });
  }

  // Any crypto service + EU exposure → CASP
  if ((has(products, 'token') || has(products, 'platform') || has(products, 'custody')) && isEuRelevant) {
    out.push({
      treeId: 'casp',
      reasonEn: 'EU users + crypto-asset service → MiCA\'s CASP regime likely applies.',
      reasonFr: 'Utilisateurs UE + service crypto → le régime CASP de MiCA s\'applique probablement.',
      priority: has(markets, 'eu') ? 1 : 2,
    });
  }

  // Custody-related signals → XRPL custody diagnostic
  if (has(products, 'custody') || has(custody, 'custodial') || has(custody, 'hybrid')) {
    out.push({
      treeId: 'xrpl-custody',
      reasonEn: 'Custody setup — classify yours across the 10 XRPL custody patterns (custodial / non-custodial / grey).',
      reasonFr: 'Modèle custody — classez le vôtre parmi les 10 patterns XRPL (custodial / non-custodial / gris).',
      priority: has(products, 'custody') ? 1 : 3,
    });
  }

  // Anyone who picked anything except jurisdiction → also suggest the jurisdiction tree as a closer
  if (products.length > 0 && !has(products, 'jurisdiction') && out.length > 0) {
    out.push({
      treeId: 'jurisdiction',
      reasonEn: 'Once licences are identified, pick the jurisdiction(s) that best match your priorities.',
      reasonFr: 'Une fois les licences identifiées, choisissez la ou les juridictions qui matchent vos priorités.',
      priority: 5,
    });
  }

  // Exploratory fallback: 'not-sure' with nothing else → propose all 4
  if ((has(products, 'not-sure') || products.length === 0) && out.length === 0) {
    out.push(
      { treeId: 'howey', reasonEn: 'Covers US token classification.', reasonFr: 'Couvre la classification des tokens US.', priority: 4 },
      { treeId: 'casp', reasonEn: 'Covers EU licensing.', reasonFr: 'Couvre le licensing UE.', priority: 4 },
      { treeId: 'xrpl-custody', reasonEn: 'Covers custody classification.', reasonFr: 'Couvre la classification custody.', priority: 4 },
      { treeId: 'jurisdiction', reasonEn: 'Covers jurisdiction choice.', reasonFr: 'Couvre le choix de juridiction.', priority: 4 },
    );
  }

  // De-duplicate by treeId (keep the highest-priority / lowest-number)
  const dedup = new Map<TreeId, TreeRecommendation>();
  for (const r of out) {
    const existing = dedup.get(r.treeId);
    if (!existing || r.priority < existing.priority) dedup.set(r.treeId, r);
  }
  return Array.from(dedup.values()).sort((a, b) => a.priority - b.priority);
}
