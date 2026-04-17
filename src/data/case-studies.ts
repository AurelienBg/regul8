import type { CaseStudy } from '@/types'

// -----------------------------------------------------------------------------
// 1. SEC v. Ripple (July 2023)
// -----------------------------------------------------------------------------
const RIPPLE: CaseStudy = {
  id: 'sec-v-ripple',
  icon: '⚖️',
  title: 'SEC v. Ripple Labs',
  subtitle: 'How a split ruling redrew the line between primary and secondary crypto sales.',
  date: 'July 2023',
  jurisdictions: ['us'],
  keyTakeaway:
    'Institutional XRP sales by Ripple were unregistered securities. Programmatic sales on exchanges were not. The same digital asset can be a security at issuance and a non-security in secondary markets — depending on context.',
  timeline: [
    { date: 'Dec 2020', event: 'SEC sues Ripple Labs, alleging XRP is an unregistered security. Ripple, CEO Garlinghouse and co-founder Larsen named.' },
    { date: 'July 13, 2023', event: 'Judge Analisa Torres rules at summary judgment: institutional sales = securities; programmatic sales = not securities.' },
    { date: 'Aug 2024', event: 'Final judgment — Ripple fined $125M (vs. $2B+ sought by SEC). Permanent injunction on institutional sales without registration.' },
    { date: 'Aug 2025', event: 'SEC drops appeal. Ripple drops cross-appeal. Ruling stands.' },
  ],
  sections: [
    {
      heading: 'The legal question',
      paragraphs: [
        'The SEC argued XRP itself was an "investment contract" under the Howey Test — the 1946 Supreme Court precedent for identifying securities. All XRP sales by Ripple, whether to hedge funds or on public exchanges, were allegedly unregistered securities offerings.',
        'Ripple argued XRP was a currency or commodity, not a security. The question wasn\'t just about XRP as a token, but whether the circumstances of each sale satisfied Howey\'s four prongs: investment of money, in a common enterprise, with expectation of profit, derived from the efforts of others.',
      ],
    },
    {
      heading: 'The Torres ruling — a three-way split',
      paragraphs: [
        'Institutional sales (~$728M to hedge funds and sophisticated buyers under written contracts): Howey satisfied. Investors reasonably expected Ripple\'s efforts to drive XRP\'s value. These were unregistered securities.',
        'Programmatic sales (~$757M on public crypto exchanges via blind bid/ask orders): Howey NOT satisfied. Secondary-market buyers had no privity with Ripple, no direct expectation that Ripple specifically would drive their returns. Not securities.',
        'Other distributions (employee compensation, grants, third-party developer payments): not sales for money — Howey\'s first prong fails. Not securities.',
      ],
    },
    {
      heading: 'Why the distinction matters',
      paragraphs: [
        'Before Torres, the SEC\'s position was that a token classified as a security remained a security forever, regardless of venue or buyer. Torres introduced a context-dependent analysis: the "economic reality" of each transaction matters, not just the asset.',
        'The ruling opened a path for secondary-market trading of tokens that were originally sold as securities. US exchanges (Coinbase, Kraken, Gemini) relisted XRP within weeks. The broader implication: any token sold institutionally under an investment contract may still trade freely on public venues.',
      ],
    },
  ],
  whyItMatters: [
    'First major court ruling on secondary market sales of a crypto asset — relied on by defense counsel in subsequent SEC cases against Coinbase, Kraken, Binance',
    'Strengthens the argument that sufficiently decentralized networks escape security treatment in secondary markets',
    'Informed structuring of token launches: raise institutionally under Reg D/S, then allow open secondary trading',
    'XRPL-specific: removed the overhang that blocked US exchange listings of XRP for ~3 years',
    'Did NOT create blanket immunity — institutional sales and issuer conduct still trigger securities laws',
  ],
  relatedTerms: ['Howey Test', 'SEC', 'Reg D', 'Reg S', 'XRP'],
  relatedTrees: ['howey'],
}

