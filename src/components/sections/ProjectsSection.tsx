"use client";

import Link from "next/link";
import { projectsData } from "@/data/projects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "@/components/motion/ProjectCard";

/**
 * ProjectsSection
 *
 * Asymmetric 12-column editorial grid: two rows with a large + small pairing
 * that inverts between rows — creating a considered, non-uniform composition.
 *
 * Refinements:
 * – Section heading uses clamp() fluid scale; italic break on second line.
 * – Dot + label pattern replaced with cleaner micro-label only.
 * – Supporting copy reduced and muted.
 * – Card heights differentiated: primary cards are taller for visual dominance.
 * – Row gap reduced between pairs; overall section padding increased.
 * – "View all" footer row thinned: just a link, no redundant label text.
 */
export function ProjectsSection() {
  // Four portfolio pieces — excludes the featured flagship (index 0)
  const portfolioProjects = projectsData.slice(1, 5);

  return (
    <section
      id="projects"
      className="projects-section relative bg-[#111111] py-28 sm:py-36 lg:py-52"
      aria-label="Selected Architectural Portfolio"
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1f1f1f]" />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <ScrollReveal className="mb-20 lg:mb-28 space-y-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
            Selected Work
          </p>
          <h2
            className="max-w-2xl font-display leading-[1.08] text-[#f5f2ea]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.01em" }}
          >
            Spaces made to
            <br />
            <span className="font-normal italic text-[#c0b89a]">be experienced.</span>
          </h2>
        </ScrollReveal>

        {/* ── Asymmetric editorial grid ──────────────────────────────────── */}
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">

          {/* Row 1: large (7 col) + small (5 col) */}
          <ScrollReveal className="col-span-full lg:col-span-7">
            <ProjectCard
              id={portfolioProjects[0].id}
              title={portfolioProjects[0].title}
              category={portfolioProjects[0].category}
              image={portfolioProjects[0].heroImage}
              aspectHeight="h-[420px] sm:h-[500px] lg:h-[580px]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="col-span-full lg:col-span-5">
            <ProjectCard
              id={portfolioProjects[1].id}
              title={portfolioProjects[1].title}
              category={portfolioProjects[1].category}
              image={portfolioProjects[1].heroImage}
              aspectHeight="h-[420px] sm:h-[500px] lg:h-[580px]"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </ScrollReveal>

          {/* Row 2: small (5 col) + large (7 col) — inverted */}
          <ScrollReveal delay={0.08} className="col-span-full lg:col-span-5">
            <ProjectCard
              id={portfolioProjects[2].id}
              title={portfolioProjects[2].title}
              category={portfolioProjects[2].category}
              image={portfolioProjects[2].heroImage}
              aspectHeight="h-[420px] sm:h-[500px] lg:h-[520px]"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.18} className="col-span-full lg:col-span-7">
            <ProjectCard
              id={portfolioProjects[3].id}
              title={portfolioProjects[3].title}
              category={portfolioProjects[3].category}
              image={portfolioProjects[3].heroImage}
              aspectHeight="h-[420px] sm:h-[500px] lg:h-[520px]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </ScrollReveal>
        </div>

        {/* ── Footer row ─────────────────────────────────────────────────── */}
        <ScrollReveal className="mt-14 lg:mt-16">
          <div className="flex items-center justify-between border-t border-[#1e1e1e] pt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#3e3a36]">
              Portfolio archive
            </p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] transition-all duration-300 hover:gap-5"
            >
              View all projects
              <span
                className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
