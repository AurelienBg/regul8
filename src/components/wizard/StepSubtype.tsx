'use client';

import { useTranslations } from 'next-intl';
import type { ActivityKey } from '@/types';

const SUBTYPES: Partial<Record<ActivityKey, string[]>> = {
  exchange: ['Centralized exchange (CEX)', 'Decentralized exchange front-end (DEX)', 'OTC / Broker', 'Hybrid (CEX + DEX)'],
  dapp_fin: ['DEX / AMM', 'Lending / Borrowing', 'Yield aggregator', 'Derivatives / Perps', 'Insurance'],
  dapp_util: ['Social / Community', 'Identity / Credentials', 'DAO tooling', 'Infrastructure / Oracle'],
  nft: ['Art / Collectibles', 'Gaming items', 'Music / Media', 'Marketplace platform', 'IP / Licensing'],
  stablecoin: ['Fiat-backed (EMT)', 'Multi-asset backed (ART)', 'Algorithmic', 'Crypto-backed'],
  custody: ['Full custodial (hold keys)', 'Semi-custodial (MPC/TSS)', 'Multi-sig infrastructure', 'Non-custodial wallet software'],
  payment: ['Crypto-to-crypto transfer', 'Crypto-to-fiat off-ramp', 'Fiat-to-crypto on-ramp', 'Cross-border remittance', 'Merchant payment gateway'],
  token_utility: ['Access token', 'Governance token', 'Reward / Loyalty token'],
  token_security: ['Equity token', 'Debt / Bond token', 'Revenue share token', 'Real estate token'],
  token_hybrid: ['Utility + governance + revenue', 'Access + investment', 'Other hybrid'],
  rwa: ['Real estate', 'Bonds / Debt', 'Equity / Shares', 'Commodities', 'Art / Collectibles'],
  gaming: ['Play-to-earn (P2E)', 'In-game NFT items', 'Virtual world / Metaverse', 'Gambling / Casino'],
  mpt: ['Programmable stablecoin', 'Compliance-gated token', 'Loyalty / Rewards', 'RWA with built-in compliance'],
};

export default function StepSubtype({
  activity,
  selected,
  onSelect,
}: {
  activity: ActivityKey;
  selected?: string;
  onSelect: (s: string) => void;
}) {
  const t = useTranslations('wizard');
  const options = SUBTYPES[activity] ?? [];

  if (options.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">{t('step2.title')}</h2>
        <p className="text-sm text-gray-500">No sub-types for this activity. Click Next to continue.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{t('step2.title')}</h2>
      <p className="text-sm text-gray-500 mb-6">{t('step2.subtitle')}</p>
      <div className="grid gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-4 py-3 rounded-lg border text-left text-sm font-medium transition-colors ${
              selected === opt
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
