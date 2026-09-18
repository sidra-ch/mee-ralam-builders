"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { gsap, isReducedMotion } from "@/components/motion/gsapConfig";

interface BeforeAfterComparisonProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  aspectRatio?: string;
  sizes?: string;
  className?: string;
}

const INITIAL_POSITION = 50;

export function BeforeAfterComparison({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  eyebrow = "Transformation",
  heading = "From existing space\nto something extraordinary.",
  subtext = "Drag the divider to reveal the full extent of the transformation.",
  aspectRatio = "h-[360px] sm:h-[500px] lg:h-[680px]",
  sizes = "(max-width: 1024px) 100vw, 1360px",
  className = "",
}: BeforeAfterComparisonProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const afterClipRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef<number>(INITIAL_POSITION);
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pendingPositionRef = useRef<number>(INITIAL_POSITION);
  const isHoveredRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [isReady, setIsReady] = useState(false);

  const applyPosition = useCallback((pct: number) => {
    positionRef.current = pct;
    if (afterClipRef.current) {
      afterClipRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }
    if (dividerRef.current && comparisonRef.current) {
      const width = comparisonRef.current.getBoundingClientRect().width;
      dividerRef.current.style.transform = `translateX(${(pct / 100) * width}px)`;
    }
  }, []);

  const syncReactState = useCallback((pct: number) => {
    setPosition(Math.round(pct));
  }, []);

  const scheduleUpdate = useCallback(
    (target: number) => {
      pendingPositionRef.current = target;
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        applyPosition(pendingPositionRef.current);
        syncReactState(pendingPositionRef.current);
      });
    },
    [applyPosition, syncReactState]
  );

  const computePosition = useCallback((clientX: number): number => {
    if (!comparisonRef.current) return INITIAL_POSITION;
    const rect = comparisonRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(2, Math.min(98, raw));
  }, []);

  // Store window handlers in refs so they can self-reference for removeEventListener
  // without triggering the react-hooks/immutability circular-declaration error.
  const windowMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
  const windowMouseUpRef = useRef<(() => void) | null>(null);
  const windowTouchMoveRef = useRef<((e: TouchEvent) => void) | null>(null);
  const windowTouchEndRef = useRef<(() => void) | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      setIsDragging(true);
      scheduleUpdate(computePosition(e.clientX));

      windowMouseMoveRef.current = (ev: MouseEvent) => {
        if (!isDraggingRef.current) return;
        scheduleUpdate(computePosition(ev.clientX));
      };

      windowMouseUpRef.current = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
        if (windowMouseMoveRef.current) window.removeEventListener("mousemove", windowMouseMoveRef.current);
        if (windowMouseUpRef.current) window.removeEventListener("mouseup", windowMouseUpRef.current);
        windowMouseMoveRef.current = null;
        windowMouseUpRef.current = null;
      };

      window.addEventListener("mousemove", windowMouseMoveRef.current);
      window.addEventListener("mouseup", windowMouseUpRef.current);
    },
    [computePosition, scheduleUpdate]
  );

  const handleComparisonMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isHoveredRef.current || isDraggingRef.current) return;
      scheduleUpdate(computePosition(e.clientX));
    },
    [computePosition, scheduleUpdate]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      if (e.touches.length > 0) {
        scheduleUpdate(computePosition(e.touches[0].clientX));
      }

      windowTouchMoveRef.current = (ev: TouchEvent) => {
        ev.preventDefault();
        if (ev.touches.length > 0) {
          scheduleUpdate(computePosition(ev.touches[0].clientX));
        }
      };

      windowTouchEndRef.current = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
        if (windowTouchMoveRef.current) window.removeEventListener("touchmove", windowTouchMoveRef.current);
        if (windowTouchEndRef.current) window.removeEventListener("touchend", windowTouchEndRef.current);
        windowTouchMoveRef.current = null;
        windowTouchEndRef.current = null;
      };

      window.addEventListener("touchmove", windowTouchMoveRef.current, { passive: false });
      window.addEventListener("touchend", windowTouchEndRef.current);
    },
    [computePosition, scheduleUpdate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 5;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scheduleUpdate(Math.max(2, positionRef.current - step));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scheduleUpdate(Math.min(98, positionRef.current + step));
      }
    },
    [scheduleUpdate]
  );

  useLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current || !comparisonRef.current) return;
    const reduced = isReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([sectionRef.current, headingRef.current, comparisonRef.current], { opacity: 1, y: 0 });
        setIsReady(true);
        return;
      }
      gsap.set(sectionRef.current, { opacity: 0 });
      gsap.set(headingRef.current, { opacity: 0, y: 28 });
      gsap.set(comparisonRef.current, { opacity: 0, y: 20 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 84%", once: true } });
      tl.to(sectionRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.25")
        .to(comparisonRef.current, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out", onComplete: () => setIsReady(true) }, "-=0.4");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => { applyPosition(INITIAL_POSITION); }, [applyPosition]);

  useEffect(() => {
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, []);

  const headingLines = heading.split("\n");

  return (
    <section
      ref={sectionRef}
      aria-label="Before and after project transformation comparison"
      className={`mb-20 sm:mb-28 lg:mb-36 ${className}`}
    >
      <div ref={headingRef} className="mb-8 sm:mb-12 max-w-2xl space-y-4">
        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c9a227] sm:text-[10px] sm:tracking-[0.36em]">{eyebrow}</p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl text-[#f5f2ea] leading-[1.1]">
          {headingLines.map((line, i) => (<span key={i} className="block">{line}</span>))}
        </h2>
        <p className="text-xs sm:text-sm text-[#8a8378] leading-relaxed max-w-lg">{subtext}</p>
      </div>

      <div
        ref={comparisonRef}
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuenow={position}
        aria-valuemin={2}
        aria-valuemax={98}
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onMouseMove={handleComparisonMouseMove}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        className={[
          "relative w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[1.75rem] border border-[#222222] bg-[#0a0b0e]",
          aspectRatio,
          isDragging ? "cursor-col-resize" : "cursor-ew-resize",
          "select-none touch-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0e12]",
        ].join(" ")}
        style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.25s ease" }}
      >
        <div className="absolute inset-0">
          <Image src={beforeSrc} alt={beforeAlt} fill sizes={sizes} className="object-cover pointer-events-none" priority draggable={false} />
          <div className="absolute bottom-3 left-4 sm:bottom-6 sm:left-7 pointer-events-none z-10">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/65 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[9px] sm:tracking-[0.28em]">Before</span>
          </div>
        </div>

        <div ref={afterClipRef} className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: `inset(0 ${100 - INITIAL_POSITION}% 0 0)` }}>
          <Image src={afterSrc} alt={afterAlt} fill sizes={sizes} className="object-cover pointer-events-none" draggable={false} />
          <div className="absolute bottom-3 right-4 sm:bottom-6 sm:right-7 pointer-events-none z-10">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/65 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[9px] sm:tracking-[0.28em]">After</span>
          </div>
        </div>

        <div ref={dividerRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 will-change-transform" style={{ width: 0 }}>
          <div className="absolute inset-y-0" style={{ left: "-1px", width: "2px", background: "rgba(201,162,39,0.85)" }} />
          <div className={["absolute top-1/2 -translate-y-1/2 -translate-x-1/2", "flex items-center justify-center", "h-10 w-10 sm:h-11 sm:w-11 rounded-full", "border border-[#c9a227]/50 bg-[#0d0e12]/85 backdrop-blur-sm", "shadow-[0_0_0_5px_rgba(201,162,39,0.07)]", isDragging ? "scale-110 border-[#c9a227]/80" : "scale-100", "transition-[transform,border-color] duration-200 ease-out"].join(" ")}>
            <svg width="16" height="9" viewBox="0 0 18 10" fill="none" aria-hidden="true" className="sm:w-[18px] sm:h-[10px]">
              <path d="M1 5H17M1 5L4.5 2M1 5L4.5 8M17 5L13.5 2M17 5L13.5 8" stroke="#c9a227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[9px] uppercase tracking-[0.18em] text-[#3e3830] sm:text-[10px] sm:tracking-[0.22em]">
        Drag or move pointer to compare · Arrow keys also work
      </p>
    </section>
  );
}
