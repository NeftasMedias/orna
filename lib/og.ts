// Shared pieces for the generated share images (Open Graph).
// Loaders are cached so the images are prerendered at build time instead of on each request.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { shellSvg } from "@/lib/shell";

export const ogSize = { width: 1200, height: 630 };

async function loadFontsBase64() {
  "use cache";
  cacheLife("max");
  const dir = join(process.cwd(), "assets", "fonts");
  const [serifItalic, serif, sans] = await Promise.all([
    readFile(join(dir, "CormorantGaramond-MediumItalic.ttf")),
    readFile(join(dir, "CormorantGaramond-Medium.ttf")),
    readFile(join(dir, "Mukta-Medium.ttf")),
  ]);
  return { serifItalic: serifItalic.toString("base64"), serif: serif.toString("base64"), sans: sans.toString("base64") };
}

export async function ogFonts() {
  const fonts = await loadFontsBase64();
  return [
    { name: "Cormorant", data: Buffer.from(fonts.serifItalic, "base64"), style: "italic" as const, weight: 500 as const },
    { name: "Cormorant", data: Buffer.from(fonts.serif, "base64"), style: "normal" as const, weight: 500 as const },
    { name: "Mukta", data: Buffer.from(fonts.sans, "base64"), style: "normal" as const, weight: 500 as const },
  ];
}

/** The shell mark as a data URI in the given colour. */
export function shellDataUri(colour = "#1E2A4F"): string {
  return `data:image/svg+xml;base64,${Buffer.from(shellSvg(colour)).toString("base64")}`;
}

/** A product photo from /public as a data URI, or null when there is no photo yet. */
export async function publicImageDataUri(path: string | undefined): Promise<string | null> {
  "use cache";
  cacheLife("max");
  if (!path) return null;
  try {
    const file = await readFile(join(process.cwd(), "public", path));
    const type = path.endsWith(".png") ? "image/png" : path.endsWith(".webp") ? "image/webp" : "image/jpeg";
    return `data:${type};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}
