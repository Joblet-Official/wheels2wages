import { ArrowUpRight, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { BROWSE_JOBS_URL, CATEGORY_SEARCH_URLS, CITIES, SITE, buildJobsUrl } from '@/lib/constants';
import './Footer.css';

const roleLinks = [
  { label: 'Driver jobs', category: 'driver' },
  { label: 'Delivery jobs', category: 'delivery' },
  { label: 'CDL jobs', category: 'cdl' },
  { label: 'Courier jobs', category: 'courier' },
  { label: 'Flexible gig work', category: 'gig' },
] as const;

const pageLinks = [
  { label: 'Browse jobs', href: '#jobs' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Questions', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w2w-site-footer" id="contact">
      <div className="w2w-site-footer__shell">
        <div className="w2w-site-footer__top">
          <div className="w2w-site-footer__brand">
            <div><Logo /></div>
            <p>Driver and delivery opportunities organized around the work you want and the places you know.</p>
          </div>

          <a className="w2w-site-footer__contact" href={`mailto:${SITE.email}`}>
            <Mail aria-hidden />
            <span>
              <small>Need help finding the right route?</small>
              <strong>{SITE.email}</strong>
            </span>
            <ArrowUpRight aria-hidden />
          </a>
        </div>

        <div className="w2w-site-footer__statement">
          <h2>Work that moves<br />with your life.</h2>
          <a href={BROWSE_JOBS_URL} target="_blank" rel="noopener noreferrer">
            Browse open jobs <ArrowUpRight aria-hidden />
          </a>
        </div>

        <div className="w2w-site-footer__links">
          <div>
            <span>Explore</span>
            <nav aria-label="Footer navigation">
              {pageLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
            </nav>
          </div>
          <div>
            <span>Find your lane</span>
            <nav aria-label="Job categories">
              {roleLinks.map((role) => (
                <a href={CATEGORY_SEARCH_URLS[role.category]} key={role.category}>{role.label}</a>
              ))}
            </nav>
          </div>
          <div>
            <span>Popular cities</span>
            <nav aria-label="Popular job locations">
              {CITIES.slice(0, 6).map((city) => (
                <a href={buildJobsUrl({ location: city.value })} key={city.value}>{city.label}</a>
              ))}
            </nav>
          </div>
        </div>

        <div className="w2w-site-footer__bottom">
          <p>© {year} Wheels2Wages. Free for applicants. No fees or commissions.</p>
          <a className="w2w-site-footer__powered" href="https://joblet.ai" target="_blank" rel="noopener noreferrer" aria-label="Powered by joblet.ai">
            <span>Powered by</span>
            <img src="/joblet-mark-icon.png" alt="" aria-hidden />
            <strong>joblet.ai</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}
