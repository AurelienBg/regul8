'use client';

import { useLocale } from 'next-intl';
import LinkedText from '@/components/ui/LinkedText';

export default function XRPLNote({ note }: { note: string }) {
  const locale = useLocale();
  const label = locale === 'fr' ? 'Note spécifique' : 'Specific Note';
  return (
    <div className="card mb-6 border-xrpl/30 bg-xrpl-50/50 dark:bg-xrpl/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge-xrpl">XRPL</span>
        <span className="text-xs font-semibold text-xrpl-700 dark:text-xrpl-100">{label}</span>
      </div>
      <p className="text-sm text-xrpl-700 dark:text-xrpl-100 leading-relaxed">
        <LinkedText>{note}</LinkedText>
      </p>
    </div>
  );
}
