import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-sm hover:shadow-md",
    secondary:
      "bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border)]",
    ghost:
      "text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
