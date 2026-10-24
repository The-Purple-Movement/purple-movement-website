import type { Metadata } from "next";
import { manifestoTitle } from "@/content/manifesto";
import { ogDefaults } from "@/content/site";
import { PageShell } from "@/components/layout/PageShell";
import { Manifesto } from "@/components/manifesto/Manifesto";

const description =
  "We are the Manifestors of Change. Not waiting for the future, but building it with courage, code, creativity, and clarity. The Purple Movement manifesto.";

export const metadata: Metadata = {
  title: "The Manifesto",
  description,
  alternates: { canonical: "/manifesto" },
  openGraph: { ...ogDefaults, title: `${manifestoTitle} — The Purple Movement Manifesto`, description, url: "/manifesto" },
  twitter: { title: "The Purple Movement Manifesto", description },
};

export default function ManifestoPage() {
  return (
    <PageShell>
      <Manifesto variant="page" />
    </PageShell>
  );
}
