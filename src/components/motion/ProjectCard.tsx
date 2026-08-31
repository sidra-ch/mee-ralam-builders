"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { supportsParallax } from "./gsapConfig";

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
}

/**
 * Interactive Project Card
 * Features layered pointer depth, subtle scale, gold accent transitions, and cursor trigger.
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
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!supportsParallax() || !cardRef.current || !imageRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Subtle counter-movement translation (max 6px)
    imageRef.current.style.transform = `translate3d(${-x * 8}px, ${-y * 8}px, 0) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="VIEW PROJECT"
      className={`group relative overflow-hidden rounded-[1.25rem] border border-[#2a2a2a] bg-[#0d0e12] transition-colors duration-500 hover:border-[#c9a227]/50 ${className}`}
    >
      <Link
        href={`/projects/${id}`}
        className={`relative block w-full overflow-hidden ${aspectHeight}`}
        aria-label={`View project: ${title}`}
      >
        {/* Parallax Image Container */}
        <div
          ref={imageRef}
          className="relative h-[112%] w-[112%] -left-[6%] -top-[6%] transition-transform duration-500 ease-out"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>

        {/* Ambient Dark Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 opacity-70 transition-opacity duration-300 group-hover:opacity-85" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
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
