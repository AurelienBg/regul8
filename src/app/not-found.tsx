import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🧭</div>
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="text-xl font-semibold mb-2">Page not found · Page introuvable</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          This page doesn&apos;t exist or was moved. <br />
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            &larr; Home / Accueil
          </Link>
          <Link
            href="/assess"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Start a check &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
