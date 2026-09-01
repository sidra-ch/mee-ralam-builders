"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, isReducedMotion, motionTokens } from "@/components/motion/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StoryFrame = {
  index: string;
  label: string;
  title: string;
  body: string;
  src: string;
  alt: string;
};

// img-23 and img-27 are intentionally excluded: both contain third-party branding.
const storyFrames: StoryFrame[] = [
  { index: "01", label: "Context + Vision", title: "A considered beginning.", body: "Understanding place, purpose and possibility.", src: "/images/img-22.png", alt: "Contemporary residence at twilight, framed with warm architectural lighting" },
  { index: "02", label: "Planning + Coordination", title: "Every decision aligned.", body: "Material, proportion and clarity begin to define the experience.", src: "/images/img-24.jpg", alt: "Project planning and design coordination over architectural drawings and material samples" },
  { index: "03", label: "Structure + Oversight", title: "Precision on site.", body: "Construction is guided by discipline, rhythm and exacting intent.", src: "/images/img-25.jpg", alt: "Construction professionals reviewing an active building structure at sunset" },
  { index: "04", label: "Materiality + Detail", title: "Texture, tone and light.", body: "The spatial character emerges through careful material choices and detail.", src: "/images/img-26.jpg", alt: "Warm-toned architectural material palette and detailing in a contemporary building project" },
  { index: "05", label: "Built Environment", title: "Made to endure.", body: "The final form feels refined, grounded and quietly confident.", src: "/images/img-28.jpg", alt: "Urban construction skyline with tower cranes in warm daylight" },
];

function StaticStory() {
  return <div className="space-y-14 sm:space-y-20">
    {storyFrames.map((frame) => <article key={frame.index} className="space-y-5">
      <div className="relative h-[340px] overflow-hidden bg-[#111214] sm:h-[480px]">
        <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 86vw, 65vw" className="object-cover" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0e12]/45 to-transparent" />
      </div>
      <div className="flex items-start gap-4"><span className="mt-2 h-px w-7 shrink-0 bg-[#c9a227]/70" aria-hidden="true" />
        <div className="space-y-2"><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a227]">{frame.index} / {frame.label}</p><h3 className="font-display text-3xl leading-[1.08] text-[#f0ece4]">{frame.title}</h3></div>
      </div>
    </article>)}
  </div>;
}

