import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicPageHero } from "@/components/hero/CinematicPageHero";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Meer Alam Builders",
  description:
    "Architecture & Planning, Precision Construction, and Interior Architecture — integrated under one practice.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 01. Cinematic Hero */}
        <CinematicPageHero
          eyebrow="Our Services"
          title={["Spaces,", "Shaped with Purpose."]}
          description="Integrated architecture, disciplined construction, and bespoke interior design — delivered under one practice."
          image="/images/img-16.png"
          imageAlt="Architectural exterior detail — Meer Alam Builders"
          cta={{ label: "Explore Services", href: "#architecture" }}
        />

        {/* 02. Editorial Service Stories */}
        <section
          className="relative bg-[#0d0d0d] py-28 sm:py-36 lg:py-48 border-t border-[#1f1f1f]"
          aria-label="Our Services"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <div className="space-y-32 sm:space-y-40 lg:space-y-52">
              {servicesData.map((service, index) => {
                const isEven = index % 2 === 0;
                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className="scroll-mt-24"
                    aria-label={`Service: ${service.title}`}
                  >
                    <div
                      className={`grid gap-12 lg:gap-16 items-center ${
                        isEven
                          ? "lg:grid-cols-[1.6fr_1fr]"
                          : "lg:grid-cols-[1fr_1.6fr]"
                      }`}
                    >
                      {/* Image */}
                      <div className={!isEven ? "lg:order-2" : ""}>
                        <CinematicImage
                          src={service.image}
                          alt={service.alt}
                          aspectRatio="h-[360px] sm:h-[480px] lg:h-[560px]"
                          sizes={
                            isEven
                              ? "(max-width: 1024px) 100vw, 62vw"
                              : "(max-width: 1024px) 100vw, 62vw"
                          }
                          parallaxSpeed={10}
                          cursorLabel="EXPLORE"
                          containerClassName="relative overflow-hidden rounded-[1.5rem] border border-[#2a2a2a] bg-[#0d0e12]"
                        />
                      </div>

                      {/* Text */}
                      <ScrollReveal
                        yOffset={24}
                        duration={0.9}
                        className={`space-y-7 ${!isEven ? "lg:order-1" : ""}`}
                      >
                        {/* Number */}
                        <p className="font-display text-6xl font-light text-[#c9a227]/30 leading-none">
                          {service.number}
                        </p>

                        {/* Title */}
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#f5f2ea]">
                          {service.title}
                        </h2>

                        {/* Subtitle */}
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#a89d92]">
                          {service.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed max-w-sm">
                          {service.description}
                        </p>

                        {/* Scope list — minimal, no icons or bullets */}
                        <ul className="space-y-2 border-t border-[#222222] pt-6">
                          {service.scopeList.map((scope) => (
                            <li
                              key={scope}
                              className="flex items-start gap-3 text-sm text-[#d7d0c7]"
                            >
                              <span
                                className="mt-2 h-[1px] w-4 shrink-0 bg-[#c9a227]/60"
                                aria-hidden="true"
                              />
                              {scope}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="pt-2">
                          <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:gap-5"
                          >
                            Enquire
                            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        </div>
                      </ScrollReveal>
                    </div>

                    {/* Separator between services */}
                    {index < servicesData.length - 1 && (
                      <div
                        className="mt-32 sm:mt-40 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent"
                        aria-hidden="true"
                      />
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 03. Minimal CTA */}
        <section
          className="relative bg-[#0d0e12] py-24 sm:py-32 border-t border-[#1f1f1f]"
          aria-label="Start a project enquiry"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f2ea] max-w-lg leading-tight">
                Discuss your next project.
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
