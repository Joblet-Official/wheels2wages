# Wheels2Wages

Single-page conversion-focused landing site. Every CTA redirects to:
`https://joblet.ai/jobs?keyword=wheels2wages`

## Stack
- Next.js 14 (App Router)
- TypeScript, Tailwind CSS
- Geist font, lucide-react, Framer Motion
- SSR-first, fully static export-ready

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve production build
```

## Structure
```
src/
  app/
    layout.tsx        # root layout, metadata, JSON-LD
    page.tsx          # single landing page composing all sections
    globals.css
    sitemap.ts, robots.ts, loading.tsx, not-found.tsx
  components/
    Hero.tsx, JobCategories.tsx, PopularCities.tsx,
    FeaturedJobs.tsx, HowItWorks.tsx, About.tsx,
    FAQ.tsx, Contact.tsx, FinalCTA.tsx,
    Navbar.tsx, Footer.tsx, StickyMobileCTA.tsx,
    StructuredData.tsx, Logo.tsx, Button.tsx, Section.tsx
  lib/
    constants.ts      # JOBS_URL, SITE, CITIES, FAQS, NAV_LINKS
    utils.ts
public/
  icon.svg, site.webmanifest
```

## Conversion strategy

All CTAs use the `JOBS_URL` constant and append filters via `buildJobsUrl()`:
```ts
buildJobsUrl({ location: 'Atlanta', category: 'driver' })
// → https://joblet.ai/jobs?keyword=wheels2wages&location=Atlanta&category=driver
```

Every CTA carries a `data-cta="..."` attribute for GA4 outbound-click tracking.

## Analytics setup

The site is wired for tracking but doesn't ship with GA4/Pixel scripts add them in `src/app/layout.tsx` inside `<head>` or as a Script tag. Bind GA4 events to `data-cta` clicks:

```js
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-cta]');
  if (t) gtag('event', 'cta_click', { cta_id: t.dataset.cta });
});
```

## SEO

- Server-rendered (no client-side fetches on landing)
- Semantic HTML, single H1, proper H2 hierarchy
- JSON-LD: `Organization`, `WebSite`, `FAQPage` (in `StructuredData.tsx`)
- Open Graph + Twitter Card metadata
- `sitemap.xml`, `robots.txt` auto-generated

## Before launch

1. Replace `https://wheels2wages.com` in `src/lib/constants.ts` (`SITE.url`)
2. Drop into `/public`:
   - `favicon.ico`
   - `apple-touch-icon.png` (180×180)
   - `og.png` (1200×630)
3. **Swap the About-section image.** Currently uses a Picsum placeholder. Replace the `<img src>` in `src/components/About.tsx` with a real driver/delivery photo (recommend a properly licensed photo or one of your own). Suggested aspect ratio: 2:1, around 1600×800.
4. Add GA4 + Meta Pixel scripts in `layout.tsx`
5. Verify all `JOBS_URL` filter params (`category`, `location`) match joblet.ai's accepted query keys adjust `buildJobsUrl()` if joblet uses different keys

## Deploy

Push to GitHub → import in Vercel → done.

## Design tokens
- Primary accent: `maroon-700` `#7F1D2E`
- Brand mark (wheel + "2"): `brandBlue` `#1D4ED8`
- Text: `ink-900` `#0A0A0B`
- Background: `#FFFFFF`
- Type: Geist Sans, tracking `-0.04em` on display headings
