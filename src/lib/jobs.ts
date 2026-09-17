// Live job feed (Joveo outbound XML). Fetched and parsed server-side only —
// the page that uses this is a React Server Component, so the fetch happens
// on the server and never hits the browser's Content-Security-Policy
// (next.config.mjs restricts connect-src to 'self'; that governs the browser,
// not server-side fetches). No new dependency is pulled in for this: the feed
// is a flat, CDATA-wrapped XML with a fixed field set, so a small targeted
// parser is enough and avoids adding an XML library.

const FEED_URL =
  'https://joveo-outbound-feeds-prod.s3-accelerate.amazonaws.com/joveo-8bc66f8d/94cf8dc5.xml';

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

/**
 * Fetch the live feed and return every usable job (one that has both a title
 * and an apply URL), in feed order. Returns [] on any failure so the page can
 * render a clean empty state instead of throwing.
 */
export async function getAllJobs(): Promise<FeedJob[]> {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseJobs(xml).filter((job) => job.title && job.url);
  } catch {
    return [];
  }
}
