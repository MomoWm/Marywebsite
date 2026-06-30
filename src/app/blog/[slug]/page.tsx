import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Markdown } from "@/components/ui/markdown";
import { CoastalArt } from "@/components/art/coastal-art";
import { PostCard } from "@/components/blog/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { posts } from "@/content/posts";
import { getPostBySlug, getOtherPosts } from "@/lib/content";
import { postMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return postMetadata(post);
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const more = getOtherPosts(slug, 3);

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article>
        <header className="border-b border-border bg-gradient-to-b from-sand-light/40 to-shell">
          <div className="container-luxe py-12 md:py-16">
            <Breadcrumbs
              className="mb-8"
              items={[
                { name: "Home", href: "/" },
                { name: "Journal", href: "/blog" },
                { name: post.title, href: `/blog/${post.slug}` },
              ]}
            />
            <p className="eyebrow">{post.category}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-deepsea md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate">
              <span className="flex items-center gap-1.5">
                <User className="size-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {post.readingTime}
              </span>
              <span>{post.publishedLabel}</span>
            </div>
          </div>
          <div className="container-luxe pb-12">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] shadow-deep sm:aspect-[16/7]">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.heroAlt || post.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
              ) : (
                <CoastalArt seed={post.slug} palette={post.colorPalette} variant="hero" horizon className="h-full" />
              )}
            </div>
          </div>
        </header>

        <div className="container-luxe py-14 md:py-20">
          <div className="mx-auto max-w-2xl">
            <Markdown content={post.body} />
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-border py-16 md:py-20">
          <div className="container-luxe">
            <h2 className="font-display text-2xl text-deepsea md:text-3xl">Keep reading</h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand index={2} />
    </>
  );
}
