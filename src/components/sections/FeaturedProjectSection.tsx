"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "@/components/motion/gsapConfig";

/**
 * FeaturedProjectSection
 *
 * Magazine-cover presentation of the flagship project.
 */
export function FeaturedProjectSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLSpanElement>(null);
  const metaRef     = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);

  const featured = projectsData.find((p) => p.featured) ?? projectsData[0];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = isReducedMotion();
      const isMobile = isMobileViewport();

      if (isReduced) {
        gsap.set([eyebrowRef.current, metaRef.current, cardRef.current], { opacity: 1, y: 0 });
        gsap.set(titleRef.current, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(eyebrowRef.current, { opacity: 0, y: isMobile ? 8 : 12 });
      gsap.set(titleRef.current,   { yPercent: 105, opacity: 0 });
      gsap.set(metaRef.current,    { opacity: 0, y: isMobile ? 6 : 10 });
      gsap.set(cardRef.current,    { opacity: 0, y: isMobile ? 12 : 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   "top 80%",
          once:    true,
        },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.65, ease: motionTokens.easeLuxury })
        .to(titleRef.current,   { yPercent: 0, opacity: 1, duration: 1.05, ease: motionTokens.easeEditorial }, 0.12)
        .to(metaRef.current,    { opacity: 1, y: 0, duration: 0.65, ease: motionTokens.easeLuxury }, 0.35)
        .to(cardRef.current,    { opacity: 1, y: 0, duration: 0.9, ease: motionTokens.easeEditorial }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="featured-project-section relative bg-[#0d0e12] py-28 sm:py-36 lg:py-52"
      aria-label="Flagship Featured Project"
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1a1a1a]" />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-10 lg:mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          {/* Left: eyebrow + title slot-reveal */}
          <div className="space-y-3">
            <p
              ref={eyebrowRef}
              className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]"
            >
              Featured Project
            </p>
            {/* Slot wrapper — overflow:hidden so the span sweeps up through it */}
            <div className="overflow-hidden">
              <span
                ref={titleRef}
                className="block font-display leading-[1.06] text-[#f5f2ea]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.01em" }}
              >
                {featured.title}
              </span>
            </div>
          </div>

          {/* Right: category + scope — muted meta */}
          <div
            ref={metaRef}
            className="flex items-center gap-4 pb-1"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]">
              {featured.category}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-[#2e2e2e]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#3e3a36]">
              {featured.scope}
            </span>
          </div>
        </div>

        {/* ── Full-bleed image + floating card ─────────────────────────── */}
        <div className="relative">
          <CinematicImage
            src={featured.heroImage}
            alt={featured.alt}
            aspectRatio="h-[500px] sm:h-[620px] lg:h-[760px]"
            sizes="(max-width: 1280px) 100vw, 1280px"
            cursorLabel="VIEW PROJECT"
            parallaxSpeed={12}
            containerClassName="relative overflow-hidden rounded-[1.5rem] border border-[#1e1e1e] bg-[#0a0b0e]"
          />

          {/* ── Floating glass card — bottom-left ───────────────────────── */}
          <div
            ref={cardRef}
            className="
              mt-6
              lg:mt-0 lg:absolute lg:bottom-10 lg:left-10
              z-10 w-full max-w-sm lg:max-w-md
              rounded-[1.25rem]
              border border-[#282828]
              bg-[#0f0f0f]/95
              p-7 sm:p-8
              backdrop-blur-xl
              shadow-[0_24px_56px_rgba(0,0,0,0.60)]
            "
          >
            {/* Description — raised contrast: #9a9289 → #b8b0a6 */}
            <p className="mb-5 text-sm leading-[1.8] text-[#b8b0a6]">
              {featured.description}
            </p>

            {/* Hairline */}
            <div aria-hidden="true" className="mb-5 h-px bg-[#232323]" />

            <Link
              href={`/projects/${featured.id}`}
              className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] transition-all duration-300 hover:gap-5"
            >
              Explore project
              <span
                className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
