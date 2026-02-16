import { useState } from 'react';
import { Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/simplemente.dev', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/simplemente-dev', label: 'LinkedIn' },
];

export function Footer() {
  const [isElevating, setIsElevating] = useState(false);

  const scrollToTop = () => {
    setIsElevating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsElevating(false), 1000);
  };

  return (
    <footer className="relative py-16 border-t border-border/30" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold mb-1">
              SIMPLE<span className="text-primary">MENTE</span>
            </h3>
            <p className="text-xs text-muted-foreground font-display mb-2">desarrollo web con IA</p>
            <p className="text-muted-foreground text-sm font-body">
              © 2025 SIMPLEMENTE. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-full bg-card/50 border border-border/50 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={`Seguir en ${social.label}`}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:rotate-[360deg]" aria-hidden="true" />
              </a>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className={`relative overflow-hidden transition-all duration-500 ${isElevating ? 'bg-primary text-primary-foreground' : ''}`}
            aria-label="Volver arriba"
          >
            <ArrowUp className={`w-5 h-5 transition-transform duration-500 ${isElevating ? '-translate-y-10' : ''}`} aria-hidden="true" />
            <ArrowUp className={`w-5 h-5 absolute transition-transform duration-500 ${isElevating ? 'translate-y-0' : 'translate-y-10'}`} aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground font-body">
            Hecho con 💚 en Uruguay | Desarrollo web potenciado por IA
          </p>
        </div>
      </div>
    </footer>
  );
}
