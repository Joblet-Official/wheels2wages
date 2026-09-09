'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BROWSE_JOBS_URL, CATEGORY_SEARCH_URLS } from '@/lib/constants';
import { Button } from './Button';
import './HeroRedesign.css';

const jobTypes = [
  { label: 'Driver', category: 'driver' },
  { label: 'Delivery', category: 'delivery' },
  { label: 'CDL', category: 'cdl' },
  { label: 'Courier', category: 'courier' },
  { label: 'Gig work', category: 'gig' },
] as const;

const reveal = { duration: 1, ease: [0.16, 1, 0.3, 1] as const };
const MOBILE_QUERY = '(max-width: 680px)';

// Gates every `initial` prop below. Framer Motion bakes `initial` values
// into server-rendered HTML as inline styles — without this, the headline
// (y: '115%', i.e. off-screen) and the photo (clipPath: fully clipped)
// would render invisible in raw SSR output and stay that way permanently
// if the client bundle never loads. `mounted` starts false on both the
// server and the first client render (so hydration never mismatches),
// then flips true a tick later — real devices never see a flash, and a
// JS failure just leaves everything in its plain, final, visible state.
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isMobile;
}

export function HeroRedesign() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const isMobile = useIsMobile();
  // `skip` covers SSR/no-JS/reduced-motion — always render final state.
  // `simplified` additionally covers mobile: one quick coordinated
  // entrance instead of the desktop's per-line stagger and parallax.
  const skip = !mounted || reduceMotion;
  const simplified = skip || isMobile;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // Scroll-linked parallax is desktop-only — a continuous transform tied to
  // scroll position is exactly the kind of thing that costs real jank on
  // mid-range mobile hardware, and it reads as tilt on a phone in-hand.
  const photoY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 72]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.09]);

  return (
    <section ref={heroRef} className="w2w-film-hero" id="jobs" aria-labelledby="hero-heading">
      <motion.figure
        className="w2w-film-hero__photo"
        initial={skip ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: simplified ? 0.5 : 1.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div style={simplified ? undefined : { y: photoY, scale: photoScale }}>
          <Image
            src="/hero-truck-driver-natural.jpg"
            alt="Driver walking through a fleet of parked semi trucks at sunset"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="w2w-film-hero__wash" aria-hidden />
        <div className="w2w-film-hero__grain" aria-hidden />
      </motion.figure>

      <div className="w2w-film-hero__topline">
        <motion.span
          initial={simplified ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: simplified ? 0 : 0.2 }}
        >
          Wheels2Wages · Work that moves
        </motion.span>
        <motion.nav
          aria-label="Browse jobs by type"
          initial={simplified ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: simplified ? 0 : 0.32 }}
        >
          {jobTypes.map((job) => (
            <Link href={CATEGORY_SEARCH_URLS[job.category]} key={job.label}>
              {job.label}
            </Link>
          ))}
        </motion.nav>
      </div>

      <motion.div
        className="w2w-film-hero__content"
        initial={simplified ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: simplified ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1], delay: simplified ? 0 : 0.1 }}
      >
        <h1 id="hero-heading">
          <span>
            <motion.i
              initial={simplified ? false : { y: '115%' }}
              animate={{ y: 0 }}
              transition={{ ...reveal, delay: simplified ? 0 : 0.22 }}
            >
              Driver &amp; delivery
            </motion.i>
          </span>
          <span>
            <motion.i
              initial={simplified ? false : { y: '115%' }}
              animate={{ y: 0 }}
              transition={{ ...reveal, delay: simplified ? 0 : 0.34 }}
            >
              jobs near you.
            </motion.i>
          </span>
        </h1>

        <motion.aside
          initial={simplified ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...reveal, delay: simplified ? 0 : 0.52 }}
        >
          <p>
            Real driving and delivery opportunities, organized around the work
            you want and the places you know.
          </p>
          <Button href={BROWSE_JOBS_URL} variant="inverse" size="lg">
            Browse open jobs <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
          <div className="w2w-film-hero__quick-links" aria-label="Quick job searches">
            {jobTypes.map((job) => (
              <Link href={CATEGORY_SEARCH_URLS[job.category]} key={job.label}>
                Find {job.label} jobs
              </Link>
            ))}
          </div>
          <small>Free for applicants · No commission</small>
        </motion.aside>
      </motion.div>
    </section>
  );
}
