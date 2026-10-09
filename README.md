# Oṛna website

Showcase site for Oṛna sarees. Customers browse, then order on WhatsApp, Instagram or through the enquiry form.
Built with Next.js 16, Tailwind CSS 4 and TypeScript. Hosted on Vercel.

## Run it on your computer

```bash
npm install
npm run dev        # http://localhost:3000
```

After editing `config/site.ts` while `npm run dev` is running, stop it (Ctrl+C) and start it again so every page picks up the change.

## Where to change things

| What | File |
| --- | --- |
| WhatsApp number, Instagram, email, webhook, announcement bar, price filters, home photo | `config/site.ts` |
| Products | `data/products.json` |
| Lookbook and "Look of the week" | `data/lookbook.json` |
| Photos | `public/products/<slug>/01.jpg`, `02.jpg` ... and `public/photos/` |

### Adding or editing a product

Each product in `data/products.json` looks like this:

```json
{
  "id": "orna-027",
  "name": "The Saffron Line",
  "slug": "saffron-line",
  "category": "Sarees",
  "occasion": ["Everyday", "Workwear"],
  "fabric": "Cotton",
  "price": 1699,
  "originalPrice": 1999,
  "sizes": ["Free size"],
  "colours": ["Saffron & White"],
  "images": ["/products/saffron-line/01.jpg", "/products/saffron-line/02.jpg"],
  "description": "Two or three sentences about the saree.",
  "careInstructions": "Gentle hand wash in cold water. Dry in shade.",
  "blouse": "Contrast printed fabric",
  "featured": false,
  "isNew": true
}
```

- **slug**: lowercase letters, numbers and dashes. It becomes the web address: `/products/saffron-line`.
- **price** and **originalPrice** are whole rupees. Leave `originalPrice` out if the saree is not on sale. When it is there, the card shows the sale price with the original price struck through.
- **occasion** can be `Everyday`, `Workwear`, `Festive`, `Celebrations` (or new ones you add).
- **fabric** and **occasion** values automatically appear in the menu and Shop filters.
- **images**: put the files in `public/products/<slug>/` and list them in order. The first photo is used on cards and in WhatsApp/Instagram link previews. Portrait photos (4:5, e.g. 1080 x 1350) look best.
- **featured: true** pins a saree to the home page. **isNew: true** adds the "New" label and puts it in "New in".
- **blouse** is optional.
- **todo** lists what is still a placeholder for that product. Remove an entry once it is real.

If something in the file is wrong (a missing comma, a price that is not a number), `npm run build` stops and tells you which product and which field to fix.

### Placeholders

Anything not yet confirmed is marked on the site with `[OWNER TO CONFIRM]`, `[ADD REAL PHOTO]` and similar labels.

```bash
npm run todo       # lists every placeholder left
```

To preview the design without the labels, set `showPlaceholderMarkers: false` in `config/site.ts`. Before launch, every item in `npm run todo` should be resolved, then set it to `false`.

## Enquiry form and n8n

The form sends a `POST` with JSON to `webhookUrl` in `config/site.ts` (the address stays on the server; customers never see it):

```json
{
  "name": "Customer name",
  "phone": "9876543210",
  "product": "The Indigo Reverie",
  "productSlug": "indigo-reverie",
  "size": "Free size",
  "colour": "Teal Blue & Indigo",
  "message": "Optional message",
  "pageUrl": "https://your-site/products/indigo-reverie",
  "source": "orna-website",
  "submittedAt": "2026-10-09T18:23:52.195Z"
}
```

In n8n, add a **Webhook** node (method POST), copy its **Production URL** into `webhookUrl`, and activate the workflow. Bots are filtered by a hidden field before anything is sent.

## Deploy on Vercel

1. Put the project on GitHub: create an empty repository, then in this folder run
   `git init`, `git add .`, `git commit -m "Oṛna website"`, `git branch -M main`,
   `git remote add origin <your repo URL>` and `git push -u origin main`.
2. On vercel.com choose **Add New > Project**, import the repository and click **Deploy**. Vercel detects Next.js; no environment variables are needed.
3. When it is live, copy the address (or your own domain) into `url` in `config/site.ts`, commit and push. Vercel redeploys automatically on every push.
4. Own domain: **Project > Settings > Domains**, add it, then create the DNS records Vercel shows you at your domain registrar.
5. Vercel's free Hobby plan is for non-commercial use only. A shop should use the Pro plan.

## Later: online payments

Only `lib/catalog.ts` reads the product data, prices are stored as whole rupees, and the order options live in `components/product/OrderPanel.tsx`. Adding payments (for example Razorpay) means adding a "Buy now" option there plus a checkout route in `app/api/`; product data and pages stay as they are.
