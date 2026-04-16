export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default:
      "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]",
    youtube: "bg-red-50 text-red-600",
    tiktok: "bg-gray-900 text-white",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
