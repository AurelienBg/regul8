import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, ACTIVITIES } from '@/types';
import Image from 'next/image';
import ReportCardPreview from '@/components/layout/ReportCardPreview';

const ACTIVITY_LABELS_EN: Record<string, string> = {
  exchange: 'Exchange', dapp_fin: 'DeFi', dapp_util: 'Utility DApp', nft: 'NFT',
  mpt: 'MPT', rwa: 'RWA', stablecoin: 'Stablecoin', gaming: 'Gaming',
  custody: 'Custody', payment: 'Payment', onramp_offramp: 'On/Off-ramp',
  cross_border_payment: 'Cross-border', token_utility: 'Utility Token',
  token_security: 'Security Token', token_hybrid: 'Hybrid Token',
};

const ACTIVITY_LABELS_FR: Record<string, string> = {
  exchange: 'Exchange', dapp_fin: 'DeFi', dapp_util: 'DApp utilitaire', nft: 'NFT',
  mpt: 'MPT', rwa: 'RWA', stablecoin: 'Stablecoin', gaming: 'Gaming',
  custody: 'Custody', payment: 'Paiement', onramp_offramp: 'On/Off-ramp',
  cross_border_payment: 'Transfrontalier', token_utility: 'Utility Token',
  token_security: 'Security Token', token_hybrid: 'Token hybride',
};

export default function LandingPage() {
  const t = useTranslations('landing');
  const tc = useTranslations('common');
  const locale = useLocale();
  const isFr = locale === 'fr';
  const labels = isFr ? ACTIVITY_LABELS_FR : ACTIVITY_LABELS_EN;

  const startHere = isFr
    ? {
        title: 'Par où commencer ?',
        subtitle: 'Choisissez le mode qui colle à votre besoin du moment.',
        askHint: (
          <>
            Question précise en tête ? Appuyez sur <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">⌘K</kbd> ou cliquez sur 💬 en bas à droite — n&apos;importe où sur le site.
          </>
        ),
        cards: [
          {
            href: '/understand',
            icon: '📚',
            title: 'Comprendre',
            desc: "Concepts, guides, diagrammes, cas d'usage, glossaire, FAQ, XRPL Hub — la référence complète.",
            cta: 'Explorer',
            accent: 'blue',
          },
          {
            href: '/compare',
            icon: '📊',
            title: 'Comparer',
            desc: 'Empilez 2 à 5 activités dans une juridiction — ou 2 à 5 juridictions pour une activité.',
            cta: 'Ouvrir le comparateur',
            accent: 'emerald',
          },
          {
            href: '/assess',
            icon: '🧙',
            title: 'Évaluer',
            desc: 'Rapport complet multi-activités × multi-juridictions avec analyse IA contextuelle. ~5 min.',
            cta: 'Lancer une évaluation',
            accent: 'violet',
          },
          {
            href: '/check',
            icon: '🩺',
            title: 'Vérifier',
            desc: 'Diagnostic rapide : security token ? CASP requis ? Custody custodial ? Juridiction ? ~2 min.',
            cta: 'Lancer un diagnostic',
            accent: 'amber',
          },
        ],
      }
    : {
        title: 'Start here',
        subtitle: 'Pick the mode that matches what you need right now.',
        askHint: (
          <>
            Got a specific question? Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">⌘K</kbd> or click 💬 bottom-right — from anywhere on the site.
          </>
        ),
        cards: [
          {
            href: '/understand',
            icon: '📚',
            title: 'Understand',
            desc: 'Concepts, guides, diagrams, use cases, glossary, FAQ, XRPL Hub — the full reference.',
            cta: 'Browse library',
            accent: 'blue',
          },
          {
            href: '/compare',
            icon: '📊',
            title: 'Compare',
            desc: 'Stack 2-5 activities in one jurisdiction — or 2-5 jurisdictions for one activity.',
            cta: 'Open comparator',
            accent: 'emerald',
          },
          {
            href: '/assess',
            icon: '🧙',
            title: 'Assess',
            desc: 'Comprehensive multi-activity × multi-jurisdiction report with contextual AI analysis. ~5 min.',
            cta: 'Start assessment',
            accent: 'violet',
          },
          {
            href: '/check',
            icon: '🩺',
            title: 'Check',
            desc: 'Quick diagnostic: security token? CASP required? Custody custodial? Which jurisdiction? ~2 min.',
            cta: 'Run a diagnostic',
            accent: 'amber',
          },
        ],
      };

  const accentClasses: Record<string, { border: string; hover: string; bg: string; text: string }> = {
    blue: {
      border: 'border-blue-200 dark:border-blue-900/50',
      hover: 'hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10',
      bg: 'bg-gradient-to-br from-blue-50/60 to-transparent dark:from-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
    },
    emerald: {
      border: 'border-emerald-200 dark:border-emerald-900/50',
      hover: 'hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10',
      bg: 'bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    violet: {
      border: 'border-violet-200 dark:border-violet-900/50',
      hover: 'hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10',
      bg: 'bg-gradient-to-br from-violet-50/60 to-transparent dark:from-violet-900/20',
      text: 'text-violet-600 dark:text-violet-400',
    },
    amber: {
      border: 'border-amber-200 dark:border-amber-900/50',
      hover: 'hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/10',
      bg: 'bg-gradient-to-br from-amber-50/60 to-transparent dark:from-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 items-center">
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
              <Link href="/assess" className="btn-primary text-base px-6 py-3">
                {t('ctaWizard')} &rarr;
              </Link>
              <Link href="/understand" className="btn-secondary text-base px-6 py-3">
                {isFr ? 'Explorer la régulation' : 'Explore regulation'} &rarr;
              </Link>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:max-w-md lg:ml-auto">
            <ReportCardPreview />
          </div>
        </div>
      </section>

      {/* Start here — 4 persona-oriented cards */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{startHere.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{startHere.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {startHere.cards.map((card, i) => {
              const a = accentClasses[card.accent];
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`group flex flex-col h-full p-6 rounded-xl border-2 ${a.border} ${a.bg} ${a.hover} transition-all duration-200`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${a.text} bg-white/80 dark:bg-gray-900/60 border border-current`}>
                      {i + 1}
                    </span>
                    <span className="text-3xl">{card.icon}</span>
                    <h3 className={`text-lg font-bold group-hover:${a.text} transition-colors`}>
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                    {card.desc}
                  </p>
                  <span className={`text-sm font-semibold ${a.text} inline-flex items-center gap-1 mt-auto group-hover:translate-x-1 transition-transform`}>
                    {card.cta} &rarr;
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 max-w-2xl mx-auto">
            {startHere.askHint}
          </p>
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
            <Link href="/understand/xrpl" className="btn-xrpl">
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
                {labels[key] ?? key}
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
