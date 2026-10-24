import type { Metadata } from "next";
import { ogDefaults } from "@/content/site";

const description =
  "Join The Purple Movement as an individual, organization or government partner. Tell us what you’d like to contribute — it takes about three minutes.";

export const metadata: Metadata = {
  title: "Join the Movement",
  description,
  alternates: { canonical: "/join" },
  openGraph: { ...ogDefaults, title: "Join The Purple Movement", description, url: "/join" },
  twitter: { title: "Join The Purple Movement", description },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
