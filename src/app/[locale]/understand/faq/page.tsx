'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FAQ_ENTRIES } from '@/data/faq';

export default function FaqPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [openId, setOpenId] = useState<string | null>(null);

  const tr = isFr
    ? {
        title: 'FAQ',
        subtitle: "Les questions les plus fréquentes sur la régulation crypto. Réponses instantanées issues du socle de connaissances — mêmes réponses que celles servies dans le drawer 💬 Ask anything.",
        disclaimer: 'Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.',
      }
    : {
        title: 'FAQ',
        subtitle: 'The most frequently asked questions on crypto regulation. Instant answers from the knowledge base — same content as the 💬 Ask anything drawer.',
        disclaimer: 'General information only. For your specific situation, consult a qualified lawyer.',
      };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <div className="text-5xl mb-4">❓</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{tr.subtitle}</p>
      </header>

      <div className="space-y-3">
        {FAQ_ENTRIES.map((entry) => {
          const isOpen = openId === entry.id;
          const question = isFr ? entry.question.fr : entry.question.en;
          const answer = isFr ? entry.answer.fr : entry.answer.en;
          return (
            <div key={entry.id} className="rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : entry.id)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-gray-900 dark:text-gray-100">{question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[var(--border)] text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
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
                      table: (p) => <table className="w-full text-sm my-3 border-collapse" {...p} />,
                      thead: (p) => <thead className="bg-gray-100 dark:bg-gray-800" {...p} />,
                      th: (p) => <th className="text-left p-2 border border-gray-200 dark:border-gray-700 font-semibold" {...p} />,
                      td: (p) => <td className="p-2 border border-gray-200 dark:border-gray-700 align-top" {...p} />,
                    }}
                  >
                    {answer}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-gray-500 text-center italic">{tr.disclaimer}</p>
    </div>
  );
}
