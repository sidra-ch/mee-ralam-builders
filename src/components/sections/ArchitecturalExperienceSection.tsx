"use client";

import { useRef } from "react";
import { ArchitecturalScene } from "@/components/three/ArchitecturalScene";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicHeading } from "@/components/motion/CinematicHeading";

/**
 * ArchitecturalExperienceSection
 *
 * Interactive 3D viewport — kept intact for potential future use on a
 * dedicated page or as a standalone feature.
 */
export function ArchitecturalExperienceSection() {
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const sectionRef       = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    pointerTargetRef.current = {
      x: ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      y: -((e.clientY - rect.top)  / rect.height) * 2 + 1,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d0e12] py-20 sm:py-28 lg:py-36"
      aria-label="Interactive Architectural Experience"
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1f1f1f]" />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-[#c9a227]/5 blur-[120px]"
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
        <div className="mb-12 lg:mb-16 max-w-2xl space-y-5">
          <CinematicHeading
            eyebrow="Architectural Experience"
            lines={["Explore the vision", "in spatial detail."]}
            italicIndex={1}
            italicClassName="font-normal italic text-[#c0b89a]"
            className="font-display leading-[1.08] text-[#f5f2ea]"
            mode="masked-line"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-sm leading-[1.85] text-[#706a63]">
              Interact with volume, geometry, and materiality. Discover how natural daylight and warm evening illumination define our architectural compositions.
            </p>
          </ScrollReveal>
        </div>

        {/* 3D canvas */}
        <div
          data-cursor="DRAG TO EXPLORE"
          className="relative h-[480px] sm:h-[580px] lg:h-[680px] w-full overflow-hidden rounded-[1.5rem] border border-[#222222] bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          onMouseMove={handleMouseMove}
        >
          <ArchitecturalScene
            variant="experience"
            pointerTargetRef={pointerTargetRef}
            fallbackImage="/images/img-5.png"
            enableSparkles={false}
          />

          {/* Drag hint */}
          <div className="pointer-events-none absolute bottom-6 left-6 z-10 flex items-center gap-3 rounded-full border border-[#2a2a2a] bg-black/60 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#c9a227] animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#d7d0c7]">
              Drag to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
