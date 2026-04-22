'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { XRPL_KNOWLEDGE, XRPL_FEATURES } from '@/data/xrpl';
import { XRPL_KNOWLEDGE_FR, XRPL_FEATURES_FR } from '@/data/xrpl.fr';
import CustodyImplementations from '@/components/report/CustodyImplementations';
import XRPLMark from '@/components/ui/XRPLMark';

type XrplTab = 'legal' | 'tech' | 'custody';

export default function XRPLPage() {
  const t = useTranslations('xrpl');
  const tc = useTranslations('common');
  const locale = useLocale();
  const isFr = locale === 'fr';
  const knowledge = isFr ? XRPL_KNOWLEDGE_FR : XRPL_KNOWLEDGE;
  const features = isFr ? XRPL_FEATURES_FR : XRPL_FEATURES;
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<XrplTab>('legal');

  // Honour ?tab=legal|tech|custody on mount (deep link from elsewhere)
  useEffect(() => {
    const t = searchParams.get('tab');
    if (t === 'legal' || t === 'tech' || t === 'custody') setTab(t);
  }, [searchParams]);

  const statusEntries = Object.entries(knowledge.xrp_legal_status.jurisdiction_notes);

  const flagMap: Record<string, string> = {
    eu: '\uD83C\uDDEA\uD83C\uDDFA', us: '\uD83C\uDDFA\uD83C\uDDF8', sg: '\uD83C\uDDF8\uD83C\uDDEC',
    uk: '\uD83C\uDDEC\uD83C\uDDE7', uae: '\uD83C\uDDE6\uD83C\uDDEA', hk: '\uD83C\uDDED\uD83C\uDDF0',
    ch: '\uD83C\uDDE8\uD83C\uDDED', li: '\uD83C\uDDF1\uD83C\uDDEE',
    jp: '\uD83C\uDDEF\uD83C\uDDF5', kr: '\uD83C\uDDF0\uD83C\uDDF7', in: '\uD83C\uDDEE\uD83C\uDDF3',
    br: '\uD83C\uDDE7\uD83C\uDDF7', ng: '\uD83C\uDDF3\uD83C\uDDEC', ke: '\uD83C\uDDF0\uD83C\uDDEA',
    za: '\uD83C\uDDFF\uD83C\uDDE6',
  };

  const tabLabels = isFr
    ? {
        legal: '🌍 Statut légal',
        tech: '⚡ Technologie',
        custody: '🔐 Custody',
        providersTitle: 'Fournisseurs avec support XRPL',
        providersDesc: "Les principaux fournisseurs qui supportent XRPL en custody institutionnelle. Cette liste n'est pas exhaustive — vérifiez la conformité et les licences à jour avant toute intégration.",
        providersDisclaimer: "Informations publiques compilées à titre pédagogique. Ne constitue pas une recommandation. Vérifiez les licences et le support XRPL à jour auprès de chaque fournisseur avant intégration.",
      }
    : {
        legal: '🌍 Legal status',
        tech: '⚡ Technology',
        custody: '🔐 Custody',
        providersTitle: 'Providers with XRPL support',
        providersDesc: 'Leading providers with XRPL support in institutional custody. List is not exhaustive — verify compliance and current licences before any integration.',
        providersDisclaimer: 'Public information compiled for educational purposes. Not a recommendation. Verify current licences and XRPL support with each provider before integration.',
      };

  const providers = [
    {
      name: 'Ripple Custody',
      logo: '🔐',
      website: 'https://ripple.com/solutions/custody/',
      focusEn: 'Metaco (Swiss bank-grade tech) + Palisade (France-licensed MPC WaaS)',
      focusFr: 'Metaco (techno niveau bancaire Suisse) + Palisade (WaaS MPC licencié France)',
      jurs: ['🇨🇭', '🇪🇺'],
      xrplEn: 'XRPL-native — deepest integration (signer lists, Regular Key, trust lines)',
      xrplFr: 'Natif XRPL — intégration la plus profonde (signer lists, Regular Key, trust lines)',
    },
    {
      name: 'Fireblocks',
      logo: '🧱',
      website: 'https://www.fireblocks.com',
      focusEn: 'MPC custody for exchanges, banks, fintechs. ~2 000 institutional clients.',
      focusFr: 'Custody MPC pour exchanges, banques, fintechs. ~2 000 clients institutionnels.',
      jurs: ['🇮🇱', '🇺🇸', '🇪🇺'],
      xrplEn: 'XRPL supported since 2021, XRP + issued tokens + trust lines.',
      xrplFr: 'XRPL supporté depuis 2021, XRP + tokens émis + trust lines.',
    },
    {
      name: 'Anchorage Digital',
      logo: '⚓',
      website: 'https://www.anchorage.com',
      focusEn: 'Federally chartered crypto bank (OCC National Trust, 2021). HSM + cold storage.',
      focusFr: 'Banque crypto à charte fédérale (OCC National Trust, 2021). HSM + cold storage.',
      jurs: ['🇺🇸'],
      xrplEn: 'XRP supported for qualified custody + staking workflows (where applicable).',
      xrplFr: 'XRP supporté en qualified custody + workflows staking (selon le cas).',
    },
    {
      name: 'BitGo',
      logo: '🏛️',
      website: 'https://www.bitgo.com',
      focusEn: 'Multi-sig + MPC custody. SD state trust (South Dakota) + NY trust. Settlement provider.',
      focusFr: 'Custody multi-sig + MPC. Trust SD (South Dakota) + NY trust. Provider de règlement.',
      jurs: ['🇺🇸', '🇪🇺'],
      xrplEn: 'XRP supported in multi-sig cold wallet + institutional qualifed custody.',
      xrplFr: 'XRP supporté en cold wallet multi-sig + qualified custody institutionnelle.',
    },
    {
      name: 'Taurus',
      logo: '🐂',
      website: 'https://www.taurushq.com',
      focusEn: 'Swiss bank-grade custody (FINMA DLT framework). Used by Deutsche Bank, State Street.',
      focusFr: 'Custody niveau bancaire suisse (cadre DLT FINMA). Utilisée par Deutsche Bank, State Street.',
      jurs: ['🇨🇭', '🇪🇺'],
      xrplEn: 'XRPL supported for tokenised assets + RWAs via T-PROTECT platform.',
      xrplFr: 'XRPL supporté pour actifs tokenisés + RWAs via la plateforme T-PROTECT.',
    },
    {
      name: 'Copper',
      logo: '🟠',
      website: 'https://copper.co',
      focusEn: 'MPC custody for hedge funds + institutions. ClearLoop settlement network.',
      focusFr: 'Custody MPC pour hedge funds + institutions. Réseau de règlement ClearLoop.',
      jurs: ['🇬🇧', '🇨🇭'],
      xrplEn: 'XRP supported in institutional custody and ClearLoop settlement rails.',
      xrplFr: 'XRP supporté en custody institutionnelle et rails de règlement ClearLoop.',
    },
    {
      name: 'GateHub',
      logo: '🚪',
      website: 'https://gatehub.net',
      focusEn: 'XRPL-native retail/SME wallet and custody since 2014. Slovenia VASP.',
      focusFr: 'Wallet + custody XRPL-native retail/SME depuis 2014. VASP Slovénie.',
      jurs: ['🇪🇺'],
      xrplEn: 'Reference implementation of the XRPL IOU / Trust Line stablecoin model.',
      xrplFr: "Implémentation de référence du modèle stablecoin XRPL IOU / Trust Line.",
    },
    {
      name: 'Dfns',
      logo: '🔑',
      website: 'https://www.dfns.co',
      focusEn: 'Developer-first wallet-as-a-service, MPC-TSS key management via API.',
      focusFr: 'Wallet-as-a-service dev-first, gestion de clés MPC-TSS par API.',
      jurs: ['🇪🇺', '🇺🇸'],
      xrplEn: 'XRPL supported as one of 30+ chains. SOC2 Type II + France registered.',
      xrplFr: 'XRPL supporté parmi 30+ chaînes. SOC2 Type II + enregistré en France.',
    },
  ];

  const tabs: Array<{ key: XrplTab; label: string }> = [
    { key: 'legal', label: tabLabels.legal },
    { key: 'tech', label: tabLabels.tech },
    { key: 'custody', label: tabLabels.custody },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <XRPLMark className="w-10 h-10 text-gray-900 dark:text-gray-100 shrink-0" />
          <h1 className="text-3xl sm:text-4xl font-bold">{t('title')}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">{t('subtitle')}</p>
      </header>

      {/* Sub-tabs — 3 full-width segments */}
      <div className="mb-8 border-b border-[var(--border)]">
        <div className="grid grid-cols-3">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`text-center px-3 py-3 text-sm sm:text-base transition-colors border-b-4 -mb-px ${
                  active
                    ? 'border-violet-500 text-violet-600 dark:text-violet-400 font-bold'
                    : 'border-transparent text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab: Legal status ── */}
      {tab === 'legal' && (
        <section>
          <h2 className="text-xl font-bold mb-2">{t('xrpStatus')}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{knowledge.xrp_legal_status.summary}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
      )}

      {/* ── Tab: Technology (EVM Sidechain + Native Features) ── */}
      {tab === 'tech' && (
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

          <section>
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
        </>
      )}

      {/* ── Tab: Custody (Matrix + Providers) ── */}
      {tab === 'custody' && (
        <>
          <div className="mb-6 p-3 rounded-lg border border-violet-200 dark:border-violet-900/50 bg-violet-50/40 dark:bg-violet-900/10 flex items-center justify-between gap-3 flex-wrap">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              🔐{' '}
              {isFr
                ? 'Vue diagramme : matrice des 10 méthodes de custody XRPL classées par classification réglementaire.'
                : 'Diagram view: matrix of the 10 XRPL custody methods grouped by regulatory classification.'}
            </span>
            <Link
              href="/understand/diagrams/xrpl-custody"
              className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline whitespace-nowrap"
            >
              {isFr ? 'Ouvrir le diagramme' : 'Open the diagram'} &rarr;
            </Link>
          </div>

          <section className="mb-10">
            <CustodyImplementations />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">{tabLabels.providersTitle}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tabLabels.providersDesc}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {providers.map((p) => (
                <a
                  key={p.name}
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card hover:border-violet-500 transition-colors block"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{p.logo}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">{p.name}</span>
                        {p.jurs.map((f, i) => (
                          <span key={i} className="text-sm">{f}</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {isFr ? p.focusFr : p.focusEn}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-[var(--border)]">
                    <div className="flex items-start gap-1.5">
                      <span className="badge-xrpl text-[10px] shrink-0 mt-0.5">XRPL</span>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {isFr ? p.xrplFr : p.xrplEn}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">{tabLabels.providersDisclaimer}</p>
          </section>
        </>
      )}

      {/* CTA — always visible across all tabs */}
      <div className="text-center mt-12">
        <Link href="/assess" className="btn-xrpl text-lg px-8 py-4">
          {t('startWizard')} &rarr;
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
