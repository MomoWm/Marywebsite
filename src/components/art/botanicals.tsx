import { cn } from "@/lib/utils";

/**
 * Hand-drawn coastal botanicals — thin line art that gives the site an
 * illustrated, beach-gathered personality (sea oats, blooms, shells, coral,
 * palm, starfish). All use `currentColor`, so color them with text-* classes.
 */

type IconProps = { className?: string };
const base = "inline-block";

export function SeaOats({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 64" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 62V20" />
        <path d="M24 22c-3-2-5-6-5-10 3 1 5 4 5 8M24 22c3-2 5-6 5-10-3 1-5 4-5 8" />
        <path d="M24 30c-3-2-5-5-5-9 3 1 5 3 5 7M24 30c3-2 5-5 5-9-3 1-5 3-5 7" />
        <path d="M24 38c-3-2-5-5-5-8 3 1 5 3 5 6M24 38c3-2 5-5 5-8-3 1-5 3-5 6" />
        <path d="M24 46c-3-2-4-4-4-7 2 1 4 3 4 5M24 46c3-2 4-4 4-7-2 1-4 3-4 5" />
      </g>
    </svg>
  );
}

export function Bloom({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="3.4" />
        <path d="M24 20.6c-1.2-4-0.6-7.6 0-9 0.6 1.4 1.2 5 0 9Z" />
        <path d="M27.4 24c4-1.2 7.6-0.6 9 0-1.4 0.6-5 1.2-9 0Z" />
        <path d="M24 27.4c1.2 4 0.6 7.6 0 9-0.6-1.4-1.2-5 0-9Z" />
        <path d="M20.6 24c-4 1.2-7.6 0.6-9 0 1.4-0.6 5-1.2 9 0Z" />
        <path d="M26.4 21.6c3-2.8 6.4-3.6 7.8-3.6-0.6 1.3-3 4-7.8 3.6Z" />
        <path d="M26.4 26.4c3 2.8 6.4 3.6 7.8 3.6-0.6-1.3-3-4-7.8-3.6Z" />
        <path d="M21.6 26.4c-3 2.8-6.4 3.6-7.8 3.6 0.6-1.3 3-4 7.8-3.6Z" />
        <path d="M21.6 21.6c-3-2.8-6.4-3.6-7.8-3.6 0.6 1.3 3 4 7.8 3.6Z" />
      </g>
    </svg>
  );
}

export function Starfish({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6c2.2 6.3 6 11 11.4 13.7-4.3 3.6-6 9.2-5 15.3-4-3.4-8.8-3.4-12.8 0 1-6.1-0.7-11.7-5-15.3C18 17 21.8 12.3 24 6Z" />
        <path d="M24 13v9M24 22l-6 4M24 22l6 4" opacity="0.5" />
      </g>
    </svg>
  );
}

export function Shell({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 39c-9 0-16-7.5-16-15 0-3.3 2.7-6 6-6 1.6 0 3 0.7 4 1.8C23 19.7 23.4 18 24 18s1 1.7 6 1.8c1-1.1 2.4-1.8 4-1.8 3.3 0 6 2.7 6 6 0 7.5-7 15-16 15Z" />
        <path d="M24 39V21M24 39c-3-4-5-9-5-15M24 39c3-4 5-9 5-15M24 39c-6-3-9-8-10-14M24 39c6-3 9-8 10-14" opacity="0.55" />
      </g>
    </svg>
  );
}

export function PalmLeaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 48" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 42C16 30 34 18 58 12" />
        <path d="M20 31c-3-3-4-7-4-10M27 26c-3-3-3-7-3-10M35 22c-2-3-2-7-1-10M44 18c-1-3 0-7 2-9M14 36c-4-2-6-5-7-9" opacity="0.7" />
        <path d="M22 30c3-4 7-6 10-7M30 25c3-4 7-5 10-6M39 21c3-3 7-4 10-4" opacity="0.7" />
      </g>
    </svg>
  );
}

export function Coral({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 56" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 54V30" />
        <path d="M24 40c-2-3-6-4-8-9-3 1-2 6 2 8M24 34c2-3 6-3 8-8 3 1 2 6-2 8" />
        <path d="M24 30c-3-3-3-8-1-12-3-1-6 3-5 8M24 30c3-3 3-8 1-12 3-1 6 3 5 8" />
        <path d="M24 22c-1-3 0-7 2-10M24 22c1-3 0-7-2-10" />
      </g>
    </svg>
  );
}

export function Sprig({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 48" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 46V8" />
        <path d="M16 18c-4-1-7-4-8-8 4 0 7 2 8 6M16 26c4-1 7-4 8-8-4 0-7 2-8 6M16 34c-3-1-6-3-7-7 3 0 6 1 7 5" />
      </g>
    </svg>
  );
}

/** A small decorative divider — short rules flanking a coastal bloom. */
export function BotanicalDivider({
  className,
  align = "center",
}: {
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-ocean/60",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-ocean/30" />
      <Sprig className="h-5 w-3.5 -scale-x-100 text-seafoam" />
      <Bloom className="size-4 text-ocean" />
      <Sprig className="h-5 w-3.5 text-seafoam" />
      <span className="h-px w-10 bg-ocean/30" />
    </div>
  );
}
