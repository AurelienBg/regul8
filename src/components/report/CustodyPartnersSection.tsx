'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  CUSTODY_PROVIDERS,
  providerMatchesJurisdictions,
} from '@/data/custody-providers';
import type { Jurisdiction } from '@/types';

interface Props {
  /** Jurisdictions selected in the user's report — used to filter the
   *  provider list down to those operating in / passportable to those
   *  jurisdictions. */
  jurisdictions: Jurisdiction[];
}

/**
 * Renders an "Institutional custody partners" block on /report whenever
 * the user includes `custody` in their selected activities. The block
 * surfaces the XRPL-supporting providers that actually operate in (or
 * passport into) the user's jurisdictions, turning the report from
 * "here are the rules" into "here are the rules + here are the partners
 * who can be your custodian under licence".
 *
 * Empty state (no provider matches the user's jurisdictions, e.g. all
 * African + Latin-American emerging markets) is handled with a friendly
 * fallback link to the full provider list.
 */
export default function CustodyPartnersSection({ jurisdictions }: Props) {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const matched = CUSTODY_PROVIDERS.filter((p) =>
    providerMatchesJurisdictions(p, jurisdictions),
  );

  const tr = isFr
    ? {
        title: '🤝 Partenaires custody pour vos juridictions',
        subtitle:
          'Vous avez sélectionné l\'activité custody. Voici les fournisseurs institutionnels supportant XRPL qui opèrent dans (ou passporting vers) vos juridictions sélectionnées. Cliquez pour ouvrir leur site.',
        empty: 'Aucun fournisseur de notre liste ne couvre directement vos juridictions sélectionnées. Voir la liste complète :',
        emptyCta: 'Tous les partenaires custody XRPL',
        disclaimer:
          'Informations publiques — pas une recommandation. Vérifiez les licences et le support XRPL à jour avec chaque fournisseur avant intégration.',
        focusLabel: 'Modèle',
        xrplLabel: 'Support XRPL',
      }
    : {
        title: '🤝 Custody partners for your jurisdictions',
        subtitle:
          'You selected custody as an activity. Here are XRPL-supporting institutional providers who operate in (or passport into) your selected jurisdictions. Click any card to open their site.',
        empty: 'None of the providers we track directly cover your selected jurisdictions. See the full list:',
        emptyCta: 'All XRPL custody partners',
        disclaimer:
          'Public information — not a recommendation. Verify current licences and XRPL support with each provider before integration.',
        focusLabel: 'Model',
        xrplLabel: 'XRPL support',
      };

  return (
    <section className="mt-12 pt-8 border-t border-[var(--border)]">
      <h2 className="text-xl font-bold mb-1">{tr.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{tr.subtitle}</p>

      {matched.length === 0 ? (
        <div className="p-4 rounded-lg border border-[var(--border)] bg-gray-50 dark:bg-gray-900/40 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{tr.empty}</p>
          <Link
            href="/learn/xrpl/custody"
            className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
          >
            {tr.emptyCta} &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {matched.map((p) => (
            <a
              key={p.id}
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:border-violet-500 transition-colors block"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl shrink-0">{p.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {p.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1.5 leading-snug">
                <span className="font-semibold">{tr.focusLabel}:</span>{' '}
                {isFr ? p.focusFr : p.focusEn}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                <span className="font-semibold">{tr.xrplLabel}:</span>{' '}
                {isFr ? p.xrplFr : p.xrplEn}
              </p>
            </a>
          ))}
        </div>
      )}

      <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400 italic">{tr.disclaimer}</p>
    </section>
  );
}
