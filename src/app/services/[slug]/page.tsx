import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ServiceDetailHero } from "@/components/services/ServiceDetailHero";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { getServiceBySlug, servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | Meer Alam Builders" };
  }

  const title = `${service.title} | Meer Alam Builders`;

  return {
    title,
    description: service.description,
    openGraph: {
      title,
      description: service.description,
      type: "article",
      images: [{ url: service.image, alt: service.alt }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const relatedProjects = projectsData.slice(0, 3);

  return (
    <>
      <SiteHeader />

      <main>
        <ServiceDetailHero
          number={service.number}
          title={service.title}
          subtitle={service.subtitle}
          image={service.image}
          imageAlt={service.alt}
        />

        <section
          className="border-t border-[#1f1f1f] bg-[#0d0e12] py-16 sm:py-20 lg:py-24"
          aria-label={`${service.title} overview`}
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
              <p className="text-base leading-[1.85] text-[#c7c0b5]">
                {service.description}
              </p>

              <div className="space-y-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a227]/70">
                  Scope of Work
                </p>
                <ul className="space-y-3 border-t border-[#1e1e1e] pt-6">
                  {service.scopeList.map((scope) => (
                    <li
                      key={scope}
                      className="flex items-start gap-4 text-sm leading-relaxed text-[#8a8178]"
                    >
                      <span
                        className="mt-2.5 h-px w-4 shrink-0 bg-[#c9a227]/40"
                        aria-hidden="true"
                      />
                      {scope}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section
          className="border-t border-[#1f1f1f] bg-[#0d0e12] pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
          aria-label={`${service.title} project imagery`}
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5a5450]">
              Selected Imagery
            </p>
            <ServiceGallery images={service.gallery} />
          </div>
        </section>

        {service.video && (
          <section
            className="border-t border-[#1f1f1f] bg-[#111111] py-16 sm:py-20 lg:py-24"
            aria-label={`${service.title} film`}
          >
            <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
              <ScrollReveal className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                    Film / Material Study
                  </p>
                  <h2 className="font-display text-3xl leading-[1.08] text-[#f5f2ea] sm:text-4xl lg:text-5xl">
                    {service.video.title}
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-[#a89d92] sm:text-base">
                  {service.video.description}
                </p>
              </ScrollReveal>

              <ScrollReveal yOffset={24}>
                <div className="overflow-hidden rounded-[1.25rem] border border-[#2a2927] bg-[#0a0b0e]">
                  <video
                    className="aspect-video w-full object-cover"
                    src={service.video.src}
                    poster={service.video.poster}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <track kind="captions" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="flex flex-col gap-2 border-t border-[#2a2927] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]">
                      Architecture / Interior detail
                    </p>
                    <p className="text-xs text-[#746d67]">
                      Materials, light and proportion
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        <section className="relative border-t border-[#1f1f1f] bg-[#111111] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-12 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                Our Approach
              </p>
              <h2 className="font-display text-3xl leading-[1.1] text-[#f5f2ea] sm:text-4xl lg:text-5xl">
                How we work
              </h2>
            </ScrollReveal>

            <ScrollReveal className="max-w-3xl">
              <p className="text-sm leading-relaxed text-[#c7c0b5] sm:text-base">
                {service.detailedDescription}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative border-t border-[#1f1f1f] bg-[#0d0e12] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-12 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                Capabilities
              </p>
              <h2 className="font-display text-3xl leading-[1.1] text-[#f5f2ea] sm:text-4xl lg:text-5xl">
                What we deliver
              </h2>
            </ScrollReveal>

            <div className="grid gap-0 divide-y divide-[#1f1f1f]">
              {service.scopeList.map((scope, index) => (
                <ScrollReveal
                  key={scope}
                  yOffset={16}
                  delay={index * 0.1}
                  className="grid gap-3 py-6 sm:grid-cols-[80px_1fr] sm:items-baseline sm:gap-4 sm:py-8"
                >
                  <p className="font-display text-2xl font-light text-[#c9a227]/50">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-relaxed text-[#c7c0b5]">
                    {scope}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-[#1f1f1f] bg-[#111111] py-0">
          <div className="relative h-[480px] w-full sm:h-[580px] lg:h-[680px]">
            <CinematicImage
              src={service.featuredImage}
              alt={`${service.title} featured work`}
              aspectRatio="h-[480px] sm:h-[580px] lg:h-[680px]"
              sizes="100vw"
              parallaxSpeed={12}
              reveal={false}
              containerClassName="relative h-full overflow-hidden bg-[#111111]"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#111111]/90 via-black/40 to-black/25 px-6 text-center">
              <ScrollReveal className="max-w-xl space-y-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  Excellence
                </p>
                <p className="font-display text-3xl leading-tight text-[#f5f2ea] sm:text-4xl lg:text-5xl">
                  Every detail matters.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="relative border-t border-[#1f1f1f] bg-[#0d0e12] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-12 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
                Related Projects
              </p>
              <h2 className="font-display text-3xl leading-[1.1] text-[#f5f2ea] sm:text-4xl lg:text-5xl">
                Work from this service
              </h2>
            </ScrollReveal>

            <div className="grid gap-8 sm:gap-12 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <Link href={`/projects/${project.id}`} className="group block">
                    <div className="relative h-[280px] w-full overflow-hidden rounded-[1.25rem] border border-[#2a2a2a] bg-[#0d0e12] transition-all duration-500 hover:border-[#c9a227]/50 sm:h-[320px] lg:h-[360px]">
                      <Image
                        src={project.heroImage}
                        alt={project.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 opacity-70 transition-opacity duration-300 group-hover:opacity-85" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="space-y-2 transition-transform duration-300 group-hover:-translate-y-1">
                          <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">
                            {project.category}
                          </p>
                          <h3 className="font-display text-xl leading-tight text-[#f5f2ea] sm:text-2xl">
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

        <section className="relative border-t border-[#1f1f1f] bg-[#111111] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg font-display text-3xl leading-tight text-[#f5f2ea] sm:text-4xl lg:text-5xl">
                Ready to discuss your project?
              </p>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5"
              >
                Enquire
                <span
                  className="text-base transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
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