// -----------------------------------------------------------------------------
// 2. RLUSD — Regulated stablecoin on XRPL
// -----------------------------------------------------------------------------
const RLUSD: CaseStudy = {
  id: 'rlusd-stablecoin',
  icon: '💵',
  title: 'RLUSD — a regulated stablecoin on XRPL',
  subtitle: 'How Ripple built a USD-pegged stablecoin within the NYDFS trust framework and the XRPL IOU model.',
  date: 'December 2024',
  jurisdictions: ['us', 'eu'],
  keyTakeaway:
    'RLUSD is the reference implementation of a compliant stablecoin on XRPL. It uses the native IOU / Trust Line model with NYDFS-approved trust custody, demonstrating that institutional-grade fiat representation works on XRPL without protocol changes.',
  timeline: [
    { date: 'Apr 2024', event: 'Ripple announces RLUSD; signals NY Trust structure with Standard Custody & Trust Company.' },
    { date: 'Dec 2024', event: 'NYDFS grants approval. RLUSD goes live on XRPL and Ethereum mainnet simultaneously.' },
    { date: '2025', event: 'RLUSD integrated into Ripple Payments cross-border corridors; grows to top-20 stablecoin by market cap.' },
  ],
  sections: [
    {
      heading: 'The regulatory shell',
      paragraphs: [
        'RLUSD is issued by Standard Custody & Trust Company, a NYDFS-chartered limited-purpose trust. The trust holds the reserves — cash deposits and short-term US Treasuries — and issues RLUSD 1:1 against those reserves. This is the same basic model used by Gemini (GUSD) and Paxos (PYUSD) under NYDFS oversight.',
        'Under MiCA, RLUSD qualifies as an E-Money Token (EMT): its value references a single official currency. For distribution to EU users, an EU issuer (EMI or credit institution) would be required; NYDFS authorization alone does not passport into the EU.',
      ],
    },
    {
      heading: 'The XRPL implementation',
      paragraphs: [
        'On XRPL, RLUSD uses the native IOU / Trust Line model. The issuing account (controlled by Standard Custody) establishes trust lines with user accounts; RLUSD balances live on those trust lines as on-chain claims against the trust.',
        'The issuer account has compliance flags enabled: RequireAuth (holders must be authorized — enables KYC gating on-chain), and freeze / globalFreeze (the trust can freeze individual trust lines or all of them for AML holds or emergency action). These flags are protocol-native controls, not off-chain reversals.',
        'On Ethereum, RLUSD is implemented as an ERC-20 with standard administrative controls (pause, blacklist, mint/burn). The two chains are independent mints — no bridge; the trust issues separately on each.',
      ],
    },
    {
      heading: 'Why this structure matters',
      paragraphs: [
        'The RLUSD design answers a recurring objection to XRPL: that IOU / Trust Lines are too opinionated or custodial for serious institutional use. RLUSD shows the IOU model maps cleanly to NY Trust structures, with on-chain compliance features the ERC-20 world has to retrofit via admin functions.',
        'The simultaneous XRPL + Ethereum launch also shows multi-chain distribution is now a baseline expectation for any regulated stablecoin — single-chain stablecoins carry ecosystem risk that issuers increasingly want to avoid.',
      ],
    },
  ],
  whyItMatters: [
    'Proves the XRPL IOU / Trust Line model scales to regulated stablecoin use cases',
    'Validates freeze / globalFreeze / RequireAuth as first-class compliance primitives',
    'Reference template for any fiat-backed token issuance on XRPL (not just USD — EUR, GBP, regional currencies can follow the same pattern)',
    'Gateway custody = custodial under MiCA — any EU-targeted RLUSD distribution requires EMI authorization',
    'Opens cross-border payment corridors for Ripple Payments that previously required multiple correspondent hops',
  ],
  relatedTerms: ['IOU', 'Trust Line', 'EMT', 'MiCA', 'RLUSD', 'NYDFS', 'RequireAuth'],
  relatedTrees: ['xrpl-custody', 'casp'],
}

