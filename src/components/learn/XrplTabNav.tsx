'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

/**
 * Sub-tab navigation for /learn/xrpl/{legal,companies,custody,tech}.
 *
 * Renders 4 anchor-style tab links. Active state is derived from the
 * pathname so each tab is a real route — bookmarkable, browser-back
 * native, individually indexable by search engines (each route has its
 * own generateMetadata in its page.tsx).
 *
 * Order: 🌍 Legal status (the meta-overview) first, then the three
 * detail tabs alphabetically (Companies, Custody, Technology).
 *
 * The bare /learn/xrpl URL redirects to /learn/xrpl/legal. The Legal
 * tab's active matcher still recognises the bare URL during the
 * redirect roundtrip so the highlight is correct on cold first paint.
 */
export default function XrplTabNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const isFr = locale === 'fr';

  const isActive = (key: 'legal' | 'companies' | 'custody' | 'tech') => {
    if (key === 'legal') {
      // Match either the new canonical /learn/xrpl/legal OR the legacy
      // bare /learn/xrpl (during the redirect window / SSR roundtrip).
      return (
        pathname === '/learn/xrpl/legal' ||
        pathname.startsWith('/learn/xrpl/legal/') ||
        pathname === '/learn/xrpl' ||
        pathname === '/learn/xrpl/'
      );
    }
    return (
      pathname === `/learn/xrpl/${key}` ||
      pathname.startsWith(`/learn/xrpl/${key}/`)
    );
  };

  // Order: Legal first (meta-overview), then alphabetical.
  const tabs = [
    {
      key: 'legal' as const,
      href: '/learn/xrpl/legal' as const,
      label: isFr ? '🌍 Statut légal' : '🌍 Legal status',
    },
    {
      key: 'companies' as const,
      href: '/learn/xrpl/companies' as const,
      label: isFr ? '🏢 Entreprises' : '🏢 Companies',
    },
    {
      key: 'custody' as const,
      href: '/learn/xrpl/custody' as const,
      label: isFr ? '🔐 Custody' : '🔐 Custody',
    },
    {
      key: 'tech' as const,
      href: '/learn/xrpl/tech' as const,
      label: isFr ? '⚡ Technologie' : '⚡ Technology',
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
