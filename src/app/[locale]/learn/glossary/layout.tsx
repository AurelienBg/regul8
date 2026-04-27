import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Glossaire — 160+ termes de régulation crypto'
      : 'Glossary — 160+ crypto regulation terms',
    description: isFr
      ? '160+ termes de régulation crypto : MiCA, CASP, VASP, EMT, ART, MPT, BitLicense, MTL, Travel Rule GAFI, régulateurs par pays. Bilingue EN/FR.'
      : '160+ crypto regulation terms: MiCA, CASP, VASP, EMT, ART, MPT, BitLicense, MTL, FATF Travel Rule, regulators per country. Bilingual EN/FR with topic-coloured pills.',
    alternates: { canonical: `/${params.locale}/learn/glossary` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
