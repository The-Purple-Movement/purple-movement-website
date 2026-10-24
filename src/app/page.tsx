import { PageShell } from "@/components/layout/PageShell";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ImpactSection } from "@/components/home/ImpactSection";
import { JoinPaths } from "@/components/home/JoinPaths";
import { LegacySection } from "@/components/home/LegacySection";
import { Manifesto } from "@/components/manifesto/Manifesto";
import { Pillars } from "@/components/home/Pillars";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { WhyPurple } from "@/components/home/WhyPurple";
import { RiseTogetherFeature } from "@/components/home/RiseTogetherFeature";
import { riseTogether, siteUrl } from "@/content/site";

/** Upcoming/past status is derived from today's date, so regenerate the page daily. */
export const revalidate = 86400;

const riseTogetherJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: riseTogether.name,
  startDate: riseTogether.date,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: riseTogether.url,
  description: `${riseTogether.theme}. Government, industry, academia, startups, communities and young people connect existing capabilities into collaborative pilots.`,
  location: {
    "@type": "Place",
    name: riseTogether.venue,
    address: { "@type": "PostalAddress", addressLocality: "Thiruvananthapuram", addressRegion: "Kerala", addressCountry: "IN" },
  },
  organizer: { "@id": `${siteUrl}/#organization` },
};

export default function HomePage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(riseTogetherJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Manifesto variant="home" />
      <WhoWeAre />
      <WhyPurple />
      <Pillars />
      <RiseTogetherFeature />
      <HowItWorks />
      <ActivitiesSection />
      <ImpactSection />
      <JoinPaths />
      <LegacySection />
      <FaqSection />
      <FinalCta />
    </PageShell>
  );
}
