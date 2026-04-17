'use client';

import { useLocale } from 'next-intl';
import { findSources } from '@/data/sources';
import type { RegResult } from '@/types';

interface Props {
  /** All regulation results to aggregate sources from. */
  results: RegResult[];
}

export default function SourcesList({ results }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';

  // Flatten all text fields across all results into one corpus
  const texts: string[] = [];
  for (const r of results) {
    if (!r) continue;
    texts.push(r.regime);
    texts.push(...r.licenses);
    texts.push(...r.obligations);
    if (r.authority) texts.push(r.authority);
    if (r.xrplNote) texts.push(r.xrplNote);
    if (r.custodyNote) texts.push(r.custodyNote);
    texts.push(...r.alts);
  }

  const sources = findSources(texts);
  if (sources.length === 0) return null;

  const tr = isFr
    ? {
        title: '📚 Sources officielles',
        subtitle: "Liens vers les textes de loi et guidances officielles cités dans ce rapport.",
      }
    : {
        title: '📚 Official sources',
        subtitle: 'Links to the laws and official guidance referenced in this report.',
      };

  return (
    <section className="mt-8 p-5 rounded-xl border border-[var(--border)] bg-gray-50 dark:bg-gray-900/50">
      <h3 className="font-bold mb-1">{tr.title}</h3>
      <p className="text-xs text-gray-500 mb-4">{tr.subtitle}</p>
      <ul className="space-y-2">
        {sources.map((s, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            <span className="text-gray-400 pt-0.5">↪</span>
            <div className="flex-1 min-w-0">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline break-words"
              >
                {s.label}
              </a>
              <span className="text-xs text-gray-500 ml-2">· {s.authority}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
