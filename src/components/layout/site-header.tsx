"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/Magnetic";
import { siteConfig, getWhatsAppUrl } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#1f1f1f]/60 bg-[#0d0e12]/90 backdrop-blur-md transition-colors duration-300"
      role="banner"
    >
      <Container className="flex items-center justify-between gap-6 py-3.5">
        {/* Brand Logo */}
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

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {siteConfig.navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-[10px] font-medium uppercase tracking-[0.24em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] rounded px-2 py-1.5 ${
                  active ? "text-[#c9a227]" : "text-[#b8b0a6] hover:text-[#f5f2ea]"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    className="absolute bottom-0.5 left-2 right-2 h-[1px] bg-[#c9a227]/90"
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    className="absolute bottom-0.5 left-2 right-2 h-[1px] bg-[#c9a227]/50 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA + Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <Magnetic strength={4}>
            <Button href="/contact" variant="secondary" className="hidden sm:inline-flex">
              Enquire
            </Button>
          </Magnetic>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#171717] text-[#f5f2ea] md:hidden transition-colors hover:border-[#c9a227] focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <span className="text-lg">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>
      </Container>

      {/* ── Mobile Sidebar Drawer & Overlay ────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Sliding Sidebar Drawer */}
          <aside className="fixed inset-y-0 right-0 z-[101] flex w-[280px] sm:w-[320px] flex-col justify-between border-l border-[#c9a227]/30 bg-[#0a0b0e] p-6 shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-transform duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 overflow-hidden rounded-full border border-[#c9a227]/80 bg-[#171717] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span className="font-display text-sm uppercase tracking-wider text-[#f5f2ea]">
                  Meer Alam
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close drawer menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#171717] text-[#f5f2ea] transition-colors hover:border-[#c9a227] hover:text-[#c9a227]"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links — Clean without numbers */}
            <nav className="my-8 flex flex-col space-y-3" aria-label="Mobile Navigation">
              {siteConfig.navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-300 ${
                      active
                        ? "bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/40 shadow-[0_0_12px_rgba(201,162,39,0.1)]"
                        : "text-[#dcd6cd] hover:bg-white/[0.05] hover:text-[#c9a227]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer & WhatsApp CTA */}
            <div className="border-t border-white/10 pt-6 space-y-3">
              <a
                href={getWhatsAppUrl("Hello Meer Alam Builders, I would like to discuss a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#c9a227] bg-[#c9a227]/15 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227] shadow-[0_0_15px_rgba(201,162,39,0.15)] transition-all hover:bg-[#c9a227] hover:text-black"
              >
                WhatsApp Enquiry →
              </a>
              <p className="text-center text-[9px] uppercase tracking-[0.2em] text-[#8e877d]">
                Rawalpindi · Islamabad
              </p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

