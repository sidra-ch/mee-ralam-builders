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
  easeEditorial: "power3.out",
  easeLuxury: "power2.out",
  easeMask: "power3.inOut",
  easeCinematic: "power3.inOut",
  durationQuick: 0.4,
  durationMedium: 0.8,
  durationSlow: 1.2,
  durationCinematic: 1.4,
} as const;

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/** Parallax is reserved for larger, pointer-led viewports. */
export function supportsParallax(): boolean {
  if (typeof window === "undefined") return false;
  return !isReducedMotion() && window.matchMedia("(min-width: 768px)").matches;
}
