import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const insert = vi.fn();
vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: { from: () => ({ insert: (rows: unknown) => ({ select: () => insert(rows) }) }) },
}));

const { POST } = await import("@/app/api/join/route");

function request(body: unknown) {
  return new NextRequest("http://localhost/api/join", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.7, 10.0.0.1", "user-agent": "test" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const valid = {
  selectedRole: "individual",
  defining: "Student",
  whyHere: "I can mentor a project.",
  portfolioLink: "",
  notInterested: false,
  name: "Anjali Nair",
  email: "anjali@example.org",
  phone: "+919876543210",
};

describe("POST /api/join", () => {
  beforeEach(() => insert.mockReset().mockResolvedValue({ data: [{ id: "abc" }], error: null }));

  it("stores a valid application and keeps the response contract", async () => {
    const response = await POST(request(valid));
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({
      success: true,
      message: "Application submitted successfully",
      applicationId: "abc",
    });
    expect(insert.mock.calls[0][0][0]).toMatchObject({
      selected_role: "individual",
      defining_category: "Student",
      name: "Anjali Nair",
      phone: "+919876543210",
      not_interested: false,
      ip_address: "203.0.113.7",
      portfolio_link: null,
    });
  });

  it("drops contact details for anonymous submissions even if sent", async () => {
    await POST(request({ ...valid, notInterested: true }));
    expect(insert.mock.calls[0][0][0]).toMatchObject({ name: null, email: null, phone: null, not_interested: true });
  });

  it.each([
    ["malformed JSON", "{not json"],
    ["unknown path", { ...valid, selectedRole: "admin" }],
    ["non-http link", { ...valid, portfolioLink: "javascript:alert(1)" }],
    ["oversized contribution", { ...valid, whyHere: "x".repeat(2001) }],
    ["missing contact details", { ...valid, email: "" }],
    ["short phone", { ...valid, phone: "12345" }],
  ])("rejects %s with 400", async (_label, body) => {
    const response = await POST(request(body));
    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });

  it("does not log personal data when the database rejects a row", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    insert.mockResolvedValue({
      data: null,
      error: { code: "23514", message: "violates check constraint", details: "Failing row contains (Anjali Nair, anjali@example.org)" },
    });
    const response = await POST(request(valid));
    expect(response.status).toBe(500);
    expect(JSON.stringify(consoleError.mock.calls)).not.toMatch(/anjali/i);
    expect(JSON.stringify(consoleError.mock.calls)).toMatch(/23514/);
  });
});
