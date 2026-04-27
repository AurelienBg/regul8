import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Concepts — la taxonomie réglementaire en 8 piliers'
      : 'Concepts — the 8-pillar regulatory taxonomy',
    description: isFr
      ? 'Les 8 concepts transversaux qui expliquent la régulation crypto : Licence, Régime, Régulateur, Obligation, Token, Infrastructure, Doctrine, Juridiction. Survolez pour ouvrir le glossaire.'
      : 'The 8 cross-cutting concepts that explain crypto regulation: Licence, Regime, Regulator, Obligation, Token, Infrastructure, Doctrine, Jurisdiction. Hover any term to open its glossary entry.',
    alternates: { canonical: `/${params.locale}/learn/concepts` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
