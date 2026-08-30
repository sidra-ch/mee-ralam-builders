"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion } from "./gsapConfig";

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
  duration = 0.8,
  yOffset = 28,
  stagger = 0.08,
  threshold = "top 90%",
}: RevealTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = elementRef.current?.children.length
        ? elementRef.current.children
        : elementRef.current;

      gsap.fromTo(
        targets,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power2.out",
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
