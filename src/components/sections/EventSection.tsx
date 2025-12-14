import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Utensils, ShoppingBag, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    icon: Calendar,
    title: 'Próximo Evento',
    date: 'Por anunciar 2025',
    description: 'Mantente atento a nuestros próximos eventos en Uruguay',
    color: 'primary'
  },
  {
    icon: Music,
    title: 'Festivales de Música',
    date: 'Temporada 2025',
    description: 'Estaremos en los mejores festivales con fundas exclusivas',
    color: 'secondary'
  },
  {
    icon: Utensils,
    title: 'Ferias Gastronómicas',
    date: 'Todo el año',
    description: 'Encuentra World Case en ferias y eventos locales',
    color: 'primary'
  },
  {
    icon: ShoppingBag,
    title: 'Pop-up Stores',
    date: 'Pronto',
    description: 'Tiendas temporales con colecciones exclusivas',
    color: 'secondary'
  }
];

export function EventSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 1
          }
        }
      );

      // Animate each event
      const events = timelineRef.current?.querySelectorAll('.timeline-event');
      events?.forEach((event, index) => {
        gsap.fromTo(event,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: event,
              start: 'top 80%',
            }
          }
        );
      });

      // Float icons
      const icons = timelineRef.current?.querySelectorAll('.float-icon');
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
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-display tracking-wider mb-4">
            <MapPin className="inline w-4 h-4 mr-2" aria-hidden="true" />
            URUGUAY
          </span>
          <h2
            id="events-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Próximos <span className="text-gradient-secondary">Eventos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Encontranos en los mejores eventos de Uruguay. Música, gastronomía y más.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary -translate-x-1/2 origin-top hidden md:block"
            style={{ transformOrigin: 'top' }}
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-event relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card p-6 inline-block">
                    <span className={`text-sm font-display tracking-wider ${
                      event.color === 'primary' ? 'text-primary' : 'text-secondary'
                    }`}>
                      {event.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold mt-2 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground font-body">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`float-icon w-16 h-16 rounded-full flex items-center justify-center ${
                    event.color === 'primary' 
                      ? 'bg-primary/20 border-2 border-primary text-primary shadow-[0_0_30px_hsla(159,100%,45%,0.4)]' 
                      : 'bg-secondary/20 border-2 border-secondary text-secondary shadow-[0_0_30px_hsla(51,100%,50%,0.4)]'
                  }`}>
                    <event.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
