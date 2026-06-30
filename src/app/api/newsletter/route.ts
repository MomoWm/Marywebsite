import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators";
import { deliverLead } from "@/lib/notify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    await deliverLead("Newsletter", parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
