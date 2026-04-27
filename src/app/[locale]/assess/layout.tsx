import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Évaluer — évaluation conformité complète en un rapport'
      : 'Assess — full compliance evaluation in one report',
    description: isFr
      ? 'Évaluation conformité complète multi-activités × multi-juridictions. Rapport détaillé avec régimes, licences, obligations, coûts, délais et analyse IA contextuelle. URL + upload de document optionnels.'
      : 'Comprehensive multi-activity × multi-jurisdiction compliance assessment. Detailed report with regimes, licences, obligations, costs, timelines and contextual AI analysis. Optional URL + document upload.',
    alternates: { canonical: `/${params.locale}/assess` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
