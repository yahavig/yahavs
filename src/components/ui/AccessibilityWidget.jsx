"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const FEATURES = [
  { id: "bigger-text", label: "הגדל טקסט", icon: "A+", htmlClass: "a11y-bigger-text" },
  { id: "smaller-text", label: "הקטן טקסט", icon: "A-", htmlClass: "a11y-smaller-text" },
  { id: "high-contrast", label: "ניגודיות גבוהה", icon: "◑", htmlClass: "a11y-high-contrast" },
  { id: "invert-colors", label: "היפוך צבעים", icon: "⊡", htmlClass: "a11y-invert" },
  { id: "grayscale", label: "גווני אפור", icon: "◻", htmlClass: "a11y-grayscale" },
  { id: "underline-links", label: "קו תחת קישורים", icon: "U̲", htmlClass: "a11y-underline-links" },
  { id: "readable-font", label: "פונט קריא", icon: "Aa", htmlClass: "a11y-readable-font" },
  { id: "pause-animations", label: "עצור אנימציות", icon: "⏸", htmlClass: "a11y-pause-animations" },
  { id: "cursor-big", label: "סמן גדול", icon: "⊕", htmlClass: "a11y-big-cursor" },
  { id: "text-spacing", label: "ריווח מרווח", icon: "↔", htmlClass: "a11y-text-spacing" },
];

const A11Y_CSS = `
/* Accessibility: Bigger text */
.a11y-bigger-text { font-size: 120% !important; }
.a11y-bigger-text * { font-size: inherit !important; }

/* Accessibility: Smaller text */
.a11y-smaller-text { font-size: 85% !important; }
.a11y-smaller-text * { font-size: inherit !important; }

/* Accessibility: High contrast */
.a11y-high-contrast,
.a11y-high-contrast * {
  background: #000 !important;
  color: #fff !important;
  border-color: #fff !important;
}
.a11y-high-contrast a { color: #ff0 !important; }
.a11y-high-contrast button, .a11y-high-contrast [role="button"] {
  background: #fff !important; color: #000 !important;
}

/* Accessibility: Invert colors */
.a11y-invert { filter: invert(1) hue-rotate(180deg) !important; }
.a11y-invert img, .a11y-invert video { filter: invert(1) hue-rotate(180deg) !important; }

/* Accessibility: Grayscale */
.a11y-grayscale { filter: grayscale(1) !important; }

/* Accessibility: Underline links */
.a11y-underline-links a { text-decoration: underline !important; }

/* Accessibility: Readable font (OpenDyslexic fallback) */
.a11y-readable-font * {
  font-family: Arial, "Helvetica Neue", sans-serif !important;
  letter-spacing: 0.05em !important;
  word-spacing: 0.1em !important;
}

/* Accessibility: Pause animations */
.a11y-pause-animations *,
.a11y-pause-animations *::before,
.a11y-pause-animations *::after {
  animation-play-state: paused !important;
  transition-duration: 0.001ms !important;
}

/* Accessibility: Big cursor */
.a11y-big-cursor * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath d='M4 0l16 12.279-6.951 1.17 4.325 8.716-3.474 1.735-4.343-8.738-5.557 5.258z' fill='%23000' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E") 0 0, auto !important; }

/* Accessibility: Text spacing */
.a11y-text-spacing * {
  line-height: 1.9 !important;
  letter-spacing: 0.08em !important;
  word-spacing: 0.15em !important;
}
`;

