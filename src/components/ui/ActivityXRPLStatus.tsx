'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
 * The tooltip is rendered via React portal into document.body so it escapes
 * clipping from ancestor containers with overflow (e.g. the overflow-x-auto
 * wrapper around comparison tables). Position is measured from the anchor's
 * getBoundingClientRect and expressed as fixed coords; the tooltip flips
 * above/below based on available viewport space.
 */
export default function ActivityXRPLStatus({ activity }: { activity: ActivityKey }) {
  const locale = useLocale();
  const isXrpl = ACTIVITIES[activity].xrpl;
  const ctx = XRPL_ACTIVITY_CONTEXT[activity];
  const tooltipText = locale === 'fr' ? ctx.fr : ctx.en;

  const anchorRef = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number; placement: 'above' | 'below' } | null>(null);

  // Estimated tooltip height for placement decision. Real height is larger
  // for long copy, but this is just used to pick above vs. below.
  const TOOLTIP_EST_HEIGHT = 96;
  const MARGIN = 8;
  const NAV_OFFSET = 64; // approximate sticky header
  const MAX_WIDTH = 288; // w-72

  useLayoutEffect(() => {
    if (!hover || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;

    const width = Math.min(MAX_WIDTH, viewportW - 2 * MARGIN);
    const spaceAbove = rect.top - NAV_OFFSET;
    const placement: 'above' | 'below' =
      spaceAbove >= TOOLTIP_EST_HEIGHT + MARGIN ? 'above' : 'below';

    // Anchor to the icon's right edge, then clamp inside the viewport.
    let left = rect.right - width;
    if (left < MARGIN) left = MARGIN;
    if (left + width > viewportW - MARGIN) left = viewportW - width - MARGIN;

    const top = placement === 'above' ? rect.top - MARGIN : rect.bottom + MARGIN;
    setPos({ top, left, width, placement });
  }, [hover]);

  const tooltip =
    hover && pos && typeof document !== 'undefined'
      ? createPortal(
          <span
            role="tooltip"
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              width: pos.width,
              transform: pos.placement === 'above' ? 'translateY(-100%)' : undefined,
            }}
            className="z-[9999] px-3 py-2 rounded-md bg-gray-900 text-white text-xs font-normal leading-snug shadow-lg pointer-events-none whitespace-normal text-left normal-case"
          >
            {tooltipText}
          </span>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={anchorRef}
        className={`cursor-help inline-flex shrink-0 ${isXrpl ? '' : 'opacity-25'}`}
        tabIndex={0}
        aria-label={isXrpl ? 'XRPL-compatible' : 'Not XRPL-compatible'}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <XRPLMark className="w-4 h-4 text-gray-900 dark:text-gray-100 shrink-0" />
      </span>
      {tooltip}
    </>
  );
}
