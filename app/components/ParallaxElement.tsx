"use client";

import { ReactNode } from "react";
import { useParallax } from "@/lib/useParallax";

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxElement({
  children,
  speed = 0.5,
  className = "",
}: ParallaxElementProps) {
  const y = useParallax(speed);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
