'use client';

import { useLocale } from 'next-intl';

const COPY = {
  en: {
    root: 'MiCA Regulation',
    inScope: 'In scope: Crypto-assets',
    excluded: 'Excluded from MiCA',
    emtFull: 'E-Money Token',
    artFull: 'Asset-Referenced',
    otherFull: 'Other crypto-asset',
    otherNote: 'incl. Utility Tokens',
    uniqueNft: 'Unique NFTs',
    uniqueNftNote: 'truly 1-of-1',
    cbdcs: 'CBDCs',
    cbdcsNote: 'central bank currency',
    fullDefi: 'Full DeFi',
    fullDefiNote: 'no operator',
    emtExTitle: 'Single-currency peg',
    emtExFoot: 'EMI required',
    artExTitle: 'Basket / asset peg',
    artExMf: '• Multi-fiat stablecoin',
    artExCom: '• Commodity-backed',
    artExNft: '• Large NFT series',
    artExFoot: 'NCA authorization',
    otherExTitle: 'No stabilization',
    otherExGov: '• Governance tokens',
    otherExFoot: 'Whitepaper + NCA',
    legendTitle: '💡 Howey may still apply in parallel',
    legendBody: 'A token classified as an Other crypto-asset under MiCA can still be a security in the US under the Howey Test. Dual analysis is always required for transatlantic operations.',
    utilityTokens: '• Utility Tokens',
  },
  fr: {
    root: 'Règlement MiCA',
    inScope: 'Dans le scope : Crypto-actifs',
    excluded: 'Exclus de MiCA',
    emtFull: 'E-Money Token',
    artFull: 'Asset-Referenced',
    otherFull: 'Autre crypto-actif',
    otherNote: 'incl. Utility Tokens',
    uniqueNft: 'NFTs uniques',
    uniqueNftNote: 'vraiment 1-sur-1',
    cbdcs: 'CBDCs',
    cbdcsNote: 'monnaie banque centrale',
    fullDefi: 'DeFi pure',
    fullDefiNote: 'aucun opérateur',
    emtExTitle: 'Monnaie unique',
    emtExFoot: 'EMI requis',
    artExTitle: 'Panier / actifs',
    artExMf: '• Stablecoin multi-fiat',
    artExCom: '• Adossé commodities',
    artExNft: '• Grande série NFTs',
    artExFoot: 'Autorisation NCA',
    otherExTitle: 'Sans stabilisation',
    otherExGov: '• Tokens gouvernance',
    otherExFoot: 'Whitepaper + NCA',
    legendTitle: '💡 Howey peut s\'appliquer en parallèle',
    legendBody: "Un token classé Other crypto-asset sous MiCA peut rester un titre financier aux US selon Howey. Double analyse requise pour les opérations transatlantiques.",
    utilityTokens: '• Utility Tokens',
  },
};

/* Layout coords (viewBox 1120 x 680)
 *  Root:    x=490, w=140, center=560
 *  L1 in-scope:   center=270  (x=180, w=180)
 *  L1 excluded:   center=850  (x=760, w=180)
 *
 *  L2 in-scope (3 boxes, w=150, gap 12):
 *    EMT:    x=40,  center=115
 *    ART:    x=202, center=277
 *    Other:  x=364, center=439
 *  L2 excluded (3 boxes):
 *    NFT:    x=610, center=685
 *    CBDC:   x=772, center=847
 *    DeFi:   x=934, center=1009
 *
 *  L3 examples (w=150, h=120), same x as their L2 parent
 */
