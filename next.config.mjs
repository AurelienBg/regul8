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
      // /understand/decision-trees/* → /check/diagnostics/*
      {
        source: '/:locale(en|fr)/understand/decision-trees',
        destination: '/:locale/check/diagnostics',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/understand/decision-trees/:path*',
        destination: '/:locale/check/diagnostics/:path*',
        permanent: true,
      },
      // /assess/diagnostics/* → /check/diagnostics/* (split Assess/Check April 2026)
      {
        source: '/:locale(en|fr)/assess/diagnostics',
        destination: '/:locale/check/diagnostics',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/assess/diagnostics/:path*',
        destination: '/:locale/check/diagnostics/:path*',
        permanent: true,
      },
      // /glossary → /understand/glossary (moved into Understand hub)
      {
        source: '/:locale(en|fr)/glossary',
        destination: '/:locale/understand/glossary',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
