"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { modelConfig } from "./modelConfig";

interface ArchitecturalLightsProps {
  animated?: boolean;
}

/**
 * Luxury Architectural Lighting
 * Aligned with the architectural geometry, illuminated LED strips, steps, and water features.
 */
export function ArchitecturalLights({ animated = true }: ArchitecturalLightsProps) {
  const stepLightsRef = useRef<THREE.PointLight>(null);
  const canopyLightRef = useRef<THREE.PointLight>(null);
  const waterLightRef = useRef<THREE.PointLight>(null);
  const upperTerraceRef = useRef<THREE.PointLight>(null);
  const [timer] = useState(() => new THREE.Timer());

  useFrame(() => {
    if (!animated) return;
    timer.update();
    const t = timer.getElapsed();

    if (stepLightsRef.current) {
      stepLightsRef.current.intensity = 2.2 + Math.sin(t * 1.5) * 0.25;
    }
    if (canopyLightRef.current) {
      canopyLightRef.current.intensity = 1.9 + Math.cos(t * 1.2) * 0.2;
    }
    if (waterLightRef.current) {
      waterLightRef.current.intensity = 1.6 + Math.sin(t * 1.8 + 1) * 0.2;
    }
    if (upperTerraceRef.current) {
      upperTerraceRef.current.intensity = 1.4 + Math.cos(t * 2.0) * 0.15;
    }
  });

  const { lighting } = modelConfig;

  return (
    <group name="ArchitecturalLighting">
      {/* Cool Night Sky Ambient Fill */}
      <ambientLight
        intensity={lighting.ambientIntensity}
        color={lighting.ambientColor}
      />

      {/* Directional Moonlight with Soft Shadows */}
      <directionalLight
        position={[7, 10, 5]}
        intensity={lighting.moonlightIntensity}
        color={lighting.moonlightColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Subtle Rim Light to Accentuate Edges */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={0.35}
        color="#8fa3b0"
      />

      {/* Center Illuminated Steps Accent */}
      <pointLight
        ref={stepLightsRef}
        position={[-0.4, -1.6, 0.9]}
        intensity={2.2}
        distance={7.5}
        decay={2}
        color={lighting.goldAccentColor}
      />

      {/* Left Garage & Entrance Canopy Accent */}
      <pointLight
        ref={canopyLightRef}
        position={[-2.8, -0.6, 0.5]}
        intensity={1.9}
        distance={6.5}
        decay={2}
        color={lighting.goldWarmColor}
      />

      {/* Right Water Fountain Feature Accent */}
      <pointLight
        ref={waterLightRef}
        position={[3.8, -1.2, 0.7]}
        intensity={1.6}
        distance={6.0}
        decay={2}
        color={lighting.goldAccentColor}
      />

      {/* Upper Floor Cantilever Terrace Glow */}
      <pointLight
        ref={upperTerraceRef}
        position={[0.8, 1.3, 0.4]}
        intensity={1.4}
        distance={5.0}
        decay={2}
        color={lighting.goldWarmColor}
      />
    </group>
  );
}
