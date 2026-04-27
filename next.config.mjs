import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Permanent redirects for path renames (April 2026). next-intl routes need
    // the [locale] prefix; all redirects below match /:locale/old → /:locale/new.
    return [
      // ── /understand → /learn (rename April 2026) ────────────────────────
      {
        source: '/:locale(en|fr)/understand',
        destination: '/:locale/learn',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/understand/:path*',
        destination: '/:locale/learn/:path*',
        permanent: true,
      },

      // ── /check → /assess/quick (Option B fusion, April 2026) ────────────
      // The 4 quick diagnostics used to live at /check/*. After merging the
      // Check + Assess nav items under a single /assess hub, they moved to
      // /assess/quick/*. Preserve all old inbound links.
      {
        source: '/:locale(en|fr)/check',
        destination: '/:locale/assess/quick',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/check/diagnostics',
        destination: '/:locale/assess/quick',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/check/diagnostics/:path*',
        destination: '/:locale/assess/quick/:path*',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/check/:path*',
        destination: '/:locale/assess/quick/:path*',
        permanent: true,
      },

      // ── Legacy pre-rename paths, now pointing to /learn/* ───────────────
      // /learn/decision-trees/* → /assess/quick/*
      {
        source: '/:locale(en|fr)/learn/decision-trees',
        destination: '/:locale/assess/quick',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/learn/decision-trees/:path*',
        destination: '/:locale/assess/quick/:path*',
        permanent: true,
      },
      // /assess/diagnostics/* → /assess/quick/* (Option B fusion)
      {
        source: '/:locale(en|fr)/assess/diagnostics',
        destination: '/:locale/assess/quick',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/assess/diagnostics/:path*',
        destination: '/:locale/assess/quick/:path*',
        permanent: true,
      },
      // /glossary → /learn/glossary (moved into Learn hub)
      {
        source: '/:locale(en|fr)/glossary',
        destination: '/:locale/learn/glossary',
        permanent: true,
      },
      // /wizard → /assess (merged April 2026 — pickers live on /assess directly)
      {
        source: '/:locale(en|fr)/wizard',
        destination: '/:locale/assess',
        permanent: true,
      },
      // /learn/paths/* → /learn/guides/* (label + URL renamed April 2026)
      {
        source: '/:locale(en|fr)/learn/paths',
        destination: '/:locale/learn/guides',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/learn/paths/:path*',
        destination: '/:locale/learn/guides/:path*',
        permanent: true,
      },
      // /learn/maps/* → /learn/diagrams/* (label + URL alignment)
      {
        source: '/:locale(en|fr)/learn/maps',
        destination: '/:locale/learn/diagrams',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/learn/maps/:path*',
        destination: '/:locale/learn/diagrams/:path*',
        permanent: true,
      },
      // /learn/categories → /learn/concepts (label + URL alignment)
      {
        source: '/:locale(en|fr)/learn/categories',
        destination: '/:locale/learn/concepts',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/learn/categories/:path*',
        destination: '/:locale/learn/concepts/:path*',
        permanent: true,
      },
      // /topics → /learn/topics (April 2026 — moved under Learn so the
      // Learn sidebar persists when the user clicks "Topics").
      {
        source: '/:locale(en|fr)/topics',
        destination: '/:locale/learn/topics',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/topics/:path*',
        destination: '/:locale/learn/topics/:path*',
        permanent: true,
      },
      // /learn/xrpl → /learn/xrpl/legal (April 2026 — Legal status got its
      // own /legal sub-route for parity with the other tabs; the bare
      // hub URL now redirects to that canonical page).
      {
        source: '/:locale(en|fr)/learn/xrpl',
        destination: '/:locale/learn/xrpl/legal',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