/** A single pinned stage that lets the construction narrative unfold through scroll progress. */
export function ConstructionVisualStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const numberRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const labelRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const titleRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const bodyRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const copies = copyRefs.current.filter(Boolean) as HTMLDivElement[];
      const numbers = numberRefs.current.filter(Boolean) as HTMLParagraphElement[];

      if (isReducedMotion()) {
        gsap.set(images, { autoAlpha: 1, scale: 1 });
        gsap.set(copies, { autoAlpha: 1, x: 0, y: 0 });
        gsap.set(numbers, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(images, { autoAlpha: 0, scale: 1.08, x: 0, y: 0 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });
      gsap.set(copies, { autoAlpha: 0, x: 28, y: 18 });
      gsap.set(copies[0], { autoAlpha: 1, x: 0, y: 0 });
      gsap.set(numbers, { autoAlpha: 0.38, y: 12 });
      gsap.set(numbers[0], { autoAlpha: 1, y: 0 });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

      const stepDuration = 1 / (storyFrames.length - 1);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${storyFrames.length * 170}%`,
          scrub: 1.2,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.min(
              storyFrames.length - 1,
              Math.max(0, Math.round(self.progress * (storyFrames.length - 1)))
            );

            numbers.forEach((number, index) => {
              gsap.to(number, {
                autoAlpha: index === activeIndex ? 1 : 0.38,
                y: index === activeIndex ? 0 : 12,
                duration: 0.18,
                ease: "none",
                overwrite: true,
              });
            });
          },
        },
      });

      storyFrames.forEach((_, index) => {
        const current = images[index];
        const next = images[index + 1];
        const currentCopy = copies[index];
        const nextCopy = copies[index + 1];

        if (index === 0) {
          timeline.to(current, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "none" }, 0);
          timeline.to(currentCopy, { autoAlpha: 1, x: 0, y: 0, duration: 0.25, ease: "none" }, 0);
        }

        if (current && next && currentCopy && nextCopy) {
          const fromX = index % 2 === 0 ? -32 : 32;
          const outX = index % 2 === 0 ? 24 : -24;

          timeline
            .to(
              current,
              {
                autoAlpha: 0,
                scale: 1.04,
                x: outX,
                y: index % 2 === 0 ? -14 : 14,
                duration: stepDuration * 0.75,
                ease: "none",
              },
              index * stepDuration + 0.18
            )
            .fromTo(
              next,
              {
                autoAlpha: 0,
                scale: 1.1,
                x: fromX,
                y: index % 2 === 0 ? 18 : -18,
              },
              {
                autoAlpha: 1,
                scale: 1,
                x: 0,
                y: 0,
                duration: stepDuration * 0.95,
                ease: motionTokens.easeLuxury,
              },
              index * stepDuration + 0.22
            )
            .to(
              currentCopy,
              {
                autoAlpha: 0,
                x: outX,
                y: 18,
                duration: stepDuration * 0.45,
                ease: "none",
              },
              index * stepDuration + 0.16
            )
            .fromTo(
              nextCopy,
              { autoAlpha: 0, x: fromX, y: 24 },
              { autoAlpha: 1, x: 0, y: 0, duration: stepDuration * 0.82, ease: motionTokens.easeLuxury },
              index * stepDuration + 0.28
            );
        }
      });

      timeline.to(progressRef.current, { scaleX: 1, duration: 0.4, ease: "none" }, 0);

      return () => {
        timeline.kill();
        timeline.scrollTrigger?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="construction-story"
      className="relative bg-[#0d0e12] lg:h-[500vh]"
      aria-label="Construction and craft visual story"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#1a1a1a]" />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:hidden motion-reduce:lg:block">
        <div className="mb-14 max-w-2xl space-y-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#c9a227]">
            Construction / Craft
          </p>
          <h2 className="font-display text-4xl leading-[1.06] text-[#f5f2ea] sm:text-5xl">
            From vision to reality.
          </h2>
          <p className="max-w-md text-sm leading-[1.85] text-[#817970] sm:text-base">
            Every layer is resolved with care, from first line to final finish.
          </p>
        </div>
        <StaticStory />
      </div>

      <div
        ref={stageRef}
        style={{ position: "sticky", top: 0, height: "100vh" }}
        className="relative hidden min-h-[640px] overflow-hidden lg:block motion-reduce:lg:hidden"
      >
        {storyFrames.map((frame, index) => (
          <div
            key={frame.index}
            ref={(element) => {
              if (element) imageRefs.current[index] = element;
            }}
            className="absolute inset-0 will-change-transform"
            style={{ opacity: 0 }}
          >
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 86vw, 65vw"
              className="object-cover"
            />
          </div>
        ))}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#0d0e12]/78 via-[#0d0e12]/24 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-[#0d0e12]/72 to-transparent"
        />

        <div className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[1280px] justify-between px-6 pt-28 sm:px-12 lg:px-20">
          <div className="max-w-xl space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#c9a227]">
              Construction / Craft
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-[#f5f2ea] lg:text-7xl">
              From vision
              <br />
              to reality.
            </h2>
            <p className="max-w-sm text-sm leading-[1.8] text-[#c7c0b5]">
              Every layer is resolved with care, from first line to final finish.
            </p>
          </div>
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c7c0b5]/65 xl:block">
            Scroll to unfold
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-16 z-20 mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-20">
          <div className="max-w-md">
            {storyFrames.map((frame, index) => (
              <div
                key={frame.index}
                ref={(element) => {
                  if (element) copyRefs.current[index] = element;
                }}
                className="absolute bottom-0 left-6 sm:left-12 lg:left-20"
                style={{ opacity: 0 }}
              >
                <p
                  ref={(element) => {
                    if (element) numberRefs.current[index] = element;
                  }}
                  className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a227]"
                >
                  {frame.index}
                </p>
                <p
                  ref={(element) => {
                    if (element) labelRefs.current[index] = element;
                  }}
                  className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a227]"
                >
                  {frame.label}
                </p>
                <h3
                  ref={(element) => {
                    if (element) titleRefs.current[index] = element;
                  }}
                  className="font-display text-3xl leading-[1.08] text-[#f0ece4] sm:text-4xl lg:text-5xl"
                >
                  {frame.title}
                </h3>
                <p
                  ref={(element) => {
                    if (element) bodyRefs.current[index] = element;
                  }}
                  className="mt-3 max-w-sm text-sm leading-[1.8] text-[#c7c0b5]"
                >
                  {frame.body}
                </p>
              </div>
            ))}
          </div>

          <div aria-hidden="true" className="mt-10 h-px w-full max-w-md bg-white/15">
            <div ref={progressRef} className="h-full w-full bg-[#c9a227]" />
          </div>
        </div>
      </div>
    </section>
  );
}
