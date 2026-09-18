"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { InteractiveHeroScene } from "@/components/three/InteractiveHeroScene";
import { gsap, isReducedMotion, isMobileViewport, motionTokens, supportsParallax } from "@/components/motion/gsapConfig";
import { Magnetic } from "@/components/motion/Magnetic";

interface CinematicHeroProps {
  onAnimationComplete?: () => void;
}

/**
 * CinematicHero — Phase 11 & Phase 15 refinement
 *
 * Architecture decisions:
 *
 * SCROLL BEHAVIOUR
 * The image layer is position:sticky so it stays locked to the top of the
 * viewport as the page scrolls. The hero section itself is taller than 100vh
 * (specifically 160vh). The first 100vh shows the full hero. As the user
 * scrolls the remaining 60vh, the text content has already faded (scrub),
 * the image stays pinned, and the next section slides up over it.
 * This gives a cinematic "camera holds while the world moves" feeling.
 * On mobile the sticky behaviour is disabled — standard scroll is used.
 *
 * OVERLAYS — five independent layers:
 *  1. Left-side scrim      — protects typography on the left
 *  2. Bottom gradient      — grounds the frame
 *  3. Top gradient         — integrates with the sticky header
 *  4. Edge vignette        — all four edges, very subtle
 *  5. Radial centre clear  — keeps the architecture visible in the middle
 *
 * TYPOGRAPHY
 * Each headline line sits inside an overflow:hidden slot. On entrance the
 * inner span translates from yPercent:108 → 0, creating a clean masked
 * line-reveal (print editorial technique). No per-character animation.
 *
 * SCROLL EXIT
 * The text column fades and drifts upward as user scrolls away (scrub).
 * The 3D canvas scales very slightly outward for a push-back feel.
 */
