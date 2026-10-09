import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { isPlaceholder } from "@/lib/site";
import { swatchFor } from "@/lib/swatch";
import { ProductImage } from "@/components/ProductImage";
import { Price } from "@/components/Price";
import { TodoSummary } from "@/components/Todo";

export function ProductCard({ product, sizes, headingLevel = 3 }: { product: Product; sizes: string; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const tint = swatchFor(product.colours[0]);
  const [first, second] = product.images;
  return (
    <Link href={`/products/${product.slug}`} className="group relative block">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <ProductImage
          src={first}
          alt={`${product.name}, ${product.colours[0]}`}
          tint={tint}
          sizes={sizes}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {second && (
          <ProductImage
            src={second}
            alt=""
            tint={tint}
            sizes={sizes}
            className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-3 space-y-0.5">
        {product.isNew && <p className="text-xs font-medium tracking-wide text-indigo">New</p>}
        <Heading className="text-[15px] font-medium leading-snug text-navy group-hover:text-indigo">{product.name}</Heading>
        {!isPlaceholder(product.fabric) && <p className="text-sm text-muted">{product.fabric}</p>}
        <Price price={product.price} originalPrice={product.originalPrice} />
        <TodoSummary todo={product.todo} keys={["name", "price"]} />
      </div>
    </Link>
  );
}
