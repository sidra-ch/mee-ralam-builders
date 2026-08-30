"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { modelConfig } from "./modelConfig";

interface CameraControllerProps {
  mode?: "parallax" | "interactive";
  pointerTargetRef?: React.RefObject<{ x: number; y: number }>;
  initialPosition?: [number, number, number];
  fov?: number;
  target?: [number, number, number];
}

/**
 * Cinematic Architectural Camera Controller
 * Provides restrained, damped mouse parallax or controlled interactive orbit.
 */
export function CameraController({
  mode = "parallax",
  pointerTargetRef,
  initialPosition = [0, 0, 4.2],
  fov = 48,
  target = [0, 0, 0],
}: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetVector = useRef(new THREE.Vector3(...target));

  useFrame((state) => {
    if (mode === "parallax" && pointerTargetRef?.current) {
      const { mouseParallaxRange, damping } = modelConfig.hero;

      // Calculate target camera position from mouse offset
      const offsetX = pointerTargetRef.current.x * mouseParallaxRange.x;
      const offsetY = pointerTargetRef.current.y * mouseParallaxRange.y;

      const destX = initialPosition[0] + offsetX;
      const destY = initialPosition[1] + offsetY;
      const destZ = initialPosition[2];

      // Smooth inertia damping
      state.camera.position.x += (destX - state.camera.position.x) * damping;
      state.camera.position.y += (destY - state.camera.position.y) * damping;
      state.camera.position.z += (destZ - state.camera.position.z) * damping;

      // Subtle rotation lookAt with smooth convergence
      state.camera.lookAt(targetVector.current);
    }
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={initialPosition}
        fov={fov}
        near={0.1}
        far={100}
      />

      {mode === "interactive" && (
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={modelConfig.experience.autoRotateSpeed}
          dampingFactor={modelConfig.experience.dampingFactor}
          minPolarAngle={modelConfig.experience.orbitLimits.minPolarAngle}
          maxPolarAngle={modelConfig.experience.orbitLimits.maxPolarAngle}
          minAzimuthAngle={modelConfig.experience.orbitLimits.minAzimuthAngle}
          maxAzimuthAngle={modelConfig.experience.orbitLimits.maxAzimuthAngle}
          minDistance={modelConfig.experience.orbitLimits.minDistance}
          maxDistance={modelConfig.experience.orbitLimits.maxDistance}
          target={target}
        />
      )}
    </>
  );
}
