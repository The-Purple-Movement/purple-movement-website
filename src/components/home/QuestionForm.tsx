"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/links";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_LENGTH = 1000;

/** Anonymous question box. Posts to /api/questions (unchanged contract). */
export function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;
    if (!question.trim()) {
      setError("Write your question before sending.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), timestamp: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setQuestion("");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("We couldn’t send your question. Check your connection and try again.");
    }
  };

  return (
    <form onSubmit={submit} noValidate className="max-w-2xl">
      <label htmlFor="question" className="block font-display text-lg font-bold">
        Your question
      </label>
      <p id="question-hint" className="mt-1 text-pm-text-muted">
        Questions are anonymous, so we answer common ones in the FAQ rather than replying individually. Please don’t
        include personal details. Want a reply? <Link href="/join" className="underline underline-offset-4">Join the movement</Link>{" "}
        with your contact details instead.
      </p>
      <textarea
        id="question"
        name="question"
        rows={3}
        maxLength={MAX_LENGTH}
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          if (status === "success") setStatus("idle");
        }}
        aria-describedby={`question-hint${error ? " question-error" : ""}`}
        aria-invalid={error ? true : undefined}
        className="mt-3 w-full rounded-sm border border-pm-line-strong bg-pm-field px-4 py-3 text-base"
      />
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className={buttonClass("secondary")}>
          {status === "submitting" ? "Sending…" : "Send question"}
        </button>
        <div aria-live="polite" className="min-h-6">
          {status === "success" && <p className="text-pm-success">Thank you — your question was sent.</p>}
        </div>
      </div>
      {error && (
        <p id="question-error" role="alert" className="mt-3 text-pm-error">
          {error}
        </p>
      )}
    </form>
  );
}
