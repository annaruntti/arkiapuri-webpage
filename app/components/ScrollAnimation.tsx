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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent flash by not rendering until mounted
  if (!isMounted) {
    return (
      <div className={`animate-hidden ${className}`} style={{ opacity: 0 }}>
        {children}
      </div>
    );
  }

  const animationClass = isVisible ? `animate-${animation}` : "animate-hidden";

  // Optimize duration for mobile devices
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const optimizedDuration = isMobile ? Math.min(duration, 1.0) : duration;

  const style = {
    animationDelay: `${delay}s`,
    animationDuration: `${optimizedDuration}s`,
    // Add will-change for better performance
    willChange: isVisible ? "auto" : "transform, opacity",
    // Prevent layout shift on mobile
    minHeight: isVisible ? "auto" : "1px",
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
