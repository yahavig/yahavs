export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface-hover)] ${className}`}
    />
  );
}
