import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
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
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Wheels2Wages' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wheels2Wages: Find Driver & Delivery Jobs Near You',
    description:
      'Driving, delivery, courier, CDL, and gig opportunities across the US. Free for applicants.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
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
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
