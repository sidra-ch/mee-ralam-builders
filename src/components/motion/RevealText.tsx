"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "./gsapConfig";

interface RevealTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  stagger?: number;
  threshold?: string;
}

/**
 * Reusable GSAP Text Reveal Component
 * Smoothly translates and fades in text lines or elements on scroll.
 */
export function RevealText({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 0.9,
  yOffset = 24,
  stagger = 0.08,
  threshold = "top 90%",
}: RevealTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = isReducedMotion();
      const isMobile = isMobileViewport();
      const targets = elementRef.current?.children.length
        ? elementRef.current.children
        : elementRef.current;

      if (isReduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      const activeY = isMobile ? Math.min(yOffset, 14) : yOffset;

      gsap.fromTo(
        targets,
        { opacity: 0, y: activeY },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: motionTokens.easeEditorial,
          scrollTrigger: {
            trigger: elementRef.current,
            start: threshold,
            once: true,
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay, duration, yOffset, stagger, threshold]);

  return (
    <Component ref={elementRef as unknown as React.RefObject<HTMLParagraphElement>} className={className}>
      {children}
    </Component>
  );
}
