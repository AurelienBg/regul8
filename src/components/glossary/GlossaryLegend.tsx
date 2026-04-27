'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { TOPIC_META, type Topic } from '@/data/term-topics';

/**
 * Visual legend explaining the 3 cross-cutting dimensions used across
 * the glossary: country FLAGS (where), TOPICS (what kind of thing the
 * term is), and SCOPES (when the regulation applies to you).
 *
 * Open by default — the legend is the user's first cognitive aid for
 * navigating a 160+ term glossary, so hiding it behind a toggle defeats
 * the purpose. The collapse button is provided for users who already
 * know the system.
 */

const TOPIC_ORDER: Topic[] = ['licence', 'regime', 'regulator', 'obligation', 'token', 'doctrine', 'infra'];

export default function GlossaryLegend() {
  const t = useTranslations('glossary');
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [open, setOpen] = useState(true);

  return (
    <section className="mb-6 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-900/10">
      {/* Header — always visible, big toggle button on the right */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">📖</span>
          <span className="font-bold text-sm">
            {t('legend.title')}
          </span>
        </div>
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="grid md:grid-cols-3 gap-3 px-4 pb-4">
          {/* Flags card */}
          <div className="p-4 rounded-lg bg-white dark:bg-gray-900/60 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏳️</span>
              <span className="font-bold text-sm">{t('legend.flagsTitle')}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t('legend.flagsBody')}
            </p>
            <div className="flex flex-wrap gap-1 text-base">
              <span title="EU">🇪🇺</span>
              <span title="USA">🇺🇸</span>
              <span title="Singapore">🇸🇬</span>
              <span title="UK">🇬🇧</span>
              <span title="UAE">🇦🇪</span>
              <span title="Switzerland">🇨🇭</span>
              <span title="Liechtenstein">🇱🇮</span>
              <span title="Global / international" className="ml-1">🌐</span>
            </div>
          </div>

          {/* Topics card */}
          <div className="p-4 rounded-lg bg-white dark:bg-gray-900/60 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏷️</span>
              <span className="font-bold text-sm">{t('legend.topicsTitle')}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t('legend.topicsBody')}
            </p>
            <div className="flex flex-wrap gap-1">
              {TOPIC_ORDER.map((tp) => (
                <span
                  key={tp}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${TOPIC_META[tp].pillClass}`}
                  title={isFr ? TOPIC_META[tp].labelFr : TOPIC_META[tp].labelEn}
                >
                  <span>{TOPIC_META[tp].icon}</span>
                  <span>{isFr ? TOPIC_META[tp].labelFr : TOPIC_META[tp].labelEn}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Scopes card */}
          <div className="p-4 rounded-lg bg-white dark:bg-gray-900/60 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🌍</span>
              <span className="font-bold text-sm">{t('legend.scopesTitle')}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              {t('legend.scopesBody')}
            </p>
            <div className="flex flex-col gap-1.5">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium self-start bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200"
                title={t('scopes.local.tooltip')}
              >
                <span>📍</span>
                <span>{t('scopes.local.label')}</span>
              </span>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium self-start bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                title={t('scopes.extra.tooltip')}
              >
                <span>🌐</span>
                <span>{t('scopes.extra.label')}</span>
              </span>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium self-start bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200"
                title={t('scopes.global.tooltip')}
              >
                <span>🌍</span>
                <span>{t('scopes.global.label')}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
