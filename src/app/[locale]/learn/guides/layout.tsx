import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Guides — deep-dives régulatoires ciblés'
      : 'Guides — focused regulatory deep-dives',
    description: isFr
      ? '10 lectures régulatoires ciblées (6-10 min) : MiCA Essentials, Test de Howey, US Crypto 101, Liechtenstein TVTG, cadres Stablecoin, Dubai VARA, RWA tokenisé, Travel Rule GAFI, KYC/AML, XRPL Custody.'
      : '10 focused regulatory reads (6-10 min each): MiCA Essentials, Howey Test, US Crypto 101, Liechtenstein TVTG, Stablecoin Frameworks, Dubai VARA, Tokenised RWA, FATF Travel Rule, KYC/AML, XRPL Custody.',
    alternates: { canonical: `/${params.locale}/learn/guides` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
