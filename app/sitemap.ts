import type { MetadataRoute } from "next";
import { articles } from "../content/article-data";
import { siteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    ...articles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: article.featured ? 0.9 : 0.7,
    })),
  ];
}
