import { site } from "@/config/site";
import { joinClasses } from "@/lib/cx";

/** Visible placeholder marker. Hidden when site.showPlaceholderMarkers is false. */
export function Todo({ children = "[OWNER TO CONFIRM]", className }: { children?: React.ReactNode; className?: string }) {
  if (!site.showPlaceholderMarkers) return null;
  return <span className={joinClasses("todo-marker", className)}>{children}</span>;
}

const todoLabels: Record<string, string> = {
  name: "name",
  price: "price",
  photos: "photos",
  care: "care",
  fabric: "fabric",
  occasion: "occasion",
};

/** One compact marker listing what is still a placeholder on a product, e.g. "[TO CONFIRM: name, price]". */
export function TodoSummary({ todo, keys, className }: { todo?: string[]; keys: string[]; className?: string }) {
  const open = (todo ?? []).filter((t) => keys.includes(t)).map((t) => todoLabels[t] ?? t);
  if (open.length === 0) return null;
  return <Todo className={className}>[TO CONFIRM: {open.join(", ")}]</Todo>;
}
