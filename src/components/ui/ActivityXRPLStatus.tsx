'use client';

import { useLocale } from 'next-intl';
import { ACTIVITIES, type ActivityKey } from '@/types';
import { XRPL_ACTIVITY_CONTEXT } from '@/data/xrpl-activity-context';
import XRPLMark from '@/components/ui/XRPLMark';

/**
 * Per-activity XRPL status indicator.
 *
 * Visual: the XRPL brand mark (the X logo) is ALWAYS shown.
 *   - XRPL-compatible activity → full black/white mark (active)
 *   - Not XRPL-compatible     → same mark at opacity-25 (muted)
 *
 * Hover reveals a styled tooltip with the activity-specific rationale (why
 * XRPL-native, or why not). Data lives in XRPL_ACTIVITY_CONTEXT.
 *
 * Tooltip is a group-hover CSS overlay (no 1s native-title delay, works
 * reliably inside <button>s, positioned bottom-full right-0).
 */
export default function ActivityXRPLStatus({ activity }: { activity: ActivityKey }) {
  const locale = useLocale();
  const isXrpl = ACTIVITIES[activity].xrpl;
  const ctx = XRPL_ACTIVITY_CONTEXT[activity];
  const tooltip = locale === 'fr' ? ctx.fr : ctx.en;

  return (
    <span className="relative inline-flex group/xrpl">
      <span
        className={`cursor-help ${isXrpl ? '' : 'opacity-25'}`}
        tabIndex={0}
        aria-label={isXrpl ? 'XRPL-compatible' : 'Not XRPL-compatible'}
      >
        <XRPLMark className="w-4 h-4 text-gray-900 dark:text-gray-100 shrink-0" />
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
