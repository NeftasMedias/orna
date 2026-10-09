import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { getProduct, getProducts, hasTodo } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { isPlaceholder } from "@/lib/site";
import { swatchFor } from "@/lib/swatch";
import { ogFonts, ogSize, publicImageDataUri, shellDataUri } from "@/lib/og";

export const alt = `A saree from ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const fonts = await ogFonts();
  const shell = shellDataUri("#1E2A4F");
  const photo = await publicImageDataUri(product?.images[0]);

  const name = product?.name ?? site.name;
  const fabric = product && !isPlaceholder(product.fabric) ? product.fabric : "Saree";
  const colour = product?.colours[0] ?? "";
  // Placeholder prices are never put on share images.
  const showPrice = product && !hasTodo(product, "price");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#EFEBE4" }}>
        <div
          style={{
            width: 504,
            height: "100%",
            display: "flex",
            background: swatchFor(colour),
            opacity: photo ? 1 : 0.55,
          }}
        >
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img src={photo} width={504} height={630} style={{ objectFit: "cover" }} />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 70px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={shell} width={44} height={56} />
            <div style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 54, color: "#1E2A4F" }}>{site.name}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Cormorant", fontSize: 76, lineHeight: 1.05, color: "#1E2A4F" }}>{name}</div>
            <div style={{ fontFamily: "Mukta", fontSize: 30, color: "#5A6482", marginTop: 18 }}>
              {colour ? `${fabric}, ${colour}` : fabric}
            </div>
            {showPrice && product && (
              <div style={{ fontFamily: "Mukta", fontSize: 40, color: "#1E2A4F", marginTop: 22 }}>{formatPrice(product.price)}</div>
            )}
          </div>
          <div style={{ fontFamily: "Mukta", fontSize: 26, color: "#3E5FA8" }}>Order on WhatsApp or Instagram</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
