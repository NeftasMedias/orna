import { formatPrice } from "@/lib/format";
import { joinClasses } from "@/lib/cx";

export function Price({
  price,
  originalPrice,
  large = false,
  className,
}: {
  price: number;
  originalPrice?: number;
  large?: boolean;
  className?: string;
}) {
  const onSale = originalPrice !== undefined && originalPrice > price;
  return (
    <p className={joinClasses("flex flex-wrap items-baseline gap-x-2", className)}>
      <span className="sr-only">{onSale ? "Sale price" : "Price"}</span>
      <span className={joinClasses("font-medium text-navy", large ? "text-2xl" : "text-[15px]")}>{formatPrice(price)}</span>
      {onSale && (
        <>
          <span className="sr-only">Original price</span>
          <s className={joinClasses("text-muted", large ? "text-lg" : "text-sm")}>{formatPrice(originalPrice)}</s>
        </>
      )}
    </p>
  );
}
