"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassFilter } from "@/components/ui/liquid-glass";

function isDarkTheme() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark") ||
    (!document.documentElement.classList.contains("light") && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

export default function MobileNav({ navItems = [], lightMode = false }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname        = usePathname();

  useEffect(() => {
    setDark(isDarkTheme());
    const observer = new MutationObserver(() => setDark(isDarkTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  /* Close when accessibility opens */
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("closeHamburger", handler);
    return () => window.removeEventListener("closeHamburger", handler);
  }, []);

  const handleToggle = () => {
    setOpen((v) => {
      if (!v) window.dispatchEvent(new Event("closeA11y"));
      return !v;
    });
  };

  return (
    <>
      {/* 3-dots button */}
      <button
        onClick={handleToggle}
        aria-label={open ? "סגור תפריט" : "פתח תפריט"}
        aria-expanded={open}
        className="relative flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus-visible:outline-none"
        style={{
          background:           dark ? "rgba(20,20,22,0.75)" : "rgba(255,255,255,0.28)",
          backdropFilter:       "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow:            dark
            ? "inset 1px 1px 1px rgba(255,255,255,0.12), inset -1px -1px 1px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.4)"
            : "inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.12)",
          border:               dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.45)",
          color: (lightMode || !dark) ? "white" : "var(--color-text-primary)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{   rotate:  45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            ><X size={20} /></motion.span>
          ) : (
            <motion.span key="menu"
              initial={{ rotate: 45,  opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{   rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            ><MoreHorizontal size={22} /></motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop to close on outside tap */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            {/*
              Panel: spring handles position/scale.
              Opacity is kept at 1 so the panel "exists" in the layout —
              the glass layers below handle their own fade-in separately,
              which prevents the hard-cut from backdrop-filter snapping in.
            */}
            <motion.div
              key="panel"
              initial={{ scale: 0.90, y: -10 }}
              animate={{ scale: 1,    y: 0   }}
              exit={{   scale: 0.90,  y: -10 }}
              transition={{ type: "spring", mass: 0.22, stiffness: 280, damping: 22 }}
              style={{ transformOrigin: "top right", overflow: "hidden" }}
              className="fixed top-[72px] right-4 z-50 w-72 rounded-xl"
            >
              <GlassFilter />

              {/*
                Glass background layers animate their opacity independently.
                Starting at 0 and easing to 1 means the blur/distortion fades
                in smoothly instead of snapping — this is the fix for the cut.
              */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn", delay: 0.09 } }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Blur + liquid distortion */}
                <div
                  className="absolute inset-0"
                  style={{
                    backdropFilter:       "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    filter:               "url(#glass-distortion)",
                    isolation:            "isolate",
                  }}
                />
                {/* Tint */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(255,255,255,0.58)" }}
                />
                {/* Highlight border */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 2px 2px 1px rgba(255,255,255,0.85), inset -1px -1px 1px rgba(255,255,255,0.5), 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)",
                  }}
                />
              </motion.div>

              {/* Links — stagger in after glass is visible */}
              <nav className="relative z-10 flex flex-col gap-1 p-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ delay: 0.033 + i * 0.028, duration: 0.2, ease: "easeOut" }}
                    exit={{ opacity: 0, x: 6, transition: { duration: 0.08, ease: "easeIn" } }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-5 py-3.5 text-[17px] font-semibold tracking-tight transition-colors text-right ${
                        pathname === item.href
                          ? "bg-black/10 text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-primary)] hover:bg-black/6 hover:text-[var(--color-text-primary)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
