import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { JoinFlow } from "@/components/join/JoinFlow";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

async function fillContribution(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByLabelText("Which best describes you?"), "Student");
  await user.type(
    screen.getByLabelText("What would you like to contribute or work on?"),
    "I can mentor a student project on web accessibility.",
  );
  await user.click(screen.getByRole("button", { name: /continue to contact/i }));
}

async function fillContact(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full name"), "Anjali Nair");
  await user.type(screen.getByLabelText("Email address"), "anjali@example.org");
  await user.selectOptions(screen.getByLabelText("Country or region"), "IN");
  await user.type(screen.getByLabelText("Number"), "98765 43210");
  await user.click(screen.getByRole("button", { name: /continue to review/i }));
}

describe("JoinFlow", () => {
  it("names every step and marks the current one", () => {
    render(<JoinFlow />);
    const progress = screen.getByRole("list", { name: "Progress" });
    const items = within(progress).getAllByRole("listitem");
    expect(items.map((i) => i.textContent)).toEqual([
      "Step 1: Path",
      "Step 2: Contribution",
      "Step 3: Contact",
      "Step 4: Review",
    ]);
    expect(items[0]).toHaveAttribute("aria-current", "step");
  });

  it("shows a focused error summary when continuing without a choice", async () => {
    const user = userEvent.setup();
    render(<JoinFlow />);
    await user.click(screen.getByRole("button", { name: /continue to contribution/i }));
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Choose a path to continue.");
    expect(alert).toHaveFocus();
  });

  it("starts on the contribution step when a path is chosen on the homepage, and lets you change it", async () => {
    const user = userEvent.setup();
    render(<JoinFlow initialPath="organization" />);
    expect(screen.getByRole("heading", { name: "What would you like to contribute?" })).toBeInTheDocument();
    expect(screen.getByText("organization")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Change path" }));
    expect(screen.getByRole("radio", { name: /organization/i })).toBeChecked();
  });

  it("validates inline with persistent labels and links errors to fields", async () => {
    const user = userEvent.setup();
    render(<JoinFlow initialPath="individual" />);
    const contribution = screen.getByLabelText("What would you like to contribute or work on?");
    await user.type(contribution, "short");
    await user.tab();
    expect(contribution).toHaveAttribute("aria-invalid", "true");
    expect(contribution).toHaveAccessibleDescription(expect.stringMatching(/at least 10 characters/));
  });

  it("preserves answers when going back", async () => {
    const user = userEvent.setup();
    render(<JoinFlow initialPath="individual" />);
    await fillContribution(user);
    expect(screen.getByRole("heading", { name: "How can we reach you?" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByLabelText("Which best describes you?")).toHaveValue("Student");
    expect(screen.getByLabelText("What would you like to contribute or work on?")).toHaveValue(
      "I can mentor a student project on web accessibility.",
    );
  });

  it("does not preselect a country", async () => {
    const user = userEvent.setup();
    render(<JoinFlow initialPath="individual" />);
    await fillContribution(user);
    expect(screen.getByLabelText("Country or region")).toHaveValue("");
  });

  it("explains anonymous participation and hides contact fields", async () => {
    const user = userEvent.setup();
    render(<JoinFlow initialPath="individual" />);
    await fillContribution(user);
    const anonymous = screen.getByRole("checkbox", { name: /join anonymously/i });
    expect(anonymous).toHaveAccessibleDescription(/won’t be able to reply/);
    await user.click(anonymous);
    expect(screen.queryByLabelText("Email address")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /continue to review/i }));
    expect(screen.getByText("Anonymous — no contact details shared")).toBeInTheDocument();
  });

  it("submits once, sends the expected payload and explains what happens next", async () => {
    let resolve!: (value: Response) => void;
    fetchMock.mockReturnValue(new Promise<Response>((r) => (resolve = r)));
    const user = userEvent.setup();
    render(<JoinFlow initialPath="individual" />);
    await fillContribution(user);
    await fillContact(user);

    expect(screen.getByText(/\+919876543210/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy notice" })).toHaveAttribute("href", "/privacy");

    const submit = screen.getByRole("button", { name: "Submit" });
    await user.click(submit);
    await user.click(screen.getByRole("button", { name: "Submitting…" }));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/join");
    expect(JSON.parse(init.body)).toEqual({
      selectedRole: "individual",
      defining: "Student",
      whyHere: "I can mentor a student project on web accessibility.",
      portfolioLink: "",
      notInterested: false,
      name: "Anjali Nair",
      email: "anjali@example.org",
      phone: "+919876543210",
    });

    resolve(new Response(JSON.stringify({ success: true }), { status: 201 }));
    const heading = await screen.findByRole("heading", { name: /thank you, anjali/i });
    await waitFor(() => expect(heading).toHaveFocus());
    expect(screen.getByRole("heading", { name: "What happens next" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /whatsapp community/i })).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps answers and allows retry after a failed submission, without logging them", async () => {
    const consoleError = vi.spyOn(console, "error");
    const consoleLog = vi.spyOn(console, "log");
    fetchMock.mockRejectedValueOnce(new TypeError("network down"));
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 201 }));
    const user = userEvent.setup();
    render(<JoinFlow initialPath="individual" />);
    await fillContribution(user);
    await fillContact(user);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/didn’t go through/);
    expect(screen.getByText(/Anjali Nair/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByRole("heading", { name: /thank you/i })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const logged = JSON.stringify([...consoleError.mock.calls, ...consoleLog.mock.calls]);
    expect(logged).not.toMatch(/anjali|98765/i);
  });
});
