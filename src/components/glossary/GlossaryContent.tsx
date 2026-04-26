'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { TERM_TOPICS } from '@/data/term-topics';
import XRPLBadge from '@/components/ui/XRPLBadge';

const CATEGORIES = ['all', 'eu', 'us', 'intl', 'general', 'xrpl'] as const;

type Topic = 'licence' | 'regime' | 'obligation' | 'token' | 'regulator' | 'doctrine' | 'infra';
const TOPICS = ['all', 'licence', 'regime', 'obligation', 'token', 'regulator', 'infra', 'doctrine', 'meta'] as const;

const TOPIC_ICONS: Record<Topic, string> = {
  licence: '🪪', regime: '📜', obligation: '✅', token: '🪙',
  regulator: '🏛️', doctrine: '💡', infra: '🔧',
};

const TOPIC_STYLES: Record<Topic, string> = {
  licence: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  regime: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  obligation: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  token: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  regulator: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  doctrine: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
  infra: 'bg-slate-200 text-slate-800 dark:bg-slate-600/60 dark:text-slate-100',
};

// Inactive state for each topic filter chip — same pastel palette as the
// card badges so the chip already communicates its topic colour without
// having to be selected.
const TOPIC_CHIP_INACTIVE: Record<Topic, string> = {
  licence: 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-200 border-violet-300 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/40',
  regime: 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-200 border-sky-300 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900/40',
  obligation: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40',
  token: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200 border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40',
  regulator: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-200 border-rose-300 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/40',
  doctrine: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
  infra: 'bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700/60',
};

// Active state — solid version of each topic's brand colour.
const TOPIC_CHIP_ACTIVE: Record<Topic, string> = {
  licence: 'bg-violet-500 text-white border-violet-500',
  regime: 'bg-sky-500 text-white border-sky-500',
  obligation: 'bg-emerald-500 text-white border-emerald-500',
  token: 'bg-amber-500 text-white border-amber-500',
  regulator: 'bg-rose-500 text-white border-rose-500',
  doctrine: 'bg-indigo-500 text-white border-indigo-500',
  infra: 'bg-slate-500 text-white border-slate-500',
};

type Scope = 'local' | 'extra' | 'global';
const SCOPE_ICONS: Record<Scope, string> = { local: '📍', extra: '🌐', global: '🌍' };
const SCOPE_STYLES: Record<Scope, string> = {
  local: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  extra: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  global: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
};

// Maps a topic → the glossary term that holds its meta-concept definition.
// Used when the user clicks the small topic badge on a term card — we
// jump to the meta-concept's own entry in the glossary.
const TOPIC_TO_META: Record<Topic, string> = {
  licence: 'Licence',
  regime: 'Regime',
  obligation: 'Obligation',
  token: 'Token type',
  regulator: 'Regulator',
  doctrine: 'Doctrine',
  infra: 'Infrastructure',
};

// Maps a scope → its glossary entry. Enables clicking on 📍/🌐/🌍 pills
// on each term card to jump to the scope's definition.
const SCOPE_TO_TERM: Record<Scope, string> = {
  local: 'Local',
  extra: 'Extraterritorial',
  global: 'Global standard',
};

const TERM_SCOPES: Record<string, Scope> = {
  BitLicense: 'local', MTL: 'local', PSAN: 'local', VARA: 'local',
  MiCA: 'extra', CASP: 'extra', DASP: 'extra', EMI: 'extra',
  EMT: 'extra', ART: 'extra', 'S-EMT': 'extra', 'S-ART': 'extra',
  'DLT Pilot Regime': 'extra', JONUM: 'extra',
  'Prospectus Regulation': 'extra', 'MiFID II': 'extra',
  PSD2: 'extra', PSD3: 'extra',
  ESMA: 'extra', AMF: 'extra', NCA: 'extra',
  'Howey Test': 'extra', FinCEN: 'extra', MSB: 'extra',
  BSA: 'extra', SAR: 'extra', OFAC: 'extra',
  MAS: 'extra', DPT: 'extra',
  SFC: 'extra', HKMA: 'extra', AMLO: 'extra',
  FCA: 'extra', CASS: 'extra',
  FINMA: 'extra', VQF: 'extra', SRO: 'extra', AMLA: 'extra',
  TVTG: 'extra',
  FATF: 'global', 'Travel Rule': 'global',
  AML: 'global', CFT: 'global', KYC: 'global', KYB: 'global',
  VASP: 'global',
};

// NOTE: TERM_TOPICS is now imported from `@/data/term-topics` — single
// source of truth shared with LinkedText + the glossary filter so that
// adding a new term in one place automatically lights up everywhere.

