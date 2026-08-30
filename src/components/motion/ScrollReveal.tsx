"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion } from "./gsapConfig";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: string; // e.g. "top 85%"
}

/**
 * Reusable GSAP Scroll Reveal
 * Automatically cleans up ScrollTriggers and timelines on component unmount.
 */
export function ScrollReveal({
  children,
  className = "",
  yOffset = 32,
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
  threshold = "top 88%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.children;
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: threshold,
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [yOffset, duration, delay, stagger, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
