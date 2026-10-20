/**
 * Evidence of work, not aspiration. Every item links to where it can be checked.
 * Add verified numbers to `impactMetrics`; the section shows nothing for an empty list,
 * so placeholders never reach the page.
 */

export interface ImpactMetric {
  value: string;
  label: string;
  /** Who reported the figure and when, e.g. "Organising team, October 2026". */
  source: string;
}

export interface ImpactProject {
  name: string;
  description: string;
  status: string;
  href: string;
  linkLabel: string;
}

export interface PressItem {
  outlet: string;
  title: string;
  date: string;
  href: string;
  /** Label paid/partner placements honestly. */
  kind: "Independent" | "Partner content";
}

export const impactMetrics: ImpactMetric[] = [];

export const impactProjects: ImpactProject[] = [
  {
    name: "Beyond Syllabus learning guide",
    description:
      "A platform that breaks university syllabi into structured topics and learning paths, with AI-assisted study guides. Built in the open, with community contributions.",
    status: "Live · open source",
    href: "https://wiki-syllabus.vercel.app/",
    linkLabel: "Open the learning guide",
  },
  {
    name: "Capability Commons",
    description:
      "The public archive of the Beyond Syllabus journey. Every conversation leaves evidence, organised into twelve themes from curriculum to the future of work.",
    status: "Live · updated through January 2027",
    href: "https://capabilitycommons.com/",
    linkLabel: "Browse the archive",
  },
  {
    name: "AI + Compassion Global Forum",
    description:
      "A 24-hour relay across 12 world regions on how AI can serve people and the planet, opened and closed in Kyoto.",
    status: "Held 2–3 October 2026",
    href: "https://compassionai.io/",
    linkLabel: "Visit the forum site",
  },
];

/** A published, checkable outcome from the Bridge The Gap series behind Beyond Syllabus. */
export const publishedOutcome = {
  heading: "Published outcomes, with their status",
  body: "Bridge The Gap, the symposium series behind Beyond Syllabus, keeps a public ledger of the interventions its discussions produced. As recorded by the organising team, 16 are in motion and 3 have been adopted.",
  example:
    "One adopted change: Kerala Technological University revised its B.Tech internship norms (U.O. No. 3068/2023/KTU) so students can take a four-to-six-month internship in the eighth semester without a break in study.",
  href: "https://capabilitycommons.com/interventions",
  linkLabel: "Read the intervention ledger",
};

export const press: PressItem[] = [
  {
    outlet: "Kerala Technology",
    title: "A dusk and dawn at FAYA:80",
    date: "1 July 2025",
    href: "https://keralatechnology.com/blog/a-dusk-and-dawn-at-faya-80",
    kind: "Independent",
  },
  {
    outlet: "Oneindia",
    title: "The Purple Movement: where purpose is found through people",
    date: "19 August 2025",
    href: "https://www.oneindia.com/partner-content/the-purple-movement-where-purpose-is-found-through-people-7834153.html",
    kind: "Partner content",
  },
];
