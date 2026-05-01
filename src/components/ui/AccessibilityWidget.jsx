"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X, Sun, Moon, SunMoon,
  Contrast, FlipHorizontal2, Palette,
  Underline, Pause, MousePointer2, MoveHorizontal,
} from "lucide-react";

const FEATURES = [
  { id: "bigger-text",      label: "הגדל טקסט",      Icon: null, text: "A+", htmlClass: "a11y-bigger-text"      },
  { id: "smaller-text",     label: "הקטן טקסט",      Icon: null, text: "A-", htmlClass: "a11y-smaller-text"     },
  { id: "high-contrast",    label: "ניגודיות גבוהה", Icon: Contrast,        htmlClass: "a11y-high-contrast"    },
  { id: "invert-colors",    label: "היפוך צבעים",    Icon: FlipHorizontal2, htmlClass: "a11y-invert"           },
  { id: "grayscale",        label: "גווני אפור",     Icon: Palette,         htmlClass: "a11y-grayscale"        },
  { id: "underline-links",  label: "קו תחת קישורים", Icon: Underline,       htmlClass: "a11y-underline-links"  },
  { id: "readable-font",    label: "פונט קריא",      Icon: null, text: "Aa", htmlClass: "a11y-readable-font"   },
  { id: "pause-animations", label: "עצור אנימציות",  Icon: Pause,           htmlClass: "a11y-pause-animations" },
  { id: "big-cursor",       label: "סמן גדול",       Icon: MousePointer2,   htmlClass: "a11y-big-cursor"       },
  { id: "text-spacing",     label: "ריווח מרווח",    Icon: MoveHorizontal,  htmlClass: "a11y-text-spacing"     },
];

/* Groups where turning one ON turns the others OFF */
const EXCLUSIVE_GROUPS = [
  ["bigger-text", "smaller-text"],
  ["high-contrast", "invert-colors", "grayscale"],
];

/* ─── CSS injected once ─────────────────────────────────────────────────────
   Key design decisions:
   • Font size: only set on <html> — Tailwind rem units cascade automatically.
     We also override h1 explicitly because its clamp() uses `vw` (viewport
     units), which does NOT respond to changes in html font-size.
   • Filters applied to <body>, not <html>.  Applying filter to <html> creates
     a new stacking context that repositions position:fixed children relative
     to the element instead of the viewport — breaking the dock, header, etc.
   • High contrast removes backdrop-filter so glass cards become solid.
   • Pause animations: CSS pauses transitions/animations; video is paused via
     JS in the toggle handler below.
   ──────────────────────────────────────────────────────────────────────────── */
const A11Y_CSS = `
/* ── Font size ──────────────────────────────────────────────────────── */
html.a11y-bigger-text  { font-size: 120% !important; }
html.a11y-smaller-text { font-size: 85%  !important; }

/*
  Hero h1 uses clamp(3rem, 8vw, 7rem). The 8vw component is viewport-based
  and ignores root font-size changes, so we override it explicitly.
  Values = original × 1.20 (bigger) or × 0.85 (smaller).
*/
html.a11y-bigger-text  h1 { font-size: clamp(3.6rem, 9.6vw, 8.4rem)   !important; }
html.a11y-smaller-text h1 { font-size: clamp(2.55rem, 6.8vw, 5.95rem) !important; }

/* ── High contrast ──────────────────────────────────────────────────── */
html.a11y-high-contrast body {
  background-color: #000 !important;
  color: #fff !important;
}
html.a11y-high-contrast body *:not(#a11y-widget):not(#a11y-widget *) {
  background-color:     #000 !important;
  background-image:     none !important;
  backdrop-filter:      none !important;
  -webkit-backdrop-filter: none !important;
  color:                #fff !important;
  border-color:         rgba(255,255,255,0.5) !important;
  box-shadow:           none !important;
}
html.a11y-high-contrast body a:not(#a11y-widget a) {
  color: #ffff00 !important;
  text-decoration: underline !important;
}
html.a11y-high-contrast body button:not(#a11y-widget button),
html.a11y-high-contrast body [role="button"]:not(#a11y-widget [role="button"]) {
  background-color: #333 !important;
  color: #fff !important;
  border: 1px solid #fff !important;
}
html.a11y-high-contrast body img,
html.a11y-high-contrast body video { filter: contrast(1.4) brightness(0.95); }

/* ── Invert colours (applied to body to preserve fixed-element layout) ─ */
html.a11y-invert body { filter: invert(1) hue-rotate(180deg) !important; }
html.a11y-invert body img,
html.a11y-invert body video { filter: invert(1) hue-rotate(180deg) !important; }

/* ── Grayscale ──────────────────────────────────────────────────────── */
html.a11y-grayscale body { filter: grayscale(1) !important; }

/* ── Underline links ────────────────────────────────────────────────── */
html.a11y-underline-links a {
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}

/* ── Readable font ──────────────────────────────────────────────────── */
html.a11y-readable-font,
html.a11y-readable-font * {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;
  letter-spacing: 0.04em !important;
  word-spacing:   0.10em !important;
}

/* ── Pause CSS animations & transitions ─────────────────────────────── */
html.a11y-pause-animations *,
html.a11y-pause-animations *::before,
html.a11y-pause-animations *::after {
  animation-play-state: paused !important;
  transition-duration:  0.001ms !important;
}

/* ── Big cursor ─────────────────────────────────────────────────────── */
html.a11y-big-cursor,
html.a11y-big-cursor * {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'%3E%3Cpath d='M4 0l16 12.279-6.951 1.17 4.325 8.716-3.474 1.735-4.343-8.738-5.557 5.258z' fill='%23000000' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/svg%3E") 0 0, auto !important;
}

/* ── Text spacing ───────────────────────────────────────────────────── */
html.a11y-text-spacing *:not(textarea):not(input) {
  line-height:    1.9  !important;
  letter-spacing: 0.08em !important;
  word-spacing:   0.16em !important;
}
`;

