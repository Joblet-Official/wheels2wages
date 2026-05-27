import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { JobCategories } from '@/components/JobCategories';
import { HowItWorks } from '@/components/HowItWorks';
import { About } from '@/components/About';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <JobCategories />
      <HowItWorks />
      <About />
      <FAQ />
      <Contact />
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
