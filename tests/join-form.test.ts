import { describe, expect, it } from "vitest";
import { type JoinFormData, emptyJoinForm, toE164, toJoinPayload, validateField, validateStep } from "@/lib/join-form";

const filled: JoinFormData = {
  ...emptyJoinForm,
  path: "individual",
  role: "Student",
  contribution: "I can run a workshop on accessibility testing.",
  link: "https://example.org/me",
  name: "Anjali Nair",
  email: "anjali@example.org",
  country: "IN",
  phone: "98765 43210",
};

describe("join form validation", () => {
  it("requires a known path", () => {
    expect(validateField("path", emptyJoinForm)).toMatch(/choose a path/i);
    expect(validateField("path", { ...emptyJoinForm, path: "individual" })).toBeUndefined();
  });

  it("only accepts roles that belong to the chosen path", () => {
    expect(validateField("role", { ...filled, role: "Policy Maker " })).toMatch(/best describes/i);
    expect(validateField("role", { ...filled, path: "government", role: "Policy Maker " })).toBeUndefined();
  });

  it("asks for a meaningful contribution", () => {
    expect(validateField("contribution", { ...filled, contribution: "  " })).toMatch(/tell us/i);
    expect(validateField("contribution", { ...filled, contribution: "hi" })).toMatch(/at least 10/i);
    expect(validateField("contribution", { ...filled, contribution: "x".repeat(2001) })).toMatch(/under 2000/i);
  });

  it("accepts only empty or http(s) links", () => {
    expect(validateField("link", { ...filled, link: "" })).toBeUndefined();
    expect(validateField("link", { ...filled, link: "javascript:alert(1)" })).toMatch(/https:\/\//);
    expect(validateField("link", { ...filled, link: "example.org" })).toMatch(/https:\/\//);
  });

  it("accepts names that are not plain ASCII letters", () => {
    expect(validateField("name", { ...filled, name: "Seán O'Brien" })).toBeUndefined();
    expect(validateField("name", { ...filled, name: "അഞ്ജലി" })).toBeUndefined();
    expect(validateField("name", { ...filled, name: "A" })).toMatch(/at least 2/);
  });

  it("validates email format with an actionable message", () => {
    expect(validateField("email", { ...filled, email: "anjali@" })).toMatch(/name@example\.com/);
  });

  it("has no default country and validates the phone number for the chosen country", () => {
    expect(emptyJoinForm.country).toBe("");
    expect(validateField("country", { ...filled, country: "" })).toMatch(/country or region/i);
    expect(validateField("phone", { ...filled, country: "" })).toMatch(/country or region first/i);
    expect(validateField("phone", filled)).toBeUndefined();
    expect(validateField("phone", { ...filled, phone: "12345" })).toMatch(/valid phone number/i);
    expect(toE164("98765 43210", "IN")).toBe("+919876543210");
    expect(toE164("020 7946 0958", "GB")).toBe("+442079460958");
  });

  it("skips contact validation when joining anonymously", () => {
    const anonymous = { ...filled, anonymous: true, name: "", email: "", phone: "", country: "" };
    expect(validateStep(2, anonymous)).toEqual({});
    expect(Object.keys(validateStep(2, { ...anonymous, anonymous: false }))).toEqual(["name", "email", "country", "phone"]);
  });
});

describe("join payload", () => {
  it("keeps the existing /api/join contract and sends E.164 phone numbers", () => {
    expect(toJoinPayload(filled)).toEqual({
      selectedRole: "individual",
      defining: "Student",
      whyHere: "I can run a workshop on accessibility testing.",
      portfolioLink: "https://example.org/me",
      notInterested: false,
      name: "Anjali Nair",
      email: "anjali@example.org",
      phone: "+919876543210",
    });
  });

  it("never sends contact details for anonymous submissions", () => {
    const payload = toJoinPayload({ ...filled, anonymous: true });
    expect(payload).not.toHaveProperty("name");
    expect(payload).not.toHaveProperty("email");
    expect(payload).not.toHaveProperty("phone");
    expect(payload.notInterested).toBe(true);
  });
});
