"use client";

import { useId, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";

type Props = {
  product: string;
  productSlug: string;
  size: string;
  colour: string;
  productUrl: string;
  whatsappUrl: string | null;
};

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "phone", string>>;

const phonePattern = /^(?:\+?91|0)?[6-9]\d{9}$/;

const inputClass =
  "mt-1.5 block w-full rounded-control border border-navy/30 bg-surface px-3 py-2.5 text-[15px] text-navy placeholder:text-muted focus:border-indigo focus:outline-2 focus:outline-offset-0 focus:outline-indigo aria-[invalid=true]:border-danger";

export function EnquiryForm({ product, productSlug, size, colour, productUrl, whatsappUrl }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const id = useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").replace(/[\s-]/g, "");

    const nextErrors: FieldErrors = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!phonePattern.test(phone)) nextErrors.phone = "Please enter a 10-digit mobile number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    setServerError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          product,
          productSlug,
          size: String(form.get("size") ?? size),
          colour,
          message: String(form.get("message") ?? "").trim(),
          pageUrl: productUrl,
          website: String(form.get("website") ?? ""),
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-control border border-line bg-surface p-5">
        <p className="flex items-center gap-2 font-medium text-navy">
          <CheckCircle size={22} className="text-indigo" /> Thank you, we have your enquiry.
        </p>
        <p className="mt-2 text-[15px] text-muted">We will get back to you on the number you shared.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-control border border-line bg-surface/60 p-5">
      <p className="font-serif text-2xl text-navy">Send an enquiry</p>

      <div>
        <label htmlFor={`${id}-name`} className="text-sm font-medium text-navy">Your name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" required className={inputClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} />
        {errors.name && <p id={`${id}-name-error`} className="mt-1.5 text-sm text-danger">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="text-sm font-medium text-navy">Phone number</label>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={`${id}-phone-help${errors.phone ? ` ${id}-phone-error` : ""}`} />
        <p id={`${id}-phone-help`} className="mt-1.5 text-sm text-muted">10-digit mobile number. We may reply on WhatsApp.</p>
        {errors.phone && <p id={`${id}-phone-error`} className="mt-1 text-sm text-danger">{errors.phone}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-product`} className="text-sm font-medium text-navy">Saree</label>
          <input id={`${id}-product`} name="product" value={product} readOnly className={`${inputClass} bg-linen`} />
        </div>
        <div>
          <label htmlFor={`${id}-size`} className="text-sm font-medium text-navy">Size</label>
          <input id={`${id}-size`} name="size" value={size} readOnly className={`${inputClass} bg-linen`} />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-medium text-navy">
          Message <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={3} maxLength={1000} className={inputClass} />
      </div>

      {/* Spam trap: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-danger">
          Sorry, your enquiry could not be sent. {serverError}{" "}
          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Message us on WhatsApp instead.
            </a>
          )}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-70">
        {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}
