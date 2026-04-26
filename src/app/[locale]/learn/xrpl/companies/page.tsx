import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { USE_CASES } from '@/data/use-cases';

const FLAG_MAP: Record<string, string> = {
  eu: '\uD83C\uDDEA\uD83C\uDDFA', us: '\uD83C\uDDFA\uD83C\uDDF8', sg: '\uD83C\uDDF8\uD83C\uDDEC',
  uk: '\uD83C\uDDEC\uD83C\uDDE7', uae: '\uD83C\uDDE6\uD83C\uDDEA', hk: '\uD83C\uDDED\uD83C\uDDF0',
  ch: '\uD83C\uDDE8\uD83C\uDDED', li: '\uD83C\uDDF1\uD83C\uDDEE',
  jp: '\uD83C\uDDEF\uD83C\uDDF5', kr: '\uD83C\uDDF0\uD83C\uDDF7', in: '\uD83C\uDDEE\uD83C\uDDF3',
  br: '\uD83C\uDDE7\uD83C\uDDF7', ng: '\uD83C\uDDF3\uD83C\uDDEC', ke: '\uD83C\uDDF0\uD83C\uDDEA',
  za: '\uD83C\uDDFF\uD83C\uDDE6',
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Entreprises de l\'écosystème XRPL — cas d\'usage régulés | Regul8'
      : 'XRPL ecosystem companies — regulated use cases | Regul8',
    description: isFr
      ? 'Sélection d\'entreprises régulées qui utilisent XRPL en production : Ripple Payments / RLUSD / Custody, Uphold, Bitstamp, Archax, Sologenic / TX Network, Xaman et plus. Avec leurs licences par juridiction.'
      : 'Selected regulated companies using XRPL in production: Ripple Payments / RLUSD / Custody, Uphold, Bitstamp, Archax, Sologenic / TX Network, Xaman and more. With their licences by jurisdiction.',
  };
}

export default async function XrplCompaniesPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';
  const xrplCases = USE_CASES.filter((c) => c.xrpl);

  const tr = isFr
    ? {
        desc: "Sélection d'entreprises régulées qui utilisent XRPL en production — stablecoins, paiements, exchanges, custody, RWA, dApps. Chaque entrée montre le nom + l'année + les juridictions où elles sont licenciées.",
        since: 'depuis',
        seeAll: 'Voir les',
        seeAll2: "cas d'usage XRPL",
      }
    : {
        desc: 'Selected regulated companies using XRPL in production — stablecoins, payments, exchanges, custody, RWA, dApps. Each entry shows name + year + licensed jurisdictions.',
        since: 'since',
        seeAll: 'See all',
        seeAll2: 'XRPL use cases',
      };

  return (
    <section>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 max-w-3xl">
        {tr.desc}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {xrplCases.map((c) => {
          const primaryJurs = Array.from(
            new Set(c.licences.map((l) => l.jur)),
          ).slice(0, 6);
          return (
            <a
              key={c.id}
              href={c.website ?? `/${locale}/learn/usecases?filter=xrpl`}
              target={c.website ? '_blank' : undefined}
              rel={c.website ? 'noopener noreferrer' : undefined}
              className="block p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-xrpl transition-colors"
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {c.logo && <span className="text-lg">{c.logo}</span>}
                <span className="font-semibold text-sm">{c.company}</span>
                {c.since && (
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {tr.since} {c.since}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                {isFr ? c.useCase.fr : c.useCase.en}
              </p>
              {primaryJurs.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {primaryJurs.map((j) => (
                    <span key={j} className="text-base leading-none" title={j}>
                      {FLAG_MAP[j] ?? j}
                    </span>
                  ))}
                </div>
              )}
            </a>
          );
        })}
      </div>
      <div className="text-center mt-5">
        <Link
          href="/learn/usecases?filter=xrpl"
          className="inline-flex items-center gap-2 text-sm font-medium text-xrpl hover:text-xrpl-700 transition-colors"
        >
          {tr.seeAll} {xrplCases.length} {tr.seeAll2} &rarr;
        </Link>
      </div>
    </section>
  );
}
