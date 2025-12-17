import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene3D } from '@/components/3d/Scene3D';
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
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll for cards
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotateY: index % 2 === 0 ? -15 : 15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1,
            }
          }
        );
      });

      // Title animation
      gsap.fromTo('.products-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.products-title',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="products-heading"
    >
      {/* Background 3D */}
      <div className="absolute inset-0 opacity-30 z-0">
        <Scene3D variant="products" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />

      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-display tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            MATERIALES
          </span>
          <h2
            id="products-heading"
            className="products-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Imprimimos en <span className="text-gradient-primary">Todo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Tecnología UV de alta definición sobre cualquier superficie rígida. Colores vibrantes y durabilidad extrema.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 perspective-1000 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className={`glass-card p-8 preserve-3d cursor-pointer transition-all duration-500 relative ${
                activeCard === index ? 'scale-[1.02] border-primary' : ''
              }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              role="article"
              aria-label={product.name}
            >
              {/* Badge */}
              <div className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-display tracking-wider ${
                product.color === 'primary' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {product.badge}
              </div>

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                product.color === 'primary' 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary/20 text-secondary'
              }`}>
                <product.icon className="w-8 h-8" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-display font-bold mb-3">{product.name}</h3>
              <p className="text-muted-foreground mb-6 font-body">{product.description}</p>

              {/* Formats */}
              <div className="mb-4">
                <h4 className="text-sm font-display text-foreground/70 mb-2">Formatos:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.formats.map((format, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted/50 text-foreground/80">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-4">
                <h4 className="text-sm font-display text-foreground/70 mb-2">Materiales:</h4>
                <ul className="space-y-1">
                  {product.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle className={`w-3 h-3 ${product.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extras */}
              <div>
                <h4 className="text-sm font-display text-foreground/70 mb-2">Incluye:</h4>
                <ul className="space-y-2">
                  {product.extras.map((extra, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-body"
                      style={{
                        opacity: activeCard === index ? 1 : 0.7,
                        transform: activeCard === index ? 'translateX(8px)' : 'translateX(0)',
                        transition: `all 0.3s ease ${i * 0.05}s`
                      }}
                    >
                      <span className={`w-2 h-2 rounded-full ${
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
