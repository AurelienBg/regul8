import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import XRPLMark from '@/components/ui/XRPLMark';
import XrplTabNav from '@/components/learn/XrplTabNav';

/**
 * Shared shell for the 4 XRPL hub pages (/learn/xrpl, /learn/xrpl/tech,
 * /learn/xrpl/custody, /learn/xrpl/companies).
 *
 * Renders:
 *   · Page header (XRPL mark + localised title + subtitle)
 *   · 4-tab sub-navigation (real routes, indexable per tab)
 *   · {children} — the active page's content
 *   · Bottom CTA (always visible across all 4 tabs)
 *
 * Per-tab metadata is set on each page.tsx via generateMetadata so each
 * tab has its own SEO title, description, and indexable URL.
 */
export default async function XrplLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('xrpl');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <XRPLMark className="w-10 h-10 text-gray-900 dark:text-gray-100 shrink-0" />
          <h1 className="text-3xl sm:text-4xl font-bold">{t('title')}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {t('subtitle')}
        </p>
      </header>

      <XrplTabNav />

      {children}

      {/* CTA — always visible across all 4 sub-pages. */}
      <div className="text-center mt-12">
        <Link href="/assess/full" className="btn-xrpl text-lg px-8 py-4">
          {t('startWizard')} &rarr;
        </Link>
      </div>
    </div>
  );
}
