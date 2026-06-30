import type { Metadata } from "next";
import { site } from "@/lib/site";
import { absoluteUrl, SITE_URL } from "@/lib/utils";
import { seoRoutes, brandKeywords, defaultDescription } from "@/content/seo";
import type { Collection, Post, Product } from "@/lib/types";

const OG_DEFAULT = "/og-default.jpg";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.fullName} | ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: defaultDescription || site.description,
  keywords: brandKeywords,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.founder,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_US",
    url: SITE_URL,
    title: `${site.fullName} — ${site.tagline}`,
    description: defaultDescription || site.description,
    images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: site.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.tagline}`,
    description: defaultDescription || site.description,
    images: [OG_DEFAULT],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

function ogImage(image?: string, alt?: string) {
  return image
    ? [{ url: image, width: 1200, height: 1200, alt: alt ?? site.fullName }]
    : [{ url: OG_DEFAULT, width: 1200, height: 630, alt: site.fullName }];
}

/** Metadata for a static route, sourced from the SEO content pack. */
export function pageMetadata(path: string, fallback?: Partial<Metadata>): Metadata {
  const r = seoRoutes[path];
  const title = r?.title ?? (fallback?.title as string);
  const description = r?.description ?? fallback?.description ?? site.description;
  return {
    title,
    description,
    keywords: r?.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title}` : undefined,
      description,
      url: absoluteUrl(path),
      images: ogImage(),
    },
  };
}

export function productMetadata(p: Product): Metadata {
  const path = `/shop/${p.slug}`;
  return {
    title: p.seoTitle || p.name,
    description: p.seoDescription || p.shortDescription,
    keywords: p.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: p.name,
      description: p.seoDescription || p.shortDescription,
      url: absoluteUrl(path),
      images: ogImage(p.image, p.altText),
    },
    twitter: { card: "summary_large_image", images: p.image ? [p.image] : [OG_DEFAULT] },
  };
}

export function collectionMetadata(c: Collection): Metadata {
  const path = `/collections/${c.slug}`;
  return {
    title: c.seoTitle || c.name,
    description: c.seoDescription || c.description,
    keywords: c.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: c.name,
      description: c.seoDescription || c.description,
      url: absoluteUrl(path),
      images: ogImage(c.image, c.name),
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const path = `/blog/${post.slug}`;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.seoDescription || post.excerpt,
      url: absoluteUrl(path),
      authors: [post.author],
      images: ogImage(),
    },
  };
}