// Per-term flag overrides. The `flagForTerm` fallback below uses `category`
// (eu/us → 🇪🇺/🇺🇸) for everything not explicitly listed here; this map fills
// in country-specific regulators / licences whose `category` is too coarse
// (most non-EU/non-US regulators sit under `intl`).
const TERM_FLAGS: Record<string, string> = {
  // 🇫🇷 France
  AMF: '🇫🇷', ANJ: '🇫🇷', PSAN: '🇫🇷', DASP: '🇫🇷', 'JONUM authorization': '🇫🇷',
  // 🇩🇪 Germany
  BaFin: '🇩🇪',
  // 🇱🇺 Luxembourg
  CSSF: '🇱🇺',
  // 🇲🇹 Malta
  MFSA: '🇲🇹',
  // 🇮🇪 Ireland
  CBI: '🇮🇪', 'Pre-Registration Undertaking': '🇮🇪',
  // 🇱🇹 Lithuania
  'Lietuvos bankas': '🇱🇹',
  // 🇦🇹 Austria
  FMA: '🇦🇹',
  // 🇨🇭 Switzerland
  FINMA: '🇨🇭', VQF: '🇨🇭', SRO: '🇨🇭', AMLA: '🇨🇭',
  // 🇱🇮 Liechtenstein
  TVTG: '🇱🇮', 'TVTG Token Issuer': '🇱🇮', 'DLT framework': '🇱🇮',
  // 🇬🇧 UK
  FCA: '🇬🇧', CASS: '🇬🇧',
  'Cryptoasset registration': '🇬🇧',
  'Crypto Custody licence': '🇬🇧', 'Crypto Custody registration': '🇬🇧',
  // 🇺🇸 USA (overrides for terms whose `category` is `intl` or otherwise)
  NYDFS: '🇺🇸', BitLicense: '🇺🇸',
  'NY Trust Charter': '🇺🇸', 'South Dakota Trust Charter': '🇺🇸',
  // 🇸🇬 Singapore
  MAS: '🇸🇬', DPT: '🇸🇬', MPI: '🇸🇬', SPI: '🇸🇬',
  // 🇭🇰 Hong Kong
  SFC: '🇭🇰', HKMA: '🇭🇰', AMLO: '🇭🇰', VATP: '🇭🇰',
  // 🇯🇵 Japan
  FSA: '🇯🇵', JVCEA: '🇯🇵',
  // 🇰🇷 South Korea
  FSC: '🇰🇷', KoFIU: '🇰🇷',
  // 🇦🇺 Australia
  ASIC: '🇦🇺', APRA: '🇦🇺', AUSTRAC: '🇦🇺', AFSL: '🇦🇺', DCE: '🇦🇺',
  // 🇮🇳 India
  'FIU-IND': '🇮🇳',
  // 🇦🇪 UAE
  VARA: '🇦🇪', DFSA: '🇦🇪',
  'DFSA licence': '🇦🇪', 'ADGM Financial Services': '🇦🇪',
  // 🇰🇾 Cayman / 🇧🇲 Bermuda
  CIMA: '🇰🇾',
  BMA: '🇧🇲',
  DABA: '🇧🇲', 'DABA Class F': '🇧🇲', 'DABA Class M': '🇧🇲', 'DABA Class T': '🇧🇲',
  // 🇨🇦 Canada
  FINTRAC: '🇨🇦', CSA: '🇨🇦', OSC: '🇨🇦', IIROC: '🇨🇦',
  // 🇧🇷 Brazil
  BCB: '🇧🇷', CVM: '🇧🇷', CMN: '🇧🇷',
  // 🇮🇱 Israel
  ISA: '🇮🇱', BoI: '🇮🇱', IMPA: '🇮🇱', CMISA: '🇮🇱',
  // 🇮🇩 Indonesia
  Bappebti: '🇮🇩', OJK: '🇮🇩', BI: '🇮🇩', PFAK: '🇮🇩',
  // 🇳🇬 Nigeria
  'SEC Nigeria': '🇳🇬', CBN: '🇳🇬', NFIU: '🇳🇬',
  DAOP: '🇳🇬', DACS: '🇳🇬', ARIP: '🇳🇬', NLRC: '🇳🇬',
  // 🇰🇪 Kenya
  CBK: '🇰🇪', CMA: '🇰🇪', BCLB: '🇰🇪',
  // 🇿🇦 South Africa
  FSCA: '🇿🇦', SARB: '🇿🇦', FIC: '🇿🇦',
  // 🌐 Global / FATF
  VASP: '🌐', FATF: '🌐', 'Travel Rule': '🌐',
  AML: '🌐', CFT: '🌐', KYC: '🌐', KYB: '🌐', SAR: '🌐',
};

