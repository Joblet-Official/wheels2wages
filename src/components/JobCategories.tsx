import { ArrowUpRight, Car, Package, Truck, Bike, Sparkles } from 'lucide-react';
import { Container, SectionHeader } from './Section';
import { buildJobsUrl } from '@/lib/constants';

const categories = [
  {
    icon: Car,
    title: 'Driver Jobs',
    desc: 'Rideshare and on-demand driving across major US cities.',
    param: 'driver',
  },
  {
    icon: Package,
    title: 'Delivery Jobs',
    desc: 'Food, retail, and same-day delivery work with flexible hours.',
    param: 'delivery',
  },
  {
    icon: Truck,
    title: 'CDL Truck Driver Jobs',
    desc: 'Class A and B routes with established carrier partners.',
    param: 'cdl',
  },
  {
    icon: Bike,
    title: 'Courier Opportunities',
    desc: 'Last-mile courier roles. Bike, car, or van.',
    param: 'courier',
  },
  {
    icon: Sparkles,
    title: 'Gig Work',
    desc: 'Side income that fits around an existing schedule.',
    param: 'gig',
  },
];

export function JobCategories() {
  return (
    <section id="categories" className="py-20 sm:py-24">
      <Container size="wide">
        <SectionHeader
          title={<>What kind of work fits you?</>}
          description="Pick a category to jump straight into live listings."
        />

        {/* flex-wrap + justify-center lets the orphan row center naturally */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-5">
          {categories.map((c) => (
            <a
              key={c.title}
              href={buildJobsUrl({ category: c.param })}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`category_${c.param}`}
              className="group relative flex flex-col rounded-3xl p-6 sm:p-7 bg-white border border-ink-100 hover:border-electric-300 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.834rem)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-50 text-electric-700">
                  <c.icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-ink-400 group-hover:text-electric-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-900">
                {c.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                {c.desc}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
