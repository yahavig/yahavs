"use client";
/**
 * Apple Tahoe–style Liquid Glass Button
 * Adapted from 21st.dev/community/components/easemize/apple-tahoe-liquid-glass-button
 *
 * Uses a WebP displacement map + SVG filter to create true liquid-glass
 * refraction on top of backdrop-filter blur.
 *
 * Works best in Chrome / Edge (SVG backdrop-filter support).
 * Safari falls back to plain blur — still looks great.
 */
import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Displacement map (WebP) ────────────────────────────────────── */
const WEBP_DISPLACEMENT_MAP = "/displacement-map.webp";

/* ─── Size variants ──────────────────────────────────────────────── */
const SIZES = {
  xs:      "px-3.5 py-1.5 text-xs font-medium",
  sm:      "px-4 py-2 text-sm font-medium",
  default: "px-6 py-3.5 text-base font-medium",
  lg:      "px-8 py-4 text-lg font-medium",
  icon:    "h-10 w-10 p-0",
};

/* ─── Component ──────────────────────────────────────────────────── */
export function GlassButton({
  children,
  size = "default",
  className,
  contentClassName,
  glassColor,
  href,
  external = false,
  ...props
}) {
  const rawId  = useId();
  const uid    = rawId.replace(/:/g, "");
  const filterId = `liquid-glass-${uid}`;

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
      {/* Hidden SVG filter — zero size so it doesn't affect layout */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} primitiveUnits="objectBoundingBox">
            <feImage
              result="map"
              width="100%"
              height="100%"
              x="0"
              y="0"
              href={WEBP_DISPLACEMENT_MAP}
              preserveAspectRatio="none"
            />
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.01" result="blur" />
            <feDisplacementMap
              in="blur"
              in2="map"
              scale="0.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

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
          backdrop-filter: blur(8px) url(#${filterId}) saturate(150%);
          -webkit-backdrop-filter: blur(8px) saturate(150%);
          box-shadow:
            inset 0 0 0 1px color-mix(in srgb, white calc(var(--glass-reflex-light) * 10%), transparent),
            inset 1.8px 3px 0px -2px color-mix(in srgb, white calc(var(--glass-reflex-light) * 90%), transparent),
            inset -2px -2px 0px -2px color-mix(in srgb, white calc(var(--glass-reflex-light) * 80%), transparent),
            inset -3px -8px 1px -6px color-mix(in srgb, white calc(var(--glass-reflex-light) * 60%), transparent),
            inset -0.3px -1px 4px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 12%), transparent),
            inset -1.5px 2.5px 0px -2px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 20%), transparent),
            inset 0px 3px 4px -2px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 20%), transparent),
            inset 2px -6.5px 1px -4px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 10%), transparent),
            0px 1px 5px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 10%), transparent),
            0px 6px 16px 0px color-mix(in srgb, black calc(var(--glass-reflex-dark) * 8%), transparent);
          transition:
            background-color 400ms cubic-bezier(1, 0, 0.4, 1),
            box-shadow 400ms cubic-bezier(1, 0, 0.4, 1);
        }
        .glass-btn-text-${uid} {
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          transition: color 400ms cubic-bezier(1, 0, 0.4, 1);
        }
        @media (hover: hover) {
          .glass-btn-${uid}:not(:disabled):hover {
            transform: scale(1.03);
          }
        }
        .glass-btn-${uid}:not(:disabled):active {
          transform: scale(0.96);
        }
      `}</style>

      <Tag
        className={cn(
          "relative isolate inline-flex items-center justify-center gap-2 rounded-full cursor-pointer",
          "transition-transform duration-300 ease-out tracking-tight",
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
