"use client";

import Link from "next/link";
import { servicesData } from "@/data/services";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { CinematicHeading } from "@/components/motion/CinematicHeading";

/**
 * EditorialServicesSection
 *
 * Three services presented as full editorial stories — large image, dominant
 * number, title hierarchy, scope list, and a single understated CTA per service.
 */
export function EditorialServicesSection() {
  return (
    <section
      id="services-overview"
      className="services-section relative bg-[#0d0d0d] py-28 sm:py-36 lg:py-52"
      aria-label="Signature Architectural Services"
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1f1f1f]" />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-20 lg:mb-28 max-w-2xl space-y-5">
          <CinematicHeading
            eyebrow="What We Do"
            lines={["From vision", "to finished space."]}
            italicIndex={1}
            italicClassName="font-normal italic text-[#c0b89a]"
            className="font-display leading-[1.08] text-[#f5f2ea]"
            mode="masked-line"
          />
          <ScrollReveal delay={0.2} duration={0.85}>
            <p className="max-w-lg text-sm leading-[1.85] text-[#706a63]">
              Architecture, construction, and interiors — integrated across the complete lifecycle of a project.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Service entries ────────────────────────────────────────────── */}
        <div className="space-y-0">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={service.id}
                id={service.id}
                className="service-block scroll-mt-28"
              >
                {/* Gradient separator — not before first item */}
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="my-24 sm:my-32 lg:my-40 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)",
                    }}
                  />
                )}

                <ScrollReveal threshold="top 88%" className="space-y-10 lg:space-y-12">

                  {/* ── Header row: number / title / description ────────── */}
                  <div className="grid gap-5 lg:grid-cols-[80px_1fr_1fr] lg:items-end lg:gap-12">

                    {/* Number — very large, light weight, anchors the row */}
                    <p
                      className="font-display font-light leading-none text-[#c9a227]/35 select-none"
                      style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
                      aria-hidden="true"
                    >
                      {service.number}
                    </p>

                    {/* Title + subtitle */}
                    <div className="space-y-2 lg:border-b lg:border-[#1e1e1e] lg:pb-5">
                      <h3
                        className="font-display leading-[1.1] text-[#f0ece4]"
                        style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", letterSpacing: "-0.01em" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5a5450]">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description — muted, supporting weight only */}
                    <p className="text-sm leading-[1.85] text-[#6e6760] lg:border-b lg:border-[#1e1e1e] lg:pb-5">
                      {service.description}
                    </p>
                  </div>

                  {/* ── Image + scope grid ─────────────────────────────── */}
                  <div
                    className={`grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start lg:gap-14 ${
                      !isEven ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Architecture photograph */}
                    <CinematicImage
                      src={service.image}
                      alt={service.alt}
                      aspectRatio="h-[340px] sm:h-[480px] lg:h-[580px]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      cursorLabel="EXPLORE"
                      parallaxSpeed={10}
                      containerClassName="relative overflow-hidden rounded-[1.25rem] border border-[#1e1e1e] bg-[#0a0b0e]"
                    />

                    {/* Scope list + CTA */}
                    <div className="space-y-8 lg:pt-4">
                      <div className="space-y-1">
                        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a227]/70">
                          Scope of Work
                        </p>
                        <ul className="space-y-3">
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

                      <Link
                        href={service.href}
                        className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] transition-all duration-300 hover:gap-5"
                      >
                        Learn more
                        <span
                          className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                </ScrollReveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { EditorialServicesSection as ServicesSection };
