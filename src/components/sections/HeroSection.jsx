"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      animate(window.scrollY, window.innerHeight, {
        duration: 1.3,
        ease: "linear",
        onUpdate: (v) => window.scrollTo(0, v),
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center">
      <motion.div style={{ opacity }}>
        <AppleHelloEnglishEffect
          speed={0.5}
          className="h-[4.8rem] sm:h-[6.4rem] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
        />
      </motion.div>
    </section>
  );
}
