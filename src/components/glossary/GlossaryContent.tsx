'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { GLOSSARY_TERMS } from '@/data/glossary';
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

type Scope = 'local' | 'extra' | 'global';
const SCOPE_ICONS: Record<Scope, string> = { local: '📍', extra: '🌐', global: '🌍' };
const SCOPE_STYLES: Record<Scope, string> = {
  local: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  extra: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  global: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
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

const TERM_TOPICS: Record<string, Topic> = {
  CASP: 'licence', DASP: 'licence', PSAN: 'licence', EMI: 'licence',
  MSB: 'licence', MTL: 'licence', BitLicense: 'licence', VASP: 'licence',
  MiCA: 'regime', 'DLT Pilot Regime': 'regime', JONUM: 'regime',
  'Prospectus Regulation': 'regime', 'MiFID II': 'regime', PSD2: 'regime', PSD3: 'regime',
  BSA: 'regime', TVTG: 'regime', AMLO: 'regime', CASS: 'regime', AMLA: 'regime',
  AML: 'obligation', CFT: 'obligation', KYC: 'obligation', KYB: 'obligation',
  'Travel Rule': 'obligation', SAR: 'obligation',
  EMT: 'token', ART: 'token', 'S-EMT': 'token', 'S-ART': 'token',
  STO: 'token', ICO: 'token', ITO: 'token', RWA: 'token', NFT: 'token',
  DPT: 'token', RLUSD: 'token', MPT: 'token',
  AMF: 'regulator', ESMA: 'regulator', NCA: 'regulator', ANJ: 'regulator',
  SREN: 'regime',
  FinCEN: 'regulator', OFAC: 'regulator',
  FATF: 'regulator', FINMA: 'regulator', VQF: 'regulator', SRO: 'regulator',
  MAS: 'regulator', SFC: 'regulator', HKMA: 'regulator',
  FCA: 'regulator', VARA: 'regulator',
  'Howey Test': 'doctrine',
  TradFi: 'infra', CeFi: 'infra', DeFi: 'infra', DAO: 'infra',
  'Smart Contract': 'infra', DLT: 'infra',
  'Trust Line': 'infra', IOU: 'infra', Escrow: 'infra', 'Payment Channel': 'infra',
  'XLS-20': 'infra', 'XLS-33': 'infra', AMM: 'infra', SignerList: 'infra',
  'Regular Key': 'infra', MPC: 'infra', TSS: 'infra',
  rippling: 'infra', freeze: 'infra', globalFreeze: 'infra',
  RequireAuth: 'infra', lsfLocked: 'infra',
};

const TERM_FLAGS: Record<string, string> = {
  FINMA: '🇨🇭', VQF: '🇨🇭', SRO: '🇨🇭', AMLA: '🇨🇭',
  MAS: '🇸🇬', DPT: '🇸🇬',
  SFC: '🇭🇰', HKMA: '🇭🇰', AMLO: '🇭🇰',
  FCA: '🇬🇧', CASS: '🇬🇧',
  VARA: '🇦🇪',
  TVTG: '🇱🇮',
  VASP: '🌐', FATF: '🌐', 'Travel Rule': '🌐',
  AML: '🌐', CFT: '🌐', KYC: '🌐', KYB: '🌐',
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
 * "⭐ Meta-concept" badge with a link to the rich /understand/concepts page.
 */
const META_CONCEPT_TERMS = new Set([
  'Regime', 'Licence', 'Regulator', 'Obligation',
  'Token type', 'Infrastructure', 'Doctrine',
]);

export default function GlossaryContent({ compact = false, scrollContainer }: Props) {
  const t = useTranslations('glossary');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [topic, setTopic] = useState<string>('all');
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const getDefinition = (term: typeof GLOSSARY_TERMS[number]) =>
    locale === 'fr' && term.definitionFr ? term.definitionFr : term.definition;

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const def = locale === 'fr' && term.definitionFr ? term.definitionFr : term.definition;
      const matchSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        def.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || term.category === category;
      const matchTopic =
        topic === 'all' ||
        (topic === 'meta' && META_CONCEPT_TERMS.has(term.term)) ||
        TERM_TOPICS[term.term] === topic;
      return matchSearch && matchCategory && matchTopic;
    });
  }, [search, category, topic, locale]);

  const termExists = (name: string) =>
    GLOSSARY_TERMS.some((g) => g.term.toLowerCase() === name.toLowerCase());

  const jumpToTerm = (name: string) => {
    setSearch('');
    setCategory('all');
    setTopic('all');
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

      {/* Category filters */}
      <div className="mb-2">
        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('filterByGeography')}</div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                category === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Topic filters */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('filterByTopic')}</div>
        <div className="flex gap-1 flex-wrap">
          {TOPICS.map((tp) => {
            // The 'meta' filter is a special virtual topic that shows only the 7 meta-concepts.
            if (tp === 'meta') {
              const label = locale === 'fr' ? 'Méta-concept' : 'Meta-concept';
              const tooltip = locale === 'fr'
                ? 'Les 7 méta-concepts fondamentaux — ouvrir leur fiche détaillée sur /understand/concepts.'
                : 'The 7 foundational meta-concepts — open the full breakdown on /understand/concepts.';
              return (
                <button
                  key={tp}
                  onClick={() => setTopic(tp)}
                  title={tooltip}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 border ${
                    topic === tp
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
            return (
              <button
                key={tp}
                onClick={() => setTopic(tp)}
                title={tooltip}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 ${
                  topic === tp
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
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
                {termTopic && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 ${TOPIC_STYLES[termTopic]}`}>
                    <span>{TOPIC_ICONS[termTopic]}</span>
                    <span>{t(`topics.${termTopic}`)}</span>
                  </span>
                )}
                {termScope && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 ${SCOPE_STYLES[termScope]}`}
                    title={t(`scopes.${termScope}.tooltip`)}
                  >
                    <span>{SCOPE_ICONS[termScope]}</span>
                    <span>{t(`scopes.${termScope}.label`)}</span>
                  </span>
                )}
                {term.xrplSpecific && <XRPLBadge />}
                {META_CONCEPT_TERMS.has(term.term) && (
                  <a
                    href={`/${locale}/understand/concepts`}
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
