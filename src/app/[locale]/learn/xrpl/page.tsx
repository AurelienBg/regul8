import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { XRPL_KNOWLEDGE } from '@/data/xrpl';
import { XRPL_KNOWLEDGE_FR } from '@/data/xrpl.fr';

const FLAG_MAP: Record<string, string> = {
  eu: '\uD83C\uDDEA\uD83C\uDDFA', us: '\uD83C\uDDFA\uD83C\uDDF8', sg: '\uD83C\uDDF8\uD83C\uDDEC',
  uk: '\uD83C\uDDEC\uD83C\uDDE7', uae: '\uD83C\uDDE6\uD83C\uDDEA', hk: '\uD83C\uDDED\uD83C\uDDF0',
  ch: '\uD83C\uDDE8\uD83C\uDDED', li: '\uD83C\uDDF1\uD83C\uDDEE',
  jp: '\uD83C\uDDEF\uD83C\uDDF5', kr: '\uD83C\uDDF0\uD83C\uDDF7', in: '\uD83C\uDDEE\uD83C\uDDF3',
  br: '\uD83C\uDDE7\uD83C\uDDF7', ng: '\uD83C\uDDF3\uD83C\uDDEC', ke: '\uD83C\uDDF0\uD83C\uDDEA',
  za: '\uD83C\uDDFF\uD83C\uDDE6',
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
