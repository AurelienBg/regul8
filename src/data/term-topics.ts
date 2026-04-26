/**
 * Central term → topic classification.
 * Used both by the glossary page (for filtering + pills) and by LinkedText
 * (to color-code underlines based on topic).
 */

export type Topic = 'licence' | 'regime' | 'obligation' | 'token' | 'regulator' | 'doctrine' | 'infra';

export const TERM_TOPICS: Record<string, Topic> = {
  // 🪪 Licences
  CASP: 'licence', DASP: 'licence', PSAN: 'licence', EMI: 'licence',
  MSB: 'licence', MTL: 'licence', BitLicense: 'licence', VASP: 'licence',
  AFSL: 'licence', DCE: 'licence', DABA: 'licence',
  'DABA Class F': 'licence', 'DABA Class M': 'licence', 'DABA Class T': 'licence',
  'Trust Charter': 'licence', 'NY Trust Charter': 'licence',
  'South Dakota Trust Charter': 'licence',
  DAOP: 'licence', DACS: 'licence', ARIP: 'licence', CAESP: 'licence',
  MTF: 'licence', MPI: 'licence', SPI: 'licence', VATP: 'licence',
  'Broker-Dealer': 'licence', 'Transfer Agent': 'licence', ATS: 'licence',
  'OCC charter': 'licence', PFS: 'licence',
  'Cryptoasset registration': 'licence',
  'Crypto Custody licence': 'licence', 'Crypto Custody registration': 'licence',
  'TVTG Token Issuer': 'licence', 'JONUM authorization': 'licence',
  'DLT framework': 'licence',
  'VASP Class I': 'licence', 'DFSA licence': 'licence',
  'ADGM Financial Services': 'licence',
  'Pre-Registration Undertaking': 'licence',

  // 📜 Regimes / laws / frameworks
  MiCA: 'regime', 'DLT Pilot Regime': 'regime', JONUM: 'regime',
  'Prospectus Regulation': 'regime', 'MiFID II': 'regime', PSD2: 'regime', PSD3: 'regime',
  BSA: 'regime', TVTG: 'regime', AMLO: 'regime', CASS: 'regime', AMLA: 'regime',
  SREN: 'regime',

  // ✅ Obligations / compliance duties
  AML: 'obligation', CFT: 'obligation', KYC: 'obligation', KYB: 'obligation',
  'Travel Rule': 'obligation', SAR: 'obligation',

  // 🪙 Token types
  EMT: 'token', ART: 'token', 'S-EMT': 'token', 'S-ART': 'token',
  STO: 'token', ICO: 'token', ITO: 'token', RWA: 'token', NFT: 'token',
  DPT: 'token', RLUSD: 'token', MPT: 'token',

  // 🏛️ Regulators / supervisory bodies
  // EU
  AMF: 'regulator', ESMA: 'regulator', NCA: 'regulator', ANJ: 'regulator',
  BaFin: 'regulator', CSSF: 'regulator', MFSA: 'regulator', CBI: 'regulator',
  'Lietuvos bankas': 'regulator', FMA: 'regulator',
  // US
  FinCEN: 'regulator', OFAC: 'regulator', SEC: 'regulator', CFTC: 'regulator',
  OCC: 'regulator', NYDFS: 'regulator',
  // International & Switzerland
  FATF: 'regulator', FINMA: 'regulator', VQF: 'regulator', SRO: 'regulator',
  // Asia-Pacific
  MAS: 'regulator', SFC: 'regulator', HKMA: 'regulator',
  FSA: 'regulator', JVCEA: 'regulator', FSC: 'regulator', KoFIU: 'regulator',
  ASIC: 'regulator', APRA: 'regulator', AUSTRAC: 'regulator',
  'FIU-IND': 'regulator',
  // UK
  FCA: 'regulator',
  // Middle East & Offshore
  VARA: 'regulator', DFSA: 'regulator', CIMA: 'regulator', BMA: 'regulator',
  // Canada
  FINTRAC: 'regulator', CSA: 'regulator', OSC: 'regulator', IIROC: 'regulator',
  // Latin America
  BCB: 'regulator', CVM: 'regulator', CMN: 'regulator',
  // Israel
  ISA: 'regulator', BoI: 'regulator', IMPA: 'regulator', CMISA: 'regulator',
  // Indonesia
  Bappebti: 'regulator', OJK: 'regulator', BI: 'regulator', PFAK: 'licence',
  // Africa
  'SEC Nigeria': 'regulator', CBN: 'regulator', NFIU: 'regulator',
  CBK: 'regulator', CMA: 'regulator', FSCA: 'regulator', SARB: 'regulator',
  FIC: 'regulator',
  // Gaming
  NLRC: 'regulator', BCLB: 'regulator',

  // 💡 Doctrine / legal tests / rulings
  'Howey Test': 'doctrine',

  // 🔧 Infrastructure / tech
  TradFi: 'infra', CeFi: 'infra', DeFi: 'infra', DAO: 'infra',
  'Smart Contract': 'infra', DLT: 'infra',
  'Trust Line': 'infra', IOU: 'infra', Escrow: 'infra', 'Payment Channel': 'infra',
  'XLS-20': 'infra', 'XLS-33': 'infra', AMM: 'infra', SignerList: 'infra',
  'Regular Key': 'infra', MPC: 'infra', TSS: 'infra',
  rippling: 'infra', freeze: 'infra', globalFreeze: 'infra',
  RequireAuth: 'infra', lsfLocked: 'infra',

  // The 7 meta-concepts themselves, self-tagged with their own topic so
  // the colored pill matches the page they live on (/learn/concepts).
  Regime: 'regime',
  Licence: 'licence',
  Regulator: 'regulator',
  Obligation: 'obligation',
  'Token type': 'token',
  Infrastructure: 'infra',
  Doctrine: 'doctrine',
};

