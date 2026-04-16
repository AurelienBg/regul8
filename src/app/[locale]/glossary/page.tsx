'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { GLOSSARY_TERMS } from '@/data/glossary';
import XRPLBadge from '@/components/ui/XRPLBadge';

const CATEGORIES = ['all', 'eu', 'us', 'intl', 'general', 'xrpl'] as const;

export default function GlossaryPage() {
  const t = useTranslations('glossary');
  const tc = useTranslations('common');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || term.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

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
        {filtered.map((term) => (
          <div key={term.term} className="card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">{term.term}</h3>
              {term.xrplSpecific && <XRPLBadge />}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{term.definition}</p>
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="text-xs text-gray-500">{t('relatedTerms')}:</span>
                {term.relatedTerms.map((rt) => (
                  <span key={rt} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {rt}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">No terms found.</p>
      )}

      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
