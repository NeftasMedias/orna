// The only module that reads data/products.json and data/lookbook.json.
// To move products to a CMS or a payment platform later, change this file and nothing else.
import { z } from "zod";
import productsJson from "@/data/products.json";
import lookbookJson from "@/data/lookbook.json";
import { site, type PriceBand } from "@/config/site";
import { isPlaceholder } from "@/lib/site";
import { toSlug } from "@/lib/format";

const rupees = z.number().int("must be a whole number of rupees").positive("must be more than 0");

const ProductSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "use lowercase letters, numbers and dashes only"),
    category: z.string().min(1),
    occasion: z.array(z.string().min(1)),
    fabric: z.string().min(1),
    price: rupees,
    originalPrice: rupees.optional(),
    sizes: z.array(z.string().min(1)).min(1, "add at least one size, e.g. \"Free size\""),
    colours: z.array(z.string().min(1)).min(1, "add at least one colour"),
    images: z.array(z.string().startsWith("/", "image paths start with /, e.g. /products/slug/01.jpg")),
    description: z.string().min(1),
    careInstructions: z.string().min(1),
    blouse: z.string().optional(),
    featured: z.boolean(),
    isNew: z.boolean(),
    instagram: z.url().optional(),
    todo: z.array(z.string()).optional(),
  })
  .refine((p) => p.originalPrice === undefined || p.originalPrice > p.price, {
    message: "originalPrice must be higher than price (it is the price before the discount)",
    path: ["originalPrice"],
  });

const LookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  caption: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  productSlugs: z.array(z.string()),
  lookOfTheWeek: z.boolean(),
  todo: z.array(z.string()).optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Look = z.infer<typeof LookSchema>;

function loadProducts(): Product[] {
  const result = z.array(ProductSchema).safeParse(productsJson);
  if (!result.success) {
    const lines = result.error.issues.map((issue) => {
      const [index, ...field] = issue.path;
      const raw = typeof index === "number" ? (productsJson as Array<{ slug?: string }>)[index] : undefined;
      const which = typeof index === "number" ? `product #${index + 1} (${raw?.slug ?? "no slug"})` : "file";
      return `  - ${which}, ${field.join(".") || "entry"}: ${issue.message}`;
    });
    throw new Error(`data/products.json has problems:\n${lines.join("\n")}`);
  }
  const seen = new Set<string>();
  for (const p of result.data) {
    if (seen.has(p.slug)) throw new Error(`data/products.json: the slug "${p.slug}" is used twice`);
    seen.add(p.slug);
  }
  return result.data;
}

function loadLooks(products: Product[]): Look[] {
  const result = z.array(LookSchema).safeParse(lookbookJson);
  if (!result.success) {
    throw new Error(`data/lookbook.json has problems:\n${z.prettifyError(result.error)}`);
  }
  const slugs = new Set(products.map((p) => p.slug));
  for (const look of result.data) {
    for (const slug of look.productSlugs) {
      if (!slugs.has(slug)) throw new Error(`data/lookbook.json: "${look.title}" links to unknown product "${slug}"`);
    }
  }
  return result.data;
}

const products = loadProducts();
const looks = loadLooks(products);

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p));
}

/** Featured products first, then new ones, newest first in file order. */
export function getHomeProducts(limit = 8): Product[] {
  const picked = [...products.filter((p) => p.featured), ...products.filter((p) => p.isNew && !p.featured)];
  return picked.slice(0, limit);
}

export function getLooks(): Look[] {
  return looks;
}

export function getLookOfTheWeek(): Look | undefined {
  return looks.find((l) => l.lookOfTheWeek) ?? looks[0];
}

export function hasTodo(item: { todo?: string[] }, key: string): boolean {
  return Boolean(item.todo?.includes(key));
}

// ---------- Facets and filtering ----------

export type FacetOption = { value: string; label: string; count: number };

