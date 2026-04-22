'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import MicaTaxonomy from '@/components/understand/diagrams/MicaTaxonomy';

export default function MicaTaxonomyPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tr = isFr ? {
    back: 'Cartes visuelles',
    title: 'Taxonomie des tokens MiCA',
    subtitle: "Où se situe votre token dans MiCA ? Descendez l'arbre depuis le haut et atterrissez sur EMT, ART, Autre crypto-actif, ou Exclu.",
    emtTitle: 'EMT',
    emtDesc: "Référencé à une monnaie unique. L'émetteur doit être un EME ou un établissement de crédit. Règles strictes de capital et de réserves.",
    artTitle: 'ART',
    artDesc: "Référencé à plusieurs actifs / commodities / paniers. Autorisation NCA requise. Whitepaper approuvé.",
    otherTitle: 'Autre crypto-actif',
    otherDesc: "Pas de mécanisme de stabilisation. Whitepaper + notification NCA au-dessus de 1M€. Les utility tokens y sont.",
    ctaTitle: 'Envie de l\'appliquer à votre token ?',
    ctaDesc: "Utilisez l'diagnostic pour examiner les exigences CASP spécifiques à votre service.",
    ctaLink: "Ai-je besoin d'un agrément CASP ?",
  } : {
    back: 'Visual Maps',
    title: 'MiCA Token Taxonomy',
    subtitle: 'Where does your token fit in MiCA? Walk the tree from the top and land on EMT, ART, Other crypto-asset, or Excluded.',
    emtTitle: 'EMT',
    emtDesc: 'Single-currency peg. Issuer must be EMI or credit institution. Capital + reserve rules strict.',
    artTitle: 'ART',
    artDesc: 'References multiple assets / commodities / baskets. NCA authorization required. Whitepaper approved.',
    otherTitle: 'Other crypto-asset',
    otherDesc: 'No stabilization mechanism. Whitepaper + NCA notification above €1M threshold. Utility tokens land here.',
    ctaTitle: 'Want to apply this to your token?',
    ctaDesc: 'Use the Decision Tree to walk through CASP requirements specific to your service.',
    ctaLink: 'Do I need a CASP licence?',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-4xl leading-none">🌳</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {tr.subtitle}
        </p>
      </header>

      <div className="card mb-8 overflow-x-auto">
        <MicaTaxonomy />
      </div>

      <section className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">{tr.emtTitle}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{tr.emtDesc}</p>
        </div>
        <div className="card">
          <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">{tr.artTitle}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{tr.artDesc}</p>
        </div>
        <div className="card">
          <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">{tr.otherTitle}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{tr.otherDesc}</p>
        </div>
      </section>

      <section className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">{tr.ctaTitle}</div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{tr.ctaDesc}</p>
        <Link href="/check/diagnostics/casp" className="btn-primary text-sm inline-block">
          {tr.ctaLink} &rarr;
        </Link>
      </section>
    </div>
  );
}
