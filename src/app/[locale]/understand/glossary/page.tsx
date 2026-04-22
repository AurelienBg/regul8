'use client';

import { useLocale, useTranslations } from 'next-intl';
import GlossaryContent from '@/components/glossary/GlossaryContent';
import ConceptsNarrative from '@/components/understand/ConceptsNarrative';

export default function GlossaryPage() {
  const t = useTranslations('glossary');
  const tc = useTranslations('common');
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-1">{t('title')}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        🔍 {isFr
          ? 'Cherchez n\'importe quel terme — 120+ acronymes, lois, régulateurs et primitives.'
          : 'Look up any term — 120+ acronyms, laws, regulators, and primitives.'}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
        <a
          href={`/${locale}/understand/concepts`}
          className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ❓ {isFr
            ? 'Que signifient ces topics, drapeaux, et portées ? → Concepts'
            : 'What do these topics, flags, and scopes mean? → Concepts'}
        </a>
      </p>

      {/* Narrative intro — clickable card linking to /understand/concepts */}
      <section className="mb-6 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900">
        <ConceptsNarrative variant="full" linkTo="/understand/concepts" />
      </section>

      <GlossaryContent />
      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
