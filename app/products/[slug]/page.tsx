import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react/ssr";
import { site } from "@/config/site";
import { getProduct, getProducts, hasTodo, shopHref } from "@/lib/catalog";
import { toSlug } from "@/lib/format";
import { absoluteUrl, isPlaceholder } from "@/lib/site";
import { instagramMessageHref, whatsappReady } from "@/lib/order";
import { swatchFor } from "@/lib/swatch";
import { Gallery } from "@/components/product/Gallery";
import { OrderPanel } from "@/components/product/OrderPanel";
import { Price } from "@/components/Price";
import { Todo } from "@/components/Todo";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const firstSentence = product.description.split(/(?<=\.)\s/)[0];
  const fabric = isPlaceholder(product.fabric) ? "Saree" : `${product.fabric} saree`;
  return {
    title: product.name,
    description: `${fabric} in ${product.colours[0]}. ${firstSentence} Order on WhatsApp or Instagram.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { type: "website", title: `${product.name} | ${site.name}` },
  };
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const fabricKnown = !isPlaceholder(product.fabric);
  const details: Array<{ label: string; value: string; todo?: boolean }> = [
    { label: "Fabric", value: product.fabric, todo: !fabricKnown || hasTodo(product, "fabric") },
    { label: "Colour", value: product.colours.join(", ") },
    { label: "Size", value: product.sizes.join(", ") },
    ...(product.blouse ? [{ label: "Blouse", value: product.blouse }] : []),
    ...(product.occasion.length ? [{ label: "Wear it for", value: product.occasion.join(", ") }] : []),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pt-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/shop" className="hover:text-indigo">Sarees</Link></li>
          {fabricKnown && (
            <>
              <li aria-hidden="true"><CaretRight size={12} /></li>
              <li><Link href={shopHref({}, { fabric: toSlug(product.fabric) })} className="hover:text-indigo">{product.fabric}</Link></li>
            </>
          )}
        </ol>
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Gallery images={product.images} name={product.name} tint={swatchFor(product.colours[0])} />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            {product.isNew && <p className="text-sm font-medium text-indigo">New</p>}
            <h1 className="pb-1 font-serif text-4xl font-medium leading-[1.1] text-navy sm:text-5xl">{product.name}</h1>
            {hasTodo(product, "name") && <Todo className="mt-1">[NAME TO CONFIRM]</Todo>}

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Price price={product.price} originalPrice={product.originalPrice} large />
              {hasTodo(product, "price") && <Todo>[PLACEHOLDER PRICE]</Todo>}
            </div>
            {fabricKnown && <p className="mt-1 text-[15px] text-muted">{product.fabric}</p>}

            <OrderPanel
              product={{ name: product.name, slug: product.slug, sizes: product.sizes, colours: product.colours }}
              productUrl={absoluteUrl(`/products/${product.slug}`)}
              whatsappNumber={whatsappReady() ? site.whatsappNumber.replace(/\D/g, "") : null}
              siteName={site.name}
              instagramMessageUrl={instagramMessageHref()}
            />

            <p className="mt-6 text-sm text-muted">
              Colours may vary slightly due to lighting, photography and screen settings.
            </p>

            <div className="mt-10 space-y-8 border-t border-line pt-8">
              <section aria-labelledby="about">
                <h2 id="about" className="font-serif text-2xl font-medium text-navy">About this saree</h2>
                <p className="mt-3 leading-relaxed text-navy/90">{product.description}</p>
              </section>

              <section aria-labelledby="details">
                <h2 id="details" className="font-serif text-2xl font-medium text-navy">Details</h2>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
                  {details.map((row) => (
                    <div key={row.label} className="contents">
                      <dt className="text-muted">{row.label}</dt>
                      <dd className="text-navy">
                        {isPlaceholder(row.value) ? null : row.value}
                        {row.todo && <Todo className={isPlaceholder(row.value) ? "" : "ml-2"} />}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="care">
                <h2 id="care" className="font-serif text-2xl font-medium text-navy">Care</h2>
                <p className="mt-3 leading-relaxed text-navy/90">{product.careInstructions}</p>
                {hasTodo(product, "care") && <Todo className="mt-2" />}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pt-8">
      <div className="h-4 w-32 bg-surface" />
      <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="aspect-[4/5] bg-surface lg:col-span-7" />
        <div className="space-y-4 lg:col-span-5">
          <div className="h-12 w-3/4 bg-surface" />
          <div className="h-7 w-1/3 bg-surface" />
          <div className="mt-8 h-12 w-full bg-surface" />
          <div className="h-12 w-full bg-surface" />
        </div>
      </div>
    </div>
  );
}
