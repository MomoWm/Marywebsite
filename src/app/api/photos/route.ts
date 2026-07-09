import { NextResponse } from "next/server";

/**
 * Hosts commission inspiration photos on ImgBB (free) from the server, so
 * browser cross-origin rules can never block the upload. Returns viewable
 * links to include in the lead email. The key is a public upload key; an
 * env var can override it.
 */
const IMGBB_KEY =
  process.env.IMGBB_API_KEY || "c630c9acfcbde616ecc117c98e69a72c";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const files = fd.getAll("photos").filter((f): f is File => f instanceof File);
    const urls: string[] = [];
    const errors: string[] = [];

    for (const file of files.slice(0, 4)) {
      try {
        const out = new FormData();
        out.append("image", file, file.name || "photo.jpg");
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
          method: "POST",
          body: out,
        });
        const j = (await res.json().catch(() => null)) as {
          data?: { url?: string };
          error?: { message?: string };
          status_txt?: string;
        } | null;
        if (j?.data?.url) urls.push(j.data.url);
        else errors.push(j?.error?.message || j?.status_txt || `upload failed (${res.status})`);
      } catch {
        errors.push("network error reaching image host");
      }
    }

    return NextResponse.json({ ok: true, urls, errors });
  } catch {
    return NextResponse.json({ ok: false, urls: [], errors: ["bad request"] }, { status: 400 });
  }
}
