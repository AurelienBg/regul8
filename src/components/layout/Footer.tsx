'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto">
          {t('disclaimer')}
        </p>
        <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          Regul8 &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
