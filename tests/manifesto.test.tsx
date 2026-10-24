import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { manifesto, manifestoTitle, parseEmphasis, plainText } from "@/content/manifesto";
import { primaryNav } from "@/content/site";
import { Manifesto } from "@/components/manifesto/Manifesto";
import ManifestoPage from "@/app/manifesto/page";
import HomePage from "@/app/page";

/** The manifesto as supplied by the movement, used to guard against accidental edits. */
const SOURCE = `We are the Manifestors of Change. Not waiting for the future, but building it with courage, code, creativity, and clarity. We are the voice of a generation that refuses to settle. We are not consumers of culture; we are producers of purpose. We break barriers for every young mind daring to dream. We believe in ecosystems that empower, not limit. In access, not gatekeeping. In bold visions, not borrowed templates. We are here to reclaim the narrative. To give confidence to the curious, networks to the bold, and direction to the determined. This is The Purple Movement. A wave of youth power, purpose, and possibility. A signal that change is not coming—it’s already here. We are the energy. We are the strategy. We are the spark. And it starts now.`;

/** Visible manifesto text: heading + each paragraph, joined the way a reader hears it. */
const rendered = (el: HTMLElement) =>
  [...el.querySelectorAll("#manifesto-title, #manifesto-title ~ div p")].map((n) => n.textContent).join(" ");

describe("manifesto content", () => {
  it("matches the movement's text word for word", () => {
    expect([manifestoTitle, ...manifesto.map((b) => plainText(b.text))].join(" ")).toBe(SOURCE);
  });

  it("parses **highlights** without losing text", () => {
    expect(parseEmphasis("a **b** c")).toEqual([
      { text: "a ", strong: false },
      { text: "b", strong: true },
      { text: " c", strong: false },
    ]);
    for (const b of manifesto) expect(parseEmphasis(b.text).map((p) => p.text).join("")).toBe(plainText(b.text));
  });
});

describe("Manifesto component", () => {
  it("renders the full text with highlights and no leftover markers", () => {
    const { container } = render(<Manifesto variant="home" />);
    expect(screen.getByRole("heading", { level: 2, name: manifestoTitle })).toBeInTheDocument();
    expect(container.textContent).not.toContain("**");
    expect(rendered(container)).toBe(SOURCE);
    expect(container.querySelectorAll("strong").length).toBeGreaterThan(5);
    expect(container.querySelector("[aria-hidden='true'] span")).toBeNull(); // no decorative word cloud
    expect(screen.getByRole("link", { name: /open the manifesto page/i })).toHaveAttribute("href", "/manifesto");
  });

  it("is the page's only H1 on /manifesto", () => {
    const { container } = render(<ManifestoPage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(manifestoTitle);
  });
});

describe("manifesto placement", () => {
  it("is the first item in the main navigation", () => {
    expect(primaryNav[0]).toEqual({ label: "Manifesto", href: "/manifesto" });
  });

  it("comes directly after the hero, followed by the movement's own story", () => {
    const { container } = render(<HomePage />);
    const order = ["#hero-title", "#manifesto-title", "#about", "#why-purple-title", "#pillars-title", "#rise-together-title"];
    const nodes = order.map((sel) => container.querySelector(sel)!);
    nodes.forEach((n, i) => {
      expect(n, order[i]).not.toBeNull();
      if (i > 0) expect(nodes[i - 1].compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });
});
