"use client";

import { Component, ReactNode, Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import "./threeSetup";
import { ArchitecturalLights } from "./ArchitecturalLights";
import { ArchitecturalModel } from "./ArchitecturalModel";
import { CameraController } from "./CameraController";
import { SceneLoader } from "./SceneLoader";
import { SceneFallback } from "./SceneFallback";
import { modelConfig } from "./modelConfig";

interface ArchitecturalSceneProps {
  variant?: "hero" | "experience";
  pointerTargetRef?: React.RefObject<{ x: number; y: number }>;
  className?: string;
  fallbackImage?: string;
  enableSparkles?: boolean;
}

// Error Boundary for WebGL canvas failures
class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

/**
 * Architectural Scene Wrapper
 * Manages WebGL initialization, Suspense, fallback rendering, and DPR optimizations.
 */
export function ArchitecturalScene({
  variant = "hero",
  pointerTargetRef,
  className = "absolute inset-0",
  fallbackImage = "/images/done-project-2.png",
  enableSparkles = true,
}: ArchitecturalSceneProps) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const hasWebGL = useSyncExternalStore(
    () => () => {},
    checkWebGL,
    () => false
  );

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Use fallback if WebGL unavailable, reduced motion is active, or before client hydration
  if (!isMounted || !hasWebGL || prefersReducedMotion) {
    return <SceneFallback imageSrc={fallbackImage} className={className} />;
  }

  const cameraInitialPos =
    variant === "hero"
      ? modelConfig.hero.cameraPosition
      : modelConfig.experience.cameraPosition;

  const cameraFov =
    variant === "hero"
      ? modelConfig.hero.cameraFov
      : modelConfig.experience.cameraFov;

  return (
    <div className={className}>
      <WebGLErrorBoundary fallback={<SceneFallback imageSrc={fallbackImage} />}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
          className="h-full w-full"
        >
          <color attach="background" args={["#0d0e12"]} />

          <CameraController
            mode={variant === "hero" ? "parallax" : "interactive"}
            pointerTargetRef={pointerTargetRef}
            initialPosition={cameraInitialPos}
            fov={cameraFov}
            target={modelConfig[variant].cameraTarget}
          />

          <Suspense fallback={<SceneLoader />}>
            <ArchitecturalLights animated={!prefersReducedMotion} />
            <ArchitecturalModel variant={variant} />

            {enableSparkles && (
              <Sparkles
                count={35}
                scale={[12, 6, 8]}
                size={3.0}
                speed={0.35}
                color="#f7c86b"
                opacity={0.65}
              />
            )}
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
