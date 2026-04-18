'use client';

import { useTranslations } from 'next-intl';
import { ACTIVITIES, type ActivityKey } from '@/types';
import XRPLBadge from '@/components/ui/XRPLBadge';

const ACTIVITY_KEYS: ActivityKey[] = [
  'exchange', 'dapp_fin', 'dapp_util', 'nft', 'mpt', 'rwa',
  'stablecoin', 'gaming', 'custody',
  'payment', 'onramp_offramp', 'cross_border_payment',
  'token_utility', 'token_security', 'token_hybrid',
];

export default function StepActivity({
  selected,
  onSelect,
}: {
  selected?: ActivityKey;
  onSelect: (a: ActivityKey) => void;
}) {
  const t = useTranslations('wizard');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{t('step1.title')}</h2>
      <p className="text-sm text-gray-500 mb-6">{t('step1.subtitle')}</p>
      <div className="grid gap-2">
        {ACTIVITY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
              selected === key
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span className="text-sm font-medium">{t(`activities.${key}`)}</span>
            {ACTIVITIES[key].xrpl && <XRPLBadge />}
          </button>
        ))}
      </div>
    </div>
  );
}
