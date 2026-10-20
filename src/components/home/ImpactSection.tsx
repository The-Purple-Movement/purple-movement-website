import { impactMetrics, impactProjects, press, publishedOutcome } from "@/content/impact";
import { ExternalLink } from "@/components/ui/links";
import { SectionHeading } from "@/components/ui/SectionHeading";

const linkClass = "inline-flex min-h-11 items-center gap-1.5 font-semibold text-pm-accent-strong underline underline-offset-4";

export function ImpactSection() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="py-16 sm:py-24">
      <div className="pm-container">
        <SectionHeading
          id="impact-title"
          eyebrow="Impact"
          title="Work you can check"
          intro="Projects, published outcomes and coverage — each with a link to the source."
        />

        {impactMetrics.length > 0 && (
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {impactMetrics.map((m) => (
              <div key={m.label} className="flex flex-col border-t-2 border-pm-accent pt-4">
                <dt className="text-pm-text-secondary">{m.label}</dt>
                <dd className="order-first font-display text-display-sm font-extrabold">{m.value}</dd>
                <dd className="text-pm-text-muted">Source: {m.source}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl font-bold">Projects</h3>
            <ul className="mt-4 divide-y divide-pm-line border-y border-pm-line">
              {impactProjects.map((project) => (
                <li key={project.name} className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-display text-xl font-bold">{project.name}</h4>
                    <span className="text-pm-text-muted">{project.status}</span>
                  </div>
                  <p className="mt-2 text-pm-text-secondary">{project.description}</p>
                  <ExternalLink href={project.href} className={`${linkClass} mt-2`}>
                    {project.linkLabel}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-12 lg:col-span-5">
            <div className="rounded-md bg-pm-tint p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold">{publishedOutcome.heading}</h3>
              <p className="mt-3 text-pm-text-secondary">{publishedOutcome.body}</p>
              <p className="mt-3 text-pm-text-secondary">{publishedOutcome.example}</p>
              <ExternalLink href={publishedOutcome.href} className={`${linkClass} mt-3`}>
                {publishedOutcome.linkLabel}
              </ExternalLink>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold">In the press</h3>
              <ul className="mt-4 space-y-4">
                {press.map((item) => (
                  <li key={item.href}>
                    <ExternalLink href={item.href} className="font-semibold hover:text-pm-accent-strong [&>svg]:ml-1.5 [&>svg]:inline [&>svg]:align-baseline">
                      “{item.title}”
                    </ExternalLink>
                    <p className="text-pm-text-muted">
                      {item.outlet} · {item.date} · {item.kind}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
