'use client';

/**
 * Shared narrative covering the 8 concepts in Zone A → B → C order:
 *   Paragraph 1 (short + full): Jurisdiction scope → Zone A (Token + Infra) →
 *     Zone B (Licences + Obligations).
 *   Paragraph 2 (full only): Zone C (Regimes + Regulators + Doctrine).
 *
 * The colored pills are DECORATIVE (plain spans). When `linkTo` is provided
 * the entire block becomes a single clickable <Link> — preferred on home +
 * glossary (one clear action → /understand/concepts for the full breakdown)
 * rather than 8 mini-jumps into glossary entries.
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

/**
 * Neutral-grey pill for the 'Jurisdiction' cross-cut dimension. Not a Topic
 * (doesn't tag glossary terms) but conceptually the 8th concept —
 * every licence/regime/regulator is scoped to a jurisdiction.
 */
function JurisdictionPill({ label }: { label: string }) {
  // Warm stone palette — visually distinct from the slate/grey used for
  // Infrastructure pills. 🗺️ is the cross-cut, not a topic.
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold bg-stone-200 text-stone-900 dark:bg-stone-700 dark:text-stone-100">
      <span>🗺️</span>
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
      {/* Paragraph 1 — Jurisdiction scope + Zone A (Token + Infra) + Zone B
          (Licences + Obligations). Short variant stops here. */}
      <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
        {isFr ? (
          <>
            Dans une <JurisdictionPill label="Juridiction" /> donnée,
            {' '}une <span className="font-semibold">société</span> émet ou opère
            {' '}un <Pill topic="token" label="Type de token" /> sur une
            {' '}<Pill topic="infra" label="Infrastructure" /> (DeFi, custody,
            primitives XRPL…). Pour opérer légalement, elle doit obtenir des
            {' '}<Pill topic="licence" label="Licences" /> et respecter des
            {' '}<Pill topic="obligation" label="Obligations" /> continues
            (KYC, AML, reporting…).
          </>
        ) : (
          <>
            In a given <JurisdictionPill label="Jurisdiction" />,
            {' '}a <span className="font-semibold">company</span> issues or
            operates a <Pill topic="token" label="Token type" /> on some
            {' '}<Pill topic="infra" label="Infrastructure" /> (DeFi, custody,
            XRPL primitives…). To run it legally, it must obtain
            {' '}<Pill topic="licence" label="Licences" /> and meet ongoing
            {' '}<Pill topic="obligation" label="Obligations" /> (KYC, AML,
            reporting…).
          </>
        )}
      </p>

      {/* Paragraph 2 — Zone C (Regimes + Regulators + Doctrine). Full only. */}
      {variant === 'full' && (
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {isFr ? (
            <>
              Ces licences découlent de{' '}
              <Pill topic="regime" label="Régimes" /> (MiCA, GENIUS Act, TVTG…),
              sont délivrées par des{' '}
              <Pill topic="regulator" label="Régulateurs" /> (AMF, SEC, VARA…),
              et leurs zones grises sont tranchées par la{' '}
              <Pill topic="doctrine" label="Doctrine" /> (Howey Test,
              jurisprudence).
            </>
          ) : (
            <>
              Those licences stem from{' '}
              <Pill topic="regime" label="Regimes" /> (MiCA, GENIUS Act, TVTG…),
              are granted by{' '}
              <Pill topic="regulator" label="Regulators" /> (AMF, SEC, VARA…),
              and their grey zones are settled by{' '}
              <Pill topic="doctrine" label="Doctrine" /> (Howey Test, case
              law).
            </>
          )}
        </p>
      )}

      {linkTo && (
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mt-1 group-hover:translate-x-0.5 transition-transform">
          {isFr
            ? 'Voir les 8 concepts groupés en 3 zones'
            : 'See the 8 concepts organised in 3 zones'} &rarr;
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
