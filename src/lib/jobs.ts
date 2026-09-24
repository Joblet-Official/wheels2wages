// Live job feed (Joveo outbound XML). Fetched and parsed server-side only —
// the page that uses this is a React Server Component, so the fetch happens
// on the server and never hits the browser's Content-Security-Policy
// (next.config.mjs restricts connect-src to 'self'; that governs the browser,
// not server-side fetches). No new dependency is pulled in for this: the feed
// is a flat, CDATA-wrapped XML with a fixed field set, so a small targeted
// parser is enough and avoids adding an XML library.

const FEED_URL =
  'https://joveo-outbound-feeds-prod.s3-accelerate.amazonaws.com/joveo-8bc66f8d/94cf8dc5.xml';

// A second, much larger general-jobs feed. Only a hand-picked handful of
// postings from it are surfaced (see FEATURED_REFERENCE_NUMBERS below) —
// pinned at the top of the listing, above everything from the main feed.
const FEATURED_FEED_URL =
  'https://joveo-outbound-feeds-prod.s3-accelerate.amazonaws.com/joveo-8bc66f8d/eaf78652.xml';

// The specific postings to feature, in the order they should be shown.
// Picked 2026-09-24: Remote Online Casino Experience Tester (Little Wheel),
// Licensed Practical Nurse - LPN (CareRite Centers), Registered Nurse (RN) -
// PACU (Tenet Healthcare), Mobile Equipment Operator (Amrize), Licensed
// Veterinary Technician (ASPCA). Re-fetched live from FEATURED_FEED_URL each
// revalidation, so title/url/etc. stay current — this list only pins WHICH
// postings show, not their content. If one drops out of the feed, it's
// simply omitted rather than showing stale data.
const FEATURED_REFERENCE_NUMBERS = [
  '257168933-expVer-470',
  '4bzab8cbb75a4-expVer-1',
  '2603001098-expVer-17',
  '17459-en_US-expVer-5',
  '2026-79-1-expVer-52',
];

// Re-fetch at most once an hour; the feed is a large (~700KB) file and the
// listing does not need to be real-time.
const REVALIDATE_SECONDS = 3600;

export type FeedJob = {
  id: string;
  title: string;
  company: string;
  city: string;
  state: string;
  location: string;
  category: string;
  url: string;
  postedAt: string | null;
  featured?: boolean;
};

/** Pull the inner text of the first <tag>…</tag>, unwrapping an optional
 *  CDATA section and trimming. Returns '' when the tag is absent or empty. */
function field(block: string, tag: string): string {
  const match = block.match(
    new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`),
  );
  return match ? match[1].trim() : '';
}

function parseJobs(xml: string): FeedJob[] {
  const blocks = xml.match(/<job>[\s\S]*?<\/job>/g) ?? [];
  return blocks.map((block, index) => {
    const city = field(block, 'city');
    const state = field(block, 'state');
    const location = [city, state].filter(Boolean).join(', ');
    return {
      id: field(block, 'referencenumber') || field(block, 'url') || `job-${index}`,
      title: field(block, 'title'),
      company: field(block, 'company'),
      city,
      state,
      location,
      category: field(block, 'category'),
      url: field(block, 'url'),
      postedAt: field(block, 'date') || null,
    };
  });
}

async function fetchFeed(url: string): Promise<FeedJob[]> {
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!response.ok) return [];
  const xml = await response.text();
  return parseJobs(xml).filter((job) => job.title && job.url);
}

/**
 * Fetch the featured feed and return just the hand-picked postings named in
 * FEATURED_REFERENCE_NUMBERS, in that list's order. A posting that has since
 * dropped out of the feed is simply omitted. Returns [] on any failure.
 */
async function getFeaturedJobs(): Promise<FeedJob[]> {
  try {
    const jobs = await fetchFeed(FEATURED_FEED_URL);
    const byId = new Map(jobs.map((job) => [job.id, job]));
    return FEATURED_REFERENCE_NUMBERS.map((ref) => byId.get(ref))
      .filter((job): job is FeedJob => Boolean(job))
      .map((job) => ({ ...job, featured: true }));
  } catch {
    return [];
  }
}

/**
 * Fetch the live feed and return every usable job (one that has both a title
 * and an apply URL), with the hand-picked featured postings pinned at the
 * front. Returns [] on any failure so the page can render a clean empty
 * state instead of throwing.
 */
export async function getAllJobs(): Promise<FeedJob[]> {
  try {
    const [featured, main] = await Promise.all([
      getFeaturedJobs(),
      fetchFeed(FEED_URL),
    ]);
    const featuredIds = new Set(featured.map((job) => job.id));
    return [...featured, ...main.filter((job) => !featuredIds.has(job.id))];
  } catch {
    return [];
  }
}
