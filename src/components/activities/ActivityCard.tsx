import Image from "next/image";
import Link from "next/link";
import {
  type Activity,
  formatActivityDate,
  formatActivityLocation,
  formatActivityTime,
  modeLabel,
} from "@/content/activities";
import { ArrowRightIcon, CalendarIcon, ClockIcon, PinIcon } from "@/components/ui/icons";

interface ActivityCardProps {
  activity: Activity;
  past?: boolean;
  /** Heading level for the title, so the card fits the surrounding outline. */
  headingLevel?: "h3" | "h4";
}

/**
 * One activity, with every practical detail outside the poster. The whole card is clickable through a
 * single stretched link (no nested interactive elements); the link text stays visible for clarity.
 */
export function ActivityCard({ activity, past = false, headingLevel: Heading = "h3" }: ActivityCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-pm-line bg-pm-surface transition-colors hover:border-pm-accent has-focus-visible:border-pm-accent-strong">
      {activity.image && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-pm-line bg-pm-field">
          <Image
            src={activity.image.src}
            alt={activity.image.alt}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {activity.featured && (
            <span className="rounded-sm bg-pm-purple-600 px-2 py-0.5 font-display font-bold text-pm-on-accent">Featured</span>
          )}
          <span className="rounded-sm border border-pm-line-strong px-2 py-0.5 text-pm-text-secondary">
            {modeLabel[activity.mode]}
          </span>
        </div>
        {activity.series && <p className="mt-3 font-semibold text-pm-accent">{activity.series}</p>}
        <Heading className="mt-1 font-display text-xl font-bold text-balance">{activity.title}</Heading>

        <dl className="mt-4 space-y-2 text-base text-pm-text-secondary">
          <div className="flex gap-3">
            <dt>
              <CalendarIcon className="mt-1 size-5 text-pm-text-muted" />
              <span className="sr-only">Date</span>
            </dt>
            <dd>
              <time dateTime={activity.startDate}>{formatActivityDate(activity)}</time>
            </dd>
          </div>
          <div className="flex gap-3">
            <dt>
              <ClockIcon className="mt-1 size-5 text-pm-text-muted" />
              <span className="sr-only">Time</span>
            </dt>
            <dd>{formatActivityTime(activity, past)}</dd>
          </div>
          <div className="flex gap-3">
            <dt>
              <PinIcon className="mt-1 size-5 text-pm-text-muted" />
              <span className="sr-only">Location</span>
            </dt>
            <dd>{formatActivityLocation(activity)}</dd>
          </div>
        </dl>

        <p className="mt-4 text-pm-text-secondary">{activity.summary}</p>
        <p className="mt-4 font-semibold text-pm-text">{activity.registration}</p>

        <Link
          href={`/activities/${activity.slug}`}
          className="pm-stretched-link mt-auto inline-flex min-h-12 items-center gap-2 pt-4 font-display font-bold text-pm-accent-strong group-hover:text-pm-text"
        >
          {past ? "View details" : "Details and registration"}
          <span className="sr-only">: {activity.title}</span>
          <ArrowRightIcon className="size-5" />
        </Link>
      </div>
    </article>
  );
}
