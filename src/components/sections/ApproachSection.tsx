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
      className="approach-section relative bg-[#111111] py-16 sm:py-24 lg:py-32"
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
            eyebrow="ABOUT"
            lines={["Designing spaces with", "purpose, character", "and timeless detail."]}
            italicIndex={2}
            italicClassName="font-normal italic text-[#c0b89a]"
            className="font-display leading-[1.08] text-[#f5f2ea]"
            mode="masked-line"
            from="left"
          />
        </div>

        {/* ── Asymmetric two-column composition ─────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-12">

          {/* Primary: large architecture photograph */}
          <CinematicImage
            src="/images/done-project-2.png"
            alt="Completed contemporary residence at dusk with warm exterior lighting"
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
                src="/images/planer-3.png"
                alt="Architects reviewing a house model over construction drawings"
                aspectRatio="h-60 sm:h-64 lg:h-72"
                sizes="(max-width: 1024px) 100vw, 42vw"
                cursorLabel="EXPLORE"
                parallaxSpeed={8}
                containerClassName="relative overflow-hidden rounded-[1.5rem] border border-[#222222] bg-[#0d0e12]"
              />
            </div>

            {/* Philosophy copy */}
            <ScrollReveal delay={0.18} className="space-y-6">
              <ul className="space-y-3 font-display text-2xl sm:text-3xl text-[#e8e2d8]">
                <li>Architecture</li>
                <li className="text-[#c0b89a] italic">Interior Design</li>
                <li>Construction</li>
              </ul>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] transition-all duration-300 hover:gap-5"
                >
                  Learn more
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
