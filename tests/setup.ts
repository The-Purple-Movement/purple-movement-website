import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { createElement } from "react";

afterEach(() => cleanup());

// next/image needs the Next.js runtime; a plain <img> keeps alt text and sizing testable.
vi.mock("next/image", () => ({
  default: ({ src, alt, fill: _fill, preload: _preload, fetchPriority: _fp, ...rest }: Record<string, unknown>) =>
    createElement("img", { src, alt, ...rest }),
  getImageProps: ({ src, alt, sizes }: { src: string; alt: string; sizes?: string }) => ({
    props: { src, alt, sizes, srcSet: `${src} 1x` },
  }),
}));

// jsdom may lack <dialog> modal methods; emulate them (showModal → open, close → "close" event).
if (typeof HTMLDialogElement !== "undefined" && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

// matchMedia is used by the header to close the mobile menu on desktop.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList;
}
