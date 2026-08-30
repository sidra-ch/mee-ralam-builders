"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, isReducedMotion, supportsParallax } from "./gsapConfig";

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
  reveal?: boolean;
  cursorLabel?: string;
}

/**
 * Reusable Cinematic Image Component
 * Combines GSAP ScrollTrigger clip-reveal, gentle image parallax, and hover interactions.
 */
export function CinematicImage({
  src,
  alt,
  className = "object-cover",
  containerClassName = "relative overflow-hidden rounded-[1.75rem] border border-[#2a2a2a] bg-[#0d0e12]",
  aspectRatio = "h-80 sm:h-[480px] lg:h-[560px]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  parallax = true,
  parallaxSpeed = 10,
  reveal = true,
  cursorLabel,
}: CinematicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Clip-path & Scale Reveal
      if (reveal) {
        gsap.fromTo(
          containerRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Parallax Scroll Movement
      if (parallax && imageWrapperRef.current && supportsParallax()) {
        gsap.fromTo(
          imageWrapperRef.current,
          { yPercent: -parallaxSpeed },
          {
            yPercent: parallaxSpeed,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reveal, parallax, parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      data-cursor={cursorLabel}
      className={`group ${containerClassName} w-full`}
    >
      <div
        ref={imageWrapperRef}
        className={`relative w-full ${aspectRatio} ${
          parallax ? "h-[120%] -top-[10%]" : ""
        } transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={className}
        />
      </div>
    </div>
  );
}
