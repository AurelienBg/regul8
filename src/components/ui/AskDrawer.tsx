'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-in right drawer for Ask AI. Pure AI Q&A — no FAQ matching,
 * no suggested questions. Click the FAB or press ⌘K to open.
 */
export default function AskDrawer({ open, onClose }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tr = isFr
    ? {
        title: 'Poser une question',
        placeholder: 'Votre question réglementaire…',
        submit: 'Demander',
        thinking: 'Analyse en cours…',
        askAnother: 'Nouvelle question',
        close: 'Fermer',
        disclaimer: 'Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.',
      }
    : {
        title: 'Ask anything',
        placeholder: 'Your regulatory question…',
        submit: 'Ask',
        thinking: 'Thinking…',
        askAnother: 'Ask another',
        close: 'Close',
        disclaimer: 'General information only. For your specific situation, consult a qualified lawyer.',
      };

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cancel any in-flight request when closing
  useEffect(() => {
    if (!open && abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, [open]);

  const handleReset = () => {
    abortRef.current?.abort();
    setQuery('');
    setResponse('');
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
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

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={tr.title}
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md md:max-w-lg z-50 bg-[var(--background)] border-l border-[var(--border)] shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <h2 className="font-bold">{tr.title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label={tr.close}
            className="inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden sm:inline">{tr.close}</span>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Input row */}
          <div className="flex gap-2 mb-5">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder={tr.placeholder}
              className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSearch(query)}
              disabled={loading || !query.trim()}
              className="btn-primary disabled:opacity-50 text-sm px-4"
            >
              {tr.submit}
            </button>
          </div>

          {/* Loading */}
          {loading && !response && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">{tr.thinking}</span>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className="card mb-4">
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (p) => <h3 className="text-base font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
                    h2: (p) => <h4 className="text-sm font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
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
                    table: (p) => <table className="w-full text-xs my-3 border-collapse" {...p} />,
                    thead: (p) => <thead className="bg-gray-100 dark:bg-gray-800" {...p} />,
                    th: (p) => <th className="text-left p-2 border border-gray-200 dark:border-gray-700 font-semibold" {...p} />,
                    td: (p) => <td className="p-2 border border-gray-200 dark:border-gray-700 align-top" {...p} />,
                  }}
                >
                  {response}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {response && !loading && (
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              &larr; {tr.askAnother}
            </button>
          )}
        </div>

        {/* Footer disclaimer */}
        <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--card)]">
          <p className="text-[11px] text-gray-500 italic">{tr.disclaimer}</p>
        </div>
      </aside>
    </>
  );
}
