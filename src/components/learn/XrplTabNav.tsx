'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

/**
 * Sub-tab navigation for /learn/xrpl/{legal,tech,custody,companies}.
 *
 * Renders 4 anchor-style tab links. Active state is derived from the
 * pathname so each tab is a real route — bookmarkable, browser-back
 * native, individually indexable by search engines (each route has its
 * own generateMetadata in its page.tsx).
 *
 * The 'legal' tab maps to the bare /learn/xrpl path (default) — no
 * /learn/xrpl/legal sub-route.
 */
export default function XrplTabNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const isFr = locale === 'fr';

  // Active tab detection — pathname shape after locale stripping by
  // next-intl. Trailing-slash safe via startsWith fallback.
  const isActive = (key: 'legal' | 'tech' | 'custody' | 'companies') => {
    if (key === 'legal') return pathname === '/learn/xrpl' || pathname === '/learn/xrpl/';
    return pathname === `/learn/xrpl/${key}` || pathname.startsWith(`/learn/xrpl/${key}/`);
  };

  const tabs = [
    {
      key: 'legal' as const,
      href: '/learn/xrpl' as const,
      label: isFr ? '🌍 Statut légal' : '🌍 Legal status',
    },
    {
      key: 'tech' as const,
      href: '/learn/xrpl/tech' as const,
      label: isFr ? '⚡ Technologie' : '⚡ Technology',
    },
    {
      key: 'custody' as const,
      href: '/learn/xrpl/custody' as const,
      label: isFr ? '🔐 Custody' : '🔐 Custody',
    },
    {
      key: 'companies' as const,
      href: '/learn/xrpl/companies' as const,
      label: isFr ? '🏢 Entreprises' : '🏢 Companies',
    },
  ];

  return (
    <div className="mb-8 border-b border-[var(--border)]">
      <div className="grid grid-cols-4">
        {tabs.map((t) => {
          const active = isActive(t.key);
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`text-center px-3 py-3 text-sm sm:text-base transition-colors border-b-4 -mb-px ${
                active
                  ? 'border-violet-500 text-violet-600 dark:text-violet-400 font-bold'
                  : 'border-transparent text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
