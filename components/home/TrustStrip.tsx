import { Handshake, Truck, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { Todo } from "@/components/Todo";

// Only claims the brand makes itself. "Curated from trusted weavers" comes from Oṛna's own Instagram sourcing note.
export function TrustStrip() {
  return (
    <section aria-label="Shopping with Oṛna" className="border-y border-line bg-surface/70">
      <ul className="mx-auto grid max-w-7xl gap-x-8 gap-y-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
        <li className="flex items-center gap-3 text-[15px] text-navy">
          <Handshake size={24} className="shrink-0 text-indigo" />
          Curated from trusted weavers
        </li>
        <li className="flex items-center gap-3 text-[15px] text-navy">
          <WhatsappLogo size={24} className="shrink-0 text-indigo" />
          Order on WhatsApp or Instagram
        </li>
        <li className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-navy">
          <Truck size={24} className="shrink-0 text-indigo" />
          Shipping across India
          <Todo />
        </li>
      </ul>
    </section>
  );
}
