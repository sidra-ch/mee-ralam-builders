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
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />
            <motion.aside
              initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 z-[101] flex w-[min(88vw,380px)] flex-col justify-between border-l border-[#c9a227]/30 bg-[#0a0b0e] p-6"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <BrandLogo size={36} />
                  <span className="font-display text-sm uppercase tracking-wider text-[#f5f2ea]">
                    Meer Alam
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close drawer menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[#f5f2ea]"
                >
                  <span className="hamburger is-open" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </button>
              </div>

              <nav className="my-8 flex flex-col space-y-2" aria-label="Mobile Navigation">
                {siteConfig.navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.06 * index, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] ${
                          active
                            ? "border border-[#c9a227]/40 bg-[#c9a227]/15 text-[#c9a227]"
                            : "text-[#dcd6cd]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-full border border-[#c9a227] bg-[#c9a227]/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a227]"
                >
                  WhatsApp Enquiry
                </a>
                <p className="text-center text-[9px] uppercase tracking-[0.2em] text-[#8e877d]">
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
