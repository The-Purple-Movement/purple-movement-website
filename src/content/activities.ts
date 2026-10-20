/**
 * Activities shown on the homepage and at /activities/[slug].
 *
 * Rules for editing:
 * - Only publish facts from an approved source (the event's own poster or site). Note the source.
 * - Unknown values are `null` and render as "to be announced" / "not published" — never guess.
 * - Status (upcoming/past) is derived from the dates, so nothing needs changing after an event.
 */

export type ActivityMode = "in-person" | "online" | "hybrid" | "to-be-announced";

export interface ActivityLink {
  label: string;
  href: string;
}

export interface ActivityImage {
  src: string;
  width: number;
  height: number;
  /** Describes the poster's information, not its decoration. */
  alt: string;
}

export interface Activity {
  slug: string;
  title: string;
  /** Series or programme the activity belongs to. */
  series: string | null;
  /** First (or only) day, ISO yyyy-mm-dd, local to the event. */
  startDate: string;
  /** Last day for multi-day activities. */
  endDate?: string;
  /** Human-readable time range, or null when not published. */
  time: string | null;
  /** Time zone label, or null when the source does not state one. */
  timeZone: string | null;
  mode: ActivityMode;
  /** Venue/online description, or null when not yet announced. */
  location: string | null;
  summary: string;
  /** Longer description for the detail page. */
  details?: string[];
  people?: string[];
  partners?: string[];
  /** Registration or participation status as published. */
  registration: string;
  /** Primary external action (registration or the event's own page). */
  externalLink?: ActivityLink;
  image?: ActivityImage;
  featured?: boolean;
  /** Where the facts came from — for maintainers, also shown on the detail page. */
  source: string;
}

