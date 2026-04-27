'use client';

import { useLocale, useTranslations } from 'next-intl';
import GlossaryContent from '@/components/glossary/GlossaryContent';
import GlossaryLegend from '@/components/glossary/GlossaryLegend';
import ConceptsNarrative from '@/components/learn/ConceptsNarrative';

export default function GlossaryPage() {
  const t = useTranslations('glossary');
  const tc = useTranslations('common');
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">🔤</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{t('title')}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {isFr
            ? 'Cherchez n\'importe quel terme — 150+ acronymes, lois, régulateurs et primitives.'
            : 'Look up any term — 150+ acronyms, laws, regulators, and primitives.'}
        </p>
      </header>

      {/* Inline legend — open by default, explains flags / topics / scopes
          in 3 visual cards. Replaces the previous tiny text link out to
          /learn/concepts. The link is preserved at the bottom of the
          legend for users wanting the full deep-dive. */}
      <GlossaryLegend />

      {/* Narrative intro — clickable card linking to /learn/concepts */}
      <section className="mb-6 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900">
        <ConceptsNarrative variant="full" linkTo="/learn/concepts" />
      </section>

      <GlossaryContent />
      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
