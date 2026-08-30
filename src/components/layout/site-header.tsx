"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#0d0e12]/85 backdrop-blur-sm"
      role="banner"
    >
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          aria-label="Meer Alam Builders - Home"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] rounded-full"
        >
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#c9a227] bg-[#171717] p-1 shadow-[0_0_0_1px_rgba(201,162,39,0.35)]">
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

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {siteConfig.navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] rounded px-2 py-1 ${
                  active
                    ? "text-[#c9a227]"
                    : "text-[#d7d0c7] hover:text-[#c9a227]"
                }`}
              >
                {item.label}
                {/* Gold active indicator line */}
                {active && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[1px] bg-[#c9a227]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant="secondary" className="hidden sm:inline-flex">
            Enquire
          </Button>
          <Button href="/contact" className="sm:hidden">Contact</Button>
        </div>
      </Container>
    </header>
  );
}
