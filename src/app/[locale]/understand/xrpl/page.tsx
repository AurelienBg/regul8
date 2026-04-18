'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { XRPL_KNOWLEDGE, XRPL_FEATURES } from '@/data/xrpl';
import { XRPL_KNOWLEDGE_FR, XRPL_FEATURES_FR } from '@/data/xrpl.fr';
import CustodyImplementations from '@/components/report/CustodyImplementations';

export default function XRPLPage() {
  const t = useTranslations('xrpl');
  const tc = useTranslations('common');
  const locale = useLocale();
  const isFr = locale === 'fr';
  const knowledge = isFr ? XRPL_KNOWLEDGE_FR : XRPL_KNOWLEDGE;
  const features = isFr ? XRPL_FEATURES_FR : XRPL_FEATURES;

  const statusEntries = Object.entries(knowledge.xrp_legal_status.jurisdiction_notes);

  const flagMap: Record<string, string> = {
    eu: '\uD83C\uDDEA\uD83C\uDDFA', us: '\uD83C\uDDFA\uD83C\uDDF8', sg: '\uD83C\uDDF8\uD83C\uDDEC',
    uk: '\uD83C\uDDEC\uD83C\uDDE7', uae: '\uD83C\uDDE6\uD83C\uDDEA', hk: '\uD83C\uDDED\uD83C\uDDF0',
    ch: '\uD83C\uDDE8\uD83C\uDDED', li: '\uD83C\uDDF1\uD83C\uDDEE',
    jp: '\uD83C\uDDEF\uD83C\uDDF5', kr: '\uD83C\uDDF0\uD83C\uDDF7', in: '\uD83C\uDDEE\uD83C\uDDF3',
    br: '\uD83C\uDDE7\uD83C\uDDF7', ng: '\uD83C\uDDF3\uD83C\uDDEC', ke: '\uD83C\uDDF0\uD83C\uDDEA',
    za: '\uD83C\uDDFF\uD83C\uDDE6',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <span className="badge-xrpl text-sm px-3 py-1">XRPL</span>
        <h1 className="mt-4 text-3xl font-bold">{t('title')}</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      {/* XRP Legal Status */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">{t('xrpStatus')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{knowledge.xrp_legal_status.summary}</p>
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

      {/* EVM Sidechain */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">{t('evmSidechain')}</h2>
        <div className="card">
          <p className="text-sm mb-3">{knowledge.xrpl_evm_sidechain.summary}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{knowledge.xrpl_evm_sidechain.regulatory_treatment}</p>
          <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            {knowledge.xrpl_evm_sidechain.bridge_note}
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

      {/* Custody Matrix */}
      <section className="mb-12">
        <CustodyImplementations />
      </section>

      {/* Institutional Custody Providers */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">
          {isFr ? 'Fournisseurs de custody institutionnels' : 'Institutional Custody Providers'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {isFr
            ? "Les principaux fournisseurs qui supportent XRPL en custody institutionnelle. Cette liste n'est pas exhaustive — vérifiez la conformité et les licences à jour avant toute intégration."
            : 'Leading providers with XRPL support in institutional custody. List is not exhaustive — verify compliance and current licences before any integration.'}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
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
          ].map((p) => (
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
        <p className="text-xs text-gray-500 mt-4 italic">
          {isFr
            ? "Informations publiques compilées à titre pédagogique. Ne constitue pas une recommandation. Vérifiez les licences et le support XRPL à jour auprès de chaque fournisseur avant intégration."
            : 'Public information compiled for educational purposes. Not a recommendation. Verify current licences and XRPL support with each provider before integration.'}
        </p>
      </section>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link href="/assess" className="btn-xrpl text-lg px-8 py-4">
          {t('startWizard')} &rarr;
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
