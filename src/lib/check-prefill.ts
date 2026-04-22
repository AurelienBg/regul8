/**
 * Pre-fill the /check funnel from the user's /assess selections.
 *
 * Reads the same localStorage key that /assess uses, maps activity codes to
 * funnel 'products' and jurisdiction codes to funnel 'markets'. Custody is
 * NOT auto-filled — /assess doesn't ask about the custody model, so Q3
 * stays for the user to answer.
 */

import type { FunnelAnswers, Product, Market } from '@/data/check-funnel';

/** Same key as /assess/page.tsx. */
export const ASSESS_STORAGE_KEY = 'regul8:assess:selection';

interface AssessSelection {
  activities?: string[];
  jurisdictions?: string[];
}

/** Activity → Product bucket. Returns null if the activity doesn't map. */
function activityToProduct(a: string): Product | null {
  // Token-issuance activities
  if (['stablecoin', 'nft', 'mpt', 'rwa', 'token_utility', 'token_security', 'token_hybrid'].includes(a)) {
    return 'token';
  }
  // Platform / service activities
  if (
    [
      'exchange',
      'onramp_offramp',
      'cross_border_payment',
      'payment',
      'dapp_fin',
      'dapp_util',
      'launchpad',
      'derivatives',
      'asset_management',
      'lending',
      'staking',
      'gaming',
    ].includes(a)
  ) {
    return 'platform';
  }
  // Custody is its own bucket
  if (a === 'custody') return 'custody';
  return null;
}

/** Jurisdiction → Market bucket. 'global' is the catch-all for juri outside the 3 main regions. */
function jurisdictionToMarket(j: string): Market {
  if (['eu', 'lu', 'mt', 'lt', 'ie', 'ch', 'li'].includes(j)) return 'eu';
  if (j === 'us') return 'us';
  if (['sg', 'hk', 'jp', 'kr', 'au'].includes(j)) return 'apac';
  return 'global';
}

/**
 * Read the /assess selection from localStorage and return mapped funnel answers
 * (without custody). Returns null if no valid assess state exists.
 */
export function readAssessSelection(): AssessSelection | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ASSESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AssessSelection;
    const hasAny = (parsed.activities?.length ?? 0) > 0 || (parsed.jurisdictions?.length ?? 0) > 0;
    return hasAny ? parsed : null;
  } catch {
    return null;
  }
}

/** Map an /assess selection to a partial FunnelAnswers. */
export function prefillFromAssess(sel: AssessSelection): FunnelAnswers {
  const products = new Set<Product>();
  for (const a of sel.activities ?? []) {
    const p = activityToProduct(a);
    if (p) products.add(p);
  }

  const markets = new Set<Market>();
  for (const j of sel.jurisdictions ?? []) {
    markets.add(jurisdictionToMarket(j));
  }

  return {
    products: products.size ? Array.from(products) : undefined,
    markets: markets.size ? Array.from(markets) : undefined,
    custody: undefined, // user answers Q3 themselves
  };
}
