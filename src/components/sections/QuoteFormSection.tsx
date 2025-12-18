import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, Upload, X, Image as ImageIcon, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImagePreview {
  file: File;
  url: string;
}

const QuoteFormSection = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImagePreview[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        if (images.length + newImages.length >= 5) {
          toast({
            title: "Límite alcanzado",
            description: "Máximo 5 imágenes por cotización",
            variant: "destructive",
          });
          return;
        }
        newImages.push({
          file,
          url: URL.createObjectURL(file),
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !contact.trim() || !description.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const imageNote = images.length > 0 
      ? `\n\n📷 Tengo ${images.length} imagen(es) de referencia para compartir.`
      : '';

    const message = `🎨 *COTIZACIÓN FABRICA UV*

👤 *Nombre:* ${name}
📞 *Contacto:* ${contact}

📝 *Descripción del proyecto:*
${description}${imageNote}`;

    const whatsappUrl = `https://wa.me/59899000000?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');

    if (images.length > 0) {
      toast({
        title: "¡Listo!",
        description: "Se abrió WhatsApp. Recuerda adjuntar las imágenes manualmente.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section 
      id="cotizacion" 
      className="relative py-20 md:py-32"
      aria-labelledby="quote-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary rounded-full border border-primary/30">
            Cotización Rápida
          </span>
          <h2 
            id="quote-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Contanos tu Proyecto
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describí lo que necesitás y te enviamos una cotización personalizada por WhatsApp
          </p>
        </div>

        {/* Form card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative backdrop-blur-xl bg-card/30 border border-border/50 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-50 -z-10" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Nombre o Empresa
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre o el de tu negocio"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              {/* Contact field */}
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-foreground font-medium">
                  Teléfono o Email
                </Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Para contactarte con la cotización"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              {/* Description field */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground font-medium">
                  Descripción del Proyecto
                </Label>
                <Textarea
                  id="description"
                  placeholder="¿Qué querés imprimir? ¿En qué material? ¿Qué medidas? Contanos todo lo que puedas..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Image upload */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Imágenes de Referencia (opcional)
                </Label>
                
                {/* Upload button */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border/50 hover:border-primary/50 rounded-xl p-6 text-center cursor-pointer transition-colors group"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <p className="text-sm text-muted-foreground">
                    Click para subir imágenes
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Máximo 5 imágenes (JPG, PNG)
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Image previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                    {images.map((img, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <img
                          src={img.url}
                          alt={`Referencia ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Eliminar imagen"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length > 0 && (
                  <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Las imágenes se adjuntan manualmente en WhatsApp
                  </p>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg group"
              >
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Enviar Cotización por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteFormSection;
