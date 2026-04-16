'use client';

import { useTranslations } from 'next-intl';
import { JURISDICTIONS, type Jurisdiction } from '@/types';

const JURISDICTION_KEYS: Jurisdiction[] = ['eu', 'us', 'uae', 'sg', 'uk', 'hk', 'ch', 'li'];

export default function StepJurisdiction({
  selected,
  onSelect,
}: {
  selected?: Jurisdiction;
  onSelect: (j: Jurisdiction) => void;
}) {
  const t = useTranslations('wizard');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{t('step3.title')}</h2>
      <p className="text-sm text-gray-500 mb-6">{t('step3.subtitle')}</p>
      <div className="grid sm:grid-cols-2 gap-2">
        {JURISDICTION_KEYS.map((code) => {
          const j = JURISDICTIONS[code];
          return (
            <button
              key={code}
              onClick={() => onSelect(code)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-colors ${
                selected === code
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="text-2xl">{j.flag}</span>
              <span className="text-sm font-medium">{j.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
