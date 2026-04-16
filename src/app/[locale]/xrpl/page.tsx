'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { XRPL_KNOWLEDGE, XRPL_FEATURES } from '@/data/xrpl';
import CustodyImplementations from '@/components/report/CustodyImplementations';

export default function XRPLPage() {
  const t = useTranslations('xrpl');
  const tc = useTranslations('common');

  const statusEntries = Object.entries(XRPL_KNOWLEDGE.xrp_legal_status.jurisdiction_notes);

  const flagMap: Record<string, string> = {
    eu: '\uD83C\uDDEA\uD83C\uDDFA', us: '\uD83C\uDDFA\uD83C\uDDF8', sg: '\uD83C\uDDF8\uD83C\uDDEC',
    uk: '\uD83C\uDDEC\uD83C\uDDE7', uae: '\uD83C\uDDE6\uD83C\uDDEA', hk: '\uD83C\uDDED\uD83C\uDDF0',
    ch: '\uD83C\uDDE8\uD83C\uDDED', li: '\uD83C\uDDF1\uD83C\uDDEE',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <span className="badge-xrpl text-sm px-3 py-1">XRPL</span>
        <h1 className="mt-4 text-3xl font-bold">{t('title')}</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      {/* XRP Legal Status */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">{t('xrpStatus')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{XRPL_KNOWLEDGE.xrp_legal_status.summary}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {statusEntries.map(([code, note]) => (
            <div key={code} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{flagMap[code] ?? ''}</span>
                <span className="font-semibold text-sm uppercase">{code}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVM Sidechain */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">{t('evmSidechain')}</h2>
        <div className="card">
          <p className="text-sm mb-3">{XRPL_KNOWLEDGE.xrpl_evm_sidechain.summary}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{XRPL_KNOWLEDGE.xrpl_evm_sidechain.regulatory_treatment}</p>
          <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            {XRPL_KNOWLEDGE.xrpl_evm_sidechain.bridge_note}
          </p>
        </div>
      </section>

      {/* Native Features */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">{t('nativeFeatures')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3">Feature</th>
                <th className="text-left p-3">Standard</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Regulatory Note</th>
              </tr>
            </thead>
            <tbody>
              {XRPL_FEATURES.map((f) => (
                <tr key={f.name} className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium">{f.name}</td>
                  <td className="p-3"><code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">{f.standard}</code></td>
                  <td className="p-3 text-xs">{f.status}</td>
                  <td className="p-3 text-xs text-gray-600 dark:text-gray-400">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Custody Matrix */}
      <section className="mb-12">
        <CustodyImplementations />
      </section>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link href="/wizard" className="btn-xrpl text-lg px-8 py-4">
          {t('startWizard')} &rarr;
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
