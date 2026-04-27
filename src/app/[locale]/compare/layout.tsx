import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Comparer — activités × juridictions côte à côte'
      : 'Compare — activities × jurisdictions side by side',
    description: isFr
      ? 'Comparateur deux modes : empiler plusieurs activités sur une juridiction, OU plusieurs juridictions sur une activité. Régimes, licences, obligations, coûts et délais côte à côte.'
      : 'Two-mode comparator: stack multiple activities for one jurisdiction, OR multiple jurisdictions for one activity. Regimes, licences, obligations, costs and timelines side by side.',
    alternates: { canonical: `/${params.locale}/compare` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
