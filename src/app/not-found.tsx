import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-32">
      <div className="text-center max-w-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-electric-700">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-display text-ink-900">
          Wrong turn.
        </h1>
        <p className="mt-4 text-base text-ink-500">
          That page isn't on the map. Head back home and pick a route from there.
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
