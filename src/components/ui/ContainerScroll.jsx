"use client";
/**
 * Aceternity-style Container Scroll Animation
 * Adapted from aceternity/ui — converted to JSX, glass-card variant.
 *
 * The titleComponent floats above and slides up as you scroll.
 * The card starts tilted (rotateX ≈ 20°) and unrolls to flat.
 */
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scaleDimensions = isMobile ? [0.75, 0.95] : [1.04, 1];
  const rotate    = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], scaleDimensions);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      ref={containerRef}
      className="h-[58rem] md:h-[72rem] flex items-center justify-center relative p-2 md:p-10"
    >
      <div
        className="py-8 md:py-24 w-full relative"
        style={{ perspective: "1000px" }}
      >
        {/* ── Title — slides up as you scroll ─── */}
        <motion.div
          style={{ translateY: translate }}
          className="max-w-5xl mx-auto text-center mb-8 px-4"
        >
          {titleComponent}
        </motion.div>

        {/* ── Card — tilts in from perspective ── */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            transformOrigin: "top center",
            willChange: "transform",
          }}
          className="max-w-5xl mx-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default ContainerScroll;
