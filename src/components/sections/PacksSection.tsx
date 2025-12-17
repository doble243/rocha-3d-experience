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
    gradient: 'from-primary/20 to-primary/5',
    borderGlow: 'hover:shadow-[0_0_40px_hsla(159,100%,45%,0.3)]',
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
    gradient: 'from-secondary/30 to-secondary/10',
    borderGlow: 'hover:shadow-[0_0_60px_hsla(51,100%,50%,0.4)]',
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
    gradient: 'from-primary/20 via-secondary/10 to-primary/5',
    borderGlow: 'hover:shadow-[0_0_50px_hsla(159,100%,45%,0.35)]',
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
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.packs-title',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.packs-title',
            start: 'top 80%',
          }
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 80,
            scale: 0.85,
            rotateX: -20
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: index * 0.15
          }
        );

        // Floating animation for featured card
        if (packs[index].featured) {
          gsap.to(card, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
          });
        }

        // Animate list items
        const items = card.querySelectorAll('.pack-item');
        gsap.fromTo(items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
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
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="packs-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-display tracking-wider mb-4">
            <Star className="w-4 h-4" />
            PACKS SEÑALÉTICA
          </span>
          <h2
            id="packs-heading"
            className="packs-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Packs <span className="text-gradient-secondary">Comerciales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Soluciones completas listas para vender. Mayor ticket, menos vueltas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {packs.map((pack, index) => (
            <div
              key={pack.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className={`relative preserve-3d ${pack.featured ? 'md:-mt-8 md:mb-8' : ''}`}
            >
              {/* Featured badge */}
              {pack.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-display tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  MÁS ELEGIDO
                </div>
              )}

              <div className={`glass-card p-8 h-full flex flex-col transition-all duration-500 border-2 ${
                pack.featured 
                  ? 'border-secondary/50 shadow-[0_0_40px_hsla(51,100%,50%,0.2)]' 
                  : 'border-border/30'
              } ${pack.borderGlow}`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pack.gradient} rounded-2xl opacity-50`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    pack.color === 'primary' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-secondary/20 text-secondary'
                  }`}>
                    <pack.icon className="w-8 h-8" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-display font-bold mb-1">{pack.name}</h3>
                  <p className={`text-sm font-display mb-4 ${
                    pack.color === 'primary' ? 'text-primary' : 'text-secondary'
                  }`}>
                    {pack.subtitle}
                  </p>

                  {/* Ideal for */}
                  <p className="text-muted-foreground text-sm font-body mb-6 pb-4 border-b border-border/30">
                    Ideal: <span className="text-foreground/80">{pack.ideal}</span>
                  </p>

                  {/* Includes */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pack.includes.map((item, i) => (
                      <li key={i} className="pack-item flex items-start gap-3 text-sm font-body">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          pack.color === 'primary' ? 'text-primary' : 'text-secondary'
                        }`} />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={pack.featured ? 'hero' : 'glass'}
                    size="lg"
                    className="w-full group"
                    onClick={handleContact}
                  >
                    Consultar Precio
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground font-body text-sm">
            Todos los packs incluyen <span className="text-foreground/80">impresión UV de alta definición</span> | by World Case UY
          </p>
        </div>
      </div>
    </section>
  );
}
