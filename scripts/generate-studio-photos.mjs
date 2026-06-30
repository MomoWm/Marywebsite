#!/usr/bin/env node
/**
 * generate-studio-photos.mjs
 * --------------------------------------------------------------------------
 * Optional automation for Sea Attitudes product photography.
 *
 * For every product it takes the REAL reference photo in `public/products/`,
 * sends it to OpenAI's image model (gpt-image-1) together with that product's
 * studio prompt, and writes a polished studio version to
 * `public/products/_studio/` for you to review.
 *
 * This is the "wire it up" path. The copy-paste prompts in
 * docs/photography/PHOTO-PROMPTS.md do the exact same thing by hand in ChatGPT.
 *
 * USAGE
 *   export OPENAI_API_KEY=sk-...            # your key
 *   node scripts/generate-studio-photos.mjs            # all products
 *   node scripts/generate-studio-photos.mjs IMG_8955   # just one (or several)
 *
 * Then REVIEW each result. If it faithfully reproduces the piece, copy it over
 * the original:  cp public/products/_studio/IMG_8955.jpg public/products/IMG_8955.jpg
 * If a result drifts from the real artwork, keep the original photo.
 * --------------------------------------------------------------------------
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public", "products");
const OUT = join(SRC, "_studio");
const PROMPTS = JSON.parse(readFileSync(join(ROOT, "docs/photography/prompts.json"), "utf8"));

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("✗ Set OPENAI_API_KEY first:  export OPENAI_API_KEY=sk-...");
  process.exit(1);
}

const only = process.argv.slice(2);
const jobs = only.length ? PROMPTS.filter((p) => only.includes(p.label)) : PROMPTS;
if (!jobs.length) {
  console.error("No matching products. Labels look like IMG_8955.");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

async function generate({ label, file, name, prompt }) {
  const inputPath = join(SRC, file);
  if (!existsSync(inputPath)) return console.warn(`• skip ${label} (no source photo)`);

  const form = new FormData();
  form.append("model", "gpt-image-1");
  form.append("prompt", prompt);
  form.append("size", "1024x1024");
  form.append("n", "1");
  form.append("image", new Blob([readFileSync(inputPath)], { type: "image/jpeg" }), file);

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}` },
    body: form,
  });
  if (!res.ok) {
    console.error(`✗ ${label} (${name}): ${res.status} ${await res.text()}`);
    return;
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) return console.error(`✗ ${label}: no image returned`);
  writeFileSync(join(OUT, file), Buffer.from(b64, "base64"));
  console.log(`✓ ${label} — ${name}`);
}

console.log(`Generating ${jobs.length} studio photo(s) → public/products/_studio/\n`);
for (const job of jobs) {
  try {
    await generate(job);
  } catch (e) {
    console.error(`✗ ${job.label}: ${e.message}`);
  }
}
console.log(
  "\nDone. Review public/products/_studio/, then copy good ones over the originals in public/products/.",
);
