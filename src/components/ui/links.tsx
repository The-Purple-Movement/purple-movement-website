import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "./icons";

export type ButtonVariant = "primary" | "secondary" | "quiet";

/** Every button-like control is at least 48px tall (WCAG 2.5.8 target size, with margin). */
export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-center font-display text-base font-bold",
    "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" && "bg-pm-purple-600 text-pm-on-accent hover:bg-pm-purple-700",
    variant === "secondary" &&
      "border border-pm-line-strong bg-transparent text-pm-text hover:border-pm-accent-strong hover:bg-pm-field",
    variant === "quiet" &&
      "px-0 text-pm-accent-strong underline decoration-pm-accent underline-offset-4 hover:text-pm-text hover:decoration-pm-text",
    className,
  );
}

type ExternalLinkProps = Omit<ComponentProps<"a">, "target" | "rel"> & {
  children: ReactNode;
  showIcon?: boolean;
};

/** Link to another site: opens a new tab, announces that, and drops the opener. */
export function ExternalLink({ children, className, showIcon = true, ...props }: ExternalLinkProps) {
  return (
    <a {...props} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      {showIcon && <ExternalLinkIcon className="size-4 shrink-0" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: ButtonVariant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={buttonClass(variant, className)} />;
}
