import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, ACTIVITIES } from '@/types';

const ACTIVITY_LABELS_EN: Record<string, string> = {
  exchange: 'Exchange', dapp_fin: 'DeFi', dapp_util: 'Utility DApp', nft: 'NFT',
  mpt: 'MPT', rwa: 'RWA', stablecoin: 'Stablecoin', gaming: 'Gaming',
  custody: 'Custody', payment: 'Payment', token_utility: 'Token', token_security: 'Security Token', token_hybrid: 'Hybrid Token'
};

export default function LandingPage() {
  const t = useTranslations('landing');
  const tc = useTranslations('common');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-navy dark:text-white">
            {t('hero')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard" className="btn-primary text-lg px-8 py-4">
              {t('ctaWizard')} &rarr;
            </Link>
            <Link href="/search" className="btn-secondary text-lg px-8 py-4">
              {t('ctaSearch')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {(['wizard', 'search', 'compare'] as const).map((key) => (
            <div key={key} className="card">
              <h3 className="text-lg font-semibold mb-2">{t(`features.${key}`)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t(`features.${key}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* XRPL Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge-xrpl text-sm px-3 py-1">XRPL</span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{t('xrplSection')}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('xrplDesc')}
          </p>
          <div className="mt-6">
            <Link href="/xrpl" className="btn-xrpl">
              {tc('learnMore')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Jurisdictions */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">{t('jurisdictions')}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(JURISDICTIONS).map(([code, j]) => (
              <div key={code} className="card px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">{j.flag}</span>
                <span className="font-medium text-sm">{j.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">{t('activities')}</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(ACTIVITIES).map(([key, meta]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {ACTIVITY_LABELS_EN[key]}
                {meta.xrpl && <span className="badge-xrpl">XRPL</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 border-t border-[var(--border)]">
        <p className="text-xs text-gray-500 text-center max-w-2xl mx-auto">
          {tc('disclaimer')}
        </p>
      </section>
    </div>
  );
}
