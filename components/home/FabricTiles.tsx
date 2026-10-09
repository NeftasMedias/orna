import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { getFacets, getProducts, shopHref } from "@/lib/catalog";
import { toSlug } from "@/lib/format";
import { swatchFor } from "@/lib/swatch";
import { ProductImage } from "@/components/ProductImage";

/** Large photo tiles, one per fabric that has products. The first tile is the tall one. */
export function FabricTiles() {
  const products = getProducts();
  const fabrics = getFacets().fabrics.slice(0, 4);
  if (fabrics.length === 0) return null;
  const rows = Math.max(fabrics.length - 1, 1);

  return (
    <section aria-labelledby="by-fabric" className="reveal mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h2 id="by-fabric" className="font-serif text-4xl font-medium text-navy lg:text-5xl">
        Shop by fabric
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        {fabrics.map((fabric, index) => {
          const cover = products.find((p) => toSlug(p.fabric) === fabric.value);
          const isLead = index === 0;
          return (
            <li
              key={fabric.value}
              className={isLead ? "col-span-2 lg:col-span-7 lg:row-span-(--rows)" : "col-span-1 lg:col-span-5"}
              style={isLead ? ({ "--rows": rows } as React.CSSProperties) : undefined}
            >
              <Link href={shopHref({}, { fabric: fabric.value })} className="group flex h-full flex-col">
                <div
                  className={
                    isLead
                      ? "relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[420px] lg:flex-1"
                      : "relative aspect-[4/5] overflow-hidden bg-surface lg:aspect-[16/9]"
                  }
                >
                  <ProductImage
                    src={cover?.images[0]}
                    alt={`${fabric.label} sarees`}
                    tint={swatchFor(cover?.colours[0])}
                    sizes={isLead ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 50vw"}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div
                  className={
                    isLead
                      ? "mt-3 flex items-baseline justify-between gap-3"
                      : "mt-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
                  }
                >
                  <h3 className={isLead ? "font-serif text-3xl font-medium text-navy" : "font-serif text-2xl font-medium text-navy"}>
                    {fabric.label}
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted group-hover:text-indigo">
                    {fabric.count} {fabric.count === 1 ? "saree" : "sarees"}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
