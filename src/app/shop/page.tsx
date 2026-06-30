import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ShopBrowser } from "@/components/product/shop-browser";
import { CtaBand } from "@/components/sections/cta-band";
import { TrustStrip } from "@/components/sections/trust-bar";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { products, categories, collections } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/shop");

export default function ShopPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "The Collection", href: "/shop" },
        ]}
      />
      <PageHeader
        eyebrow="The collection"
        title="One-of-a-kind coastal artwork"
        subhead="Every piece here was made entirely by hand and exists only once. Browse for inspiration, then reach out — Mary creates a brand-new custom version, made from scratch just for you."
      >
        <div className="mt-6">
          <TrustStrip />
        </div>
      </PageHeader>

      <section className="py-16 md:py-20">
        <div className="container-luxe">
          <ShopBrowser products={products} categories={categories} collections={collections} />
        </div>
      </section>

      <CtaBand index={2} />
    </>
  );
}
