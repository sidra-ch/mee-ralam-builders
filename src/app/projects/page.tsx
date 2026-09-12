import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicPageHero } from "@/components/hero/CinematicPageHero";
import { EditorialProjectEntry } from "@/components/sections/EditorialProjectEntry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicHeading } from "@/components/motion/CinematicHeading";
import { projectsData, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Meer Alam Builders",
  description:
    "Selected architectural work — contemporary residences, interior architectures, and bespoke construction by Meer Alam Builders.",
};

function entryProps(project: Project, index: number) {
  return {
    index,
    id: project.id,
    number: project.number,
    title: project.title,
    category: project.category,
    location: project.location,
    description: project.description,
    image: project.heroImage,
    imageAlt: project.alt,
    objectPosition: project.objectPosition,
  };
}

export default function ProjectsPage() {
  const featuredProject = projectsData.find((p) => p.featured) ?? projectsData[0];
  const portfolioProjects = projectsData.filter((p) => p.id !== featuredProject?.id);

  return (
    <>
      <SiteHeader />

      <main>
        <CinematicPageHero
          eyebrow="SELECTED WORK"
          title={["Spaces designed", "with intention."]}
          description="A selection of residential, interior and architectural work shaped around material, proportion and everyday living."
          image="/images/projects-hero.jpg"
          imageAlt="Contemporary front elevation with layered architectural volumes and landscaped approach"
        />

        {/* 01. Flagship Project Highlight */}
        {featuredProject && (
          <section
            className="relative border-t border-[#1f1f1f] bg-[#0d0e12] pb-16 pt-20 sm:pb-24 sm:pt-28 lg:pb-32 lg:pt-36"
            aria-label="Featured Project"
          >
            <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-12 lg:px-20">
              <ScrollReveal className="mb-8 sm:mb-12">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                    Featured Flagship
                  </p>
                </div>
              </ScrollReveal>

              <EditorialProjectEntry
                {...entryProps(featuredProject, 0)}
                sizes="(max-width: 1024px) 100vw, 75vw"
                featured
              />
            </div>
          </section>
        )}

        {/* 02. Architectural Portfolio Archive */}
        <section
          className="relative bg-[#0d0e12] py-20 sm:py-32 lg:py-44 border-t border-[#1f1f1f]"
          aria-label="Architectural Portfolio"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <div className="mb-16 max-w-2xl sm:mb-20 lg:mb-28 space-y-4">
              <CinematicHeading
                eyebrow="Portfolio Archive"
                lines="Curated Works"
                className="font-display text-3xl leading-tight text-[#f5f2ea] sm:text-4xl lg:text-5xl"
                mode="masked-line"
              />
              <ScrollReveal delay={0.15}>
                <p className="text-sm leading-relaxed text-[#c7c0b5] sm:text-base">
                  Explore selected residential commissions, heritage transformations, and bespoke interior interventions.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 sm:gap-y-20 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-28">
              {portfolioProjects.map((project, index) => (
                <div key={project.id} className={index % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                  <EditorialProjectEntry
                    {...entryProps(project, index + 1)}
                    sizes={
                      index % 5 === 0
                        ? "(max-width: 640px) 100vw, 66vw"
                        : "(max-width: 1024px) 50vw, 33vw"
                    }
                    compact={index % 5 !== 0}
                    fullWidth={index % 5 === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative border-t border-[#1f1f1f] bg-[#111111] py-24 sm:py-32"
          aria-label="Project enquiry"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg font-display text-3xl leading-tight text-[#f5f2ea] sm:text-4xl lg:text-5xl">
                Looking for a bespoke architectural build?
              </p>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                Start a conversation
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
