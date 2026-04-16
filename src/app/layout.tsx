import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regul8 — Navigate Crypto Regulation",
  description: "Understand which regulations, licences, and compliance obligations apply to your crypto/blockchain startup — globally.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
