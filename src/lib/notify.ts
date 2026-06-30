import { site } from "@/lib/site";

/**
 * Lead delivery. Tries, in order:
 *   1. Resend email   (set RESEND_API_KEY, optional LEAD_TO / LEAD_FROM)
 *   2. Generic webhook (set LEAD_WEBHOOK_URL — e.g. Zapier, Make, a CRM)
 *   3. Server log      (always — so nothing is ever silently lost in dev)
 *
 * Every path returns success to the visitor so the experience never breaks;
 * configure one of the above before launch to actually receive the leads.
 */
export async function deliverLead(
  kind: "Newsletter" | "Contact" | "Custom Commission",
  data: Record<string, unknown>,
): Promise<{ delivered: boolean; channel: string }> {
  const subject = `New ${kind} — ${site.name}`;
  const summary = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

  // 1. Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM || `Sea Attitudes <onboarding@resend.dev>`,
          to: [process.env.LEAD_TO || site.email],
          reply_to: typeof data.email === "string" ? data.email : undefined,
          subject,
          text: summary,
        }),
      });
      if (res.ok) return { delivered: true, channel: "email" };
    } catch {
      /* fall through */
    }
  }

  // 2. Webhook
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, subject, ...data }),
      });
      if (res.ok) return { delivered: true, channel: "webhook" };
    } catch {
      /* fall through */
    }
  }

  // 3. Log
  console.info(`[lead:${kind}]\n${summary}`);
  return { delivered: false, channel: "log" };
}
