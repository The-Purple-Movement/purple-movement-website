import { describe, expect, it } from "vitest";
import {
  activities,
  formatActivityDate,
  formatActivityTime,
  partitionActivities,
  todayInIndia,
} from "@/content/activities";
import { joinPaths } from "@/content/join";

describe("activity data", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = activities.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it.each(activities.map((a) => [a.slug, a] as const))("%s exposes every required fact", (_slug, a) => {
    expect(a.title.trim()).not.toBe("");
    expect(a.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    if (a.endDate) expect(a.endDate >= a.startDate).toBe(true);
    expect(a.summary.trim().length).toBeGreaterThan(20);
    expect(a.registration.trim()).not.toBe("");
    expect(a.source.trim()).not.toBe("");
    if (a.image) {
      expect(a.image.alt.length).toBeGreaterThan(20);
      expect(a.image.width).toBeGreaterThan(0);
      expect(a.image.height).toBeGreaterThan(0);
    }
    if (a.externalLink) expect(a.externalLink.href).toMatch(/^https:\/\//);
  });

  it("features Rise Together 2026 as upcoming before 18 November 2026", () => {
    const { featured, past } = partitionActivities("2026-10-20");
    expect(featured?.slug).toBe("rise-together-2026");
    expect(past.some((a) => a.slug === "ai-compassion-global-forum-2026")).toBe(true);
  });

  it("moves activities to the past list after their last day", () => {
    expect(partitionActivities("2026-11-18").featured?.slug).toBe("rise-together-2026");
    const after = partitionActivities("2026-11-19");
    expect(after.featured).toBeNull();
    expect(after.past[0].slug).toBe("rise-together-2026");
  });

  it("orders upcoming soonest-first and past newest-first", () => {
    const { upcoming, past } = partitionActivities("2026-10-20");
    expect(upcoming.map((a) => a.startDate)).toEqual(upcoming.map((a) => a.startDate).sort());
    expect(past.map((a) => a.startDate)).toEqual(past.map((a) => a.startDate).sort().reverse());
  });

  it("computes today in India time", () => {
    // 20:00 UTC on 17 Nov is already 18 Nov in India.
    expect(todayInIndia(new Date("2026-11-17T20:00:00Z"))).toBe("2026-11-18");
  });

  it("formats dates, ranges and missing times without inventing values", () => {
    expect(formatActivityDate({ startDate: "2026-11-18" })).toBe("18 November 2026");
    expect(formatActivityDate({ startDate: "2026-10-02", endDate: "2026-10-03" })).toBe("2–3 October 2026");
    expect(formatActivityTime({ time: null, timeZone: "IST (UTC+05:30)" })).toBe("Time to be announced · IST (UTC+05:30)");
    expect(formatActivityTime({ time: null, timeZone: null }, true)).toBe("Time not published");
    expect(formatActivityTime({ time: "6:00–8:00 PM", timeZone: null })).toMatch(/time zone not published/);
  });
});

describe("join paths", () => {
  it("keeps the stored path ids stable", () => {
    expect(joinPaths.map((p) => p.id)).toEqual(["individual", "organization", "government"]);
  });

  it("gives every path visible text, an action and an 'Other' option", () => {
    for (const p of joinPaths) {
      expect(p.contribution && p.nextStep && p.action).toBeTruthy();
      expect(p.roles.at(-1)?.value).toBe("Other");
    }
  });
});
