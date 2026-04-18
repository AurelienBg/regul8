import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Permanent redirects for path renames (April 2026). next-intl routes need
    // the [locale] prefix; all redirects below match /:locale/old → /:locale/new.
    return [
      // /learn/* → /understand/*
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
      // /understand/decision-trees/* → /assess/diagnostics/*
      {
        source: '/:locale(en|fr)/understand/decision-trees',
        destination: '/:locale/assess/diagnostics',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/understand/decision-trees/:path*',
        destination: '/:locale/assess/diagnostics/:path*',
        permanent: true,
      },
      // /check/* → /assess/*
      {
        source: '/:locale(en|fr)/check',
        destination: '/:locale/assess',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/check/:path*',
        destination: '/:locale/assess/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
