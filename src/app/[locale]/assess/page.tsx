'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

/**
 * /assess landing hub — post Check+Assess fusion (Option B).
 *
 * Two clear doors, positioned side-by-side so the depth trade-off
 * (quick verdict vs. full roadmap) is the first decision the user makes:
 *
 *   ┌─ 🎯 Quick check ────────┐   ┌─ 🧾 Full assessment ───┐
 *   │  4 focused diagnostics   │   │  Multi-activity × juri  │
 *   │  ~2 min · yes/no/maybe   │   │  ~5-10 min · full report│
 *   └──────────────────────────┘   └─────────────────────────┘
 *
 * The old /check URLs keep working via 308 redirects to /assess/quick/*
 * and the old /assess wizard now lives at /assess/full.
 */
export default function AssessHubPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  const tr = isFr
    ? {
        title: 'Évaluer',
        subtitle:
          "Deux portes selon ce dont vous avez besoin : un diagnostic éclair sur une question précise, ou un profil réglementaire complet.",
        quickLabel: 'Diagnostic éclair',
        quickTime: '~2 min',
        quickDesc:
          "Une question précise ? Quatre diagnostics ciblés : Test de Howey, besoin CASP, classification custody XRPL, choix de juridiction. Un verdict clair en quelques réponses.",
        quickCta: 'Voir les 4 diagnostics',
        quickTags: ['⚖️ Howey', '🇪🇺 CASP', '🔐 XRPL Custody', '🌍 Jurisdiction'],
        fullLabel: 'Évaluation complète',
        fullTime: '~5-10 min',
        fullDesc:
          "Votre profil réglementaire complet. Décrivez votre startup, sélectionnez activités et juridictions — obtenez un rapport multi-pages : régimes, licences, régulateurs, obligations, délais, coûts et audit IA contextuel.",
        fullCta: 'Lancer une évaluation',
        fullTags: ['🎯 20 activités', '🌍 24 juridictions', '🧠 Audit IA'],
        notSure: 'Vous hésitez ?',
        notSureBody:
          "Prenez le diagnostic éclair en premier si vous avez UNE question précise. Prenez l'évaluation complète si vous voulez cadrer le roadmap compliance d'une startup (activités × juridictions).",
      }
    : {
        title: 'Assess',
        subtitle:
          'Two doors depending on what you need: a quick diagnostic on a specific question, or a full regulatory profile.',
        quickLabel: 'Quick diagnostic',
        quickTime: '~2 min',
        quickDesc:
          'Got a specific question? Four focused diagnostics: Howey Test, CASP requirement, XRPL custody classification, jurisdiction choice. Get a clear verdict in a handful of answers.',
        quickCta: 'See the 4 diagnostics',
        quickTags: ['⚖️ Howey', '🇪🇺 CASP', '🔐 XRPL Custody', '🌍 Jurisdiction'],
        fullLabel: 'Full assessment',
        fullTime: '~5-10 min',
        fullDesc:
          'Your full regulatory profile. Describe your startup, pick activities and jurisdictions — get a multi-page report: regimes, licences, regulators, obligations, timelines, costs and contextual AI audit.',
        fullCta: 'Start assessment',
        fullTags: ['🎯 20 activities', '🌍 24 jurisdictions', '🧠 AI audit'],
        notSure: 'Not sure which?',
        notSureBody:
          "Pick the quick diagnostic if you've got ONE precise question. Pick the full assessment if you want to frame a startup's compliance roadmap (activities × jurisdictions).",
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
          <span className="text-4xl leading-none">🧙</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{tr.title}</h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {tr.subtitle}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {/* Quick diagnostic — amber/yellow accent (matches the old /check
            card colour users are familiar with) */}
        <Link
          href="/assess/quick"
          className="group block p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/60 to-transparent dark:from-amber-900/20 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl leading-none">🎯</div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100">
              {tr.quickTime}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
            {tr.quickLabel}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {tr.quickDesc}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tr.quickTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-gray-900/60 border border-amber-200 dark:border-amber-900/50 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">
            {tr.quickCta} &rarr;
          </div>
        </Link>

        {/* Full assessment — violet accent matching the Assess brand colour
            used on the home page card */}
        <Link
          href="/assess/full"
          className="group block p-6 rounded-2xl border-2 border-violet-200 dark:border-violet-900/50 bg-gradient-to-br from-violet-50/60 to-transparent dark:from-violet-900/20 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl leading-none">🧾</div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-violet-200 text-violet-900 dark:bg-violet-900/60 dark:text-violet-100">
              {tr.fullTime}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400">
            {tr.fullLabel}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {tr.fullDesc}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tr.fullTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-gray-900/60 border border-violet-200 dark:border-violet-900/50 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm font-semibold text-violet-700 dark:text-violet-300">
            {tr.fullCta} &rarr;
          </div>
        </Link>
      </div>

      <aside className="max-w-3xl mx-auto p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-[var(--border)] text-center">
        <div className="text-sm font-semibold mb-1">{tr.notSure}</div>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {tr.notSureBody}
        </p>
      </aside>

      <p className="text-xs text-gray-500 text-center mt-8 italic">
        {isFr
          ? 'Information générale uniquement. Pour votre situation spécifique, consultez un avocat qualifié.'
          : 'General information only. For your specific situation, consult a qualified lawyer.'}
      </p>
    </div>
  );
}