// -----------------------------------------------------------------------------
// 3. Sorare + ANJ — the JONUM precedent
// -----------------------------------------------------------------------------
const SORARE: CaseStudy = {
  id: 'sorare-jonum',
  icon: '🎮',
  title: 'Sorare & ANJ — the JONUM precedent',
  subtitle: 'How France invented a new legal regime rather than force NFT gaming under gambling law.',
  date: '2022 – 2024',
  jurisdictions: ['eu'],
  keyTakeaway:
    'Faced with Sorare\'s fantasy football NFT game, France chose to create a bespoke regulatory sandbox (JONUM) instead of applying gambling law. The 3-year experiment is now the template for Web3 gaming compliance in the EU.',
  timeline: [
    { date: '2018', event: 'Sorare founded in Paris. Launches fantasy football game with licensed NFT player cards tradable on secondary market.' },
    { date: '2021', event: 'Sorare valued at $4.3B after Series B led by SoftBank — becomes France\'s most valuable startup.' },
    { date: '2022', event: 'ANJ (Autorité Nationale des Jeux) opens review. Question: is Sorare\'s game subject to gambling law?' },
    { date: '2023', event: 'Government announces JONUM (Jeux à Objets Numériques Monétisables) regime in the SREN bill.' },
    { date: 'May 2024', event: 'SREN law enacted. JONUM 3-year experimental regime begins, regulated by ANJ.' },
  ],
  sections: [
    {
      heading: 'The legal trap',
      paragraphs: [
        'French gambling law applies when three cumulative criteria are met: an offer to the public, a chance element in the outcome, and a monetary stake (sacrifice financier). NFT fantasy sports games like Sorare arguably meet all three — public access, player performance as a chance element, and NFT purchases that can gain or lose value.',
        'If ANJ had applied gambling law, Sorare would have needed a full gambling operator licence — an expensive, slow, retail-focused regime designed for poker and sports betting, not NFT games. It would likely have forced Sorare offshore.',
      ],
    },
    {
      heading: 'The legislative response',
      paragraphs: [
        'Rather than squeeze Sorare into a framework that didn\'t fit, the French government created a new regime: JONUM (Jeux à Objets Numériques Monétisables). The SREN law, adopted in May 2024, runs JONUM as a 3-year experiment regulated by ANJ.',
        'JONUM rules include: mandatory age verification, player-protection disclosures, no betting pools against operators, compulsory dispute resolution, clear marketing rules. Operators must register with ANJ but face a lighter regime than full gambling licences.',
        'The 3-year window (through mid-2027) is explicit: at the end, legislators will evaluate whether to make JONUM permanent, fold it into gambling law, or reshape it under MiCA/crypto law.',
      ],
    },
    {
      heading: 'What it signals',
      paragraphs: [
        'The JONUM precedent matters beyond Sorare. It\'s a signal that EU regulators can and will carve bespoke regimes for novel Web3 business models rather than force them into pre-existing categories. Other member states are watching.',
        'The risk for operators is re-qualification at the end of the experiment. If JONUM evolves into gambling law, current JONUM operators may need full gambling licences retroactively. If it evolves into MiCA territory (utility token framework), the analysis shifts to whether the NFTs qualify as crypto-assets.',
      ],
    },
  ],
  whyItMatters: [
    'First regulatory regime in the EU specifically designed for NFT gaming / play-to-earn',
    'Template for carving new regimes in other jurisdictions (UK, Germany and Spain are observing)',
    'Temporal risk: 3-year experimental window ends mid-2027 — operators should plan for re-qualification',
    'Interaction with MiCA: JONUM NFTs may still be crypto-assets under MiCA — dual compliance required if so',
    'Precedent that regulatory frameworks can be innovative, not just restrictive',
  ],
  relatedTerms: ['JONUM', 'ANJ', 'NFT', 'GameFi', 'MiCA'],
  relatedTrees: ['casp'],
}

