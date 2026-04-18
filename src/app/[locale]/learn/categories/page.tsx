'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { TERM_TOPICS, TOPIC_META, type Topic } from '@/data/term-topics';

const TOPIC_ORDER: Topic[] = ['regime', 'licence', 'regulator', 'obligation', 'token', 'concept', 'infra'];

const TOPIC_DESCRIPTIONS: Record<Topic, { en: { title: string; what: string; when: string; examples: string }; fr: { title: string; what: string; when: string; examples: string } }> = {
  regime: {
    en: {
      title: 'Law / Regulation',
      what: 'The legal text itself — the statute, regulation, directive or act passed by a legislature. It grounds everything else.',
      when: 'Applies whenever the regulation is in force. Little to no choice for your startup — it just applies based on jurisdiction and activity.',
      examples: 'MiCA (EU Regulation 2023/1114), GENIUS Act (US federal law 2025), TVTG (Liechtenstein 2020), DLT Act (Switzerland), BSA, PSD2.',
    },
    fr: {
      title: 'Loi / Régulation',
      what: "Le texte légal lui-même — le statut, règlement, directive ou loi adopté par un législateur. Il fonde tout le reste.",
      when: "S'applique dès que la régulation est en vigueur. Peu ou pas de choix côté startup — ça s'impose selon la juridiction et l'activité.",
      examples: 'MiCA (UE 2023/1114), GENIUS Act (loi fédérale US 2025), TVTG (Liechtenstein 2020), DLT Act (Suisse), BSA, PSD2.',
    },
  },
  licence: {
    en: {
      title: 'Licence framework',
      what: 'The concrete authorization you must obtain to operate legally. It\'s the operational consequence of a law.',
      when: 'Required when you perform a regulated activity (exchange, custody, stablecoin issuance…). Takes 3–36 months depending on jurisdiction.',
      examples: 'CASP (under MiCA), MTL (state-by-state US), BitLicense (NY only), VASP (FATF / Dubai), DASP / PSAN (France pre-MiCA), EMI.',
    },
    fr: {
      title: 'Cadre de licence',
      what: "L'agrément concret que vous devez obtenir pour opérer légalement. C'est la conséquence opérationnelle d'une loi.",
      when: "Requis dès que vous exercez une activité réglementée (exchange, custody, émission stablecoin…). Délai 3–36 mois selon la juridiction.",
      examples: 'CASP (sous MiCA), MTL (État par État US), BitLicense (NY seulement), VASP (GAFI / Dubaï), DASP / PSAN (France pré-MiCA), EMI.',
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
      what: "L'organisme officiel qui supervise votre activité, délivre l'agrément et veille au respect de la conformité.",
      when: "Toujours. Vous lui faites du reporting, il vous inspecte, il approuve votre licence et peut la retirer.",
      examples: 'AMF / ESMA (UE), SEC / CFTC / FinCEN / OCC (US), VARA (Dubaï), MAS (Singapour), SFC (Hong Kong), FCA (UK), FINMA (Suisse), FMA (Liechtenstein).',
    },
  },
  obligation: {
    en: {
      title: 'Compliance obligation',
      what: 'A concrete operational duty imposed by a law or regulator. Something you must DO on a daily basis.',
      when: 'Every day of operation. Often captured in policies, processes and systems (KYC, AML, monitoring, reporting).',
      examples: 'KYC (Know Your Customer), KYB (Know Your Business), AML, CFT, Travel Rule (FATF R.16), SAR filings, OFAC screening.',
    },
    fr: {
      title: 'Obligation de conformité',
      what: "Une tâche opérationnelle concrète imposée par une loi ou un régulateur. Quelque chose que vous devez FAIRE au quotidien.",
      when: "Chaque jour d'opération. Souvent encadrée par des politiques, processus et systèmes (KYC, AML, monitoring, reporting).",
      examples: 'KYC (Know Your Customer), KYB (Know Your Business), AML, CFT, Travel Rule (GAFI R.16), déclarations SAR, filtrage OFAC.',
    },
  },
  token: {
    en: {
      title: 'Token type',
      what: 'How a digital asset is classified by a regulator. Determines which regime applies to the token itself.',
      when: 'At issuance and throughout the token\'s life. Can evolve (a security token may become a commodity token as the network decentralises).',
      examples: 'EMT, ART, S-EMT, S-ART (MiCA), Utility Token, Security Token (Howey), RWA, NFT, Stablecoin, DPT (Singapore), MPT (XLS-33 on XRPL).',
    },
    fr: {
      title: 'Type de token',
      what: "Comment un actif numérique est classé par le régulateur. Détermine quel régime s'applique au token lui-même.",
      when: "À l'émission et pendant toute la vie du token. Peut évoluer (un security token peut devenir un commodity token au fil de la décentralisation du réseau).",
      examples: 'EMT, ART, S-EMT, S-ART (MiCA), Utility Token, Security Token (Howey), RWA, NFT, Stablecoin, DPT (Singapour), MPT (XLS-33 sur XRPL).',
    },
  },
  concept: {
    en: {
      title: 'Concept / Test / Ruling',
      what: 'A theoretical test or court ruling that interprets the law. Crucial when the statute is silent or ambiguous.',
      when: 'When assessing grey zones — especially in the US where case law plays a major role.',
      examples: 'Howey Test (SEC v. W.J. Howey Co., 1946) — 4 prongs to qualify a security. SEC v. Ripple (2023) — primary vs secondary market distinction.',
    },
    fr: {
      title: 'Concept / Test / Décision',
      what: "Un test théorique ou une décision de justice qui interprète la loi. Crucial quand le texte est silencieux ou ambigu.",
      when: "Quand on évalue des zones grises — surtout aux US où la jurisprudence joue un rôle majeur.",
      examples: 'Test de Howey (SEC v. W.J. Howey Co., 1946) — 4 critères pour qualifier un titre. SEC v. Ripple (2023) — distinction marché primaire vs secondaire.',
    },
  },
  infra: {
    en: {
      title: 'Infrastructure / Concept',
      what: 'Technical or ecosystem concepts that are not themselves regulated but shape how regulation applies.',
      when: 'Reference terms you encounter constantly in the crypto space — DeFi vs CeFi, on-chain vs off-chain, XRPL primitives, etc.',
      examples: 'TradFi, CeFi, DeFi, DAO, Smart Contract, DLT, Trust Line, IOU, Escrow, SignerList, MPC, TSS.',
    },
    fr: {
      title: 'Infrastructure / Concept',
      what: "Concepts techniques ou écosystémiques qui ne sont pas régulés en eux-mêmes mais qui façonnent la façon dont la régulation s'applique.",
      when: "Termes de référence que vous croisez constamment en crypto — DeFi vs CeFi, on-chain vs off-chain, primitives XRPL, etc.",
      examples: 'TradFi, CeFi, DeFi, DAO, Smart Contract, DLT, Trust Line, IOU, Escrow, SignerList, MPC, TSS.',
    },
  },
};

