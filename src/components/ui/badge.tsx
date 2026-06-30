import * as React from "react";
import { cn } from "@/lib/utils";

const styles = {
  default: "bg-deepsea/[0.06] text-slate",
  glass: "glass text-deepsea shadow-soft",
  gold: "bg-gold/15 text-[#8a6d34]",
  seafoam: "bg-seafoam/25 text-deepsea",
  outline: "border border-deepsea/20 text-slate",
  dark: "bg-deepsea text-shell",
} as const;

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em]",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
