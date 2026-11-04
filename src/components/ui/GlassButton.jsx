"use client";
/**
 * Flat (2D) Apple-style pill button: solid Action Blue, no shadow, no gloss.
 * Name kept (GlassButton) so existing imports keep working.
 */
import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { ACTION_BLUE_GLASS } from "@/lib/constants";

/* ─── Size variants ──────────────────────────────────────────────── */
const SIZES = {
  xs:      "px-3.5 py-1.5 text-xs font-normal",
  sm:      "px-4 py-2 text-sm font-normal",
  default: "px-6 py-3.5 text-base font-normal",
  lg:      "px-8 py-4 text-lg font-normal",
  icon:    "h-10 w-10 p-0",
};

/* ─── Component ──────────────────────────────────────────────────── */
export function GlassButton({
  children,
  size = "default",
  className,
  contentClassName,
  glassColor = ACTION_BLUE_GLASS,
  href,
  external = false,
  ...props
}) {
  const rawId  = useId();
  const uid    = rawId.replace(/:/g, "");

  /* Polymorphic tag: Link for internal routes, <a> for external, <button> otherwise */
  const Tag = href
    ? external
      ? "a"
      : Link
    : "button";

  const tagProps = href
    ? external
      ? { href, target: "_blank", rel: "noopener noreferrer", ...props }
      : { href, ...props }
    : props;

  return (
    <>
      <style>{`
        .glass-btn-${uid} {
          appearance: none;
          border: none;
          background: transparent;
          color: ${glassColor ? "white" : "var(--color-text-primary, #F5F5F7)"};
          --glass-reflex-light: 1;
          --glass-reflex-dark: 1;
        }
        .glass-btn-lens-${uid} {
          background-color: ${glassColor ?? "rgba(255,255,255,0.08)"};
          transition: background-color 200ms ease-out;
        }
        .glass-btn-${uid}:not(:disabled):hover .glass-btn-lens-${uid} {
          background-color: ${glassColor === ACTION_BLUE_GLASS ? "#0071e3" : glassColor ?? "rgba(255,255,255,0.14)"};
          ${glassColor === ACTION_BLUE_GLASS ? "" : "filter: brightness(1.08);"}
        }
        .glass-btn-text-${uid} {
        }
        .glass-btn-${uid}:not(:disabled):active {
          transform: scale(0.95);
        }
      `}</style>

      <Tag
        className={cn(
          "relative isolate inline-flex items-center justify-center gap-2 rounded-full cursor-pointer",
          "transition-transform duration-200 ease-out tracking-tight",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
          `glass-btn-${uid}`,
          SIZES[size] ?? SIZES.default,
          className
        )}
        {...tagProps}
      >
        {/* Liquid-glass lens layer */}
        <span
          className={cn(
            "absolute inset-0 -z-10 rounded-[inherit] pointer-events-none",
            `glass-btn-lens-${uid}`
          )}
        />
        {/* Content */}
        <span
          className={cn(
            "relative z-10 w-full flex items-center justify-center gap-[inherit] select-none",
            `glass-btn-text-${uid}`,
            contentClassName
          )}
        >
          {children}
        </span>
      </Tag>
    </>
  );
}

export default GlassButton;
