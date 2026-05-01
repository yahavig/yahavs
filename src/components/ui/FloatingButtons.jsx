"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import AccessibilityWidget from "./AccessibilityWidget";

const BTN_H       = 44;   // h-11
const MOBILE_TOP  = 12;
const MOBILE_LEFT = 16;
const DESK_BOTTOM = 24;
const DESK_LEFT   = 24;

export default function FloatingButtons() {
  const [a11yOpen,  setA11yOpen]  = useState(false);
  const [isMobile,  setIsMobile]  = useState(null);
  const [windowH,   setWindowH]   = useState(600);
  // Only animate after an actual resize — not on initial mount
  const hasResized = useRef(false);

  const toggle = useCallback(() => setA11yOpen((v) => !v), []);
  const close  = useCallback(() => setA11yOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    // Initial placement — silent, no animation
    setIsMobile(!mq.matches);
    setWindowH(window.innerHeight);

    const handleMq = (e) => {
      hasResized.current = true;
      setIsMobile(!e.matches);
      setWindowH(window.innerHeight);
    };
    const handleResize = () => {
      hasResized.current = true;
      setWindowH(window.innerHeight);
    };

    mq.addEventListener("change", handleMq);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      mq.removeEventListener("change", handleMq);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Don't render until we know the breakpoint — prevents flash to wrong position
  if (isMobile === null) return null;

  const topVal  = isMobile ? MOBILE_TOP  : Math.max(0, windowH - BTN_H - DESK_BOTTOM);
  const leftVal = isMobile ? MOBILE_LEFT : DESK_LEFT;

  return (
    <>
      <AccessibilityWidget isOpen={a11yOpen} onClose={close} isMobile={isMobile} />

      <motion.button
        onClick={toggle}
        aria-label="פתח כלי נגישות"
        aria-expanded={a11yOpen}
        aria-controls="a11y-widget"
        title="נגישות"
        className="fixed z-[199] h-11 w-11 overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        /* Position: teleport instantly on mount, animate only after real resize */
        animate={{ top: topVal, left: leftVal }}
        transition={
          hasResized.current
            ? { type: "tween", duration: 0.35, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0 }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
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
