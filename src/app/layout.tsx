import type { Metadata } from "next";
import "./globals.css";
import "@/components/three/threeSetup";
import { PremiumCursor } from "@/components/motion/PremiumCursor";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { PageTransition } from "@/components/motion/PageTransition";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

export const metadata: Metadata = {
  title: "Meer Alam Builders | Premium Architecture & Luxury Design",
  description:
    "Premium architectural and interior design practice. Luxury spaces shaped with clarity, craft, and precision.",
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
