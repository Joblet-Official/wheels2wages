import { Search, FileCheck2, DollarSign } from 'lucide-react';
import { Container, SectionHeader } from './Section';

const steps = [
  {
    icon: Search,
    title: 'Browse Jobs',
    desc: 'Filter by city, schedule, and vehicle type to find what fits.',
  },
  {
    icon: FileCheck2,
    title: 'Apply Online',
    desc: 'Quick application. No fees, no commissions, ever.',
  },
  {
    icon: DollarSign,
    title: 'Start Earning',
    desc: 'Get onboarded with the platform and start driving on your schedule.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-24">
      <Container size="wide">
        <SectionHeader
          title={<>Three steps to earning</>}
          description="No middlemen, no friction. Find a role, apply, and start."
        />

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-3xl bg-white border border-ink-100 p-6 sm:p-7 hover:shadow-card hover:border-electric-200 transition-all duration-200"
            >
              <span className="absolute right-5 top-5 text-[11px] font-mono font-semibold text-ink-300">
                0{i + 1}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-50 text-electric-700">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
