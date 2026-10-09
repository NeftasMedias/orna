import { ProductImage } from "@/components/ProductImage";
import { joinClasses } from "@/lib/cx";

/** Phones: swipe sideways (the next photo peeks in). Laptops: large first photo, the rest in a 2-column grid. No JavaScript. */
export function Gallery({ images, name, tint }: { images: string[]; name: string; tint: string }) {
  const slides = images.length > 0 ? images : [undefined];
  const single = slides.length === 1;

  return (
    <div
      className={joinClasses(
        "no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6",
        "lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0",
      )}
      aria-label={`Photos of ${name}`}
      role="group"
    >
      {slides.map((src, index) => (
        <div
          key={src ?? "placeholder"}
          className={joinClasses(
            "relative aspect-[4/5] shrink-0 snap-center overflow-hidden bg-surface",
            single ? "w-full" : "w-[86%]",
            "lg:w-auto",
            index === 0 && "lg:col-span-2",
          )}
        >
          <ProductImage
            src={src}
            alt={index === 0 ? name : `${name}, photo ${index + 1}`}
            tint={tint}
            sizes="(min-width: 1024px) 56vw, 90vw"
            eager={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
