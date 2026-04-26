import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import CustodyImplementations from '@/components/report/CustodyImplementations';
import XrplCustodyMatrix from '@/components/learn/diagrams/XrplCustodyMatrix';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Matrice Custody XRPL — 10 méthodes classées par posture réglementaire | Regul8'
      : 'XRPL Custody Matrix — 10 methods classified by regulatory posture | Regul8',
    description: isFr
      ? 'Les 10 méthodes de custody XRPL réparties en 3 colonnes (custodial / zone grise / non-custodial) avec les 8 fournisseurs institutionnels (Anchorage, Fireblocks, BitGo, Ripple Custody…) et les wallets non-custodial (Xaman, Lobstr, Crossmark…).'
      : 'The 10 XRPL custody methods classified in 3 columns (custodial / grey zone / non-custodial) with the 8 institutional providers (Anchorage, Fireblocks, BitGo, Ripple Custody…) and non-custodial wallets (Xaman, Lobstr, Crossmark…).',
  };
}

// Provider data — kept in this page (the only consumer). Each detailed
// card has an id={`provider-{slug}`} that matches the matrix chips' href
// so clicking a chip smooth-scrolls down to the matching card.
const PROVIDERS = [
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
    logo: '🛡️',
    website: 'https://www.bitgo.com',
    focusEn: 'Multi-sig + MPC custody. SD state trust (South Dakota) + NY trust. Settlement provider.',
    focusFr: 'Custody multi-sig + MPC. Trust SD (South Dakota) + NY trust. Provider de règlement.',
    jurs: ['🇺🇸', '🇪🇺'],
    xrplEn: 'XRP supported in multi-sig cold wallet + institutional qualified custody.',
    xrplFr: 'XRP supporté en cold wallet multi-sig + qualified custody institutionnelle.',
  },
  {
    name: 'Taurus',
    logo: '♉',
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

export default async function XrplCustodyPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        warningTitle: "La zone grise n'est pas un blanc-seing",
        warningBody:
          "Les régulateurs n'ont pas publié de guidance définitive sur les Regular Key, les seuils de SignerList en minorité ou MPC/TSS sous MiCA. Un avis juridique écrit est essentiel avant tout lancement. La classification peut évoluer au gré des mises à jour ESMA/FCA.",
        diagramLink: 'Ouvrir le diagramme en page dédiée',
        providersTitle: 'Fournisseurs custody compatibles XRPL',
        providersDesc:
          "Détails des 8 fournisseurs institutionnels de custody supportant XRPL — modèle, juridictions licenciées, support XRPL spécifique. La matrice ci-dessus les classe par posture réglementaire ; les cartes ci-dessous donnent les détails opérationnels.",
        providersDisclaimer:
          "Informations publiques compilées à titre pédagogique. Ne constitue pas une recommandation. Vérifiez les licences et le support XRPL à jour auprès de chaque fournisseur avant intégration.",
      }
    : {
        warningTitle: "Grey zone isn't a free pass",
        warningBody:
          "Regulators haven't issued definitive guidance on Regular Key, SignerList minority thresholds, or MPC/TSS under MiCA. A written legal opinion is essential before launch. The classification can shift with ESMA/FCA updates.",
        diagramLink: 'Open the standalone diagram page',
        providersTitle: 'XRPL-compatible custody providers',
        providersDesc:
          'Details on the 8 institutional custody providers with XRPL support — model, licensed jurisdictions, specific XRPL support. The matrix above classifies them by regulatory posture; the cards below give the operational detail.',
        providersDisclaimer:
          'Public information compiled for educational purposes. Not a recommendation. Verify current licences and XRPL support with each provider before integration.',
      };

  return (
    <>
      <section className="mb-6">
        <XrplCustodyMatrix showProviders />
      </section>

      {/* Grey-zone warning callout — visually anchored to the matrix's
          amber column. */}
      <div className="mb-6 rounded-lg border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none shrink-0">⚠️</span>
          <div>
            <div className="font-bold text-sm text-amber-900 dark:text-amber-100 mb-1">
              {tr.warningTitle}
            </div>
            <p className="text-xs text-amber-900/90 dark:text-amber-100/90 leading-relaxed">
              {tr.warningBody}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 text-center">
        <Link
          href="/learn/diagrams/xrpl-custody"
          className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
        >
          {tr.diagramLink} &rarr;
        </Link>
      </div>

      <section className="mb-10">
        <CustodyImplementations />
      </section>

      {/* Detailed provider cards. Each card has an `id` matching the
          chips' href in XrplCustodyMatrix so clicking a chip
          smooth-scrolls the user down to this card. */}
      <section>
        <h2 className="text-xl font-bold mb-2">{tr.providersTitle}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tr.providersDesc}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROVIDERS.map((p) => (
            <a
              key={p.name}
              id={`provider-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:border-violet-500 transition-colors block scroll-mt-24"
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
        <p className="text-xs text-gray-500 mt-4 italic">{tr.providersDisclaimer}</p>
      </section>
    </>
  );
}
