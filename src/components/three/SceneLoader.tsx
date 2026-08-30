"use client";

import { Html, useProgress } from "@react-three/drei";

/**
 * Editorial, restrained 3D loading state
 */
export function SceneLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-[#2a2a2a]/60 bg-[#0d0e12]/90 px-8 py-6 backdrop-blur-md text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#c9a227]">
          Architecture
        </p>
        <p className="font-display text-sm tracking-widest text-[#f5f2ea]">
          Loading 3D Experience
        </p>
        <div className="h-[2px] w-32 overflow-hidden rounded-full bg-[#1f1f1f]">
          <div
            className="h-full bg-gradient-to-r from-[#9f7e20] to-[#c9a227] transition-all duration-300 ease-out"
            style={{ width: `${Math.max(10, progress)}%` }}
          />
        </div>
      </div>
    </Html>
  );
}