export default function MicaTaxonomy() {
  const locale = useLocale();
  const c = locale === 'fr' ? COPY.fr : COPY.en;

  return (
    <svg
      viewBox="0 0 1120 680"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto text-gray-900 dark:text-gray-100"
      role="img"
      aria-label="MiCA token taxonomy"
    >
      {/* connectors */}
      <g stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" fill="none">
        {/* root → L1 */}
        <line x1="560" y1="70" x2="270" y2="145" />
        <line x1="560" y1="70" x2="850" y2="145" />
        {/* in-scope L1 → L2 */}
        <line x1="270" y1="190" x2="115" y2="275" />
        <line x1="270" y1="190" x2="277" y2="275" />
        <line x1="270" y1="190" x2="439" y2="275" />
        {/* L2 → L3 (examples) */}
        <line x1="115" y1="335" x2="115" y2="410" />
        <line x1="277" y1="335" x2="277" y2="410" />
        <line x1="439" y1="335" x2="439" y2="410" />
        {/* excluded L1 → L2 */}
        <line x1="850" y1="190" x2="685" y2="275" />
        <line x1="850" y1="190" x2="847" y2="275" />
        <line x1="850" y1="190" x2="1009" y2="275" />
      </g>

      {/* Root */}
      <g>
        <rect x="490" y="20" width="140" height="50" rx="8" className="fill-blue-600 dark:fill-blue-500" />
        <text x="560" y="52" textAnchor="middle" className="fill-white font-bold" fontSize="17">
          {c.root}
        </text>
      </g>

      {/* Level 1 — In scope */}
      <g>
        <rect x="180" y="145" width="180" height="45" rx="8" className="fill-emerald-600 dark:fill-emerald-500" />
        <text x="270" y="172" textAnchor="middle" className="fill-white font-semibold" fontSize="13">
          {c.inScope}
        </text>
      </g>
      {/* Level 1 — Excluded */}
      <g>
        <rect x="760" y="145" width="180" height="45" rx="8" className="fill-gray-500 dark:fill-gray-600" />
        <text x="850" y="172" textAnchor="middle" className="fill-white font-semibold" fontSize="13">
          {c.excluded}
        </text>
      </g>

      {/* Level 2 — In scope categories */}
      <g>
        <rect x="40" y="275" width="150" height="60" rx="8" className="fill-white dark:fill-gray-800 stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="2" />
        <text x="115" y="300" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">EMT</text>
        <text x="115" y="322" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="11">{c.emtFull}</text>
      </g>
      <g>
        <rect x="202" y="275" width="150" height="60" rx="8" className="fill-white dark:fill-gray-800 stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="2" />
        <text x="277" y="300" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">ART</text>
        <text x="277" y="322" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="11">{c.artFull}</text>
      </g>
      <g>
        <rect x="364" y="275" width="150" height="60" rx="8" className="fill-white dark:fill-gray-800 stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="2" />
        <text x="439" y="296" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="12">{c.otherFull}</text>
        <text x="439" y="318" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">{c.otherNote}</text>
      </g>

      {/* Level 2 — Excluded categories */}
      <g>
        <rect x="610" y="275" width="150" height="60" rx="8" className="fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
        <text x="685" y="300" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">{c.uniqueNft}</text>
        <text x="685" y="322" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="11">{c.uniqueNftNote}</text>
      </g>
      <g>
        <rect x="772" y="275" width="150" height="60" rx="8" className="fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
        <text x="847" y="300" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">{c.cbdcs}</text>
        <text x="847" y="322" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">{c.cbdcsNote}</text>
      </g>
      <g>
        <rect x="934" y="275" width="150" height="60" rx="8" className="fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
        <text x="1009" y="300" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">{c.fullDefi}</text>
        <text x="1009" y="322" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="11">{c.fullDefiNote}</text>
      </g>

      {/* Level 3 — Examples (aligned with L2 in-scope boxes) */}
      <g>
        <rect x="40" y="410" width="150" height="115" rx="8" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-300 dark:stroke-emerald-700" strokeWidth="1" />
        <text x="115" y="432" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-semibold" fontSize="11">{c.emtExTitle}</text>
        <text x="115" y="455" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• RLUSD (USD)</text>
        <text x="115" y="472" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• USDC (USD)</text>
        <text x="115" y="489" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• EURt (EUR)</text>
        <text x="115" y="512" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize="10">{c.emtExFoot}</text>
      </g>
      <g>
        <rect x="202" y="410" width="150" height="115" rx="8" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-300 dark:stroke-emerald-700" strokeWidth="1" />
        <text x="277" y="432" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-semibold" fontSize="11">{c.artExTitle}</text>
        <text x="277" y="455" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">{c.artExMf}</text>
        <text x="277" y="472" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">{c.artExCom}</text>
        <text x="277" y="489" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">{c.artExNft}</text>
        <text x="277" y="512" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize="10">{c.artExFoot}</text>
      </g>
      <g>
        <rect x="364" y="410" width="150" height="115" rx="8" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-300 dark:stroke-emerald-700" strokeWidth="1" />
        <text x="439" y="432" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-semibold" fontSize="11">{c.otherExTitle}</text>
        <text x="439" y="455" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• XRP, BTC, ETH</text>
        <text x="439" y="472" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">{c.utilityTokens}</text>
        <text x="439" y="489" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">{c.otherExGov}</text>
        <text x="439" y="512" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize="10">{c.otherExFoot}</text>
      </g>

      {/* Legend */}
      <g transform="translate(40 585)">
        <rect x="0" y="0" width="1040" height="70" rx="8" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-200 dark:stroke-blue-800" strokeWidth="1" />
        <text x="20" y="26" className="fill-blue-900 dark:fill-blue-200 font-semibold" fontSize="12">
          {c.legendTitle}
        </text>
        <text x="20" y="48" className="fill-gray-700 dark:fill-gray-300" fontSize="11">
          {c.legendBody}
        </text>
      </g>
    </svg>
  );
}
