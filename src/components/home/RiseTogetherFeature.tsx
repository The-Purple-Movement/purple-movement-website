import { riseTogether } from "@/content/site";
import { ExternalLink, buttonClass } from "@/components/ui/links";
import { CalendarIcon, PinIcon } from "@/components/ui/icons";

const brings = ["Government", "Industry", "Academia", "Startups", "Communities", "Young people"];

/** Featured upcoming activity, placed directly after the hero. All actions lead to the event's own site. */
export function RiseTogetherFeature() {
  return (
    <section id="rise-together" aria-labelledby="rise-together-title" className="bg-pm-tint py-16 sm:py-24">
      <div className="pm-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="pm-eyebrow">Upcoming · Connected initiative</p>
          <h2 id="rise-together-title" className="mt-3 font-display text-display-md font-extrabold text-balance">
            Upcoming: Rise Together 2026
          </h2>
          <p className="mt-6 font-display text-2xl font-bold text-pm-accent-strong text-balance">
            We already have more than we realise. It’s time to build together.
          </p>
          <p className="mt-6 max-w-2xl text-pm-text-secondary">
            Convened by The Purple Movement, Rise Together 2026 moves from conversations to collective action with
            purpose. It brings people together to connect the capabilities that already exist into practical,
            collaborative pilots — then follows that work through reviews at 30, 90 and 180 days.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Who takes part">
            {brings.map((group) => (
              <li key={group} className="rounded-sm border border-pm-line-strong px-3 py-1 text-pm-text-secondary">
                {group}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ExternalLink href={riseTogether.registerUrl} className={buttonClass("primary")}>
              Join the Gathering
            </ExternalLink>
            <ExternalLink href={riseTogether.collaborateUrl} className={buttonClass("secondary")}>
              Propose a Collaboration
            </ExternalLink>
          </div>
          <p className="mt-6 text-pm-text-muted">
            These links open <span className="text-pm-text-secondary">risetogether2026.com</span>, the event’s own
            site.{" "}
            <ExternalLink href={riseTogether.url} className="inline-flex min-h-11 items-center gap-1 font-semibold text-pm-accent-strong underline underline-offset-4">
              Explore Rise Together 2026
            </ExternalLink>
          </p>
        </div>

        <aside aria-label="Event details" className="lg:col-span-5">
          <dl className="divide-y divide-pm-line border-y border-pm-line">
            <div className="flex gap-4 py-5">
              <dt>
                <CalendarIcon className="mt-1 size-6 text-pm-accent" />
                <span className="sr-only">Date</span>
              </dt>
              <dd>
                <time dateTime={riseTogether.date} className="block font-display text-2xl font-bold">
                  {riseTogether.dateLabel}
                </time>
                <span className="text-pm-text-muted">Timings to be announced · IST (UTC+05:30)</span>
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt>
                <PinIcon className="mt-1 size-6 text-pm-accent" />
                <span className="sr-only">Venue</span>
              </dt>
              <dd>
                <span className="block font-display text-xl font-bold">{riseTogether.venue}</span>
                <span className="text-pm-text-muted">{riseTogether.city}</span>
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <h3 className="font-display text-lg font-bold">Every pilot is followed up</h3>
            <ol className="mt-4 grid grid-cols-3 gap-2" aria-label="Review points after the gathering">
              {["30", "90", "180"].map((day) => (
                <li key={day} className="border-t-2 border-pm-accent pt-3">
                  <span className="block font-display text-display-sm font-extrabold">{day}</span>
                  <span className="text-pm-text-muted">day review</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
