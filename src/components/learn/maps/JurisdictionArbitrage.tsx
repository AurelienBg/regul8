'use client';

/*
 * Jurisdiction Arbitrage — 2D scatter plot
 * X: speed to licence (months, 0 → 36)
 * Y: setup cost (€K, 0 → 1000+)
 * Dot color: risk level (low=emerald, med=amber, high=red)
 * Radius: indicative market access
 */

import { useLocale } from 'next-intl';

type Jur = {
  code: string;
  labelEn: string;
  labelFr: string;
  flag: string;
  speedMonths: number;
  costK: number;
  risk: 'low' | 'med' | 'high';
  access: 'narrow' | 'wide' | 'huge';
};

const JURS: Jur[] = [
  { code: 'li', labelEn: 'Liechtenstein', labelFr: 'Liechtenstein', flag: '🇱🇮', speedMonths: 6, costK: 50, risk: 'low', access: 'wide' },
  { code: 'ch', labelEn: 'Switzerland', labelFr: 'Suisse', flag: '🇨🇭', speedMonths: 12, costK: 250, risk: 'low', access: 'wide' },
  { code: 'uae', labelEn: 'UAE / Dubai', labelFr: 'EAU / Dubaï', flag: '🇦🇪', speedMonths: 9, costK: 100, risk: 'med', access: 'wide' },
  { code: 'sg', labelEn: 'Singapore', labelFr: 'Singapour', flag: '🇸🇬', speedMonths: 9, costK: 90, risk: 'med', access: 'wide' },
  { code: 'uk', labelEn: 'United Kingdom', labelFr: 'Royaume-Uni', flag: '🇬🇧', speedMonths: 15, costK: 80, risk: 'med', access: 'wide' },
  { code: 'eu', labelEn: 'EU (MiCA)', labelFr: 'UE (MiCA)', flag: '🇪🇺', speedMonths: 15, costK: 200, risk: 'high', access: 'huge' },
  { code: 'hk', labelEn: 'Hong Kong', labelFr: 'Hong Kong', flag: '🇭🇰', speedMonths: 15, costK: 250, risk: 'high', access: 'wide' },
  { code: 'us', labelEn: 'USA', labelFr: 'USA', flag: '🇺🇸', speedMonths: 27, costK: 800, risk: 'high', access: 'huge' },
  { code: 'br', labelEn: 'Brazil', labelFr: 'Brésil', flag: '🇧🇷', speedMonths: 10, costK: 60, risk: 'med', access: 'wide' },
  { code: 'jp', labelEn: 'Japan', labelFr: 'Japon', flag: '🇯🇵', speedMonths: 18, costK: 200, risk: 'high', access: 'wide' },
];

const COPY = {
  en: {
    xAxis: 'Time to licence (months)',
    yAxis: 'Setup cost (€, log scale)',
    qFastExp: 'Fast & expensive',
    qSlowExp: 'Slow & expensive',
    qFastCheap: '⭐ Fast & cheap',
    qSlowCheap: 'Slow & cheap',
    riskTitle: 'Risk level (dot color)',
    riskLow: 'Low — progressive regime (TVTG, FINMA)',
    riskMed: 'Medium — structured but friendly (VARA, MAS, FCA)',
    riskHigh: 'High — strict or fragmented (MiCA, SFC, US)',
    accessTitle: 'Market access (dot size)',
    accessNarrow: 'Narrow — single country',
    accessWide: 'Wide — region or hub',
    accessHuge: 'Huge — EU-27 passport or US national',
  },
  fr: {
    xAxis: "Délai d'obtention (mois)",
    yAxis: 'Coût setup (€, échelle log)',
    qFastExp: 'Rapide & cher',
    qSlowExp: 'Lent & cher',
    qFastCheap: '⭐ Rapide & abordable',
    qSlowCheap: 'Lent & abordable',
    riskTitle: 'Niveau de risque (couleur)',
    riskLow: 'Faible — régime progressif (TVTG, FINMA)',
    riskMed: 'Moyen — structuré mais friendly (VARA, MAS, FCA)',
    riskHigh: 'Élevé — strict ou fragmenté (MiCA, SFC, US)',
    accessTitle: 'Accès marché (taille du point)',
    accessNarrow: 'Étroit — un seul pays',
    accessWide: 'Large — région ou hub',
    accessHuge: 'Énorme — passeport UE-27 ou national US',
  },
};

