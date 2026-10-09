import Link from "next/link";
import { site } from "@/config/site";
import { swatchFor } from "@/lib/swatch";
import { ProductImage } from "@/components/ProductImage";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6 lg:px-8 lg:pb-12 lg:pt-10">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <h1 className="pb-1 font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-navy sm:text-6xl lg:text-7xl">
            Comfort, <em className="italic text-indigo">draped</em> beautifully.
          </h1>
          <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-muted">
            Lightweight sarees in Maheshwari silk and soft cottons, made for slow mornings and busy days.
          </p>
          <div className="mt-8">
            <Link href="/shop" className="btn-primary">
              Shop sarees
            </Link>
          </div>
        </div>
        <div className="relative order-1 aspect-[16/10] overflow-hidden bg-surface sm:aspect-[4/3] lg:order-2 lg:col-span-7 lg:aspect-auto lg:h-[min(calc(100dvh-10rem),760px)] lg:min-h-[520px]">
          <ProductImage
            src={site.heroImage || undefined}
            alt={site.heroImageAlt}
            tint={swatchFor("indigo")}
            sizes="(min-width: 1024px) 58vw, 100vw"
            eager
          />
        </div>
      </div>
    </section>
  );
}
