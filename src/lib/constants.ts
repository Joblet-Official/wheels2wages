// `keyword=wheels2wages` is not a guess — confirmed both in Joblet's source
// (a dedicated `dummy_jobs` table + company-match routing exist specifically
// for Wheels2Wages) and live: it returns exactly the 12 real "Driver &
// Delivery Jobs" postings (one per city below) plus 1 nationwide "CDL-A
// Truck Driver Jobs" posting. There is no separate real Joblet posting for
// Delivery/Courier/Gig alone — those roles are covered by the Driver &
// Delivery posting's own description, so those three categories share its
// destination rather than pointing at an invented filter.
export const JOBS_URL = 'https://joblet.ai/jobs?keyword=wheels2wages';

// The only category with a genuinely narrower, verified-clean Joblet filter.
// Confirmed live: adding this on its own isolates exactly the 1 real CDL
// posting (13 results -> 1). It must never be combined with a `location`,
// since that posting is nationwide ("US") and pairing it with any specific
// city verified-returns 0 jobs.
const CDL_CATEGORY_FILTER = 'Logistics & Transportation';

/**
 * Build a jobs URL with optional category/location filters.
 * - category: 'cdl' adds the verified narrowing filter (and drops location,
 *   see CDL_CATEGORY_FILTER above); every other category value is ignored,
 *   since no other category has a distinct real posting to filter down to —
 *   the base wheels2wages-scoped URL is already the correct destination.
 * - location: must be a CITIES[].value (not the display label) — several
 *   real Joblet location values have no space (e.g. "SanDiego") even though
 *   they display with one ("San Diego"), confirmed live per city.
 */
export function buildJobsUrl(extra?: { category?: string; location?: string }): string {
  const params: Record<string, string> = {};
  if (extra?.category === 'cdl') {
    params.category = CDL_CATEGORY_FILTER;
  } else if (extra?.location) {
    params.location = extra.location;
  }
  const qs = new URLSearchParams(params).toString();
  return qs ? `${JOBS_URL}&${qs}` : JOBS_URL;
}

export const SITE = {
  name: 'Wheels2Wages',
  domain: 'wheels2wages.com',
  url: 'https://wheels2wages.com',
  email: 'oliviabrook@wheels2wages.com',
  tagline: 'Driver & Delivery Jobs Near You',
};

// The verified real footprint of Wheels2Wages' Joblet postings — 12 cities,
// each confirmed live to return exactly 1 real "Driver & Delivery Jobs"
// posting (plus the nationwide CDL posting, reachable via the CDL category
// filter above, not through this list). `value` is the exact string Joblet's
// location filter matches on; `label` is how it displays on Wheels2Wages.
export const CITIES = [
  { label: 'Atlanta, GA', value: 'Atlanta' },
  { label: 'Augusta, GA', value: 'Augusta' },
  { label: 'Baltimore, MD', value: 'Baltimore' },
  { label: 'Cincinnati, OH', value: 'Cincinnati' },
  { label: 'Houston, TX', value: 'Houston' },
  { label: 'Louisville, KY', value: 'Louisville' },
  { label: 'Memphis, TN', value: 'Memphis' },
  { label: 'Orange County, CA', value: 'OrangeCounty' },
  { label: 'San Diego, CA', value: 'SanDiego' },
  { label: 'San Francisco, CA', value: 'SanFrancisco' },
  { label: 'St. Louis, MO', value: 'StLouis' },
  { label: 'Upstate, NY', value: 'Upstate' },
] as const;

