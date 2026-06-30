import Link from "next/link";
import { cn } from "@/lib/utils";

/** Typographic brand lockup with a small hand-drawn wave mark. */
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
      <span
        className={cn(
          "grid size-11 place-items-center rounded-full border transition-colors duration-500",
          onDark ? "border-shell/45" : "border-deepsea/35",
        )}
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 13.5c2.4 0 2.4-2.2 4.8-2.2s2.4 2.2 4.8 2.2 2.4-2.2 4.8-2.2"
            stroke={onDark ? "#f6f1e8" : "#2f2a23"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M4 17c2 0 2-1.7 4-1.7s2 1.7 4 1.7 2-1.7 4-1.7"
            stroke="#b3654c"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="17" cy="7.6" r="1.5" fill="#c2a36b" />
        </svg>
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
              "mt-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] transition-colors duration-500",
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
