'use client';

import { useLocale } from 'next-intl';

type Method = { name: string; detail: string };
type Provider = {
  name: string;
  /** Short emoji or single-glyph logo. */
  logo?: string;
  /** Optional sub-label clarifying which variant lands in this column
   *  (e.g. 'Metaco' for the custodial Ripple Custody, 'Palisade' for the
   *  grey-zone variant). Some providers can appear in two columns. */
  variant?: string;
  /** Where the chip links to. Either an in-page anchor like
   *  '#provider-anchorage-digital' (for institutional providers detailed
   *  in the cards section below the matrix) or an external `https://` URL
   *  (for non-custodial wallets which have no card on the page). */
  href?: string;
};

/**
 * XRPL Custody Matrix — 3-column visual grouping the 10+ XRPL custody
 * methods by their regulatory posture (custodial / grey / non-custodial),
 * with the ability to render the ecosystem providers below their matching
 * column.
 *
 * The standalone /learn/diagrams/xrpl-custody page keeps the simple
 * methods-only view (useful as a pure pedagogy diagram). The /learn/xrpl
 * page passes `showProviders` so the same matrix doubles as a decision
 * tool ("here's the custody model, here's who implements it"). Provider
 * chips on /learn/xrpl link in two ways:
 *   · institutional providers → in-page anchor to the card detail below
 *   · non-custodial wallets → external link to the wallet's site
 */

const COPY = {
  en: {
    custodial: 'Custodial',
    grey: 'Grey zone',
    nonCustodial: 'Non-custodial',
    euCustodial: 'CASP Art. 75 mandatory',
    euGrey: 'Legal opinion required',
    euNonCustodial: 'No CASP for the custody itself',
    methodsLabel: 'XRPL methods',
    providersLabel: 'Providers',
    nonCustodialNote: 'User holds their own keys — wallet software, not custody. Examples:',
    custodialItems: [
      { name: 'Single Key', detail: 'Master key held by service' },
      { name: 'IOU / Trust Lines', detail: 'Gateway holds off-chain assets' },
    ],
    greyItems: [
      { name: 'Regular Key', detail: 'Secondary key; master behavior matters' },
      { name: 'SignerList (majority)', detail: 'Service reaches quorum alone' },
      { name: 'MPC / TSS', detail: 'Threshold signatures, app-layer' },
      { name: 'MPT (XLS-33)', detail: 'Programmable, issuer flags' },
    ],
    nonCustodialItems: [
      { name: 'Escrow', detail: 'Time-locked / conditional' },
      { name: 'Payment Channels', detail: 'Off-ledger settlement' },
      { name: 'Checks', detail: 'On-ledger deferred payment' },
      { name: 'NFT Broker mode', detail: 'Atomic XLS-20 swap' },
      { name: 'SignerList (minority)', detail: 'Service cannot sign alone' },
    ],
  },
  fr: {
    custodial: 'Custodial',
    grey: 'Zone grise',
    nonCustodial: 'Non-custodial',
    euCustodial: 'CASP Art. 75 obligatoire',
    euGrey: 'Avis juridique requis',
    euNonCustodial: 'Pas de CASP pour la custody elle-même',
    methodsLabel: 'Méthodes XRPL',
    providersLabel: 'Fournisseurs',
    nonCustodialNote: "L'utilisateur détient ses propres clés — logiciel wallet, pas de la custody. Exemples :",
    custodialItems: [
      { name: 'Single Key', detail: 'Master key détenue par le service' },
      { name: 'IOU / Trust Lines', detail: 'Gateway détient les actifs off-chain' },
    ],
    greyItems: [
      { name: 'Regular Key', detail: "Clé secondaire ; dépend de l'usage de la master" },
      { name: 'SignerList (majorité)', detail: 'Le service atteint le quorum seul' },
      { name: 'MPC / TSS', detail: 'Signatures à seuil, couche applicative' },
      { name: 'MPT (XLS-33)', detail: "Programmable, flags de l'émetteur" },
    ],
    nonCustodialItems: [
      { name: 'Escrow', detail: 'Verrouillé dans le temps / conditionnel' },
      { name: 'Payment Channels', detail: 'Règlement off-ledger' },
      { name: 'Checks', detail: 'Paiement différé on-ledger' },
      { name: 'NFT Broker mode', detail: 'Swap atomique XLS-20' },
      { name: 'SignerList (minorité)', detail: 'Le service ne peut pas signer seul' },
    ],
  },
};