// Joblet's broader location inventory, deliberately separate from the
// Wheels2Wages-only CITIES list above (Wheels2Wages is just one
// employer/campaign on Joblet). Not currently wired into any location
// selector on the page (kept here as verified, real data for whenever one
// is added back) — Joblet's own `/api/location-autocomplete` endpoint
// (api-handlers/location-autocomplete.js in the joblet1.0 source) requires
// no API key, but is CORS-restricted to an explicit origin allowlist
// (api-handlers/_lib/cors.js) that does not include wheels2wages.com;
// confirmed live (browser fetch from the wheels2wages dev origin against
// the real endpoint) that this fails with "No 'Access-Control-Allow-Origin'
// header is present." So this list is a real, non-invented, static subset —
// not a live call to Joblet.
//
// Sourced from two of Joblet's own authoritative lists (nothing invented):
//   1. Joblet's own `COMMON_LOCATIONS` fallback array, hardcoded in that
//      same location-autocomplete.js as what Joblet's own UI falls back to
//      when its DB query fails — i.e. Joblet's own choice of its most
//      useful common locations (state names filtered out here; a list of
//      cities is what this selector needs).
//   2. Joblet's public /locations directory's "Top Locations" panel
//      (sorted by live job count), which is where Saint Louis and
//      Springfield below come from — both were live-verified in an earlier
//      pass and aren't in Joblet's COMMON_LOCATIONS array.
// Every entry resolves to the same plain `location=<City Name>` value
// against Joblet's real job index, confirmed via the underlying
// /api/jobs/search network calls (spot-checked live: Atlanta, Houston,
// Dallas, Los Angeles, New York, Oklahoma City, Memphis, Chicago all
// returned real, non-wheels2wages job results).
//
// This is ~50 real cities, not Joblet's full 9K+ location index — a future
// free-text location field would need its own fallback for the rest,
// without inventing city names.
export const JOBLET_LOCATIONS = [
  'Albuquerque',
  'Arlington',
  'Atlanta',
  'Austin',
  'Baltimore',
  'Boston',
  'Charlotte',
  'Chicago',
  'Colorado Springs',
  'Columbus',
  'Dallas',
  'Denver',
  'Detroit',
  'El Paso',
  'Fort Worth',
  'Fresno',
  'Houston',
  'Indianapolis',
  'Jacksonville',
  'Kansas City',
  'Las Vegas',
  'Los Angeles',
  'Louisville',
  'Memphis',
  'Mesa',
  'Miami',
  'Milwaukee',
  'Minneapolis',
  'Nashville',
  'New Orleans',
  'New York',
  'Oakland',
  'Oklahoma City',
  'Omaha',
  'Philadelphia',
  'Phoenix',
  'Portland',
  'Raleigh',
  'Sacramento',
  'Saint Louis',
  'San Antonio',
  'San Diego',
  'San Francisco',
  'San Jose',
  'Seattle',
  'Springfield',
  'Tampa',
  'Tucson',
  'Tulsa',
  'Virginia Beach',
  'Washington',
] as const;

// Real international cities, for the same Hero location field. Joblet's own
// homepage advertises "19K+ cities and 35+ countries" — live-verified this
// is genuine at city granularity (searching /jobs?location=<city> for
// London, Toronto, Sydney, and Mumbai each returned real, live postings —
// 381, 170, 49, and 3 respectively). Country-granularity search is broken
// on Joblet's own site right now (both /jobs?location=United%20Kingdom and
// their own /locations/united-kingdom page return "Unable to load jobs"),
// so this list deliberately stays at the city level, one representative
// city per country from Joblet's real /locations "Countries" tab — not
// every city in each country, and not the broken country-level search.
export const INTERNATIONAL_LOCATIONS = [
  'London',
  'Toronto',
  'Sydney',
  'Auckland',
  'Mexico City',
  'Paris',
  'Berlin',
  'Rome',
  'São Paulo',
  'Buenos Aires',
  'Bogotá',
  'Helsinki',
  'Oslo',
  'Mumbai',
  'Seoul',
  'Ho Chi Minh City',
] as const;

// Combines both into what a broad Joblet-wide location field would offer —
// not currently wired into any component (see buildJobletSearchUrl below),
// kept as verified real data for whenever one is added back. Wheels2Wages'
// own US-only postings stay on buildJobsUrl/CITIES instead, untouched.
export const ALL_LOCATIONS = [...JOBLET_LOCATIONS, ...INTERNATIONAL_LOCATIONS] as const;

/** Single source of truth for the 5 job categories. Not currently rendered
 *  as its own list anywhere (see CATEGORY_SEARCH_URLS below) — kept as
 *  verified real data for whenever a categories section is added back. */
export const CATEGORIES = [
  { label: 'Driver Jobs', param: 'driver' },
  { label: 'Delivery Jobs', param: 'delivery' },
  { label: 'CDL Truck Driver Jobs', param: 'cdl' },
  { label: 'Courier Opportunities', param: 'courier' },
  { label: 'Gig Work', param: 'gig' },
] as const;

