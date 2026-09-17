"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
}

/**
 * ImageWithLoading - A wrapper around Next.js Image with loading state
 * Shows a subtle background color while image loads to prevent blank space
 */
export function ImageWithLoading({
  src,
  alt,
  fill = false,
  sizes,
  priority = false,
  className = "",
  onLoad,
}: ImageWithLoadingProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div className={`relative ${fill ? "absolute inset-0" : ""} ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#1a1a1a] animate-pulse"
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleLoad}
      />
    </div>
  );
}
