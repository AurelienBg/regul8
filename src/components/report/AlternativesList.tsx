'use client';

import { useTranslations } from 'next-intl';

export default function AlternativesList({ alts }: { alts: string[] }) {
  const t = useTranslations('report');
  if (alts.length === 0) return null;
  return (
    <div className="card mb-6">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">{t('alternatives')}</p>
      <ul className="space-y-1.5">
        {alts.map((a, i) => (
          <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="text-blue-500">&rarr;</span> {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
