import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Scene3D } from '@/components/3d/Scene3D';
import { ChevronDown, Award } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - letter by letter
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(titleChars,
          { opacity: 0, y: 50, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            delay: 0.5,
            onComplete: () => setTitleVisible(true)
          }
        );
      }

      // Subtitle fade in
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
      );

      // CTA button animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 2, ease: 'elastic.out(1, 0.5)' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPacks = () => {
    document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleText = "SEÑALÉTICA";
  const subtitleText = "PREMIUM";
  
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
      aria-label="Señalética Premium para Comercios"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D variant="hero" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-display tracking-wider animate-fade-in">
            <Award className="w-4 h-4" />
            IMAGEN PROFESIONAL PARA TU NEGOCIO
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-2 perspective-1000"
        >
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="char inline-block preserve-3d"
              style={{ 
                color: 'hsl(var(--foreground))',
                textShadow: titleVisible ? '0 0 40px hsla(159, 100%, 45%, 0.5)' : 'none'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
          {subtitleText.split('').map((char, i) => (
            <span
              key={i}
              className="char inline-block preserve-3d"
              style={{ 
                color: 'hsl(var(--secondary))',
                textShadow: titleVisible ? '0 0 30px hsla(51, 100%, 50%, 0.5)' : 'none',
                animationDelay: `${1.2 + i * 0.05}s`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 font-body opacity-0"
        >
          Cartelería personalizada para comercios que quieren verse <span className="text-primary font-semibold">prolijos y profesionales</span>. Placas de horarios, señales interiores, QR premium y más.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
          <Button
            variant="hero"
            size="xl"
            onClick={scrollToPacks}
            className="animate-glow-pulse"
            aria-label="Ver nuestros packs comerciales"
          >
            Ver Packs Comerciales
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={scrollToProducts}
            aria-label="Ver catálogo de productos"
          >
            Ver Catálogo
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <ChevronDown className="w-8 h-8 text-primary" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
