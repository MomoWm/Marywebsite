import data from "./site-copy.json";

/**
 * Brand copy. The text now lives in site-copy.json so it can be edited from
 * the Pages CMS dashboard with no code — this file just re-exports it.
 */
type SectionIntro = { eyebrow: string; title: string; subhead: string };

export const sectionIntros = data.sectionIntros as Record<string, SectionIntro>;
export const copy = data.copy;
