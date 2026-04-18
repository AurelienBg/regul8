'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

const TABS = [
  { key: 'all', href: '/understand' as const, match: (p: string) => p === '/understand' || p === '/learn', icon: null, labelEn: 'Overview', labelFr: 'Vue d\'ensemble' },
  { key: 'concepts', href: '/understand/concepts' as const, match: (p: string) => p.startsWith('/understand/concepts') || p.startsWith('/understand/categories') || p.startsWith('/learn/categories'), icon: '🎯', labelEn: 'Concepts', labelFr: 'Concepts' },
  { key: 'usecases', href: '/understand/usecases' as const, match: (p: string) => p.startsWith('/understand/usecases') || p.startsWith('/understand/cases') || p.startsWith('/learn/usecases') || p.startsWith('/learn/cases'), icon: '🏢', labelEn: 'Use cases', labelFr: 'Cas d\'usage' },
  { key: 'xrpl', href: '/understand/xrpl' as const, match: (p: string) => p.startsWith('/understand/xrpl') || p.startsWith('/learn/xrpl') || p.startsWith('/xrpl'), icon: '🟣', labelEn: 'XRPL', labelFr: 'XRPL' },
  { key: 'diagrams', href: '/understand/diagrams' as const, match: (p: string) => p.startsWith('/understand/diagrams') || p.startsWith('/understand/maps') || p.startsWith('/learn/maps'), icon: '🗺️', labelEn: 'Diagrams', labelFr: 'Diagrammes' },
  { key: 'guides', href: '/understand/guides' as const, match: (p: string) => p.startsWith('/understand/guides') || p.startsWith('/understand/paths') || p.startsWith('/learn/paths'), icon: '📚', labelEn: 'Guides', labelFr: 'Guides' },
  { key: 'glossary', href: '/understand/glossary' as const, match: (p: string) => p.startsWith('/understand/glossary') || p === '/glossary' || p.startsWith('/glossary/'), icon: '📖', labelEn: 'Glossary', labelFr: 'Glossaire' },
  { key: 'faq', href: '/understand/faq' as const, match: (p: string) => p.startsWith('/understand/faq'), icon: '❓', labelEn: 'FAQ', labelFr: 'FAQ' },
];

export default function UnderstandTabs() {
  const pathname = usePathname();
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <div className="sticky top-16 z-40 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] mb-6">
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
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
    </div>
  );
}
