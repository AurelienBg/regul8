type Method = { name: string; detail: string };

const CUSTODIAL: Method[] = [
  { name: 'Single Key', detail: 'Master key held by service' },
  { name: 'IOU / Trust Lines', detail: 'Gateway holds off-chain assets' },
];
const GREY: Method[] = [
  { name: 'Regular Key', detail: 'Secondary key; master behavior matters' },
  { name: 'SignerList (majority)', detail: 'Service reaches quorum alone' },
  { name: 'MPC / TSS', detail: 'Threshold signatures, app-layer' },
  { name: 'MPT (XLS-33)', detail: 'Programmable, issuer flags' },
];
const NON_CUSTODIAL: Method[] = [
  { name: 'Escrow', detail: 'Time-locked / conditional' },
  { name: 'Payment Channels', detail: 'Off-ledger settlement' },
  { name: 'Checks', detail: 'On-ledger deferred payment' },
  { name: 'NFT Broker mode', detail: 'Atomic XLS-20 swap' },
  { name: 'SignerList (minority)', detail: 'Service cannot sign alone' },
];

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
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Column title="Custodial" emoji="🔴" tone="red" eu="CASP Art. 75 mandatory" items={CUSTODIAL} />
      <Column title="Grey zone" emoji="🟡" tone="amber" eu="Legal opinion required" items={GREY} />
      <Column
        title="Non-custodial"
        emoji="🟢"
        tone="emerald"
        eu="No CASP for the custody itself"
        items={NON_CUSTODIAL}
      />
    </div>
  );
}
