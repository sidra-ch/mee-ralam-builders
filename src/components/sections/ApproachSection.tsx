"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { CinematicHeading } from "@/components/motion/CinematicHeading";

/**
 * ApproachSection
 *
 * Two-column editorial layout: dominant architecture photograph left,
 * a smaller detail image + philosophy copy right.
 *
 * Refinements:
 * – Pure typographic hierarchy: Eyebrow -> Masked Heading -> Supporting copy -> Architectural images.
 * – Spacing increased so the section breathes.
 */
export function ApproachSection() {
  return (
    <section
      id="about"
      className="approach-section relative bg-[#111111] py-28 sm:py-36 lg:py-48"
      aria-label="Our Approach & Philosophy"
    >
      {/* Hairline top border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[#1f1f1f]"
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">

        {/* ── Section intro — typographic hierarchy ── */}
        <div className="mb-20 lg:mb-28 max-w-2xl space-y-5">
          <CinematicHeading
            eyebrow="Our Approach"
            lines={["Design with purpose.", "Build with precision."]}
            italicIndex={1}
            italicClassName="font-normal italic text-[#c0b89a]"
            className="font-display leading-[1.08] text-[#f5f2ea]"
            mode="masked-line"
          />
          <ScrollReveal delay={0.2} duration={0.85}>
            <p className="max-w-xl text-sm leading-[1.85] text-[#8a8279] sm:text-base">
              Every structure we create is shaped around spatial proportion, natural daylight,
              timeless materiality, and an uncompromising dedication to structural execution.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Asymmetric two-column composition ─────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-12">

          {/* Primary: large architecture photograph */}
          <CinematicImage
            src="/images/img-13.png"
            alt="Contemporary luxury residence façade at dusk with warm entrance lighting"
            aspectRatio="h-[480px] sm:h-[560px] lg:h-[680px]"
            sizes="(max-width: 1024px) 100vw, 58vw"
            cursorLabel="EXPLORE"
            parallaxSpeed={12}
            containerClassName="relative overflow-hidden rounded-[1.5rem] border border-[#222222] bg-[#0d0e12]"
          />

          {/* Secondary column: detail image + copy */}
          <div className="flex flex-col gap-8 lg:pt-16">

            {/* Detail photograph — hidden on small mobile, visible tablet+ */}
            <div className="hidden sm:block">
              <CinematicImage
                src="/images/img-15.png"
                alt="Bespoke interior joinery and warm ambient lighting detail"
                aspectRatio="h-60 sm:h-64 lg:h-72"
                sizes="(max-width: 1024px) 100vw, 42vw"
                cursorLabel="EXPLORE"
                parallaxSpeed={8}
                containerClassName="relative overflow-hidden rounded-[1.5rem] border border-[#222222] bg-[#0d0e12]"
              />
            </div>

            {/* Philosophy copy */}
            <ScrollReveal delay={0.18} className="space-y-6">
              <h3
                className="font-display leading-snug text-[#e8e2d8]"
                style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.75rem)" }}
              >
                Harmonising structural clarity with refined daily living.
              </h3>
              <p className="text-sm leading-[1.85] text-[#7a7470] sm:text-base">
                From structural foundations to bespoke interior joinery, our integrated practice
                coordinates every discipline. We maintain direct oversight throughout planning,
                engineering, and fine finishing to ensure design intent remains pure.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] transition-all duration-300 hover:gap-5"
                >
                  Read our story
                  <span
                    className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
