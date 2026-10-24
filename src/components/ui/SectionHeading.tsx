import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}

/** h2 + optional eyebrow and intro. `id` labels the enclosing <section> via aria-labelledby. */
export function SectionHeading({ id, eyebrow, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <p className="pm-eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-3 font-display text-display-sm font-extrabold text-balance">
        {title}
      </h2>
      {intro && <div className="mt-4 text-pm-text-secondary">{intro}</div>}
    </div>
  );
}
