"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/links";
import { CloseIcon } from "@/components/ui/icons";

const reactions = [
  { id: "very-sad", label: "Very poor", src: "/images/fbr1.webp" },
  { id: "sad", label: "Poor", src: "/images/fbr2.webp" },
  { id: "neutral", label: "Okay", src: "/images/fbr3.webp" },
  { id: "happy", label: "Good", src: "/images/fbr4.webp" },
  { id: "very-happy", label: "Very good", src: "/images/fbr5.webp" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

/** Footer "Feedback" control: a native modal <dialog> (focus contained, Escape closes, focus restored). */
export function FeedbackDialog({ triggerClassName }: { triggerClassName?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [reaction, setReaction] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();
  const commentId = useId();

  const open = () => {
    setStatus((s) => (s === "success" ? "idle" : s));
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const onClose = () => {
    triggerRef.current?.focus();
    if (status === "success") {
      setReaction(null);
      setComment("");
      setStatus("idle");
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;
    if (!reaction && !comment.trim()) {
      setError("Choose a rating or write a comment before sending.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction, feedback: comment.trim(), timestamp: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("success");
    } catch {
      setStatus("error");
      setError("We couldn’t send your feedback. Check your connection and try again.");
    }
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={open} className={triggerClassName}>
        Feedback
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={onClose}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-lg max-w-[calc(100%_-_2rem)] rounded-lg border border-pm-line-strong bg-pm-surface p-0 text-pm-text shadow-dialog"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-display text-2xl font-bold">
              Share feedback on this website
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close feedback"
              className="-mr-3 -mt-2 inline-flex size-12 shrink-0 items-center justify-center rounded-md hover:bg-pm-field"
            >
              <CloseIcon />
            </button>
          </div>

          {status === "success" ? (
            <div className="mt-4" role="status">
              <p className="text-pm-success">Thank you — your feedback was sent.</p>
              <button type="button" onClick={close} className={buttonClass("primary", "mt-6 w-full")}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-4">
              <p className="text-pm-text-secondary">
                Feedback is anonymous unless you include personal details in your comment.{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  Privacy notice
                </Link>
              </p>
              <fieldset className="mt-6">
                <legend className="font-display font-semibold">How was your visit?</legend>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {reactions.map((r) => (
                    <label
                      key={r.id}
                      className="flex min-h-12 cursor-pointer flex-col items-center gap-1 rounded-md border border-pm-line p-2 text-center text-base leading-tight has-checked:border-pm-accent-strong has-checked:bg-pm-tint has-focus-visible:outline-3 has-focus-visible:outline-pm-accent-strong"
                    >
                      <input
                        type="radio"
                        name="reaction"
                        value={r.id}
                        checked={reaction === r.id}
                        onChange={() => setReaction(r.id)}
                        className="sr-only"
                      />
                      <Image src={r.src} alt="" width={32} height={32} />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label htmlFor={commentId} className="mt-6 block font-display font-semibold">
                What could we improve? <span className="font-normal text-pm-text-muted">(optional)</span>
              </label>
              <textarea
                id={commentId}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={2000}
                aria-describedby={error ? `${commentId}-error` : undefined}
                className="mt-2 w-full rounded-sm border border-pm-line-strong bg-pm-field px-4 py-3 text-base"
              />
              {error && (
                <p id={`${commentId}-error`} role="alert" className="mt-3 text-pm-error">
                  {error}
                </p>
              )}
              <button type="submit" disabled={status === "submitting"} className={buttonClass("primary", "mt-6 w-full")}>
                {status === "submitting" ? "Sending…" : "Send feedback"}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