// Broad, non-wheels2wages-scoped Joblet searches for the 5 job categories.
// Powers every category link on the site (Hero category pills and quick
// links, the "Choose your lane"/"Match roles to cities" chips, Footer's
// "Find your lane" links) — this is what makes clicking "Delivery" open
// every Delivery job on Joblet, not just Wheels2Wages' own postings.
// Verified against Joblet's own search UI — it generates plain
// `keyword=<term>` for these same searches, since no dedicated
// driver/delivery/CDL/courier/gig taxonomy exists in Joblet's source.
// Deliberately separate from buildJobsUrl/JOBS_URL, which stays scoped to
// Wheels2Wages' own branded postings (the footer's role links, city
// links) — these two must not be merged.
export const CATEGORY_SEARCH_URLS: Record<(typeof CATEGORIES)[number]['param'], string> = {
  driver: 'https://joblet.ai/jobs?keyword=Driver',
  delivery: 'https://joblet.ai/jobs?keyword=Delivery',
  cdl: 'https://joblet.ai/jobs?keyword=CDL',
  courier: 'https://joblet.ai/jobs?keyword=Courier',
  gig: 'https://joblet.ai/jobs?keyword=Gig',
};

// The site's main "Browse Jobs" / "Find Jobs" CTAs (navbar, hero, footer,
// sticky mobile bar) deliberately open the broad Driver search rather than
// JOBS_URL — a visitor clicking the primary CTA should see the full breadth
// of real driver postings across Joblet, not only Wheels2Wages' own narrow
// campaign.
export const BROWSE_JOBS_URL = CATEGORY_SEARCH_URLS.driver;

// Base broad-search URL, no keyword/location — used only as the fallback
// below when no category is selected.
const JOBLET_SEARCH_URL = 'https://joblet.ai/jobs';

/**
 * Build a broad (non-wheels2wages-scoped) Joblet search URL, composing
 * category + location together. Used by the "Match roles to cities"
 * location results in WheelsHomeStory.tsx, so each city link opens that
 * exact role + location search on Joblet. Reuses CATEGORY_SEARCH_URLS as
 * the keyword source (so the keyword term never drifts out of sync with
 * the 5 categories) and layers `location` on top independently.
 * Deliberately separate from buildJobsUrl/JOBS_URL, which stay reserved
 * for Wheels2Wages' own branded postings (the footer's role links, city
 * links) — these two must not be merged.
 */
export function buildJobletSearchUrl(extra?: {
  category?: (typeof CATEGORIES)[number]['param'];
  location?: string;
}): string {
  const base = extra?.category ? CATEGORY_SEARCH_URLS[extra.category] : JOBLET_SEARCH_URL;
  if (!extra?.location) return base;
  const url = new URL(base);
  url.searchParams.set('location', extra.location);
  return url.toString();
}

// Anchors must match the real section ids in HeroRedesign.tsx (#jobs) and
// WheelsHomeStory.tsx (#how-it-works, #faq) plus Footer.tsx (#contact).
export const NAV_LINKS = [
  { label: 'Jobs', href: '#jobs' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const FAQS = [
  {
    q: 'Do I need to own a vehicle to apply?',
    a: 'It depends on the role. Many delivery and rideshare opportunities require a personal vehicle, while CDL truck driving and some courier positions provide one. Each job listing on Wheels2Wages specifies vehicle requirements clearly.',
  },
  {
    q: 'Is there any cost to apply or get started?',
    a: 'No. Wheels2Wages never charges applicants registration fees, commissions, or any other costs. Applying is free, and drivers keep 100% of what they earn through the platform they join.',
  },
  {
    q: 'Which locations are currently hiring drivers?',
    a: 'Active opportunities are listed across Atlanta, Houston, Baltimore, San Diego, Cincinnati, Louisville, Memphis, St. Louis, San Francisco, and Orange County, with new cities added regularly.',
  },
  {
    q: 'Are flexible and full-time schedules available?',
    a: 'Yes. You can filter for full-time CDL routes, part-time delivery shifts, or flexible gig work that fits around an existing schedule.',
  },
  {
    q: 'How soon can I begin driving opportunities?',
    a: 'Applications take a few minutes. Onboarding speed depends on the platform. Rideshare and food delivery typically activate within days, while CDL roles can take longer due to compliance checks.',
  },
];
