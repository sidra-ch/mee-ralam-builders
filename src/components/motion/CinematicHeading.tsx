"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion, motionTokens, isMobileViewport } from "./gsapConfig";

export interface CinematicHeadingProps {
  /** Array of lines for masked slot reveal, or a single string */
  lines: string | string[];
  /** Optional uppercase eyebrow text rendered above heading */
  eyebrow?: string;
  /** HTML tag for the heading element */
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  /** CSS class for the heading container */
  className?: string;
  /** CSS class for the eyebrow */
  eyebrowClassName?: string;
  /** Zero-based index of line to apply italic styling */
  italicIndex?: number;
  /** Custom class for italic line (defaults to luxury muted gold italic) */
  italicClassName?: string;
  /** Reveal mode: 'masked-line' (slot translation) or 'fade-up' (opacity + translateY) */
  mode?: "masked-line" | "fade-up";
  /** Additional cinematic origin — used sparingly on key headings */
  from?: "left" | "right" | "bottom" | "clip" | "scale" | "blur";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration of the text reveal */
  duration?: number;
  /** Stagger between lines */
  stagger?: number;
  /** ScrollTrigger start threshold */
  threshold?: string;
  /** Optional decorative gold rule below heading */
  showRule?: boolean;
  /** Custom rule class */
  ruleClassName?: string;
}

/**
 * CinematicHeading
 *
 * Implements editorial masked line-slot reveals and restrained typography motion.
 * Designed for luxury architectural editorial typography:
 * - Masked slot reveals prevent character flickering and feel printed-to-life.
 * - Eyebrow gently floats and fades in first.
 * - Gold rule smoothly expands from left after the headline lands.
 * - Reduced motion and mobile viewports are seamlessly accommodated.
 */
export function CinematicHeading({
  lines,
  eyebrow,
  as: Component = "h2",
  className = "font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-[#f5f2ea]",
  eyebrowClassName = "text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]",
  italicIndex,
  italicClassName = "font-normal italic text-[#c0b89a]",
  mode = "masked-line",
  from,
  delay = 0,
  duration = 1.05,
  stagger = 0.12,
  threshold = "top 85%",
  showRule = false,
  ruleClassName = "mt-6 h-px w-12 bg-[#c9a227]/50 origin-left",
}: CinematicHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  const lineArray = Array.isArray(lines) ? lines : [lines];

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = isReducedMotion();
      const lineElements = containerRef.current?.querySelectorAll<HTMLElement>(".cinematic-line-inner");
      const isMobile = isMobileViewport();

      if (isReduced) {
        if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        if (lineElements) gsap.set(lineElements, { opacity: 1, y: 0, yPercent: 0 });
        if (ruleRef.current) gsap.set(ruleRef.current, { opacity: 1, scaleX: 1 });
        return;
      }

      // Initial state
      if (eyebrowRef.current) {
        gsap.set(eyebrowRef.current, { opacity: 0, y: isMobile ? 25 : 12 });
      }

      if (lineElements && lineElements.length > 0) {
        if (from === "left") {
          gsap.set(lineElements, { x: isMobile ? -45 : -60, opacity: 0 });
        } else if (from === "right") {
          gsap.set(lineElements, { x: isMobile ? 45 : 60, opacity: 0 });
        } else if (from === "clip") {
          gsap.set(lineElements, { clipPath: "inset(0 0 100% 0)", opacity: 1 });
        } else if (from === "scale") {
          gsap.set(lineElements, { scale: 0.94, opacity: 0, transformOrigin: "left center" });
        } else if (from === "blur") {
          gsap.set(lineElements, { filter: "blur(8px)", opacity: 0, y: isMobile ? 35 : 12 });
        } else if (mode === "masked-line" || from === "bottom") {
          gsap.set(lineElements, { yPercent: 108, opacity: 0 });
        } else {
          gsap.set(lineElements, { y: isMobile ? 35 : 28, opacity: 0 });
        }
      }

      if (showRule && ruleRef.current) {
        gsap.set(ruleRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: threshold,
          once: true,
        },
        delay,
      });

      if (eyebrowRef.current) {
        tl.to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: motionTokens.easeLuxury,
          },
          0
        );
      }

      if (lineElements && lineElements.length > 0) {
        const lineTarget =
          from === "left" || from === "right"
            ? { x: 0, opacity: 1 }
            : from === "clip"
              ? { clipPath: "inset(0 0 0% 0)", opacity: 1 }
              : from === "scale"
                ? { scale: 1, opacity: 1 }
                : from === "blur"
                  ? { filter: "blur(0px)", opacity: 1, y: 0 }
                  : mode === "masked-line" || from === "bottom"
                    ? { yPercent: 0, opacity: 1 }
                    : { y: 0, opacity: 1 };
        tl.to(
          lineElements,
          {
            ...lineTarget,
            duration,
            stagger,
            ease: motionTokens.easeEditorial,
          },
          eyebrowRef.current ? 0.12 : 0
        );
      }

      if (showRule && ruleRef.current) {
        tl.to(
          ruleRef.current,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: motionTokens.easeEditorial,
          },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, from, mode, showRule, stagger, threshold]);

  return (
    <div ref={containerRef} className="space-y-3">
      {eyebrow && (
        <p ref={eyebrowRef} className={eyebrowClassName}>
          {eyebrow}
        </p>
      )}

      <Component className={className}>
        {lineArray.map((line, idx) => {
          const isItalic = italicIndex === idx;
          if (mode === "masked-line") {
            return (
              <span key={idx} className="block overflow-hidden">
                <span
                  className={`cinematic-line-inner block ${isItalic ? italicClassName : ""}`}
                >
                  {line}
                </span>
              </span>
            );
          }

          return (
            <span
              key={idx}
              className={`cinematic-line-inner block ${isItalic ? italicClassName : ""}`}
            >
              {line}
            </span>
          );
        })}
      </Component>

      {showRule && (
        <div ref={ruleRef} className={ruleClassName} aria-hidden="true" />
      )}
    </div>
  );
}