const W = 900;
const H = 520;
const PAD_L = 80;
const PAD_R = 40;
const PAD_T = 40;
const PAD_B = 70;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const X_MAX = 36;
const Y_MAX = 1000;

function xPos(months: number) {
  return PAD_L + (months / X_MAX) * PLOT_W;
}
function yPos(costK: number) {
  const logPct = Math.min(1, Math.log10(costK + 1) / Math.log10(Y_MAX + 1));
  return PAD_T + (1 - logPct) * PLOT_H;
}

const riskColor: Record<Jur['risk'], string> = {
  low: 'fill-emerald-500',
  med: 'fill-amber-500',
  high: 'fill-red-500',
};

const accessRadius: Record<Jur['access'], number> = {
  narrow: 10,
  wide: 13,
  huge: 17,
};

export default function JurisdictionArbitrage() {
  const locale = useLocale();
  const c = locale === 'fr' ? COPY.fr : COPY.en;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Jurisdiction arbitrage scatter plot"
      >
        {/* Axes */}
        <g stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" className="text-gray-700 dark:text-gray-300">
          <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H} />
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + PLOT_H} />
        </g>

        {/* Grid */}
        <g stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 4" className="text-gray-500">
          {[6, 12, 18, 24, 30].map((m) => (
            <line key={m} x1={xPos(m)} y1={PAD_T} x2={xPos(m)} y2={PAD_T + PLOT_H} />
          ))}
          {[10, 50, 100, 500].map((cv) => (
            <line key={cv} x1={PAD_L} y1={yPos(cv)} x2={PAD_L + PLOT_W} y2={yPos(cv)} />
          ))}
        </g>

        {/* X ticks */}
        <g className="fill-gray-600 dark:fill-gray-400" fontSize="11">
          {[0, 6, 12, 18, 24, 30, 36].map((m) => (
            <text key={m} x={xPos(m)} y={PAD_T + PLOT_H + 18} textAnchor="middle">
              {m}m
            </text>
          ))}
          <text x={PAD_L + PLOT_W / 2} y={PAD_T + PLOT_H + 45} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 font-semibold" fontSize="12">
            {c.xAxis}
          </text>
        </g>

        {/* Y ticks */}
        <g className="fill-gray-600 dark:fill-gray-400" fontSize="11">
          {[10, 50, 100, 500, 1000].map((cv) => (
            <text key={cv} x={PAD_L - 10} y={yPos(cv) + 4} textAnchor="end">
              €{cv}K
            </text>
          ))}
          <text
            transform={`translate(${PAD_L - 55} ${PAD_T + PLOT_H / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-gray-700 dark:fill-gray-300 font-semibold"
            fontSize="12"
          >
            {c.yAxis}
          </text>
        </g>

        {/* Quadrant labels */}
        <g className="fill-gray-400 dark:fill-gray-600 font-semibold" fontSize="12" opacity="0.7">
          <text x={PAD_L + 15} y={PAD_T + 22}>{c.qFastExp}</text>
          <text x={PAD_L + PLOT_W - 15} y={PAD_T + 22} textAnchor="end">{c.qSlowExp}</text>
          <text x={PAD_L + 15} y={PAD_T + PLOT_H - 10}>{c.qFastCheap}</text>
          <text x={PAD_L + PLOT_W - 15} y={PAD_T + PLOT_H - 10} textAnchor="end">{c.qSlowCheap}</text>
        </g>

        {/* Points */}
        <g>
          {JURS.map((j) => {
            const cx = xPos(j.speedMonths);
            const cy = yPos(j.costK);
            const r = accessRadius[j.access];
            const label = locale === 'fr' ? j.labelFr : j.labelEn;
            return (
              <g key={j.code}>
                <circle cx={cx} cy={cy} r={r + 4} className="fill-white dark:fill-gray-900" opacity="0.9" />
                <circle cx={cx} cy={cy} r={r} className={riskColor[j.risk]} opacity="0.85" />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize="14">
                  {j.flag}
                </text>
                <text
                  x={cx}
                  y={cy + r + 14}
                  textAnchor="middle"
                  fontSize="11"
                  className="fill-gray-800 dark:fill-gray-200 font-semibold"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
          <div className="font-semibold mb-2">{c.riskTitle}</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> {c.riskLow}</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> {c.riskMed}</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> {c.riskHigh}</div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
          <div className="font-semibold mb-2">{c.accessTitle}</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> {c.accessNarrow}</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-400" /> {c.accessWide}</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-gray-400" /> {c.accessHuge}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
