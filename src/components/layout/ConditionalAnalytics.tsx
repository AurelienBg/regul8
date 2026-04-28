'use client';

import { useSearchParams } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Renders Vercel Analytics + Speed Insights, BUT skips them when the
 * URL carries `?print=1`.
 *
 * Why: Chrome on macOS hangs at "loading preview" when these scripts
 * are still attached to the page lifecycle (long-running beacons + open
 * connections). Safari's print engine is unaffected. We confirmed the
 * diagnosis by testing Cmd+P / Incognito / Safari — see commit 2c827a9
 * + 079213c history.
 *
 * The "Save as PDF" button on /report opens the same URL with ?print=1
 * in a new tab. That tab loads without the analytics scripts, restores
 * the AI analysis from the localStorage cache, and auto-fires
 * window.print(). The user's primary tab keeps Analytics enabled.
 */
export default function ConditionalAnalytics() {
  const sp = useSearchParams();
  if (sp?.get('print') === '1') return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
