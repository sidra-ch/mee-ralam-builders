/**
 * Central 3D Configuration for Meer Alam Builders
 *
 * NOTE: REAL ARCHITECTURAL GLB/GLTF MODEL REQUIRED FOR FINAL 3D EXPERIENCE.
 * When official GLB/GLTF models are delivered, place them in /public/models/
 * and update the modelPath below.
 */

export const modelConfig = {
  // Model Assets
  modelPath: "/models/architectural-villa.glb",
  fallbackTexture: "/images/hero-villa.png", // img-22.png
  experienceTexture: "/images/img-13.png",   // Luxury dusk facade

  // 3D Scene Geometry & Transformation
  hero: {
    scale: [1, 1, 1] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    cameraPosition: [0, 0, 4.3] as [number, number, number],
    cameraFov: 46,
    cameraTarget: [0, 0, 0] as [number, number, number],
    mouseParallaxRange: {
      x: 0.22, // Subtle horizontal shift (-0.22 to +0.22)
      y: 0.12, // Subtle vertical shift (-0.12 to +0.12)
    },
    damping: 0.045,
  },

  // Interactive 3D Experience Section
  experience: {
    scale: [1, 1, 1] as [number, number, number],
    position: [0, -0.2, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    cameraPosition: [3.2, 1.6, 5.0] as [number, number, number],
    cameraFov: 45,
    cameraTarget: [0, 0, 0] as [number, number, number],
    orbitLimits: {
      minPolarAngle: Math.PI / 4.2,   // 42 deg
      maxPolarAngle: Math.PI / 2.05,  // 87 deg (prevents looking from under ground)
      minAzimuthAngle: -Math.PI / 3,  // -60 deg
      maxAzimuthAngle: Math.PI / 3,   // +60 deg
      minDistance: 3.5,
      maxDistance: 7.0,
    },
    dampingFactor: 0.05,
    autoRotateSpeed: 0.35,
  },

  // Luxury Architectural Lighting Palette
  lighting: {
    ambientColor: "#8298a8",
    ambientIntensity: 0.65,
    moonlightColor: "#cbd5e1",
    moonlightIntensity: 1.05,
    goldAccentColor: "#ffc259",
    goldWarmColor: "#f39c12",
    terracePaverColor: "#0a0b0e",
  },
} as const;
