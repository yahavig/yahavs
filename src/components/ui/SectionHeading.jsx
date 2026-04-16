import AnimatedEntry from "@/components/ui/AnimatedEntry";

/**
 * Editorial section heading.
 * eyebrow - small label above (e.g. "YouTube", "01")
 * title   - main heading
 * subtitle - secondary line
 * align   - "start" (default, RTL-aware) | "center"
 */
export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "start",
  className = "",
}) {
  const alignClass = align === "center" ? "text-center" : "text-start";

  return (
    <div className={`mb-10 ${alignClass} ${className}`}>
      {eyebrow && (
        <AnimatedEntry>
          <p className="mb-3 text-[11px] font-medium tracking-[0.25em] text-[var(--color-text-tertiary)] uppercase">
            {eyebrow}
          </p>
        </AnimatedEntry>
      )}
      <AnimatedEntry delay={eyebrow ? 0.08 : 0}>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
          {title}
        </h2>
      </AnimatedEntry>
      {subtitle && (
        <AnimatedEntry delay={eyebrow ? 0.14 : 0.08}>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        </AnimatedEntry>
      )}
    </div>
  );
}
