'use client';

import { useLocale } from 'next-intl';

/**
 * Small "XRPL" pill shown next to activities that have native XRP Ledger
 * primitives or are commonly implemented on XRPL. Mouse-over reveals the
 * full context in the active locale.
 */
export default function XRPLBadge() {
  const locale = useLocale();
  const tooltip =
    locale === 'fr'
      ? "Compatible XRPL — cette activité dispose de primitives natives sur XRP Ledger ou y est couramment implémentée (ex : NFT XLS-20, DEX + AMM XLS-30, IOU / Trust Lines, Escrow, Payment Channels, MPT XLS-33, RLUSD…)."
      : 'XRPL-compatible — this activity has native XRP Ledger primitives or is commonly implemented on XRPL (e.g. NFT XLS-20, DEX + AMM XLS-30, IOU / Trust Lines, Escrow, Payment Channels, MPT XLS-33, RLUSD…).';
  return (
    <span className="badge-xrpl cursor-help" title={tooltip}>
      XRPL
    </span>
  );
}
