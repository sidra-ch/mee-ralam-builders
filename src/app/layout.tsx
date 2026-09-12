import type { Metadata } from "next";
import "./globals.css";
import "@/components/three/threeSetup";
import { PremiumCursor } from "@/components/motion/PremiumCursor";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { PageTransition } from "@/components/motion/PageTransition";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://meeralambuilders.com"),
  title: "Meer Alam Builders | Premium Architecture & Luxury Design",
  description:
    "Meer Alam Builders — architecture, construction, and interior design in Rawalpindi and Islamabad.",
  openGraph: {
    title: "Meer Alam Builders | Premium Architecture & Luxury Design",
    description:
      "Architecture, construction, and interior design — documented from site work through finished rooms.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased" data-scroll-behavior="smooth">
      <body className="bg-[#0d0e12] text-[#f5f2ea]">
        <FilmGrain />
        <PremiumCursor />
        <PageTransition>
          {children}
        </PageTransition>
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
