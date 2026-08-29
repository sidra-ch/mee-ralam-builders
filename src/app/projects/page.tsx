import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const projects = [
  {
    title: "Private residence concept",
    category: "Architecture",
    summary: "A premium residential direction focused on proportion, daylight, and material restraint.",
  },
  {
    title: "Luxury interior refinement",
    category: "Interiors",
    summary: "An elevated interior palette using warm stone, natural texture, and considered spatial rhythm.",
  },
  {
    title: "Commercial fit-out",
    category: "Construction",
    summary: "A fit-out strategy designed for operational clarity, client experience, and long-term durability.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Section className="border-b border-[#1f1f1f] bg-[#111111]">
          <Container>
            <p className="eyebrow">Projects</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl text-[#f5f2ea] sm:text-6xl">
              Selected work in progress.
            </h1>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              eyebrow="Portfolio"
              title="A luxury project narrative is being prepared."
              description="This portfolio section currently uses placeholder editorial cards while final client projects, photography, and case studies are pending approval."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="overflow-hidden rounded-[1.75rem] border border-[#1f1f1f] bg-[#171717]">
                  <div className="h-52 bg-[linear-gradient(135deg,#2a251d,#111111_60%,#171717)]" />
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">{project.category}</p>
                    <h2 className="mt-4 text-2xl text-[#f5f2ea]">{project.title}</h2>
                    <p className="mt-3 text-base text-[#c7c0b5]">{project.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="bg-[#171717]">
          <Container className="flex flex-col gap-8 rounded-[2rem] border border-[#2a2a2a] bg-[#111111] p-8 md:p-10">
            <SectionHeading
              eyebrow="Opportunity"
              title="Looking for a tailored build or design collaboration?"
              description="This area can later become a project inquiry journey or a case-study gallery."
            />
            <Button href="/contact">Discuss a project</Button>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
