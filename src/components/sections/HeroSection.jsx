"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Reads current viewport metrics — called inside useTransform callbacks (browser only)
function metrics() {
  const pad      = window.innerWidth >= 640 ? 16 : 12;
  const targetW  = window.innerWidth - 2 * pad;
  const targetH  = Math.min(targetW * (9 / 16), window.innerHeight * 0.94);
  const maxShrink = Math.max(0, window.innerHeight - targetH);
  return { pad, maxShrink };
}

export default function HeroSection() {
  const { scrollY } = useScroll();

  // Gate client-only computed values until after mount to avoid
  // SSR→client hydration mismatch (window.innerHeight differs).
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ── Phase 1  (s ≤ maxShrink): top stays 0, height shrinks  ───
  // ── Phase 2  (s > maxShrink): height is fixed, top scrolls up
  //
  //   top    = min(0, maxShrink − s)           → 0 in P1, negative in P2
  //   height = viewportH − min(s, maxShrink)   → shrinks in P1, constant in P2
  //
  // In P2 the top decreases at the same rate as scroll, so the card
  // appears to scroll away naturally — no opacity fade needed.

  const videoTop = useTransform(scrollY, (s) => {
    if (typeof window === "undefined" || !mounted) return 0;
    return Math.min(0, metrics().maxShrink - s);
  });

  const videoHeight = useTransform(scrollY, (s) => {
    if (typeof window === "undefined" || !mounted) return "100vh";
    const { maxShrink } = metrics();
    return `${window.innerHeight - Math.min(s, maxShrink)}px`;
  });

  const leftRight = useTransform(scrollY, (s) => {
    if (typeof window === "undefined" || !mounted) return "0px";
    const { pad, maxShrink } = metrics();
    const t = Math.max(0, Math.min(1, s / Math.max(1, maxShrink)));
    return `${Math.round(t * pad)}px`;
  });

  const borderRadius = useTransform(scrollY, (s) => {
    if (typeof window === "undefined" || !mounted) return 0;
    const { maxShrink } = metrics();
    const t = Math.max(0, Math.min(1, s / Math.max(1, maxShrink)));
    return t * 24;
  });

  // Overlay softens while shrinking, stays soft after
  const overlayOpacity = useTransform(scrollY, (s) => {
    if (typeof window === "undefined" || !mounted) return 0.55;
    const over = Math.max(1, window.innerHeight * 0.65);
    return Math.max(0.1, 0.55 - (Math.min(s, over) / over) * 0.45);
  });

  // Hero text fades at start of scroll
  const contentOpacity = useTransform(scrollY, (s) => {
    if (typeof window === "undefined" || !mounted) return 1;
    const over = Math.max(1, window.innerHeight * 0.18);
    return Math.max(0, 1 - s / over);
  });

  return (
    <>
      {/* ── Fixed video — scrolls away in Phase 2 via negative top ── */}
      <motion.div
        className="fixed z-[15] overflow-hidden pointer-events-none"
        style={{
          top:    videoTop,
          height: videoHeight,
          left:   leftRight,
          right:  leftRight,
          borderRadius,
        }}
      >
        <video
          autoPlay muted loop playsInline
          className="h-full w-full object-cover"
          src="/images/hellovid.mov"
        />
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Hero section — full height, text on top of video ─────── */}
      <section className="relative h-screen z-[20] flex flex-col pointer-events-none">
        <motion.div
          className="flex flex-1 flex-col items-center justify-center text-center px-6"
          style={{ opacity: contentOpacity }}
        >
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-tight text-white drop-shadow-lg">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3.0, ease: "easeOut" }}
            >
              כל מה שצריך.{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 4.0, ease: "easeOut" }}
            >
              לדעת.
            </motion.span>
          </h1>
        </motion.div>

        {/* Scroll nudge */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 5.0 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-medium tracking-[0.3em] text-white/50 uppercase">
              גלול למטה
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block h-6 w-px bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
