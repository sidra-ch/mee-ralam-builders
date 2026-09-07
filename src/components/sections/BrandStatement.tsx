"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "@/components/motion/gsapConfig";

/**
 * BrandStatement
 *
 * A single full-width typographic pause between the hero and the first content
 * section. It functions as a visual exhale — wide whitespace, a large editorial
 * statement, and nothing else. No images, no cards, no icons.
 *
 * The entrance is scroll-triggered: the headline reveals line by line from a
 * clip-path mask so each word sweeps upward through a slot — a classic
 * editorial print technique translated into motion.
 */
export function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = isReducedMotion();
      const isMobile = isMobileViewport();
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);

      if (isReduced) {
        gsap.set(lines, { yPercent: 0, opacity: 1 });
        gsap.set(rulerRef.current, { scaleX: 1, opacity: 1 });
        gsap.set(bodyRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Each line sits inside an overflow-hidden wrapper; it starts below the
      // slot and translates upward into view — a masked line reveal.
      gsap.set(lines, { yPercent: 105, opacity: 0 });
      gsap.set(rulerRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      gsap.set(bodyRef.current, { opacity: 0, y: isMobile ? 8 : 14 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.13,
        ease: motionTokens.easeEditorial,
      })
        .to(rulerRef.current, { scaleX: 1, opacity: 1, duration: 0.9, ease: motionTokens.easeEditorial }, 0.28)
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.9, ease: motionTokens.easeLuxury }, 0.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0b0e] pt-10 pb-14 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-20 xl:pb-24"
      aria-label="Brand philosophy statement"
    >
      {/*
        No top border — background matches hero bottom (#0a0b0e) so the
        transition is invisible. The hero's bottom gradient dissolves into
        this section naturally.

        A gradient fade at the bottom transitions from this deep tone into
        the ApproachSection's #111111 over ~120px.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, #111111)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end">

          {/* ── Headline ─────────────────────────────────────────────── */}
          <div>
            {/*
              Each line is wrapped in an overflow-hidden slot so the
              inner span can translate upward through it (masked reveal).
            */}
            <h2 className="font-display leading-[1.06] text-[#f5f2ea]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.01em" }}>
              <span className="block overflow-hidden">
                <span ref={line1Ref} className="block">
                  We shape spaces
                </span>
              </span>
              <span className="block overflow-hidden">
                <span ref={line2Ref} className="block">
                  that feel
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={line3Ref}
                  className="block font-normal italic text-[#c9a227]"
                >
                  inevitable.
                </span>
              </span>
            </h2>

            {/* Thin gold rule — appears after headline */}
            <div
              ref={rulerRef}
              className="mt-10 h-px w-16 bg-[#c9a227]/50 origin-left"
              aria-hidden="true"
            />
          </div>

          {/* ── Right column: micro-copy ─────────────────────────────── */}
          <div className="max-w-xs lg:pb-3">
            <p
              ref={bodyRef}
              className="text-sm leading-[1.85] text-[#857e77]"
            >
              Architecture with clarity, craft, and precision.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
