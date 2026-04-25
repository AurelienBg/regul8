import { getLocale } from 'next-intl/server';
import LearnTabs from '@/components/learn/LearnTabs';

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
