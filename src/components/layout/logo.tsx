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
          "grid size-10 place-items-center rounded-full transition-colors duration-500",
          onDark ? "bg-shell/15" : "bg-deepsea/[0.05]",
        )}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M2 14c2.2 0 2.2-2 4.4-2s2.2 2 4.4 2 2.2-2 4.4-2 2.2 2 4.4 2"
            stroke={onDark ? "#fbf9f6" : "#3a6d8c"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 18c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6"
            stroke="#c2a36b"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="16.5" cy="7.5" r="1.6" fill="#c2a36b" />
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
