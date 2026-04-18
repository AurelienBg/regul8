'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

const TABS = [
  { key: 'all', href: '/understand' as const, match: (p: string) => p === '/understand' || p === '/learn', icon: null, labelEn: 'Overview', labelFr: 'Vue d\'ensemble' },
  { key: 'categories', href: '/understand/categories' as const, match: (p: string) => p.startsWith('/understand/categories') || p.startsWith('/learn/categories'), icon: '🎯', labelEn: 'Concepts', labelFr: 'Concepts' },
  { key: 'usecases', href: '/understand/usecases' as const, match: (p: string) => p.startsWith('/understand/usecases') || p.startsWith('/understand/cases') || p.startsWith('/learn/usecases') || p.startsWith('/learn/cases'), icon: '🏢', labelEn: 'Use cases', labelFr: 'Cas d\'usage' },
  { key: 'xrpl', href: '/understand/xrpl' as const, match: (p: string) => p.startsWith('/understand/xrpl') || p.startsWith('/learn/xrpl') || p.startsWith('/xrpl'), icon: '🟣', labelEn: 'XRPL', labelFr: 'XRPL' },
  { key: 'maps', href: '/understand/maps' as const, match: (p: string) => p.startsWith('/understand/maps') || p.startsWith('/learn/maps'), icon: '🗺️', labelEn: 'Diagrams', labelFr: 'Diagrammes' },
  { key: 'paths', href: '/understand/paths' as const, match: (p: string) => p.startsWith('/understand/paths') || p.startsWith('/learn/paths'), icon: '📚', labelEn: 'Guides', labelFr: 'Guides' },
  { key: 'decision-trees', href: '/understand/decision-trees' as const, match: (p: string) => p.startsWith('/understand/decision-trees') || p.startsWith('/learn/decision-trees'), icon: '🌳', labelEn: 'Decision trees', labelFr: 'Arbres' },
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
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm transition-colors border-b-4 -mb-px whitespace-nowrap ${
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
