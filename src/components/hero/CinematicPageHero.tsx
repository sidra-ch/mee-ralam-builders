"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, isReducedMotion, isMobileViewport, motionTokens, supportsParallax } from "@/components/motion/gsapConfig";

interface CinematicPageHeroProps {
  /** Short uppercase label above the title */
  eyebrow: string;
  /** Main headline — pass an array for multi-line display */
  title: string | string[];
  /** Optional short supporting description (1–2 sentences) */
  description?: string;
  /** Absolute path to the hero image (from /public) */
  image: string;
  imageAlt: string;
  /** Optional primary CTA */
  cta?: { label: string; href: string };
  /**
   * Controls hero height.
   * "full" = 100vh (default for most pages)
   * "compact" = 65vh (for contact, supplementary pages)
   */
  variant?: "full" | "compact";
}

/**
 * CinematicPageHero
 *
 * Reusable full-viewport cinematic hero for internal pages.
 * Features:
 * - GSAP clip-path image slow reveal on mount
 * - Headline upward sweep + eyebrow/description fade
 * - Subtle scroll parallax on the hero photograph
 * - Dark gradient overlay (preserves photograph visibility)
 * - Reduced-motion: all content visible immediately, no transforms
 * - Priority Next/Image for LCP performance
 */
export function CinematicPageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  cta,
  variant = "full",
}: CinematicPageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const titleLines = Array.isArray(title) ? title : [title];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const isMobile = isMobileViewport();

      if (reduced) {
        // Reduced motion: show everything immediately
        const elementsToReveal = [".cph-eyebrow", ".cph-title-line"];
        if (description) elementsToReveal.push(".cph-description");
        if (cta) elementsToReveal.push(".cph-cta");
        gsap.set(elementsToReveal, { opacity: 1, y: 0 });
        if (imageContainerRef.current) gsap.set(imageContainerRef.current, { clipPath: "inset(0% 0% 0%)" });
        if (imageInnerRef.current) gsap.set(imageInnerRef.current, { scale: 1 });
        return;
      }

      // ── Initial hidden state ──────────────────────────────────────────────
      gsap.set(imageContainerRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap.set(imageInnerRef.current, { scale: 1.06 });
      gsap.set(".cph-eyebrow", { opacity: 0, y: isMobile ? 8 : 14 });
      gsap.set(".cph-title-line", { opacity: 0, y: isMobile ? 14 : 26 });
      if (description) gsap.set(".cph-description", { opacity: 0, y: isMobile ? 8 : 12 });
      if (cta) gsap.set(".cph-cta", { opacity: 0, y: isMobile ? 8 : 12 });

      // ── Entrance timeline ─────────────────────────────────────────────────
      const tl = gsap.timeline();

      tl
        // Image: clip-path reveal (bottom → top)
        .to(
          imageContainerRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.25,
            ease: motionTokens.easeMask,
          },
          0
        )
        // Image inner: settle scale
        .to(
          imageInnerRef.current,
          { scale: 1, duration: 1.6, ease: motionTokens.easeLuxury },
          0
        )
        // Eyebrow fade
        .to(
          ".cph-eyebrow",
          { opacity: 1, y: 0, duration: 0.7, ease: motionTokens.easeLuxury },
          0.45
        )
        // Headline lines sweep up
        .to(
          ".cph-title-line",
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: motionTokens.easeEditorial,
          },
          0.6
        );

      // Description fade (if present)
      if (description) {
        tl.to(
          ".cph-description",
          { opacity: 1, y: 0, duration: 0.7, ease: motionTokens.easeLuxury },
          0.85
        );
      }

      // CTA fade (if present)
      if (cta) {
        tl.to(
          ".cph-cta",
          { opacity: 1, y: 0, duration: 0.6, ease: motionTokens.easeLuxury },
          description ? 0.95 : 0.85
        );
      }

      // ── Scroll parallax on image ──────────────────────────────────────────
      // Image moves slightly slower than scroll — almost subconscious
      if (!supportsParallax()) return;

      gsap.to(imageInnerRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cta, description]);

  const heightClass =
    variant === "compact"
      ? "min-h-[60vh] sm:min-h-[65vh]"
      : "min-h-[90vh] sm:min-h-screen";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-[#0d0e12] ${heightClass}`}
      aria-label={`${eyebrow} page hero`}
    >
      {/* ── Layer 1: Full-bleed architectural photograph ─────────────────── */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div ref={imageInnerRef} className="relative h-[115%] w-full -top-[7.5%]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* ── Layer 2: Cinematic gradient overlays ─────────────────────────── */}
      {/* Bottom-to-top dark: text legibility + cinematic depth */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0d0e12]/92 via-[#0d0e12]/40 to-transparent" />
      {/* Left side: reinforces text column */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#0d0e12]/80 via-[#0d0e12]/20 to-transparent" />

      {/* ── Layer 3: Hero content ─────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full items-end pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-12 lg:px-20 xl:px-28"
        style={{ minHeight: "inherit" }}
      >
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow */}
          <div className="cph-eyebrow flex items-center gap-3">
            <span
              className="inline-block h-[1px] w-8 bg-[#c9a227]"
              aria-hidden="true"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
              {eyebrow}
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-display leading-[1.06] text-[#f5f2ea] tracking-tight text-4xl sm:text-6xl lg:text-7xl xl:text-8xl">
            {titleLines.map((line, i) => (
              <span key={i} className="cph-title-line block">
                {line}
              </span>
            ))}
          </h1>

          {/* Description */}
          {description && (
            <p className="cph-description max-w-xl text-base sm:text-lg text-[#c7c0b5] leading-relaxed">
              {description}
            </p>
          )}

          {/* CTA */}
          {cta && (
            <div className="cph-cta pt-2">
              <Link
                href={cta.href}
                className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5"
              >
                {cta.label}
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Layer 4: Subtle gold line at bottom ──────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[1px] bg-gradient-to-r from-[#c9a227]/30 via-[#c9a227]/10 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
