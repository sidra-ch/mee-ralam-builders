"use client";

import { useState } from "react";
import Image from "next/image";

export function BrandLogo({ size = 48, priority = false }: { size?: number; priority?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-full border border-[#c9a227]/80 bg-[#171717] p-0.5 shadow-[0_0_12px_rgba(201,162,39,0.15)]"
      style={{ width: size, height: size }}
    >
      {failed ? (
        <span className="font-display text-[9px] font-semibold tracking-[0.18em] text-[#c9a227]">
          MAB
        </span>
      ) : (
        <Image
          src="/images/logo.png"
          alt="Meer Alam Builders logo"
          width={size * 2}
          height={size * 2}
          priority={priority}
          onError={() => setFailed(true)}
          className="h-full w-full rounded-full object-cover"
        />
      )}
    </div>
  );
}
