'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Primary nav = 4 tabs organized by user intent.
   * "isActive" uses startsWith so /wizard + /report + /compare all highlight "Check".
   */
  const links = [
    {
      href: '/check',
      label: t('check'),
      isActive: (p: string) =>
        p === '/check' ||
        p.startsWith('/check/') ||
        p.startsWith('/wizard') ||
        p.startsWith('/report'),
    },
    {
      href: '/compare',
      label: t('compare'),
      isActive: (p: string) => p.startsWith('/compare'),
    },
    {
      href: '/learn',
      label: t('learn'),
      isActive: (p: string) =>
        p === '/learn' || p.startsWith('/learn/') || p.startsWith('/xrpl'),
    },
    {
      href: '/search',
      label: t('ask'),
      isActive: (p: string) => p.startsWith('/search') || p.startsWith('/ask'),
    },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--card)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Regul8" width={160} height={38} className="h-9 w-auto dark:hidden" />
            <Image src="/logo-dark.svg" alt="Regul8" width={160} height={38} className="h-9 w-auto hidden dark:block" />
          </Link>

          <nav className="hidden md:flex items-center gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`min-w-[96px] px-4 py-2 rounded-lg text-sm font-medium text-center border-2 transition-colors ${
                  link.isActive(pathname)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-900/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                link.isActive(pathname)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
