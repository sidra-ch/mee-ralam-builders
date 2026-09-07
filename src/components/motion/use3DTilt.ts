"use client";

import { useRef, useEffect } from "react";
import { gsap, isReducedMotion, isMobileViewport } from "./gsapConfig";

interface Use3DTiltOptions {
  /**
   * Maximum rotation in degrees for X axis (vertical tilt)
   * Default: 4
   */
  maxRotateX?: number;
  /**
   * Maximum rotation in degrees for Y axis (horizontal tilt)
   * Default: 5
   */
  maxRotateY?: number;
  /**
   * Maximum scale on hover
   * Default: 1.02
   */
  maxScale?: number;
  /**
   * Duration of the tilt animation in seconds
   * Default: 0.4
   */
  duration?: number;
  /**
   * Whether to enable the effect
   * Default: true (respects reduced motion and mobile)
   */
  enabled?: boolean;
  /**
   * Callback when tilt changes
   */
  onTiltChange?: (rotateX: number, rotateY: number, scale: number) => void;
}

/**
 * Reusable 3D tilt hook for premium image interactions
 * 
 * Features:
 * - Mouse-follow 3D tilt on desktop
 * - Scroll-based parallax fallback on mobile
 * - Respects prefers-reduced-motion
 * - Smooth GSAP animations
 * - Clean event listener cleanup
 * 
 * @example
 * const tiltRef = use3DTilt<HTMLDivElement>({
 *   maxRotateX: 4,
 *   maxRotateY: 5,
 *   maxScale: 1.02,
 * });
 * 
 * <div ref={tiltRef} style={{ transformStyle: 'preserve-3d' }}>
 *   <Image />
 * </div>
 */
export function use3DTilt<T extends HTMLElement>(
  options: Use3DTiltOptions = {}
) {
  const {
    maxRotateX = 4,
    maxRotateY = 5,
    maxScale = 1.02,
    duration = 0.4,
    enabled = true,
    onTiltChange,
  } = options;

  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Check if effect should be enabled
  const shouldEnable = enabled && !isReducedMotion() && !isMobileViewport();

  // Setup event listeners
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !shouldEnable) return;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateX = -y * maxRotateX;
      const rotateY = x * maxRotateY;
      const scale = maxScale;

      // Use GSAP for smooth animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(elementRef.current, {
        duration,
        rotateX,
        rotateY,
        scale,
        ease: "power2.out",
        onUpdate: () => {
          onTiltChange?.(rotateX, rotateY, scale);
        },
      });
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      if (!elementRef.current) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(elementRef.current, {
        duration: duration * 1.25, // Slightly longer for smooth return
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power2.out",
        onUpdate: () => {
          onTiltChange?.(0, 0, 1);
        },
      });
    };

    // Desktop mouse interaction only
    element.addEventListener("mousemove", handleMouseMove as EventListener);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // Cleanup
      element.removeEventListener("mousemove", handleMouseMove as EventListener);
      element.removeEventListener("mouseleave", handleMouseLeave);
      
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [shouldEnable, maxRotateX, maxRotateY, maxScale, duration, onTiltChange]);

  return elementRef;
}
