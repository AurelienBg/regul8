import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import CustodyImplementations from '@/components/report/CustodyImplementations';
import XrplCustodyMatrix from '@/components/learn/diagrams/XrplCustodyMatrix';
import { CUSTODY_PROVIDERS } from '@/data/custody-providers';
import { JURISDICTIONS } from '@/types';

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

// Provider data is now sourced from the shared CUSTODY_PROVIDERS module
// so /report's CustodyPartnersSection renders the same set, filtered by
// the report's selected jurisdictions. Single source of truth — adding
// a provider here lights it up everywhere.

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
          {CUSTODY_PROVIDERS.map((p) => (
            <a
              key={p.id}
              id={`provider-${p.id}`}
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
                    {p.jurisdictions.map((j) => (
                      <span key={j} className="text-sm" title={JURISDICTIONS[j]?.name}>
                        {JURISDICTIONS[j]?.flag}
                      </span>
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
