'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

/**
 * Floating "Ask anything" button that takes the user to the AI Search page.
 * Replaces the earlier GlossaryFab — since the Glossary moved to a tab under
 * Understand, the FAB is now repurposed to surface the Ask AI entry point
 * from any page.
 *
 * ⌘K / Ctrl+K shortcut jumps to /search (soon /ask).
 */
export default function AskFab() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isFr = locale === 'fr';
  const label = isFr ? 'Poser une question' : 'Ask anything';

  // Cmd/Ctrl+K → navigate to Ask
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!pathname.startsWith('/search') && !pathname.startsWith('/ask')) {
          router.push('/search');
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [router, pathname]);

  // Hide on /search itself to avoid redundancy
  if (pathname.startsWith('/search') || pathname.startsWith('/ask')) {
    return null;
  }

  return (
    <button
      onClick={() => router.push('/search')}
      aria-label={label}
      title={`${label} (⌘K)`}
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all"
    >
      <span className="text-xl leading-none">💬</span>
      <span className="hidden sm:inline font-medium text-sm">{label}</span>
      <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono">⌘K</kbd>
    </button>
  );
}
