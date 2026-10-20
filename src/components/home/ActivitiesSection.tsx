import { partitionActivities } from "@/content/activities";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ActivitiesSection() {
  const { featured, upcoming, past } = partitionActivities();
  const allUpcoming = featured ? [featured, ...upcoming] : upcoming;

  return (
    <section id="activities" aria-labelledby="activities-title" className="bg-pm-surface-alt py-16 sm:py-24">
      <div className="pm-container">
        <SectionHeading
          id="activities-title"
          eyebrow="Activities"
          title="What’s happening, and what has happened"
          intro="Every activity lists its date, time, place and what you can do next. Times are shown in the time zone the organisers published."
        />

        <section aria-labelledby="upcoming-title" className="mt-12">
          <h3 id="upcoming-title" className="font-display text-2xl font-bold">
            Upcoming
          </h3>
          {allUpcoming.length > 0 ? (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allUpcoming.map((activity) => (
                <li key={activity.slug}>
                  <ActivityCard activity={activity} headingLevel="h4" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-pm-text-secondary">
              No upcoming activities are scheduled right now. Join the movement to hear about the next one.
            </p>
          )}
        </section>

        <section aria-labelledby="past-title" className="mt-16">
          <h3 id="past-title" className="font-display text-2xl font-bold">
            Past activities
          </h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((activity) => (
              <li key={activity.slug}>
                <ActivityCard activity={activity} past headingLevel="h4" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
