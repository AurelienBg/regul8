import { redirect } from 'next/navigation';

/**
 * Legacy path /learn/cases → /learn/usecases (renamed April 2026).
 * Keep a permanent redirect for old bookmarks and any external links.
 */
type Params = { locale: string };

export default function LearnCasesRedirect({ params }: { params: Params }) {
  redirect(`/${params.locale}/learn/usecases`);
}
