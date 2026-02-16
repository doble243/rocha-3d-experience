import { useEffect, useRef, useState, FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

function Confetti() {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!confettiRef.current) return;
    
    const colors = ['#00A676', '#FFD700', '#00D4AA', '#FFEA00'];
    const pieces = 50;

    for (let i = 0; i < pieces; i++) {
      const piece = document.createElement('div');
      piece.className = 'absolute w-3 h-3 rounded-sm';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = '-20px';
      confettiRef.current.appendChild(piece);

      gsap.to(piece, {
        y: window.innerHeight + 100,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720,
        duration: 2 + Math.random() * 2,
        ease: 'power1.out',
        onComplete: () => piece.remove()
      });
    }
  }, []);

  return <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-50" />;
}

export function SubscribeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cubeRef.current,
        { opacity: 0, scale: 0.5, rotateY: -45, rotateX: 30 },
        {
          opacity: 1, scale: 1, rotateY: 0, rotateX: 0,
          duration: 1.2, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({ title: "Email inválido", description: "Por favor ingresa un email válido", variant: "destructive" });
      return;
    }

    setIsSubmitted(true);
    setShowConfetti(true);
    toast({ title: "¡Gracias por suscribirte!", description: "Te mantendremos al tanto de novedades y tips" });
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <section ref={sectionRef} id="subscribe" className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="subscribe-heading">
      {showConfetti && <Confetti />}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div
            ref={cubeRef}
            className={`glass-card p-8 md:p-12 preserve-3d transition-all duration-500 ${
              isHovered ? 'shadow-[0_0_60px_hsla(159,100%,45%,0.3)]' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)' }}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                {isSubmitted ? (
                  <CheckCircle className="w-8 h-8 text-primary animate-scale-in" aria-hidden="true" />
                ) : (
                  <Mail className="w-8 h-8 text-primary" aria-hidden="true" />
                )}
              </div>

              <h2 id="subscribe-heading" className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                {isSubmitted ? (
                  <>¡Estás <span className="text-gradient-primary">Dentro</span>!</>
                ) : (
                  <>Únete a <span className="text-gradient-primary">SIMPLEMENTE</span></>
                )}
              </h2>

              <p className="text-lg text-muted-foreground font-body">
                {isSubmitted
                  ? 'Te enviaremos tips, novedades y recursos sobre desarrollo web con IA.'
                  : 'Recibí tips de desarrollo web, novedades sobre IA y recursos exclusivos.'
                }
              </p>
            </div>

            {!isSubmitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Dirección de email" className="pr-12" />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="group">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" aria-hidden="true" />
                  Suscribirme
                </Button>
              </form>
            ) : (
              <div className="flex justify-center">
                <Button variant="golden" size="lg" onClick={() => window.open('https://instagram.com/simplemente.dev', '_blank')}>
                  Síguenos en Instagram
                </Button>
              </div>
            )}

            <p className="text-center text-sm text-muted-foreground mt-6 font-body">
              No spam. Solo contenido de valor. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
