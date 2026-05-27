import { Logo } from './Logo';
import { Container } from './Section';
import { CITIES, SITE, buildJobsUrl } from '@/lib/constants';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

// SEO-friendly city/category combinations for footer
const seoLinks = [
  { label: 'Driver Jobs in Atlanta', city: 'Atlanta', cat: 'driver' },
  { label: 'Delivery Jobs in Houston', city: 'Houston', cat: 'delivery' },
  { label: 'CDL Jobs in San Diego', city: 'San Diego', cat: 'cdl' },
  { label: 'Courier Jobs in Memphis', city: 'Memphis', cat: 'courier' },
  { label: 'Gig Work in San Francisco', city: 'San Francisco', cat: 'gig' },
  { label: 'Delivery Jobs in Baltimore', city: 'Baltimore', cat: 'delivery' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-white pt-16 pb-10 mt-8">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="brightness-0 invert opacity-95">
              <Logo />
            </div>
            <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
              {SITE.tagline}. Across major US cities. Free for applicants, always.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-block text-sm text-white/75 hover:text-white"
            >
              {SITE.email}
            </a>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Wheels2Wages
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/75 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular cities */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Cities
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
              {CITIES.slice(0, 8).map((c) => (
                <li key={c}>
                  <a
                    href={buildJobsUrl({ location: c })}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`footer_city_${c.toLowerCase().replace(/[^a-z]/g, '_')}`}
                    className="text-sm text-white/75 hover:text-white"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Top searches
            </h3>
            <ul className="mt-4 space-y-2.5">
              {seoLinks.slice(0, 5).map((l) => (
                <li key={l.label}>
                  <a
                    href={buildJobsUrl({ location: l.city, category: l.cat })}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`footer_seo_${l.label.toLowerCase().replace(/\s+/g, '_')}`}
                    className="text-sm text-white/75 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10">
          <p className="text-xs text-white/50">
            Wheels2Wages does not charge applicants any fees or commissions. Drivers keep 100% of earnings from the platform they join.
          </p>
          <div className="mt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-white/40">© {year} Wheels2Wages. All rights reserved.</p>
            <ul className="flex gap-5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-xs text-white/60 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
