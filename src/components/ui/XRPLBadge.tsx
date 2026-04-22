'use client';

import { useLocale } from 'next-intl';

/**
 * Small "XRPL" pill shown next to activities that have native XRP Ledger
 * primitives or are commonly implemented on XRPL. Includes a styled CSS
 * tooltip (shown on hover + focus, no delay) explaining what the pill means
 * — more reliable than a native `title` attribute which is inconsistent
 * across browsers when nested inside a <button>.
 */
export default function XRPLBadge() {
  const locale = useLocale();
  const tooltip =
    locale === 'fr'
      ? "Compatible XRPL — cette activité dispose de primitives natives sur XRP Ledger ou y est couramment implémentée (ex : NFT XLS-20, DEX + AMM XLS-30, IOU / Trust Lines, Escrow, Payment Channels, MPT XLS-33, RLUSD…)."
      : 'XRPL-compatible — this activity has native XRP Ledger primitives or is commonly implemented on XRPL (e.g. NFT XLS-20, DEX + AMM XLS-30, IOU / Trust Lines, Escrow, Payment Channels, MPT XLS-33, RLUSD…).';
  return (
    <span className="relative inline-flex group/xrpl">
      <span className="badge-xrpl cursor-help" tabIndex={0}>
        XRPL
      </span>
      <span
        role="tooltip"
        className="
          pointer-events-none invisible opacity-0
          group-hover/xrpl:visible group-hover/xrpl:opacity-100
          group-focus-within/xrpl:visible group-focus-within/xrpl:opacity-100
          absolute bottom-full right-0 mb-1.5 z-50
          w-72 max-w-[calc(100vw-2rem)]
          px-3 py-2 rounded-md
          bg-gray-900 text-white text-xs font-normal leading-snug
          shadow-lg
          whitespace-normal text-left normal-case
          transition-opacity duration-150
        "
      >
        {tooltip}
      </span>
    </span>
  );
}
