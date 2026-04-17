'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import GlossaryDrawer from './GlossaryDrawer';

export default function GlossaryFab() {
  const t = useTranslations('glossary');
  const [open, setOpen] = useState(false);

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
        aria-label={t('title')}
        title={`${t('title')} (⌘K)`}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
      >
        <span className="text-xl leading-none">📖</span>
        <span className="hidden sm:inline font-medium text-sm">{t('title')}</span>
        <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono">⌘K</kbd>
      </button>
      <GlossaryDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
