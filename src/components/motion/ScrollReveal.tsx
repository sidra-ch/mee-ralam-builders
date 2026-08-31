"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "./gsapConfig";

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
  yOffset = 24,
  duration = 0.85,
  delay = 0,
  stagger = 0.08,
  threshold = "top 88%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = isReducedMotion();
      const isMobile = isMobileViewport();
      const elements = containerRef.current?.children;
      if (!elements || elements.length === 0) return;

      if (isReduced) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }

      const activeY = isMobile ? Math.min(yOffset, 14) : yOffset;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: activeY,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: motionTokens.easeEditorial,
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
