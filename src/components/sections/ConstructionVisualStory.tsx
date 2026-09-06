"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { constructionStories } from "@/data/construction";

export function ConstructionVisualStory() {
  return (
    <section
      id="construction-story"
      className="relative bg-[#0d0e12] py-20 sm:py-28 lg:py-36"
      aria-label="Construction and craft visual story"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1f1f1f]" />

      <div className="mx-auto w-full max-w-[1360px] px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-2xl space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#c9a227]">
            Construction / Craft
          </p>
          <h2 className="font-display text-4xl leading-[1.06] text-[#f5f2ea] sm:text-5xl lg:text-6xl">
            From vision to reality.
          </h2>
          <p className="max-w-md text-sm leading-[1.85] text-[#8a8279] sm:text-base">
            Every structural layer is resolved with care — from initial site analysis to final hand-crafted finish.
          </p>
        </div>

        {/* ── Story Frame 01: Hero Feature Card ──────────────────────────────── */}
        <ScrollReveal className="mb-12 sm:mb-16">
          <Link 
            href={`/construction/${constructionStories[0].slug}`}
            className="group block lg:grid-cols-[1.3fr_1fr] items-center gap-8 lg:gap-12 rounded-[1.5rem] border border-white/12 bg-white/[0.02] overflow-hidden p-2 sm:p-3 transition-all duration-500 hover:border-[#c9a227]/40 hover:bg-white/[0.04]"
          >
            <div className="relative h-[340px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-[1.25rem]">
              <Image
                src={constructionStories[0].src}
                alt={constructionStories[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0e12]/60 via-transparent to-transparent"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                {constructionStories[0].index} / {constructionStories[0].label}
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-[#f5f2ea] leading-tight">
                {constructionStories[0].title}
              </h3>
              <p className="text-sm text-[#8a8279] leading-relaxed max-w-md">
                {constructionStories[0].body}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore details
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* ── Story Frames 02 & 03: Asymmetric 2-Column Grid ───────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 sm:mb-16">
          {constructionStories.slice(1, 3).map((frame, idx) => (
            <ScrollReveal key={frame.index} delay={idx * 0.1}>
              <Link 
                href={`/construction/${frame.slug}`}
                className="group relative flex flex-col h-full rounded-[1.5rem] border border-white/12 bg-white/[0.02] overflow-hidden p-2 sm:p-3 transition-all duration-500 hover:border-[#c9a227]/40 hover:bg-white/[0.04]"
              >
                <div className="relative h-[280px] sm:h-[360px] w-full overflow-hidden rounded-[1.25rem] mb-6">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0e12]/60 via-transparent to-transparent"
                  />
                </div>
                <div className="p-6 pt-0 space-y-3 mt-auto">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                    {frame.index} / {frame.label}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#f5f2ea]">
                    {frame.title}
                  </h3>
                  <p className="text-xs text-[#8a8279] leading-relaxed">
                    {frame.body}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore details
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Story Frames 04 & 05: Asymmetric 2-Column Grid ───────────────── */}
        <div className="grid lg:grid-cols-2 gap-8">
          {constructionStories.slice(3, 5).map((frame, idx) => (
            <ScrollReveal key={frame.index} delay={idx * 0.1}>
              <Link 
                href={`/construction/${frame.slug}`}
                className="group relative flex flex-col h-full rounded-[1.5rem] border border-white/12 bg-white/[0.02] overflow-hidden p-2 sm:p-3 transition-all duration-500 hover:border-[#c9a227]/40 hover:bg-white/[0.04]"
              >
                <div className="relative h-[280px] sm:h-[360px] w-full overflow-hidden rounded-[1.25rem] mb-6">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0e12]/60 via-transparent to-transparent"
                  />
                </div>
                <div className="p-6 pt-0 space-y-3 mt-auto">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                    {frame.index} / {frame.label}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#f5f2ea]">
                    {frame.title}
                  </h3>
                  <p className="text-xs text-[#8a8279] leading-relaxed">
                    {frame.body}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore details
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
