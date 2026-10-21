import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom type scale from globals.css; otherwise `text-display-*` is mistaken
// for a colour and dropped when combined with a `text-pm-*` colour class.
const twMerge = extendTailwindMerge({
  extend: {
    theme: { text: ["display-sm", "display-md", "display-lg"] },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
