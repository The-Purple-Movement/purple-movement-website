"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js/min";
import { type JoinPathId, getJoinPath, joinPaths } from "@/content/join";
import { site } from "@/content/site";
import {
  JOIN_STEPS,
  type JoinErrors,
  type JoinField,
  type JoinFormData,
  emptyJoinForm,
  toE164,
  toJoinPayload,
  validateField,
  validateStep,
} from "@/lib/join-form";
import { buttonClass, ExternalLink } from "@/components/ui/links";
import { AlertIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { Field, inputClass } from "./Field";

type SubmitState = "idle" | "submitting" | "success" | "error";

function useCountryOptions() {
  return useMemo(() => {
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    return getCountries()
      .map((code) => ({ code, label: `${names.of(code) ?? code} (+${getCountryCallingCode(code)})` }))
      .sort((a, b) => a.label.localeCompare(b.label, "en"));
  }, []);
}

export function JoinFlow({ initialPath }: { initialPath?: JoinPathId }) {
  const [data, setData] = useState<JoinFormData>(() => ({ ...emptyJoinForm, path: initialPath ?? null }));
  const [step, setStep] = useState(initialPath ? 1 : 0);
  const [errors, setErrors] = useState<JoinErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const submittingRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const countries = useCountryOptions();
  const path = getJoinPath(data.path);

  // Focus moves only on explicit transitions: to the new step's heading, or to the error summary after a failed attempt.
  const [focusTarget, setFocusTarget] = useState<"heading" | "summary" | null>(null);
  useEffect(() => {
    if (focusTarget === "heading") headingRef.current?.focus();
    if (focusTarget === "summary") summaryRef.current?.focus();
    if (focusTarget) setFocusTarget(null);
  }, [focusTarget]);

  const update = <K extends keyof JoinFormData>(key: K, value: JoinFormData[K]) => {
    const next = { ...data, [key]: value };
    // A different path has different role options.
    if (key === "path" && value !== data.path) next.role = "";
    setData(next);
    // Re-validate fields that already show an error so messages clear as soon as they're fixed.
    setErrors((prevErrors) => {
      const updated: JoinErrors = {};
      for (const field of Object.keys(prevErrors) as JoinField[]) {
        const message = validateField(field, next);
        if (message) updated[field] = message;
      }
      return updated;
    });
  };

  const onBlur = (field: JoinField) => {
    const message = validateField(field, data);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const goTo = (index: number) => {
    setErrors({});
    setShowSummary(false);
    setStep(index);
    setFocusTarget("heading");
  };

  const showErrors = (stepErrors: JoinErrors) => {
    setErrors(stepErrors);
    setShowSummary(true);
    setFocusTarget("summary");
  };

  const next = (event?: React.FormEvent) => {
    event?.preventDefault();
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      showErrors(stepErrors);
      return;
    }
    goTo(step + 1);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submittingRef.current || submitState === "success") return;
    // Re-check every step in case anything changed.
    for (let i = 0; i < JOIN_STEPS.length - 1; i++) {
      const stepErrors = validateStep(i, data);
      if (Object.keys(stepErrors).length > 0) {
        setStep(i);
        showErrors(stepErrors);
        return;
      }
    }
    submittingRef.current = true;
    setSubmitState("submitting");
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toJoinPayload(data)),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSubmitState("success");
      setFocusTarget("heading");
    } catch {
      // Never log form contents; the message below explains how to recover.
      setSubmitState("error");
    } finally {
      submittingRef.current = false;
    }
  };

  if (submitState === "success") {
    return <JoinSuccess data={data} headingRef={headingRef} />;
  }

  const errorEntries = Object.entries(errors) as [JoinField, string][];
  const current = JOIN_STEPS[step];

  return (
    <div>
      <ol aria-label="Progress" className="grid grid-cols-4 gap-2">
        {JOIN_STEPS.map((s, index) => {
          const state = index < step ? "complete" : index === step ? "current" : "upcoming";
          return (
            <li key={s.id} aria-current={state === "current" ? "step" : undefined} className="min-w-0">
              <span
                className={`block h-1 rounded-sm ${state === "upcoming" ? "bg-pm-line-strong" : "bg-pm-accent"}`}
                aria-hidden="true"
              />
              <span
                className={`mt-2 flex items-center gap-1 text-sm font-semibold ${
                  state === "upcoming" ? "text-pm-text-muted" : "text-pm-text"
                }`}
              >
                {state === "complete" && <CheckIcon className="size-4 shrink-0 text-pm-accent" />}
                <span className="truncate">
                  <span className="sr-only">Step {index + 1}: </span>
                  {s.name}
                  {state === "complete" && <span className="sr-only"> (completed)</span>}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <form onSubmit={step === JOIN_STEPS.length - 1 ? submit : next} noValidate className="mt-10">
        <p className="font-semibold text-pm-text-muted">
          Step {step + 1} of {JOIN_STEPS.length}: {current.name}
        </p>

        {showSummary && errorEntries.length > 0 && (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="mt-4 rounded-md border border-pm-error p-4"
            aria-labelledby="error-summary-title"
          >
            <h3 id="error-summary-title" className="flex items-center gap-2 font-display font-bold text-pm-error">
              <AlertIcon />
              Please fix {errorEntries.length === 1 ? "this" : `these ${errorEntries.length}`} before continuing
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a href={`#join-${field}`} className="text-pm-text underline underline-offset-4">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 0 && (
          <fieldset className="mt-4">
            <legend>
              <h2 ref={headingRef} tabIndex={-1} className="font-display text-display-sm font-extrabold outline-none">
                How would you like to take part?
              </h2>
            </legend>
            <p className="mt-2 text-pm-text-secondary">Choose the path that fits you best.</p>
            <div id="join-path" className="mt-6 grid gap-4 md:grid-cols-3">
              {joinPaths.map((p) => (
                <label
                  key={p.id}
                  className="flex cursor-pointer flex-col rounded-md border border-pm-line-strong bg-pm-surface p-5 hover:border-pm-accent has-checked:border-pm-accent-strong has-checked:bg-pm-tint has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-pm-accent-strong"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-md bg-pm-purple-600">
                        <Image src={p.icon} alt="" width={20} height={20} />
                      </span>
                      <span className="font-display text-xl font-bold">{p.title}</span>
                    </span>
                    <input
                      type="radio"
                      name="path"
                      value={p.id}
                      checked={data.path === p.id}
                      onChange={() => update("path", p.id)}
                      aria-describedby={`path-${p.id}-desc`}
                      className="size-5 accent-pm-purple-600"
                    />
                  </span>
                  <span id={`path-${p.id}-desc`} className="mt-3 text-pm-text-secondary">
                    {p.audience} {p.contribution}
                  </span>
                </label>
              ))}
            </div>
            {errors.path && <p className="mt-3 text-pm-error">{errors.path}</p>}
          </fieldset>
        )}

        {step === 1 && path && (
          <div className="mt-4">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-display-sm font-extrabold outline-none">
              What would you like to contribute?
            </h2>
            <p className="mt-2 text-pm-text-secondary">
              Joining as <strong className="text-pm-text">{path.title.toLowerCase()}</strong>.{" "}
              <button type="button" onClick={() => goTo(0)} className="inline-flex min-h-11 items-center font-semibold text-pm-accent-strong underline underline-offset-4">
                Change path
              </button>
            </p>

            <div className="mt-8 space-y-8">
              <Field id="join-role" label="Which best describes you?" error={errors.role}>
                {(props) => (
                  <select
                    {...props}
                    value={data.role}
                    onChange={(e) => update("role", e.target.value)}
                    onBlur={() => onBlur("role")}
                    className={inputClass(!!errors.role)}
                    autoComplete="organization-title"
                  >
                    <option value="">Select one…</option>
                    {path.roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field
                id="join-contribution"
                label="What would you like to contribute or work on?"
                hint={
                  <>
                    <span className="block">A sentence or two is enough. For example:</span>
                    <ul className="mt-1 list-disc pl-5">
                      {path.examples.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </>
                }
                error={errors.contribution}
              >
                {(props) => (
                  <textarea
                    {...props}
                    rows={5}
                    maxLength={2000}
                    value={data.contribution}
                    onChange={(e) => update("contribution", e.target.value)}
                    onBlur={() => onBlur("contribution")}
                    className={inputClass(!!errors.contribution)}
                  />
                )}
              </Field>

              <Field
                id="join-link"
                label="Link to your work"
                optional
                hint="A portfolio, website, LinkedIn or GitHub profile."
                error={errors.link}
              >
                {(props) => (
                  <input
                    {...props}
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="https://"
                    value={data.link}
                    onChange={(e) => update("link", e.target.value)}
                    onBlur={() => onBlur("link")}
                    className={inputClass(!!errors.link)}
                  />
                )}
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-display-sm font-extrabold outline-none">
              How can we reach you?
            </h2>
            <p className="mt-2 text-pm-text-secondary">
              Your details go only to the organising team.{" "}
              <Link href="/privacy" className="font-semibold text-pm-accent-strong underline underline-offset-4">
                How we use them
              </Link>
            </p>

            <div className="mt-6 rounded-md border border-pm-line-strong p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={data.anonymous}
                  onChange={(e) => update("anonymous", e.target.checked)}
                  aria-describedby="anonymous-desc"
                  className="mt-1 size-5 shrink-0 accent-pm-purple-600"
                />
                <span>
                  <span className="font-display font-bold">Join anonymously</span>
                  <span id="anonymous-desc" className="mt-1 block text-pm-text-secondary">
                    We’ll record only your path, role and contribution. We won’t be able to reply to you or invite you
                    to activities personally.
                  </span>
                </span>
              </label>
            </div>

            {!data.anonymous && (
              <div className="mt-8 space-y-8">
                <p className="text-pm-text-secondary">All three are needed so the team can reach you.</p>
                <Field id="join-name" label="Full name" error={errors.name}>
                  {(props) => (
                    <input
                      {...props}
                      type="text"
                      autoComplete="name"
                      maxLength={120}
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => onBlur("name")}
                      className={inputClass(!!errors.name)}
                    />
                  )}
                </Field>
                <Field id="join-email" label="Email address" error={errors.email}>
                  {(props) => (
                    <input
                      {...props}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      spellCheck={false}
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => onBlur("email")}
                      className={inputClass(!!errors.email)}
                    />
                  )}
                </Field>
                <fieldset>
                  <legend className="font-display text-lg font-bold">Phone number</legend>
                  <div className="mt-3 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <Field id="join-country" label="Country or region" error={errors.country} compact>
                      {(props) => (
                        <select
                          {...props}
                          autoComplete="country"
                          value={data.country}
                          onChange={(e) => update("country", e.target.value)}
                          onBlur={() => onBlur("country")}
                          className={inputClass(!!errors.country)}
                        >
                          <option value="">Select country or region…</option>
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field id="join-phone" label="Number" error={errors.phone} compact>
                      {(props) => (
                        <input
                          {...props}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          value={data.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          onBlur={() => onBlur("phone")}
                          className={inputClass(!!errors.phone)}
                        />
                      )}
                    </Field>
                  </div>
                </fieldset>
              </div>
            )}
          </div>
        )}

        {step === 3 && path && (
          <div className="mt-4">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-display-sm font-extrabold outline-none">
              Check your answers
            </h2>
            <dl className="mt-6 divide-y divide-pm-line border-y border-pm-line">
              <ReviewRow label="Path" value={path.title} onEdit={() => goTo(0)} />
              <ReviewRow
                label="Describes you"
                value={path.roles.find((r) => r.value === data.role)?.label ?? ""}
                onEdit={() => goTo(1)}
              />
              <ReviewRow label="Contribution" value={data.contribution.trim()} onEdit={() => goTo(1)} />
              {data.link.trim() && <ReviewRow label="Link" value={data.link.trim()} onEdit={() => goTo(1)} />}
              {data.anonymous ? (
                <ReviewRow label="Contact" value="Anonymous — no contact details shared" onEdit={() => goTo(2)} />
              ) : (
                <ReviewRow
                  label="Contact"
                  value={`${data.name.trim()} · ${data.email.trim()} · ${toE164(data.phone, data.country) ?? data.phone.trim()}`}
                  onEdit={() => goTo(2)}
                />
              )}
            </dl>

            <div className="mt-6 rounded-md bg-pm-tint p-5">
              <h3 className="font-display font-bold">What happens after you submit</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-pm-text-secondary">
                <li>Your submission goes to the organising team, who read every one.</li>
                <li>
                  {site.joinResponseTime
                    ? `We aim to respond within ${site.joinResponseTime}.`
                    : "There is no automatic confirmation email."}
                </li>
                <li>You can join the community WhatsApp group straight away.</li>
              </ul>
            </div>

            {submitState === "error" && (
              <div role="alert" className="mt-6 rounded-md border border-pm-error p-4">
                <p className="flex items-center gap-2 font-display font-bold text-pm-error">
                  <AlertIcon />
                  Your submission didn’t go through
                </p>
                <p className="mt-1 text-pm-text-secondary">
                  Nothing was lost — your answers are still here. Check your connection and select “Submit” to try
                  again.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-pm-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className={buttonClass("secondary")}>
              <ArrowLeftIcon />
              Back
            </button>
          ) : (
            <span />
          )}
          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            {step === JOIN_STEPS.length - 1 ? (
              <>
                <button type="submit" disabled={submitState === "submitting"} className={buttonClass("primary")}>
                  {submitState === "submitting" ? "Submitting…" : "Submit"}
                </button>
                <p className="text-pm-text-muted sm:text-right">
                  By submitting, you agree to how we handle your details in our{" "}
                  <Link href="/privacy" className="underline underline-offset-4">
                    Privacy notice
                  </Link>
                  .
                </p>
              </>
            ) : (
              <button type="submit" className={buttonClass("primary")}>
                Continue to {JOIN_STEPS[step + 1].name.toLowerCase()}
                <ArrowRightIcon />
              </button>
            )}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {submitState === "submitting" ? "Submitting your answers" : ""}
        </p>
      </form>
    </div>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr_auto] sm:gap-4">
      <dt className="font-semibold text-pm-text-muted">{label}</dt>
      <dd className="break-words whitespace-pre-line">{value}</dd>
      <dd>
        <button type="button" onClick={onEdit} className="min-h-11 font-semibold text-pm-accent-strong underline underline-offset-4">
          Edit<span className="sr-only"> {label.toLowerCase()}</span>
        </button>
      </dd>
    </div>
  );
}

function JoinSuccess({
  data,
  headingRef,
}: {
  data: JoinFormData;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div role="status" className="rounded-lg border border-pm-line-strong bg-pm-surface p-6 sm:p-10">
      <CheckIcon className="size-10 text-pm-success" />
      <h2 ref={headingRef} tabIndex={-1} className="mt-4 font-display text-display-sm font-extrabold outline-none">
        {data.anonymous ? "Thank you — your submission is in." : `Thank you, ${data.name.trim().split(/\s+/)[0]} — you’re in.`}
      </h2>
      <h3 className="mt-8 font-display text-xl font-bold">What happens next</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-pm-text-secondary">
        <li>The organising team reads every submission.</li>
        {data.anonymous ? (
          <li>Because you joined anonymously, we can’t contact you — keep an eye on our activities instead.</li>
        ) : (
          <li>
            {site.joinResponseTime
              ? `We aim to respond within ${site.joinResponseTime}.`
              : "There is no automatic confirmation email; the team will use the details you shared."}
          </li>
        )}
        <li>Join the community WhatsApp group for announcements and conversations.</li>
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ExternalLink href={site.whatsappCommunity} className={buttonClass("primary", "bg-pm-whatsapp hover:bg-pm-whatsapp")}>
          Join the WhatsApp community
        </ExternalLink>
        <Link href="/#activities" className={buttonClass("secondary")}>
          See upcoming activities
        </Link>
      </div>
    </div>
  );
}
