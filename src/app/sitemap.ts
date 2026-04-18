import type { MetadataRoute } from 'next';

const BASE_URL = 'https://regul8app.vercel.app';

const ROUTES = [
  '',
  '/check',
  '/compare',
  '/understand',
  '/understand/paths',
  '/understand/paths/mica-essentials',
  '/understand/paths/xrpl-custody',
  '/understand/paths/howey-test',
  '/understand/maps',
  '/understand/maps/mica-taxonomy',
  '/understand/maps/xrpl-custody',
  '/understand/maps/jurisdiction-arbitrage',
  '/understand/decision-trees',
  '/understand/decision-trees/howey',
  '/understand/decision-trees/casp',
  '/understand/decision-trees/xrpl-custody',
  '/understand/decision-trees/jurisdiction',
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
