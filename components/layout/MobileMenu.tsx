"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { InstagramLogo, List, Plus, WhatsappLogo, X } from "@phosphor-icons/react";
import type { NavGroup } from "@/lib/catalog";
import { Logo } from "@/components/layout/Logo";

type Props = {
  groups: NavGroup[];
  siteName: string;
  instagramUrl: string;
  whatsappUrl: string | null;
};

export function MobileMenu({ groups, siteName, instagramUrl, whatsappUrl }: Props) {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const shopGroups = groups.filter((group) => group.title !== "Category");
  const quickLinks = groups.find((group) => group.title === "Category")?.links ?? [];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-ml-2 inline-flex size-11 items-center justify-center text-navy lg:hidden"
      >
        <List size={24} />
      </button>

      {/* Rendered into <body>: the header's backdrop blur would otherwise trap this fixed panel inside the header. */}
      {open &&
        createPortal(
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" tabIndex={-1} onClick={close} className="absolute inset-0 bg-navy/30" />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-surface">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <Logo name={siteName} onClick={close} />
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="-mr-2 inline-flex size-11 items-center justify-center text-navy"
              >
                <X size={24} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-4 py-4">
              <ul className="border-b border-line pb-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={close} className="block py-2.5 font-serif text-2xl font-medium text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {shopGroups.map((group) => (
                <details key={group.title} className="group border-b border-line">
                  <summary className="flex items-center justify-between py-4 text-[15px] font-medium text-navy">
                    Shop by {group.title.toLowerCase()}
                    <Plus size={16} className="transition-transform group-open:rotate-45" />
                  </summary>
                  <ul className="pb-4 pl-1">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} onClick={close} className="block py-2 text-[15px] text-muted hover:text-indigo">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}

              <ul className="py-3">
                {[
                  { label: "Lookbook", href: "/lookbook" },
                  { label: "Size guide", href: "/size-guide" },
                  { label: "Shipping & returns", href: "/help#shipping" },
                  { label: "FAQ", href: "/help#faq" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={close} className="block py-2.5 text-[15px] text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex gap-3 border-t border-line px-4 py-5">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 px-3">
                <InstagramLogo size={20} />
                Instagram
              </a>
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 px-3">
                  <WhatsappLogo size={20} />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
