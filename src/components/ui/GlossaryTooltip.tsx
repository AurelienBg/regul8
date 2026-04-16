'use client';

import { useState } from 'react';
import { GLOSSARY_TERMS } from '@/data/glossary';

export default function GlossaryTooltip({ term, children }: { term: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY_TERMS.find(
    (g) => g.term.toLowerCase() === term.toLowerCase()
  );

  if (!entry) return <>{children}</>;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <span className="border-b border-dashed border-gray-400 cursor-help">{children}</span>
      {open && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-[var(--border)] text-sm text-left">
          <span className="font-semibold text-blue-600 dark:text-blue-400">{entry.term}</span>
          <span className="block mt-1 text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{entry.definition}</span>
        </span>
      )}
    </span>
  );
}
