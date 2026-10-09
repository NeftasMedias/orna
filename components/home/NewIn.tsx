import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { getHomeProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export function NewIn() {
  const products = getHomeProducts(8);
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="new-in" className="reveal py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <h2 id="new-in" className="font-serif text-4xl font-medium text-navy lg:text-5xl">
          New in
        </h2>
        <Link href="/shop?new=1" className="link-arrow shrink-0">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      {/* Phones: swipeable row. Laptops: 4-column grid. */}
      <ul className="no-scrollbar relative mt-8 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 sm:scroll-pl-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12 lg:overflow-visible lg:px-8">
        {products.map((product) => (
          <li key={product.slug} className="w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
            <ProductCard product={product} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 40vw, 68vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
