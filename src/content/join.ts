/**
 * Participation paths and join-form options.
 *
 * `id` values and role `value` strings are stored in Supabase (`join_applications.selected_role`
 * and `.defining_category`). Keep them stable so existing records stay comparable; change `label`
 * to adjust what visitors see.
 */

export type JoinPathId = "individual" | "organization" | "government";

export interface JoinPath {
  id: JoinPathId;
  title: string;
  icon: string;
  audience: string;
  contribution: string;
  nextStep: string;
  action: string;
  /** Options for "Which best describes you?" */
  roles: { value: string; label: string }[];
  /** Prompts shown beside the contribution field. */
  examples: string[];
}

export const joinPaths: JoinPath[] = [
  {
    id: "individual",
    title: "Individual",
    icon: "/svgs/ind.svg",
    audience: "Students, creators, entrepreneurs and professionals.",
    contribution: "Bring your skills, time, ideas or mentorship to activities and projects.",
    nextStep: "Tell us what you can contribute. You’ll get the link to the community WhatsApp group straight away.",
    action: "Join as an individual",
    roles: [
      { value: "Student", label: "Student" },
      { value: "Creator / Entrepreneur ", label: "Creator or entrepreneur" },
      {
        value: "Enthusiast / Professional mentoring, volunteering, or supporting initiatives",
        label: "Professional — mentoring, volunteering or supporting initiatives",
      },
      { value: "Other", label: "Other" },
    ],
    examples: [
      "Run a session on a skill you use at work",
      "Mentor a student project for a few weeks",
      "Help organise a campus chapter",
    ],
  },
  {
    id: "organization",
    title: "Organization",
    icon: "/svgs/org.svg",
    audience: "Nonprofits, startups, companies, universities and research labs.",
    contribution: "Offer real challenges, expertise, venues or people — and co-run sessions or pilots.",
    nextStep: "Describe your organisation and what it can offer. The organising team reviews every submission.",
    action: "Partner as an organization",
    roles: [
      { value: "Nonprofit / NGO: Supporting social and community initiatives", label: "Nonprofit or NGO" },
      { value: "Startup / Company: Building and scaling impactful solutions", label: "Startup or company" },
      {
        value: "Educational / Training Institution: Enabling learning and skill development",
        label: "Educational or training institution",
      },
      { value: "Research / Innovation Lab: Driving research and practical solutions", label: "Research or innovation lab" },
      { value: "Other", label: "Other" },
    ],
    examples: [
      "Host a session at your office, as BIMLABS Global did for AEC&B:80",
      "Share a problem your team wants solved",
      "Offer mentors or a pilot partner",
    ],
  },
  {
    id: "government",
    title: "Government",
    icon: "/svgs/gov.svg",
    audience: "Departments, policymakers, public institutions and public-sector enterprises.",
    contribution: "Share public challenges and programmes, and collaborate on pilots with measurable milestones.",
    nextStep: "Tell us about your department or programme. The organising team reviews every submission.",
    action: "Collaborate as government",
    roles: [
      {
        value: "Government Body – Local, state, or national departments supporting initiatives",
        label: "Government body — local, state or national",
      },
      { value: "Policy Maker ", label: "Policymaker" },
      { value: "Government Affiliated Institution ", label: "Government-affiliated institution" },
      {
        value: "Public Sector – State-run companies and enterprises contributing to programs",
        label: "Public-sector enterprise",
      },
      { value: "Other", label: "Other" },
    ],
    examples: [
      "Bring a public challenge to Rise Together 2026",
      "Connect a programme with students and practitioners",
      "Co-design a pilot with a 30, 90 and 180-day review",
    ],
  },
];

export function getJoinPath(id: string | null | undefined): JoinPath | undefined {
  return joinPaths.find((p) => p.id === id);
}

export const JOIN_LIMITS = {
  contributionMin: 10,
  contributionMax: 2000,
  nameMax: 120,
  emailMax: 254,
  linkMax: 500,
} as const;
