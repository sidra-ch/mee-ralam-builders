"use client";

import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface HeroImagePlaneProps {
  image: string;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  velocityRef: React.RefObject<number>;
}

interface HeroUniforms {
  [uniform: string]: THREE.IUniform;
  uTexture: { value: THREE.Texture };
  uViewport: { value: THREE.Vector2 };
  uImage: { value: THREE.Vector2 };
  uPointer: { value: THREE.Vector2 };
  uPointerSmooth: { value: THREE.Vector2 };
  uVelocity: { value: number };
  uTime: { value: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// Vertex shader
// Passes UV coordinates and also computes a world-space position for the
// perspective-shift effect applied in the fragment shader.
// ─────────────────────────────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Fragment shader
//
// Three layered effects, each independently controllable:
//
// 1. COVER UV   — keeps the image correctly filling the viewport at any
//                 aspect ratio (same as CSS object-fit: cover).
//
// 2. PARALLAX   — a persistent, always-on UV offset driven by the smoothed
//                 pointer position. The image plane is oversized (1.14×) so
//                 this offset actually reveals parts of the image that would
//                 otherwise be off-screen — creating genuine depth.
//                 This runs even when the mouse is still (offset returns to
//                 centre). Maximum shift: ±1.8% of UV space per axis.
//
// 3. DISPLACEMENT — a velocity-driven sinusoidal ripple, only noticeable
//                   during fast mouse movement. Slow/stopped: invisible.
//                   Maximum effective strength kept extremely restrained so
//                   the architecture never looks distorted.
//
// The effects are additive and each has a separate multiplier so they can be
// tuned independently without touching the others.
// ─────────────────────────────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uViewport;
  uniform vec2 uImage;
  uniform vec2 uPointer;
  uniform vec2 uPointerSmooth;
  uniform float uVelocity;
  uniform float uTime;
  varying vec2 vUv;

  // CSS object-fit: cover equivalent.
  // Keeps the image filling the viewport regardless of aspect ratio.
  vec2 coverUv(vec2 uv) {
    float viewAspect  = uViewport.x / uViewport.y;
    float imageAspect = uImage.x    / uImage.y;

    vec2 scale = vec2(1.0);
    if (viewAspect > imageAspect) {
      scale.y = imageAspect / viewAspect;
    } else {
      scale.x = viewAspect / imageAspect;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    // ── 1. Start from correctly-covered UV ──────────────────────────
    vec2 uv = coverUv(vUv);

    // ── 2. Persistent parallax — always-on depth response ───────────
    // uPointerSmooth is heavily interpolated so it never snaps.
    // Offset range: ±0.018 UV units (~1.8%). The mesh is 1.14× viewport
    // so there is real extra image area to reveal (not just stretching).
    vec2 parallaxOffset = (uPointerSmooth - 0.5) * vec2(-0.028, 0.022);
    uv += parallaxOffset;

    // ── 3. Velocity displacement — only felt during fast movement ────
    // The ripple is local (falls off with distance from pointer) and
    // self-damping (uVelocity decays in JS every frame).
    vec2  toPointer = vUv - uPointer;
    float dist      = length(toPointer);
    float falloff   = smoothstep(0.6, 0.0, dist);
    vec2  dir       = normalize(toPointer + vec2(0.0001));
    float wave      = sin(dist * 14.0 - uTime * 1.4);

    float dispStrength = uVelocity * 0.006;
    uv += dir * wave * falloff * dispStrength;

    // ── 4. Subtle global UV breathe ──────────────────────────────────
    // A very slow sinusoidal scale pulse centred on the pointer. Invisible
    // at rest, adds micro-life to a still composition.
    float breathe = sin(uTime * 0.18) * 0.003;
    uv = (uv - 0.5) * (1.0 + breathe) + 0.5;

    gl_FragColor = texture2D(uTexture, uv);
  }
`;

export function HeroImagePlane({ image, pointerRef, velocityRef }: HeroImagePlaneProps) {
  const meshRef     = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture     = useTexture(image);
  const { viewport, size } = useThree();

  // Smoothed pointer — updated in useFrame, much slower than raw pointer.
  // This is what drives the parallax (effect 2 above).
  const smoothPointer = useRef(new THREE.Vector2(0.5, 0.5));
  const [timer] = useState(() => new THREE.Timer());

  const uniforms: HeroUniforms = {
    uTexture:      { value: texture },
    uViewport:     { value: new THREE.Vector2(1, 1) },
    uImage:        { value: new THREE.Vector2(16, 9) },
    uPointer:      { value: new THREE.Vector2(0.5, 0.5) }, // raw — for displacement
    uPointerSmooth:{ value: new THREE.Vector2(0.5, 0.5) }, // very slow — for parallax
    uVelocity:     { value: 0 },
    uTime:         { value: 0 },
  };

  useFrame((state, delta) => {
    const mesh     = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    const u = material.uniforms as unknown as HeroUniforms;

    // ── Sync actual image dimensions ──────────────────────────────
    const img = texture.image as { width?: number; height?: number } | undefined;
    if (img?.width && img.height) {
      u.uImage.value.set(img.width, img.height);
    }
    u.uViewport.value.set(size.width, size.height);
    timer.update();
    u.uTime.value = timer.getElapsed();

    // ── Raw pointer (normalised 0–1) for displacement ─────────────
    const raw   = pointerRef.current ?? { x: 0, y: 0 };
    const rawX  = raw.x * 0.5 + 0.5;
    const rawY  = raw.y * 0.5 + 0.5;

    // Fast-smoothed raw pointer — drives velocity ripple origin
    const fastK = 1 - Math.exp(-delta * 6);
    u.uPointer.value.lerp(new THREE.Vector2(rawX, rawY), fastK);

    // Slow-smoothed pointer — drives persistent parallax.
    // Very low factor (3) means it takes ~330ms to reach target:
    // motion is felt, not seen as tracking.
    const slowK = 1 - Math.exp(-delta * 2.5);
    smoothPointer.current.lerp(new THREE.Vector2(rawX, rawY), slowK);
    u.uPointerSmooth.value.copy(smoothPointer.current);

    // ── Velocity decay ─────────────────────────────────────────────
    velocityRef.current = Math.max(0, (velocityRef.current ?? 0) - delta * 0.8);
    u.uVelocity.value   = THREE.MathUtils.lerp(
      u.uVelocity.value,
      Math.min(velocityRef.current ?? 0, 1),
      1 - Math.exp(-delta * 5)
    );

    // ── Mesh subtle rotation: driven by slow pointer, always-on ────
    // This shifts the entire plane in 3D space to reinforce the depth
    // illusion at the geometry level (in addition to the UV parallax).
    // Kept very small — max ±2° horizontal, ±1° vertical.
    const targetRotY = smoothPointer.current.x * 0.032 - 0.016;
    const targetRotX = -(smoothPointer.current.y * 0.018 - 0.009);
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetRotY, fastK * 0.4);
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetRotX, fastK * 0.4);

    // ── Mesh position micro-shift ───────────────────────────────────
    // Complementary to UV parallax. Makes the plane itself drift slightly
    // giving a second layer of depth without increasing complexity.
    const targetPosX = (smoothPointer.current.x - 0.5) * 0.04;
    const targetPosY = (smoothPointer.current.y - 0.5) * 0.025;
    mesh.position.x  = THREE.MathUtils.lerp(mesh.position.x, targetPosX, fastK * 0.35);
    mesh.position.y  = THREE.MathUtils.lerp(mesh.position.y, targetPosY, fastK * 0.35);
  });

  // 1.14× oversized — the extra 14% gives the parallax UV offset real image
  // area to sample from, so the effect is genuine depth, not stretching.
  return (
    <mesh ref={meshRef} scale={[viewport.width * 1.14, viewport.height * 1.14, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
