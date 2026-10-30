"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0,
    // Shrink the bottom of the root so reveal happens after the element
    // has entered the viewport — animation stays visible while scrolling.
    rootMargin = "0px 0px -80px 0px",
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

    // Only auto-reveal on mount when clearly in the upper viewport (hero/header).
    // Avoid revealing tall below-fold sections early.
    const rect = element.getBoundingClientRect();
    const clearlyInView =
      rect.top < window.innerHeight * 0.75 && rect.bottom > 0 && rect.top >= 0;

    if (clearlyInView) {
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