export default function AccessibilityWidget({ isOpen, onClose }) {
  const [active, setActive]     = useState({});
  const [darkMode, setDarkMode] = useState(null); // null = system, 'dark', 'light'

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById("a11y-styles")) return;
    const style = document.createElement("style");
    style.id = "a11y-styles";
    style.textContent = A11Y_CSS;
    document.head.appendChild(style);
  }, []);

  // Restore saved dark mode
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") setDarkMode(saved);
    } catch {}
  }, []);

  const toggleDarkMode = useCallback((mode) => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    if (mode === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode("dark");
    } else if (mode === "light") {
      html.classList.add("light");
      localStorage.setItem("theme", "light");
      setDarkMode("light");
    } else {
      localStorage.removeItem("theme");
      setDarkMode(null);
    }
  }, []);

  // Restore saved state
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("a11y-state") || "{}");
      setActive(saved);
      Object.entries(saved).forEach(([id, on]) => {
        if (on) {
          const f = FEATURES.find((f) => f.id === id);
          if (f) document.documentElement.classList.add(f.htmlClass);
        }
      });
    } catch {}
  }, []);

  const toggle = useCallback((feature) => {
    const html = document.documentElement;
    setActive((prev) => {
      const next = { ...prev, [feature.id]: !prev[feature.id] };

      // Handle mutually exclusive features
      if (feature.id === "bigger-text" && next["bigger-text"]) {
        next["smaller-text"] = false;
        html.classList.remove("a11y-smaller-text");
      }
      if (feature.id === "smaller-text" && next["smaller-text"]) {
        next["bigger-text"] = false;
        html.classList.remove("a11y-bigger-text");
      }
      if (feature.id === "high-contrast" && next["high-contrast"]) {
        next["invert-colors"] = false;
        next["grayscale"] = false;
        html.classList.remove("a11y-invert", "a11y-grayscale");
      }
      if (feature.id === "invert-colors" && next["invert-colors"]) {
        next["high-contrast"] = false;
        next["grayscale"] = false;
        html.classList.remove("a11y-high-contrast", "a11y-grayscale");
      }
      if (feature.id === "grayscale" && next["grayscale"]) {
        next["high-contrast"] = false;
        next["invert-colors"] = false;
        html.classList.remove("a11y-high-contrast", "a11y-invert");
      }

      if (next[feature.id]) {
        html.classList.add(feature.htmlClass);
      } else {
        html.classList.remove(feature.htmlClass);
      }

      localStorage.setItem("a11y-state", JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    FEATURES.forEach((f) => {
      document.documentElement.classList.remove(f.htmlClass);
    });
    document.documentElement.classList.remove("dark", "light");
    setActive({});
    setDarkMode(null);
    localStorage.removeItem("a11y-state");
    localStorage.removeItem("theme");
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="תפריט נגישות"
      className="fixed top-[60px] left-4 z-[200] w-72 rounded-2xl bg-white shadow-[var(--shadow-lg)] border border-[var(--color-border-light)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-[#0057B8] px-4 py-3">
        <div className="flex items-center gap-2">
          <AccessibilityIcon />
          <h2 className="text-sm font-bold text-white">כלי נגישות</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="סגור תפריט נגישות"
          className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:bg-white/20 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Dark mode toggle */}
      <div className="px-3 pt-3 pb-1">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#6E6E73]">מצב תצוגה</p>
        <div className="flex gap-1.5">
          {[
            { mode: "light", label: "בהיר",  icon: "☀" },
            { mode: null,    label: "אוטו",  icon: "⟳" },
            { mode: "dark",  label: "כהה",   icon: "☾" },
          ].map(({ mode, label, icon }) => (
            <button
              key={label}
              onClick={() => toggleDarkMode(mode)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold transition-all duration-150 border ${
                darkMode === mode
                  ? "bg-[#0057B8] text-white border-[#0057B8]"
                  : "bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border-[var(--color-border-light)] hover:border-[#0057B8]"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 mt-2 h-px bg-[var(--color-border-light)]" />

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {FEATURES.map((feature) => (
          <button
            key={feature.id}
            onClick={() => toggle(feature)}
            aria-pressed={!!active[feature.id]}
            className={`flex flex-col items-center gap-1.5 rounded-xl p-3 text-center text-xs font-medium transition-all duration-150 border ${
              active[feature.id]
                ? "bg-[#0057B8] text-white border-[#0057B8]"
                : "bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border-[var(--color-border-light)] hover:border-[#0057B8]"
            }`}
          >
            <span className="text-lg font-bold leading-none" aria-hidden="true">
              {feature.icon}
            </span>
            {feature.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--color-border-light)] px-4 py-2.5">
        <button
          onClick={resetAll}
          className="text-xs text-[var(--color-text-secondary)] underline hover:text-[var(--color-text-primary)]"
        >
          איפוס הכל
        </button>
        <a
          href="/accessibility"
          className="text-xs text-[#0057B8] underline hover:opacity-80"
        >
          הצהרת נגישות
        </a>
      </div>
    </div>
  );
}

function AccessibilityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
      <path d="M12 10c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
      <path d="M6 20l1.5-3h9l1.5 3" />
      <path d="M9 14v3" />
      <path d="M15 14v3" />
      <path d="M7 10H4" />
      <path d="M20 10h-3" />
    </svg>
  );
}
