"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribePointerCoarse(callback: () => void) {
  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getPointerCoarseSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Premium Architectural Custom Cursor
 * Respects reduced-motion and touch devices. Dynamically displays contextual labels.
 */
export function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string>("");
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const positionRef = useRef<CursorPosition>({ x: -100, y: -100 });
  const targetRef = useRef<CursorPosition>({ x: -100, y: -100 });

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const isTouchDevice = useSyncExternalStore(
    subscribePointerCoarse,
    getPointerCoarseSnapshot,
    getServerSnapshot
  );

  const disabled = prefersReducedMotion || isTouchDevice;

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Contextual hover listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttrEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorAttrEl) {
        const text = cursorAttrEl.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsInteractive(true);
        return;
      }

      const isClickable = target.closest("a, button, [role='button'], input, select, textarea");
      if (isClickable) {
        setCursorText("");
        setIsInteractive(true);
      } else {
        setCursorText("");
        setIsInteractive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [disabled, isVisible]);

  // Smooth RAF Animation Loop
  useEffect(() => {
    if (disabled) return;

    let animationFrameId: number;

    const animate = () => {
      // Smooth lerp damping
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.18;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [disabled]);

  if (disabled) return null;

  const hasCustomText = !!cursorText;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          hasCustomText
            ? "h-20 w-20 border-[#c9a227] bg-[#0d0d0d]/85 backdrop-blur-md shadow-[0_0_20px_rgba(201,162,39,0.25)]"
            : isInteractive
            ? "h-10 w-10 border-[#c9a227]/90 bg-[#c9a227]/10"
            : "h-7 w-7 border-[#c9a227]/40 bg-transparent"
        }`}
      >
        {/* Contextual Text */}
        {hasCustomText ? (
          <span
            ref={textRef}
            className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5f2ea] text-center px-1 select-none"
          >
            {cursorText}
          </span>
        ) : (
          /* Center Dot */
          <div
            ref={dotRef}
            className={`h-1 w-1 rounded-full bg-[#c9a227] transition-transform duration-200 ${
              isInteractive ? "scale-150" : "scale-100"
            }`}
          />
        )}
      </div>
    </div>
  );
}
