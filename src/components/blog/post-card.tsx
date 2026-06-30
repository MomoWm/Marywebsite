import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { CoastalArt } from "@/components/art/coastal-art";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";

export function PostCard({
  post,
  large = false,
}: {
  post: Post;
  large?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn("group flex flex-col", large && "lg:flex-row lg:items-center lg:gap-10")}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl shadow-soft transition-shadow duration-700 group-hover:shadow-lift",
          large ? "aspect-[16/10] w-full lg:w-3/5" : "aspect-[3/2] w-full",
        )}
      >
        <CoastalArt
          seed={post.slug}
          palette={post.colorPalette}
          variant={large ? "hero" : "wide"}
          horizon
          className="h-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-shell/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-deepsea backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className={cn("mt-5", large && "lg:mt-0 lg:w-2/5")}>
        <div className="flex items-center gap-3 text-xs text-slate">
          <span>{post.publishedLabel}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readingTime}
          </span>
        </div>
        <h3
          className={cn(
            "mt-3 font-display leading-snug text-deepsea transition-colors group-hover:text-ocean",
            large ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 leading-relaxed text-ink-soft">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ocean">
          Read the story
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
