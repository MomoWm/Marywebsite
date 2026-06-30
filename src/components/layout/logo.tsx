import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Brand lockup using Mary's hand-painted mermaid mark + serif wordmark. */
export function Logo({
  className,
  onDark = false,
  compact = false,
}: {
  className?: string;
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Sea Attitudes by Mary Lee — home"
      className={cn("group flex items-center gap-3", className)}
    >
      <span className="relative size-12 shrink-0">
        <Image
          src="/brand/mark.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain transition-transform duration-700 group-hover:-rotate-3"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl tracking-tight transition-colors duration-500",
            onDark ? "text-shell" : "text-deepsea",
          )}
        >
          Sea Attitudes
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[0.6rem] font-medium uppercase tracking-[0.3em] transition-colors duration-500",
              onDark ? "text-shell/70" : "text-slate/70",
            )}
          >
            by Mary Lee
          </span>
        )}
      </span>
    </Link>
  );
}
