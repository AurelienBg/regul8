'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

type Mode = {
  id: string;
  href: '/learn/decision-trees' | '/learn/paths' | '/learn/maps';
  icon: string;
  title: string;
  description: string;
  cta: string;
};

const MODES_EN: Mode[] = [
  {
    id: 'decision-trees',
    href: '/learn/decision-trees',
    icon: '🌳',
    title: 'Decision Trees',
    description: 'Walk through guided questions to get a clear answer on licence needs, custody classification, or jurisdiction choice.',
    cta: 'Start a tree',
  },
  {
    id: 'learning-paths',
    href: '/learn/paths',
    icon: '📚',
    title: 'Learning Paths',
    description: 'Curated deep dives — MiCA Essentials, XRPL Custody, Howey Test. Each is a focused 6-10 min read.',
    cta: 'Start reading',
  },
  {
    id: 'visual-maps',
    href: '/learn/maps',
    icon: '🗺️',
    title: 'Visual Maps',
    description: 'One-pager diagrams: MiCA token taxonomy, XRPL custody matrix, jurisdiction arbitrage scatter.',
    cta: 'Browse maps',
  },
];

const MODES_FR: Mode[] = [
  {
    id: 'decision-trees',
    href: '/learn/decision-trees',
    icon: '🌳',
    title: 'Arbres de décision',
    description: "Répondez à des questions guidées et obtenez une réponse claire sur vos besoins de licence, la classification custody ou le choix de juridiction.",
    cta: 'Démarrer un arbre',
  },
  {
    id: 'learning-paths',
    href: '/learn/paths',
    icon: '📚',
    title: "Parcours d'apprentissage",
    description: "Plongées ciblées — Essentiel MiCA, Custody XRPL, Test de Howey. Chaque parcours est une lecture focalisée de 6 à 10 min.",
    cta: 'Commencer la lecture',
  },
  {
    id: 'visual-maps',
    href: '/learn/maps',
    icon: '🗺️',
    title: 'Cartes visuelles',
    description: 'Diagrammes en une page : taxonomie des tokens MiCA, matrice custody XRPL, nuage d\'arbitrage de juridictions.',
    cta: 'Parcourir les cartes',
  },
];

export default function LearnHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const modes = isFr ? MODES_FR : MODES_EN;
  const tr = isFr ? {
    title: 'Apprendre',
    subtitle: 'Trois façons de comprendre la régulation crypto. Choisissez celle qui vous convient.',
    glossaryTitle: "Besoin juste d'une définition ?",
    glossaryDesc: "Le glossaire couvre ~50 termes réglementaires — référence rapide, sans engagement.",
    glossaryCta: 'Parcourir le glossaire',
  } : {
    title: 'Learn',
    subtitle: 'Three ways to understand crypto regulation. Pick the one that fits how you want to learn.',
    glossaryTitle: 'Just need a definition?',
    glossaryDesc: 'The glossary covers ~50 regulatory terms — quick reference, no commitment.',
    glossaryCta: 'Browse glossary',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {tr.subtitle}
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <Link key={mode.id} href={mode.href} className="card hover:border-blue-500 transition-colors group">
            <div className="text-4xl mb-4">{mode.icon}</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {mode.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mode.description}</p>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {mode.cta} &rarr;
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)]">
        <h3 className="font-semibold mb-2">{tr.glossaryTitle}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {tr.glossaryDesc}
        </p>
        <Link href="/glossary" className="btn-secondary text-sm inline-block">
          {tr.glossaryCta} &rarr;
        </Link>
      </div>
    </div>
  );
}
