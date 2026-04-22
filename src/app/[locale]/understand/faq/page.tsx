'use client';

import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FAQ_ENTRIES } from '@/data/faq';

export default function FaqPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'FAQ',
        subtitle: "Les questions les plus fréquentes sur la régulation crypto. Mêmes réponses que celles servies dans le drawer 💬 Ask anything.",
        jumpTitle: 'Aller à une question',
        disclaimer: 'Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.',
      }
    : {
        title: 'FAQ',
        subtitle: 'The most frequently asked questions on crypto regulation. Same answers served in the 💬 Ask anything drawer.',
        jumpTitle: 'Jump to the question',
        disclaimer: 'General information only. For your specific situation, consult a qualified lawyer.',
      };

  const mdComponents = {
    h1: (p: object) => <h3 className="text-base font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
    h2: (p: object) => <h4 className="text-sm font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...p} />,
    h3: (p: object) => <h5 className="text-sm font-bold mt-3 mb-1.5 text-gray-900 dark:text-gray-100" {...p} />,
    p: (p: object) => <p className="mb-3" {...p} />,
    ul: (p: object) => <ul className="list-disc ml-5 mb-3 space-y-1" {...p} />,
    ol: (p: object) => <ol className="list-decimal ml-5 mb-3 space-y-1" {...p} />,
    li: (p: object) => <li className="leading-relaxed" {...p} />,
    strong: (p: object) => <strong className="font-semibold text-gray-900 dark:text-gray-100" {...p} />,
    em: (p: object) => <em className="italic" {...p} />,
    code: (p: object) => <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs" {...p} />,
    a: (p: object) => <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...p} />,
    hr: () => <hr className="my-4 border-gray-200 dark:border-gray-700" />,
    table: (p: object) => <table className="w-full text-sm my-3 border-collapse" {...p} />,
    thead: (p: object) => <thead className="bg-gray-100 dark:bg-gray-800" {...p} />,
    th: (p: object) => <th className="text-left p-2 border border-gray-200 dark:border-gray-700 font-semibold" {...p} />,
    td: (p: object) => <td className="p-2 border border-gray-200 dark:border-gray-700 align-top" {...p} />,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">❓</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">{tr.subtitle}</p>
      </header>

      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
        {/* Sticky ToC (desktop only) */}
        <aside className="hidden lg:block">
          <div className="sticky top-36">
            <div className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-5 pb-2 border-b border-[var(--border)]">
              {tr.jumpTitle}
            </div>
            <nav className="space-y-1 text-sm">
              {FAQ_ENTRIES.map((entry) => {
                const q = isFr ? entry.question.fr : entry.question.en;
                return (
                  <a
                    key={entry.id}
                    href={`#${entry.id}`}
                    className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug py-1"
                  >
                    {q}
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* FAQ content — flat long-form */}
        <div>
          {FAQ_ENTRIES.map((entry, idx) => {
            const question = isFr ? entry.question.fr : entry.question.en;
            const answer = isFr ? entry.answer.fr : entry.answer.en;
            const isFirst = idx === 0;
            return (
              <section
                key={entry.id}
                id={entry.id}
                className={`scroll-mt-32 ${isFirst ? '' : 'border-t border-[var(--border)] pt-8 mt-8'}`}
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {question}
                </h2>
                <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {answer}
                  </ReactMarkdown>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <p className="mt-12 text-xs text-gray-500 text-center italic">{tr.disclaimer}</p>
    </div>
  );
}
