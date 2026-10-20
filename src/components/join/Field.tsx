import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function inputClass(invalid: boolean) {
  return cn(
    "block min-h-12 w-full rounded-sm border bg-pm-field px-4 py-3 text-base text-pm-text placeholder:text-pm-text-muted",
    invalid ? "border-pm-error" : "border-pm-line-strong",
  );
}

interface ControlProps {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
}

interface FieldProps {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  /** Smaller label for fields grouped under a fieldset legend. */
  compact?: boolean;
  children: (props: ControlProps) => ReactNode;
}

/** Persistent visible label, optional hint and inline error, all wired to the control by id. */
export function Field({ id, label, hint, error, optional, compact, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className={cn("block font-display font-bold", compact ? "text-base" : "text-lg")}>
        {label}
        {optional && <span className="font-sans font-normal text-pm-text-muted"> (optional)</span>}
      </label>
      {hint && (
        <div id={hintId} className="mt-1 text-pm-text-muted">
          {hint}
        </div>
      )}
      <div className="mt-2">{children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}</div>
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-pm-error">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
