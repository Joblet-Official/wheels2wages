import { CITIES, buildJobsUrl } from '@/lib/constants';

export function TrustBar() {
  // Duplicate the list so the marquee loops seamlessly
  const items = [...CITIES, ...CITIES];

  return (
    <section
      aria-label="Hiring in major US cities"
      className="py-10 sm:py-12 border-y border-ink-100 bg-white overflow-hidden"
    >
      <p className="text-center text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-ink-800 mb-7">
        Now hiring in major <span className="text-electric-700">US</span> cities
      </p>
      <div className="mask-fade-x">
        <div className="flex w-max items-center gap-12 sm:gap-16 animate-marquee">
          {items.map((city, i) => (
            <a
              key={`${city}-${i}`}
              href={buildJobsUrl({ location: city })}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`marquee_city_${city.toLowerCase().replace(/[^a-z]/g, '_')}`}
              className="text-xl sm:text-2xl font-extrabold tracking-tight text-ink-300 hover:text-electric-600 transition whitespace-nowrap select-none"
            >
              {city}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
