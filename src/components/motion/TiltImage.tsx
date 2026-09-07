"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap, isReducedMotion, isMobileViewport } from "./gsapConfig";
import { use3DTilt } from "./use3DTilt";

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Maximum rotation in degrees for X axis
   * Default: 4
   */
  maxRotateX?: number;
  /**
   * Maximum rotation in degrees for Y axis
   * Default: 5
   */
  maxRotateY?: number;
  /**
   * Maximum scale on hover
   * Default: 1.02
   */
  maxScale?: number;
  /**
   * Enable scroll-based parallax (fallback for mobile)
   * Default: true
   */
  enableParallax?: boolean;
  /**
   * Parallax speed (vertical movement range)
   * Default: 8
   */
  parallaxSpeed?: number;
  /**
   * Enable 3D tilt effect
   * Default: true
   */
  enableTilt?: boolean;
  /**
   * Optional cursor label for custom cursor
   */
  cursorLabel?: string;
  objectPosition?: string;
}

/**
 * Reusable TiltImage Component
 * 
 * Combines 3D mouse-follow tilt, device motion fallback, and scroll-based parallax.
 * Designed for premium architecture/interior websites.
 * 
 * @example
 * <TiltImage
 *   src="/images/project.jpg"
 *   alt="Project name"
 *   maxRotateX={4}
 *   maxRotateY={5}
 *   maxScale={1.02}
 *   enableParallax={true}
 * />
 */
export function TiltImage({
  src,
  alt,
  className = "object-cover",
  containerClassName = "relative overflow-hidden rounded-[1.25rem] border border-[#2a2a2a] bg-[#0d0e12]",
  aspectRatio = "h-80 sm:h-[480px] lg:h-[560px]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  maxRotateX = 4,
  maxRotateY = 5,
  maxScale = 1.02,
  enableParallax = true,
  parallaxSpeed = 8,
  enableTilt = true,
  cursorLabel,
  objectPosition,
}: TiltImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const tiltRef = use3DTilt<HTMLDivElement>({
    maxRotateX,
    maxRotateY,
    maxScale,
    enabled: enableTilt,
  });

  // Scroll-based parallax (fallback for mobile)
  useLayoutEffect(() => {
    if (!enableParallax || !imageWrapperRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const mobile = isMobileViewport();

      if (reduced) {
        gsap.set(imageWrapperRef.current, { yPercent: 0 });
        return;
      }

      // Parallax is more important on mobile where tilt may not work
      const speed = mobile ? parallaxSpeed * 1.5 : parallaxSpeed;

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
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [enableParallax, parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      data-cursor={cursorLabel}
      className={`${containerClassName} w-full`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={tiltRef}
        className="relative w-full h-full"
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div
          ref={imageWrapperRef}
          className={`relative w-full ${aspectRatio} transition-transform duration-700 ease-out`}
          style={{ 
            transformStyle: "preserve-3d",
            // Make image slightly larger for parallax movement
            height: enableParallax ? "120%" : "100%",
            top: enableParallax ? "-10%" : "0",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={className}
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
      </div>
    </div>
  );
}
