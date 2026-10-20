import { pillars, pillarsIntro } from "@/content/about";

/** The three pillars — verbatim from purple-movement.com. */
export function Pillars() {
  return (
    <section id="pillars" aria-labelledby="pillars-title" className="bg-pm-bg py-16 sm:py-24">
      <div className="pm-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="pillars-title" className="font-display text-display-md font-extrabold text-balance">
            {pillarsIntro.heading}
          </h2>
          <p className="mt-6 text-xl font-semibold">{pillarsIntro.lead}</p>
          <p className="mt-4 text-pm-text-secondary">{pillarsIntro.body}</p>
        </div>
        <ol className="space-y-px overflow-hidden rounded-md border border-pm-line bg-pm-line lg:col-span-7">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="flex gap-6 bg-pm-bg p-6 sm:p-8">
              <span aria-hidden="true" className="font-display text-display-sm font-extrabold text-pm-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold">{pillar.title}</h3>
                <p className="mt-2 text-pm-text-secondary">{pillar.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
