'use client';

import { useTranslations } from 'next-intl';
import type { WizardAnswers } from '@/types';

export default function StepProfile({
  answers,
  onUpdate,
}: {
  answers: Partial<WizardAnswers>;
  onUpdate: (patch: Partial<WizardAnswers>) => void;
}) {
  const t = useTranslations('wizard');

  const stages = ['idea', 'mvp', 'growth', 'scale'] as const;
  const models = ['b2c', 'b2b', 'both'] as const;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{t('step4.title')}</h2>
      <p className="text-sm text-gray-500 mb-6">{t('step4.subtitle')}</p>

      <div className="space-y-6">
        {/* Stage */}
        <div>
          <label className="block text-sm font-medium mb-2">Stage</label>
          <div className="grid grid-cols-2 gap-2">
            {stages.map((s) => (
              <button
                key={s}
                onClick={() => onUpdate({ stage: s })}
                className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                  answers.stage === s
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {t(`stages.${s}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Business model */}
        <div>
          <label className="block text-sm font-medium mb-2">Model</label>
          <div className="grid grid-cols-3 gap-2">
            {models.map((m) => (
              <button
                key={m}
                onClick={() => onUpdate({ model: m })}
                className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                  answers.model === m
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {t(`models.${m}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Chain */}
        <div>
          <label className="block text-sm font-medium mb-2">Chain</label>
          <input
            type="text"
            value={answers.chain ?? ''}
            onChange={(e) => onUpdate({ chain: e.target.value })}
            placeholder={t('chainPlaceholder')}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
