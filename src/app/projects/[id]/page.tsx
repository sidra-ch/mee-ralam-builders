import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { getProjectById, projectsData } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    return { title: "Project | Meer Alam Builders" };
  }
  return {
    title: `${project.title} | Meer Alam Builders`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
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
