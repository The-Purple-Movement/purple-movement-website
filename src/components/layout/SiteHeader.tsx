"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/content/site";
import { buttonClass } from "@/components/ui/links";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Move focus into the menu when it opens; handle Escape; close if the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-pm-accent-strong px-4 py-3 font-bold text-pm-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <header className="pm-dark sticky top-0 z-50 border-b border-pm-line bg-pm-bg">
        <div className="pm-container flex h-[var(--pm-header-height)] items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-12 items-center" aria-label="The Purple Movement — home">
            <Image src="/logos/logo_pm.webp" alt="" width={128} height={40} preload className="h-10 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-12 items-center rounded-md px-3 font-display text-base font-semibold text-pm-text-secondary hover:text-pm-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/join" className={buttonClass("primary", "px-4 sm:px-5")}>
              <span className="sm:hidden">Join</span>
              <span className="hidden sm:inline">Join the Movement</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-md border border-pm-line-strong px-3 font-display text-base font-semibold lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
              <span>Menu</span>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          hidden={!open}
          className="border-t border-pm-line bg-pm-surface-alt lg:hidden"
        >
          <nav aria-label="Main" className="pm-container py-2">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href} className="border-b border-pm-line last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center font-display text-lg font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
