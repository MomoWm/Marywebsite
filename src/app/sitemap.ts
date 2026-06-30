import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { products, collections } from "@/lib/content";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/shop",
    "/collections",
    "/custom-orders",
    "/gallery",
    "/faq",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/custom-orders" || path === "/shop" ? 0.9 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...postRoutes];
}
