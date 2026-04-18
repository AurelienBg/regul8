'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

const TABS = [
  { key: 'all', href: '/learn' as const, match: (p: string) => p === '/learn', icon: null, labelEn: 'Overview', labelFr: 'Vue d\'ensemble' },
  { key: 'paths', href: '/learn/paths' as const, match: (p: string) => p.startsWith('/learn/paths'), icon: '📚', labelEn: 'Paths', labelFr: 'Parcours' },
  { key: 'maps', href: '/learn/maps' as const, match: (p: string) => p.startsWith('/learn/maps'), icon: '🗺️', labelEn: 'Maps', labelFr: 'Cartes' },
  { key: 'xrpl', href: '/learn/xrpl' as const, match: (p: string) => p.startsWith('/learn/xrpl') || p.startsWith('/xrpl'), icon: '🟣', labelEn: 'XRPL', labelFr: 'XRPL' },
  { key: 'cases', href: '/learn/cases' as const, match: (p: string) => p.startsWith('/learn/cases'), icon: '🏢', labelEn: 'Use cases', labelFr: 'Cas d\'usage' },
  { key: 'categories', href: '/learn/categories' as const, match: (p: string) => p.startsWith('/learn/categories'), icon: '🎯', labelEn: 'Categories', labelFr: 'Catégories' },
  { key: 'decision-trees', href: '/learn/decision-trees' as const, match: (p: string) => p.startsWith('/learn/decision-trees'), icon: '🌳', labelEn: 'Decision trees', labelFr: 'Arbres' },
];

export default function UnderstandTabs() {
  const pathname = usePathname();
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <div className="mb-6 -mx-4 px-4 overflow-x-auto border-b border-[var(--border)]">
      <nav className="flex gap-1 min-w-max" aria-label="Understand sections">
        {TABS.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm transition-colors border-b-2 -mb-px whitespace-nowrap ${
                active
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                  : 'border-transparent text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {t.icon && <span>{t.icon}</span>}
              <span>{isFr ? t.labelFr : t.labelEn}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
