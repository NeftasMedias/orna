import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/shop", "/lookbook", "/size-guide", "/help"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...getProducts().map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
