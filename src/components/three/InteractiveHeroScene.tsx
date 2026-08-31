"use client";

import { Component, type ReactNode, Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import "./threeSetup";
import { HeroImagePlane } from "./HeroImagePlane";
import { SceneFallback } from "./SceneFallback";

interface InteractiveHeroSceneProps {
  image: string;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  velocityRef: React.RefObject<number>;
}

class HeroWebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function subscribe(callback: () => void) {
  const queries = [
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)"),
  ];
  queries.forEach((query) => query.addEventListener("change", callback));
  return () => queries.forEach((query) => query.removeEventListener("change", callback));
}

function canUseInteractiveWebGL() {
  if (typeof window === "undefined") return false;

  const desktopPointer = window.matchMedia(
    "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
  ).matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!desktopPointer || reducedMotion) return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

/** Desktop-only WebGL enhancement; the image fallback is always available. */
export function InteractiveHeroScene({ image, pointerRef, velocityRef }: InteractiveHeroSceneProps) {
  const canRenderWebGL = useSyncExternalStore(subscribe, canUseInteractiveWebGL, () => false);
  const fallback = <SceneFallback imageSrc={image} className="absolute inset-0" />;

  if (!canRenderWebGL) return fallback;

  return (
    <HeroWebGLErrorBoundary fallback={fallback}>
      {fallback}
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroImagePlane image={image} pointerRef={pointerRef} velocityRef={velocityRef} />
        </Suspense>
      </Canvas>
    </HeroWebGLErrorBoundary>
  );
}
