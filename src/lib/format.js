/**
 * Format a number for display (e.g., 1234567 -> "1.2M")
 */
export function formatViewCount(count) {
  const num = typeof count === "string" ? parseInt(count, 10) : count;
  if (isNaN(num)) return "";

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return String(num);
}

/**
 * Format ISO date to relative Hebrew time (e.g., "לפני 3 ימים")
 */
export function formatRelativeDate(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 1) return "עכשיו";
  if (diffMinutes < 60) return `לפני ${diffMinutes} דקות`;
  if (diffHours < 24) return `לפני ${diffHours} שעות`;
  if (diffDays === 1) return "אתמול";
  if (diffDays < 7) return `לפני ${diffDays} ימים`;
  if (diffWeeks === 1) return "לפני שבוע";
  if (diffWeeks < 4) return `לפני ${diffWeeks} שבועות`;
  if (diffMonths === 1) return "לפני חודש";
  if (diffMonths < 12) return `לפני ${diffMonths} חודשים`;
  if (diffYears === 1) return "לפני שנה";
  return `לפני ${diffYears} שנים`;
}

/**
 * Parse ISO 8601 duration (PT1H2M3S) to readable format
 */
export function formatDuration(isoDuration) {
  if (!isoDuration) return "";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const pad = (n) => String(n).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${minutes}:${pad(seconds)}`;
}
