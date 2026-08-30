"use client";

import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { modelConfig } from "./modelConfig";

interface ArchitecturalModelProps {
  variant?: "hero" | "experience";
  position?: [number, number, number];
  scale?: [number, number, number];
}

/**
 * Architectural 3D Model Component
 *
 * NOTE: REAL ARCHITECTURAL GLB/GLTF MODEL REQUIRED FOR FINAL 3D EXPERIENCE.
 * When official GLB/GLTF models are delivered, place them in /public/models/
 * and update the modelPath in modelConfig.ts.
 */
export function ArchitecturalModel({
  variant = "hero",
  position = [0, 0, 0],
  scale = [1, 1, 1],
}: ArchitecturalModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texturePath =
    variant === "hero"
      ? modelConfig.fallbackTexture
      : modelConfig.experienceTexture;

  const texture = useTexture(texturePath);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 3D Architectural Villa Backdrop Layer */}
      <mesh
        position={variant === "hero" ? [0, 0.15, -1.8] : [0, 0.3, -1.2]}
        scale={variant === "hero" ? [13.2, 7.8, 1] : [11.5, 6.8, 1]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.35}
          metalness={0.12}
          toneMapped={false}
        />
      </mesh>

      {/* Reflective Architectural Stone Paving Terrace */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.2, 0]}
        receiveShadow
      >
        <planeGeometry args={[28, 18]} />
        <meshStandardMaterial
          color={modelConfig.lighting.terracePaverColor}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Minimal Architectural Spatial Accents */}
      <mesh position={[-3.8, -1.6, 0.8]} castShadow>
        <boxGeometry args={[0.06, 0.6, 0.06]} />
        <meshStandardMaterial
          color="#c9a227"
          emissive="#c9a227"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[3.8, -1.6, 0.8]} castShadow>
        <boxGeometry args={[0.06, 0.6, 0.06]} />
        <meshStandardMaterial
          color="#c9a227"
          emissive="#c9a227"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}
