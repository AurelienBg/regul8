'use client';

import { useTranslations } from 'next-intl';
import type { Risk } from '@/types';

export default function RiskBadge({ risk }: { risk: Risk }) {
  const t = useTranslations('report');
  const cls = risk === 'high' ? 'badge-high' : risk === 'med' ? 'badge-med' : 'badge-low';
  const label = risk === 'high' ? t('riskHigh') : risk === 'med' ? t('riskMed') : t('riskLow');
  return <span className={cls}>{label}</span>;
}
