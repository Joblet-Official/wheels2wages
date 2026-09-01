import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { SITE } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Wheels2Wages: Find Driver & Delivery Jobs Near You',
    template: '%s · Wheels2Wages',
  },
  description:
    'Explore driving, delivery, courier, CDL, and gig opportunities across major US cities. Apply in minutes. No fees, no commissions.',
  keywords: [
    'driver jobs', 'delivery jobs', 'CDL jobs', 'courier jobs', 'gig work',
    'driving jobs near me', 'delivery driver jobs', 'truck driver jobs',
    'rideshare jobs', 'last-mile delivery',
  ],
  authors: [{ name: 'Wheels2Wages' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Wheels2Wages: Find Driver & Delivery Jobs Near You',
    description:
      'Explore driving, delivery, courier, CDL, and gig opportunities across major US cities. Apply in minutes. No fees, no commissions.',
    // Image itself is supplied by app/opengraph-image.png (Next.js file
    // convention — auto-detected, no manual `images` entry needed here;
    // adding one would emit a duplicate, conflicting og:image tag).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wheels2Wages: Find Driver & Delivery Jobs Near You',
    description:
      'Driving, delivery, courier, CDL, and gig opportunities across the US. Free for applicants.',
    // Same image, supplied by app/opengraph-image.png.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    // The file-convention app/apple-icon.png (auto-detected, no manual
    // entry needed) works for opengraph-image but this Next.js version
    // doesn't auto-inject the apple-touch-icon link tag for it — verified
    // in the rendered <head>. Declaring it explicitly here is the
    // guaranteed-correct fallback; it's the same real PNG file either way.
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-white text-ink-900 antialiased">
        <MotionConfig reducedMotion="user">
          <StructuredData />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
