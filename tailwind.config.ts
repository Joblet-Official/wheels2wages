import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50: '#F7F7F8',
          100: '#EEEEF1',
          200: '#D9DAE0',
          300: '#B7B9C3',
          400: '#8B8E9B',
          500: '#62656F',
          600: '#45474E',
          700: '#2E3035',
          800: '#1B1C20',
          900: '#0A0A0B',
          DEFAULT: '#0A0A0B',
        },
        // Primary brand blue — the color that actually exists in the
        // Wheels2Wages logo mark (Logo.tsx / public/icon.svg). Stays the
        // one color every CTA/primary action uses.
        electric: {
          50: '#EFF4FF',
          100: '#DBE6FF',
          200: '#BCD0FF',
          300: '#8AB0FF',
          400: '#5786FF',
          500: '#2E61F0',
          600: '#2563EB', // primary
          700: '#1D4ED8', // logo mark color
          800: '#1E40AF',
          900: '#1E3A8A',
          DEFAULT: '#2563EB',
        },
        // Genuinely navy — real, visible blue saturation, not a near-black
        // with a faint blue tint (the first pass read as plain black on a
        // real screen). Distinct from neutral ink-900. Used for
        // high-contrast section surfaces (dark CTA, footer, the Categories
        // section) rather than as a text color.
        navy: {
          50: '#EFF3FA',
          100: '#DCE5F5',
          300: '#7B94C4',
          500: '#2A4A85',
          700: '#1A3563',
          800: '#13294F',
          900: '#0F1E3E',
          950: '#0A1730',
          DEFAULT: '#0F1E3E',
        },
        // Soft sky/cyan — route lines, motion accents, decorative dots.
        // Deliberately distinct from electric so route/motion details read
        // as a different, lighter signal than primary CTAs.
        route: {
          50: '#EFFAFE',
          100: '#DCF3FD',
          200: '#B9E9FB',
          300: '#A8E6FB',
          400: '#5FD3F2',
          500: '#22B8E0',
          DEFAULT: '#5FD3F2',
        },
        // Restrained warm accent — small highlights only (a marker, a label
        // underline). Never used on a primary button, so it never competes
        // with the electric-blue CTA.
        amber: {
          50: '#FEF6EB',
          100: '#FDEACE',
          200: '#FBDCA8',
          300: '#FCD9A0',
          400: '#F5B85C',
          500: '#EE9A2E',
          600: '#C97914',
          DEFAULT: '#F5B85C',
        },
        // joblet.ai's real brand red — live-sampled from joblet.ai (primary
        // button/link color #962727, darker states #882222/#7A1F1F). Used
        // only where the page explicitly names or links to Joblet (the
        // "opens on Joblet" note, the footer's "Listings powered by
        // joblet.ai" credit) — never applied to Wheels2Wages' own primary
        // electric-blue CTAs or section surfaces.
        joblet: {
          50: '#FBF1EE',
          100: '#F5DDD6',
          200: '#E9B8AE',
          300: '#D98C82',
          400: '#B94A3F',
          500: '#962727',
          600: '#882222',
          700: '#7A1F1F',
          800: '#5C1717',
          900: '#3D0F0F',
          DEFAULT: '#962727',
        },
      },
      letterSpacing: {
        display: '-0.03em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,10,11,0.04), 0 6px 16px -8px rgba(10,10,11,0.08)',
        'card-lg': '0 4px 8px rgba(10,10,11,0.04), 0 20px 44px -16px rgba(10,10,11,0.14)',
        // Elevated panel — for surfaces that sit above a section transition
        // (the jobs panel overlapping the Hero, the search panel).
        panel: '0 2px 6px rgba(10,17,31,0.06), 0 28px 60px -24px rgba(10,17,31,0.22)',
        // Soft glow for primary CTAs — used by Button.tsx and StickyMobileCTA.tsx.
        glow: '0 10px 32px -8px rgba(37,99,235,0.45)',
        'glow-soft': '0 8px 24px -8px rgba(37,99,235,0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
