import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Todo } from "@/components/Todo";

export const metadata: Metadata = {
  title: "Size guide",
  description: `Saree and blouse-piece measurements for ${site.name} sarees, and how to measure for blouse stitching.`,
  alternates: { canonical: "/size-guide" },
};

// Typical saree measurements. Draft values: the owner must confirm them before launch.
const sareeMeasurements = [
  { label: "Saree length", value: "About 5.5 metres" },
  { label: "Blouse piece", value: "About 0.8 metres, unstitched, where included" },
  { label: "Width", value: "About 1.1 to 1.2 metres" },
];

const blouseSteps = [
  { title: "Bust", text: "Measure around the fullest part of your chest, keeping the tape level." },
  { title: "Under bust", text: "Measure around your body just below the bust." },
  { title: "Waist", text: "Measure around your natural waistline, the narrowest part of your waist." },
  { title: "Shoulder", text: "Measure across your back from one shoulder tip to the other." },
  { title: "Sleeve length", text: "Measure from the shoulder tip to where you want the sleeve to end." },
  { title: "Blouse length", text: "Measure from the highest point of the shoulder, over the bust, to where you want the blouse to end." },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <header className="max-w-2xl">
        <h1 className="font-serif text-5xl font-medium text-navy sm:text-6xl">Size guide</h1>
        <p className="mt-4 text-lg text-muted">
          Our sarees are free size. Here is what comes with each one, and how to measure if you plan to have a blouse stitched.
        </p>
      </header>

      <section aria-labelledby="saree" className="mt-14 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="saree" className="font-serif text-3xl font-medium text-navy">The saree</h2>
          <p className="mt-2 text-muted">Measurements can vary slightly between weaves.</p>
          <Todo className="mt-3">[OWNER TO CONFIRM] all measurements</Todo>
        </div>
        <dl className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
          {sareeMeasurements.map((row) => (
            <div key={row.label} className="grid grid-cols-[9rem_1fr] gap-4 py-4 sm:grid-cols-[12rem_1fr]">
              <dt className="text-muted">{row.label}</dt>
              <dd className="font-medium text-navy">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="blouse" className="mt-20">
        <h2 id="blouse" className="font-serif text-3xl font-medium text-navy">Measuring for your blouse</h2>
        <p className="mt-2 max-w-[60ch] text-muted">
          Measure over a well-fitting blouse, with the tape snug but not tight. Share these with your tailor.
        </p>
        <ol className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {blouseSteps.map((step) => (
            <li key={step.title} className="border-t border-line pt-4">
              <h3 className="font-medium text-navy">{step.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border border-line bg-surface/70 px-6 py-8 sm:px-10">
        <h2 className="font-serif text-3xl font-medium text-navy">Not sure about something?</h2>
        <p className="mt-2 text-muted">Ask us about any saree before you order. We are happy to help.</p>
        <Link href="/help#faq" className="link-arrow mt-4">Read the FAQ</Link>
      </section>
    </div>
  );
}
