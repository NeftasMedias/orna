import { site } from "@/config/site";

/** True for values that are still placeholders, e.g. "[WHATSAPP_NUMBER]" or "[OWNER TO CONFIRM]". */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /^\[[^\]]+\]$/.test(value.trim());
}

/** Absolute base URL for metadata, share images and the sitemap. */
export function siteUrl(): URL {
  if (!isPlaceholder(site.url)) return new URL(site.url);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(vercel ? `https://${vercel}` : "http://localhost:3000");
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl()).toString();
}

