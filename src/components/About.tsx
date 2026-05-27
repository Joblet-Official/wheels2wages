'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import { Container, SectionHeader } from './Section';

const offers = [
  'Access to driver and delivery opportunities across the US',
  'Flexible work options across rideshare, delivery, courier, and CDL platforms',
  'Simple application and onboarding support, end-to-end',
  'Fast, mobile-friendly signup experience that works on any device',
];

export function About() {
  const offersRef = useRef<HTMLUListElement>(null);

  // Track scroll progress through the offers list area
  const { scrollYProgress } = useScroll({
    target: offersRef,
    offset: ['start 80%', 'end 60%'],
  });

  return (
    <section id="about" className="py-20 sm:py-24 bg-ink-50/60 border-y border-ink-100 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            title={<>Turn every mile into money</>}
            description="At Wheels2Wages, we help connect drivers and delivery partners with flexible earning opportunities across the United States. Full-time, part-time, or a side hustle."
          />
        </motion.div>

        {/* Image banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden rounded-3xl bg-ink-100 shadow-card border border-ink-100"
        >
          {/* Driver photo at /public/about-driver.jpg */}
          <img
            src="/about-driver.jpg"
            alt="Smiling delivery driver loading a package into a van"
            className="w-full h-auto aspect-[2/1] object-cover object-[center_30%]"
            loading="lazy"
          />
        </motion.div>

        {/* What we offer — full width, scroll-driven tick highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-3xl bg-white border border-ink-100 p-8 sm:p-10 lg:p-12 shadow-card"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
              What we offer
            </h3>
            <span className="text-xs font-semibold uppercase tracking-wider text-electric-700 bg-electric-50 px-3 py-1 rounded-full">
              For drivers
            </span>
          </div>

          <ul ref={offersRef} className="mt-8 space-y-5 sm:space-y-6">
            {offers.map((text, i) => {
              const start = i / offers.length;
              const end = (i + 0.6) / offers.length;
              return (
                <AnimatedOffer
                  key={text}
                  text={text}
                  index={i}
                  start={start}
                  end={end}
                  scrollProgress={scrollYProgress}
                />
              );
            })}
          </ul>
        </motion.div>

        {/* No hidden charges — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          whileHover={{ y: -3 }}
          className="mt-6 rounded-3xl bg-ink-900 text-white p-8 sm:p-10 lg:p-12 shadow-card-lg relative overflow-hidden"
        >
          <motion.div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric-700/40 blur-3xl"
            aria-hidden
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                No fees. No commissions.
              </h3>
              <p className="mt-2.5 text-[15px] sm:text-base leading-relaxed text-white/70 max-w-2xl">
                Wheels2Wages never charges applicants registration fees or commissions. Applying is free, and drivers keep <span className="font-semibold text-white">100% of the earnings</span> and incentives from the platform they join.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function AnimatedOffer({
  text,
  index,
  start,
  end,
  scrollProgress,
}: {
  text: string;
  index: number;
  start: number;
  end: number;
  scrollProgress: MotionValue<number>;
}) {
  // As user scrolls, tick fills from neutral to electric; text brightens
  const tickBg = useTransform(scrollProgress, [start, end], ['#EEEEF1', '#1D4ED8']);
  const tickColor = useTransform(scrollProgress, [start, end], ['#B7B9C3', '#FFFFFF']);
  const tickScale = useTransform(scrollProgress, [start, end], [0.92, 1]);
  const textOpacity = useTransform(scrollProgress, [start, end], [0.55, 1]);
  const indexColor = useTransform(scrollProgress, [start, end], ['#B7B9C3', '#1D4ED8']);

  return (
    <li className="flex items-start gap-4 sm:gap-5">
      <motion.span
        style={{ color: indexColor }}
        className="hidden sm:inline-block font-mono text-xs font-semibold mt-2 w-6 shrink-0"
      >
        0{index + 1}
      </motion.span>
      <motion.span
        style={{ backgroundColor: tickBg, color: tickColor, scale: tickScale }}
        className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </motion.span>
      <motion.span
        style={{ opacity: textOpacity }}
        className="text-base sm:text-lg text-ink-800 leading-relaxed"
      >
        {text}
      </motion.span>
    </li>
  );
}
