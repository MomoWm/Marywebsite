# Sea Attitudes by Mary Lee

> Handcrafted Art Inspired by the Sea — a luxury coastal brand site for **Sea Attitudes LLC**, Englewood, Florida.

A production-grade marketing + lead-generation site for Mary Lee's one-of-a-kind sea
glass artwork: mirrors, shadow boxes, lit Christmas trees and beach gifts. Built to feel
like an upscale coastal gallery and engineered to turn visitors into **custom commission
leads**.

---

## The business model (important)

Mary does **not** mass-produce or restock. Every piece is **made from scratch, one at a
time**. A customer reaches out, tells Mary what they'd love, and she creates a brand-new
custom piece for them.

The site reflects this everywhere:
- The catalog is a **portfolio of one-of-a-kind examples**, not a buy-now store.
- Prices are shown as **"from" guide prices** (made to order), never a cart.
- Every product's calls-to-action are **"Commission a piece like this"** and **"Ask about
  this piece"**, funneling to the commission inquiry form.
- Primary conversion = a **qualified custom-commission lead**.

---

## Tech stack

- **Next.js 15** (App Router, React 19, Server Components) + **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokens) — custom luxury coastal design system
- **Motion** (Framer Motion) — subtle, ocean-like reveals & parallax (respects reduced motion)
- **Radix UI** primitives (accordion, dialog) in a shadcn-style component layer
- **next/font** (Fraunces display serif + Inter sans), `next/image`, dynamic sitemap/robots
- **Zod**-validated API routes for lead capture; pluggable email/webhook delivery
- Rich **SEO**: per-route metadata, Open Graph, and JSON-LD (LocalBusiness, Product,
  Collection, Article, Breadcrumb, FAQ)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start
npm run typecheck
```

## Project structure

```
src/
  app/                 # routes (home, about, shop, shop/[slug], collections, custom-orders,
                       #   gallery, testimonials, faq, blog, contact, api/*, sitemap, robots)
  components/
    layout/  ui/  sections/  product/  blog/  forms/  art/  seo/
  content/             # the typed content layer (CMS-ready) — see below
  lib/                 # site config, content accessors, seo, validators, notify, utils, types
public/
  products/            # real product photos (drop-in replaceable — see Photography)
  about/  brand/
docs/photography/      # the AI photo prompt system + manifest
scripts/               # generate-studio-photos.mjs (optional batch image generation)
```

## Content layer (CMS-ready)

All content lives in typed files under `src/content` (`products.ts`, `collections.ts`,
`testimonials.ts`, `faqs.ts`, `posts.ts`, `site-copy.ts`, `seo.ts`). Every shape maps 1:1
to a CMS document, so moving to **Sanity / Payload** later means swapping the data source
in `src/lib/content.ts` — components don't change.

- **28 products** across 5 collections (Sea Glass Mirrors, Coastal Shadow Boxes, Coastal
  Sayings, Sea Glass Christmas Trees, Beach Gifts) — each analyzed from Mary's real photos
  with luxury copy, materials, dimensions, story, care and SEO. See `docs/INVENTORY.md`.

## Photography — real photos now, studio upgrades anytime

Each product loads its image from `public/products/<LABEL>.jpg`. Replace that file and the
site updates automatically — **no code changes**. The current images are Mary's real
photos (converted from the originals). To upgrade them to studio quality:

- **`docs/photography/PHOTO-PROMPTS.md`** — a labeled, copy-paste **ChatGPT prompt** for
  every piece (Studio / Lifestyle / Macro). Attach the real photo, paste, generate, save
  with the same filename.
- **`scripts/generate-studio-photos.mjs`** — optional one-command batch generator (needs an
  OpenAI API key). See `scripts/README-photos.md`.

Because the prompts start from the real photo, results stay faithful to each handmade piece.

## Lead capture / forms

Three Zod-validated endpoints — `/api/newsletter`, `/api/contact`, `/api/custom-order` —
deliver leads via, in order: **Resend email** → **generic webhook** → server log (so a lead
is never silently lost). Configure one before launch (`src/lib/notify.ts`).

## Configuration

Copy `.env.example` to `.env.local` and set what you need:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap, JSON-LD) |
| `RESEND_API_KEY`, `LEAD_TO`, `LEAD_FROM` | Email delivery of leads |
| `LEAD_WEBHOOK_URL` | Alternative: POST leads to Zapier/Make/a CRM |
| `OPENAI_API_KEY` | Only for the optional studio-photo batch script |

Contact details (email `seaattitudesbymarylee@gmail.com`, phone `203-704-1230`, Englewood
FL) live in `src/lib/site.ts`. **Confirm the social handles** in that file before launch.

## Deployment

Optimized for **Vercel** (zero-config Next.js). Set the env vars above in the project
settings. `npm run build` → `npm run start` works on any Node 20+ host.

## SEO

Targets: *Sea Glass Art Florida, Coastal Decor, Beach House Decor, Custom Coastal Artwork,
Sea Glass Mirrors, Florida Coastal Artist, Englewood Florida Artist, Coastal Wall Decor*,
and more — woven through per-route metadata, structured data and the blog.
