import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { getProjectBySlug, projectsData } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project | Meer Alam Builders" };
  }
  return {
    title: `${project.title} | Meer Alam Builders`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Meer Alam Builders`,
      description: project.description,
      images: [{ url: project.heroImage, alt: project.alt }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <ProjectCaseStudy project={project} />
      </main>
      <SiteFooter />
    </>
  );
}
