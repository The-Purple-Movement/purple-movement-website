import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/ui/links";
import { ArrowRightIcon } from "@/components/ui/icons";
import { hero } from "@/content/about";

const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const { props: heroArt } = getImageProps({
  src: "/image.webp",
  alt: "",
  width: 1784,
  height: 882,
  sizes: "(min-width: 1024px) 68vw, 100vw",
});

/**
 * First viewport, in the movement's own words (src/content/about.ts). The artwork is a decorative,
 * full-bleed background that fades into the page; phones get only the CSS glow (no image download).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pm-dark relative isolate overflow-hidden bg-pm-bg">
      <div aria-hidden="true" className="pm-hero-glow" />
      <picture>
        <source media="(min-width: 40rem)" srcSet={heroArt.srcSet} sizes={heroArt.sizes} />
        <img src={TRANSPARENT_PIXEL} alt="" fetchPriority="high" decoding="async" className="pm-hero-art" />
      </picture>

      <div className="pm-container relative flex min-h-[calc(80svh-var(--pm-header-height))] items-center py-16 sm:py-24 lg:min-h-[calc(100svh-var(--pm-header-height))]">
        <div className="max-w-2xl">
          <h1 id="hero-title" className="font-display font-extrabold tracking-tight">
            <span className="block text-xl uppercase tracking-widest text-pm-text-secondary sm:text-2xl">
              {hero.titleLead}
            </span>{" "}
            <span className="mt-2 block text-display-lg uppercase text-balance">{hero.title}</span>
          </h1>
          <p className="mt-6 text-lg text-pm-text-secondary lg:text-xl">{hero.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/join" variant="primary">
              Join the Movement
              <ArrowRightIcon />
            </ButtonLink>
            <ButtonLink href="#rise-together" variant="secondary">
              Explore Rise Together 2026
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
