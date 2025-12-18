import { createContext, useContext, ReactNode, useEffect, useState, useRef, useCallback } from 'react';

interface ImmersiveScrollContextType {
  scrollY: number;
  scrollProgress: number;
  sectionProgress: number;
  currentSection: number;
  velocity: number;
  direction: 'up' | 'down' | null;
  isScrolling: boolean;
  scrollTo: (target: string | number, duration?: number) => void;
}

const ImmersiveScrollContext = createContext<ImmersiveScrollContextType | null>(null);

export function useImmersiveScroll() {
  const context = useContext(ImmersiveScrollContext);
  if (!context) {
    throw new Error('useImmersiveScroll must be used within ImmersiveScrollProvider');
  }
  return context;
}

interface ImmersiveScrollProviderProps {
  children: ReactNode;
  sectionCount?: number;
}

export function ImmersiveScrollProvider({ children, sectionCount = 6 }: ImmersiveScrollProviderProps) {
  const [state, setState] = useState<Omit<ImmersiveScrollContextType, 'scrollTo'>>({
    scrollY: 0,
    scrollProgress: 0,
    sectionProgress: 0,
    currentSection: 0,
    velocity: 0,
    direction: null,
    isScrolling: false
  });

  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef(performance.now());
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  const updateScroll = useCallback(() => {
    const now = performance.now();
    const deltaTime = Math.min((now - lastTime.current) / 16.67, 2);
    lastTime.current = now;

    // Smooth interpolation
    const factor = 1 - Math.pow(0.08, deltaTime);
    currentScrollY.current = lerp(currentScrollY.current, targetScrollY.current, factor);

    // Calculate velocity
    const velocity = Math.abs(currentScrollY.current - lastScrollY.current);
    const direction = currentScrollY.current > lastScrollY.current ? 'down' : 
                      currentScrollY.current < lastScrollY.current ? 'up' : null;
    lastScrollY.current = currentScrollY.current;

    // Calculate progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? currentScrollY.current / docHeight : 0;

    // Calculate section
    const sectionHeight = docHeight / (sectionCount - 1);
    const currentSection = Math.min(
      sectionCount - 1,
      Math.floor(currentScrollY.current / sectionHeight)
    );
    const sectionProgress = (currentScrollY.current % sectionHeight) / sectionHeight;

    setState({
      scrollY: currentScrollY.current,
      scrollProgress: Math.max(0, Math.min(1, progress)),
      sectionProgress,
      currentSection,
      velocity,
      direction: velocity > 0.5 ? direction : null,
      isScrolling: velocity > 0.5
    });

    rafId.current = requestAnimationFrame(updateScroll);
  }, [sectionCount]);

  const scrollTo = useCallback((target: number | string, duration = 1100) => {
    let targetY: number;

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        targetY = element.getBoundingClientRect().top + window.scrollY;
      } else return;
    } else {
      targetY = target;
    }

    const startY = window.scrollY;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Custom ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      window.scrollTo(0, startY + (targetY - startY) * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;

      // Track scrolling state
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setState(prev => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    // Initialize
    targetScrollY.current = window.scrollY;
    currentScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(updateScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [updateScroll]);

  return (
    <ImmersiveScrollContext.Provider value={{ ...state, scrollTo }}>
      {children}
    </ImmersiveScrollContext.Provider>
  );
}
