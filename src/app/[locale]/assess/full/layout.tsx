import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Évaluation de conformité — rapport multi-activités'
      : 'Compliance assessment — multi-activity report',
    description: isFr
      ? 'Sélectionnez activités et juridictions, décrivez optionnellement votre startup ou uploadez un whitepaper, obtenez un rapport régulatoire détaillé avec roadmap IA.'
      : 'Pick activities and jurisdictions, optionally describe your startup or upload a whitepaper, get a detailed regulatory report with AI-generated roadmap.',
    alternates: { canonical: `/${params.locale}/assess/full` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
