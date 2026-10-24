import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";

interface LegalPageProps {
  title: string;
  updated: { label: string; dateTime: string };
  intro: ReactNode;
  children: ReactNode;
}

export function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <PageShell>
      <article className="pm-container py-10 sm:py-16">
        <p className="pm-eyebrow">Trust</p>
        <h1 className="mt-3 font-display text-display-md font-extrabold">{title}</h1>
        <p className="mt-3 text-pm-text-muted">
          Last updated <time dateTime={updated.dateTime}>{updated.label}</time>
        </p>
        <div className="pm-prose">
          <div className="mt-6 text-lg text-pm-text">{intro}</div>
          {children}
        </div>
      </article>
    </PageShell>
  );
}
