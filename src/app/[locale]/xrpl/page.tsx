import { redirect } from 'next/navigation';

/**
 * The XRPL Deep Dive hub moved under /learn/xrpl.
 * Keep /xrpl as a permanent 308 redirect for old bookmarks and SEO.
 */
type Params = { locale: string };

export default function XRPLRedirect({ params }: { params: Params }) {
  redirect(`/${params.locale}/learn/xrpl`);
}
