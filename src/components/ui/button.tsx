import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const baseClassName =
    "inline-flex items-center justify-center rounded-md border px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] disabled:pointer-events-none disabled:opacity-60";

  const variantClassName =
    variant === "primary"
      ? "border-[#c9a227] bg-[#c9a227] text-[#111111] shadow-[0_10px_30px_rgba(201,162,39,0.18)] hover:bg-[#d4b14f] hover:shadow-[0_12px_32px_rgba(201,162,39,0.25)]"
      : "border-[#2b2b2b] bg-transparent text-[#f5f2ea] hover:border-[#c9a227] hover:text-[#f5f2ea]";

  if (href) {
    return (
      <Link href={href} className={cn(baseClassName, variantClassName, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cn(baseClassName, variantClassName, className)}>
      {children}
    </button>
  );
}
