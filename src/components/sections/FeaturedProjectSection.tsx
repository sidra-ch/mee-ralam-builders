"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * Featured projects: simple scroll-reveal section
 * Removed pinning to eliminate black space issues
 */
export function FeaturedProjectSection() {
  const featured = useMemo(
    () => projectsData.filter((p) => p.featured).slice(0, 1),
    [],
  );

  if (!featured.length) return null;

  return (
    <section
      className="featured-project-section relative bg-[#0d0e12] py-8 sm:py-12 lg:py-16"
      aria-label="Featured projects"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1a1a1a]" />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-20">
        <ScrollReveal direction="up" distance={16}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227] mb-8">
            Featured Work
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={30} scale={0.98} duration={1.1}>
          <Link
            href={`/projects/${featured[0].slug}`}
            className="group block overflow-hidden rounded-[1.5rem] border border-[#222]"
          >
            <div className="relative h-[45vh] sm:h-[55vh] lg:h-[65vh] min-h-[300px] w-full overflow-hidden">
              <Image
                src={featured[0].heroImage}
                alt={featured[0].alt}
                fill
                sizes="100vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227]">{featured[0].category}</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl text-[#f5f2ea]">{featured[0].title}</h3>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
