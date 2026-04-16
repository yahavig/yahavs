"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { GlassFilter } from "@/components/ui/liquid-glass";

/* ─── Constants ──────────────────────────────────────────────── */
const BASE_SIZE    = 40;   // px - resting icon size
const MAX_SIZE     = 72;   // px - peak size under cursor
const DISTANCE     = 110;  // px - radius of influence
const SPRING       = { mass: 0.1, stiffness: 150, damping: 12 };

/* ─── Dock items ─────────────────────────────────────────────── */
const DOCK_ITEMS = [
  { id: "youtube",   label: "YouTube",   section: "social",        tab: "youtube"   },
  { id: "tiktok",    label: "TikTok",    section: "social",        tab: "tiktok"    },
  { id: "instagram", label: "Instagram", section: "social",        tab: "instagram" },
  { id: "podcast",   label: "Podcast",   section: "podcast",       tab: null        },
  { id: "discord",   label: "Discord",   section: "community",     tab: null        },
  { id: "divider" },
  { id: "finder",    label: "עליי",      section: "about-preview", tab: null        },
];

/* ─── Main Dock ──────────────────────────────────────────────── */
export default function FloatingDock() {
  const mouseX   = useMotionValue(Infinity);
  const pathname = usePathname();
  const router   = useRouter();

  const handleClick = useCallback((item) => {
    const scrollTo = () =>
      document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });

    if (pathname === "/") {
      if (item.tab) window.dispatchEvent(new CustomEvent("switchSocialTab", { detail: item.tab }));
      scrollTo();
    } else {
      router.push(item.tab ? `/?tab=${item.tab}#${item.section}` : `/#${item.section}`);
    }
  }, [pathname, router]);

  return (
    <>
      <GlassFilter />

      <div className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2">
        {/* Wrapper - overflow visible so icons can grow above the tray */}
        <div className="relative" style={{ overflow: "visible" }}>

          {/* Icons row - sits above the tray, anchored to its bottom */}
          <motion.div
            className="relative z-[10] flex items-end gap-2 px-3"
            style={{ paddingBottom: 8, paddingTop: 8, overflow: "visible" }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {DOCK_ITEMS.map((item) =>
              item.id === "divider" ? (
                <div
                  key="divider"
                  className="self-center mx-1"
                  style={{ width: 1, height: BASE_SIZE * 0.6, background: "rgba(0,0,0,0.15)" }}
                />
              ) : (
                <DockItem
                  key={item.id}
                  item={item}
                  mouseX={mouseX}
                  onClick={handleClick}
                />
              )
            )}
          </motion.div>

          {/* Glass tray - fixed height, anchored to bottom, behind icons */}
          <div
            className="absolute bottom-0 left-0 right-0 z-0"
            style={{
              height: BASE_SIZE + 16, // icon size + vertical padding
              borderRadius: 22,
              boxShadow: "0 6px 6px rgba(0,0,0,0.18), 0 0 24px rgba(0,0,0,0.1), inset 2px 2px 1px rgba(255,255,255,0.55), inset -1px -1px 1px 1px rgba(255,255,255,0.45)",
            }}
          >
            {/* Blur + distortion */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: 22,
                backdropFilter: "blur(3px)",
                filter: "url(#glass-distortion)",
                isolation: "isolate",
                overflow: "hidden",
              }}
            />
            {/* Tint */}
            <div
              className="absolute inset-0"
              style={{ borderRadius: 22, background: "rgba(255,255,255,0.28)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Single icon with spring magnification ──────────────────── */
function DockItem({ item, mouseX, onClick }) {
  const ref          = useRef(null);
  const [tip, setTip] = useState(false);

  // Distance from mouse to this icon's center (in page coords)
  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return Infinity;
    return val - (b.left + b.width / 2);
  });

  // Map distance → size (both width + height)
  const sizeRaw = useTransform(distance, [-DISTANCE, 0, DISTANCE], [BASE_SIZE, MAX_SIZE, BASE_SIZE]);
  const size    = useSpring(sizeRaw, SPRING);

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      {tip && (
        <div
          className="absolute bottom-full mb-2 flex flex-col items-center pointer-events-none"
          style={{ whiteSpace: "nowrap" }}
        >
          <div
            className="rounded-lg px-3 py-[5px] text-[12px] font-medium text-[#1c1c1e]"
            style={{
              background: "rgba(236,236,236,0.92)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {item.label}
          </div>
          {/* Arrow */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid rgba(236,236,236,0.92)",
            }}
          />
        </div>
      )}

      {/* Icon */}
      <motion.button
        ref={ref}
        style={{ width: size, height: size }}
        className="shrink-0 cursor-pointer focus-visible:outline-none"
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        onClick={() => onClick(item)}
        aria-label={item.label}
      >
        <AppIcon id={item.id} />
      </motion.button>
    </div>
  );
}

/* ─── SVG App Icons ──────────────────────────────────────────── */
function AppIcon({ id }) {
  const R = 22; // corner radius out of 100

  if (id === "finder") return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="finder-bg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5AC8FA" />
          <stop offset="100%" stopColor="#007AFF" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx={R} fill="url(#finder-bg)" />
      <rect x="10" y="22" width="40" height="58" rx="10" fill="#A8D8F8" />
      <rect x="50" y="22" width="40" height="58" rx="10" fill="white" />
      <circle cx="30" cy="44" r="7" fill="#007AFF" />
      <path d="M18 62 Q30 72 42 62" stroke="#007AFF" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="44" r="7" fill="#1C1C1E" />
      <path d="M58 62 Q70 72 82 62" stroke="#1C1C1E" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );

  if (id === "youtube") return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <rect width="100" height="100" rx={R} fill="#FF0000" />
      <path d="M82 35.5a8 8 0 0 0-5.6-5.65C70.8 28 50 28 50 28s-20.8 0-26.4.85A8 8 0 0 0 18 34.5C17 40.1 17 50 17 50s0 9.9 1 15.5a8 8 0 0 0 5.6 5.65C29.2 72 50 72 50 72s20.8 0 26.4-.85A8 8 0 0 0 82 65.5C83 59.9 83 50 83 50s0-9.9-1-14.5z" fill="white" />
      <path d="M42 62 L64 50 L42 38 Z" fill="#FF0000" />
    </svg>
  );

  if (id === "tiktok") return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <rect width="100" height="100" rx={R} fill="#010101" />
      {/* Red layer */}
      <path d="M70 18h-12v46a13 13 0 1 1-13-13c1.2 0 2.3.15 3.4.4V39a27 27 0 1 0 23.3 26.7V38.2A36.5 36.5 0 0 0 86 42V30a22 22 0 0 1-16-12z" fill="#EE1D52" opacity="0.9" transform="translate(2,0)" />
      {/* Cyan layer */}
      <path d="M70 18h-12v46a13 13 0 1 1-13-13c1.2 0 2.3.15 3.4.4V39a27 27 0 1 0 23.3 26.7V38.2A36.5 36.5 0 0 0 86 42V30a22 22 0 0 1-16-12z" fill="#69C9D0" opacity="0.9" transform="translate(-2,0)" />
      {/* White on top */}
      <path d="M70 18h-12v46a13 13 0 1 1-13-13c1.2 0 2.3.15 3.4.4V39a27 27 0 1 0 23.3 26.7V38.2A36.5 36.5 0 0 0 86 42V30a22 22 0 0 1-16-12z" fill="white" />
    </svg>
  );

  if (id === "instagram") return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ig-bg" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#F9C240" />
          <stop offset="30%"  stopColor="#E8622A" />
          <stop offset="65%"  stopColor="#D42F7B" />
          <stop offset="100%" stopColor="#9B3FBE" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx={R} fill="url(#ig-bg)" />
      <rect x="22" y="22" width="56" height="56" rx="17" stroke="white" strokeWidth="6" fill="none" />
      <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="6" fill="none" />
      <circle cx="70" cy="30" r="5" fill="white" />
    </svg>
  );

  if (id === "podcast") return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="pod-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#BF5AF2" />
          <stop offset="100%" stopColor="#7B2FBE" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx={R} fill="url(#pod-bg)" />
      <rect x="38" y="15" width="24" height="42" rx="12" fill="white" />
      <path d="M25 52 Q25 78 50 78 Q75 78 75 52" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
      <line x1="50" y1="78" x2="50" y2="90" stroke="white" strokeWidth="6" strokeLinecap="round" />
      <line x1="34" y1="90" x2="66" y2="90" stroke="white" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );

  if (id === "discord") return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="dc-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#7289DA" />
          <stop offset="100%" stopColor="#5865F2" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx={R} fill="url(#dc-bg)" />
      <path
        d="M74 27a58 58 0 0 0-14.5-4.5.2.2 0 0 0-.22.1 40 40 0 0 0-1.8 3.7 53.5 53.5 0 0 0-16.1 0 31 31 0 0 0-1.83-3.7.22.22 0 0 0-.22-.1A58.7 58.7 0 0 0 25.3 27a.2.2 0 0 0-.1.08C17.3 39.3 15.1 51.2 16.2 62.9c0 .06.04.12.09.16a59.2 59.2 0 0 0 17.8 9 .22.22 0 0 0 .24-.08 42 42 0 0 0 3.6-5.9.22.22 0 0 0-.12-.3 39 39 0 0 1-5.57-2.66.22.22 0 0 1-.02-.37c.37-.28.75-.57 1.1-.87a.21.21 0 0 1 .22-.03c11.7 5.35 24.36 5.35 35.9 0a.21.21 0 0 1 .23.03c.36.3.73.6 1.1.87a.22.22 0 0 1-.02.37 36.6 36.6 0 0 1-5.57 2.65.22.22 0 0 0-.12.31 47 47 0 0 0 3.6 5.9.21.21 0 0 0 .24.08 59 59 0 0 0 17.82-9 .22.22 0 0 0 .09-.15c1.34-13.87-2.24-25.9-9.49-36.6a.17.17 0 0 0-.1-.08zM36.7 56.3c-3.54 0-6.46-3.25-6.46-7.25s2.86-7.25 6.46-7.25c3.63 0 6.52 3.27 6.46 7.25 0 4-2.86 7.25-6.46 7.25zm23.9 0c-3.54 0-6.46-3.25-6.46-7.25s2.86-7.25 6.46-7.25c3.63 0 6.52 3.27 6.46 7.25 0 4-2.83 7.25-6.46 7.25z"
        fill="white"
      />
    </svg>
  );

  return null;
}
