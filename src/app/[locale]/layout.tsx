import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlossaryFab from '@/components/glossary/GlossaryFab';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import '../globals.css';

const SEO_COPY: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Regul8 — Navigate Crypto Regulation. Anywhere.',
    description: 'Understand which regulations, licences, and compliance obligations apply to your crypto/blockchain startup — globally. MiCA, GENIUS Act, CASP, VASP, and more across 12 jurisdictions. Deep XRPL coverage.',
  },
  fr: {
    title: 'Regul8 — Naviguez dans la régulation crypto. Partout.',
    description: "Comprenez quelles régulations, licences et obligations de conformité s'appliquent à votre startup crypto/blockchain — partout dans le monde. MiCA, GENIUS Act, CASP, VASP et plus sur 12 juridictions. Couverture XRPL approfondie.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = SEO_COPY[locale] ?? SEO_COPY.en;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'fr')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased overflow-x-hidden pt-16">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GlossaryFab />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
