import Link from "next/link";
import { ShellMark } from "@/components/ShellMark";
import { joinClasses } from "@/lib/cx";

// Used by both server and client components, so it takes the brand name as a prop
// instead of importing the server-only settings file.
export function Logo({ name, className, onClick }: { name: string; className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${name}, home`}
      className={joinClasses("inline-flex items-center gap-2 text-navy", className)}
    >
      <ShellMark className="h-8 w-auto shrink-0" />
      <span className="pb-1 font-serif text-[1.85rem] font-medium italic leading-none tracking-tight">{name}</span>
    </Link>
  );
}
