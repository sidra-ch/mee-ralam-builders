"use client";

import { useLayoutEffect, useRef } from "react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "@/components/motion/gsapConfig";

/**
 * ArchitecturalDetailSection
 *
 * A full-bleed cinematic pause — one large architectural photograph, a quiet
 * editorial statement revealed through its centre.
 */
export function ArchitecturalDetailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isReduced = isReducedMotion();
      const isMobile = isMobileViewport();
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean);

      if (isReduced) {
        gsap.set(labelRef.current, { opacity: 1, y: 0 });
        gsap.set(lines, { yPercent: 0, opacity: 1 });
        gsap.set(bodyRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(labelRef.current, { opacity: 0, y: isMobile ? 8 : 12 });
      gsap.set(lines, { yPercent: 110, opacity: 0 });
      gsap.set(bodyRef.current, { opacity: 0, y: isMobile ? 8 : 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.65, ease: motionTokens.easeLuxury })
        .to(
          lines,
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: motionTokens.easeEditorial },
          0.12
        )
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: motionTokens.easeLuxury }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="architectural-detail-section relative overflow-hidden bg-[#0a0b0e]"
      aria-label="Architectural Materiality & Detail"
      style={{ minHeight: "520px" }}
    >
      {/* Top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px bg-[#1a1a1a]" />

      {/* ── Full-bleed parallax photograph ────────────────────────────── */}
      <div className="h-[520px] sm:h-[620px] lg:h-[740px] w-full">
        <ParallaxImage
          src="/images/img-21.png"
          alt="Textured stone architectural wall with warm uplighting — materiality detail"
          sizes="100vw"
          speed={14}
          containerClassName="relative h-full w-full overflow-hidden"
        />
      </div>

      {/* ── Layered atmospheric overlays ──────────────────────────────── */}
      {/* Centre is kept deliberately open so the architecture reads clearly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(10,11,14,0.55) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,11,14,0.90) 0%, rgba(10,11,14,0.40) 28%, transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,11,14,0.55) 0%, transparent 20%)",
        }}
      />

      {/* ── Editorial text — centred, bottom-third of the image ───────── */}
      <div className="absolute inset-0 flex items-end justify-center pb-16 sm:pb-20 lg:pb-24 px-6">
        <div className="max-w-2xl text-center space-y-5">
          <p
            ref={labelRef}
            className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#c9a227]"
          >
            Materiality &amp; Craft
          </p>

          <h2
            className="font-display leading-[1.06] text-[#f0ece4]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", letterSpacing: "-0.01em" }}
          >
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block">Every detail</span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block font-normal italic text-[#c9a227]">
                has a purpose.
              </span>
            </span>
          </h2>

          <p
            ref={bodyRef}
            className="mx-auto max-w-sm text-sm leading-[1.85] text-[#7a7068]"
          >
            Texture, proportion, and light orchestrate environments that endure beyond trends.
          </p>
        </div>
      </div>
    </section>
  );
}
