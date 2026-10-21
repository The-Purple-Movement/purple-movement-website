import Image from "next/image";
import Link from "next/link";
import { fayaArchive, primaryNav, riseTogether, site } from "@/content/site";
import { ExternalLink } from "@/components/ui/links";
import { socialIcons } from "@/components/ui/icons";
import { FeedbackDialog } from "./FeedbackDialog";
import { CurrentYear } from "./CurrentYear";

const linkClass = "inline-flex min-h-11 min-w-11 items-center gap-1.5 text-pm-text-secondary hover:text-pm-text";

export function SiteFooter() {
  return (
    <footer className="pm-dark border-t border-pm-line bg-pm-surface-alt">
      <div className="pm-container grid gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Image src="/logos/logo_pm.webp" alt="The Purple Movement" width={154} height={48} className="h-12 w-auto" />
          <p className="mt-4 max-w-sm text-pm-text-secondary">
            Beyond Syllabus, Beyond Gatekeepers, Beyond Borders
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {site.social.map((s) => {
              const Icon = socialIcons[s.name];
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`The Purple Movement on ${s.name} (opens in a new tab)`}
                    className="inline-flex size-12 items-center justify-center rounded-md border border-pm-line text-pm-text-secondary hover:border-pm-accent-strong hover:text-pm-text"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-7">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h2 className="font-display text-base font-bold">Explore</h2>
              <ul className="mt-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base font-bold">Connected initiatives</h2>
              <ul className="mt-3">
                <li>
                  <ExternalLink href={riseTogether.url} className={linkClass}>
                    Rise Together 2026
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href={fayaArchive.url} className={linkClass}>
                    FAYA:80 archive
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="https://capabilitycommons.com/" className={linkClass}>
                    Beyond Syllabus
                  </ExternalLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base font-bold">Trust</h2>
              <ul className="mt-3">
                <li>
                  <Link href="/privacy" className={linkClass}>
                    Privacy notice
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={linkClass}>
                    Terms of use
                  </Link>
                </li>
                <li>
                  <FeedbackDialog triggerClassName={`${linkClass} cursor-pointer`} />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="border-t border-pm-line">
        <p className="pm-container py-6 text-pm-text-muted">
          © <CurrentYear /> The Purple Movement.
        </p>
      </div>
    </footer>
  );
}