// Provider classification per regulatory posture. Some entities span
// multiple columns (e.g. Ripple Custody — Metaco vs Palisade variants).
// Hrefs starting with '#' anchor to the institutional provider cards
// rendered below the matrix on /learn/xrpl. External hrefs (https://)
// for wallets which have no detail card on the page.
const CUSTODIAL_PROVIDERS: Provider[] = [
  { name: 'Anchorage', logo: '⚓', href: '#provider-anchorage-digital' },
  { name: 'Fireblocks', logo: '🧱', href: '#provider-fireblocks' },
  { name: 'Taurus', logo: '♉', href: '#provider-taurus' },
  { name: 'Copper', logo: '🟠', href: '#provider-copper' },
  { name: 'GateHub', logo: '🚪', href: '#provider-gatehub' },
  { name: 'Ripple Custody', logo: '🔐', variant: 'Metaco', href: '#provider-ripple-custody' },
];
const GREY_PROVIDERS: Provider[] = [
  { name: 'BitGo', logo: '🛡️', variant: 'multi-sig 2-of-3', href: '#provider-bitgo' },
  { name: 'Dfns', logo: '🔑', variant: 'MPC WaaS', href: '#provider-dfns' },
  { name: 'Ripple Custody', logo: '🔐', variant: 'Palisade — MPC', href: '#provider-ripple-custody' },
];
// Non-custodial wallets — user holds keys, no custody at all. Curated
// from the XRPL ecosystem wallet list at xrpl.org/about/uses.
const NON_CUSTODIAL_PROVIDERS: Provider[] = [
  { name: 'Xaman', logo: '✨', variant: 'XRPL Labs', href: 'https://xaman.app' },
  { name: 'Lobstr', logo: '🦞', href: 'https://lobstr.co' },
  { name: 'Crossmark', logo: '❎', href: 'https://crossmark.io' },
  { name: 'Edge', logo: '🟢', href: 'https://edge.app' },
  { name: 'Bifrost', logo: '🌉', href: 'https://bifrostwallet.com' },
  { name: 'Bitget Wallet', logo: '▶️', href: 'https://web3.bitget.com' },
  { name: 'GemWallet', logo: '💎', href: 'https://gemwallet.app' },
];

function ProviderChip({ p }: { p: Provider }) {
  const isExternal = p.href?.startsWith('http');
  const className =
    'inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/80 dark:bg-gray-900/40 border border-black/10 dark:border-white/10 text-xs hover:border-current hover:ring-1 hover:ring-current/30 transition-all';
  const inner = (
    <>
      {p.logo && <span className="text-sm leading-none">{p.logo}</span>}
      <span className="font-semibold">{p.name}</span>
      {p.variant && (
        <span className="text-[10px] text-gray-500 dark:text-gray-400 italic">
          {p.variant}
        </span>
      )}
    </>
  );

  if (!p.href) {
    return <span className={className} title={p.variant ?? p.name}>{inner}</span>;
  }
  return (
    <a
      href={p.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      title={p.variant ?? p.name}
      className={className}
    >
      {inner}
    </a>
  );
}

function Column({
  title,
  emoji,
  tone,
  items,
  eu,
  providers,
  methodsLabel,
  providersLabel,
  providersNote,
  showProviders,
}: {
  title: string;
  emoji: string;
  tone: 'red' | 'amber' | 'emerald';
  items: Method[];
  eu: string;
  providers: Provider[];
  methodsLabel: string;
  providersLabel: string;
  /** Optional explainer line above the chips — used on the
   *  non-custodial column to clarify these are wallets, not custody. */
  providersNote?: string;
  showProviders: boolean;
}) {
  const tones: Record<string, string> = {
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900',
  };
  const badges: Record<string, string> = {
    red: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200',
    amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
  };

  return (
    <div className={`rounded-xl border-2 p-5 ${tones[tone]}`}>
      <div className="mb-4">
        <div className="text-3xl mb-1">{emoji}</div>
        <h3 className="text-lg font-bold">{title}</h3>
        <span className={`inline-block mt-2 px-2 py-0.5 rounded-md text-xs font-semibold ${badges[tone]}`}>
          {eu}
        </span>
      </div>

      {/* XRPL methods — always rendered */}
      {showProviders && (
        <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          {methodsLabel}
        </div>
      )}
      <ul className="space-y-3">
        {items.map((m) => (
          <li key={m.name} className="border-b border-black/5 dark:border-white/10 pb-2 last:border-0 last:pb-0">
            <div className="font-semibold text-sm">{m.name}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{m.detail}</div>
          </li>
        ))}
      </ul>

      {/* Providers — only rendered when showProviders prop is true (i.e.
          on /learn/xrpl, not on the standalone diagram page). */}
      {showProviders && providers.length > 0 && (
        <>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-5 mb-2 pt-3 border-t border-black/10 dark:border-white/10">
            {providersLabel}
          </div>
          {providersNote && (
            <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-2 leading-snug italic">
              {providersNote}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {providers.map((p, i) => (
              <ProviderChip key={`${p.name}-${i}`} p={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function XrplCustodyMatrix({
  showProviders = false,
}: {
  /** When true, renders the XRPL ecosystem providers under each column
   *  matching their regulatory classification. Default false keeps the
   *  diagram methods-only — appropriate for the standalone diagram page. */
  showProviders?: boolean;
} = {}) {
  const locale = useLocale();
  const c = locale === 'fr' ? COPY.fr : COPY.en;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Column
        title={c.custodial}
        emoji="🔴"
        tone="red"
        eu={c.euCustodial}
        items={c.custodialItems}
        providers={CUSTODIAL_PROVIDERS}
        methodsLabel={c.methodsLabel}
        providersLabel={c.providersLabel}
        showProviders={showProviders}
      />
      <Column
        title={c.grey}
        emoji="🟡"
        tone="amber"
        eu={c.euGrey}
        items={c.greyItems}
        providers={GREY_PROVIDERS}
        methodsLabel={c.methodsLabel}
        providersLabel={c.providersLabel}
        showProviders={showProviders}
      />
      <Column
        title={c.nonCustodial}
        emoji="🟢"
        tone="emerald"
        eu={c.euNonCustodial}
        items={c.nonCustodialItems}
        providers={NON_CUSTODIAL_PROVIDERS}
        methodsLabel={c.methodsLabel}
        providersLabel={c.providersLabel}
        providersNote={c.nonCustodialNote}
        showProviders={showProviders}
      />
    </div>
  );
}
