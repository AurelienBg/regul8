'use client';

/**
 * Shared narrative: "To issue or handle a Token type, a startup must obtain
 * Licences defined by Regimes and granted by Regulators, who impose ongoing
 * Obligations. [+ Infrastructure / Doctrine paragraph]"
 *
 * The 7 colored pills are DECORATIVE (plain spans). When `linkTo` is provided
 * the entire block becomes a single clickable <Link> — this is the preferred
 * pattern on home + glossary (one clear action → /understand/concepts for the
 * full breakdown) rather than 7 mini-jumps into glossary entries.
 *
 * Used on: homepage hero (variant="short", linkTo="/understand/concepts")
 *          /understand/glossary (variant="full", linkTo="/understand/concepts")
 *          /understand/concepts (variant="full", no linkTo — on the page itself)
 */
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { TOPIC_META, type Topic } from '@/data/term-topics';

function Pill({ topic, label }: { topic: Topic; label: string }) {
  const meta = TOPIC_META[topic];
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${meta.pillClass}`}
    >
      <span>{meta.icon}</span>
      <span>{label}</span>
    </span>
  );
}

export default function ConceptsNarrative({
  variant = 'full',
  linkTo,
}: {
  variant?: 'short' | 'full';
  /** If set, the entire narrative becomes one clickable link to this href. */
  linkTo?: string;
}) {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const inner = (
    <>
      <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
        {isFr ? (
          <>
            Pour émettre ou manipuler un <Pill topic="token" label="Type de token" />,{' '}
            une <span className="font-semibold">🏢 startup</span> doit obtenir des{' '}
            <Pill topic="licence" label="Licences" /> définies par des{' '}
            <Pill topic="regime" label="Régimes" /> et délivrées par des{' '}
            <Pill topic="regulator" label="Régulateurs" />, qui imposent des{' '}
            <Pill topic="obligation" label="Obligations" /> continues.
          </>
        ) : (
          <>
            To issue or handle a <Pill topic="token" label="Token type" />,{' '}
            a <span className="font-semibold">🏢 startup</span> must obtain{' '}
            <Pill topic="licence" label="Licences" /> defined by{' '}
            <Pill topic="regime" label="Regimes" /> and granted by{' '}
            <Pill topic="regulator" label="Regulators" />, who impose ongoing{' '}
            <Pill topic="obligation" label="Obligations" />.
          </>
        )}
      </p>

      {variant === 'full' && (
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {isFr ? (
            <>
              L&apos;<Pill topic="infra" label="Infrastructure" /> technique (DeFi,
              custody, primitives XRPL…) façonne <em>comment</em> la régulation
              s&apos;applique, et la <Pill topic="doctrine" label="Doctrine" />{' '}
              juridique (Howey Test, jurisprudence) tranche les zones grises.
            </>
          ) : (
            <>
              The technical <Pill topic="infra" label="Infrastructure" /> (DeFi,
              custody, XRPL primitives…) shapes <em>how</em> regulation applies, and
              the legal <Pill topic="doctrine" label="Doctrine" /> (Howey Test, case
              law) settles the grey zones.
            </>
          )}
        </p>
      )}

      {linkTo && (
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mt-1 group-hover:translate-x-0.5 transition-transform">
          {isFr
            ? 'Voir les 7 concepts groupés en 3 zones'
            : 'See the 7 concepts organised in 3 zones'} &rarr;
        </p>
      )}
    </>
  );

  if (linkTo) {
    return (
      <Link
        href={linkTo}
        className="group block space-y-3 rounded-lg -m-2 p-2 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors"
      >
        {inner}
      </Link>
    );
  }

  return <div className="space-y-3">{inner}</div>;
}
