"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, isReducedMotion, motionTokens, supportsParallax } from "@/components/motion/gsapConfig";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface EditorialProjectEntryProps {
  index: number;
  id: string;
  number?: string;
  title: string;
  category: string;
  location?: string;
  description: string;
  image: string;
  imageAlt: string;
  sizes?: string;
  objectPosition?: string;
  featured?: boolean;
  compact?: boolean;
  fullWidth?: boolean;
}

function ViewProjectCue() {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all duration-300 group-hover:gap-4">
      Explore Case Study
      <span className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </span>
  );
}

/**
 * Editorial project presentation for the Projects listing.
 * Featured: open magazine layout. Compact / full-width: image-led with a visible CTA.
 */
export function EditorialProjectEntry({
  index,
  id,
  number,
  title,
  category,
  location,
  description,
  image,
  imageAlt,
  sizes = "(max-width: 1024px) 100vw, 65vw",
  objectPosition = "center",
  featured = false,
  compact = false,
  fullWidth = false,
}: EditorialProjectEntryProps) {
  const href = `/projects/${id}`;
  const clipRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scaleOnHover = 1.03;
  const maxMove = 6;

  useLayoutEffect(() => {
    if (!clipRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      if (reduced) {
        gsap.set(clipRef.current, { clipPath: "inset(0% 0% 0%)" });
        gsap.set(imageRef.current, { scale: 1 });
        return;
      }

      gsap.fromTo(
        clipRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.15,
          ease: motionTokens.easeMask,
          scrollTrigger: {
            trigger: clipRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        imageRef.current,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 1.4,
          ease: motionTokens.easeLuxury,
          scrollTrigger: {
            trigger: clipRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, clipRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!supportsParallax() || !imageRef.current || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    imageRef.current.style.transform = `translate3d(${-x * maxMove}px, ${-y * maxMove}px, 0) scale(${scaleOnHover})`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "translate3d(0,0,0) scale(1)";
  };

  const imageBlock = (heightClass: string) => (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden"
    >
      <div ref={clipRef} className={`relative ${heightClass} w-full overflow-hidden bg-[#0d0e12]`}>
        <div
          ref={imageRef}
          className="absolute inset-0 h-[115%] w-full -top-[7.5%] will-change-transform"
          style={{ transition: "transform 700ms ease-out" }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
      </div>
    </div>
  );

  if (compact) {
    return (
      <ScrollReveal yOffset={24} duration={0.85} className="group">
        <article id={id} className="scroll-mt-24" aria-labelledby={`${id}-title`}>
          <Link
            href={href}
            data-cursor="VIEW CASE STUDY"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12]"
          >
            {imageBlock("h-[340px] sm:h-[420px] lg:h-[500px]")}
            <div className="mt-5 space-y-2.5 sm:mt-6">
              <div className="flex items-center gap-3">
                {number ? (
                  <span className="font-display text-sm font-light text-[#c9a227]/70">
                    {number}
                  </span>
                ) : null}
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]">
                  {category}
                  {location ? <span className="text-[#6e6860]"> · {location.split(",")[0]}</span> : null}
                </p>
              </div>
              <h3
                id={`${id}-title`}
                className="font-display text-xl sm:text-2xl text-[#f5f2ea] leading-tight transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                {title}
              </h3>
              <ViewProjectCue />
            </div>
          </Link>
        </article>
      </ScrollReveal>
    );
  }

  if (fullWidth) {
    return (
      <ScrollReveal yOffset={28} duration={0.9} className="group">
        <article id={id} className="scroll-mt-24" aria-labelledby={`${id}-title`}>
          <Link
            href={href}
            data-cursor="VIEW CASE STUDY"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12]"
          >
            {imageBlock("h-[340px] sm:h-[480px] lg:h-[620px]")}
            <div className="mt-6 max-w-2xl space-y-3 sm:mt-8 sm:space-y-4">
              <div className="flex items-center gap-3">
                {number ? (
                  <span className="font-display text-base font-light text-[#c9a227]">
                    {number}
                  </span>
                ) : null}
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  {category}
                  {location ? <span className="text-[#8e8578]"> · {location}</span> : null}
                </p>
              </div>
              <h3
                id={`${id}-title`}
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f2ea] leading-tight transition-transform duration-300 group-hover:-translate-y-1"
              >
                {title}
              </h3>
              {description ? (
                <p className="text-sm leading-relaxed text-[#c7c0b5] sm:text-base max-w-xl">
                  {description}
                </p>
              ) : null}
              <ViewProjectCue />
            </div>
          </Link>
        </article>
      </ScrollReveal>
    );
  }

  const imageHeight = featured
    ? "h-[380px] sm:h-[520px] lg:h-[680px]"
    : "h-[320px] sm:h-[440px] lg:h-[520px]";

  const gridCols = featured
    ? "lg:grid-cols-[1.85fr_1fr]"
    : index % 2 === 0
      ? "lg:grid-cols-[1.6fr_1fr]"
      : "lg:grid-cols-[1fr_1.6fr]";

  const imageOrder = !featured && index % 2 !== 0 ? "lg:order-2" : "";
  const textOrder = !featured && index % 2 !== 0 ? "lg:order-1" : "";

  return (
    <article id={id} className="scroll-mt-24" aria-labelledby={`${id}-title`}>
      <div className={`grid items-center gap-8 sm:gap-10 lg:gap-16 ${gridCols}`}>
        <Link
          href={href}
          aria-label={`View project: ${title}`}
          data-cursor="VIEW CASE STUDY"
          className={`group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] ${imageOrder}`}
        >
          {imageBlock(imageHeight)}
        </Link>

        <ScrollReveal yOffset={20} duration={0.85} className={`space-y-5 sm:space-y-6 ${textOrder}`}>
          <div className="flex items-center gap-3">
            {number ? (
              <span className="font-display text-base font-light text-[#c9a227]">
                {number}
              </span>
            ) : null}
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]">
              {category}
              {location ? <span className="text-[#7e776e]"> · {location.split(",")[0]}</span> : null}
            </p>
          </div>
          <h2
            id={`${id}-title`}
            className={`font-display leading-tight text-[#f5f2ea] ${
              featured ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </h2>
          {description ? (
            <p className="max-w-md text-sm leading-relaxed text-[#c7c0b5] sm:text-base">
              {description}
            </p>
          ) : null}
          <div className="pt-1">
            <Link
              href={href}
              className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12]"
            >
              Explore Case Study
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
