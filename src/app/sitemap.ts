import type { MetadataRoute } from "next";

import { siteUrl, staticRoutes } from "@/data/navigation";
import { treatments } from "@/data/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route === "/" ? "" : route}`,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
    ...treatments.map((t) => ({
      url: `${siteUrl}/tratamentos/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: t.featured ? 0.6 : 0.5,
    })),
  ];
}
