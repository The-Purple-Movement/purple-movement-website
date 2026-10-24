import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { ogDefaults } from "@/content/site";

/*
 * DRAFT FOR OWNER AND LEGAL REVIEW. Plain-language terms of use for an informational website with three
 * public forms. Open items: the legal entity name, governing law and jurisdiction, and a contact address.
 */

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms for using purple-movement.com and submitting forms to The Purple Movement.",
  alternates: { canonical: "/terms" },
  openGraph: { ...ogDefaults, title: "Terms of use · The Purple Movement", url: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated={{ label: "20 October 2026", dateTime: "2026-10-20" }}
      intro={
        <p>
          These terms apply when you use purple-movement.com. By using the site or submitting a form, you agree to them.
          They are written to be read — if anything is unclear, ask us.
        </p>
      }
    >
      <h2>What this website is</h2>
      <p>
        purple-movement.com shares information about The Purple Movement, its activities and connected initiatives, and
        lets you join, ask a question or give feedback. Joining is free and does not create a contract, membership fee or
        obligation for either side.
      </p>

      <h2>Information on the site</h2>
      <p>
        We work to keep dates, venues and details accurate, but plans change. Activities run by connected initiatives —
        such as Rise Together 2026 or Beyond Syllabus — are described on their own websites, and their details there take
        precedence. Check with the organisers before travelling.
      </p>

      <h2>What you submit</h2>
      <ul>
        <li>Only submit information that is true and that you are entitled to share.</li>
        <li>Don’t submit other people’s personal details, or anything unlawful, abusive or misleading.</li>
        <li>
          You keep ownership of what you write. You allow us to store and use it to organise the movement, as described in
          our <Link href="/privacy">Privacy notice</Link>.
        </li>
        <li>We may decline or remove submissions that break these terms, and we don’t have to respond to every one.</li>
      </ul>

      <h2>Acceptable use</h2>
      <p>
        Don’t try to disrupt the website, get around its security, or send automated or bulk submissions.
      </p>

      <h2>Content, names and logos</h2>
      <p>
        The text, design and logos on this site belong to The Purple Movement or to the people and organisations
        credited. Event posters belong to their organisers and are shown to document those activities. Please ask before
        reusing them.
      </p>

      <h2>Links to other websites</h2>
      <p>
        We link to connected initiatives and other sites. They are run independently, with their own terms and privacy
        policies, and we are not responsible for their content.
      </p>

      <h2>Availability and liability</h2>
      <p>
        We provide this website as it is and may change or pause it at any time. To the extent the law allows, we are not
        liable for losses arising from using it or relying on its information.
      </p>

      <h2>Changes</h2>
      <p>If we change these terms, we will update this page and the date at the top.</p>
    </LegalPage>
  );
}
