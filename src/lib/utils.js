/**
 * Merges class names together, filtering out falsy values.
 * Lightweight alternative to clsx + tailwind-merge for this project.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
