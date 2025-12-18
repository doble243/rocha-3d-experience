import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Package, Rocket, Crown, CheckCircle, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const packs = [
  {
    id: 1,
    name: 'Pack Starter',
    subtitle: 'Para comercios nuevos',
    price: 'Consultar',
    icon: Package,
    color: 'primary',
    ideal: 'Almacenes, peluquerías, kioscos',
    includes: [
      'Placa de horarios estándar',
      '1 QR (WiFi o menú)',
      '3 carteles interiores básicos'
    ],
    featured: false
  },
  {
    id: 2,
    name: 'Pack Pro',
    subtitle: 'El más elegido',
    price: 'Consultar',
    icon: Rocket,
    color: 'secondary',
    ideal: 'Bares, cafés, tiendas',
    includes: [
      'Placa de horarios premium',
      'QR menú + QR Instagram',
      '6 carteles interiores',
      '1 cartel "Reservado"'
    ],
    featured: true
  },
  {
    id: 3,
    name: 'Pack Full Imagen',
    subtitle: 'Experiencia completa',
    price: 'Consultar',
    icon: Crown,
    color: 'primary',
    ideal: 'Locales que se renuevan',
    includes: [
      'Todo lo del Pack Pro',
      'Material premium exclusivo',
      'Diseño personalizado',
      'Instalación simple incluida',
      'Garantía extendida'
    ],
    featured: false
  }
];

export function PacksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          filter: 'blur(4px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );

      // Cards stagger with spatial depth
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const isFeatured = packs[index].featured;
        const zOffset = isFeatured ? 20 : 0;
        
        // Entry from depth
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            z: -80,
            scale: 0.88,
            rotateX: -12,
            filter: 'blur(8px)'
          },
          {
            opacity: 1,
            y: isFeatured ? -20 : 0,
            z: zOffset,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 55%',
              scrub: 0.6
            }
          }
        );

        // Featured card floating
        if (isFeatured) {
          gsap.to(card, {
            y: -30,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }

        // List items reveal
        const items = card.querySelectorAll('.pack-item');
        gsap.fromTo(items,
          { 
            opacity: 0, 
            x: -15,
            filter: 'blur(2px)'
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContact = () => {
    window.open('https://wa.me/598XXXXXXXX?text=Hola!%20Me%20interesa%20consultar%20por%20impresión%20UV', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="packs"
      className="relative py-32 md:py-40 overflow-hidden"
      aria-labelledby="packs-heading"
      style={{ 
        background: 'linear-gradient(180deg, hsl(220, 25%, 4%) 0%, hsl(220, 20%, 5%) 50%, hsl(220, 25%, 4%) 100%)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary/90 text-xs font-display tracking-[0.2em] uppercase mb-6">
            <Star className="w-3.5 h-3.5" />
            PACKS SEÑALÉTICA
          </span>
          <h2
            id="packs-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            Packs <span className="text-gradient-secondary">Comerciales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Soluciones completas listas para vender. Mayor ticket, menos vueltas.
          </p>
        </div>

        {/* Cards */}
        <div 
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          style={{ perspective: '1500px' }}
        >
          {packs.map((pack, index) => (
            <div
              key={pack.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="relative preserve-3d"
            >
              {/* Featured badge */}
              {pack.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-display tracking-wider flex items-center gap-1.5">
                  <Star className="w-3 h-3" />
                  MÁS ELEGIDO
                </div>
              )}

              <div 
                className="relative h-full p-8 rounded-2xl flex flex-col transition-all duration-slow ease-out-expo"
                style={{
                  background: pack.featured 
                    ? 'linear-gradient(135deg, hsla(45, 85%, 55%, 0.08) 0%, hsla(220, 20%, 100%, 0.02) 100%)'
                    : 'linear-gradient(135deg, hsla(220, 20%, 100%, 0.03) 0%, hsla(220, 20%, 100%, 0.01) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: pack.featured 
                    ? '1px solid hsla(45, 85%, 55%, 0.25)'
                    : '1px solid hsla(220, 15%, 20%, 0.4)',
                  boxShadow: pack.featured
                    ? '0 0 60px hsla(45, 85%, 55%, 0.12), 0 25px 50px -12px hsla(0, 0%, 0%, 0.4)'
                    : '0 25px 50px -12px hsla(0, 0%, 0%, 0.3)'
                }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  pack.color === 'primary' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary/10 text-secondary'
                }`}>
                  <pack.icon className="w-7 h-7" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold mb-1 text-foreground">{pack.name}</h3>
                <p className={`text-sm font-display mb-5 ${
                  pack.color === 'primary' ? 'text-primary/80' : 'text-secondary/80'
                }`}>
                  {pack.subtitle}
                </p>

                {/* Ideal for */}
                <p className="text-muted-foreground text-sm font-body mb-6 pb-5 border-b border-border/20">
                  Ideal: <span className="text-foreground/70">{pack.ideal}</span>
                </p>

                {/* Includes */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {pack.includes.map((item, i) => (
                    <li key={i} className="pack-item flex items-start gap-3 text-sm font-body">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        pack.color === 'primary' ? 'text-primary/70' : 'text-secondary/70'
                      }`} />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={pack.featured ? 'hero' : 'glass'}
                  size="lg"
                  className="w-full group btn-cinematic"
                  onClick={handleContact}
                >
                  Consultar Precio
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-fast ease-out-expo" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground/70 font-body text-sm">
            Todos los packs incluyen <span className="text-foreground/60">impresión UV de alta definición</span> | by World Case UY
          </p>
        </div>
      </div>
    </section>
  );
}
