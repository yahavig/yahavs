"use client";

/**
 * ProfileStatsBar
 * A minimal, centered row of stat "chips" — e.g. "12.5K מנויים · 48 סרטונים"
 *
 * Props:
 *   items: Array<{ label: string, value: string | null }>
 *          Pass only the stats relevant to each platform.
 *          Items with value=null or value="0" are hidden.
 */
export default function ProfileStatsBar({ items = [] }) {
  const visible = items.filter(({ value }) => value && value !== "0" && value !== "null");
  if (!visible.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-1">
      {visible.map(({ label, value }, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)]"
        >
          <span className="font-semibold text-[var(--color-text-primary)]">{value}</span>
          {label}
          {i < visible.length - 1 && (
            <span className="ml-2 opacity-30 select-none">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
