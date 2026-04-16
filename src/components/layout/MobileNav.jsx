"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassFilter } from "@/components/ui/liquid-glass";

export default function MobileNav({ navItems = [], lightMode = false }) {
  const [open, setOpen] = useState(false);
  const pathname        = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* 3-dots button - liquid glass circle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "סגור תפריט" : "פתח תפריט"}
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus-visible:outline-none"
        style={{
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.12)",
          border: "1px solid rgba(255,255,255,0.45)",
          color: lightMode ? "white" : "var(--color-text-primary)",
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
            {/* Invisible backdrop to close on outside tap */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Floating liquid glass panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1,   y: 0   }}
              exit={{   opacity: 0, scale: 0.9,  y: -10 }}
              transition={{ type: "spring", mass: 0.2, stiffness: 300, damping: 24 }}
              style={{ transformOrigin: "top right", overflow: "hidden" }}
              className="fixed top-[60px] right-4 z-50 w-72 rounded-3xl"
            >
              <GlassFilter />

              {/* Blur + distortion */}
              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(40px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />
              {/* Tint */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(255,255,255,0.58)" }}
              />
              {/* Glass border highlight */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow:
                    "inset 2px 2px 1px rgba(255,255,255,0.85), inset -1px -1px 1px rgba(255,255,255,0.5), 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)",
                }}
              />

              {/* Links */}
              <nav className="relative z-10 flex flex-col gap-1 p-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ delay: 0.05 + i * 0.05, type: "spring", stiffness: 320, damping: 28 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl px-5 py-3.5 text-[17px] font-semibold tracking-tight transition-colors ${
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
