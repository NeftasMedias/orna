/** Joins class names, skipping empty values. Safe to use in client components. */
export function joinClasses(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
