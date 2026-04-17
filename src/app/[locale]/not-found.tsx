'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LocaleNotFound() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🧭</div>
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="text-xl font-semibold mb-2">
          {isFr ? 'Page introuvable' : 'Page not found'}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {isFr
            ? "Cette page n'existe pas ou a été déplacée."
            : "This page doesn't exist or was moved."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            &larr; {isFr ? 'Accueil' : 'Home'}
          </Link>
          <Link
            href="/check"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {isFr ? 'Démarrer une vérification' : 'Start a check'} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
