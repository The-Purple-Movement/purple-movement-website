/**
 * The Purple Movement manifesto — the movement's core text. Edit wording here only;
 * the homepage section and /manifesto both render from this file.
 * Wrap a phrase in **double asterisks** to set it in purple.
 */

export interface ManifestoBlock {
  /**
   * paragraph = running statement, line = declaration, lead = "This is…" moment,
   * chant = stacked "We are…" lines, close = final call.
   */
  kind: "paragraph" | "line" | "lead" | "chant" | "close";
  text: string;
}

export const manifestoTitle = "We are the Manifestors of Change.";

export const manifesto: ManifestoBlock[] = [
  {
    kind: "paragraph",
    text: "Not waiting for the future, but building it with **courage, code, creativity, and clarity.** We are the voice of a generation that **refuses to settle.**",
  },
  {
    kind: "paragraph",
    text: "We are not consumers of culture; we are **producers of purpose.** We break barriers for every young mind **daring to dream.** We believe in ecosystems that **empower, not limit.**",
  },
  { kind: "line", text: "In access, not gatekeeping." },
  { kind: "line", text: "In bold visions, not borrowed templates." },
  {
    kind: "paragraph",
    text: "We are here to **reclaim the narrative.** To give confidence to the curious, networks to the bold, and direction to the determined.",
  },
  { kind: "lead", text: "This is The Purple Movement." },
  {
    kind: "paragraph",
    text: "A wave of **youth power, purpose, and possibility.** A signal that change is not coming—**it’s already here.**",
  },
  { kind: "chant", text: "We are the energy." },
  { kind: "chant", text: "We are the strategy." },
  { kind: "chant", text: "We are the spark." },
  { kind: "close", text: "And it starts now." },
];

/** Splits "**highlight**" markers into segments; `strong` segments render in purple. */
export function parseEmphasis(text: string): { text: string; strong: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") ? { text: part.slice(2, -2), strong: true } : { text: part, strong: false },
    );
}

/** Plain text of a block (markers removed) — for metadata and tests. */
export function plainText(text: string): string {
  return text.replace(/\*\*/g, "");
}
