"use client";

import React, { useRef, useEffect, ReactElement } from "react";
import { isReducedMotion } from "./gsapConfig";

interface MagneticProps {
  children: ReactElement<{ className?: string; style?: React.CSSProperties }>;
  strength?: number; // Maximum displacement in pixels (default: 6)
  className?: string;
  disabled?: boolean;
}

/**
 * Premium Magnetic Micro-Interaction
 * Gently pulls the element toward the cursor within a restrained boundary (4–8px).
 * Automatically disabled on touch devices and prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 6,
  className = "",
  disabled = false,
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = isReducedMotion();

    if (isTouch || reduced) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = (e.clientX - centerX) / (rect.width / 2);
      const distY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp movement within restrained luxury bounds
      const clampedX = Math.max(-1, Math.min(1, distX)) * strength;
      const clampedY = Math.max(-1, Math.min(1, distY)) * strength;

      targetPos.current = { x: clampedX, y: clampedY };
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      targetPos.current = { x: 0, y: 0 };
    };

    const animate = () => {
      // Damped lerp toward target
      const lerpFactor = isHovered.current ? 0.15 : 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      // Apply transform directly for 60fps performance without React rerender
      if (el) {
        // If close enough to 0 when released, snap to 0 to save CPU
        if (
          !isHovered.current &&
          Math.abs(currentPos.current.x) < 0.05 &&
          Math.abs(currentPos.current.y) < 0.05
        ) {
          currentPos.current = { x: 0, y: 0 };
          el.style.transform = "translate3d(0, 0, 0)";
        } else {
          el.style.transform = `translate3d(${currentPos.current.x.toFixed(2)}px, ${currentPos.current.y.toFixed(2)}px, 0)`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [strength, disabled]);

  return (
    <div
      ref={containerRef}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: "none" }}
    >
      {children}
    </div>
  );
}
