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
  '/learn/xrpl',
  '/learn/xrpl/tech',
  '/learn/xrpl/custody',
  '/learn/xrpl/companies',
  '/learn/usecases',
  '/learn/concepts',
  // Concept-led topic landing pages — 1 hub + 8 concept pages
  '/topics',
  '/topics/jurisdiction',
  '/topics/licence',
  '/topics/regime',
  '/topics/regulator',
  '/topics/obligation',
  '/topics/token',
  '/topics/infra',
  '/topics/doctrine',
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
