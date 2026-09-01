import type { Metadata } from 'next';
import Link from 'next/link';

// Without this, the 404 page silently inherits the homepage's title,
// description, and Open Graph/Twitter tags from the root layout — so a
// broken/dead link shared on social would unfurl as if it were the real
// homepage.
//
// Note on `robots`: Next.js's not-found boundary always renders its own
// <meta name="robots" content="noindex"> regardless of what's declared
// here — verified in the rendered <head>, and not something app code can
// suppress. Leaving this field unset makes the page inherit the root
// layout's `index: true`, which renders a second, *contradictory* robots
// tag ("index, follow" alongside the framework's "noindex"). Declaring
// `noindex` explicitly here at least makes the two tags agree instead of
// conflict — the duplication itself is a framework behavior, not
// something fixable from this file.
export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page doesn’t exist. Head back to Wheels2Wages to find driver and delivery jobs.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Page Not Found · Wheels2Wages',
    description: 'This page doesn’t exist. Head back to Wheels2Wages to find driver and delivery jobs.',
  },
  twitter: {
    title: 'Page Not Found · Wheels2Wages',
    description: 'This page doesn’t exist. Head back to Wheels2Wages to find driver and delivery jobs.',
  },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-32">
      <div className="text-center max-w-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-electric-700">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-display text-ink-900">
          Wrong turn.
        </h1>
        <p className="mt-4 text-base text-ink-500">
          That page isn&apos;t on the map. Head back home and pick a route from there.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric-700 text-white px-6 py-3 text-sm font-semibold hover:bg-electric-800 transition"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
