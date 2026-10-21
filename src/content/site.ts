/**
 * Site-wide facts. Every value here is either taken from this repository or from a
 * public source noted beside it. Values set to `null` are deliberately unpublished
 * until the organising team supplies them — components hide whatever is `null`.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://purple-movement.com";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteUrl : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Open Graph fields every page shares; pages spread this and override title/description/url/images. */
export const ogDefaults = {
  type: "website" as const,
  locale: "en_IN",
  siteName: "The Purple Movement",
  images: [{ url: "/image.webp", width: 1784, height: 882, alt: "The Purple Movement" }],
};

export const site = {
  name: "The Purple Movement",
  shortName: "Purple Movement",
  /** The movement's own three pillars, used across purple-movement.com and capabilitycommons.com. */
  pillars: ["Beyond Borders", "Beyond Gatekeepers", "Beyond Syllabus"] as const,
  /** Original meta description from purple-movement.com. */
  description:
    "The Purple Movement is a global force of purposeful people, changemakers, and visionaries coming together to create a borderless future full of impact and possibility.",
  social: [
    { name: "Instagram", handle: "@tpm.live", href: "https://www.instagram.com/tpm.live/" },
    { name: "LinkedIn", handle: "The Purple Movement", href: "https://www.linkedin.com/company/the-purple-movement/" },
    { name: "X", handle: "@ThePurpleMVMT", href: "https://x.com/ThePurpleMVMT" },
  ],
  /** WhatsApp community link shown after joining (from the existing join flow). */
  whatsappCommunity: "https://chat.whatsapp.com/JfnuaMproG51BoNJZ21LNB",
  /** Public contact inbox. Not published anywhere yet — set this once the team confirms one. */
  contactEmail: null as string | null,
  /** Published response-time commitment for join submissions. Unset until the team commits to one. */
  joinResponseTime: null as string | null,
} as const;

export type SocialLink = (typeof site.social)[number];

/** Primary navigation. Anchors point at homepage sections. */
export const primaryNav = [
  { label: "Manifesto", href: "/manifesto" },
  { label: "About", href: "/#about" },
  { label: "Activities", href: "/#activities" },
  { label: "Impact", href: "/#impact" },
  { label: "Legacy", href: "/#legacy" },
  { label: "Join", href: "/#join" },
] as const;

/** Connected external initiatives, with their own sites. */
export const riseTogether = {
  name: "Rise Together 2026",
  url: "https://risetogether2026.com/",
  registerUrl: "https://risetogether2026.com/gathering#register",
  collaborateUrl: "https://risetogether2026.com/build-together",
  /** Source: risetogether2026.com (src/lib/site.ts, src/content/themes.ts in that repository). */
  dateLabel: "18 November 2026",
  date: "2026-11-18",
  venue: "Park Centre, Technopark Phase 1",
  city: "Thiruvananthapuram, Kerala",
  theme: "From conversations to collective action with purpose",
} as const;

export const fayaArchive = {
  url: "https://www.fayaport80.com/",
  beyondUrl: "https://www.fayaport80.com/beyond",
} as const;
