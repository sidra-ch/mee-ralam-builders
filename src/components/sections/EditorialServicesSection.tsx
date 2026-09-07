"use client";

import Link from "next/link";
import { servicesData } from "@/data/services";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { CinematicHeading } from "@/components/motion/CinematicHeading";

/**
 * EditorialServicesSection
 *
 * Minimal services preview for homepage — just a compact list with CTA.
 * Full editorial stories live on the dedicated services page.
 */
export function EditorialServicesSection() {
  return (
    <section
      id="services-overview"
      className="services-section relative bg-[#0d0d0d] py-12 sm:py-16 lg:py-20"
      aria-label="Signature Architectural Services"
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1f1f1f]" />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-12 lg:mb-16 max-w-2xl space-y-4">
          <CinematicHeading
            eyebrow="Services"
            lines={["What we do."]}
            italicIndex={0}
            italicClassName="font-normal italic text-[#c0b89a]"
            className="font-display leading-[1.08] text-[#f5f2ea]"
            mode="masked-line"
            from="left"
          />
        </div>

        {/* ── Minimal service list ───────────────────────────────────────── */}
        <ScrollReveal delay={0.15} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group space-y-3 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227] group-hover:text-[#c9a227]/80 transition-colors">
                {service.number}
              </p>
              <h3 className="font-display text-xl sm:text-2xl text-[#f5f2ea] leading-tight group-hover:text-[#f0ece4] transition-colors">
                {service.title}
              </h3>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5a5450]">
                {service.subtitle}
              </p>
            </Link>
          ))}
        </ScrollReveal>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <ScrollReveal delay={0.25} className="mt-12 lg:mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] transition-all duration-300 hover:gap-5"
          >
            Explore all services
            <span
              className="text-sm transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { EditorialServicesSection as ServicesSection };
