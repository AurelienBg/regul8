import type { PathBlock } from '@/types';

const calloutStyles: Record<'info' | 'warn' | 'key', { border: string; bg: string; text: string; icon: string }> = {
  info: {
    border: 'border-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-900 dark:text-blue-200',
    icon: 'ℹ️',
  },
  warn: {
    border: 'border-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-900 dark:text-amber-200',
    icon: '⚠️',
  },
  key: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-900 dark:text-emerald-200',
    icon: '🎯',
  },
};

export default function PathBlockRenderer({ block }: { block: PathBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{block.text}</p>;
    case 'h3':
      return <h3 className="text-lg font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100">{block.text}</h3>;
    case 'ul':
      return (
        <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed">{it}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed">{it}</li>
          ))}
        </ol>
      );
    case 'callout': {
      const s = calloutStyles[block.tone];
      return (
        <div className={`my-6 p-5 rounded-xl border-l-4 ${s.border} ${s.bg}`}>
          <div className="flex items-start gap-3">
            <span className="text-xl leading-none pt-0.5">{s.icon}</span>
            <div className="flex-1">
              {block.title && <div className={`font-bold mb-1 ${s.text}`}>{block.title}</div>}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }
    case 'table':
      return (
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left p-3 font-semibold border-b border-[var(--border)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-b border-[var(--border)]">
                  {r.map((c, j) => (
                    <td key={j} className="p-3 text-gray-700 dark:text-gray-300">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
