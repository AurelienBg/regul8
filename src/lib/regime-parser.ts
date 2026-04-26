import type { RegimeItem, RegimeItemType } from '@/types';

/**
 * Classification dictionary: key = substring we match inside regime strings,
 * value = type of the regulatory instrument.
 *
 * Matching is case-sensitive (intentional — preserves acronyms like MiCA).
 * Longer keys are checked first so e.g. "GENIUS Act" matches before "Act".
 */
const CLASSIFICATION: Record<string, RegimeItemType> = {
  // ── Laws & regulations (📜) ──
  'MiCA': 'law',
  'GENIUS Act': 'law',
  'CLARITY Act': 'law',
  'FIT21': 'law',
  'BSA': 'law',
  'TVTG': 'law',
  'DLT Act': 'law',
  'DLT Pilot Regime': 'law',
  'JONUM': 'law',
  'SREN': 'law',
  'MiFID II': 'law',
  'MiFID': 'law',
  'PSD2': 'law',
  'PSD3': 'law',
  'Prospectus Regulation': 'law',
  'Securities Act': 'law',
  'Reg D': 'law',
  'Reg S': 'law',
  'Reg A+': 'law',
  'PSA': 'law',
  'AMLO': 'law',
  'AMLA': 'law',
  'DFSA': 'law',
  'ADGM': 'law',

  // ── Licence frameworks (🪪) ──
  'CASP': 'licence-framework',
  'DASP': 'licence-framework',
  'PSAN': 'licence-framework',
  'EMI': 'licence-framework',
  'MSB': 'licence-framework',
  'MTL': 'licence-framework',
  'BitLicense': 'licence-framework',
  'VASP': 'licence-framework',
  'VATP': 'licence-framework',
  'MPI': 'licence-framework',
  'SPI': 'licence-framework',
  'SPDI': 'licence-framework',
  'FinTech licence': 'licence-framework',
  'SCS Framework': 'licence-framework',
  'Single-Currency Stablecoin': 'licence-framework',
  'VQF': 'licence-framework',
  'SRO': 'licence-framework',
  'VA Custody Services': 'licence-framework',
  'VARA': 'licence-framework',
  'Trust Licence': 'licence-framework',
  'Trust charter': 'licence-framework',
  'Payment Stablecoin Issuer': 'licence-framework',
  'OCC charter': 'licence-framework',
  // Added April 2026 from use-cases.ts structural refactor
  'AFSL': 'licence-framework',
  'DCE': 'licence-framework',
  'DABA Class F': 'licence-framework',
  'DABA Class M': 'licence-framework',
  'DABA Class T': 'licence-framework',
  'DABA': 'licence-framework',
  'South Dakota Trust Charter': 'licence-framework',
  'NY Trust Charter': 'licence-framework',
  'Trust Charter': 'licence-framework',
  'DAOP': 'licence-framework',
  'DACS': 'licence-framework',
  'ARIP': 'licence-framework',
  'CAESP': 'licence-framework',
  'PSF': 'licence-framework',
  'PFS': 'licence-framework',
  'SP Token Exchange licence': 'licence-framework',
  'SP Token Emitter licence': 'licence-framework',
  'DLT Trading Facility': 'licence-framework',
  'DLT framework': 'licence-framework',
  'MTF': 'licence-framework',
  // Added from use-cases.ts comprehensive glossary audit (April 2026).
  // 'VATP' is already declared at the top of this section (line 46).
  'Broker-Dealer': 'licence-framework',
  'Transfer Agent': 'licence-framework',
  'ATS': 'licence-framework',
  // 'OCC charter' is declared earlier in the US section; do not redeclare.
  'Cryptoasset registration': 'licence-framework',
  'Crypto Custody licence': 'licence-framework',
  'Crypto Custody registration': 'licence-framework',
  'TVTG Token Issuer': 'licence-framework',
  'JONUM authorization': 'licence-framework',
  'VASP Class I': 'licence-framework',
  'DFSA licence': 'licence-framework',
  'ADGM Financial Services': 'licence-framework',
  'Pre-Registration Undertaking': 'licence-framework',

  // ── Case law / rulings (⚖️) ──
  'Howey Test': 'ruling',
  'SEC v. Ripple': 'ruling',

  // ── Guidance (📋) ──
  'ESMA guidance': 'guidance',
  'FCA guidance': 'guidance',
  'SEC Staff': 'guidance',
  'OCC Interpretive': 'guidance',
  'MAS guideline': 'guidance',

  // ── Regulators / authorities (🏛️) ──
  // Used when a licence string mentions its issuing regulator (e.g.,
  // 'CASP authorization (ESMA/NCA)' → splits into licence CASP + regulators ESMA + NCA).
  // Listed here in addition to / longer-first order so multi-char acronyms like
  // 'NYDFS' are matched before 'SEC' when both appear.
  'NYDFS': 'regulator',
  'FinCEN': 'regulator',
  'FINMA': 'regulator',
  'BaFin': 'regulator',
  'FINTRAC': 'regulator',
  'AUSTRAC': 'regulator',
  'Lietuvos bankas': 'regulator',
  'HKMA': 'regulator',
  'CSSF': 'regulator',
  'AMF': 'regulator',
  'ESMA': 'regulator',
  'NCA': 'regulator',
  'CFTC': 'regulator',
  'SEC': 'regulator',
  'OCC': 'regulator',
  'MAS': 'regulator',
  'SFC': 'regulator',
  'FCA': 'regulator',
  'FMA': 'regulator',
  // NOTE: 'DFSA' already classified as 'law' in the law section above — should
  // actually be 'regulator' (Dubai Financial Services Authority). Leaving the
  // existing classification intact to avoid breaking downstream logic; fix in
  // a dedicated data-quality pass.
  'MFSA': 'regulator',
  'CIMA': 'regulator',
  'BMA': 'regulator',
  'CBI': 'regulator',
  'CBK': 'regulator',
  'CBN': 'regulator',
  'FSCA': 'regulator',
  'FIC': 'regulator',
  'FIU-IND': 'regulator',
  'CSA': 'regulator',
  'OSC': 'regulator',
  'IIROC': 'regulator',
  'ASIC': 'regulator',
  'APRA': 'regulator',
  'FSA': 'regulator',
  'JVCEA': 'regulator',
  'KoFIU': 'regulator',
  'FSC': 'regulator',
  'BCB': 'regulator',
  'CMN': 'regulator',
  'CVM': 'regulator',
  'SARB': 'regulator',
  'FIC Kenya': 'regulator',
  'NFIU': 'regulator',
  'CMA': 'regulator',
  // NOTE: 'VQF' already classified as 'licence-framework' above — debatable
  // (VQF is a Swiss SRO that acts as both the licensing framework and the
  // regulator). Keeping existing classification to avoid breakage.
  'ANJ': 'regulator',
  'NLRC': 'regulator',
  'BCLB': 'regulator',
  // Israel + Indonesia regulators (added Apr 2026 with the IL/ID juri batch)
  'ISA': 'regulator',
  'BoI': 'regulator',
  'IMPA': 'regulator',
  'CMISA': 'regulator',
  'Bappebti': 'regulator',
  'OJK': 'regulator',
  // Note: 'BI' is too short / generic to use as a parser keyword (would
  // match inside many other tokens) — handled at glossary-only level.
  'PFAK': 'licence-framework',
  'CFX': 'licence-framework',
  // Ghana / Cameroon / Argentina / El Salvador regulators (added Apr 2026)
  'BoG': 'regulator',
  'SEC Ghana': 'regulator',
  'FIC Ghana': 'regulator',
  'BEAC': 'regulator',
  'COBAC': 'regulator',
  'ANTIC': 'regulator',
  'CNV': 'regulator',
  'BCRA': 'regulator',
  'UIF': 'regulator',
  'CNAD': 'regulator',
  'BCR': 'regulator',
  // Salvador + Argentina licence frameworks
  'PSAV': 'licence-framework',
  'PSAD': 'licence-framework',
  'BSP': 'licence-framework',
  // Note: 'BCR' is short but specific enough; 'UIF' could collide with
  // generic French/Spanish text but the glossary scope keeps it safe.
};

