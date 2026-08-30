"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered only once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const motionTokens = {
  ease: "power2.out",
  easeCinematic: "power3.inOut",
  durationQuick: 0.4,
  durationMedium: 0.8,
  durationSlow: 1.2,
} as const;

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Parallax is reserved for larger, pointer-led viewports. */
export function supportsParallax(): boolean {
  if (typeof window === "undefined") return false;
  return !isReducedMotion() && window.matchMedia("(min-width: 768px)").matches;
}
