'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import GlossaryContent from './GlossaryContent';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GlossaryDrawer({ open, onClose }: Props) {
  const t = useTranslations('glossary');
  const locale = useLocale();
  const closeLabel = locale === 'fr' ? 'Fermer' : 'Close';

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md md:max-w-lg z-50 bg-[var(--background)] border-l border-[var(--border)] shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="font-bold">{t('title')}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden sm:inline">{closeLabel}</span>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 relative">
          <GlossaryContent compact />
        </div>

        {/* Floating close pill — bottom-right, always visible during scroll */}
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>{closeLabel}</span>
        </button>
      </aside>
    </>
  );
}
