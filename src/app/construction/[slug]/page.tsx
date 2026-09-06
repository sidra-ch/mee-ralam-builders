import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicPageHero } from "@/components/hero/CinematicPageHero";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getConstructionStoryBySlug, constructionStories } from "@/data/construction";
import { projectsData } from "@/data/projects";

interface ConstructionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return constructionStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: ConstructionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getConstructionStoryBySlug(slug);

  if (!story) {
    return {
      title: "Construction Story Not Found | Meer Alam Builders",
      description: "The requested construction story was not found.",
    };
  }

  return {
    title: `${story.title} | Meer Alam Builders`,
    description: `${story.label} - ${story.body}`,
  };
}

export default async function ConstructionPage({ params }: ConstructionPageProps) {
  const { slug } = await params;
  const story = getConstructionStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  // Find related projects for this stage
  const relatedProjects = projectsData.slice(0, 3);

  return (
    <>
      <SiteHeader />

      <main>
        {/* 01. Cinematic Hero */}
        <CinematicPageHero
          eyebrow={`Construction / ${story.index}`}
          title={[story.title, ""]}
          description={story.label}
          image={story.src}
          imageAlt={`${story.title} - Meer Alam Builders construction process`}
        />

        {/* 02. Introduction */}
        <section className="relative bg-[#0d0e12] py-20 sm:py-28 lg:py-36 border-t border-[#1f1f1f]">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="max-w-3xl space-y-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                {story.index} / {story.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[#f5f2ea]">
                {story.title}
              </h2>
              <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed">
                {story.body}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 03. Detailed Description */}
        <section className="relative bg-[#111111] py-20 sm:py-28 lg:py-36 border-t border-[#1f1f1f]">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-12 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                In Detail
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[#f5f2ea]">
                Our approach
              </h2>
            </ScrollReveal>

            <ScrollReveal className="max-w-3xl">
              <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed">
                {story.detailedDescription}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 04. Key Points */}
        <section className="relative bg-[#0d0e12] py-20 sm:py-28 lg:py-36 border-t border-[#1f1f1f]">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-12 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                Key Points
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[#f5f2ea]">
                What makes this stage essential
              </h2>
            </ScrollReveal>

            <div className="grid gap-0 divide-y divide-[#1f1f1f]">
              {story.keyPoints.map((point, index) => (
                <ScrollReveal
                  key={point}
                  yOffset={16}
                  delay={index * 0.1}
                  className="py-6 sm:py-8 grid gap-3 sm:gap-4 sm:grid-cols-[80px_1fr] sm:items-baseline"
                >
                  <p className="font-display text-2xl font-light text-[#c9a227]/50">
                    {(index + 1).toString().padStart(2, '0')}
                  </p>
                  <p className="text-sm text-[#c7c0b5] leading-relaxed">
                    {point}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 05. Process Workflow */}
        <section className="relative bg-[#111111] py-20 sm:py-28 lg:py-36 border-t border-[#1f1f1f]">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-12 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                Process
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[#f5f2ea]">
                How we work
              </h2>
            </ScrollReveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {story.process.map((step, index) => (
                <ScrollReveal key={step} delay={index * 0.1}>
                  <div className="space-y-3">
                    <p className="font-display text-4xl font-light text-[#c9a227]/30 leading-none">
                      {(index + 1).toString().padStart(2, '0')}
                    </p>
                    <p className="text-sm text-[#c7c0b5] leading-relaxed">
                      {step}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 06. Large Visual Section */}
        <section className="relative overflow-hidden bg-[#0d0e12] py-0 border-t border-[#1f1f1f]">
          <div className="relative h-[480px] sm:h-[580px] lg:h-[680px] w-full">
            <CinematicImage
              src={story.src}
              alt={story.alt}
              aspectRatio="h-[480px] sm:h-[580px] lg:h-[680px]"
              sizes="100vw"
              parallaxSpeed={12}
              reveal={false}
              containerClassName="relative overflow-hidden bg-[#0d0e12] h-full"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12]/90 via-black/40 to-black/25 flex items-center justify-center text-center px-6">
              <ScrollReveal className="max-w-xl space-y-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  Craft & Precision
                </p>
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#f5f2ea]">
                  Every detail matters.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 07. Related Projects */}
        <section className="relative bg-[#111111] py-20 sm:py-28 lg:py-36 border-t border-[#1f1f1f]">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-12 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                Related Projects
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[#f5f2ea]">
                Work from this phase
              </h2>
            </ScrollReveal>

            <div className="grid gap-8 sm:gap-12 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="group block"
                  >
                    <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] w-full overflow-hidden rounded-[1.25rem] border border-[#2a2a2a] bg-[#0d0e12] transition-all duration-500 hover:border-[#c9a227]/50">
                      <Image
                        src={project.heroImage}
                        alt={project.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 opacity-70 transition-opacity duration-300 group-hover:opacity-85" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="space-y-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                          <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">
                            {project.category}
                          </p>
                          <h3 className="font-display text-xl sm:text-2xl text-[#f5f2ea] leading-tight">
                            {project.title}
                          </h3>
                        </div>
                        <div className="mt-4 h-[1px] w-0 bg-[#c9a227]/60 transition-all duration-500 group-hover:w-16" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 08. Final CTA */}
        <section className="relative bg-[#0d0e12] py-20 sm:py-28 lg:py-36 border-t border-[#1f1f1f]">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f2ea] max-w-lg leading-tight">
                Discuss your construction project
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