const occasionOrder = ["Everyday", "Workwear", "Festive", "Celebrations"];

function countBy(values: string[], order?: string[]): FacetOption[] {
  const counts = new Map<string, number>();
  for (const v of values) {
    if (isPlaceholder(v)) continue;
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  const options = [...counts.entries()].map(([label, count]) => ({ value: toSlug(label), label, count }));
  if (order) {
    const rank = (label: string) => (order.indexOf(label) === -1 ? order.length : order.indexOf(label));
    options.sort((a, b) => rank(a.label) - rank(b.label));
  } else {
    options.sort((a, b) => b.count - a.count);
  }
  return options;
}

export type Facets = {
  categories: FacetOption[];
  fabrics: FacetOption[];
  occasions: FacetOption[];
  prices: (FacetOption & { band: PriceBand })[];
};

export function getFacets(list: Product[] = products): Facets {
  return {
    categories: countBy(list.map((p) => p.category)),
    fabrics: countBy(list.map((p) => p.fabric)),
    occasions: countBy(list.flatMap((p) => p.occasion), occasionOrder),
    prices: site.priceBands
      .map((band) => ({
        value: band.slug,
        label: band.label,
        count: list.filter((p) => p.price < band.max).length,
        band,
      }))
      .filter((option) => option.count > 0),
  };
}

export type Filters = {
  category?: string;
  fabric?: string;
  occasion?: string;
  price?: string;
  new?: boolean;
};

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseFilters(params: SearchParams): Filters {
  return {
    category: first(params.category) || undefined,
    fabric: first(params.fabric) || undefined,
    occasion: first(params.occasion) || undefined,
    price: first(params.price) || undefined,
    new: first(params.new) === "1" || undefined,
  };
}

export function filterProducts(list: Product[], filters: Filters): Product[] {
  const band = site.priceBands.find((b) => b.slug === filters.price);
  return list.filter((p) => {
    if (filters.category && toSlug(p.category) !== filters.category) return false;
    if (filters.fabric && toSlug(p.fabric) !== filters.fabric) return false;
    if (filters.occasion && !p.occasion.some((o) => toSlug(o) === filters.occasion)) return false;
    if (band && !(p.price < band.max)) return false;
    if (filters.new && !p.isNew) return false;
    return true;
  });
}

/** Build a /shop URL from filters. Pass `null` to remove a key. */
export function shopHref(filters: Filters, change: Partial<Record<keyof Filters, string | boolean | null>> = {}): string {
  const next: Record<string, string> = {};
  const merged = { ...filters, ...change };
  for (const key of ["category", "fabric", "occasion", "price", "new"] as const) {
    const value = merged[key];
    if (value === null || value === undefined || value === false || value === "") continue;
    next[key] = value === true ? "1" : String(value);
  }
  const query = new URLSearchParams(next).toString();
  return query ? `/shop?${query}` : "/shop";
}

// ---------- Navigation ----------

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };

export function getNavGroups(): NavGroup[] {
  const facets = getFacets();
  const categoryLinks: NavLink[] =
    facets.categories.length > 1
      ? facets.categories.map((c) => ({ label: c.label, href: shopHref({}, { category: c.value }) }))
      : [{ label: `All ${facets.categories[0]?.label.toLowerCase() ?? "products"}`, href: "/shop" }];
  return [
    { title: "Category", links: [...categoryLinks, { label: "New in", href: shopHref({}, { new: true }) }] },
    { title: "Fabric", links: facets.fabrics.map((f) => ({ label: f.label, href: shopHref({}, { fabric: f.value }) })) },
    { title: "Occasion", links: facets.occasions.map((o) => ({ label: o.label, href: shopHref({}, { occasion: o.value }) })) },
    { title: "Price", links: facets.prices.map((p) => ({ label: p.label, href: shopHref({}, { price: p.value }) })) },
  ].filter((group) => group.links.length > 0);
}
