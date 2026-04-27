import type { MetadataRoute } from 'next';

const BASE_URL = 'https://regul8app.vercel.app';

const ROUTES = [
  '',
  '/assess',
  '/compare',
  '/learn',
  '/learn/guides',
  '/learn/guides/mica-essentials',
  '/learn/guides/xrpl-custody',
  '/learn/guides/howey-test',
  '/learn/diagrams',
  '/learn/diagrams/xrpl-custody',
  '/assess/quick',
  '/assess/quick/howey',
  '/assess/quick/casp',
  '/assess/quick/xrpl-custody',
  '/assess/quick/jurisdiction',
  '/search',
  '/learn/glossary',
  // XRPL hub — 4 real-route tabs. The bare /learn/xrpl now redirects to
  // /learn/xrpl/legal so we list only the canonical sub-routes (alphabetical
  // order with Legal first, matching the tab order in the UI).
  '/learn/xrpl/legal',
  '/learn/xrpl/companies',
  '/learn/xrpl/custody',
  '/learn/xrpl/tech',
  '/learn/usecases',
  '/learn/concepts',
  // Concept-led topic landing pages — 1 hub + 8 concept pages.
  // Moved from /topics to /learn/topics so they share the Learn sidebar.
  '/learn/topics',
  '/learn/topics/jurisdiction',
  '/learn/topics/licence',
  '/learn/topics/regime',
  '/learn/topics/regulator',
  '/learn/topics/obligation',
  '/learn/topics/token',
  '/learn/topics/infra',
  '/learn/topics/doctrine',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of ['en', 'fr']) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route}`,
            fr: `${BASE_URL}/fr${route}`,
          },
        },
      });
    }
  }

  return entries;
}
