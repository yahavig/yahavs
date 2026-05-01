"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import MobileNav from "./MobileNav";

export default function Header({ navItems = [] }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [isDesktop, setIsDesktop] = useState(null); // null = not yet mounted

  const pathname   = usePathname();
  const isHeroPage = pathname === "/";

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Breakpoint detection */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const linkClass = !scrolled && isHeroPage
    ? "rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    : "rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]";

  const bgClass = scrolled
    ? "bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl border-b border-black/5"
    : "bg-transparent";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* ── Desktop nav ── */}
      {(isDesktop === null || isDesktop) && (
        <motion.header
          key="desktop"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0  }}
          exit={{   opacity: 0, y: -6  }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`fixed top-0 z-50 w-full transition-all duration-300 ${bgClass}`}
        >
          <Container>
            <nav className="flex h-14 items-center justify-center">
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </Container>
        </motion.header>
      )}

      {/* ── Mobile hamburger ── */}
      {isDesktop === false && (
        <motion.div
          key="mobile"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1    }}
          exit={{   opacity: 0, scale: 0.75  }}
          transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.4 }}
          className="fixed top-3 right-4 z-50"
          style={{ transformOrigin: "top right" }}
        >
          <MobileNav navItems={navItems} lightMode={!scrolled && isHeroPage} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
