import { legacyIntro, legacyMilestones } from "@/content/legacy";
import { fayaArchive } from "@/content/site";
import { ExternalLink, buttonClass } from "@/components/ui/links";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LegacySection() {
  return (
    <section id="legacy" aria-labelledby="legacy-title" className="bg-pm-bg py-16 sm:py-24">
      <div className="pm-container grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-[calc(var(--pm-header-height)+2rem)] lg:col-span-5 lg:self-start">
          <SectionHeading
            id="legacy-title"
            eyebrow="Legacy · From FAYA:80 to the Purple Movement"
            title={legacyIntro.heading}
            intro={<p>{legacyIntro.body}</p>}
          />
          <div className="mt-8 flex flex-col items-start gap-3">
            <ExternalLink href={fayaArchive.url} className={buttonClass("secondary")}>
              Explore the FAYA:80 archive
            </ExternalLink>
            <ExternalLink href={fayaArchive.beyondUrl} className={buttonClass("quiet")}>
              Beyond FAYA:80
            </ExternalLink>
          </div>
          <p className="mt-6 text-pm-text-muted">{legacyIntro.note}</p>
        </div>

        <ol className="relative lg:col-span-7" aria-label="Milestones">
          {legacyMilestones.map((m, index) => {
            const isNext = index === legacyMilestones.length - 1;
            return (
              <li key={m.title} className="relative border-l-2 border-pm-line pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-2.25 top-1.5 size-4 rounded-full border-2 ${
                    isNext ? "border-pm-accent-strong bg-pm-purple-600" : "border-pm-accent bg-pm-bg"
                  }`}
                />
                <time dateTime={m.dateTime} className="font-display text-sm font-bold uppercase tracking-wider text-pm-accent">
                  {m.date}
                </time>
                <h3 className="mt-1 font-display text-xl font-bold">{m.title}</h3>
                <p className="mt-2 text-pm-text-secondary">{m.description}</p>
                {m.link && (
                  <ExternalLink
                    href={m.link.href}
                    className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-semibold text-pm-accent-strong underline underline-offset-4"
                  >
                    {m.link.label}
                  </ExternalLink>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
