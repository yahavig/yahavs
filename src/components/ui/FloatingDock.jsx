"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { GlassFilter } from "@/components/ui/liquid-glass";

/* ─── Constants ──────────────────────────────────────────────── */
const BASE_SIZE    = 56;   // px - resting icon size
const MAX_SIZE     = 100;  // px - peak size under cursor
const DISTANCE     = 110;  // px - radius of influence
const SPRING       = { mass: 0.1, stiffness: 150, damping: 12 };

/* ─── Dock items ─────────────────────────────────────────────── */
const DOCK_ITEMS = [
  { id: "tiktok",    label: "TikTok",    external: "https://www.tiktok.com/@yahavguetta" },
  { id: "instagram", label: "Instagram", external: "https://www.instagram.com/yahavguetta/" },
  { id: "youtube",   label: "YouTube",   external: "https://www.youtube.com/@yahavguetta" },
  // { id: "discord",   label: "Discord",   section: "community" }, // hidden — re-enable when Discord is back
  { id: "podcast",   label: "Podcast",   section: "podcast",   mobileHidden: true },
  { id: "divider" },
  { id: "finder",    label: "עליי",      section: "about"     },
];

/* ─── Main Dock ──────────────────────────────────────────────── */
const SM = 640; // Tailwind sm breakpoint

export default function FloatingDock() {
  const mouseX   = useMotionValue(Infinity);
  const pathname = usePathname();
  const router   = useRouter();

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SM}px)`);
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleClick = useCallback((item) => {
    // External links → open profile in new tab
    if (item.external) {
      window.open(item.external, "_blank", "noopener,noreferrer");
      return;
    }
    // Internal: scroll on home, route otherwise
    if (pathname === "/") {
      document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${item.section}`);
    }
  }, [pathname, router]);

  return (
    <>
      <GlassFilter />

      <motion.div
        className="fixed left-1/2 z-[200]"
        style={{ x: "-50%", bottom: isDesktop ? 24 : "calc(env(safe-area-inset-bottom, 8px) + 12px)" }}
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{
          y: { type: "spring", stiffness: 320, damping: 18, mass: 0.8, delay: 0.3 },
        }}
      >
        {/* Wrapper - overflow visible so icons can grow above the tray */}
        <div className="relative" style={{ overflow: "visible" }}>

          {/* Icons row - sits above the tray, anchored to its bottom */}
          <motion.div
            className="relative z-[10] flex items-end gap-2 px-3"
            style={{ paddingBottom: 6, paddingTop: 6, overflow: "visible" }}
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
                <div key={item.id} className={item.mobileHidden ? "hidden sm:block" : undefined}>
                  <DockItem
                    item={item}
                    mouseX={mouseX}
                    onClick={handleClick}
                  />
                </div>
              )
            )}
          </motion.div>

          {/* Glass tray - fixed height, anchored to bottom, behind icons */}
          <div
            className="absolute bottom-0 left-0 right-0 z-0"
            style={{
              height: BASE_SIZE + 12, // icon size + vertical padding
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
      </motion.div>
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

/* ─── Icon images ────────────────────────────────────────────── */
const ICON_SRCS = {
  finder:    "/images/icons/finder.png",
  instagram: "/images/icons/instegram.png",
  tiktok:    "/images/icons/tiktok.png",
  discord:   "/images/icons/discord.png",
  podcast:   "/images/icons/podcust.png",
  youtube:   "/images/icons/youtube.png",
};

function AppIcon({ id }) {
  const src = ICON_SRCS[id];
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={id} className="w-full h-full object-contain" draggable={false} />;
}
