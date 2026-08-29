import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#111111]/80 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" aria-label="Meer Alam Builders home" className="flex items-center">
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
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.2em] text-[#d7d0c7] transition-colors hover:text-[#c9a227]"
            >
              {item.label}
            </Link>
          ))}
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
