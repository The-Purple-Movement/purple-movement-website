import { Fragment } from "react";
import { whyPurple } from "@/content/about";
import { CheckIcon } from "@/components/ui/icons";

/** "Why Purple?" — verbatim from purple-movement.com, shown as red + blue = purple. */
export function WhyPurple() {
  const terms = [
    { name: "Red", text: whyPurple.red, bar: "bg-pm-red", label: "text-pm-red" },
    { name: "Blue", text: whyPurple.blue, bar: "bg-pm-blue", label: "text-pm-blue" },
    { name: "Purple", text: whyPurple.together, bar: "bg-pm-purple-600", label: "text-pm-accent" },
  ];

  return (
    <section id="why-purple" aria-labelledby="why-purple-title" className="bg-pm-surface-alt py-16 sm:py-24">
      <div className="pm-container">
        <div className="max-w-4xl">
          <h2 id="why-purple-title" className="font-display text-display-md font-extrabold">
            {whyPurple.heading}
          </h2>
          <p className="mt-6 font-display text-2xl font-semibold text-pm-text-secondary lg:text-display-sm">
            {whyPurple.intro}
          </p>
        </div>

        {/* Red + Blue = Purple */}
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {terms.map((term, i) => (
            <Fragment key={term.name}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="self-center justify-self-center font-display text-display-sm font-extrabold text-pm-text-muted"
                >
                  {i === 1 ? "+" : "="}
                </span>
              )}
              <div className="flex flex-col overflow-hidden rounded-md border border-pm-line bg-pm-surface">
                <span aria-hidden="true" className={`block h-2 ${term.bar}`} />
                <div className="p-6 sm:p-8">
                  <p className={`font-display text-display-sm font-extrabold uppercase ${term.label}`}>{term.name}</p>
                  <p className="mt-3 text-lg text-pm-text-secondary">{term.text}</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        {/* The gap, and the place we are building */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-xl text-pm-text-secondary">{whyPurple.gap}</p>
            <p className="mt-4 font-display text-display-sm font-extrabold text-pm-accent">{whyPurple.aim}</p>
          </div>
          <ul className="space-y-4 lg:col-span-7">
            {whyPurple.places.map((place) => (
              <li key={place} className="flex gap-4 border-b border-pm-line pb-4 text-xl font-semibold">
                <CheckIcon className="mt-1 size-6 shrink-0 text-pm-accent" />
                <span>{place}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The thought everyone has had */}
        <figure className="mt-20 max-w-5xl">
          <p className="text-xl text-pm-text-secondary">{whyPurple.thought}</p>
          <blockquote className="mt-4 font-display text-display-md font-extrabold text-balance">
            <p>“{whyPurple.quote}”</p>
          </blockquote>
          <figcaption className="mt-6 font-display text-display-sm font-extrabold text-pm-accent">
            {whyPurple.promise}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
