import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { goal, hero, pillars, purpose, whyPurple } from "@/content/about";

/** Copy from purple-movement.com must appear on the homepage exactly as the movement wrote it. */
describe("original Purple Movement copy", () => {
  it("uses the original hero as a single H1", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("We are the Purple Movement");
    expect(screen.getByText(hero.body)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Build meaningful projects with people who care/);
  });

  it.each([
    ["Our Goal", goal.body],
    ["Our Purpose", purpose.body],
  ])("shows %s verbatim", (heading, body) => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    expect(screen.getByText(body)).toBeInTheDocument();
  });

  it("shows Why Purple verbatim", () => {
    render(<HomePage />);
    for (const text of [whyPurple.intro, whyPurple.red, whyPurple.blue, whyPurple.gap, whyPurple.aim, ...whyPurple.places, whyPurple.together, whyPurple.promise]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    expect(screen.getByText(`“${whyPurple.quote}”`)).toBeInTheDocument();
  });

  it("shows the three pillars", () => {
    render(<HomePage />);
    for (const p of pillars) {
      expect(screen.getByRole("heading", { level: 3, name: p.title })).toBeInTheDocument();
      expect(screen.getByText(p.body)).toBeInTheDocument();
    }
  });
});
