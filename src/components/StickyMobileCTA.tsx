import { ArrowRight } from 'lucide-react';
import { BROWSE_JOBS_URL } from '@/lib/constants';

// Below `lg` this renders as a normal, in-flow block (mounted inside
// WheelsHomeStory, right after the process/location content) rather than a
// viewport-fixed overlay — a fixed bar at this position was covering
// location rows, FAQ content, and the Footer. Same label, destination, and
// tracking attribute as before; only the positioning model changed.
// Desktop already never showed this (hidden ≥768px), so that's unchanged.
export function FindJobsCta() {
  return (
    <div className="w2w-inline-cta">
      <a
        href={BROWSE_JOBS_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="mobile_sticky_find_jobs"
      >
        Find Jobs Near You
        <ArrowRight aria-hidden />
      </a>
    </div>
  );
}
