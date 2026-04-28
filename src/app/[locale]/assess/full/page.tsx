'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { ACTIVITIES, JURISDICTIONS, type ActivityKey, type Jurisdiction } from '@/types';
import ActivityXRPLStatus from '@/components/ui/ActivityXRPLStatus';

const ACTIVITY_KEYS = Object.keys(ACTIVITIES) as ActivityKey[];
const JURISDICTION_KEYS = Object.keys(JURISDICTIONS) as Jurisdiction[];
// Jurisdictions are alphabetised by their display name (locale-insensitive since
// names are identical across EN/FR for the most part). Sorted once at module
// init — cheap + stable reference.
const JURISDICTION_KEYS_SORTED = [...JURISDICTION_KEYS].sort((a, b) =>
  JURISDICTIONS[a].name.localeCompare(JURISDICTIONS[b].name),
);

/** Key used to persist the picker state across page navigations / reloads */
const ASSESS_STORAGE_KEY = 'regul8:assess:selection';

export default function AssessPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const tw = useTranslations('wizard');
  const router = useRouter();

  const [selectedActivities, setSelectedActivities] = useState<ActivityKey[]>([]);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<Jurisdiction[]>([]);
  // Prevent the save-effect from running with empty state before the load-effect has hydrated
  const hydratedRef = useRef(false);

  // Step 0: "Describe your startup" — AI classification
  const [description, setDescription] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [classifyError, setClassifyError] = useState<string | null>(null);
  const [aiActivities, setAiActivities] = useState<Set<ActivityKey>>(new Set());
  const [aiJurisdictions, setAiJurisdictions] = useState<Set<Jurisdiction>>(new Set());
  const [reasoning, setReasoning] = useState('');
  const [reasoningOpen, setReasoningOpen] = useState(false);
  const [describeCollapsed, setDescribeCollapsed] = useState(false);

  // Optional URL + file inputs that enrich the classification context
  // (HIGH #2 — landing page fetcher + whitepaper / pitch / term-sheet upload).
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sourceReports, setSourceReports] = useState<Array<
    | { kind: 'description'; chars: number }
    | { kind: 'url'; url: string; ok: boolean; chars?: number; error?: string; truncated?: boolean }
    | { kind: 'file'; filename: string; ok: boolean; chars?: number; error?: string; truncated?: boolean }
  >>([]);

  // Free-form 'other activity' — covers exotic cases outside our 20-activity taxonomy
  // (insurance protocols, prediction markets, DID, oracle networks…). Claude may
  // populate this automatically when the description mentions something unlisted.
  const [otherActivity, setOtherActivity] = useState('');
  const [aiOtherDetected, setAiOtherDetected] = useState(false);

  // Activities sorted alphabetically by their *localised* label. Memoised on
  // locale change so the sort only runs once per language.
  const activityKeysSorted = useMemo(
    () =>
      [...ACTIVITY_KEYS].sort((a, b) =>
        tw(`activities.${a}`).localeCompare(tw(`activities.${b}`), locale),
      ),
    // tw is stable per-locale in next-intl, so keying on locale is sufficient
    [locale, tw],
  );

  // Filter: show only XRPL-compatible activities (9/20). Off by default so
  // multi-chain users still see the full list.
  const [xrplOnlyFilter, setXrplOnlyFilter] = useState(false);
  const displayedActivityKeys = useMemo(
    () => (xrplOnlyFilter ? activityKeysSorted.filter((k) => ACTIVITIES[k].xrpl) : activityKeysSorted),
    [activityKeysSorted, xrplOnlyFilter],
  );

  // ?fresh=1 query param — set by the "New Compliance Check" button on
  // /report. Signals "start a brand-new check from scratch" so we skip
  // the localStorage hydration AND wipe the persisted selection. Without
  // this, clicking "New Compliance Check" landed on /assess/full with
  // the previous report's activities + jurisdictions still pre-selected.
  const searchParams = useSearchParams();
  const isFresh = searchParams.get('fresh') === '1';

  // Load previously saved selection on mount (unless ?fresh=1)
  useEffect(() => {
    if (isFresh) {
      try {
        if (typeof window !== 'undefined') localStorage.removeItem(ASSESS_STORAGE_KEY);
      } catch {
        // ignore — empty state is the fallback anyway
      }
      hydratedRef.current = true;
      return;
    }
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(ASSESS_STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { activities?: ActivityKey[]; jurisdictions?: Jurisdiction[] };
        if (Array.isArray(parsed.activities)) {
          setSelectedActivities(parsed.activities.filter((a) => ACTIVITY_KEYS.includes(a)));
        }
        if (Array.isArray(parsed.jurisdictions)) {
          setSelectedJurisdictions(parsed.jurisdictions.filter((j) => JURISDICTION_KEYS.includes(j)));
        }
      }
    } catch {
      // localStorage unavailable / invalid JSON — fall back to empty state
    } finally {
      hydratedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      localStorage.setItem(
        ASSESS_STORAGE_KEY,
        JSON.stringify({
          activities: selectedActivities,
          jurisdictions: selectedJurisdictions,
        }),
      );
    } catch {
      // ignore quota / private-mode errors
    }
  }, [selectedActivities, selectedJurisdictions]);

  const toggleActivity = (a: ActivityKey) => {
    setSelectedActivities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };
  const toggleJurisdiction = (j: Jurisdiction) => {
    setSelectedJurisdictions((prev) =>
      prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]
    );
  };

  /** Add picked / dropped files to state, validating count + total size +
   *  format. Errors surface in `fileError` rather than throwing so we can
   *  show inline feedback. */
  const handleAddFiles = (incoming: File[]) => {
    setFileError(null);
    const ALLOWED_EXT = ['pdf', 'docx', 'md', 'markdown', 'txt'];
    const accepted: File[] = [];
    for (const f of incoming) {
      const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
      if (!ALLOWED_EXT.includes(ext)) {
        setFileError(isFr
          ? `Format non supporté : ${f.name} (acceptés : PDF, DOCX, MD, TXT)`
          : `Unsupported format: ${f.name} (accepted: PDF, DOCX, MD, TXT)`);
        continue;
      }
      accepted.push(f);
    }
    setFiles((prev) => {
      const merged = [...prev, ...accepted].slice(0, 3); // max 3 files
      const total = merged.reduce((sum, f) => sum + f.size, 0);
      const FOUR_MB = 4 * 1024 * 1024;
      if (total > FOUR_MB) {
        setFileError(isFr
          ? `Limite dépassée : 4 Mo au total (3 fichiers max).`
          : `Over limit: 4 MB total (max 3 files).`);
        return prev;
      }
      return merged;
    });
  };

  const handleClassify = async () => {
    const trimmed = description.trim();
    const trimmedUrl = url.trim();
    const hasFiles = files.length > 0;
    // Need at least one source of context
    if ((!trimmed && !trimmedUrl && !hasFiles) || isClassifying) return;
    setIsClassifying(true);
    setClassifyError(null);
    setSourceReports([]);
    try {
      // Use multipart only when URL or files are present — keeps the
      // pure-text path (the common case) on the lighter JSON code path.
      let res: Response;
      if (trimmedUrl || hasFiles) {
        const fd = new FormData();
        fd.set('description', trimmed);
        fd.set('locale', locale);
        if (trimmedUrl) fd.set('url', trimmedUrl);
        for (const f of files) fd.append('files', f, f.name);
        res = await fetch('/api/classify', { method: 'POST', body: fd });
      } else {
        res = await fetch('/api/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: trimmed, locale }),
        });
      }
      const data = await res.json() as {
        activities?: string[];
        jurisdictions?: string[];
        other?: string;
        reasoning?: string;
        error?: string;
        sourceReports?: typeof sourceReports;
      };
      if (data.sourceReports) setSourceReports(data.sourceReports);
      if (data.error) {
        setClassifyError(data.error);
        return;
      }
      const acts = (data.activities ?? []).filter((a): a is ActivityKey =>
        ACTIVITY_KEYS.includes(a as ActivityKey),
      );
      const juris = (data.jurisdictions ?? []).filter((j): j is Jurisdiction =>
        JURISDICTION_KEYS.includes(j as Jurisdiction),
      );
      // Merge (don't replace) — keep any manual selections the user already made
      setSelectedActivities((prev) => Array.from(new Set([...prev, ...acts])));
      setSelectedJurisdictions((prev) => Array.from(new Set([...prev, ...juris])));
      setAiActivities(new Set(acts));
      setAiJurisdictions(new Set(juris));
      // If AI detected an activity outside our taxonomy, pre-fill the 'other' textarea
      if (data.other && data.other.trim()) {
        setOtherActivity(data.other.trim());
        setAiOtherDetected(true);
      } else {
        setAiOtherDetected(false);
      }
      setReasoning(data.reasoning ?? '');
      setReasoningOpen(Boolean(data.reasoning));
      setDescribeCollapsed(true);
    } catch {
      setClassifyError(isFr ? 'Erreur réseau, réessayez.' : 'Network error, please retry.');
    } finally {
      setIsClassifying(false);
    }
  };

  const canSubmit =
    (selectedActivities.length > 0 || otherActivity.trim().length > 0) &&
    selectedJurisdictions.length > 0;

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (selectedActivities.length > 0) params.set('activities', selectedActivities.join(','));
    params.set('jurisdictions', selectedJurisdictions.join(','));
    const otherTrimmed = otherActivity.trim();
    if (otherTrimmed) params.set('other', otherTrimmed);
    router.push(`/report?${params.toString()}`);
  };

  const tr = isFr
    ? {
        title: 'Évaluer votre conformité',
        subtitle:
          "Évaluation complète multi-activités × multi-juridictions. Rapport détaillé avec régimes, licences, obligations, coûts, délais et analyse IA contextuelle.",
        includedTitle: 'Ce que contient le rapport',
        includedItems: [
          'Régime réglementaire par activité × juridiction (loi, règlement applicable)',
          "Licences requises avec coûts et délais d'obtention",
          'Obligations clés (KYC/AML, Travel Rule, reporting, capital minimum…)',
          "Règles de marketing et éligibilité des clients",
          "Notes XRPL spécifiques quand l'activité utilise XRPL",
          'Analyse IA contextuelle avec ordre de priorité et roadmap 12 mois',
        ],
        activitiesTitle: 'Activités',
        jurisdictionsTitle: 'Juridictions',
        selectAll: "Sélectionnez tout ce qui s'applique",
        generate: 'Générer le rapport',
        summary: {
          activity: (n: number) => (n > 1 ? `${n} activités` : `${n} activité`),
          jurisdiction: (n: number) => (n > 1 ? `${n} juridictions` : `${n} juridiction`),
          resultsLabel: (n: number) => `= ${n} résultats`,
        },
        describe: {
          title: '💬 Décrivez votre startup',
          subtitle: 'Optionnel — en 2-3 phrases. L\'IA détecte vos activités et juridictions et pré-remplit le formulaire.',
          placeholder: 'Ex : On est une app mobile qui permet à des utilisateurs français de convertir EUR ↔ USDC instantanément, avec custody MPC non-custodial…',
          analyze: '✨ Analyser et pré-remplir',
          analyzing: 'Analyse…',
          skip: 'Passer',
          chars: (n: number) => `${n}/500`,
          charsUnit: 'car.',
          reasoningToggle: 'Pourquoi ces choix ?',
          aiLabel: 'IA',
          editAgain: 'Modifier la description',
          genericError: 'Erreur. Vous pouvez continuer manuellement.',
          urlLabel: '🔗 Ou collez l\'URL de votre site',
          urlHint: 'On lit votre landing publique pour enrichir le contexte. Aucune donnée stockée.',
          urlPlaceholder: 'https://votre-startup.com',
          filesLabel: '📎 Ou ajoutez whitepaper / pitch / term-sheet',
          filesHint: 'PDF, DOCX, MD ou TXT — max 3 fichiers, 4 Mo au total. Traités en mémoire, pas conservés.',
          filesDrop: 'Glissez vos fichiers ici, ou cliquez pour parcourir',
          fileRemove: 'Retirer le fichier',
          privacyNote: 'Tout est traité en mémoire pour cette analyse uniquement — rien n\'est stocké côté serveur.',
          sourceDescription: 'description',
        },
        otherActivity: {
          label: 'Autre activité (hors taxonomie)',
          hint: 'Pour les cas exotiques : protocole d\'assurance, marché de prédiction, DID, oracle network, mining pool, broker/OTC, crypto-card…',
          placeholder: 'Ex : protocole d\'assurance décentralisée',
          aiDetected: 'Détecté par l\'IA',
        },
      }
    : {
        title: 'Assess your compliance',
        subtitle:
          'Comprehensive multi-activity × multi-jurisdiction assessment. Detailed report with regimes, licences, obligations, costs, timelines and contextual AI analysis.',
        includedTitle: "What's in the report",
        includedItems: [
          'Regulatory regime per activity × jurisdiction (applicable law / regulation)',
          'Required licences with costs and timelines',
          'Key obligations (KYC/AML, Travel Rule, reporting, minimum capital…)',
          'Marketing rules and client eligibility',
          'XRPL-specific notes when the activity uses XRPL',
          'Contextual AI analysis with priority order and 12-month roadmap',
        ],
        activitiesTitle: 'Activities',
        jurisdictionsTitle: 'Jurisdictions',
        selectAll: 'Select all that apply',
        generate: 'Generate report',
        summary: {
          activity: (n: number) => (n > 1 ? `${n} activities` : `${n} activity`),
          jurisdiction: (n: number) => (n > 1 ? `${n} jurisdictions` : `${n} jurisdiction`),
          resultsLabel: (n: number) => `= ${n} results`,
        },
        describe: {
          title: '💬 Describe your startup',
          subtitle: 'Optional — in 2-3 sentences. AI detects your activities and jurisdictions and pre-fills the form.',
          placeholder: 'Ex: We\'re a mobile app that lets US users instantly convert USD ↔ USDC, with non-custodial MPC custody…',
          analyze: '✨ Analyze and pre-fill',
          analyzing: 'Analyzing…',
          skip: 'Skip',
          chars: (n: number) => `${n}/500`,
          charsUnit: 'chars',
          reasoningToggle: 'Why these choices?',
          aiLabel: 'AI',
          editAgain: 'Edit description',
          genericError: 'Error. You can continue manually.',
          urlLabel: '🔗 Or paste your website URL',
          urlHint: 'We\'ll read your public landing page to enrich the context. No data stored.',
          urlPlaceholder: 'https://your-startup.com',
          filesLabel: '📎 Or upload whitepaper / pitch / term-sheet',
          filesHint: 'PDF, DOCX, MD or TXT — max 3 files, 4 MB total. Processed in memory, not stored.',
          filesDrop: 'Drop files here, or click to browse',
          fileRemove: 'Remove file',
          privacyNote: 'Everything processed in memory for this analysis only — nothing is stored server-side.',
          sourceDescription: 'description',
        },
        otherActivity: {
          label: 'Other activity (outside our taxonomy)',
          hint: 'For exotic cases: insurance protocol, prediction market, DID, oracle network, mining pool, broker/OTC desk, crypto-card…',
          placeholder: 'Ex: decentralised insurance protocol',
          aiDetected: 'Detected by AI',
        },
      };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header — aligned with Understand / Compare / Check */}
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
      </header>

      {/* Step 0 — 💬 Describe your startup (optional) */}
      <section className="mb-8 p-5 rounded-xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/40 dark:bg-violet-900/10">
        {!describeCollapsed ? (
          <>
            <h2 className="text-lg font-bold mb-1">{tr.describe.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tr.describe.subtitle}</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              placeholder={tr.describe.placeholder}
              rows={3}
              disabled={isClassifying}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-y disabled:opacity-60"
            />
            <div className="mt-1 text-right">
              <span className="text-xs text-gray-500">{tr.describe.chars(description.length)}</span>
            </div>

            {/* URL — landing page fetcher */}
            <label className="block mt-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
              {tr.describe.urlLabel}
            </label>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5">{tr.describe.urlHint}</p>
            <input
              type="url"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value.slice(0, 200))}
              placeholder={tr.describe.urlPlaceholder}
              disabled={isClassifying}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:opacity-60"
            />

            {/* File dropzone — whitepaper / pitch deck / term sheet */}
            <label className="block mt-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
              {tr.describe.filesLabel}
            </label>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5">{tr.describe.filesHint}</p>
            <label
              htmlFor="assess-file-input"
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const dropped = Array.from(e.dataTransfer.files);
                handleAddFiles(dropped);
              }}
              className={`block cursor-pointer border-2 border-dashed rounded-lg px-3 py-4 text-center text-xs transition-colors ${
                isDragging
                  ? 'border-violet-500 bg-violet-100/60 dark:bg-violet-900/30'
                  : 'border-gray-300 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-600 bg-white/60 dark:bg-gray-900/40'
              } ${isClassifying ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <span className="text-gray-600 dark:text-gray-400">{tr.describe.filesDrop}</span>
              <input
                id="assess-file-input"
                type="file"
                multiple
                accept=".pdf,.docx,.md,.markdown,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown,text/plain"
                disabled={isClassifying}
                className="sr-only"
                onChange={(e) => {
                  const picked = Array.from(e.target.files ?? []);
                  handleAddFiles(picked);
                  // Reset so re-selecting the same file fires onChange again
                  e.target.value = '';
                }}
              />
            </label>
            {files.length > 0 && (
              <ul className="mt-2 space-y-1">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-white dark:bg-gray-900 border border-[var(--border)] text-xs"
                  >
                    <span className="truncate">
                      <span className="font-medium">📎 {f.name}</span>
                      <span className="text-gray-500 ml-2">({Math.round(f.size / 1024)} KB)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                      disabled={isClassifying}
                      aria-label={tr.describe.fileRemove}
                      className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {fileError && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">{fileError}</p>
            )}

            <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400 italic">
              🔒 {tr.describe.privacyNote}
            </p>

            <div className="mt-3 flex items-center justify-end gap-2 flex-wrap">
              <button
                onClick={() => setDescribeCollapsed(true)}
                disabled={isClassifying}
                className="text-sm px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {tr.describe.skip}
              </button>
              <button
                onClick={handleClassify}
                disabled={(!description.trim() && !url.trim() && files.length === 0) || isClassifying}
                className="text-sm px-4 py-1.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {isClassifying ? tr.describe.analyzing : tr.describe.analyze}
              </button>
            </div>
            {classifyError && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">{classifyError}</p>
            )}
          </>
        ) : (
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold text-violet-700 dark:text-violet-300">✨ {tr.describe.title}</span>
                {reasoning && (
                  <>
                    {' · '}
                    <button
                      onClick={() => setReasoningOpen(!reasoningOpen)}
                      className="text-violet-700 dark:text-violet-300 underline text-xs hover:no-underline"
                    >
                      {tr.describe.reasoningToggle}
                    </button>
                  </>
                )}
              </p>
              {reasoningOpen && reasoning && (
                <p className="mt-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  {reasoning}
                </p>
              )}
              {description && (
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 italic truncate">
                  « {description} »
                </p>
              )}
              {sourceReports.length > 0 && (
                <div className="mt-3 pt-3 border-t border-violet-200/60 dark:border-violet-900/40">
                  <div className="text-[11px] font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide mb-1.5">
                    {isFr ? 'Sources analysées' : 'Sources analysed'}
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {sourceReports.map((r, i) => {
                      const ok = r.kind === 'description' ? true : r.ok;
                      const label =
                        r.kind === 'description'
                          ? `📝 ${tr.describe.sourceDescription} · ${r.chars} ${tr.describe.charsUnit}`
                          : r.kind === 'url'
                            ? `🔗 ${ok ? r.chars ?? 0 : 0} ${tr.describe.charsUnit}${r.truncated ? ' …' : ''}`
                            : `📎 ${r.filename}${r.truncated ? ' …' : ''}`;
                      const errorPart = !ok && 'error' in r && r.error ? ` (${r.error})` : '';
                      return (
                        <li
                          key={i}
                          className={`text-xs px-2 py-1 rounded-md font-medium ${
                            ok
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                          }`}
                        >
                          {ok ? '✓' : '✗'} {label}{errorPart}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={() => setDescribeCollapsed(false)}
              className="text-xs px-3 py-1 rounded-md border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors shrink-0"
            >
              {tr.describe.editAgain}
            </button>
          </div>
        )}
      </section>

      {/* What's in the report */}
      <section className="mb-10 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <h3 className="text-sm font-bold mb-3 uppercase tracking-wide text-gray-500">
          {tr.includedTitle}
        </h3>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {tr.includedItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pickers — 4 cols on desktop: 2 cols for activities + 2 cols for jurisdictions */}
      <section className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Activities — 2-col internal grid */}
        <div>
          {/* Header grid matches the activities grid below (1 col mobile, 2 cols sm+) so
              the XRPL filter sits visually aligned above column 2. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">{tr.activitiesTitle}</h2>
              <p className="text-xs text-gray-500">{tr.selectAll}</p>
            </div>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-gray-600 dark:text-gray-400 select-none self-center justify-self-start">
              <input
                type="checkbox"
                checked={xrplOnlyFilter}
                onChange={(e) => setXrplOnlyFilter(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>{isFr ? 'Uniquement XRPL-compatibles' : 'Only XRPL-compatible'}</span>
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {displayedActivityKeys.map((key) => {
              const active = selectedActivities.includes(key);
              const aiSuggested = aiActivities.has(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleActivity(key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all ${
                    active
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                      : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {/* Checkbox — far left */}
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {active && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>

                  {/* Label + optional AI badge — fills the middle */}
                  <span className="flex-1 min-w-0 flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-medium leading-snug">{tw(`activities.${key}`)}</span>
                    {aiSuggested && (
                      <span
                        title={isFr ? 'Suggéré par l\'IA' : 'Suggested by AI'}
                        className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 shrink-0"
                      >
                        ✨ {tr.describe.aiLabel}
                      </span>
                    )}
                  </span>

                  {/* XRPL mark — pinned to the far right edge of the card */}
                  <ActivityXRPLStatus activity={key} />
                </button>
              );
            })}
          </div>

          {/* Free-form 'other activity' — for cases outside the 20-activity taxonomy */}
          <div className="mt-4 p-3 rounded-lg border border-dashed border-[var(--border)] bg-gray-50 dark:bg-gray-900/40">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {tr.otherActivity.label}
              </label>
              {aiOtherDetected && otherActivity && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                  ✨ {tr.otherActivity.aiDetected}
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">{tr.otherActivity.hint}</p>
            <input
              type="text"
              value={otherActivity}
              onChange={(e) => {
                setOtherActivity(e.target.value.slice(0, 80));
                if (aiOtherDetected) setAiOtherDetected(false); // user took over
              }}
              placeholder={tr.otherActivity.placeholder}
              className="w-full px-3 py-1.5 rounded-md border border-[var(--border)] bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Jurisdictions — 2-col internal grid, Generate button at top-right */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">{tr.jurisdictionsTitle}</h2>
              <p className="text-xs text-gray-500">{tr.selectAll}</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="hidden lg:inline-flex btn-primary disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
            >
              {tr.generate} &rarr;
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {JURISDICTION_KEYS_SORTED.map((code) => {
              const j = JURISDICTIONS[code];
              const active = selectedJurisdictions.includes(code);
              const aiSuggested = aiJurisdictions.has(code);
              return (
                <button
                  key={code}
                  onClick={() => toggleJurisdiction(code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all ${
                    active
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                      : 'border-[var(--border)] hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      active ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {active && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-lg">{j.flag}</span>
                  <span className="text-sm font-medium truncate flex-1">{j.name}</span>
                  {aiSuggested && (
                    <span
                      title={isFr ? 'Suggéré par l\'IA' : 'Suggested by AI'}
                      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 shrink-0"
                    >
                      ✨
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selection summary (right-aligned next to top button on lg+) */}
      {(selectedActivities.length > 0 || selectedJurisdictions.length > 0) && (
        <div className="text-sm text-gray-500 text-center lg:text-right mb-4 lg:mb-0">
          {selectedActivities.length > 0 && <span>{tr.summary.activity(selectedActivities.length)}</span>}
          {selectedActivities.length > 0 && selectedJurisdictions.length > 0 && <span> &times; </span>}
          {selectedJurisdictions.length > 0 && (
            <span>{tr.summary.jurisdiction(selectedJurisdictions.length)}</span>
          )}
          {selectedActivities.length > 0 && selectedJurisdictions.length > 0 && (
            <span className="ml-2 font-semibold text-blue-600">
              {tr.summary.resultsLabel(selectedActivities.length * selectedJurisdictions.length)}
            </span>
          )}
        </div>
      )}

      {/* Mobile-only bottom Generate button — saves the user from scrolling back up */}
      <div className="lg:hidden">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {tr.generate} &rarr;
        </button>
      </div>
    </div>
  );
}
