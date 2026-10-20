/** Practical questions visitors ask before joining. Answers are plain text; links are rendered separately. */

export interface FaqItem {
  id: string;
  question: string;
  answer: string[];
  link?: { label: string; href: string };
}

export const faqs: FaqItem[] = [
  // Original answers from purple-movement.com.
  {
    id: "what",
    question: "What is The Purple Movement?",
    answer: [
      "The Purple Movement is where curious, purpose-driven people come together to explore big ideas, solve real problems, and spark meaningful change. A barrier-free community where your skills actually matter.",
    ],
    link: { label: "See our activities", href: "/#activities" },
  },
  {
    id: "who",
    question: "Who can join?",
    answer: [
      "If you’re driven by purpose, you belong here. No limitations. A place to connect and grow alongside others on the same path.",
    ],
    link: { label: "Choose a participation path", href: "/#join" },
  },
  {
    id: "beyond-syllabus",
    question: "What does 'Beyond Syllabus' mean?",
    answer: [
      "Beyond Syllabus is where learning stops being rigid. It is about picking up real skills, trying new things, and exploring what actually excites you—not just what is written in textbooks.",
    ],
  },
  {
    id: "beyond-gatekeepers",
    question: "What does 'Beyond Gatekeepers' mean?",
    answer: [
      "Beyond Gatekeepers gives everyone a real chance to grow. By lifting each other up, we create a space where anyone with purpose can connect, contribute, and move forward without limitations.",
    ],
  },
  {
    id: "beyond-borders",
    question: "What does 'Beyond Borders' mean?",
    answer: [
      "Beyond Borders is all about breaking limits. It helps people connect, share ideas, and access opportunities without being held back by geography, systems, or labels. It’s a space where ambition isn’t boxed in and you can dream big, build big, and grow beyond boundaries.",
    ],
  },
  {
    id: "contribute",
    question: "How can I contribute?",
    answer: ["Click Join the Movement—that’s all it takes to get started."],
    link: { label: "Join the Movement", href: "/join" },
  },
  // Practical questions about this website.
  {
    id: "after-joining",
    question: "What happens after I submit the join form?",
    answer: [
      "Your submission goes to the organising team, who read every one. You will not receive an automatic confirmation email.",
      "After submitting, you can join the community WhatsApp group straight away for announcements and conversations.",
    ],
  },
  {
    id: "anonymous",
    question: "Can I join without sharing my contact details?",
    answer: [
      "Yes. Choose “Join anonymously” and we will record only your path, role and what you want to contribute. Because we won’t have your contact details, the team won’t be able to reply to you personally.",
    ],
  },
  {
    id: "faya80",
    question: "How is the movement related to FAYA:80?",
    answer: [
      "FAYA:80 was a free monthly technology gathering at Technopark from June 2013 to June 2025. Its final edition, Beyond FAYA:80, closed with a session on The Purple Movement, which carries that culture of open, peer-led learning to more disciplines, institutions and communities.",
    ],
    link: { label: "Read the legacy", href: "/#legacy" },
  },
  {
    id: "data",
    question: "How is my information used?",
    answer: [
      "Only to organise the movement and contact you about it. We don’t sell your information or use advertising trackers.",
    ],
    link: { label: "Read the privacy notice", href: "/privacy" },
  },
];
