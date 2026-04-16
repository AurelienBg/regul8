'use client';

import { useTranslations } from 'next-intl';
import { JURISDICTIONS, type Jurisdiction, type RegResult } from '@/types';
import RiskBadge from '@/components/ui/RiskBadge';

interface CompareRow {
  jurisdiction: Jurisdiction;
  result: RegResult | null;
}

export default function CompareTable({ results }: { results: CompareRow[] }) {
  const t = useTranslations('compare');

  const rows: { label: string; key: string }[] = [
    { label: t('regime'), key: 'regime' },
    { label: t('risk'), key: 'risk' },
    { label: t('licenses'), key: 'licenses' },
    { label: t('obligations'), key: 'obligations' },
    { label: t('timeline'), key: 'timeline' },
    { label: t('cost'), key: 'cost' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 border-b border-[var(--border)] w-32" />
            {results.map(({ jurisdiction }) => (
              <th key={jurisdiction} className="text-left p-3 border-b border-[var(--border)]">
                <span className="text-lg mr-1.5">{JURISDICTIONS[jurisdiction].flag}</span>
                {JURISDICTIONS[jurisdiction].name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, key }) => (
            <tr key={key} className="border-b border-[var(--border)]">
              <td className="p-3 font-medium text-gray-500 text-xs uppercase tracking-wide">{label}</td>
              {results.map(({ jurisdiction, result }) => (
                <td key={jurisdiction} className="p-3">
                  {!result ? (
                    <span className="text-gray-400">N/A</span>
                  ) : key === 'risk' ? (
                    <RiskBadge risk={result.risk} />
                  ) : key === 'licenses' ? (
                    <div className="flex flex-wrap gap-1">
                      {result.licenses.map((l, i) => (
                        <span key={i} className="badge-license text-[10px]">{l}</span>
                      ))}
                    </div>
                  ) : key === 'obligations' ? (
                    <div className="flex flex-wrap gap-1">
                      {result.obligations.slice(0, 3).map((o, i) => (
                        <span key={i} className="badge-obligation text-[10px]">{o}</span>
                      ))}
                      {result.obligations.length > 3 && (
                        <span className="text-xs text-gray-500">+{result.obligations.length - 3}</span>
                      )}
                    </div>
                  ) : key === 'regime' ? (
                    <span className="font-medium">{result.regime}</span>
                  ) : key === 'timeline' ? (
                    <span className="font-semibold">{result.time}</span>
                  ) : key === 'cost' ? (
                    <span className="font-semibold">{result.cost}</span>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
