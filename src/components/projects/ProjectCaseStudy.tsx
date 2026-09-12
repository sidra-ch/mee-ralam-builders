"use client";

import Link from "next/link";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicHeading } from "@/components/motion/CinematicHeading";
import { ProjectImageLightbox } from "@/components/projects/ProjectImageLightbox";
import { BeforeAfterComparison } from "@/components/projects/BeforeAfterComparison";
import { getProjectById, type Project } from "@/data/projects";
import { getWhatsAppUrl } from "@/lib/constants";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const nextProject = project.nextProjectId ? getProjectById(project.nextProjectId) : null;

  return (
    <article className="bg-[#0d0e12] min-h-screen text-[#f5f2ea]">
      <div className="mx-auto w-full max-w-[1360px] px-6 pb-28 pt-12 sm:px-12 sm:pt-16 sm:pb-36 lg:px-20 lg:pt-20 lg:pb-44">

        {/* 01. Back Link */}
        <ScrollReveal yOffset={12} duration={0.6} className="mb-12 sm:mb-16">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a8378] transition-colors hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            All Projects
          </Link>
        </ScrollReveal>

        {/* 02. Case Study Header */}
        <header className="mb-14 max-w-4xl space-y-5 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
              Case Study / {project.number || "01"}
            </p>
            {project.location ? (
              <>
                <span className="text-[#3a3a3a]">·</span>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#7e776e]">
                  {project.location}
                </p>
              </>
            ) : null}
          </div>

          <CinematicHeading
            as="h1"
            lines={project.title}
            className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.04] text-[#f5f2ea]"
            mode="masked-line"
          />

          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-[#c7c0b5] leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </ScrollReveal>
        </header>

        {/* 03. Specifications Metadata Ribbon */}
        {project.specs && project.specs.length > 0 ? (
          <ScrollReveal yOffset={16} duration={0.7} className="mb-16 sm:mb-24">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-y border-[#1f1f1f] py-6 sm:py-8">
              {project.specs.map((spec) => (
                <div key={spec.label} className="space-y-1.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                    {spec.label}
                  </p>
                  <p className="font-display text-sm sm:text-base text-[#f5f2ea]">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ) : null}

        {/* 04. Hero Architectural Photograph / Interior Film */}
        <section aria-label="Primary project photography and film" className="mb-20 sm:mb-28 lg:mb-36">
          {project.video ? (
            <div className="group overflow-hidden rounded-[1.75rem] border border-[#2b2925] bg-[#0a0b0e] shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
              <div className="relative">
                <video
                  className="aspect-[16/9] w-full object-cover"
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={project.video.poster}
                  src={project.video.src}
                  aria-label={project.video.alt}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
                <p className="pointer-events-none absolute left-6 top-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f5f2ea] sm:left-8 sm:top-8">
                  Project Film / {project.title}
                </p>
              </div>
              <div className="flex flex-col gap-3 border-t border-[#242321] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#c9a227]">
                  Cinematic project study
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#6f685f]">
                  Use controls to explore
                </span>
              </div>
            </div>
          ) : (
            <ProjectImageLightbox src={project.heroImage} alt={project.alt}>
              <CinematicImage
                src={project.heroImage}
                alt={project.alt}
                aspectRatio="h-[440px] sm:h-[600px] lg:h-[820px]"
                sizes="(max-width: 1400px) 100vw, 1360px"
                priority
                parallaxSpeed={8}
                objectPosition={project.objectPosition}
                containerClassName="relative overflow-hidden rounded-[1.75rem] border border-[#222222] bg-[#0a0b0e]"
              />
            </ProjectImageLightbox>
          )}
          <div className="mt-3 flex items-center justify-between px-2 text-[10px] uppercase tracking-[0.24em] text-[#5a544c]">
            <span>{project.video ? "Spatial atmosphere & materiality" : "Primary elevation & massing"}</span>
            <span>{project.video ? "Cinematic project study" : "Click image to expand"}</span>
          </div>
        </section>

        {/* 05. Design Story & Concept Narrative */}
        {project.story ? (
          <section
            aria-label="Design story and architectural narrative"
            className="mb-24 sm:mb-32 lg:mb-40 border-t border-[#1f1f1f] pt-16 sm:pt-24"
          >
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
              {/* Left Column: Eyebrow & Lead */}
              <div className="space-y-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                  Design Story
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#f5f2ea] leading-tight">
                  Intentional spatial clarity and durable craft.
                </h2>
                <div className="h-[1px] w-16 bg-[#c9a227]/40" />
              </div>

              {/* Right Column: Narrative Details */}
              <div className="space-y-10">
                <ScrollReveal delay={0.1} className="space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]">
                    01 / Spatial Intent
                  </p>
                  <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed">
                    {project.story.overview}
                  </p>
                  <p className="text-sm sm:text-base text-[#a89d92] leading-relaxed">
                    {project.story.spatialIntent}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2} className="space-y-4 border-t border-[#1a1a1a] pt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]">
                    02 / Materiality &amp; Construction
                  </p>
                  <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed">
                    {project.story.materiality}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </section>
        ) : null}

        {/* 06. Pull Quote Statement */}
        {project.quote ? (
          <section
            aria-label="Architectural statement"
            className="mb-24 sm:mb-32 lg:mb-40 border-y border-[#1f1f1f] bg-[#111111] py-16 sm:py-24 px-6 sm:px-12 text-center rounded-[1.5rem]"
          >
            <ScrollReveal className="mx-auto max-w-3xl space-y-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                Architectural Philosophy
              </p>
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#f5f2ea] leading-[1.3] italic font-normal">
                &ldquo;{project.quote}&rdquo;
              </blockquote>
            </ScrollReveal>
          </section>
        ) : null}

        {/* 07. Visual Rhythm / Curated Project Gallery */}
        {project.gallery && project.gallery.length > 0 ? (
          <section
            aria-label="Architectural detail gallery"
            className="mb-24 sm:mb-32 lg:mb-44 space-y-12 sm:space-y-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-[#1f1f1f] pb-6">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  Visual Narrative
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-[#f5f2ea]">
                  Materiality &amp; Craft Details
                </h3>
              </div>
              <p className="text-xs text-[#7e776e]">
                {project.gallery.length} Curated Media
              </p>
            </div>

            <div className="grid gap-10 sm:gap-14 lg:grid-cols-2">
              {project.gallery.map((item, idx) => (
                <ScrollReveal
                  key={item.src}
                  delay={idx * 0.1}
                  className={`group space-y-3 ${idx === 2 ? "lg:col-span-2" : ""}`}
                >
                  {item.video ? (
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-[#222222] bg-[#0a0b0e]">
                      <video
                        className={`w-full object-cover ${item.aspect || "h-[360px] sm:h-[480px] lg:h-[560px]"}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        poster={item.poster}
                        src={item.src}
                        aria-label={item.alt}
                      />
                    </div>
                  ) : (
                    <ProjectImageLightbox src={item.src} alt={item.alt}>
                      <CinematicImage
                        src={item.src}
                        alt={item.alt}
                        aspectRatio={item.aspect || "h-[360px] sm:h-[480px] lg:h-[560px]"}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        parallaxSpeed={6}
                        containerClassName="relative overflow-hidden rounded-[1.5rem] border border-[#222222] bg-[#0a0b0e]"
                      />
                    </ProjectImageLightbox>
                  )}
                  {item.caption ? (
                    <p className="text-xs text-[#8e8578] tracking-wide px-1">
                      {item.caption}
                    </p>
                  ) : null}
                </ScrollReveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* 08. Before / After Transformation — only shown when genuine imagery is provided */}
        {project.transformation ? (
          <BeforeAfterComparison
            beforeSrc={project.transformation.beforeSrc}
            beforeAlt={project.transformation.beforeAlt}
            afterSrc={project.transformation.afterSrc}
            afterAlt={project.transformation.afterAlt}
            eyebrow={project.transformation.eyebrow}
            heading={project.transformation.heading}
            subtext={project.transformation.subtext}
          />
        ) : null}

        {/* 09. Case Study Pagination / Next Project */}
        {nextProject ? (
          <section
            aria-label="Next project navigation"
            className="mb-20 sm:mb-28 border-t border-[#1f1f1f] pt-16 sm:pt-24"
          >
            <ScrollReveal className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 bg-[#111111] p-8 sm:p-12 lg:p-16 rounded-[1.75rem] border border-[#222222]">
              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  Next Case Study
                </p>
                <h4 className="font-display text-3xl sm:text-4xl text-[#f5f2ea]">
                  {nextProject.title}
                </h4>
                <p className="text-xs text-[#8e8578] uppercase tracking-[0.24em]">
                  {nextProject.category} · {nextProject.location}
                </p>
              </div>

              <Link
                href={`/projects/${nextProject.id}`}
                className="group inline-flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                Explore Next Case Study
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </ScrollReveal>
          </section>
        ) : null}

        {/* 10. Consultation Call to Action */}
        <section
          aria-label="Enquire about this architectural project"
          className="border-t border-[#1f1f1f] pt-16 sm:pt-20 text-center space-y-6"
        >
          <ScrollReveal className="mx-auto max-w-xl space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl text-[#f5f2ea]">
              Discuss a project of similar scale.
            </h3>
            <p className="text-sm text-[#c7c0b5] leading-relaxed">
              Every commission begins with a disciplined architectural dialogue. Connect with our team to explore your site or residence.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppUrl(`Hello Meer Alam Builders, I would like to discuss the ${project.title} project.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Discuss the ${project.title} project on WhatsApp`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#c9a227]/60 bg-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all duration-300 hover:border-[#c9a227] hover:bg-[#c9a227]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227]"
              >
                Discuss This Project →
              </a>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </article>
  );
}
