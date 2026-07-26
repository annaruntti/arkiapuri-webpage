"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => {
      if (hasAnimatedRef.current && triggerOnce) return;
      hasAnimatedRef.current = true;
      setIsVisible(true);
    };

    const hide = () => {
      if (triggerOnce) return;
      setIsVisible(false);
    };

    // Already in viewport on mount — reveal without waiting for observer
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      if (triggerOnce) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          if (triggerOnce) observer.disconnect();
        } else {
          hide();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
