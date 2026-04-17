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

  // ── Case law / rulings (⚖️) ──
  'Howey Test': 'ruling',
  'SEC v. Ripple': 'ruling',

  // ── Guidance (📋) ──
  'ESMA guidance': 'guidance',
  'FCA guidance': 'guidance',
  'SEC Staff': 'guidance',
  'OCC Interpretive': 'guidance',
  'MAS guideline': 'guidance',
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

    // Classify: look for the first matching keyword in the full segment
    let type: RegimeItemType = 'other';
    const haystack = seg;
    for (const key of SORTED_KEYS) {
      if (haystack.includes(key)) {
        type = CLASSIFICATION[key];
        break;
      }
    }

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
  ruling: {
    icon: '⚖️',
    labelEn: 'Court ruling',
    labelFr: 'Décision de justice',
    colorClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800',
  },
  guidance: {
    icon: '📋',
    labelEn: 'Guidance',
    labelFr: 'Guidance',
    colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
  },
  other: {
    icon: '•',
    labelEn: 'Other',
    labelFr: 'Autre',
    colorClass: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700',
  },
};
