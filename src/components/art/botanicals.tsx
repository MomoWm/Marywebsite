import { cn } from "@/lib/utils";

/**
 * Hand-drawn coastal motifs — thin line art that gives the site an
 * illustrated, gathered-from-the-shore personality: branching coral, kelp,
 * shells, starfish, and a palm frond. All use `currentColor`, so color them
 * with text-* classes. Everything here is unmistakably oceanic — no flowers,
 * no wheat, nothing that grows on land.
 */

type IconProps = { className?: string };
const base = "inline-block";

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

/** Branching reef coral — a forking trunk with rounded polyp tips. */
export function Coral({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 56" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 54V44" />
        <path d="M24 44C24 36 24 28 24 17" />
        <path d="M24 44c-2-5-6-6-8-11" />
        <path d="M16 33c-1-4 0-7-2-11" />
        <path d="M16 33c2-3 5-3 6-7" />
        <path d="M24 44c2-5 6-6 8-11" />
        <path d="M32 33c1-4 0-7 2-11" />
        <path d="M32 33c-2-3-5-3-6-7" />
      </g>
      <g fill="currentColor" stroke="none">
        <circle cx="24" cy="15" r="1.6" />
        <circle cx="14" cy="21" r="1.5" />
        <circle cx="22" cy="25" r="1.5" />
        <circle cx="34" cy="21" r="1.5" />
        <circle cx="26" cy="25" r="1.5" />
      </g>
    </svg>
  );
}

/** A single strand of kelp — a wavy frond with two drifting offshoots. */
export function Kelp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 48" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 46C11 39 21 33 16 26C11 19 21 13 16 6" />
        <path d="M16 30C20 28 23 25 23 20" />
        <path d="M16 22C12 20 10 17 10 12" />
      </g>
    </svg>
  );
}

/** A small decorative divider — short rules flanking a starfish, with kelp. */
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
      <Kelp className="h-5 w-3.5 -scale-x-100 text-seafoam" />
      <Starfish className="size-4 text-ocean" />
      <Kelp className="h-5 w-3.5 text-seafoam" />
      <span className="h-px w-10 bg-ocean/30" />
    </div>
  );
}
