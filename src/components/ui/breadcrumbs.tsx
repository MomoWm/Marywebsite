import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
  className,
}: {
  items: { name: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-slate">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-deepsea" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-ocean">
                  {item.name}
                </Link>
              )}
              {!last && <ChevronRight className="size-3.5 text-muted" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