const SORTED_KEYS = Object.keys(CLASSIFICATION).sort((a, b) => b.length - a.length);

/**
 * Splits a regime string (e.g., "CASP (MiCA) + PSAN (AMF France)") into
 * structured RegimeItem entries. Returns empty array if no recognized
 * keywords found.
 *
 * Splitting logic:
 *  - Split on ` + ` (human-readable separator used in data)
 *  - For each segment, extract (optional) parenthetical note
 *  - Classify by the first matching CLASSIFICATION keyword found
 */
/**
 * Find all keyword matches in a haystack string, ordered by length (desc).
 * Returns [{ key, type, index }] so callers can see which keywords matched
 * AND where (for splitting concerns).
 */
function findAllMatches(haystack: string): Array<{ key: string; type: RegimeItemType }> {
  const hits: Array<{ key: string; type: RegimeItemType }> = [];
  const claimed = new Set<number>(); // char indices already used — avoids double-matching (e.g., 'MiCA' inside 'MiCA framework')
  for (const key of SORTED_KEYS) {
    const idx = haystack.indexOf(key);
    if (idx === -1) continue;
    // Skip if this position was claimed by a longer keyword
    let overlap = false;
    for (let i = idx; i < idx + key.length; i++) {
      if (claimed.has(i)) { overlap = true; break; }
    }
    if (overlap) continue;
    hits.push({ key, type: CLASSIFICATION[key] });
    for (let i = idx; i < idx + key.length; i++) claimed.add(i);
  }
  return hits;
}

