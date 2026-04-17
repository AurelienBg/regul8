'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { GLOSSARY_TERMS } from '@/data/glossary';
import XRPLBadge from '@/components/ui/XRPLBadge';

const CATEGORIES = ['all', 'eu', 'us', 'intl', 'general', 'xrpl'] as const;

type Topic = 'licence' | 'regime' | 'obligation' | 'token' | 'regulator' | 'concept' | 'infra';
const TOPICS = ['all', 'licence', 'regime', 'obligation', 'token', 'regulator', 'concept', 'infra'] as const;

type Scope = 'local' | 'extra' | 'global';
const SCOPE_ICONS: Record<Scope, string> = {
  local: '📍',
  extra: '🌐',
  global: '🌍',
};
const SCOPE_STYLES: Record<Scope, string> = {
  local: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  extra: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  global: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
};

// Scope mapping for each term that has a clear applicability rule.
// local = only if you operate physically in that jurisdiction
// extra = applies based on users served, even if you're elsewhere
// global = international standard adopted everywhere
const TERM_SCOPES: Record<string, Scope> = {
  // Local (territorial only)
  BitLicense: 'local',
  MTL: 'local',
  PSAN: 'local',
  VARA: 'local',
  // Extraterritorial (most crypto regulations)
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
  // Global standards (adopted worldwide)
  FATF: 'global', 'Travel Rule': 'global',
  AML: 'global', CFT: 'global', KYC: 'global', KYB: 'global',
  VASP: 'global',
};

const TOPIC_ICONS: Record<Topic, string> = {
  licence: '🪪',
  regime: '📜',
  obligation: '✅',
  token: '🪙',
  regulator: '🏛️',
  concept: '💡',
  infra: '🔧',
};

