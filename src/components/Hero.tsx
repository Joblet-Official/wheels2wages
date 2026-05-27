import { ArrowRight, Car, Package, Truck, Sparkles, MapPin, BadgeCheck } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Section';
import { JOBS_URL, buildJobsUrl } from '@/lib/constants';

const intentPills = [
  { label: 'Driver Jobs', icon: Car, url: buildJobsUrl({ category: 'driver' }) },
  { label: 'Delivery Jobs', icon: Package, url: buildJobsUrl({ category: 'delivery' }) },
  { label: 'CDL Jobs', icon: Truck, url: buildJobsUrl({ category: 'cdl' }) },
  { label: 'Gig Work', icon: Sparkles, url: buildJobsUrl({ category: 'gig' }) },
];

const trustChips = [
  'Quick applications',
  'Multiple cities hiring',
  'No signup fees or commissions',
];

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 -z-10 bg-hero-glow" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-grid-fade opacity-60" aria-hidden />

      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <h1 className="text-[40px] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-display text-ink-900">
              Find Driver &amp; Delivery <br className="hidden sm:block" />
              <span className="underline-accent">Jobs Near You</span>
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-ink-500 leading-relaxed">
              Explore driving, delivery, courier, and CDL opportunities across major US cities. Apply in minutes, completely free.
            </p>

            {/* Primary CTA + intent pills */}
            <div className="mt-7 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  href={JOBS_URL}
                  external
                  size="lg"
                  withArrow
                  data-cta="hero_primary_find_jobs"
                >
                  Find Jobs
                </Button>
                <a
                  href="#categories"
                  className="text-sm font-semibold text-ink-700 hover:text-ink-900 inline-flex items-center gap-1.5"
                >
                  Browse categories
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Intent pills */}
              <div className="flex flex-wrap gap-2">
                {intentPills.map((pill) => (
                  <a
                    key={pill.label}
                    href={pill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`hero_pill_${pill.label.toLowerCase().replace(/\s+/g, '_')}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:border-electric-300 hover:bg-electric-50 hover:text-electric-700 transition"
                  >
                    <pill.icon className="h-4 w-4 text-ink-500 group-hover:text-electric-700 transition" />
                    {pill.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Trust row */}
            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustChips.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-ink-600">
                  <BadgeCheck className="h-4 w-4 text-electric-700 shrink-0" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: floating job-card showcase */}
          <div className="lg:col-span-5">
            <HeroShowcase />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroShowcase() {
  return (
    <div className="relative mx-auto h-[440px] sm:h-[480px] w-full max-w-md">
      {/* Backdrop circle */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[360px] w-[360px] rounded-full bg-gradient-to-br from-electric-50 to-white shadow-card-lg" />
      </div>

      {/* Card 1: top-left */}
      <div className="absolute left-0 top-4 w-[240px] rounded-2xl bg-white p-4 shadow-card animate-float-slow">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-50 text-electric-700">
            <Truck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink-900 truncate">CDL Truck Driver</p>
            <p className="text-[11px] text-ink-500 truncate">Houston, TX</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] font-medium text-ink-500">On-site</span>
          <span className="rounded-full bg-electric-700 px-2.5 py-1 text-[11px] font-semibold text-white">Apply now</span>
        </div>
      </div>

      {/* Card 2: center, featured */}
      <div className="absolute left-1/2 top-32 -translate-x-1/2 w-[270px] rounded-2xl bg-ink-900 p-5 text-white shadow-card-lg">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">Featured</span>
          <span className="text-[11px] text-white/60">2 min apply</span>
        </div>
        <p className="mt-3 text-[15px] font-semibold leading-tight">Driver &amp; Delivery Jobs</p>
        <p className="text-[12px] text-white/60 mt-0.5">Atlanta, GA · Wheels2Wages</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] text-white/60">Flexible hours</span>
          <span className="rounded-full bg-electric-500 px-3 py-1.5 text-[11px] font-semibold">Find Jobs →</span>
        </div>
      </div>

      {/* Card 3: bottom-right */}
      <div className="absolute right-0 bottom-8 w-[220px] rounded-2xl bg-white p-4 shadow-card animate-float-fast">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-50 text-electric-700">
            <Package className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink-900 truncate">Delivery Jobs</p>
            <p className="text-[11px] text-ink-500 truncate">San Diego, CA</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-500">
          <MapPin className="h-3 w-3" />
          10+ openings
        </div>
      </div>

      {/* Tiny stat chip */}
      <div className="absolute right-4 top-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink-800 shadow-card">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Live listings
      </div>
    </div>
  );
}
