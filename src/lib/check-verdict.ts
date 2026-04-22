/**
 * Rule-based verdict composer for /check Level 2.
 *
 * Takes funnel answers (multi-select arrays: products, markets, custody) and
 * produces a structured mini-report organised by domain (regimes, licences,
 * custody, jurisdictions). Purely deterministic — no AI call.
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

export interface VerdictCard {
  domain: 'regime' | 'licence' | 'custody' | 'jurisdiction';
  icon: string;
  titleEn: string;
  titleFr: string;
  items: VerdictItem[];
  noteEn?: string;
  noteFr?: string;
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

  // === REGIMES ===
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
      reasonEn: 'BSA / FinCEN at federal level, Money Transmitter Licences state-by-state, BitLicense in NY.',
      reasonFr: 'BSA / FinCEN au fédéral, MTL état par état, BitLicense à NY.',
      emphasis: isUs ? 'primary' : 'secondary',
    });
    if (has(products, 'token')) {
      regimes.push({
        labelEn: 'SEC Howey Test',
        labelFr: 'Test Howey (SEC)',
        reasonEn: '4-prong test that decides if your token is a security. Drives your entire US compliance posture.',
        reasonFr: 'Test en 4 critères qui détermine si votre token est un security. Détermine toute votre posture compliance US.',
        emphasis: 'primary',
      });
    }
  }
  if (isApac || isGlobal) {
    regimes.push({
      labelEn: 'MAS Payment Services Act (Singapore)',
      labelFr: 'MAS Payment Services Act (Singapour)',
      reasonEn: 'DPT + payment services framework. Common APAC entry point.',
      reasonFr: 'Cadre DPT + services de paiement. Point d\'entrée APAC courant.',
      emphasis: isApac ? 'primary' : 'tertiary',
    });
  }
  if (regimes.length > 0) {
    cards.push({
      domain: 'regime',
      icon: '📜',
      titleEn: 'Regimes to plan against',
      titleFr: 'Régimes à anticiper',
      items: regimes,
      noteEn: 'These are the legal frameworks your activity will sit under. Licences and obligations flow from them.',
      noteFr: 'Ce sont les cadres légaux qui s\'appliqueront à votre activité. Les licences et obligations en découlent.',
    });
  }

  // === LICENCES ===
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
  if (licences.length > 0) {
    cards.push({
      domain: 'licence',
      icon: '🪪',
      titleEn: 'Licences to target',
      titleFr: 'Licences à viser',
      items: licences,
    });
  }

  // === CUSTODY CLASSIFICATION ===
  const custodyItems: VerdictItem[] = [];
  if (has(custody, 'custodial')) {
    custodyItems.push({
      labelEn: 'CUSTODIAL',
      labelFr: 'CUSTODIAL',
      reasonEn: 'You hold customer keys → triggers the highest tier of compliance everywhere (capital, insurance, segregation).',
      reasonFr: 'Vous détenez les clés → tier de compliance le plus strict partout (capital, assurance, ségrégation).',
      emphasis: 'primary',
    });
  }
  if (has(custody, 'non-custodial')) {
    custodyItems.push({
      labelEn: 'NON-CUSTODIAL',
      labelFr: 'NON-CUSTODIAL',
      reasonEn: 'Users hold their own keys → generally lighter regime (FATF carve-out for pure software).',
      reasonFr: 'Les utilisateurs détiennent leurs clés → régime allégé (carve-out GAFI pour logiciel pur).',
      emphasis: 'primary',
    });
  }
  if (has(custody, 'hybrid')) {
    custodyItems.push({
      labelEn: 'HYBRID / GREY',
      labelFr: 'HYBRIDE / ZONE GRISE',
      reasonEn: 'MPC, SignerList, multisig — classification depends on quorum + key material. Needs explicit design analysis.',
      reasonFr: 'MPC, SignerList, multisig — la classification dépend du quorum + du matériel de clés. Analyse de design requise.',
      emphasis: 'primary',
    });
  }
  if (has(custody, 'not-sure') && custodyItems.length === 0) {
    custodyItems.push({
      labelEn: 'To determine',
      labelFr: 'À déterminer',
      reasonEn: 'Run the XRPL Custody diagnostic — 10 concrete patterns classified as custodial / non-custodial / grey.',
      reasonFr: 'Lancez le diagnostic XRPL Custody — 10 patterns concrets classés custodial / non-custodial / gris.',
      emphasis: 'secondary',
    });
  }
  if (custodyItems.length > 0) {
    cards.push({
      domain: 'custody',
      icon: '🔐',
      titleEn: 'Custody classification',
      titleFr: 'Classification custody',
      items: custodyItems,
      noteEn: 'Custody status is one of the biggest determinants of which licences, capital, and insurance you need.',
      noteFr: 'Le statut custody est un des plus gros déterminants des licences, capital, et assurance nécessaires.',
    });
  }

  // === JURISDICTIONS ===
  const juris: VerdictItem[] = [];
  if (isEu || isGlobal) {
    juris.push(
      {
        labelEn: '🇱🇺 Luxembourg',
        labelFr: '🇱🇺 Luxembourg',
        reasonEn: 'Mature EU fintech hub with CSSF, strong for MiCA CASP + EMI passporting.',
        reasonFr: 'Hub fintech UE mature avec CSSF, solide pour passporting CASP MiCA + EMI.',
        emphasis: 'primary',
      },
      {
        labelEn: '🇮🇪 Ireland',
        labelFr: '🇮🇪 Irlande',
        reasonEn: 'English-speaking EU entry point — Coinbase, Kraken, Ripple all hold CBI CASP.',
        reasonFr: 'Point d\'entrée UE anglophone — Coinbase, Kraken, Ripple y détiennent tous un CASP CBI.',
        emphasis: 'secondary',
      },
      {
        labelEn: '🇱🇮 Liechtenstein',
        labelFr: '🇱🇮 Liechtenstein',
        reasonEn: 'TVTG is the most flexible token-issuance regime in the EEA — 3-9 months turnaround.',
        reasonFr: 'TVTG — régime d\'émission de token le plus flexible de l\'EEE — 3-9 mois.',
        emphasis: 'tertiary',
      },
    );
  }
  if (isUs || isGlobal) {
    juris.push({
      labelEn: '🇺🇸 USA — state-by-state',
      labelFr: '🇺🇸 USA — état par état',
      reasonEn: 'Start with Wyoming / SD charters (crypto-friendly) + FinCEN MSB. NY is optional but heavy.',
      reasonFr: 'Commencer par Wyoming / SD (crypto-friendly) + FinCEN MSB. NY est optionnel mais lourd.',
      emphasis: isUs ? 'primary' : 'tertiary',
    });
  }
  if (isApac || isGlobal || isMarketUnsure) {
    juris.push({
      labelEn: '🇸🇬 Singapore',
      labelFr: '🇸🇬 Singapour',
      reasonEn: 'MAS PSA is the APAC crypto gateway — predictable, English-speaking, 9-15 months.',
      reasonFr: 'MAS PSA — la passerelle crypto APAC — prévisible, anglophone, 9-15 mois.',
      emphasis: isApac ? 'primary' : 'tertiary',
    });
  }
  if (has(products, 'token') && (isGlobal || isMarketUnsure)) {
    juris.push({
      labelEn: '🇰🇾 Cayman',
      labelFr: '🇰🇾 Caïmans',
      reasonEn: 'Foundation Company is the #1 offshore structure for token issuance + DAO treasuries.',
      reasonFr: 'Foundation Company — la #1 structure offshore pour émission de token + trésoreries DAO.',
      emphasis: 'tertiary',
    });
  }
  if (juris.length > 0) {
    cards.push({
      domain: 'jurisdiction',
      icon: '🗺️',
      titleEn: 'Jurisdictions to consider',
      titleFr: 'Juridictions à considérer',
      items: juris,
      noteEn: 'Pick the jurisdiction where your main market is (extraterritorial rules apply regardless of incorporation).',
      noteFr: 'Choisissez la juridiction de votre marché principal (les règles extraterritoriales s\'appliquent quelle que soit l\'incorporation).',
    });
  }

  // === SUMMARY ===
  const parts: { en: string; fr: string }[] = [];
  if (products.length) parts.push(productsLabel(products));
  if (markets.length) parts.push(marketsLabel(markets));
  if (custody.length) parts.push(custodyLabelJoined(custody));

  const summaryEn = parts.length
    ? `Profile: ${parts.map((p) => p.en).join(' · ')}. ${cards.length} domain${cards.length > 1 ? 's' : ''} relevant below.`
    : `Answer the 3 questions above to get a tailored verdict.`;
  const summaryFr = parts.length
    ? `Profil : ${parts.map((p) => p.fr).join(' · ')}. ${cards.length} domaine${cards.length > 1 ? 's' : ''} pertinent${cards.length > 1 ? 's' : ''} ci-dessous.`
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
