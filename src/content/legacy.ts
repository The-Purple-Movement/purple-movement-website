/**
 * FAYA:80 → The Purple Movement. Sources: fayaport80.com (site, event archive and milestone pages),
 * press coverage collected in the Rise Together research dossier, and risetogether2026.com.
 */

export interface LegacyMilestone {
  date: string;
  /** Machine-readable date for <time>. */
  dateTime: string;
  title: string;
  description: string;
  link?: { label: string; href: string };
}

export const legacyIntro = {
  heading: "Built on twelve years of FAYA:80",
  body: "For twelve years, FAYA:80 created a dependable monthly space for Kerala’s technology community to learn, share and connect. The Purple Movement carries that culture beyond a single event series, opening it to more disciplines, institutions, communities and forms of collective action.",
  /** Shown as a footnote so the organisational relationship is not overstated. */
  note: "FAYA:80 (read “FAYA port 80”) was a free monthly technology session hosted by FAYA Corporation at Technopark, Thiruvananthapuram.",
};

export const legacyMilestones: LegacyMilestone[] = [
  {
    date: "5 June 2013",
    dateTime: "2013-06-05",
    title: "FAYA:80 begins",
    description:
      "A free monthly technology gathering at Technopark connects enthusiasts, professionals, entrepreneurs, developers, institutions and experts through peer learning.",
    link: { label: "Explore the FAYA:80 archive", href: "https://www.fayaport80.com/" },
  },
  {
    date: "July 2017",
    dateTime: "2017-07",
    title: "50th edition: Disrupt Kerala",
    description: "A day-long technology event that also launched FAYA:80 chapters in Kochi and Kozhikode.",
    link: { label: "Disrupt Kerala 2017", href: "https://www.fayaport80.com/disrupt-kerala" },
  },
  {
    date: "February 2023",
    dateTime: "2023-02",
    title: "100th edition: Evolve India",
    description: "The 100th edition, focused on preparing for an unpredictable, AI-shaped future.",
    link: { label: "Evolve India 2023", href: "https://www.fayaport80.com/evolve-india" },
  },
  {
    date: "June 2024",
    dateTime: "2024-06",
    title: "11th anniversary: Transcend India",
    description: "The community marked eleven years with a conclave at Technopark.",
    link: { label: "Transcend India 2024", href: "https://www.fayaport80.com/transcend-india" },
  },
  {
    date: "28 June 2025",
    dateTime: "2025-06-28",
    title: "The final monthly edition: Beyond FAYA:80",
    description:
      "The last monthly edition closed with a session on The Purple Movement. The community then decentralised into domain-focused chapters, and The Purple Movement was set in motion.",
    link: { label: "Beyond FAYA:80", href: "https://www.fayaport80.com/beyond" },
  },
  {
    date: "18 November 2026",
    dateTime: "2026-11-18",
    title: "Next: Rise Together 2026",
    description:
      "Turning years of relationships and shared knowledge into collaborative pilots across government, industry, academia and communities.",
    link: { label: "Explore Rise Together 2026", href: "https://risetogether2026.com/" },
  },
];
