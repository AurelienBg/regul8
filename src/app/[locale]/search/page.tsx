'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { matchFaq, FAQ_ENTRIES } from '@/data/faq';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SearchPage() {
  const t = useTranslations('search');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [fromFaq, setFromFaq] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Suggested prompts = the FAQ questions themselves (instant answers on click)
  const suggestions = FAQ_ENTRIES.map((f) => (locale === 'fr' ? f.question.fr : f.question.en));

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setResponse('');
    setFromFaq(false);

    // Try FAQ match first — instant, no API call
    const faq = matchFaq(q);
    if (faq) {
      const answer = locale === 'fr' ? faq.answer.fr : faq.answer.en;
      setResponse(answer);
      setFromFaq(true);
      return;
    }

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

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch {
          // not JSON
        }
        setResponse(`Error: ${msg}`);
        return;
      }

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
            const parsed = JSON.parse(data);
            if (parsed.error) {
              setResponse((prev) => prev + `\n\n⚠️ Error: ${parsed.error}`);
            } else if (parsed.text) {
              setResponse((prev) => prev + parsed.text);
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setResponse(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    abortRef.current?.abort();
    setQuery('');
    setResponse('');
    setFromFaq(false);
    setLoading(false);
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

      {/* Suggested questions (from FAQ — instant answers) */}
      {!response && !loading && (
        <div className="mb-8">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>📚</span>
            <span>{t('suggestedQuestions')}</span>
          </div>
          <div className="space-y-2">
            {suggestions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setQuery(q); handleSearch(q); }}
                className="block w-full text-left px-4 py-3 rounded-lg border border-[var(--border)] text-sm text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
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
        <>
          <div className="card">
            {fromFaq && (
              <div className="mb-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                <span>📚</span>
                <span>{t('fromKnowledgeBase')}</span>
              </div>
            )}
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: (p) => <h3 className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
                  h2: (p) => <h4 className="text-base font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
                  h3: (p) => <h5 className="text-sm font-bold mt-3 mb-1.5 text-gray-900 dark:text-gray-100" {...p} />,
                  p: (p) => <p className="mb-3" {...p} />,
                  ul: (p) => <ul className="list-disc ml-5 mb-3 space-y-1" {...p} />,
                  ol: (p) => <ol className="list-decimal ml-5 mb-3 space-y-1" {...p} />,
                  li: (p) => <li className="leading-relaxed" {...p} />,
                  strong: (p) => <strong className="font-semibold text-gray-900 dark:text-gray-100" {...p} />,
                  em: (p) => <em className="italic" {...p} />,
                  code: (p) => <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs" {...p} />,
                  a: (p) => <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...p} />,
                  hr: () => <hr className="my-4 border-gray-200 dark:border-gray-700" />,
                  table: (p) => <table className="w-full text-sm my-3 border-collapse" {...p} />,
                  thead: (p) => <thead className="bg-gray-100 dark:bg-gray-800" {...p} />,
                  th: (p) => <th className="text-left p-2 border border-gray-200 dark:border-gray-700 font-semibold" {...p} />,
                  td: (p) => <td className="p-2 border border-gray-200 dark:border-gray-700 align-top" {...p} />,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>

          {/* Return controls */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={handleReset} className="btn-primary text-sm">
              &larr; {t('askAnother')}
            </button>
          </div>
        </>
      )}

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
