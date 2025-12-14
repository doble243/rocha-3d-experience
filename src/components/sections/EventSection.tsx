import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, MapPin, Store, MessageCircle, PartyPopper, Beer, Waves, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const pastEvents = [
  { name: 'Semana de Rocha', icon: Waves },
  { name: 'Colonia Valdense', icon: PartyPopper },
  { name: 'Feria de Rosario', icon: ShoppingBag },
  { name: 'Bierfest Young', icon: Beer },
];

const highlights = [
  {
    icon: Waves,
    badge: '¡TEMPORADA 2025!',
    title: 'Atlántida',
    subtitle: 'Hasta Febrero',
    description: 'Encontranos en la costa atlántica toda la temporada. Fundas exclusivas de verano, diseños playeros y las mejores ofertas.',
    features: ['Diseños exclusivos de verano', 'Ofertas especiales', 'Atención personalizada'],
    color: 'primary',
    gradient: 'from-primary/30 via-primary/10 to-transparent',
    glow: 'shadow-[0_0_60px_hsla(159,100%,45%,0.4)]'
  },
  {
    icon: Store,
    badge: 'LOCAL FÍSICO',
    title: 'Agraciada',
    subtitle: 'Montevideo',
    description: 'Visitá nuestro local en Avenida Agraciada. Probá las fundas, elegí tu diseño favorito y llevátelo al instante.',
    features: ['Probá antes de comprar', 'Stock completo', 'Personalización en el momento'],
    color: 'secondary',
    gradient: 'from-secondary/30 via-secondary/10 to-transparent',
    glow: 'shadow-[0_0_60px_hsla(51,100%,50%,0.4)]'
  },
  {
    icon: MessageCircle,
    badge: 'COMPRÁ FÁCIL',
    title: 'Asistente de Compra',
    subtitle: 'WhatsApp 24/7',
    description: '¿No podés acercarte? ¡Te llevamos la funda a tu casa! Escribinos por WhatsApp y te asesoramos para elegir la mejor opción.',
    features: ['Envíos a todo el país', 'Asesoramiento personalizado', 'Pagos seguros'],
    color: 'primary',
    gradient: 'from-primary/30 via-primary/10 to-transparent',
    glow: 'shadow-[0_0_60px_hsla(159,100%,45%,0.4)]',
    cta: true
  }
];

export function EventSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate past events badges with stagger
      const badges = sectionRef.current?.querySelectorAll('.past-event-badge');
      gsap.fromTo(badges,
        { opacity: 0, scale: 0, rotation: -15 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: badges?.[0],
            start: 'top 85%',
          }
        }
      );

      // Animate each highlight card with dramatic entrance
      const cards = cardsRef.current?.querySelectorAll('.highlight-card');
      cards?.forEach((card, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: direction,
            scale: 0.8,
            rotationY: direction > 0 ? 15 : -15
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: false,
            }
          }
        );

        // Animate features list
        const features = card.querySelectorAll('.feature-item');
        gsap.fromTo(features,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 60%',
            }
          }
        );

        // Floating icon animation
        const icon = card.querySelector('.floating-icon');
        gsap.to(icon, {
          y: -15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });

        // Glowing pulse animation
        const glow = card.querySelector('.glow-ring');
        gsap.to(glow, {
          scale: 1.2,
          opacity: 0.3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      });

      // Parallax effect on scroll
      gsap.to('.parallax-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="events-heading"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="parallax-bg absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-display tracking-wider mb-4">
            <MapPin className="inline w-4 h-4 mr-2" aria-hidden="true" />
            EN TODO URUGUAY
          </span>
          <h2
            id="events-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Donde <span className="text-gradient-secondary">Encontrarnos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Recorremos las mejores ferias y festivales. ¡Siempre cerca tuyo!
          </p>
        </div>

        {/* Past Events Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          <span className="text-muted-foreground font-body text-sm mr-2 self-center">Ya estuvimos en:</span>
          {pastEvents.map((event, index) => (
            <div
              key={index}
              className="past-event-badge flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50 text-foreground/80 text-sm font-display hover:bg-muted/50 hover:scale-105 transition-all duration-300 cursor-default"
            >
              <event.icon className="w-4 h-4 text-secondary" aria-hidden="true" />
              {event.name}
            </div>
          ))}
        </div>

        {/* Highlight Cards */}
        <div ref={cardsRef} className="space-y-16 md:space-y-24 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`highlight-card relative ${index % 2 === 1 ? 'md:ml-auto' : ''} max-w-2xl`}
              style={{ perspective: '1000px' }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-50`} />
              
              {/* Card content */}
              <div className={`relative glass-card rounded-3xl p-8 md:p-10 border-2 ${
                item.color === 'primary' ? 'border-primary/30 hover:border-primary/50' : 'border-secondary/30 hover:border-secondary/50'
              } transition-all duration-500 ${item.glow}`}>
                
                {/* Badge */}
                <div className={`absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-display tracking-wider ${
                  item.color === 'primary' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {item.badge}
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Icon Section */}
                  <div className="relative flex-shrink-0">
                    <div className={`glow-ring absolute inset-0 rounded-full ${
                      item.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'
                    }`} />
                    <div className={`floating-icon relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center ${
                      item.color === 'primary' 
                        ? 'bg-primary/20 border-2 border-primary text-primary' 
                        : 'bg-secondary/20 border-2 border-secondary text-secondary'
                    }`}>
                      <item.icon className="w-12 h-12 md:w-14 md:h-14" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className={`text-sm font-display tracking-wider ${
                        item.color === 'primary' ? 'text-primary' : 'text-secondary'
                      }`}>
                        {item.subtitle}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-display font-bold mt-1">
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground font-body text-lg mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {item.features.map((feature, fIndex) => (
                        <li key={fIndex} className="feature-item flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            item.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                          }`} />
                          <span className="text-foreground/80 font-body">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA for Assistant */}
                    {item.cta && (
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="group mt-4"
                        onClick={() => window.open('https://wa.me/598XXXXXXXX', '_blank')}
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Escribinos por WhatsApp
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}