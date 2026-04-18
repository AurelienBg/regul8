import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, ACTIVITIES } from '@/types';
import Image from 'next/image';
import ReportCardPreview from '@/components/layout/ReportCardPreview';

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
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 items-center">
          {/* Left — text + CTAs */}
          <div className="text-center lg:text-left">
            <Image src="/logo.svg" alt="Regul8" width={700} height={150} className="mb-8 mx-auto lg:mx-0 w-full max-w-[360px] h-auto block dark:hidden" priority />
            <Image src="/logo-dark.svg" alt="Regul8" width={700} height={150} className="mb-8 mx-auto lg:mx-0 w-full max-w-[360px] h-auto hidden dark:block" priority />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
              {t('hero')}
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/wizard" className="btn-primary text-base px-6 py-3">
                {t('ctaWizard')} &rarr;
              </Link>
              <Link href="/search" className="btn-secondary text-base px-6 py-3">
                {t('ctaSearch')} &rarr;
              </Link>
            </div>
          </div>

          {/* Right — report card preview */}
          <div className="w-full max-w-sm mx-auto lg:max-w-md lg:ml-auto">
            <ReportCardPreview />
          </div>
        </div>
      </section>

      {/* Stepper — narrative journey */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">{t('stepperTitle')}</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">{t('stepperSubtitle')}</p>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line — desktop */}
            <div aria-hidden="true" className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900" />

            {([
              { key: 'check', href: '/check', icon: '🎯' },
              { key: 'learn', href: '/understand', icon: '📚' },
              { key: 'ask', href: '/search', icon: '🤖' },
            ] as const).map((step, i) => (
              <Link
                key={step.key}
                href={step.href}
                className="relative card hover:border-blue-500 transition-colors group bg-[var(--background)]"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-lg shadow-md">
                  {i + 1}
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {t(`steps.${step.key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t(`steps.${step.key}.desc`)}
                  </p>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {t(`steps.${step.key}.cta`)} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
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