/**
 * Parses an arbitrary regulatory string (licence, authority, or mixed) into
 * semantic items — one pill per recognised keyword. Use this for the
 * 'Licences Required' and 'Authority' rows on /report + /compare, where a
 * string like 'CASP authorization (ESMA/NCA)' should render as 3 pills:
 *   🪪 CASP · 🏛️ ESMA · 🏛️ NCA
 *
 * If no keyword is recognised in the string, returns a single 'other' item
 * with the full string as its name (preserving readability).
 */
export function parseMixedString(raw: string): RegimeItem[] {
  if (!raw || typeof raw !== 'string') return [];
  const hits = findAllMatches(raw);
  if (hits.length === 0) {
    return [{ name: raw.trim(), type: 'other' }];
  }
  return hits.map((h) => ({ name: h.key, type: h.type }));
}

export function parseRegimeString(raw: string): RegimeItem[] {
  if (!raw || typeof raw !== 'string') return [];

  const segments = raw
    .split(/\s*\+\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  const items: RegimeItem[] = [];
  for (const seg of segments) {
    // Extract optional parenthetical note
    const noteMatch = seg.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
    let name = seg;
    let note: string | undefined;
    if (noteMatch) {
      name = noteMatch[1].trim();
      note = noteMatch[2].trim();
    }

    // Also handle em-dash separator: "VARA — VASP Full Market Product"
    const emDashMatch = name.match(/^(.*?)\s*[—–-]\s*(.+)$/);
    if (emDashMatch) {
      name = emDashMatch[1].trim();
      if (!note) note = emDashMatch[2].trim();
    }

    // Find ALL type keywords in both name and note (may surface multiple types
    // per segment, e.g., 'CASP (MiCA)' has licence-framework + law).
    const nameHits = findAllMatches(name);
    const noteHits = note ? findAllMatches(note) : [];

    const licenceHit = [...nameHits, ...noteHits].find((h) => h.type === 'licence-framework');
    const lawHit = [...nameHits, ...noteHits].find((h) => h.type === 'law');
    const rulingHit = [...nameHits, ...noteHits].find((h) => h.type === 'ruling');
    const guidanceHit = [...nameHits, ...noteHits].find((h) => h.type === 'guidance');

    // Case A: segment contains BOTH a licence-framework keyword AND a law keyword
    // → emit 2 items so the regime row can filter out the licence and keep the law.
    if (licenceHit && lawHit) {
      // Primary licence item uses the original full name + note (preserves detail like 'CASP Art. 75 MiCA')
      items.push({ name, type: 'licence-framework', note });
      // Secondary law item extracted from whichever field contained it
      items.push({ name: lawHit.key, type: 'law' });
      continue;
    }

    // Case B: single-type segment — pick the most specific match
    // Priority when multiple types coexist: licence-framework > ruling > law > guidance > other
    let type: RegimeItemType = 'other';
    if (licenceHit) type = 'licence-framework';
    else if (rulingHit) type = 'ruling';
    else if (lawHit) type = 'law';
    else if (guidanceHit) type = 'guidance';

    items.push({ name, type, note });
  }

  return items;
}

export const REGIME_TYPE_META: Record<
  RegimeItemType,
  { icon: string; labelEn: string; labelFr: string; colorClass: string }
> = {
  law: {
    icon: '📜',
    labelEn: 'Law',
    labelFr: 'Loi',
    colorClass: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200 border-sky-300 dark:border-sky-800',
  },
  'licence-framework': {
    icon: '🪪',
    labelEn: 'Licence framework',
    labelFr: 'Cadre de licence',
    colorClass: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200 border-violet-300 dark:border-violet-800',
  },
  // `ruling` is kept as the internal type name for backward compat (data
  // uses it across regulations.ts / regulations.fr.ts), but the DISPLAYED
  // label is now 'Doctrine' to match the canonical vocabulary used in
  // /learn/concepts (the 7 meta-concepts). Covers case law + legal
  // tests + interpretive guidance.
  ruling: {
    icon: '💡',
    labelEn: 'Doctrine',
    labelFr: 'Doctrine',
    colorClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800',
  },
  guidance: {
    icon: '📋',
    labelEn: 'Guidance',
    labelFr: 'Guidance',
    colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
  },
  // Regulator (authority) — rose/red matches the 🏛️ concept colour in /concepts.
  regulator: {
    icon: '🏛️',
    labelEn: 'Regulator',
    labelFr: 'Régulateur',
    colorClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 border-rose-300 dark:border-rose-800',
  },
  other: {
    icon: '•',
    labelEn: 'Other',
    labelFr: 'Autre',
    colorClass: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700',
  },
};
