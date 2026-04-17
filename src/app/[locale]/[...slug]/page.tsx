import { notFound } from 'next/navigation';

/**
 * Catch-all route under [locale] — any path like /en/foobar, /fr/xyz that
 * doesn't match an explicit page will land here and explicitly trigger
 * notFound() so that [locale]/not-found.tsx renders (locale-aware 404).
 *
 * Without this, Next.js falls back to the root-level app/not-found.tsx
 * which cannot read the current locale.
 */
export default function LocaleCatchAll() {
  notFound();
}
