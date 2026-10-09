import { Todo } from "@/components/Todo";

// Draft built from Oṛna's own Instagram words (bio, captions and sourcing note). Owner to confirm.
export function BrandStory() {
  return (
    <section aria-labelledby="our-story" className="reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="lg:ml-[16.66%] lg:max-w-3xl">
        <h2 id="our-story" className="pb-1 font-serif text-4xl font-medium leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
          For the love of <em className="italic">beautiful drapes</em>
        </h2>
        <div className="mt-8 max-w-[60ch] space-y-4 text-lg leading-relaxed text-muted">
          <p>
            Oṛna is a small saree label that began in 2026. We curate our collection from trusted weavers and
            manufacturers, choosing sarees that are light, breathable and easy to drape.
          </p>
          <p>Maheshwari silks for celebrations and soft cottons for workdays, made for slow mornings and busy days.</p>
        </div>
        <p className="mt-8 font-serif text-3xl italic text-indigo">Comfort in every thread.</p>
        <Todo className="mt-6">[OWNER TO CONFIRM] brand story text</Todo>
      </div>
    </section>
  );
}
