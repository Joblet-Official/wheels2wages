import { HeroRedesign as Hero } from '@/components/HeroRedesign';
import { WheelsHomeStory } from '@/components/WheelsHomeStory';

export default function Home() {
  return (
    <>
      <Hero />
      <WheelsHomeStory />
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
