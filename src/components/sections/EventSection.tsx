import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, MessageCircle, Phone, ArrowRight, Rocket, ShieldCheck, Clock, Cpu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Cpu,
    badge: 'TECNOLOGÍA',
    title: 'Desarrollo con IA',
    subtitle: 'Más rápido, más inteligente',
    description: 'Usamos inteligencia artificial para acelerar el diseño, desarrollo y lanzamiento de tu proyecto. Resultados en días, no meses.',
    features: [
      { icon: Zap, text: 'Desarrollo hasta 10x más rápido' },
      { icon: Sparkles, text: 'Diseño generado y refinado con IA' },
      { icon: Clock, text: 'Iteraciones en tiempo real' }
    ],
    color: 'secondary',
    gradient: 'from-secondary/30 via-secondary/10 to-transparent',
    glow: 'shadow-[0_0_60px_hsla(51,100%,50%,0.3)]'
  },
  {
    icon: MessageCircle,
    badge: 'HABLEMOS',
    title: 'Empezá tu Proyecto',
    subtitle: 'Consulta sin compromiso',
    description: 'Contanos tu idea y te armamos una propuesta a medida. Sin letra chica, sin sorpresas. Tu proyecto web listo para crecer.',
    features: [
      { icon: Rocket, text: 'De idea a producción en semanas' },
      { icon: ShieldCheck, text: 'Soporte post-lanzamiento' },
      { icon: Clock, text: 'Presupuesto transparente' }
    ],
    color: 'primary',
    gradient: 'from-primary/30 via-primary/10 to-transparent',
    glow: 'shadow-[0_0_60px_hsla(159,100%,45%,0.3)]',
    cta: true
  }
];

export function EventSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-title', start: 'top 80%' } }
      );

      const cards = cardsRef.current?.querySelectorAll('.highlight-card');
      cards?.forEach((card, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        
        gsap.fromTo(card,
          { opacity: 0, x: direction, scale: 0.85, rotateY: direction > 0 ? 15 : -15 },
          { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 80%', end: 'top 50%', scrub: false } }
        );

        const features = card.querySelectorAll('.feature-item');
        gsap.fromTo(features,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 60%' } }
        );

        const icon = card.querySelector('.floating-icon');
        gsap.to(icon, { y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });

        const glow = card.querySelector('.glow-ring');
        gsap.to(glow, { scale: 1.2, opacity: 0.3, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      });

      gsap.to('.parallax-bg', {
        yPercent: -30, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="parallax-bg absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-display tracking-wider mb-4">
            <Cpu className="w-4 h-4" />
            POR QUÉ ELEGIRNOS
          </span>
          <h2 id="contact-heading" className="contact-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Desarrollo <span className="text-gradient-secondary">Inteligente</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Combinamos diseño premium con inteligencia artificial para crear tu próximo proyecto web.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <div key={index} className="highlight-card relative" style={{ perspective: '1000px' }}>
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-50`} />
              
              <div className={`relative glass-card rounded-3xl p-8 md:p-10 border-2 h-full ${
                item.color === 'primary' ? 'border-primary/30 hover:border-primary/50' : 'border-secondary/30 hover:border-secondary/50'
              } transition-all duration-500 ${item.glow}`}>
                
                <div className={`absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-display tracking-wider ${
                  item.color === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                }`}>
                  {item.badge}
                </div>

                <div className="flex flex-col gap-6">
                  <div className="relative flex-shrink-0 self-start">
                    <div className={`glow-ring absolute inset-0 rounded-full ${
                      item.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'
                    }`} />
                    <div className={`floating-icon relative w-20 h-20 rounded-full flex items-center justify-center ${
                      item.color === 'primary' ? 'bg-primary/20 border-2 border-primary text-primary' : 'bg-secondary/20 border-2 border-secondary text-secondary'
                    }`}>
                      <item.icon className="w-10 h-10" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <p className={`text-sm font-display tracking-wider ${
                        item.color === 'primary' ? 'text-primary' : 'text-secondary'
                      }`}>
                        {item.subtitle}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-display font-bold mt-1">{item.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground font-body text-base mb-6 leading-relaxed">{item.description}</p>

                    <ul className="space-y-3 mb-6">
                      {item.features.map((feature, fIndex) => (
                        <li key={fIndex} className="feature-item flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            item.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                          }`}>
                            <feature.icon className="w-4 h-4" />
                          </div>
                          <span className="text-foreground/80 font-body">{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    {item.cta && (
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="group w-full sm:w-auto"
                        onClick={() => window.open('https://wa.me/598XXXXXXXX?text=Hola!%20Me%20interesa%20consultar%20por%20desarrollo%20web', '_blank')}
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Hablemos por WhatsApp
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
