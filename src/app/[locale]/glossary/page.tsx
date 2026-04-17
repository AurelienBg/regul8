'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { GLOSSARY_TERMS } from '@/data/glossary';
import XRPLBadge from '@/components/ui/XRPLBadge';

const CATEGORIES = ['all', 'eu', 'us', 'intl', 'general', 'xrpl'] as const;

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
      return matchSearch && matchCategory;
    });
  }, [search, category, locale]);

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
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:border-blue-500"
        />
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

      {/* Terms grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((term) => {
          const slug = slugify(term.term);
          const isHighlighted = highlighted === slug;
          return (
            <div
              key={term.term}
              id={`term-${slug}`}
              className={`card transition-all ${
                isHighlighted ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {flagForTerm(term) && (
                  <span className="text-lg leading-none" aria-hidden="true">{flagForTerm(term)}</span>
                )}
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">{term.term}</h3>
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
