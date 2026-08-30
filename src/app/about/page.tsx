import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicPageHero } from "@/components/hero/CinematicPageHero";
import { CinematicImage } from "@/components/motion/CinematicImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Meer Alam Builders",
  description:
    "A design and construction practice shaped around premium residential and commercial environments. Founded on disciplined planning, architectural clarity, and respect for workmanship.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 01. Cinematic Hero */}
        <CinematicPageHero
          eyebrow="About Us"
          title={["Built on Trust.", "Driven by Craft."]}
          description="A practice shaped around architectural clarity, disciplined construction, and a deep respect for enduring materials."
          image="/images/img-12.png"
          imageAlt="Craftspeople completing a refined residential interior"
          cta={{ label: "Our Services", href: "/services" }}
        />

        {/* 02. Short Editorial Story */}
        <section
          className="relative bg-[#0d0e12] py-28 sm:py-36 lg:py-44 border-t border-[#1f1f1f]"
          aria-label="About Meer Alam Builders"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <div className="grid gap-16 lg:gap-24 lg:grid-cols-[1fr_1.2fr] lg:items-center">

              {/* Text column */}
              <ScrollReveal className="space-y-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  Our Story
                </p>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[#f5f2ea]">
                  Architecture shaped around what endures.
                </h2>
                <p className="text-base sm:text-lg text-[#c7c0b5] leading-relaxed max-w-lg">
                  Meer Alam Builders is a design and construction practice shaped around premium residential and commercial environments. The foundation of the brand is rooted in disciplined planning, architectural clarity, and a strong respect for workmanship.
                </p>
                <p className="text-sm text-[#a89d92] leading-relaxed max-w-lg">
                  From the earliest site conversation to the moment of final handover, every decision is made with intention — balancing structural precision, material quality, and the lived experience of each space.
                </p>
              </ScrollReveal>

              {/* Large architectural image */}
              <div>
                <CinematicImage
                  src="/images/img-22.png"
                  alt="Flagship luxury villa at twilight with illuminated terraces"
                  aspectRatio="h-[420px] sm:h-[540px] lg:h-[620px]"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  parallaxSpeed={10}
                  containerClassName="relative overflow-hidden rounded-[1.75rem] border border-[#2a2a2a] bg-[#0d0e12]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 03. Full-bleed editorial detail image + statement */}
        <section
          className="relative overflow-hidden bg-[#0d0e12] py-0 border-t border-[#1f1f1f]"
          aria-label="Architectural Craft & Detail"
        >
          <div className="relative h-[480px] sm:h-[580px] lg:h-[680px] w-full">
            <CinematicImage
              src="/images/img-21.png"
              alt="Textured stone architectural wall with warm uplighting — Meer Alam Builders"
              aspectRatio="h-[480px] sm:h-[580px] lg:h-[680px]"
              sizes="100vw"
              parallaxSpeed={12}
              reveal={false}
              containerClassName="relative overflow-hidden bg-[#0d0e12] h-full"
              className="object-cover"
            />

            {/* Overlay + statement */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12]/90 via-black/40 to-black/25 flex items-center justify-center text-center px-6">
              <ScrollReveal className="max-w-xl space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                  Materiality &amp; Craft
                </p>
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#f5f2ea]">
                  Every detail has a purpose.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 04. Values — minimal editorial list, no cards */}
        <section
          className="relative bg-[#111111] py-28 sm:py-36 lg:py-44 border-t border-[#1f1f1f]"
          aria-label="Practice Values"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="mb-16 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]">
                Our Approach
              </p>
              <h2 className="max-w-2xl font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[#f5f2ea]">
                A disciplined, client-focused process.
              </h2>
            </ScrollReveal>

            <div className="grid gap-0 divide-y divide-[#1f1f1f]">
              {[
                {
                  label: "01",
                  title: "Precision-led delivery",
                  text: "Every stage planned with clarity, accountability, and careful attention to execution quality.",
                },
                {
                  label: "02",
                  title: "Refined design language",
                  text: "Spaces that balance architectural intent, material warmth, and lasting usability.",
                },
                {
                  label: "03",
                  title: "Client-first process",
                  text: "Communication and collaboration remain central to every milestone — from concept to handover.",
                },
              ].map((item) => (
                <ScrollReveal
                  key={item.label}
                  yOffset={20}
                  duration={0.7}
                  className="py-10 grid gap-4 sm:grid-cols-[80px_1fr_1.5fr] sm:items-baseline"
                >
                  <p className="font-display text-3xl font-light text-[#c9a227]/50">
                    {item.label}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#f5f2ea]">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#c7c0b5] leading-relaxed">
                    {item.text}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 05. Minimal CTA — single line */}
        <section
          className="relative bg-[#0d0e12] py-24 sm:py-32 border-t border-[#1f1f1f]"
          aria-label="Contact call to action"
        >
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-20">
            <ScrollReveal className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f2ea] max-w-lg leading-tight">
                Ready to begin a conversation?
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
