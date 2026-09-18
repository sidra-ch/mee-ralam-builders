"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { gsap, isReducedMotion, isMobileViewport, motionTokens } from "@/components/motion/gsapConfig";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * Featured projects: pinned image story on desktop.
 * On mobile, stacked full-width cards with clip-path reveal — not a compressed pin.
 */
export function FeaturedProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const featured = useMemo(
    () => projectsData.filter((p) => p.featured).slice(0, 2),
    [],
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || featured.length < 2) return;

    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      const mobile = isMobileViewport();
      const slides = pin.querySelectorAll<HTMLElement>("[data-featured-slide]");
      const titles = pin.querySelectorAll<HTMLElement>("[data-featured-title]");

      if (!slides.length || !titles.length) return;

      if (reduced || mobile) {
        gsap.set(slides, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(titles, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(slides, { opacity: 0, clipPath: "inset(8% 8% 8% 8%)" });
      gsap.set(slides[0], { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(titles, { opacity: 0, y: 24, filter: "blur(8px)" });
      gsap.set(titles[0], { opacity: 1, y: 0, filter: "blur(0px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          pin,
          scrub: 0.65,
          anticipatePin: 1,
          // Prevent black gaps by ensuring proper spacer height
          pinSpacing: true,
        },
      });

      featured.forEach((_, i) => {
        if (i === 0) return;
        const prev = i - 1;
        tl.to(
          slides[prev],
          { opacity: 0, clipPath: "inset(12% 12% 12% 12%)", duration: 1, ease: motionTokens.easeCinematic },
          i,
        )
          .to(
            titles[prev],
            { opacity: 0, y: -16, filter: "blur(6px)", duration: 0.7, ease: motionTokens.easeLuxury },
            i,
          )
          .fromTo(
            slides[i],
            { opacity: 0, clipPath: "inset(14% 10% 14% 10%)" },
            { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: motionTokens.easeCinematic },
            i,
          )
          .fromTo(
            titles[i],
            { opacity: 0, y: 28, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: motionTokens.easeEditorial },
            i + 0.15,
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [featured]);

  if (!featured.length) return null;

  return (
    <section
      ref={sectionRef}
      className="featured-project-section relative bg-[#0d0e12] py-12 sm:py-20 lg:py-0"
      aria-label="Featured projects"
      style={{ minHeight: "100vh" }}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1a1a1a]" />

      {/* Mobile / reduced: stacked */}
      <div className="mx-auto w-full max-w-[1280px] space-y-8 px-4 sm:px-8 lg:hidden">
        <ScrollReveal direction="up" distance={16}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
            Featured Work
          </p>
        </ScrollReveal>
        {featured.map((project, index) => (
          <ScrollReveal key={project.id} direction="up" distance={24} scale={0.98} duration={1.1}>
            <Link
              href={`/projects/${project.slug || project.id}`}
              className="group block overflow-hidden rounded-[1.25rem] border border-[#222]"
            >
              <div className="relative h-[35vh] min-h-[200px] max-h-[350px] w-full overflow-hidden">
                <Image
                  src={project.heroImage}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04] scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227]">{project.category}</p>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl text-[#f5f2ea]">{project.title}</h3>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Desktop pinned story */}
      <div
        ref={pinRef}
        className="relative hidden h-screen overflow-hidden lg:block"
      >
        <div className="absolute left-12 top-10 z-20 xl:left-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a227]">
            Featured Work
          </p>
        </div>

        {featured.map((project, index) => (
          <div key={project.id} className="absolute inset-0">
            <div data-featured-slide className="absolute inset-0">
              <Image
                src={project.heroImage}
                alt={project.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 75vw"
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/35 to-transparent" />
            </div>

            <div className="absolute inset-x-12 bottom-16 z-20 max-w-xl xl:inset-x-20">
              <div data-featured-title>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227]">
                  {project.number} · {project.category}
                </p>
                <h2 className="mt-3 font-display text-5xl leading-tight text-[#f5f2ea] xl:text-6xl">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#c7c0b5]">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.slug || project.id}`}
                  className="mt-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]"
                >
                  Explore project →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
