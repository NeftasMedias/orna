"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ChatCircleText, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { EnquiryForm } from "@/components/product/EnquiryForm";

type Props = {
  product: { name: string; slug: string; sizes: string[]; colours: string[] };
  productUrl: string;
  /** Pre-built order links; null when the WhatsApp number is still a placeholder. */
  whatsappNumber: string | null;
  siteName: string;
  instagramMessageUrl: string;
};

type Missing = "size" | "colour" | null;

export function OrderPanel({ product, productUrl, whatsappNumber, siteName, instagramMessageUrl }: Props) {
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [colour, setColour] = useState(product.colours.length === 1 ? product.colours[0] : "");
  const [missing, setMissing] = useState<Missing>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const sizeGroup = useRef<HTMLFieldSetElement>(null);
  const colourGroup = useRef<HTMLFieldSetElement>(null);
  const ids = useId();

  /** Size (and colour, when there is a choice) must be picked before WhatsApp or the form opens. */
  function checkSelection(): boolean {
    const gap: Missing = !size ? "size" : !colour ? "colour" : null;
    setMissing(gap);
    if (gap) {
      const group = gap === "size" ? sizeGroup.current : colourGroup.current;
      group?.scrollIntoView({ block: "center" });
      group?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
      return false;
    }
    return true;
  }

  const message = [
    `Hi ${siteName}, I'd like to order this saree:`,
    "",
    product.name,
    `Size: ${size}`,
    `Colour: ${colour}`,
    productUrl,
  ].join("\n");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : null;

  return (
    <div className="mt-8 space-y-6">
      {product.colours.length > 1 ? (
        <fieldset ref={colourGroup}>
          <legend className="text-sm font-medium text-navy">Colour</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colours.map((c) => (
              <Choice key={c} name={`${ids}-colour`} value={c} checked={colour === c} onChange={() => { setColour(c); setMissing(null); }} />
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="text-[15px] text-navy">
          <span className="text-muted">Colour: </span>
          {product.colours[0]}
        </p>
      )}

      <fieldset ref={sizeGroup}>
        <div className="flex items-baseline justify-between gap-4">
          <legend className="text-sm font-medium text-navy">Size</legend>
          <Link href="/size-guide" className="text-sm text-navy underline underline-offset-4 hover:text-indigo">
            Size guide
          </Link>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <Choice key={s} name={`${ids}-size`} value={s} checked={size === s} onChange={() => { setSize(s); setMissing(null); }} />
          ))}
        </div>
      </fieldset>

      {missing && (
        <p role="alert" className="text-sm font-medium text-danger">
          Please choose a {missing} first.
        </p>
      )}

      <div className="space-y-3">
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (!checkSelection()) event.preventDefault();
            }}
            className="btn-primary w-full"
          >
            <WhatsappLogo size={20} />
            Order on WhatsApp
          </a>
        ) : (
          <p className="btn-primary w-full cursor-not-allowed opacity-60" aria-disabled="true">
            <WhatsappLogo size={20} />
            Order on WhatsApp
            <span className="todo-marker !bg-transparent !text-surface">[WHATSAPP_NUMBER]</span>
          </p>
        )}

        <button
          type="button"
          aria-expanded={enquiryOpen}
          aria-controls={`${ids}-enquiry`}
          onClick={() => {
            if (enquiryOpen) setEnquiryOpen(false);
            else if (checkSelection()) setEnquiryOpen(true);
          }}
          className="btn-secondary w-full"
        >
          <ChatCircleText size={20} />
          Enquire
        </button>

        <a
          href={instagramMessageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow w-full justify-center py-2"
        >
          <InstagramLogo size={18} />
          Message on Instagram
        </a>
      </div>

      {enquiryOpen && (
        <div id={`${ids}-enquiry`}>
          <EnquiryForm product={product.name} productSlug={product.slug} size={size} colour={colour} productUrl={productUrl} whatsappUrl={whatsappUrl} />
        </div>
      )}
    </div>
  );
}

function Choice({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex min-h-11 items-center rounded-control border border-line bg-surface px-4 text-[15px] text-navy transition-colors hover:border-navy peer-checked:border-navy peer-checked:bg-soft-blue/50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo">
        {value}
      </span>
    </label>
  );
}
