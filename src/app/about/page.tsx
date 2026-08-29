import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const values = [
  {
    title: "Precision-led delivery",
    text: "Every stage is planned with clarity, accountability, and a careful attention to execution quality.",
  },
  {
    title: "Refined design language",
    text: "We develop spaces that balance architectural intent, material warmth, and lasting usability.",
  },
  {
    title: "Client-first process",
    text: "Communication and collaboration remain central to every milestone, from early concept framing to final handover.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Section className="border-b border-[#1f1f1f] bg-[#111111]">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow">About</p>
              <h1 className="mt-4 font-display text-5xl text-[#f5f2ea] sm:text-6xl">
                Thoughtful architecture, built with intention.
              </h1>
            </div>

            <div className="rounded-[2rem] border border-[#2a2a2a] bg-[#171717] p-6">
              <p className="text-lg leading-8 text-[#d9d1c5]">
                Meer Alam Builders is a design and construction practice shaped around premium residential and commercial environments. The foundation of the brand is rooted in disciplined planning, architectural clarity, and a strong respect for workmanship.
              </p>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              eyebrow="Approach"
              title="A disciplined, client-focused design process."
              description="The current foundation is structured to support future project storytelling, service clarity, and a more detailed brand narrative as official client information is confirmed."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {values.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#1f1f1f] bg-[#171717] p-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#c9a227]">Value</p>
                  <h2 className="mb-3 text-2xl text-[#f5f2ea]">{item.title}</h2>
                  <p className="text-base text-[#c7c0b5]">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-[#171717]">
          <Container className="flex flex-col gap-8 rounded-[2rem] border border-[#2a2a2a] bg-[#111111] p-8 md:p-10">
            <SectionHeading
              eyebrow="Next step"
              title="Ready to begin a conversation?"
              description="This space is intentionally structured for a future consultation workflow and client inquiry experience."
            />
            <Button href="/contact">Request a consultation</Button>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
