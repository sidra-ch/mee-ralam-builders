"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import {
  gsap,
  isMobileViewport,
  isReducedMotion,
  motionTokens,
  supportsParallax,
} from "@/components/motion/gsapConfig";

interface ServiceDetailHeroProps {
  /** Two-digit service number, e.g. "02" */
  number: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

/**
 * ServiceDetailHero
 *
 * Single dominant photograph with a masked reveal, a slow scale settle and a
 * restrained scroll parallax. One image only — no slideshow, no swapping.
 */
export function ServiceDetailHero({
  number,
  title,
  subtitle,
  image,
  imageAlt,
}: ServiceDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (isReducedMotion()) {
        gsap.set(maskRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(imageRef.current, { scale: 1 });
        gsap.set([".sdh-eyebrow", ".sdh-title", ".sdh-subtitle"], { opacity: 1, y: 0 });
        return;
      }

      const isMobile = isMobileViewport();

      gsap.set(maskRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(imageRef.current, { scale: 1.08 });
      gsap.set(".sdh-eyebrow", { opacity: 0, y: isMobile ? 8 : 14 });
      gsap.set(".sdh-title", { opacity: 0, y: isMobile ? 14 : 26 });
      gsap.set(".sdh-subtitle", { opacity: 0, y: isMobile ? 8 : 12 });

      gsap
        .timeline()
        .to(
          maskRef.current,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: motionTokens.easeMask },
          0
        )
        .to(imageRef.current, { scale: 1, duration: 1.6, ease: motionTokens.easeLuxury }, 0)
        .to(".sdh-eyebrow", { opacity: 1, y: 0, duration: 0.7, ease: motionTokens.easeLuxury }, 0.4)
        .to(".sdh-title", { opacity: 1, y: 0, duration: 0.9, ease: motionTokens.easeEditorial }, 0.52)
        .to(".sdh-subtitle", { opacity: 1, y: 0, duration: 0.7, ease: motionTokens.easeLuxury }, 0.72);

      if (!supportsParallax()) return;

      gsap.to(imageRef.current, {
        yPercent: 8,
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[72vh] w-full items-end overflow-hidden bg-[#0d0e12] sm:min-h-[80vh] lg:min-h-[86vh]"
      aria-label={`${title} hero`}
    >
      <div ref={maskRef} className="absolute inset-0 z-0" aria-hidden="true">
        <div ref={imageRef} className="relative -top-[6%] h-[112%] w-full">
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0d0e12]/92 via-[#0d0e12]/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#0d0e12]/80 via-[#0d0e12]/15 to-transparent"
      />

      <div className="relative z-10 w-full px-6 pb-14 sm:px-12 sm:pb-16 lg:px-20 lg:pb-20 xl:px-28">
        <div className="mx-auto w-full max-w-[1280px] space-y-5">
          <div className="sdh-eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-[#c9a227]" aria-hidden="true" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
              {number} / {title}
            </p>
          </div>

          <h1 className="sdh-title font-display max-w-4xl text-4xl leading-[1.04] tracking-tight text-[#f5f2ea] sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="sdh-subtitle text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a89d92] sm:text-[11px]">
            {subtitle}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-[#c9a227]/30 via-[#c9a227]/10 to-transparent"
      />
    </section>
  );
}