function slugify(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function CategoriesPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'Catégories',
        subtitle: "Les 7 natures de concepts qu'on trouve dans un rapport réglementaire. Comprendre la différence entre loi, licence et régulateur vous évite bien des confusions.",
        whatIs: 'Qu\'est-ce que c\'est ?',
        whenApplies: 'Quand ça s\'applique',
        examples: 'Exemples',
        allTerms: 'Tous les termes de cette catégorie',
        relations: 'Les relations entre catégories',
        relationsDesc: 'Les 4 concepts principaux forment une chaîne logique :',
        disclaimer: 'Cliquez sur un terme pour ouvrir sa définition dans le glossaire.',
      }
    : {
        title: 'Categories',
        subtitle: 'The 7 kinds of concepts you find in a regulatory report. Knowing the difference between a law, a licence and a regulator saves you a lot of confusion.',
        whatIs: 'What it is',
        whenApplies: 'When it applies',
        examples: 'Examples',
        allTerms: 'All terms in this category',
        relations: 'How the categories relate',
        relationsDesc: 'The 4 main concepts form a logical chain:',
        disclaimer: 'Click any term to open its definition in the glossary.',
      };

  const termsByTopic: Record<Topic, string[]> = {
    regime: [], licence: [], regulator: [], obligation: [], token: [], concept: [], infra: [],
  };
  for (const [term, topic] of Object.entries(TERM_TOPICS)) {
    if (termsByTopic[topic]) termsByTopic[topic].push(term);
  }
  const glossarySlugs = new Set(GLOSSARY_TERMS.map((t) => slugify(t.term)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* Relations diagram */}
      <section className="mb-12 p-5 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900">
        <h2 className="font-bold mb-2 flex items-center gap-2">
          <span>🔗</span>
          <span>{tr.relations}</span>
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{tr.relationsDesc}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 text-sm">
          <span className={`px-3 py-1.5 rounded-lg font-semibold w-fit ${TOPIC_META.regime.pillClass}`}>
            {TOPIC_META.regime.icon} {isFr ? TOPIC_META.regime.labelFr : TOPIC_META.regime.labelEn}
          </span>
          <span className="text-gray-500 pl-3 sm:pl-0">{isFr ? '→ instaure un' : '→ establishes a'}</span>
          <span className={`px-3 py-1.5 rounded-lg font-semibold w-fit ${TOPIC_META.licence.pillClass}`}>
            {TOPIC_META.licence.icon} {isFr ? TOPIC_META.licence.labelFr : TOPIC_META.licence.labelEn}
          </span>
          <span className="text-gray-500 pl-3 sm:pl-0">{isFr ? '→ supervisé par un' : '→ supervised by a'}</span>
          <span className={`px-3 py-1.5 rounded-lg font-semibold w-fit ${TOPIC_META.regulator.pillClass}`}>
            {TOPIC_META.regulator.icon} {isFr ? TOPIC_META.regulator.labelFr : TOPIC_META.regulator.labelEn}
          </span>
          <span className="text-gray-500 pl-3 sm:pl-0">{isFr ? '→ impose des' : '→ imposes'}</span>
          <span className={`px-3 py-1.5 rounded-lg font-semibold w-fit ${TOPIC_META.obligation.pillClass}`}>
            {TOPIC_META.obligation.icon} {isFr ? TOPIC_META.obligation.labelFr : TOPIC_META.obligation.labelEn}
          </span>
        </div>
      </section>

      {/* 7 categories */}
      <div className="space-y-6">
        {TOPIC_ORDER.map((topic) => {
          const desc = TOPIC_DESCRIPTIONS[topic][isFr ? 'fr' : 'en'];
          const meta = TOPIC_META[topic];
          const terms = termsByTopic[topic] ?? [];
          return (
            <section key={topic} className="card p-5">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold ${meta.pillClass}`}>
                  <span className="text-base">{meta.icon}</span>
                  <span>{isFr ? meta.labelFr : meta.labelEn}</span>
                </span>
                <h2 className="text-xl font-bold">{desc.title}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{tr.whatIs}</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{desc.what}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{tr.whenApplies}</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{desc.when}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{tr.examples}</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{desc.examples}</p>
                </div>
              </div>

              {terms.length > 0 && (
                <div className="pt-3 border-t border-[var(--border)]">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{tr.allTerms}</div>
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
                        <Link key={term} href={`/glossary#term-${slug}`}>
                          {content}
                        </Link>
                      ) : (
                        <span key={term}>{content}</span>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-gray-500 text-center italic">{tr.disclaimer}</p>
    </div>
  );
}
