import Link from "next/link";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/config/site";
import { getNavGroups } from "@/lib/catalog";
import { whatsappHref, whatsappReady } from "@/lib/order";
import { Logo } from "@/components/layout/Logo";
import { ShopMenu } from "@/components/layout/ShopMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";

const iconLink = "inline-flex size-11 items-center justify-center text-navy transition-colors hover:text-indigo";

export function Header() {
  const groups = getNavGroups();
  const whatsappUrl = whatsappReady() ? whatsappHref() : null;

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-linen/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-10 lg:px-8">
        <MobileMenu groups={groups} siteName={site.name} instagramUrl={site.instagramUrl} whatsappUrl={whatsappUrl} />
        <Logo name={site.name} />
        <nav aria-label="Main" className="hidden h-full items-center gap-8 lg:flex">
          <ShopMenu groups={groups} />
          <Link href="/shop?new=1" className="text-[15px] font-medium text-navy hover:text-indigo">
            New in
          </Link>
          <Link href="/lookbook" className="text-[15px] font-medium text-navy hover:text-indigo">
            Lookbook
          </Link>
          <Link href="/size-guide" className="text-[15px] font-medium text-navy hover:text-indigo">
            Size guide
          </Link>
        </nav>
        <div className="ml-auto flex items-center">
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on Instagram`} className={iconLink}>
            <InstagramLogo size={22} />
          </a>
          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Chat with ${site.name} on WhatsApp`} className={`${iconLink} -mr-2`}>
              <WhatsappLogo size={22} />
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
