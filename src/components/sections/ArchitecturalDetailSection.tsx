"use client";

import { useLayoutEffect, useRef } from "react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "@/components/motion/gsapConfig";
import { CinematicHeading } from "@/components/motion/CinematicHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * ArchitecturalDetailSection
 *
 * A full-bleed cinematic pause — one large architectural photograph, a quiet
 * editorial statement revealed through its centre.
 */
export function ArchitecturalDetailSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="architectural-detail-section relative overflow-hidden bg-[#0a0b0e]"
      aria-label="Architectural Materiality & Detail"
      style={{ minHeight: "520px" }}
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-[#1a1a1a]" />

      {/* ── Full-bleed parallax photograph ────────────────────────────── */}
      <div className="h-[520px] sm:h-[620px] lg:h-[740px] w-full">
        <ParallaxImage
          src="/images/outdoor-project.png"
          alt="Night-time textured façade with ground uplights and planted base"
          sizes="100vw"
          speed={14}
          containerClassName="relative h-full w-full overflow-hidden"
        />
      </div>

      {/* ── Layered atmospheric overlays ──────────────────────────────── */}
      {/* Centre is kept deliberately open so the architecture reads clearly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(10,11,14,0.55) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,11,14,0.90) 0%, rgba(10,11,14,0.40) 28%, transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,11,14,0.55) 0%, transparent 20%)",
        }}
      />

      {/* ── Editorial text — centred, bottom-third of the image ───────── */}
      <div className="absolute inset-0 flex items-end justify-center pb-16 sm:pb-20 lg:pb-24 px-6 text-center">
        <div className="max-w-2xl text-center space-y-5 flex flex-col items-center">
          <CinematicHeading
            eyebrow="Materiality & Craft"
            lines={["Every detail", "has a purpose."]}
            italicIndex={1}
            italicClassName="font-normal italic text-[#c9a227]"
            className="font-display leading-[1.06] text-[#f0ece4] text-center"
            mode="masked-line"
            from="right"
          />
          <ScrollReveal delay={0.25} duration={0.8} direction="up">
            <p className="mx-auto max-w-sm text-sm leading-[1.85] text-[#7a7068]">
              Texture, proportion, and light orchestrate environments that endure beyond trends.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
