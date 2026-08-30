"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * PageTransition
 *
 * Wraps page content in a subtle CSS opacity transition on route change.
 * Uses the pathname as a key trigger — fast (250ms), no overlay, no loader.
 * Respects prefers-reduced-motion.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !containerRef.current) return;

    const el = containerRef.current;
    // Fade in on route change
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";

    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}
