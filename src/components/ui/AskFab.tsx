'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import AskDrawer from './AskDrawer';

/**
 * Floating "Ask anything" button that opens a right-side drawer with the
 * AI Q&A. ⌘K / Ctrl+K toggles the drawer. Replaces the earlier standalone
 * /search page flow (still exists via /api/search for the backend call).
 */
export default function AskFab() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const isFr = locale === 'fr';
  // Short label keeps the FAB compact enough that it doesn't overlap
  // page action buttons (e.g. wizard "Next") on small laptops (≤11").
  // Long form kept as the aria-label / title for accessibility.
  const label = isFr ? 'IA' : 'Ask AI';
  const fullLabel = isFr ? 'Poser une question' : 'Ask anything';

  // Cmd/Ctrl+K → toggle drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={fullLabel}
        title={`${fullLabel} (⌘K)`}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 px-3 py-2.5 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all"
      >
        <span className="text-lg leading-none">💬</span>
        <span className="hidden sm:inline font-medium text-sm">{label}</span>
        <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono">⌘K</kbd>
      </button>
      <AskDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