const TOPIC_STYLES: Record<Topic, string> = {
  licence: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  regime: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  obligation: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  token: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  regulator: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  concept: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200',
  infra: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

// Each term's "angle"
const TERM_TOPICS: Record<string, Topic> = {
  // Licences
  CASP: 'licence', DASP: 'licence', PSAN: 'licence', EMI: 'licence',
  MSB: 'licence', MTL: 'licence', BitLicense: 'licence', VASP: 'licence',
  // Regimes (laws/frameworks themselves)
  MiCA: 'regime', 'DLT Pilot Regime': 'regime', JONUM: 'regime',
  'Prospectus Regulation': 'regime', 'MiFID II': 'regime', PSD2: 'regime', PSD3: 'regime',
  BSA: 'regime', TVTG: 'regime', AMLO: 'regime', CASS: 'regime', AMLA: 'regime',
  // Obligations / duties
  AML: 'obligation', CFT: 'obligation', KYC: 'obligation', KYB: 'obligation',
  'Travel Rule': 'obligation', SAR: 'obligation',
  // Token types
  EMT: 'token', ART: 'token', 'S-EMT': 'token', 'S-ART': 'token',
  STO: 'token', ICO: 'token', ITO: 'token', RWA: 'token', NFT: 'token',
  DPT: 'token', RLUSD: 'token', MPT: 'token',
  // Regulators / supervisors
  AMF: 'regulator', ESMA: 'regulator', NCA: 'regulator',
  FinCEN: 'regulator', OFAC: 'regulator',
  FATF: 'regulator', FINMA: 'regulator', VQF: 'regulator', SRO: 'regulator',
  MAS: 'regulator', SFC: 'regulator', HKMA: 'regulator',
  FCA: 'regulator', VARA: 'regulator',
  // Concepts / theoretical tests
  'Howey Test': 'concept',
  // Infrastructure / technical primitives
  TradFi: 'infra', CeFi: 'infra', DeFi: 'infra', DAO: 'infra',
  'Smart Contract': 'infra', DLT: 'infra',
  'Trust Line': 'infra', IOU: 'infra', Escrow: 'infra', 'Payment Channel': 'infra',
  'XLS-20': 'infra', 'XLS-33': 'infra', AMM: 'infra', SignerList: 'infra',
  'Regular Key': 'infra', MPC: 'infra', TSS: 'infra',
  rippling: 'infra', freeze: 'infra', globalFreeze: 'infra',
  RequireAuth: 'infra', lsfLocked: 'infra',
};

const slugify = (term: string) =>
  term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Term-specific flag overrides (for intl category, a term maps to a specific jurisdiction)
const TERM_FLAGS: Record<string, string> = {
  // Switzerland
  FINMA: '🇨🇭', VQF: '🇨🇭', SRO: '🇨🇭', AMLA: '🇨🇭',
  // Singapore
  MAS: '🇸🇬', DPT: '🇸🇬',
  // Hong Kong
  SFC: '🇭🇰', HKMA: '🇭🇰', AMLO: '🇭🇰',
  // UK
  FCA: '🇬🇧', CASS: '🇬🇧',
  // UAE
  VARA: '🇦🇪',
  // Liechtenstein
  TVTG: '🇱🇮',
  // Global bodies — no flag
  VASP: '🌐', FATF: '🌐', 'Travel Rule': '🌐',
  AML: '🌐', CFT: '🌐', KYC: '🌐', KYB: '🌐',
};

function flagForTerm(term: { term: string; category?: string }): string | null {
  if (TERM_FLAGS[term.term]) return TERM_FLAGS[term.term];
  if (term.category === 'eu') return '🇪🇺';
  if (term.category === 'us') return '🇺🇸';
  return null;
}

export default function GlossaryPage() {
  const t = useTranslations('glossary');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [topic, setTopic] = useState<string>('all');
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);

  const getDefinition = (term: typeof GLOSSARY_TERMS[number]) =>
    locale === 'fr' && term.definitionFr ? term.definitionFr : term.definition;

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const def = locale === 'fr' && term.definitionFr ? term.definitionFr : term.definition;
      const matchSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        def.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || term.category === category;
      const matchTopic = topic === 'all' || TERM_TOPICS[term.term] === topic;
      return matchSearch && matchCategory && matchTopic;
    });
  }, [search, category, topic, locale]);

  const termExists = (name: string) =>
    GLOSSARY_TERMS.some((g) => g.term.toLowerCase() === name.toLowerCase());

  const jumpToTerm = (name: string) => {
    // Clear filters so target is visible
    setSearch('');
    setCategory('all');
    const slug = slugify(name);
    // Let React render, then scroll
    setTimeout(() => {
      const el = document.getElementById(`term-${slug}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlighted(slug);
        setTimeout(() => setHighlighted(null), 2000);
      }
    }, 50);
  };

  // Handle hash on load (e.g. /glossary#term-casp)
  useEffect(() => {
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
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

      {/* Legend (collapsible) */}
      <div className="mb-6 rounded-lg border border-[var(--border)] bg-gray-50 dark:bg-gray-900/50">
        <button
          onClick={() => setLegendOpen(!legendOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-2">
            <span>💡</span>
            <span>{t('legend.title')}</span>
          </span>
          <span className={`transition-transform ${legendOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {legendOpen && (
          <div className="px-4 pb-4 pt-1 text-xs text-gray-700 dark:text-gray-300 space-y-3 border-t border-[var(--border)]">
            <div>
              <div className="font-semibold mb-1 mt-2">🏳️ {t('legend.flagsTitle')}</div>
              <p className="text-gray-600 dark:text-gray-400">{t('legend.flagsBody')}</p>
            </div>
            <div>
              <div className="font-semibold mb-1">🎯 {t('legend.topicsTitle')}</div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{t('legend.topicsBody')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(['licence','regime','obligation','token','regulator','concept','infra'] as Topic[]).map((tp) => (
                  <span key={tp} className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 ${TOPIC_STYLES[tp]}`}>
                    <span>{TOPIC_ICONS[tp]}</span>
                    <span>{t(`topics.${tp}`)}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">📏 {t('legend.scopesTitle')}</div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{t('legend.scopesBody')}</p>
              <div className="space-y-1.5">
                {(['local', 'extra', 'global'] as Scope[]).map((sc) => (
                  <div key={sc} className="flex items-start gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 mt-0.5 ${SCOPE_STYLES[sc]}`}>
                      <span>{SCOPE_ICONS[sc]}</span>
                      <span>{t(`scopes.${sc}.label`)}</span>
                    </span>
                    <span className="flex-1 text-gray-600 dark:text-gray-400">{t(`scopes.${sc}.explanation`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Filters — categories (geography) */}
      <div className="mb-2">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t('filterByGeography')}
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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

      {/* Filters — topics (angles) */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t('filterByTopic')}
        </div>
        <div className="flex gap-1 flex-wrap">
          {TOPICS.map((tp) => (
            <button
              key={tp}
              onClick={() => setTopic(tp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                topic === tp
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tp !== 'all' && <span>{TOPIC_ICONS[tp as Topic]}</span>}
              {t(`topics.${tp}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Terms grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((term) => {
          const slug = slugify(term.term);
          const isHighlighted = highlighted === slug;
          const termTopic = TERM_TOPICS[term.term];
          return (
            <div
              key={term.term}
              id={`term-${slug}`}
              className={`card transition-all ${
                isHighlighted ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
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
                {TERM_SCOPES[term.term] && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5 ${SCOPE_STYLES[TERM_SCOPES[term.term]]}`}
                    title={t(`scopes.${TERM_SCOPES[term.term]}.tooltip`)}
                  >
                    <span>{SCOPE_ICONS[TERM_SCOPES[term.term]]}</span>
                    <span>{t(`scopes.${TERM_SCOPES[term.term]}.label`)}</span>
                  </span>
                )}
                {term.xrplSpecific && <XRPLBadge />}
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
        <p className="text-center text-gray-500 py-12">No terms found.</p>
      )}

      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
