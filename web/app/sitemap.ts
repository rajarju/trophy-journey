import { MetadataRoute } from "next";
import { getGameSlugs } from "@/lib/games";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getGameSlugs();

  const gameUrls = slugs.map((slug) => ({
    url: `${siteConfig.url}/games/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/games`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...gameUrls,
  ];
}
