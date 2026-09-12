"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export interface ProjectVideoProps {
  src: string;
  poster?: string;
  title?: string;
  aspect?: "video" | "vertical" | "square" | "wide";
  className?: string;
}

/**
 * ProjectVideo
 *
 * Professional video player component designed for architectural project showcases:
 * - Autoplay when in viewport, pause when offscreen (saves CPU & bandwidth)
 * - Muted, loop, playsInline for seamless iOS/Android & desktop playback
 * - Respects prefers-reduced-motion: holds on poster image if user requested reduced motion
 * - Graceful fallback: handles format errors and browser autoplay policies
 * - Responsive aspect ratios, object-fit cover, strictly no horizontal overflow
 */
export function ProjectVideo({
  src,
  poster,
  title = "Project visual walkthrough",
  aspect = "video",
  className = "",
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Aspect ratio classes
  const aspectClass = {
    video: "aspect-[16/9] min-h-[260px] sm:min-h-[420px] lg:min-h-[520px]",
    vertical: "aspect-[9/16] max-h-[640px] mx-auto",
    square: "aspect-square",
    wide: "aspect-[21/9] min-h-[280px] sm:min-h-[440px]",
  }[aspect];

  // IntersectionObserver: play when 25% visible, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {
            setIsPlaying(false);
          });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] border border-[#222222] bg-[#0a0b0e] shadow-2xl ${aspectClass} ${className}`}
    >
      {/* Video Element */}
      {!hasError && !prefersReducedMotion ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={title}
          playsInline
          muted
          loop
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      {/* Poster Image fallback while loading or on error/reduced motion */}
      {poster && (!isLoaded || hasError || prefersReducedMotion) && (
        <div className="absolute inset-0">
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      )}

      {/* Atmospheric subtle vignette overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"
      />

      {/* Status indicator / micro label */}
      <div className="pointer-events-none absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isPlaying ? "bg-[#c9a227] animate-pulse" : "bg-white/40"
          }`}
        />
        <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#f5f2ea]">
          {title}
        </span>
      </div>
    </div>
  );
}
