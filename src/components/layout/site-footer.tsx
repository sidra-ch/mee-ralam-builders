import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#111111]">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center justify-start">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#c9a227] bg-[#171717] p-1 shadow-[0_0_0_1px_rgba(201,162,39,0.35)]">
              <Image
                src="/images/logo.png"
                alt="Meer Alam Builders logo"
                width={120}
                height={120}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          <p className="max-w-xs text-sm text-[#c7c0b5]">
            [CLIENT INFORMATION REQUIRED]
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">Company</p>
          <ul className="mt-4 space-y-3 text-sm text-[#e6e0d8]">
            <li><Link href="/about" className="transition hover:text-[#c9a227]">About</Link></li>
            <li><Link href="/services" className="transition hover:text-[#c9a227]">Services</Link></li>
            <li><Link href="/projects" className="transition hover:text-[#c9a227]">Projects</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">Navigation</p>
          <ul className="mt-4 space-y-3 text-sm text-[#e6e0d8]">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-[#c9a227]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-[#e6e0d8]">
            <li>[CLIENT PHONE REQUIRED]</li>
            <li>[CLIENT EMAIL REQUIRED]</li>
            <li>[CLIENT LOCATION REQUIRED]</li>
            <li>Instagram • LinkedIn • Behance</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[#1f1f1f]">
        <Container className="flex flex-col gap-3 py-5 text-xs uppercase tracking-[0.2em] text-[#a89d92] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Meer Alam Builders</p>
          <p>All rights reserved</p>
        </Container>
      </div>
    </footer>
  );
}
