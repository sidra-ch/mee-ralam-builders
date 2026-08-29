import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Section className="relative overflow-hidden border-b border-[#1f1f1f] bg-[#111111]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.18),_transparent_45%)]" />
          <Container className="relative grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
            <div className="space-y-7">
              <p className="eyebrow">Luxury construction + design</p>
              <h1 className="max-w-xl font-display text-5xl leading-[0.9] text-[#f5f2ea] sm:text-6xl lg:text-7xl">
                Premium spaces shaped with clarity and craft.
              </h1>
              <p className="max-w-lg text-lg text-[#c7c0b5]">
                Meer Alam Builders is a premium architectural and interior design practice focused on refined living, meticulous construction, and elevated detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact">Book a consultation</Button>
                <Button href="/projects" variant="secondary">View portfolio</Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#262626] bg-[#171717] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="overflow-hidden rounded-[1.5rem] border border-[#2a2a2a] bg-[linear-gradient(135deg,#1b1b1b_0%,#111111_100%)] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.32em] text-[#c9a227]">Preview</span>
                  <span className="rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f5f2ea]">
                    Architecture
                  </span>
                </div>
                <div className="grid gap-4">
                  <div className="h-64 rounded-[1.5rem] bg-[linear-gradient(135deg,#3f362a,#171717_60%,#111111)]" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="h-28 rounded-[1.25rem] border border-[#2b2b2b] bg-[#111111]" />
                    <div className="h-28 rounded-[1.25rem] border border-[#2b2b2b] bg-[#1a1a1a]" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              eyebrow="Design foundation"
              title="A luxury framework for future growth."
              description="The current phase establishes the visual system, structure, performance strategy, and scalable foundation required for a premium architectural brand experience."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Luxury identity",
                  text: "Dark surfaces, warm neutrals, and restrained gold accents create a premium architectural visual language.",
                },
                {
                  title: "Responsive structure",
                  text: "The layout system supports editorial presentation across desktop, laptop, tablet, and mobile without forcing a single desktop pattern down to smaller screens.",
                },
                {
                  title: "Performance-first",
                  text: "The foundation is prepared for optimized images, reduced motion support, and future heavy 3D experiences with careful loading strategies.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#1f1f1f] bg-[#171717] p-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#c9a227]">01</p>
                  <h3 className="mb-3 text-xl text-[#f5f2ea]">{item.title}</h3>
                  <p className="text-base text-[#c7c0b5]">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-[#171717]">
          <Container className="grid gap-8 lg:grid-cols-3">
            <SectionHeading
              eyebrow="Placeholder content"
              title="Future-ready without false claims."
              description="The site currently uses careful placeholders while brand assets, company details, and project information are still pending client confirmation."
            />

            <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
              {[
                "Services overview",
                "Project showcase",
                "About profile",
                "Client contact flow",
              ].map((label) => (
                <div key={label} className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">Entry</p>
                  <p className="mt-4 text-lg text-[#f5f2ea]">{label}</p>
                  <Link href="/contact" className="mt-6 inline-block text-sm uppercase tracking-[0.2em] text-[#f5f2ea] transition hover:text-[#c9a227]">
                    Placeholder link
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
