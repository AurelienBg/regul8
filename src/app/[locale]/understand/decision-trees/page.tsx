import { redirect } from 'next/navigation';

/**
 * The Diagnostics list moved to /check (they are actionable, not reference).
 * Detail pages /understand/decision-trees/[id] remain where they are.
 */
type Params = { locale: string };

export default function DecisionTreesListRedirect({ params }: { params: Params }) {
  redirect(`/${params.locale}/check`);
}
