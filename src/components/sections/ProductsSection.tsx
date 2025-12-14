import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene3D } from '@/components/3d/Scene3D';
import { Sparkles, Palette, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Funda Premium',
    description: 'Protección máxima con estilo único',
    features: ['Silicona premium', 'Personalizable', 'Anti-impacto'],
    icon: Shield,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Diseño Artístico',
    description: 'Expresa tu personalidad con arte',
    features: ['Impresión UV', 'Colores vibrantes', 'Diseño único'],
    icon: Palette,
    color: 'secondary'
  },
  {
    id: 3,
    name: 'Edición Especial',
    description: 'Colecciones limitadas para eventos',
    features: ['Edición limitada', 'Materiales eco', 'Certificado'],
    icon: Sparkles,
    color: 'primary'
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
            rotateY: -15,
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
              start: 'top 80%',
              end: 'top 50%',
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
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-display tracking-wider mb-4">
            COLECCIÓN 2025
          </span>
          <h2
            id="products-heading"
            className="products-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Nuestros <span className="text-gradient-primary">Productos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Fundas diseñadas para proteger y destacar. Cada pieza es una obra de arte.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className={`glass-card p-8 preserve-3d cursor-pointer transition-all duration-500 ${
                activeCard === index ? 'scale-105 border-primary' : ''
              }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              role="article"
              aria-label={product.name}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                product.color === 'primary' 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary/20 text-secondary'
              }`}>
                <product.icon className="w-8 h-8" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-display font-bold mb-3">{product.name}</h3>
              <p className="text-muted-foreground mb-6 font-body">{product.description}</p>

              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-body"
                    style={{
                      opacity: activeCard === index ? 1 : 0.7,
                      transform: activeCard === index ? 'translateX(10px)' : 'translateX(0)',
                      transition: `all 0.3s ease ${i * 0.1}s`
                    }}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      product.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
