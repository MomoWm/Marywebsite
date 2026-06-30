"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { Category, Collection, Product } from "@/lib/types";

type Sort = "featured" | "price-asc" | "price-desc" | "az";

export function ShopBrowser({
  products,
  categories,
  collections,
  initialCategory = "all",
  initialCollection = "all",
}: {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  initialCategory?: string;
  initialCollection?: string;
}) {
  const [category, setCategory] = React.useState(initialCategory);
  const [collection, setCollection] = React.useState(initialCollection);
  const [sort, setSort] = React.useState<Sort>("featured");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (collection !== "all" && p.collectionSlug !== collection) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.shortDescription} ${p.materials.join(" ")} ${p.keywords.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "az") return a.name.localeCompare(b.name);
      return Number(b.featured) - Number(a.featured) || a.price - b.price;
    });
    return list;
  }, [products, category, collection, sort, query]);

  return (
    <div>
      {/* Category pills */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <Pill active={category === "all"} onClick={() => setCategory("all")}>
          All pieces
        </Pill>
        {categories.map((c) => (
          <Pill key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
            {c.label}
          </Pill>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection…"
            className="h-11 w-full rounded-full border border-border bg-white/70 pl-9 pr-4 text-sm text-deepsea placeholder:text-muted focus:border-ocean/60 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate">
            <span className="hidden sm:inline">Collection</span>
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="h-11 rounded-full border border-border bg-white/70 px-4 text-sm text-deepsea focus:border-ocean/60 focus:outline-none"
            >
              <option value="all">All collections</option>
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-slate">
            <SlidersHorizontal className="size-4 text-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-full border border-border bg-white/70 px-4 text-sm text-deepsea focus:border-ocean/60 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="az">A – Z</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} sizes="(max-width: 640px) 50vw, 25vw" />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="font-display text-2xl text-deepsea">Nothing matches just yet</p>
          <p className="mt-2 text-ink-soft">
            Try another filter — or commission exactly what you&rsquo;re imagining.
          </p>
        </div>
      )}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
        active
          ? "border-deepsea bg-deepsea text-shell"
          : "border-border bg-white/60 text-slate hover:border-deepsea/40 hover:text-deepsea",
      )}
    >
      {children}
    </button>
  );
}
