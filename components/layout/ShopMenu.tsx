"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react";
import type { NavGroup } from "@/lib/catalog";

/** Desktop "Shop" button with a full-width panel: Category, Fabric, Occasion, Price. */
export function ShopMenu({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (wrapper.current && !wrapper.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="flex h-full items-center" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="shop-menu"
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
        className="flex h-full items-center gap-1 text-[15px] font-medium text-navy hover:text-indigo"
      >
        Shop
        <CaretDown size={14} weight="bold" className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      <div id="shop-menu" hidden={!open} className="absolute inset-x-0 top-full z-40 border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-10 px-8 py-10">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="text-sm text-muted">{group.title}</p>
              <ul className="mt-3 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-[15px] text-navy hover:text-indigo"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
