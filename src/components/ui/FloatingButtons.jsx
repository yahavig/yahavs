"use client";

import { useState, useCallback } from "react";
import AccessibilityWidget from "./AccessibilityWidget";

// Static — hoisted out of render so the object identity is stable
const BUTTON_STYLE = {
  background: "rgba(0, 87, 184, 0.82)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow:
    "inset 1.5px 1.5px 1px rgba(255,255,255,0.35), inset -1px -1px 1px rgba(255,255,255,0.15), 0 4px 14px rgba(0,87,184,0.45)",
  border: "1px solid rgba(255,255,255,0.25)",
};

export default function FloatingButtons() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const toggle = useCallback(() => setA11yOpen((v) => !v), []);
  const close = useCallback(() => setA11yOpen(false), []);

  return (
    <>
      <AccessibilityWidget isOpen={a11yOpen} onClose={close} />

      {/* Accessibility button - top LEFT, liquid glass blue */}
      <button
        onClick={toggle}
        aria-label="פתח כלי נגישות"
        aria-expanded={a11yOpen}
        aria-controls="a11y-widget"
        title="נגישות"
        className="fixed top-3 left-4 z-[199] flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus-visible:outline-none"
        style={BUTTON_STYLE}
      >
        <AccessibilityButtonIcon />
      </button>
    </>
  );
}

function AccessibilityButtonIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Head */}
      <circle cx="12" cy="4" r="2" fill="white" />
      {/* Arms - wide outstretched */}
      <line x1="2" y1="9.5" x2="22" y2="9.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Body */}
      <line x1="12" y1="7.5" x2="12" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Left leg */}
      <line x1="12" y1="14" x2="8" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Right leg */}
      <line x1="12" y1="14" x2="16" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

