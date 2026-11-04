/**
 * LiquidCard — card with the same liquid-glass distortion effect as the dock tray.
 * Requires GlassFilter to be rendered somewhere in the tree (FloatingDock already does it).
 */
export default function LiquidCard({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.008] ${className}`}
      style={{
        boxShadow:
          "0 6px 6px rgba(0,0,0,0.18), 0 0 24px rgba(0,0,0,0.1), inset 2px 2px 1px rgba(255,255,255,0.55), inset -1px -1px 1px 1px rgba(255,255,255,0.45)",
      }}
    >
      {/* Blur + liquid distortion layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
          overflow: "hidden",
        }}
      />
      {/* Tint — theme-aware via CSS class */}
      <div className="liquid-card-tint absolute inset-0 z-0" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
