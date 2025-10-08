"use client";

import { ReactNode } from "react";
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
  delay = 0.3,
  duration = 2.0,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  triggerOnce = true,
}: ScrollAnimationProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const animationClass = isVisible ? `animate-${animation}` : "animate-hidden";
  const style = {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`}
      style={style}
      data-animated={isVisible}
    >
      {children}
    </div>
  );
}
