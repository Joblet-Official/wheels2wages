import { ArrowRight } from 'lucide-react';
import { JOBS_URL } from '@/lib/constants';

export function StickyMobileCTA() {
  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 p-3 bg-gradient-to-t from-white via-white/95 to-white/0 pointer-events-none"
      aria-hidden={false}
    >
      <a
        href={JOBS_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="mobile_sticky_find_jobs"
        className="pointer-events-auto flex h-14 w-full items-center justify-center gap-2 rounded-full bg-electric-700 text-white font-semibold shadow-glow active:bg-electric-800 transition"
      >
        Find Jobs Near You
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
