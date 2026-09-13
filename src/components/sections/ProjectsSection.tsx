"use client";

import Link from "next/link";
import { projectsData } from "@/data/projects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "@/components/motion/ProjectCard";
import { CinematicHeading } from "@/components/motion/CinematicHeading";

/**
 * ProjectsSection
 *
 * Asymmetric 12-column editorial grid: two rows with a large + small pairing
 * that inverts between rows — creating a considered, non-uniform composition.
 */
export function ProjectsSection() {
  // Four portfolio pieces — excludes the featured flagship (index 0)
  const portfolioProjects = projectsData.slice(1, 5);

  return (
    <section
      id="projects"
      className="projects-section relative bg-[#111111] py-16 sm:py-28 lg:py-40"
      aria-label="Selected Architectural Portfolio"
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1f1f1f]" />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-20 lg:mb-28 max-w-2xl">
          <CinematicHeading
            eyebrow="Selected Work"
            lines={["Spaces made to", "be experienced."]}
            italicIndex={1}
            italicClassName="font-normal italic text-[#c0b89a]"
            className="font-display leading-[1.08] text-[#f5f2ea]"
            mode="masked-line"
            from="bottom"
          />
        </div>

        {/* ── Asymmetric editorial grid ──────────────────────────────────── */}
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">

          {/* Row 1: large (7 col) + small (5 col) */}
          <ScrollReveal className="col-span-full lg:col-span-7">
            <ProjectCard
              id={portfolioProjects[0].id}
              number={portfolioProjects[0].number}
              title={portfolioProjects[0].title}
              category={portfolioProjects[0].category}
              location={portfolioProjects[0].location}
              image={portfolioProjects[0].heroImage}
              aspectHeight="h-[420px] sm:h-[500px] lg:h-[580px]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="col-span-full lg:col-span-5">
            <ProjectCard
              id={portfolioProjects[1].id}
              number={portfolioProjects[1].number}
              title={portfolioProjects[1].title}
              category={portfolioProjects[1].category}
              location={portfolioProjects[1].location}
              image={portfolioProjects[1].heroImage}
              aspectHeight="h-[420px] sm:h-[500px] lg:h-[580px]"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </ScrollReveal>

          {/* Row 2: small (5 col) + large (7 col) — inverted */}
          <ScrollReveal delay={0.08} className="col-span-full lg:col-span-5">
            <ProjectCard
              id={portfolioProjects[2].id}
              number={portfolioProjects[2].number}
              title={portfolioProjects[2].title}
              category={portfolioProjects[2].category}
              location={portfolioProjects[2].location}
              image={portfolioProjects[2].heroImage}
              aspectHeight="h-[420px] sm:h-[500px] lg:h-[520px]"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.18} className="col-span-full lg:col-span-7">
            <ProjectCard
              id={portfolioProjects[3].id}
              number={portfolioProjects[3].number}
              title={portfolioProjects[3].title}
              category={portfolioProjects[3].category}
              location={portfolioProjects[3].location}
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
