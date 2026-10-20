import { goal, purpose } from "@/content/about";

/** Our Goal and Our Purpose — verbatim from purple-movement.com. */
export function WhoWeAre() {
  return (
    <div id="about" className="bg-pm-bg py-16 sm:py-24">
      <div className="pm-container grid gap-12 lg:grid-cols-2 lg:gap-16">
        {[goal, purpose].map((block, i) => (
          <section key={block.heading} aria-labelledby={`about-${i}`} className="border-t-2 border-pm-accent pt-8">
            <h2 id={`about-${i}`} className="font-display text-display-sm font-extrabold">
              {block.heading}
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-pm-text-secondary lg:text-2xl lg:leading-relaxed">{block.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
