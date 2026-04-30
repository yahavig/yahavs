"use client";

import { useState, useCallback } from "react";
import AccessibilityWidget from "./AccessibilityWidget";

export default function FloatingButtons() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const toggle = useCallback(() => setA11yOpen((v) => !v), []);
  const close  = useCallback(() => setA11yOpen(false), []);

  return (
    <>
      <AccessibilityWidget isOpen={a11yOpen} onClose={close} />

      {/* Accessibility button — image fills button, glass shimmer on top */}
      <button
        onClick={toggle}
        aria-label="פתח כלי נגישות"
        aria-expanded={a11yOpen}
        aria-controls="a11y-widget"
        title="נגישות"
        className="fixed top-3 left-4 z-[199] h-11 w-11 overflow-hidden rounded-full transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:top-auto md:bottom-6 md:left-6"
        style={{
          border:     "1px solid rgba(255,255,255,0.50)",
          boxShadow:  "inset 1.5px 1.5px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(255,255,255,0.20), 0 4px 18px rgba(0,0,0,0.22)",
        }}
      >
        {/* Image — slightly transparent so the glass shimmer reads on top */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/accessibility.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.82 }}
          aria-hidden="true"
          draggable={false}
        />

        {/* Glass shimmer overlay — highlight only, no blur so the image stays sharp */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 55%, rgba(0,0,0,0.04) 100%)",
          }}
        />
      </button>
    </>
  );
}
