'use client';

import { useLocale, useTranslations } from 'next-intl';
import GlossaryContent from '@/components/glossary/GlossaryContent';
import { TOPIC_META } from '@/data/term-topics';

export default function GlossaryPage() {
  const t = useTranslations('glossary');
  const tc = useTranslations('common');
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

      {/* Narrative intro — same flow sentences as /understand/categories */}
      <section className="mb-6 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900 space-y-3">
        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
          {isFr ? (
            <>
              <span className="inline-flex items-center gap-1 font-semibold">🏢 Une startup</span> détient des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.licence.pillClass}`}>{TOPIC_META.licence.icon} Licences</span>{' '}
              exigées par des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regime.pillClass}`}>{TOPIC_META.regime.icon} Régimes</span>,{' '}
              délivrées par des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regulator.pillClass}`}>{TOPIC_META.regulator.icon} Régulateurs</span>{' '}
              qui imposent des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.obligation.pillClass}`}>{TOPIC_META.obligation.icon} Obligations</span>{' '}
              continues.
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 font-semibold">🏢 A startup</span> holds{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.licence.pillClass}`}>{TOPIC_META.licence.icon} Licences</span>{' '}
              required by{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regime.pillClass}`}>{TOPIC_META.regime.icon} Regimes</span>,{' '}
              granted by{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regulator.pillClass}`}>{TOPIC_META.regulator.icon} Regulators</span>{' '}
              who impose ongoing{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.obligation.pillClass}`}>{TOPIC_META.obligation.icon} Obligations</span>.
            </>
          )}
        </p>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {isFr ? (
            <>
              Trois concepts transverses complètent le tableau : la classification du{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.token.pillClass}`}>{TOPIC_META.token.icon} Type de token</span>{' '}
              détermine <em>quel</em> régime s&apos;applique, l&apos;{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.infra.pillClass}`}>{TOPIC_META.infra.icon} Infrastructure</span>{' '}
              technique (DeFi, custody, XRPL primitives…) façonne <em>comment</em> il s&apos;applique, et la{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.doctrine.pillClass}`}>{TOPIC_META.doctrine.icon} Doctrine</span>{' '}
              juridique (Howey Test, jurisprudence) tranche les zones grises.
            </>
          ) : (
            <>
              Three cross-cutting concepts complete the picture: the{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.token.pillClass}`}>{TOPIC_META.token.icon} Token type</span>{' '}
              classification determines <em>which</em> regime applies, the technical{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.infra.pillClass}`}>{TOPIC_META.infra.icon} Infrastructure</span>{' '}
              (DeFi, custody, XRPL primitives…) shapes <em>how</em> it applies, and the legal{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.doctrine.pillClass}`}>{TOPIC_META.doctrine.icon} Doctrine</span>{' '}
              (Howey Test, case law) settles the grey zones.
            </>
          )}
        </p>
      </section>

      <GlossaryContent />
      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
