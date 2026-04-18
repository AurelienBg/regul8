'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import JurisdictionArbitrage from '@/components/understand/diagrams/JurisdictionArbitrage';

export default function JurisdictionArbitrageMapPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tr = isFr ? {
    back: 'Cartes visuelles',
    title: "Carte d'arbitrage des juridictions",
    subtitle: 'Scatter plot délai vs coût. Couleur du point = niveau de risque. Taille du point = accès marché. Trouvez votre sweet spot.',
    q1Title: '⭐ Quadrant rapide & abordable',
    q1Body: "Liechtenstein TVTG, Brésil, Suisse. Points de départ idéaux quand le budget et le délai sont les contraintes principales. Le Liechtenstein ajoute le passeport EEE en bonus.",
    q2Title: '🚀 Rapide & structuré',
    q2Body: "Dubaï VARA, Singapour MAS. Règlements modernes, ~9 mois, 50-150K€. Excellent choix pour les opérateurs globaux qui veulent une première licence crédible.",
    q3Title: '🏛 Lent & cher',
    q3Body: "MTLs d'État US, UE MiCA, Hong Kong SFC. Nécessaires pour accéder aux plus gros marchés. Prévoyez capital et 12-24 mois ; passportez ou empilez une fois approuvé.",
    ctaTitle: 'Prêt à en choisir une ?',
    ctaBody: "L'diagnostic vous guide à travers vos priorités délai / coût / marché / réputation et propose une juridiction recommandée.",
    ctaLink: 'Quelle juridiction choisir ?',
  } : {
    back: 'Visual Maps',
    title: 'Jurisdiction Arbitrage Map',
    subtitle: 'Speed vs cost scatter plot. Dot color = risk level. Dot size = market access. Find your sweet spot.',
    q1Title: '⭐ Fast & cheap quadrant',
    q1Body: 'Liechtenstein TVTG, Brazil, Switzerland. Ideal starting points when budget and time are the top constraints. Liechtenstein adds EEA passporting as a bonus.',
    q2Title: '🚀 Fast & structured',
    q2Body: 'Dubai VARA, Singapore MAS. Modern rulebooks, ~9 months, 50-150K€. Strong pick for global operators who want a credible first licence.',
    q3Title: '🏛 Slow & expensive',
    q3Body: 'US state MTLs, EU MiCA, Hong Kong SFC. Required for access to the biggest markets. Plan capital and 12-24 months; passport or stack once approved.',
    ctaTitle: 'Ready to pick one?',
    ctaBody: 'The diagnostic walks you through speed / cost / market / reputation priorities and outputs a recommended jurisdiction.',
    ctaLink: 'Which jurisdiction should I choose?',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/understand/diagrams" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          &larr; {tr.back}
        </Link>
      </div>

      <header className="mb-8">
        <div className="text-4xl mb-3">🌍</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{tr.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tr.subtitle}
        </p>
      </header>

      <div className="card mb-8">
        <JurisdictionArbitrage />
      </div>

      <section className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="card">
          <div className="font-bold mb-2">{tr.q1Title}</div>
          <p className="text-gray-600 dark:text-gray-400">{tr.q1Body}</p>
        </div>
        <div className="card">
          <div className="font-bold mb-2">{tr.q2Title}</div>
          <p className="text-gray-600 dark:text-gray-400">{tr.q2Body}</p>
        </div>
        <div className="card">
          <div className="font-bold mb-2">{tr.q3Title}</div>
          <p className="text-gray-600 dark:text-gray-400">{tr.q3Body}</p>
        </div>
      </section>

      <section className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">{tr.ctaTitle}</div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{tr.ctaBody}</p>
        <Link href="/check/diagnostics/jurisdiction" className="btn-primary text-sm inline-block">
          {tr.ctaLink} &rarr;
        </Link>
      </section>
    </div>
  );
}
