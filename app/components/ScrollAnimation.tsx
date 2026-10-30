"use client";

import { ReactNode, useEffect, useState } from "react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ScrollAnimationProps {
  children: ReactNode;
  animation?:
    | "fade-in"
    | "fade-in-up"
    | "slide-in-left"
    | "slide-in-right"
    | "scale-in"
    | "bounce-in";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  /** Skip IntersectionObserver and play on mount (above-the-fold content). */
  immediate?: boolean;
}

export function ScrollAnimation({
  children,
  animation = "fade-in-up",
  delay = 0,
  duration = 0.7,
  className = "",
  threshold = 0,
  rootMargin = "0px 0px -80px 0px",
  triggerOnce = true,
  immediate = false,
}: ScrollAnimationProps) {
  const scroll = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });
  const [immediateVisible, setImmediateVisible] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!immediate) return;
    // Double rAF: wait until after first paint with hidden styles applied
    let innerId = 0;
    const outerId = window.requestAnimationFrame(() => {
      innerId = window.requestAnimationFrame(() => setImmediateVisible(true));
    });
    return () => {
      window.cancelAnimationFrame(outerId);
      window.cancelAnimationFrame(innerId);
    };
  }, [immediate]);

  const isVisible = immediate ? immediateVisible : scroll.isVisible;

  useEffect(() => {
    if (!isVisible) return;

    const totalMs = (delay + duration) * 1000;
    const timer = window.setTimeout(() => setHasCompleted(true), totalMs);
    return () => window.clearTimeout(timer);
  }, [isVisible, delay, duration]);

  const animationClass = isVisible ? `animate-${animation}` : "animate-hidden";

  return (
    <div
      ref={immediate ? undefined : scroll.ref}
      className={`${animationClass} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationFillMode: "both",
      }}
      data-animated={hasCompleted ? "true" : undefined}
    >
      {children}
    </div>
  );
}
