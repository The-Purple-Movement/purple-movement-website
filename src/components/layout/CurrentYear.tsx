"use client";

import { useEffect, useState } from "react";

/**
 * Renders the year from the build, then corrects it in the browser so statically generated
 * pages never show a stale copyright year.
 */
export function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