export const activities: Activity[] = [
  {
    slug: "rise-together-2026",
    title: "Rise Together 2026",
    series: "Convened by The Purple Movement",
    startDate: "2026-11-18",
    time: null,
    timeZone: "IST (UTC+05:30)",
    mode: "in-person",
    location: "Park Centre, Technopark Phase 1, Thiruvananthapuram, Kerala",
    summary:
      "A one-day gathering that brings government, industry, academia, startups, communities and young people together to connect existing capabilities into practical collaborative pilots.",
    details: [
      "Theme: from conversations to collective action with purpose.",
      "Shared challenges meet existing capabilities and become practical collaborative pilots with participating institutions.",
      "Each pilot has a defined objective, contributing partners, a coordinating team and measurable milestones, reviewed at 30, 90 and 180 days.",
    ],
    registration: "Registration open on risetogether2026.com",
    externalLink: { label: "Join the Gathering", href: "https://risetogether2026.com/gathering#register" },
    featured: true,
    source: "risetogether2026.com (event site; timings to be confirmed by the organisers)",
  },
  {
    slug: "beyond-syllabus-convergence-2026",
    title: "Beyond Syllabus: Stakeholder Convergence",
    series: "Bridge The Gap 4.0 · Beyond Syllabus",
    startDate: "2026-11-14",
    time: null,
    timeZone: "IST (UTC+05:30)",
    mode: "in-person",
    location: "Kerala, India — venue to be announced",
    summary:
      "The “Build” stage of the six-month Beyond Syllabus journey: every stakeholder group meets in one room to ask what we can actually build. The first real prototypes are selected here.",
    registration: "Participation through the Beyond Syllabus programme site",
    externalLink: { label: "See the Beyond Syllabus journey", href: "https://capabilitycommons.com/journey" },
    source: "capabilitycommons.com/journey and /prototypes",
  },
  {
    slug: "beyond-syllabus-act-2026",
    title: "Beyond Syllabus: Act — The Global Action Network",
    series: "Bridge The Gap 4.0 · Beyond Syllabus",
    startDate: "2026-12-10",
    time: null,
    timeZone: null,
    mode: "to-be-announced",
    location: null,
    summary:
      "On Human Rights Day, the “Act” stage asks the Global Action Network: what have we built together?",
    registration: "Details to be announced on the programme site",
    externalLink: { label: "See the Beyond Syllabus journey", href: "https://capabilitycommons.com/journey" },
    source: "capabilitycommons.com/journey",
  },
  {
    slug: "beyond-syllabus-deliver-2027",
    title: "Beyond Syllabus: Deliver",
    series: "Bridge The Gap 4.0 · Beyond Syllabus",
    startDate: "2027-01-26",
    time: null,
    timeZone: null,
    mode: "to-be-announced",
    location: null,
    summary:
      "On Republic Day, the journey closes by handing its work to decision makers, including the relevant Union Ministry: what will you carry forward?",
    registration: "Details to be announced on the programme site",
    externalLink: { label: "See the Beyond Syllabus journey", href: "https://capabilitycommons.com/journey" },
    source: "capabilitycommons.com/journey",
  },
  {
    slug: "ai-compassion-global-forum-2026",
    title: "AI + Compassion Global Forum 2026",
    series: "AI + Compassion · Kyoto & Global Relay",
    startDate: "2026-10-02",
    endDate: "2026-10-03",
    time: "24-hour relay starting 06:00 UTC (15:00 in Kyoto)",
    timeZone: "UTC",
    mode: "hybrid",
    location: "Kyoto, Japan, and online across 12 world regions",
    summary:
      "A 24-hour global conversation on how artificial intelligence can serve humanity and the planet, relayed across 12 world regions from an opening and closing ceremony in Kyoto.",
    details: [
      "The relay ran like an Olympic torch: an opening, 12 regional blocks of two hours each, and a Kyoto homecoming — 14 stages in all — with each region passing the broadcast westward to the next time zone.",
      "Innovators, researchers, policymakers and cultural leaders discussed how to centre empathy, compassion, human dignity and ecological wisdom in artificial intelligence.",
      "Themes included harmony across systems, education for co-flourishing, and trust and accountability in AI. The forum was conducted in English, with some regional segments in local languages with English subtitles.",
      "The Kyoto closing ceremony drew on the Japanese concept of Wa (harmony) to turn the shared vision into long-term projects.",
    ],
    registration: "Held 2–3 October 2026",
    externalLink: { label: "Visit the forum site", href: "https://compassionai.io/" },
    image: {
      src: "/images/aic.webp",
      width: 1122,
      height: 1402,
      alt: "Poster: AI + Compassion Global Relay 2026, October 2–3 — 24 hours, 12 regions, 1 mission.",
    },
    source: "compassionai.io (forum site and programme) and the event poster",
  },
  {
    slug: "ai-compassion-global-forum-2025",
    title: "AI + Compassion Global Forum 2025",
    series: "AI + Compassion · Inaugural edition",
    startDate: "2025-10-02",
    time: null,
    timeZone: null,
    mode: "hybrid",
    location: "USA Pavilion, Expo 2025 Osaka; closing ceremony in Kyoto; relayed online worldwide",
    summary:
      "The first AI + Compassion Global Relay: a small, high-trust assembly in Osaka, a 24-hour relay around the world, and a closing ceremony in Kyoto connecting ancient wisdom with future innovation.",
    details: [
      "The forum drew inspiration from the architectural and philosophical foundations of Expo 2025 Osaka.",
      "More than 30 sessions from the relay — keynote dialogues and regional insights — are in the 2025 edition archive.",
    ],
    registration: "Held 2 October 2025",
    externalLink: { label: "Visit the 2025 edition archive", href: "https://2025.compassionai.io/" },
    source: "2025.compassionai.io (2025 edition site) and compassionai.io (2025 highlights)",
  },
  {
    slug: "beyond-syllabus-session-2-2026",
    title: "Beyond Syllabus Session 2: Academicians & Policy Makers",
    series: "Bridge The Gap 4.0 · Beyond Syllabus",
    startDate: "2026-09-05",
    time: "6:00–8:00 PM",
    timeZone: null,
    mode: "online",
    location: "Online live session",
    summary:
      "The “Question” stage of the journey: academics and policymakers on what education should become. “Let's move beyond awareness. Let's build alternatives together.”",
    registration: "Held 5 September 2026 (livestream)",
    externalLink: { label: "See the Beyond Syllabus journey", href: "https://capabilitycommons.com/journey" },
    image: {
      src: "/images/beyondsylabbus.webp",
      width: 1122,
      height: 1402,
      alt: "Poster: Bridge The Gap 4.0, Beyond Syllabus — a symposium for the future of education. Session 2, Academicians and Policy Makers, Saturday 5 September 2026, 6 to 8 PM, online live session.",
    },
    source: "Event poster and capabilitycommons.com/journey",
  },
  {
    slug: "beyond-syllabus-session-1-2026",
    title: "Beyond Syllabus Session 1: Listen",
    series: "Bridge The Gap 4.0 · Beyond Syllabus",
    startDate: "2026-08-15",
    time: null,
    timeZone: null,
    mode: "online",
    location: "Streamed live",
    summary:
      "The journey opened by listening: students and student communities on what needs to change in education.",
    registration: "Held 15 August 2026",
    externalLink: { label: "See the Beyond Syllabus journey", href: "https://capabilitycommons.com/journey" },
    source: "capabilitycommons.com/journey",
  },
  {
    slug: "aecb80-digital-construction-2025",
    title: "Digital Construction: The New Language of Construction Management",
    series: "AEC&B:80 — Architecture, Engineering, Construction & Beyond",
    startDate: "2025-09-28",
    time: "5:00 PM",
    timeZone: "IST (UTC+05:30)",
    mode: "in-person",
    location: "BIMLABS Global, Manjalikulam Road, Thampanoor, Thiruvananthapuram",
    summary: "A session on how digital tools are changing the way construction projects are managed.",
    people: ["Shiju Sasidharan, Founder & Director, BIMLABS Global"],
    partners: ["BIMLABS Global", "Nubright"],
    registration: "Held 28 September 2025",
    image: {
      src: "/images/p80-3.webp",
      width: 720,
      height: 900,
      alt: "Poster: AEC&B:80, Digital Construction — New Language of Construction Management, with Shiju Sasidharan, Founder and Director of BIMLABS Global. 28 September 2025, 5 PM, BIMLABS Global, Thampanoor, Thiruvananthapuram.",
    },
    source: "Event poster",
  },
  {
    slug: "prn80-ui-ux-2025",
    title: "Exploring UI/UX & Beyond",
    series: "PRN:80 — Wisdom beyond walls",
    startDate: "2025-09-27",
    time: "10:00 AM – 12:00 PM",
    timeZone: "IST (UTC+05:30)",
    mode: "in-person",
    location: "College of Engineering Perumon, Kollam",
    summary: "A campus session on user interface and user experience design.",
    people: ["Deepak S Murugesan, User Experience Designer, Reflections Info Systems"],
    partners: ["μLearn PRN"],
    registration: "Held 27 September 2025",
    image: {
      src: "/images/p80-5.webp",
      width: 1440,
      height: 1920,
      alt: "Poster: PRN:80, Exploring UI/UX and Beyond, with Deepak S Murugesan, User Experience Designer at Reflections Info Systems. Saturday 27 September 2025, 10 AM to 12 PM, College of Engineering Perumon, Kollam.",
    },
    source: "Event poster",
  },
  {
    slug: "aecb80-blueprint-to-reality-2025",
    title: "From Blueprint to Reality: Mastering Effective Infrastructure Project Handling",
    series: "AEC&B:80 — Architecture, Engineering, Construction & Beyond",
    startDate: "2025-09-25",
    time: "5:00 PM",
    timeZone: "IST (UTC+05:30)",
    mode: "in-person",
    location: "BIMLABS Global, Thampanoor, Thiruvananthapuram",
    summary: "A practitioner session on handling infrastructure projects from design to delivery. Certificates were provided.",
    people: ["Adarsh M S, Senior BIM Application Engineer, BIMLABS Global"],
    partners: ["BIMLABS Global", "Nubright"],
    registration: "Held 25 September 2025",
    image: {
      src: "/images/p80-4.webp",
      width: 720,
      height: 720,
      alt: "Poster: AEC&B:80, From Blueprint to Reality — Mastering Effective Infrastructure Project Handling, with Adarsh M S, Senior BIM Application Engineer at BIMLABS Global. 25 September 2025, 5 PM, BIMLABS Global, Thampanoor.",
    },
    source: "Event poster",
  },
  {
    slug: "prn80-cybersecurity-2025",
    title: "Exploring Cybersecurity & Beyond",
    series: "PRN:80 — Wisdom beyond walls",
    startDate: "2025-08-23",
    time: "10:00 AM – 12:00 PM",
    timeZone: "IST (UTC+05:30)",
    mode: "in-person",
    location: "College of Engineering Perumon, Kollam",
    summary: "A campus session introducing careers and practice in cybersecurity.",
    people: ["Akshaya P, Cybersecurity Analyst, EYGDS", "Binil V B, Cybersecurity Analyst, EYGDS"],
    partners: ["μLearn PRN"],
    registration: "Held 23 August 2025",
    image: {
      src: "/images/p80-1.webp",
      width: 1440,
      height: 1920,
      alt: "Poster: PRN:80, Exploring Cybersecurity and Beyond, with cybersecurity analysts Akshaya P and Binil V B of EYGDS. Saturday 23 August 2025, 10 AM to 12 PM, College of Engineering Perumon.",
    },
    source: "Event poster",
  },
  {
    slug: "sti80-beyond-the-screen-2025",
    title: "Beyond the Screen: Designing What Users Feel",
    series: "STI:80 — Wisdom beyond walls",
    startDate: "2025-08-22",
    time: null,
    timeZone: "IST (UTC+05:30)",
    mode: "in-person",
    location: "Muspace, St. Thomas Institute for Science and Technology (STIST)",
    summary: "A design session on creating experiences people feel, not just interfaces they see. Entry was free.",
    people: ["Edwin Emmanuel Roy, UX Design Intern, Innovinlabs"],
    partners: ["μLearn STI", "St. Thomas Institute for Science and Technology"],
    registration: "Held 22 August 2025",
    image: {
      src: "/images/p80-2.webp",
      width: 1152,
      height: 1440,
      alt: "Poster: STI:80, Beyond the Screen — designing what users feel, not just what they see, with Edwin Emmanuel Roy, UX Design Intern at Innovinlabs. 22 August 2025, Muspace, STIST. Free tickets.",
    },
    source: "Event poster",
  },
];

