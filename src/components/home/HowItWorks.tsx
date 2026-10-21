import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { title: "Discover", body: "Find activities and real challenges — campus sessions, domain chapters, symposiums and pilots." },
  { title: "Contribute", body: "Offer what you have: skills, ideas, time, access to people or places, or mentorship." },
  { title: "Collaborate", body: "Work across institutions and communities, with students and professionals side by side." },
  { title: "Carry it forward", body: "Publish what happened and keep the work that works going — with reviews, not just applause." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="py-16 sm:py-24">
      <div className="pm-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="how-it-works-title"
            eyebrow="How it works"
            title="How the movement works"
          />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-md border border-pm-line bg-pm-line sm:grid-cols-2 lg:col-span-7">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-pm-bg p-6 sm:p-8">
              <span className="font-display text-display-sm font-extrabold text-pm-accent" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-pm-text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
