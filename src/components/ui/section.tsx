import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
};

export function Section({ children, className, as: Component = "section" }: SectionProps) {
  return <Component className={cn("py-16 sm:py-20 lg:py-24", className)}>{children}</Component>;
}
