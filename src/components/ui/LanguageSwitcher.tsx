'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const switchTo = (target: 'en' | 'fr') => {
    if (target !== locale) {
      // Preserve searchParams so URL-backed state (e.g. /report?activities=...&jurisdictions=...)
      // survives language switching. Without this, switching FR↔EN on /report
      // wipes the selection and shows "No activities or jurisdictions selected."
      const qs = searchParams?.toString();
      const target_path = qs ? `${pathname}?${qs}` : pathname;
      router.replace(target_path, { locale: target });
    }
  };

  return (
    <div className="flex items-center rounded-full border border-[var(--border)] p-0.5">
      <button
        onClick={() => switchTo('fr')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          locale === 'fr'
            ? 'bg-blue-500 text-white'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchTo('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          locale === 'en'
            ? 'bg-blue-500 text-white'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
}
