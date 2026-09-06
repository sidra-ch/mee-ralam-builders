import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ServiceDetailHero } from "@/components/services/ServiceDetailHero";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { getServiceBySlug, servicesData } from "@/data/services";

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

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

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

        {/* Service details */}
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

        {/* Related images */}
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

        {/* CTA */}
        <section
          className="border-t border-[#1f1f1f] bg-[#0d0e12] py-14 sm:py-16 lg:py-20"
          aria-label="Start a project enquiry"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display max-w-lg text-2xl leading-tight text-[#f5f2ea] sm:text-3xl lg:text-4xl">
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
