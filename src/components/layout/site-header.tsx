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

  const menuRootRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuBackdropRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuMetaRef = useRef<HTMLDivElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerMiddleRef = useRef<HTMLSpanElement>(null);
  const hamburgerBottomRef = useRef<HTMLSpanElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close the menu after route navigation.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock page scrolling while the mobile navigation is open.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Cinematic mobile menu timeline. The menu stays mounted so GSAP can animate
  // the panel instead of relying on abrupt conditional rendering.
  useLayoutEffect(() => {
    const root = menuRootRef.current;
    const panel = menuPanelRef.current;
    const backdrop = menuBackdropRef.current;
    const items = menuItemsRef.current;
    const meta = menuMetaRef.current;
    const close = menuCloseRef.current;

    if (!root || !panel || !backdrop || !items || !meta || !close) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const itemNodes = Array.from(items.children);

    const ctx = gsap.context(() => {
      gsap.killTweensOf([panel, backdrop, ...itemNodes, meta, close]);

      if (!isMobileMenuOpen) {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(panel, { xPercent: 100 });
        gsap.set(itemNodes, { y: 28, opacity: 0 });
        gsap.set([meta, close], { opacity: 0, y: 8 });
        return;
      }

      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });

      if (reduceMotion) {
        gsap.set(backdrop, { opacity: 1 });
        gsap.set(panel, { xPercent: 0 });
        gsap.set(itemNodes, { y: 0, opacity: 1 });
        gsap.set([meta, close], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

      tl.to(backdrop, {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      })
        .to(
          panel,
          {
            xPercent: 0,
            duration: 0.72,
            ease: "power3.out",
          },
          "<0.02",
        )
        .to(
          close,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.32",
        )
        .to(
          itemNodes,
          {
            y: 0,
            opacity: 1,
            duration: 0.62,
            stagger: 0.075,
            ease: "power3.out",
          },
          "-=0.22",
        )
        .to(
          meta,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.28",
        );
    }, root);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

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
        ref={menuRootRef}
        className="pointer-events-none fixed inset-0 z-[100] opacity-0 md:hidden"
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          ref={menuBackdropRef}
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/70 opacity-0 backdrop-blur-[6px]"
          aria-hidden="true"
        />

        <aside
          id="mobile-navigation"
          ref={menuPanelRef}
          aria-label="Mobile navigation"
          className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col justify-between overflow-hidden border-l border-[#c9a227]/20 bg-[#090a0d] px-6 pb-7 pt-5 shadow-[-20px_0_60px_rgba(0,0,0,0.55)] sm:px-8"
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
                <span className="font-display text-sm uppercase tracking-[0.18em] text-[#f5f2ea]">
                  Meer Alam
                </span>
              </Link>

              <button
                ref={menuCloseRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#f5f2ea] opacity-0 transition-colors duration-300 hover:border-[#c9a227] hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227]"
              >
                <span className="relative block h-4 w-4" aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div ref={menuItemsRef} className="mt-10 flex flex-col" role="list">
              {mobileMenuItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-[#e9e4dc] transition-colors duration-300 hover:text-[#c9a227] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a227] sm:py-[18px]"
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

          <div ref={menuMetaRef} className="space-y-4 border-t border-white/10 pt-5 opacity-0">
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
