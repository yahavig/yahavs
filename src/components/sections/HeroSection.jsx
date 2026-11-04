"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

/* The hello drifts upward on top of the normal page scroll, and the extra
   drift grows exponentially with scrollY: slow at first, then it races away. */
const DRIFT_PX    = 60;   // scale of the extra upward travel
const DRIFT_SPEED = 250;  // scrollY (px) over which the drift multiplies by e

const HELLO_SHADOW = [
  "drop-shadow(0 4px 36px rgba(0,0,0,0.85))",
  "drop-shadow(0 0 14px rgba(0,0,0,0.6))",
  "drop-shadow(0 10px 70px rgba(0,0,0,0.9))",
  "drop-shadow(0 0 120px rgba(0,0,0,0.7))",
].join(" ");

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const y = useTransform(scrollY, (v) =>
    reduceMotion ? 0 : -DRIFT_PX * (Math.exp(Math.max(v, 0) / DRIFT_SPEED) - 1)
  );

  return (
    <section className="relative h-screen flex items-center justify-center">
      <motion.div style={{ opacity, y, filter: HELLO_SHADOW }}>
        <AppleHelloEnglishEffect
          speed={0.5}
          className="h-[4.8rem] sm:h-[6.4rem] text-white"
        />
      </motion.div>
    </section>
  );
}
