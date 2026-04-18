'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { TERM_TOPICS, TOPIC_META, type Topic } from '@/data/term-topics';

const TOPIC_ORDER: Topic[] = ['token', 'licence', 'regime', 'regulator', 'obligation', 'infra', 'doctrine'];

const TOPIC_DESCRIPTIONS: Record<Topic, { en: { title: string; what: string; when: string; examples: string }; fr: { title: string; what: string; when: string; examples: string } }> = {
  regime: {
    en: {
      title: 'Law / Regulation',
      what: 'The legal text itself — the statute, regulation, directive or act passed by a legislature. Grounds everything else.',
      when: 'Applies whenever in force. Little to no choice for your startup — it just applies based on jurisdiction and activity.',
      examples: 'MiCA (EU 2023/1114), GENIUS Act (US federal 2025), TVTG (Liechtenstein 2020), DLT Act (Switzerland), BSA, PSD2.',
    },
    fr: {
      title: 'Loi / Régulation',
      what: "Le texte légal lui-même — statut, règlement, directive ou loi adopté par un législateur. Il fonde tout le reste.",
      when: "Dès que la régulation est en vigueur. Peu ou pas de choix côté startup — ça s'impose selon la juridiction et l'activité.",
      examples: 'MiCA (UE 2023/1114), GENIUS Act (US 2025), TVTG (Liechtenstein 2020), DLT Act (Suisse), BSA, PSD2.',
    },
  },
  licence: {
    en: {
      title: 'Licence framework',
      what: "The concrete authorization you must obtain to operate legally. The operational consequence of a law.",
      when: 'When you perform a regulated activity (exchange, custody, stablecoin issuance…). 3–36 months depending on jurisdiction.',
      examples: 'CASP (MiCA), MTL (state-by-state US), BitLicense (NY), VASP (FATF / Dubai), DASP / PSAN (France), EMI.',
    },
    fr: {
      title: 'Cadre de licence',
      what: "L'agrément concret à obtenir pour opérer légalement. La conséquence opérationnelle d'une loi.",
      when: "Quand vous exercez une activité réglementée (exchange, custody, émission stablecoin…). 3–36 mois selon la juridiction.",
      examples: 'CASP (MiCA), MTL (par État US), BitLicense (NY), VASP (GAFI / Dubaï), DASP / PSAN (France), EMI.',
    },
  },
  regulator: {
    en: {
      title: 'Regulator / Authority',
      what: 'The official body that supervises your activity, issues the licence and enforces compliance.',
      when: 'Always. You report to them, they inspect you, they approve your licence and can revoke it.',
      examples: 'AMF / ESMA (EU), SEC / CFTC / FinCEN / OCC (US), VARA (Dubai), MAS (Singapore), SFC (Hong Kong), FCA (UK), FINMA (Switzerland), FMA (Liechtenstein).',
    },
    fr: {
      title: 'Régulateur / Autorité',
      what: "L'organisme officiel qui supervise votre activité, délivre l'agrément et fait respecter la conformité.",
      when: "Toujours. Vous lui faites du reporting, il vous inspecte, il approuve votre licence et peut la retirer.",
      examples: 'AMF / ESMA (UE), SEC / CFTC / FinCEN / OCC (US), VARA (Dubaï), MAS (Singapour), SFC (Hong Kong), FCA (UK), FINMA (Suisse), FMA (Liechtenstein).',
    },
  },
  obligation: {
    en: {
      title: 'Compliance obligation',
      what: 'A concrete operational duty imposed by a law or regulator. Something you must DO on a daily basis.',
      when: 'Every day of operation. Captured in policies, processes and systems (KYC, AML, monitoring, reporting).',
      examples: 'KYC, KYB, AML, CFT, Travel Rule (FATF R.16), SAR filings, OFAC screening.',
    },
    fr: {
      title: 'Obligation de conformité',
      what: "Une tâche opérationnelle concrète imposée par une loi ou un régulateur. Quelque chose que vous FAITES au quotidien.",
      when: "Chaque jour d'opération. Via politiques, processus et systèmes (KYC, AML, monitoring, reporting).",
      examples: 'KYC, KYB, AML, CFT, Travel Rule (GAFI R.16), déclarations SAR, filtrage OFAC.',
    },
  },
  token: {
    en: {
      title: 'Token type',
      what: 'How a digital asset is classified by a regulator. Determines which regime applies to the token itself.',
      when: "At issuance and throughout the token's life. Can evolve (a security token may become a commodity as the network decentralises).",
      examples: 'EMT, ART, S-EMT, S-ART (MiCA), Utility Token, Security Token (Howey), RWA, NFT, Stablecoin, DPT (Singapore), MPT (XLS-33).',
    },
    fr: {
      title: 'Type de token',
      what: "Comment un actif numérique est classé par le régulateur. Détermine quel régime s'applique au token lui-même.",
      when: "À l'émission et pendant toute la vie du token. Peut évoluer (un security token peut devenir commodity avec la décentralisation).",
      examples: 'EMT, ART, S-EMT, S-ART (MiCA), Utility, Security (Howey), RWA, NFT, Stablecoin, DPT (Singapour), MPT (XLS-33).',
    },
  },
  infra: {
    en: {
      title: 'Infrastructure',
      what: 'Technical or ecosystem concepts not themselves regulated but that shape how regulation applies.',
      when: 'Reference terms you encounter constantly — DeFi vs CeFi, on-chain vs off-chain, XRPL primitives, etc.',
      examples: 'TradFi, CeFi, DeFi, DAO, Smart Contract, DLT, Trust Line, IOU, Escrow, SignerList, MPC, TSS.',
    },
    fr: {
      title: 'Infrastructure',
      what: "Concepts techniques ou écosystémiques pas régulés en eux-mêmes mais qui façonnent la régulation qui s'applique.",
      when: "Termes que vous croisez constamment — DeFi vs CeFi, on-chain vs off-chain, primitives XRPL, etc.",
      examples: 'TradFi, CeFi, DeFi, DAO, Smart Contract, DLT, Trust Line, IOU, Escrow, SignerList, MPC, TSS.',
    },
  },
  doctrine: {
    en: {
      title: 'Doctrine / Legal Test',
      what: 'A legal test or court ruling that interprets the law. Fills gaps when the statute is silent.',
      when: 'When assessing grey zones — especially in the US where case law plays a major role.',
      examples: 'Howey Test (SEC v. W.J. Howey Co., 1946). SEC v. Ripple (2023).',
    },
    fr: {
      title: 'Doctrine / Test juridique',
      what: "Un test juridique ou une décision de justice qui interprète la loi. Comble le vide quand le texte est silencieux.",
      when: "Quand on évalue des zones grises — surtout aux US où la jurisprudence joue un rôle majeur.",
      examples: 'Test de Howey (SEC v. W.J. Howey Co., 1946). SEC v. Ripple (2023).',
    },
  },
};

