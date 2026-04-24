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
  '/learn/diagrams/mica-taxonomy',
  '/learn/diagrams/xrpl-custody',
  '/learn/diagrams/jurisdiction-arbitrage',
  '/check/diagnostics',
  '/check/diagnostics/howey',
  '/check/diagnostics/casp',
  '/check/diagnostics/xrpl-custody',
  '/check/diagnostics/jurisdiction',
  '/search',
  '/learn/glossary',
  '/xrpl',
  '/assess',
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
