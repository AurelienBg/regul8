import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://regul8app.vercel.app'),
  title: {
    default: "Regul8 — Navigate Crypto Regulation. Anywhere.",
    template: "%s — Regul8",
  },
  description: "Understand which regulations, licences, and compliance obligations apply to your crypto/blockchain startup — globally. MiCA, MiFID, CASP, VASP, and more across 12 jurisdictions.",
  keywords: [
    "crypto regulation", "MiCA", "compliance", "CASP", "VASP", "blockchain law",
    "XRPL", "stablecoin", "crypto custody", "KYC", "AML", "startup compliance",
  ],
  authors: [{ name: "Regul8" }],
  openGraph: {
    type: "website",
    siteName: "Regul8",
    title: "Regul8 — Navigate Crypto Regulation. Anywhere.",
    description: "Understand which regulations, licences, and compliance obligations apply to your crypto/blockchain startup — globally.",
    url: "https://regul8app.vercel.app",
    images: [
      {
        url: "/logo.svg",
        width: 680,
        height: 160,
        alt: "Regul8",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regul8 — Navigate Crypto Regulation. Anywhere.",
    description: "13 activities × 12 jurisdictions. MiCA, CASP, VASP, and more. With deep XRPL coverage.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
