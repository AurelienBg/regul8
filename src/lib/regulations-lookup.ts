import { REGULATIONS } from '@/data/regulations';
import { REGULATIONS_FR } from '@/data/regulations.fr';
import type { ActivityKey, Jurisdiction, RegResult } from '@/types';

function pickData(locale?: string) {
  return locale === 'fr' ? REGULATIONS_FR : REGULATIONS;
}

export function lookupRegulation(
  activity: ActivityKey,
  jurisdiction: Jurisdiction,
  locale?: string,
): RegResult | null {
  return pickData(locale)[activity]?.[jurisdiction] ?? null;
}

export function getAvailableJurisdictions(
  activity: ActivityKey,
  locale?: string,
): Jurisdiction[] {
  const data = pickData(locale)[activity];
  if (!data) return [];
  return Object.keys(data) as Jurisdiction[];
}

export function getAllActivitiesForJurisdiction(
  jurisdiction: Jurisdiction,
  locale?: string,
) {
  const results: { activity: ActivityKey; result: RegResult }[] = [];
  for (const [activity, jurisdictions] of Object.entries(pickData(locale))) {
    const result = jurisdictions[jurisdiction];
    if (result) {
      results.push({ activity: activity as ActivityKey, result });
    }
  }
  return results;
}
