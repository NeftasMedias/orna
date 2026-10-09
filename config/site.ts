import "server-only";

// Every business setting for the Oṛna website lives in this file.
// Replace each value in [SQUARE_BRACKETS] before launch. Run `npm run todo` to list what is left.
// Server-only: this file holds the webhook address, so it must never be imported by a "use client" component.

export const site = {
  name: "Oṛna",
  tagline: "Comfort, draped beautifully.",
  description:
    "Lightweight sarees in Maheshwari silk and soft cottons, made for slow mornings and busy days. Order on WhatsApp or Instagram.",
  foundedYear: 2026,

  // Full web address once the site is live, e.g. "https://orna.in".
  // Used for share previews and the sitemap. Until it is set, the Vercel address is used.
  url: "[SITE_URL]",

  // WhatsApp number with country code, digits only, e.g. "919876543210".
  whatsappNumber: "[WHATSAPP_NUMBER]",

  // Taken from the brand's Instagram profile.
  instagramUrl: "https://www.instagram.com/the_orna_official/",

  email: "[EMAIL]",

  // The enquiry form sends each submission here as JSON (e.g. an n8n Webhook node URL).
  webhookUrl: "[WEBHOOK_URL]",

  // Thin bar at the very top of every page. Set to "" to hide it.
  announcementText: "[ANNOUNCEMENT_TEXT]",

  // Shows [OWNER TO CONFIRM] / [ADD REAL PHOTO] markers on the site.
  // Set to false to preview the design without them. Never launch with placeholder content.
  showPlaceholderMarkers: true,

  // Price filters for the menu and the Shop page, in whole rupees.
  priceBands: [
    { slug: "under-1500", label: "Under ₹1,500", max: 1500 },
    { slug: "under-2500", label: "Under ₹2,500", max: 2500 },
    { slug: "under-4000", label: "Under ₹4,000", max: 4000 },
  ],

  // Large photo at the top of the home page, e.g. "/photos/hero.jpg" (put the file in /public/photos).
  heroImage: "",
  heroImageAlt: "A saree from the Oṛna collection draped on a wooden stand",
};

export type PriceBand = (typeof site.priceBands)[number];
