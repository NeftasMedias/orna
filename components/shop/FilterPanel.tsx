import Link from "next/link";
import { Check } from "@phosphor-icons/react/ssr";
import { type Facets, type Filters, shopHref } from "@/lib/catalog";

type GroupKey = "category" | "fabric" | "occasion" | "price";

/** Filter groups as plain links (work without JavaScript). One choice per group; tap again to clear it. */
export function FilterPanel({ facets, filters }: { facets: Facets; filters: Filters }) {
  const groups: Array<{ key: GroupKey; title: string; options: Facets["fabrics"] }> = [
    ...(facets.categories.length > 1 ? [{ key: "category" as const, title: "Category", options: facets.categories }] : []),
    { key: "fabric", title: "Fabric", options: facets.fabrics },
    { key: "occasion", title: "Occasion", options: facets.occasions },
    { key: "price", title: "Price", options: facets.prices },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-navy">Show</p>
        <ul className="mt-3 space-y-1">
          <FilterLink active={!filters.new} href={shopHref(filters, { new: null })} label="All sarees" />
          <FilterLink active={Boolean(filters.new)} href={shopHref(filters, { new: filters.new ? null : true })} label="New in" />
        </ul>
      </div>
      {groups
        .filter((group) => group.options.length > 0)
        .map((group) => (
          <div key={group.key}>
            <p className="text-sm font-medium text-navy">{group.title}</p>
            <ul className="mt-3 space-y-1">
              {group.options.map((option) => {
                const active = filters[group.key] === option.value;
                if (option.count === 0 && !active) return null;
                return (
                  <FilterLink
                    key={option.value}
                    active={active}
                    href={shopHref(filters, { [group.key]: active ? null : option.value })}
                    label={option.label}
                    count={option.count}
                  />
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}

function FilterLink({ active, href, label, count }: { active: boolean; href: string; label: string; count?: number }) {
  return (
    <li>
      <Link
        href={href}
        scroll={false}
        aria-current={active ? "true" : undefined}
        className={
          active
            ? "flex items-center gap-2 py-1.5 text-[15px] font-medium text-indigo"
            : "flex items-center gap-2 py-1.5 text-[15px] text-navy hover:text-indigo"
        }
      >
        <span
          aria-hidden="true"
          className={
            active
              ? "flex size-4 shrink-0 items-center justify-center rounded-[2px] bg-indigo text-surface"
              : "size-4 shrink-0 rounded-[2px] border border-muted/60"
          }
        >
          {active && <Check size={11} weight="bold" />}
        </span>
        {label}
        {count !== undefined && <span className="text-sm text-muted">({count})</span>}
      </Link>
    </li>
  );
}
