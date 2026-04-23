'use client';

import { useLocale } from 'next-intl';
import LinkedText from '@/components/ui/LinkedText';
import XRPLMark from '@/components/ui/XRPLMark';

export default function XRPLNote({ note }: { note: string }) {
  const locale = useLocale();
  const label = locale === 'fr' ? 'Note spécifique' : 'Specific Note';
  return (
    <div className="card mb-6 border-xrpl/30 bg-xrpl-50/50 dark:bg-xrpl/10">
      <div className="flex items-center gap-2 mb-2">
        {/* XRPL brand mark (inline SVG, inherits the pill's text colour) —
            replaces the former "XRPL" wordmark for a more graphic badge. */}
        <span className="badge-xrpl" aria-label="XRPL">
          <XRPLMark className="w-3 h-3" />
        </span>
        <span className="text-xs font-semibold text-xrpl-700 dark:text-xrpl-100">{label}</span>
      </div>
      <p className="text-sm text-xrpl-700 dark:text-xrpl-100 leading-relaxed">
        <LinkedText>{note}</LinkedText>
      </p>
    </div>
  );
}
