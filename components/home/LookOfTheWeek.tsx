import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { getLookOfTheWeek, getProductsBySlugs } from "@/lib/catalog";
import { swatchFor } from "@/lib/swatch";
import { isPlaceholder } from "@/lib/site";
import { ProductImage } from "@/components/ProductImage";
import { Price } from "@/components/Price";

export function LookOfTheWeek() {
  const look = getLookOfTheWeek();
  if (!look) return null;
  const products = getProductsBySlugs(look.productSlugs).slice(0, 4);
  const tint = swatchFor(products[0]?.colours[0]);

  return (
    <section aria-labelledby="look-of-the-week" className="reveal mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo">Look of the week</p>
      <div className="relative mt-4 aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]">
        <ProductImage src={look.image || undefined} alt={look.imageAlt} tint={tint} sizes="(min-width: 1280px) 1216px, 100vw" />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="look-of-the-week" className="font-serif text-4xl font-medium text-navy lg:text-5xl">
            {look.title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">{look.caption}</p>
          <Link href="/lookbook" className="link-arrow mt-6">
            See the lookbook <ArrowRight size={16} />
          </Link>
        </div>
        <ul className="divide-y divide-line border-y border-line lg:col-span-6 lg:col-start-7">
          {products.map((product) => (
            <li key={product.slug}>
              <Link href={`/products/${product.slug}`} className="group flex items-center gap-4 py-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-surface">
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    tint={swatchFor(product.colours[0])}
                    sizes="64px"
                    className="[&_.todo-marker]:hidden"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-navy group-hover:text-indigo">{product.name}</p>
                  {!isPlaceholder(product.fabric) && <p className="text-sm text-muted">{product.fabric}</p>}
                </div>
                <Price price={product.price} originalPrice={product.originalPrice} className="shrink-0" />
                <ArrowRight size={18} className="shrink-0 text-muted group-hover:text-indigo" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
