import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Utensils, ShoppingBag, MapPin, Store, MessageCircle, PartyPopper, Beer, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pastEvents = [
  { name: 'Semana de Rocha', icon: Waves },
  { name: 'Colonia Valdense', icon: PartyPopper },
  { name: 'Feria de Rosario', icon: ShoppingBag },
  { name: 'Bierfest Young', icon: Beer },
];

const currentEvent = {
  icon: Waves,
  title: 'Atlántida',
  date: 'Hasta Febrero 2025',
  description: '¡Encontranos en la costa! Estamos en Atlántida toda la temporada de verano con las mejores fundas.',
  color: 'primary'
};

const storeInfo = {
  icon: Store,
  title: 'Local en Agraciada',
  description: 'Visitanos en nuestro local físico en Agraciada, Montevideo. ¡Te esperamos!',
  color: 'secondary'
};

const assistantInfo = {
  icon: MessageCircle,
  title: 'Asistente de Compra',
  description: '¿No podés acercarte? ¡No hay problema! Contactanos por nuestro asistente de compra y te ayudamos.',
  color: 'primary'
};

export function EventSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate past events badges
      const badges = contentRef.current?.querySelectorAll('.past-event-badge');
      badges?.forEach((badge, index) => {
        gsap.fromTo(badge,
          { opacity: 0, scale: 0, rotation: -10 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: badge,
              start: 'top 85%',
            }
          }
        );
      });

      // Animate main cards
      const cards = contentRef.current?.querySelectorAll('.info-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        );
      });

      // Float icons
      const icons = contentRef.current?.querySelectorAll('.float-icon');
      icons?.forEach((icon) => {
        gsap.to(icon, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-card/20 to-background"
      aria-labelledby="events-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-display tracking-wider mb-4">
            <MapPin className="inline w-4 h-4 mr-2" aria-hidden="true" />
            EN TODO URUGUAY
          </span>
          <h2
            id="events-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Donde <span className="text-gradient-secondary">Estamos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Recorremos las mejores ferias y festivales del país. ¡Siempre cerca tuyo!
          </p>
        </div>

        {/* Past Events Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <span className="text-muted-foreground font-body text-sm mr-2 self-center">Ya estuvimos en:</span>
          {pastEvents.map((event, index) => (
            <div
              key={index}
              className="past-event-badge flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50 text-foreground/80 text-sm font-display"
            >
              <event.icon className="w-4 h-4 text-secondary" aria-hidden="true" />
              {event.name}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="max-w-5xl mx-auto">
          {/* Current Event - Featured */}
          <div className="info-card glass-card p-8 md:p-10 mb-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/30 border border-primary/50 text-primary text-xs font-display animate-pulse">
              ¡AHORA!
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="float-icon w-20 h-20 rounded-full flex items-center justify-center bg-primary/20 border-2 border-primary text-primary shadow-[0_0_40px_hsla(159,100%,45%,0.5)]">
                <currentEvent.icon className="w-10 h-10" aria-hidden="true" />
              </div>
              <div className="text-center md:text-left flex-1">
                <span className="text-primary font-display tracking-wider text-sm">{currentEvent.date}</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold mt-1 mb-2">{currentEvent.title}</h3>
                <p className="text-muted-foreground font-body text-lg">{currentEvent.description}</p>
              </div>
            </div>
          </div>

          {/* Store & Assistant Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Physical Store */}
            <div className="info-card glass-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="float-icon w-14 h-14 rounded-full flex items-center justify-center bg-secondary/20 border-2 border-secondary text-secondary shadow-[0_0_30px_hsla(51,100%,50%,0.4)] flex-shrink-0">
                  <storeInfo.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{storeInfo.title}</h3>
                  <p className="text-muted-foreground font-body">{storeInfo.description}</p>
                </div>
              </div>
            </div>

            {/* Shopping Assistant */}
            <div className="info-card glass-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="float-icon w-14 h-14 rounded-full flex items-center justify-center bg-primary/20 border-2 border-primary text-primary shadow-[0_0_30px_hsla(159,100%,45%,0.4)] flex-shrink-0">
                  <assistantInfo.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{assistantInfo.title}</h3>
                  <p className="text-muted-foreground font-body">{assistantInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
