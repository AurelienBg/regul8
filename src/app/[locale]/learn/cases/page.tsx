import { redirect } from 'next/navigation';

/**
 * Legacy path /learn/cases → /learn/usecases (renamed April 2026).
 * Kept as a permanent redirect for old bookmarks.
 */
type Params = { locale: string };

export default function UnderstandCasesRedirect({ params }: { params: Params }) {
  redirect(`/${params.locale}/learn/usecases`);
}