/**
 * Activities shown on the previous site whose posters carry no date or venue.
 * They are not published until the organising team supplies those details.
 */
export const awaitingDetails = [
  { name: "Saddle Up — Edition #1 (“The Creative Ride Begins”)", image: "/images/saddle.webp", missing: ["date", "time", "location"] },
  { name: "Saddle Up — Edition #2 (“Redesign with Imagination”)", image: "/images/saddle2.webp", missing: ["date", "time", "location"] },
  { name: "Enter the Flow", image: "/images/flow.webp", missing: ["date", "time", "location", "description"] },
  { name: "μLearn × Hacktoberfest Playlist (with Inovus Labs IEDC and μLearn SCTCE)", image: "/images/hkbr.webp", missing: ["date", "time", "location"] },
] as const;

/** Returns today's date as yyyy-mm-dd in India time, the organisers' home time zone. */
export function todayInIndia(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

export function isUpcoming(activity: Activity, today: string = todayInIndia()): boolean {
  return (activity.endDate ?? activity.startDate) >= today;
}

export function getActivity(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

export function partitionActivities(today: string = todayInIndia()) {
  const upcoming = activities
    .filter((a) => isUpcoming(a, today))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = activities
    .filter((a) => !isUpcoming(a, today))
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  const featured = upcoming.find((a) => a.featured) ?? null;
  return { featured, upcoming: upcoming.filter((a) => a !== featured), past };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "18 November 2026" or "2–3 October 2026". Dates are calendar dates, formatted in UTC to avoid shifts. */
export function formatActivityDate(activity: Pick<Activity, "startDate" | "endDate">): string {
  const start = new Date(`${activity.startDate}T00:00:00Z`);
  if (!activity.endDate) return dateFormat.format(start);
  const end = new Date(`${activity.endDate}T00:00:00Z`);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  if (sameMonth) return `${start.getUTCDate()}–${dateFormat.format(end)}`;
  return `${dateFormat.format(start)} – ${dateFormat.format(end)}`;
}

export function formatActivityTime(activity: Pick<Activity, "time" | "timeZone">, past = false): string {
  if (!activity.time) {
    const missing = past ? "Time not published" : "Time to be announced";
    return activity.timeZone ? `${missing} · ${activity.timeZone}` : missing;
  }
  return activity.timeZone ? `${activity.time} · ${activity.timeZone}` : `${activity.time} · time zone not published`;
}

export function formatActivityLocation(activity: Pick<Activity, "location" | "mode">): string {
  if (activity.location) return activity.location;
  return activity.mode === "online" ? "Online — link to be announced" : "Location to be announced";
}

export const modeLabel: Record<ActivityMode, string> = {
  "in-person": "In person",
  online: "Online",
  hybrid: "In person and online",
  "to-be-announced": "Format to be announced",
};
