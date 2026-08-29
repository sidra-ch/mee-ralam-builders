import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const services = [
  {
    title: "Architecture & planning",
    text: "Concept design, feasibility review, and strategic planning support for residential and commercial environments.",
  },
  {
    title: "Interior design",
    text: "Material-led interior direction, space planning, and detail refinements for elevated living and working experiences.",
  },
  {
    title: "Construction management",
    text: "Coordinated delivery, on-site oversight, and clear communication across project milestones and trade coordination.",
  },
  {
    title: "Renovation & fit-out",
    text: "Refined transformations for existing spaces, balancing practicality, design intent, and long-term value.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Section className="border-b border-[#1f1f1f] bg-[#111111]">
          <Container>
            <p className="eyebrow">Services</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl text-[#f5f2ea] sm:text-6xl">
              Tailored solutions for premium spaces.
            </h1>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              eyebrow="Core offerings"
              title="Built around strategy, precision, and elevated living."
              description="This section is intentionally structured as a future service overview and can be expanded with formal scopes, package structures, and project-specific detail later."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="rounded-[1.75rem] border border-[#1f1f1f] bg-[#171717] p-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#c9a227]">Service</p>
                  <h2 className="mb-3 text-2xl text-[#f5f2ea]">{service.title}</h2>
                  <p className="text-base text-[#c7c0b5]">{service.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-[#171717]">
          <Container className="flex flex-col gap-8 rounded-[2rem] border border-[#2a2a2a] bg-[#111111] p-8 md:p-10">
            <SectionHeading
              eyebrow="Consultation"
              title="Discuss your next project."
              description="Use this section for client inquiry flow, consultation timing, and future estimate requests."
            />
            <Button href="/contact">Start your enquiry</Button>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
