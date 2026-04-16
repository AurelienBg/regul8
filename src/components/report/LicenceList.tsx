'use client';

import { useTranslations } from 'next-intl';

export default function LicenceList({ licences }: { licences: string[] }) {
  const t = useTranslations('report');
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">{t('licenses')}</p>
      <div className="flex flex-wrap gap-1.5">
        {licences.map((l, i) => (
          <span key={i} className="badge-license">{l}</span>
        ))}
      </div>
    </div>
  );
}
