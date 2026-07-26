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
}

export function ScrollAnimation({
  children,
  animation = "fade-in-up",
  delay = 0,
  duration = 0.7,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  triggerOnce = true,
}: ScrollAnimationProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const totalMs = (delay + duration) * 1000;
    const timer = window.setTimeout(() => setHasCompleted(true), totalMs);
    return () => window.clearTimeout(timer);
  }, [isVisible, delay, duration]);

  const animationClass = isVisible ? `animate-${animation}` : "animate-hidden";

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
      data-animated={hasCompleted ? "true" : undefined}
    >
      {children}
    </div>
  );
}
