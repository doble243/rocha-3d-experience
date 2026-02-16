import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Smartphone, ShoppingCart, Layers, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    name: 'Sitios Web',
    badge: 'MÁS POPULAR',
    description: 'Landing pages y sitios institucionales con diseño inmersivo y optimización SEO incluida.',
    formats: ['One Page', 'Multi Page', 'Blog integrado'],
    materials: ['Diseño responsivo', 'Velocidad optimizada'],
    extras: ['Landing pages', 'Portafolios', 'Sitios corporativos'],
    icon: Globe,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Aplicaciones Web',
    badge: 'PREMIUM',
    description: 'Plataformas y dashboards interactivos con lógica de negocio y bases de datos.',
    formats: ['SPA', 'PWA', 'Dashboard'],
    materials: ['Autenticación incluida', 'Base de datos en la nube'],
    extras: ['Paneles de gestión', 'CRM a medida', 'Sistemas internos'],
    icon: Layers,
    color: 'secondary'
  },
  {
    id: 3,
    name: 'E-Commerce',
    badge: 'ALTA CONVERSIÓN',
    description: 'Tiendas online con pasarela de pago, gestión de productos y experiencia de compra fluida.',
    formats: ['Shopify', 'Custom', 'Marketplace'],
    materials: ['Pagos integrados', 'Gestión de inventario'],
    extras: ['Tiendas online', 'Catálogos digitales', 'Checkout optimizado'],
    icon: ShoppingCart,
    color: 'primary'
  },
  {
    id: 4,
    name: 'Apps Móviles',
    badge: 'MULTIPLATAFORMA',
    description: 'Aplicaciones móviles con experiencia nativa para iOS y Android desde una sola base de código.',
    formats: ['React Native', 'PWA', 'Híbrida'],
    materials: ['iOS y Android', 'Publicación en stores'],
    extras: ['Apps de servicio', 'Apps internas', 'MVPs rápidos'],
    icon: Smartphone,
    color: 'secondary'
  }
];

export function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60, scale: 0.95, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
          duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', end: 'top 60%', scrub: 0.5 }
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeft = index % 2 === 0;
        const xOffset = isLeft ? -60 : 60;

        gsap.fromTo(card,
          { opacity: 0, x: xOffset, y: 80, scale: 0.9, rotateY: isLeft ? -8 : 8, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, filter: 'blur(0px)',
            duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 50%', scrub: 0.6 }
          }
        );

        gsap.to(card, {
          y: -30, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-32 md:py-40 overflow-hidden"
      aria-labelledby="products-heading"
      style={{ 
        background: 'linear-gradient(180deg, hsl(220, 25%, 4%) 0%, hsl(220, 22%, 6%) 50%, hsl(220, 25%, 4%) 100%)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary/90 text-xs font-display tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            SERVICIOS
          </span>
          <h2 id="products-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            Creamos <span className="text-gradient-primary">Todo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Desde landing pages hasta plataformas complejas. 
            Desarrollo ágil potenciado por inteligencia artificial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto" style={{ perspective: '1500px' }}>
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className={`group relative p-8 rounded-2xl cursor-pointer transition-all duration-slow ease-out-expo preserve-3d ${
                activeCard === index ? 'scale-[1.02]' : 'hover:scale-[1.01]'
              }`}
              style={{
                background: 'linear-gradient(135deg, hsla(220, 20%, 100%, 0.03) 0%, hsla(220, 20%, 100%, 0.01) 100%)',
                backdropFilter: 'blur(20px)',
                border: activeCard === index 
                  ? '1px solid hsla(165, 80%, 45%, 0.3)'
                  : '1px solid hsla(220, 15%, 20%, 0.5)',
                boxShadow: activeCard === index 
                  ? '0 0 60px hsla(165, 80%, 45%, 0.15), 0 25px 50px -12px hsla(0, 0%, 0%, 0.4)'
                  : '0 25px 50px -12px hsla(0, 0%, 0%, 0.3)'
              }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              role="article"
              aria-label={service.name}
            >
              <div className={`absolute -top-3 right-6 px-3 py-1.5 rounded-full text-[10px] font-display tracking-wider ${
                service.color === 'primary' 
                  ? 'bg-primary/90 text-primary-foreground' 
                  : 'bg-secondary/90 text-secondary-foreground'
              }`}>
                {service.badge}
              </div>

              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-medium ease-out-expo ${
                service.color === 'primary' 
                  ? 'bg-primary/10 text-primary group-hover:bg-primary/20' 
                  : 'bg-secondary/10 text-secondary group-hover:bg-secondary/20'
              }`}>
                <service.icon className="w-7 h-7" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-display font-bold mb-3 text-foreground">{service.name}</h3>
              <p className="text-muted-foreground mb-6 font-body text-sm leading-relaxed">{service.description}</p>

              <div className="mb-5">
                <h4 className="text-xs font-display text-foreground/50 uppercase tracking-wider mb-2">Tecnologías</h4>
                <div className="flex flex-wrap gap-2">
                  {service.formats.map((format, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-muted/30 text-foreground/70 border border-border/30">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-display text-foreground/50 uppercase tracking-wider mb-2">Características</h4>
                <ul className="space-y-1.5">
                  {service.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle className={`w-3.5 h-3.5 ${service.color === 'primary' ? 'text-primary/70' : 'text-secondary/70'}`} />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-display text-foreground/50 uppercase tracking-wider mb-2">Casos de uso</h4>
                <ul className="space-y-1.5">
                  {service.extras.map((extra, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm font-body transition-all duration-fast ease-out-expo"
                      style={{
                        opacity: activeCard === index ? 1 : 0.6,
                        transform: activeCard === index ? 'translateX(6px)' : 'translateX(0)',
                        transitionDelay: `${i * 50}ms`
                      }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        service.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                      }`} />
                      {extra}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