/** CSS classes for each topic. Used in glossary pills + LinkedText underlines. */
export const TOPIC_META: Record<Topic, {
  icon: string;
  labelEn: string;
  labelFr: string;
  /** Pill bg + text used in glossary cards / legend. */
  pillClass: string;
  /** Dotted underline color for LinkedText. */
  underline: string;
  /** Hover text color for LinkedText. */
  hoverText: string;
}> = {
  licence: {
    icon: '🪪',
    labelEn: 'Licence',
    labelFr: 'Licence',
    pillClass: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
    underline: 'decoration-violet-500',
    hoverText: 'hover:text-violet-700 dark:hover:text-violet-300',
  },
  regime: {
    icon: '📜',
    labelEn: 'Regime',
    labelFr: 'Régime',
    pillClass: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
    underline: 'decoration-sky-500',
    hoverText: 'hover:text-sky-700 dark:hover:text-sky-300',
  },
  obligation: {
    icon: '✅',
    labelEn: 'Obligation',
    labelFr: 'Obligation',
    pillClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    underline: 'decoration-emerald-500',
    hoverText: 'hover:text-emerald-700 dark:hover:text-emerald-300',
  },
  token: {
    icon: '🪙',
    labelEn: 'Token type',
    labelFr: 'Type de token',
    pillClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
    underline: 'decoration-amber-500',
    hoverText: 'hover:text-amber-700 dark:hover:text-amber-300',
  },
  regulator: {
    icon: '🏛️',
    labelEn: 'Regulator',
    labelFr: 'Régulateur',
    pillClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
    underline: 'decoration-rose-500',
    hoverText: 'hover:text-rose-700 dark:hover:text-rose-300',
  },
  doctrine: {
    icon: '💡',
    labelEn: 'Doctrine',
    labelFr: 'Doctrine',
    pillClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
    underline: 'decoration-indigo-500',
    hoverText: 'hover:text-indigo-700 dark:hover:text-indigo-300',
  },
  infra: {
    icon: '🔧',
    labelEn: 'Infrastructure',
    labelFr: 'Infrastructure',
    pillClass: 'bg-slate-200 text-slate-800 dark:bg-slate-600/60 dark:text-slate-100',
    underline: 'decoration-slate-500',
    hoverText: 'hover:text-slate-800 dark:hover:text-slate-100',
  },
};
