import type { MetadataRoute } from 'next';

const BASE_URL = 'https://regul8app.vercel.app';

const ROUTES = [
  '',
  '/assess',
  '/compare',
  '/understand',
  '/understand/guides',
  '/understand/guides/mica-essentials',
  '/understand/guides/xrpl-custody',
  '/understand/guides/howey-test',
  '/understand/maps',
  '/understand/maps/mica-taxonomy',
  '/understand/maps/xrpl-custody',
  '/understand/maps/jurisdiction-arbitrage',
  '/check/diagnostics',
  '/check/diagnostics/howey',
  '/check/diagnostics/casp',
  '/check/diagnostics/xrpl-custody',
  '/check/diagnostics/jurisdiction',
  '/search',
  '/understand/glossary',
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
