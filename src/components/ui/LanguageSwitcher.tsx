'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (target: 'en' | 'fr') => {
    if (target !== locale) {
      router.replace(pathname, { locale: target });
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
