'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import GlossaryContent from './GlossaryContent';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GlossaryDrawer({ open, onClose }: Props) {
  const t = useTranslations('glossary');

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
    return () => { document.body.style.overflow = prev; };
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
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="font-bold">{t('title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <GlossaryContent compact />
        </div>
      </aside>
    </>
  );
}
