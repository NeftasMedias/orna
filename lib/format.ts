const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Whole rupees in Indian formatting, e.g. 1699 -> "₹1,699", 125000 -> "₹1,25,000". */
export function formatPrice(amount: number): string {
  return rupees.format(amount);
}

/** "Maheshwari Silk" -> "maheshwari-silk". Used for filter values in URLs. */
export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
