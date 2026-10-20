"use client";

import Link from "next/link";
import { useState } from "react";
import type { FaqItem } from "@/content/faq";
import { PlusIcon } from "@/components/ui/icons";

/**
 * Disclosure accordion: native buttons with aria-expanded/aria-controls. Panels animate height with
 * CSS grid rows (instant under prefers-reduced-motion) and use visibility so collapsed content is
 * removed from the tab order and accessibility tree.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="border-t border-pm-line">
      {items.map((item) => {
        const expanded = open.has(item.id);
        const buttonId = `faq-button-${item.id}`;
        const panelId = `faq-panel-${item.id}`;
        return (
          <div key={item.id} className="border-b border-pm-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left font-display text-lg font-semibold hover:text-pm-accent-strong"
              >
                <span>{item.question}</span>
                <PlusIcon
                  className={`size-6 shrink-0 text-pm-accent transition-transform duration-[var(--pm-duration-base)] ${expanded ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,visibility] duration-[var(--pm-duration-base)] ease-pm ${
                expanded ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl space-y-3 pb-6 text-pm-text-secondary">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {item.link && (
                    <p>
                      <Link href={item.link.href} className="font-semibold text-pm-accent-strong underline underline-offset-4">
                        {item.link.label}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