/* ─── Video helpers ─────────────────────────────────────────────────────── */
function pauseAllVideos() {
  document.querySelectorAll("video").forEach((v) => v.pause());
}
function resumeAutoplayVideos() {
  document.querySelectorAll("video[autoplay]").forEach((v) => {
    v.play().catch(() => {}); // ignore NotAllowedError on browsers that block autoplay
  });
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function AccessibilityWidget({ isOpen, onClose }) {
  const [active,   setActive]   = useState({});
  const [darkMode, setDarkMode] = useState(null); // null | 'light' | 'dark'

  /* Inject CSS once */
  useEffect(() => {
    if (document.getElementById("a11y-styles")) return;
    const style = document.createElement("style");
    style.id = "a11y-styles";
    style.textContent = A11Y_CSS;
    document.head.appendChild(style);
  }, []);

  /* Restore saved theme */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") setDarkMode(saved);
    } catch {}
  }, []);

  /* Restore saved feature state on mount */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("a11y-state") || "{}");
      setActive(saved);
      FEATURES.forEach((f) => {
        if (saved[f.id]) {
          document.documentElement.classList.add(f.htmlClass);
          if (f.id === "pause-animations") pauseAllVideos();
        } else {
          document.documentElement.classList.remove(f.htmlClass);
        }
      });
    } catch {}
  }, []);

  /* Dark mode toggle */
  const toggleDarkMode = useCallback((mode) => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    if (mode === "dark" || mode === "light") {
      html.classList.add(mode);
      localStorage.setItem("theme", mode);
    } else {
      localStorage.removeItem("theme");
    }
    setDarkMode(mode ?? null);
  }, []);

  /* Feature toggle */
  const toggle = useCallback((feature) => {
    setActive((prev) => {
      const next = { ...prev, [feature.id]: !prev[feature.id] };
      const html = document.documentElement;
      const isOn = next[feature.id];

      /* Disable group siblings when turning ON */
      if (isOn) {
        const group = EXCLUSIVE_GROUPS.find((g) => g.includes(feature.id));
        if (group) {
          group.forEach((sibId) => {
            if (sibId === feature.id) return;
            next[sibId] = false;
            const sib = FEATURES.find((f) => f.id === sibId);
            if (sib) html.classList.remove(sib.htmlClass);
          });
        }
      }

      /* Apply / remove the class */
      if (isOn) html.classList.add(feature.htmlClass);
      else      html.classList.remove(feature.htmlClass);

      /* Pause / resume videos alongside the CSS pause */
      if (feature.id === "pause-animations") {
        if (isOn) pauseAllVideos();
        else      resumeAutoplayVideos();
      }

      try { localStorage.setItem("a11y-state", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  /* Reset everything */
  const resetAll = useCallback(() => {
    FEATURES.forEach((f) => document.documentElement.classList.remove(f.htmlClass));
    document.documentElement.classList.remove("dark", "light");
    resumeAutoplayVideos();
    setActive({});
    setDarkMode(null);
    try {
      localStorage.removeItem("a11y-state");
      localStorage.removeItem("theme");
    } catch {}
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="a11y-widget"
      role="dialog"
      aria-modal="true"
      aria-label="תפריט נגישות"
      className="fixed top-[62px] left-4 z-[200] w-72 overflow-hidden rounded-2xl shadow-2xl md:top-auto md:bottom-[76px] md:left-6"
      style={{
        background: "var(--color-surface)",
        border:     "1px solid var(--color-border-light)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-[#0057B8] px-4 py-3">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/icons/accessibility.png" alt="" width={20} height={20} className="object-contain" aria-hidden="true" />
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

      {/* ── Dark mode ──────────────────────────────────────── */}
      <div className="px-3 pt-3 pb-1">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
          מצב תצוגה
        </p>
        <div className="flex gap-1.5">
          {[
            { mode: "light", label: "בהיר", Icon: Sun     },
            { mode: null,    label: "אוטו", Icon: SunMoon },
            { mode: "dark",  label: "כהה",  Icon: Moon    },
          ].map(({ mode, label, Icon }) => (
            <button
              key={String(mode)}
              onClick={() => toggleDarkMode(mode)}
              aria-pressed={darkMode === mode}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold transition-all duration-150 border ${
                darkMode === mode
                  ? "bg-[#0057B8] text-white border-[#0057B8]"
                  : "bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border-[var(--color-border-light)] hover:border-[#0057B8]"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-3 mt-2 h-px" style={{ background: "var(--color-border-light)" }} />

      {/* ── Feature grid ───────────────────────────────────── */}
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
            <span className="flex items-center justify-center" aria-hidden="true">
              {feature.Icon
                ? <feature.Icon size={16} />
                : <span className="text-base font-bold leading-none">{feature.text}</span>
              }
            </span>
            {feature.label}
          </button>
        ))}
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderTop: "1px solid var(--color-border-light)" }}
      >
        <button
          onClick={resetAll}
          className="text-xs text-[var(--color-text-secondary)] underline hover:text-[var(--color-text-primary)] transition-colors"
        >
          איפוס הכל
        </button>
        <a
          href="/accessibility"
          className="text-xs text-[#0057B8] underline hover:opacity-80 transition-opacity"
        >
          הצהרת נגישות
        </a>
      </div>
    </div>
  );
}
