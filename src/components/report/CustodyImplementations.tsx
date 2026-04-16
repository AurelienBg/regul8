'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { XRPL_CUSTODY_METHODS } from '@/data/custody-xrpl';

export default function CustodyImplementations() {
  const t = useTranslations('xrpl');
  const [expanded, setExpanded] = useState<string | null>(null);

  const custodyColor = (c: 'yes' | 'no' | 'grey') =>
    c === 'yes' ? 'badge-high' : c === 'no' ? 'badge-low' : 'badge-med';
  const custodyLabel = (c: 'yes' | 'no' | 'grey') =>
    c === 'yes' ? t('custodial') : c === 'no' ? t('nonCustodial') : t('greyZone');

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span className="badge-xrpl">XRPL</span>
        {t('custodyMatrix')}
      </h3>
      <div className="space-y-2">
        {XRPL_CUSTODY_METHODS.map((method) => (
          <div key={method.id} className="card p-0 overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === method.id ? null : method.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{method.name}</span>
                <span className={custodyColor(method.custodial)}>{custodyLabel(method.custodial)}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${expanded === method.id ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded === method.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)]">
                <div className="pt-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('mechanism')}</p>
                  <p className="text-sm">{method.mechanism}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('euLicence')}</p>
                  <p className="text-sm">{method.euLicence}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('technicalDetails')}</p>
                  <ul className="text-sm space-y-1">
                    {method.technicalDetails.map((d, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-400">&bull; {d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('useCase')}</p>
                  <p className="text-sm">{method.useCase}</p>
                </div>
                {method.xrplObjects && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{t('xrplObjects')}</p>
                    <div className="flex flex-wrap gap-1">
                      {method.xrplObjects.map((obj, i) => (
                        <code key={i} className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">{obj}</code>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
