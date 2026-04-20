'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

const TABS = [
  { key: 'all', href: '/understand' as const, match: (p: string) => p === '/understand' || p === '/learn', icon: '📚', labelEn: 'Overview', labelFr: "Vue d'ensemble" },
  { key: 'concepts', href: '/understand/concepts' as const, match: (p: string) => p.startsWith('/understand/concepts') || p.startsWith('/understand/categories') || p.startsWith('/learn/categories'), icon: '🎯', labelEn: 'Concepts', labelFr: 'Concepts' },
  { key: 'usecases', href: '/understand/usecases' as const, match: (p: string) => p.startsWith('/understand/usecases') || p.startsWith('/understand/cases') || p.startsWith('/learn/usecases') || p.startsWith('/learn/cases'), icon: '🏢', labelEn: 'Use cases', labelFr: "Cas d'usage" },
  { key: 'xrpl', href: '/understand/xrpl' as const, match: (p: string) => p.startsWith('/understand/xrpl') || p.startsWith('/learn/xrpl') || p.startsWith('/xrpl'), icon: '🟣', labelEn: 'XRPL', labelFr: 'XRPL' },
  { key: 'diagrams', href: '/understand/diagrams' as const, match: (p: string) => p.startsWith('/understand/diagrams') || p.startsWith('/understand/maps') || p.startsWith('/learn/maps'), icon: '🗺️', labelEn: 'Diagrams', labelFr: 'Diagrammes' },
  { key: 'guides', href: '/understand/guides' as const, match: (p: string) => p.startsWith('/understand/guides') || p.startsWith('/understand/paths') || p.startsWith('/learn/paths'), icon: '📖', labelEn: 'Guides', labelFr: 'Guides' },
  { key: 'glossary', href: '/understand/glossary' as const, match: (p: string) => p.startsWith('/understand/glossary') || p === '/glossary' || p.startsWith('/glossary/'), icon: '🔤', labelEn: 'Glossary', labelFr: 'Glossaire' },
  { key: 'faq', href: '/understand/faq' as const, match: (p: string) => p.startsWith('/understand/faq'), icon: '❓', labelEn: 'FAQ', labelFr: 'FAQ' },
];

interface Props {
  variant?: 'sidebar' | 'topbar';
}

export default function UnderstandTabs({ variant = 'sidebar' }: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const isFr = locale === 'fr';

  // --- Desktop: vertical sidebar with bold active section ---
  if (variant === 'sidebar') {
    return (
      <nav className="space-y-0.5" aria-label="Understand navigation">
        {TABS.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`relative flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-r-md transition-colors ${
                active
                  ? 'font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/40'
                  : 'font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50/60 dark:hover:bg-gray-900/30'
              }`}
            >
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-500 rounded-r"
                />
              )}
              <span className="text-base leading-none" aria-hidden="true">
                {t.icon}
              </span>
              <span className="text-sm">{isFr ? t.labelFr : t.labelEn}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  // --- Mobile: horizontal scrollable topbar ---
  return <UnderstandTopbar pathname={pathname} isFr={isFr} />;
}

/** Mobile topbar — auto-scrolls the active tab into view on each navigation */
function UnderstandTopbar({ pathname, isFr }: { pathname: string; isFr: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = activeRef.current;
    const scroller = scrollerRef.current;
    if (!el || !scroller) return;
    // Centre the active tab inside the scrollable container without
    // scrolling the page vertically.
    const elLeft = el.offsetLeft;
    const elWidth = el.offsetWidth;
    const target = elLeft - scroller.clientWidth / 2 + elWidth / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [pathname]);

  return (
    <div ref={scrollerRef} className="overflow-x-auto -mx-4 px-4">
      <nav className="flex gap-1 min-w-max" aria-label="Understand navigation">
        {TABS.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.key}
              ref={active ? activeRef : undefined}
              href={t.href}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors ${
                active
                  ? 'border-blue-500 text-gray-900 dark:text-white font-bold'
                  : 'border-transparent text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <span aria-hidden="true">{t.icon}</span>
              <span>{isFr ? t.labelFr : t.labelEn}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
