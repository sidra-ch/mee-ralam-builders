"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "./gsapConfig";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  yOffset?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: string; // e.g. "top 85%"
  scale?: number;
}

/**
 * Reusable GSAP Scroll Reveal
 * Automatically cleans up ScrollTriggers and timelines on component unmount.
 */
export function ScrollReveal({
  children,
  className = "",
  distance = 24,
  yOffset, // backward compat
  direction = "up",
  duration = 0.85,
  delay = 0,
  stagger = 0.08,
  threshold = "top 88%",
  scale = 1,
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
        gsap.set(elements, { opacity: 1, y: 0, x: 0, scale: 1 });
        return;
      }

      const activeDistance = yOffset ?? distance;
      const dist = isMobile ? Math.min(activeDistance, 35) : activeDistance;

      
      let x = 0;
      let y = 0;
      
      if (direction === "up") y = dist;
      if (direction === "down") y = -dist;
      if (direction === "left") x = dist; // starts right, moves left
      if (direction === "right") x = -dist; // starts left, moves right

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y,
          x,
          scale,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
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
  }, [distance, yOffset, direction, duration, delay, stagger, threshold, scale]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
