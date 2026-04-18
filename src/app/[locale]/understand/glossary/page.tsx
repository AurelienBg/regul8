import { useTranslations } from 'next-intl';
import GlossaryContent from '@/components/glossary/GlossaryContent';

export default function GlossaryPage() {
  const t = useTranslations('glossary');
  const tc = useTranslations('common');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <GlossaryContent />
      <p className="mt-8 text-xs text-gray-500 text-center">{tc('disclaimer')}</p>
    </div>
  );
}
