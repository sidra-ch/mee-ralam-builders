import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { ConstructionVisualStory } from "@/components/sections/ConstructionVisualStory";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { EditorialServicesSection } from "@/components/sections/EditorialServicesSection";
import { FeaturedProjectSection } from "@/components/sections/FeaturedProjectSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ArchitecturalDetailSection } from "@/components/sections/ArchitecturalDetailSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Meer Alam Builders | Premium Architecture & Luxury Construction",
  description:
    "Premium architectural and interior design practice. Luxury residential and commercial spaces shaped with clarity, craft, and precision.",
  openGraph: {
    title: "Meer Alam Builders | Premium Architecture & Luxury Construction",
    description:
      "Premium architectural and interior design practice. Luxury spaces shaped with clarity, craft, and precision.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="relative">
        {/* 01. Full-viewport cinematic 3D architectural hero */}
        <CinematicHero />

        {/* 02. Typographic pause — brand philosophy statement */}
        <BrandStatement />

        {/* 03. Our approach — asymmetric editorial image + copy */}
        <ApproachSection />

        {/* 04. Services — three full editorial stories */}
        <EditorialServicesSection />

        {/* 05. Featured flagship project — magazine-cover scale */}
        <FeaturedProjectSection />

        {/* 06. Selected portfolio — asymmetric editorial grid */}
        <ConstructionVisualStory />
        <ProjectsSection />

        {/* 07. Material detail — full-bleed architectural pause */}
        <ArchitecturalDetailSection />

        {/* 08. Final CTA — conclusion of the visual story */}
        <CtaSection />
      </main>

      <SiteFooter />
    </>
  );
}