function slugify(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ConceptsPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'Concepts',
        subtitle: "Les 7 concepts fondamentaux qu'on trouve dans un rapport réglementaire. Comprendre la différence entre loi, licence et régulateur vous évite bien des confusions.",
        concept: 'Concept',
        whatIs: 'Qu\'est-ce que c\'est ?',
        whenApplies: 'Quand ça s\'applique',
        examples: 'Exemples',
        allTerms: 'Tous les termes groupés par concept',
        relations: 'Comment les concepts s\'articulent',
        disclaimer: 'Cliquez sur un terme pour ouvrir sa définition dans le glossaire.',
      }
    : {
        title: 'Concepts',
        subtitle: 'The 7 core concepts you find in a regulatory report. Knowing the difference between a law, a licence and a regulator saves you a lot of confusion.',
        concept: 'Concept',
        whatIs: 'What it is',
        whenApplies: 'When it applies',
        examples: 'Examples',
        allTerms: 'All terms grouped by concept',
        relations: 'How the concepts fit together',
        disclaimer: 'Click any term to open its definition in the glossary.',
      };

  const termsByTopic: Record<Topic, string[]> = {
    regime: [], licence: [], regulator: [], obligation: [], token: [], doctrine: [], infra: [],
  };
  for (const [term, topic] of Object.entries(TERM_TOPICS)) {
    if (termsByTopic[topic]) termsByTopic[topic].push(term);
  }
  const glossarySlugs = new Set(GLOSSARY_TERMS.map((t) => slugify(t.term)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* Narrative flow — startup-centric */}
      <section className="mb-10 p-5 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900 space-y-3">
        <h2 className="font-bold flex items-center gap-2">
          <span>🔗</span>
          <span>{tr.relations}</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
          {isFr ? (
            <>
              <span className="inline-flex items-center gap-1 font-semibold">🏢 Une startup</span> émet ou manipule un{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.token.pillClass}`}>{TOPIC_META.token.icon} Type de token</span>,{' '}
              détient des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.licence.pillClass}`}>{TOPIC_META.licence.icon} Licences</span>{' '}
              exigées par des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regime.pillClass}`}>{TOPIC_META.regime.icon} Régimes</span>,{' '}
              délivrées par des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regulator.pillClass}`}>{TOPIC_META.regulator.icon} Régulateurs</span>{' '}
              qui imposent des{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.obligation.pillClass}`}>{TOPIC_META.obligation.icon} Obligations</span>{' '}
              continues.
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 font-semibold">🏢 A startup</span> issues or handles a{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.token.pillClass}`}>{TOPIC_META.token.icon} Token type</span>,{' '}
              holds{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.licence.pillClass}`}>{TOPIC_META.licence.icon} Licences</span>{' '}
              required by{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regime.pillClass}`}>{TOPIC_META.regime.icon} Regimes</span>,{' '}
              granted by{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.regulator.pillClass}`}>{TOPIC_META.regulator.icon} Regulators</span>{' '}
              who impose ongoing{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.obligation.pillClass}`}>{TOPIC_META.obligation.icon} Obligations</span>.
            </>
          )}
        </p>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {isFr ? (
            <>
              L&apos;{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.infra.pillClass}`}>{TOPIC_META.infra.icon} Infrastructure</span>{' '}
              technique (DeFi, custody, primitives XRPL…) façonne <em>comment</em> la régulation s&apos;applique, et la{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.doctrine.pillClass}`}>{TOPIC_META.doctrine.icon} Doctrine</span>{' '}
              juridique (Howey Test, jurisprudence) tranche les zones grises.
            </>
          ) : (
            <>
              The technical{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.infra.pillClass}`}>{TOPIC_META.infra.icon} Infrastructure</span>{' '}
              (DeFi, custody, XRPL primitives…) shapes <em>how</em> regulation applies, and the legal{' '}
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${TOPIC_META.doctrine.pillClass}`}>{TOPIC_META.doctrine.icon} Doctrine</span>{' '}
              (Howey Test, case law) settles the grey zones.
            </>
          )}
        </p>
      </section>

      {/* The 7 concepts — single unified table */}
      <section className="mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--border)]">
                <th className="sticky left-0 z-10 bg-[var(--background)] text-left p-3 border-r border-[var(--border)] text-xs uppercase tracking-wide text-gray-500 w-40 sm:w-56">
                  {tr.concept}
                </th>
                <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-500 min-w-[220px]">
                  {tr.whatIs}
                </th>
                <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-500 min-w-[220px]">
                  {tr.whenApplies}
                </th>
                <th className="text-left p-3 text-xs uppercase tracking-wide text-gray-500 min-w-[240px]">
                  {tr.examples}
                </th>
              </tr>
            </thead>
            <tbody>
              {TOPIC_ORDER.map((topic, idx) => {
                const desc = TOPIC_DESCRIPTIONS[topic][isFr ? 'fr' : 'en'];
                const meta = TOPIC_META[topic];
                const isLast = idx === TOPIC_ORDER.length - 1;
                return (
                  <tr key={topic} className={isLast ? '' : 'border-b border-[var(--border)]'}>
                    <td className="sticky left-0 z-[1] bg-[var(--background)] p-3 align-top border-r border-[var(--border)]">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${meta.pillClass}`}>
                        <span className="text-sm leading-none">{meta.icon}</span>
                        <span>{isFr ? meta.labelFr : meta.labelEn}</span>
                      </span>
                      <div className="text-sm font-bold mt-1.5">{desc.title}</div>
                    </td>
                    <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{desc.what}</td>
                    <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{desc.when}</td>
                    <td className="p-3 align-top text-gray-700 dark:text-gray-300 leading-relaxed">{desc.examples}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* All terms, grouped by concept */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">{tr.allTerms}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {TOPIC_ORDER.map((topic) => {
            const meta = TOPIC_META[topic];
            const terms = termsByTopic[topic] ?? [];
            if (terms.length === 0) return null;
            return (
              <div key={topic} className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${meta.pillClass}`}>
                    <span>{meta.icon}</span>
                    <span>{isFr ? meta.labelFr : meta.labelEn}</span>
                  </span>
                  <span className="text-xs text-gray-500">{terms.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {terms.map((term) => {
                    const slug = slugify(term);
                    const hasGlossary = glossarySlugs.has(slug);
                    const content = (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${meta.pillClass} ${hasGlossary ? 'hover:ring-2 hover:ring-offset-1 hover:ring-current transition-all cursor-pointer' : 'opacity-70'}`}
                      >
                        {term}
                      </span>
                    );
                    return hasGlossary ? (
                      <Link key={term} href={`/understand/glossary#term-${slug}`}>
                        {content}
                      </Link>
                    ) : (
                      <span key={term}>{content}</span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-gray-500 text-center italic">{tr.disclaimer}</p>
    </div>
  );
}
