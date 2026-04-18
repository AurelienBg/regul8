'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import XrplCustodyMatrix from '@/components/learn/maps/XrplCustodyMatrix';

export default function XrplCustodyMapPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tr = isFr ? {
    back: 'Cartes visuelles',
    title: 'Matrice custody XRPL',
    subtitle: "Les 10 méthodes de custody sur XRPL regroupées par classification réglementaire. Choisissez votre architecture en connaissance de cause.",
    greyTitle: "⚠️ La zone grise n'est pas un passe-droit",
    greyBody: "Les régulateurs n'ont pas publié de guidance définitive sur Regular Key, les seuils SignerList minorité, ou MPC/TSS sous MiCA. Un avis juridique écrit est essentiel avant de lancer. La classification peut évoluer avec les mises à jour ESMA/FCA.",
    setupTitle: 'Analysez votre propre architecture',
    setupBody: "Utilisez l'diagnostic pour router votre architecture à travers les 10 méthodes et obtenir un verdict clair.",
    setupLink: 'Ma custody XRPL est-elle custodial ?',
  } : {
    back: 'Visual Maps',
    title: 'XRPL Custody Matrix',
    subtitle: 'The 10 custody methods on XRPL grouped by regulatory classification. Pick your architecture deliberately.',
    greyTitle: "⚠️ Grey zone isn't a free pass",
    greyBody: "Regulators haven't issued definitive guidance on Regular Key, SignerList minority thresholds, or MPC/TSS under MiCA. A written legal opinion is essential before launch. The classification can shift with ESMA/FCA updates.",
    setupTitle: 'Figure out your own setup',
    setupBody: 'Use the diagnostic to route your architecture through the 10 methods and get a clear verdict.',
    setupLink: 'Is my XRPL custody custodial?',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/understand/maps" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; {tr.back}
        </Link>
      </div>

      <header className="mb-8">
        <div className="text-4xl mb-3">🔐</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{tr.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tr.subtitle}
        </p>
      </header>

      <XrplCustodyMatrix />

      <section className="mt-10 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
        <div className="font-bold text-amber-900 dark:text-amber-200 mb-1">{tr.greyTitle}</div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {tr.greyBody}
        </p>
      </section>

      <section className="mt-6 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">{tr.setupTitle}</div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{tr.setupBody}</p>
        <Link href="/understand/decision-trees/xrpl-custody" className="btn-primary text-sm inline-block">
          {tr.setupLink} &rarr;
        </Link>
      </section>
    </div>
  );
}
