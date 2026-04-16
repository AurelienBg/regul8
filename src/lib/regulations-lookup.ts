import { REGULATIONS } from '@/data/regulations';
import type { ActivityKey, Jurisdiction, RegResult } from '@/types';

export function lookupRegulation(
  activity: ActivityKey,
  jurisdiction: Jurisdiction
): RegResult | null {
  return REGULATIONS[activity]?.[jurisdiction] ?? null;
}

export function getAvailableJurisdictions(activity: ActivityKey): Jurisdiction[] {
  const data = REGULATIONS[activity];
  if (!data) return [];
  return Object.keys(data) as Jurisdiction[];
}

export function getAllActivitiesForJurisdiction(jurisdiction: Jurisdiction) {
  const results: { activity: ActivityKey; result: RegResult }[] = [];
  for (const [activity, jurisdictions] of Object.entries(REGULATIONS)) {
    const result = jurisdictions[jurisdiction];
    if (result) {
      results.push({ activity: activity as ActivityKey, result });
    }
  }
  return results;
}
