"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Looping video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/hellovid.mov"
      />

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      {/* Centered headline */}
      <div className="relative flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-tight text-white drop-shadow-lg">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            כל מה שצריך.{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
          >
            לדעת.
          </motion.span>
        </h1>
      </div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-medium tracking-[0.3em] text-white/50 uppercase">scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
