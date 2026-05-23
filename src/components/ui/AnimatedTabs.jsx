"use client";

import { useEffect, useRef } from "react";

export function AnimatedTabs({ tabs, activeTab, onTabChange }) {
  const containerRef = useRef(null);
  const activeTabRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !activeTab) return;
    const el = activeTabRef.current;
    if (!el) return;
    const { offsetLeft, offsetWidth } = el;
    const pct = (v) => Number((v / container.offsetWidth) * 100).toFixed(2);
    const right = 100 - pct(offsetLeft + offsetWidth);
    const left  = pct(offsetLeft);
    container.style.clipPath = `inset(0 ${right}% 0 ${left}% round 9999px)`;
  }, [activeTab]);

  const activeColor = tabs.find(t => t.id === activeTab)?.color ?? "rgba(255,255,255,0.25)";

  return (
    <div className="w-full overflow-x-auto pb-0.5 flex justify-center">
      <div
        className="relative flex items-center rounded-full overflow-hidden shrink-0"
        style={{
          background:           "rgba(255,255,255,0.12)",
          backdropFilter:       "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border:               "1px solid rgba(255,255,255,0.22)",
          boxShadow:            "inset 1px 1px 1px rgba(255,255,255,0.35), 0 4px 14px rgba(0,0,0,0.12)",
        }}
      >
        {/* Colored sliding pill */}
        <div
          ref={containerRef}
          className="absolute inset-0 [transition:clip-path_0.28s_cubic-bezier(0.16,1,0.3,1)] rounded-full"
          style={{
            clipPath:   "inset(0 100% 0 0% round 9999px)",
            background: activeColor,
          }}
        >
          <div className="flex w-full h-full items-center">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => onTabChange(tab.id)}
                className="flex h-7 items-center px-3 sm:px-4 text-xs font-semibold text-white whitespace-nowrap"
                tabIndex={-1}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Background tabs */}
        <div className="flex items-center">
          {tabs.map((tab, i) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={i}
                ref={isActive ? activeTabRef : null}
                onClick={() => onTabChange(tab.id)}
                className="flex h-7 items-center cursor-pointer px-3 sm:px-4 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap"
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AnimatedTabs;
