import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { CollectionShowcase } from "@/components/sections/collection-showcase";
import { CtaBand } from "@/components/sections/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/collections");

export default function CollectionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Collections", href: "/collections" },
        ]}
      />
      <PageHeader
        eyebrow="Curated by hand"
        title="Collections"
        subhead="Five ways into Mary's work — from her signature sea glass mirrors to lit holiday trees. Each piece is one-of-a-kind, and each can be reimagined just for you."
      />
      <CollectionShowcase heading={false} />
      <CtaBand index={1} />
    </>
  );
}
