import Link from "next/link";
import { type ManifestoBlock, manifesto, manifestoTitle, parseEmphasis } from "@/content/manifesto";
import { ButtonLink } from "@/components/ui/links";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Groups consecutive declarations / chant lines so they read as one stanza. */
function stanzas(blocks: ManifestoBlock[]) {
  const groups: ManifestoBlock[][] = [];
  for (const block of blocks) {
    const last = groups.at(-1);
    if (last && (block.kind === "line" || block.kind === "chant") && last[0].kind === block.kind) last.push(block);
    else groups.push([block]);
  }
  return groups;
}

/** Type escalates through the text: statements → declarations → the chant → the final call. */
const blockClass: Record<ManifestoBlock["kind"], string> = {
  paragraph: "text-2xl font-semibold leading-snug text-pm-text-secondary lg:text-display-sm lg:leading-tight",
  line: "text-display-sm font-extrabold uppercase text-pm-accent-strong",
  lead: "text-display-md font-extrabold uppercase text-pm-text",
  chant: "text-display-md font-extrabold uppercase text-pm-text",
  close: "text-display-lg font-extrabold uppercase text-pm-accent-strong",
};

function Emphasised({ text }: { text: string }) {
  return (
    <>
      {parseEmphasis(text).map((part, i) =>
        part.strong ? (
          <strong key={i} className="font-bold text-pm-accent-strong">
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

interface ManifestoProps {
  /** "page" renders the title as the page's h1 and links home; "home" uses an h2 and links to /manifesto. */
  variant: "home" | "page";
}

/** The manifesto, typeset as a poster: heavy display type throughout, key phrases in purple. */
export function Manifesto({ variant }: ManifestoProps) {
  const Title = variant === "page" ? "h1" : "h2";

  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="border-y border-pm-line bg-pm-surface-alt py-16 sm:py-28">
      <div className="pm-container">
        <div className="max-w-5xl font-display tracking-tight">
          <p className="pm-eyebrow">The Purple Movement Manifesto</p>
          <Title
            id="manifesto-title"
            className="mt-6 border-l-4 border-pm-purple-600 pl-5 text-display-lg font-extrabold uppercase text-balance sm:pl-8"
          >
            {manifestoTitle}
          </Title>

          <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-14">
            {stanzas(manifesto).map((group) => (
              <div
                key={group[0].text}
                className={group[0].kind === "chant" ? "space-y-1 border-y border-pm-line py-8 sm:py-10" : "space-y-2"}
              >
                {group.map((block) => (
                  <p key={block.text} className={`text-balance ${blockClass[block.kind]}`}>
                    <Emphasised text={block.text} />
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:mt-16 sm:flex-row sm:items-center">
          <ButtonLink href="/join" variant="primary">
            Stand with the manifesto — join
            <ArrowRightIcon />
          </ButtonLink>
          {variant === "home" ? (
            <Link
              href="/manifesto"
              className="inline-flex min-h-12 items-center font-semibold text-pm-accent-strong underline underline-offset-4"
            >
              Open the manifesto page to share it
            </Link>
          ) : (
            <Link href="/" className="inline-flex min-h-12 items-center font-semibold text-pm-accent-strong underline underline-offset-4">
              See what the movement is doing
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
