import { site, sameAs } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import { seoBusiness } from "@/content/seo";
import type { Collection, Post, Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["Store", "LocalBusiness", "ArtGallery"],
        "@id": `${site.url}/#business`,
        name: site.fullName,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        image: absoluteUrl("/brand/logo.jpg"),
        founder: { "@type": "Person", name: site.founder, jobTitle: "Coastal Artist" },
        priceRange: seoBusiness.priceRange ?? "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          postalCode: site.location.postalCode,
          addressCountry: site.location.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.location.latitude,
          longitude: site.location.longitude,
        },
        areaServed: "United States",
        sameAs,
        knowsAbout: [
          "Sea glass art",
          "Coastal decor",
          "Custom coastal artwork",
          "Handmade mirrors",
        ],
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.fullName,
        url: site.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/shop?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.shortDescription,
        image: product.image ? absoluteUrl(product.image) : undefined,
        sku: product.slug,
        category: product.category,
        brand: { "@type": "Brand", name: site.fullName },
        material: product.materials?.join(", "),
        offers: {
          "@type": "Offer",
          priceCurrency: product.currency || "USD",
          price: product.price,
          // Each piece is made to order — a new one is handcrafted per commission.
          availability: "https://schema.org/MadeToOrder",
          itemCondition: "https://schema.org/NewCondition",
          url: absoluteUrl(`/shop/${product.slug}`),
          seller: { "@type": "Organization", name: site.fullName },
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Handmade", value: "Yes" },
          { "@type": "PropertyValue", name: "One of a kind", value: product.oneOfAKind ? "Yes" : "No" },
          product.dimensions && {
            "@type": "PropertyValue",
            name: "Dimensions",
            value: product.dimensions,
          },
        ].filter(Boolean),
      }}
    />
  );
}

export function CollectionJsonLd({
  collection,
  products,
}: {
  collection: Collection;
  products: Product[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: collection.name,
        description: collection.description,
        url: absoluteUrl(`/collections/${collection.slug}`),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            url: absoluteUrl(`/shop/${p.slug}`),
          })),
        },
      }}
    />
  );
}

export function ArticleJsonLd({ post }: { post: Post }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Person", name: post.author },
        publisher: {
          "@type": "Organization",
          name: site.fullName,
          logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.jpg") },
        },
        url: absoluteUrl(`/blog/${post.slug}`),
        articleSection: post.category,
        keywords: post.keywords?.join(", "),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: absoluteUrl(it.href),
        })),
      }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export { formatPrice };
