import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { LegalPage } from "@/components/legal/LegalPage";
import { ogDefaults } from "@/content/site";

/*
 * DRAFT FOR OWNER AND LEGAL REVIEW. Every statement below was checked against the code in this
 * repository (src/app/api/*, the *_schema.sql files, next.config.ts, amplify.yml) on 20 October 2026.
 * Open items: the legal entity, the Supabase region, a retention period and a privacy contact address.
 */

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What The Purple Movement collects through this website, why, where it is stored and the choices you have.",
  alternates: { canonical: "/privacy" },
  openGraph: { ...ogDefaults, title: "Privacy notice · The Purple Movement", url: "/privacy" },
};

const contact = site.contactEmail ? (
  <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
) : (
  <>
    a direct message to The Purple Movement on{" "}
    <a href="https://www.linkedin.com/company/the-purple-movement/" target="_blank" rel="noopener noreferrer">
      LinkedIn<span className="sr-only"> (opens in a new tab)</span>
    </a>
  </>
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      updated={{ label: "20 October 2026", dateTime: "2026-10-20" }}
      intro={
        <p>
          This notice explains, in plain language, what The Purple Movement (“we”) collects through purple-movement.com,
          why, where it is kept and what you can ask us to do with it.
        </p>
      }
    >
      <h2>The short version</h2>
      <ul>
        <li>We only collect what you type into our three forms, plus basic technical details sent by your browser.</li>
        <li>We use it to organise the movement and, if you shared contact details, to reach you about it.</li>
        <li>We don’t sell it, and this website uses no advertising trackers, analytics tools or cookies.</li>
        <li>You can join anonymously, and you can ask us to see, correct or delete what you sent.</li>
      </ul>

      <h2>What we collect</h2>
      <div className="overflow-x-auto">
        <table>
          <caption className="sr-only">Information collected by each form</caption>
          <thead>
            <tr>
              <th scope="col">Form</th>
              <th scope="col">What you provide</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <Link href="/join">Join the Movement</Link>
              </th>
              <td>
                Your participation path (individual, organization or government), the option that describes you, what
                you’d like to contribute and an optional link to your work. Unless you choose to join anonymously:
                your name, email address and phone number.
              </td>
              <td>To understand who wants to take part and how, and to contact you about activities.</td>
            </tr>
            <tr>
              <th scope="row">
                <Link href="/#ask">Ask a question</Link>
              </th>
              <td>The text of your question. No name or contact details are requested.</td>
              <td>To improve our answers and FAQ.</td>
            </tr>
            <tr>
              <th scope="row">Website feedback</th>
              <td>An optional rating and an optional comment.</td>
              <td>To improve this website.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        With each submission we also store the time it was sent, your IP address and your browser’s user-agent string
        (which describes the browser and device). We use these to spot spam and misuse.
      </p>
      <p>
        Please don’t include sensitive personal information — for example about health, religion or politics — or
        details about other people in free-text answers.
      </p>

      <h2>Where it is stored and who can see it</h2>
      <p>
        Submissions are stored in a database hosted by <strong>Supabase</strong>, which acts as our data processor.
        Only members of the organising team with access to that database can read them. The website itself is served
        by our hosting provider, which processes requests (including IP addresses) to deliver pages.
      </p>
      <p>
        If you choose to join our community WhatsApp group after joining, WhatsApp (Meta) handles that information
        under its own privacy policy. Links to other sites, such as Rise Together 2026 or the FAYA:80 archive, take you
        to sites with their own policies.
      </p>

      <h2>Cookies, analytics and fonts</h2>
      <p>
        This website does not set cookies and does not use analytics, advertising or social-media tracking scripts. Our
        typefaces are served from this website, so loading a page does not contact Google Fonts or other font services.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We have not yet set an automatic deletion period. Submissions are kept until they are no longer needed to
        organise the movement or until you ask us to delete them, whichever comes first.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>
          <strong>Join anonymously.</strong> We will then store only your path, role and contribution — not your name,
          email or phone number.
        </li>
        <li>
          <strong>Access, correction and deletion.</strong> You can ask for a copy of what you sent, ask us to correct
          it, or ask us to delete it.
        </li>
        <li>
          <strong>Withdrawing.</strong> You can ask us to stop contacting you at any time.
        </li>
      </ul>
      <p>To make a request, send {contact}. Tell us the email address or phone number you used so we can find your submission.</p>

      <h2>Changes to this notice</h2>
      <p>If we change how we handle information, we will update this page and the date at the top.</p>
    </LegalPage>
  );
}
