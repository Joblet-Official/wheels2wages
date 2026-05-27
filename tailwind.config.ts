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
        electric: {
          50: '#EFF4FF',
          100: '#DBE6FF',
          200: '#BCD0FF',
          300: '#8AB0FF',
          400: '#5786FF',
          500: '#2E61F0',
          600: '#2563EB', // primary
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          DEFAULT: '#2563EB',
        },
      },
      letterSpacing: {
        display: '-0.04em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,10,11,0.04), 0 8px 24px -8px rgba(10,10,11,0.08)',
        'card-lg': '0 4px 8px rgba(10,10,11,0.04), 0 24px 56px -16px rgba(10,10,11,0.16)',
        glow: '0 10px 32px -8px rgba(37,99,235,0.45)',
        'glow-soft': '0 8px 24px -8px rgba(37,99,235,0.25)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(37,99,235,0.06), transparent 70%), radial-gradient(circle at 1px 1px, rgba(10,10,11,0.08) 1px, transparent 0)',
        'hero-glow':
          'radial-gradient(ellipse at top, rgba(37,99,235,0.10), transparent 60%)',
      },
      backgroundSize: {
        grid: '24px 24px',
      },
      keyframes: {
        floatSlow: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        floatFast: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        spinSlow: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-fast': 'floatFast 4.5s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
