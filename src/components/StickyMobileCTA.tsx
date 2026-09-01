'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BROWSE_JOBS_URL } from '@/lib/constants';

// Sections/states that must never be covered by the fixed CTA. "menu-open"
// and "combobox-open" are custom events dispatched by Navbar/RouteJourney
// rather than DOM elements, since they're not always backed by one.
const HIDE_OVER_IDS = ['jobs', 'faq', 'contact'];

export function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [overHiddenSection, setOverHiddenSection] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('jobs');
    if (!hero) return;
    // "Past the hero" once its bottom edge has scrolled above the viewport —
    // a single shared observer rather than a scroll listener.
    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    heroObserver.observe(hero);

    // A single IntersectionObserver callback only reports entries for
    // targets whose intersection state just changed — not every observed
    // target every time. Inferring "none of the watched sections
    // intersect" from entries.every(...) on just that batch was wrong: if
    // e.g. only the Hero's entry changed, the footer's last-known state
    // (from an earlier, separate callback) would get silently discarded.
    // Track per-target state explicitly instead.
    const intersecting = new Set<Element>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setOverHiddenSection(intersecting.size > 0);
      },
      // Bottom margin roughly matching the CTA's own height, so it hides
      // slightly before the watched section's edge actually reaches it.
      { rootMargin: '0px 0px -72px 0px', threshold: 0 },
    );
    HIDE_OVER_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    const onMenuToggle = (e: Event) => setMenuOpen((e as CustomEvent<boolean>).detail);
    window.addEventListener('w2w:menu-toggle', onMenuToggle);

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('w2w:menu-toggle', onMenuToggle);
    };
  }, []);

  const visible = pastHero && !overHiddenSection && !menuOpen;

  return (
    <div
      className="w2w-sticky-cta"
      data-visible={visible}
      aria-hidden={!visible}
    >
      <a
        href={BROWSE_JOBS_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="mobile_sticky_find_jobs"
        tabIndex={visible ? 0 : -1}
      >
        Find Jobs Near You
        <ArrowRight aria-hidden />
      </a>
    </div>
  );
}
