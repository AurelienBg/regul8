import { JURISDICTIONS, type Jurisdiction } from '@/types';

export default function JurisdictionFlag({ code, showName = true }: { code: Jurisdiction; showName?: boolean }) {
  const j = JURISDICTIONS[code];
  if (!j) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-lg">{j.flag}</span>
      {showName && <span className="text-sm">{j.name}</span>}
    </span>
  );
}
