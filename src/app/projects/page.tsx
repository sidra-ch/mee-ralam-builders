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

  // Grouping into architectural magazine rhythm
  const pairOne = portfolioProjects.slice(0, 2); // Pavilion House (02) + Obsidian Penthouse (03)
  const fullWidthFeature = portfolioProjects[2];  // Lakeview Retreat (04)
  const pairTwo = portfolioProjects.slice(3, 5); // Amber Courtyard (05) + Ridge Modern (06)
  const pairThree = portfolioProjects.slice(5, 7); // Carbon House (07) + Garden Villa North (08)

  return (
    <>
      <SiteHeader />

      <main>
        <CinematicPageHero
          eyebrow="SELECTED WORK"
          title={["Spaces designed", "with intention."]}
          description="A selection of residential, interior and architectural work shaped around material, proportion and everyday living."
          image="/images/img-9.png"
          imageAlt="Architectural detail — refined material junction and geometric composition"
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

            <div className="space-y-20 sm:space-y-28 lg:space-y-36">
              {/* Pair 1: 7-col + 5-col */}
              {pairOne.length > 0 && (
                <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-12 lg:items-end">
                  {pairOne[0] && (
                    <div className="col-span-full lg:col-span-7">
                      <EditorialProjectEntry
                        {...entryProps(pairOne[0], 1)}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        compact
                      />
                    </div>
                  )}
                  {pairOne[1] && (
                    <div className="col-span-full lg:col-span-5">
                      <EditorialProjectEntry
                        {...entryProps(pairOne[1], 2)}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        compact
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Major Full-Width Visual Moment: Lakeview Retreat (04) */}
              {fullWidthFeature && (
                <EditorialProjectEntry
                  {...entryProps(fullWidthFeature, 3)}
                  sizes="(max-width: 1024px) 100vw, 90vw"
                  fullWidth
                />
              )}

              {/* Pair 2: Inverted 5-col + 7-col */}
              {pairTwo.length > 0 && (
                <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-12 lg:items-end">
                  {pairTwo[0] && (
                    <div className="col-span-full lg:col-span-5">
                      <EditorialProjectEntry
                        {...entryProps(pairTwo[0], 4)}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        compact
                      />
                    </div>
                  )}
                  {pairTwo[1] && (
                    <div className="col-span-full lg:col-span-7">
                      <EditorialProjectEntry
                        {...entryProps(pairTwo[1], 5)}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        compact
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Pair 3: 7-col + 5-col */}
              {pairThree.length > 0 && (
                <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-12 lg:items-end">
                  {pairThree[0] && (
                    <div className="col-span-full lg:col-span-7">
                      <EditorialProjectEntry
                        {...entryProps(pairThree[0], 6)}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        compact
                      />
                    </div>
                  )}
                  {pairThree[1] && (
                    <div className="col-span-full lg:col-span-5">
                      <EditorialProjectEntry
                        {...entryProps(pairThree[1], 7)}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        compact
                      />
                    </div>
                  )}
                </div>
              )}
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
