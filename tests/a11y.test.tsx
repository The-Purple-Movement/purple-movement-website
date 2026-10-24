import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";
import ManifestoPage from "@/app/manifesto/page";
import ActivityPage from "@/app/activities/[slug]/page";
import { JoinFlow } from "@/components/join/JoinFlow";

/** axe-core in jsdom: structural WCAG A/AA rules. Colour contrast needs real layout and is checked in a browser. */
async function violations(container: HTMLElement) {
  const results = await axe.run(container, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
    rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
  });
  return results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
}

function headingLevels(container: HTMLElement) {
  return [...container.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
}

describe("accessibility", () => {
  it("homepage has no axe violations, one H1 and no skipped heading levels", async () => {
    const { container } = render(<HomePage />);
    expect(await violations(container)).toEqual([]);
    const levels = headingLevels(container);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1]).toBeLessThanOrEqual(1);
    });
  });

  it("join flow has no axe violations", async () => {
    const { container } = render(<JoinFlow />);
    expect(await violations(container)).toEqual([]);
  });

  it("activity detail page has no axe violations", async () => {
    const page = await ActivityPage({ params: Promise.resolve({ slug: "rise-together-2026" }) });
    const { container } = render(page);
    expect(await violations(container)).toEqual([]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it.each([
    ["privacy", PrivacyPage],
    ["terms", TermsPage],
    ["manifesto", ManifestoPage],
  ])("%s page has no axe violations", async (_name, Page) => {
    const { container } = render(<Page />);
    expect(await violations(container)).toEqual([]);
  });

  it("every icon-only link and button has an accessible name", () => {
    const { container } = render(<HomePage />);
    for (const el of container.querySelectorAll("a, button")) {
      const name = el.getAttribute("aria-label") ?? el.textContent ?? "";
      expect(name.trim(), el.outerHTML.slice(0, 120)).not.toBe("");
    }
  });

  it("opens every external link safely and announces the new tab", () => {
    const { container } = render(<HomePage />);
    const external = [...container.querySelectorAll<HTMLAnchorElement>("a[href^='http']")];
    expect(external.length).toBeGreaterThan(5);
    for (const a of external) {
      expect(a.rel).toContain("noopener");
      expect(a.target).toBe("_blank");
      expect((a.getAttribute("aria-label") ?? a.textContent)!).toMatch(/opens in a new tab/);
    }
  });
});
