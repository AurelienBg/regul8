import { redirect } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';

/**
 * The XRPL hub used to serve the "Legal status" content directly at the
 * bare /learn/xrpl URL while the other tabs (companies / custody / tech)
 * had real sub-routes. As of April 2026, "Legal status" gets its own
 * /learn/xrpl/legal route too — for parity, indexability and
 * bookmarkability — so this index page now just redirects.
 *
 * Locale-aware redirect via next-intl's `redirect`. The corresponding
 * 308 permanent redirect is also configured in next.config.mjs so direct
 * hits skip the SSR roundtrip.
 */
export default async function XrplIndexPage() {
  const locale = await getLocale();
  redirect({ href: '/learn/xrpl/legal', locale });
}
