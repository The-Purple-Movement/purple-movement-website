import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/links";

export default function NotFound() {
  return (
    <PageShell>
      <div className="pm-container py-20 sm:py-28">
        <p className="pm-eyebrow">Page not found</p>
        <h1 className="mt-3 font-display text-display-md font-extrabold">We couldn’t find that page.</h1>
        <p className="mt-4 max-w-xl text-pm-text-secondary">
          It may have moved. Try the homepage, or see what’s coming up.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/#activities" variant="secondary">
            See activities
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
