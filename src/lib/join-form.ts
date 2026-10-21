import { type CountryCode, isSupportedCountry, parsePhoneNumberFromString } from "libphonenumber-js/min";
import { JOIN_LIMITS, type JoinPathId, getJoinPath } from "@/content/join";

export interface JoinFormData {
  path: JoinPathId | null;
  role: string;
  contribution: string;
  link: string;
  anonymous: boolean;
  name: string;
  email: string;
  /** ISO 3166-1 alpha-2 country for the phone number; empty until chosen (no default). */
  country: string;
  phone: string;
}

export const emptyJoinForm: JoinFormData = {
  path: null,
  role: "",
  contribution: "",
  link: "",
  anonymous: false,
  name: "",
  email: "",
  country: "",
  phone: "",
};

export type JoinField = Exclude<keyof JoinFormData, "anonymous">;
export type JoinErrors = Partial<Record<JoinField, string>>;

export const JOIN_STEPS = [
  { id: "path", name: "Path", fields: ["path"] },
  { id: "contribution", name: "Contribution", fields: ["role", "contribution", "link"] },
  { id: "contact", name: "Contact", fields: ["name", "email", "country", "phone"] },
  { id: "review", name: "Review", fields: [] },
] as const satisfies readonly { id: string; name: string; fields: readonly JoinField[] }[];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Formats the phone number as E.164 (e.g. +919876543210), or null if it is not valid for the country. */
export function toE164(phone: string, country: string): string | null {
  if (!country || !isSupportedCountry(country)) return null;
  const parsed = parsePhoneNumberFromString(phone, country as CountryCode);
  return parsed && parsed.isValid() ? parsed.number : null;
}

export function validateField(field: JoinField, data: JoinFormData): string | undefined {
  const value = typeof data[field] === "string" ? (data[field] as string).trim() : data[field];
  switch (field) {
    case "path":
      return getJoinPath(data.path) ? undefined : "Choose a path to continue.";
    case "role": {
      const roles = getJoinPath(data.path)?.roles ?? [];
      return roles.some((r) => r.value === data.role) ? undefined : "Choose the option that best describes you.";
    }
    case "contribution": {
      const length = data.contribution.trim().length;
      if (length === 0) return "Tell us what you’d like to contribute.";
      if (length < JOIN_LIMITS.contributionMin)
        return `Add a little more detail — at least ${JOIN_LIMITS.contributionMin} characters.`;
      if (length > JOIN_LIMITS.contributionMax)
        return `Keep this under ${JOIN_LIMITS.contributionMax} characters.`;
      return undefined;
    }
    case "link":
      if (!value) return undefined;
      if (data.link.trim().length > JOIN_LIMITS.linkMax) return "This link is too long.";
      return isHttpUrl(data.link.trim()) ? undefined : "Enter a full web address starting with https://, or leave this empty.";
    case "name":
      if (data.anonymous) return undefined;
      if (data.name.trim().length < 2) return "Enter your name (at least 2 characters).";
      if (data.name.trim().length > JOIN_LIMITS.nameMax) return "This name is too long.";
      return undefined;
    case "email":
      if (data.anonymous) return undefined;
      if (!data.email.trim()) return "Enter your email address.";
      if (data.email.trim().length > JOIN_LIMITS.emailMax || !EMAIL_PATTERN.test(data.email.trim()))
        return "Enter an email address in the format name@example.com.";
      return undefined;
    case "country":
      if (data.anonymous) return undefined;
      return data.country && isSupportedCountry(data.country) ? undefined : "Choose the country or region for your phone number.";
    case "phone":
      if (data.anonymous) return undefined;
      if (!data.phone.trim()) return "Enter your phone number.";
      if (!data.country) return "Choose a country or region first, then enter your number.";
      return toE164(data.phone, data.country) ? undefined : "Enter a valid phone number for the country you chose.";
  }
}

export function validateStep(stepIndex: number, data: JoinFormData): JoinErrors {
  const errors: JoinErrors = {};
  for (const field of JOIN_STEPS[stepIndex]?.fields ?? []) {
    const message = validateField(field, data);
    if (message) errors[field] = message;
  }
  return errors;
}

/** Request body for POST /api/join (contract unchanged). Contact fields are omitted when anonymous. */
export function toJoinPayload(data: JoinFormData) {
  return {
    selectedRole: data.path,
    defining: data.role,
    whyHere: data.contribution.trim(),
    portfolioLink: data.link.trim(),
    notInterested: data.anonymous,
    ...(data.anonymous
      ? {}
      : {
          name: data.name.trim(),
          email: data.email.trim(),
          phone: toE164(data.phone, data.country) ?? "",
        }),
  };
}
