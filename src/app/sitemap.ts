import type { MetadataRoute } from 'next';

const BASE_URL = 'https://regul8app.vercel.app';

const ROUTES = [
  '',
  '/check',
  '/compare',
  '/learn',
  '/learn/paths',
  '/learn/paths/mica-essentials',
  '/learn/paths/xrpl-custody',
  '/learn/paths/howey-test',
  '/learn/maps',
  '/learn/maps/mica-taxonomy',
  '/learn/maps/xrpl-custody',
  '/learn/maps/jurisdiction-arbitrage',
  '/learn/decision-trees',
  '/learn/decision-trees/howey',
  '/learn/decision-trees/casp',
  '/learn/decision-trees/xrpl-custody',
  '/learn/decision-trees/jurisdiction',
  '/search',
  '/glossary',
  '/xrpl',
  '/wizard',
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
