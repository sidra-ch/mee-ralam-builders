import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicPageHero } from "@/components/hero/CinematicPageHero";
import { EditorialProjectEntry } from "@/components/sections/EditorialProjectEntry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Meer Alam Builders",
  description:
    "Selected architectural work — contemporary residences, interior architectures, and bespoke construction by Meer Alam Builders.",
};

export default function ProjectsPage() {
  // Separate featured flagship from portfolio grid
  const featuredProject = projectsData.find((p) => p.featured);
  const portfolioProjects = projectsData.filter((p) => !p.featured);

  return (
    <>
      <SiteHeader />

      <main>
        {/* 01. Cinematic Hero */}
        <CinematicPageHero
          eyebrow="Projects / Selected Work"
          title={["Architecture", "That Endures."]}
          description="Residences, interiors, and bespoke builds designed to be experienced, not simply occupied."
          image="/images/img-9.png"
          imageAlt="Architectural detail — refined material junction and geometric composition"
        />

        {/* 02. Featured Project — Dominant Scale */}
        {featuredProject && (
          <section
            className="relative bg-[#0d0e12] pt-28 sm:pt-36 lg:pt-48 pb-16 sm:pb-20 lg:pb-24 border-t border-[#1f1f1f]"
            aria-label="Featured Project"
          >
            <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-12 lg:px-20">
              <ScrollReveal className="mb-12 lg:mb-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                  Featured Project
                </p>
              </ScrollReveal>

              <EditorialProjectEntry
                index={0}
                id={featuredProject.id}
                title={featuredProject.title}
                category={featuredProject.category}
                description={featuredProject.description}
                image={featuredProject.heroImage}
                imageAlt={featuredProject.alt}
                sizes="(max-width: 1024px) 100vw, 75vw"
                featured
              />
            </div>
          </section>
        )}

        {/* 03. Portfolio Grid — Asymmetric Editorial Rhythm */}
        <section
          className="relative bg-[#0d0e12] py-28 sm:py-36 lg:py-48"
          aria-label="Architectural Portfolio"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            
            {/* Portfolio intro */}
            <ScrollReveal className="mb-20 lg:mb-28 max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f2ea] leading-tight mb-4">
                Selected Portfolio
              </h2>
              <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed">
                A collection of residential projects spanning contemporary estates, heritage restorations, and bespoke interior interventions.
              </p>
            </ScrollReveal>

            {/* Asymmetric grid: intentional large/small pairings */}
            <div className="space-y-16 lg:space-y-20">
              
              {/* Pair 1: Large left + Small right */}
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="col-span-full lg:col-span-7">
                  <EditorialProjectEntry
                    index={1}
                    id={portfolioProjects[0].id}
                    title={portfolioProjects[0].title}
                    category={portfolioProjects[0].category}
                    description={portfolioProjects[0].description}
                    image={portfolioProjects[0].heroImage}
                    imageAlt={portfolioProjects[0].alt}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    compact
                  />
                </div>
                <div className="col-span-full lg:col-span-5">
                  <EditorialProjectEntry
                    index={2}
                    id={portfolioProjects[1].id}
                    title={portfolioProjects[1].title}
                    category={portfolioProjects[1].category}
                    description={portfolioProjects[1].description}
                    image={portfolioProjects[1].heroImage}
                    imageAlt={portfolioProjects[1].alt}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    compact
                  />
                </div>
              </div>

              {/* Pair 2: Small left + Large right (inverted) */}
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="col-span-full lg:col-span-5">
                  <EditorialProjectEntry
                    index={3}
                    id={portfolioProjects[2].id}
                    title={portfolioProjects[2].title}
                    category={portfolioProjects[2].category}
                    description={portfolioProjects[2].description}
                    image={portfolioProjects[2].heroImage}
                    imageAlt={portfolioProjects[2].alt}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    compact
                  />
                </div>
                <div className="col-span-full lg:col-span-7">
                  <EditorialProjectEntry
                    index={4}
                    id={portfolioProjects[3].id}
                    title={portfolioProjects[3].title}
                    category={portfolioProjects[3].category}
                    description={portfolioProjects[3].description}
                    image={portfolioProjects[3].heroImage}
                    imageAlt={portfolioProjects[3].alt}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    compact
                  />
                </div>
              </div>

              {/* Pair 3: Large left + Small right */}
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="col-span-full lg:col-span-7">
                  <EditorialProjectEntry
                    index={5}
                    id={portfolioProjects[4].id}
                    title={portfolioProjects[4].title}
                    category={portfolioProjects[4].category}
                    description={portfolioProjects[4].description}
                    image={portfolioProjects[4].heroImage}
                    imageAlt={portfolioProjects[4].alt}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    compact
                  />
                </div>
                <div className="col-span-full lg:col-span-5">
                  <EditorialProjectEntry
                    index={6}
                    id={portfolioProjects[5].id}
                    title={portfolioProjects[5].title}
                    category={portfolioProjects[5].category}
                    description={portfolioProjects[5].description}
                    image={portfolioProjects[5].heroImage}
                    imageAlt={portfolioProjects[5].alt}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    compact
                  />
                </div>
              </div>

              {/* Final: Full-width closer */}
              <div>
                <EditorialProjectEntry
                  index={7}
                  id={portfolioProjects[6].id}
                  title={portfolioProjects[6].title}
                  category={portfolioProjects[6].category}
                  description={portfolioProjects[6].description}
                  image={portfolioProjects[6].heroImage}
                  imageAlt={portfolioProjects[6].alt}
                  sizes="(max-width: 1024px) 100vw, 90vw"
                  fullWidth
                />
              </div>

            </div>
          </div>
        </section>

        {/* 04. Minimal footer CTA */}
        <section
          className="relative bg-[#111111] py-24 sm:py-32 border-t border-[#1f1f1f]"
          aria-label="Project enquiry"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f2ea] max-w-lg leading-tight">
                Looking for a bespoke architectural build?
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5 shrink-0"
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
