"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const arrowClass =
  "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] transition-opacity disabled:pointer-events-none disabled:opacity-0 sm:flex";

export default function ProductCarousel({ label, children }) {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    // scrollLeft is 0 at the start edge and negative in RTL, so compare magnitudes.
    const pos = Math.abs(el.scrollLeft);
    setEdges({ start: pos < 4, end: pos + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const scrollByPage = (forward) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const sign = (forward ? 1 : -1) * (rtl ? -1 : 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: sign * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="bleed relative">
      <div
        ref={track}
        onScroll={update}
        role="group"
        aria-roledescription="קרוסלה"
        aria-label={label}
        className="flex snap-x justify-center-safe snap-mandatory gap-3 overflow-x-auto gutter-strip scroll-px-6 pb-3 sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByPage(false)}
        disabled={edges.start}
        aria-label="הקודם"
        className={`${arrowClass} right-2`}
      >
        <ChevronRight size={28} strokeWidth={2.5} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollByPage(true)}
        disabled={edges.end}
        aria-label="הבא"
        className={`${arrowClass} left-2`}
      >
        <ChevronLeft size={28} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}
