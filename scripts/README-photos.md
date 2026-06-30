# Product Photography — two ways to get studio-quality images

Every product on the site loads its photo from `public/products/<LABEL>.jpg`
(e.g. `public/products/IMG_8955.jpg`). Replace that file with a better image and
the site updates automatically — **no code changes, ever.** The layout, sizes
and SEO all stay the same.

You have two ways to produce the upgraded, studio-quality photos. Both keep
Mary's real artwork exactly as it is, because both start from the real photo.

---

## Option A — ChatGPT, by hand (no setup)

This is the "paste a prompt and press go" flow.

1. Open **ChatGPT** (a model that can generate images).
2. Find the piece in **`docs/photography/PHOTO-PROMPTS.md`**. Each one is labelled
   (e.g. `IMG_8955 — Tidewater Ombre`).
3. **Attach the real photo** named there (`public/products/IMG_8955.jpg`). This is
   what makes the result look like *that exact piece* and not a generic AI image.
4. Paste the **① Studio (hero)** prompt and send.
5. Save the result with the **exact same filename** (`IMG_8955.jpg`) and drop it
   into `public/products/`, replacing the old one.
6. Want a room scene or a close-up too? Paste the **② Lifestyle** or **③ Macro**
   prompt for that piece.

> **Keep it real, not "AI".** Always attach the real photo first, and if a
> generation changes any shells or glass, just keep the original — it's already a
> genuine photo of the genuine piece.

---

## Option B — Automated batch (one command)

If you have an OpenAI API key, this does Option A for **all 27 pieces** at once.

```bash
export OPENAI_API_KEY=sk-...                 # your key
node scripts/generate-studio-photos.mjs      # all products
# or just a few:
node scripts/generate-studio-photos.mjs IMG_8955 IMG_8959
```

Results are written to `public/products/_studio/` for review. When one looks
great, promote it:

```bash
cp public/products/_studio/IMG_8955.jpg public/products/IMG_8955.jpg
```

Notes:
- It uses each product's real photo as the reference image, so the piece stays
  faithful.
- `gpt-image-1` outputs up to 1024×1024; for very large hero banners, use
  Option A in ChatGPT and ask for 3000×3000.
- Review every image before promoting it — generative tools can still drift.

---

## Can this be "wired" to ChatGPT directly?

Not from inside this project — there's no live connection to your ChatGPT
account, and image generation needs your own API access. Option B above is the
closest thing: with your OpenAI key it runs the whole set unattended. Otherwise,
Option A is the manual version of the same thing.
