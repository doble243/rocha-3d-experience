import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, LayoutGrid, QrCode, DoorOpen, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Acrílico',
    badge: 'MÁS POPULAR',
    description: 'Impresión directa sobre acrílico transparente o de color. Ideal para señalética premium.',
    formats: ['Transparente', 'Blanco', 'Colores varios'],
    materials: ['3mm - 5mm - 10mm de espesor', 'Corte láser disponible'],
    extras: ['Señalética', 'Exhibidores', 'Placas decorativas'],
    icon: LayoutGrid,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Madera y MDF',
    badge: 'PREMIUM',
    description: 'Impresión full color sobre superficies de madera. Textura natural con diseño moderno.',
    formats: ['MDF', 'Terciado', 'Madera maciza'],
    materials: ['Hasta 10cm de altura de objeto', 'Acabado mate o barnizado'],
    extras: ['Cuadros decorativos', 'Menús de restaurante', 'Señales rústicas'],
    icon: DoorOpen,
    color: 'secondary'
  },
  {
    id: 3,
    name: 'Vidrio y Cerámica',
    badge: 'ALTA DEFINICIÓN',
    description: 'Impresión UV directa sobre vidrio y cerámica. Resistente y duradero.',
    formats: ['Vidrio templado', 'Cerámica', 'Porcelanato'],
    materials: ['Resistente al agua', 'No se descascara'],
    extras: ['Vidrieras', 'Azulejos personalizados', 'Premios y trofeos'],
    icon: QrCode,
    color: 'primary'
  },
  {
    id: 4,
    name: 'Metal y Aluminio',
    badge: 'INDUSTRIAL',
    description: 'Impresión duradera sobre superficies metálicas. Ideal para uso exterior.',
    formats: ['Aluminio compuesto', 'Acero inoxidable', 'Aluminio anodizado'],
    materials: ['Resistente a intemperie', 'Durabilidad extrema'],
    extras: ['Placas industriales', 'Señalética exterior', 'Merchandising'],
    icon: Clock,
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
      // Header emerges from depth
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

      // Cards with spatial parallax
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const isLeft = index % 2 === 0;
        const xOffset = isLeft ? -60 : 60;
        const delay = index * 0.08;
        
        // Entry animation
        gsap.fromTo(card,
          {
            opacity: 0,
            x: xOffset,
            y: 80,
            scale: 0.9,
            rotateY: isLeft ? -8 : 8,
            filter: 'blur(6px)'
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 0.6
            }
          }
        );

        // Parallax on scroll (after visible)
        gsap.to(card, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
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
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary/90 text-xs font-display tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            MATERIALES
          </span>
          <h2
            id="products-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            Imprimimos en <span className="text-gradient-primary">Todo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Tecnología UV de alta definición sobre cualquier superficie rígida. 
            Colores vibrantes y durabilidad extrema.
          </p>
        </div>

        {/* Cards grid */}
        <div 
          className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto"
          style={{ perspective: '1500px' }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className={`group relative p-8 rounded-2xl cursor-pointer transition-all duration-slow ease-out-expo preserve-3d ${
                activeCard === index 
                  ? 'scale-[1.02]' 
                  : 'hover:scale-[1.01]'
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
              aria-label={product.name}
            >
              {/* Badge */}
              <div className={`absolute -top-3 right-6 px-3 py-1.5 rounded-full text-[10px] font-display tracking-wider ${
                product.color === 'primary' 
                  ? 'bg-primary/90 text-primary-foreground' 
                  : 'bg-secondary/90 text-secondary-foreground'
              }`}>
                {product.badge}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-medium ease-out-expo ${
                product.color === 'primary' 
                  ? 'bg-primary/10 text-primary group-hover:bg-primary/20' 
                  : 'bg-secondary/10 text-secondary group-hover:bg-secondary/20'
              }`}>
                <product.icon className="w-7 h-7" aria-hidden="true" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-display font-bold mb-3 text-foreground">{product.name}</h3>
              <p className="text-muted-foreground mb-6 font-body text-sm leading-relaxed">{product.description}</p>

              {/* Formats */}
              <div className="mb-5">
                <h4 className="text-xs font-display text-foreground/50 uppercase tracking-wider mb-2">Formatos</h4>
                <div className="flex flex-wrap gap-2">
                  {product.formats.map((format, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-muted/30 text-foreground/70 border border-border/30">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-5">
                <h4 className="text-xs font-display text-foreground/50 uppercase tracking-wider mb-2">Características</h4>
                <ul className="space-y-1.5">
                  {product.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle className={`w-3.5 h-3.5 ${product.color === 'primary' ? 'text-primary/70' : 'text-secondary/70'}`} />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extras */}
              <div>
                <h4 className="text-xs font-display text-foreground/50 uppercase tracking-wider mb-2">Aplicaciones</h4>
                <ul className="space-y-1.5">
                  {product.extras.map((extra, i) => (
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
                        product.color === 'primary' ? 'bg-primary' : 'bg-secondary'
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
