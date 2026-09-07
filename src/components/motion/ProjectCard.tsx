"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "./gsapConfig";
import { use3DTilt } from "./use3DTilt";

interface ProjectCardProps {
  id: string;
  number?: string;
  title: string;
  category: string;
  location?: string;
  image: string;
  className?: string;
  aspectHeight?: string;
  sizes?: string;
  animationDirection?: "left" | "right" | "up" | "fade";
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
}

/**
 * Interactive Project Card
 * Features real 3D tilt on desktop, scroll-triggered text animations,
 * layered pointer depth, and device motion fallback on mobile.
 */
export function ProjectCard({
  id,
  number,
  title,
  category,
  location,
  image,
  className = "",
  aspectHeight = "h-96 lg:h-full",
  sizes = "(max-width: 768px) 100vw, 50vw",
  animationDirection = "up",
  maxRotateX = 4,
  maxRotateY = 5,
  maxScale = 1.02,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Use the reusable 3D tilt hook
  const tiltRef = use3DTilt<HTMLDivElement>({
    maxRotateX,
    maxRotateY,
    maxScale,
    duration: 0.4,
  });

  // Scroll-triggered text animation and parallax
  useLayoutEffect(() => {
    if (!contentRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const mobile = isMobileViewport();

      if (reduced || mobile) {
        gsap.set(contentRef.current, { opacity: 1, x: 0, y: 0 });
        return;
      }

      // Set initial state based on direction
      let initialX = 0;
      let initialY = 0;

      switch (animationDirection) {
        case "left":
          initialX = -60;
          break;
        case "right":
          initialX = 60;
          break;
        case "up":
          initialY = 40;
          break;
        case "fade":
          // No movement, just opacity
          break;
      }

      gsap.set(contentRef.current, {
        opacity: 0,
        x: initialX,
        y: initialY,
      });

      // Text animation
      gsap.to(contentRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.9,
        ease: motionTokens.easeEditorial,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Subtle parallax on image (works on both desktop and mobile)
      if (imageRef.current) {
        const parallaxSpeed = mobile ? 12 : 8; // Higher on mobile since tilt may not work
        gsap.to(imageRef.current, {
          yPercent: -parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [animationDirection]);

  return (
    <div
      ref={cardRef}
      data-cursor="VIEW PROJECT"
      className={`group relative overflow-hidden rounded-[1.25rem] border border-[#2a2a2a] bg-[#0d0e12] transition-[border-color] duration-500 will-change-transform hover:border-[#c9a227]/50 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link
        href={`/projects/${id}`}
        className={`relative block w-full overflow-hidden ${aspectHeight}`}
        aria-label={`View project: ${title}`}
      >
        {/* 3D Tilt Container */}
        <div
          ref={tiltRef}
          className="relative w-full h-full"
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Parallax Image Container */}
          <div
            ref={imageRef}
            className="relative h-[112%] w-[112%] -left-[6%] -top-[6%] transition-transform duration-700 ease-out"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </div>
        </div>

        {/* Ambient Dark Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 opacity-70 transition-opacity duration-300 group-hover:opacity-85" />

        {/* Content Overlay */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center gap-2">
              {number ? (
                <span className="font-display text-xs font-light text-[#c9a227]/80">
                  {number} ·
                </span>
              ) : null}
              <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">
                {category}
                {location ? <span className="text-[#999288]"> · {location.split(",")[0]}</span> : null}
              </p>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#f5f2ea] leading-tight">
              {title}
            </h3>
          </div>

          {/* Gold Accent Line */}
          <div className="mt-4 h-[1px] w-0 bg-[#c9a227]/60 transition-all duration-500 group-hover:w-16" />
        </div>
      </Link>
    </div>
  );
}
