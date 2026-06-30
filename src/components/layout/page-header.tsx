import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { PalmLeaf, SeaOats, Coral } from "@/components/art/botanicals";

export function PageHeader({
  eyebrow,
  title,
  subhead,
  align = "center",
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subhead?: React.ReactNode;
  align?: "center" | "left";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "grain relative overflow-hidden border-b border-border bg-gradient-to-b from-sand-light/60 via-shell to-shell",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-24 -top-16 size-80 rounded-full bg-aqua/20 blur-[110px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-seafoam/15 blur-[100px]" />
      <PalmLeaf className="pointer-events-none absolute -right-4 top-6 w-44 text-seafoam/25 md:w-56" />
      <SeaOats className="pointer-events-none absolute left-4 bottom-2 h-28 text-ocean/15 md:left-10 md:h-36" />
      <Coral className="pointer-events-none absolute right-10 bottom-2 hidden h-24 text-seafoam/20 lg:block" />
      <div
        className={cn(
          "container-luxe relative py-16 md:py-24",
          align === "center" ? "text-center" : "text-left",
        )}
      >
        <Reveal
          className={cn(
            "flex flex-col gap-5",
            align === "center" ? "mx-auto max-w-3xl items-center" : "max-w-3xl items-start",
          )}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="display-balance font-display text-4xl leading-[1.05] text-deepsea sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
          {subhead && (
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{subhead}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
