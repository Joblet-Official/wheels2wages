import { Mail, ArrowUpRight } from 'lucide-react';
import { Container } from './Section';
import { SITE } from '@/lib/constants';

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <Container size="narrow">
        <div className="rounded-3xl bg-white border border-ink-100 p-8 sm:p-12 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-50 text-electric-700">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-display text-ink-900">
            Contact us
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink-500 max-w-md mx-auto">
            For questions or support, send us a note. We typically respond within one business day.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            data-cta="contact_email"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-5 sm:px-6 py-3 sm:py-3.5 text-[15px] font-semibold hover:bg-ink-800 transition focus-ring"
          >
            {SITE.email}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
