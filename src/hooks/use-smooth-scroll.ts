import { useEffect, useState, useCallback, useRef } from 'react';

interface SmoothScrollState {
  scrollY: number;
  scrollProgress: number;
  direction: 'up' | 'down' | null;
  velocity: number;
}

export function useSmoothScroll() {
  const [state, setState] = useState<SmoothScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    direction: null,
    velocity: 0
  });
  
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef(performance.now());

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const updateScroll = useCallback(() => {
    const now = performance.now();
    const deltaTime = Math.min((now - lastTime.current) / 16.67, 2); // Normalize to ~60fps
    lastTime.current = now;

    // Smooth interpolation with adaptive factor
    const factor = 1 - Math.pow(0.1, deltaTime);
    currentScrollY.current = lerp(currentScrollY.current, targetScrollY.current, factor);

    // Calculate velocity
    const velocity = currentScrollY.current - lastScrollY.current;
    lastScrollY.current = currentScrollY.current;

    // Calculate scroll progress (0 to 1)
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? currentScrollY.current / docHeight : 0;

    // Determine direction
    const direction = velocity > 0.5 ? 'down' : velocity < -0.5 ? 'up' : null;

    setState({
      scrollY: currentScrollY.current,
      scrollProgress: Math.max(0, Math.min(1, progress)),
      direction,
      velocity: Math.abs(velocity)
    });

    rafId.current = requestAnimationFrame(updateScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };

    // Initialize
    targetScrollY.current = window.scrollY;
    currentScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(updateScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateScroll]);

  const scrollTo = useCallback((target: number | string, duration = 1000) => {
    let targetY: number;

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        targetY = element.getBoundingClientRect().top + window.scrollY;
      } else {
        return;
      }
    } else {
      targetY = target;
    }

    const startY = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Custom easing (ease-out-expo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      window.scrollTo(0, startY + (targetY - startY) * eased);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  return { ...state, scrollTo };
}
