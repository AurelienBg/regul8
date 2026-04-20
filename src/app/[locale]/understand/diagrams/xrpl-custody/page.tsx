'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import XrplCustodyMatrix from '@/components/understand/diagrams/XrplCustodyMatrix';

export default function XrplCustodyMapPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tr = isFr ? {
    back: 'Diagrammes',
    title: 'Matrice custody XRPL',
    subtitle: "Les 10 méthodes de custody sur XRPL regroupées par classification réglementaire. Choisissez votre architecture en connaissance de cause.",
    greyTitle: "⚠️ La zone grise n'est pas un passe-droit",
    greyBody: "Les régulateurs n'ont pas publié de guidance définitive sur Regular Key, les seuils SignerList minorité, ou MPC/TSS sous MiCA. Un avis juridique écrit est essentiel avant de lancer. La classification peut évoluer avec les mises à jour ESMA/FCA.",
    setupTitle: 'Analysez votre propre architecture',
    setupBody: "Utilisez le diagnostic pour router votre architecture à travers les 10 méthodes et obtenir un verdict clair.",
    setupLink: 'Ma custody XRPL est-elle custodial ?',
    providersTitle: 'Fournisseurs custody avec support XRPL',
    providersIntro: "Plutôt que construire votre propre infrastructure custody (12–24 mois, licence requise, capital immobilisé), la plupart des startups s'adossent à un fournisseur licencié. Les principaux avec support XRPL natif ou institutionnel :",
    seeFullList: 'Voir la fiche complète des 8 fournisseurs sur la page XRPL',
  } : {
    back: 'Diagrams',
    title: 'XRPL Custody Matrix',
    subtitle: 'The 10 custody methods on XRPL grouped by regulatory classification. Pick your architecture deliberately.',
    greyTitle: "⚠️ Grey zone isn't a free pass",
    greyBody: "Regulators haven't issued definitive guidance on Regular Key, SignerList minority thresholds, or MPC/TSS under MiCA. A written legal opinion is essential before launch. The classification can shift with ESMA/FCA updates.",
    setupTitle: 'Figure out your own setup',
    setupBody: 'Use the diagnostic to route your architecture through the 10 methods and get a clear verdict.',
    setupLink: 'Is my XRPL custody custodial?',
    providersTitle: 'XRPL-compatible custody providers',
    providersIntro: 'Rather than building your own custody infrastructure (12–24 months, licence required, locked capital), most startups partner with a licensed provider. Main options with native or institutional XRPL support:',
    seeFullList: 'See the full 8-provider detail grid on the XRPL page',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="text-4xl mb-3">🔐</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{tr.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tr.subtitle}
        </p>
      </header>

      <XrplCustodyMatrix />

      {/* Institutional custody providers — mini list with cross-link to /understand/xrpl */}
      <section className="mt-10">
        <h2 className="text-lg font-bold mb-2">{tr.providersTitle}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tr.providersIntro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              name: 'Ripple Custody',
              logo: '🔐',
              flags: '🇨🇭 🇪🇺',
              role: isFr
                ? 'Metaco (techno bancaire suisse, 2023) + Palisade (MPC France, 2025). XRPL-native, intégration signer lists.'
                : 'Metaco (Swiss bank-grade tech, 2023) + Palisade (France MPC, 2025). XRPL-native, signer-list integration.',
            },
            {
              name: 'Fireblocks',
              logo: '🧱',
              flags: '🇮🇱 🇺🇸 🇪🇺',
              role: isFr
                ? 'MPC custody pour exchanges, banques, fintechs. XRPL supporté depuis 2021 (XRP, tokens émis, trust lines).'
                : 'MPC custody for exchanges, banks, fintechs. XRPL supported since 2021 (XRP, issued tokens, trust lines).',
            },
            {
              name: 'Anchorage Digital',
              logo: '⚓',
              flags: '🇺🇸',
              role: isFr
                ? 'Banque crypto chartée OCC (2021). HSM + cold storage. XRP en qualified custody.'
                : 'OCC-chartered crypto bank (2021). HSM + cold storage. XRP in qualified custody.',
            },
            {
              name: 'BitGo',
              logo: '🏛️',
              flags: '🇺🇸 🇪🇺',
              role: isFr
                ? 'Multi-sig + MPC. Trust SD + NY. XRP en cold wallet multi-sig + qualified custody.'
                : 'Multi-sig + MPC. SD + NY trust charters. XRP in multi-sig cold wallet + qualified custody.',
            },
            {
              name: 'Taurus',
              logo: '🐂',
              flags: '🇨🇭 🇪🇺',
              role: isFr
                ? 'Custody niveau bancaire (FINMA DLT). Utilisé par Deutsche Bank, State Street. XRPL pour RWAs.'
                : 'Bank-grade (FINMA DLT). Used by Deutsche Bank, State Street. XRPL for tokenised RWAs.',
            },
            {
              name: 'Copper',
              logo: '🟠',
              flags: '🇬🇧 🇨🇭',
              role: isFr
                ? 'MPC pour hedge funds + institutions. Réseau ClearLoop. XRP en custody + rails de règlement.'
                : 'MPC for hedge funds + institutions. ClearLoop network. XRP in custody + settlement rails.',
            },
            {
              name: 'GateHub',
              logo: '🚪',
              flags: '🇪🇺',
              role: isFr
                ? 'Wallet + custody XRPL-native depuis 2014. VASP Slovénie. Référence du modèle IOU / Trust Line.'
                : 'XRPL-native wallet + custody since 2014. Slovenia VASP. Reference IOU / Trust Line implementation.',
            },
            {
              name: 'Dfns',
              logo: '🔑',
              flags: '🇪🇺 🇺🇸',
              role: isFr
                ? 'Wallet-as-a-service dev-first, MPC-TSS par API. XRPL parmi 30+ chaînes. Enregistré en France.'
                : 'Developer-first wallet-as-a-service, MPC-TSS via API. XRPL among 30+ chains. Registered in France.',
            },
          ].map((p) => (
            <div key={p.name} className="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
              <div className="flex items-start gap-2 mb-1">
                <span className="text-xl leading-none mt-0.5">{p.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.flags}</div>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mt-1.5">{p.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link
            href={{ pathname: '/understand/xrpl', query: { tab: 'custody' } }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {tr.seeFullList} &rarr;
          </Link>
        </div>
      </section>

      <section className="mt-10 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
        <div className="font-bold text-amber-900 dark:text-amber-200 mb-1">{tr.greyTitle}</div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {tr.greyBody}
        </p>
      </section>

      <section className="mt-6 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">{tr.setupTitle}</div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{tr.setupBody}</p>
        <Link href="/check/diagnostics/xrpl-custody" className="btn-primary text-sm inline-block">
          {tr.setupLink} &rarr;
        </Link>
      </section>
    </div>
  );
}