// -----------------------------------------------------------------------------
// 4. Binance → Dubai
// -----------------------------------------------------------------------------
const BINANCE: CaseStudy = {
  id: 'binance-dubai',
  icon: '🏙️',
  title: 'Binance\'s jurisdictional pivot to Dubai',
  subtitle: 'How a $4.3B US settlement reshaped Binance\'s global compliance posture and made VARA Dubai the preferred crypto home.',
  date: '2021 – 2024',
  jurisdictions: ['uae', 'us'],
  keyTakeaway:
    'Facing enforcement in the US, UK and EU, Binance pivoted toward licensed operation — anchored in Dubai under VARA. The case shows that jurisdictional arbitrage is now primarily about licence density, not tax.',
  timeline: [
    { date: 'June 2021', event: 'UK FCA bans Binance Markets Ltd. Binance loses access to UK consumer-facing services.' },
    { date: 'Mar 2022', event: 'Binance receives virtual asset provisional permit from VARA (Dubai) — among the first major global exchanges.' },
    { date: 'May 2023', event: 'France AMF grants PSAN registration — single largest EU market access.' },
    { date: 'Nov 2023', event: 'US DoJ announces $4.3B settlement. CZ pleads guilty to AML / BSA violations, steps down as CEO.' },
    { date: '2024', event: 'Binance holds 20+ licences globally; Dubai becomes operational centre of gravity.' },
  ],
  sections: [
    {
      heading: 'The enforcement chapter',
      paragraphs: [
        'From 2021 to 2023, Binance faced sustained enforcement pressure. UK FCA (June 2021) banned Binance Markets Ltd from regulated activity. Germany BaFin blocked a securities-token offering. The US DoJ investigation culminated in a $4.3B settlement in November 2023 — one of the largest corporate penalties in US history — with CZ pleading guilty to violations of the Bank Secrecy Act and stepping down as CEO.',
        'The pattern: growing a global exchange first, seeking licences later, produces accumulated liability that can only be resolved with a massive settlement and a structural reset.',
      ],
    },
    {
      heading: 'The Dubai pivot',
      paragraphs: [
        'Binance received one of the first VARA virtual asset provisional permits in March 2022, before most global competitors. Dubai\'s VARA framework — promulgated the same month — was explicitly designed to attract crypto operators: clear rulebook, single-regulator model, 6-12 month timelines, no income tax, English-language common-law courts via DIFC/ADGM.',
        'By 2024, Binance held 20+ licences globally: France PSAN, Spain, Italy, Poland, Japan JFSA (through Binance Japan), Kazakhstan AFSA, Bahrain CBB, El Salvador BSP, and Dubai VARA. Dubai emerged as the operational centre of gravity, with Richard Teng (ex-ADGM and Singapore MAS regulator) appointed CEO.',
      ],
    },
    {
      heading: 'The template for global crypto',
      paragraphs: [
        'Binance\'s trajectory is now the template that OKX, Bybit, Crypto.com and others are following: Dubai as primary licensed hub, with additional licences in target markets (EU MiCA, Singapore MAS, Japan FSA, select US states). The pattern avoids concentrating risk in any single regulator, while maintaining deep access to the largest markets.',
        'For smaller startups, the lesson isn\'t to copy Binance\'s scale — it\'s to copy the sequencing: get one strong licence first (Dubai VARA or Liechtenstein TVTG are the fastest), then passport or stack additional licences as markets open up.',
      ],
    },
  ],
  whyItMatters: [
    'Dubai VARA is now the default first-choice for large-scale crypto ventures (speed, rulebook, zero income tax)',
    'Demonstrates the cost of "grow first, comply later" — $4.3B settlement + founder criminal plea',
    'Licence stacking (VARA + France PSAN + Singapore + etc.) is the new standard for institutional-grade global operators',
    'Sets expectations that crypto exchanges need governance overhaul to get and keep licences',
    'Signals that US will continue enforcement-first approach — lack of clear rulebook drives operators elsewhere',
  ],
  relatedTerms: ['VARA', 'ADGM', 'FATF', 'Travel Rule', 'VASP'],
  relatedTrees: ['jurisdiction'],
}

export const CASE_STUDIES: CaseStudy[] = [RIPPLE, RLUSD, SORARE, BINANCE]

export function getCaseStudy(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.id === id)
}
