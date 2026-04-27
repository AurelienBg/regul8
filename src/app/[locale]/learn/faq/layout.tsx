import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'FAQ — régulation crypto, en clair'
      : 'FAQ — crypto regulation, plain English',
    description: isFr
      ? 'Questions fréquentes sur la régulation crypto en clair : seuils de licensing, choix de juridiction, timing MiCA, bases de la Travel Rule, conformité XRPL-spécifique.'
      : 'Common questions on crypto regulation answered in plain English: licensing thresholds, jurisdiction selection, MiCA timing, Travel Rule basics, XRPL-specific compliance.',
    alternates: { canonical: `/${params.locale}/learn/faq` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
