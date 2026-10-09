import type { Metadata } from "next";
import { Plus } from "@phosphor-icons/react/ssr";
import { site } from "@/config/site";
import { Todo } from "@/components/Todo";

export const metadata: Metadata = {
  title: "Shipping, returns & FAQ",
  description: `How ordering, shipping and returns work at ${site.name}, plus answers to common questions.`,
  alternates: { canonical: "/help" },
};

// All policy text below is a DRAFT for the owner to confirm. Answers marked `confirmed` come from
// Oṛna's own Instagram posts; everything else is a sensible default that must be checked.
const faqs: Array<{ q: string; a: string; confirmed?: boolean }> = [
  {
    q: "How do I place an order?",
    a: "Open the saree you like and tap Order on WhatsApp. Your chosen saree, size and colour are added to the message for you. You can also message us on Instagram or send an enquiry from the product page.",
    confirmed: true,
  },
  {
    q: "How do I pay?",
    a: "Once we confirm your order on WhatsApp, we will share payment details. We accept UPI and bank transfer.",
  },
  {
    q: "Does the saree come with a blouse piece?",
    a: "Blouse details are listed on each saree's page. Some sarees come with a contrast blouse fabric. If you are not sure, ask us before ordering.",
    confirmed: true,
  },
  {
    q: "Will the colour look exactly like the photos?",
    a: "We photograph every saree carefully, but colours may vary slightly due to lighting, photography and screen settings.",
    confirmed: true,
  },
  {
    q: "Are the designs exclusive to Oṛna?",
    a: "Oṛna curates its collection from trusted weavers and manufacturers. We do not claim exclusivity over the designs. All photography is our own.",
    confirmed: true,
  },
  {
    q: "Can I see more photos or a video of a saree?",
    a: "Yes. Message us on WhatsApp or Instagram and we will send more photos or a short video.",
  },
  {
    q: "Do you ship outside India?",
    a: "At the moment we ship within India only.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <header className="max-w-2xl">
        <h1 className="font-serif text-5xl font-medium text-navy sm:text-6xl">Shipping, returns & FAQ</h1>
        <p className="mt-4 text-lg text-muted">Everything you need to know before you order.</p>
      </header>

      <div className="mt-14 grid gap-16 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-24 space-y-2 text-[15px]">
            <li><a href="#shipping" className="text-navy hover:text-indigo">Shipping</a></li>
            <li><a href="#returns" className="text-navy hover:text-indigo">Returns & exchanges</a></li>
            <li><a href="#faq" className="text-navy hover:text-indigo">FAQ</a></li>
          </ul>
        </nav>

        <div className="space-y-16 lg:col-span-8 lg:col-start-5">
          <section id="shipping" aria-labelledby="shipping-title">
            <h2 id="shipping-title" className="font-serif text-3xl font-medium text-navy">Shipping</h2>
            <Todo className="mt-2" />
            <div className="mt-4 max-w-[65ch] space-y-3 leading-relaxed text-navy/90">
              <p>We ship across India. Orders are usually packed and dispatched within 2 to 4 working days after payment is confirmed.</p>
              <p>Delivery usually takes 4 to 8 working days, depending on your location. We share tracking details on WhatsApp once your saree is on its way.</p>
              <p>Any shipping charges are confirmed with you on WhatsApp before you pay.</p>
            </div>
          </section>

          <section id="returns" aria-labelledby="returns-title">
            <h2 id="returns-title" className="font-serif text-3xl font-medium text-navy">Returns & exchanges</h2>
            <Todo className="mt-2" />
            <div className="mt-4 max-w-[65ch] space-y-3 leading-relaxed text-navy/90">
              <p>Every saree is checked before it ships. If your saree arrives damaged, or is not the one you ordered, message us within 48 hours of delivery with photos and an unboxing video and we will arrange an exchange or refund.</p>
              <p>We are not able to accept returns for a change of mind, or for sarees that have been worn, washed or altered.</p>
            </div>
          </section>

          <section id="faq" aria-labelledby="faq-title">
            <h2 id="faq-title" className="font-serif text-3xl font-medium text-navy">FAQ</h2>
            <div className="mt-6 border-t border-line">
              {faqs.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex items-start justify-between gap-6 py-5 text-[17px] font-medium text-navy">
                    {item.q}
                    <Plus size={18} className="mt-1 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <div className="max-w-[65ch] pb-5 leading-relaxed text-muted">
                    <p>{item.a}</p>
                    {!item.confirmed && <Todo className="mt-2" />}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
