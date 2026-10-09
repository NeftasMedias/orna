import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { site } from "@/config/site";
import { type Look, getLooks, getProductsBySlugs, hasTodo } from "@/lib/catalog";
import { swatchFor } from "@/lib/swatch";
import { ProductImage } from "@/components/ProductImage";
import { Price } from "@/components/Price";
import { Todo } from "@/components/Todo";

export const metadata: Metadata = {
  title: "Lookbook",
  description: `Styled looks from ${site.name}: Maheshwari silks, mul cottons and everyday sarees, each linked to the sarees in the photo.`,
  alternates: { canonical: "/lookbook" },
};

export default function LookbookPage() {
  const looks = getLooks();
  const [lead, ...rest] = [...looks].sort((a, b) => Number(b.lookOfTheWeek) - Number(a.lookOfTheWeek));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <header className="max-w-2xl">
        <h1 className="font-serif text-5xl font-medium text-navy sm:text-6xl">Lookbook</h1>
        <p className="mt-4 text-lg text-muted">Sarees as we love to see them. Tap a saree under any look to see its details.</p>
      </header>

      {lead && (
        <article className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[4/3] lg:col-span-8">
            <LookImage look={lead} sizes="(min-width: 1024px) 66vw, 100vw" eager />
          </div>
          <div className="lg:col-span-4">
            {lead.lookOfTheWeek && <p className="text-sm font-medium text-indigo">Look of the week</p>}
            <h2 className="mt-1 font-serif text-4xl font-medium text-navy">{lead.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{lead.caption}</p>
            <LookProducts look={lead} />
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <ul className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {rest.map((look, index) => {
            // An odd last look spans the full row (photo beside text) so no empty cell is left.
            const wide = rest.length % 2 === 1 && index === rest.length - 1;
            return (
              <li key={look.id} className={wide ? "reveal md:col-span-2" : "reveal"}>
                <article className={wide ? "md:grid md:grid-cols-2 md:items-end md:gap-8" : undefined}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <LookImage look={look} sizes="(min-width: 768px) 46vw, 100vw" />
                  </div>
                  <div>
                    <h2 className="mt-5 font-serif text-3xl font-medium text-navy">{look.title}</h2>
                    <p className="mt-2 max-w-[52ch] leading-relaxed text-muted">{look.caption}</p>
                    <LookProducts look={look} />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function LookImage({ look, sizes, eager }: { look: Look; sizes: string; eager?: boolean }) {
  const first = getProductsBySlugs(look.productSlugs)[0];
  return <ProductImage src={look.image || undefined} alt={look.imageAlt} tint={swatchFor(first?.colours[0])} sizes={sizes} eager={eager} />;
}

function LookProducts({ look }: { look: Look }) {
  const products = getProductsBySlugs(look.productSlugs);
  return (
    <div className="mt-5">
      <p className="text-sm text-muted">
        In this look {hasTodo(look, "products") && <Todo className="ml-1">[OWNER TO CONFIRM which sarees]</Todo>}
      </p>
      <ul className="mt-2 divide-y divide-line border-y border-line">
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`} className="group relative flex items-center justify-between gap-4 py-3">
              <span className="font-medium text-navy group-hover:text-indigo">{product.name}</span>
              <span className="flex items-center gap-3">
                <Price price={product.price} originalPrice={product.originalPrice} />
                <ArrowRight size={16} className="text-muted group-hover:text-indigo" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
