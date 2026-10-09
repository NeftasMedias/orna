import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <p className="text-sm font-medium text-indigo">Page not found</p>
      <h1 className="mt-2 max-w-xl font-serif text-5xl font-medium leading-[1.1] text-navy sm:text-6xl">
        This page seems to have slipped away.
      </h1>
      <p className="mt-4 max-w-[48ch] text-lg text-muted">The saree or page you are looking for may have moved or sold out.</p>
      <Link href="/shop" className="btn-primary mt-8">
        Browse all sarees
      </Link>
    </div>
  );
}
