import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { JURISDICTIONS, ACTIVITIES } from '@/types';
import { TOPIC_META, type Topic } from '@/data/term-topics';
import Image from 'next/image';
import ReportCardPreview from '@/components/layout/ReportCardPreview';
import ConceptsNarrative from '@/components/learn/ConceptsNarrative';

const ACTIVITY_LABELS_EN: Record<string, string> = {
  exchange: 'Exchange', dapp_fin: 'DeFi', dapp_util: 'Utility DApp', nft: 'NFT',
  mpt: 'MPT', rwa: 'RWA', stablecoin: 'Stablecoin', gaming: 'Gaming',
  custody: 'Custody', payment: 'Payment', onramp_offramp: 'On/Off-ramp',
  cross_border_payment: 'Cross-border', token_utility: 'Utility Token',
  token_security: 'Security Token', token_hybrid: 'Hybrid Token',
  staking: 'Staking', lending: 'Lending', asset_management: 'Asset mgmt',
  derivatives: 'Derivatives', launchpad: 'Launchpad',
};

const ACTIVITY_LABELS_FR: Record<string, string> = {
  exchange: 'Exchange', dapp_fin: 'DeFi', dapp_util: 'DApp utilitaire', nft: 'NFT',
  mpt: 'MPT', rwa: 'RWA', stablecoin: 'Stablecoin', gaming: 'Gaming',
  custody: 'Custody', payment: 'Paiement', onramp_offramp: 'On/Off-ramp',
  cross_border_payment: 'Transfrontalier', token_utility: 'Utility Token',
  token_security: 'Security Token', token_hybrid: 'Token hybride',
  staking: 'Staking', lending: 'Prêt', asset_management: 'Gestion d\'actifs',
  derivatives: 'Dérivés', launchpad: 'Launchpad',
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
            href: '/assess',
            icon: '🧙',
            title: 'Évaluer',
            desc: 'Deux portes : diagnostic éclair sur UNE question précise (~2 min) ou profil réglementaire complet multi-activités × multi-juridictions avec analyse IA (~5-10 min).',
            cta: 'Lancer une évaluation',
            accent: 'violet',
            badge: '👇 Le plus utile pour valider vite',
          },
          {
            href: '/compare',
            icon: '📊',
            title: 'Comparer',
            desc: 'Empilez 2 à 5 activités dans une juridiction — ou 2 à 5 juridictions pour une activité. Tableau côte-à-côte.',
            cta: 'Ouvrir le comparateur',
            accent: 'emerald',
          },
          {
            href: '/learn',
            icon: '📚',
            title: 'Apprendre',
            desc: "Concepts, guides, diagrammes, cas d'usage, glossaire, FAQ, XRPL Hub — la référence complète.",
            cta: 'Explorer',
            accent: 'blue',
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
            href: '/assess',
            icon: '🧙',
            title: 'Assess',
            desc: 'Two doors: quick diagnostic on ONE specific question (~2 min) or full regulatory profile across multi-activity × multi-jurisdiction with contextual AI analysis (~5-10 min).',
            cta: 'Start assessment',
            accent: 'violet',
            badge: '👇 Most useful to validate fast',
          },
          {
            href: '/compare',
            icon: '📊',
            title: 'Compare',
            desc: 'Stack 2-5 activities in one jurisdiction — or 2-5 jurisdictions for one activity. Side-by-side table.',
            cta: 'Open comparator',
            accent: 'emerald',
          },
          {
            href: '/learn',
            icon: '📚',
            title: 'Learn',
            desc: 'Concepts, guides, diagrams, use cases, glossary, FAQ, XRPL Hub — the full reference.',
            cta: 'Browse library',
            accent: 'blue',
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
            <div className="mt-5 text-base sm:text-lg">
              <ConceptsNarrative variant="short" linkTo="/learn/concepts" />
            </div>
            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/assess"
                className="btn-primary text-base px-6 py-3 border border-transparent w-full sm:w-72 justify-center whitespace-nowrap"
              >
                {t('ctaWizard')} &rarr;
              </Link>
              <Link
                href="/learn"
                className="btn-secondary text-base px-6 py-3 w-full sm:w-72 justify-center whitespace-nowrap"
              >
                {isFr ? 'Explorer la régulation' : 'Explore regulation'} &rarr;
              </Link>
            </div>
          </div>

          {/* Direct-to-wizard shortcut. The CTA reads 'Generate your report',
              which is clearly the full assessment action — skip the /assess
              hub (quick vs full chooser) and land the user straight into the
              wizard. */}
          <Link
            href="/assess/full"
            className="group block w-full max-w-sm mx-auto lg:max-w-md lg:ml-auto"
            aria-label={isFr ? 'Lancer une évaluation complète' : 'Start full assessment'}
          >
            <ReportCardPreview />
          </Link>
        </div>
      </section>

      {/* How we structure compliance — 3-zone framework (A Inputs, B Outputs, C Context) */}
      <section className="py-16 px-4 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {isFr ? 'Comment on structure la conformité' : 'How we structure compliance'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              {isFr
                ? 'Tous les rapports Regul8 s\'articulent autour de 8 concepts fondamentaux, regroupés en 3 zones reflétant le parcours d\'une société.'
                : 'Every Regul8 report is built around 8 foundational concepts, grouped into 3 zones that mirror a company\'s journey.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Zone A — Inputs */}
            <ZoneCard
              bgClass="bg-blue-50/60 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50"
              title={isFr ? 'INPUTS' : 'INPUTS'}
              subtitle={isFr ? 'Ce que vous construisez' : 'What you are building'}
              desc={
                isFr
                  ? "Ce que votre startup émet ou opère. Déterminent toute l'analyse en aval."
                  : 'What your startup issues or operates. Determines everything downstream.'
              }
              concepts={['token', 'infra']}
              isFr={isFr}
            />
            {/* Zone B — Outputs */}
            <ZoneCard
              bgClass="bg-emerald-50/60 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/50"
              title="OUTPUTS"
              subtitle={isFr ? 'Ce que vous devez faire' : 'What you must do'}
              desc={
                isFr
                  ? 'Les actions concrètes et livrables de conformité. Le cœur actionable.'
                  : 'The concrete compliance actions and deliverables. The actionable core.'
              }
              concepts={['licence', 'obligation']}
              isFr={isFr}
              emphasis
            />
            {/* Zone C — Context */}
            <ZoneCard
              bgClass="bg-amber-50/60 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50"
              title={isFr ? 'CONTEXT' : 'CONTEXT'}
              subtitle={isFr ? 'Où, auprès de qui, sous quelle loi' : 'Where, with whom, under what law'}
              desc={
                isFr
                  ? 'Le cadre qui entoure les outputs. Pour naviguer les zones grises.'
                  : 'The framing around the outputs. Helps navigate grey zones.'
              }
              concepts={['regulator', 'regime', 'doctrine']}
              extraItem={{
                icon: '🗺️',
                labelEn: 'Jurisdiction',
                labelFr: 'Juridiction',
              }}
              isFr={isFr}
            />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/learn/concepts"
              className="btn-secondary text-sm inline-flex items-center gap-1"
            >
              {isFr ? 'Voir les 8 concepts en détail' : 'Browse all 8 concepts in detail'} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Start here — 3 persona-oriented cards (post Check+Assess fusion) */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          {/* Centered header — matches the 'How we structure compliance'
              section above for consistent landing-page rhythm. */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{startHere.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{startHere.subtitle}</p>
          </div>

          {/* Grid mirrors the 3-zone cards above (md:grid-cols-3 gap-4) so
              the Start-here cards sit at the same width + rhythm as the
              Inputs / Outputs / Context cards — consistent landing-page
              visual rhythm instead of 2 different card widths. */}
          <div className="grid md:grid-cols-3 gap-4">
            {startHere.cards.map((card, i) => {
              const a = accentClasses[card.accent];
              const badge = 'badge' in card ? (card as { badge?: string }).badge : undefined;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`group relative flex flex-col h-full p-6 rounded-xl border-2 ${a.border} ${a.bg} ${a.hover} transition-all duration-200`}
                >
                  {badge && (
                    <span className={`absolute -top-3 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-sm bg-violet-600 text-white dark:bg-violet-500`}>
                      {badge}
                    </span>
                  )}
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

      {/* XRPL Section — the single biggest differentiator of the app.
          4 pillar chips under the desc match the 4 tabs on /learn/xrpl
          (Legal · Tech · Custody · Companies) so the user gets a
          preview of what they'll find behind the CTA. */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge-xrpl text-sm px-3 py-1">XRPL</span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{t('xrplSection')}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('xrplDesc')}
          </p>
          {/* 4 pillar chips mirroring /learn/xrpl tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {(isFr
              ? [
                  { icon: '🌍', label: 'Statut légal' },
                  { icon: '⚡', label: 'Technologie' },
                  { icon: '🔐', label: 'Custody' },
                  { icon: '🏢', label: 'Entreprises' },
                ]
              : [
                  { icon: '🌍', label: 'Legal status' },
                  { icon: '⚡', label: 'Technology' },
                  { icon: '🔐', label: 'Custody' },
                  { icon: '🏢', label: 'Companies' },
                ]
            ).map((pillar) => (
              <span
                key={pillar.label}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-xrpl-50 text-xrpl-700 dark:bg-xrpl/20 dark:text-xrpl-100 border border-xrpl-100 dark:border-xrpl/40"
              >
                <span>{pillar.icon}</span>
                <span>{pillar.label}</span>
              </span>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/learn/xrpl" className="btn-xrpl">
              {tc('learnMore')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Jurisdictions — count is derived from the data so it auto-updates
          whenever we add a jurisdiction (e.g. Ghana, Cameroon, Israel, …). */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">
            {Object.keys(JURISDICTIONS).length} {t('jurisdictions')}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-center">
            {Object.entries(JURISDICTIONS).map(([code, j]) => (
              <div
                key={code}
                className="card px-2 py-3 flex flex-col items-center text-center gap-1 overflow-hidden"
              >
                <span className="text-3xl leading-none">{j.flag}</span>
                <span className="font-medium text-xs sm:text-sm whitespace-nowrap truncate w-full">
                  {j.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities — same dynamic-count pattern. */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">
            {Object.keys(ACTIVITIES).length} {t('activities')}
          </h2>
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

      {/* Disclaimer is rendered globally in <Footer> — no need to duplicate here */}
    </div>
  );
}

// Small presentational helper for the 3-zone framework section on the home.
// Renders a coloured card with zone title + subtitle + the concept pills.
function ZoneCard({
  bgClass,
  title,
  subtitle,
  desc,
  concepts,
  extraItem,
  emphasis = false,
  isFr,
}: {
  bgClass: string;
  title: string;
  subtitle: string;
  desc: string;
  concepts: Topic[];
  extraItem?: { icon: string; labelEn: string; labelFr: string };
  emphasis?: boolean;
  isFr: boolean;
}) {
  return (
    <div className={`p-5 rounded-xl border-2 ${bgClass} ${emphasis ? 'shadow-md' : ''} h-full flex flex-col`}>
      <div className="mb-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100">
          {title}
        </div>
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{subtitle}</div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {concepts.map((t) => {
          const meta = TOPIC_META[t];
          return (
            <span
              key={t}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${meta.pillClass}`}
            >
              <span>{meta.icon}</span>
              <span>{isFr ? meta.labelFr : meta.labelEn}</span>
            </span>
          );
        })}
        {extraItem && (
          // Jurisdiction cross-cut — teal palette, clearly distinct from all
          // 7 topic palettes and from the slate used for Infrastructure.
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
            <span>{extraItem.icon}</span>
            <span>{isFr ? extraItem.labelFr : extraItem.labelEn}</span>
          </span>
        )}
      </div>
    </div>
  );
}
