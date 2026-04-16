"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal scroll carousel with edge-fade and arrow navigation.
 * RTL-aware: left arrow = forward (shows more), right arrow = back.
 */
export default function Carousel({ children, className = "" }) {
  const ref = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    // In RTL (Chrome/Edge), scrollLeft is negative when scrolled away from right edge.
    const absScroll = Math.abs(scrollLeft);
    const maxScroll = scrollWidth - clientWidth;
    setCanPrev(absScroll > 4);
    setCanNext(maxScroll > 4 && absScroll < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  // go(-1) scrolls left  = forward in RTL reading direction
  // go(+1) scrolls right = backward in RTL reading direction
  const go = (sign) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: sign * el.clientWidth * 0.72, behavior: "smooth" });
  };

  const btnBase =
    "absolute top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border-light)] shadow-[var(--shadow-lg)] transition-all duration-200 hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";

  return (
    <div className={`relative ${className}`}>
      {/* Left edge fade + button - "next" in RTL */}
      <div className="pointer-events-none absolute start-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-e from-[var(--color-bg)] to-transparent" />
      <button
        onClick={() => go(-1)}
        aria-label="הבא"
        disabled={!canNext}
        className={`${btnBase} start-2 ${canNext ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <ChevronLeft size={18} className="text-[var(--color-text-primary)]" />
      </button>

      {/* Scrollable strip */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
      >
        {children}
      </div>

      {/* Right edge fade + button - "prev" in RTL */}
      <div className="pointer-events-none absolute end-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-s from-[var(--color-bg)] to-transparent" />
      <button
        onClick={() => go(1)}
        aria-label="הקודם"
        disabled={!canPrev}
        className={`${btnBase} end-2 ${canPrev ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <ChevronRight size={18} className="text-[var(--color-text-primary)]" />
      </button>
    </div>
  );
}
