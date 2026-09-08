'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, Car, Check, MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BROWSE_JOBS_URL, buildJobletSearchUrl, CATEGORY_SEARCH_URLS, CITIES, FAQS } from '@/lib/constants';
import { Button } from './Button';
import { FindJobsCta } from './StickyMobileCTA';
import './WheelsHomeStory.css';

const roles = [
  { label: 'Driver', category: 'driver' },
  { label: 'Delivery', category: 'delivery' },
  { label: 'CDL', category: 'cdl' },
  { label: 'Courier', category: 'courier' },
  { label: 'Gig work', category: 'gig' },
] as const;

// SSR-safety: `mounted` starts false on both the server and the very first
// client render (so hydration never mismatches what the server sent), then
// flips true a tick later. Framer Motion bakes `initial` values into
// server-rendered HTML as inline styles — without gating on this, the FAQ's
// default-open answer would render invisible in raw SSR output and stay
// that way permanently if the client bundle never loads.
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const DEFAULT_VISIBLE_LOCATIONS = 6;

function RouteJourney() {
  const defaultRole = roles[0] ?? ({ label: 'Driver', category: 'driver' } as const);
  const [activeRoleCategory, setActiveRoleCategory] = useState<(typeof roles)[number]['category']>(defaultRole.category);
  const [marketQuery, setMarketQuery] = useState('');
  const [showAllLocations, setShowAllLocations] = useState(false);
  const activeRole = roles.find((role) => role.category === activeRoleCategory) ?? defaultRole;
  const isSearching = marketQuery.trim().length > 0;
  const locationMatches = CITIES.filter((city) =>
    city.label.toLowerCase().includes(marketQuery.trim().toLowerCase()),
  );
  // With the search box empty, dumping every city straight into the page
  // defeats the point of having a search field — show a short default set
  // and let people either search or explicitly ask to see the rest.
  const visibleLocations =
    isSearching || showAllLocations ? locationMatches : locationMatches.slice(0, DEFAULT_VISIBLE_LOCATIONS);
  const hiddenLocationCount = locationMatches.length - visibleLocations.length;
  return (
    <section
      id="how-it-works"
      className="w2w-route-board"
      aria-labelledby="route-story-title"
    >
      <div className="w2w-story-shell">
        <div className="w2w-route-board__intro">
          <span className="w2w-story-kicker">How it works</span>
          <h2 id="route-story-title">Your route to paid driving work.</h2>
          <p>
            No slide deck, no maze. Start with the kind of work you want,
            choose the area that fits your day, and move straight into applying.
          </p>
        </div>

        <div className="w2w-route-board__grid">
          <div className="w2w-route-board__visual">
            <Image
              src="/journey-van.jpg"
              alt="Delivery van moving along a tree-lined road"
              fill
              sizes="(max-width: 980px) 100vw, 46vw"
            />
            <div className="w2w-route-board__visual-overlay">
              <span>Live route</span>
              <strong>Driver and delivery openings, mapped around your next move.</strong>
            </div>
          </div>

          <div className="w2w-process-panel">
            <div className="w2w-process-step">
              <span className="w2w-process-step__num">01</span>
              <div className="w2w-process-step__body">
                <h3>Choose your lane</h3>
                <p>Jump into the job type that matches your vehicle, schedule, or CDL experience.</p>
                <nav className="w2w-route-card__chips" aria-label="Driver job categories">
                  {roles.map((role) => (
                    <Link href={CATEGORY_SEARCH_URLS[role.category]} key={role.label}>
                      {role.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="w2w-process-step">
              <span className="w2w-process-step__num">02</span>
              <div className="w2w-process-step__body">
                <h3>Match roles to cities</h3>
                <p>Pick a role, then choose from every active Wheels2Wages location. Each city opens that exact role search on Joblet.</p>

                <div className="w2w-role-picker" aria-label="Choose a driver role">
                  {roles.map((role) => (
                    <Link
                      className={role.category === activeRoleCategory ? 'is-active' : undefined}
                      key={role.category}
                      href={CATEGORY_SEARCH_URLS[role.category]}
                      onClick={() => setActiveRoleCategory(role.category)}
                    >
                      {role.label}
                    </Link>
                  ))}
                </div>

                <label className="w2w-market-search" htmlFor="w2w-market-search">
                  <Search aria-hidden />
                  <input
                    id="w2w-market-search"
                    value={marketQuery}
                    onChange={(event) => setMarketQuery(event.target.value)}
                    placeholder="Search a location..."
                    type="search"
                  />
                </label>

                <div className="w2w-role-location-board">
                  <div className="w2w-role-location-board__header">
                    <span>Available locations</span>
                    <Link href={CATEGORY_SEARCH_URLS[activeRole.category]}>
                      All {activeRole.label} jobs <ArrowUpRight aria-hidden />
                    </Link>
                  </div>

                  {visibleLocations.length > 0 ? (
                    <>
                      <div
                        className="w2w-role-location-grid"
                        id="w2w-location-results"
                        aria-label={`${activeRole.label} jobs by location`}
                      >
                        {visibleLocations.map((city) => (
                          <Link
                            href={buildJobletSearchUrl({ category: activeRole.category, location: city.value })}
                            key={`${activeRole.category}-${city.value}`}
                          >
                            <span><MapPin aria-hidden /> {city.label}</span>
                            <strong>{activeRole.label} roles</strong>
                            <ArrowUpRight aria-hidden />
                          </Link>
                        ))}
                      </div>
                      {hiddenLocationCount > 0 && (
                        <button
                          type="button"
                          className="w2w-market-show-all"
                          aria-expanded={showAllLocations}
                          aria-controls="w2w-location-results"
                          onClick={() => setShowAllLocations(true)}
                        >
                          Show all {locationMatches.length} locations
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="w2w-market-empty">No matching locations yet. Clear the search to see every city.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="w2w-process-step">
              <span className="w2w-process-step__num">03</span>
              <div className="w2w-process-step__body">
                <h3>Apply when it fits</h3>
                <p>Review the role, confirm the requirements, and continue free. No applicant fees.</p>
                <ol>
                  <li><Check aria-hidden /> Explore the opening</li>
                  <li><Check aria-hidden /> Review what it needs</li>
                  <li><Check aria-hidden /> Go to the application</li>
                </ol>
                <Button href={BROWSE_JOBS_URL} variant="inverse" size="md" className="mt-[22px]">
                  Browse open jobs <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanManifesto() {
  return (
    <section className="w2w-manifesto" id="why-wheels2wages" aria-labelledby="manifesto-title">
      <div className="w2w-manifesto__line" aria-hidden>
        <span>Work around your life</span>
        <i />
        <span>Not the other way around</span>
      </div>
      <div className="w2w-story-shell w2w-manifesto__grid">
        <div>
          <span className="w2w-story-kicker">Why Wheels2Wages</span>
          <h2 id="manifesto-title">A clearer search. A more human next step.</h2>
        </div>
        <div className="w2w-manifesto__copy">
          <p>
            Looking for work already takes energy. The website should not make
            it harder. Wheels2Wages keeps the route direct: the work, the place,
            and the application.
          </p>
          <dl>
            <div><dt>$0</dt><dd>fees charged to applicants</dd></div>
            <div><dt>3</dt><dd>clear steps from search to apply</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function FinalChapter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  // FAQ #1 opens by default (openIndex starts at 0), and Framer Motion
  // would otherwise bake that answer's *collapsed* {height:0, opacity:0}
  // initial state into server-rendered HTML — meaning the "already open"
  // question would render invisible until JS runs. `!mounted` covers
  // exactly the SSR/first-paint window; once mounted, later opens/closes
  // (user-triggered) animate normally.
  const skipAnswerAnim = !mounted || reduceMotion;

  return (
    <section className="w2w-final-chapter" id="faq" aria-labelledby="final-title">
      <div className="w2w-story-shell w2w-final-chapter__grid">
        <div className="w2w-final-chapter__intro">
          <div>
            <span className="w2w-story-kicker">Before you apply</span>
            <h2 id="final-title">What drivers usually ask us.</h2>
          </div>

          <div className="w2w-final-chapter__questions">
            {FAQS.slice(0, 4).map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `journey-faq-${index}`;
              return (
                <div className="w2w-final-chapter__question" key={faq.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>0{index + 1}</span>
                    <strong>{faq.q}</strong>
                    <i aria-hidden>{isOpen ? '−' : '+'}</i>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        className="w2w-final-chapter__answer"
                        initial={skipAnswerAnim ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="w2w-final-chapter__cta">
          <div className="w2w-final-chapter__route" aria-hidden>
            <span>You</span>
            <i>
              <motion.span
                className="w2w-final-chapter__vehicle"
                initial={reduceMotion ? false : { left: '0%' }}
                whileInView={reduceMotion ? undefined : { left: '92%' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Car aria-hidden />
              </motion.span>
            </i>
            <span>Work</span>
          </div>
          <div>
            <span className="w2w-story-kicker">Start where you are</span>
            <h2>Find work that fits the way you move.</h2>
            <p>Browse current openings by job type and city, then apply when a role feels right for you.</p>
            <div className="w2w-final-chapter__actions">
              <Link href={BROWSE_JOBS_URL}>Find jobs near me <ArrowUpRight aria-hidden /></Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function WheelsHomeStory() {
  return (
    <>
      <RouteJourney />
      <FindJobsCta />
      <HumanManifesto />
      <FinalChapter />
    </>
  );
}
