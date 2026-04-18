import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Permanent redirects from the old /learn/* path segment to /understand/*
    // (renamed April 2026). Keep these permanently for SEO and any external
    // bookmarks. next-intl routes need the [locale] prefix; we redirect both
    // locale-prefixed and bare paths.
    return [
      {
        source: '/:locale(en|fr)/learn',
        destination: '/:locale/understand',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/learn/:path*',
        destination: '/:locale/understand/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
