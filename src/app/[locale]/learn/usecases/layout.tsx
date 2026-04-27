import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Cas d\'usage — entreprises crypto régulées en pratique'
      : 'Use cases — regulated crypto companies in the wild',
    description: isFr
      ? 'Entreprises crypto régulées réelles — Ripple, Circle, Coinbase, Kraken, BitGo, Anchorage, Securitize, GateHub, plus les builders XRPL-natifs (Xaman, Sologenic, Peersyst, Towo Labs). Stack de licences par juridiction.'
      : 'Real-world regulated crypto companies — Ripple, Circle, Coinbase, Kraken, BitGo, Anchorage, Securitize, GateHub, plus XRPL-native builders (Xaman, Sologenic, Peersyst, Towo Labs). Licence stack per jurisdiction.',
    alternates: { canonical: `/${params.locale}/learn/usecases` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
