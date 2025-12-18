import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImmersiveScrollProvider } from '@/contexts/ImmersiveScrollContext';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { PacksSection } from '@/components/sections/PacksSection';
import QuoteFormSection from '@/components/sections/QuoteFormSection';
import { EventSection } from '@/components/sections/EventSection';
import { SubscribeSection } from '@/components/sections/SubscribeSection';
import { Footer } from '@/components/sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // ScrollTrigger configuration for immersive experience
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true
    });

    // Smooth defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse'
    });

    // Refresh on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <ImmersiveScrollProvider sectionCount={7}>
      <main 
        className="min-h-screen bg-background overflow-x-hidden"
        style={{ 
          perspective: '1500px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        <HeroSection />
        <ProductsSection />
        <PacksSection />
        <QuoteFormSection />
        <EventSection />
        <SubscribeSection />
        <Footer />
      </main>
    </ImmersiveScrollProvider>
  );
};

export default Index;
