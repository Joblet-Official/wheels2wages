# public/ — static assets

Drop these production assets in here before deploying. Placeholders are fine for development.

## Required for full SEO / branding

- `favicon.ico` — 32×32 (or multi-size). Generate from `icon.svg` using https://realfavicongenerator.net.
- `icon.svg` — included (single confident "W" mark, electric blue dot).
- `apple-touch-icon.png` — 180×180 PNG for iOS home-screen icons.
- `og.png` — 1200×630 social preview. Black background, "Wheels2Wages — Find Delivery & Driver Jobs That Fit Your Life," big serif/sans headline, single electric-blue accent dot.
- `site.webmanifest` — included.

## Recommended favicon recipe

1. Open `icon.svg` in Figma / Affinity / Sketch.
2. Export at 16×16, 32×32, 48×48 → combine into `favicon.ico`.
3. Export at 180×180 → `apple-touch-icon.png`.
4. For `og.png`: 1200×630 canvas, #0A0A0B background, headline in Geist (or your installed alternative) at ~96px, single small #2563EB circle accent, Wheels2Wages logotype bottom-left.

Until you replace them, Next.js will serve `/icon.svg` automatically from `metadata.icons` in `src/app/layout.tsx`.
