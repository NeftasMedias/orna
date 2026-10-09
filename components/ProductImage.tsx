import Image from "next/image";
import { site } from "@/config/site";
import { joinClasses } from "@/lib/cx";

type Props = {
  src?: string;
  alt: string;
  /** Colour used for the placeholder block until a real photo is added. */
  tint: string;
  sizes: string;
  eager?: boolean;
  className?: string;
};

/** Fills its parent (which must be `relative` with a size). Shows a marked placeholder when there is no photo. */
export function ProductImage({ src, alt, tint, sizes, eager, className }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={joinClasses("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${alt}`}
      className={joinClasses("absolute inset-0 flex items-end justify-start p-3", className)}
      style={{
        backgroundColor: `color-mix(in oklab, ${tint} 42%, #efebe4)`,
        backgroundImage:
          "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 7px), repeating-linear-gradient(0deg, rgb(30 42 79 / 0.04) 0 1px, transparent 1px 7px)",
      }}
    >
      {site.showPlaceholderMarkers && <span className="todo-marker">[ADD REAL PHOTO]</span>}
    </div>
  );
}
