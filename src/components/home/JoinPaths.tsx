import Image from "next/image";
import { joinPaths } from "@/content/join";
import { ButtonLink } from "@/components/ui/links";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Three participation paths. Everything — icon, title, description, next step, action — is always visible. */
export function JoinPaths() {
  return (
    <section id="join" aria-labelledby="join-title" className="bg-pm-surface-alt py-16 sm:py-24">
      <div className="pm-container">
        <SectionHeading
          id="join-title"
          eyebrow="Join"
          title="Choose how you’ll take part"
          intro="Pick the path that fits. Each one takes about three minutes, and you can stay anonymous if you prefer."
        />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {joinPaths.map((path) => (
            <li key={path.id} className="flex flex-col rounded-md border border-pm-line bg-pm-surface p-6 sm:p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-md bg-pm-purple-600">
                <Image src={path.icon} alt="" width={24} height={24} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">{path.title}</h3>
              <p className="mt-1 text-pm-text-muted">{path.audience}</p>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-display font-bold">What you bring</dt>
                  <dd className="mt-1 text-pm-text-secondary">{path.contribution}</dd>
                </div>
                <div>
                  <dt className="font-display font-bold">What happens next</dt>
                  <dd className="mt-1 text-pm-text-secondary">{path.nextStep}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-8">
                <ButtonLink href={`/join?path=${path.id}`} variant="primary" className="w-full">
                  {path.action}
                  <ArrowRightIcon />
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
