"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/Magnetic";
import { siteConfig, getWhatsAppUrl } from "@/lib/constants";

const mobileMenuItems = [...siteConfig.navItems].sort((a, b) => {
  const order = ["/", "/about", "/projects", "/services", "/contact"];
  return order.indexOf(a.href) - order.indexOf(b.href);
});

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prevPathnameRef = useRef(pathname);

  const menuPanelRef = useRef<HTMLElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerMiddleRef = useRef<HTMLSpanElement>(null);
  const hamburgerBottomRef = useRef<HTMLSpanElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Lock page scrolling while the mobile navigation is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = previousOverflow || "";
      document.body.style.position = previousPosition || "";
      document.body.style.width = "";
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = previousOverflow || "";
      document.body.style.position = previousPosition || "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  // Ensure menu closes on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setIsMobileMenuOpen(false);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  // Escape closes the menu; Tab is trapped inside the panel while it's open.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = menuPanelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Move focus into the panel on open, and return it to the toggle button
  // on close, without stealing focus on initial page load.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (isMobileMenuOpen) {
      wasOpenRef.current = true;
      const id = window.setTimeout(() => menuCloseRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuToggleRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  // Mobile menu open/close is driven entirely by conditional CSS classes in
  // the JSX below (opacity/transform + Tailwind transition-*), not by a GSAP
  // timeline. GSAP's context/revert cycle was leaving the nav link list
  // stranded at opacity:0 on some devices after repeated open/close cycles;
  // plain CSS transitions can't get stuck that way — the browser always
  // resolves to the class that's currently applied.

  // Keep the hamburger/X transition separate from the drawer timeline.
  useLayoutEffect(() => {
    const top = hamburgerTopRef.current;
    const middle = hamburgerMiddleRef.current;
    const bottom = hamburgerBottomRef.current;
    if (!top || !middle || !bottom) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 0.28;

    gsap.to(top, {
      y: isMobileMenuOpen ? 5 : 0,
      rotate: isMobileMenuOpen ? 45 : 0,
      duration,
      ease: "power2.out",
    });
    gsap.to(middle, {
      opacity: isMobileMenuOpen ? 0 : 1,
      scaleX: isMobileMenuOpen ? 0 : 1,
      duration,
      ease: "power2.out",
    });
    gsap.to(bottom, {
      y: isMobileMenuOpen ? -5 : 0,
      rotate: isMobileMenuOpen ? -45 : 0,
      duration,
      ease: "power2.out",
    });
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
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#c9a227]/80 bg-[#171717] p-0.5 shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_16px_rgba(201,162,39,0.25)]">
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
                className={`group relative rounded px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] ${
                  active ? "text-[#c9a227]" : "text-[#b8b0a6] hover:text-[#f5f2ea]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0.5 left-2 right-2 h-px bg-[#c9a227]/80 origin-left transition-transform duration-300 ease-out ${
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
            ref={menuToggleRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#171717] text-[#f5f2ea] transition-colors duration-300 hover:border-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12] md:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-center gap-1.5" aria-hidden="true">
              <span ref={hamburgerTopRef} className="block h-px w-5 origin-center bg-current" />
              <span ref={hamburgerMiddleRef} className="block h-px w-3 self-end bg-current" />
              <span ref={hamburgerBottomRef} className="block h-px w-5 origin-center bg-current" />
            </span>
          </button>
        </div>
      </Container>

      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-[6px] transition-opacity duration-300 ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        <aside
          id="mobile-navigation"
          ref={menuPanelRef}
          aria-label="Mobile navigation"
          className={`absolute inset-y-0 right-0 flex w-[85vw] max-w-[400px] flex-col justify-between overflow-hidden border-l border-[#c9a227]/30 bg-[#0d0e12] px-6 pb-7 pt-5 shadow-[-20px_0_60px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out sm:px-8 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-[#c9a227]/[0.045] blur-3xl" aria-hidden="true" />

          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Meer Alam Builders - Home"
                className="flex items-center gap-3"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full border border-[#c9a227]/80 bg-[#171717] p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Meer Alam Builders logo"
                    width={36}
                    height={36}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span className="font-display text-sm uppercase tracking-[0.18em] text-white">
                  Meer Alam
                </span>
              </Link>

              <button
                ref={menuCloseRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#f5f2ea] transition-colors duration-300 hover:border-[#c9a227] hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227]"
              >
                <span className="relative block h-4 w-4" aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div className="mt-10 flex flex-col" role="list">
              {mobileMenuItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center justify-between border-b border-white/[0.1] py-4 font-medium text-white transition-colors duration-300 hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a227] sm:py-[18px]"
                    role="listitem"
                  >
                    <span className={`text-[clamp(1.65rem,8vw,2.5rem)] font-light leading-none tracking-[-0.03em] ${active ? "text-[#c9a227]" : ""}`}>
                      {item.label}
                    </span>
                    <span className="flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-[#7f786e] transition-colors group-hover:text-[#c9a227]">
                      <span>0{index + 1}</span>
                      <span className="h-px w-5 bg-current transition-all duration-300 group-hover:w-8" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-5">
            <a
              href={getWhatsAppUrl("Hello Meer Alam Builders, I would like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-full border border-[#c9a227]/60 bg-[#c9a227]/[0.07] px-5 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#c9a227] transition-all duration-300 hover:bg-[#c9a227] hover:text-[#090a0d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227]"
            >
              <span>WhatsApp Enquiry</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#777067]">
              <span>Architecture · Interiors</span>
              <span>Pakistan</span>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
