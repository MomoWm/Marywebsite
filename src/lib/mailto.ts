import { site } from "@/lib/site";

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Message",
  projectType: "Type of piece",
  room: "Where it will live",
  dimensions: "Size",
  colors: "Preferred colors",
  budget: "Budget",
  timeline: "Timeline",
  reference: "Referring piece",
  attachments: "Photos noted",
};

function label(k: string) {
  return (
    LABELS[k] ??
    k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())
  );
}

/**
 * Build a `mailto:` link to Mary, prefilled from a lead payload. Used as a
 * zero-config fallback so a submission always has a way to reach her, even
 * before an email service (Resend) is connected.
 */
export function leadMailto(subject: string, data: Record<string, unknown>) {
  const body = Object.entries(data)
    .filter(
      ([k, v]) =>
        k !== "company" &&
        v !== undefined &&
        v !== "" &&
        !(Array.isArray(v) && v.length === 0),
    )
    .map(([k, v]) => `${label(k)}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
