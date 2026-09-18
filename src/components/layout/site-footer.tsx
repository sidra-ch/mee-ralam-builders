"use client";

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/layout/brand-logo";
import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[#1f1f1f] bg-[#111111]" role="contentinfo">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center justify-start">
            <Link href="/" aria-label="Meer Alam Builders - Home" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]">
              <BrandLogo size={48} />
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
                <a href="tel:+923008680599" className="transition hover:text-[#c9a227]">
                  +92 300 8680599
                </a>
              </li>
              <li>
                <a href="mailto:info@meeralambuilders.com" className="transition hover:text-[#c9a227]">
                  info@meeralambuilders.com
                </a>
              </li>
              <li>Rawalpindi, Pakistan</li>
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
                  href="https://www.facebook.com/profile.php?id=61574251057521"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Meer Alam Builders on Facebook"
                  className="transition hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111] rounded"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </address>
        </div>
      </Container>

      <div className="border-t border-[#1f1f1f]">
        <Container className="flex flex-col gap-3 py-5 text-xs uppercase tracking-[0.2em] text-[#a89d92] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Meer Alam Builders · All rights reserved</p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#c9a227] transition-all hover:text-[#f5f2ea] focus:outline-none"
          >
            <span>Back to Top</span>
            <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </button>
        </Container>
      </div>
    </footer>
  );
}
