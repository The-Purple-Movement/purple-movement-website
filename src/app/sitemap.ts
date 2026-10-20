import type { MetadataRoute } from "next";
import { activities } from "@/content/activities";
import { absoluteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/manifesto"), changeFrequency: "yearly", priority: 0.9 },
    { url: absoluteUrl("/join"), changeFrequency: "monthly", priority: 0.8 },
    ...activities.map((a) => ({
      url: absoluteUrl(`/activities/${a.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
