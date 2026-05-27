import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Wheels2Wages home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      {/* Wheel mark */}
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <WheelIcon className="h-9 w-9 text-electric-600 transition-transform duration-700 group-hover:rotate-180" />
      </span>
      {/* Wordmark */}
      <span className="text-[19px] font-extrabold tracking-tight text-ink-900 leading-none">
        Wheels<span className="text-electric-600">2</span>Wages
      </span>
    </Link>
  );
}

function WheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Outer tire */}
      <circle cx="18" cy="18" r="15.5" stroke="currentColor" strokeWidth="2.5" />
      {/* Inner hub */}
      <circle cx="18" cy="18" r="3" fill="currentColor" />
      {/* Spokes */}
      <line x1="18" y1="3.5" x2="18" y2="32.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3.5" y1="18" x2="32.5" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="7.75" y1="7.75" x2="28.25" y2="28.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="28.25" y1="7.75" x2="7.75" y2="28.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
