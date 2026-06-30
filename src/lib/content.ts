import { products } from "@/content/products";
import { collections } from "@/content/collections";
import { testimonials } from "@/content/testimonials";
import { faqGroups } from "@/content/faqs";
import { posts } from "@/content/posts";
import type { Category, Collection, Post, Product } from "@/lib/types";

export { products, collections, testimonials, faqGroups, posts };

/** Product-type categories used by the shop filter. */
export const categories: Category[] = [
  { slug: "mirrors", label: "Mirrors", description: "Crushed sea-glass mirrors with shells & starfish." },
  { slug: "shadow-boxes", label: "Shadow Boxes", description: "Framed sea-glass coastal scenes." },
  { slug: "christmas-trees", label: "Christmas Trees", description: "Lit sea-glass holiday trees." },
  { slug: "gifts", label: "Beach Gifts", description: "Painted shells, starfish & keepsakes." },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collectionSlug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getCollectionForProduct(p: Product): Collection | undefined {
  return collections.find((c) => c.slug === p.collectionSlug);
}

export function getFeatured(limit?: number): Product[] {
  const list = products.filter((p) => p.featured);
  return limit ? list.slice(0, limit) : list;
}

export function getHomepageProducts(limit?: number): Product[] {
  const list = products.filter((p) => p.homepage);
  return limit ? list.slice(0, limit) : list;
}

export function getBestSellers(limit = 8): Product[] {
  const best = products.filter((p) => p.bestSeller);
  const list = best.length >= 4 ? best : products.filter((p) => p.featured);
  return list.slice(0, limit);
}

/** Related: same collection first, then same category, excluding self. */
export function getRelated(product: Product, limit = 4): Product[] {
  const pool = products.filter((p) => p.slug !== product.slug);
  const sameCollection = pool.filter((p) => p.collectionSlug === product.collectionSlug);
  const sameCategory = pool.filter(
    (p) => p.category === product.category && p.collectionSlug !== product.collectionSlug,
  );
  const rest = pool.filter(
    (p) => p.collectionSlug !== product.collectionSlug && p.category !== product.category,
  );
  return [...sameCollection, ...sameCategory, ...rest].slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getOtherPosts(slug: string, limit = 3): Post[] {
  return posts.filter((p) => p.slug !== slug).slice(0, limit);
}

/** Count of products per collection, for collection cards. */
export function collectionCount(slug: string): number {
  return products.filter((p) => p.collectionSlug === slug).length;
}
