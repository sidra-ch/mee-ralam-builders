"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/layout/brand-logo";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/Magnetic";
import { siteConfig, getWhatsAppUrl } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#1f1f1f]/60 bg-[#0d0e12]/90 backdrop-blur-md transition-colors duration-300"
      role="banner"
    >
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <Link
          href="/"
          aria-label="Meer Alam Builders - Home"
          className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12]"
        >
          <BrandLogo size={48} priority />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {siteConfig.navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] ${
                  active ? "text-[#c9a227]" : "text-[#b8b0a6] hover:text-[#f5f2ea]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0.5 left-2 right-2 h-px origin-left bg-[#c9a227] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden="true"
                />
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#171717] md:hidden"
          >
            <span className="sr-only">{isMobileMenuOpen ? "Close" : "Menu"}</span>
            <span className={`hamburger ${isMobileMenuOpen ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <div
            className="fixed inset-0 z-[100] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Architectural Mobile Drawer */}
            <motion.aside
              initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 z-[101] flex w-[min(90vw,380px)] flex-col justify-between border-l border-[#c9a227]/40 bg-[#0d0e12] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.85)]"
              aria-label="Mobile navigation"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <BrandLogo size={36} />
                  <span className="font-display text-base font-semibold tracking-wider text-[#f5f2ea]">
                    Meer Alam Builders
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-[#f5f2ea] transition-colors hover:border-[#c9a227] hover:text-[#c9a227]"
                >
                  <span className="hamburger is-open" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </button>
              </div>

              {/* Navigation Links with High Contrast and Clear Active State */}
              <nav className="my-auto flex flex-col space-y-2.5 py-6" aria-label="Mobile Navigation Links">
                {siteConfig.navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.05 * index, duration: 0.35 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                          active
                            ? "border border-[#c9a227]/60 bg-[#c9a227]/15 text-[#f5f2ea] shadow-[0_0_20px_rgba(201,162,39,0.1)]"
                            : "border border-white/5 bg-white/[0.02] text-[#e8e4dc] hover:border-[#c9a227]/40 hover:bg-white/[0.05] hover:text-[#f5f2ea]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                              active ? "bg-[#c9a227]" : "bg-white/20 group-hover:bg-[#c9a227]"
                            }`}
                            aria-hidden="true"
                          />
                          {item.label}
                        </span>
                        <span
                          className={`text-sm transition-transform duration-300 ${
                            active
                              ? "text-[#c9a227]"
                              : "text-white/30 group-hover:translate-x-1 group-hover:text-[#c9a227]"
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer with Contact / WhatsApp CTA */}
              <div className="space-y-3.5 border-t border-white/10 pt-6">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-[#f5f2ea] px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0e12] transition-colors hover:bg-white"
                >
                  Contact / Enquiry
                </Link>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#c9a227]/60 bg-[#c9a227]/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a227] transition-all hover:bg-[#c9a227]/20"
                >
                  <span>WhatsApp Direct</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <p className="pt-1 text-center text-[10px] uppercase tracking-[0.24em] text-[#8e877d]">
                  Rawalpindi · Islamabad
                </p>
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
