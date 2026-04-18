import { redirect } from 'next/navigation';

/**
 * The diagnostics list lives on /assess itself (shown as a grid in the hub).
 * /check/diagnostics exists only as the parent path for detail pages.
 */
type Params = { locale: string };

export default function DiagnosticsIndexRedirect({ params }: { params: Params }) {
  redirect(`/${params.locale}/assess`);
}
