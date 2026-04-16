'use client';

import { useTranslations } from 'next-intl';

export default function ObligationList({ obligations }: { obligations: string[] }) {
  const t = useTranslations('report');
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">{t('obligations')}</p>
      <div className="flex flex-wrap gap-1.5">
        {obligations.map((o, i) => (
          <span key={i} className="badge-obligation">{o}</span>
        ))}
      </div>
    </div>
  );
}