export function CinematicHero({ onAnimationComplete }: CinematicHeroProps) {
  const heroSectionRef  = useRef<HTMLElement>(null);
  const stickyFrameRef  = useRef<HTMLDivElement>(null);
  const heroContentRef  = useRef<HTMLDivElement>(null);
  const hero3DRef       = useRef<HTMLDivElement>(null);

  const line1Ref        = useRef<HTMLSpanElement>(null);
  const line2Ref        = useRef<HTMLSpanElement>(null);
  const line3Ref        = useRef<HTMLSpanElement>(null);
  const locationRef     = useRef<HTMLParagraphElement>(null);
  const ruleRef         = useRef<HTMLDivElement>(null);
  const descRef         = useRef<HTMLParagraphElement>(null);
  const ctaRef          = useRef<HTMLDivElement>(null);
  const scrollHintRef   = useRef<HTMLDivElement>(null);

  const pointerTargetRef   = useRef({ x: 0, y: 0 });
  const pointerVelocityRef = useRef(0);
  const previousPointerRef = useRef({ x: 0, y: 0, time: 0 });

  // ── Mouse tracking (desktop only) ──────────────────────────────────────
  useEffect(() => {
    if (!supportsParallax()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = heroSectionRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const x = ((e.clientX - bounds.left) / bounds.width)  * 2 - 1;
      const y = -((e.clientY - bounds.top)  / bounds.height) * 2 + 1;
      const now      = performance.now();
      const prev     = previousPointerRef.current;
      const elapsed  = Math.max(now - prev.time, 16);
      const distance = Math.hypot(x - prev.x, y - prev.y);

      pointerTargetRef.current   = { x, y };
      pointerVelocityRef.current = Math.min((distance / elapsed) * 20, 1);
      previousPointerRef.current = { x, y, time: now };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── GSAP entrance + scroll exit ────────────────────────────────────────
  useLayoutEffect(() => {
    if (!heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const isMobile = isMobileViewport();
      const lines   = [line1Ref.current, line2Ref.current, line3Ref.current];

      // ── Instant reveal for reduced-motion users ──────────────────
      if (reduced) {
        gsap.set(
          [locationRef.current, ...lines, ruleRef.current,
           descRef.current, ctaRef.current, scrollHintRef.current],
          { opacity: 1, y: 0, yPercent: 0, scaleX: 1 }
        );
        onAnimationComplete?.();
        return;
      }

      // ── Initial states ────────────────────────────────────────────
      gsap.set(heroContentRef.current,  { opacity: 0 });
      gsap.set(locationRef.current,     { opacity: 0, y: isMobile ? 8 : 14 });
      gsap.set(lines,                   { yPercent: 108, opacity: 0 });
      gsap.set(ruleRef.current,         { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      gsap.set(descRef.current,         { opacity: 0, y: isMobile ? 8 : 14 });
      gsap.set(ctaRef.current,          { opacity: 0, y: isMobile ? 8 : 12 });
      gsap.set(scrollHintRef.current,   { opacity: 0 });
      gsap.set(hero3DRef.current,       { scale: 1.05 });

      // ── Cinematic entrance sequence ───────────────────────────────
      // Delay 0.4s to let the WebGL texture initialize cleanly
      const tl = gsap.timeline({ delay: 0.4, onComplete: onAnimationComplete });

      tl
        .to(hero3DRef.current,      { scale: 1, duration: 2.2, ease: "power2.out" }, 0)
        .to(heroContentRef.current, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0)
        .to(locationRef.current,    { opacity: 1, y: 0, duration: 0.75, ease: motionTokens.easeLuxury }, 0.1)
        // Slot-reveal: inner span translates up through overflow:hidden wrapper
        .to(lines, {
          yPercent: 0,
          opacity:  1,
          duration: 1.05,
          stagger:  0.13,
          ease:     motionTokens.easeEditorial,
        }, 0.22)
        .to(ruleRef.current,  { scaleX: 1, opacity: 1, duration: 0.9,  ease: motionTokens.easeEditorial }, 0.45)
        .to(descRef.current,  { opacity: 1, y: 0,      duration: 0.85, ease: motionTokens.easeLuxury }, 0.7)
        .to(ctaRef.current,   { opacity: 1, y: 0,      duration: 0.8,  ease: motionTokens.easeLuxury }, 0.9)
        .to(scrollHintRef.current, { opacity: 1, duration: 1.1, ease: "power1.out" }, 1.3);

      // ── Scroll exit — desktop only ────────────────────────────────
      if (!supportsParallax()) return;

      // Text fades and lifts as user scrolls into the hero's extra 60vh
      gsap.to(heroContentRef.current, {
        yPercent:  -18,
        opacity:   0,
        ease:      "none",
        scrollTrigger: {
          trigger:   heroSectionRef.current,
          start:     "top top",
          end:       "50% top",
          scrub:     1.4,
        },
      });

      // The 3D canvas breathes very gently outward — imperceptible zoom
      // that reinforces "world continues behind the page"
      gsap.to(hero3DRef.current, {
        scale:    1.04,
        ease:     "none",
        scrollTrigger: {
          trigger:   heroSectionRef.current,
          start:     "top top",
          end:       "bottom top",
          scrub:     1.2,
        },
      });

      // Scroll hint fades quickly so it doesn't linger
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        ease:    "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start:   "top top",
          end:     "12% top",
          scrub:   0.8,
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [onAnimationComplete]);

  return (
    /*
     * The section is 160vh tall on desktop so scrolling through it
     * takes 60vh of "dwell time" while the image stays pinned.
     * On mobile we revert to 100svh for clean single-viewport fill.
     */
    <section
      ref={heroSectionRef}
      className="
        relative w-full
        h-[100svh] min-h-[100svh]
        lg:h-[160vh]
        bg-[#0a0b0e]
      "
      aria-label="Cinematic Architectural Hero"
    >
      {/*
       * Sticky frame — stays pinned to the top for the full 160vh scroll.
       * Everything visual lives inside here.
       * On mobile (< lg) sticky is effectively the same as relative since
       * the section is only 100svh.
       */}
      <div
        ref={stickyFrameRef}
        className="
          sticky top-0
          h-[100svh] min-h-[100svh]
          w-full overflow-hidden
        "
      >
        {/* ── Layer 0: WebGL / fallback image ──────────────────────────── */}
        <div ref={hero3DRef} className="absolute inset-0 z-0">
          <InteractiveHeroScene
            image="/images/hero-villa.png"
            pointerRef={pointerTargetRef}
            velocityRef={pointerVelocityRef}
          />
        </div>

        {/* ── Layer 1: Left-side scrim ──────────────────────────────────── */}
        {/* Protects the left 60% of the frame where typography lives */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to right, rgba(10,11,14,0.88) 0%, rgba(10,11,14,0.65) 28%, rgba(10,11,14,0.22) 56%, transparent 80%)",
          }}
        />

        {/* ── Layer 2: Bottom gradient ──────────────────────────────────── */}
        {/* Grounds the frame; heavy at base to anchor the text column */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to top, rgba(10,11,14,0.82) 0%, rgba(10,11,14,0.28) 24%, transparent 50%)",
          }}
        />

        {/* ── Layer 3: Top gradient ─────────────────────────────────────── */}
        {/* Blends the sticky header into the hero so it feels embedded */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,11,14,0.55) 0%, transparent 16%)",
          }}
        />

        {/* ── Layer 4: Edge vignette ────────────────────────────────────── */}
        {/* Very subtle — just darkens the four perimeter edges to give the
            impression of a lens/cinema frame. Keeps attention on architecture. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            boxShadow: "inset 0 0 140px rgba(10,11,14,0.55)",
          }}
        />

        {/* ── Layer 5: Typography ──────────────────────────────────────────
            Sits in the left-centre of the sticky viewport.
            On mobile we drop slightly toward the bottom-left.               */}
        <div
          ref={heroContentRef}
          className="
            relative z-10
            flex h-full flex-col justify-end
            px-5 pb-16 pt-24
            sm:px-12 sm:pb-20
            lg:justify-center lg:px-20 lg:pb-0 lg:pt-0
            xl:px-28
          "
        >
          <div className="max-w-[480px] sm:max-w-[580px] lg:max-w-[660px]">

            {/* Location label */}
            <p
              ref={locationRef}
              className="mb-3 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.32em] text-[#c9a227] sm:mb-4 sm:gap-3 sm:text-[9px] sm:tracking-[0.36em] md:mb-6 md:gap-3 md:text-[10px] md:tracking-[0.40em]"
            >
              <span className="h-px w-7 bg-[#c9a227]/80" aria-hidden="true" />
              Rawalpindi, Pakistan
            </p>

            {/* Headline — each line inside overflow:hidden slot */}
            <h1
              className="font-display leading-[1.04] text-[#f0ece4]"
              style={{
                fontSize:      "clamp(1.8rem, 5.5vw, 5.2rem)",
                letterSpacing: "-0.015em",
              }}
            >
              <span className="block overflow-hidden">
                <span ref={line1Ref} className="block">We shape spaces</span>
              </span>
              <span className="block overflow-hidden">
                <span ref={line2Ref} className="block">that endure</span>
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={line3Ref}
                  className="block font-normal italic"
                  style={{ color: "#c9b98a" }}
                >
                  beyond trends.
                </span>
              </span>
            </h1>

            {/* Gold rule */}
            <div
              ref={ruleRef}
              className="mt-8 mb-6 h-px w-10 bg-[#c9a227]/50 origin-left"
              aria-hidden="true"
            />

            {/* One-line supporting copy */}
            <p
              ref={descRef}
              className="max-w-[400px] text-sm leading-[1.85] text-[#9a9289] sm:text-base"
            >
              Architecture, construction, and interior design —{" "}
              integrated under one practice.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-5">
              {/* Primary — underline style, very restrained */}
              <Link
                href="/projects"
                className="
                  group inline-flex items-center gap-3
                  border-b border-[#c9a227]/60 pb-0.5
                  text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]
                  transition-all duration-300 hover:gap-5 hover:border-[#c9a227]
                "
              >
                View our work
                <span
                  className="text-sm transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              {/* Secondary — ghost, minimal */}
              <Magnetic strength={5}>
                <Link
                  href="/contact"
                  className="
                    inline-flex items-center
                    border border-[#32302d] bg-[#0a0b0e]/60 backdrop-blur-sm
                    px-6 py-2.5
                    text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c7c0b5]
                    transition-all duration-300
                    hover:border-[#c9a227]/50 hover:text-[#f0ece4]
                  "
                >
                  Book a consultation
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* ── Layer 6: Scroll indicator ─────────────────────────────────── */}
        {/*
          Pinned bottom-left — aligns with the typography column rather than
          centred, which feels more composed and less generic.
        */}
        <div
          ref={scrollHintRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute bottom-7 left-6 z-20
            flex items-center gap-3
            sm:left-12 lg:left-20 xl:left-28
          "
        >
          <div className="h-10 w-px overflow-hidden bg-[#1e1c19]">
            <div
              className="h-full w-full bg-gradient-to-b from-[#c9a227] to-transparent"
              style={{ animation: "heroScrollLine 2.2s ease-in-out infinite" }}
            />
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.38em] text-[#5a5450]">
            Scroll
          </span>
        </div>

        {/* Year marker — bottom-right, extremely quiet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-7 right-6 z-20 hidden sm:block"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#302e2b]">
            Meer Alam Builders
          </p>
        </div>
      </div>

      {/* Inline keyframe — lives inside the hero section */}
      <style>{`
        @keyframes heroScrollLine {
          0%   { transform: translateY(-100%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
