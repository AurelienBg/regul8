import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { XRPL_FEATURES, XRPL_KNOWLEDGE, XRPL_UPCOMING_AMENDMENTS } from '@/data/xrpl';
import { XRPL_FEATURES_FR, XRPL_KNOWLEDGE_FR, XRPL_UPCOMING_AMENDMENTS_FR } from '@/data/xrpl.fr';
import LinkedText from '@/components/ui/LinkedText';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Technologie XRPL — fonctionnalités natives + EVM Sidechain | Regul8'
      : 'XRPL technology — native features + EVM Sidechain | Regul8',
    description: isFr
      ? 'Vue d\'ensemble des fonctionnalités natives XRPL (AMM XLS-30, NFT XLS-20, MPT XLS-33, RLUSD, Escrow, Payment Channels, DEX) et de l\'EVM Sidechain — avec leur statut réglementaire actuel.'
      : 'Overview of XRPL native features (AMM XLS-30, NFT XLS-20, MPT XLS-33, RLUSD, Escrow, Payment Channels, DEX) and the EVM Sidechain — with their current regulatory status.',
  };
}

export default async function XrplTechPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';
  const t = await getTranslations('xrpl');
  const knowledge = isFr ? XRPL_KNOWLEDGE_FR : XRPL_KNOWLEDGE;
  const features = isFr ? XRPL_FEATURES_FR : XRPL_FEATURES;
  const upcoming = isFr ? XRPL_UPCOMING_AMENDMENTS_FR : XRPL_UPCOMING_AMENDMENTS;

  return (
    <>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">{t('evmSidechain')}</h2>
        <div className="card">
          <p className="text-sm mb-3">{knowledge.xrpl_evm_sidechain.summary}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{knowledge.xrpl_evm_sidechain.regulatory_treatment}</p>
          <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            {knowledge.xrpl_evm_sidechain.bridge_note}
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">{t('nativeFeatures')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3">{t('tableFeature')}</th>
                <th className="text-left p-3">{t('tableStandard')}</th>
                <th className="text-left p-3">{t('tableStatus')}</th>
                <th className="text-left p-3">{t('tableRegNote')}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
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

      {/* Upcoming amendments — what compliance should watch */}
      <section>
        <h2 className="text-xl font-bold mb-2">{t('upcomingTitle')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('upcomingSubtitle')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-3">{t('tableFeature')}</th>
                <th className="text-left p-3">{t('tableStandard')}</th>
                <th className="text-left p-3">{t('tableStatus')}</th>
                <th className="text-left p-3">{t('tableRegNote')}</th>
                <th className="text-left p-3">{t('tableImpact')}</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((a) => (
                <tr key={a.name} className="border-b border-[var(--border)]">
                  <td className="p-3 font-medium">{a.name}</td>
                  <td className="p-3"><code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">{a.standard}</code></td>
                  <td className="p-3 text-xs">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{a.note}</td>
                  <td className="p-3 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <LinkedText>{a.complianceImpact}</LinkedText>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
