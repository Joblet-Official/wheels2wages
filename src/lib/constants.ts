export const JOBS_URL = 'https://joblet.ai/jobs?keyword=wheels2wages';

/**
 * Build a jobs URL with optional extra query params.
 * Example: buildJobsUrl({ location: 'Atlanta' })
 */
export function buildJobsUrl(extra?: Record<string, string>): string {
  if (!extra) return JOBS_URL;
  const params = new URLSearchParams(extra);
  return `${JOBS_URL}&${params.toString()}`;
}

export const SITE = {
  name: 'Wheels2Wages',
  domain: 'wheels2wages.com',
  url: 'https://wheels2wages.com',
  email: 'alexa.smith@wheels2wages.com',
  tagline: 'Driver & Delivery Jobs Near You',
};

export const CITIES = [
  'Atlanta',
  'Houston',
  'Baltimore',
  'San Diego',
  'Cincinnati',
  'Louisville',
  'Memphis',
  'St. Louis',
  'San Francisco',
  'Orange County',
] as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
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
