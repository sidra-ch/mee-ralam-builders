"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/Magnetic";
import { siteConfig } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#1f1f1f]/60 bg-[#0d0e12]/90 backdrop-blur-md transition-colors duration-300"
      role="banner"
    >
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <Link
          href="/"
          aria-label="Meer Alam Builders - Home"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] rounded-full"
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#c9a227]/80 bg-[#171717] p-0.5 shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(201,162,39,0.25)] hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Meer Alam Builders logo"
              width={120}
              height={120}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {siteConfig.navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-[10px] font-medium uppercase tracking-[0.24em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] rounded px-2 py-1.5 ${
                  active
                    ? "text-[#c9a227]"
                    : "text-[#b8b0a6] hover:text-[#f5f2ea]"
                }`}
              >
                {item.label}
                {/* Gold active indicator line */}
                {active ? (
                  <span
                    className="absolute bottom-0.5 left-2 right-2 h-[1px] bg-[#c9a227]/90"
                    aria-hidden="true"
                  />
                ) : (
                  /* Subtle hover underline reveal */
                  <span
                    className="absolute bottom-0.5 left-2 right-2 h-[1px] bg-[#c9a227]/50 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={4}>
            <Button href="/contact" variant="secondary" className="hidden sm:inline-flex">
              Enquire
            </Button>
          </Magnetic>
          <Button href="/contact" className="sm:hidden">Contact</Button>
        </div>
      </Container>
    </header>
  );
}