function flagForTerm(term: { term: string; category?: string }): string | null {
  if (TERM_FLAGS[term.term]) return TERM_FLAGS[term.term];
  if (term.category === 'eu') return '🇪🇺';
  if (term.category === 'us') return '🇺🇸';
  return null;
}

const slugify = (term: string) =>
  term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface Props {
  /** When true, uses a denser layout suitable for a side drawer. */
  compact?: boolean;
  /** Optional scroll-container ref used to scroll to a term on jump. */
  scrollContainer?: HTMLElement | null;
}

/**
 * The 7 foundational meta-concepts — when shown in the glossary they get a
 * "⭐ Meta-concept" badge with a link to the rich /learn/concepts page.
 */
const META_CONCEPT_TERMS = new Set([
  'Regime', 'Licence', 'Regulator', 'Obligation',
  'Token type', 'Infrastructure', 'Doctrine',
]);

export default function GlossaryContent({ compact = false, scrollContainer }: Props) {
  const t = useTranslations('glossary');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  // Multi-select filters — each as a Set so reclicking a chip toggles it
  // out (same UX pattern as /usecases and /guides). Empty set = no filter
  // applied on that axis (shows everything). Multiple entries across the
  // same axis are OR-combined (match-any). The two axes are combined
  // with AND: a term must match at least one category AND at least one
  // topic (when non-empty sets are set).
  const [categories, setCategories] = useState<Set<string>>(() => new Set());
  const [topics, setTopics] = useState<Set<string>>(() => new Set());
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const toggleCategory = useCallback((cat: string) => {
    if (cat === 'all') { setCategories(new Set()); return; }
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  }, []);

  const toggleTopic = useCallback((tp: string) => {
    if (tp === 'all') { setTopics(new Set()); return; }
    setTopics((prev) => {
      const next = new Set(prev);
      if (next.has(tp)) next.delete(tp); else next.add(tp);
      return next;
    });
  }, []);

  const getDefinition = (term: typeof GLOSSARY_TERMS[number]) =>
    locale === 'fr' && term.definitionFr ? term.definitionFr : term.definition;

  const filtered = useMemo(() => {
    const catKeys = Array.from(categories);
    const topKeys = Array.from(topics);
    return GLOSSARY_TERMS.filter((term) => {
      const def = locale === 'fr' && term.definitionFr ? term.definitionFr : term.definition;
      const matchSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        def.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        catKeys.length === 0 || (term.category ? catKeys.includes(term.category) : false);
      const matchTopic =
        topKeys.length === 0 ||
        topKeys.some((tp) => {
          if (tp === 'meta') return META_CONCEPT_TERMS.has(term.term);
          return TERM_TOPICS[term.term] === tp;
        });
      return matchSearch && matchCategory && matchTopic;
    });
  }, [search, categories, topics, locale]);

  const termExists = (name: string) =>
    GLOSSARY_TERMS.some((g) => g.term.toLowerCase() === name.toLowerCase());

  const jumpToTerm = (name: string) => {
    setSearch('');
    setCategories(new Set());
    setTopics(new Set());
    const slug = slugify(name);
    setTimeout(() => {
      const el = document.getElementById(`term-${slug}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlighted(slug);
        setTimeout(() => setHighlighted(null), 2000);
      }
    }, 50);
  };

  useEffect(() => {
    if (compact) return; // no hash handling inside drawer
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash.startsWith('#term-')) {
      const slug = hash.slice(6);
      setTimeout(() => {
        const el = document.getElementById(`term-${slug}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlighted(slug);
          setTimeout(() => setHighlighted(null), 2000);
        }
      }, 200);
    }
  }, [compact]);

  void scrollContainer; // reserved for future use

  return (
    <div>
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          autoFocus={compact}
          className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Category filters — multi-select + toggle-on-reclick. 'All' chip
          is active when the set is empty and clears any selection. */}
      <div className="mb-2">
        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('filterByGeography')}</div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = cat === 'all' ? categories.size === 0 : categories.has(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                aria-pressed={isActive}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t(`categories.${cat}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic filters — multi-select + toggle-on-reclick. */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('filterByTopic')}</div>
        <div className="flex gap-1 flex-wrap">
          {TOPICS.map((tp) => {
            // The 'meta' filter is a special virtual topic that shows only the 7 meta-concepts.
            if (tp === 'meta') {
              const isActive = topics.has(tp);
              const label = locale === 'fr' ? 'Méta-concept' : 'Meta-concept';
              const tooltip = locale === 'fr'
                ? 'Les 7 méta-concepts fondamentaux — ouvrir leur fiche détaillée sur /learn/concepts.'
                : 'The 7 foundational meta-concepts — open the full breakdown on /learn/concepts.';
              return (
                <button
                  key={tp}
                  onClick={() => toggleTopic(tp)}
                  aria-pressed={isActive}
                  title={tooltip}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 border ${
                    isActive
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/40'
                  }`}
                >
                  <span>⭐</span>
                  {label}
                </button>
              );
            }
            const tooltip = tp === 'all'
              ? t('topicTooltips.all')
              : `${t(`topicTooltips.${tp}.question`)}\n\n${t(`topicTooltips.${tp}.examples`)}`;
            const isActive = tp === 'all' ? topics.size === 0 : topics.has(tp);
            const chipClass =
              tp === 'all'
                ? isActive
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
                : isActive
                  ? TOPIC_CHIP_ACTIVE[tp as Topic]
                  : TOPIC_CHIP_INACTIVE[tp as Topic];
            return (
              <button
                key={tp}
                onClick={() => toggleTopic(tp)}
                title={tooltip}
                aria-pressed={isActive}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 border ${chipClass}`}
              >
                {tp !== 'all' && <span>{TOPIC_ICONS[tp as Topic]}</span>}
                {t(`topics.${tp}`)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6" />

      {/* Terms grid */}
      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
        {filtered.map((term) => {
          const slug = slugify(term.term);
          const isHighlighted = highlighted === slug;
          const termTopic = TERM_TOPICS[term.term];
          const termScope = TERM_SCOPES[term.term];
          return (
            <div
              key={term.term}
              id={`term-${slug}`}
              className={`card transition-all ${compact ? 'p-3' : ''} ${isHighlighted ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {flagForTerm(term) && (
                  <span className="text-lg leading-none" aria-hidden="true">{flagForTerm(term)}</span>
                )}
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">{term.term}</h3>
                {termTopic && (() => {
                  const metaTerm = TOPIC_TO_META[termTopic];
                  const metaExists = termExists(metaTerm);
                  const baseClass = `px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 ${TOPIC_STYLES[termTopic]}`;
                  if (!metaExists) {
                    return (
                      <span className={baseClass}>
                        <span>{TOPIC_ICONS[termTopic]}</span>
                        <span>{t(`topics.${termTopic}`)}</span>
                      </span>
                    );
                  }
                  return (
                    <button
                      onClick={() => jumpToTerm(metaTerm)}
                      title={locale === 'fr' ? `Voir la définition de ${metaTerm}` : `See the ${metaTerm} definition`}
                      className={`${baseClass} cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-current transition-all`}
                    >
                      <span>{TOPIC_ICONS[termTopic]}</span>
                      <span>{t(`topics.${termTopic}`)}</span>
                    </button>
                  );
                })()}
                {termScope && (() => {
                  const scopeTerm = SCOPE_TO_TERM[termScope];
                  const scopeExists = termExists(scopeTerm);
                  const baseClass = `px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 ${SCOPE_STYLES[termScope]}`;
                  if (!scopeExists) {
                    return (
                      <span className={baseClass} title={t(`scopes.${termScope}.tooltip`)}>
                        <span>{SCOPE_ICONS[termScope]}</span>
                        <span>{t(`scopes.${termScope}.label`)}</span>
                      </span>
                    );
                  }
                  return (
                    <button
                      onClick={() => jumpToTerm(scopeTerm)}
                      title={locale === 'fr' ? `Voir la définition de ${scopeTerm}` : `See the ${scopeTerm} definition`}
                      className={`${baseClass} cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-current transition-all`}
                    >
                      <span>{SCOPE_ICONS[termScope]}</span>
                      <span>{t(`scopes.${termScope}.label`)}</span>
                    </button>
                  );
                })()}
                {term.xrplSpecific && <XRPLBadge />}
                {META_CONCEPT_TERMS.has(term.term) && (
                  <a
                    href={`/${locale}/learn/concepts`}
                    title={locale === 'fr'
                      ? 'Voir la fiche détaillée sur la page Concepts'
                      : 'See the full breakdown on the Concepts page'}
                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-900/60 transition-colors"
                  >
                    <span>⭐</span>
                    <span>{locale === 'fr' ? 'Méta-concept' : 'Meta-concept'}</span>
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{getDefinition(term)}</p>
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-gray-500">{t('relatedTerms')}:</span>
                  {term.relatedTerms.map((rt) => {
                    const exists = termExists(rt);
                    return exists ? (
                      <button
                        key={rt}
                        onClick={() => jumpToTerm(rt)}
                        className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                      >
                        {rt}
                      </button>
                    ) : (
                      <span
                        key={rt}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500"
                      >
                        {rt}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">{t('noResults')}</p>
      )}
    </div>
  );
}
