"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export default function HeroSection() {
  const { scrollY } = useScroll();
  // Fade out as you scroll so the content below takes focus
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center">
      <motion.div style={{ opacity }} className="flex flex-col items-center gap-12">
        <AppleHelloEnglishEffect
          speed={0.9}
          className="h-24 sm:h-32 text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
        />
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 4.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-medium tracking-[0.3em] text-white/60 uppercase">
            גלול למטה
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
