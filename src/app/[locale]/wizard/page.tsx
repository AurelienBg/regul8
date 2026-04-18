import { redirect } from 'next/navigation';

/**
 * /wizard merged into /assess (April 2026). The assessment pickers now
 * live directly on the /assess hub page. Keep /wizard as a permanent
 * redirect for old bookmarks and external links.
 */
type Params = { locale: string };

export default function WizardRedirect({ params }: { params: Params }) {
  redirect(`/${params.locale}/assess`);
}
