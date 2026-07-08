import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { deliverLead } from "@/lib/notify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    // Honeypot: silently accept bots without delivering.
    if (parsed.data.company) return NextResponse.json({ ok: true, delivered: true });

    const { company: _company, ...lead } = parsed.data;
    const result = await deliverLead("Contact", lead);
    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
