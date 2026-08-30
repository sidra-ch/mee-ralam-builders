import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#111111]" role="contentinfo">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center justify-start">
            <Link href="/" aria-label="Meer Alam Builders - Home" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] rounded-full">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#c9a227] bg-[#171717] p-1 shadow-[0_0_0_1px_rgba(201,162,39,0.35)]">
                <Image
                  src="/images/logo.png"
                  alt="Meer Alam Builders logo"
                  width={120}
                  height={120}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </Link>
          </div>
          <p className="max-w-xs text-sm text-[#c7c0b5]">
            Luxury architecture, precision construction, and bespoke interior design — delivered under one practice.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">Company</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#e6e0d8]">
            <li><Link href="/about" className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded px-1">About</Link></li>
            <li><Link href="/services" className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded px-1">Services</Link></li>
            <li><Link href="/projects" className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded px-1">Projects</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">Navigation</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#e6e0d8]">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded px-1">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-[#c9a227]">Contact</h3>
          <address className="not-italic">
            <ul className="mt-4 space-y-3 text-sm text-[#e6e0d8]">
              <li>
                <a href="tel:+923001234567" className="transition hover:text-[#c9a227]">
                  +92 300 123 4567
                </a>
              </li>
              <li>
                <a href="mailto:info@meeralambuilders.com" className="transition hover:text-[#c9a227]">
                  info@meeralambuilders.com
                </a>
              </li>
              <li>Lahore, Pakistan</li>
              <li className="flex items-center gap-3 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Meer Alam Builders on Instagram"
                  className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded"
                >
                  Instagram
                </a>
                <span className="text-[#2a2a2a]" aria-hidden="true">•</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Meer Alam Builders on LinkedIn"
                  className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded"
                >
                  LinkedIn
                </a>
                <span className="text-[#2a2a2a]" aria-hidden="true">•</span>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Meer Alam Builders on Behance"
                  className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded"
                >
                  Behance
                </a>
              </li>
            </ul>
          </address>
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
