'use client';

import { useLocale } from 'next-intl';

type Method = { name: string; detail: string };

const COPY = {
  en: {
    custodial: 'Custodial',
    grey: 'Grey zone',
    nonCustodial: 'Non-custodial',
    euCustodial: 'CASP Art. 75 mandatory',
    euGrey: 'Legal opinion required',
    euNonCustodial: 'No CASP for the custody itself',
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

function Column({
  title,
  emoji,
  tone,
  items,
  eu,
}: {
  title: string;
  emoji: string;
  tone: 'red' | 'amber' | 'emerald';
  items: Method[];
  eu: string;
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
      <ul className="space-y-3">
        {items.map((m) => (
          <li key={m.name} className="border-b border-black/5 dark:border-white/10 pb-2 last:border-0 last:pb-0">
            <div className="font-semibold text-sm">{m.name}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{m.detail}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function XrplCustodyMatrix() {
  const locale = useLocale();
  const c = locale === 'fr' ? COPY.fr : COPY.en;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Column title={c.custodial} emoji="🔴" tone="red" eu={c.euCustodial} items={c.custodialItems} />
      <Column title={c.grey} emoji="🟡" tone="amber" eu={c.euGrey} items={c.greyItems} />
      <Column title={c.nonCustodial} emoji="🟢" tone="emerald" eu={c.euNonCustodial} items={c.nonCustodialItems} />
    </div>
  );
}
