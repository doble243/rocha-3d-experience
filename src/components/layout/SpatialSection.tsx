import { useEffect, useRef, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpatialSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  depth?: 'shallow' | 'medium' | 'deep';
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
  'aria-labelledby'?: string;
}

export function SpatialSection({ 
  children, 
  id, 
  className = '', 
  depth = 'medium',
  direction = 'up',
  stagger = false,
  'aria-labelledby': ariaLabelledBy
}: SpatialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Depth configuration
  const depthConfig = {
    shallow: { y: 40, z: -30, scale: 0.98, blur: 2 },
    medium: { y: 60, z: -60, scale: 0.95, blur: 4 },
    deep: { y: 80, z: -100, scale: 0.92, blur: 6 }
  };

  // Direction configuration
  const getDirectionOffset = () => {
    const config = depthConfig[depth];
    switch (direction) {
      case 'up': return { x: 0, y: config.y };
      case 'down': return { x: 0, y: -config.y };
      case 'left': return { x: config.y, y: 0 };
      case 'right': return { x: -config.y, y: 0 };
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const config = depthConfig[depth];
    const offset = getDirectionOffset();

    const ctx = gsap.context(() => {
      // Main section animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.8,
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false)
        }
      });

      tl.fromTo(contentRef.current,
        {
          opacity: 0,
          x: offset.x,
          y: offset.y,
          scale: config.scale,
          filter: `blur(${config.blur}px)`
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'expo.out'
        }
      );

      // Exit animation (when scrolling past)
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 40%',
          end: 'bottom top',
          scrub: 0.5
        }
      }).to(contentRef.current, {
        opacity: 0.7,
        y: -30,
        scale: 0.98,
        filter: 'blur(2px)',
        ease: 'power2.in'
      });

      // Stagger children if enabled
      if (stagger) {
        const children = contentRef.current?.querySelectorAll('[data-stagger]');
        if (children?.length) {
          gsap.fromTo(children,
            {
              opacity: 0,
              y: 30,
              filter: 'blur(3px)'
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              stagger: 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%'
              }
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [depth, direction, stagger]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
      aria-labelledby={ariaLabelledBy}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1500px'
      }}
    >
      <div 
        ref={contentRef}
        className="will-change-transform"
        style={{ 
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter'
        }}
      >
        {children}
      </div>
    </section>
  );
}
