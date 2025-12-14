import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { PacksSection } from '@/components/sections/PacksSection';
import { EventSection } from '@/components/sections/EventSection';
import { SubscribeSection } from '@/components/sections/SubscribeSection';
import { Footer } from '@/components/sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scrolling setup
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <ProductsSection />
      <PacksSection />
      <EventSection />
      <SubscribeSection />
      <Footer />
    </main>
  );
};

export default Index;
