/**
 * Official sources for regulatory frameworks referenced in the reports.
 * Each key matches a substring that may appear in a RegResult's regime /
 * licenses / obligations text. When a match is found, the source link
 * surfaces in the report's "Sources" section.
 */

export interface SourceRef {
  label: string;
  url: string;
  authority: string;
}

export const SOURCES: Record<string, SourceRef> = {
  // ── EU ──
  MiCA: {
    label: 'MiCA — Regulation (EU) 2023/1114',
    url: 'https://eur-lex.europa.eu/eli/reg/2023/1114/oj',
    authority: 'European Parliament',
  },
  CASP: {
    label: 'MiCA Articles 59-75 (CASP)',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114',
    authority: 'ESMA / National NCAs',
  },
  EMT: {
    label: 'MiCA Title III (E-Money Tokens)',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114',
    authority: 'ESMA / EBA',
  },
  ART: {
    label: 'MiCA Title II (Asset-Referenced Tokens)',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114',
    authority: 'ESMA / EBA',
  },
  DASP: {
    label: 'AMF — Règlement général (DASP/PSAN)',
    url: 'https://www.amf-france.org/en/professionals/digital-asset-service-providers-dasp',
    authority: 'AMF (France)',
  },
  PSAN: {
    label: 'AMF DOC-2020-07 (PSAN registration)',
    url: 'https://www.amf-france.org/en/professionals/digital-asset-service-providers-dasp',
    authority: 'AMF (France)',
  },
  'MiFID II': {
    label: 'MiFID II — Directive 2014/65/EU',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014L0065',
    authority: 'ESMA',
  },
  'Prospectus Regulation': {
    label: 'Prospectus Regulation (EU) 2017/1129',
    url: 'https://eur-lex.europa.eu/eli/reg/2017/1129/oj',
    authority: 'ESMA',
  },
  PSD2: {
    label: 'Payment Services Directive (EU) 2015/2366',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L2366',
    authority: 'European Commission',
  },
  'DLT Pilot Regime': {
    label: 'DLT Pilot Regime (EU) 2022/858',
    url: 'https://eur-lex.europa.eu/eli/reg/2022/858/oj',
    authority: 'ESMA',
  },
  JONUM: {
    label: "Loi SREN — Jeux à Objets Numériques Monétisables",
    url: 'https://www.anj.fr/jonum',
    authority: 'ANJ (France)',
  },

  // ── US ──
  'GENIUS Act': {
    label: 'GENIUS Act (2025) — Stablecoin federal framework',
    url: 'https://www.congress.gov/bill/119th-congress/senate-bill/394',
    authority: 'US Congress / OCC',
  },
  'CLARITY Act': {
    label: 'Digital Asset Market Clarity Act (2025)',
    url: 'https://www.congress.gov/bill/119th-congress/house-bill/3633',
    authority: 'US Congress',
  },
  'Howey Test': {
    label: 'SEC v. W.J. Howey Co., 328 U.S. 293 (1946)',
    url: 'https://supreme.justia.com/cases/federal/us/328/293/',
    authority: 'US Supreme Court',
  },
  'SEC v. Ripple': {
    label: 'SEC v. Ripple Labs — Summary Judgment (July 2023)',
    url: 'https://www.sdnyblog.com/files/2023/07/Sec.-v.-Ripple-Summary-Judgment.pdf',
    authority: 'SDNY (US District Court)',
  },
  FinCEN: {
    label: 'FinCEN — MSB registration (31 CFR 1022)',
    url: 'https://www.fincen.gov/money-services-business-msb-registration',
    authority: 'FinCEN (US Treasury)',
  },
  MSB: {
    label: 'FinCEN MSB Registration',
    url: 'https://www.fincen.gov/money-services-business-msb-registration',
    authority: 'FinCEN',
  },
  BSA: {
    label: 'Bank Secrecy Act — 31 USC 5311',
    url: 'https://www.fincen.gov/resources/statutes-regulations/bank-secrecy-act',
    authority: 'FinCEN',
  },
  MTL: {
    label: 'State Money Transmitter Licences (CSBS NMLS)',
    url: 'https://nationwidelicensingsystem.org/Pages/default.aspx',
    authority: 'State regulators',
  },
  BitLicense: {
    label: 'NYDFS 23 NYCRR Part 200 (BitLicense)',
    url: 'https://www.dfs.ny.gov/industry_guidance/virtual_currency_businesses',
    authority: 'NYDFS',
  },
  OFAC: {
    label: 'OFAC Sanctions Compliance for Virtual Currency',
    url: 'https://ofac.treasury.gov/recent-actions/20211015',
    authority: 'OFAC (US Treasury)',
  },
  'Reg D': {
    label: 'SEC Regulation D (17 CFR 230.500)',
    url: 'https://www.sec.gov/smallbusiness/exemptofferings/regd',
    authority: 'SEC',
  },

  // ── International / other jurisdictions ──
  FATF: {
    label: 'FATF Recommendations (2023 update)',
    url: 'https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html',
    authority: 'FATF',
  },
  'Travel Rule': {
    label: 'FATF Recommendation 16 — Travel Rule for VASPs',
    url: 'https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Guidance-rba-virtual-assets-2021.html',
    authority: 'FATF',
  },
  VARA: {
    label: 'VARA Virtual Assets Regulations',
    url: 'https://www.vara.ae/en/rulebooks/',
    authority: 'VARA (Dubai)',
  },
  MAS: {
    label: 'MAS Payment Services Act (PSA)',
    url: 'https://www.mas.gov.sg/regulation/acts/payment-services-act',
    authority: 'Monetary Authority of Singapore',
  },
  SFC: {
    label: 'SFC VASP / VATP Licensing Regime',
    url: 'https://www.sfc.hk/en/Regulatory-functions/Intermediaries/Virtual-asset-service-providers',
    authority: 'SFC (Hong Kong)',
  },
  FCA: {
    label: 'FCA Cryptoasset Registration Guide',
    url: 'https://www.fca.org.uk/firms/financial-crime/cryptoasset-aml-ctf-regime-register',
    authority: 'FCA (UK)',
  },
  FINMA: {
    label: 'FINMA Guidance on ICOs and DLT',
    url: 'https://www.finma.ch/en/documentation/dossier/dossier-fintech/',
    authority: 'FINMA (Switzerland)',
  },
  TVTG: {
    label: 'Liechtenstein TVTG (Token Act) 2020',
    url: 'https://www.fma-li.li/en/fma/area-of-responsibility/token-tt-service-provider-act-tvtg.html',
    authority: 'FMA Liechtenstein',
  },
  AMLO: {
    label: 'Hong Kong AMLO (Cap. 615)',
    url: 'https://www.elegislation.gov.hk/hk/cap615',
    authority: 'HK Government',
  },
  AMLA: {
    label: 'Swiss Anti-Money Laundering Act (AMLA)',
    url: 'https://www.fedlex.admin.ch/eli/cc/1998/892_892_892/en',
    authority: 'FINMA',
  },
};

/**
 * Scan a collection of strings (regime, licenses, obligations, etc.) and
 * return deduped source references that apply.
 */
export function findSources(texts: string[]): SourceRef[] {
  const seen = new Set<string>();
  const results: SourceRef[] = [];
  const haystack = texts.join(' \n ');
  for (const [key, src] of Object.entries(SOURCES)) {
    if (seen.has(key)) continue;
    // Case-sensitive for acronyms, whole-word style
    const pattern = new RegExp(`(?<![A-Za-z])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z])`);
    if (pattern.test(haystack)) {
      seen.add(key);
      results.push(src);
    }
  }
  return results;
}
