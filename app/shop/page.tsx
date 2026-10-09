import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Faders, X } from "@phosphor-icons/react/ssr";
import { type Facets, type Filters, filterProducts, getFacets, getProducts, parseFilters, shopHref } from "@/lib/catalog";
import { site } from "@/config/site";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop sarees",
  description: `Browse ${site.name} sarees by fabric, occasion and price. Maheshwari silk, cotton and mul cotton sarees, ordered on WhatsApp or Instagram.`,
  alternates: { canonical: "/shop" },
};

export default function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <Suspense fallback={<ShopSkeleton />}>
        <ShopResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShopResults({ searchParams }: { searchParams: PageProps<"/shop">["searchParams"] }) {
  const filters = parseFilters(await searchParams);
  const all = getProducts();
  const facets = getFacets(all);
  const results = filterProducts(all, filters);
  // Each group's counts respect the other active filters, e.g. "Under ₹2,500 (3)" within Maheshwari Silk.
  const without = (key: keyof Filters) => getFacets(filterProducts(all, { ...filters, [key]: undefined }));
  const counts: Facets = {
    categories: without("category").categories,
    fabrics: without("fabric").fabrics,
    occasions: without("occasion").occasions,
    prices: without("price").prices,
  };
  const chips = activeChips(filters, facets);

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h1 className="font-serif text-4xl font-medium text-navy sm:text-5xl">{pageTitle(filters, facets)}</h1>
        <p className="text-sm text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? "saree" : "sarees"}
        </p>
      </header>

      {/* Phones: filters fold into a panel above the grid. */}
      <details className="group mt-6 border-y border-line lg:hidden">
        <summary className="flex items-center justify-between py-3 text-[15px] font-medium text-navy">
          <span className="inline-flex items-center gap-2">
            <Faders size={18} /> Filters{chips.length > 0 ? ` (${chips.length})` : ""}
          </span>
          <span className="text-sm text-muted group-open:hidden">Show</span>
          <span className="hidden text-sm text-muted group-open:inline">Hide</span>
        </summary>
        <div className="pb-6 pt-2">
          <FilterPanel facets={counts} filters={filters} />
        </div>
      </details>

      {chips.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center gap-2 lg:mt-6">
          {chips.map((chip) => (
            <li key={chip.key}>
              <Link
                href={chip.removeHref}
                scroll={false}
                className="inline-flex items-center gap-1.5 rounded-control border border-line bg-surface px-3 py-1.5 text-sm text-navy hover:border-indigo"
              >
                {chip.label}
                <X size={12} weight="bold" aria-hidden="true" />
                <span className="sr-only">Remove filter</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/shop" scroll={false} className="px-2 text-sm text-muted underline underline-offset-4 hover:text-indigo">
              Clear all
            </Link>
          </li>
        </ul>
      )}

      <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-12">
        <aside aria-label="Filters" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <FilterPanel facets={counts} filters={filters} />
          </div>
        </aside>

        <div className="lg:col-span-9">
          {results.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6">
              {results.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} headingLevel={2} sizes="(min-width: 1024px) 23vw, (min-width: 768px) 31vw, 46vw" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-line px-6 py-16 text-center">
              <p className="font-serif text-3xl text-navy">No sarees match these filters</p>
              <p className="mx-auto mt-3 max-w-[40ch] text-muted">
                Try removing a filter, or message us and we will help you find the right saree.
              </p>
              <Link href="/shop" className="btn-secondary mt-6">
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function pageTitle(filters: Filters, facets: Facets): string {
  const fabric = facets.fabrics.find((f) => f.value === filters.fabric)?.label;
  const occasion = facets.occasions.find((o) => o.value === filters.occasion)?.label;
  const price = facets.prices.find((p) => p.value === filters.price)?.label;
  const active = [filters.new, fabric, occasion, price, filters.category].filter(Boolean).length;
  if (active !== 1) return active === 0 ? "All sarees" : "Sarees";
  if (filters.new) return "New in";
  if (fabric) return `${fabric} sarees`;
  if (occasion) return `${occasion} sarees`;
  if (price) return `Sarees ${price.toLowerCase()}`;
  return "Sarees";
}

function activeChips(filters: Filters, facets: Facets) {
  const chips: Array<{ key: string; label: string; removeHref: string }> = [];
  const add = (key: keyof Filters, label: string | undefined) => {
    if (label) chips.push({ key, label, removeHref: shopHref(filters, { [key]: null }) });
  };
  if (filters.new) add("new", "New in");
  add("category", facets.categories.find((c) => c.value === filters.category)?.label);
  add("fabric", facets.fabrics.find((f) => f.value === filters.fabric)?.label);
  add("occasion", facets.occasions.find((o) => o.value === filters.occasion)?.label);
  add("price", facets.prices.find((p) => p.value === filters.price)?.label);
  return chips;
}

function ShopSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-12 w-64 bg-surface" />
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="hidden space-y-3 lg:col-span-3 lg:block">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-5 w-40 bg-surface" />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:col-span-9 lg:gap-x-6">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <div className="aspect-[4/5] bg-surface" />
              <div className="mt-3 h-4 w-3/4 bg-surface" />
              <div className="mt-2 h-4 w-1/3 bg-surface" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
