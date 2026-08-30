"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { isReducedMotion } from "@/components/motion/gsapConfig";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface EditorialProjectEntryProps {
  /** Zero-based index — controls alternating image/text layout */
  index: number;
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Next/Image sizes hint */
  sizes?: string;
  /** Featured project gets dominant scale treatment */
  featured?: boolean;
  /** Compact mode: image-only card (no text overlay), used in asymmetric grid */
  compact?: boolean;
  /** Full-width closing project */
  fullWidth?: boolean;
}

/**
 * EditorialProjectEntry
 *
 * One full-width editorial project composition for the Projects page.
 * Alternates image-left/text-right and text-left/image-right.
 * Features subtle pointer parallax on the image and a gold accent line.
 * No card borders — open, magazine-style layout.
 */
export function EditorialProjectEntry({
  index,
  id,
  title,
  category,
  description,
  image,
  imageAlt,
  sizes = "(max-width: 1024px) 100vw, 65vw",
}: EditorialProjectEntryProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

/**
 * EditorialProjectEntry
 *
 * Premium project presentation component for the Projects page.
 * Supports three presentation modes:
 * - **Featured**: Large image + side text (default editorial layout)
 * - **Compact**: Image-only card with minimal text overlay (for asymmetric grid)
 * - **Full-width**: Cinematic closer composition
 *
 * Features subtle pointer parallax and gold accent reveals.
 */
export function EditorialProjectEntry({
  index,
  id,
  title,
  category,
  description,
  image,
  imageAlt,
  sizes = "(max-width: 1024px) 100vw, 65vw",
  featured = false,
  compact = false,
  fullWidth = false,
}: EditorialProjectEntryProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isEven = index % 2 === 0; // even = image left

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion() || !imageRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxMove = compact ? 8 : 10;
    const scale = compact ? 1.03 : 1.04;
    imageRef.current.style.transform = `translate3d(${-x * maxMove}px, ${-y * maxMove}px, 0) scale(${scale})`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "translate3d(0,0,0) scale(1)";
  };

  // ── COMPACT MODE: Image-only card for grid ─────────────────────────────
  if (compact) {
    return (
      <ScrollReveal
        yOffset={32}
        duration={1}
        className="group"
      >
        <article
          id={id}
          className="scroll-mt-24"
          aria-label={`Project: ${title}`}
        >
          <Link
            href={`/projects#${id}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="VIEW PROJECT"
            className="block relative overflow-hidden rounded-[1.5rem] border border-[#2a2a2a] bg-[#0d0e12] transition-all duration-500 hover:border-[#c9a227]/40"
          >
            {/* Image */}
            <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full overflow-hidden">
              <div
                ref={imageRef}
                className="relative h-[115%] w-full -top-[7.5%] transition-transform duration-700 ease-out"
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes={sizes}
                  className="object-cover"
                />
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Minimal text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227]">
                  {category}
                </p>
                <h3 className="font-display text-xl sm:text-2xl text-[#f5f2ea] leading-tight">
                  {title}
                </h3>
              </div>

              {/* Gold accent line */}
              <div className="mt-4 h-[1px] w-0 bg-[#c9a227]/70 group-hover:w-20 transition-all duration-700" />
            </div>
          </Link>
        </article>
      </ScrollReveal>
    );
  }

  // ── FULL-WIDTH MODE: Cinematic closer ──────────────────────────────────
  if (fullWidth) {
    return (
      <ScrollReveal yOffset={40} duration={1.1}>
        <article
          id={id}
          className="scroll-mt-24"
          aria-label={`Project: ${title}`}
        >
          <Link
            href={`/projects#${id}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="VIEW PROJECT"
            className="group block relative overflow-hidden rounded-[1.5rem] border border-[#2a2a2a] bg-[#0d0e12] transition-all duration-500 hover:border-[#c9a227]/40"
          >
            {/* Image */}
            <div className="relative h-[360px] sm:h-[480px] lg:h-[600px] w-full overflow-hidden">
              <div
                ref={imageRef}
                className="relative h-[115%] w-full -top-[7.5%] transition-transform duration-700 ease-out"
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes={sizes}
                  className="object-cover"
                />
              </div>

              {/* Strong bottom gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Text overlay — bottom left */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
              <div className="max-w-2xl space-y-4 transform transition-transform duration-300 group-hover:-translate-y-2">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227]">
                  {category}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f2ea] leading-tight">
                  {title}
                </h3>
                <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>

              {/* Gold accent line */}
              <div className="mt-6 h-[2px] w-0 bg-[#c9a227]/70 group-hover:w-32 transition-all duration-700" />
            </div>
          </Link>
        </article>
      </ScrollReveal>
    );
  }

  // ── FEATURED / DEFAULT MODE: Image + Side Text ─────────────────────────
  const imageHeight = featured
    ? "h-[420px] sm:h-[560px] lg:h-[680px]"
    : "h-[360px] sm:h-[480px] lg:h-[560px]";

  const gridCols = featured
    ? isEven
      ? "lg:grid-cols-[1.8fr_1fr]"
      : "lg:grid-cols-[1fr_1.8fr]"
    : isEven
    ? "lg:grid-cols-[1.6fr_1fr]"
    : "lg:grid-cols-[1fr_1.6fr]";

  return (
    <article
      id={id}
      className="scroll-mt-24"
      aria-label={`Project: ${title}`}
    >
      <div
        className={`grid gap-10 lg:gap-16 items-center ${gridCols}`}
      >
        {/* ── Image ─────────────────────────────────────────────────────── */}
        <div
          className={`${!isEven ? "lg:order-2" : ""}`}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          data-cursor="VIEW PROJECT"
        >
          <Link
            href={`/projects#${id}`}
            aria-label={`View project: ${title}`}
            className="block overflow-hidden rounded-[1.5rem] border border-[#2a2a2a] bg-[#0d0e12] group"
          >
            <div className={`relative ${imageHeight} w-full overflow-hidden`}>
              <div
                ref={imageRef}
                className="relative h-[115%] w-full -top-[7.5%] transition-transform duration-700 ease-out"
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes={sizes}
                  className="object-cover"
                />
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Gold accent line on hover */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#c9a227]/70 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </Link>
        </div>

        {/* ── Text ──────────────────────────────────────────────────────── */}
        <ScrollReveal
          yOffset={24}
          duration={0.9}
          className={`space-y-6 ${!isEven ? "lg:order-1" : ""}`}
        >
          {/* Project number */}
          {!featured && (
            <p className="font-display text-5xl sm:text-6xl font-light text-[#c9a227]/40 tracking-wider leading-none">
              {String(index + 1).padStart(2, "0")}
            </p>
          )}

          {/* Category */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]">
            {category}
          </p>

          {/* Title */}
          <h2 className={`font-display leading-tight text-[#f5f2ea] ${
            featured
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl lg:text-5xl"
          }`}>
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed max-w-md">
            {description}
          </p>

          {/* CTA */}
          <div className="pt-2">
            <Link
              href={`/projects#${id}`}
              className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5"
            >
              View Project
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
