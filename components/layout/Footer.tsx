import Link from "next/link";
import { EnvelopeSimple, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/config/site";
import { isPlaceholder } from "@/lib/site";
import { instagramHandle, whatsappHref, whatsappReady } from "@/lib/order";
import { Logo } from "@/components/layout/Logo";
import { Todo } from "@/components/Todo";

const linkClass = "text-[15px] text-navy hover:text-indigo";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-surface/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo name={site.name} />
          <p className="mt-4 max-w-xs font-serif text-2xl italic leading-snug text-navy">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">Lightweight sarees, curated from trusted weavers.</p>
        </div>

        <nav aria-label="Shop" className="lg:col-span-2">
          <p className="text-sm text-muted">Shop</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/shop" className={linkClass}>All sarees</Link></li>
            <li><Link href="/shop?new=1" className={linkClass}>New in</Link></li>
            <li><Link href="/lookbook" className={linkClass}>Lookbook</Link></li>
            <li><Link href="/size-guide" className={linkClass}>Size guide</Link></li>
          </ul>
        </nav>

        <nav aria-label="Help" className="lg:col-span-3">
          <p className="text-sm text-muted">Help</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/help#shipping" className={linkClass}>Shipping</Link></li>
            <li><Link href="/help#returns" className={linkClass}>Returns & exchanges</Link></li>
            <li><Link href="/help#faq" className={linkClass}>FAQ</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-sm text-muted">Contact</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <InstagramLogo size={18} /> {instagramHandle()}
              </a>
            </li>
            <li>
              {whatsappReady() ? (
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                  <WhatsappLogo size={18} /> WhatsApp
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-[15px] text-navy">
                  <WhatsappLogo size={18} /> WhatsApp <Todo>[WHATSAPP_NUMBER]</Todo>
                </span>
              )}
            </li>
            <li>
              {isPlaceholder(site.email) ? (
                <span className="inline-flex items-center gap-2 text-[15px] text-navy">
                  <EnvelopeSimple size={18} /> Email <Todo>[EMAIL]</Todo>
                </span>
              ) : (
                <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <EnvelopeSimple size={18} /> {site.email}
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {site.foundedYear} {site.name}</p>
          <p>All prices in Indian rupees (₹)</p>
        </div>
      </div>
    </footer>
  );
}
