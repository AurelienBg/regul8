'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { matchFaq } from '@/data/faq';
import { matchGlossaryQuery } from '@/data/glossary';
import type { GlossaryTerm } from '@/types';
import { TERM_TOPICS, TOPIC_META } from '@/data/term-topics';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Source = 'faq' | 'glossary' | 'ai';

type Message =
  | { id: string; role: 'user'; text: string }
  | {
      id: string;
      role: 'assistant';
      text: string;
      source: Source;
      glossaryTerm?: GlossaryTerm;
    };

function slugify(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * Slide-in right chat drawer. Three-layer answering:
 *   1. FAQ exact match (instant)
 *   2. Glossary term match (instant, rich card)
 *   3. AI streaming fallback
 *
 * Conversation history is kept in-memory for the whole session (survives
 * drawer close/reopen as long as the tab stays open). 'Clear' button
 * resets it manually.
 */
export default function AskDrawer({ open, onClose }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const tr = isFr
    ? {
        title: 'Poser une question',
        placeholder: 'Votre question réglementaire…',
        submit: 'Envoyer',
        thinking: 'Analyse en cours…',
        close: 'Fermer',
        clear: 'Effacer',
        emptyTitle: 'Posez n’importe quelle question sur la régulation crypto',
        emptyHint:
          'Les réponses aux termes et aux questions fréquentes sont instantanées (glossaire + FAQ). Les autres questions sont envoyées à l’IA contextuelle.',
        fromFaq: 'FAQ',
        fromGlossary: 'Glossaire',
        fromAi: 'IA',
        viewInGlossary: 'Voir la fiche complète',
        related: 'Termes liés',
        disclaimer:
          'Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.',
      }
    : {
        title: 'Ask anything',
        placeholder: 'Your regulatory question…',
        submit: 'Send',
        thinking: 'Thinking…',
        close: 'Close',
        clear: 'Clear',
        emptyTitle: 'Ask anything about crypto regulation',
        emptyHint:
          'Term lookups and common questions are answered instantly (glossary + FAQ). Other questions go to the contextual AI.',
        fromFaq: 'FAQ',
        fromGlossary: 'Glossary',
        fromAi: 'AI',
        viewInGlossary: 'View full entry',
        related: 'Related',
        disclaimer:
          'General information only. For your specific situation, consult a qualified lawyer.',
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

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Abort any in-flight request when closing (but keep history)
  useEffect(() => {
    if (!open && abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      setLoading(false);
    }
  }, [open]);

  // Auto-scroll to bottom on new message / streaming
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  const handleClear = () => {
    abortRef.current?.abort();
    setMessages([]);
    setQuery('');
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const appendUser = (text: string) => {
    const id = `u-${Date.now()}`;
    setMessages((prev) => [...prev, { id, role: 'user', text }]);
  };

  const appendAssistant = (
    partial: Omit<Extract<Message, { role: 'assistant' }>, 'id' | 'role'>,
  ): string => {
    const id = `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setMessages((prev) => [...prev, { id, role: 'assistant', ...partial }]);
    return id;
  };

  const appendAssistantChunk = (id: string, chunk: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id && m.role === 'assistant' ? { ...m, text: m.text + chunk } : m)),
    );
  };

  const handleSearch = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || loading) return;

    appendUser(trimmed);
    setQuery('');

    // 1) FAQ — instant
    const faq = matchFaq(trimmed);
    if (faq) {
      appendAssistant({
        text: isFr ? faq.answer.fr : faq.answer.en,
        source: 'faq',
      });
      return;
    }

    // 2) Glossary — instant
    const term = matchGlossaryQuery(trimmed);
    if (term) {
      const def = isFr && term.definitionFr ? term.definitionFr : term.definition;
      appendAssistant({
        text: def,
        source: 'glossary',
        glossaryTerm: term,
      });
      return;
    }

    // 3) AI streaming
    const aiId = appendAssistant({ text: '', source: 'ai' });
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
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
        appendAssistantChunk(aiId, `Error: ${msg}`);
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
              appendAssistantChunk(aiId, `\n\n⚠️ Error: ${parsed.error}`);
            } else if (parsed.text) {
              appendAssistantChunk(aiId, parsed.text);
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const msg = err instanceof Error ? err.message : 'Unknown error';
      appendAssistantChunk(aiId, `Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const mdComponents = {
    h1: (p: object) => <h3 className="text-base font-bold mt-3 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
    h2: (p: object) => <h4 className="text-sm font-bold mt-3 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
    h3: (p: object) => <h5 className="text-sm font-bold mt-2 mb-1.5 text-gray-900 dark:text-gray-100" {...p} />,
    p: (p: object) => <p className="mb-2" {...p} />,
    ul: (p: object) => <ul className="list-disc ml-5 mb-2 space-y-1" {...p} />,
    ol: (p: object) => <ol className="list-decimal ml-5 mb-2 space-y-1" {...p} />,
    li: (p: object) => <li className="leading-relaxed" {...p} />,
    strong: (p: object) => <strong className="font-semibold text-gray-900 dark:text-gray-100" {...p} />,
    em: (p: object) => <em className="italic" {...p} />,
    code: (p: object) => <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs" {...p} />,
    a: (p: object) => <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...p} />,
    hr: () => <hr className="my-3 border-gray-200 dark:border-gray-700" />,
    table: (p: object) => <table className="w-full text-xs my-2 border-collapse" {...p} />,
    thead: (p: object) => <thead className="bg-gray-100 dark:bg-gray-800" {...p} />,
    th: (p: object) => <th className="text-left p-2 border border-gray-200 dark:border-gray-700 font-semibold" {...p} />,
    td: (p: object) => <td className="p-2 border border-gray-200 dark:border-gray-700 align-top" {...p} />,
  };

  const sourceBadge = (s: Source) => {
    if (s === 'faq') return { icon: '📚', label: tr.fromFaq, cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' };
    if (s === 'glossary') return { icon: '📖', label: tr.fromGlossary, cls: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200' };
    return { icon: '🤖', label: tr.fromAi, cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' };
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
        className={`fixed top-0 right-0 h-full w-full sm:max-w-sm md:max-w-md z-50 bg-[var(--background)] border-l border-[var(--border)] shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <h2 className="font-bold">{tr.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title={tr.clear}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V3a1 1 0 011-1h4a1 1 0 011 1v4" />
                </svg>
                <span className="hidden sm:inline">{tr.clear}</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label={tr.close}
              className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conversation (scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12 text-gray-500 dark:text-gray-400">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {tr.emptyTitle}
              </p>
              <p className="text-xs max-w-xs leading-relaxed">{tr.emptyHint}</p>
            </div>
          )}

          {messages.map((m) => {
            if (m.role === 'user') {
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-blue-600 text-white text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {m.text}
                  </div>
                </div>
              );
            }

            // assistant
            const badge = sourceBadge(m.source);

            // Glossary: render rich card with pill + related + view-full link
            if (m.source === 'glossary' && m.glossaryTerm) {
              const topic = TERM_TOPICS[m.glossaryTerm.term];
              const topicMeta = topic ? TOPIC_META[topic] : null;
              const slug = slugify(m.glossaryTerm.term);
              return (
                <div key={m.id} className="flex">
                  <div className="max-w-[92%] w-full px-4 py-3 rounded-2xl rounded-bl-sm bg-[var(--card)] border border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${badge.cls}`}>
                        <span>{badge.icon}</span>
                        <span>{badge.label}</span>
                      </span>
                      <h3 className="font-bold text-blue-600 dark:text-blue-400">{m.glossaryTerm.term}</h3>
                      {topicMeta && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${topicMeta.pillClass}`}>
                          {topicMeta.icon} {isFr ? topicMeta.labelFr : topicMeta.labelEn}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                      {m.text}
                    </p>
                    {m.glossaryTerm.relatedTerms && m.glossaryTerm.relatedTerms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        <span className="text-xs text-gray-500">{tr.related}:</span>
                        {m.glossaryTerm.relatedTerms.map((rt) => (
                          <button
                            key={rt}
                            onClick={() => handleSearch(isFr ? `c'est quoi ${rt}` : `what is ${rt}`)}
                            className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                          >
                            {rt}
                          </button>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/learn/glossary#term-${slug}`}
                      onClick={onClose}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {tr.viewInGlossary} &rarr;
                    </Link>
                  </div>
                </div>
              );
            }

            // FAQ or AI: markdown content in a rounded card
            return (
              <div key={m.id} className="flex">
                <div className="max-w-[92%] w-full px-4 py-3 rounded-2xl rounded-bl-sm bg-[var(--card)] border border-[var(--border)]">
                  <div className="mb-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold self-start"
                    style={{}}
                  >
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${badge.cls}`}>
                      <span>{badge.icon}</span>
                      <span>{badge.label}</span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {m.text ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                        {m.text}
                      </ReactMarkdown>
                    ) : (
                      loading && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs italic">{tr.thinking}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={scrollEndRef} />
        </div>

        {/* Input bar (fixed at bottom) */}
        <div className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-3">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder={tr.placeholder}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSearch(query)}
              disabled={loading || !query.trim()}
              className="btn-primary disabled:opacity-40 text-sm px-4 whitespace-nowrap"
            >
              {tr.submit}
            </button>
          </div>
          <p className="text-[10px] text-gray-500 italic mt-2 leading-snug">{tr.disclaimer}</p>
        </div>
      </aside>
    </>
  );
}
