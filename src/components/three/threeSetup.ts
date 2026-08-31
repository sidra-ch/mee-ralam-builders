"use client";

import * as THREE from "three";

/**
 * Three.js r183+ deprecation compatibility.
 * Configures Three.js console handler to filter the deprecated THREE.Clock warning
 * emitted by external reconciler/reconciler packages (@react-three/fiber), while
 * application code directly uses the recommended THREE.Timer API.
 */
if (typeof window !== "undefined") {
  THREE.setConsoleFunction?.((type: string, message: string, ...params: unknown[]) => {
    if (typeof message === "string" && message.includes("THREE.Clock: This module has been deprecated")) {
      return;
    }
    if (type === "warn") {
      console.warn(message, ...params);
    } else if (type === "error") {
      console.error(message, ...params);
    } else {
      console.log(message, ...params);
    }
  });
}
