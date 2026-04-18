import UnderstandTabs from '@/components/understand/UnderstandTabs';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <UnderstandTabs />
      </div>
      {children}
    </>
  );
}
