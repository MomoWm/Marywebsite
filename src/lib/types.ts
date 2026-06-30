/**
 * Domain types for the Sea Attitudes content layer.
 *
 * The content currently lives in typed files under `src/content`, but every
 * shape here maps 1:1 to a CMS document (Sanity / Payload), so migrating later
 * is a matter of swapping the data source — not the components.
 */

export type CategorySlug =
  | "mirrors"
  | "shadow-boxes"
  | "sea-glass-art"
  | "apparel"
  | "christmas-trees"
  | "coasters"
  | "resin-decor"
  | "gifts"
  | "shell-art"
  | "wall-decor";

export interface Category {
  label: string;
  slug: CategorySlug | string;
  description: string;
}

export interface Product {
  name: string;
  slug: string;
  category: CategorySlug | string;
  collectionSlug: string;
  price: number;
  currency: string;
  dimensions: string;
  materials: string[];
  shortDescription: string;
  description: string;
  story: string;
  care: string;
  shipping: string;
  featured: boolean;
  bestSeller: boolean;
  oneOfAKind: boolean;
  seasonal?: boolean;
  available: boolean;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  altText: string;
  /** 4–5 hex values used to seed the generative coastal artwork. */
  colorPalette: string[];
  /** Path to the real photograph. Falls back to generative art when absent. */
  image?: string;
  gallery?: string[];
  /** Photo aspect, used for gallery/masonry layout. */
  orientation?: "portrait" | "landscape" | "square";
  /** Surface this piece in homepage rails. */
  homepage?: boolean;
  /** Short descriptor of the form (e.g. "Sea glass shadow box"). */
  productType?: string;
}

export interface Collection {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  story: string;
  colorPalette: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  image?: string;
}

export interface Testimonial {
  name: string;
  location: string;
  role: string;
  quote: string;
  rating: number;
  product?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  category: string;
  items: FaqItem[];
}

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  readingTime: string;
  publishedLabel: string;
  heroAlt: string;
  colorPalette: string[];
  body: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export interface SectionIntro {
  key: string;
  eyebrow: string;
  title: string;
  subhead: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface CtaBlock {
  headline: string;
  subhead: string;
  button: string;
}
