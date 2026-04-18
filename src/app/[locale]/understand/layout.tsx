import UnderstandTabs from '@/components/understand/UnderstandTabs';

export default function UnderstandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UnderstandTabs />
      {children}
    </>
  );
}
