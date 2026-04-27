import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import LearnTabs from '@/components/learn/LearnTabs';

/** Default metadata for /learn and any sub-route that doesn't override it
 *  via its own layout.tsx. Children that DO have their own layout.tsx
 *  (concepts, glossary, guides, faq, usecases, topics, xrpl) override
 *  this. The /learn index itself uses these defaults. */
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Apprendre — guides régulation crypto, glossaire, hub XRPL'
      : 'Learn — crypto regulation guides, glossary, XRPL hub',
    description: isFr
      ? "Guides régulation crypto, glossaire complet, deep-dive XRPL, cas d'usage et diagnostics éclair. Explications en clair de MiCA, GENIUS Act, Howey, Travel Rule sur 30 juridictions."
      : 'Curated crypto regulation guides, full glossary, XRPL deep-dive, use cases and quick diagnostics. Plain-English explanations of MiCA, GENIUS Act, Howey, Travel Rule and 30-jurisdiction coverage.',
    alternates: { canonical: `/${params.locale}/learn` },
  };
}

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const sectionLabel = locale === 'fr' ? 'Apprendre' : 'Learn';

  return (
    <div className="lg:max-w-7xl lg:mx-auto">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Desktop: vertical sidebar sticky below main nav */}
        <aside className="hidden lg:block sticky top-16 self-start max-h-[calc(100vh-64px)] overflow-y-auto py-8 pr-4 border-r border-[var(--border)]">
          <div className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {sectionLabel}
          </div>
          <LearnTabs variant="sidebar" />
        </aside>

        {/* Content column with mobile topbar */}
        <div className="min-w-0 lg:pl-2">
          {/* Mobile: horizontal sticky topbar */}
          <div className="lg:hidden sticky top-16 z-40 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)]">
            <div className="px-4">
              <LearnTabs variant="topbar" />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
