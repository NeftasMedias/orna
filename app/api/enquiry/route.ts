// Receives the enquiry form and forwards it to site.webhookUrl (e.g. an n8n Webhook node).
// The webhook address stays on the server and is never sent to the browser.
import { z } from "zod";
import { site } from "@/config/site";
import { isPlaceholder } from "@/lib/site";

const Enquiry = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^(?:\+?91|0)?[6-9]\d{9}$/, "Please enter a 10-digit mobile number")),
  product: z.string().trim().min(1).max(120),
  productSlug: z.string().trim().max(80),
  size: z.string().trim().max(40),
  colour: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000).optional(),
  pageUrl: z.string().max(300).optional(),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = Enquiry.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please check your name and phone number." }, { status: 400 });
  }

  const { website, ...enquiry } = parsed.data;
  // Bots fill the hidden "website" field. Pretend it worked and drop it.
  if (website) return Response.json({ ok: true });

  if (isPlaceholder(site.webhookUrl)) {
    return Response.json({ ok: false, error: "The enquiry form is not connected yet." }, { status: 503 });
  }

  try {
    const response = await fetch(site.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...enquiry, source: "orna-website", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook answered ${response.status}`);
  } catch (error) {
    console.error("Enquiry webhook failed:", error);
    return Response.json({ ok: false, error: "Please try again in a moment." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
