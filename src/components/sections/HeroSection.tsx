import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ImmersiveScene } from '@/components/3d/ImmersiveScene';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const [isReady, setIsReady] = useState(false);
  const { scrollProgress, scrollTo } = useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9, filter: 'blur(8px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8 },
        0.3
      );

      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        tl.fromTo(titleChars,
          { opacity: 0, y: 50, rotateX: -60, filter: 'blur(6px)' },
          { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.04, ease: 'expo.out' },
          0.5
        );
      }

      const subtitleChars = subtitleRef.current?.querySelectorAll('.char');
      if (subtitleChars) {
        tl.fromTo(subtitleChars,
          { opacity: 0, y: 30, rotateX: -45, filter: 'blur(4px)' },
          { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.03, ease: 'expo.out' },
          0.9
        );
      }

      tl.fromTo(descRef.current,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
        1.4
      );

      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        1.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReady]);

  useEffect(() => {
    if (contentRef.current) {
      const yOffset = scrollProgress * 150;
      const opacity = Math.max(0, 1 - scrollProgress * 2);
      const scale = 1 - scrollProgress * 0.1;
      const blur = scrollProgress * 8;
      
      contentRef.current.style.transform = `translateY(${yOffset}px) scale(${scale})`;
      contentRef.current.style.opacity = String(opacity);
      contentRef.current.style.filter = `blur(${blur}px)`;
    }
  }, [scrollProgress]);

  const handleScrollToServices = () => {
    scrollTo('#products', 1200);
  };

  const handleScrollToPlans = () => {
    scrollTo('#packs', 1200);
  };

  const titleText = "SIMPLEMENTE";
  const subtitleText = "WEB CON IA";
  
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'hsl(220, 25%, 4%)' }}
      aria-label="SIMPLEMENTE - Desarrollo Web con Inteligencia Artificial"
    >
      <div className="absolute inset-0 z-0">
        <ImmersiveScene scrollProgress={scrollProgress} />
      </div>

      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, transparent 0%, hsl(220, 25%, 4%) 100%),
            linear-gradient(180deg, hsl(220, 25%, 4%, 0.3) 0%, transparent 30%, transparent 70%, hsl(220, 25%, 4%, 0.6) 100%)
          `
        }}
      />

      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220, 25%, 4%, 0.7) 100%)'
        }}
      />

      <div 
        ref={contentRef}
        className="relative z-20 container mx-auto px-4 text-center will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={badgeRef} className="mb-8 opacity-0">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary/90 text-xs font-display tracking-[0.2em] uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Desarrollo Web Potenciado por IA
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold mb-4 perspective-immersive"
          style={{ lineHeight: '0.9' }}
        >
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="char inline-block preserve-3d"
              style={{ 
                color: 'hsl(var(--foreground))',
                textShadow: '0 0 60px hsla(165, 80%, 45%, 0.3)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        
        <h2 
          ref={subtitleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-8 perspective-immersive"
        >
          {subtitleText.split('').map((char, i) => (
            <span
              key={i}
              className="char inline-block preserve-3d"
              style={{ 
                color: 'hsl(var(--secondary))',
                textShadow: '0 0 40px hsla(45, 85%, 55%, 0.4)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <p
          ref={descRef}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body opacity-0 leading-relaxed"
        >
          Creamos experiencias web extraordinarias.
          <span className="text-primary/90 font-medium"> Diseño, desarrollo y lanzamiento</span>
          . Potenciado por inteligencia artificial.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
          <Button
            variant="hero"
            size="xl"
            onClick={handleScrollToPlans}
            className="btn-cinematic animate-glow-breathe"
            aria-label="Ver nuestros planes"
          >
            Ver Planes
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={handleScrollToServices}
            className="btn-cinematic"
            aria-label="Explorar servicios"
          >
            Explorar Servicios
          </Button>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 5),
          transform: `translateX(-50%) translateY(${scrollProgress * 50}px)`
        }}
      >
        <button 
          onClick={handleScrollToServices}
          className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary/80 transition-colors duration-medium"
          aria-label="Scroll para explorar"
        >
          <span className="text-xs font-display tracking-widest uppercase">Explorar</span>
          <ChevronDown className="w-5 h-5 animate-float-cinematic" />
        </button>
      </div>
    </section>
  );
}
