import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { XRPL_KNOWLEDGE } from '@/data/xrpl';
import { XRPL_KNOWLEDGE_FR } from '@/data/xrpl.fr';

const FLAG_MAP: Record<string, string> = {
  // Established
  eu: '🇪🇺', us: '🇺🇸', sg: '🇸🇬', uk: '🇬🇧', uae: '🇦🇪', hk: '🇭🇰',
  ch: '🇨🇭', li: '🇱🇮', jp: '🇯🇵', kr: '🇰🇷', in: '🇮🇳', br: '🇧🇷',
  ca: '🇨🇦', au: '🇦🇺',
  // EU MiCA hubs
  lu: '🇱🇺', mt: '🇲🇹', lt: '🇱🇹', ie: '🇮🇪',
  // Asia / Middle East emerging
  id: '🇮🇩', il: '🇮🇱',
  // Offshore financial centres
  ky: '🇰🇾', vg: '🇻🇬', bm: '🇧🇲',
  // Africa
  ng: '🇳🇬', ke: '🇰🇪', za: '🇿🇦', gh: '🇬🇭', cm: '🇨🇲',
  // Latin America emerging
  ar: '🇦🇷', sv: '🇸🇻',
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isFr = params.locale === 'fr';
  return {
    title: isFr
      ? 'Statut légal de XRP par juridiction — XRPL Hub | Regul8'
      : 'XRP legal status by jurisdiction — XRPL Hub | Regul8',
    description: isFr
      ? "Synthèse du statut juridique de XRP dans les principales juridictions : security ou pas, classification réglementaire, jurisprudences clés (SEC v. Ripple, etc.)."
      : 'Overview of XRP\'s legal status across major jurisdictions: security or not, regulatory classification, key case law (SEC v. Ripple, etc.).',
  };
}

export default async function XrplLegalPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';
  const t = await getTranslations('xrpl');
  const knowledge = isFr ? XRPL_KNOWLEDGE_FR : XRPL_KNOWLEDGE;
  const statusEntries = Object.entries(knowledge.xrp_legal_status.jurisdiction_notes);

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">{t('xrpStatus')}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
        {knowledge.xrp_legal_status.summary}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {statusEntries.map(([code, note]) => (
          <div key={code} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{FLAG_MAP[code] ?? ''}</span>
              <span className="font-semibold text-sm uppercase">{code}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
