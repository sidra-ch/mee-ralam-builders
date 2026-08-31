"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "@/components/motion/gsapConfig";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * CtaSection
 *
 * The conclusion of the homepage visual story.
 */
export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const rulerRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = isReducedMotion();
      const isMobile = isMobileViewport();
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean);

      if (isReduced) {
        gsap.set(lines, { yPercent: 0, opacity: 1 });
        gsap.set([bodyRef.current, ctaRef.current], { opacity: 1, y: 0 });
        gsap.set(rulerRef.current, { scaleX: 1, opacity: 1 });
        return;
      }

      gsap.set(lines,          { yPercent: 108, opacity: 0 });
      gsap.set(bodyRef.current,  { opacity: 0, y: isMobile ? 8 : 14 });
      gsap.set(ctaRef.current,   { opacity: 0, y: isMobile ? 8 : 14 });
      gsap.set(rulerRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   "top 72%",
          once:    true,
        },
      });

      tl.to(lines, {
        yPercent: 0,
        opacity:  1,
        duration: 1.1,
        stagger:  0.13,
        ease:     motionTokens.easeEditorial,
      })
        .to(bodyRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: motionTokens.easeLuxury }, 0.4)
        .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: motionTokens.easeLuxury }, 0.6)
        .to(rulerRef.current, { scaleX: 1, opacity: 1, duration: 1.0, ease: motionTokens.easeEditorial }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="final-cta relative overflow-hidden bg-[#0d0d0d]"
      aria-label="Start a Project with Meer Alam Builders"
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-[#1a1a1a]" />

      {/* ── Full-bleed architectural image ──────────────────────────────── */}
      {/*
        Uses img-22.png — previously unused asset.
        A strong bottom gradient dissolves the image into the text section below,
        maintaining legibility without a hard boundary.
      */}
      <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full overflow-hidden">
        <Image
          src="/images/img-22.png"
          alt="Architectural interior — refined spatial composition"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient dissolve at bottom — merges into section bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.55) 30%, rgba(13,13,13,0.10) 60%, transparent 100%)",
          }}
        />
        {/* Subtle edge vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 120px rgba(13,13,13,0.50)" }}
        />
      </div>

      {/* ── Text + CTA block ──────────────────────────────────────────────
          Sits below the image with negative top margin so it visually
          overlaps the image's dissolve zone — feels continuous.           */}
      <div className="relative -mt-24 sm:-mt-28 lg:-mt-32 pb-32 sm:pb-40 lg:pb-52">
        {/* Ambient glow under headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[#c9a227]/6 blur-[140px]"
        />

        <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
          <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end">

            {/* ── Headline + body ────────────────────────────────────── */}
            <div className="space-y-8">
              <h2
                className="font-display leading-[1.04] text-[#f5f2ea]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6.2rem)", letterSpacing: "-0.015em" }}
              >
                <span className="block overflow-hidden">
                  <span ref={line1Ref} className="block">
                    Let&apos;s create your
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span ref={line2Ref} className="block font-normal italic text-[#c9a227]">
                    next space.
                  </span>
                </span>
              </h2>

              <p
                ref={bodyRef}
                className="max-w-md text-sm leading-[1.85] text-[#5e5852]"
              >
                Discuss your vision, site, and brief with our team — we respond within one working day.
              </p>

              {/* Gold rule — closing mark */}
              <div
                ref={rulerRef}
                className="h-px w-14 bg-[#c9a227]/40 origin-left"
                aria-hidden="true"
              />
            </div>

            {/* ── Single CTA ─────────────────────────────────────────── */}
            <div ref={ctaRef} className="lg:pb-4">
              <Magnetic strength={6}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all duration-300 hover:gap-6"
                >
                  Book a consultation
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a227]/50 text-base transition-all duration-300 group-hover:border-[#c9a227] group-hover:bg-[#c9a227]/10 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
