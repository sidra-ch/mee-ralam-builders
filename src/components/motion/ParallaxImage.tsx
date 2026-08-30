"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, isReducedMotion, supportsParallax } from "./gsapConfig";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // Parallax intensity (e.g. 15%)
  priority?: boolean;
  sizes?: string;
}

/**
 * ScrollTrigger-based Image Parallax
 * Gently translates the image inside an overflow-hidden wrapper to create depth.
 */
export function ParallaxImage({
  src,
  alt,
  className = "object-cover",
  containerClassName = "relative h-full w-full overflow-hidden",
  speed = 12,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !imageWrapperRef.current || isReducedMotion() || !supportsParallax()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrapperRef.current,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <div
        ref={imageWrapperRef}
        className="relative h-[124%] w-full -top-[12%]"
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
