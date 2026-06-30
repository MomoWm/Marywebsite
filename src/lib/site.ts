/**
 * Central brand + site configuration for Sea Attitudes by Mary Lee.
 * Contact details are sourced from Mary's own materials (business card &
 * social profile). Social handles should be confirmed/updated as needed.
 */

export const site = {
  name: "Sea Attitudes",
  fullName: "Sea Attitudes by Mary Lee",
  legalName: "Sea Attitudes LLC",
  founder: "Mary Lee",
  role: "Coastal Artist",
  tagline: "Handcrafted Art Inspired by the Sea",
  description:
    "One-of-a-kind coastal artwork handcrafted in Englewood, Florida from genuine sea glass, shells, driftwood and resin. Sea glass mirrors, shadow boxes, and custom commissions.",
  url: "https://www.seaattitudes.com",
  email: "seaattitudesbymarylee@gmail.com",
  phone: "203-704-1230",
  phoneHref: "tel:+12037041230",
  location: {
    city: "Englewood",
    region: "FL",
    regionName: "Florida",
    postalCode: "34224",
    country: "US",
    area: "Florida's Gulf Coast",
    latitude: 26.962,
    longitude: -82.353,
  },
  hours: [
    "By appointment & online, year-round",
    "Custom consultations: Mon–Sat",
  ],
  social: {
    facebook: "https://www.facebook.com/seaattitudesbymarylee",
    instagram: "https://www.instagram.com/seaattitudesbymarylee",
    pinterest: "https://www.pinterest.com/seaattitudesbymarylee",
  },
} as const;

export const sameAs = [
  site.social.facebook,
  site.social.instagram,
  site.social.pinterest,
];

/**
 * Primary navigation (header) — deliberately short. Shop, Collections and
 * Gallery were three doors into the same work; the catalog now lives under
 * "The Collection", with Gallery still reachable from the footer.
 */
export const mainNav = [
  { label: "The Collection", href: "/shop" },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "About Mary", href: "/about" },
  { label: "Journal", href: "/blog" },
] as const;

/** Footer link groups. */
export const footerNav = {
  Explore: [
    { label: "Shop All", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Gallery", href: "/gallery" },
    { label: "The Journal", href: "/blog" },
  ],
  Studio: [
    { label: "About Mary", href: "/about" },
    { label: "Custom Orders", href: "/custom-orders" },
    { label: "The Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  Help: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/faq#shipping" },
    { label: "Care Guide", href: "/faq#materials-craft" },
    { label: "Request a Commission", href: "/custom-orders" },
  ],
} as const;
