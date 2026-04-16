'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function SearchPage() {
  const t = useTranslations('search');
  const tc = useTranslations('common');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const examples = [t('examples.1'), t('examples.2'), t('examples.3'), t('examples.4')];

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setResponse('');
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
        signal: controller.signal,
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const { text } = JSON.parse(data);
            setResponse((prev) => prev + text);
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setResponse(tc('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>

      {/* Search input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder={t('placeholder')}
          className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => handleSearch(query)}
          disabled={loading || !query.trim()}
          className="btn-primary disabled:opacity-50"
        >
          {t('submit')}
        </button>
      </div>

      {/* Example prompts */}
      {!response && !loading && (
        <div className="space-y-2 mb-8">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => { setQuery(ex); handleSearch(ex); }}
              className="block w-full text-left px-4 py-3 rounded-lg border border-[var(--border)] text-sm text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && !response && (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">{t('thinking')}</span>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="card">
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {response}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
