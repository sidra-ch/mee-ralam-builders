"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface SceneFallbackProps {
  imageSrc?: string;
  alt?: string;
  className?: string;
}

/**
 * SceneFallback
 *
 * Shown on mobile, tablet, and any environment where WebGL is unavailable.
 *
 * Two enhancements over the plain next/image version:
 *
 * 1. KEN BURNS — on mount the image slowly scales from 1.0 → 1.06 over
 *    ~12 seconds using a CSS animation. This gives the still image
 *    a sense of slow life without any JS overhead or motion library.
 *    The animation runs once then holds at the final scale.
 *
 * 2. CSS SCROLL PARALLAX — a lightweight scroll listener updates a CSS
 *    custom property (--scroll-y) on the container. The image is translated
 *    by a fraction of that value via inline style, creating a gentle
 *    parallax effect (image moves slower than the page).
 *    On reduced-motion, neither effect is applied.
 *
 * The fallback keeps the same overlay treatment as the WebGL version so
 * the hero overlays and typography remain properly legible on all devices.
 */
export function SceneFallback({
  imageSrc = "/images/done-project-2.png",
  alt      = "Meer Alam Builders — Luxury Architecture & Construction, Lahore",
  className = "",
}: SceneFallbackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);

  // Scroll parallax — only on devices that support it and respect motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    const imageEl   = imageRef.current;
    if (!container || !imageEl) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect        = container.getBoundingClientRect();
        // How far through the viewport the container top has scrolled
        const scrollRatio = -rect.top / window.innerHeight;
        // Translate up by at most 5% of the image height — very restrained
        const yShift      = scrollRatio * 5;
        imageEl.style.transform = `translateY(${yShift}%) scale(1.07)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden bg-[#0a0b0e] ${className}`}
    >
      {/*
        Image wrapper — slightly oversized (scale-[1.07] initial) so the
        scroll parallax never reveals an edge.
        Ken Burns animation runs via CSS keyframe defined in globals.css.
        prefers-reduced-motion: globals.css disables it automatically.
      */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          transform:        "translateY(0%) scale(1.07)",
          willChange:       "transform",
          transformOrigin:  "center center",
          animation:        "kenBurnsHero 14s ease-out forwards",
        }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Overlay stack — matches the WebGL hero overlay layers */}
      {/* Left scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,11,14,0.88) 0%, rgba(10,11,14,0.65) 28%, rgba(10,11,14,0.22) 56%, transparent 80%)",
        }}
      />
      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,11,14,0.82) 0%, rgba(10,11,14,0.28) 24%, transparent 50%)",
        }}
      />
      {/* Top gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,11,14,0.55) 0%, transparent 16%)",
        }}
      />
      {/* Edge vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 140px rgba(10,11,14,0.55)" }}
      />

      {/* Keyframe definition — scoped to this component */}
      <style>{`
        @keyframes kenBurnsHero {
          from { transform: translateY(0%) scale(1.0);   }
          to   { transform: translateY(-1%) scale(1.07); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes kenBurnsHero {
            from { transform: none; }
            to   { transform: none; }
          }
        }
      `}</style>
    </div>
  );
}
