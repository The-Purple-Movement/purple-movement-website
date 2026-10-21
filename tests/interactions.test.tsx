import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { faqs } from "@/content/faq";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FeedbackDialog } from "@/components/layout/FeedbackDialog";

describe("FAQ accordion", () => {
  it("uses native buttons with aria-expanded and aria-controls", () => {
    render(<FaqAccordion items={faqs} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(faqs.length);
    for (const button of buttons) {
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveAttribute("aria-expanded", "false");
      const panel = document.getElementById(button.getAttribute("aria-controls")!);
      expect(panel).not.toBeNull();
      expect(panel).toHaveAttribute("aria-labelledby", button.id);
    }
  });

  it("opens and closes with Enter and Space", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={faqs} />);
    const first = screen.getByRole("button", { name: faqs[0].question });
    first.focus();
    await user.keyboard("{Enter}");
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(first.getAttribute("aria-controls")!)).toHaveClass("visible");
    await user.keyboard(" ");
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(first.getAttribute("aria-controls")!)).toHaveClass("invisible");
  });
});

describe("Site header", () => {
  it("has a skip link to the main content", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main");
  });

  it("toggles the mobile menu with correct state, focus and Escape handling", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");
    expect(document.getElementById("mobile-menu")).not.toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById("mobile-menu")!;
    expect(panel).toBeVisible();
    expect(panel.querySelector("a")).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("always shows the Join the Movement call to action", () => {
    render(<SiteHeader />);
    const join = screen.getAllByRole("link").find((a) => a.getAttribute("href") === "/join");
    expect(join).toBeDefined();
    expect(join).toHaveTextContent(/Join the Movement/);
  });
});

describe("Feedback dialog", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("is a labelled modal dialog with visible labels, validation and focus restoration", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 201 }));
    const user = userEvent.setup();
    render(<FeedbackDialog />);
    const trigger = screen.getByRole("button", { name: "Feedback" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Share feedback on this website" });
    expect(dialog).toHaveAttribute("open");
    expect(screen.getByRole("group", { name: "How was your visit?" })).toBeInTheDocument();
    expect(screen.getByLabelText(/what could we improve/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Send feedback" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/choose a rating or write a comment/i);
    expect(fetchMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole("radio", { name: "Good" }));
    await user.click(screen.getByRole("button", { name: "Send feedback" }));
    expect(await screen.findByText(/your feedback was sent/i)).toBeInTheDocument();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ reaction: "happy", feedback: "" });

    await user.click(screen.getByRole("button", { name: "Close feedback" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(trigger).toHaveFocus();
  });
});
