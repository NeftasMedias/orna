// Ordering channels. Online payments will be added later as another channel
// (e.g. a "Buy now" button plus an /api/checkout route); the product data stays the same.
import { site } from "@/config/site";
import { isPlaceholder } from "@/lib/site";

export function whatsappReady(): boolean {
  return !isPlaceholder(site.whatsappNumber);
}

export function whatsappHref(message?: string): string {
  const number = site.whatsappNumber.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export function orderMessage(details: { name: string; size: string; colour: string; url: string }): string {
  return [
    `Hi ${site.name}, I'd like to order this saree:`,
    "",
    details.name,
    `Size: ${details.size}`,
    `Colour: ${details.colour}`,
    details.url,
  ].join("\n");
}

/** Opens a direct message thread when the Instagram username can be read from the profile URL. */
export function instagramMessageHref(): string {
  const match = site.instagramUrl.match(/instagram\.com\/([A-Za-z0-9._]+)/);
  return match ? `https://ig.me/m/${match[1]}` : site.instagramUrl;
}

export function instagramHandle(): string {
  const match = site.instagramUrl.match(/instagram\.com\/([A-Za-z0-9._]+)/);
  return match ? `@${match[1]}` : "Instagram";
}
