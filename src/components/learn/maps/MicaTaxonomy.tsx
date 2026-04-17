export default function MicaTaxonomy() {
  return (
    <svg
      viewBox="0 0 900 620"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto text-gray-900 dark:text-gray-100"
      role="img"
      aria-label="MiCA token taxonomy diagram"
    >
      {/* connectors */}
      <g stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" fill="none">
        <line x1="450" y1="70" x2="260" y2="145" />
        <line x1="450" y1="70" x2="640" y2="145" />
        <line x1="260" y1="190" x2="120" y2="275" />
        <line x1="260" y1="190" x2="260" y2="275" />
        <line x1="260" y1="190" x2="400" y2="275" />
        <line x1="120" y1="330" x2="120" y2="400" />
        <line x1="260" y1="330" x2="260" y2="400" />
        <line x1="400" y1="330" x2="400" y2="400" />
        <line x1="640" y1="190" x2="520" y2="275" />
        <line x1="640" y1="190" x2="640" y2="275" />
        <line x1="640" y1="190" x2="760" y2="275" />
      </g>

      {/* Root — MiCA */}
      <g>
        <rect x="370" y="20" width="160" height="50" rx="8" className="fill-blue-600 dark:fill-blue-500" />
        <text x="450" y="52" textAnchor="middle" className="fill-white font-bold" fontSize="18">
          MiCA Regulation
        </text>
      </g>

      {/* Level 1: In-scope vs Excluded */}
      <g>
        <rect x="180" y="145" width="160" height="45" rx="8" className="fill-emerald-600 dark:fill-emerald-500" />
        <text x="260" y="172" textAnchor="middle" className="fill-white font-semibold" fontSize="14">
          In scope: Crypto-assets
        </text>
      </g>
      <g>
        <rect x="560" y="145" width="160" height="45" rx="8" className="fill-gray-500 dark:fill-gray-600" />
        <text x="640" y="172" textAnchor="middle" className="fill-white font-semibold" fontSize="14">
          Excluded from MiCA
        </text>
      </g>

      {/* Level 2 — In-scope categories */}
      <g>
        <rect x="40" y="275" width="160" height="55" rx="8" className="fill-white dark:fill-gray-800 stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="2" />
        <text x="120" y="298" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">EMT</text>
        <text x="120" y="317" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">E-Money Token</text>
      </g>
      <g>
        <rect x="180" y="275" width="160" height="55" rx="8" className="fill-white dark:fill-gray-800 stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="2" />
        <text x="260" y="298" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">ART</text>
        <text x="260" y="317" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">Asset-Referenced</text>
      </g>
      <g>
        <rect x="320" y="275" width="160" height="55" rx="8" className="fill-white dark:fill-gray-800 stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="2" />
        <text x="400" y="298" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">Other crypto-asset</text>
        <text x="400" y="317" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">incl. Utility Tokens</text>
      </g>

      {/* Level 2 — Excluded categories */}
      <g>
        <rect x="440" y="275" width="160" height="55" rx="8" className="fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
        <text x="520" y="298" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">Unique NFTs</text>
        <text x="520" y="317" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">truly 1-of-1</text>
      </g>
      <g>
        <rect x="580" y="275" width="160" height="55" rx="8" className="fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
        <text x="660" y="298" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">CBDCs</text>
        <text x="660" y="317" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">central bank currency</text>
      </g>
      <g>
        <rect x="720" y="275" width="160" height="55" rx="8" className="fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-600" strokeWidth="2" />
        <text x="800" y="298" textAnchor="middle" className="fill-gray-900 dark:fill-gray-100 font-bold" fontSize="13">Full DeFi</text>
        <text x="800" y="317" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300" fontSize="10">no operator</text>
      </g>

      {/* Level 3 — Examples for EMT / ART / Other */}
      <g>
        <rect x="40" y="400" width="160" height="100" rx="8" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-300 dark:stroke-emerald-700" strokeWidth="1" />
        <text x="120" y="422" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-semibold" fontSize="11">Single-currency peg</text>
        <text x="120" y="445" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• RLUSD (USD)</text>
        <text x="120" y="462" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• USDC (USD)</text>
        <text x="120" y="479" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• EURt (EUR)</text>
        <text x="120" y="496" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize="10">EMI required</text>
      </g>
      <g>
        <rect x="180" y="400" width="160" height="100" rx="8" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-300 dark:stroke-emerald-700" strokeWidth="1" />
        <text x="260" y="422" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-semibold" fontSize="11">Basket / asset peg</text>
        <text x="260" y="445" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• Multi-fiat stablecoin</text>
        <text x="260" y="462" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• Commodity-backed</text>
        <text x="260" y="479" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• Large NFT series</text>
        <text x="260" y="496" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize="10">NCA authorization</text>
      </g>
      <g>
        <rect x="320" y="400" width="160" height="100" rx="8" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-300 dark:stroke-emerald-700" strokeWidth="1" />
        <text x="400" y="422" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-semibold" fontSize="11">No stabilization</text>
        <text x="400" y="445" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• XRP, BTC, ETH</text>
        <text x="400" y="462" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• Utility Tokens</text>
        <text x="400" y="479" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300" fontSize="10">• Governance tokens</text>
        <text x="400" y="496" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize="10">Whitepaper + NCA</text>
      </g>

      {/* Legend */}
      <g transform="translate(40 550)">
        <rect x="0" y="0" width="820" height="55" rx="8" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-200 dark:stroke-blue-800" strokeWidth="1" />
        <text x="20" y="22" className="fill-blue-900 dark:fill-blue-200 font-semibold" fontSize="12">
          💡 Howey may still apply in parallel
        </text>
        <text x="20" y="42" className="fill-gray-700 dark:fill-gray-300" fontSize="11">
          A token classified as an Other crypto-asset under MiCA can still be a security in the US under the Howey Test. Dual analysis is always required for transatlantic operations.
        </text>
      </g>
    </svg>
  );
}
