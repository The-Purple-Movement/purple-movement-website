import { ButtonLink } from "@/components/ui/links";
import { ArrowRightIcon } from "@/components/ui/icons";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="py-16 sm:py-24">
      <div className="pm-container">
        <div className="flex flex-col gap-8 border-t-2 border-pm-accent pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="final-cta-title" className="font-display text-display-md font-extrabold text-balance">
              Bring one skill, one idea or one door you can open.
            </h2>
            <p className="mt-4 text-pm-text-secondary">
              Tell us how you’d like to contribute. It takes about three minutes.
            </p>
          </div>
          <ButtonLink href="/join" variant="primary" className="shrink-0 px-8">
            Join the Movement
            <ArrowRightIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
