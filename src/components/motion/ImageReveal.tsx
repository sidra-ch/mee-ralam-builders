"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, isReducedMotion } from "./gsapConfig";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Architectural Image Reveal
 * Unfolds with a cinematic vertical clip mask and subtle settling scale.
 */
export function ImageReveal({
  src,
  alt,
  className = "object-cover",
  containerClassName = "relative overflow-hidden rounded-[1.5rem] border border-[#2a2a2a]",
  aspectRatio = "h-96 sm:h-[480px] lg:h-[540px]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !imageRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        containerRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }
      ).fromTo(
        imageRef.current,
        { scale: 1.12 },
        { scale: 1.0, duration: 1.4, ease: "power2.out" },
        "-=0.9"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`${containerClassName} w-full`}>
      <div ref={imageRef} className={`relative w-full ${aspectRatio}`}>
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
