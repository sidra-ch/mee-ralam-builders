"use client";

import Link from "next/link";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicHeading } from "@/components/motion/CinematicHeading";
import { ProjectImageLightbox } from "@/components/projects/ProjectImageLightbox";
import { ProjectVideo } from "@/components/ui/ProjectVideo";
import { getProjectBySlug, type Project, type ProjectImage } from "@/data/projects";
import { getWhatsAppUrl } from "@/lib/constants";

function uniqueImages(groups: Array<ProjectImage[] | undefined>): ProjectImage[] {
  const seen = new Set<string>();
  const out: ProjectImage[] = [];
  for (const group of groups) {
    if (!group) continue;
    for (const item of group) {
      if (seen.has(item.src)) continue;
      seen.add(item.src);
      out.push(item);
    }
  }
  return out;
}

function ImageBand({
  title,
  eyebrow,
  images,
}: {
  title: string;
  eyebrow: string;
  images: ProjectImage[];
}) {
  if (!images.length) return null;

  return (
    <section
      aria-label={title}
      className="mb-16 border-t border-[#1f1f1f] pt-12 sm:mb-24 sm:pt-16 lg:mb-28"
    >
      <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl text-[#f5f2ea] sm:text-3xl">{title}</h2>
        </div>
      </div>

      <div className={`grid gap-6 sm:gap-8 ${images.length === 1 ? "" : "lg:grid-cols-2"}`}>
        {images.map((item, idx) => (
          <ScrollReveal
            key={item.src}
            delay={idx * 0.08}
            className={images.length > 2 && idx === 0 ? "lg:col-span-2" : ""}
          >
            <ProjectImageLightbox src={item.src} alt={item.alt}>
              <CinematicImage
                src={item.src}
                alt={item.alt}
                aspectRatio={item.aspect || "h-[280px] sm:h-[420px] lg:h-[520px]"}
                sizes="(max-width: 1024px) 100vw, 50vw"
                parallaxSpeed={6}
                containerClassName="relative overflow-hidden rounded-[1.25rem] border border-[#222] bg-[#0a0b0e] sm:rounded-[1.5rem]"
              />
            </ProjectImageLightbox>
            {item.caption ? (
              <p className="mt-3 px-1 text-xs tracking-wide text-[#8e8578]">{item.caption}</p>
            ) : null}
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const nextProject = project.nextProjectSlug
    ? getProjectBySlug(project.nextProjectSlug)
    : null;

  const galleryExtras = uniqueImages([project.gallery]).filter((item) => {
    const used = new Set(
      uniqueImages([
        project.beforeImages,
        project.constructionImages,
        project.afterImages,
        project.interiorImages,
        project.exteriorImages,
        project.renovationImages,
        [{ src: project.heroImage, alt: project.alt }],
      ]).map((i) => i.src),
    );
    return !used.has(item.src);
  });

  return (
    <article className="min-h-screen bg-[#0d0e12] text-[#f5f2ea]">
      <div className="mx-auto w-full max-w-[1360px] px-4 pb-24 pt-10 sm:px-8 sm:pb-32 sm:pt-14 lg:px-20 lg:pt-20">
        <ScrollReveal yOffset={12} duration={0.6} className="mb-8 sm:mb-12">
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

        <header className="mb-10 max-w-4xl space-y-5 sm:mb-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
              Case Study / {project.number}
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
            className="font-display text-[2rem] leading-[1.08] text-[#f5f2ea] sm:text-6xl lg:text-7xl"
            mode="masked-line"
          />

          <ScrollReveal delay={0.15}>
            <p className="max-w-2xl text-base leading-relaxed text-[#c7c0b5] sm:text-lg">
              {project.description}
            </p>
          </ScrollReveal>

          <p className="text-[10px] uppercase tracking-[0.24em] text-[#6d665e]">{project.scope}</p>
        </header>

        <section aria-label="Primary project photography" className="mb-8 sm:mb-16">
          <ProjectImageLightbox src={project.heroImage} alt={project.alt}>
            <CinematicImage
              src={project.heroImage}
              alt={project.alt}
              aspectRatio="h-[320px] sm:h-[560px] lg:h-[760px]"
              sizes="(max-width: 1400px) 100vw, 1360px"
              priority
              parallaxSpeed={8}
              objectPosition={project.objectPosition}
              containerClassName="relative overflow-hidden rounded-[1.25rem] border border-[#222] bg-[#0a0b0e] sm:rounded-[1.75rem]"
            />
          </ProjectImageLightbox>
        </section>

        {project.video ? (
          <section aria-label="Project visual walkthrough" className="mb-16 border-t border-[#1f1f1f] pt-12 sm:mb-24 sm:pt-16 lg:mb-28">
            <div className="mb-8 max-w-2xl space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                Motion & Spatial Experience
              </p>
              <h2 className="font-display text-2xl text-[#f5f2ea] sm:text-3xl">
                {project.video.title ?? "Cinematic Walkthrough"}
              </h2>
            </div>
            <ScrollReveal>
              <ProjectVideo
                src={project.video.src}
                poster={project.video.poster ?? project.heroImage}
                title={project.video.title}
                aspect={project.video.aspect ?? "video"}
              />
            </ScrollReveal>
          </section>
        ) : null}

        <ImageBand eyebrow="01 / Before" title="Before" images={project.beforeImages ?? []} />
        <ImageBand
          eyebrow="02 / Construction"
          title="Construction Progress"
          images={project.constructionImages ?? []}
        />
        <ImageBand
          eyebrow="03 / After"
          title="After / Completed"
          images={project.afterImages ?? []}
        />
        <ImageBand eyebrow="04 / Interior" title="Interior" images={project.interiorImages ?? []} />
        <ImageBand eyebrow="05 / Exterior" title="Exterior" images={project.exteriorImages ?? []} />
        <ImageBand
          eyebrow="Renovation"
          title="Renovation Record"
          images={project.renovationImages ?? []}
        />
        <ImageBand eyebrow="Gallery" title="Gallery" images={galleryExtras} />

        {nextProject ? (
          <section
            aria-label="Next project navigation"
            className="mb-16 border-t border-[#1f1f1f] pt-12 sm:mb-24 sm:pt-20"
          >
            <ScrollReveal className="flex flex-col gap-6 rounded-[1.5rem] border border-[#222] bg-[#111] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-12">
              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  Next Project
                </p>
                <h3 className="font-display text-2xl text-[#f5f2ea] sm:text-4xl">
                  {nextProject.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8e8578]">
                  {nextProject.category}
                  {nextProject.location ? ` · ${nextProject.location}` : ""}
                </p>
              </div>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5"
              >
                View next
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </ScrollReveal>
          </section>
        ) : null}

        <section
          aria-label="Enquire about this project"
          className="border-t border-[#1f1f1f] pt-12 text-center sm:pt-16"
        >
          <ScrollReveal className="mx-auto max-w-xl space-y-5">
            <h3 className="font-display text-2xl text-[#f5f2ea] sm:text-4xl">
              Discuss a similar brief.
            </h3>
            <a
              href={getWhatsAppUrl(
                `Hello Meer Alam Builders, I would like to discuss a project similar to ${project.title}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#c9a227]/60 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:bg-[#c9a227]/10"
            >
              WhatsApp enquiry
            </a>
          </ScrollReveal>
        </section>
      </div>
    </article>
  );
}
