"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AccessibilityWidget from "./AccessibilityWidget";

// Button dimensions: h-11 = 44px
// Mobile  → top: 12px, left: 16px
// Desktop → bottom: 24px, left: 24px  (= top: windowH − 44 − 24)
const BTN_H   = 44;
const MOBILE_TOP  = 12;
const MOBILE_LEFT = 16;
const DESK_BOTTOM = 24;
const DESK_LEFT   = 24;

export default function FloatingButtons() {
  const [a11yOpen,  setA11yOpen]  = useState(false);
  const [isMobile,  setIsMobile]  = useState(null); // null = not yet mounted
  const [windowH,   setWindowH]   = useState(600);

  const toggle = useCallback(() => setA11yOpen((v) => !v), []);
  const close  = useCallback(() => setA11yOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const sync = () => {
      setIsMobile(!window.matchMedia("(min-width: 768px)").matches);
      setWindowH(window.innerHeight);
    };

    sync();
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  // Compute animated top/left from screen-size state
  const topVal  = isMobile === null
    ? MOBILE_TOP
    : isMobile
      ? MOBILE_TOP
      : Math.max(0, windowH - BTN_H - DESK_BOTTOM);

  const leftVal = isMobile === null ? MOBILE_LEFT : isMobile ? MOBILE_LEFT : DESK_LEFT;

  return (
    <>
      <AccessibilityWidget isOpen={a11yOpen} onClose={close} isMobile={isMobile ?? true} />

      <motion.button
        onClick={toggle}
        aria-label="פתח כלי נגישות"
        aria-expanded={a11yOpen}
        aria-controls="a11y-widget"
        title="נגישות"
        className="fixed z-[199] h-11 w-11 overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        /* Animate position on breakpoint change */
        animate={{ top: topVal, left: leftVal }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.55 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          border:    "1px solid rgba(255,255,255,0.50)",
          boxShadow: "inset 1.5px 1.5px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(255,255,255,0.20), 0 4px 18px rgba(0,0,0,0.22)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/accessibility.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.82 }}
          aria-hidden="true"
          draggable={false}
        />
        {/* Glass shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 55%, rgba(0,0,0,0.04) 100%)",
          }}
        />
      </motion.button>
    </>
  );
}
