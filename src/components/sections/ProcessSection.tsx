"use client";

import { useLayoutEffect, useRef } from "react";
import { processStagesData } from "@/data/process";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicHeading } from "@/components/motion/CinematicHeading";
import { gsap, isReducedMotion } from "@/components/motion/gsapConfig";

export function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!timelineRef.current || !progressBarRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      if (reduced) {
        gsap.set(progressBarRef.current, { scaleY: 1 });
        return;
      }

      // Progress line animation along the timeline
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      className="process-section relative bg-[#111111] py-24 sm:py-32 lg:py-44 border-t border-[#1f1f1f]"
      aria-label="Disciplined Architectural Delivery Process"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 space-y-4 lg:mb-28">
          <CinematicHeading
            eyebrow="Our Process"
            lines="A disciplined path from concept to completion."
            className="max-w-3xl font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-[#f5f2ea]"
            mode="masked-line"
          />
          <ScrollReveal delay={0.15}>
            <p className="max-w-2xl text-base text-[#c7c0b5] sm:text-lg leading-relaxed">
              Every architectural build is underpinned by structured discovery, engineering rigor, transparent milestone delivery, and master craftsmanship.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial Vertical Timeline */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10 lg:pl-16">
          {/* Background Track Line */}
          <div className="absolute left-2 sm:left-4 top-2 bottom-6 w-[2px] bg-[#222222]" />

          {/* Active Gold Progress Bar */}
          <div
            ref={progressBarRef}
            className="absolute left-2 sm:left-4 top-2 bottom-6 w-[2px] bg-gradient-to-b from-[#c9a227] via-[#e59834] to-[#c9a227]"
          />

          {/* Timeline Stages */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {processStagesData.map((stage) => (
              <ScrollReveal
                key={stage.step}
                threshold="top 85%"
                className="relative group"
              >
                {/* Timeline Step Node */}
                <div className="absolute -left-6 sm:-left-10 lg:-left-16 top-1.5 flex h-4 w-4 -translate-x-[7px] items-center justify-center rounded-full border-2 border-[#111111] bg-[#c9a227] shadow-[0_0_12px_rgba(201,162,39,0.5)] transition-transform duration-300 group-hover:scale-125" />

                {/* Stage Content */}
                <div className="rounded-[1.75rem] border border-[#222222] bg-[#141414] p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-[#c9a227]/40 hover:bg-[#171717]">
                  <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    {/* Left: Step Number & Title */}
                    <div className="space-y-2">
                      <p className="font-display text-4xl sm:text-5xl font-light text-[#c9a227]">
                        {stage.step}
                      </p>
                      <h3 className="font-display text-3xl sm:text-4xl text-[#f5f2ea]">
                        {stage.title}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.24em] text-[#a89d92]">
                        {stage.subtitle}
                      </p>
                    </div>

                    {/* Right: Description & Deliverables */}
                    <div className="space-y-6">
                      <p className="text-base text-[#c7c0b5] leading-relaxed">
                        {stage.description}
                      </p>

                      <div className="space-y-2 border-t border-[#222222] pt-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#c9a227]">
                          Stage Deliverables
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {stage.deliverables.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-1 text-xs text-[#d7d0c7]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
