'use client';

import { useTranslations } from 'next-intl';
import type { Jurisdiction } from '@/types';

export function useJurisdictionName() {
  const t = useTranslations('jurisdictions');
  return (code: Jurisdiction) => t(code);
}
