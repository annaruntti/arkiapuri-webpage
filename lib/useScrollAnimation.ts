"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
      } else if (!triggerOnce && !entry.isIntersecting && hasAnimated) {
        setIsVisible(false);
      }
    },
    [hasAnimated, triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already in view on initial load
    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView && !hasAnimated) {
      setIsVisible(true);
      setHasAnimated(true);
    }

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer with optimized settings for mobile
    const observer = new IntersectionObserver(
      (entries) => {
        requestAnimationFrame(() => {
          handleIntersection(entries);
        });
      },
      {
        threshold,
        rootMargin,
        // Add passive option for better mobile performance
        root: null,
      }
    );

    observerRef.current = observer;
    observer.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, triggerOnce, handleIntersection, hasAnimated]);

  return { ref, isVisible };
}
