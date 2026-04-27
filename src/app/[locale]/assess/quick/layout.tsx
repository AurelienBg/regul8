import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Diagnostics éclair — 7 quick checks de conformité'
      : 'Quick checks — 7 instant compliance diagnostics',
    description: isFr
      ? '7 diagnostics courts par arbre de décision : Test de Howey, classification MiCA (EMT/ART/Other), agrément CASP, GENIUS Act, applicabilité Travel Rule GAFI, custody XRPL, choix de juridiction. 2 minutes chacun.'
      : '7 short decision-tree diagnostics: Howey Test, MiCA classification (EMT/ART/Other), CASP licence requirement, GENIUS Act stablecoin fit, FATF Travel Rule applicability, XRPL custody, jurisdiction selection. 2 minutes each.',
    alternates: { canonical: `/${params.locale}/assess/quick` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
