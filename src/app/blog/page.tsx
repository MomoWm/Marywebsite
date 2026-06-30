import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/blog");

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/blog" },
        ]}
      />
      <PageHeader
        eyebrow="The journal"
        title="Notes from the shoreline"
        subhead="Coastal decorating ideas, the making of sea glass art, and a look inside Mary's Englewood studio."
      />

      <section className="py-16 md:py-20">
        <div className="container-luxe">
          {featured && (
            <Reveal className="border-b border-border pb-16">
              <PostCard post={featured} large />
            </Reveal>
          )}

          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand index={1} tone="soft" />
    </>
  );
}
