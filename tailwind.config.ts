import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
          deep: "hsl(var(--primary-deep))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          glow: "hsl(var(--secondary-glow))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          elevated: "hsl(var(--card-elevated))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        'smooth': 'var(--ease-smooth)',
        'out-expo': 'var(--ease-out-expo)',
        'in-expo': 'var(--ease-in-expo)',
        'in-out-expo': 'var(--ease-in-out-expo)',
        'out-back': 'var(--ease-out-back)',
        'out-circ': 'var(--ease-out-circ)',
        'depth': 'var(--ease-depth)',
      },
      transitionDuration: {
        'micro': 'var(--duration-micro)',
        'fast': 'var(--duration-fast)',
        'medium': 'var(--duration-medium)',
        'slow': 'var(--duration-slow)',
        'spatial': 'var(--duration-spatial)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "depth-reveal": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(40px) translateZ(-60px) scale(0.96)",
            filter: "blur(4px)"
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) translateZ(0) scale(1)",
            filter: "blur(0)"
          },
        },
        "spatial-fade": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(60px) scale(0.95)"
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)"
          },
        },
        "glow-breathe": {
          "0%, 100%": { 
            boxShadow: "0 0 30px hsla(165, 80%, 45%, 0.2)"
          },
          "50%": { 
            boxShadow: "0 0 60px hsla(165, 80%, 45%, 0.4)"
          },
        },
        "float-cinematic": {
          "0%, 100%": { 
            transform: "translateY(0) rotateX(0) rotateY(0)"
          },
          "33%": { 
            transform: "translateY(-12px) rotateX(1deg) rotateY(2deg)"
          },
          "66%": { 
            transform: "translateY(-6px) rotateX(-0.5deg) rotateY(-1deg)"
          },
        },
        "text-emerge": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px) rotateX(-45deg)",
            filter: "blur(6px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) rotateX(0)",
            filter: "blur(0)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "depth-reveal": "depth-reveal 1.1s var(--ease-out-expo) forwards",
        "spatial-fade": "spatial-fade 0.9s var(--ease-out-expo) forwards",
        "glow-breathe": "glow-breathe 4s var(--ease-smooth) infinite",
        "float-cinematic": "float-cinematic 8s var(--ease-smooth) infinite",
        "text-emerge": "text-emerge 0.8s var(--ease-out-expo) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
