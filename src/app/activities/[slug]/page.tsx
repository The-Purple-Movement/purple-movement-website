import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  activities,
  formatActivityDate,
  formatActivityLocation,
  formatActivityTime,
  getActivity,
  isUpcoming,
  modeLabel,
} from "@/content/activities";
import { absoluteUrl, ogDefaults, siteUrl } from "@/content/site";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink, ExternalLink, buttonClass } from "@/components/ui/links";
import { ArrowLeftIcon } from "@/components/ui/icons";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = getActivity((await params).slug);
  if (!activity) return {};
  const description = `${formatActivityDate(activity)} · ${formatActivityLocation(activity)}. ${activity.summary}`;
  return {
    title: activity.title,
    description,
    alternates: { canonical: `/activities/${activity.slug}` },
    openGraph: {
      ...ogDefaults,
      title: activity.title,
      description,
      url: `/activities/${activity.slug}`,
      ...(activity.image && {
        images: [{ url: activity.image.src, width: activity.image.width, height: activity.image.height, alt: activity.image.alt }],
      }),
    },
  };
}

const attendanceMode = {
  "in-person": "https://schema.org/OfflineEventAttendanceMode",
  online: "https://schema.org/OnlineEventAttendanceMode",
  hybrid: "https://schema.org/MixedEventAttendanceMode",
} as const;

export default async function ActivityPage({ params }: Props) {
  const activity = getActivity((await params).slug);
  if (!activity) notFound();

  const past = !isUpcoming(activity);
  const location = formatActivityLocation(activity);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: activity.title,
    startDate: activity.startDate,
    ...(activity.endDate && { endDate: activity.endDate }),
    description: activity.summary,
    url: absoluteUrl(`/activities/${activity.slug}`),
    eventStatus: "https://schema.org/EventScheduled",
    ...(activity.mode !== "to-be-announced" && { eventAttendanceMode: attendanceMode[activity.mode] }),
    ...(activity.location && { location: { "@type": "Place", name: activity.location } }),
    ...(activity.image && { image: absoluteUrl(activity.image.src) }),
    organizer: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article className="pm-container py-10 sm:py-16">
        <Link
          href="/#activities"
          className="inline-flex min-h-12 items-center gap-2 font-semibold text-pm-accent-strong hover:text-pm-text"
        >
          <ArrowLeftIcon />
          All activities
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="pm-eyebrow">
              {past ? "Past activity" : "Upcoming activity"}
              {activity.series ? ` · ${activity.series}` : ""}
            </p>
            <h1 className="mt-3 font-display text-display-md font-extrabold text-balance">{activity.title}</h1>

            <dl className="mt-8 grid gap-x-8 gap-y-5 border-y border-pm-line py-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-pm-text-muted">Date</dt>
                <dd className="mt-1 font-display text-xl font-bold">
                  <time dateTime={activity.startDate}>{formatActivityDate(activity)}</time>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-pm-text-muted">Time</dt>
                <dd className="mt-1">{formatActivityTime(activity, past)}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-pm-text-muted">Where</dt>
                <dd className="mt-1">{location}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-pm-text-muted">Format</dt>
                <dd className="mt-1">{modeLabel[activity.mode]}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-semibold uppercase tracking-wider text-pm-text-muted">
                  {past ? "Status" : "Registration"}
                </dt>
                <dd className="mt-1 font-semibold">{activity.registration}</dd>
              </div>
            </dl>

            <div className="mt-8 space-y-4 text-pm-text-secondary">
              <p className="text-lg text-pm-text">{activity.summary}</p>
              {activity.details?.map((d) => <p key={d}>{d}</p>)}
            </div>

            {activity.people && activity.people.length > 0 && (
              <section aria-labelledby="people-title" className="mt-10">
                <h2 id="people-title" className="font-display text-2xl font-bold">
                  {activity.people.length > 1 ? "Speakers" : "Speaker"}
                </h2>
                <ul className="mt-3 space-y-1 text-pm-text-secondary">
                  {activity.people.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </section>
            )}

            {activity.partners && activity.partners.length > 0 && (
              <section aria-labelledby="partners-title" className="mt-10">
                <h2 id="partners-title" className="font-display text-2xl font-bold">
                  With
                </h2>
                <p className="mt-3 text-pm-text-secondary">{activity.partners.join(" · ")}</p>
              </section>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {activity.externalLink && (
                <ExternalLink href={activity.externalLink.href} className={buttonClass(past ? "secondary" : "primary")}>
                  {activity.externalLink.label}
                </ExternalLink>
              )}
              <ButtonLink href="/join" variant={activity.externalLink && !past ? "secondary" : "primary"}>
                Join the Movement
              </ButtonLink>
            </div>

            <p className="mt-10 text-pm-text-muted">Source: {activity.source}.</p>
          </div>

          {activity.image && (
            <div className="lg:col-span-5">
              <Image
                src={activity.image.src}
                alt={activity.image.alt}
                width={activity.image.width}
                height={activity.image.height}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full rounded-lg border border-pm-line"
              />
            </div>
          )}
        </div>
      </article>
    </PageShell>
  );
}
